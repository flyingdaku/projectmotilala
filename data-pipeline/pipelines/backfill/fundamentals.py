"""
Backfill Fundamentals Pipeline.

Populates fundamentals from MSI and Screener caches.
"""
from __future__ import annotations

import argparse
import logging
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from core.db import get_connection

logger = logging.getLogger(__name__)


def backfill_fundamentals():
    from sources.screener.fundamentals import ScreenerFundamentalsIngester
    
    logger.info("── Backfilling Screener Fundamentals ──")
    with get_connection() as conn:
        ingester = ScreenerFundamentalsIngester()
        ingester.run(date.today(), conn)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    backfill_fundamentals()
