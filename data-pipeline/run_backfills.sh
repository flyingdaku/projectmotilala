#!/bin/bash
set -e

cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline

echo "1. Prefetching recent raw data (Screener, Fundamentals)..."
python3 scripts/prefetch_raw_data.py --from 2026-03-01 --screener --fundamentals

echo "2. Re-running asset mappings..."
python3 scripts/sync_bse_master.py
python3 scripts/sync_exchange_classification.py
python3 scripts/build_eodhd_mapping.py

echo "3. Restoring Fundamental DB Data..."
python3 -m pipelines.backfill.fundamentals
python3 scripts/populate_golden_fundamentals.py

echo "Done."
