import subprocess
import json

with open('bse_indices_retry.json') as f:
    indices = json.load(f)

# The backfill script reads from bse_indices_list.json
# We'll temporarily overwrite it and run with 1 worker to avoid rate limits
import os
os.rename('bse_indices_list.json', 'bse_indices_list.json.bak')

try:
    # Do it in smaller chunks
    for i in range(0, len(indices), 10):
        chunk = indices[i:i+10]
        with open('bse_indices_list.json', 'w') as f:
            json.dump(chunk, f)
        
        print(f"Running chunk {i//10 + 1}")
        subprocess.run(["python3", "scripts/backfill_bse_indices.py", "--workers", "1"])
        import time
        time.sleep(2)
finally:
    os.rename('bse_indices_list.json.bak', 'bse_indices_list.json')
    
