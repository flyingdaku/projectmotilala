#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline"
LOG_DIR="$ROOT/logs"
mkdir -p "$LOG_DIR"

NSE_PATTERN="-m pipelines.backfill.prices --from 2000-01-03 --to 2026-03-20 --nse-only --workers 3"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

run_step() {
  local name="$1"
  shift
  local log_file="$LOG_DIR/${name}.log"
  log "Starting ${name}"
  "$@" 2>&1 | tee "$log_file"
  log "Finished ${name}"
}

cd "$ROOT"

while pgrep -af -- "$NSE_PATTERN" >/dev/null; do
  log "NSE backfill still running; waiting 60s before starting BSE/EODHD stages"
  sleep 60
done

run_step restore_bse \
  python3 -u -m pipelines.backfill.prices \
    --from 2006-03-01 \
    --to 2026-03-12 \
    --bse-only \
    --workers 3

run_step build_eodhd_mapping \
  python3 -u scripts/build_eodhd_mapping.py --refresh

run_step load_eodhd_eod \
  python3 -u scripts/pg_load_eodhd_eod.py
