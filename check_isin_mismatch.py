import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    isin = "INE745G01035"
    print(f"Checking assets for ISIN {isin}...")
    rows = conn.execute("SELECT * FROM assets WHERE isin=?", (isin,)).fetchall()
    for r in rows:
        print(dict(r))
    
    print(f"\nChecking corporate actions for ISIN {isin} (via join or manual)...")
    # Join won't work if IDs mismatch. Let's look for records where raw_announcement contains this ISIN.
    rows = conn.execute("SELECT id, asset_id, source_exchange, ex_date FROM corporate_actions WHERE raw_announcement LIKE ?", (f"%{isin}%",)).fetchall()
    for r in rows:
        print(dict(r))
