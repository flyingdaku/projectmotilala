import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

# The user provided a curl:
# https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index=141&flag=1&sector=&seriesid=DT&frd=20260301&tod=20260311
# Let's try to get indices list from the BSE indices site API
res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/Indices/w", headers=headers)
print("Indices/w:", res.status_code)

res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/GetIndexList/w", headers=headers)
print("GetIndexList/w:", res.status_code)

res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/CommonIndex/w", headers=headers)
print("CommonIndex/w:", res.status_code)

res = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/IndexMasterData/w", headers=headers)
print("IndexMasterData/w:", res.status_code)

