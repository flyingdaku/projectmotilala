"""
BSE Fundamentals Pipeline.
Fetches financial results via unofficial BSE WebAPI (XBRL data).
"""
import json
import logging
import time
from datetime import date, datetime
from typing import Optional, List, Dict

import requests

from core.db import get_db, generate_id
from utils.storage import save_raw_file

logger = logging.getLogger(__name__)

BSE_FINANCIAL_API = "https://api.bseindia.com/BseWebAPI/api/FinancialResult/w"

BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://www.bseindia.com/",
}

def _safe_float(val) -> Optional[float]:
    if val is None: return None
    try:
        return float(str(val).replace(",", "").strip())
    except (ValueError, TypeError):
        return None

def fetch_bse_financial_results(scrip_code: str) -> List[Dict]:
    # 1. Try local cache first
    try:
        from pathlib import Path
        cache_dir = Path(__file__).resolve().parent.parent / "raw_data" / "BSE_FUNDAMENTALS"
        cache_path = cache_dir / f"{scrip_code}.json"
        if cache_path.exists() and cache_path.stat().st_size > 100:
            with open(cache_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                return data if isinstance(data, list) else []
    except Exception as e:
        logger.debug(f"BSE cache read failed for {scrip_code}: {e}")

    # 2. Live fetch
    url = f"{BSE_FINANCIAL_API}?scripcode={scrip_code}"
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data if isinstance(data, list) else []
    except Exception as e:
        logger.warning(f"BSE live fetch failed for {scrip_code}: {e}")
        return []

def process_bse_fundamentals(asset_id: str, results: List[Dict]):
    with get_db() as conn:
        for row in results:
            period_end = row.get("PeriodEnd")
            if not period_end: continue
            
            # Usually '2023-12-31T00:00:00'
            try:
                period_date = period_end.split("T")[0]
            except:
                continue

            is_cons = 1 if "CONSOLIDATED" in str(row.get("ConsStand", "")).upper() else 0
            
            # Map BSE fields
            conn.execute("""
                INSERT INTO bse_fundamentals (
                    id, asset_id, period_end_date, is_consolidated,
                    revenue, operating_profit, interest, pbt, tax, pat, eps, raw_json
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (asset_id, period_end_date, is_consolidated) DO UPDATE SET
                  revenue = EXCLUDED.revenue, operating_profit = EXCLUDED.operating_profit,
                  interest = EXCLUDED.interest, pbt = EXCLUDED.pbt, tax = EXCLUDED.tax,
                  pat = EXCLUDED.pat, eps = EXCLUDED.eps, raw_json = EXCLUDED.raw_json
            """, (
                generate_id(), asset_id, period_date, is_cons,
                _safe_float(row.get("NetSales")),
                _safe_float(row.get("OperatingProfit")),
                _safe_float(row.get("Interest")),
                _safe_float(row.get("ProfitBeforeTax")),
                _safe_float(row.get("Tax")),
                _safe_float(row.get("NetProfit")),
                _safe_float(row.get("EPS")),
                json.dumps(row)
            ))

def run_bse_fundamentals(trade_date: date):
    logger.info(f"[BSE_FUNDAMENTALS] Starting fetch for {trade_date}")
    with get_db() as conn:
        assets = conn.execute("SELECT id, bse_code FROM assets WHERE bse_listed = 1 AND bse_code IS NOT NULL").fetchall()
        
    for asset in assets:
        results = fetch_bse_financial_results(asset["bse_code"])
        if results:
            process_bse_fundamentals(asset["id"], results)
            logger.info(f"[BSE_FUNDAMENTALS] Processed {len(results)} rows for BSE:{asset['bse_code']}")
        time.sleep(0.5) # Polite delay
