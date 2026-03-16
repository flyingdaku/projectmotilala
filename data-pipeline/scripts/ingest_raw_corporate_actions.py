"""
Ingest corporate actions from raw JSON files into the database.

This script processes the existing raw JSON files in raw_data/NSE_CORP_ACTIONS/
and populates the src_nse_corporate_actions and corporate_actions tables.
"""
import os
import sys
import json
import glob
import logging
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from pipelines.corporate_actions import process_corporate_action

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("ingest_raw_ca")

def ingest_nse_corporate_actions():
    """Ingest NSE corporate actions from raw JSON files."""
    raw_dir = Path(__file__).parent.parent / "raw_data" / "NSE_CORP_ACTIONS"
    
    # Get all monthly chunk files (these contain the actual CA data)
    monthly_files = sorted(glob.glob(str(raw_dir / "nse_ca_*.json")))
    
    logger.info(f"Found {len(monthly_files)} monthly CA files")
    
    total_inserted = 0
    total_skipped = 0
    
    for file_path in monthly_files:
        filename = os.path.basename(file_path)
        logger.info(f"Processing {filename}...")
        
        try:
            with open(file_path, 'r') as f:
                raw_data = json.load(f)
            
            # Handle both formats: direct list or {"data": [...]}
            if isinstance(raw_data, dict) and 'data' in raw_data:
                data = raw_data['data']
            elif isinstance(raw_data, list):
                data = raw_data
            else:
                logger.warning(f"Unexpected format in {filename}, skipping")
                continue
            
            if len(data) == 0:
                logger.info(f"No records in {filename}")
                continue
            
            # Process each record
            file_inserted = 0
            file_skipped = 0
            for record in data:
                try:
                    success = process_corporate_action(record)
                    if success:
                        file_inserted += 1
                    else:
                        file_skipped += 1
                except Exception as e:
                    logger.warning(f"Error processing record: {e}")
                    file_skipped += 1
            
            total_inserted += file_inserted
            total_skipped += file_skipped
            
            logger.info(f"{filename}: {file_inserted} inserted, {file_skipped} skipped")
            
        except Exception as e:
            logger.error(f"Error processing {filename}: {e}")
            continue
    
    logger.info(f"Ingestion complete: {total_inserted} total inserted, {total_skipped} total skipped")
    return total_inserted, total_skipped

if __name__ == "__main__":
    logger.info("Starting NSE corporate actions ingestion from raw files...")
    inserted, skipped = ingest_nse_corporate_actions()
    logger.info(f"Done: {inserted} records inserted, {skipped} skipped")
