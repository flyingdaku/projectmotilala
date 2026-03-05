"""
Weekly Fundamentals Pipeline.

Runs on weekends to scrape latest classifications and fundamentals.
"""
from __future__ import annotations

import logging
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from core.db import get_connection

logger = logging.getLogger(__name__)


def run_weekly_fundamentals():
    from sources.screener.classification import ScreenerClassificationIngester
    from sources.screener.fundamentals import ScreenerFundamentalsIngester
    
    with get_connection() as conn:
        logger.info("Running Screener Classification...")
        ScreenerClassificationIngester().run(date.today(), conn)
        
        logger.info("Running Screener Fundamentals...")
        ScreenerFundamentalsIngester().run(date.today(), conn)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_weekly_fundamentals()
