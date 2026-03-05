"""
Backfill Prices Pipeline — Historical price data population.

Orchestrates NSE + BSE bhavcopy backfill across a date range with
parallel downloads and sequential DB writes.

Usage:
  python -m pipelines.backfill.prices                                       # Full backfill 2000 → yesterday
  python -m pipelines.backfill.prices --from 2020-01-01                     # From specific date
  python -m pipelines.backfill.prices --from 2020-01-01 --to 2023-12-31    # Date range
  python -m pipelines.backfill.prices --nse-only                            # NSE only
  python -m pipelines.backfill.prices --workers 5                           # 5 parallel downloaders
"""
from __future__ import annotations

import argparse
import logging
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from utils.calendar import ensure_holiday_cache, get_trading_dates_in_range
from utils.db import execute_one

logger = logging.getLogger(__name__)

DEFAULT_START = date(2000, 1, 1)
DEFAULT_WORKERS = 3
REQUEST_DELAY = 0.5


def _run_single_nse(trade_date: date, skip_existing: bool):
    from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline

    if skip_existing:
        existing = execute_one(
            "SELECT 1 FROM pipeline_runs WHERE source = 'NSE_BHAVCOPY' AND run_date = ? AND status = 'SUCCESS'",
            (trade_date.isoformat(),),
        )
        if existing:
            return trade_date, None, "skipped"

    try:
        run_nse_bhavcopy_pipeline(trade_date)
        time.sleep(REQUEST_DELAY)
        return trade_date, True, None
    except Exception as e:
        return trade_date, False, str(e)


def _run_single_bse(trade_date: date, skip_existing: bool):
    from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline

    if skip_existing:
        existing = execute_one(
            "SELECT 1 FROM pipeline_runs WHERE source = 'BSE_BHAVCOPY' AND run_date = ? AND status = 'SUCCESS'",
            (trade_date.isoformat(),),
        )
        if existing:
            return trade_date, None, "skipped"

    try:
        run_bse_bhavcopy_pipeline(trade_date)
        time.sleep(REQUEST_DELAY)
        return trade_date, True, None
    except Exception as e:
        return trade_date, False, str(e)


def backfill_prices(
    start: date = DEFAULT_START,
    end: date = None,
    workers: int = DEFAULT_WORKERS,
    skip_existing: bool = True,
    nse_only: bool = False,
    bse_only: bool = False,
):
    if end is None:
        end = date.today() - timedelta(days=1)

    ensure_holiday_cache()
    trading_dates = get_trading_dates_in_range(start, end)
    logger.info("Backfill: %d trading days, %s → %s, %d workers", len(trading_dates), start, end, workers)

    # NSE
    if not bse_only:
        logger.info("── NSE Backfill ──")
        ok = fail = skip = 0
        with ThreadPoolExecutor(max_workers=workers) as pool:
            futures = {pool.submit(_run_single_nse, td, skip_existing): td for td in trading_dates}
            for future in as_completed(futures):
                td, success, err = future.result()
                if err == "skipped":
                    skip += 1
                elif success:
                    ok += 1
                else:
                    fail += 1
                    logger.warning("NSE %s failed: %s", td, err)
        logger.info("NSE: %d ok / %d fail / %d skipped", ok, fail, skip)

    # BSE
    if not nse_only:
        logger.info("── BSE Backfill ──")
        ok = fail = skip = 0
        with ThreadPoolExecutor(max_workers=workers) as pool:
            futures = {pool.submit(_run_single_bse, td, skip_existing): td for td in trading_dates}
            for future in as_completed(futures):
                td, success, err = future.result()
                if err == "skipped":
                    skip += 1
                elif success:
                    ok += 1
                else:
                    fail += 1
        logger.info("BSE: %d ok / %d fail / %d skipped", ok, fail, skip)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    parser = argparse.ArgumentParser()
    parser.add_argument("--from", dest="start", default="2000-01-01")
    parser.add_argument("--to", dest="end", default=None)
    parser.add_argument("--workers", type=int, default=DEFAULT_WORKERS)
    parser.add_argument("--nse-only", action="store_true")
    parser.add_argument("--bse-only", action="store_true")
    parser.add_argument("--no-skip", action="store_true")
    args = parser.parse_args()

    backfill_prices(
        start=date.fromisoformat(args.start),
        end=date.fromisoformat(args.end) if args.end else None,
        workers=args.workers,
        skip_existing=not args.no_skip,
        nse_only=args.nse_only,
        bse_only=args.bse_only,
    )
