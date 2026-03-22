"""
Comprehensive Bhavcopy Audit
============================
Checks:
  1. Raw file presence on disk (NSE + BSE) from 2000-01-01 to today
  2. EOD price row counts per year in the TimescaleDB daily_prices table
  3. Most recent date in DB vs expected (today/last trading day)
  4. Lists the 20 most recent missing raw-file dates

Skips weekends. Does NOT attempt to fill any gaps.

Usage:
    python scripts/audit_bhavcopies_full.py
    python scripts/audit_bhavcopies_full.py --start 2018-01-01
"""
import sys
import os
from datetime import date, timedelta
from pathlib import Path
import argparse

sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.storage import raw_file_exists

# ── NSE filename format helper ─────────────────────────────────────────────────
def nse_filename(d: date) -> str:
    return f"cm{d.strftime('%d%b%Y').upper()}bhav.csv.zip"

# ── BSE filename format helper ─────────────────────────────────────────────────
def bse_filename(d: date) -> str:
    return f"EQ_ISINCODE_{d.strftime('%d%m%y')}.zip"


def audit_raw_files(start: date, end: date):
    nse_missing, bse_missing = [], []
    nse_present = bse_present = weekdays = 0

    current = start
    while current <= end:
        if current.weekday() < 5:
            weekdays += 1
            if raw_file_exists("NSE_BHAVCOPY", current, nse_filename(current)):
                nse_present += 1
            else:
                nse_missing.append(current)

            if raw_file_exists("BSE_BHAVCOPY", current, bse_filename(current)):
                bse_present += 1
            else:
                bse_missing.append(current)

        current += timedelta(days=1)

    return weekdays, nse_present, nse_missing, bse_present, bse_missing


def audit_db(start: date):
    """Check daily_prices row counts per year and most recent date."""
    try:
        from core.db import get_prices_db
        with get_prices_db() as conn:
            # Per-year counts
            rows = conn.fetchall("""
                SELECT
                    EXTRACT(YEAR FROM date)::int AS yr,
                    source_exchange,
                    COUNT(*) AS cnt
                FROM daily_prices
                WHERE date >= %s
                GROUP BY yr, source_exchange
                ORDER BY yr, source_exchange
            """, (start.isoformat(),))

            # Most recent date per exchange
            latest = conn.fetchall("""
                SELECT source_exchange, MAX(date)::text AS latest_date
                FROM daily_prices
                GROUP BY source_exchange
                ORDER BY source_exchange
            """)

            # Today's row check
            today = date.today()
            today_rows = conn.fetchall("""
                SELECT source_exchange, COUNT(*) AS cnt
                FROM daily_prices
                WHERE date = %s
                GROUP BY source_exchange
            """, (today.isoformat(),))

        return rows, latest, today_rows
    except Exception as exc:
        print(f"  ⚠️  DB check failed: {exc}")
        return [], [], []


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", default="2000-01-01", help="Start date YYYY-MM-DD")
    args = parser.parse_args()

    start = date.fromisoformat(args.start)
    end   = date.today()

    print("=" * 62)
    print("  BHAVCOPY AUDIT")
    print(f"  Range  : {start} → {end}")
    print("=" * 62)

    # ── 1. Raw file audit ────────────────────────────────────────────────────
    print("\n[1/2] Scanning raw files on disk...")
    weekdays, nse_present, nse_missing, bse_present, bse_missing = audit_raw_files(start, end)

    nse_pct = 100 * nse_present / weekdays if weekdays else 0
    bse_pct = 100 * bse_present / weekdays if weekdays else 0

    print(f"\n  Weekdays in range  : {weekdays:,}")
    print(f"\n  NSE Raw Files")
    print(f"    Present          : {nse_present:,}  ({nse_pct:.1f}%)")
    print(f"    Missing          : {len(nse_missing):,}")
    if nse_missing:
        recent = nse_missing[-20:]
        print(f"    20 most recent   : {', '.join(str(d) for d in recent)}")

    print(f"\n  BSE Raw Files")
    print(f"    Present          : {bse_present:,}  ({bse_pct:.1f}%)")
    print(f"    Missing          : {len(bse_missing):,}")
    if bse_missing:
        recent = bse_missing[-20:]
        print(f"    20 most recent   : {', '.join(str(d) for d in recent)}")

    # ── 2. DB audit ──────────────────────────────────────────────────────────
    print("\n[2/2] Checking daily_prices in TimescaleDB...")
    db_year_rows, latest_rows, today_rows = audit_db(start)

    if db_year_rows:
        print("\n  Row counts per year (daily_prices):")
        prev_yr = None
        for r in db_year_rows:
            if r["yr"] != prev_yr:
                print(f"    {r['yr']}:", end="")
                prev_yr = r["yr"]
            print(f"  {r['source_exchange']}={r['cnt']:,}", end="")
        print()

        print("\n  Most recent date per exchange:")
        for r in latest_rows:
            print(f"    {r['source_exchange']:6s}  → {r['latest_date']}")

        print(f"\n  Rows for today ({date.today()}):")
        if today_rows:
            for r in today_rows:
                print(f"    {r['source_exchange']:6s}  → {r['cnt']:,} rows")
        else:
            print("    ⚠️  No rows for today — bhavcopy may not have been ingested yet")
    else:
        print("  (No DB results returned)")

    print("\n" + "=" * 62)
    print("  Audit complete.")
    print("=" * 62)


if __name__ == "__main__":
    main()
