import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    row = conn.execute("SELECT isin, nse_symbol, bse_code, nse_listed, bse_listed FROM assets WHERE nse_symbol='HINDUNILVR'").fetchone()
    print(dict(row))
