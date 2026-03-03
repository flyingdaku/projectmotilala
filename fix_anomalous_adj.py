from pipelines.adjust_prices import compute_adj_close_for_single_asset
import sqlite3
from utils.db import get_db

with get_db() as conn:
    anomalies = conn.execute("""
        SELECT DISTINCT a.isin 
        FROM daily_prices dp 
        JOIN assets a ON dp.asset_id=a.id 
        WHERE dp.adj_close > dp.close * 20 OR dp.adj_close < dp.close * 0.05
        LIMIT 100
    """).fetchall()
    
    isin_list = [r["isin"] for r in anomalies]
    
    print(f"Fixing adjustment for {len(isin_list)} anomalous assets...")
    for isin in isin_list:
        try:
            compute_adj_close_for_single_asset(isin)
        except Exception as e:
            print(f"Failed to fix {isin}: {e}")
