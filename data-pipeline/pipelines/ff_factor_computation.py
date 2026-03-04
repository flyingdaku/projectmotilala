"""
Fama-French Factor Computation Algorithm
=========================================

Implements the 4-factor model following IIMA methodology:
- Market Premium (Rm - Rf)
- SMB (Small Minus Big) - Size factor
- HML (High Minus Low) - Value factor  
- WML (Winners Minus Losers) - Momentum factor

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from pathlib import Path
import logging
from typing import Dict, List, Tuple, Optional
import uuid

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


class FamaFrenchComputer:
    """Computes Fama-French 4-factor model returns."""
    
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.conn = None
    
    def __enter__(self):
        self.conn = sqlite3.connect(self.db_path)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
    
    def get_stock_universe(self, date: str, lookback_days: int = 365) -> pd.DataFrame:
        """
        Get eligible stock universe for a given date.
        
        Filters:
        1. Has price data on the date
        2. Has sufficient history (lookback_days)
        3. Active stock (is_active = 1)
        4. Equity only (asset_class = 'EQUITY')
        
        Returns: DataFrame with columns [asset_id, close, adj_close, volume]
        """
        lookback_date = (pd.to_datetime(date) - timedelta(days=lookback_days)).strftime('%Y-%m-%d')
        min_trading_days = int(lookback_days * 0.5)  # At least 50% of trading days (relaxed)
        
        # Simplified query - get all stocks with data on the date
        query = """
        SELECT 
            dp.asset_id,
            dp.close,
            dp.adj_close,
            dp.volume,
            a.nse_symbol,
            a.name
        FROM daily_prices dp
        INNER JOIN assets a ON dp.asset_id = a.id
        WHERE dp.date = ?
          AND dp.adj_close IS NOT NULL
          AND dp.adj_close > 0
          AND a.asset_class = 'EQUITY'
        """
        
        df = pd.read_sql_query(query, self.conn, params=(date,))
        
        if df.empty:
            return df
        
        # Filter for stocks with sufficient history
        history_query = """
        SELECT asset_id, COUNT(*) as days_count
        FROM daily_prices
        WHERE date >= ? AND date <= ?
          AND adj_close IS NOT NULL
          AND asset_id IN ({})
        GROUP BY asset_id
        HAVING COUNT(*) >= ?
        """.format(','.join(['?'] * len(df)))
        
        asset_ids = df['asset_id'].tolist()
        history_df = pd.read_sql_query(
            history_query,
            self.conn,
            params=[lookback_date, date] + asset_ids + [min_trading_days]
        )
        
        # Filter to stocks with sufficient history
        df = df[df['asset_id'].isin(history_df['asset_id'])].copy()
        
        return df
    
    def apply_filters(self, df: pd.DataFrame, date: str) -> pd.DataFrame:
        """
        Apply IIMA filters to stock universe.
        
        Filters:
        1. Micro-cap filter: market_cap >= 10% of median
        2. Penny stock filter: median price >= ₹1.00 over past year
        
        Returns: Filtered DataFrame with is_eligible flag
        """
        if df.empty:
            return df
        
        # Filter 1: Micro-cap filter (need market cap)
        # For now, use close price as proxy (larger stocks have higher prices generally)
        # TODO: Use actual market cap when available
        median_price = df['close'].median()
        microcap_threshold = median_price * 0.1
        
        df['passes_microcap'] = df['close'] >= microcap_threshold
        
        # Filter 2: Penny stock filter
        # Get median price over past year for each stock
        lookback_date = (pd.to_datetime(date) - timedelta(days=365)).strftime('%Y-%m-%d')
        
        penny_stock_query = """
        SELECT 
            asset_id,
            AVG(close) as median_price
        FROM daily_prices
        WHERE date >= ? AND date <= ?
          AND close IS NOT NULL
        GROUP BY asset_id
        """
        
        median_prices = pd.read_sql_query(
            penny_stock_query,
            self.conn,
            params=(lookback_date, date)
        )
        
        df = df.merge(median_prices, on='asset_id', how='left', suffixes=('', '_median'))
        df['median_price'] = df['median_price'].fillna(df['close'])
        df['passes_penny'] = df['median_price'] >= 1.0
        
        # Combined filter
        df['is_eligible'] = df['passes_microcap'] & df['passes_penny']
        
        logger.info(f"Filters applied: {df['is_eligible'].sum()}/{len(df)} stocks eligible")
        logger.info(f"  Micro-cap filter: {df['passes_microcap'].sum()} pass")
        logger.info(f"  Penny stock filter: {df['passes_penny'].sum()} pass")
        
        return df[df['is_eligible']].copy()
    
    def compute_market_cap(self, df: pd.DataFrame, date: str) -> pd.DataFrame:
        """
        Compute or retrieve market capitalization for each stock.
        
        Uses daily_market_cap table if available, otherwise estimates from price.
        """
        # Try to get from daily_market_cap table
        mcap_query = """
        SELECT asset_id, market_cap
        FROM daily_market_cap
        WHERE date = ?
        """
        
        mcap_df = pd.read_sql_query(mcap_query, self.conn, params=(date,))
        
        if not mcap_df.empty:
            df = df.merge(mcap_df, on='asset_id', how='left')
            logger.info(f"Market cap from database: {df['market_cap'].notna().sum()} stocks")
        
        # For stocks without market cap, use price as proxy
        if 'market_cap' not in df.columns or df['market_cap'].isna().any():
            logger.warning("Market cap not available, using price as proxy")
            if 'market_cap' not in df.columns:
                df['market_cap'] = df['close']
            else:
                df['market_cap'] = df['market_cap'].fillna(df['close'])
        
        return df
    
    def compute_returns(self, asset_ids: List[str], start_date: str, end_date: str) -> pd.DataFrame:
        """
        Compute returns for given assets over date range.
        
        Returns: DataFrame with columns [asset_id, date, return]
        """
        query = """
        SELECT 
            asset_id,
            date,
            adj_close,
            LAG(adj_close) OVER (PARTITION BY asset_id ORDER BY date) as prev_adj_close
        FROM daily_prices
        WHERE asset_id IN ({})
          AND date >= ?
          AND date <= ?
          AND adj_close IS NOT NULL
        ORDER BY asset_id, date
        """.format(','.join(['?'] * len(asset_ids)))
        
        df = pd.read_sql_query(
            query,
            self.conn,
            params=asset_ids + [start_date, end_date]
        )
        
        # Compute return = (P1 - P0) / P0
        df['return'] = (df['adj_close'] - df['prev_adj_close']) / df['prev_adj_close']
        df = df[df['return'].notna()].copy()
        
        return df[['asset_id', 'date', 'return']]
    
    def compute_size_breakpoint(self, df: pd.DataFrame) -> float:
        """Compute median market cap (50th percentile)."""
        return df['market_cap'].median()
    
    def compute_value_breakpoints(self, df: pd.DataFrame, date: str) -> Tuple[float, float]:
        """
        Compute Book-to-Market ratio breakpoints (30th, 70th percentiles).
        
        For now, returns None since we don't have book value data yet.
        TODO: Implement when book value data is available.
        """
        # Placeholder - need book value data
        logger.warning("Book value data not available, skipping value breakpoints")
        return None, None
    
    def compute_momentum_breakpoints(self, df: pd.DataFrame, date: str) -> Tuple[float, float]:
        """
        Compute past 12-month return breakpoints (30th, 70th percentiles).
        
        Excludes most recent month as per Fama-French methodology.
        """
        # Get returns from (date - 13 months) to (date - 1 month)
        end_lookback = (pd.to_datetime(date) - timedelta(days=30)).strftime('%Y-%m-%d')
        start_lookback = (pd.to_datetime(date) - timedelta(days=395)).strftime('%Y-%m-%d')
        
        asset_ids = df['asset_id'].tolist()
        
        returns_query = """
        SELECT 
            asset_id,
            (MAX(adj_close) / MIN(adj_close) - 1) as past_12m_return
        FROM daily_prices
        WHERE asset_id IN ({})
          AND date >= ?
          AND date <= ?
          AND adj_close IS NOT NULL
        GROUP BY asset_id
        HAVING COUNT(*) >= 200
        """.format(','.join(['?'] * len(asset_ids)))
        
        returns_df = pd.read_sql_query(
            returns_query,
            self.conn,
            params=asset_ids + [start_lookback, end_lookback]
        )
        
        if returns_df.empty:
            logger.warning("No momentum data available")
            return None, None
        
        p30 = returns_df['past_12m_return'].quantile(0.30)
        p70 = returns_df['past_12m_return'].quantile(0.70)
        
        logger.info(f"Momentum breakpoints: 30th={p30:.4f}, 70th={p70:.4f}")
        
        # Merge back to main df
        df = df.merge(returns_df, on='asset_id', how='left')
        
        return p30, p70, df
    
    def assign_portfolios(
        self,
        df: pd.DataFrame,
        size_breakpoint: float,
        value_breakpoints: Optional[Tuple[float, float]] = None,
        momentum_breakpoints: Optional[Tuple[float, float]] = None
    ) -> Dict[str, pd.DataFrame]:
        """
        Assign stocks to portfolios based on breakpoints.
        
        Returns: Dict of portfolio_id -> DataFrame
        """
        portfolios = {}
        
        # Size classification
        df['size_class'] = df['market_cap'].apply(
            lambda x: 'SMALL' if x < size_breakpoint else 'BIG'
        )
        
        # Momentum classification (if available)
        if momentum_breakpoints and 'past_12m_return' in df.columns:
            p30, p70 = momentum_breakpoints
            df['momentum_class'] = df['past_12m_return'].apply(
                lambda x: 'LOSER' if x < p30 else ('WINNER' if x > p70 else 'MEDIUM')
            )
            
            # Create 4 Size-Momentum portfolios
            for size in ['SMALL', 'BIG']:
                for momentum in ['LOSER', 'WINNER']:
                    portfolio_id = f"{size}_{momentum}"
                    portfolio_df = df[
                        (df['size_class'] == size) & 
                        (df['momentum_class'] == momentum)
                    ].copy()
                    
                    if len(portfolio_df) >= 5:  # Minimum portfolio size
                        portfolios[portfolio_id] = portfolio_df
                    else:
                        logger.warning(f"Portfolio {portfolio_id} has <5 stocks, skipping")
        
        # If we don't have momentum, just create size portfolios
        if not portfolios:
            portfolios['SMALL'] = df[df['size_class'] == 'SMALL'].copy()
            portfolios['BIG'] = df[df['size_class'] == 'BIG'].copy()
        
        logger.info(f"Created {len(portfolios)} portfolios:")
        for pid, pf in portfolios.items():
            logger.info(f"  {pid}: {len(pf)} stocks, total mcap: ₹{pf['market_cap'].sum():.2f}Cr")
        
        return portfolios
    
    def compute_portfolio_return(
        self,
        portfolio_df: pd.DataFrame,
        date: str
    ) -> Optional[float]:
        """
        Compute value-weighted portfolio return for a single day.
        
        Formula: R_portfolio = Σ(w_i × R_i)
        where w_i = market_cap_i / Σ(market_cap)
        """
        asset_ids = portfolio_df['asset_id'].tolist()
        
        # Get today's and yesterday's prices
        query = """
        SELECT 
            asset_id,
            adj_close,
            LAG(adj_close) OVER (PARTITION BY asset_id ORDER BY date) as prev_adj_close
        FROM daily_prices
        WHERE asset_id IN ({})
          AND date <= ?
        ORDER BY asset_id, date DESC
        LIMIT ?
        """.format(','.join(['?'] * len(asset_ids)))
        
        returns_df = pd.read_sql_query(
            query,
            self.conn,
            params=asset_ids + [date, len(asset_ids) * 2]
        )
        
        # Compute returns
        returns_df['return'] = (
            (returns_df['adj_close'] - returns_df['prev_adj_close']) / 
            returns_df['prev_adj_close']
        )
        returns_df = returns_df[returns_df['return'].notna()]
        
        # Merge with market cap weights
        weighted_df = portfolio_df[['asset_id', 'market_cap']].merge(
            returns_df[['asset_id', 'return']],
            on='asset_id',
            how='inner'
        )
        
        if weighted_df.empty:
            return None
        
        # Compute value-weighted return
        total_mcap = weighted_df['market_cap'].sum()
        weighted_df['weight'] = weighted_df['market_cap'] / total_mcap
        portfolio_return = (weighted_df['weight'] * weighted_df['return']).sum()
        
        return portfolio_return
    
    def compute_factors_for_date(
        self,
        date: str,
        rf_rate: float = 0.0
    ) -> Optional[Dict]:
        """
        Compute all 4 factors for a single date.
        
        Returns: Dict with factor values or None if insufficient data
        """
        logger.info(f"\n=== Computing factors for {date} ===")
        
        # Step 1: Get stock universe
        universe = self.get_stock_universe(date)
        if universe.empty:
            logger.warning(f"No stocks in universe for {date}")
            return None
        
        logger.info(f"Universe: {len(universe)} stocks")
        
        # Step 2: Apply filters
        eligible = self.apply_filters(universe, date)
        if eligible.empty:
            logger.warning(f"No eligible stocks after filters for {date}")
            return None
        
        # Step 3: Compute market cap
        eligible = self.compute_market_cap(eligible, date)
        
        # Step 4: Compute breakpoints
        size_bp = self.compute_size_breakpoint(eligible)
        logger.info(f"Size breakpoint (median mcap): ₹{size_bp:.2f}Cr")
        
        momentum_result = self.compute_momentum_breakpoints(eligible, date)
        if momentum_result[0] is not None:
            mom_p30, mom_p70, eligible = momentum_result
            momentum_bps = (mom_p30, mom_p70)
        else:
            momentum_bps = None
        
        # Step 5: Assign to portfolios
        portfolios = self.assign_portfolios(eligible, size_bp, None, momentum_bps)
        
        # Step 6: Compute portfolio returns
        portfolio_returns = {}
        for pid, pf in portfolios.items():
            ret = self.compute_portfolio_return(pf, date)
            if ret is not None:
                portfolio_returns[pid] = ret
                logger.info(f"  {pid} return: {ret:.4%}")
        
        if not portfolio_returns:
            logger.warning("No portfolio returns computed")
            return None
        
        # Step 7: Compute factors
        # Market return = value-weighted return of all stocks
        market_return = self.compute_portfolio_return(eligible, date)
        
        # SMB = Avg(Small) - Avg(Big)
        small_returns = [v for k, v in portfolio_returns.items() if 'SMALL' in k]
        big_returns = [v for k, v in portfolio_returns.items() if 'BIG' in k]
        
        smb = np.mean(small_returns) - np.mean(big_returns) if small_returns and big_returns else None
        
        # WML = Avg(Winners) - Avg(Losers)
        winner_returns = [v for k, v in portfolio_returns.items() if 'WINNER' in k]
        loser_returns = [v for k, v in portfolio_returns.items() if 'LOSER' in k]
        
        wml = np.mean(winner_returns) - np.mean(loser_returns) if winner_returns and loser_returns else None
        
        # HML = Not computed yet (need book value data)
        hml = None
        
        result = {
            'date': date,
            'market_return': market_return,
            'rf_rate': rf_rate,
            'market_premium': market_return - rf_rate if market_return else None,
            'smb': smb,
            'hml': hml,
            'wml': wml,
            'num_stocks': len(eligible),
            'num_portfolios': len(portfolios)
        }
        
        logger.info(f"Factors computed:")
        logger.info(f"  Market: {market_return:.4%}" if market_return else "  Market: N/A")
        logger.info(f"  SMB: {smb:.4%}" if smb else "  SMB: N/A")
        logger.info(f"  HML: N/A (need book value data)")
        logger.info(f"  WML: {wml:.4%}" if wml else "  WML: N/A")
        
        return result
    
    def store_factor_returns(self, factors: Dict):
        """Store computed factors in database."""
        df = pd.DataFrame([factors])
        df['frequency'] = 'DAILY'
        df['source'] = 'COMPUTED'
        df['notes'] = 'Computed using IIMA methodology'
        
        df.to_sql('ff_factor_returns', self.conn, if_exists='append', index=False)
        self.conn.commit()


    def compute_date_range(self, start_date: str, end_date: str, rf_rate: float = 0.065):
        """
        Compute factors for a date range.
        
        Only computes for trading days (days with price data).
        """
        # Get all trading days in range
        query = """
        SELECT DISTINCT date
        FROM daily_prices
        WHERE date >= ? AND date <= ?
          AND adj_close IS NOT NULL
        ORDER BY date
        """
        
        trading_days = pd.read_sql_query(query, self.conn, params=(start_date, end_date))
        dates = trading_days['date'].tolist()
        
        logger.info(f"\n=== Computing factors for {len(dates)} trading days ===")
        logger.info(f"Period: {start_date} to {end_date}")
        
        success_count = 0
        failed_count = 0
        
        for i, date in enumerate(dates, 1):
            try:
                logger.info(f"\n[{i}/{len(dates)}] Processing {date}...")
                result = self.compute_factors_for_date(date, rf_rate)
                
                if result:
                    self.store_factor_returns(result)
                    success_count += 1
                    logger.info(f"✅ {date} complete")
                else:
                    failed_count += 1
                    logger.warning(f"⚠️  {date} - no factors computed")
            
            except Exception as e:
                failed_count += 1
                logger.error(f"❌ {date} failed: {e}")
            
            # Progress update every 10 days
            if i % 10 == 0:
                logger.info(f"\nProgress: {i}/{len(dates)} ({success_count} success, {failed_count} failed)")
        
        logger.info(f"\n=== Batch Complete ===")
        logger.info(f"Total: {len(dates)} days")
        logger.info(f"Success: {success_count}")
        logger.info(f"Failed: {failed_count}")
        logger.info(f"Success rate: {success_count/len(dates)*100:.1f}%")


def main():
    """Main execution function."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Fama-French Factor Computation')
    parser.add_argument('--date', help='Single date to compute (YYYY-MM-DD)')
    parser.add_argument('--start-date', help='Start date for range (YYYY-MM-DD)')
    parser.add_argument('--end-date', help='End date for range (YYYY-MM-DD)')
    parser.add_argument('--test', action='store_true', help='Test mode (single recent date)')
    parser.add_argument('--rf-rate', type=float, default=0.065, help='Risk-free rate (annual, default 6.5%%)')
    
    args = parser.parse_args()
    
    with FamaFrenchComputer() as computer:
        if args.test:
            # Test with most recent date
            test_date = '2024-12-31'
            logger.info(f"=== TEST MODE: Computing for {test_date} ===")
            result = computer.compute_factors_for_date(test_date, rf_rate=args.rf_rate)
            if result:
                computer.store_factor_returns(result)
                logger.info("\n✅ Test successful!")
            else:
                logger.error("\n❌ Test failed")
        
        elif args.date:
            result = computer.compute_factors_for_date(args.date, rf_rate=args.rf_rate)
            if result:
                computer.store_factor_returns(result)
                logger.info(f"\n✅ Factors stored for {args.date}")
        
        elif args.start_date and args.end_date:
            computer.compute_date_range(args.start_date, args.end_date, rf_rate=args.rf_rate)
        
        else:
            logger.error("Please specify --date, --start-date/--end-date, or --test")


if __name__ == '__main__':
    main()
