#!/usr/bin/env python3
"""
Populate PostgreSQL (artha_relational) from SQLite market_data.db
Migrates all relational/metadata tables
"""

import sqlite3
import psycopg2
from psycopg2.extras import execute_batch
import os
from datetime import datetime

# Database connections
SQLITE_DB = '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db'
PG_DSN = os.getenv('PG_RELATIONAL_DSN', 'host=localhost port=5432 dbname=artha_relational user=artha password=artha_dev_password')

def migrate_table(sqlite_conn, pg_conn, table_name, batch_size=1000):
    """Migrate a table from SQLite to PostgreSQL"""
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
    print("PostgreSQL (artha_relational) Population from SQLite")
    print("=" * 80)
    
    # Connect to databases
    print("\nConnecting to databases...")
    sqlite_conn = sqlite3.connect(SQLITE_DB)
    pg_conn = psycopg2.connect(PG_DSN)
    
    # Tables to migrate (relational/metadata only)
    tables = [
        'assets',
        'nse_corp_actions_staging',
        'bse_corp_actions_staging',
        'corporate_actions',
        'distribution_components',
        'merger_events',
        'pipeline_runs',
        'trading_holidays',
        'msi_company_data',
        'cogencis_company_metadata',
        'cogencis_filings',
        'cogencis_management',
        'fundamental_conflicts',
        'asset_metrics',
        'eodhd_exchange_mappings',
        'index_metadata',
        'ff_computation_log',
        'ff_iima_size_breakpoints',
        'ff_iima_bm_breakpoints',
        'ff_iima_op_breakpoints',
        'ff_iima_inv_breakpoints',
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
