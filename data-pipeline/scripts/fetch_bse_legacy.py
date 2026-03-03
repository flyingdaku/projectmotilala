import requests
import json
import logging
from datetime import date, datetime
import argparse
from pathlib import Path
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s [%(name)s] %(message)s')
logger = logging.getLogger('bse_legacy')

BSE_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://www.bseindia.com/markets/equity/EQReports/StockPrcHistori.html?flag=0',
}

def get_session():
    s = requests.Session()
    s.headers.update(BSE_HEADERS)
    return s

def fetch_scrip_history(scode, start_year, end_year):
    """
    Fetches historical data for a specific scrip code across the given year range
    using the BSE StockReach_HistData endpoint.
    Returns: list of dicts with price data.
    """
    s = get_session()
    # API requires format dd/mm/yyyy
    fromdate = f"01/01/{start_year}"
    todate = f"31/12/{end_year}"
    url = f"https://api.bseindia.com/BseWebAPI/api/StockReach_HistData/w?&fromdate={fromdate}&todate={todate}&scripcode={scode}"
    
    for attempt in range(3):
        try:
            r = s.get(url, timeout=15)
            if r.status_code == 200:
                try:
                    data = r.json()
                    if 'Data' in data:
                        return json.loads(data['Data'])
                except json.JSONDecodeError:
                    if r.text == "":
                        return [] # empty response
                    logger.warning(f"Failed to parse JSON for {scode}: {r.text[:50]}")
            elif r.status_code == 429 or r.status_code == 403:
                time.sleep(2 ** attempt)
                continue
            else:
                logger.error(f"Error {r.status_code} fetching {scode}")
        except Exception as e:
            logger.error(f"Exception fetching {scode}: {e}")
            time.sleep(2 ** attempt)
    return []

def run_legacy_sync(start_year, end_year, max_workers=2):
    """
    To fill gaps, we iterate over all known BSE scrip codes from our database
    and fetch their history, then store it as raw JSON files which a future 
    pipeline step can ingest.
    """
    import sqlite3
    from utils.db import DB_PATH
    
    if not Path(DB_PATH).exists():
        logger.error(f"DB not found at {DB_PATH}")
        return
        
    conn = sqlite3.connect(DB_PATH)
    # Get all active BSE assets
    cursor = conn.execute("SELECT bse_code, name, isin FROM assets WHERE bse_listed = 1 AND bse_code IS NOT NULL AND bse_code != ''")
    assets = cursor.fetchall()
    conn.close()
    
    logger.info(f"Loaded {len(assets)} BSE active assets to backfill from {start_year} to {end_year}")
    
    save_dir = Path(f"raw_data/BSE_LEGACY_SCRIP_RAW/{start_year}_{end_year}")
    save_dir.mkdir(parents=True, exist_ok=True)
    
    def worker(asset):
        bse_code, name, isin = asset
        save_path = save_dir / f"{bse_code}.json"
        if save_path.exists():
            return f"Skipped {bse_code} (exists)"
            
        data = fetch_scrip_history(bse_code, start_year, end_year)
        if data:
            with open(save_path, 'w') as f:
                json.dump({"bse_code": bse_code, "name": name, "isin": isin, "data": data}, f)
            return f"Downloaded {bse_code} ({len(data)} days)"
        return f"No data for {bse_code}"

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(worker, asset): asset for asset in assets}
        for idx, future in enumerate(as_completed(futures)):
            res = future.result()
            if "Downloaded" in res:
                logger.info(f"[{idx+1}/{len(assets)}] {res}")
            elif idx % 100 == 0:
                logger.info(f"[{idx+1}/{len(assets)}] Progress... last: {res}")
            time.sleep(0.5) # rate limit protection

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch pre-2007 individual scrip history from BSE")
    parser.add_argument("--start", type=int, default=2000)
    parser.add_argument("--end", type=int, default=2006)
    parser.add_argument("--workers", type=int, default=3)
    args = parser.parse_args()
    
    run_legacy_sync(args.start, args.end, args.workers)
