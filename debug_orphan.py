import logging
import time
from utils.db import get_db

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

def debug_one_orphan(oid):
    logger.info(f"Checking orphan {oid}")
    with get_db() as conn:
        probe = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 1", (oid,)).fetchone()
        if not probe:
            logger.info("Probe not found.")
            return

        date, close = probe["date"], probe["close"]
        logger.info(f"Probe date: {date}, close: {close}")

        matches = conn.execute("""
            SELECT asset_id FROM daily_prices 
            WHERE date = ? AND close = ? AND asset_id IN (SELECT id FROM assets)
        """, (date, close)).fetchall()
        
        logger.info(f"Matches count: {len(matches)}")
        for m in matches:
            valid_id = m["asset_id"]
            logger.info(f"Potential valid ID: {valid_id}")

            # Verification sweep
            probe2 = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 1 OFFSET 1", (oid,)).fetchone()
            if probe2:
                logger.info(f"Probe2 found: {probe2['date']}, {probe2['close']}")
                v = conn.execute("SELECT close FROM daily_prices WHERE asset_id = ? AND date = ?", (valid_id, probe2["date"])).fetchone()
                if v:
                    logger.info(f"Second date match: {v['close']}")
                    if v["close"] == probe2["close"]:
                         logger.info("VERIFIED MATCH!")
                    else:
                         logger.info(f"DISCREPANCY on probe2: {v['close']} != {probe2['close']}")
                else:
                    logger.info("Probe2 NOT found in valid asset.")
            else:
                 logger.info("Only single price point available for this orphan.")

if __name__ == "__main__":
    debug_one_orphan("9a8861fa0f874697866e8932cce02e01")
