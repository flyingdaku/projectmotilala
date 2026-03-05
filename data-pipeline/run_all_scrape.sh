#!/bin/bash
set -e

# MSI Scrape
# Use the token provided by user
MSI_TOKEN="190028+MarketSmithINDUID-Web0000000202946+MarketSmithINDUID-Web0000000202946+0+265312170312+877363169"

echo "Starting MSI Scrape (Equities)..."
python3 scripts/scrape_msi.py --auth "$MSI_TOKEN" --limit 20000 --db db/market_data.db --workers 8

echo "Starting raw data download (Screener + NSE/BSE Fundamentals)..."
python3 scripts/prefetch_raw_data.py --from 2026-03-03 --screener --fundamentals

echo "Ingesting Screener data to DB..."
python3 -m pipelines.backfill.fundamentals

echo "Populating Golden Fundamentals..."
python3 scripts/populate_golden_fundamentals.py

echo "All scrapes and ingestion complete!"
