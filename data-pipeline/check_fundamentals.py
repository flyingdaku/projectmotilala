from core.db import get_pg_connection

with get_pg_connection() as conn:
    print("Relational Tables containing 'fund':")
    cur = conn.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE '%fund%'")
    tf = cur.fetchall()
    for row in tf:
        tname = row['table_name']
        try:
            count = conn.execute(f"SELECT COUNT(*) as cnt FROM {tname}").fetchone()['cnt']
            print(f"{tname}: {count} rows")
        except Exception as e:
            print(f"Error checking {tname}: {e}")
