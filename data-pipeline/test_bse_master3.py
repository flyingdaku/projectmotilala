import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Origin': 'https://www.bseindia.com',
    'Referer': 'https://www.bseindia.com/',
}

res = requests.get("https://api.bseindia.com/BseIndiaAPI/api/GetIndexDDlVal/w?Flag=ARCH&ddlVal=ALL", headers=headers)
print("Status:", res.status_code)
if res.status_code == 200:
    print(res.text[:500])
