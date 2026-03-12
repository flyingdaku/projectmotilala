import requests

headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

# The endpoint from bseindices.com that populates their dropdown:
# Let's try finding it in their js files
res = requests.get("https://www.bseindices.com/js/IndexData.js", headers=headers)
print("IndexData.js:", res.status_code, len(res.text))

res = requests.get("https://www.bseindices.com/js/custom.js", headers=headers)
print("custom.js:", res.status_code, len(res.text))

# Let's see what is requested on https://www.bseindices.com/
