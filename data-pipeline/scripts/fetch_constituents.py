import os
import sys
import argparse
import requests
import time
import urllib.parse
from datetime import date

# Add root project dir to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from core.db import get_connection, generate_id

def main():
    parser = argparse.ArgumentParser(description="Backfill Nifty Indices constituents")
    args = parser.parse_args()

    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
    })
    session.get("https://www.nseindia.com", timeout=15)
    
    trade_date = date.today().isoformat()

    with get_connection() as conn:
        rows = conn.execute("SELECT id, name, nse_symbol FROM assets WHERE asset_class = 'INDEX'").fetchall()
        indices = [{"id": r['id'], "name": r['name'], "symbol": r['nse_symbol']} for r in rows]
        
        print(f"Found {len(indices)} indices in DB. Fetching constituents...")
        
        total_constituents = 0
        
        for idx in indices:
            name = idx['name']
            idx_id = idx['id']
            encoded_name = urllib.parse.quote(name)
            url = f"https://www.nseindia.com/api/equity-stockIndices?index={encoded_name}"
            
            try:
                resp = session.get(url, timeout=15)
                if resp.status_code == 200:
                    data = resp.json()
                    constituents = [item for item in data.get('data', []) if item.get('priority', 0) == 0]
                    total_ffmc = sum([c.get('ffmc', 0) for c in constituents])
                    
                    inserted = 0
                    for c in constituents:
                        sym = c.get('symbol')
                        ffmc = c.get('ffmc', 0)
                        if sym and total_ffmc > 0:
                            weight = (ffmc / total_ffmc) * 100.0
                            
                            # Resolve asset_id
                            stock_row = conn.execute("SELECT id FROM assets WHERE nse_symbol = %s", (sym,)).fetchone()
                            if stock_row:
                                stock_id = stock_row['id']
                            else:
                                stock_id = generate_id()
                                conn.execute(
                                    "INSERT INTO assets (id, nse_symbol, name, asset_class, is_active) VALUES (%s, %s, %s, 'EQUITY', 1) ON CONFLICT (id) DO NOTHING",
                                    (stock_id, sym, sym)
                                )
                                
                            conn.execute(
                                """INSERT INTO index_constituents 
                                   (index_id, asset_id, date, weight, ffmc)
                                   VALUES (%s, %s, %s, %s, %s)
                                   ON CONFLICT (index_id, asset_id, date) DO UPDATE SET
                                     weight = EXCLUDED.weight, ffmc = EXCLUDED.ffmc""",
                                (idx_id, stock_id, trade_date, weight, ffmc)
                            )
                            inserted += 1
                            
                    if inserted > 0:
                        print(f"[{name}] {inserted} constituents inserted.")
                        total_constituents += inserted
                    time.sleep(0.5)
            except Exception as e:
                print(f"Error fetching {name}: {e}")

        print(f"Done! {total_constituents} total constituent records saved.")

if __name__ == "__main__":
    main()
