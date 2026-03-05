#!/usr/bin/env python3
"""
Populate Golden Fundamentals

Merges data from source-specific fundamental tables (MSI and Screener)
into the unified `fundamentals` table. Logs any deviations > 5% between
sources to the `fundamental_conflicts` table.

Usage:
    python scripts/populate_golden_fundamentals.py
"""
import sys
import logging
import os
from pathlib import Path

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from core.db import get_connection
from db.repositories.fundamentals import FundamentalsRepository

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger("golden_fundamentals")

def main():
    logger.info("Starting Golden Fundamentals population...")
    
    with get_connection() as conn:
        repo = FundamentalsRepository(conn)
        stats = repo.populate_golden_fundamentals()
        
    logger.info(f"Population complete. Stats:")
    logger.info(f"  - MSI only rows: {stats['msi_only']}")
    logger.info(f"  - Screener only rows: {stats['scr_only']}")
    logger.info(f"  - Merged (MSI win) rows: {stats['merged']}")
    logger.info(f"  - Conflicts logged (>5% dev): {stats['conflicts_logged']}")
    
    total = stats['msi_only'] + stats['scr_only'] + stats['merged']
    logger.info(f"Total rows inserted into `fundamentals`: {total}")

if __name__ == "__main__":
    main()
