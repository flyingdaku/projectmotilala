"""
NSE Fundamentals Pipeline.
Fetches quarterly financial results via hidden top-corp-info API.
"""
import json
import logging
import time
from datetime import date, datetime
from typing import Optional, List, Dict

import requests

from core.db import get_db, generate_id
from utils.storage import raw_file_exists, save_raw_file, load_raw_file

logger = logging.getLogger(__name__)

NSE_BASE_URL = "https://www.nseindia.com"
NSE_CORP_INFO_URL = "https://www.nseindia.com/api/top-corp-info?symbol={symbol}&market=equities"

NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://www.nseindia.com/",
}

MAX_RETRIES = 5
RETRY_DELAY = 10

def _create_nse_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(NSE_HEADERS)
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(NSE_BASE_URL, timeout=15)
            resp.raise_for_status()
            return session
        except Exception:
            if attempt < MAX_RETRIES: time.sleep(RETRY_DELAY)
    raise RuntimeError("Could not establish NSE session")

def _safe_float(val) -> Optional[float]:
    if val is None: return None
    try:
        return float(str(val).replace(",", "").strip())
    except (ValueError, TypeError):
        return None

def fetch_nse_financial_results(symbol: str) -> List[Dict]:
    url = NSE_CORP_INFO_URL.format(symbol=symbol)
    session = _create_nse_session()
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(url, timeout=20)
            resp.raise_for_status()
            data = resp.json()
            # The API returns a dict with 'financial_results' key
            return data.get("financial_results", [])
        except Exception as e:
            logger.warning(f"NSE fetch failed for {symbol} (attempt {attempt}): {e}")
            if attempt < MAX_RETRIES:
                try: session = _create_nse_session()
                except: pass
                time.sleep(RETRY_DELAY)
    return []

def process_nse_fundamentals(asset_id: str, results: List[Dict]):
    with get_db() as conn:
        for row in results:
            period_end = row.get("period_end")
            if not period_end: continue
            
            # Convert DD-Mon-YYYY to ISO
            try:
                period_date = datetime.strptime(period_end, "%d-%b-%Y").strftime("%Y-%m-%d")
            except:
                continue

            is_cons = 1 if "CONSOLIDATED" in str(row.get("is_consolidated", "")).upper() else 0
            
            # Upsert into nse_fundamentals
            conn.execute("""
                INSERT OR REPLACE INTO nse_fundamentals (
                    id, asset_id, period_end_date, is_consolidated,
                    revenue, operating_profit, interest, pbt, tax, pat, eps, raw_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                generate_id(), asset_id, period_date, is_cons,
                _safe_float(row.get("income_from_operations")),
                _safe_float(row.get("operating_profit")),
                _safe_float(row.get("interest_expense")),
                _safe_float(row.get("profit_before_tax")),
                _safe_float(row.get("tax_expense")),
                _safe_float(row.get("net_profit")),
                _safe_float(row.get("eps_basic")),
                json.dumps(row)
            ))

def run_nse_fundamentals(trade_date: date):
    logger.info(f"[NSE_FUNDAMENTALS] Starting fetch for updated assets on {trade_date}")
    with get_db() as conn:
        # Fetch all assets that were updated today (or recently)
        assets = conn.execute("SELECT id, nse_symbol FROM assets WHERE nse_listed = 1 AND nse_symbol IS NOT NULL").fetchall()
        
    for asset in assets:
        results = fetch_nse_financial_results(asset["nse_symbol"])
        if results:
            process_nse_fundamentals(asset["id"], results)
            logger.info(f"[NSE_FUNDAMENTALS] Processed {len(results)} rows for {asset['nse_symbol']}")
        time.sleep(1) # Polite delay
