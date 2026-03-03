"""
Full Database Rebuild Script — Artha Market Data Pipeline
==========================================================
Drops and recreates the database from scratch, then runs:
  1. DB schema init
  2. Holiday cache population
  3. NSE Bhavcopy backfill (primary price source)
  4. BSE Bhavcopy backfill (secondary + BSE-only)
  5. AMFI NAV backfill (mutual funds)
  6. Corporate actions backfill (NSE)
  7. Adjusted close recomputation
  8. NSE Fundamentals backfill
  9. BSE Fundamentals backfill
  10. Screener.in Fundamentals
  11. Unified fundamentals merge
  12. Compute quantitative metrics
  13. Final verification and report

Usage:
  python scripts/rebuild_db.py                     # Full rebuild from 2000-01-01
  python scripts/rebuild_db.py --from 2020-01-01   # Rebuild from specific date
  python scripts/rebuild_db.py --from 2000-01-01 --skip-fundamentals  # Skip fundamentals
  python scripts/rebuild_db.py --dry-run            # Show plan only, don't execute
"""

import os
import sys
import logging
import argparse
import time
from datetime import date, timedelta
from pathlib import Path

# Ensure project root is on path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# ── Logging setup ──────────────────────────────────────────────────────────────
LOG_DIR = ROOT / "logs"
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / f"rebuild_{date.today().isoformat()}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(str(LOG_FILE), mode="w"),
    ],
)
logger = logging.getLogger("rebuild_db")


# ── Step tracking ──────────────────────────────────────────────────────────────
RESULTS = []

def step(name: str, fn, *args, skip=False, **kwargs):
    """Run a rebuild step, capture result, continue on failure."""
    if skip:
        logger.info(f"⏭️  SKIP  [{name}]")
        RESULTS.append({"step": name, "status": "SKIPPED"})
        return None

    logger.info(f"\n{'='*60}")
    logger.info(f"▶️  START [{name}]")
    t0 = time.time()
    try:
        result = fn(*args, **kwargs)
        elapsed = round(time.time() - t0, 1)
        logger.info(f"✅ DONE  [{name}] in {elapsed}s")
        RESULTS.append({"step": name, "status": "OK", "elapsed_s": elapsed, "result": str(result)[:200]})
        return result
    except Exception as e:
        elapsed = round(time.time() - t0, 1)
        logger.error(f"❌ FAIL  [{name}] after {elapsed}s: {e}", exc_info=True)
        RESULTS.append({"step": name, "status": "FAILED", "elapsed_s": elapsed, "error": str(e)})
        return None


# ── Step implementations ───────────────────────────────────────────────────────

def drop_and_init_db():
    """Delete existing DB file and recreate from schema.sql."""
    from utils.db import DB_PATH, init_db
    db_path = Path(DB_PATH)
    if db_path.exists():
        logger.info(f"Deleting existing DB at {db_path} ({db_path.stat().st_size / 1e6:.1f} MB)")
        db_path.unlink()
    # Also remove WAL/SHM sidecar files
    for suffix in ["-wal", "-shm"]:
        p = db_path.with_name(db_path.name + suffix)
        if p.exists():
            p.unlink()
    init_db()
    logger.info(f"Fresh DB created at: {db_path}")
    return str(db_path)


def populate_holiday_cache(force=True):
    from utils.calendar import ensure_holiday_cache
    ensure_holiday_cache(force_refresh=force)
    return "Holiday cache populated"


def run_nse_backfill(start: date, end: date, skip_existing: bool = True):
    from pipelines.backfill import backfill_nse
    ok, fail, skip = backfill_nse(start, end, skip_existing=skip_existing)
    return f"NSE: {ok} ok / {fail} fail / {skip} skip"


def run_bse_backfill(start: date, end: date):
    from pipelines.backfill import backfill_bse
    # BSE only has archived Bhavcopy from ~2010 onwards;
    # silently skip 404s for older dates (they're expected)
    ok, fail, skip = backfill_bse(start, end, skip_existing=True)
    return f"BSE: {ok} ok / {fail} fail / {skip} skip"


def run_amfi_backfill(start: date, end: date):
    """Backfill AMFI NAVs for each trading day in range."""
    from pipelines.amfi_nav import run_amfi_nav_pipeline
    from utils.calendar import get_trading_dates_in_range
    trading_dates = get_trading_dates_in_range(start, end)
    ok = fail = skip = 0
    for d in trading_dates:
        try:
            run_amfi_nav_pipeline(d)
            ok += 1
        except Exception as e:
            logger.warning(f"  AMFI {d}: {e}")
            fail += 1
        time.sleep(0.5)
    return f"AMFI: {ok} ok / {fail} fail"


def run_ca_backfill(start: date, end: date):
    from pipelines.backfill import backfill_corporate_actions
    ok, fail = backfill_corporate_actions(start, end, chunk_days=30)
    return f"Corp Actions: {ok} chunks ok / {fail} fail"


def run_adj_close():
    from pipelines.adjust_prices import compute_adj_close_for_all_assets
    compute_adj_close_for_all_assets()
    return "adj_close recomputed for all assets"


def run_bse_code_sync():
    """Sync BSE codes from raw data files."""
    from scripts.sync_bse_codes_from_raw import sync_bse_codes_from_raw
    sync_bse_codes_from_raw()
    return "BSE code sync complete"


def run_nse_fundamentals(trade_date: date):
    from pipelines.nse_fundamentals import run_nse_fundamentals
    run_nse_fundamentals(trade_date)
    return f"NSE Fundamentals for {trade_date}"


def run_bse_fundamentals(trade_date: date):
    from pipelines.bse_fundamentals import run_bse_fundamentals
    run_bse_fundamentals(trade_date)
    return f"BSE Fundamentals for {trade_date}"


def run_screener_fundamentals(trade_date: date):
    from pipelines.screener_fundamentals import run_screener_fundamentals
    run_screener_fundamentals(trade_date)
    return f"Screener Fundamentals for {trade_date}"


def run_unified_fundamentals(trade_date: date):
    from pipelines.fundamentals import run_fundamentals_pipeline
    run_fundamentals_pipeline(trade_date)
    return f"Unified fundamentals merge for {trade_date}"


def run_screener_classification(limit: int = None):
    """Enrich assets table with 4-level Screener.in sector/industry hierarchy."""
    from scripts.scrape_screener_classification import run_classification_scrape
    ok, fail, skip = run_classification_scrape(limit=limit, skip_existing=True)
    return f"Classification: {ok} ok / {fail} fail / {skip} skip"


def run_metrics(trade_date: date):
    from pipelines.compute_metrics import run_metrics_pipeline
    run_metrics_pipeline(trade_date)
    return f"Metrics computed for {trade_date}"


def run_verification(trade_date: date):
    from pipelines.verification import run_verification_pipeline
    results = run_verification_pipeline(trade_date)
    summary = {r.get("check"): r.get("status") for r in results}
    return f"Verification: {summary}"


def print_report():
    """Print final rebuild summary table."""
    print("\n" + "="*70)
    print("  ARTHA DB REBUILD REPORT")
    print("="*70)
    for r in RESULTS:
        status_icon = {"OK": "✅", "FAILED": "❌", "SKIPPED": "⏭️ "}.get(r["status"], "?")
        elapsed = f"  ({r.get('elapsed_s', ''):.0f}s)" if r.get("elapsed_s") else ""
        print(f"  {status_icon} {r['step']:<35} {r['status']}{elapsed}")
        if r.get("error"):
            print(f"       Error: {r['error'][:100]}")
    print("="*70)
    fails = [r for r in RESULTS if r["status"] == "FAILED"]
    print(f"  Total Steps: {len(RESULTS)} | Failed: {len(fails)}")
    print(f"  Log: {LOG_FILE}")
    print("="*70 + "\n")


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Rebuild the Artha SQLite database from scratch.")
    parser.add_argument("--from", dest="start_date", default="2000-01-01", help="Start date for NSE backfill")
    parser.add_argument("--bse-from", dest="bse_start_date", default=None,
                        help="Start date for BSE backfill (Default: matches --from)")
    parser.add_argument("--to", dest="end_date", default=None, help="End date (defaults to yesterday)")
    parser.add_argument("--no-reinit", action="store_true",
                        help="Skip DB drop+reinit (resume an existing DB — preserves already-ingested data)")
    parser.add_argument("--skip-nse", action="store_true", help="Skip NSE Bhavcopy backfill")
    parser.add_argument("--skip-bse", action="store_true", help="Skip BSE Bhavcopy backfill")
    parser.add_argument("--skip-amfi", action="store_true", help="Skip AMFI NAV backfill")
    parser.add_argument("--skip-fundamentals", action="store_true", help="Skip all fundamentals")
    parser.add_argument("--skip-adj", action="store_true", help="Skip adj_close recomputation")
    parser.add_argument("--skip-metrics", action="store_true", help="Skip compute_metrics step")
    parser.add_argument("--dry-run", action="store_true", help="Show plan without executing")
    args = parser.parse_args()

    start = date.fromisoformat(args.start_date)
    bse_start = date.fromisoformat(args.bse_start_date)
    end = date.fromisoformat(args.end_date) if args.end_date else date.today() - timedelta(days=1)
    trade_date = end

    logger.info("=" * 60)
    logger.info("  ARTHA FULL DATABASE REBUILD")
    logger.info(f"  Range: {start} → {end}")
    logger.info(f"  Skips: BSE={args.skip_bse} AMFI={args.skip_amfi} Fundamentals={args.skip_fundamentals}")
    logger.info("=" * 60)

    if args.dry_run:
        print("\n📋 DRY RUN — would execute the following steps:")
        steps = [
            "1. Drop & Reinitialise DB",
            "2. Populate NSE Holiday Cache",
            f"3. NSE Bhavcopy backfill ({start} → {end})",
            f"4. BSE Bhavcopy backfill ({start} → {end})" + (" [SKIPPED]" if args.skip_bse else ""),
            f"5. AMFI NAV backfill ({start} → {end})" + (" [SKIPPED]" if args.skip_amfi else ""),
            f"6. Corporate Actions backfill ({start} → {end})",
            "7. BSE Code Sync (from raw files)",
            "8. Adj Close Recomputation" + (" [SKIPPED]" if args.skip_adj else ""),
            f"9. NSE Fundamentals ({trade_date})" + (" [SKIPPED]" if args.skip_fundamentals else ""),
            f"10. BSE Fundamentals ({trade_date})" + (" [SKIPPED]" if args.skip_fundamentals else ""),
            f"11. Screener Fundamentals ({trade_date})" + (" [SKIPPED]" if args.skip_fundamentals else ""),
            f"12. Unified Fundamentals merge ({trade_date})" + (" [SKIPPED]" if args.skip_fundamentals else ""),
            f"13. Compute Metrics ({trade_date})" + (" [SKIPPED]" if args.skip_metrics else ""),
            f"14. Verification checks ({trade_date})",
        ]
        for s in steps:
            print(f"   {s}")
        return

    # ── Execute ────────────────────────────────────────────────────────────────
    if args.no_reinit:
        logger.info("⏭️  Skipping DB reinit (--no-reinit). Using existing database.")
        # Ensure new schema objects exist without dropping old data
        from utils.db import init_db
        init_db()  # CREATE IF NOT EXISTS — safe to run on live DB
    else:
        step("1. Drop & Init DB",         drop_and_init_db)

    step("2. Holiday Cache",              populate_holiday_cache, True)
    step("3. NSE Bhavcopy Backfill",      run_nse_backfill,  start, end, skip_existing=True, skip=args.skip_nse)
    step("4. BSE Bhavcopy Backfill",      run_bse_backfill,  bse_start, end, skip=args.skip_bse)
    step("5. AMFI NAV Backfill",          run_amfi_backfill, start, end, skip=args.skip_amfi)
    step("6. Corporate Actions Backfill", run_ca_backfill,   start, end)
    step("7. BSE Code Sync",              run_bse_code_sync)
    step("8. Adj Close Recomputation",    run_adj_close,     skip=args.skip_adj)
    step("9. NSE Fundamentals",           run_nse_fundamentals,    trade_date, skip=args.skip_fundamentals)
    step("10. BSE Fundamentals",          run_bse_fundamentals,    trade_date, skip=args.skip_fundamentals)
    step("11. Screener Fundamentals",     run_screener_fundamentals, trade_date, skip=args.skip_fundamentals)
    step("12. Unified Fundamentals",      run_unified_fundamentals,  trade_date, skip=args.skip_fundamentals)
    step("12.5 Screener Classification",  run_screener_classification, skip=args.skip_fundamentals)
    step("13. Compute Metrics",           run_metrics,       trade_date, skip=args.skip_metrics)
    step("14. Verification",              run_verification,  trade_date)

    print_report()


if __name__ == "__main__":
    main()
