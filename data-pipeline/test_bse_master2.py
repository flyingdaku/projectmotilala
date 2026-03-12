import requests

headers = {
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

# The user mentioned we can scrape all BSE indices.
# Is there an endpoint that lists them?
res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/IndexMaster/w", headers=headers)
print("IndexMaster/w:", res.status_code, res.text[:200])

res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/IndexMasterData/w", headers=headers)
print("IndexMasterData/w:", res.status_code, res.text[:200])

# Let's try parsing the main page HTML
res = requests.get("https://www.bseindices.com/", headers=headers)
if 'indicesList' in res.text or 'var indices' in res.text:
    print("Found indices in HTML")

# What about the drop down on https://www.bseindia.com/indices/IndexArchiveData.html
res = requests.get("https://api.bseindia.com/BseIndiaAPI/api/GetIndexDDlVal/w?Flag=ARCH&ddlVal=ALL", headers=headers)
print("GetIndexDDlVal/w:", res.status_code, res.text[:200])

