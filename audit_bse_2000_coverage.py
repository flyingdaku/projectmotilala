import csv
import sys
import os
import sqlite3

# Add data-pipeline to path for imports
sys.path.append(os.path.join(os.getcwd(), "data-pipeline"))

from pipelines.bse_corporate_actions_parser import classify_bse_action

csv_path = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/raw_data/BSE_CORP_ACTIONS/2000/01/bse_corp_actions_2000-01-01_2000-12-31.csv"
DB_PATH = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db"

def audit_file_against_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    
    total_actions = 0
    matched_to_asset = 0
    skipped_type = 0
    unknown_type = 0
    
    summary = {
        "matched": [],
        "unmatched": [],
        "skipped_types": []
    }
    
    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            total_actions += 1
            code = row["Security Code"].strip()
            purpose = row["Purpose"].strip()
            ex_date = row["Ex Date"].strip()
            
            # 1. Check Action Type
            action_type = classify_bse_action(purpose)
            if action_type in ("SUSPENSION", "SCHEME_OF_ARRANGEMENT"):
                skipped_type += 1
                summary["skipped_types"].append(f"{code} | {purpose}")
                continue
            
            if action_type == "UNKNOWN":
                unknown_type += 1
                continue
            
            # 2. Check Asset Match
            asset = conn.execute("SELECT id, nse_symbol, name FROM assets WHERE bse_code = ?", (code,)).fetchone()
            if asset:
                matched_to_asset += 1
                summary["matched"].append(f"{code} | {asset['nse_symbol']} | {action_type} | {purpose}")
            else:
                summary["unmatched"].append(f"{code} | {row['Security Name']} | {action_type} | {purpose}")

    print("--- BSE Corporate Actions Audit (Year 2000 File) ---")
    print(f"Total Rows in File:            {total_actions}")
    print(f"Skipped Categories (Meetings): {skipped_type}")
    print(f"Unmatched to Any Asset:        {len(summary['unmatched'])}")
    print(f"Matched and Collectible:       {matched_to_asset}")
    print("\n[Samples of Unmatched Actions - MAJOR ERROR]")
    for s in summary["unmatched"][:20]:
         print(f"  {s}")
         
    # Let's count how many we COULD match if we had the bse_codes
    print("\n[Audit Result]")
    if total_actions > 0:
        coverage = (matched_to_asset / (total_actions - skipped_type)) * 100
        print(f"Effective Coverage: {coverage:.1f}%")

if __name__ == "__main__":
    audit_file_against_db()
