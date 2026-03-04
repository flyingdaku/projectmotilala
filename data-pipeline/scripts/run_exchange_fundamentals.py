import logging
from datetime import date
from pipelines.nse_fundamentals import run_nse_fundamentals
from pipelines.bse_fundamentals import run_bse_fundamentals

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

def main():
    today = date.today()
    run_nse_fundamentals(today)
    run_bse_fundamentals(today)

if __name__ == "__main__":
    main()
