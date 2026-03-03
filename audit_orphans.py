import logging
from utils.db import get_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def audit_all_orphans():
    with get_db() as conn:
        all_tables = conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        for t_row in all_tables:
            tname = t_row["name"]
            if tname == "assets": continue
            cols = [c["name"] for c in conn.execute(f"PRAGMA table_info({tname})").fetchall()]
            if "asset_id" in cols:
                # Use faster LEFT JOIN query
                query = f"""
                    SELECT count(*) as cnt 
                    FROM {tname} t
                    LEFT JOIN assets a ON t.asset_id = a.id
                    WHERE a.id IS NULL
                """
                count = conn.execute(query).fetchone()[0]
                if count > 0:
                    logger.info(f"Table {tname}: found {count} orphans.")
                    sample_query = f"""
                        SELECT DISTINCT t.asset_id 
                        FROM {tname} t
                        LEFT JOIN assets a ON t.asset_id = a.id
                        WHERE a.id IS NULL
                        LIMIT 5
                    """
                    samples = conn.execute(sample_query).fetchall()
                    logger.info(f"  Samples: {[s['asset_id'] for s in samples]}")
                else:
                    logger.info(f"Table {tname}: OK (0 orphans).")

if __name__ == "__main__":
    audit_all_orphans()
