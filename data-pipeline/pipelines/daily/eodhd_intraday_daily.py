#!/usr/bin/env python3
"""
EODHD Daily Intraday Ingestion.

Fetches the previous day's intraday data for mapped symbols and ingests it.
Runs symbol-by-symbol as there is no bulk intraday endpoint.
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from datetime import datetime, timezone, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Dict, List

from core.db import get_connection
from sources.eodhd.client import EODHDClient

logger = logging.getLogger(__name__)

MAX_WORKERS = 4

def _ingest_intraday_rows(conn: Any, rows: List[Dict], asset_id: str, eodhd_symbol: str, exchange: str, resolution: str) -> int:
    """Insert intraday rows into DB."""
    now = datetime.now(timezone.utc).isoformat()
    inserted = 0
    
    for row in rows:
        if 'close' not in row or row['close'] is None:
            continue
            
        ts = row.get("timestamp")
        if not ts:
            continue
            
        dt_str = datetime.fromtimestamp(ts, tz=timezone.utc).isoformat()
        
        try:
            conn.execute("""
                INSERT INTO eodhd_intraday_prices
                (asset_id, timestamp, resolution, open, high, low, close, volume, eodhd_symbol, exchange, fetched_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (asset_id, timestamp, resolution) DO UPDATE SET
                  open = EXCLUDED.open, high = EXCLUDED.high, low = EXCLUDED.low,
                  close = EXCLUDED.close, volume = EXCLUDED.volume, fetched_at = EXCLUDED.fetched_at
            """, (
                asset_id, dt_str, resolution,
                row.get("open"), row.get("high"), row.get("low"), row.get("close"),
                row.get("volume"), eodhd_symbol, exchange, now
            ))
            inserted += 1
        except Exception as exc:
            logger.warning(f"Insert error for {eodhd_symbol} {dt_str}: {exc}")
            
    return inserted

def fetch_intraday_for_symbol(
    client: EODHDClient,
    asset_id: str,
    symbol_code: str,
    exchange: str,
    from_dt: datetime,
    to_dt: datetime,
    interval: str
) -> tuple[str, int, int]:
    eodhd_symbol = f"{symbol_code}.{exchange}"
    total_ins = 0
    
    try:
        rows = client.get_intraday(
            symbol=symbol_code,
            exchange=exchange,
            from_dt=from_dt,
            to_dt=to_dt,
            interval=interval
        )
        
        if rows:
            with get_connection() as conn:
                total_ins = _ingest_intraday_rows(conn, rows, asset_id, eodhd_symbol, exchange, interval)
                conn.commit()
                
    except Exception as e:
        logger.error(f"Error fetching {eodhd_symbol} intraday: {e}")
        
    time.sleep(0.06) # Rate limiting for safety
    return eodhd_symbol, total_ins, 0

def run_intraday_daily(trade_date: datetime.date, intervals: List[str] = ["1h", "5m"]):
    """Run daily EODHD intraday ingestion."""
    # Convert date to start/end datetimes in UTC for the target trading day
    # Indian market hours roughly 03:45 UTC to 10:00 UTC, we'll grab the whole UTC day
    from_dt = datetime.combine(trade_date, datetime.min.time(), tzinfo=timezone.utc)
    to_dt = from_dt + timedelta(days=1)
    
    client = EODHDClient()
    stats = {"date": trade_date.isoformat(), "intervals": {}}
    
    with get_connection() as conn:
        mappings = conn.execute("""
            SELECT asset_id, eodhd_nse_symbol, eodhd_bse_symbol
            FROM eodhd_symbol_mapping 
            WHERE is_active = 1
        """).fetchall()
        
    jobs = []
    for row in mappings:
        if row["eodhd_nse_symbol"]:
            jobs.append((row["asset_id"], row["eodhd_nse_symbol"].split(".")[0], "NSE"))
        elif row["eodhd_bse_symbol"]:
            jobs.append((row["asset_id"], row["eodhd_bse_symbol"].split(".")[0], "BSE"))
            
    for interval in intervals:
        logger.info(f"Fetching intraday ({interval}) for {len(jobs)} symbols on {trade_date}...")
        total_inserted = 0
        processed = 0
        
        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            futures = {
                executor.submit(
                    fetch_intraday_for_symbol, client, job[0], job[1], job[2], from_dt, to_dt, interval
                ): job for job in jobs
            }
            
            for future in as_completed(futures):
                job = futures[future]
                try:
                    sym, ins, _ = future.result()
                    total_inserted += ins
                    processed += 1
                    if processed % 500 == 0:
                        logger.info(f"Processed {processed}/{len(jobs)} for {interval}. Total rows: {total_inserted}")
                except Exception as e:
                    logger.error(f"Failed job for {job}: {e}")
                    
        stats["intervals"][interval] = {"status": "SUCCESS", "inserted": total_inserted}
        logger.info(f"Completed interval {interval}. Rows inserted: {total_inserted}")
        
    return stats

def main():
    parser = argparse.ArgumentParser(description="Ingest daily EODHD intraday data")
    parser.add_argument("date", nargs="?", help="Date to fetch (YYYY-MM-DD), default: yesterday")
    args = parser.parse_args()
    
    if args.date:
        trade_date = datetime.strptime(args.date, "%Y-%m-%d").date()
    else:
        today = datetime.now(timezone.utc).date()
        if today.weekday() == 0:  # Monday
            trade_date = today - timedelta(days=3)
        elif today.weekday() == 6:  # Sunday
            trade_date = today - timedelta(days=2)
        else:
            trade_date = today - timedelta(days=1)
            
    try:
        stats = run_intraday_daily(trade_date)
        logger.info(f"EODHD Intraday Daily ingestion complete: {stats}")
    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
