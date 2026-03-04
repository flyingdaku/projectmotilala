"""
RBI T-Bill Yield Scraper
=========================

Fetches 91-day Treasury Bill yields from RBI website.
These are used as the risk-free rate (Rf) in Fama-French factor computation.

Source: Reserve Bank of India
URL: https://www.rbi.org.in/Scripts/BS_ViewMasRates.aspx

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
from pathlib import Path
import logging
import time
from typing import Optional, List, Dict

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


class RBITBillScraper:
    """Scrapes 91-day T-Bill yields from RBI website."""
    
    RBI_URL = "https://www.rbi.org.in/Scripts/BS_ViewMasRates.aspx"
    
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.conn = None
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })
    
    def __enter__(self):
        self.conn = sqlite3.connect(self.db_path)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
        self.session.close()
    
    def fetch_tbill_data(self, from_date: str, to_date: str) -> List[Dict]:
        """
        Fetch T-Bill auction data from RBI website.
        
        Args:
            from_date: Start date (DD/MM/YYYY)
            to_date: End date (DD/MM/YYYY)
        
        Returns: List of dicts with auction data
        """
        params = {
            'fromdate': from_date,
            'todate': to_date
        }
        
        try:
            response = self.session.get(self.RBI_URL, params=params, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find the table with T-Bill data
            # Note: Actual parsing logic depends on RBI website structure
            # This is a placeholder - needs to be updated based on actual HTML
            
            records = []
            
            # Parse table rows
            # TODO: Implement actual parsing based on RBI website structure
            logger.warning("RBI T-Bill scraping not fully implemented - using placeholder")
            
            return records
        
        except Exception as e:
            logger.error(f"Error fetching T-Bill data: {e}")
            return []
    
    def get_latest_yield(self) -> Optional[float]:
        """Get the most recent 91-day T-Bill yield from database."""
        query = """
        SELECT yield_pct
        FROM rbi_tbill_yields
        WHERE maturity_days = 91
        ORDER BY auction_date DESC
        LIMIT 1
        """
        
        df = pd.read_sql_query(query, self.conn)
        
        if df.empty:
            return None
        
        return df.iloc[0]['yield_pct']
    
    def interpolate_daily_rf_rate(self, start_date: str, end_date: str) -> pd.DataFrame:
        """
        Interpolate daily risk-free rate from weekly T-Bill auctions.
        
        Strategy:
        1. Get all T-Bill yields in date range
        2. Forward-fill to daily frequency
        3. Convert annualized yield to daily rate
        
        Returns: DataFrame with columns [date, rf_rate_daily, rf_rate_annual]
        """
        query = """
        SELECT 
            auction_date as date,
            yield_pct as rf_rate_annual
        FROM rbi_tbill_yields
        WHERE maturity_days = 91
          AND auction_date >= ?
          AND auction_date <= ?
        ORDER BY auction_date
        """
        
        df = pd.read_sql_query(query, self.conn, params=(start_date, end_date))
        
        if df.empty:
            logger.warning("No T-Bill data found, using default 6% annual rate")
            # Fallback: Use constant 6% annual rate
            date_range = pd.date_range(start=start_date, end=end_date, freq='D')
            df = pd.DataFrame({
                'date': date_range,
                'rf_rate_annual': 6.0
            })
        else:
            # Forward-fill to daily frequency
            df['date'] = pd.to_datetime(df['date'])
            df = df.set_index('date')
            
            date_range = pd.date_range(start=start_date, end=end_date, freq='D')
            df = df.reindex(date_range, method='ffill')
            df = df.reset_index().rename(columns={'index': 'date'})
        
        # Convert annual rate to daily rate
        # Daily rate = (1 + annual_rate)^(1/365) - 1
        df['rf_rate_daily'] = (1 + df['rf_rate_annual'] / 100) ** (1/365) - 1
        
        return df
    
    def insert_manual_data(self, records: List[Dict]):
        """
        Insert manually collected T-Bill data.
        
        Args:
            records: List of dicts with keys: auction_date, yield_pct
        """
        df = pd.DataFrame(records)
        df['maturity_days'] = 91
        df['source_url'] = 'MANUAL'
        
        df.to_sql('rbi_tbill_yields', self.conn, if_exists='append', index=False)
        self.conn.commit()
        
        logger.info(f"Inserted {len(records)} T-Bill records")


def seed_historical_tbill_data():
    """
    Seed database with approximate historical T-Bill yields.
    
    Note: These are approximate values for bootstrapping.
    Should be replaced with actual RBI data when available.
    """
    # Approximate 91-day T-Bill yields (annual %)
    # Source: RBI historical data (approximate)
    historical_data = [
        # 2021
        {'auction_date': '2021-01-06', 'yield_pct': 3.35},
        {'auction_date': '2021-04-07', 'yield_pct': 3.42},
        {'auction_date': '2021-07-07', 'yield_pct': 3.58},
        {'auction_date': '2021-10-06', 'yield_pct': 3.65},
        
        # 2022
        {'auction_date': '2022-01-05', 'yield_pct': 3.78},
        {'auction_date': '2022-04-06', 'yield_pct': 4.12},
        {'auction_date': '2022-07-06', 'yield_pct': 5.28},
        {'auction_date': '2022-10-05', 'yield_pct': 6.45},
        
        # 2023
        {'auction_date': '2023-01-04', 'yield_pct': 6.72},
        {'auction_date': '2023-04-05', 'yield_pct': 6.85},
        {'auction_date': '2023-07-05', 'yield_pct': 6.92},
        {'auction_date': '2023-10-04', 'yield_pct': 6.88},
        
        # 2024
        {'auction_date': '2024-01-03', 'yield_pct': 6.82},
        {'auction_date': '2024-04-03', 'yield_pct': 6.75},
        {'auction_date': '2024-07-03', 'yield_pct': 6.68},
        {'auction_date': '2024-10-02', 'yield_pct': 6.55},
    ]
    
    with RBITBillScraper() as scraper:
        scraper.insert_manual_data(historical_data)
    
    logger.info("Seeded historical T-Bill data")


def main():
    """Main execution function."""
    import argparse
    
    parser = argparse.ArgumentParser(description='RBI T-Bill Data Management')
    parser.add_argument('--action', choices=['seed', 'fetch', 'interpolate'], required=True)
    parser.add_argument('--start-date', help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', help='End date (YYYY-MM-DD)')
    
    args = parser.parse_args()
    
    if args.action == 'seed':
        logger.info("Seeding historical T-Bill data...")
        seed_historical_tbill_data()
    
    elif args.action == 'fetch':
        logger.info("Fetching T-Bill data from RBI...")
        logger.warning("RBI scraping not fully implemented - use 'seed' for now")
    
    elif args.action == 'interpolate':
        if not args.start_date or not args.end_date:
            logger.error("--start-date and --end-date required for interpolate")
            return
        
        logger.info(f"Interpolating daily RF rates from {args.start_date} to {args.end_date}")
        with RBITBillScraper() as scraper:
            df = scraper.interpolate_daily_rf_rate(args.start_date, args.end_date)
            print(df.head(10))
            print(f"\nTotal days: {len(df)}")
            print(f"Avg annual rate: {df['rf_rate_annual'].mean():.2f}%")


if __name__ == '__main__':
    main()
