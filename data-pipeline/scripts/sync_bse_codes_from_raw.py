"""
BSE Code Populator from Raw Bhavcopy.
Scans raw_data/BSE_BHAVCOPY/ for ISIN -> ScripCode mappings and updates the assets table.
"""
import logging
import os
import zipfile
import io
import pandas as pd
from datetime import date
from pathlib import Path

from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sync_bse_codes")

RAW_DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "BSE_BHAVCOPY")

def sync_bse_codes_from_raw():
    logger.info(f"Scanning {RAW_DATA_DIR} for BSE code mappings...")
    
    isin_map = {} # {isin: scrip_code}
    
    # Recursively find all ZIP files in raw_data/BSE_BHAVCOPY
    zip_files = list(Path(RAW_DATA_DIR).rglob("*.zip"))
    logger.info(f"Found {len(zip_files)} raw BSE ZIP files")
    
    for zip_path in zip_files:
        try:
            with zipfile.ZipFile(zip_path) as z:
                csv_name = next((n for n in z.namelist() if n.endswith(".csv")), None)
                if not csv_name: continue
                
                df = pd.read_csv(z.open(csv_name))
                df.columns = df.columns.str.strip()
                
                # Check for standard BSE columns
                if "ISIN" in df.columns and "SC_CODE" in df.columns:
                    for _, row in df.iterrows():
                        isin = str(row["ISIN"]).strip()
                        code = str(row["SC_CODE"]).strip()
                        if isin and code and len(isin) == 12:
                            isin_map[isin] = code
                            
        except Exception as e:
            logger.warning(f"Could not parse {zip_path.name}: {e}")
            continue
            
    if not isin_map:
        logger.warning("No mappings found in raw files.")
        return
        
    logger.info(f"Extracted {len(isin_map)} unique ISIN → BSE code mappings.")
    
    updated = 0
    with get_db() as conn:
        for isin, code in isin_map.items():
            res = conn.execute("UPDATE assets SET bse_code = ? WHERE isin = ? AND (bse_code IS NULL OR bse_code = '')", (code, isin))
            if res.rowcount > 0:
                updated += 1
                
    logger.info(f"✅ Updated {updated} assets with missing BSE codes.")

if __name__ == "__main__":
    sync_bse_codes_from_raw()
