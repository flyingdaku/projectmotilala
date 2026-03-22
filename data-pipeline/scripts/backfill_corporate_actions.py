"""
Corporate Actions — Collection-Only Backfill Script
=====================================================
Downloads and stores corporate actions from both NSE and BSE
for a given date range. Does NOT apply any adj_close adjustments.

Usage:
  python scripts/backfill_corporate_actions.py                    # 2020-01-01 → today
  python scripts/backfill_corporate_actions.py --from 2015-01-01  # Custom start
"""
import sys
import os
import json
import logging
import time
import argparse
from datetime import date, datetime, timedelta
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from core.db import get_db, generate_id
from pipelines.corporate_actions import (
    fetch_nse_corporate_actions,
    _map_action_type,
    _parse_ratio,
    _get_prev_close,
    calculate_adjustment_factor,
)
from pipelines.bse_corporate_actions import fetch_bse_corporate_actions
from pipelines.bse_corporate_actions_parser import (
    classify_bse_action,
    parse_bse_dividend_amount,
    parse_bse_bonus_ratio,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(str(ROOT / "logs" / "corporate_actions_backfill.log"), mode="w"),
    ],
)
logger = logging.getLogger("ca_backfill")

# ── In-memory caches ─────────────────────────────────────────────────────────

def _build_isin_cache():
    """Build ISIN→asset_id map from DB."""
    with get_db() as conn:
        rows = conn.execute("SELECT id, isin FROM assets WHERE isin IS NOT NULL").fetchall()
    return {r["isin"]: r["id"] for r in rows}


def _build_bse_code_cache():
    """Build bse_code→asset_id map from DB."""
    with get_db() as conn:
        rows = conn.execute("SELECT id, bse_code FROM assets WHERE bse_code IS NOT NULL").fetchall()
    return {str(r["bse_code"]).strip(): r["id"] for r in rows}


def _build_existing_ca_set():
    """Build set of (asset_id, action_type, ex_date) for dedup."""
    with get_db() as conn:
        rows = conn.execute(
            "SELECT asset_id, action_type, ex_date FROM corporate_actions"
        ).fetchall()
    return {(r["asset_id"], r["action_type"], r["ex_date"]) for r in rows}


# ── NSE processing ───────────────────────────────────────────────────────────

def _clean_isin(val):
    if not val:
        return None
    s = str(val).strip()
    return s if len(s) >= 10 else None


def process_nse_chunk(from_date: date, to_date: date, isin_cache: dict, existing_set: set, session=None):
    """Fetch and insert NSE corporate actions for one 30-day chunk.
    Returns (inserted, skipped, errors) count.
    """
    try:
        raw_actions = fetch_nse_corporate_actions(from_date, to_date, session=session)
    except Exception as e:
        logger.warning(f"NSE fetch failed {from_date}→{to_date}: {e}")
        return 0, 0, 1

    rows_to_insert = []
    skipped = 0

    for raw in raw_actions:
        isin = _clean_isin(raw.get("isin", ""))
        symbol = raw.get("symbol", "").strip()
        purpose = raw.get("purpose", "").strip()
        ex_date_str = raw.get("exDate", raw.get("ex_date", "")).strip()

        if not isin or not ex_date_str:
            skipped += 1
            continue

        # Parse ex_date
        try:
            ex_date = datetime.strptime(ex_date_str, "%d-%b-%Y").date()
        except ValueError:
            try:
                ex_date = date.fromisoformat(ex_date_str)
            except ValueError:
                skipped += 1
                continue

        action_type = _map_action_type(purpose)
        if not action_type:
            skipped += 1
            continue

        asset_id = isin_cache.get(isin)
        if not asset_id:
            skipped += 1
            continue

        # Dedup
        key = (asset_id, action_type, ex_date.isoformat())
        if key in existing_set:
            skipped += 1
            continue

        # Parse ratio
        ratio_str = raw.get("faceVal", raw.get("ratio", ""))
        ratio_num, ratio_den = _parse_ratio(str(ratio_str))

        # Parse dividend amount
        dividend_amount = 0.0
        div_str = raw.get("dividend", raw.get("dividendAmount", "0"))
        try:
            dividend_amount = float(str(div_str).replace("₹", "").replace(",", "").strip() or 0)
        except (ValueError, TypeError):
            pass

        # Parse rights price
        rights_price = 0.0
        rp_str = raw.get("rightsPrice", "0")
        try:
            rights_price = float(str(rp_str).replace("₹", "").replace(",", "").strip() or 0)
        except (ValueError, TypeError):
            pass

        # Get prev_close for factor calc (but DON'T apply the adjustment)
        prev_close = _get_prev_close(asset_id, ex_date)

        factor = calculate_adjustment_factor(
            action_type, ratio_num, ratio_den,
            dividend_amount, prev_close, rights_price
        )

        rows_to_insert.append((
            generate_id(), asset_id, action_type, ex_date.isoformat(),
            ratio_num, ratio_den, dividend_amount, rights_price,
            factor, "NSE", json.dumps(raw)
        ))
        existing_set.add(key)

    # Bulk insert
    if rows_to_insert:
        with get_db() as conn:
            conn.executemany("""
                INSERT INTO corporate_actions
                (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                 dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (asset_id, ex_date, action_type) DO NOTHING
            """, rows_to_insert)

    return len(rows_to_insert), skipped, 0


# ── BSE processing ───────────────────────────────────────────────────────────

def process_bse_chunk(from_date: date, to_date: date, bse_cache: dict, isin_cache: dict, existing_set: set):
    """Fetch and insert BSE corporate actions for one chunk.
    Returns (inserted, skipped, errors) count.
    """
    try:
        raw_actions = fetch_bse_corporate_actions(from_date, to_date)
    except Exception as e:
        logger.warning(f"BSE fetch failed {from_date}→{to_date}: {e}")
        return 0, 0, 1

    rows_to_insert = []
    skipped = 0

    for raw in raw_actions:
        scrip_code = str(raw.get("ScripCode", "")).strip()
        purpose = raw.get("Purpose", "").strip()
        ex_date_str = raw.get("ExDate", "").strip()

        if not scrip_code or not ex_date_str:
            skipped += 1
            continue

        # Parse ex_date
        try:
            ex_date = datetime.fromisoformat(ex_date_str.split("T")[0]).date()
        except Exception:
            skipped += 1
            continue

        action_type = classify_bse_action(purpose)
        if not action_type:
            skipped += 1
            continue

        # Resolve asset_id
        asset_id = bse_cache.get(scrip_code)
        if not asset_id:
            # Try ISIN from raw data
            raw_isin = _clean_isin(raw.get("ISIN", raw.get("isin", "")))
            if raw_isin:
                asset_id = isin_cache.get(raw_isin)
        if not asset_id:
            skipped += 1
            continue

        # Dedup (include source_exchange in key for BSE since same event may exist from NSE)
        key = (asset_id, action_type, ex_date.isoformat())
        if key in existing_set:
            skipped += 1
            continue

        # Parse amounts/ratios
        div_amt = 0.0
        ratio_num = 0.0
        ratio_den = 1.0

        if action_type == "DIVIDEND":
            div_amt = parse_bse_dividend_amount(purpose)
        elif action_type in ("SPLIT", "BONUS", "FACE_VALUE_CHANGE"):
            ratio_num, ratio_den = parse_bse_bonus_ratio(purpose)

        # Get prev_close for factor (but NO adjustment applied)
        prev_close = 0.0
        from core.db import get_prices_db
        with get_prices_db() as conn:
            prev_row = conn.execute("""
                SELECT close FROM daily_prices
                WHERE asset_id = %s AND date < %s
                ORDER BY date DESC LIMIT 1
            """, (asset_id, ex_date.isoformat())).fetchone()
            if prev_row:
                prev_close = float(prev_row["close"])

        factor = calculate_adjustment_factor(
            action_type=action_type,
            ratio_num=ratio_num,
            ratio_den=ratio_den,
            dividend_amount=div_amt,
            prev_close=prev_close
        )

        rows_to_insert.append((
            generate_id(), asset_id, action_type, ex_date.isoformat(),
            ratio_num, ratio_den, div_amt, 0.0,
            factor, "BSE", json.dumps(raw)
        ))
        existing_set.add(key)

    # Bulk insert
    if rows_to_insert:
        with get_db() as conn:
            conn.executemany("""
                INSERT INTO corporate_actions
                (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                 dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (asset_id, ex_date, action_type) DO NOTHING
            """, rows_to_insert)

    return len(rows_to_insert), skipped, 0


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Corporate Actions collection-only backfill")
    parser.add_argument("--from", dest="start_date", default="2020-01-01")
    parser.add_argument("--to", dest="end_date", default=None)
    parser.add_argument("--chunk-days", type=int, default=90, help="Days per API chunk")
    parser.add_argument("--skip-bse", action="store_true")
    parser.add_argument("--skip-nse", action="store_true")
    args = parser.parse_args()

    start = date.fromisoformat(args.start_date)
    end = date.fromisoformat(args.end_date) if args.end_date else date.today()

    logger.info("=" * 60)
    logger.info("  CORPORATE ACTIONS COLLECTION BACKFILL")
    logger.info(f"  Range: {start} → {end}")
    logger.info(f"  Chunk: {args.chunk_days} days")
    logger.info("=" * 60)

    # Build caches once
    logger.info("Building asset caches...")
    isin_cache = _build_isin_cache()
    bse_cache = _build_bse_code_cache()
    existing_set = _build_existing_ca_set()
    logger.info(f"  ISIN cache: {len(isin_cache)} | BSE code cache: {len(bse_cache)} | Existing CAs: {len(existing_set)}")

    # Generate chunks
    chunks = []
    current = start
    while current <= end:
        chunk_end = min(current + timedelta(days=args.chunk_days - 1), end)
        chunks.append((current, chunk_end))
        current = chunk_end + timedelta(days=1)

    logger.info(f"Processing {len(chunks)} chunks...")

    # ── NSE ──────────────────────────────────────────────────────────
    if not args.skip_nse:
        logger.info("\n── NSE Corporate Actions ──")
        nse_total_ins = nse_total_skip = nse_total_err = 0
        
        # Create a single session for all chunks
        from pipelines.corporate_actions import _create_nse_session
        try:
            session = _create_nse_session()
        except Exception as e:
            logger.error(f"Failed to create NSE session: {e}")
            session = None
            
        for i, (cf, ct) in enumerate(chunks):
            ins, skip, err = process_nse_chunk(cf, ct, isin_cache, existing_set, session=session)
            nse_total_ins += ins
            nse_total_skip += skip
            nse_total_err += err
            if ins > 0 or (i + 1) % 5 == 0:
                logger.info(f"  NSE [{i+1}/{len(chunks)}] {cf}→{ct}: +{ins} inserted, {skip} skipped")
            time.sleep(3)  # NSE API needs polite delay (increased for safety)
            
        logger.info(f"  NSE total: {nse_total_ins} inserted, {nse_total_skip} skipped, {nse_total_err} errors")

    # ── BSE ──────────────────────────────────────────────────────────
    if not args.skip_bse:
        logger.info("\n── BSE Corporate Actions (per-scripcode) ──")
        from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline
        bse_ins, bse_skip = run_bse_corporate_actions_pipeline(start, end)
        logger.info(f"  BSE total: {bse_ins} inserted, {bse_skip} skipped")

    # ── Summary ──────────────────────────────────────────────────────
    with get_db() as conn:
        total = conn.execute("SELECT count(*) FROM corporate_actions").fetchone()[0]
        by_type = conn.execute("""
            SELECT action_type, count(*) as cnt
            FROM corporate_actions
            GROUP BY action_type
            ORDER BY cnt DESC
        """).fetchall()
        by_source = conn.execute("""
            SELECT source_exchange, count(*) as cnt
            FROM corporate_actions
            GROUP BY source_exchange
        """).fetchall()

    logger.info("\n" + "=" * 60)
    logger.info("  CORPORATE ACTIONS SUMMARY")
    logger.info("=" * 60)
    logger.info(f"  Total actions: {total}")
    for r in by_type:
        logger.info(f"    {r['action_type']:20s} {r['cnt']:6d}")
    for r in by_source:
        logger.info(f"    Source {r['source_exchange']:5s}: {r['cnt']:6d}")
    logger.info("=" * 60)


if __name__ == "__main__":
    main()
