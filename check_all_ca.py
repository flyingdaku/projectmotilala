import json
import sys
import os
from collections import Counter

# Add data-pipeline to path to import pipelines
sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.nse_corporate_actions_parser import (
    classify_action, parse_dividend_amount, parse_ratio, parse_invit_distribution,
    parse_nse_split_ratio, parse_nse_bonus_ratio, parse_nse_rights_ratio,
    parse_invit_total_amount
)

try:
    with open('data-pipeline/raw_data/NSE_CORP_ACTIONS/2024/01/corp_actions_2024-01-01_2024-06-30.json', 'r') as f:
        data = json.load(f)
except Exception as e:
    print(e)
    sys.exit(1)

stats = Counter()
anomalies = []

for raw in data:
    isin = raw.get("isin", "").strip()
    symbol = raw.get("symbol", "").strip()
    purpose = raw.get("subject", raw.get("purpose", "")).strip()
    series = raw.get("series", "EQ").strip()

    if not isin or not purpose:
        continue
        
    action_type = classify_action(purpose, series)
    stats[action_type] += 1
    
    if action_type == "UNKNOWN":
        anomalies.append(f"UNKNOWN: {symbol} - {purpose}")
    
    elif action_type == "SPLIT":
        num, den = parse_nse_split_ratio(purpose)
        if num == 0.0 or den == 0.0:
            anomalies.append(f"SPLIT FAIL: {symbol} - {purpose} (parsed: {num}:{den})")
            
    elif action_type == "BONUS":
        num, den = parse_nse_bonus_ratio(purpose)
        if num == 0.0 or den == 0.0:
            anomalies.append(f"BONUS FAIL: {symbol} - {purpose} (parsed: {num}:{den})")
            
    elif action_type == "RIGHTS":
        num, den, price = parse_nse_rights_ratio(raw)
        if num == 0.0 or den == 0.0 or price == 0.0:
            anomalies.append(f"RIGHTS FAIL: {symbol} - {purpose} (parsed: {num}:{den} @ {price})")
            
    elif action_type == "DIVIDEND":
        amt = parse_dividend_amount(raw)
        if amt == 0.0:
            anomalies.append(f"DIVIDEND ZERO: {symbol} - {purpose}")

print("--- Stats ---")
for k, v in stats.most_common():
    print(f"{k}: {v}")

print("\n--- Anomalies ---")
for a in anomalies:
    print(a)
