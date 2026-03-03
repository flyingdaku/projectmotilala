import csv
import sys
import os
import glob
import random

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.bse_corporate_actions_parser import (
    classify_bse_action, parse_bse_row, parse_bse_split_ratio,
    parse_bse_bonus_ratio, parse_bse_dividend_amount
)

bse_dir = 'data-pipeline/raw_data/BSE_CORP_ACTIONS/2023/**/*.csv'
files = glob.glob(bse_dir, recursive=True)

splits = []
bonuses = []
dividends = []
rights = []

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if not row.get('Security Code'): continue
                
                parsed = parse_bse_row(row)
                purpose = parsed["purpose"]
                action_type = classify_bse_action(purpose)
                
                if action_type == "SPLIT":
                    num, den = parse_bse_split_ratio(purpose)
                    splits.append((parsed['symbol'], purpose, f"{num}:{den}"))
                elif action_type == "BONUS":
                    num, den = parse_bse_bonus_ratio(purpose)
                    bonuses.append((parsed['symbol'], purpose, f"{num}:{den}"))
                elif action_type == "DIVIDEND" or action_type == "DIVIDEND_AND_BONUS":
                    amt = parse_bse_dividend_amount(purpose)
                    dividends.append((parsed['symbol'], purpose, f"Rs {amt}"))
                elif action_type == "RIGHTS":
                    rights.append((parsed['symbol'], purpose))
    except Exception as e:
        print(f"Error reading {file}: {e}")

print("=== ALL SPLITS ===")
for s in splits:
    print(f"{s[0]:<15} | {s[1]:<50} | Parsed: {s[2]}")

print("\n=== ALL BONUSES ===")
for b in bonuses:
    print(f"{b[0]:<15} | {b[1]:<50} | Parsed: {b[2]}")
    
print("\n=== 20 RANDOM DIVIDENDS ===")
for d in random.sample(dividends, min(20, len(dividends))):
    print(f"{d[0]:<15} | {d[1]:<50} | Parsed: {d[2]}")

print("\n=== BAD DIVIDENDS (Rs 0.0) ===")
for d in dividends:
    if d[2] == "Rs 0.0":
         print(f"{d[0]:<15} | {d[1]:<50} | Parsed: {d[2]}")

print("\n=== ALL RIGHTS ===")
for r in rights:
    print(f"{r[0]:<15} | {r[1]:<70}")
