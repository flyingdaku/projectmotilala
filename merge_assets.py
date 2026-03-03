import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def merge_temp_assets():
    with get_db() as conn:
        # Find pairs of (Symbol, TEMP ID, REAL ID)
        # We define a "REAL ID" as one that does NOT start with TEMP_ or pocket_
        # and has the same nse_symbol or bse_code and name overlap.
        
        # Mapping: symbol -> [list of IDs]
        assets = conn.execute(
            """SELECT id, isin, nse_symbol, bse_code, name 
               FROM assets 
               WHERE (nse_symbol IS NOT NULL AND nse_symbol != '') 
                  OR (bse_code IS NOT NULL AND bse_code != '')"""
        ).fetchall()
        
        symbol_map = {}
        for row in assets:
            sym = row["nse_symbol"] or row["bse_code"]
            if sym not in symbol_map:
                symbol_map[sym] = []
            symbol_map[sym].append(row)

        merges = [] # (temp_id, canonical_id)
        
        for sym, id_list in symbol_map.items():
            if len(id_list) > 1:
                # Find the one with the best ISIN (non-temp)
                reals = [r for r in id_list if not str(r["isin"]).startswith("TEMP_") and not str(r["isin"]).startswith("pocket_")]
                temps = [r for r in id_list if str(r["isin"]).startswith("TEMP_") or str(r["isin"]).startswith("pocket_")]
                
                if reals and temps:
                    # Pick the first real one as canonical for this symbol
                    canonical = reals[0]
                    for t in temps:
                        merges.append((t["id"], canonical["id"]))

        logger.info(f"Found {len(merges)} TEMP-to-REAL merges to perform.")

        if not merges:
            return

        # Perform the merge across all tables
        tables_to_update = ["daily_prices", "corporate_actions", "distribution_components", "bond_events", "asset_fundamentals"]
        
        for temp_id, real_id in merges:
            for table in tables_to_update:
                try:
                    # Use corporate_action_id as foreign key in distribution_components case
                    if table == "distribution_components":
                        conn.execute(
                            "UPDATE distribution_components SET corporate_action_id = (SELECT id FROM corporate_actions WHERE id = corporate_action_id AND asset_id = ?) WHERE corporate_action_id IN (SELECT id FROM corporate_actions WHERE asset_id = ?)",
                            (real_id, temp_id)
                        )
                    elif table == "bond_events":
                        conn.execute("UPDATE bond_events SET asset_id = ? WHERE asset_id = ?", (real_id, temp_id))
                    elif table == "asset_fundamentals":
                        conn.execute("UPDATE asset_fundamentals SET asset_id = ? WHERE asset_id = ?", (real_id, temp_id))
                    else:
                        # Price and CA tables use asset_id
                        # NOTE: For daily_prices, we use INSERT OR REPLACE if we move back and forth, 
                        # but usually these are disjoint in time. We use UPDATE OR IGNORE if possible.
                        # SQLite doesn't have UPDATE OR IGNORE, so we use a subquery check or just try/except.
                        conn.execute(f"UPDATE OR IGNORE {table} SET asset_id = ? WHERE asset_id = ?", (real_id, temp_id))
                        # Delete leftovers that were ignored due to unique constraints
                        conn.execute(f"DELETE FROM {table} WHERE asset_id = ?", (temp_id,))
                except Exception as e:
                    logger.warning(f"Error merging {table} for {temp_id} -> {real_id}: {e}")

            # Delete the temp asset entry itself
            conn.execute("DELETE FROM assets WHERE id = ?", (temp_id,))

        logger.info(f"Successfully merged {len(merges)} temporary assets into canonical ones.")

if __name__ == "__main__":
    merge_temp_assets()
