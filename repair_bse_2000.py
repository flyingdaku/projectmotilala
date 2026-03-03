import os
import sys
from datetime import date
import logging

# Add data-pipeline to path
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))

from pipelines.bse_corporate_actions import process_bse_corporate_actions_batch, parse_bse_csv
from utils.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

CSV_PATH = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/BSE_CORP_ACTIONS/2000/01/bse_corp_actions_2000-01-01_2000-12-31.csv"

def run_year_2000_repair():
    logger.info("Starting Year 2000 BSE Corporate Action repair...")
    
    if not os.path.exists(CSV_PATH):
        logger.error(f"CSV file not found: {CSV_PATH}")
        return

    with open(CSV_PATH, 'r') as f:
        csv_text = f.read()

    # Parse CSV into rows
    rows = parse_bse_csv(csv_text)
    logger.info(f"Loaded {len(rows)} rows from Year 2000 CSV.")

    # Process batch - this handles dedup, classification, and RETROACTIVE ADJUSTMENTS
    # Using date(2000, 1, 1) as a dummy trade_date context for logging/storage
    inserted, skipped, amended = process_bse_corporate_actions_batch(rows, date(2000, 1, 1))

    logger.info(f"Repair complete: {inserted} inserted, {skipped} skipped/already present, {amended} amended.")
    
    # Final check on a major asset: HUL (BSE 500696) split of 2000
    with get_db() as conn:
        res = conn.execute("""
            SELECT ex_date, action_type, adjustment_factor 
            FROM corporate_actions 
            WHERE asset_id IN (SELECT id FROM assets WHERE bse_code = '500696')
            AND ex_date LIKE '2000-%'
        """).fetchall()
        for r in res:
            logger.info(f"Verification HUL Action: {r['ex_date']} | {r['action_type']} | Factor: {r['adjustment_factor']}")

if __name__ == "__main__":
    run_year_2000_repair()
