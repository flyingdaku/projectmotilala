#!/usr/bin/env python3
"""
EODHD Daily Ingestion Pipeline.

Fetches the previous day's end-of-day data from EODHD using their Bulk API
and ingests it into `eodhd_daily_prices`.
"""

from __future__ import annotations

import argparse
import logging
import sys
from datetime import date, datetime, timedelta
from typing import Any, Dict, List

from core.db import get_connection
from sources.eodhd.client import EODHDClient

logger = logging.getLogger(__name__)

def ingest_bulk_data(conn: Any, rows: List[Dict], exchange: str) -> int:
    """Ingest bulk API response into eodhd_daily_prices."""
    # First, get the mapping so we know which asset_id corresponds to which symbol
    mapping_query = f"""
        SELECT eodhd_{exchange.lower()}_symbol as symbol, asset_id
        FROM eodhd_symbol_mapping
        WHERE eodhd_{exchange.lower()}_symbol IS NOT NULL
    """
    mapping = {row['symbol']: row['asset_id'] for row in conn.execute(mapping_query).fetchall()}
    
    now = datetime.now().isoformat()
    inserted = 0
    
    for row in rows:
        symbol_code = row.get("code")
        eodhd_symbol = f"{symbol_code}.{exchange}"
        
        asset_id = mapping.get(eodhd_symbol)
        if not asset_id:
            continue
            
        close = row.get("close")
        if close is None or close == "NA" or close == "":
            continue
            
        try:
            conn.execute("""
                INSERT OR REPLACE INTO eodhd_daily_prices
                (asset_id, date, open, high, low, close, adjusted_close,
                 volume, eodhd_symbol, exchange, fetched_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?)
            """, (
                asset_id,
                row.get("date"),
                row.get("open") if row.get("open") != "NA" else None,
                row.get("high") if row.get("high") != "NA" else None,
                row.get("low") if row.get("low") != "NA" else None,
                float(close),
                row.get("adjusted_close") if row.get("adjusted_close") != "NA" else None,
                row.get("volume") if row.get("volume") != "NA" else None,
                eodhd_symbol,
                exchange,
                now
            ))
            inserted += 1
        except Exception as exc:
            logger.warning(f"Insert error for {eodhd_symbol} {row.get('date')}: {exc}")
            
    return inserted

def run_daily_eodhd(trade_date: date) -> Dict[str, Any]:
    """Run daily EODHD ingestion for all supported exchanges."""
    client = EODHDClient()
    stats = {"date": trade_date.isoformat(), "exchanges": {}}
    
    with get_connection() as conn:
        for exchange in ["NSE", "BSE"]:
            logger.info(f"Fetching bulk EOD data for {exchange} on {trade_date}...")
            try:
                rows = client.get_bulk_eod(exchange, trade_date)
                if not rows:
                    logger.warning(f"No bulk data returned for {exchange} on {trade_date}")
                    stats["exchanges"][exchange] = {"status": "NO_DATA", "inserted": 0}
                    continue
                    
                inserted = ingest_bulk_data(conn, rows, exchange)
                logger.info(f"Ingested {inserted} rows for {exchange}")
                stats["exchanges"][exchange] = {"status": "SUCCESS", "inserted": inserted}
                
            except Exception as e:
                logger.error(f"Failed to fetch/ingest {exchange} data: {e}", exc_info=True)
                stats["exchanges"][exchange] = {"status": "FAILED", "error": str(e)}
                
        conn.commit()
        
    return stats

def main():
    parser = argparse.ArgumentParser(description="Ingest daily EODHD data via Bulk API")
    parser.add_argument("date", nargs="?", help="Date to fetch (YYYY-MM-DD), default: yesterday")
    args = parser.parse_args()
    
    if args.date:
        trade_date = datetime.strptime(args.date, "%Y-%m-%d").date()
    else:
        # If today is Monday, get Friday. Otherwise yesterday.
        today = date.today()
        if today.weekday() == 0:  # Monday
            trade_date = today - timedelta(days=3)
        elif today.weekday() == 6:  # Sunday
            trade_date = today - timedelta(days=2)
        else:
            trade_date = today - timedelta(days=1)
            
    try:
        stats = run_daily_eodhd(trade_date)
        logger.info(f"EODHD Daily ingestion complete: {stats}")
    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
