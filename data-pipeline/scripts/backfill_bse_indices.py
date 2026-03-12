#!/usr/bin/env python3
import os
import sys
import json
import logging
import argparse
from datetime import datetime, date
from pathlib import Path
import requests
import concurrent.futures

sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import get_connection, generate_id
from utils.calendar import get_trading_dates_in_range

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

# Headers needed for bseindices.com
HEADERS = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

def resolve_asset(conn, name: str) -> str:
    """Find or create asset."""
    # Ensure it's a valid string mapping, not numeric since some ids match
    asset = conn.execute(
        "SELECT id FROM assets WHERE name = ? AND asset_class = 'INDEX'",
        (name,)
    ).fetchone()
    
    if asset:
        return asset['id']
        
    asset_id = generate_id()
    conn.execute(
        "INSERT INTO assets (id, name, asset_class, is_active) VALUES (?, ?, 'INDEX', 1)",
        (asset_id, name)
    )
    conn.commit()
    return asset_id

def fetch_bse_index_data(idx_id: int, start_date: str, end_date: str) -> tuple[str, list]:
    """Fetch index data for a specific BSE index ID."""
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx_id}&flag=1&sector=&seriesid=DT&frd={start_date}&tod={end_date}"
    try:
        res = requests.get(url, headers=HEADERS, timeout=10)
        res.raise_for_status()
        
        parts = res.text.strip('"').split('#@#')
        if len(parts) < 2:
            return None, []
            
        # Get metadata to find name
        meta_part = parts[0]
        name = ""
        if meta_part:
            try:
                meta = json.loads(meta_part.replace('\\"', '"'))
                if meta and len(meta) > 0:
                    name = meta[0].get('Scrip', '')
            except:
                pass
                
        # Parse data
        data_part = parts[1]
        data = json.loads(data_part.replace('\\"', '"'))
        return name, data
        
    except Exception as e:
        logger.warning(f"Failed to fetch BSE index {idx_id}: {e}")
        return None, []

def process_bse_index(idx_id: int, start_date_str: str, end_date_str: str):
    """Fetch and store data for a single index."""
    name, data = fetch_bse_index_data(idx_id, start_date_str, end_date_str)
    
    if not name or not data:
        return name, 0
        
    # Standardize names
    if not name.startswith("BSE "):
        if name in ["MIDCAP", "SMLCAP", "ALLCAP", "LRGCAP"]:
            name = "BSE " + name
            
    with get_connection() as conn:
        asset_id = resolve_asset(conn, name)
        
        inserted = 0
        batch = []
        for row in data:
            # Date format: Mon Mar 02 2026 00:00:00
            try:
                d_str = row['date']
                # Parse "Mon Mar 02 2026 00:00:00"
                dt = datetime.strptime(d_str, "%a %b %d %Y %H:%M:%S")
                dt_iso = dt.strftime("%Y-%m-%d")
                
                # DT gives us daily closing values (Total Return usually, or daily index value)
                # Depending on the index, it might be PR or TR but BSE provides them as one series generally
                # BSE API provides a single value in `value` or `value1`
                val = float(row.get('value', row.get('value1', 0)))
                
                if val > 0:
                    batch.append((
                        asset_id, dt_iso, val, val, val, val,
                        0, 'BSE'
                    ))
            except Exception as e:
                continue
                
            if len(batch) >= 1000:
                conn.executemany('''
                    INSERT OR REPLACE INTO daily_prices
                    (asset_id, date, open, high, low, close, volume, source_exchange)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', batch)
                inserted += len(batch)
                batch = []
                
        if batch:
            conn.executemany('''
                INSERT OR REPLACE INTO daily_prices
                (asset_id, date, open, high, low, close, volume, source_exchange)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', batch)
            inserted += len(batch)
            
        conn.commit()
        
        # Check if we should log to pipeline runs
        if inserted > 0:
            logger.info(f"✅ {name} [{idx_id}]: {inserted} rows")
            
        return name, inserted

def main():
    parser = argparse.ArgumentParser(description="Backfill BSE Indices")
    parser.add_argument("--start", default="2000-01-01", help="Start date (YYYY-MM-DD)")
    parser.add_argument("--end", default=date.today().isoformat(), help="End date (YYYY-MM-DD)")
    parser.add_argument("--workers", type=int, default=5, help="Number of concurrent workers")
    args = parser.parse_args()
    
    start_str = args.start.replace("-", "")
    end_str = args.end.replace("-", "")
    
    logger.info(f"Backfilling BSE indices from {args.start} to {args.end}")
    
    # Load mapped indices
    try:
        with open('bse_indices_list.json', 'r') as f:
            indices = json.load(f)
    except FileNotFoundError:
        logger.error("bse_indices_list.json not found! Please run the mapper first.")
        return
        
    logger.info(f"Found {len(indices)} indices to fetch")
    
    total_inserted = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(process_bse_index, idx['id'], start_str, end_str): idx['name']
            for idx in indices
        }
        
        for future in concurrent.futures.as_completed(futures):
            name, inserted = future.result()
            total_inserted += inserted
            
    logger.info(f"\nDone. {total_inserted:,} total rows written across {len(indices)} BSE indices.")
    
    # After backfill, update the index_metadata table using manage_index_metadata.py
    logger.info("Updating index_metadata table...")
    os.system("python3 scripts/manage_index_metadata.py refresh")

if __name__ == "__main__":
    main()
