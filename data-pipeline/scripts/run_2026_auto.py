import os
import sys
from datetime import date, timedelta
import logging

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from utils.calendar import is_trading_day
from run_pipeline import run

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("run_2026")

start_date = date(2026, 1, 1)
end_date = date.today()

curr_date = start_date
while curr_date <= end_date:
    if is_trading_day(curr_date):
        logger.info(f"=== Running pipeline for {curr_date} ===")
        # Only run metrics on the final day to save time (30s per day)
        try:
            run(curr_date)
        except RuntimeError as e:
            if "Corporate actions pipeline failed" in str(e):
                logger.warning(f"⚠️ Resuming {curr_date} with --skip-corp-actions due to error: {e}")
                run(curr_date, skip_corp_actions=True)
            else:
                logger.error(f"Fatal error on {curr_date}: {e}")
                break
    curr_date += timedelta(days=1)
