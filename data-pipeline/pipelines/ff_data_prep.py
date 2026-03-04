"""
Fama-French Factor Model - Data Preparation Pipeline
=====================================================

Phase 1: Prepare historical data needed for factor computation:
1. Market capitalization history (daily)
2. Book value history (annual)
3. RBI T-Bill yields (risk-free rate)

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import logging
from typing import Optional, Dict, List, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Database path
DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


class MarketCapComputer:
    """Computes daily market capitalization for all stocks."""
    
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.conn = None
    
    def __enter__(self):
        self.conn = sqlite3.connect(self.db_path)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
    
    def get_shares_outstanding_history(self, asset_id: str) -> pd.DataFrame:
        """
        Get shares outstanding history for an asset, adjusted for corporate actions.
        
        Strategy:
        1. Get quarterly shares_outstanding from fundamentals
        2. Walk backwards through corporate actions to adjust
        3. Forward-fill between quarters
        
        Returns: DataFrame with columns [date, shares_outstanding]
        """
        query = """
        SELECT 
            period_end_date as date,
            shares_outstanding
        FROM fundamentals
        WHERE asset_id = ? 
          AND shares_outstanding IS NOT NULL
          AND shares_outstanding > 0
        ORDER BY period_end_date
        """
        
        df = pd.read_sql_query(query, self.conn, params=(asset_id,))
        
        if df.empty:
            logger.warning(f"No shares outstanding data for {asset_id}")
            return df
        
        # Get corporate actions that affect shares
        ca_query = """
        SELECT 
            ex_date,
            action_type,
            ratio_numerator,
            ratio_denominator
        FROM corporate_actions
        WHERE asset_id = ?
          AND action_type IN ('SPLIT', 'BONUS')
        ORDER BY ex_date
        """
        
        ca_df = pd.read_sql_query(ca_query, self.conn, params=(asset_id,))
        
        # Adjust shares for corporate actions
        df['date'] = pd.to_datetime(df['date'])
        ca_df['ex_date'] = pd.to_datetime(ca_df['ex_date'])
        
        # For each corporate action, adjust shares before that date
        for _, ca in ca_df.iterrows():
            if ca['action_type'] == 'SPLIT':
                # Split: shares multiply by (new_fv / old_fv)
                ratio = ca['ratio_numerator'] / ca['ratio_denominator']
                df.loc[df['date'] < ca['ex_date'], 'shares_outstanding'] /= ratio
            
            elif ca['action_type'] == 'BONUS':
                # Bonus: shares multiply by (1 + bonus_ratio)
                bonus_ratio = ca['ratio_numerator'] / ca['ratio_denominator']
                df.loc[df['date'] < ca['ex_date'], 'shares_outstanding'] /= (1 + bonus_ratio)
        
        return df
    
    def compute_daily_market_cap(
        self, 
        asset_id: str, 
        start_date: str, 
        end_date: str
    ) -> pd.DataFrame:
        """
        Compute daily market cap for an asset.
        
        Formula: market_cap = close_price × shares_outstanding
        
        Returns: DataFrame with columns [asset_id, date, shares_outstanding, close_price, market_cap]
        """
        # Get shares outstanding history
        shares_df = self.get_shares_outstanding_history(asset_id)
        
        if shares_df.empty:
            return pd.DataFrame()
        
        # Get daily prices
        price_query = """
        SELECT 
            date,
            close
        FROM daily_prices
        WHERE asset_id = ?
          AND date >= ?
          AND date <= ?
          AND close > 0
        ORDER BY date
        """
        
        price_df = pd.read_sql_query(
            price_query, 
            self.conn, 
            params=(asset_id, start_date, end_date)
        )
        
        if price_df.empty:
            logger.warning(f"No price data for {asset_id} in {start_date} to {end_date}")
            return pd.DataFrame()
        
        price_df['date'] = pd.to_datetime(price_df['date'])
        
        # Forward-fill shares outstanding to daily frequency
        shares_df = shares_df.set_index('date')
        date_range = pd.date_range(start=start_date, end=end_date, freq='D')
        shares_daily = shares_df.reindex(date_range, method='ffill')
        shares_daily = shares_daily.reset_index().rename(columns={'index': 'date'})
        
        # Merge with prices
        result = pd.merge(price_df, shares_daily, on='date', how='inner')
        
        # Compute market cap (in crores)
        result['market_cap'] = result['close'] * result['shares_outstanding'] / 1e7
        result['asset_id'] = asset_id
        result['source'] = 'COMPUTED'
        
        # Select and rename columns
        result = result[['asset_id', 'date', 'shares_outstanding', 'close', 'market_cap', 'source']]
        result.columns = ['asset_id', 'date', 'shares_outstanding', 'close_price', 'market_cap', 'source']
        
        return result
    
    def backfill_all_stocks(self, start_date: str, end_date: str, batch_size: int = 100):
        """
        Backfill market cap for all active stocks.
        
        Args:
            start_date: Start date (YYYY-MM-DD)
            end_date: End date (YYYY-MM-DD)
            batch_size: Number of stocks to process before committing
        """
        # Get all active equity assets
        query = """
        SELECT id, nse_symbol, name
        FROM assets
        WHERE asset_class = 'EQUITY'
          AND is_active = 1
        ORDER BY id
        """
        
        assets = pd.read_sql_query(query, self.conn)
        total_assets = len(assets)
        
        logger.info(f"Backfilling market cap for {total_assets} stocks from {start_date} to {end_date}")
        
        processed = 0
        failed = 0
        
        for idx, asset in assets.iterrows():
            try:
                asset_id = asset['id']
                symbol = asset['nse_symbol'] or asset_id
                
                # Check if already computed
                check_query = """
                SELECT COUNT(*) as cnt
                FROM daily_market_cap
                WHERE asset_id = ? AND date >= ? AND date <= ?
                """
                existing = pd.read_sql_query(
                    check_query, 
                    self.conn, 
                    params=(asset_id, start_date, end_date)
                ).iloc[0]['cnt']
                
                if existing > 0:
                    logger.debug(f"Skipping {symbol} - already has {existing} records")
                    processed += 1
                    continue
                
                # Compute market cap
                df = self.compute_daily_market_cap(asset_id, start_date, end_date)
                
                if not df.empty:
                    # Insert into database
                    df.to_sql('daily_market_cap', self.conn, if_exists='append', index=False)
                    logger.info(f"[{processed+1}/{total_assets}] {symbol}: {len(df)} records")
                else:
                    logger.warning(f"[{processed+1}/{total_assets}] {symbol}: No data")
                    failed += 1
                
                processed += 1
                
                # Commit in batches
                if processed % batch_size == 0:
                    self.conn.commit()
                    logger.info(f"Committed batch at {processed}/{total_assets}")
            
            except Exception as e:
                logger.error(f"Error processing {asset['nse_symbol']}: {e}")
                failed += 1
        
        # Final commit
        self.conn.commit()
        logger.info(f"Backfill complete: {processed} processed, {failed} failed")


class BookValueComputer:
    """Computes annual book value per share."""
    
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.conn = None
    
    def __enter__(self):
        self.conn = sqlite3.connect(self.db_path)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
    
    def compute_book_value(self, asset_id: str, fiscal_year_end: str) -> Optional[Dict]:
        """
        Compute book value per share for a given fiscal year end.
        
        Formula: BVPS = (equity_capital + reserves) / shares_outstanding
        
        Args:
            asset_id: Asset ID
            fiscal_year_end: Fiscal year end date (YYYY-MM-DD), typically March 31
        
        Returns: Dict with book value data or None
        """
        # Get balance sheet data
        bs_query = """
        SELECT 
            share_capital,
            reserves,
            total_assets,
            total_liabilities
        FROM screener_balance_sheet
        WHERE asset_id = ?
          AND period_end_date = ?
        """
        
        bs_df = pd.read_sql_query(
            bs_query, 
            self.conn, 
            params=(asset_id, fiscal_year_end)
        )
        
        if bs_df.empty:
            # Try fundamentals table
            fund_query = """
            SELECT 
                total_equity,
                shares_outstanding
            FROM fundamentals
            WHERE asset_id = ?
              AND period_end_date = ?
              AND is_consolidated = 1
            """
            
            fund_df = pd.read_sql_query(
                fund_query,
                self.conn,
                params=(asset_id, fiscal_year_end)
            )
            
            if fund_df.empty:
                return None
            
            row = fund_df.iloc[0]
            total_equity = row['total_equity']
            shares = row['shares_outstanding']
        else:
            row = bs_df.iloc[0]
            total_equity = (row['share_capital'] or 0) + (row['reserves'] or 0)
            
            # Get shares outstanding from fundamentals
            shares_query = """
            SELECT shares_outstanding
            FROM fundamentals
            WHERE asset_id = ?
              AND period_end_date = ?
              AND shares_outstanding IS NOT NULL
            ORDER BY is_consolidated DESC
            LIMIT 1
            """
            
            shares_df = pd.read_sql_query(
                shares_query,
                self.conn,
                params=(asset_id, fiscal_year_end)
            )
            
            if shares_df.empty:
                return None
            
            shares = shares_df.iloc[0]['shares_outstanding']
        
        if not shares or shares <= 0:
            return None
        
        book_value_per_share = total_equity / shares
        
        return {
            'asset_id': asset_id,
            'fiscal_year_end': fiscal_year_end,
            'book_value_per_share': book_value_per_share,
            'total_equity': total_equity,
            'shares_outstanding': shares,
            'source': 'SCREENER' if not bs_df.empty else 'FUNDAMENTALS'
        }
    
    def backfill_all_stocks(self, fiscal_years: List[str]):
        """
        Backfill book value for all stocks for given fiscal years.
        
        Args:
            fiscal_years: List of fiscal year end dates (e.g. ['2021-03-31', '2022-03-31'])
        """
        # Get all active equity assets
        query = """
        SELECT id, nse_symbol, name
        FROM assets
        WHERE asset_class = 'EQUITY'
          AND is_active = 1
        ORDER BY id
        """
        
        assets = pd.read_sql_query(query, self.conn)
        total_assets = len(assets)
        
        logger.info(f"Backfilling book value for {total_assets} stocks, {len(fiscal_years)} years")
        
        records = []
        
        for idx, asset in assets.iterrows():
            asset_id = asset['id']
            symbol = asset['nse_symbol'] or asset_id
            
            for fy_end in fiscal_years:
                try:
                    bv_data = self.compute_book_value(asset_id, fy_end)
                    
                    if bv_data:
                        records.append(bv_data)
                        logger.debug(f"{symbol} {fy_end}: BVPS = {bv_data['book_value_per_share']:.2f}")
                
                except Exception as e:
                    logger.error(f"Error computing book value for {symbol} {fy_end}: {e}")
        
        # Insert into database
        if records:
            df = pd.DataFrame(records)
            df.to_sql('annual_book_value', self.conn, if_exists='append', index=False)
            self.conn.commit()
            logger.info(f"Inserted {len(records)} book value records")
        else:
            logger.warning("No book value records to insert")


def main():
    """Main execution function."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Fama-French Data Preparation')
    parser.add_argument('--task', choices=['market_cap', 'book_value', 'all'], required=True)
    parser.add_argument('--start-date', default='2021-01-01', help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', default='2024-12-31', help='End date (YYYY-MM-DD)')
    parser.add_argument('--batch-size', type=int, default=100, help='Batch size for commits')
    
    args = parser.parse_args()
    
    if args.task in ['market_cap', 'all']:
        logger.info("=== Computing Market Cap History ===")
        with MarketCapComputer() as computer:
            computer.backfill_all_stocks(args.start_date, args.end_date, args.batch_size)
    
    if args.task in ['book_value', 'all']:
        logger.info("=== Computing Book Value History ===")
        # Generate fiscal year ends (March 31)
        fiscal_years = []
        start_year = int(args.start_date[:4])
        end_year = int(args.end_date[:4])
        
        for year in range(start_year, end_year + 1):
            fiscal_years.append(f"{year}-03-31")
        
        with BookValueComputer() as computer:
            computer.backfill_all_stocks(fiscal_years)
    
    logger.info("=== Data Preparation Complete ===")


if __name__ == '__main__':
    main()
