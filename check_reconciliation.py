from datetime import date
import logging
import sys
import os

sys.path.insert(0, os.path.join(os.getcwd(), 'data-pipeline'))

from pipelines.nse_bse_reconciler import reconcile_nse_bse_corporate_actions
from utils.db import get_db

logging.basicConfig(level=logging.INFO)

with get_db() as conn:
    count = conn.execute("SELECT COUNT(*) FROM corporate_actions").fetchone()[0]
    print(f"Total corporate actions in DB: {count}")

# Run for 2023
from_date = date(2023, 1, 1)
to_date = date(2023, 12, 31)

print(f"Running reconciliation from {from_date} to {to_date}...")
discrepancies = reconcile_nse_bse_corporate_actions(from_date, to_date)

if not discrepancies:
    print("No discrepancies found!")
else:
    print(f"Found {len(discrepancies)} discrepancies:")
    types = {}
    for d in discrepancies:
        types[d['type']] = types.get(d['type'], 0) + 1
    
    for t, count in types.items():
        print(f"  {t}: {count}")
    
    print("\nSample discrepancies:")
    for d in discrepancies[:10]:
        print(f"[{d['type']}] {d['message']}")

    critical = [d for d in discrepancies if d['type'] in ("AMOUNT_MISMATCH", "FACTOR_MISMATCH")]
    if critical:
        print(f"\nSample Critical Discrepancies ({len(critical)} total):")
        for d in critical[:20]:
            print(f"[{d['type']}] {d['message']}")
