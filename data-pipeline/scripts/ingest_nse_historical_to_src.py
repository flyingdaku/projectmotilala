import json
import sqlite3
import logging
from pathlib import Path
from datetime import datetime
from core.db import get_db, generate_id

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RAW_DIR = Path("raw_data/NSE_CORP_ACTIONS")

def run():
    logger.info("Starting ingestion of historical NSE CA JSON files into src_nse_corporate_actions")
    
    # Get all JSON files (per-symbol and monthly)
    symbol_files = list(RAW_DIR.glob("*_all.json"))
    monthly_files = list(RAW_DIR.glob("nse_ca_*.json"))
    files = symbol_files + monthly_files
    logger.info(f"Found {len(symbol_files)} symbol files and {len(monthly_files)} monthly files")
    
    with get_db() as conn:
        # Get asset map
        asset_rows = conn.execute("SELECT id, nse_symbol FROM assets WHERE nse_symbol IS NOT NULL").fetchall()
        asset_map = {r["nse_symbol"]: r["id"] for r in asset_rows}
        
        inserted = 0
        skipped = 0
        
        for i, filepath in enumerate(files):
            is_monthly = filepath.name.startswith("nse_ca_")
            default_symbol = "" if is_monthly else filepath.name.replace("_all.json", "")
            
            try:
                with open(filepath, 'r') as f:
                    data = json.load(f)
                    
                records = data.get("data", [])
                if not records:
                    continue
                    
                batch = []
                for row in records:
                    symbol = row.get("symbol", default_symbol).strip()
                    asset_id = asset_map.get(symbol)
                    
                    if not asset_id:
                        continue
                    
                    ex_date_str = row.get("exDate")
                    if not ex_date_str or ex_date_str == "-":
                        continue
                        
                    try:
                        ex_date_iso = datetime.strptime(ex_date_str, "%d-%b-%Y").date().isoformat()
                    except ValueError:
                        continue
                    batch.append((
                        generate_id(),
                        asset_id,
                        row.get("symbol", symbol),
                        row.get("series"),
                        row.get("subject"),
                        ex_date_iso,
                        row.get("recordDate"),
                        row.get("bcStartDate"),
                        row.get("bcEndDate"),
                        row.get("ndStartDate"),
                        row.get("ndEndDate"),
                        row.get("comp"),
                        row.get("isin"),
                        row.get("faceVal"),
                        json.dumps(row)
                    ))
                    
                if batch:
                    conn.executemany("""
                        INSERT OR IGNORE INTO src_nse_corporate_actions
                        (id, asset_id, symbol, series, subject, ex_date, record_date, 
                         bc_start_date, bc_end_date, nd_start_date, nd_end_date, 
                         company_name, isin, face_value, raw_json)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, batch)
                    inserted += len(batch)
                    
            except Exception as e:
                logger.error(f"Failed processing {filepath.name}: {e}")
                
            if (i + 1) % 500 == 0:
                logger.info(f"Processed {i + 1}/{len(files)} files. Inserted {inserted} records.")
                
        logger.info(f"Completed! Inserted: {inserted}, Skipped/Existing: {skipped}")

if __name__ == "__main__":
    run()
