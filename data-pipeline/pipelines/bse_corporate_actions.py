"""
BSE Corporate Actions Pipeline.
Fetches financial results via unofficial BSE WebAPI (XBRL data).
Updates asset table with bse_codes using List_Scrips CSV if possible.
"""
import json
import logging
import time
import requests
import io
import pandas as pd
from datetime import date, datetime, timedelta
from typing import Optional, List, Dict

from utils.db import get_db, generate_id
from utils.storage import save_raw_file, raw_file_exists, load_raw_file
from pipelines.bse_corporate_actions_parser import classify_bse_action, parse_bse_dividend_amount, parse_bse_bonus_ratio

logger = logging.getLogger(__name__)

BSE_MASTER_URL = "https://www.bseindia.com/corporates/List_Scrips.aspx"
BSE_CORP_ACTIONS_URL = "https://api.bseindia.com/BseWebAPI/api/CorporateAction/w"

def sync_bse_security_master():
    """Update asset table with bse_codes using List_Scrips CSV if possible."""
    logger.info("[BSE_CORP_ACTIONS] Syncing BSE security master (ISIN → bse_code mapping)...")
    # This is a simplified version of the sync logic
    # In a real run, we would download the full CSV from BSE
    with get_db() as conn:
        count = conn.execute("SELECT COUNT(*) FROM assets WHERE bse_code IS NOT NULL").fetchone()[0]
        logger.info(f"[BSE_CORP_ACTIONS] Security master sync: {count} BSE codes already present")

def fetch_bse_corporate_actions(from_date: date, to_date: date) -> list:
    """Fetch BSE corporate actions from the unofficial BSE API."""
    from_str = from_date.strftime("%Y%m%d")
    to_str = to_date.strftime("%Y%m%d")
    url = f"{BSE_CORP_ACTIONS_URL}?type=ALL&fromdate={from_str}&todate={to_str}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.bseindia.com/",
    }
    
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data if isinstance(data, list) else []
    except Exception as e:
        logger.warning(f"Failed to fetch BSE corporate actions: {e}")
        return []

def run_bse_corporate_actions_pipeline(from_date: date, to_date: date):
    logger.info(f"[BSE_CORP_ACTIONS] Starting BSE corporate actions pipeline from {from_date} to {to_date}...")
    sync_bse_security_master()
    
    actions = fetch_bse_corporate_actions(from_date, to_date)
    logger.info(f"[BSE_CORP_ACTIONS] Fetched {len(actions)} BSE corporate action rows")
    
    inserted = 0
    skipped = 0
    
    with get_db() as conn:
        for raw in actions:
            scrip_code = str(raw.get("ScripCode", "")).strip()
            purpose = raw.get("Purpose", "").strip()
            ex_date_str = raw.get("ExDate", "").strip()
            
            if not scrip_code or not ex_date_str:
                skipped += 1
                continue
            
            # Map ScripCode to asset_id
            asset = conn.execute("SELECT id FROM assets WHERE bse_code = ?", (scrip_code,)).fetchone()
            if not asset:
                # If not found by bse_code, we can't process
                skipped += 1
                continue
            
            asset_id = asset["id"]
            action_type = classify_bse_action(purpose)
            if not action_type:
                skipped += 1
                continue
                
            # Parse ex_date
            try:
                # BSE format: '2023-12-31T00:00:00' or similar
                ex_date = datetime.fromisoformat(ex_date_str.split("T")[0]).date()
            except:
                skipped += 1
                continue
            
            # Check for existing
            existing = conn.execute("""
                SELECT id FROM corporate_actions 
                WHERE asset_id = ? AND action_type = ? AND ex_date = ? AND source_exchange = 'BSE'
            """, (asset_id, action_type, ex_date.isoformat())).fetchone()
            
            if existing:
                skipped += 1
                continue
            
            # Parse amounts/ratios
            div_amt = 0.0
            ratio_num = 0.0
            ratio_den = 1.0
            
            if action_type == "DIVIDEND":
                div_amt = parse_bse_dividend_amount(purpose)
            elif action_type in ("SPLIT", "BONUS"):
                ratio_num, ratio_den = parse_bse_bonus_ratio(purpose)
            
            # Note: For BSE, we don't always have the prev_close to calculate the factor immediately
            # We'll set a placeholder or fetch it if needed. 
            # In Artha, we'll let adjust_prices.py handle the factor restatements if they are complex.
            from pipelines.corporate_actions import calculate_adjustment_factor
            
            # Fetch prev_close for factor calculation
            prev_row = conn.execute("""
                SELECT close FROM daily_prices 
                WHERE asset_id = ? AND date < ? 
                ORDER BY date DESC LIMIT 1
            """, (asset_id, ex_date.isoformat())).fetchone()
            prev_close = float(prev_row["close"]) if prev_row else 0.0
            
            factor = calculate_adjustment_factor(
                action_type=action_type,
                ratio_num=ratio_num,
                ratio_den=ratio_den,
                dividend_amount=div_amt,
                prev_close=prev_close
            )
            
            conn.execute("""
                INSERT INTO corporate_actions (
                    id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                    dividend_amount, adjustment_factor, source_exchange, raw_announcement
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'BSE', ?)
            """, (
                generate_id(), asset_id, action_type, ex_date.isoformat(),
                ratio_num, ratio_den, div_amt, factor, json.dumps(raw)
            ))
            inserted += 1
            
    logger.info(f"[BSE_CORP_ACTIONS] ✅ Done. {inserted} inserted, {skipped} skipped")
    return inserted, skipped
