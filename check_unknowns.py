import csv
import glob
import sys
import os

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))
from pipelines.bse_corporate_actions_parser import classify_bse_action

bse_dir = 'data-pipeline/raw_data/BSE_CORP_ACTIONS/2023/**/*.csv'
files = glob.glob(bse_dir, recursive=True)

unknowns = set()
all_purposes = set()

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            purpose = row.get('Purpose', '').strip()
            if not purpose: continue
            all_purposes.add(purpose)
            action_type = classify_bse_action(purpose)
            if action_type == "UNKNOWN":
                unknowns.add(purpose)

print(f"Total unique purposes: {len(all_purposes)}")
print(f"Total unknown purposes: {len(unknowns)}")
print("\n=== UNKNOWN PURPOSES ===")
for p in sorted(list(unknowns)):
    print(p)
