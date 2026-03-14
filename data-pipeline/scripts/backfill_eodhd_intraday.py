#!/usr/bin/env python3
"""
EODHD Historical Intraday Backfill.

Fetches intraday data for mapped symbols and ingests into `eodhd_intraday_prices`.
Supports resolutions: 1m, 5m, 1h.
Note: 1m is max 120 days history. 5m and 1h go back to Oct 2020 for non-US exchanges.

Usage:
    python scripts/backfill_eodhd_intraday.py --interval 1h --from 2020-10-01 --to 2024-03-01
"""

from __future__ import annotations

import argparse
import logging
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List

from core.db import get_connection
from sources.eodhd.client import EODHDClient

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Constants
# 1m data is limited to ~120 days. 5m and 1h go back to Oct 2020 (per EODHD docs)
MAX_DAYS_PER_REQUEST = 120 # EODHD max intraday request span is 120 days
MAX_WORKERS = 4

def _ingest_intraday_rows(conn: Any, rows: List[Dict], asset_id: str, eodhd_symbol: str, exchange: str, resolution: str) -> int:
    """Insert intraday rows into DB."""
    now = datetime.now(timezone.utc).isoformat()
    inserted = 0
    
    # EODHD intraday response format: {"timestamp": 1640995200, "gmtoffset": 0, "datetime": "2022-01-01 00:00:00", "open": ..., "high": ..., "low": ..., "close": ..., "volume": ...}
    for row in rows:
        if 'close' not in row or row['close'] is None:
            continue
            
        # Ensure we have a valid ISO 8601 timestamp string (UTC)
        ts = row.get("timestamp")
        if not ts:
            continue
            
        dt_str = datetime.fromtimestamp(ts, tz=timezone.utc).isoformat()
        
        try:
            conn.execute("""
                INSERT OR REPLACE INTO eodhd_intraday_prices
                (asset_id, timestamp, resolution, open, high, low, close, volume, eodhd_symbol, exchange, fetched_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                asset_id, dt_str, resolution,
                row.get("open"), row.get("high"), row.get("low"), row.get("close"),
                row.get("volume"), eodhd_symbol, exchange, now
            ))
            inserted += 1
        except Exception as exc:
            logger.warning(f"Insert error for {eodhd_symbol} {dt_str}: {exc}")
            
    return inserted

def backfill_symbol_intraday(
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
    
    with get_connection() as conn:
        # Check existing data to potentially skip
        existing = conn.execute("""
            SELECT MIN(timestamp) as min_ts, MAX(timestamp) as max_ts
            FROM eodhd_intraday_prices
            WHERE asset_id = ? AND resolution = ? AND exchange = ?
        """, (asset_id, interval, exchange)).fetchone()
        
        # If we have complete coverage, we could skip (simplified skipping here)
        # Ideally, we chunk the date range into 120-day spans
        current_from = from_dt
        while current_from < to_dt:
            current_to = min(current_from + timedelta(days=MAX_DAYS_PER_REQUEST), to_dt)
            
            logger.debug(f"Fetching {eodhd_symbol} intraday {interval} from {current_from.date()} to {current_to.date()}")
            
            try:
                # EODHD intraday requires timestamps
                rows = client.get_intraday(
                    symbol=symbol_code,
                    exchange=exchange,
                    from_dt=current_from,
                    to_dt=current_to,
                    interval=interval
                )
                
                if rows:
                    ins = _ingest_intraday_rows(conn, rows, asset_id, eodhd_symbol, exchange, interval)
                    total_ins += ins
                
            except Exception as e:
                logger.error(f"Error fetching {eodhd_symbol} intraday: {e}")
                
            current_from = current_to + timedelta(days=1)
            time.sleep(0.06) # Rate limiting
            
        conn.commit()
        
    return eodhd_symbol, total_ins, 0

def main():
    parser = argparse.ArgumentParser(description="Backfill EODHD Intraday Data")
    parser.add_argument("--interval", choices=["1m", "5m", "1h"], default="1h", help="Intraday resolution")
    parser.add_argument("--from-date", default="2020-10-01", help="YYYY-MM-DD")
    parser.add_argument("--to-date", default=datetime.now().strftime("%Y-%m-%d"), help="YYYY-MM-DD")
    parser.add_argument("--symbol", help="Single symbol for testing")
    parser.add_argument("--exchange", default="NSE", help="Exchange to process (default: NSE)")
    parser.add_argument("--workers", type=int, default=MAX_WORKERS)
    
    args = parser.parse_args()
    
    from_dt = datetime.strptime(args.from_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    to_dt = datetime.strptime(args.to_date, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    
    if args.interval == "1m":
        # Check limit
        limit_dt = datetime.now(timezone.utc) - timedelta(days=119)
        if from_dt < limit_dt:
            logger.warning(f"1m data is limited to 120 days. Adjusting from_date to {limit_dt.date()}")
            from_dt = limit_dt
            
    client = EODHDClient()
    
    with get_connection() as conn:
        q_parts = ["SELECT asset_id, eodhd_nse_symbol, eodhd_bse_symbol FROM eodhd_symbol_mapping WHERE is_active = 1"]
        params = []
        if args.symbol:
            q_parts.append("AND (eodhd_nse_symbol = ? OR eodhd_bse_symbol = ?)")
            eodhd_sym = f"{args.symbol.upper()}.{args.exchange}"
            params += [eodhd_sym, eodhd_sym.replace(f".{args.exchange}", ".BSE")]
            
        mappings = conn.execute(" ".join(q_parts), params).fetchall()
        
    jobs = []
    for row in mappings:
        if row["eodhd_nse_symbol"] and args.exchange == "NSE":
            jobs.append((row["asset_id"], row["eodhd_nse_symbol"].split(".")[0], "NSE"))
        elif row["eodhd_bse_symbol"] and args.exchange == "BSE":
            jobs.append((row["asset_id"], row["eodhd_bse_symbol"].split(".")[0], "BSE"))
            
    logger.info(f"Starting intraday ({args.interval}) backfill for {len(jobs)} symbols...")
    
    total_inserted = 0
    processed = 0
    
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {
            executor.submit(
                backfill_symbol_intraday, client, job[0], job[1], job[2], from_dt, to_dt, args.interval
            ): job for job in jobs
        }
        
        for future in as_completed(futures):
            job = futures[future]
            try:
                sym, ins, _ = future.result()
                total_inserted += ins
                processed += 1
                if processed % 10 == 0:
                    logger.info(f"Processed {processed}/{len(jobs)}: {sym} (+{ins} rows). Total so far: {total_inserted}")
            except Exception as e:
                logger.error(f"Failed job for {job}: {e}", exc_info=True)
                
    logger.info(f"Completed! Total intraday rows inserted: {total_inserted}")

if __name__ == "__main__":
    main()
