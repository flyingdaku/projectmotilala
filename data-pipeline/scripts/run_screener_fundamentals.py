
import logging
import sys
from datetime import date
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline')

from pipelines.screener_fundamentals import run_screener_fundamentals

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

def main():
    logger = logging.getLogger("screener_runner")
    logger.info("Starting screener fundamentals scrape")
    run_screener_fundamentals(date.today())
    logger.info("Done.")

if __name__ == "__main__":
    main()
