import csv
import sys
import os
import glob
from collections import Counter

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.bse_corporate_actions_parser import classify_bse_action, parse_bse_row

data = []
bse_dir = 'data-pipeline/raw_data/BSE_CORP_ACTIONS/2023/**/*.csv'

files = glob.glob(bse_dir, recursive=True)
if not files:
    print("No CSV files found.")
    sys.exit(1)

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get('Security Code'):
                    data.append(parse_bse_row(row))
    except Exception as e:
        print(f"Error reading {file}: {e}")

stats = Counter()
purposes = Counter()

for parsed in data:
    purpose = parsed["purpose"]
    action_type = classify_bse_action(purpose)
    stats[action_type] += 1
    if action_type == "UNKNOWN":
        purposes[purpose] += 1

print(f"--- Processed {len(data)} total records from {len(files)} files ---")
print("--- Stats ---")
for k, v in stats.most_common():
    print(f"{k}: {v}")

print("\n--- UNKNOWN Purposes ---")
for k, v in purposes.most_common():
    print(f"{v}x : {k}")
