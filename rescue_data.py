import os
import zipfile
import io
import csv
import logging
from datetime import datetime
from utils.db import get_db, execute_query, execute_one

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

RAW_DIR = "data-pipeline/raw_data"

def fix_orphans_from_csvs():
    with get_db() as conn:
        # 1. Get orphans
        orphans = conn.execute("SELECT DISTINCT asset_id FROM daily_prices WHERE asset_id NOT IN (SELECT id FROM assets)").fetchall()
        orphan_ids = [o["asset_id"] for o in orphans]
        logger.info(f"Found {len(orphan_ids)} orphaned asset IDs in daily_prices.")
        
        if not orphan_ids:
            return

        # 2. We don't know who they are. But maybe we can find them if we check which days they have data for.
        # This is slow. Let's try to restore the codes first.
        
        # 3. BETTER: Fix the assets table linking first. 
        # I noticed many assets lost their bse_code/nse_symbol during merge because of empty string vs NULL.
        
        logger.info("Normalizing assets table (empty strings to NULL)...")
        conn.execute("UPDATE assets SET bse_code = NULL WHERE bse_code = ''")
        conn.execute("UPDATE assets SET nse_symbol = NULL WHERE nse_symbol = ''")
        conn.execute("UPDATE assets SET isin = NULL WHERE isin = ''")
        
    # Re-run a robust propagate/merge script
    logger.info("Re-running propagation...")
    from propagate_asset_codes import propagate_codes
    propagate_codes()

def rescue_via_ca_announcements():
    """Parse orphan corporate actions to find missing asset links."""
    with get_db() as conn:
        orphans = conn.execute("SELECT asset_id, raw_announcement FROM corporate_actions WHERE asset_id NOT IN (SELECT id FROM assets)").fetchall()
        logger.info(f"Analyzing {len(orphans)} orphaned corporate actions...")
        
        import json
        rescued = 0
        for row in orphans:
            aid = row["asset_id"]
            raw = row["raw_announcement"]
            if not raw: continue
            try:
                data = json.loads(raw)
                bse_code = data.get("Security Code")
                symbol = data.get("symbol")
                isin = data.get("isin")
                
                target_id = None
                if isin:
                    res = conn.execute("SELECT id FROM assets WHERE isin = ?", (isin,)).fetchone()
                    if res: target_id = res["id"]
                if not target_id and bse_code:
                    res = conn.execute("SELECT id FROM assets WHERE bse_code = ?", (str(bse_code),)).fetchone()
                    if res: target_id = res["id"]
                if not target_id and symbol:
                    res = conn.execute("SELECT id FROM assets WHERE nse_symbol = ?", (symbol,)).fetchone()
                    if res: target_id = res["id"]
                
                if target_id:
                    logger.info(f"Rescuing orphan {aid} -> {target_id} (found via CA {isin or symbol or bse_code})")
                    # Migrate prices
                    conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (target_id, aid))
                    conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (aid,))
                    # Migrate actions
                    conn.execute("INSERT OR IGNORE INTO corporate_actions SELECT id, ?, action_type, ex_date, ratio_numerator, ratio_denominator, dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement, created_at FROM corporate_actions WHERE asset_id = ?", (target_id, aid))
                    conn.execute("DELETE FROM corporate_actions WHERE asset_id = ?", (aid,))
                    rescued += 1
            except Exception as e:
                logger.warning(f"Failed to parse orphan CA: {e}")
        logger.info(f"Rescued {rescued} orphan assets via CA data.")

if __name__ == "__main__":
    fix_orphans_from_csvs()
    rescue_via_ca_announcements()
