import requests
import json
from bs4 import BeautifulSoup

# Let's try downloading BSE Sensex TRI
url = "https://www.bseindices.com/indices-details/code/16"
res = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
# Does it mention TRI?
print("TRI in page:", "TRI" in res.text or "Total Return" in res.text)
