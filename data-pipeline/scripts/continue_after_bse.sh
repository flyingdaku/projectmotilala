#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline"
LOG_DIR="$ROOT/logs"
mkdir -p "$LOG_DIR"

BSE_PATTERN="pipelines.backfill.prices .*--bse-only"

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

while pgrep -af -- "$BSE_PATTERN" >/dev/null; do
  log "BSE backfill still running; waiting 60s before starting EODHD stages"
  sleep 60
done

run_step build_eodhd_mapping \
  python3 -u scripts/build_eodhd_mapping.py --refresh

run_step load_eodhd_eod \
  python3 -u scripts/pg_load_eodhd_eod.py
