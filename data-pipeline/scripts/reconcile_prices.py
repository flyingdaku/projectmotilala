
import sqlite3
import logging
from datetime import date, timedelta
from pathlib import Path

import sys
sys.path.insert(0, '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline')

from core.db import get_db

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("reconciler")

def get_exchange_dates(conn, exchange):
    rows = conn.execute(
        "SELECT DISTINCT date FROM daily_prices WHERE source_exchange = ? AND date >= '2020-01-01'",
        (exchange,)
    ).fetchall()
    return {r["date"] for r in rows}

def main():
    with get_db() as conn:
        logger.info("Fetching dates from database...")
        nse_dates = get_exchange_dates(conn, "NSE")
        bse_dates = get_exchange_dates(conn, "BSE")
        
        logger.info(f"NSE dates count: {len(nse_dates)}")
        logger.info(f"BSE dates count: {len(bse_dates)}")
        
        nse_only = sorted(list(nse_dates - bse_dates))
        bse_only = sorted(list(bse_dates - nse_dates))
        
        if nse_only:
            logger.warning(f"Dates present only in NSE: {len(nse_only)}")
            for d in nse_only:
                logger.warning(f"  - {d}")
        else:
            logger.info("No dates found only in NSE.")
            
        if bse_only:
            logger.warning(f"Dates present only in BSE: {len(bse_only)}")
            for d in bse_only:
                logger.warning(f"  - {d}")
        else:
            logger.info("No dates found only in BSE.")

        # Check for price discrepancies on a sample day or recent days
        common_dates = sorted(list(nse_dates & bse_dates), reverse=True)[:5]
        if common_dates:
            logger.info(f"Checking price discrepancies for the last {len(common_dates)} common dates...")
            for d in common_dates:
                # Find dual-listed stocks and compare close prices
                # Use a threshold for floating point comparison or mapping differences
                rows = conn.execute("""
                    SELECT a.nse_symbol, n.close as nse_close, b.close as bse_close
                    FROM daily_prices n
                    JOIN daily_prices b ON n.asset_id = b.asset_id AND n.date = b.date
                    JOIN assets a ON a.id = n.asset_id
                    WHERE n.date = ? AND n.source_exchange = 'NSE' AND b.source_exchange = 'BSE'
                      AND ABS(n.close - b.close) / n.close > 0.05
                """, (d,)).fetchall()
                
                if rows:
                    logger.warning(f"Discrepancies for {d} (Close price > 5% diff): {len(rows)}")
                    for r in rows[:10]: # Limit output
                        logger.warning(f"  - {r['nse_symbol']}: NSE={r['nse_close']} BSE={r['bse_close']} Δ={abs(r['nse_close'] - r['bse_close']):.2f}")
                else:
                    logger.info(f"No significant price discrepancies found for {d}")

if __name__ == "__main__":
    main()
