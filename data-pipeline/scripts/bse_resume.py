"""
BSE-only backfill — single-threaded to avoid SQLite WAL hangs.
Resumes from the last successful BSE_BHAVCOPY date.
"""
import sys, os, logging, time
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("bse_resume")

from utils.calendar import ensure_holiday_cache, get_trading_dates_in_range
from core.db import execute_one
from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline

def main():
    ensure_holiday_cache()

    # Find last successful BSE date
    row = execute_one(
        "SELECT MAX(run_date) as d FROM pipeline_runs WHERE source='BSE_BHAVCOPY' AND status='SUCCESS'"
    )
    if row and row["d"]:
        start = date.fromisoformat(row["d"]) + timedelta(days=1)
    else:
        start = date(2023, 9, 1)

    end = date.today() - timedelta(days=1)
    trading_dates = get_trading_dates_in_range(start, end)
    logger.info(f"BSE resume: {len(trading_dates)} trading days from {start} → {end}")

    success = failed = skipped = 0
    for i, td in enumerate(trading_dates):
        # Check if already done
        ex = execute_one(
            "SELECT 1 FROM pipeline_runs WHERE source='BSE_BHAVCOPY' AND run_date=%s AND status='SUCCESS'",
            (td.isoformat(),),
        )
        if ex:
            skipped += 1
            continue

        try:
            run_bse_bhavcopy_pipeline(td)
            success += 1
            if (i + 1) % 20 == 0:
                logger.info(f"Progress [{i+1}/{len(trading_dates)}]: last={td} ✅ (s={success} f={failed} skip={skipped})")
        except Exception as e:
            failed += 1
            if "404" not in str(e):
                logger.warning(f"BSE {td} ❌ — {e}")

        time.sleep(0.2)  # Minimal delay for static CDN

    logger.info(f"BSE resume done: {success} success, {failed} failed, {skipped} skipped")

if __name__ == "__main__":
    main()
