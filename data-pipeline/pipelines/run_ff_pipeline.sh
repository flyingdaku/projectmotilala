#!/bin/bash
# Fama-French Factor Computation Pipeline
# Complete workflow from data preparation to validation

set -e  # Exit on error

echo "=========================================="
echo "Fama-French Factor Computation Pipeline"
echo "=========================================="
echo ""

# Configuration
START_DATE=${1:-"2021-01-01"}
END_DATE=${2:-"2024-12-31"}
RF_RATE=${3:-"0.065"}

echo "Configuration:"
echo "  Start Date: $START_DATE"
echo "  End Date:   $END_DATE"
echo "  RF Rate:    $RF_RATE (annual)"
echo ""

# Step 1: Verify database has data
echo "Step 1: Verifying database..."
docker exec artha_postgres  psql -U artha -d artha_relational -tAc "SELECT 'Assets: ' || COUNT(*) FROM assets WHERE asset_class = 'EQUITY';"
docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT 'Price records: ' || COUNT(*) FROM daily_prices WHERE adj_close IS NOT NULL;"
docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT 'Date range: ' || MIN(date)::text || ' to ' || MAX(date)::text FROM daily_prices WHERE adj_close IS NOT NULL;"
echo ""

# Step 2: Download IIMA validation data (if not already done)
echo "Step 2: Downloading IIMA validation data..."
if ! docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT COUNT(*) FROM ff_factor_returns WHERE source = 'IIMA';" | grep -q "^[1-9]"; then
    echo "  Downloading IIMA daily factors..."
    python3 ff_iima_downloader.py --frequency daily
else
    echo "  IIMA data already present, skipping download"
fi
echo ""

# Step 3: Compute factors for date range
echo "Step 3: Computing factors for $START_DATE to $END_DATE..."
echo "  This may take several hours depending on date range..."
python3 ff_factor_computation.py \
    --start-date "$START_DATE" \
    --end-date "$END_DATE" \
    --rf-rate "$RF_RATE" \
    2>&1 | tee "ff_computation_${START_DATE}_${END_DATE}.log"
echo ""

# Step 4: Validate against IIMA
echo "Step 4: Validating computed factors against IIMA..."
python3 ff_validation.py \
    --start-date "$START_DATE" \
    --end-date "$END_DATE" \
    --plot \
    --output-dir "./validation_plots" \
    2>&1 | tee "ff_validation_${START_DATE}_${END_DATE}.log"
echo ""

# Step 5: Summary
echo "=========================================="
echo "Pipeline Complete!"
echo "=========================================="
echo ""
echo "Results:"
docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT 'Computed factors: ' || COUNT(*) FROM ff_factor_returns WHERE source = 'COMPUTED';"
docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT 'IIMA factors: ' || COUNT(*) FROM ff_factor_returns WHERE source = 'IIMA';"
docker exec artha_timescale psql -U artha -d artha_timeseries -tAc "SELECT 'Validation records: ' || COUNT(*) FROM ff_validation_metrics;"
echo ""
echo "Logs saved to:"
echo "  - ff_computation_${START_DATE}_${END_DATE}.log"
echo "  - ff_validation_${START_DATE}_${END_DATE}.log"
echo ""
echo "Validation plots saved to: ./validation_plots/"
echo ""
