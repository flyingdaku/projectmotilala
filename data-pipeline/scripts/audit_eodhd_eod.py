import sys
import os
from datetime import date, timedelta
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sources.eodhd.client import EODHDClient, INDIAN_EXCHANGES_ALL
from utils.storage import raw_file_exists

def run_audit():
    print("Starting sequential EODHD EOD bulk data backfill...")
    client = EODHDClient()
    
    # EODHD historical data generally goes back to ~2000 for some symbols
    start_date = date(2000, 1, 1)
    end_date = date.today()
    
    current = end_date
    missing_count = 0
    fetched_count = 0
    
    # Iterate backwards so we get recent data first
    while current >= start_date:
        if current.weekday() < 5:  # Monday-Friday only
            for exchange in INDIAN_EXCHANGES_ALL: # Now only ["NSE"]
                cache_key = f"bulk_eod_{exchange}_{current.isoformat()}.json"
                
                # We check raw_file_exists. Note that client._get will automatically
                # save it if we call get_bulk_eod and it's successful.
                if not raw_file_exists("EODHD/eod", current, cache_key):
                    missing_count += 1
                    print(f"Missing EOD for {exchange} on {current}. Fetching...", flush=True)
                    try:
                        data = client.get_bulk_eod(exchange, current)
                        if data:
                            fetched_count += 1
                    except Exception as e:
                        print(f"  -> Error fetching {current}: {e}", flush=True)
        current -= timedelta(days=1)
        
    print(f"\nEOD Audit complete! Missing checked: {missing_count}. Successfully fetched: {fetched_count}.")

if __name__ == "__main__":
    run_audit()
