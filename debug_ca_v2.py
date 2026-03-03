import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    print("--- NSE ---")
    nse = conn.execute("SELECT * FROM corporate_actions WHERE source_exchange='NSE' LIMIT 1").fetchone()
    if nse:
        for k, v in dict(nse).items():
            print(f"{k}: {v}")
    
    print("\n--- BSE ---")
    bse = conn.execute("SELECT * FROM corporate_actions WHERE source_exchange='BSE' LIMIT 1").fetchone()
    if bse:
        for k, v in dict(bse).items():
            print(f"{k}: {v}")
