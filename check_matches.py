import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    print("Sampling dual-listed assets with actions in both NSE and BSE for 2023...")
    rows = conn.execute("""
        SELECT ca_nse.ex_date, ca_nse.action_type, a.nse_symbol, ca_nse.dividend_amount as nse_amt, ca_bse.dividend_amount as bse_amt
        FROM corporate_actions ca_nse
        JOIN corporate_actions ca_bse ON ca_nse.asset_id = ca_bse.asset_id 
            AND ca_nse.ex_date = ca_bse.ex_date 
            AND ca_nse.action_type = ca_bse.action_type
        JOIN assets a ON a.id = ca_nse.asset_id
        WHERE ca_nse.source_exchange = 'NSE' AND ca_bse.source_exchange = 'BSE'
    """).fetchall()
    
    print(f"Matches found: {len(rows)}")
    for r in rows[:10]:
        print(f"{r['nse_symbol']} | {r['ex_date']} | {r['action_type']} | NSE: {r['nse_amt']} | BSE: {r['bse_amt']}")
