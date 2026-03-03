import csv
import sys
import os
from collections import Counter

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.bse_corporate_actions_parser import (
    classify_bse_action, parse_bse_split_ratio, parse_bse_bonus_ratio, 
    parse_bse_dividend_amount, parse_bse_row
)

try:
    with open('data-pipeline/raw_data/BSE_CORP_ACTIONS/2024/01/bse_corp_actions_2024-01-01_2024-06-30.csv', 'r') as f:
        reader = csv.DictReader(f)
        data = [row for row in reader if row.get('Security Code')]
except Exception as e:
    print(e)
    sys.exit(1)

stats = Counter()
anomalies = []

for raw in data:
    parsed = parse_bse_row(raw)
    bse_code = parsed["bse_code"]
    symbol = parsed["symbol"]
    purpose = parsed["purpose"]
    
    if not bse_code or not purpose:
        continue
        
    action_type = classify_bse_action(purpose)
    stats[action_type] += 1
    
    if action_type == "UNKNOWN":
        anomalies.append(f"UNKNOWN: {symbol} - {purpose}")
    
    elif action_type == "SPLIT":
        num, den = parse_bse_split_ratio(purpose)
        if num == 0.0 or den == 0.0:
            anomalies.append(f"SPLIT FAIL: {symbol} - {purpose} (parsed: {num}:{den})")
            
    elif action_type == "BONUS":
        num, den = parse_bse_bonus_ratio(purpose)
        if num == 0.0 or den == 0.0:
            anomalies.append(f"BONUS FAIL: {symbol} - {purpose} (parsed: {num}:{den})")
            
    # Rights ratio is not parsed in BSE yet, check dividend
    elif action_type == "DIVIDEND" or action_type == "DIVIDEND_AND_BONUS":
        amt = parse_bse_dividend_amount(purpose)
        if amt == 0.0:
            anomalies.append(f"DIVIDEND ZERO: {symbol} - {purpose}")

print("--- Stats ---")
for k, v in stats.most_common():
    print(f"{k}: {v}")

print("\n--- Anomalies ---")
for a in anomalies:
    print(a)
