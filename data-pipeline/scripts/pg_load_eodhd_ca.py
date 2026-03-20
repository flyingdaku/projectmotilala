#!/usr/bin/env python3
import os
import sys
import json
import uuid
from pathlib import Path
from datetime import datetime

# Add project root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from core.db import get_pg_connection

def generate_id(asset_id, date, type_str, value):
    return uuid.uuid5(uuid.NAMESPACE_OID, f"{asset_id}_{date}_{type_str}_{value}").hex

def load_all_ca():
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

    # Find all div/splits json files
    div_files = list(raw_dir.rglob("div_*.json"))
    split_files = list(raw_dir.rglob("splits_*.json"))
    
    # Also find bulk
    bulk_div = list(raw_dir.rglob("bulk_divs_*.json"))
    bulk_split = list(raw_dir.rglob("bulk_splits_*.json"))
    
    print(f"Found {len(div_files)} div and {len(split_files)} split per-symbol files.")
    print(f"Found {len(bulk_div)} bulk_div and {len(bulk_split)} bulk_split files.")
    
    total_inserted = 0
    now = datetime.now().isoformat()

    sql = """
        INSERT INTO eodhd_corporate_actions
        (id, asset_id, date, type, value,
         declaration_date, payment_date, record_date,
         raw_json, fetched_at)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        ON CONFLICT DO NOTHING
    """

    with get_pg_connection() as conn:
        # process per-symbol divs
        for fp in div_files:
            try:
                # filename like div_RELIANCE_NSE_2000-01-01.json
                parts = fp.name.replace(".json", "").split("_")
                if len(parts) >= 3:
                    symbol = parts[1]
                    exch = parts[2]
                    eodhd_sym = f"{symbol}.{exch}"
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue
                    
                    with open(fp, "r") as f:
                        data = json.load(f)
                        
                    batch = []
                    for d in data:
                        date_val = d.get("date") or d.get("ex_dividend_date")
                        val = d.get("value")
                        batch.append((
                            generate_id(asset_id, date_val, "dividend", val), asset_id,
                            date_val,
                            "dividend",
                            val,
                            None, None, None,
                            json.dumps(d), now
                        ))
                    if batch:
                        conn.executemany(sql, batch)
                        total_inserted += len(batch)
            except Exception as e:
                pass
                
        # process per-symbol splits
        for fp in split_files:
            try:
                parts = fp.name.replace(".json", "").split("_")
                if len(parts) >= 3:
                    symbol = parts[1]
                    exch = parts[2]
                    eodhd_sym = f"{symbol}.{exch}"
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue
                    
                    with open(fp, "r") as f:
                        data = json.load(f)
                        
                    batch = []
                    for s in data:
                        try:
                            val = float(s.get("split", 0) or 0)
                        except: val = None
                        date_val = s.get("date") or s.get("split_date")
                        batch.append((
                            generate_id(asset_id, date_val, "split", val), asset_id,
                            date_val,
                            "split",
                            val,
                            None, None, None,
                            json.dumps(s), now
                        ))
                    if batch:
                        conn.executemany(sql, batch)
                        total_inserted += len(batch)
            except Exception as e:
                pass

        # process bulk divs
        for fp in bulk_div:
            exchange = "NSE" if "bulk_divs_NSE" in fp.name else "BSE"
            try:
                with open(fp, "r") as f:
                    data = json.load(f)
                batch = []
                for d in data:
                    sym = d.get("code")
                    if not sym: continue
                    eodhd_sym = f"{sym}.{exchange}"
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue

                    date_val = d.get("date") or d.get("ex_dividend_date")
                    val = d.get("value")
                    batch.append((
                        generate_id(asset_id, date_val, "dividend", val), asset_id,
                        date_val,
                        "dividend",
                        val,
                        None, None, None,
                        json.dumps(d), now
                    ))
                if batch:
                    conn.executemany(sql, batch)
                    total_inserted += len(batch)
            except Exception as e:
                pass
                
        # process bulk splits
        for fp in bulk_split:
            exchange = "NSE" if "bulk_splits_NSE" in fp.name else "BSE"
            try:
                with open(fp, "r") as f:
                    data = json.load(f)
                batch = []
                for s in data:
                    sym = s.get("code")
                    if not sym: continue
                    eodhd_sym = f"{sym}.{exchange}"
                    asset_id = mapping_dict.get(eodhd_sym)
                    if not asset_id: continue

                    try:
                        val = float(s.get("split", 0) or 0)
                    except: val = None
                    date_val = s.get("date") or s.get("split_date")
                    batch.append((
                        generate_id(asset_id, date_val, "split", val), asset_id,
                        date_val,
                        "split",
                        val,
                        None, None, None,
                        json.dumps(s), now
                    ))
                if batch:
                    conn.executemany(sql, batch)
                    total_inserted += len(batch)
            except Exception as e:
                pass

        conn.commit()

    print(f"Done. Total CA rows inserted: {total_inserted}")

if __name__ == "__main__":
    load_all_ca()
