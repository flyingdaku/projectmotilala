import logging
import time
import sqlite3
import sys
from utils.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

def fix_orphans_continuous(max_ids=1000):
    logger.info(f"Starting continuous orphan resurrection (target: {max_ids})...")
    
    with get_db() as conn:
        # Get next batch of potential orphan IDs
        # Prioritize 2024-2026 data where orphans are most likely to match recent indices
        orphan_ids_rows = conn.execute("""
            SELECT DISTINCT asset_id FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets)
            LIMIT ?
        """, (max_ids,)).fetchall()
        
        orphan_ids = [r["asset_id"] for r in orphan_ids_rows]
        
        if not orphan_ids:
            logger.info("No more orphans to process.")
            return

        relinked = 0
        unknown = 0
        total_price_rows_moved = 0
        
        for oid in orphan_ids:
            try:
                # 1. Fetch probe points
                probes = conn.execute("SELECT date, close FROM daily_prices WHERE asset_id = ? LIMIT 2", (oid,)).fetchall()
                if not probes: 
                    unknown += 1
                    continue
                
                probe1 = probes[0]
                matches = conn.execute("""
                    SELECT asset_id FROM daily_prices 
                    WHERE date = ? AND close = ? AND asset_id IN (SELECT id FROM assets)
                    LIMIT 2
                """, (probe1["date"], probe1["close"])).fetchall()
                
                target_id = None
                if len(matches) == 1:
                    target_id = matches[0]["asset_id"]
                elif len(matches) > 1 and len(probes) > 1:
                    # Disambiguate with second point
                    probe2 = probes[1]
                    for m in matches:
                        cand = m["asset_id"]
                        v = conn.execute("SELECT close FROM daily_prices WHERE asset_id = ? AND date = ?", (cand, probe2["date"])).fetchone()
                        if v and v["close"] == probe2["close"]:
                            target_id = cand
                            break
                
                if target_id:
                    # Relink!
                    # Move daily prices (idempotently)
                    # We use ROWID because INSERT SELECT can crash on large sets if not careful
                    # But SELECT ... FROM daily_prices WHERE asset_id = ? is usually small for orphans
                    res = conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (target_id, oid))
                    price_count = res.rowcount
                    conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (oid,))
                    
                    # Relink Other data
                    conn.execute("UPDATE OR IGNORE corporate_actions SET asset_id = ? WHERE asset_id = ?", (target_id, oid))
                    conn.execute("DELETE FROM corporate_actions WHERE asset_id = ?", (oid,))
                    
                    relinked += 1
                    total_price_rows_moved += max(0, price_count)
                    
                    if relinked % 10 == 0:
                        logger.info(f"Progress: Relinked {relinked} orphans... (approx {total_price_rows_moved} prices)")
                        # Commit incrementally to release locks frequently
                        conn.commit()
                else:
                    unknown += 1
                    
            except sqlite3.OperationalError as e:
                if "locked" in str(e):
                    logger.warning(f"Database locked on {oid}. Skipping to next...")
                    time.sleep(1)
                    continue
                else:
                    logger.error(f"SQL Error on {oid}: {e}")
                    raise e
                    
        logger.info(f"Session finished. Relinked: {relinked}, Unresolved: {unknown}")

if __name__ == "__main__":
    fix_orphans_continuous(1000)
