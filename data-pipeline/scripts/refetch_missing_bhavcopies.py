
import logging
import sys
from datetime import date
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline')

from core.db import get_db
from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline
from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("refetcher")

def get_missing_dates():
    with get_db() as conn:
        nse_dates = {r["date"] for r in conn.execute("SELECT DISTINCT date FROM daily_prices WHERE source_exchange = 'NSE' AND date >= '2020-01-01'").fetchall()}
        bse_dates = {r["date"] for r in conn.execute("SELECT DISTINCT date FROM daily_prices WHERE source_exchange = 'BSE' AND date >= '2020-01-01'").fetchall()}
    
    nse_missing = sorted(list(bse_dates - nse_dates))
    bse_missing = sorted(list(nse_dates - bse_dates))
    
    return nse_missing, bse_missing

def main():
    nse_missing, bse_missing = get_missing_dates()
    
    logger.info(f"NSE missing dates: {len(nse_missing)}")
    logger.info(f"BSE missing dates: {len(bse_missing)}")
    
    # 1. Refetch NSE missing dates
    for d_str in nse_missing:
        d = date.fromisoformat(d_str)
        logger.info(f"Refetching NSE for {d}...")
        try:
            run_nse_bhavcopy_pipeline(d)
        except Exception as e:
            logger.error(f"Failed to refetch NSE for {d}: {e}")

    # 2. Refetch BSE missing dates
    for d_str in bse_missing:
        d = date.fromisoformat(d_str)
        logger.info(f"Refetching BSE for {d}...")
        try:
            run_bse_bhavcopy_pipeline(d)
        except Exception as e:
            logger.error(f"Failed to refetch BSE for {d}: {e}")

if __name__ == "__main__":
    main()
