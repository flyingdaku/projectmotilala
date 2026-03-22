#!/usr/bin/env python3
"""
Populate Golden Fundamentals.

Uses the unified merge pipeline against the Timescale/Postgres fundamentals
source tables and refreshes the golden `fundamentals` table in-place.
"""
import sys
import logging
import os
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from core.db import get_ts_connection
from pipelines.fundamentals import refresh_unified_view

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("golden_fundamentals")

def main():
    logger.info("Starting Golden Fundamentals population...")
    refresh_unified_view()
    with get_ts_connection() as conn:
        counts = {}
        for table in ("fundamentals", "fundamental_conflicts"):
            row = conn.fetchone(f"SELECT COUNT(*) AS c FROM {table}")
            counts[table] = row["c"] if row else 0
    logger.info("Population complete.")
    logger.info("  - fundamentals rows: %s", counts["fundamentals"])
    logger.info("  - fundamental_conflicts rows: %s", counts["fundamental_conflicts"])

if __name__ == "__main__":
    main()
