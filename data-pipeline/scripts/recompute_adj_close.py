import logging
from datetime import date
from core.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def recompute_all_adj_close():
    logger.info("Starting global recomputation of adj_close for all assets...")
    
    with get_db() as conn:
        # Get all distinct assets with price data
        assets = conn.execute("SELECT DISTINCT asset_id FROM daily_prices").fetchall()
        asset_ids = [r["asset_id"] for r in assets]
        logger.info(f"Found {len(asset_ids)} assets to process")
        
        # Reset all adj_close to raw close
        conn.execute("UPDATE daily_prices SET adj_close = close")
        logger.info("Reset all adj_close to raw close")
        
        # Now apply all corporate actions sequentially from most recent to oldest per asset
        processed = 0
        total_actions = 0
        
        for asset_id in asset_ids:
            # Get actions ordered by date desc (apply backward in time)
            actions = conn.execute(
                """SELECT ex_date, adjustment_factor 
                   FROM corporate_actions 
                   WHERE asset_id = ? AND adjustment_factor != 1.0 AND adjustment_factor > 0 
                   ORDER BY ex_date DESC""",
                (asset_id,)
            ).fetchall()
            
            if not actions:
                processed += 1
                continue
                
            for action in actions:
                ex_date = action["ex_date"]
                factor = float(action["adjustment_factor"])
                
                if abs(factor - 1.0) < 1e-8:
                    continue
                    
                # Multiply all dates BEFORE ex_date by the factor
                # Since we process newest-to-oldest ex_dates, a date before multiple actions
                # will naturally get multiplied multiple times in sequence.
                conn.execute(
                    """UPDATE daily_prices 
                       SET adj_close = adj_close * ? 
                       WHERE asset_id = ? AND date < ?""",
                    (factor, asset_id, ex_date)
                )
                total_actions += 1
                
            processed += 1
            if processed % 500 == 0:
                logger.info(f"Processed {processed}/{len(asset_ids)} assets ({total_actions} actions applied)")
                
        # Handle the one edge case where factor might have made it null or < 0
        conn.execute("UPDATE daily_prices SET adj_close = close WHERE adj_close IS NULL OR adj_close <= 0")
                
    logger.info(f"Finished! Processed {processed} assets and applied {total_actions} corporate action adjustment chains.")

if __name__ == "__main__":
    recompute_all_adj_close()
