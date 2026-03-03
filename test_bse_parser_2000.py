import csv
import io
import sys
import os

# Add data-pipeline to path for imports
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))

from pipelines.bse_corporate_actions_parser import (
    classify_bse_action,
    parse_bse_dividend_amount,
    parse_bse_bonus_ratio,
    parse_bse_split_ratio
)

csv_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/BSE_CORP_ACTIONS/2000/01/bse_corp_actions_2000-01-01_2000-12-31.csv"

def test_on_file():
    print(f"{'Scrip':<8} | {'Type':<15} | {'Details':<20} | {'Purpose'}")
    print("-" * 100)
    
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            p = row["Purpose"].strip()
            scrip = row["Security Code"].strip()
            
            action_type = classify_bse_action(p)
            
            details = ""
            if action_type == "DIVIDEND":
                amt = parse_bse_dividend_amount(p)
                details = f"Amt: {amt}"
            elif action_type == "BONUS":
                num, den = parse_bse_bonus_ratio(p)
                details = f"Ratio: {num}:{den}"
            elif action_type == "SPLIT":
                num, den = parse_bse_split_ratio(p)
                details = f"Ratio: {num}:{den}"
            
            if action_type == "UNKNOWN":
                print(f"\033[91m{scrip:<8} | {action_type:<15} | {details:<20} | {p}\033[0m")
            else:
                print(f"{scrip:<8} | {action_type:<15} | {details:<20} | {p}")

if __name__ == "__main__":
    test_on_file()
