import logging
from collections import defaultdict
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def merge_by_symbol():
    with get_db() as conn:
        # Get all assets with an NSE symbol
        rows = conn.execute(
            "SELECT id, isin, nse_symbol, bse_code, name FROM assets WHERE nse_symbol IS NOT NULL AND nse_symbol != ''"
        ).fetchall()
        
        symbol_groups = defaultdict(list)
        for r in rows:
            symbol_groups[r["nse_symbol"]].append(r)
            
        merges = [] # (temp_id, canonical_id)
        
        for sym, assets in symbol_groups.items():
            if len(assets) > 1:
                # Choose canonical: The one with the most records in daily_prices
                counts = []
                for a in assets:
                    cnt = conn.execute("SELECT COUNT(*) FROM daily_prices WHERE asset_id = ?", (a["id"],)).fetchone()[0]
                    counts.append((cnt, a))
                
                # Sort by count desc, then by whether ISIN is 'real'
                counts.sort(key=lambda x: (x[0], not str(x[1]["isin"]).startswith("TEMP_")), reverse=True)
                
                canonical = counts[0][1]
                for cnt, other in counts[1:]:
                    logger.info(f"Merging {sym}: {other['id']} ({other['isin']}, {cnt} rows) -> {canonical['id']} ({canonical['isin']}, {counts[0][0]} rows)")
                    merges.append((other["id"], canonical["id"]))

        if not merges:
            logger.info("No symbol-based duplicates found.")
            return

        # Perform the merge across all tables
        # List of tables from merge_assets.py
        tables_to_update = ["daily_prices", "corporate_actions", "bond_events", "asset_fundamentals", "distribution_components"]
        
        for temp_id, real_id in merges:
            for table in tables_to_update:
                try:
                    if table == "distribution_components":
                         # Special case: it refers to corporate_action_id
                         pass 
                    elif table == "daily_prices":
                        # Use INSERT OR IGNORE to avoid primary key conflicts if dates overlap
                        # sqlite3 doesn't have UPDATE OR IGNORE with full power, but we can do:
                        conn.execute("INSERT OR IGNORE INTO daily_prices SELECT ?, date, open, high, low, close, adj_close, volume, trades, source_exchange, is_verified FROM daily_prices WHERE asset_id = ?", (real_id, temp_id))
                        conn.execute("DELETE FROM daily_prices WHERE asset_id = ?", (temp_id,))
                    elif table == "corporate_actions":
                        conn.execute("INSERT OR IGNORE INTO corporate_actions SELECT id, ?, action_type, ex_date, ratio_numerator, ratio_denominator, dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement, created_at FROM corporate_actions WHERE asset_id = ?", (real_id, temp_id))
                        conn.execute("DELETE FROM corporate_actions WHERE asset_id = ?", (temp_id,))
                    else:
                        conn.execute(f"UPDATE OR IGNORE {table} SET asset_id = ? WHERE asset_id = ?", (real_id, temp_id))
                        conn.execute(f"DELETE FROM {table} WHERE asset_id = ?", (temp_id,))
                except Exception as e:
                    logger.warning(f"Error merging {table} for {temp_id} -> {real_id}: {e}")

            # Also transfer any missing bse_code/isin if canonical is missing it
            other_asset = conn.execute("SELECT isin, bse_code, nse_symbol FROM assets WHERE id = ?", (temp_id,)).fetchone()
            if other_asset:
                conn.execute(
                    "UPDATE assets SET bse_code = COALESCE(bse_code, ?), isin = COALESCE(isin, ?) WHERE id = ?",
                    (other_asset["bse_code"], other_asset["isin"], real_id)
                )

            # Keep a track of merged historical ISINs in some table? 
            # (Maybe future: add ISIN history table). For now, just delete.
            conn.execute("DELETE FROM assets WHERE id = ?", (temp_id,))

        logger.info(f"Successfully merged {len(merges)} symbol-based duplicates.")

if __name__ == "__main__":
    merge_by_symbol()
