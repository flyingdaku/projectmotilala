from __future__ import annotations

import argparse
import logging
import sys
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from pipelines.morningstar_funds import run_morningstar_funds_pipeline


def month_steps(start: date, end: date):
    current = date(start.year, start.month, 1)
    while current <= end:
        yield current
        if current.month == 12:
            current = date(current.year + 1, 1, 1)
        else:
            current = date(current.year, current.month + 1, 1)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    parser = argparse.ArgumentParser(description="Refresh Morningstar mutual-fund directory/details over a date range")
    parser.add_argument("--from", dest="start_date", default=(date.today() - timedelta(days=30)).isoformat())
    parser.add_argument("--to", dest="end_date", default=date.today().isoformat())
    parser.add_argument("--limit", type=int, default=None)
    args = parser.parse_args()

    start = date.fromisoformat(args.start_date)
    end = date.fromisoformat(args.end_date)
    for crawl_date in month_steps(start, end):
        run_morningstar_funds_pipeline(crawl_date, detail_limit=args.limit)
