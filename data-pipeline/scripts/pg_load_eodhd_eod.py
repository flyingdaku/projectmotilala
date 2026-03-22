#!/usr/bin/env python3
import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from core.db import get_pg_connection, get_ts_connection

def load_all_eod():
    raw_dir = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/EODHD")
    
    print("Loading symbol mapping...")
    with get_pg_connection() as pg_conn:
        cur = pg_conn.execute("SELECT asset_id, eodhd_nse_symbol, eodhd_bse_symbol FROM eodhd_symbol_mapping")
        mappings = cur.fetchall()
        
    mapping_dict = {}
    for r in mappings:
        if r['eodhd_nse_symbol']:
            mapping_dict[r['eodhd_nse_symbol']] = r['asset_id']
        if r['eodhd_bse_symbol']:
            mapping_dict[r['eodhd_bse_symbol']] = r['asset_id']

    print(f"Loaded {len(mapping_dict)} distinct symbol strings.")

    # Find all eod bulk json files
    eod_files = list(raw_dir.rglob("bulk_eod_*.json"))
    print(f"Found {len(eod_files)} bulk EOD JSON files to process.")

    total_inserted = 0
    now = datetime.now().isoformat()

    sql = """
        INSERT INTO eodhd_daily_prices
        (asset_id, date, open, high, low, close, adjusted_close,
         volume, eodhd_symbol, exchange, fetched_at)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT (asset_id, date, exchange) DO UPDATE SET
        open=EXCLUDED.open, high=EXCLUDED.high, low=EXCLUDED.low,
        close=EXCLUDED.close, adjusted_close=EXCLUDED.adjusted_close,
        volume=EXCLUDED.volume, eodhd_symbol=EXCLUDED.eodhd_symbol,
        fetched_at=EXCLUDED.fetched_at
    """

    with get_ts_connection() as ts_conn:
        cur = ts_conn.execute("SELECT count(*) as c FROM eodhd_daily_prices")
        print(f"Initial eodhd_daily_prices count: {cur.fetchone()['c']}")
        
        for i, fp in enumerate(eod_files):
            exchange = "NSE" if "bulk_eod_NSE" in fp.name else "BSE"
            batch = []
            try:
                with open(fp, "r") as f:
                    data = json.load(f)
                    
                for row in data:
                    sym = row.get("code")
                    if not sym: continue
                    eodhd_sym = f"{sym}.{exchange}"
                    
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue
                    
                    close_px = row.get("close")
                    if close_px is None or close_px in ("NA", ""): continue
                    
                    batch.append((
                        asset_id,
                        row.get("date"),
                        row.get("open") if row.get("open") != "NA" else None,
                        row.get("high") if row.get("high") != "NA" else None,
                        row.get("low") if row.get("low") != "NA" else None,
                        float(close_px),
                        row.get("adjusted_close") if row.get("adjusted_close") != "NA" else None,
                        row.get("volume") if row.get("volume") != "NA" else None,
                        eodhd_sym,
                        exchange,
                        now
                    ))
                    
                if batch:
                    ts_conn.executemany(sql, batch)
                    # flush every file commit just to be safe
                    ts_conn.commit()
                    total_inserted += len(batch)
            except Exception as e:
                print(f"Error processing {fp.name}: {e}")
                
            if (i+1) % 100 == 0:
                print(f"Processed {i+1}/{len(eod_files)} files. Inserted {total_inserted} rows...")

        ts_conn.commit()
        cur = ts_conn.execute("SELECT count(*) as c FROM eodhd_daily_prices")
        print(f"Final eodhd_daily_prices count: {cur.fetchone()['c']}")

    print(f"Done. Total rows inserted: {total_inserted}")

if __name__ == "__main__":
    load_all_eod()
