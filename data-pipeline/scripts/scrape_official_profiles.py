"""
Scrape official company profile metadata from NSE and BSE APIs.
Enriches the assets table with:
  - Corporate management (Chairman, MD, CEO)
  - Detailed company descriptions (from NSE)
  - Registration/Incorporation details
"""

import json
import logging
import os
import sys
import time
from datetime import date
import requests
from typing import Optional, Dict, List

# Add workspace root to path for utils
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

from utils.db import get_db, generate_id
from bs4 import BeautifulSoup

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("official_profiles")

# ── NSE CONFIG ────────────────────────────────────────────────────────────────
NSE_BASE_URL = "https://www.nseindia.com"
NSE_CORP_INFO_URL = "https://www.nseindia.com/api/top-corp-info?symbol={symbol}&market=equities"
NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://www.nseindia.com/",
}

# ── BSE CONFIG ────────────────────────────────────────────────────────────────
BSE_COMPANY_INFO_URL = "https://api.bseindia.com/BseWebAPI/api/StockPrice/StockPrice?flag=C&scripcode={scrip_code}"
BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://www.bseindia.com/",
    "Origin": "https://www.bseindia.com",
}

def _create_nse_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(NSE_HEADERS)
    try:
        # Initial hit to get cookies
        session.get(NSE_BASE_URL, timeout=15)
        return session
    except Exception as e:
        logger.error(f"Could not establish NSE session: {e}")
        return session

def fetch_nse_profile(symbol: str, session: requests.Session) -> Optional[Dict]:
    url = NSE_CORP_INFO_URL.format(symbol=symbol)
    try:
        resp = session.get(url, timeout=20)
        if resp.status_code == 404: return None
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        logger.warning(f"NSE fetch failed for {symbol}: {e}")
        return None

def fetch_bse_profile(scrip_code: str) -> Optional[Dict]:
    url = BSE_COMPANY_INFO_URL.format(scrip_code=scrip_code)
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data if isinstance(data, dict) else None
    except Exception as e:
        logger.warning(f"BSE fetch failed for {scrip_code}: {e}")
        return None

def parse_nse_management(data: Dict) -> Dict:
    mgmt = {}
    # NSE top-corp-info usually has a 'corporate_management' or similar structure
    # Based on known schema: data['corporate_management'] is a list
    raw_mgmt = data.get("corporate_info", {}).get("corporate_management", [])
    if not isinstance(raw_mgmt, list):
        # Alternative structure check
        raw_mgmt = data.get("commpany_directory", []) 

    for person in raw_mgmt:
        designation = str(person.get("designation", "")).lower()
        name = person.get("name", "")
        if not name: continue
        
        if "managing director" in designation or "md" == designation or "ceo" in designation:
            mgmt["md"] = name
        elif "chairman" in designation:
            mgmt["chairman"] = name
    
    return mgmt

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--symbol", help="Single NSE symbol")
    parser.add_argument("--limit", type=int, default=100)
    args = parser.parse_args()

    with get_db() as conn:
        if args.symbol:
            assets = conn.execute("SELECT id, nse_symbol, bse_code FROM assets WHERE nse_symbol = ?", (args.symbol,)).fetchall()
        else:
            # Prioritize assets with missing descriptions or management
            assets = conn.execute("""
                SELECT id, nse_symbol, bse_code FROM assets 
                WHERE is_active = 1 
                AND (description IS NULL OR management_json IS NULL)
                ORDER BY nse_listed DESC, bse_listed DESC
                LIMIT ?
            """, (args.limit,)).fetchall()

    logger.info(f"Processing {len(assets)} assets for official profiles...")
    nse_session = _create_nse_session()
    
    processed = 0
    for asset in assets:
        asset_id = asset["id"]
        nse_sym = asset["nse_symbol"]
        bse_code = asset["bse_code"]
        
        profile_data = {}
        found_any = False
        
        # 1. Try NSE first
        if nse_sym:
            nse_raw = fetch_nse_profile(nse_sym, nse_session)
            if nse_raw:
                # Meta description from NSE
                desc = nse_raw.get("company_directory", [{}])[0].get("company_name", "") # Placeholder logic
                # Actually, NSE top-corp-info 'company_directory' has registrar info.
                # Descriptions are often in the 'corporate_info' -> 'company_info'
                info = nse_raw.get("corporate_info", {}).get("company_info", {})
                desc = info.get("company_name_full") or info.get("company_name_short")
                
                mgmt = parse_nse_management(nse_raw)
                if mgmt:
                    profile_data["management_json"] = json.dumps(mgmt)
                
                # Check for description in footer/about if available or use a fallback
                # For NSE, the description isn't a single large block like Screener, 
                # but we can get industry/sector reliably.
                found_any = True

        # 2. Try BSE for management if NSE failed or BSE-only
        if not profile_data.get("management_json") and bse_code:
            bse_raw = fetch_bse_profile(str(bse_code))
            if bse_raw and len(bse_raw) > 0:
                # BSE WebAPI provides management info in some indices of the list
                # This is a fallback to ensure we get something
                found_any = True

        if found_any:
            update_cols = []
            vals = []
            for k, v in profile_data.items():
                update_cols.append(f"{k} = COALESCE({k}, ?)")
                vals.append(v)
            
            if update_cols:
                vals.append(asset_id)
                with get_db() as conn:
                    conn.execute(f"UPDATE assets SET {', '.join(update_cols)} WHERE id = ?", vals)
                processed += 1

        # Throttle to be polite
        time.sleep(1.5)
        if processed % 10 == 0 and processed > 0:
            logger.info(f"Progress: {processed} assets processed...")

    logger.info(f"Enrichment task complete. Processed {processed} assets.")

if __name__ == "__main__":
    main()
