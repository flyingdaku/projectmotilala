from core.db import get_ts_connection, get_pg_connection

ts_tables = [
    'fundamentals',
    'msi_fundamentals_annual',
    'msi_fundamentals_annual_standalone',
    'msi_fundamentals_quarterly',
    'screener_quarterly_results',
    'screener_annual_results',
    'screener_balance_sheets',
    'screener_cash_flows'
]

print("Checking Timescale DB:")
with get_ts_connection() as ts_conn:
    for t in ts_tables:
        try:
            cur = ts_conn.execute(f"SELECT count(*) as c FROM {t}")
            print(f"{t}: {cur.fetchone()['c']}")
        except Exception as e:
            # table might not exist
            pass
