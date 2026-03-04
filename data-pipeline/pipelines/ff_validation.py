"""
Fama-French Factor Validation
==============================

Compares our computed factors against IIMA's published factors.

Metrics:
- Correlation coefficient
- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- Sign agreement (% of days with same direction)

Author: Artha Development Team
Date: 2026-03-04
"""

import sqlite3
import pandas as pd
import numpy as np
from pathlib import Path
import logging
from typing import Dict, Tuple
import matplotlib.pyplot as plt
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DB_PATH = Path(__file__).parent.parent / "db" / "market_data.db"


class FactorValidator:
    """Validates computed factors against IIMA benchmark."""
    
    def __init__(self, db_path: Path = DB_PATH):
        self.db_path = db_path
        self.conn = None
    
    def __enter__(self):
        self.conn = sqlite3.connect(self.db_path)
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
    
    def load_factors(self, start_date: str, end_date: str) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        Load both computed and IIMA factors for comparison.
        
        Returns: (computed_df, iima_df)
        """
        # Load computed factors
        computed_query = """
        SELECT 
            date,
            market_return,
            market_premium,
            smb,
            hml,
            wml,
            rf_rate,
            num_stocks
        FROM ff_factor_returns
        WHERE source = 'COMPUTED'
          AND frequency = 'DAILY'
          AND date >= ?
          AND date <= ?
        ORDER BY date
        """
        
        computed_df = pd.read_sql_query(
            computed_query,
            self.conn,
            params=(start_date, end_date)
        )
        
        # Load IIMA factors
        iima_query = """
        SELECT 
            date,
            market_return,
            market_premium,
            smb,
            hml,
            wml,
            rf_rate
        FROM ff_factor_returns
        WHERE source = 'IIMA'
          AND frequency = 'DAILY'
          AND date >= ?
          AND date <= ?
        ORDER BY date
        """
        
        iima_df = pd.read_sql_query(
            iima_query,
            self.conn,
            params=(start_date, end_date)
        )
        
        logger.info(f"Loaded {len(computed_df)} computed records")
        logger.info(f"Loaded {len(iima_df)} IIMA records")
        
        return computed_df, iima_df
    
    def compute_metrics(self, computed: pd.Series, iima: pd.Series, factor_name: str) -> Dict:
        """
        Compute validation metrics for a single factor.
        
        Returns: Dict with correlation, MAE, RMSE, sign_agreement
        """
        # Merge on index to ensure alignment
        df = pd.DataFrame({
            'computed': computed,
            'iima': iima
        }).dropna()
        
        if df.empty:
            logger.warning(f"{factor_name}: No overlapping data")
            return None
        
        # Correlation
        correlation = df['computed'].corr(df['iima'])
        
        # Mean Absolute Error
        mae = (df['computed'] - df['iima']).abs().mean()
        
        # Root Mean Squared Error
        rmse = np.sqrt(((df['computed'] - df['iima']) ** 2).mean())
        
        # Sign agreement (same direction)
        sign_agreement = ((df['computed'] > 0) == (df['iima'] > 0)).mean()
        
        # Mean values
        computed_mean = df['computed'].mean()
        iima_mean = df['iima'].mean()
        
        metrics = {
            'factor': factor_name,
            'n_obs': len(df),
            'correlation': correlation,
            'mae': mae,
            'rmse': rmse,
            'sign_agreement': sign_agreement,
            'computed_mean': computed_mean,
            'iima_mean': iima_mean,
            'mean_diff': computed_mean - iima_mean
        }
        
        return metrics
    
    def validate_all_factors(self, start_date: str, end_date: str) -> pd.DataFrame:
        """
        Validate all factors and return summary DataFrame.
        """
        computed_df, iima_df = self.load_factors(start_date, end_date)
        
        if computed_df.empty:
            logger.error("No computed factors found")
            return pd.DataFrame()
        
        if iima_df.empty:
            logger.error("No IIMA factors found")
            return pd.DataFrame()
        
        # Merge on date
        merged = pd.merge(
            computed_df,
            iima_df,
            on='date',
            how='inner',
            suffixes=('_computed', '_iima')
        )
        
        logger.info(f"Overlapping dates: {len(merged)}")
        
        if merged.empty:
            logger.error("No overlapping dates between computed and IIMA factors")
            return pd.DataFrame()
        
        # Validate each factor
        results = []
        
        factors = ['market_premium', 'smb', 'wml']  # Skip HML for now (not computed)
        
        for factor in factors:
            computed_col = f"{factor}_computed"
            iima_col = f"{factor}_iima"
            
            if computed_col in merged.columns and iima_col in merged.columns:
                metrics = self.compute_metrics(
                    merged[computed_col],
                    merged[iima_col],
                    factor.upper()
                )
                
                if metrics:
                    results.append(metrics)
        
        results_df = pd.DataFrame(results)
        
        return results_df
    
    def print_validation_report(self, results_df: pd.DataFrame):
        """Print formatted validation report."""
        if results_df.empty:
            logger.error("No validation results to display")
            return
        
        print("\n" + "="*80)
        print("FAMA-FRENCH FACTOR VALIDATION REPORT")
        print("="*80)
        print(f"\nPeriod: {results_df.iloc[0]['n_obs']} overlapping trading days")
        print("\nTarget Metrics:")
        print("  - Correlation: >0.90 (Production), >0.80 (MVP)")
        print("  - Sign Agreement: >85%")
        print("  - MAE: <2%")
        print("\n" + "-"*80)
        
        for _, row in results_df.iterrows():
            factor = row['factor']
            print(f"\n{factor}:")
            print(f"  Correlation:     {row['correlation']:.4f}  {'✅' if row['correlation'] > 0.90 else '⚠️' if row['correlation'] > 0.80 else '❌'}")
            print(f"  Sign Agreement:  {row['sign_agreement']:.2%}  {'✅' if row['sign_agreement'] > 0.85 else '⚠️' if row['sign_agreement'] > 0.75 else '❌'}")
            print(f"  MAE:             {row['mae']:.4f}  {'✅' if row['mae'] < 0.02 else '⚠️' if row['mae'] < 0.03 else '❌'}")
            print(f"  RMSE:            {row['rmse']:.4f}")
            print(f"  Our Mean:        {row['computed_mean']:.4f}")
            print(f"  IIMA Mean:       {row['iima_mean']:.4f}")
            print(f"  Difference:      {row['mean_diff']:.4f}")
        
        print("\n" + "="*80)
        
        # Overall assessment
        avg_corr = results_df['correlation'].mean()
        avg_sign = results_df['sign_agreement'].mean()
        
        print("\nOVERALL ASSESSMENT:")
        if avg_corr > 0.90 and avg_sign > 0.85:
            print("  ✅ PRODUCTION READY - Excellent correlation with IIMA")
        elif avg_corr > 0.80 and avg_sign > 0.75:
            print("  ⚠️  MVP QUALITY - Good correlation, minor deviations")
        else:
            print("  ❌ NEEDS IMPROVEMENT - Significant deviations from IIMA")
        
        print(f"  Average Correlation: {avg_corr:.4f}")
        print(f"  Average Sign Agreement: {avg_sign:.2%}")
        print("="*80 + "\n")
    
    def store_validation_results(self, results_df: pd.DataFrame, start_date: str, end_date: str):
        """Store validation results in database."""
        if results_df.empty:
            return
        
        for _, row in results_df.iterrows():
            record = {
                'id': f"VAL_{row['factor']}_{start_date}_{end_date}",
                'factor_name': row['factor'],
                'start_date': start_date,
                'end_date': end_date,
                'n_observations': int(row['n_obs']),
                'correlation': row['correlation'],
                'mae': row['mae'],
                'rmse': row['rmse'],
                'sign_agreement': row['sign_agreement'],
                'computed_mean': row['computed_mean'],
                'iima_mean': row['iima_mean'],
                'validated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            
            df = pd.DataFrame([record])
            df.to_sql('ff_validation', self.conn, if_exists='append', index=False)
        
        self.conn.commit()
        logger.info("Validation results stored in database")
    
    def plot_factor_comparison(self, start_date: str, end_date: str, output_dir: Path = None):
        """
        Create comparison plots for visual validation.
        """
        computed_df, iima_df = self.load_factors(start_date, end_date)
        
        if computed_df.empty or iima_df.empty:
            logger.error("Cannot create plots - missing data")
            return
        
        merged = pd.merge(
            computed_df,
            iima_df,
            on='date',
            how='inner',
            suffixes=('_computed', '_iima')
        )
        
        merged['date'] = pd.to_datetime(merged['date'])
        
        factors = ['market_premium', 'smb', 'wml']
        
        fig, axes = plt.subplots(len(factors), 1, figsize=(12, 4*len(factors)))
        
        if len(factors) == 1:
            axes = [axes]
        
        for i, factor in enumerate(factors):
            computed_col = f"{factor}_computed"
            iima_col = f"{factor}_iima"
            
            if computed_col in merged.columns and iima_col in merged.columns:
                ax = axes[i]
                ax.plot(merged['date'], merged[computed_col], label='Our Computation', alpha=0.7)
                ax.plot(merged['date'], merged[iima_col], label='IIMA', alpha=0.7, linestyle='--')
                ax.set_title(f"{factor.upper()} - Computed vs IIMA")
                ax.set_xlabel('Date')
                ax.set_ylabel('Return')
                ax.legend()
                ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        
        if output_dir:
            output_dir.mkdir(parents=True, exist_ok=True)
            output_file = output_dir / f"ff_validation_{start_date}_{end_date}.png"
            plt.savefig(output_file, dpi=150, bbox_inches='tight')
            logger.info(f"Plot saved to {output_file}")
        else:
            plt.show()


def main():
    """Main execution function."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Fama-French Factor Validation')
    parser.add_argument('--start-date', required=True, help='Start date (YYYY-MM-DD)')
    parser.add_argument('--end-date', required=True, help='End date (YYYY-MM-DD)')
    parser.add_argument('--plot', action='store_true', help='Generate comparison plots')
    parser.add_argument('--output-dir', help='Directory for plots (default: current dir)')
    
    args = parser.parse_args()
    
    with FactorValidator() as validator:
        logger.info(f"\n=== Validating factors: {args.start_date} to {args.end_date} ===\n")
        
        # Compute validation metrics
        results = validator.validate_all_factors(args.start_date, args.end_date)
        
        if not results.empty:
            # Print report
            validator.print_validation_report(results)
            
            # Store results
            validator.store_validation_results(results, args.start_date, args.end_date)
            
            # Generate plots if requested
            if args.plot:
                output_dir = Path(args.output_dir) if args.output_dir else Path.cwd()
                validator.plot_factor_comparison(args.start_date, args.end_date, output_dir)
        else:
            logger.error("Validation failed - no results generated")


if __name__ == '__main__':
    main()
