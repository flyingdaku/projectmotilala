#!/usr/bin/env python3
"""
Script to run the fundamentals merge pipeline.
Merges MSI and Screener source tables into the unified fundamentals table.
"""
import sys
import logging
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from pipelines.fundamentals import refresh_unified_view

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

if __name__ == '__main__':
    refresh_unified_view()
