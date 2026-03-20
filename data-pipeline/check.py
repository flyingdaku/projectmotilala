import psycopg2
import sys

try:
    conn = psycopg2.connect("postgresql://artha:artha_dev_password@localhost:5432/artha_relational")
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%eodhd%'")
    tables = cur.fetchall()
    
    if not tables:
        print("No eodhd tables found in artha_relational.")
    else:
        for t in tables:
            t_name = t[0]
            cur.execute(f"SELECT COUNT(*) FROM {t_name}")
            print(f"artha_relational | Table: {t_name} | Rows: {cur.fetchone()[0]}")
    conn.close()
    
    conn = psycopg2.connect("postgresql://artha:artha_dev_password@localhost:5433/artha_timeseries")
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%eodhd%'")
    tables = cur.fetchall()
    
    if not tables:
        print("No eodhd tables found in artha_timeseries.")
    else:
        for t in tables:
            t_name = t[0]
            cur.execute(f"SELECT COUNT(*) FROM {t_name}")
            count = cur.fetchone()[0]
            print(f"artha_timeseries | Table: {t_name} | Rows: {count}")
            # get columns
            cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = %s", (t_name,))
            cols = cur.fetchall()
            date_cols = [c[0] for c in cols if 'date' in c[1].lower() or 'time' in c[1].lower()]
            if date_cols and count > 0:
                for c in date_cols:
                    cur.execute(f"SELECT MAX({c}) FROM {t_name}")
                    print(f"  Latest {c}: {cur.fetchone()[0]}")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
