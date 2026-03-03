import logging
import sys
from datetime import date, timedelta
from pipelines.nse_corporate_actions import run_corporate_actions_pipeline

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("nse_ca_backfill.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

def run_ca_backfill():
    # NSE API works best in chunks. 
    start_date = date(2000, 1, 1)
    end_date = date(2019, 12, 31)
    
    current = start_date
    chunk_days = 365 # One year chunks should be fine for NSE CA JSON API
    
    while current <= end_date:
        chunk_end = min(current + timedelta(days=chunk_days - 1), end_date)
        logger.info(f"=== PROCESSING NSE CA: {current} to {chunk_end} ===")
        try:
            run_corporate_actions_pipeline(current, chunk_end)
        except Exception as e:
            logger.error(f"Failed chunk {current}-{chunk_end}: {e}")
        
        current = chunk_end + timedelta(days=1)

if __name__ == "__main__":
    run_ca_backfill()
