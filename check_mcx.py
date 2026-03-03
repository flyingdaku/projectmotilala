import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    symbol = "MCX"
    ex_date = "2026-01-02"
    print(f"Checking {symbol} on {ex_date}...")
    rows = conn.execute("""
        SELECT ca.source_exchange, ca.ex_date, ca.action_type, ca.dividend_amount, ca.adjustment_factor
        FROM corporate_actions ca 
        JOIN assets a ON a.id = ca.asset_id 
        WHERE a.nse_symbol=? AND ca.ex_date=?
    """, (symbol, ex_date)).fetchall()
    
    for r in rows:
        print(f"Source: {r['source_exchange']} | Type: {r['action_type']} | Factor: {r['adjustment_factor']}")
