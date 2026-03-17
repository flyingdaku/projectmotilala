import sqlite3
import os

db_path = '/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db'
print(f'Opening DB at {db_path}')

try:
    conn = sqlite3.connect(db_path, timeout=60.0)
    print('Connected successfully')
    
    conn.execute('''
    CREATE TABLE IF NOT EXISTS computed_ratios (
        asset_id TEXT PRIMARY KEY,
        market_cap_cr REAL, pe_ttm REAL, pb REAL, ev_ebitda REAL, dividend_yield REAL,
        roce REAL, roe REAL, pat_margin REAL, operating_margin REAL,
        revenue_growth_1y REAL, pat_growth_1y REAL, eps_growth_1y REAL,
        debt_equity REAL, quality_score REAL, revenue_growth_3y REAL,
        interest_coverage REAL, current_ratio REAL
    );
    ''')
    print('Table computed_ratios created/verified')
    
    conn.execute('''
    CREATE TABLE IF NOT EXISTS technical_indicators (
        asset_id TEXT, computed_date DATE,
        close REAL, change_1d_pct REAL, rsi_14 REAL,
        pct_from_52w_high REAL, pct_from_52w_low REAL,
        sma_50 REAL, sma_200 REAL, volume REAL, lag1_close REAL,
        PRIMARY KEY (asset_id, computed_date)
    );
    ''')
    print('Table technical_indicators created/verified')
    
    conn.execute('''
    INSERT OR IGNORE INTO computed_ratios (asset_id, market_cap_cr, pe_ttm, pb, roce, roe)
    SELECT id, 50000.0, 20.0, 3.0, 15.0, 15.0 FROM assets WHERE asset_class = 'EQUITY';
    ''')
    
    conn.execute('''
    INSERT OR IGNORE INTO technical_indicators (asset_id, computed_date, close, change_1d_pct, rsi_14, sma_50, sma_200)
    SELECT id, date('now'), 1000.0, 1.5, 55.0, 950.0, 900.0 FROM assets WHERE asset_class = 'EQUITY';
    ''')
    
    conn.commit()
    print('Data inserted successfully')
    conn.close()
    print('Done!')
except Exception as e:
    print(f'Error: {e}')
