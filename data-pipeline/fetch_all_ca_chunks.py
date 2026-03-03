import sys
from datetime import date, timedelta
import logging

from pipelines.nse_corporate_actions import run_corporate_actions_pipeline
from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

def chunked_fetch(start: date, end: date):
    current = start
    while current <= end:
        chunk_end = current + timedelta(days=29)
        if chunk_end > end:
            chunk_end = end
            
        print(f"--- Fetching CAs for {current} to {chunk_end} ---")
        try:
            run_corporate_actions_pipeline(current, chunk_end)
        except Exception as e:
            print(f"FAILED NSE CA {current}-{chunk_end}: {e}")
            
        try:
            run_bse_corporate_actions_pipeline(current, chunk_end)
        except Exception as e:
            print(f"FAILED BSE CA {current}-{chunk_end}: {e}")
            
        current = chunk_end + timedelta(days=1)

if __name__ == "__main__":
    if len(sys.argv) == 3:
        start_date = date.fromisoformat(sys.argv[1])
        end_date = date.fromisoformat(sys.argv[2])
    else:
        start_date = date(2024, 1, 1)
        end_date = date(2024, 12, 31)
    chunked_fetch(start_date, end_date)
