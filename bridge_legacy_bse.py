import sqlite3
import pandas as pd
import sys
import os

# Add data-pipeline to path
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))
from utils.db import get_db

def force_bridge_orphans():
    # Mapping table for the 9 confirmed orphans in 2000 file
    # Map BSE_CODE -> Key Identifiers in our assets table (NSE Symbol or ISIN)
    bridge_map = {
        "517164": {"symbol": "ZENITHCOMP", "isin": "INE136B01010"},  # Zenith Computers
        "503691": {"symbol": "SAHARA", "isin": "INE036B01016"},      # Sahara One Media
        "530773": {"symbol": "IVRCLINFRA", "isin": "INE875A01025"},  # IVRCL Ltd
        "514034": {"symbol": "JBFIND", "isin": "INE187A01017"},      # JBF Industries
        "500102": {"symbol": "BALLARPUR", "isin": "INE294A01037"},   # Ballarpur Industries
        "526707": {"symbol": "ALCHEMIST", "isin": "INE964B01025"},   # Alchemist Ltd
        "500139": {"symbol": "FEDDERELEC", "isin": "INE249B01016"},  # Fedders Electric
        "504697": {"symbol": "GALADA", "isin": "INE834A01013"},      # Galada Power
        "514328": {"symbol": "NACHKNIT", "isin": "INE106B01013"}     # Nachmo Knitex
    }
    
    with get_db() as conn:
        print("Bridges confirmed for 9 legacy assets.")
        applied = 0
        for bse_code, target in bridge_map.items():
            # Try matching by ISIN first (accurate)
            conn.execute(
                "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE isin = ?",
                (bse_code, target["isin"])
            )
            # Try matching by NSE symbol as fallback
            conn.execute(
                "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE nse_symbol = ?",
                (bse_code, target["symbol"])
            )
            applied += conn.execute("SELECT changes()").fetchone()[0]
            
        print(f"Applied {applied} force-updates to link legacy assets.")

if __name__ == "__main__":
    force_bridge_orphans()
