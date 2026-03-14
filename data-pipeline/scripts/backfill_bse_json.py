import logging
import json
import os
import time
from core.db import get_db
from pipelines.bse_corporate_actions import fetch_bse_corporate_actions_by_scrip

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def main():
    with get_db() as conn:
        bse_rows = conn.execute("SELECT DISTINCT bse_code FROM assets WHERE bse_code IS NOT NULL").fetchall()
        bse_codes = [str(r["bse_code"]).strip() for r in bse_rows if r["bse_code"]]

    logger = logging.getLogger(__name__)
    logger.info(f"Starting BSE CA JSON backfill for {len(bse_codes)} scrips...")
    
    save_dir = os.path.join("raw_data", "BSE_CORP_ACTIONS")
    os.makedirs(save_dir, exist_ok=True)
    
    # Check what we already have to allow resumption
    existing_files = set(os.listdir(save_dir))
    
    processed = 0
    skipped = 0
    fetched = 0
    
    for scrip_code in bse_codes:
        file_name = f"{scrip_code}_all.json"
        
        # In a real environment, we'd probably re-fetch to get new data. 
        # But for an initial backfill, if the file exists and is populated, we skip.
        if file_name in existing_files:
            file_path = os.path.join(save_dir, file_name)
            if os.path.getsize(file_path) > 10:  # non-empty
                skipped += 1
                continue
                
        # fetch
        actions = fetch_bse_corporate_actions_by_scrip(scrip_code)
        if actions:
            fetched += 1
            
        processed += 1
        if processed % 100 == 0:
            logger.info(f"Progress: {processed}/{len(bse_codes) - skipped} remaining. Fetched {fetched} new files.")
            
        time.sleep(0.2)  # rate limit to not overwhelm the BSE API
        
    logger.info(f"Done! Skipped {skipped}, Fetched {fetched} new scrips.")

if __name__ == "__main__":
    main()
