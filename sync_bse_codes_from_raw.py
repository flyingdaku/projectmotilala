import os
import sys
import zipfile
import pandas as pd
import sqlite3
import io
import logging
from pathlib import Path

# Add data-pipeline to path
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))

from utils.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

RAW_DATA_DIR = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/BSE_BHAVCOPY"

def harvest_mappings():
    mappings = {} # isin -> bse_code
    
    # 1. Gather all unique (ISIN, BSE_CODE) from existing bhavcopies
    # To be fast, we only sample files.
    logger.info("Scanning BSE Bhavcopies for ISIN <-> BSE Code mappings...")
    
    zip_files = list(Path(RAW_DATA_DIR).rglob("*.zip"))
    # Sample files to avoid processing 5000+ files if possible
    # But for full coverage, let's do more.
    
    for i, zip_path in enumerate(zip_files):
        if i % 100 == 0:
            logger.info(f"Processed {i}/{len(zip_files)} files... mappings found: {len(mappings)}")
            
        try:
            with zipfile.ZipFile(zip_path) as z:
                csv_name = next((n for n in z.namelist() if n.endswith(".CSV") or n.endswith(".csv")), None)
                if not csv_name: continue
                
                with z.open(csv_name) as f:
                    # Only read ISIN and Code columns to be memory efficient
                    header = f.readline().decode('utf-8', errors='ignore')
                    # Find column indices
                    cols = [c.strip().upper() for c in header.split(",")]
                    
                    # Old format: SC_CODE, ISIN_CODE
                    # New format: FinInstrmId, ISIN
                    
                    code_idx = -1
                    isin_idx = -1
                    
                    if "FININSTRMID" in cols: code_idx = cols.index("FININSTRMID")
                    elif "SC_CODE" in cols: code_idx = cols.index("SC_CODE")
                    elif "CODE" in cols: code_idx = cols.index("CODE")
                    
                    if "ISIN" in cols: isin_idx = cols.index("ISIN")
                    elif "ISIN_CODE" in cols: isin_idx = cols.index("ISIN_CODE")
                    
                    if code_idx == -1 or isin_idx == -1:
                        continue
                        
                    # Read rest of file
                    for line in f:
                        parts = line.decode('utf-8', errors='ignore').split(",")
                        if len(parts) > max(code_idx, isin_idx):
                            bse_code = parts[code_idx].strip()
                            isin = parts[isin_idx].strip()
                            if isin and isin != "nan" and bse_code:
                                mappings[isin] = bse_code
        except Exception as e:
            logger.warning(f"Failed to process {zip_path}: {e}")

    logger.info(f"Total unique mappings discovered: {len(mappings)}")
    
    # 2. Update assets table
    if mappings:
        with get_db() as conn:
            logger.info("Updating assets table with discovered BSE codes...")
            
            # Get current assets that are missing bse_code
            target_isins = {row["isin"]: True for row in conn.execute("SELECT isin FROM assets WHERE bse_code IS NULL OR bse_code = ''")}
            
            updates = []
            for isin, bse_code in mappings.items():
                if isin in target_isins:
                    updates.append((bse_code, isin))
            
            if updates:
                logger.info(f"Applying {len(updates)} updates to database...")
                conn.executemany(
                    "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE isin = ?",
                    updates
                )
                logger.info("Done.")
            else:
                logger.info("No new mappings found for existing assets.")

if __name__ == "__main__":
    harvest_mappings()
