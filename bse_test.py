import requests

url = "https://api.bseindia.com/BseIndiaAPI/api/ListofScripData/w?Group=&Scripcode=&industry=&segment=Equity&status=Active"
headers = {"User-Agent": "Mozilla/5.0"}

resp = requests.get(url, headers=headers)
print(resp.status_code)
print(resp.text[:500])
