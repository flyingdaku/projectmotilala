import sys
import logging
from datetime import date
from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def main():
    print("Starting BSE CA backfill from 2000-01-01 to today...")
    from_date = date(2000, 1, 1)
    to_date = date.today()
    run_bse_corporate_actions_pipeline(from_date, to_date)
    print("Done BSE CA backfill.")

if __name__ == "__main__":
    main()
