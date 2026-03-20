#!/usr/bin/env bash
# backup_postgres.sh — Daily pg_dump backups for artha_relational and artha_timeseries
#
# Usage:
#   ./scripts/backup_postgres.sh                    # backup both databases
#   ./scripts/backup_postgres.sh --relational-only  # relational only
#   ./scripts/backup_postgres.sh --timeseries-only  # timeseries only
#
# Backups are stored in: data-pipeline/db/backups/YYYY-MM-DD/
# Retention: last 7 days (older backups auto-pruned)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_ROOT="$(cd "$SCRIPT_DIR/../db/backups" 2>/dev/null || mkdir -p "$SCRIPT_DIR/../db/backups" && cd "$SCRIPT_DIR/../db/backups" && pwd)"
BACKUP_DATE="$(date +%Y-%m-%d)"
BACKUP_DIR="$BACKUP_ROOT/$BACKUP_DATE"
RETENTION_DAYS=7

PG_CONTAINER="artha_postgres"
TS_CONTAINER="artha_timescale"
PG_USER="artha"
PG_RELATIONAL_DB="artha_relational"
TS_DB="artha_timeseries"

mkdir -p "$BACKUP_DIR"

skip_relational=false
skip_timeseries=false

for arg in "$@"; do
  case "$arg" in
    --relational-only) skip_timeseries=true ;;
    --timeseries-only) skip_relational=true ;;
  esac
done

echo "============================================"
echo "  Artha PostgreSQL Backup — $BACKUP_DATE"
echo "============================================"
echo "  Backup dir: $BACKUP_DIR"
echo ""

# ── Backup artha_relational ───────────────────────────────────────────────────
if [ "$skip_relational" = false ]; then
  RELATIONAL_FILE="$BACKUP_DIR/artha_relational_${BACKUP_DATE}.dump"
  echo "📦 Backing up $PG_RELATIONAL_DB..."
  docker exec "$PG_CONTAINER" \
    pg_dump -U "$PG_USER" -d "$PG_RELATIONAL_DB" -Fc --no-acl --no-owner \
    > "$RELATIONAL_FILE"
  SIZE=$(du -sh "$RELATIONAL_FILE" | cut -f1)
  echo "   ✅ artha_relational → $(basename "$RELATIONAL_FILE")  [$SIZE]"
fi

# ── Backup artha_timeseries ───────────────────────────────────────────────────
if [ "$skip_timeseries" = false ]; then
  TIMESERIES_FILE="$BACKUP_DIR/artha_timeseries_${BACKUP_DATE}.dump"
  echo "📦 Backing up $TS_DB..."
  docker exec "$TS_CONTAINER" \
    pg_dump -U "$PG_USER" -d "$TS_DB" -Fc --no-acl --no-owner \
    > "$TIMESERIES_FILE"
  SIZE=$(du -sh "$TIMESERIES_FILE" | cut -f1)
  echo "   ✅ artha_timeseries → $(basename "$TIMESERIES_FILE")  [$SIZE]"
fi

# ── Prune old backups ─────────────────────────────────────────────────────────
echo ""
echo "🗑️  Pruning backups older than $RETENTION_DAYS days..."
find "$BACKUP_ROOT" -maxdepth 1 -type d -name "????-??-??" | sort | head -n -"$RETENTION_DAYS" | while read -r old_dir; do
  echo "   Removing: $(basename "$old_dir")"
  rm -rf "$old_dir"
done

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "============================================"
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "  ✅ Backup complete — $TOTAL_SIZE total in $BACKUP_DIR"
echo "============================================"
echo ""

# List existing backups
echo "Existing backups:"
find "$BACKUP_ROOT" -maxdepth 1 -type d -name "????-??-??" | sort | while read -r d; do
  SIZE=$(du -sh "$d" | cut -f1)
  echo "  $(basename "$d")  [$SIZE]"
done
