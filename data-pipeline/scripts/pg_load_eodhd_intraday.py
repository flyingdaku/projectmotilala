#!/usr/bin/env python3
import os
import sys
import json
from pathlib import Path
from datetime import datetime, timezone

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from core.db import get_pg_connection, get_ts_connection

def load_intraday():
    raw_dir = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/EODHD/intraday")
    
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

    intraday_files = list(raw_dir.rglob("intraday_*.json"))
    print(f"Found {len(intraday_files)} intraday JSON files to process.")

    total_inserted = 0

    sql = """
        INSERT INTO eodhd_intraday_prices
        (asset_id, ts, resolution, open, high, low, close, volume, eodhd_symbol, exchange)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT (asset_id, ts, resolution) DO NOTHING
    """

    with get_ts_connection() as ts_conn:
        for i, fp in enumerate(intraday_files):
            try:
                parts = fp.name.replace(".json", "").split("_")
                # intraday_{symbol}_{exchange}_{interval}_{from}_{to}
                if len(parts) >= 6:
                    symbol = parts[1]
                    exch = parts[2]
                    resolution = parts[3]
                    
                    eodhd_sym = f"{symbol}.{exch}"
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue
                    
                    with open(fp, "r") as f:
                        data = json.load(f)
                        
                    batch = []
                    for row in data:
                        timestamp = row.get("timestamp")
                        if not timestamp: continue
                        
                        ts_dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
                        close_px = row.get("close")
                        if close_px is None: continue
                        
                        batch.append((
                            asset_id,
                            ts_dt.isoformat(),
                            resolution,
                            row.get("open"),
                            row.get("high"),
                            row.get("low"),
                            float(close_px),
                            row.get("volume"),
                            eodhd_sym,
                            exch
                        ))
                        
                    if batch:
                        ts_conn.executemany(sql, batch)
                        ts_conn.commit()
                        total_inserted += len(batch)
            except Exception as e:
                pass
                
            if (i+1) % 500 == 0:
                print(f"Processed {i+1}/{len(intraday_files)} files. Inserted {total_inserted} rows...")

    print(f"Done. Total intraday prices inserted: {total_inserted}")

if __name__ == "__main__":
    load_intraday()
