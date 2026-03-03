import sqlite3
import pandas as pd
import os
db_path = os.path.join('data-pipeline', 'db', 'market_data.db')
conn = sqlite3.connect(db_path)
print("Pipeline runs for 2024:")
try:
    df = pd.read_sql("SELECT source, COUNT(*) as c, MIN(run_date) as min_d, MAX(run_date) as max_d FROM pipeline_runs WHERE run_date LIKE '2024-%' GROUP BY source", conn)
    print(df)
except Exception as e:
    print(e)
print("\nCorporate Actions in 2024:")
try:
    df2 = pd.read_sql("SELECT action_type, COUNT(*) as count FROM corporate_actions WHERE ex_date LIKE '2024-%' GROUP BY action_type", conn)
    print(df2)
    df3 = pd.read_sql("SELECT a.nse_symbol, c.ex_date, c.action_type, c.dividend_amount, c.ratio_numerator, c.ratio_denominator, c.adjustment_factor, c.source_exchange, c.raw_announcement FROM corporate_actions c JOIN assets a ON c.asset_id = a.id WHERE c.ex_date LIKE '2024-%' AND c.action_type IN ('SPLIT', 'BONUS') ORDER BY c.ex_date LIMIT 20", conn)
    print("\nSample Splits & Bonuses:")
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    print(df3)
except Exception as e:
    print(e)
