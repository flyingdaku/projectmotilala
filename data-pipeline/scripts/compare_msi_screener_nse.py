import sqlite3
import pandas as pd

db_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db"
symbols = ['TAKE', 'VINATIORGA', 'OFSS', 'IGPL', 'MIDWESTLTD', 'GPPL', 'RELTD', 'NIBL', 'JYOTISTRUC', 'SVLL', 'DATAMATICS', 'TOTAL', 'VINCOFE', 'VISASTEEL', 'MUFTI', 'VIKRAMSOLR', 'JSWSTEEL', 'RPGLIFE', 'CONCOR', 'MCLEODRUSS']

conn = sqlite3.connect(db_path)

query = f"""
WITH 
    -- Because some assets have multiple rows (one with NSE+BSE, one with just NSE), we need a distinct map.
    -- Or better yet, we join ON nse_symbol directly to avoid duplicate mapping issues.
    assets_cte AS (
        SELECT DISTINCT nse_symbol FROM assets WHERE nse_symbol IN ({','.join(['?']*len(symbols))}) AND nse_symbol != ''
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
    nse_inc AS (
        -- aggregate the quarterly NSE data into an annual representation
        SELECT a.nse_symbol, 
               SUM(n.income_from_operations) as nse_rev_lakhs, 
               SUM(n.net_profit) as nse_pat_lakhs,
               SUM(n.eps_basic) as nse_eps
        FROM nse_fundamentals n
        JOIN assets a ON n.asset_id = a.id
        WHERE n.period_end_date IN ('2023-06-30', '2023-09-30', '2023-12-31', '2024-03-31')
          AND n.is_consolidated = 1
        GROUP BY a.nse_symbol
    )
SELECT 
    a.nse_symbol, 
    m_inc.revenue_ops as msi_rev, 
    s_inc.sales as scr_rev,
    ROUND(n_inc.nse_rev_lakhs / 100, 2) as nse_rev, 
    m_inc.net_profit as msi_pat, 
    s_inc.scr_net_profit as scr_pat,
    ROUND(n_inc.nse_pat_lakhs / 100, 2) as nse_pat, 
    m_inc.basic_eps as msi_eps, 
    s_inc.scr_eps as scr_eps,
    ROUND(n_inc.nse_eps, 2) as nse_eps
FROM assets_cte a
LEFT JOIN msi_inc m_inc ON a.nse_symbol = m_inc.nse_symbol
LEFT JOIN scr_inc s_inc ON a.nse_symbol = s_inc.nse_symbol
LEFT JOIN nse_inc n_inc ON a.nse_symbol = n_inc.nse_symbol
"""

df = pd.read_sql_query(query, conn, params=symbols)
conn.close()

# Deduplicate
df = df.drop_duplicates(subset=['nse_symbol'])
# Drop completely null rows
df = df.dropna(subset=['msi_pat', 'scr_pat', 'nse_pat'], how='all')

pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.float_format', lambda x: '%.2f' % x)

print("DATA COMPARISON TABLE (Mar-2024 Annual) - MSI vs Screener vs Official NSE (Aggregated from Quarters)")
print("Note: NSE data is aggregated from quarterly results and converted from Lakhs to Crores.\n")
print(df[['nse_symbol', 'msi_pat', 'scr_pat', 'nse_pat', 'msi_rev', 'scr_rev', 'nse_rev', 'msi_eps', 'scr_eps', 'nse_eps']].to_markdown(index=False))

