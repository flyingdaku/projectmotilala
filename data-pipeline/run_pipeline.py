"""
Main pipeline runner — executes all pipeline steps in the correct order.

Execution order (per docs/data_pipeline.md):
  1. Refresh NSE holiday cache
  2. Fetch NSE Corporate Actions (today's ex_date events)
  3. Fetch BSE Corporate Actions (today's ex_date events)
  4. Reconcile NSE vs BSE corporate actions (alert on discrepancies)
  5. Fetch NSE Bhavcopy (today's raw prices)
  6. Fetch BSE Bhavcopy (cross-validation + BSE-only stocks)
  7. Fetch AMFI NAV (all mutual fund NAVs)
  8. Circuit breakers run inside each bhavcopy pipeline
  9. Recompute adjusted close (if new corporate actions found)
  10. Run verification checks
  11. Send status alert

Usage:
  python run_pipeline.py                    # Run for yesterday
  python run_pipeline.py 2024-01-15         # Run for specific date
  python run_pipeline.py --skip-corp-actions  # Skip all corporate actions
"""
import argparse
import logging
import os
import sys
from datetime import date, timedelta

# Ensure project root is in path
sys.path.insert(0, os.path.dirname(__file__))

def ensure_logs_dir():
    logs_dir = os.path.join(os.path.dirname(__file__), "logs")
    os.makedirs(logs_dir, exist_ok=True)

ensure_logs_dir()

from utils.alerts import send_telegram_alert
from utils.calendar import ensure_holiday_cache, is_trading_day
from utils.db import init_db

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(
            os.path.join(os.path.dirname(__file__), "logs", "pipeline.log"),
            mode="a",
        ),
    ],
)
logger = logging.getLogger("run_pipeline")

def run(trade_date: date, skip_bse: bool = False, skip_amfi: bool = False, skip_corp_actions: bool = False, skip_adjust: bool = False, skip_reconcile: bool = False, skip_iima: bool = False):
    """Run the full nightly pipeline for a given trade date."""
    ensure_logs_dir()

    # ── Step 0: Setup Logging per run ────────────────────────────
    run_log_file = os.path.join(os.path.dirname(__file__), "logs", f"pipeline_run_{trade_date.isoformat()}.log")
    
    # Reconfigure root logger to point to new file
    for handler in logging.root.handlers[:]:
        logging.root.removeHandler(handler)
        
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler(run_log_file, mode="a"),
        ],
    )
    
    logger.info(f"{'='*60}")
    logger.info(f"Artha Market Data Pipeline — {trade_date}")
    logger.info(f"Logging to: {run_log_file}")
    logger.info(f"{'='*60}")

    # ── Step 1: Initialize DB if needed ──────────────────────────
    init_db()

    # ── Step 1: Refresh holiday cache ────────────────────────────
    logger.info("Step 1: Refreshing NSE holiday cache...")
    ensure_holiday_cache()

    # ── Validate trading day ──────────────────────────────────────
    if not is_trading_day(trade_date):
        logger.info(f"{trade_date} is not a trading day. Pipeline skipped.")
        return

    # ── Step 2: NSE Corporate Actions ────────────────────────────
    if not skip_corp_actions:
        logger.info("Step 2: Fetching NSE Corporate Actions...")
        try:
            from pipelines.corporate_actions import run_corporate_actions_pipeline
            run_corporate_actions_pipeline(
                from_date=trade_date - timedelta(days=1),
                to_date=trade_date,
            )
        except Exception as e:
            msg = f"NSE Corporate actions pipeline failed for {trade_date}: {e}. Pipeline stopped. Run with --skip-corp-actions to resume."
            logger.error(msg)
            send_telegram_alert(msg, level="ERROR")
            raise RuntimeError(msg)
    else:
        logger.info("Step 2: NSE Corporate Actions skipped")

    # ── Step 3: BSE Corporate Actions ────────────────────────────
    if not skip_corp_actions:
        logger.info("Step 3: Fetching BSE Corporate Actions...")
        try:
            from pipelines.bse_corporate_actions import run_bse_corporate_actions_pipeline
            run_bse_corporate_actions_pipeline(
                from_date=trade_date - timedelta(days=1),
                to_date=trade_date,
            )
        except Exception as e:
            msg = f"BSE Corporate actions pipeline failed for {trade_date}: {e}. Pipeline stopped. Run with --skip-corp-actions to resume."
            logger.error(msg)
            send_telegram_alert(msg, level="ERROR")
            raise RuntimeError(msg)
    else:
        logger.info("Step 3: BSE Corporate Actions skipped")

    # ── Step 4: NSE vs BSE Reconciliation ────────────────────────
    if not skip_corp_actions and not skip_reconcile:
        logger.info("Step 4: Reconciling NSE vs BSE corporate actions...")
        try:
            from pipelines.nse_bse_reconciler import run_reconciliation
            run_reconciliation(
                from_date=trade_date - timedelta(days=1),
                to_date=trade_date,
                raise_on_critical=True,
            )
        except RuntimeError as e:
            msg = f"NSE/BSE reconciliation failed for {trade_date}: {e}. Run with --skip-reconcile to bypass."
            logger.error(msg)
            send_telegram_alert(msg, level="ERROR")
            raise
    else:
        logger.info("Step 4: NSE/BSE reconciliation skipped")

    # ── Steps 5-8: Parallel Data Ingestion ───────────────────────────
    import concurrent.futures

    logger.info("Steps 5-8: Running Ingestion Pipelines (NSE, BSE, AMFI, Fundamentals, IIMA FF) in parallel...")
    
    def run_nse():
        from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline
        run_nse_bhavcopy_pipeline(trade_date)
        
    def run_bse():
        if not skip_bse:
            try:
                from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline
                run_bse_bhavcopy_pipeline(trade_date)
            except Exception as e:
                logger.warning(f"BSE Bhavcopy pipeline failed (non-fatal): {e}")
        else:
            logger.info("BSE Bhavcopy skipped")
            
    def run_amfi():
        if not skip_amfi:
            try:
                from pipelines.amfi_nav import run_amfi_nav_pipeline
                run_amfi_nav_pipeline(trade_date)
            except Exception as e:
                logger.warning(f"AMFI NAV pipeline failed (non-fatal): {e}")
        else:
            logger.info("AMFI NAV skipped")

    def run_fundamentals():
        try:
            from pipelines.fundamentals import run_fundamentals_pipeline
            run_fundamentals_pipeline(trade_date)
        except Exception as e:
            logger.warning(f"Fundamentals pipeline failed (non-fatal): {e}")

    def run_iima():
        if skip_iima:
            logger.info("IIMA Fama-French pipeline skipped")
            return
        try:
            from pipelines.ff_iima_pipeline import run_iima_ff_pipeline
            run_iima_ff_pipeline(trade_date=trade_date)
        except Exception as e:
            logger.warning(f"IIMA Fama-French pipeline failed (non-fatal): {e}")

    def run_nifty_indices():
        try:
            from sources.nifty_indices import NiftyIndicesIngester
            ingester = NiftyIndicesIngester()
            with get_connection() as conn:
                ingester.run(trade_date, conn)
        except Exception as e:
            logger.warning(f"Nifty Indices pipeline failed (non-fatal): {e}")

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        futures = [
            executor.submit(run_nse),
            executor.submit(run_bse),
            executor.submit(run_amfi),
            executor.submit(run_fundamentals),
            executor.submit(run_iima),
            executor.submit(run_nifty_indices)
        ]
        concurrent.futures.wait(futures)
        # Check for exceptions in the parallel execution
        for future in futures:
            exc = future.exception()
            if exc:
                logger.error(f"Ingestion pipeline encountered a fatal error: {exc}")
                raise exc

    # ── Step 6: Recompute Adjusted Close ─────────────────────────
    if not skip_adjust:
        logger.info("Step 6: Recomputing adjusted close prices...")
        from pipelines.adjust_prices import compute_adj_close_for_all_assets
        compute_adj_close_for_all_assets()
    else:
        logger.info("Step 6: Adjusted close recomputation skipped")

    # ── Step 6.5: Compute Nightly Metrics ────────────────────────
    logger.info("Step 6.5: Computing nightly metrics (Returns, Risk, Valuation)...")
    try:
        from pipelines.compute_metrics import run_compute_metrics_pipeline
        run_compute_metrics_pipeline()
    except Exception as e:
        logger.warning(f"Metrics computation failed (non-fatal): {e}")

    # ── Step 7: Verification ─────────────────────────────────────
    logger.info("Step 7: Running verification checks...")
    from pipelines.verification import run_verification_pipeline
    results = run_verification_pipeline(trade_date)

    passed = sum(1 for r in results if r.get("status") == "PASS")
    total = len(results)
    logger.info(f"Verification: {passed}/{total} checks passed")
    logger.info(f"{'='*60}")
    logger.info(f"Pipeline complete for {trade_date}")
    logger.info(f"{'='*60}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Artha Market Data Pipeline")
    parser.add_argument("date", nargs="?", default=None, help="Trade date (YYYY-MM-DD), default: yesterday")
    parser.add_argument("--skip-bse", action="store_true", help="Skip BSE Bhavcopy")
    parser.add_argument("--skip-amfi", action="store_true", help="Skip AMFI NAV")
    parser.add_argument("--skip-corp-actions", action="store_true", help="Skip all corporate actions (NSE + BSE + reconcile)")
    parser.add_argument("--skip-adjust", action="store_true", help="Skip recomputing adjusted close prices")
    parser.add_argument("--skip-reconcile", action="store_true", help="Skip NSE vs BSE corporate actions reconciliation")
    parser.add_argument("--skip-iima", action="store_true", help="Skip IIMA delayed Fama-French ingestion")

    args = parser.parse_args()

    trade_date = date.fromisoformat(args.date) if args.date else date.today() - timedelta(days=1)

    run(
        trade_date=trade_date,
        skip_bse=args.skip_bse,
        skip_amfi=args.skip_amfi,
        skip_corp_actions=args.skip_corp_actions,
        skip_adjust=args.skip_adjust,
        skip_reconcile=args.skip_reconcile,
        skip_iima=args.skip_iima,
    )
