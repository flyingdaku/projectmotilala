import requests
import json
import time

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

found = []
with open('bse_indices_list.json') as f:
    found = json.load(f)

print("Scanning more BSE indices 400-1000...")
for idx in range(400, 1000):
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx}&flag=1&sector=&seriesid=DT&frd=20260301&tod=20260305"
    try:
        res = requests.get(url, headers=headers, timeout=2)
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
        
    time.sleep(0.01)

with open('bse_indices_list.json', 'w') as f:
    json.dump(found, f, indent=2)

print(f"Total Found {len(found)} BSE indices.")
