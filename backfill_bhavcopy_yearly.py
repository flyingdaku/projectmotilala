import logging
import sys
import os
from datetime import date, timedelta
from pipelines.backfill import backfill_nse, backfill_bse
from utils.calendar import ensure_holiday_cache

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("bhavcopy_backfill.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

def run_yearly_backfill():
    # We already have 2020-2026.
    # Now doing 2000-2019.
    start_year = 2000
    end_year = 2019
    
    ensure_holiday_cache(force_refresh=True)
    
    for year in range(start_year, end_year + 1):
        s = date(year, 1, 1)
        e = date(year, 12, 31)
        
        logger.info(f"=== BACKFILLING YEAR {year} ===")
        
        # NSE Bhavcopy
        logger.info(f"Starting NSE Bhavcopy for {year}")
        backfill_nse(s, e, skip_existing=True)
        
        # BSE Bhavcopy
        logger.info(f"Starting BSE Bhavcopy for {year}")
        backfill_bse(s, e, skip_existing=True)
        
        # Polite pause between years
        import time
        time.sleep(2)

if __name__ == "__main__":
    run_yearly_backfill()
