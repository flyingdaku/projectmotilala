import requests
import json
import datetime

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

def fetch(idx, series):
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx}&flag=1&sector=&seriesid={series}&frd=20260301&tod=20260311"
    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        try:
            parts = res.text.strip('"').split('#@#')
            if len(parts) > 1:
                data = json.loads(parts[1].replace('\\"', '"'))
                print(f"Index: {idx}, Series: {series}, Points: {len(data)}, First: {data[0]}")
            else:
                print(f"Index: {idx}, Series: {series}, No data")
        except Exception as e:
            print(f"Error parsing: {e}")

fetch(16, "DP")
fetch(16, "DT")
fetch(16, "M")
fetch(16, "Y")

