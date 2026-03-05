"""
BSE Corporate Actions Pipeline — Fixed.
Uses the correct BseIndiaAPI/api/CorporateAction/w endpoint per scripcode.
Falls back to a per-scripcode approach since the bulk endpoint is unreliable.
"""
import json
import logging
import time
import re
import requests
from datetime import date, datetime, timedelta
from typing import Optional, List, Dict, Tuple

from core.db import get_db, generate_id
from utils.storage import save_raw_file, raw_file_exists, load_raw_file
from pipelines.bse_corporate_actions_parser import (
    classify_bse_action,
    parse_bse_dividend_amount,
    parse_bse_bonus_ratio,
)

logger = logging.getLogger(__name__)

BSE_CORP_ACTION_URL = "https://api.bseindia.com/BseIndiaAPI/api/CorporateAction/w"

BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.bseindia.com/",
    "Accept": "application/json",
}


def fetch_bse_corporate_actions_by_scrip(scrip_code: str) -> List[Dict]:
    """Fetch ALL corporate actions for a single BSE scrip code.
    Returns the Table2 array which has the full history of actions with ex_dates.
    """
    url = f"{BSE_CORP_ACTION_URL}?scripcode={scrip_code}"
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        # Table2 has the detailed actions with ex_date, purpose, etc.
        return data.get("Table2", [])
    except Exception as e:
        logger.warning(f"BSE CA fetch failed for {scrip_code}: {e}")
        return []


def fetch_bse_corporate_actions(from_date: date, to_date: date) -> List[Dict]:
    """Legacy bulk API — returns empty if the date-range bulk URL fails."""
    from_str = from_date.strftime("%Y%m%d")
    to_str = to_date.strftime("%Y%m%d")
    url = f"{BSE_CORP_ACTION_URL}?type=ALL&fromdate={from_str}&todate={to_str}"

    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        if isinstance(data, list):
            return data
        # The API returns a dict with Table2 for per-scrip calls
        return data.get("Table2", [])
    except Exception as e:
        logger.warning(f"BSE bulk CA fetch failed: {e}")
        return []


def _parse_bse_action_record(raw: dict, bse_cache: dict, isin_cache: dict) -> Optional[Tuple]:
    """Parse a single BSE corporate action record from Table2 format.
    Returns a tuple ready for DB insertion, or None if unparseable.
    """
    scrip_code = str(raw.get("scrip_code", "")).strip()
    purpose = str(raw.get("purpose", "")).strip()
    ex_date_str = str(raw.get("Ex_date", "")).strip()
    details = str(raw.get("Details", "")).strip()

    if not scrip_code or not ex_date_str:
        return None

    # Parse ex_date — format is usually "28 Oct 2024"
    ex_date = None
    for fmt in ("%d %b %Y", "%d-%b-%Y", "%Y-%m-%d"):
        try:
            ex_date = datetime.strptime(ex_date_str, fmt).date()
            break
        except ValueError:
            continue
    if ex_date is None:
        return None

    action_type = classify_bse_action(purpose)
    if not action_type:
        return None

    # Resolve asset_id
    asset_id = bse_cache.get(scrip_code)
    if not asset_id:
        return None

    # Parse amounts/ratios from details and purpose
    div_amt = 0.0
    ratio_num = 0.0
    ratio_den = 1.0

    if action_type == "DIVIDEND":
        # Try Details first (e.g. "5.50"), then purpose string
        try:
            div_amt = float(details.replace(",", "").strip())
        except (ValueError, TypeError):
            div_amt = parse_bse_dividend_amount(purpose)

    elif action_type in ("SPLIT", "FACE_VALUE_CHANGE"):
        ratio_num, ratio_den = parse_bse_bonus_ratio(purpose + " " + details)

    elif action_type == "BONUS":
        # BSE format: "issue 1:1" in value field
        ratio_num, ratio_den = parse_bse_bonus_ratio(purpose + " " + details)

    return (
        generate_id(), asset_id, action_type, ex_date.isoformat(),
        ratio_num, ratio_den, div_amt, 0.0,  # rights_price
        "BSE", json.dumps(raw)
    )


def run_bse_corporate_actions_pipeline(from_date: date, to_date: date):
    """Pipeline entry point for BSE corporate actions."""
    logger.info(f"[BSE_CORP_ACTIONS] Starting BSE corporate actions pipeline from {from_date} to {to_date}...")

    # Build caches
    with get_db() as conn:
        bse_rows = conn.execute("SELECT id, bse_code FROM assets WHERE bse_code IS NOT NULL").fetchall()
        bse_cache = {str(r["bse_code"]).strip(): r["id"] for r in bse_rows}

        isin_rows = conn.execute("SELECT id, isin FROM assets WHERE isin IS NOT NULL").fetchall()
        isin_cache = {r["isin"]: r["id"] for r in isin_rows}

        existing = conn.execute(
            "SELECT asset_id, action_type, ex_date FROM corporate_actions WHERE source_exchange = 'BSE'"
        ).fetchall()
        existing_set = {(r["asset_id"], r["action_type"], r["ex_date"]) for r in existing}

    logger.info(f"[BSE_CORP_ACTIONS] BSE cache: {len(bse_cache)} scrips, existing CAs: {len(existing_set)}")

    inserted = 0
    skipped = 0

    for i, (scrip_code, asset_id) in enumerate(bse_cache.items()):
        actions = fetch_bse_corporate_actions_by_scrip(scrip_code)
        if not actions:
            continue

        batch = []
        for raw in actions:
            parsed = _parse_bse_action_record(raw, bse_cache, isin_cache)
            if not parsed:
                skipped += 1
                continue

            # Filter by date range
            ex_date = date.fromisoformat(parsed[3])
            if ex_date < from_date or ex_date > to_date:
                continue

            key = (parsed[1], parsed[2], parsed[3])
            if key in existing_set:
                skipped += 1
                continue

            batch.append(parsed)
            existing_set.add(key)

        if batch:
            with get_db() as conn:
                conn.executemany("""
                    INSERT OR IGNORE INTO corporate_actions
                    (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                     dividend_amount, rights_price, source_exchange, raw_announcement)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, batch)
            inserted += len(batch)

        if (i + 1) % 100 == 0:
            logger.info(f"[BSE_CORP_ACTIONS] Progress [{i+1}/{len(bse_cache)}]: {inserted} inserted")
        time.sleep(0.3)

    logger.info(f"[BSE_CORP_ACTIONS] ✅ Done. {inserted} inserted, {skipped} skipped")
    return inserted, skipped
