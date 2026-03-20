from core.db import get_ts_connection, get_pg_connection

with get_ts_connection() as conn:
    print("Timescale DB Tables:")
    cur = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    for row in cur.fetchall():
        tname = row['table_name']
        try:
            count = conn.execute(f"SELECT COUNT(*) as c FROM {tname}").fetchone()['c']
            print(f"{tname}: {count}")
        except Exception as e:
            pass

with get_pg_connection() as conn:
    print("\nRelational DB Tables:")
    cur = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
    for row in cur.fetchall():
        tname = row['table_name']
        try:
            count = conn.execute(f"SELECT COUNT(*) as c FROM {tname}").fetchone()['c']
            print(f"{tname}: {count}")
        except Exception as e:
            pass
