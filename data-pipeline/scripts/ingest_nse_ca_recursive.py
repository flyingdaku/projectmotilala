import json
import logging
from pathlib import Path
from datetime import datetime
import sys
import pandas as pd

# Add project root to sys.path
sys.path.insert(0, '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline')

from core.db import get_pg_connection, generate_id

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RAW_DIR = Path("/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/NSE_CORP_ACTIONS")

def run():
    logger.info("Starting recursive ingestion of historical NSE CA JSON files into src_nse_corporate_actions")
    
    files = list(RAW_DIR.rglob("*.json"))
    logger.info(f"Found {len(files)} JSON files")
    
    with get_pg_connection() as conn:
        asset_rows = conn.execute("SELECT id, nse_symbol FROM assets WHERE nse_symbol IS NOT NULL").fetchall()
        asset_map = {r["nse_symbol"]: r["id"] for r in asset_rows}
        
        inserted = 0
        
        for i, filepath in enumerate(files):
            try:
                with open(filepath, 'r') as f:
                    data = json.load(f)
                
                records = data.get("data", []) if isinstance(data, dict) else data
                if not isinstance(records, list): continue
                
                batch = []
                for row in records:
                    symbol = str(row.get("symbol", "")).strip()
                    asset_id = asset_map.get(symbol)
                    if not asset_id: continue
                    
                    ex_date_str = row.get("exDate")
                    if not ex_date_str or ex_date_str == "-": continue
                        
                    ex_date_iso = None
                    for fmt in ("%d-%b-%Y", "%d-%m-%Y", "%Y-%m-%d"):
                        try:
                            ex_date_iso = datetime.strptime(ex_date_str, fmt).date().isoformat()
                            break
                        except ValueError:
                            continue
                    
                    if not ex_date_iso: continue
                    
                    batch.append((
                        generate_id(), asset_id, symbol, row.get("series"),
                        row.get("subject"), ex_date_iso, row.get("recordDate"),
                        row.get("bcStartDate"), row.get("bcEndDate"), 
                        row.get("ndStartDate"), row.get("ndEndDate"),
                        row.get("comp"), row.get("isin"), row.get("faceVal"),
                        json.dumps(row)
                    ))
                    
                if batch:
                    conn.executemany("""
                        INSERT INTO src_nse_corporate_actions
                        (id, asset_id, symbol, series, subject, ex_date, record_date, 
                         bc_start_date, bc_end_date, nd_start_date, nd_end_date, 
                         company_name, isin, face_value, raw_json)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (asset_id, ex_date, subject) DO NOTHING
                    """, batch)
                    inserted += len(batch)
            except Exception as e:
                pass
                
            if (i + 1) % 500 == 0:
                logger.info(f"Processed {i + 1}/{len(files)} files. Inserted {inserted} records.")
                conn.commit()
                
        logger.info(f"Completed! Total Inserted: {inserted}")
        conn.commit()

if __name__ == "__main__":
    run()
