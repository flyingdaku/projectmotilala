import requests
import json
import time

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0'
}

for idx in [16]:
    # What if we pass TR as seriesid instead of DT?
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx}&flag=1&sector=&seriesid=TR&frd=20260301&tod=20260305"
    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        print("TR series:", res.text[:200])

