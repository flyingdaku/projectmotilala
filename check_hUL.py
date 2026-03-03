import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    symbol = "HINDUNILVR"
    print(f"Checking {symbol} for all 2023 actions...")
    rows = conn.execute("""
        SELECT ca.source_exchange, ca.ex_date, ca.action_type, ca.dividend_amount
        FROM corporate_actions ca 
        JOIN assets a ON a.id = ca.asset_id 
        WHERE a.nse_symbol=? AND ca.ex_date LIKE '2023%'
        ORDER BY ca.ex_date, ca.source_exchange
    """, (symbol,)).fetchall()
    
    for r in rows:
        print(f"Source: {r['source_exchange']} | ExDate: {r['ex_date']} | Type: {r['action_type']} | Amt: {r['dividend_amount']}")
