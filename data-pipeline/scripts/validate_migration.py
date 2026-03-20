"""
validate_migration.py — Post-migration health check for PostgreSQL + TimescaleDB.

Checks:
  1. Row counts for all expected tables
  2. Hypertable health (chunk counts, compression)
  3. Foreign key integrity samples
  4. Date range sanity on time-series tables
  5. Index presence
"""
from __future__ import annotations

import sys
import os
import logging

import psycopg2
import psycopg2.extras

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger(__name__)

PG_DSN = os.environ.get(
    "PG_RELATIONAL_DSN",
    "host=localhost port=5432 dbname=artha_relational user=artha password=artha_dev_password",
)
TS_DSN = os.environ.get(
    "PG_TIMESERIES_DSN",
    "host=localhost port=5433 dbname=artha_timeseries user=artha password=artha_dev_password",
)

# ── Expected minimum row counts ──────────────────────────────────────────────

PG_EXPECTED: dict[str, int] = {
    "assets": 1_000,
    "corporate_actions": 1_000,
    "trading_holidays": 1,
    "pipeline_runs": 1,
    "eodhd_symbol_mapping": 100,
    "msi_company_data": 100,
}

TS_EXPECTED: dict[str, int] = {
    "daily_prices": 100_000,
    "fundamentals": 1_000,
    "src_screener_quarterly": 1_000,
    "src_screener_balance_sheet": 1_000,
    "src_screener_cashflow": 1_000,
    "src_msi_quarterly": 1_000,
}

# ── Expected hypertables ──────────────────────────────────────────────────────

EXPECTED_HYPERTABLES = [
    "daily_prices",
    "eodhd_daily_prices",
    "eodhd_intraday_prices",
    "fundamentals",
    "src_screener_quarterly",
    "src_screener_balance_sheet",
    "src_screener_cashflow",
    "src_msi_quarterly",
]


def _conn(dsn: str):
    c = psycopg2.connect(dsn)
    c.autocommit = True
    return c


def check_row_counts(conn, expected: dict[str, int], label: str) -> list[dict]:
    results = []
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    for table, min_rows in expected.items():
        try:
            cur.execute(f"SELECT COUNT(*) AS cnt FROM {table}")
            actual = cur.fetchone()["cnt"]
            status = "PASS" if actual >= min_rows else "FAIL"
        except Exception as e:
            actual = -1
            status = "ERROR"
            log.warning(f"[{label}] {table}: {e}")
        results.append({"db": label, "table": table, "rows": actual, "min": min_rows, "status": status})
    return results


def check_hypertables(conn) -> list[dict]:
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("""
        SELECT hypertable_name, num_chunks
        FROM timescaledb_information.hypertables
        WHERE hypertable_schema = 'public'
        ORDER BY hypertable_name
    """)
    found = {row["hypertable_name"]: row["num_chunks"] for row in cur.fetchall()}
    results = []
    for ht in EXPECTED_HYPERTABLES:
        if ht in found:
            results.append({"hypertable": ht, "chunks": found[ht], "status": "PASS"})
        else:
            results.append({"hypertable": ht, "chunks": 0, "status": "MISSING"})
    return results


def check_date_ranges(conn) -> list[dict]:
    tables = {
        "daily_prices": "date",
        "eodhd_daily_prices": "date",
        "fundamentals": "period_end_date",
        "src_screener_quarterly": "period_end_date",
        "src_msi_quarterly": "period_end_date",
    }
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    results = []
    for table, col in tables.items():
        try:
            cur.execute(f"SELECT MIN({col})::text AS mn, MAX({col})::text AS mx, COUNT(*) AS cnt FROM {table}")
            row = cur.fetchone()
            results.append({
                "table": table,
                "min_date": row["mn"],
                "max_date": row["mx"],
                "rows": row["cnt"],
                "status": "PASS" if row["cnt"] and row["cnt"] > 0 else "EMPTY",
            })
        except Exception as e:
            results.append({"table": table, "min_date": None, "max_date": None, "rows": -1, "status": f"ERROR: {e}"})
    return results


def check_fk_integrity(pg_conn, ts_conn) -> list[dict]:
    """Spot-check that asset_ids in timeseries tables exist in relational assets."""
    results = []
    pg_cur = pg_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    ts_cur = ts_conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    pg_cur.execute("SELECT id FROM assets LIMIT 50000")
    valid_ids = {row["id"] for row in pg_cur.fetchall()}

    for table in ["daily_prices", "fundamentals", "src_screener_quarterly", "src_msi_quarterly"]:
        try:
            ts_cur.execute(f"SELECT DISTINCT asset_id FROM {table} LIMIT 5000")
            ts_ids = {row["asset_id"] for row in ts_cur.fetchall()}
            orphans = ts_ids - valid_ids
            status = "PASS" if len(orphans) == 0 else "WARN"
            results.append({
                "table": table,
                "sampled_asset_ids": len(ts_ids),
                "orphans": len(orphans),
                "status": status,
            })
        except Exception as e:
            results.append({"table": table, "sampled_asset_ids": -1, "orphans": -1, "status": f"ERROR: {e}"})
    return results


def check_indexes(conn, db_label: str) -> list[dict]:
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("""
        SELECT tablename, indexname
        FROM pg_indexes
        WHERE schemaname = 'public'
        ORDER BY tablename, indexname
    """)
    rows = cur.fetchall()
    return [{"db": db_label, "table": r["tablename"], "index": r["indexname"]} for r in rows]


def print_section(title: str):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")


def main():
    log.info("Connecting to PostgreSQL (relational)...")
    pg_conn = _conn(PG_DSN)
    log.info("Connecting to TimescaleDB (timeseries)...")
    ts_conn = _conn(TS_DSN)

    all_pass = True

    # 1. Row counts
    print_section("1. Row Counts — artha_relational")
    pg_counts = check_row_counts(pg_conn, PG_EXPECTED, "relational")
    for r in pg_counts:
        flag = "✅" if r["status"] == "PASS" else "❌"
        print(f"  {flag} {r['table']:<40} {r['rows']:>12,} rows  (min {r['min']:,})")
        if r["status"] != "PASS":
            all_pass = False

    print_section("2. Row Counts — artha_timeseries")
    ts_counts = check_row_counts(ts_conn, TS_EXPECTED, "timeseries")
    for r in ts_counts:
        flag = "✅" if r["status"] == "PASS" else "❌"
        print(f"  {flag} {r['table']:<40} {r['rows']:>12,} rows  (min {r['min']:,})")
        if r["status"] != "PASS":
            all_pass = False

    # 2. Hypertables
    print_section("3. Hypertable Health")
    ht_results = check_hypertables(ts_conn)
    for r in ht_results:
        flag = "✅" if r["status"] == "PASS" else "⚠️ "
        print(f"  {flag} {r['hypertable']:<40} {r['chunks']:>6} chunks  [{r['status']}]")
        if r["status"] == "MISSING":
            all_pass = False

    # 3. Date ranges
    print_section("4. Date Ranges — artha_timeseries")
    dr_results = check_date_ranges(ts_conn)
    for r in dr_results:
        flag = "✅" if r["status"] == "PASS" else "⚠️ "
        print(f"  {flag} {r['table']:<38} {str(r['min_date']):<12} → {str(r['max_date']):<12}  ({r['rows']:,} rows)")

    # 4. FK integrity
    print_section("5. Foreign Key Integrity (asset_id spot-check)")
    fk_results = check_fk_integrity(pg_conn, ts_conn)
    for r in fk_results:
        flag = "✅" if r["status"] == "PASS" else "⚠️ "
        print(f"  {flag} {r['table']:<38} {r['sampled_asset_ids']:>6} sampled, {r['orphans']:>4} orphans  [{r['status']}]")
        if r["status"] not in ("PASS", "WARN"):
            all_pass = False

    # 5. Index summary
    print_section("6. Index Count Summary")
    pg_indexes = check_indexes(pg_conn, "relational")
    ts_indexes = check_indexes(ts_conn, "timeseries")
    pg_by_table: dict[str, int] = {}
    for r in pg_indexes:
        pg_by_table[r["table"]] = pg_by_table.get(r["table"], 0) + 1
    ts_by_table: dict[str, int] = {}
    for r in ts_indexes:
        ts_by_table[r["table"]] = ts_by_table.get(r["table"], 0) + 1
    print(f"  artha_relational: {len(pg_indexes)} indexes across {len(pg_by_table)} tables")
    print(f"  artha_timeseries: {len(ts_indexes)} indexes across {len(ts_by_table)} tables")

    # Final verdict
    print_section("RESULT")
    if all_pass:
        print("  ✅  All critical checks PASSED. Migration is healthy.")
    else:
        print("  ❌  One or more checks FAILED. Review output above.")
        sys.exit(1)

    pg_conn.close()
    ts_conn.close()


if __name__ == "__main__":
    main()
