import sqlite3
import pandas as pd

db_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db"
symbols = ['TAKE', 'VINATIORGA', 'OFSS', 'IGPL', 'MIDWESTLTD', 'GPPL', 'RELTD', 'NIBL', 'JYOTISTRUC', 'SVLL', 'DATAMATICS', 'TOTAL', 'VINCOFE', 'VISASTEEL', 'MUFTI', 'VIKRAMSOLR', 'JSWSTEEL', 'RPGLIFE', 'CONCOR', 'MCLEODRUSS']

conn = sqlite3.connect(db_path)

query = f"""
WITH 
    assets_cte AS (
        SELECT id, nse_symbol, bse_code FROM assets WHERE nse_symbol IN ({','.join(['?']*len(symbols))})
    ),
    msi_inc AS (
        SELECT asset_id, period_end_date, revenue_ops, net_profit, basic_eps
        FROM msi_fundamentals_annual
        WHERE period_end_date = 'Mar-24'
    ),
    scr_inc AS (
        SELECT symbol, period_end_date, sales, net_profit as scr_net_profit, eps_in_rs as scr_eps
        FROM screener_quarterly
        WHERE period_type = 'annual' AND period_end_date LIKE '%2024%'
    ),
    nse_inc AS (
        -- aggregate the quarterly NSE data into an annual representation
        SELECT asset_id, 
               SUM(revenue) as fund_rev, 
               SUM(pat) as fund_pat,
               SUM(eps) as fund_eps
        FROM fundamentals
        WHERE period_end_date BETWEEN '2023-04-01' AND '2024-03-31'
          AND is_consolidated = 1
        GROUP BY asset_id
    )
SELECT 
    a.nse_symbol, 
    m_inc.revenue_ops as msi_rev, 
    s_inc.sales as scr_rev,
    n_inc.fund_rev as fund_rev,
    m_inc.net_profit as msi_pat, 
    s_inc.scr_net_profit as scr_pat,
    n_inc.fund_pat as fund_pat,
    m_inc.basic_eps as msi_eps, 
    s_inc.scr_eps as scr_eps,
    n_inc.fund_eps as fund_eps
FROM assets_cte a
LEFT JOIN msi_inc m_inc ON a.id = m_inc.asset_id
LEFT JOIN scr_inc s_inc ON a.nse_symbol = s_inc.symbol
LEFT JOIN nse_inc n_inc ON a.id = n_inc.asset_id
"""

df = pd.read_sql_query(query, conn, params=symbols)
conn.close()

# Deduplicate
df = df.drop_duplicates(subset=['nse_symbol'])
# Drop completely null rows
df = df.dropna(subset=['msi_pat', 'scr_pat', 'fund_pat'], how='all')

pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.float_format', lambda x: '%.2f' % x)

print("DATA COMPARISON TABLE (Mar-2024 Annual) - MSI vs Screener vs Official NSE/BSE Aggregate")
print(df[['nse_symbol', 'msi_pat', 'scr_pat', 'fund_pat', 'msi_rev', 'scr_rev', 'fund_rev', 'msi_eps', 'scr_eps']].to_markdown(index=False))

