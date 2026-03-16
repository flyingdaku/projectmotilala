import sys
import os
import time
from datetime import date, timedelta
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sources.eodhd.client import EODHDClient, INDIAN_EXCHANGES_ALL
from utils.storage import raw_file_exists

def run_audit():
    print("Starting sequential EODHD Corporate Actions (Splits & Dividends) bulk data backfill...")
    client = EODHDClient()
    
    start_date = date(2000, 1, 1)
    end_date = date.today()
    
    current = end_date
    missing_count = 0
    fetched_count = 0
    
    # Iterate backwards so we get recent data first
    while current >= start_date:
        if current.weekday() < 5:  # Monday-Friday only
            for exchange in INDIAN_EXCHANGES_ALL: # Now only ["NSE"]
                # 1. Splits
                splits_key = f"bulk_splits_{exchange}_{current.isoformat()}.json"
                if not raw_file_exists("EODHD/splits", current, splits_key):
                    missing_count += 1
                    print(f"Missing Splits for {exchange} on {current}. Fetching...", flush=True)
                    try:
                        data = client.get_bulk_splits(exchange, current)
                        if data:
                            fetched_count += 1
                    except Exception as e:
                        print(f"  -> Error fetching splits {current}: {e}", flush=True)
                        
                # 2. Dividends
                divs_key = f"bulk_divs_{exchange}_{current.isoformat()}.json"
                if not raw_file_exists("EODHD/dividends", current, divs_key):
                    missing_count += 1
                    print(f"Missing Dividends for {exchange} on {current}. Fetching...", flush=True)
                    try:
                        data = client.get_bulk_dividends(exchange, current)
                        if data:
                            fetched_count += 1
                    except Exception as e:
                        print(f"  -> Error fetching dividends {current}: {e}", flush=True)

        current -= timedelta(days=1)
        
    print(f"\nCA Audit complete! Missing checked: {missing_count}. Successfully fetched: {fetched_count}.")

if __name__ == "__main__":
    run_audit()
