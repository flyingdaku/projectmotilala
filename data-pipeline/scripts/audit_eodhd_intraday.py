import sys
import os
import time
from datetime import datetime, timedelta, timezone, date
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sources.eodhd.client import EODHDClient
from utils.storage import raw_file_exists

def run_audit():
    print("Starting sequential EODHD Intraday backfill/audit...")
    client = EODHDClient()
    
    # Intraday for NSE is available from Oct 2020.
    start_date = date(2020, 10, 1)
    end_date = date.today()
    
    # We need the symbol list to iterate over
    # We will use the latest downloaded symbol list for NSE
    master_dir = Path(__file__).parent.parent / "raw_data" / "EODHD" / "master"
    latest_master = None
    if master_dir.exists():
        files = list(master_dir.rglob("symlist_NSE_active_*.json"))
        if files:
            latest_master = max(files, key=lambda f: f.name)
            
    if not latest_master:
        print("Fetching latest active symbols for NSE...")
        symbols_data = client.get_exchange_symbols("NSE", include_delisted=False)
    else:
        import json
        with open(latest_master, 'r') as f:
            symbols_data = json.load(f)
            
    # Also fetch delisted
    delisted_files = []
    if master_dir.exists():
        delisted_files = list(master_dir.rglob("symlist_NSE_delisted_*.json"))
    
    if delisted_files:
        latest_delisted = max(delisted_files, key=lambda f: f.name)
        with open(latest_delisted, 'r') as f:
            delisted_data = json.load(f)
            symbols_data.extend(delisted_data)
            
    # Get unique codes
    codes = sorted(list(set([s.get("Code") for s in symbols_data if s.get("Code")])))
    print(f"Total symbols to audit: {len(codes)}")
    
    missing_count = 0
    fetched_count = 0
    
    # EODHD Intraday allows fetching 120 days of 1h/5m data at once (Unix timestamps).
    # We will fetch 100-day chunks per ticker
    
    for code in codes:
        print(f"\nAuditing Intraday for {code}.NSE...")
        current_end = datetime.combine(end_date, datetime.min.time(), tzinfo=timezone.utc)
        start_dt = datetime.combine(start_date, datetime.min.time(), tzinfo=timezone.utc)
        
        while current_end > start_dt:
            current_start = max(current_end - timedelta(days=100), start_dt)
            
            # Use interval='5m' as default
            from_ts = int(current_start.timestamp())
            to_ts = int(current_end.timestamp())
            cache_key = f"intraday_{code}_NSE_5m_{from_ts}_{to_ts}.json"
            
            # We use current_start.date() as the cache_date bucket
            if not raw_file_exists("EODHD/intraday", current_start.date(), cache_key):
                print(f"  Missing 5m data for {code} from {current_start.date()} to {current_end.date()}. Fetching...")
                missing_count += 1
                try:
                    data = client.get_intraday(code, "NSE", current_start, current_end, "5m")
                    if data:
                        fetched_count += 1
                    else:
                        print(f"    -> No data returned")
                except Exception as e:
                    print(f"    -> Error: {e}")
                    
            current_end = current_start
            
    print(f"\nIntraday Audit complete! Missing chunks: {missing_count}. Fetched: {fetched_count}.")

if __name__ == "__main__":
    run_audit()
