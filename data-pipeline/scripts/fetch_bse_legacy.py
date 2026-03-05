import requests
import json
import logging
from datetime import datetime
import argparse
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import sqlite3

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s [%(name)s] %(message)s')
logger = logging.getLogger('bse_legacy')

BSE_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Origin': 'https://www.bseindia.com',
    'Referer': 'https://www.bseindia.com/markets/equity/EQReports/StockPrcHistori.html?flag=0',
}

def get_session():
    s = requests.Session()
    s.headers.update(BSE_HEADERS)
    # Prime cookies
    try:
        s.get("https://www.bseindia.com/", timeout=5)
    except:
        pass
    return s

def fetch_and_insert_legacy(db_path, scode, asset_id, start_year, end_year):
    s = get_session()
    # MonthDate must be formatted as DD%2FMM%2FYYYY in URL query
    MonthDate = f"01/01/{start_year}".replace('/', '%2F')
    YearDate = f"31/12/{end_year}".replace('/', '%2F')
    
    url = f"https://api.bseindia.com/BseIndiaAPI/api/StockpricesearchData/w?MonthDate={MonthDate}&Scode={scode}&Seg=C&YearDate={YearDate}&pageType=0&rbType=D"
    
    for attempt in range(3):
        try:
            r = s.get(url, timeout=10)
            if r.status_code == 200:
                if 'json' in r.headers.get('content-type', '').lower():
                    data = r.json()
                    
                    if not data or 'StockData' not in data:
                        return 0
                        
                    entries = data['StockData']
                    if not entries:
                        return 0
                        
                    records_to_insert = []
                    for row in entries:
                        # row['Dates'] format: '15/12/04' (DD/MM/YY)
                        try:
                            # parse '15/12/04' to '2004-12-15'
                            parsed_date = datetime.strptime(row['Dates'], "%d/%m/%y").strftime("%Y-%m-%d")
                        except ValueError:
                            # try another format just in case
                            try:
                                parsed_date = datetime.strptime(row['Dates'], "%d/%m/%Y").strftime("%Y-%m-%d")
                            except:
                                continue
                        
                        try:
                            op = float(str(row.get('qe_open', 0)).replace(',', ''))
                            hi = float(str(row.get('qe_high', 0)).replace(',', ''))
                            lo = float(str(row.get('qe_low', 0)).replace(',', ''))
                            cl = float(str(row.get('qe_close', 0)).replace(',', ''))
                            vol = int(str(row.get('no_of_shrs', 0)).replace(',', '').split('.')[0])
                            trd = int(str(row.get('no_trades', 0)).replace(',', '').split('.')[0])
                        except Exception as e:
                            continue
                            
                        records_to_insert.append((
                            asset_id,
                            parsed_date,
                            op,
                            hi,
                            lo,
                            cl,
                            vol,
                            trd,
                            'BSE'
                        ))
                    
                    if records_to_insert:
                        conn = sqlite3.connect(db_path)
                        # We use INSERT OR IGNORE to not overwrite if somehow it exists
                        conn.executemany('''
                            INSERT OR IGNORE INTO daily_prices 
                            (asset_id, date, open, high, low, close, volume, trades, source_exchange)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ''', records_to_insert)
                        conn.commit()
                        conn.close()
                    
                    return len(records_to_insert)
                else:
                    logger.warning(f"Failed to fetch JSON for {scode}. Got HTML instead.")
                    time.sleep(2)
            else:
                time.sleep(2)
        except Exception as e:
            time.sleep(2)
            
    return 0

def run_legacy_sync(start_year, end_year, max_workers=2):
    import sys
    sys.path.append('.')
    from core.db import DB_PATH
    import os
    
    if not os.path.exists(DB_PATH):
        logger.error(f"DB not found at {DB_PATH}")
        return
        
    conn = sqlite3.connect(DB_PATH)
    # Get all active BSE assets
    cursor = conn.execute("SELECT id, bse_code FROM assets WHERE bse_code IS NOT NULL AND bse_code != ''")
    assets = cursor.fetchall()  # [(id, bse_code), ...]
    conn.close()
    
    logger.info(f"Loaded {len(assets)} BSE active assets to backfill from {start_year} to {end_year}")
    
    total_inserted = 0
    def worker(asset):
        asset_id, bse_code = asset
        count = fetch_and_insert_legacy(DB_PATH, bse_code, asset_id, start_year, end_year)
        return bse_code, count

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(worker, asset): asset for asset in assets}
        for idx, future in enumerate(as_completed(futures)):
            bse_code, count = future.result()
            if count > 0:
                logger.info(f"[{idx+1}/{len(assets)}] Inserted {count} records for {bse_code}")
                total_inserted += count
            elif idx % 200 == 0:
                logger.info(f"[{idx+1}/{len(assets)}] Progress... Last checked {bse_code}")
                
            time.sleep(0.5) # Protect against getting blocked by BSE WAF

    logger.info(f"Completed! Total historic BSE records inserted cleanly: {total_inserted}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch pre-2006 individual scrip history from BSE directly into DB")
    parser.add_argument("--start", type=int, default=2000)
    parser.add_argument("--end", type=int, default=2005)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()
    
    run_legacy_sync(args.start, args.end, args.workers)
