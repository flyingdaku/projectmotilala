import os
import json
import subprocess

# Rerun for failed indices
with open('bse_indices_list.json', 'r') as f:
    indices = json.load(f)

# Find which ones have no data
import sqlite3
db = os.environ.get('DB_PATH', 'db/market_data.db')
con = sqlite3.connect(db)
con.row_factory = sqlite3.Row

missing = []
for idx in indices:
    name = idx['name']
    if not name.startswith("BSE "):
        if name in ["MIDCAP", "SMLCAP", "ALLCAP", "LRGCAP"]:
            name = "BSE " + name
            
    res = con.execute('''
        SELECT COUNT(*) as cnt FROM daily_prices dp
        JOIN assets a ON a.id = dp.asset_id
        WHERE a.name = ? AND a.asset_class = 'INDEX'
    ''', (name,)).fetchone()
    
    if res['cnt'] == 0:
        missing.append(idx)

print(f"Missing {len(missing)} indices to retry")

# Write temporary json and retry
with open('bse_indices_retry.json', 'w') as f:
    json.dump(missing, f)

