#!/bin/bash
set -e

# Change directory to the data pipeline root
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline

echo "====================================="
echo " EODHD Audits and Backfills"
echo "====================================="

echo ""
echo "1. Running EOD Audit/Backfill (Sequential)"
python3 scripts/audit_eodhd_eod.py

echo ""
echo "2. Running Corporate Actions Audit/Backfill (Sequential)"
python3 scripts/audit_eodhd_ca.py

echo ""
echo "3. Running Intraday Audit/Backfill (Sequential)"
python3 scripts/audit_eodhd_intraday.py

echo ""
echo "All audits and backfills have been initiated successfully."
