"""
run_full_reingest.py — Master orchestrator for full historical data reingest.

Runs the complete pipeline in correct dependency order:
  Step 1:  Reingest NSE bhavcopy from raw ZIPs → timeseries DB
  Step 2:  Reingest BSE bhavcopy from raw ZIPs → timeseries DB
  Step 3:  Reprocess all NSE/BSE staging records → golden corporate_actions table
  Step 4:  Full adj_close recomputation from scratch

Each step is resumable via --start-step. Use --dry-run to verify parsing counts
without writing anything.

Usage:
    python scripts/run_full_reingest.py                          # Full run from scratch
    python scripts/run_full_reingest.py --start-step 3          # Skip price reingest, just redo CAs
    python scripts/run_full_reingest.py --start-step 4          # Skip to adj_close recomputation
    python scripts/run_full_reingest.py --nse-start 2015-01-01  # Only reingest NSE from 2015
    python scripts/run_full_reingest.py --dry-run               # Counts only, no writes
"""
import argparse
import logging
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)


def step1_reingest_nse(nse_start: date, nse_end: date, workers: int, skip_existing: bool, dry_run: bool):
    logger.info("=" * 60)
    logger.info(f"STEP 1: NSE Bhavcopy reingest [{nse_start} → {nse_end}]")
    logger.info("=" * 60)
    from scripts.reingest_from_raw import reingest_nse
    reingest_nse(nse_start, nse_end, workers=workers, skip_existing=skip_existing, dry_run=dry_run)


def step2_reingest_bse(bse_start: date, bse_end: date, workers: int, skip_existing: bool, dry_run: bool):
    logger.info("=" * 60)
    logger.info(f"STEP 2: BSE Bhavcopy reingest [{bse_start} → {bse_end}]")
    logger.info("=" * 60)
    from scripts.reingest_from_raw import reingest_bse
    reingest_bse(bse_start, bse_end, workers=workers, skip_existing=skip_existing, dry_run=dry_run)


def step3_reprocess_golden_ca(ca_start: date, ca_end: date, chunk_years: int, dry_run: bool):
    logger.info("=" * 60)
    logger.info(f"STEP 3: Golden CA reprocessing [{ca_start} → {ca_end}]")
    logger.info("=" * 60)
    if dry_run:
        logger.info("DRY RUN — skipping golden CA write")
        return

    from pipelines.golden_ca_pipeline import run_golden_ca_pipeline

    chunk_start = ca_start
    total_inserted = 0
    total_updated = 0

    while chunk_start <= ca_end:
        chunk_end = min(
            date(chunk_start.year + chunk_years - 1, 12, 31),
            ca_end,
        )
        logger.info(f"  Chunk: {chunk_start} → {chunk_end}")
        try:
            ins, upd = run_golden_ca_pipeline(chunk_start, chunk_end)
            total_inserted += ins
            total_updated += upd
            logger.info(f"    ✓ {ins} inserted, {upd} updated")
        except Exception as e:
            logger.error(f"    ✗ chunk {chunk_start}→{chunk_end} failed: {e}", exc_info=True)

        chunk_start = date(chunk_end.year + 1, 1, 1)

    logger.info(f"Golden CA complete: {total_inserted} total inserted, {total_updated} total updated")


def step4_recompute_adj_close(dry_run: bool):
    logger.info("=" * 60)
    logger.info("STEP 4: Full adj_close recomputation")
    logger.info("=" * 60)
    if dry_run:
        logger.info("DRY RUN — skipping adj_close recomputation")
        return

    from scripts.recompute_adj_close import recompute_all_adj_close
    recompute_all_adj_close()


def main():
    parser = argparse.ArgumentParser(
        description="Full historical data reingest orchestrator."
    )
    parser.add_argument(
        "--start-step", type=int, default=1, choices=[1, 2, 3, 4],
        help="Step to start from (1=NSE, 2=BSE, 3=GoldenCA, 4=AdjClose). Default: 1",
    )
    parser.add_argument(
        "--nse-start", default="2007-01-01",
        help="NSE reingest start date (default: 2007-01-01)",
    )
    parser.add_argument(
        "--nse-end", default=date.today().isoformat(),
        help="NSE reingest end date (default: today)",
    )
    parser.add_argument(
        "--bse-start", default="2010-01-01",
        help="BSE reingest start date (default: 2010-01-01)",
    )
    parser.add_argument(
        "--bse-end", default=date.today().isoformat(),
        help="BSE reingest end date (default: today)",
    )
    parser.add_argument(
        "--ca-start", default="2005-01-01",
        help="Golden CA reprocess start date (default: 2005-01-01)",
    )
    parser.add_argument(
        "--ca-end", default=date.today().isoformat(),
        help="Golden CA reprocess end date (default: today)",
    )
    parser.add_argument(
        "--workers", type=int, default=4,
        help="Parallel workers for bhavcopy reingest (default: 4)",
    )
    parser.add_argument(
        "--skip-existing", action="store_true",
        help="Skip dates with existing SUCCESS pipeline_run entries",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Parse and count only, no DB writes",
    )
    parser.add_argument(
        "--ca-chunk-years", type=int, default=1,
        help="Years per golden CA chunk (default: 1)",
    )

    args = parser.parse_args()

    nse_start = date.fromisoformat(args.nse_start)
    nse_end = date.fromisoformat(args.nse_end)
    bse_start = date.fromisoformat(args.bse_start)
    bse_end = date.fromisoformat(args.bse_end)
    ca_start = date.fromisoformat(args.ca_start)
    ca_end = date.fromisoformat(args.ca_end)

    logger.info("Full reingest orchestrator starting")
    logger.info(f"  Start step   : {args.start_step}")
    logger.info(f"  NSE range    : {nse_start} → {nse_end}")
    logger.info(f"  BSE range    : {bse_start} → {bse_end}")
    logger.info(f"  CA range     : {ca_start} → {ca_end}")
    logger.info(f"  Workers      : {args.workers}")
    logger.info(f"  Skip-existing: {args.skip_existing}")
    logger.info(f"  Dry-run      : {args.dry_run}")

    if args.start_step <= 1:
        step1_reingest_nse(nse_start, nse_end, args.workers, args.skip_existing, args.dry_run)

    if args.start_step <= 2:
        step2_reingest_bse(bse_start, bse_end, args.workers, args.skip_existing, args.dry_run)

    if args.start_step <= 3:
        step3_reprocess_golden_ca(ca_start, ca_end, args.ca_chunk_years, args.dry_run)

    if args.start_step <= 4:
        step4_recompute_adj_close(args.dry_run)

    logger.info("Full reingest complete.")


if __name__ == "__main__":
    main()
