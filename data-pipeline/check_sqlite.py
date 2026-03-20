import sqlite3

db_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/market_data.db"
try:
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    # Correct column name for sqlite_master is 'name'
    cur.execute("SELECT name FROM sqlite_master WHERE type='table' OR type='view'")
    for (tname,) in cur.fetchall():
        if "msi" in tname.lower() or "fund" in tname.lower() or "screener" in tname.lower():
            try:
                c = conn.execute(f"SELECT COUNT(*) FROM {tname}").fetchone()[0]
                print(f"{tname}: {c}")
            except Exception as e:
                print(f"Error checking {tname}: {e}")
except Exception as e:
    print(f"DB Error: {e}")
