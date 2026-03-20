import re

with open("scripts/backfill_eodhd.py", "r") as f:
    code = f.read()

# Replace get_connection import
code = code.replace("from core.db import get_connection, generate_id", "from core.db import get_pg_connection, get_ts_connection, generate_id")

# Replace get_connection calls
# 1. in _already_has_data, it receives conn directly, so no get_connection call to replace there.
# 2. in backfill_symbol
code = code.replace("with get_connection() as conn:", "with get_ts_connection() as conn:")

# 3. in run_backfill for symbol mappings
code = code.replace("with get_ts_connection() as conn:\n        q_parts = [\"SELECT asset_id", "with get_pg_connection() as conn:\n        q_parts = [\"SELECT asset_id")

# 4. in backfill_ca_symbol
code = code.replace("with get_ts_connection() as conn:\n            for row in rows_to_insert", "with get_pg_connection() as conn:\n            for row in rows_to_insert")

# 5. in run_ca_backfill
code = code.replace("with get_ts_connection() as conn:\n        q = \"\"\"\n            SELECT asset_id", "with get_pg_connection() as conn:\n        q = \"\"\"\n            SELECT asset_id")

# Fix SQL statements
sql_daily = """INSERT INTO eodhd_daily_prices
                (asset_id, date, open, high, low, close, adjusted_close,
                 volume, eodhd_symbol, exchange, fetched_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)
                ON CONFLICT (asset_id, date, exchange) DO UPDATE SET
                open=EXCLUDED.open, high=EXCLUDED.high, low=EXCLUDED.low,
                close=EXCLUDED.close, adjusted_close=EXCLUDED.adjusted_close,
                volume=EXCLUDED.volume, eodhd_symbol=EXCLUDED.eodhd_symbol,
                fetched_at=EXCLUDED.fetched_at"""

code = re.sub(r'INSERT OR REPLACE INTO eodhd_daily_prices.*?VALUES \(\?,\?,\?,\?,\?,\?,\?,\?,\?,\?,\?\)', sql_daily, code, flags=re.DOTALL)

sql_ca = """INSERT INTO eodhd_corporate_actions
                        (id, asset_id, date, type, value,
                         declaration_date, payment_date, record_date,
                         raw_json, fetched_at)
                        VALUES (?,?,?,?,?,?,?,?,?,?)
                        ON CONFLICT DO NOTHING"""
# wait, what's the primary key on eodhd_corporate_actions ?
# Let's check schema.sql for corporate actions

with open("scripts/backfill_eodhd.py", "w") as f:
    f.write(code)
