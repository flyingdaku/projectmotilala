import os
import json
import logging
import sqlite3
from utils.db import get_db, execute_query

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_table_columns(conn, table_name):
    return [c["name"] for c in conn.execute(f"PRAGMA table_info({table_name})").fetchall()]

def rescue_via_ca_announcements():
    with get_db() as conn:
        conn.execute("UPDATE assets SET bse_code = NULL WHERE bse_code = ''")
        conn.execute("UPDATE assets SET nse_symbol = NULL WHERE nse_symbol = ''")
        
        orphans = conn.execute("SELECT asset_id, raw_announcement FROM corporate_actions WHERE asset_id NOT IN (SELECT id FROM assets)").fetchall()
        logger.info(f"Analyzing {len(orphans)} orphaned corporate actions...")
        
        rescued_count = 0
        tables = ["daily_prices", "corporate_actions", "asset_fundamentals"]
        table_sql = {}
        for t in tables:
            cols = get_table_columns(conn, t)
            col_list = ", ".join(cols)
            val_list = ", ".join(["?" if c == "asset_id" else c for c in cols])
            table_sql[t] = (col_list, val_list)

        for row in orphans:
            aid = row["asset_id"]
            raw = row["raw_announcement"]
            if not raw: continue
            try:
                data = json.loads(raw)
                bse_code = data.get("Security Code") or data.get("scripCode")
                symbol = data.get("symbol") 
                isin = data.get("isin") or data.get("ISIN")
                
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
                
                if target_id and target_id != aid:
                    logger.info(f"Relinking orphan {aid} -> {target_id} ({isin or symbol or bse_code})")
                    for t in tables:
                        col_list, val_list = table_sql[t]
                        sql = f"INSERT OR IGNORE INTO {t} ({col_list}) SELECT {val_list} FROM {t} WHERE asset_id = ?"
                        conn.execute(sql, (target_id, aid))
                        conn.execute(f"DELETE FROM {t} WHERE asset_id = ?", (aid,))
                    
                    # Update other tables 
                    all_tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
                    for t_row in all_tables:
                        tname = t_row["name"]
                        if tname not in tables and tname != "assets":
                            cols = get_table_columns(conn, tname)
                            if "asset_id" in cols:
                                conn.execute(f"UPDATE OR IGNORE {tname} SET asset_id = ? WHERE asset_id = ?", (target_id, aid))
                                conn.execute(f"DELETE FROM {tname} WHERE asset_id = ?", (aid,))
                    
                    rescued_count += 1
            except Exception as e:
                logger.warning(f"Error rescuing {aid}: {e}")
                # Log the SQL that failed if possible
                pass

        logger.info(f"Rescue operation complete. Relinked {rescued_count} distinct orphaned asset clusters.")

if __name__ == "__main__":
    rescue_via_ca_announcements()
