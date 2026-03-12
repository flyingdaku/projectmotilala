import requests
import json

headers = {
    'Accept': '*/*',
    'Referer': 'https://www.bseindices.com/',
    'User-Agent': 'Mozilla/5.0'
}

# The seriesid might control whether it's PR or TR.
# Let's see what happens if we change the flag param.
# The user's curl used: flag=1
def fetch_metadata(idx, series, flag):
    url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx}&flag={flag}&sector=&seriesid={series}&frd=20260301&tod=20260305"
    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        parts = res.text.strip('"').split('#@#')
        if len(parts) > 1:
            data = json.loads(parts[1].replace('\\"', '"'))
            # Get the first matching date: Mon Mar 02 2026
            val = next((item.get('value', item.get('value1')) for item in data if 'Mon Mar 02' in item['date']), None)
            print(f"Index: {idx}, Series: {series}, Flag: {flag}, Value on Mar 02: {val}")
        else:
            print(f"Index: {idx}, Series: {series}, Flag: {flag}, No data")

print("Checking Sensex (16) with different flags:")
fetch_metadata(16, "DT", "1")
fetch_metadata(16, "DT", "2")
fetch_metadata(16, "DT", "0")
fetch_metadata(16, "DP", "1")
fetch_metadata(16, "DP", "2")

