import logging
import sqlite3
from datetime import date, timedelta
from utils.db import get_db, execute_query, execute_one
from pipelines.verification import check_adj_close_integrity, check_no_duplicate_prices

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

def audit_completeness_by_year():
    logger.info("--- AUDIT: Data Completeness by Year ---")
    query = """
    SELECT substr(date, 1, 4) as yr, source_exchange, COUNT(DISTINCT date) as days, COUNT(*) as total_rows
    FROM daily_prices
    GROUP BY yr, source_exchange
    ORDER BY yr, source_exchange
    """
    rows = execute_query(query)
    for r in rows:
        logger.info(f"{r['yr']} | {r['source_exchange']} | Days: {r['days']} | Rows: {r['total_rows']}")

def audit_null_adj_prices():
    logger.info("--- AUDIT: Null Adjusted prices ---")
    count = execute_one("SELECT COUNT(*) as cnt FROM daily_prices WHERE adj_close IS NULL")["cnt"]
    logger.info(f"Total rows with NULL adj_close: {count}")
    if count > 0:
        logger.info("Sample of NULL adj_close rows (latest):")
        samples = execute_query("SELECT asset_id, date, source_exchange FROM daily_prices WHERE adj_close IS NULL ORDER BY date DESC LIMIT 10")
        for s in samples:
            logger.info(f"  {s['date']} | {s['asset_id']} | {s['source_exchange']}")

def audit_corporate_actions():
    logger.info("--- AUDIT: Corporate Action Source Coverage ---")
    query = """
    SELECT substr(ex_date, 1, 4) as yr, source_exchange, COUNT(*) as cnt
    FROM corporate_actions
    GROUP BY yr, source_exchange
    ORDER BY yr, source_exchange
    """
    rows = execute_query(query)
    for r in rows:
        logger.info(f"{r['yr']} | {r['source_exchange']} | Count: {r['cnt']}")

def audit_orphan_prices():
    logger.info("--- AUDIT: Orphan Prices (no asset entry) ---")
    count = execute_one("SELECT COUNT(*) as cnt FROM daily_prices WHERE asset_id NOT IN (SELECT id FROM assets)")["cnt"]
    logger.info(f"Orphan prices count: {count}")

def check_duplicate_assets():
    logger.info("--- AUDIT: Potential Duplicate Assets (shared symbols) ---")
    dupes = execute_query("""
        SELECT nse_symbol, COUNT(*) as c 
        FROM assets 
        WHERE nse_symbol IS NOT NULL AND nse_symbol != '' 
        GROUP BY nse_symbol HAVING c > 1
    """)
    logger.info(f"Duplicate NSE Symbols: {len(dupes)}")
    
    dupes_bse = execute_query("""
        SELECT bse_code, COUNT(*) as c 
        FROM assets 
        WHERE bse_code IS NOT NULL AND bse_code != '' 
        GROUP BY bse_code HAVING c > 1
    """)
    logger.info(f"Duplicate BSE Codes: {len(dupes_bse)}")

def run_audit():
    audit_completeness_by_year()
    audit_corporate_actions()
    audit_null_adj_prices()
    audit_orphan_prices()
    check_duplicate_assets()
    
    logger.info("--- AUDIT: Standard Integrity Checks ---")
    check_no_duplicate_prices()
    check_adj_close_integrity()

if __name__ == "__main__":
    run_audit()
