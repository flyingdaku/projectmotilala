import sqlite3
import sys
import os
import json

# Add data-pipeline to path
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))
from utils.db import get_db, generate_id
from pipelines.corporate_actions_resolver import retroactive_adjust_history

def fix_hul_2000_split():
    with get_db() as conn:
        # Get HUL asset ID
        asset = conn.execute("SELECT id FROM assets WHERE bse_code = '500696'").fetchone()
        if not asset:
            print("HUL not found in database via bse_code 500696")
            return
        
        asset_id = asset['id']
        ex_date = "2000-07-03" # From the CSV row
        action_type = "SPLIT"
        ratio_num = 1.0 # New FV
        ratio_den = 10.0 # Old FV
        factor = 0.1 # Split 10:1
        
        # Check if already present as SPLIT
        existing = conn.execute("SELECT id FROM corporate_actions WHERE asset_id=? AND ex_date=? AND action_type='SPLIT'", (asset_id, ex_date)).fetchone()
        
        if not existing:
            action_id = generate_id()
            conn.execute("""
                INSERT INTO corporate_actions 
                (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator, adjustment_factor, source_exchange)
                VALUES (?, ?, ?, ?, ?, ?, ?, 'BSE')
            """, (action_id, asset_id, action_type, ex_date, ratio_num, ratio_den, factor))
            
            # Apply retroactive price adjustment
            retroactive_adjust_history(conn, asset_id, ex_date, factor)
            print("Successfully patched HUL 10:1 split (July 2000) and triggered history adjustment.")
        else:
            print("HUL 2000 split already correctly recorded.")

if __name__ == "__main__":
    fix_hul_2000_split()
