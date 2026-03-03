import json
import sys
import os
import glob
import random

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.nse_corporate_actions_parser import (
    classify_action, parse_nse_split_ratio,
    parse_nse_bonus_ratio, parse_dividend_amount, parse_nse_rights_ratio
)

nse_dir = 'data-pipeline/raw_data/NSE_CORP_ACTIONS/2023/**/*.json'
files = glob.glob(nse_dir, recursive=True)

splits = []
bonuses = []
dividends = []
rights = []

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            for raw in data:
                isin = raw.get("isin", "").strip()
                symbol = raw.get("symbol", "").strip()
                purpose = raw.get("subject", raw.get("purpose", "")).strip()
                series = raw.get("series", "EQ").strip()

                if not isin or not purpose:
                    continue
                    
                action_type = classify_action(purpose, series)
                
                if action_type == "SPLIT":
                    num, den = parse_nse_split_ratio(purpose)
                    splits.append((symbol, purpose, f"{num}:{den}"))
                elif action_type == "BONUS":
                    num, den = parse_nse_bonus_ratio(purpose)
                    bonuses.append((symbol, purpose, f"{num}:{den}"))
                elif action_type == "DIVIDEND" or action_type == "DIVIDEND_AND_BONUS":
                    amt = parse_dividend_amount(raw)
                    dividends.append((symbol, purpose, f"Rs {amt}"))
                elif action_type == "RIGHTS":
                    num, den, price = parse_nse_rights_ratio(raw)
                    rights.append((symbol, purpose, f"{num}:{den} @ {price}"))
    except Exception as e:
        print(f"Error reading {file}: {e}")

print("=== ALL SPLITS ===")
for s in splits:
    print(f"{s[0]:<15} | {s[1]:<70} | Parsed: {s[2]}")

print("\n=== ALL BONUSES ===")
for b in bonuses:
    print(f"{b[0]:<15} | {b[1]:<70} | Parsed: {b[2]}")

print("\n=== ALL RIGHTS ===")
for r in rights:
    print(f"{r[0]:<15} | {r[1]:<70} | Parsed: {r[2]}")
    
print("\n=== 20 RANDOM DIVIDENDS ===")
for d in random.sample(dividends, min(20, len(dividends))):
    print(f"{d[0]:<15} | {d[1]:<70} | Parsed: {d[2]}")

print("\n=== BAD DIVIDENDS (Rs 0.0) ===")
for d in dividends:
    if d[2] == "Rs 0.0":
         print(f"{d[0]:<15} | {d[1]:<70} | Parsed: {d[2]}")
