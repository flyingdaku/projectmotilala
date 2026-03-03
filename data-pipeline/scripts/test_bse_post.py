import requests, re
from bs4 import BeautifulSoup
import io, zipfile

s = requests.Session()
s.headers.update({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': 'https://www.bseindia.com/markets/MarketInfo/BhavCopy.aspx'
})

url = 'https://www.bseindia.com/markets/MarketInfo/BhavCopy.aspx'
get_resp = s.get(url, timeout=10)
soup = BeautifulSoup(get_resp.text, 'html.parser')

vs = soup.find('input', id='__VIEWSTATE')['value']
vsg = soup.find('input', id='__VIEWSTATEGENERATOR')['value']
ev = soup.find('input', id='__EVENTVALIDATION')['value']

payload = {
    '__EVENTTARGET': 'ctl00$ContentPlaceHolder1$btnSubmit',
    '__EVENTARGUMENT': '',
    '__VIEWSTATE': vs,
    '__VIEWSTATEGENERATOR': vsg,
    '__EVENTVALIDATION': ev,
    'ctl00$ContentPlaceHolder1$txtDate': '10/03/2004', # 10 Mar 2004
}

# The button id may actually be different, or wait, it's just 'ctl00$ContentPlaceHolder1$btnSubmit' 
post_resp = s.post(url, data=payload, timeout=10)

print("Status:", post_resp.status_code)
disp = post_resp.headers.get('content-disposition', '')
print("content-disposition:", disp)

if 'attachment' in disp:
    print('Size:', len(post_resp.content))
    # It returns a zip?
    z = zipfile.ZipFile(io.BytesIO(post_resp.content))
    print(z.namelist())
else:
    print('Failed. Response len:', len(post_resp.text))
