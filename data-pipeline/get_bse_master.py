import requests
import json
import re

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}

res = requests.get("https://www.bseindices.com/", headers=headers)
print("Main page len:", len(res.text))

# Let's extract any index lists embedded in the HTML or linked js files
matches = re.findall(r'<option[^>]*value="(\d+)"[^>]*>([^<]+)</option>', res.text)
print(f"Found {len(matches)} options in HTML")
if matches:
    for m in matches[:10]:
        print(m)
