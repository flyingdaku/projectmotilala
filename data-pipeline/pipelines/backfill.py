"""
Full Historical Backfill Pipeline.

Downloads and ingests all available historical data from a start date to today.
Handles weekends, holidays, and missing dates gracefully.

Usage:
  python -m pipelines.backfill                          # Full backfill from 2000-01-01
  python -m pipelines.backfill 2020-01-01               # Backfill from specific date
  python -m pipelines.backfill 2020-01-01 2023-12-31    # Specific date range
  python -m pipelines.backfill --nse-only               # NSE only
  python -m pipelines.backfill --resume                 # Skip dates already in DB
"""
import logging
import time
from datetime import date, timedelta

from utils.alerts import send_telegram_alert
from utils.calendar import ensure_holiday_cache, get_trading_dates_in_range
from utils.db import execute_one

logger = logging.getLogger(__name__)

DEFAULT_START_DATE = date(2000, 1, 1)
REQUEST_DELAY_SECONDS = 1.5  # Polite delay between requests to avoid rate limiting


def get_last_ingested_date(source: str) -> date:
    """Return the most recent date we have data for, from pipeline_runs."""
    row = execute_one(
        """SELECT MAX(run_date) as last_date FROM pipeline_runs
           WHERE source = ? AND status = 'SUCCESS'""",
        (source,),
    )
    if row and row["last_date"]:
        return date.fromisoformat(row["last_date"])
    return None


def backfill_nse(start: date, end: date, skip_existing: bool = True):
    """Backfill NSE Bhavcopy for all trading days in [start, end]."""
    from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline

    trading_dates = get_trading_dates_in_range(start, end)
    logger.info(f"NSE backfill: {len(trading_dates)} trading days from {start} to {end}")

    success = 0
    failed = 0
    skipped = 0

    for i, trade_date in enumerate(trading_dates):
        if skip_existing:
            existing = execute_one(
                """SELECT 1 FROM pipeline_runs
                   WHERE source = 'NSE_BHAVCOPY' AND run_date = ? AND status = 'SUCCESS'""",
                (trade_date.isoformat(),),
            )
            if existing:
                skipped += 1
                continue

        try:
            run_nse_bhavcopy_pipeline(trade_date)
            success += 1
            logger.info(f"NSE backfill [{i+1}/{len(trading_dates)}]: {trade_date} ✅")
        except Exception as e:
            failed += 1
            logger.warning(f"NSE backfill [{i+1}/{len(trading_dates)}]: {trade_date} ❌ — {e}")

        time.sleep(REQUEST_DELAY_SECONDS)

    logger.info(f"NSE backfill complete: {success} success, {failed} failed, {skipped} skipped")
    return success, failed, skipped


def backfill_bse(start: date, end: date, skip_existing: bool = True):
    """Backfill BSE Bhavcopy for all trading days in [start, end]."""
    from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline

    trading_dates = get_trading_dates_in_range(start, end)
    logger.info(f"BSE backfill: {len(trading_dates)} trading days from {start} to {end}")

    success = 0
    failed = 0
    skipped = 0

    for i, trade_date in enumerate(trading_dates):
        if skip_existing:
            existing = execute_one(
                """SELECT 1 FROM pipeline_runs
                   WHERE source = 'BSE_BHAVCOPY' AND run_date = ? AND status = 'SUCCESS'""",
                (trade_date.isoformat(),),
            )
            if existing:
                skipped += 1
                continue

        try:
            run_bse_bhavcopy_pipeline(trade_date)
            success += 1
            logger.info(f"BSE backfill [{i+1}/{len(trading_dates)}]: {trade_date} ✅")
        except Exception as e:
            failed += 1
            logger.warning(f"BSE backfill [{i+1}/{len(trading_dates)}]: {trade_date} ❌ — {e}")

        time.sleep(REQUEST_DELAY_SECONDS)

    logger.info(f"BSE backfill complete: {success} success, {failed} failed, {skipped} skipped")
    return success, failed, skipped


def backfill_corporate_actions(start: date, end: date, chunk_days: int = 30):
    """
    Backfill NSE corporate actions in chunks (NSE API has date range limits).
    Processes in 30-day chunks to avoid API timeouts.
    """
    from pipelines.corporate_actions import run_corporate_actions_pipeline

    current = start
    total_success = 0
    total_failed = 0

    while current <= end:
        chunk_end = min(current + timedelta(days=chunk_days - 1), end)
        try:
            run_corporate_actions_pipeline(current, chunk_end)
            total_success += 1
            logger.info(f"Corp actions backfill: {current} → {chunk_end} ✅")
        except Exception as e:
            total_failed += 1
            logger.warning(f"Corp actions backfill: {current} → {chunk_end} ❌ — {e}")

        current = chunk_end + timedelta(days=1)
        time.sleep(REQUEST_DELAY_SECONDS * 2)  # Extra delay for API calls

    return total_success, total_failed


def run_full_backfill(
    start: date = None,
    end: date = None,
    nse_only: bool = False,
    skip_existing: bool = True,
):
    """
    Run a full historical backfill.

    Order:
      1. Refresh holiday cache
      2. Backfill NSE Bhavcopy (primary price source)
      3. Backfill BSE Bhavcopy (secondary, BSE-only stocks)
      4. Backfill corporate actions (in 30-day chunks)
      5. Recompute all adj_close from scratch
      6. Run verification checks
    """
    if start is None:
        start = DEFAULT_START_DATE
    if end is None:
        end = date.today() - timedelta(days=1)

    logger.info(f"Starting full backfill: {start} → {end}")
    send_telegram_alert(
        f"Full backfill started: `{start}` → `{end}`\n"
        f"NSE only: `{nse_only}`, Skip existing: `{skip_existing}`",
        level="INFO",
    )

    # Step 1: Refresh holiday cache
    ensure_holiday_cache(force_refresh=True)

    # Step 2: NSE Bhavcopy
    nse_ok, nse_fail, nse_skip = backfill_nse(start, end, skip_existing)

    # Step 3: BSE Bhavcopy
    bse_ok = bse_fail = bse_skip = 0
    if not nse_only:
        bse_ok, bse_fail, bse_skip = backfill_bse(start, end, skip_existing)

    # Step 4: Corporate Actions
    ca_ok, ca_fail = backfill_corporate_actions(start, end)

    # Step 5: Recompute adj_close
    logger.info("Recomputing all adj_close values...")
    from pipelines.adjust_prices import compute_adj_close_for_all_assets
    compute_adj_close_for_all_assets()

    # Step 6: Verification
    logger.info("Running post-backfill verification...")
    from pipelines.verification import run_verification_pipeline
    run_verification_pipeline(end)

    summary = (
        f"Backfill complete: `{start}` → `{end}`\n"
        f"NSE: `{nse_ok}` ok, `{nse_fail}` failed, `{nse_skip}` skipped\n"
        f"BSE: `{bse_ok}` ok, `{bse_fail}` failed, `{bse_skip}` skipped\n"
        f"Corp Actions: `{ca_ok}` chunks ok, `{ca_fail}` failed"
    )
    logger.info(summary)
    send_telegram_alert(summary, level="SUCCESS" if nse_fail == 0 else "WARNING")


if __name__ == "__main__":
    import argparse
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    parser = argparse.ArgumentParser(description="Artha Data Pipeline Backfill")
    parser.add_argument("start_date", nargs="?", default=None, help="Start date (YYYY-MM-DD)")
    parser.add_argument("end_date", nargs="?", default=None, help="End date (YYYY-MM-DD)")
    parser.add_argument("--nse-only", action="store_true", help="Skip BSE backfill")
    parser.add_argument("--no-resume", action="store_true", help="Re-download even if already ingested")

    args = parser.parse_args()

    start = date.fromisoformat(args.start_date) if args.start_date else None
    end = date.fromisoformat(args.end_date) if args.end_date else None

    run_full_backfill(
        start=start,
        end=end,
        nse_only=args.nse_only,
        skip_existing=not args.no_resume,
    )
