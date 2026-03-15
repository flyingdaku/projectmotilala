"""
Daily Pipeline Runner — Orchestrates all nightly data ingestion.

Execution order:
  1. NSE Bhavcopy → daily_prices (NSE source)
  2. BSE Bhavcopy → daily_prices (BSE source, BSE-only stocks + reconciliation)
  3. Corporate Actions (new splits/bonuses)
  4. Adjusted Close Recomputation (for stocks with new CAs)
  5. Asset Metrics (returns, volatility, beta, etc.)
  6. Pipeline Verification (data quality checks)
  7. Audit Log

Usage:
  python -m pipelines.daily.run                    # Run for previous trading day
  python -m pipelines.daily.run --date 2026-03-04  # Run for specific date
  python -m pipelines.daily.run --skip-bse         # Skip BSE step
"""
from __future__ import annotations

import argparse
import logging
import sys
import time
from datetime import date, timedelta
from pathlib import Path

# Ensure project root is on path
ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from core.db import get_connection, generate_id, SqliteConnection
from core.models import PipelineRun
from db.repositories.pipeline_runs import PipelineRunsRepository

logger = logging.getLogger(__name__)

# Step tracking
RESULTS = []


def step(name: str, fn, *args, skip=False, **kwargs):
    """Run a pipeline step, capture result, continue on failure."""
    if skip:
        logger.info("⏭️  SKIP  [%s]", name)
        RESULTS.append({"step": name, "status": "SKIPPED"})
        return None

    logger.info("▶️  START [%s]", name)
    t0 = time.time()
    try:
        result = fn(*args, **kwargs)
        elapsed = round(time.time() - t0, 1)
        logger.info("✅ DONE  [%s] in %ss", name, elapsed)
        RESULTS.append({"step": name, "status": "OK", "elapsed_s": elapsed})
        return result
    except Exception as e:
        elapsed = round(time.time() - t0, 1)
        logger.error("❌ FAIL  [%s] after %ss: %s", name, elapsed, e, exc_info=True)
        RESULTS.append({"step": name, "status": "FAILED", "error": str(e)})
        return None


# ── Step implementations (delegate to existing pipeline modules) ──────────

def run_nse_bhavcopy(trade_date: date):
    from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline
    return run_nse_bhavcopy_pipeline(trade_date)


def run_bse_bhavcopy(trade_date: date):
    from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline
    return run_bse_bhavcopy_pipeline(trade_date)


def run_adj_close():
    from pipelines.adjust_prices import compute_adj_close_for_all_assets
    return compute_adj_close_for_all_assets()


def run_metrics():
    from pipelines.compute_metrics import run_compute_metrics_pipeline
    return run_compute_metrics_pipeline()


def run_verification(trade_date: date):
    from pipelines.verification import run_verification_pipeline
    return run_verification_pipeline(trade_date)


def run_eodhd_daily(trade_date: date):
    from pipelines.daily.eodhd_daily import run_daily_eodhd
    return run_daily_eodhd(trade_date)

def run_eodhd_intraday_daily(trade_date: date):
    from pipelines.daily.eodhd_intraday_daily import run_intraday_daily
    return run_intraday_daily(trade_date)

def run_eodhd_reconciliation(trade_date: date):
    from pipelines.eodhd_reconciliation import reconcile_prices
    return reconcile_prices(trade_date, alert_on_major=True)

# ── Main orchestrator ─────────────────────────────────────────────────────

def run_daily_pipeline(trade_date: date, skip_bse: bool = False, skip_metrics: bool = False):
    """Execute the full daily pipeline sequence."""
    logger.info("=" * 60)
    logger.info("  ARTHA DAILY PIPELINE — %s", trade_date)
    logger.info("=" * 60)

    step("1. NSE Bhavcopy", run_nse_bhavcopy, trade_date)
    step("2. BSE Bhavcopy", run_bse_bhavcopy, trade_date, skip=skip_bse)
    step("3. EODHD Daily EOD", run_eodhd_daily, trade_date)
    step("4. EODHD Daily Intraday", run_eodhd_intraday_daily, trade_date)
    step("5. EODHD Reconciliation", run_eodhd_reconciliation, trade_date)
    step("6. Adj Close Recomputation", run_adj_close)
    step("7. Asset Metrics", run_metrics, skip=skip_metrics)
    step("8. Verification", run_verification, trade_date)

    # Print summary
    print("\n" + "=" * 60)
    print("  DAILY PIPELINE REPORT")
    print("=" * 60)
    for r in RESULTS:
        icon = {"OK": "✅", "FAILED": "❌", "SKIPPED": "⏭️ "}.get(r["status"], "?")
        elapsed = f"  ({r.get('elapsed_s', '')}s)" if r.get("elapsed_s") else ""
        print(f"  {icon} {r['step']:<35} {r['status']}{elapsed}")
    print("=" * 60)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    )

    parser = argparse.ArgumentParser(description="Run Artha daily pipeline")
    parser.add_argument("--date", default=None, help="Trade date (YYYY-MM-DD). Default: previous trading day.")
    parser.add_argument("--skip-bse", action="store_true")
    parser.add_argument("--skip-metrics", action="store_true")
    args = parser.parse_args()

    if args.date:
        td = date.fromisoformat(args.date)
    else:
        td = date.today() - timedelta(days=1)

    run_daily_pipeline(td, skip_bse=args.skip_bse, skip_metrics=args.skip_metrics)
