#!/bin/bash
# Helper script to run all intraday backfills in the background
mkdir -p logs

echo "Starting 1h backfill..."
PYTHONPATH=. nohup python3 scripts/backfill_eodhd_intraday.py --interval 1h > logs/eodhd_intraday_1h_backfill.log 2>&1 &
PID_1H=$!
echo "1h backfill running with PID $PID_1H"

echo "Starting 5m backfill..."
PYTHONPATH=. nohup python3 scripts/backfill_eodhd_intraday.py --interval 5m > logs/eodhd_intraday_5m_backfill.log 2>&1 &
PID_5M=$!
echo "5m backfill running with PID $PID_5M"

echo "Starting 1m backfill (limited to 120 days)..."
PYTHONPATH=. nohup python3 scripts/backfill_eodhd_intraday.py --interval 1m > logs/eodhd_intraday_1m_backfill.log 2>&1 &
PID_1M=$!
echo "1m backfill running with PID $PID_1M"

echo "All backfills started. Check logs/ directory for progress."
