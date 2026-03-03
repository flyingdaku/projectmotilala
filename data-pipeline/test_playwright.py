import requests

url = "https://api.bseindia.com/BseWebAPI/api/StockReach_HistData/w?scripcode=500002&fromdate=01/01/2004&todate=31/12/2004"
headers = {
    "Accept": "application/json, text/plain, */*",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Origin": "https://www.bseindia.com",
    "Referer": "https://www.bseindia.com/",
}
r = requests.get(url, headers=headers)
print("status:", r.status_code)
if 'json' in r.headers.get('content-type', '').lower():
    print(r.json()[:100])
else:
    print(r.text[:200])
