import sys
import os
from datetime import date, timedelta
from pathlib import Path

# Add core to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from core.db import get_connection

def audit_eod_data():
    print("Auditing EODHD Bulk EOD Data...")
    
    # 1. Find all available dates from raw cache
    cache_dir = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/EODHD/eod")
    cached_dates = set()
    
    if cache_dir.exists():
        for f in cache_dir.rglob("bulk_eod_NSE_*.json"):
            # Extract date from filename: bulk_eod_NSE_YYYY-MM-DD.json
            try:
                date_str = f.name.split('_')[-1].split('.')[0]
                cached_dates.add(date.fromisoformat(date_str))
            except Exception:
                pass
                
    print(f"Found {len(cached_dates)} dates in raw cache.")
    
    if not cached_dates:
        print("No cache found. Starting from scratch.")
        return []
        
    min_date = min(cached_dates)
    max_date = max(cached_dates)
    print(f"Cache range: {min_date} to {max_date}")
    
    # Check for gaps
    current = min_date
    missing = []
    
    while current <= max_date:
        # Skip weekends
        if current.weekday() < 5: 
            if current not in cached_dates:
                missing.append(current)
        current += timedelta(days=1)
        
    print(f"Found {len(missing)} missing weekdays in cache range.")
    
    # 2. Check DB
    with get_connection() as conn:
        db_dates = conn.execute("""
            SELECT DISTINCT date 
            FROM eodhd_daily_prices 
            ORDER BY date
        """).fetchall()
        
    db_date_set = {date.fromisoformat(row[0][:10]) for row in db_dates if row[0]}
    print(f"Found {len(db_date_set)} unique dates in database.")
    
    if db_date_set:
        db_min = min(db_date_set)
        db_max = max(db_date_set)
        print(f"Database range: {db_min} to {db_max}")
    
    return missing

if __name__ == "__main__":
    audit_eod_data()
