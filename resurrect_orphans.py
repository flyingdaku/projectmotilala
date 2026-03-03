import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def resurrect_orphans():
    with get_db() as conn:
        # Get Sample Orphans (Unique IDs from 2025-2026)
        logger.info("Fetching sample orphans from 2025-2026...")
        orphans = conn.execute("""
            SELECT asset_id, date, close, count(*) as row_count 
            FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets) 
            GROUP BY asset_id 
            LIMIT 500
        """).fetchall()
        
        logger.info(f"Processing {len(orphans)} orphaned asset clusters...")
        
        relinked = 0
        for row in orphans:
            oid = row["asset_id"]
            test_date = row["date"]
            test_close = row["close"]
            
            # Find candidate valid assets with same price on same day
            candidates = conn.execute("""
                SELECT asset_id FROM daily_prices 
                WHERE date = ? AND close = ? AND asset_id IN (SELECT id FROM assets)
            """, (test_date, test_close)).fetchall()
            
            if len(candidates) == 1:
                valid_id = candidates[0]["asset_id"]
                # Verify with another date
                other_row = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? AND date != ? LIMIT 1", (oid, test_date)).fetchone()
                if other_row:
                    v_row = conn.execute("SELECT close FROM daily_prices WHERE asset_id = ? AND date = ?", (valid_id, other_row["date"])).fetchone()
                    if v_row and v_row["close"] == other_row["close"]:
                        # Confirm match
                        logger.info(f"Relinking orphan {oid} -> {valid_id} (found via price match)")
                        
                        # Move all prices (idempotently)
                        conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (valid_id, oid))
                        conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (oid,))
                        
                        relinked += 1
                    else:
                        logger.debug(f"Oid {oid} candidate {valid_id} failed 2nd date check.")
                else:
                    # Only one price row? Relink anyway if it's unique
                    logger.info(f"Relinking orphan {oid} -> {valid_id} (single price match)")
                    conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (valid_id, oid))
                    conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (oid,))
                    relinked += 1

        logger.info(f"Successfully relinked {relinked} orphaned asset clusters.")

if __name__ == "__main__":
    resurrect_orphans()
