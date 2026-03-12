import requests
import json

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

for series in ["D", "DP", "DT", "P", "T", "PR", "TR"]:
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index=16&flag=1&sector=&seriesid={series}&frd=20260301&tod=20260311"
    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        try:
            parts = res.text.strip('"').split('#@#')
            if len(parts) > 1:
                data = json.loads(parts[1].replace('\\"', '"'))
                print(f"Series: {series}, Points: {len(data)}, First: {data[0]}")
            else:
                print(f"Series: {series}, No data")
        except:
            pass
