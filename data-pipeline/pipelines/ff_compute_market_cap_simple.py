"""
Simplified Market Cap Computation
==================================

Since we don't have shares_outstanding data in fundamentals table,
we'll use a simplified approach:

1. For stocks with screener data: Use share_capital / assumed_face_value
2. Compute market cap = price × estimated_shares
3. This is approximate but sufficient for factor computation

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import numpy as np
from pathlib import Path
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


def compute_shares_from_capital(share_capital_cr: float, face_value: float = 1.0) -> int:
    """
    Estimate shares outstanding from share capital.
    
    Args:
        share_capital_cr: Share capital in crores
        face_value: Face value per share (default ₹1, some stocks have ₹2, ₹5, ₹10)
    
    Returns: Estimated shares outstanding
    """
    # share_capital = shares × face_value
    # shares = share_capital / face_value
    shares = (share_capital_cr * 1e7) / face_value  # Convert crores to rupees
    return int(shares)


def backfill_market_cap_simple(start_date: str, end_date: str):
    """
    Simplified market cap backfill using share capital data.
    
    Strategy:
    1. Get latest share capital for each stock from screener_balance_sheet
    2. Estimate shares = share_capital / 1.0 (assuming ₹1 face value)
    3. Join with daily prices to compute market cap
    4. Store in daily_market_cap table
    """
    conn = sqlite3.connect(DB_PATH)
    
    logger.info("Step 1: Getting share capital data from screener_balance_sheet...")
    
    # Get latest share capital for each stock
    share_capital_query = """
    SELECT 
        asset_id,
        period_end_date,
        share_capital,
        ROW_NUMBER() OVER (PARTITION BY asset_id ORDER BY period_end_date DESC) as rn
    FROM screener_balance_sheet
    WHERE share_capital IS NOT NULL AND share_capital > 0
    """
    
    df_capital = pd.read_sql_query(f"""
        SELECT asset_id, period_end_date, share_capital
        FROM ({share_capital_query})
        WHERE rn = 1
    """, conn)
    
    logger.info(f"Found share capital data for {len(df_capital)} stocks")
    
    # Estimate shares outstanding (assuming ₹1 face value)
    df_capital['shares_outstanding'] = df_capital['share_capital'].apply(
        lambda x: compute_shares_from_capital(x, face_value=1.0)
    )
    
    logger.info("Step 2: Getting daily prices...")
    
    # Get all daily prices in date range
    prices_query = """
    SELECT 
        asset_id,
        date,
        close
    FROM daily_prices
    WHERE date >= ? AND date <= ?
      AND close > 0
    ORDER BY asset_id, date
    """
    
    df_prices = pd.read_sql_query(prices_query, conn, params=(start_date, end_date))
    logger.info(f"Found {len(df_prices)} price records")
    
    logger.info("Step 3: Merging and computing market cap...")
    
    # Merge prices with share capital
    df_merged = pd.merge(
        df_prices,
        df_capital[['asset_id', 'shares_outstanding']],
        on='asset_id',
        how='inner'
    )
    
    logger.info(f"Merged data: {len(df_merged)} records for {df_merged['asset_id'].nunique()} stocks")
    
    # Compute market cap (in crores)
    df_merged['market_cap'] = (df_merged['close'] * df_merged['shares_outstanding']) / 1e7
    df_merged['close_price'] = df_merged['close']
    df_merged['source'] = 'COMPUTED_SIMPLE'
    
    # Select final columns
    df_final = df_merged[['asset_id', 'date', 'shares_outstanding', 'close_price', 'market_cap', 'source']]
    
    logger.info("Step 4: Inserting into daily_market_cap table...")
    
    # Delete existing computed data
    conn.execute("DELETE FROM daily_market_cap WHERE source = 'COMPUTED_SIMPLE'")
    conn.commit()
    
    # Insert new data in batches
    batch_size = 10000
    total_inserted = 0
    
    for i in range(0, len(df_final), batch_size):
        batch = df_final.iloc[i:i+batch_size]
        batch.to_sql('daily_market_cap', conn, if_exists='append', index=False)
        total_inserted += len(batch)
        if (i // batch_size + 1) % 10 == 0:
            logger.info(f"Inserted {total_inserted:,} / {len(df_final):,} records")
    
    conn.commit()
    conn.close()
    
    logger.info(f"✅ Market cap backfill complete: {total_inserted:,} records for {df_final['asset_id'].nunique()} stocks")
    
    # Summary statistics
    logger.info("\n=== Summary Statistics ===")
    logger.info(f"Date range: {df_final['date'].min()} to {df_final['date'].max()}")
    logger.info(f"Stocks covered: {df_final['asset_id'].nunique()}")
    logger.info(f"Avg market cap: ₹{df_final['market_cap'].mean():.2f} Cr")
    logger.info(f"Median market cap: ₹{df_final['market_cap'].median():.2f} Cr")
    logger.info(f"Max market cap: ₹{df_final['market_cap'].max():.2f} Cr")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='Simplified Market Cap Computation')
    parser.add_argument('--start-date', default='2021-01-01', help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', default='2024-12-31', help='End date (YYYY-MM-DD)')
    
    args = parser.parse_args()
    
    logger.info("=== Simplified Market Cap Backfill ===")
    logger.info(f"Period: {args.start_date} to {args.end_date}")
    logger.info("Note: Using share capital / ₹1 face value to estimate shares outstanding")
    logger.info("This is approximate but sufficient for factor computation\n")
    
    backfill_market_cap_simple(args.start_date, args.end_date)


if __name__ == '__main__':
    main()
