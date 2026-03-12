import requests

headers = {
    'Accept': 'application/json, text/plain, */*',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

# The main site might have a static JSON with indices
# Let's check sitemap or something?
res = requests.get("https://www.bseindices.com/js/IndexData.js", headers=headers)
print("IndexData.js status:", res.status_code)

res = requests.get("https://www.bseindices.com/assets/js/bse-indices.js", headers=headers)
print("bse-indices.js:", res.status_code)

# Try fetching indices from the "indices-details" page
res = requests.get("https://www.bseindices.com/indices-details/code/16", headers=headers)
print("Sensex details page size:", len(res.text))

if "window.indices" in res.text or "var indices" in res.text:
    print("Found indices var in details page")

