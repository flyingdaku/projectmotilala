import sqlite3
import pandas as pd

db_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db"
symbols = ['TAKE', 'VINATIORGA', 'OFSS', 'IGPL', 'MIDWESTLTD', 'GPPL', 'RELTD', 'NIBL', 'JYOTISTRUC', 'SVLL', 'DATAMATICS', 'TOTAL', 'VINCOFE', 'VISASTEEL', 'MUFTI', 'VIKRAMSOLR', 'JSWSTEEL', 'RPGLIFE', 'CONCOR', 'MCLEODRUSS']

conn = sqlite3.connect(db_path)

query = f"""
WITH 
    assets_cte AS (
        SELECT id, nse_symbol, bse_code FROM assets WHERE nse_symbol IN ({','.join(['?']*len(symbols))}) AND nse_symbol != ''
    ),
    msi_inc AS (
        SELECT a.nse_symbol, m.period_end_date, m.revenue_ops, m.net_profit, m.basic_eps
        FROM msi_fundamentals_annual m
        JOIN assets a ON m.asset_id = a.id
        WHERE m.period_end_date = 'Mar-24'
    ),
    scr_inc AS (
        SELECT symbol as nse_symbol, period_end_date, sales, net_profit as scr_net_profit, eps_in_rs as scr_eps
        FROM screener_quarterly
        WHERE period_type = 'annual' AND period_end_date LIKE '%2024%'
    ),
    fund_inc AS (
        -- aggregate the quarterly official exchange data (MERGED) into an annual representation
        SELECT a.nse_symbol, 
               SUM(f.revenue) as fund_rev, 
               SUM(f.pat) as fund_pat,
               SUM(f.eps) as fund_eps
        FROM fundamentals f
        JOIN assets a ON f.asset_id = a.id
        WHERE f.period_end_date IN ('2023-06-30', '2023-09-30', '2023-12-31', '2024-03-31')
          AND f.is_consolidated = 1
        GROUP BY a.nse_symbol
    )
SELECT 
    a.nse_symbol, 
    m_inc.revenue_ops as msi_rev, 
    s_inc.sales as scr_rev,
    f_inc.fund_rev as exchange_rev, 
    m_inc.net_profit as msi_pat, 
    s_inc.scr_net_profit as scr_pat,
    f_inc.fund_pat as exchange_pat, 
    m_inc.basic_eps as msi_eps, 
    s_inc.scr_eps as scr_eps,
    f_inc.fund_eps as exchange_eps
FROM assets_cte a
LEFT JOIN msi_inc m_inc ON a.nse_symbol = m_inc.nse_symbol
LEFT JOIN scr_inc s_inc ON a.nse_symbol = s_inc.nse_symbol
LEFT JOIN fund_inc f_inc ON a.nse_symbol = f_inc.nse_symbol
"""

df = pd.read_sql_query(query, conn, params=symbols)
conn.close()

# Deduplicate
df = df.drop_duplicates(subset=['nse_symbol'])
# Drop completely null rows
df = df.dropna(subset=['msi_pat', 'scr_pat', 'exchange_pat'], how='all')

# Compute percentage differences against exchange (assuming exchange is truth)
def pct_diff(val, truth):
    if pd.isna(val) or pd.isna(truth) or truth == 0:
        if val == truth:
             return 0.0
        return None
    return abs(val - truth) / abs(truth) * 100

df['msi_pat_err'] = df.apply(lambda row: pct_diff(row['msi_pat'], row['exchange_pat']), axis=1)
df['scr_pat_err'] = df.apply(lambda row: pct_diff(row['scr_pat'], row['exchange_pat']), axis=1)

pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.float_format', lambda x: '%.2f' % x)

print("DATA COMPARISON TABLE (Mar-2024 Annual) - MSI vs Screener vs Official Exchange\n")
print(df[['nse_symbol', 'msi_pat', 'scr_pat', 'exchange_pat', 'msi_pat_err', 'scr_pat_err', 'msi_rev', 'scr_rev', 'exchange_rev', 'msi_eps', 'scr_eps', 'exchange_eps']].to_markdown(index=False))

# Stats
print("\n--- Error Summary vs Exchange Data ---")
valid_msi = df.dropna(subset=['msi_pat_err'])
valid_scr = df.dropna(subset=['scr_pat_err'])

print(f"MSI PAT Exact Matches (< 5% error): {len(valid_msi[valid_msi['msi_pat_err'] < 5.0])} / {len(valid_msi)}")
print(f"Screener PAT Exact Matches (< 5% error): {len(valid_scr[valid_scr['scr_pat_err'] < 5.0])} / {len(valid_scr)}")

