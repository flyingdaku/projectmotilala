import logging
import sys
from datetime import date
from pipelines.nse_corporate_actions import fetch_nse_corporate_actions

logging.basicConfig(level=logging.INFO)

def test_fetch():
    s = date(2015, 1, 1)
    e = date(2015, 12, 31)
    print(f"Testing NSE fetch for {s} to {e}...")
    try:
        data = fetch_nse_corporate_actions(s, e)
        print(f"Received {len(data)} raw records from NSE.")
        if data:
            print("Sample record:", data[0])
    except Exception as ex:
        print(f"Fetch failed: {ex}")

if __name__ == "__main__":
    test_fetch()
