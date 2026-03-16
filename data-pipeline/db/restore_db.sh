#!/bin/bash
set -e

cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline

# Init DB from scratch using python core module
echo "1. Initializing DB..."
rm -f db/market_data.db
python3 -c "from core.db import init_db; init_db()"

# Setup schemas
echo "2. Applying extended schema..."
sqlite3 db/market_data.db < db/schema_ff_extensions.sql
sqlite3 db/market_data.db < db/schema/07_msi_data.sql
sqlite3 db/market_data.db < db/schema/08_msi_extended.sql

# Restore MSI data to populate assets table and other tables
echo "3. Populating assets from MSI..."
python3 scripts/scrape_msi.py --db db/market_data.db --limit 20000

# Fix classifications
echo "4. Running metadata syncs..."
python3 scripts/sync_bse_master.py
python3 scripts/sync_exchange_classification.py
python3 scripts/build_eodhd_mapping.py

# Insert fundamentals
echo "5. Restoring Screener fundamentals..."
python3 -m pipelines.backfill.fundamentals
python3 scripts/populate_golden_fundamentals.py

echo "7. Done."
