import requests
import json

headers = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0'
}

# The previous curl to IndexWatchData got redirected. We need to check network requests on bseindia.com/indices
url = "https://api.bseindia.com/BseIndiaAPI/api/IndexWatchData/w?indType=I"
# Wait, let's try scraping the html of bseindia.com/indices
res = requests.get("https://www.bseindia.com/indices/IndexArchiveData.html", headers=headers)
print("Len HTML:", len(res.text))

# Also BSE Indices (S&P Dow Jones Indices partnership) site:
# https://www.bseindices.com/
res2 = requests.get("https://www.bseindices.com/", headers=headers)
print("Len HTML2:", len(res2.text))
