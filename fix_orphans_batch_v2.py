import logging
import time
import sqlite3
from utils.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

def fix_orphans_batch(batch_size=500):
    """Identify which asset each orphan ID belongs to and relink."""
    logger.info(f"Starting orphan restoration batch (size: {batch_size})...")
    
    with get_db() as conn:
        # Get next batch of orphan IDs
        orphan_ids = conn.execute(f"""
            SELECT DISTINCT asset_id FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets)
            LIMIT ?
        """, (batch_size,)).fetchall()
        
        if not orphan_ids:
            logger.info("No more orphans found in daily_prices.")
            return False

        relinked = 0
        skipped = 0
        
        for row in orphan_ids:
            oid = row["asset_id"]
            
            # Use retry logic for database locks
            retries = 3
            while retries > 0:
                try:
                    # Pick a probe point
                    probe = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 1", (oid,)).fetchone()
                    if not probe: break
                    
                    # Find valid assets with same price point
                    matches = conn.execute("""
                        SELECT asset_id FROM daily_prices 
                        WHERE date = ? AND close = ? AND asset_id IN (SELECT id FROM assets)
                        LIMIT 5
                    """, (probe["date"], probe["close"])).fetchall()
                    
                    target_id = None
                    if len(matches) == 1:
                        target_id = matches[0]["asset_id"]
                    elif len(matches) > 1:
                        # Use another date to disambiguate
                        probe2 = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 1 OFFSET 1", (oid,)).fetchone()
                        if probe2:
                            for m in matches:
                                v = conn.execute("SELECT close FROM daily_prices WHERE asset_id = ? AND date = ?", (m["asset_id"], probe2["date"])).fetchone()
                                if v and v["close"] == probe2["close"]:
                                    target_id = m["asset_id"]
                                    break
                    
                    if target_id:
                        logger.info(f"Relinking orphan {oid} -> {target_id} (canonical)")
                        # Move prices
                        conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (target_id, oid))
                        conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (oid,))
                        # Also relink corporate actions if any exist for this orphan
                        conn.execute("UPDATE OR IGNORE corporate_actions SET asset_id = ? WHERE asset_id = ?", (target_id, oid))
                        conn.execute("DELETE FROM corporate_actions WHERE asset_id = ?", (oid,))
                        relinked += 1
                    else:
                        skipped += 1
                    
                    break # Success
                    
                except sqlite3.OperationalError as e:
                    if "locked" in str(e):
                        logger.warning(f"Database locked, retrying {oid} ({retries} left)...")
                        time.sleep(2)
                        retries -= 1
                    else:
                        raise e
            
        logger.info(f"Batch complete. Relinked: {relinked}, Unidentified: {skipped}")
        return True

if __name__ == "__main__":
    # Run a few batches to make significant progress
    for i in range(10):
        logger.info(f"--- Batch {i+1} ---")
        if not fix_orphans_batch(500):
            break
        time.sleep(1) # Breath between batches
