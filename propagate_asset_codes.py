import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def propagate_codes():
    with get_db() as conn:
        # Propagation 1: NSE Symbol -> BSE Code
        # Find (nse_symbol, bse_code) pairs that exist
        pairs = conn.execute(
            """SELECT DISTINCT nse_symbol, bse_code 
               FROM assets 
               WHERE nse_symbol IS NOT NULL AND nse_symbol != '' 
                 AND bse_code IS NOT NULL AND bse_code != ''"""
        ).fetchall()
        
        nse_to_bse = {r["nse_symbol"]: r["bse_code"] for r in pairs}
        bse_to_nse = {r["bse_code"]: r["nse_symbol"] for r in pairs}

        logger.info(f"Propagation 1: {len(nse_to_bse)} Symbol-to-Code pairings found.")

        # Update assets missing bse_code but having known nse_symbol
        updates_bse = []
        for sym, code in nse_to_bse.items():
            updates_bse.append((code, sym))

        if updates_bse:
            conn.executemany(
                "UPDATE assets SET bse_code = ?, bse_listed = 1 WHERE nse_symbol = ? AND (bse_code IS NULL OR bse_code = '')",
                updates_bse
            )
            updated_bse = conn.execute("SELECT changes()").fetchone()[0]
            logger.info(f"Updated {updated_bse} assets with BSE codes via NSE symbol propagation.")

        # Update assets missing nse_symbol but having known bse_code
        updates_nse = []
        for code, sym in bse_to_nse.items():
            updates_nse.append((sym, code))

        if updates_nse:
            conn.executemany(
                "UPDATE assets SET nse_symbol = ?, nse_listed = 1 WHERE bse_code = ? AND (nse_symbol IS NULL OR nse_symbol = '')",
                updates_nse
            )
            updated_nse = conn.execute("SELECT changes()").fetchone()[0]
            logger.info(f"Updated {updated_nse} assets with NSE symbols via BSE code propagation.")

        # Propagation 2: Shared ISIN logic (if one asset ID has symbol but another doesn't for same ISIN)
        # Already handled by isin-based updates usually, but let's be thorough if names match.
        
if __name__ == "__main__":
    propagate_codes()
