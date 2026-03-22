#!/usr/bin/env python3
"""
Fetch NSE Corporate Actions Historical Data (2000 onwards)

This script fetches corporate actions data from NSE for all symbols from 2000 onwards.
Data is saved as raw JSON files in raw_data/NSE_CORP_ACTIONS/ for later processing.

NO DATABASE INGESTION - Raw data collection only.

Usage:
    python scripts/fetch_nse_corporate_actions_historical.py
    python scripts/fetch_nse_corporate_actions_historical.py --symbol RELIANCE
    python scripts/fetch_nse_corporate_actions_historical.py --workers 5
    python scripts/fetch_nse_corporate_actions_historical.py --start-year 2000 --end-year 2024
"""

from __future__ import annotations

import argparse
import json
import logging
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime
from pathlib import Path
from typing import Dict, List, Optional

import requests

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration
RAW_DATA_DIR = Path(__file__).parent.parent / "raw_data" / "NSE_CORP_ACTIONS"
DEFAULT_WORKERS = 3
REQUEST_DELAY = 1.0  # seconds between requests to avoid rate limiting
MAX_RETRIES = 3
RETRY_DELAY = 5.0

# NSE API endpoints
NSE_CA_URL = "https://www.nseindia.com/api/corporates-corporateActions"
NSE_HOME_URL = "https://www.nseindia.com"

# Headers from working curl
NSE_HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
    'dnt': '1',
    'priority': 'u=1, i',
    'referer': 'https://www.nseindia.com/companies-listing/corporate-filings-actions',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36'
}


def create_nse_session() -> requests.Session:
    """Create and prime NSE session with cookies."""
    session = requests.Session()
    session.headers.update(NSE_HEADERS)
    
    # Prime session by visiting homepage
    try:
        logger.debug("Priming NSE session...")
        resp = session.get(NSE_HOME_URL, timeout=15)
        resp.raise_for_status()
        logger.debug(f"Session primed. Cookies: {len(session.cookies)}")
        return session
    except Exception as e:
        logger.warning(f"Failed to prime NSE session: {e}")
        return session


def get_all_symbols() -> List[str]:
    """Get all NSE symbols from assets table."""
    import sys
    sys.path.insert(0, str(Path(__file__).parent.parent))
    
    from core.db import get_connection
    
    with get_connection() as conn:
        rows = conn.execute("""
            SELECT DISTINCT nse_symbol 
            FROM assets 
            WHERE nse_symbol IS NOT NULL 
            AND nse_symbol != ''
            AND nse_listed = 1
            ORDER BY nse_symbol
        """).fetchall()
    
    symbols = [row['nse_symbol'] for row in rows]
    logger.info(f"Found {len(symbols)} NSE symbols")
    return symbols


def get_symbol_name(symbol: str) -> Optional[str]:
    """Get company name for symbol (for API parameter)."""
    import sys
    sys.path.insert(0, str(Path(__file__).parent.parent))
    
    from core.db import get_connection
    
    with get_connection() as conn:
        row = conn.execute("""
            SELECT name 
            FROM assets 
            WHERE nse_symbol = %s
            LIMIT 1
        """, (symbol,)).fetchone()
    
    return row['name'] if row else None


def save_raw_file(symbol: str, data: dict, year: Optional[int] = None):
    """Save raw JSON response to file."""
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    if year:
        filename = f"{symbol}_{year}.json"
    else:
        filename = f"{symbol}_all.json"
    
    filepath = RAW_DATA_DIR / filename
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    logger.debug(f"Saved: {filepath}")


def file_exists(symbol: str, year: Optional[int] = None) -> bool:
    """Check if raw file already exists."""
    if year:
        filename = f"{symbol}_{year}.json"
    else:
        filename = f"{symbol}_all.json"
    
    return (RAW_DATA_DIR / filename).exists()


def fetch_corporate_actions(
    session: requests.Session,
    symbol: str,
    issuer: Optional[str] = None,
    from_date: Optional[str] = None,
    to_date: Optional[str] = None
) -> Optional[dict]:
    """
    Fetch corporate actions for a symbol.
    
    Args:
        session: Requests session
        symbol: NSE symbol
        issuer: Company name (optional but recommended)
        from_date: Start date in DD-MM-YYYY format
        to_date: End date in DD-MM-YYYY format
    
    Returns:
        JSON response or None on failure
    """
    params = {
        'index': 'equities',
        'symbol': symbol
    }
    
    if issuer:
        params['issuer'] = issuer
    
    if from_date:
        params['from_date'] = from_date
    
    if to_date:
        params['to_date'] = to_date
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(NSE_CA_URL, params=params, timeout=30)
            
            if resp.status_code == 404:
                logger.debug(f"{symbol}: No data (404)")
                return {'symbol': symbol, 'data': []}
            
            if resp.status_code == 403:
                logger.warning(f"{symbol}: Forbidden (403) - session may need refresh")
                if attempt < MAX_RETRIES:
                    time.sleep(RETRY_DELAY * attempt)
                    # Try refreshing session
                    session.get(NSE_HOME_URL, timeout=15)
                    continue
                return None
            
            resp.raise_for_status()
            
            data = resp.json()
            
            # Wrap response with metadata
            result = {
                'symbol': symbol,
                'issuer': issuer,
                'from_date': from_date,
                'to_date': to_date,
                'fetched_at': datetime.now().isoformat(),
                'data': data if isinstance(data, list) else data.get('data', [])
            }
            
            return result
            
        except requests.exceptions.RequestException as e:
            logger.warning(f"{symbol}: Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY * attempt)
            else:
                logger.error(f"{symbol}: Failed after {MAX_RETRIES} attempts")
                return None
        except Exception as e:
            logger.error(f"{symbol}: Unexpected error: {e}")
            return None
    
    return None


def fetch_symbol_all_time(symbol: str, skip_existing: bool = True) -> tuple[str, bool, Optional[str]]:
    """
    Fetch all corporate actions for a symbol (no date filter).
    
    Returns:
        (symbol, success, error_message)
    """
    if skip_existing and file_exists(symbol):
        logger.debug(f"{symbol}: Skipping (file exists)")
        return (symbol, True, "skipped")
    
    # Create fresh session for each symbol to avoid cookie staleness
    session = create_nse_session()
    
    # Get company name
    issuer = get_symbol_name(symbol)
    
    logger.info(f"{symbol}: Fetching all-time corporate actions...")
    
    data = fetch_corporate_actions(session, symbol, issuer)
    
    if data is None:
        return (symbol, False, "fetch_failed")
    
    # Save raw data
    save_raw_file(symbol, data)
    
    record_count = len(data.get('data', []))
    logger.info(f"{symbol}: ✓ Fetched {record_count} corporate actions")
    
    # Rate limiting
    time.sleep(REQUEST_DELAY)
    
    return (symbol, True, None)


def fetch_symbol_by_year(
    symbol: str,
    start_year: int,
    end_year: int,
    skip_existing: bool = True
) -> tuple[str, int, int]:
    """
    Fetch corporate actions for a symbol year by year.
    
    Returns:
        (symbol, success_count, failed_count)
    """
    session = create_nse_session()
    issuer = get_symbol_name(symbol)
    
    success_count = 0
    failed_count = 0
    
    for year in range(start_year, end_year + 1):
        if skip_existing and file_exists(symbol, year):
            logger.debug(f"{symbol} {year}: Skipping (file exists)")
            success_count += 1
            continue
        
        from_date = f"01-01-{year}"
        to_date = f"31-12-{year}"
        
        logger.info(f"{symbol} {year}: Fetching...")
        
        data = fetch_corporate_actions(session, symbol, issuer, from_date, to_date)
        
        if data is None:
            logger.warning(f"{symbol} {year}: Failed")
            failed_count += 1
            continue
        
        # Save raw data
        save_raw_file(symbol, data, year)
        
        record_count = len(data.get('data', []))
        logger.info(f"{symbol} {year}: ✓ {record_count} records")
        
        success_count += 1
        
        # Rate limiting
        time.sleep(REQUEST_DELAY)
    
    return (symbol, success_count, failed_count)


def main():
    parser = argparse.ArgumentParser(
        description='Fetch NSE corporate actions historical data (raw files only)'
    )
    parser.add_argument('--symbol', help='Fetch for specific symbol only')
    parser.add_argument('--workers', type=int, default=DEFAULT_WORKERS,
                        help=f'Number of parallel workers (default: {DEFAULT_WORKERS})')
    parser.add_argument('--start-year', type=int, default=2000,
                        help='Start year (default: 2000)')
    parser.add_argument('--end-year', type=int, default=datetime.now().year,
                        help='End year (default: current year)')
    parser.add_argument('--by-year', action='store_true',
                        help='Fetch year by year instead of all-time')
    parser.add_argument('--skip-existing', action='store_true', default=True,
                        help='Skip symbols with existing files (default: True)')
    parser.add_argument('--force', action='store_true',
                        help='Force re-fetch even if files exist')
    parser.add_argument('--verbose', action='store_true',
                        help='Verbose logging')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    skip_existing = args.skip_existing and not args.force
    
    # Get symbols to process
    if args.symbol:
        symbols = [args.symbol]
    else:
        symbols = get_all_symbols()
    
    logger.info(f"Starting NSE corporate actions fetch")
    logger.info(f"Symbols: {len(symbols)}")
    logger.info(f"Workers: {args.workers}")
    logger.info(f"Mode: {'year-by-year' if args.by_year else 'all-time'}")
    logger.info(f"Skip existing: {skip_existing}")
    logger.info(f"Output: {RAW_DATA_DIR}")
    
    # Create output directory
    RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
    
    # Process symbols
    success_count = 0
    failed_count = 0
    skipped_count = 0
    
    if args.by_year:
        # Year-by-year fetching
        logger.info(f"Fetching year range: {args.start_year} - {args.end_year}")
        
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = {
                executor.submit(
                    fetch_symbol_by_year,
                    symbol,
                    args.start_year,
                    args.end_year,
                    skip_existing
                ): symbol
                for symbol in symbols
            }
            
            for future in as_completed(futures):
                symbol = futures[future]
                try:
                    sym, success, failed = future.result()
                    success_count += success
                    failed_count += failed
                except Exception as e:
                    logger.error(f"{symbol}: Exception: {e}")
                    failed_count += 1
    else:
        # All-time fetching (recommended - simpler and faster)
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = {
                executor.submit(fetch_symbol_all_time, symbol, skip_existing): symbol
                for symbol in symbols
            }
            
            for future in as_completed(futures):
                symbol = futures[future]
                try:
                    sym, ok, err = future.result()
                    if err == "skipped":
                        skipped_count += 1
                    elif ok:
                        success_count += 1
                    else:
                        failed_count += 1
                except Exception as e:
                    logger.error(f"{symbol}: Exception: {e}")
                    failed_count += 1
    
    # Summary
    logger.info("=" * 80)
    logger.info("NSE CORPORATE ACTIONS FETCH COMPLETE")
    logger.info("=" * 80)
    logger.info(f"Total symbols: {len(symbols)}")
    logger.info(f"Success: {success_count}")
    logger.info(f"Failed: {failed_count}")
    logger.info(f"Skipped: {skipped_count}")
    logger.info(f"Output directory: {RAW_DATA_DIR}")
    logger.info("=" * 80)
    
    # List some sample files
    files = list(RAW_DATA_DIR.glob("*.json"))
    logger.info(f"Total files: {len(files)}")
    if files:
        logger.info("Sample files:")
        for f in sorted(files)[:10]:
            size = f.stat().st_size
            logger.info(f"  {f.name} ({size:,} bytes)")


if __name__ == '__main__':
    main()
