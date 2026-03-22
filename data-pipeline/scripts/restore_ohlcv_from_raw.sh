#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline"
LOG_DIR="$ROOT/logs"
mkdir -p "$LOG_DIR"

run_step() {
  local name="$1"
  shift
  local log_file="$LOG_DIR/${name}.log"

  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting ${name}"
  "$@" 2>&1 | tee "$log_file"
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Finished ${name}"
}

cd "$ROOT"

run_step restore_nse \
  python3 -u -m pipelines.backfill.prices \
    --from 2000-01-03 \
    --to 2026-03-20 \
    --nse-only \
    --workers 3

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
