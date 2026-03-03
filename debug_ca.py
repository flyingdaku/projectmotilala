import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    print("NSE Example:")
    nse = conn.execute("SELECT * FROM corporate_actions WHERE source_exchange='NSE' LIMIT 1").fetchone()
    print(dict(nse) if nse else "No NSE")
    
    print("\nBSE Example:")
    bse = conn.execute("SELECT * FROM corporate_actions WHERE source_exchange='BSE' LIMIT 1").fetchone()
    print(dict(bse) if bse else "No BSE")
