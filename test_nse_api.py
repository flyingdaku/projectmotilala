import requests

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0",
    "Accept": "*/*"
})

try:
    session.get("https://www.nseindia.com", timeout=10)
    resp = session.get("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%20500", timeout=10)
    data = resp.json()
    print("Found", len(data.get("data", [])))
    if data.get("data"):
        d = data["data"][1]
        print(f"{d.get('symbol')} : {d.get('meta', {}).get('macro')} | {d.get('meta', {}).get('sector')} | {d.get('meta', {}).get('industry')} | {d.get('meta', {}).get('basicIndustry')}")
except Exception as e:
    print("Error:", e)
