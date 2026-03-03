import sys
from datetime import date, timedelta
import sqlite3
import pandas as pd
import json

def report():    
    conn = sqlite3.connect('db/market_data.db')
    df3 = pd.read_sql("SELECT a.nse_symbol, c.ex_date, c.action_type, c.dividend_amount, c.ratio_numerator, c.ratio_denominator, c.adjustment_factor, c.source_exchange, c.raw_announcement FROM corporate_actions c JOIN assets a ON c.asset_id = a.id WHERE c.ex_date >= '2024-01-01' AND c.action_type IN ('DIVIDEND') ORDER BY c.ex_date LIMIT 20", conn)
    print("\nSample Dividends (Jan-Jun 2024):")
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    print(df3)

if __name__ == '__main__':
    report()
