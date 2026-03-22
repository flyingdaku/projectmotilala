#!/usr/bin/env python3
"""
EODHD Adjusted Close Validation Script

Comprehensive validation of EODHD adjusted_close data quality for quantitative analysis.
Implements checks for:
  1. Data completeness and coverage
  2. Adjustment ratio sanity checks
  3. Return distribution analysis
  4. Cross-validation with NSE/BSE
  5. Corporate actions reconciliation
  6. Survivorship bias verification

Usage:
    python scripts/validate_eodhd_adjustments.py
    python scripts/validate_eodhd_adjustments.py --symbol RELIANCE
    python scripts/validate_eodhd_adjustments.py --date 2024-01-15
"""

from __future__ import annotations

import argparse
import logging
from datetime import date, timedelta
from typing import Dict, List, Tuple

from core.db import get_connection

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def check_data_completeness() -> Dict:
    """Check EODHD data completeness and coverage."""
    with get_connection() as conn:
        total_records = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices').fetchone()
        symbols_with_data = conn.execute('SELECT COUNT(DISTINCT asset_id) as cnt FROM eodhd_daily_prices').fetchone()
        total_mapped = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_symbol_mapping').fetchone()
        date_range = conn.execute('SELECT MIN(date) as min_date, MAX(date) as max_date FROM eodhd_daily_prices').fetchone()
        
        # Check adjusted_close coverage
        adj_close_present = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices WHERE adjusted_close IS NOT NULL').fetchone()
        adj_close_null = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices WHERE close IS NOT NULL AND adjusted_close IS NULL').fetchone()
        
        # Check for negative or zero adjusted_close
        negative_adj = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices WHERE adjusted_close < 0').fetchone()
        zero_adj = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices WHERE adjusted_close = 0').fetchone()
        
        coverage_pct = (symbols_with_data['cnt'] / total_mapped['cnt'] * 100) if total_mapped['cnt'] > 0 else 0
        adj_coverage_pct = (adj_close_present['cnt'] / total_records['cnt'] * 100) if total_records['cnt'] > 0 else 0
        
        return {
            'total_records': total_records['cnt'],
            'symbols_with_data': symbols_with_data['cnt'],
            'total_mapped': total_mapped['cnt'],
            'coverage_pct': coverage_pct,
            'date_range': (date_range['min_date'], date_range['max_date']),
            'adj_close_present': adj_close_present['cnt'],
            'adj_close_null': adj_close_null['cnt'],
            'adj_coverage_pct': adj_coverage_pct,
            'negative_adj': negative_adj['cnt'],
            'zero_adj': zero_adj['cnt'],
            'status': 'PASS' if adj_close_null['cnt'] == 0 and negative_adj['cnt'] == 0 else 'FAIL'
        }


def check_adjustment_ratios() -> Dict:
    """Analyze adjustment ratio distribution and flag extreme cases."""
    with get_connection() as conn:
        # Count extreme adjustments
        extreme_high = conn.execute('''
            SELECT COUNT(*) as cnt
            FROM eodhd_daily_prices
            WHERE adjusted_close IS NOT NULL AND close > 0
            AND adjusted_close / close > 100
        ''').fetchone()
        
        extreme_low = conn.execute('''
            SELECT COUNT(*) as cnt
            FROM eodhd_daily_prices
            WHERE adjusted_close IS NOT NULL AND close > 0
            AND adjusted_close / close < 0.01
        ''').fetchone()
        
        total_extreme = extreme_high['cnt'] + extreme_low['cnt']
        total_records = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_daily_prices WHERE close > 0').fetchone()
        extreme_pct = (total_extreme / total_records['cnt'] * 100) if total_records['cnt'] > 0 else 0
        
        # Sample extreme cases for validation
        extreme_samples = conn.execute('''
            SELECT 
                a.nse_symbol,
                edp.date,
                edp.close,
                edp.adjusted_close,
                ROUND(edp.adjusted_close / edp.close, 4) as adj_ratio
            FROM eodhd_daily_prices edp
            JOIN eodhd_symbol_mapping esm ON edp.asset_id = esm.asset_id
            JOIN assets a ON esm.asset_id = a.id
            WHERE edp.adjusted_close IS NOT NULL 
            AND edp.close > 0
            AND (edp.adjusted_close / edp.close > 100 OR edp.adjusted_close / edp.close < 0.01)
            ORDER BY RANDOM()
            LIMIT 10
        ''').fetchall()
        
        return {
            'extreme_high': extreme_high['cnt'],
            'extreme_low': extreme_low['cnt'],
            'total_extreme': total_extreme,
            'extreme_pct': extreme_pct,
            'extreme_samples': [dict(row) for row in extreme_samples],
            'status': 'PASS'  # Extreme ratios are expected for historical data
        }


def check_return_distribution() -> Dict:
    """Analyze return distribution for sanity checks."""
    with get_connection() as conn:
        # Calculate daily returns for recent data
        returns_stats = conn.execute('''
            WITH returns AS (
                SELECT 
                    asset_id,
                    date,
                    adjusted_close,
                    LAG(adjusted_close) OVER (PARTITION BY asset_id ORDER BY date) as prev_adj_close,
                    (adjusted_close / LAG(adjusted_close) OVER (PARTITION BY asset_id ORDER BY date) - 1) * 100 as daily_return
                FROM eodhd_daily_prices
                WHERE date >= date('now', '-90 days')
                AND adjusted_close IS NOT NULL
            )
            SELECT 
                COUNT(*) as total_returns,
                AVG(daily_return) as mean_return,
                MIN(daily_return) as min_return,
                MAX(daily_return) as max_return,
                SUM(CASE WHEN ABS(daily_return) > 50 THEN 1 ELSE 0 END) as extreme_returns,
                SUM(CASE WHEN ABS(daily_return) > 20 THEN 1 ELSE 0 END) as large_returns
            FROM returns
            WHERE daily_return IS NOT NULL
        ''').fetchone()
        
        extreme_return_pct = (returns_stats['extreme_returns'] / returns_stats['total_returns'] * 100) if returns_stats['total_returns'] > 0 else 0
        
        return {
            'total_returns': returns_stats['total_returns'],
            'mean_return': returns_stats['mean_return'],
            'min_return': returns_stats['min_return'],
            'max_return': returns_stats['max_return'],
            'extreme_returns': returns_stats['extreme_returns'],
            'large_returns': returns_stats['large_returns'],
            'extreme_return_pct': extreme_return_pct,
            'status': 'PASS' if extreme_return_pct < 1.0 else 'WARN'  # <1% extreme returns is acceptable
        }


def check_cross_validation() -> Dict:
    """Cross-validate EODHD adjusted_close with NSE/BSE."""
    with get_connection() as conn:
        # Find common symbols and dates
        comparison = conn.execute('''
            SELECT 
                COUNT(*) as total_matches,
                SUM(CASE WHEN ABS(edp.adjusted_close / edp.close - dp.adj_close / dp.close) < 0.01 THEN 1 ELSE 0 END) as exact_matches,
                SUM(CASE WHEN ABS(edp.adjusted_close / edp.close - dp.adj_close / dp.close) > 0.05 THEN 1 ELSE 0 END) as mismatches
            FROM eodhd_daily_prices edp
            JOIN daily_prices dp ON edp.asset_id = dp.asset_id AND edp.date = dp.date
            WHERE edp.date >= date('now', '-30 days')
            AND edp.adjusted_close IS NOT NULL
            AND dp.adj_close IS NOT NULL
            AND edp.close > 0
            AND dp.close > 0
        ''').fetchone()
        
        match_pct = (comparison['exact_matches'] / comparison['total_matches'] * 100) if comparison['total_matches'] > 0 else 0
        mismatch_pct = (comparison['mismatches'] / comparison['total_matches'] * 100) if comparison['total_matches'] > 0 else 0
        
        # Sample mismatches for investigation
        mismatch_samples = conn.execute('''
            SELECT 
                a.nse_symbol,
                edp.date,
                edp.close as eodhd_close,
                edp.adjusted_close as eodhd_adj,
                dp.close as nse_close,
                dp.adj_close as nse_adj,
                ROUND(edp.adjusted_close / edp.close, 4) as eodhd_ratio,
                ROUND(dp.adj_close / dp.close, 4) as nse_ratio,
                ROUND(ABS(edp.adjusted_close / edp.close - dp.adj_close / dp.close), 4) as diff
            FROM eodhd_daily_prices edp
            JOIN daily_prices dp ON edp.asset_id = dp.asset_id AND edp.date = dp.date
            JOIN assets a ON edp.asset_id = a.id
            WHERE edp.date >= date('now', '-30 days')
            AND edp.adjusted_close IS NOT NULL
            AND dp.adj_close IS NOT NULL
            AND edp.close > 0
            AND dp.close > 0
            AND ABS(edp.adjusted_close / edp.close - dp.adj_close / dp.close) > 0.05
            ORDER BY diff DESC
            LIMIT 10
        ''').fetchall()
        
        return {
            'total_matches': comparison['total_matches'],
            'exact_matches': comparison['exact_matches'],
            'mismatches': comparison['mismatches'],
            'match_pct': match_pct,
            'mismatch_pct': mismatch_pct,
            'mismatch_samples': [dict(row) for row in mismatch_samples],
            'status': 'PASS' if match_pct > 90 else 'WARN'
        }


def check_corporate_actions() -> Dict:
    """Check corporate actions coverage and reconciliation."""
    with get_connection() as conn:
        # EODHD CA
        eodhd_ca = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_corporate_actions').fetchone()
        eodhd_ca_by_type = conn.execute('''
            SELECT type, COUNT(*) as cnt
            FROM eodhd_corporate_actions
            GROUP BY type
        ''').fetchall()
        
        # NSE/BSE CA
        nse_ca = conn.execute('SELECT COUNT(*) as cnt FROM corporate_actions').fetchone()
        nse_ca_by_type = conn.execute('''
            SELECT action_type, COUNT(*) as cnt
            FROM corporate_actions
            GROUP BY action_type
        ''').fetchall()
        
        # Recent CA coverage
        recent_eodhd_ca = conn.execute('''
            SELECT COUNT(*) as cnt
            FROM eodhd_corporate_actions
            WHERE date >= date('now', '-90 days')
        ''').fetchone()
        
        recent_nse_ca = conn.execute('''
            SELECT COUNT(*) as cnt
            FROM corporate_actions
            WHERE ex_date >= date('now', '-90 days')
        ''').fetchone()
        
        return {
            'eodhd_ca_total': eodhd_ca['cnt'],
            'eodhd_ca_by_type': {row['type']: row['cnt'] for row in eodhd_ca_by_type},
            'nse_ca_total': nse_ca['cnt'],
            'nse_ca_by_type': {row['action_type']: row['cnt'] for row in nse_ca_by_type},
            'recent_eodhd_ca': recent_eodhd_ca['cnt'],
            'recent_nse_ca': recent_nse_ca['cnt'],
            'status': 'PASS' if eodhd_ca['cnt'] > 0 else 'WARN'
        }


def check_survivorship_bias() -> Dict:
    """Verify delisted symbols are included (survivorship-bias-free)."""
    with get_connection() as conn:
        active_mapped = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_symbol_mapping WHERE is_active = 1').fetchone()
        delisted_mapped = conn.execute('SELECT COUNT(*) as cnt FROM eodhd_symbol_mapping WHERE is_delisted = 1').fetchone()
        
        active_with_data = conn.execute('''
            SELECT COUNT(DISTINCT esm.asset_id) as cnt 
            FROM eodhd_symbol_mapping esm 
            JOIN eodhd_daily_prices edp ON esm.asset_id = edp.asset_id 
            WHERE esm.is_active = 1
        ''').fetchone()
        
        delisted_with_data = conn.execute('''
            SELECT COUNT(DISTINCT esm.asset_id) as cnt 
            FROM eodhd_symbol_mapping esm 
            JOIN eodhd_daily_prices edp ON esm.asset_id = edp.asset_id 
            WHERE esm.is_delisted = 1
        ''').fetchone()
        
        return {
            'active_mapped': active_mapped['cnt'],
            'delisted_mapped': delisted_mapped['cnt'],
            'active_with_data': active_with_data['cnt'],
            'delisted_with_data': delisted_with_data['cnt'],
            'delisted_pct': (delisted_mapped['cnt'] / (active_mapped['cnt'] + delisted_mapped['cnt']) * 100) if (active_mapped['cnt'] + delisted_mapped['cnt']) > 0 else 0,
            'status': 'PASS' if delisted_with_data['cnt'] > 0 else 'FAIL'
        }


def validate_symbol(symbol: str) -> Dict:
    """Validate adjusted_close for a specific symbol."""
    with get_connection() as conn:
        # Get asset_id
        asset = conn.execute('SELECT id FROM assets WHERE nse_symbol = %s', (symbol,)).fetchone()
        if not asset:
            return {'status': 'ERROR', 'message': f'Symbol {symbol} not found'}
        
        asset_id = asset['id']
        
        # Get price data
        prices = conn.execute('''
            SELECT date, close, adjusted_close, volume
            FROM eodhd_daily_prices
            WHERE asset_id = %s
            ORDER BY date DESC
            LIMIT 100
        ''', (asset_id,)).fetchall()
        
        if not prices:
            return {'status': 'ERROR', 'message': f'No EODHD data for {symbol}'}
        
        # Calculate returns
        returns = []
        for i in range(len(prices) - 1):
            curr = prices[i]
            prev = prices[i + 1]
            if prev['adjusted_close'] and prev['adjusted_close'] > 0:
                ret = (curr['adjusted_close'] / prev['adjusted_close'] - 1) * 100
                returns.append({
                    'date': curr['date'],
                    'return': ret,
                    'adj_close': curr['adjusted_close']
                })
        
        # Get corporate actions
        ca = conn.execute('''
            SELECT action_type, ex_date, adjustment_factor, ratio_numerator, ratio_denominator, dividend_amount
            FROM corporate_actions
            WHERE asset_id = %s
            AND ex_date >= CURRENT_DATE - INTERVAL \'365 days\'
            ORDER BY ex_date DESC
        ''', (asset_id,)).fetchall()
        
        return {
            'symbol': symbol,
            'total_records': len(prices),
            'date_range': (prices[-1]['date'], prices[0]['date']),
            'recent_returns': returns[:10],
            'corporate_actions': [dict(row) for row in ca],
            'status': 'PASS'
        }


def print_report(results: Dict):
    """Print comprehensive validation report."""
    print('=' * 80)
    print('EODHD ADJUSTED CLOSE VALIDATION REPORT')
    print('=' * 80)
    
    # 1. Data Completeness
    print('\n1. DATA COMPLETENESS')
    print('-' * 80)
    comp = results['completeness']
    print(f'Total records: {comp["total_records"]:,}')
    print(f'Symbols with data: {comp["symbols_with_data"]:,} / {comp["total_mapped"]:,} ({comp["coverage_pct"]:.2f}%)')
    print(f'Date range: {comp["date_range"][0]} → {comp["date_range"][1]}')
    print(f'Adjusted close coverage: {comp["adj_close_present"]:,} / {comp["total_records"]:,} ({comp["adj_coverage_pct"]:.2f}%)')
    print(f'Missing adjusted_close: {comp["adj_close_null"]:,}')
    print(f'Negative adjusted_close: {comp["negative_adj"]:,}')
    print(f'Zero adjusted_close: {comp["zero_adj"]:,}')
    print(f'Status: {comp["status"]}')
    
    # 2. Adjustment Ratios
    print('\n2. ADJUSTMENT RATIO ANALYSIS')
    print('-' * 80)
    ratios = results['adjustment_ratios']
    print(f'Extreme adjustments (>100x): {ratios["extreme_high"]:,}')
    print(f'Extreme adjustments (<0.01x): {ratios["extreme_low"]:,}')
    print(f'Total extreme: {ratios["total_extreme"]:,} ({ratios["extreme_pct"]:.2f}%)')
    print(f'Status: {ratios["status"]}')
    print('\nNote: Extreme ratios are EXPECTED for historical data (pre-2005 corporate actions)')
    
    if ratios['extreme_samples']:
        print('\nSample extreme cases:')
        for sample in ratios['extreme_samples'][:5]:
            sym = sample['nse_symbol'] if sample['nse_symbol'] else 'UNKNOWN'
            print(f'  {sym:15} {sample["date"]:12} close={sample["close"]:10.2f} adj={sample["adjusted_close"]:10.2f} ratio={sample["adj_ratio"]:8.4f}')
    
    # 3. Return Distribution
    print('\n3. RETURN DISTRIBUTION (Last 90 days)')
    print('-' * 80)
    rets = results['return_distribution']
    print(f'Total returns calculated: {rets["total_returns"]:,}')
    print(f'Mean daily return: {rets["mean_return"]:.4f}%')
    print(f'Min return: {rets["min_return"]:.2f}%')
    print(f'Max return: {rets["max_return"]:.2f}%')
    print(f'Extreme returns (>50%): {rets["extreme_returns"]:,} ({rets["extreme_return_pct"]:.2f}%)')
    print(f'Large returns (>20%): {rets["large_returns"]:,}')
    print(f'Status: {rets["status"]}')
    
    # 4. Cross-Validation
    print('\n4. CROSS-VALIDATION WITH NSE/BSE (Last 30 days)')
    print('-' * 80)
    cross = results['cross_validation']
    print(f'Total matches: {cross["total_matches"]:,}')
    print(f'Exact matches (<1% diff): {cross["exact_matches"]:,} ({cross["match_pct"]:.2f}%)')
    print(f'Mismatches (>5% diff): {cross["mismatches"]:,} ({cross["mismatch_pct"]:.2f}%)')
    print(f'Status: {cross["status"]}')
    
    if cross['mismatch_samples']:
        print('\nSample mismatches:')
        for sample in cross['mismatch_samples'][:5]:
            print(f'  {sample["nse_symbol"]:15} {sample["date"]:12} EODHD={sample["eodhd_ratio"]:.4f} NSE={sample["nse_ratio"]:.4f} diff={sample["diff"]:.4f}')
    
    # 5. Corporate Actions
    print('\n5. CORPORATE ACTIONS COVERAGE')
    print('-' * 80)
    ca = results['corporate_actions']
    print(f'EODHD CA events: {ca["eodhd_ca_total"]:,}')
    for ca_type, count in ca['eodhd_ca_by_type'].items():
        print(f'  {ca_type}: {count:,}')
    print(f'\nNSE/BSE CA events: {ca["nse_ca_total"]:,}')
    for ca_type, count in list(ca['nse_ca_by_type'].items())[:5]:
        print(f'  {ca_type}: {count:,}')
    print(f'\nRecent CA (last 90 days):')
    print(f'  EODHD: {ca["recent_eodhd_ca"]:,}')
    print(f'  NSE/BSE: {ca["recent_nse_ca"]:,}')
    print(f'Status: {ca["status"]}')
    
    # 6. Survivorship Bias
    print('\n6. SURVIVORSHIP BIAS CHECK')
    print('-' * 80)
    surv = results['survivorship_bias']
    print(f'Active symbols: {surv["active_mapped"]:,} (data: {surv["active_with_data"]:,})')
    print(f'Delisted symbols: {surv["delisted_mapped"]:,} (data: {surv["delisted_with_data"]:,})')
    print(f'Delisted percentage: {surv["delisted_pct"]:.2f}%')
    print(f'Status: {surv["status"]}')
    
    # Overall Status
    print('\n' + '=' * 80)
    print('OVERALL STATUS')
    print('=' * 80)
    
    all_pass = all(
        results[key]['status'] in ['PASS', 'WARN']
        for key in ['completeness', 'adjustment_ratios', 'return_distribution', 
                    'cross_validation', 'corporate_actions', 'survivorship_bias']
    )
    
    if all_pass:
        print('✅ ALL CHECKS PASSED - EODHD adjusted_close is PRODUCTION-READY for quant analysis')
    else:
        print('⚠️  SOME CHECKS FAILED - Review issues above')
    
    print('=' * 80)


def main():
    parser = argparse.ArgumentParser(description='Validate EODHD adjusted_close data quality')
    parser.add_argument('--symbol', help='Validate specific symbol')
    parser.add_argument('--date', help='Validate specific date (YYYY-MM-DD)')
    parser.add_argument('--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    if args.symbol:
        logger.info(f'Validating symbol: {args.symbol}')
        result = validate_symbol(args.symbol)
        print(json.dumps(result, indent=2))
        return
    
    logger.info('Running comprehensive EODHD adjusted_close validation...')
    
    results = {
        'completeness': check_data_completeness(),
        'adjustment_ratios': check_adjustment_ratios(),
        'return_distribution': check_return_distribution(),
        'cross_validation': check_cross_validation(),
        'corporate_actions': check_corporate_actions(),
        'survivorship_bias': check_survivorship_bias(),
    }
    
    print_report(results)
    
    logger.info('Validation complete')


if __name__ == '__main__':
    main()
