import sys
import logging
import argparse
from datetime import date, timedelta
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from pipelines.golden_ca_pipeline import run_golden_ca_pipeline

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


def main():
    parser = argparse.ArgumentParser(description="Reprocess all staging CA records into golden CA table.")
    parser.add_argument("--start", default="2005-01-01", help="Start date YYYY-MM-DD")
    parser.add_argument("--end", default=date.today().isoformat(), help="End date YYYY-MM-DD")
    parser.add_argument("--chunk-years", type=int, default=1, help="Process N years per chunk (default: 1)")
    args = parser.parse_args()

    start = date.fromisoformat(args.start)
    end = date.fromisoformat(args.end)

    logger.info(f"Golden CA backfill: {start} → {end} (chunk={args.chunk_years}y)")

    chunk_start = start
    total_inserted = 0
    total_updated = 0

    while chunk_start <= end:
        chunk_end = min(
            date(chunk_start.year + args.chunk_years - 1, 12, 31),
            end,
        )
        logger.info(f"Processing chunk: {chunk_start} → {chunk_end}")
        try:
            ins, upd = run_golden_ca_pipeline(chunk_start, chunk_end)
            total_inserted += ins
            total_updated += upd
            logger.info(f"  Chunk done: {ins} inserted, {upd} updated")
        except Exception as e:
            logger.error(f"  Chunk {chunk_start}→{chunk_end} failed: {e}", exc_info=True)

        chunk_start = date(chunk_end.year + 1, 1, 1)

    logger.info(f"Golden CA backfill complete: {total_inserted} inserted, {total_updated} updated")


if __name__ == "__main__":
    main()
