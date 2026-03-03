import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from utils.db import get_db

with get_db() as conn:
    nse_count = conn.execute("SELECT COUNT(*) FROM corporate_actions WHERE source_exchange='NSE' AND ex_date LIKE '2023%'").fetchone()[0]
    bse_count = conn.execute("SELECT COUNT(*) FROM corporate_actions WHERE source_exchange='BSE' AND ex_date LIKE '2023%'").fetchone()[0]
    dual_count = conn.execute("SELECT COUNT(*) FROM assets WHERE nse_symbol IS NOT NULL AND bse_code IS NOT NULL").fetchone()[0]
    print(f"NSE 2023 Actions: {nse_count}")
    print(f"BSE 2023 Actions: {bse_count}")
    print(f"Dual Listed Assets: {dual_count}")
