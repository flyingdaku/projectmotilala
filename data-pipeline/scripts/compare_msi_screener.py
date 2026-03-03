import sqlite3
import pandas as pd
import json

db_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db"
symbols = ['TAKE', 'VINATIORGA', 'OFSS', 'IGPL', 'MIDWESTLTD', 'GPPL', 'RELTD', 'NIBL', 'JYOTISTRUC', 'SVLL', 'DATAMATICS', 'TOTAL', 'VINCOFE', 'VISASTEEL', 'MUFTI', 'VIKRAMSOLR', 'JSWSTEEL', 'RPGLIFE', 'CONCOR', 'MCLEODRUSS']

conn = sqlite3.connect(db_path)

query = f"""
WITH 
    assets_cte AS (
        SELECT id, nse_symbol FROM assets WHERE nse_symbol IN ({','.join(['?']*len(symbols))})
    ),
    msi_inc AS (
        SELECT asset_id, period_end_date, revenue_ops, net_profit, basic_eps
        FROM msi_fundamentals_annual
        WHERE period_end_date = 'Mar-24'
    ),
    msi_bs AS (
        SELECT asset_id, period_end_date, total_assets
        FROM msi_balance_sheets
        WHERE period_end_date = 'Mar-24'
    ),
    msi_cf AS (
        SELECT asset_id, period_end_date, net_cash_operating
        FROM msi_cash_flows
        WHERE period_end_date = 'Mar-24'
    ),
    scr_inc AS (
        SELECT symbol, period_end_date, sales, net_profit as scr_net_profit, eps_in_rs as scr_eps
        FROM screener_quarterly
        WHERE period_type = 'annual' AND period_end_date LIKE '%2024%'
    )
SELECT 
    a.nse_symbol, 
    m_inc.revenue_ops as msi_rev, 
    s_inc.sales as scr_rev,
    m_inc.net_profit as msi_pat, 
    s_inc.scr_net_profit as scr_pat,
    m_inc.basic_eps as msi_eps, 
    s_inc.scr_eps as scr_eps,
    m_bs.total_assets as msi_assets,
    m_cf.net_cash_operating as msi_cfo
FROM assets_cte a
LEFT JOIN msi_inc m_inc ON a.id = m_inc.asset_id
LEFT JOIN scr_inc s_inc ON a.nse_symbol = s_inc.symbol
LEFT JOIN msi_bs m_bs ON a.id = m_bs.asset_id
LEFT JOIN msi_cf m_cf ON a.id = m_cf.asset_id
"""

df = pd.read_sql_query(query, conn, params=symbols)
conn.close()

# Deduplicate
df = df.drop_duplicates(subset=['nse_symbol'])

# Compute percentage differences
def pct_diff(val1, val2):
    if pd.isna(val1) or pd.isna(val2) or val2 == 0:
        if val1 == val2:
             return 0.0
        return None
    return abs(val1 - val2) / abs(val2) * 100

df['rev_diff_pct'] = df.apply(lambda row: pct_diff(row['msi_rev'], row['scr_rev']), axis=1)
df['pat_diff_pct'] = df.apply(lambda row: pct_diff(row['msi_pat'], row['scr_pat']), axis=1)
df['eps_diff_pct'] = df.apply(lambda row: pct_diff(row['msi_eps'], row['scr_eps']), axis=1)

pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.float_format', lambda x: '%.2f' % x)

print("DATA COMPARISON TABLE (Mar-2024 Annual)\n")
print(df[['nse_symbol', 'msi_rev', 'scr_rev', 'rev_diff_pct', 'msi_pat', 'scr_pat', 'pat_diff_pct', 'msi_eps', 'scr_eps', 'eps_diff_pct']].to_markdown(index=False))

# Calculate some stats
print("\n--- Summary ---")
valid_rows = df.dropna(subset=['msi_pat', 'scr_pat'])
print("Total Symbols Compared:", len(df))
print("Valid Comparables:", len(valid_rows))

def safe_count(series):
     return len(series.dropna()[series.dropna() < 5.0])

print("Symbols with exact Rev Match (< 5% diff):", safe_count(df['rev_diff_pct']))
print("Symbols with exact PAT Match (< 5% diff):", safe_count(df['pat_diff_pct']))
print("Symbols with exact EPS Match (< 5% diff):", safe_count(df['eps_diff_pct']))

