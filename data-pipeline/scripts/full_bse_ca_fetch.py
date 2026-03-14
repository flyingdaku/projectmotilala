import logging
from datetime import date
from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def main():
    print("Fetching BSE Corporate Actions completely from 2000-01-01 to today...")
    # The pipeline script handles the caching, so let's just trigger it.
    run_bse_corporate_actions_pipeline(date(2000, 1, 1), date.today())
    print("Done fetching BSE CAs.")

if __name__ == "__main__":
    main()
