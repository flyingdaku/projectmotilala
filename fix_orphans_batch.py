import logging
import time
from utils.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

def purge_redundant_orphans():
    """Find orphans in daily_prices that are duplicates of valid data and delete them."""
    with get_db() as conn:
        logger.info("Identifying redundant orphans in daily_prices...")
        
        # This query finds prices for an orphaned ID where the same (date, close) exists for a valid ID
        # We delete from 'daily_prices' where asset_id IS NOT in assets AND there exists a match.
        
        start = time.time()
        # Use a CTE to find redundant rows
        purge_query = """
            DELETE FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets)
            AND ROWID IN (
                SELECT dp_orphan.ROWID
                FROM daily_prices dp_orphan
                JOIN daily_prices dp_valid ON dp_orphan.date = dp_valid.date AND dp_orphan.close = dp_valid.close
                WHERE dp_orphan.asset_id NOT IN (SELECT id FROM assets)
                AND dp_valid.asset_id IN (SELECT id FROM assets)
            )
        """
        # wait, ROWID is safe in SQLite.
        # But this JOIN might be slow.
        
        # Better: Grouped relinking.
        pass

def fix_orphans_the_right_way():
    """Identify which asset each orphan ID belongs to and relink."""
    with get_db() as conn:
        logger.info("Finding candidates for relinking...")
        # Get first 1000 orphan IDs
        orphan_ids = conn.execute("""
            SELECT DISTINCT asset_id FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets)
            LIMIT 1000
        """).fetchall()
        
        relinked = 0
        deleted = 0
        
        for row in orphan_ids:
            oid = row["asset_id"]
            # Pick one price point
            probe = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 1", (oid,)).fetchone()
            if not probe: continue
            
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
                probe2 = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? OFFSET 1 LIMIT 1", (oid,)).fetchone()
                if probe2:
                    for m in matches:
                        v = conn.execute("SELECT close FROM daily_prices WHERE asset_id = ? AND date = ?", (m["asset_id"], probe2["date"])).fetchone()
                        if v and v["close"] == probe2["close"]:
                            target_id = m["asset_id"]
                            break
            
            if target_id:
                logger.info(f"Relinking {oid} -> {target_id}")
                # Move
                conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (target_id, oid))
                conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (oid,))
                relinked += 1
            else:
                logger.debug(f"Could not identify orphan {oid}")

        logger.info(f"Summary: Relinked {relinked} clusters.")

if __name__ == "__main__":
    fix_orphans_the_right_way()
