import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_redundancy():
    with get_db() as conn:
        logger.info("Finding sample orphans...")
        orphans = conn.execute("""
            SELECT asset_id, date, close FROM daily_prices 
            WHERE asset_id NOT IN (SELECT id FROM assets) 
            LIMIT 100
        """).fetchall()
        
        redundant = 0
        unique = 0
        for row in orphans:
            oid = row["asset_id"]
            d = row["date"]
            c = row["close"]
            
            # Check if this price exists for ANY valid asset on this date
            exists = conn.execute("""
                SELECT COUNT(*) FROM daily_prices 
                WHERE date = ? AND close = ? AND asset_id IN (SELECT id FROM assets)
            """, (d, c)).fetchone()[0]
            
            if exists > 0:
                redundant += 1
            else:
                unique += 1
        
        logger.info(f"Sample of 100 prices: {redundant} are redundant (exist in valid assets), {unique} are unique.")

if __name__ == "__main__":
    check_redundancy()
