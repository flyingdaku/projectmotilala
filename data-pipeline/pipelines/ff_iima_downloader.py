"""
IIMA Fama-French Data Downloader
=================================

Downloads published factor returns from IIMA for validation purposes.

Source: IIM Ahmedabad - Indian Fama-French-Momentum Data Library
URL: https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import requests
from pathlib import Path
import logging
from typing import Optional
from io import StringIO

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


class IIMADataDownloader:
    """Downloads IIMA's published Fama-French factor returns."""
    
    # IIMA data URLs (as of 2025-12 release)
    BASE_URL = "https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/DATA"
    
    URLS = {
        'daily': f"{BASE_URL}/2025-12_FourFactors_and_Market_Returns_Daily_SurvivorshipBiasAdjusted.csv",
        'monthly': f"{BASE_URL}/2025-12_FourFactors_and_Market_Returns_Monthly_SurvivorshipBiasAdjusted.csv",
        'yearly': f"{BASE_URL}/2025-12_FourFactors_and_Market_Returns_Yearly_SurvivorshipBiasAdjusted.csv",
    }
    
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
    
    def download_factor_data(self, frequency: str = 'daily') -> Optional[pd.DataFrame]:
        """
        Download factor returns from IIMA.
        
        Args:
            frequency: 'daily', 'monthly', or 'yearly'
        
        Returns: DataFrame with columns [date, Rm, Rf, Rm-Rf, SMB, HML, WML]
        """
        if frequency not in self.URLS:
            logger.error(f"Invalid frequency: {frequency}")
            return None
        
        url = self.URLS[frequency]
        logger.info(f"Downloading {frequency} data from IIMA...")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            # Parse CSV
            df = pd.read_csv(StringIO(response.text))
            
            # Expected columns (may vary, adjust based on actual file)
            # Typically: Date, Rm, Rf, Rm-Rf, SMB, HML, WML
            logger.info(f"Downloaded {len(df)} rows")
            logger.info(f"Columns: {df.columns.tolist()}")
            
            return df
        
        except requests.RequestException as e:
            logger.error(f"Error downloading data: {e}")
            return None
        except Exception as e:
            logger.error(f"Error parsing data: {e}")
            return None
    
    def parse_and_store(self, df: pd.DataFrame, frequency: str):
        """
        Parse IIMA data and store in database.
        
        Args:
            df: DataFrame from IIMA
            frequency: 'DAILY', 'MONTHLY', or 'YEARLY'
        """
        if df is None or df.empty:
            logger.warning("No data to store")
            return
        
        # Normalize column names (IIMA format)
        # Actual format: Date, SMB, HML, WML, MF (market factor), RF (risk-free)
        
        column_mapping = {
            'Date': 'date',
            'MF': 'market_premium',  # MF is already Rm-Rf
            'RF': 'rf_rate',
            'SMB': 'smb',
            'HML': 'hml',
            'WML': 'wml',
        }
        
        # Rename columns if they match the mapping
        df = df.rename(columns=column_mapping)
        
        # Compute market_return from market_premium and rf_rate
        # Rm = (Rm - Rf) + Rf
        if 'market_premium' in df.columns and 'rf_rate' in df.columns:
            df['market_return'] = df['market_premium'] + df['rf_rate']
        
        # Ensure required columns exist
        required_cols = ['date', 'market_return', 'rf_rate', 'market_premium', 'smb', 'hml', 'wml']
        missing_cols = [col for col in required_cols if col not in df.columns]
        
        if missing_cols:
            logger.error(f"Missing columns after mapping: {missing_cols}")
            logger.info(f"Available columns: {df.columns.tolist()}")
            return
        
        # Add metadata
        df['frequency'] = frequency.upper()
        df['source'] = 'IIMA'
        df['num_stocks'] = None  # IIMA doesn't provide this
        df['num_portfolios'] = None
        df['notes'] = 'Downloaded from IIMA data library'
        
        # Select and reorder columns
        df = df[['date', 'frequency', 'market_return', 'rf_rate', 'market_premium', 
                 'smb', 'hml', 'wml', 'num_stocks', 'num_portfolios', 'source', 'notes']]
        
        # Convert date format if needed
        try:
            df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        except Exception as e:
            logger.error(f"Error parsing dates: {e}")
            return
        
        # Insert into database
        try:
            # Delete existing IIMA data for this frequency to avoid duplicates
            delete_query = """
            DELETE FROM ff_factor_returns
            WHERE source = 'IIMA' AND frequency = ?
            """
            self.conn.execute(delete_query, (frequency.upper(),))
            
            # Insert new data
            df.to_sql('ff_factor_returns', self.conn, if_exists='append', index=False)
            self.conn.commit()
            
            logger.info(f"Stored {len(df)} {frequency} records from IIMA")
        
        except Exception as e:
            logger.error(f"Error storing data: {e}")
            self.conn.rollback()
    
    def download_all_frequencies(self):
        """Download and store data for all frequencies."""
        for freq in ['daily', 'monthly', 'yearly']:
            logger.info(f"\n=== Processing {freq.upper()} data ===")
            df = self.download_factor_data(freq)
            if df is not None:
                self.parse_and_store(df, freq)
            else:
                logger.warning(f"Failed to download {freq} data")


def main():
    """Main execution function."""
    import argparse
    
    parser = argparse.ArgumentParser(description='IIMA Fama-French Data Downloader')
    parser.add_argument(
        '--frequency', 
        choices=['daily', 'monthly', 'yearly', 'all'], 
        default='all',
        help='Frequency of data to download'
    )
    
    args = parser.parse_args()
    
    with IIMADataDownloader() as downloader:
        if args.frequency == 'all':
            downloader.download_all_frequencies()
        else:
            df = downloader.download_factor_data(args.frequency)
            if df is not None:
                downloader.parse_and_store(df, args.frequency)
    
    logger.info("\n=== Download Complete ===")


if __name__ == '__main__':
    main()
