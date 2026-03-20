import psycopg2
import sys
import os

URL_RELATIONAL = "postgresql://artha:artha_dev_password@localhost:5432/artha_relational"
URL_TIMESERIES = "postgresql://artha:artha_dev_password@localhost:5433/artha_timeseries"

def check_db(url, name):
    print(f"\n--- Checking {name} ---")
    try:
        conn = psycopg2.connect(url)
        cur = conn.cursor()
        cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%eodhd%'")
        tables = cur.fetchall()
        
        if not tables:
            print("No eodhd tables found.")
            conn.close()
            return
        
        for record in tables:
            t = record[0]
            cur.execute(f"SELECT COUNT(*) FROM {t}")
            count = cur.fetchone()[0]
            print(f"Table: {t} | Rows: {count}")
            
            cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = %s", (t,))
            cols = cur.fetchall()
            date_cols = [c[0] for c in cols if 'date' in c[1].lower() or 'time' in c[1].lower()]
            
            if date_cols and count > 0:
                for d in date_cols:
                    try:
                        cur.execute(f"SELECT MAX({d}) FROM {t}")
                        max_date = cur.fetchone()[0]
                        print(f"  Latest {d}: {max_date}")
                    except Exception as e:
                        print(f"  Error fetching max for {d}: {e}")
            else:
                if not date_cols:
                    print("  No date/time string column found.")
                    
        conn.close()
    except Exception as e:
        print(f"Error connecting to {name}: {e}")

def main():
    check_db(URL_RELATIONAL, "Relational DB (metadata, etc)")
    check_db(URL_TIMESERIES, "Timeseries DB (prices, tracking)")

if __name__ == "__main__":
    main()
