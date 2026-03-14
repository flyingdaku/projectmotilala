import sys
import logging
from datetime import date
from pipelines.golden_ca_pipeline import run_golden_ca_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def main():
    print("Re-running Golden CA merge from 2020-01-01 to today...")
    from_date = date(2020, 1, 1)
    to_date = date.today()
    run_golden_ca_pipeline(from_date, to_date)
    print("Done Golden CA merge.")

if __name__ == "__main__":
    main()
