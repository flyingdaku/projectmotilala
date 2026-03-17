#!/usr/bin/env python3
"""
Populate TimescaleDB (artha_timeseries) from SQLite market_data.db
Migrates all time-series tables
"""

import sqlite3
import psycopg2
from psycopg2.extras import execute_batch
import os
from datetime import datetime

# Database connections
SQLITE_DB = '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db'
TS_DSN = os.getenv('PG_TIMESERIES_DSN', 'host=localhost port=5433 dbname=artha_timeseries user=artha password=artha_dev_password')

def migrate_table(sqlite_conn, pg_conn, table_name, batch_size=5000):
    """Migrate a table from SQLite to TimescaleDB"""
    print(f"Migrating {table_name}...")
    
    # Get data from SQLite
    sqlite_cur = sqlite_conn.cursor()
    sqlite_cur.execute(f"SELECT * FROM {table_name}")
    rows = sqlite_cur.fetchall()
    
    if not rows:
        print(f"  ✓ {table_name}: 0 rows (empty)")
        return
    
    # Get column names
    columns = [desc[0] for desc in sqlite_cur.description]
    
    # Prepare PostgreSQL insert
    pg_cur = pg_conn.cursor()
    placeholders = ','.join(['%s'] * len(columns))
    insert_sql = f"INSERT INTO {table_name} ({','.join(columns)}) VALUES ({placeholders}) ON CONFLICT DO NOTHING"
    
    # Batch insert
    execute_batch(pg_cur, insert_sql, rows, page_size=batch_size)
    pg_conn.commit()
    
    print(f"  ✓ {table_name}: {len(rows):,} rows migrated")

def main():
    print("=" * 80)
    print("TimescaleDB (artha_timeseries) Population from SQLite")
    print("=" * 80)
    
    # Connect to databases
    print("\nConnecting to databases...")
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    pg_conn = psycopg2.connect(TS_DSN)
    
    # Time-series tables to migrate
    tables = [
        'daily_prices',
        'eodhd_daily_prices',
        'eodhd_intraday_prices',
        'price_reconciliation',
        'daily_market_cap',
        'fundamentals',
        'src_screener_quarterly',
        'src_screener_balance_sheet',
        'src_screener_cashflow',
        'src_screener_ratios',
        'src_msi_quarterly',
        'src_msi_balance_sheet',
        'src_msi_cashflow',
        'src_msi_quarterly_standalone',
        'src_msi_balance_sheet_standalone',
        'src_msi_cashflow_standalone',
        'src_msi_ratios',
        'src_msi_ratios_standalone',
        'msi_fundamentals_annual',
        'msi_fundamentals_annual_standalone',
        'msi_ratios_annual',
        'msi_ratios_annual_standalone',
        'annual_book_value',
        'msi_ratios_quarterly',
        'msi_shareholding',
        'msi_institutional_activity',
        'rbi_tbill_yields',
        'index_constituents',
        'ff_factor_returns',
        'ff_iima_portfolio_returns',
        'ff_portfolio_constituents',
        'ff_size_bm_breakpoints',
        'ff_stock_eligibility',
        'ff_validation_metrics',
        'cogencis_shareholding_timeseries',
        'cogencis_shareholding_categories',
        'cogencis_bulk_deals',
        'cogencis_block_deals',
        'cogencis_insider_trades',
        'cogencis_sast_events',
        'cogencis_pledge_shares',
    ]
    
    for table in tables:
        try:
            migrate_table(sqlite_conn, pg_conn, table)
        except Exception as e:
            print(f"  ✗ {table}: ERROR - {e}")
    
    sqlite_conn.close()
    pg_conn.close()
    
    print("\n" + "=" * 80)
    print("Migration complete!")
    print("=" * 80)

if __name__ == '__main__':
    main()
