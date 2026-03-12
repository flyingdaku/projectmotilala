import requests
import json

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0'
}

# The data for DT has 15,636 points starting from 2000 for Sensex.
# Wait, are there separate TR (Total Return) versions of these indices?
# Let's search the list of 106 indices to see if there's any TRI.
with open('bse_indices_list.json') as f:
    indices = json.load(f)

# BSE publishes "Sensex TRI". In some places it's reported as a separate index. Let's see if we can find its ID.
# I will query IDs from 250 to 300 just in case.
import time
found = []
for idx in range(250, 300):
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx}&flag=1&sector=&seriesid=DT&frd=20260301&tod=20260305"
    try:
        res = requests.get(url, headers=headers, timeout=5)
        if res.status_code == 200:
            parts = res.text.strip('"').split('#@#')
            if len(parts) > 0 and parts[0]:
                meta = json.loads(parts[0].replace('\\"', '"'))
                if meta and isinstance(meta, list) and len(meta) > 0:
                    name = meta[0].get('Scrip', '')
                    if name:
                        print(f"[{idx}] Found: {name}")
                        found.append({'id': idx, 'name': name})
    except Exception as e:
        pass

