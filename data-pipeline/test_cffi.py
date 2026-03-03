from curl_cffi import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.bseindia.com/',
    'Origin': 'https://www.bseindia.com'
}
s = requests.Session(impersonate="chrome110")
# Visit homepage to get any cookies
s.get("https://www.bseindia.com/")
print("Cookies:", s.cookies)

url = "https://api.bseindia.com/BseWebAPI/api/StockReach_HistData/w?scripcode=500325&fromdate=01/01/2004&todate=31/12/2004"
r = s.get(url, headers=headers)
print("Status:", r.status_code)
print("Response text:", r.text[:200])
