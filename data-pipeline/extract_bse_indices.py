import re

with open('bse_main.js', 'r') as f:
    content = f.read()

# We see something like: P(36,"BSE SENSEX") and S(35,"a",23) where href might be the link.
# We also have an API response which actually has an `index=16` query param.
# Let's extract all strings that look like BSE indices and see if we can map them.
# The user's curl used: `index=141` for INSLDR, `index=16` for BSE SENSEX.

# Actually, I can use the bseindia.com archive page to get the list of indices via requests using BeautifulSoup
# The dropdown is loaded dynamically, but wait! The daily bhavcopy from BSE has an index file? No, Bhavcopy is equities.

import requests
from bs4 import BeautifulSoup

# Let's try downloading the index list from BSE's old site or another endpoint
res = requests.get('https://m.bseindia.com/markets/equity/EQReports/StockPrcHistori.aspx?expandable=7&flag=0')
print("Status from mobile site:", res.status_code)

# There is a well known BSE endpoint for fetching the list of all indices
res = requests.get('https://api.bseindia.com/BseIndiaAPI/api/IndexWatchData/w?indType=I', 
                   headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
# Redirects to error page if we don't pass the right headers

# Let's write a simple loop to guess index IDs on the bseindices API
# We saw 16 is SENSEX, 141 is INSLDR.
