import json
import urllib.request

# The data for BSE Indices is actually fetched via JS or built-in to an angular chunk.
# Let's try to get it from bseindia API instead using the proper token/cookie if needed
# Actually, the drop-down on BSE India requires a cookie.

# Let's just fetch the index list from BSE India's main site using curl but parsing the HTML.
# Wait, bseindia.com has an endpoint: https://api.bseindia.com/BseIndiaAPI/api/GetIndexDDlVal/w?Flag=ARCH&ddlVal=ALL
# But it returns HTML or redirect. Let's look at the redirect URL.
# "https://api.bseindia.com/error_Bse.html"

# If we go to https://www.bseindia.com/indices/IndexArchiveData.html and inspect network
