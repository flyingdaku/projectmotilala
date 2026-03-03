import logging
import sqlite3
from collections import defaultdict
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_clusters():
    with get_db() as conn:
        rows = conn.execute("SELECT id, isin, nse_symbol, bse_code FROM assets").fetchall()
    
    adj = defaultdict(set)
    isin_map = defaultdict(list)
    symbol_map = defaultdict(list)
    bse_map = defaultdict(list)
    
    for r in rows:
        aid = r["id"]
        isin = r["isin"]
        sym = r["nse_symbol"]
        bse = r["bse_code"]
        
        if isin and not isin.startswith("TEMP_") and not isin.startswith("pocket_"):
            isin_map[isin].append(aid)
        if sym and sym != "":
            symbol_map[sym].append(aid)
        if bse and bse != "":
            bse_map[bse].append(aid)
            
    for items in isin_map.values():
        for i in range(len(items)-1):
            adj[items[i]].add(items[i+1])
            adj[items[i+1]].add(items[i])
    for items in symbol_map.values():
        for i in range(len(items)-1):
            adj[items[i]].add(items[i+1])
            adj[items[i+1]].add(items[i])
    for items in bse_map.values():
        for i in range(len(items)-1):
            adj[items[i]].add(items[i+1])
            adj[items[i+1]].add(items[i])
            
    visited = set()
    clusters = []
    
    all_ids = [r["id"] for r in rows]
    for start_node in all_ids:
        if start_node not in visited:
            component = []
            queue = [start_node]
            visited.add(start_node)
            while queue:
                u = queue.pop(0)
                component.append(u)
                for v in adj[u]:
                    if v not in visited:
                        visited.add(v)
                        queue.append(v)
            if len(component) > 1:
                clusters.append(component)
    return clusters

def merge_clusters(clusters):
    with get_db() as conn:
        # Dynamically find all tables with 'asset_id' column
        tables_with_asset_id = []
        all_tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        for t in all_tables:
            tname = t["name"]
            cols = conn.execute(f"PRAGMA table_info({tname})").fetchall()
            if any(c["name"] == "asset_id" for c in cols):
                tables_with_asset_id.append(tname)
        
        logger.info(f"Targeting tables for merge: {tables_with_asset_id}")

        for cluster in clusters:
            counts = []
            for aid in cluster:
                # Count daily_prices for priority
                cnt = conn.execute("SELECT COUNT(*) FROM daily_prices WHERE asset_id = ?", (aid,)).fetchone()[0]
                info = conn.execute("SELECT isin, bse_code, nse_symbol FROM assets WHERE id = ?", (aid,)).fetchone()
                counts.append((cnt, aid, info))
                
            counts.sort(key=lambda x: (x[0], bool(x[2]["isin"]), bool(x[2]["nse_symbol"]), bool(x[2]["bse_code"])), reverse=True)
            
            canonical_id = counts[0][1]
            removals = [x[1] for x in counts[1:]]
            
            logger.info(f"Merging into {canonical_id} from {removals}")
            
            for old_id in removals:
                # 1. Update data tables
                for table in tables_with_asset_id:
                    try:
                        # For tables with primary keys that might overlap, we use INSERT OR IGNORE then DELETE
                        # But for simplicity and to handle ALL columns dynamically, we'll try mass update.
                        # If a table has a unique key on (asset_id, ...), simple UPDATE might fail.
                        
                        if table in ["daily_prices", "corporate_actions", "asset_fundamentals"]:
                            # These tables usually have constraints. 
                            # We use INSERT OR IGNORE SELECT to move data
                            cols = [c["name"] for c in conn.execute(f"PRAGMA table_info({table})").fetchall()]
                            col_list = ", ".join(cols)
                            val_list = ", ".join(["?" if c == "asset_id" else c for c in cols])
                            
                            # Note: this is tricky with column ordering. Using explicit SELECT helps.
                            # Standard pattern:
                            # INSERT OR IGNORE INTO table (cols) SELECT ...
                            conn.execute(f"INSERT OR IGNORE INTO {table} ({col_list}) SELECT {val_list} FROM {table} WHERE asset_id = ?", (canonical_id, old_id))
                            conn.execute(f"DELETE FROM {table} WHERE asset_id = ?", (old_id,))
                        else:
                            # Non-unique or simple tables
                            conn.execute(f"UPDATE OR IGNORE {table} SET asset_id = ? WHERE asset_id = ?", (canonical_id, old_id))
                            # If UPDATE OR IGNORE left some orphans because of conflicts, we must delete them too to satisfy FK
                            conn.execute(f"DELETE FROM {table} WHERE asset_id = ?", (old_id,))
                            
                    except Exception as e:
                        logger.warning(f"Error merging {table} for {old_id} -> {canonical_id}: {e}")

                # 2. Update assets attributes
                old_info = conn.execute("SELECT isin, bse_code, nse_symbol FROM assets WHERE id = ?", (old_id,)).fetchone()
                if old_info:
                    conn.execute(
                        "UPDATE assets SET bse_code = COALESCE(bse_code, ?), isin = COALESCE(isin, ?), nse_symbol = COALESCE(nse_symbol, ?) WHERE id = ?",
                        (old_info["bse_code"], old_info["isin"], old_info["nse_symbol"], canonical_id)
                    )
                
                # 3. Final delete
                try:
                    conn.execute("DELETE FROM assets WHERE id = ?", (old_id,))
                except sqlite3.IntegrityError as e:
                     logger.error(f"Failed to delete asset {old_id} due to remaining FKs: {e}")
                     # List all remaining FKs?
                     pass

if __name__ == "__main__":
    clusters = get_clusters()
    logger.info(f"Found {len(clusters)} clusters to merge.")
    merge_clusters(clusters)
    logger.info("Global merge complete.")
