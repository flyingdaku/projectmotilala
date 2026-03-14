
import requests
import json
import time
import os
from datetime import datetime

# Path to save the data
SAVE_DIR = "/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/data/nse_corp_actions"
os.makedirs(SAVE_DIR, exist_ok=True)

# Headers from the user's curl (extracted)
HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
    'dnt': '1',
    'priority': 'u=1, i',
    'referer': 'https://www.nseindia.com/companies-listing/corporate-filings-actions?symbol=RELIANCEPP&tabIndex=equity',
    'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
}

# Cookies from the user's curl
COOKIES_STR = '_ga=GA1.1.1860566245.1772821685; AKA_A2=A; _abck=6A412BC40F0A5AE13EF576B035C72BB3~0~YAAQti/JF+8sDcqcAQAAOn0n4w81EYphM+eDOmoPcD+n0AGjGqdLuz1Jk5nvVXFfAqPUdifzDdCeeg6JRqS1zH8nQ08MgDOrP4I4p/jhxmuNUY4bdXrpvfgIRJEkTYKonnWgeNnVN2qkgMAErdKj34goZEQZn+CXaDEYG3ItwjtZKn5mfKXYdv+XyW2xHb+R13qINMyozuPgIrNSwabTSv0R/bIdF9uPSNMlCH84t1PekL4eZx0Pzxv2XR7iTxf3yJ/0/0e48d8od+MVziGGnPY2MtRnmqy5sf0fr/MsocMYDkWoIIoposMUzbb2tcFXIY/6T0HVJI01NUmFcIYUgtLJFPl0Y0xFxoUshBCcajlAibLFSa0EvpMAA27DKWFLeyX4KXj5Qwf0kBEqXGinN6Ab/Kb6Fbt34B4Bms5GOUAqVqTpgebODVfx1DHUU3gJd5Iyfqu/nqZ38Aqv6l+YJKO4UDwG9cGbi98gm+asOYxyVGramaLVhWiFWLWvt4UvgRybqAZyp3i12ocMuwSrCSXI+o9qDZhF+qs5YTg3gRC8j7zE8xN6wxX9ZoXHD8klLxEapDQAQdEJa+bNjxkWdLO8upLiE3SBs1G1LJ1Qbqjmke6/I5h/dbTzlRw3hPuU4qjPS2EIiVFfffw=~-1~-1~-1~AAQAAAAF%2f%2f%2f%2f%2f2HrLjuBZjKVgc79mBBRDjAdcWNdt0AFc2D0jM423eMofDuN6CQa8BZCW9NtVKP3dN0lKeZC4T+lhPlOidybmiw0xR0L1wSVLlMr~-1; ext_name=ojplmecpdpgccookcobabopnaifgidhf; bm_mi=4F04465DC78CA62256B69A770587E6E9~YAAQPqIauNP7OcucAQAA26Qo4x8QfeztteemzgcND9PSnAJzu4YN25aaNrNQjyjIW0/Mxn4qE3sAj74svjL/x0FjH5E37hkj/GOo+ZS5PGm83Ot7jV61Ov7wDvIgycfiPkD3iT8COUYnc/gfLDnecLYYXYY3OjaZeI2F6Vy+paDEvWIxLzAGm2omFwMdhkprPKnhyDNuV0u7alKQmz/jroz9mMpEPgAfKqf6g3Wa+pCU7nH/8hG1vVhRFSUpTHgF2oqBSDVJ1xe6LV+vdrew5+YeTeo3iFAmslW92WQCGIA+NFndjqoUFwd5s+g=~1; bm_sv=A8CC613F865804B87AEA406704AA21E8~YAAQPqIauDL9OcucAQAA88go4x8Sm5bFDiXey4tnb/NJc4cMvWHYpg0gLSAV/DjxIJZE5QRORO+eEATdUnjbYFAPP7kzeC2uBwWFTnqOzi9ABfv4y2ezU0twX9jf12fniriy1PN7qxO+KBotB45ShAfk2p8G33y1pTr+JG466f76vZl4QTzy0kEj6YBws0ln+txASaA6qlWx5aKtq7wQQWXXZS0CC0L0nWqsIQ2yq8elZSmhUE1laUFNHZZCcVlVKen5~1; nsit=lKz0Q5EYHJQFZZiDNuBl-4mh; ak_bmsc=1DA9B1FFF47FA81E51040D33BDC297A1~000000000000000000000000000000~YAAQPqIauIP+OcucAQAALAYp4x9LoQ/3OcH0Z9+TyLifvLl3QOyIhrNFJzMIOzJaMBBW+ZKzQu90Nj9avU52DyEE74vowsrw1zrkhFf6znVsg96QpPw8SrAKUUjliD0w7oEBQ4rXH/Y4cmbqXZHSjIgrlMSbTEOFyThabVCT+OPQQe1T2c0Rubs9F1WmiYyOZfwVjQA6PhWngDnA9jlJWUFhSs2ZGKFRYkqIR6swzHI1fM3BHj5QTRe2jRMAvd+d3P5wPv2zmCPUD4YsrlzDgBS3pU3J90Glwyx/gF0DaUIfCoNR6NKqp6ydrkHOiHjHaBCUWrTgsazXNO2CYxrIFGJINhFwkmIDdZazTGDYDlM9A1Ocl2bl8a6tw4zYBEmlLnRbhm9N25ZH1HqKRZyNQUS28XYx4VnV7AMWB/28Ssj9+60l06htzlwdfGty8NNdG5VMtUZ9N4xgr6GWp6wVS0YDcrqKt1UZRs2aHeMO1zi49mI=; browse-url=%2Fget-quote%2Fequity%2FRELIANCEPP%2FReliance-Industries-Limited; bm_sz=F434FE2C4B7D6F124CD51D5995BBEF63~YAAQjdcLF2OGDOKcAQAAdQ894x8kvVfC7UO4ebo4ANnumloGbvizk+11ehuzIPKh8t2+DuXJQGpzdf+3iO9XbXw37QYemsyb4uvREp5nSrjthqH/ZvG0SeEGxGClH2/tRgx/IgTg+bYaOl5sixM9lg9AQatN1MIR3txqyer46lRqjSuh0mIOxjpeU5YgEdZXADVAjtPIygdf/jgEiNoIbWOJVqX2Rror3ea5IA1qcSNAApWMPgajRUBTuKp4ZFEgN88KGHTk6rc/Ikwy6MCNbzo1AREPurmo2+/2oPzF/UtoO7655hJ7rget6l1e32cpdf6TmsMmgYEVcV0J5fOWW29Av3Y1LUGAdarBpw8IbKylPcazuI5f5Dkn9C0AkgOYe/nStsu4MI+myllU4aCsNYB/m+YSt6WGDe+MwTRkOAC/wJ6iXkVyci8Inlmu2wZx5PhyjnFC61XEwpNPdjUxwg/KWgvYC5lgIsRInVB15WmL6w==~3355206~3224880; _ga_87M7PJ3R97=GS2.1.s1773337561$o3$g1$t1773338955$j60$l0$h0; RT="z=1&dm=nseindia.com&si=fbcad883-4892-4a49-b820-68643d8192cd&ss=mmns70gp&sl=1&se=8c&tt=ex&bcn=%2F%2F684d0d47.akstat.io%2F&ld=18ko"'
cookies = {c.split('=')[0]: c.split('=')[1] for c in COOKIES_STR.split('; ') if '=' in c}

def prime_session(session):
    print("Priming session...")
    try:
        session.get("https://www.nseindia.com/", headers=HEADERS, timeout=30)
        # Small wait for cookies to settle
        time.sleep(2)
        return True
    except Exception as e:
        print(f"Failed to prime session: {e}")
        return False

def download_year(session, year):
    url = f"https://www.nseindia.com/api/corporates-corporateActions?index=equities&from_date=01-01-{year}&to_date=31-12-{year}"
    print(f"Downloading {year}...")
    for attempt in range(3):
        try:
            response = session.get(url, headers=HEADERS, timeout=60)
            if response.status_code == 200:
                data = response.json()
                filepath = os.path.join(SAVE_DIR, f"nse_corp_actions_{year}.json")
                with open(filepath, 'w') as f:
                    json.dump(data, f, indent=2)
                print(f"Saved {year} to {filepath}. Records: {len(data)}")
                return True
            elif response.status_code == 401 or response.status_code == 403:
                print(f"Auth failure for {year}: {response.status_code}. Retrying in 5s...")
                time.sleep(5)
            else:
                print(f"Failed to download {year}. Status Code: {response.status_code}. Attempt {attempt+1}")
                time.sleep(2)
        except Exception as e:
            print(f"Error downloading {year}: {e}. Attempt {attempt+1}")
            time.sleep(5)
    return False

# Current year is 2026
session = requests.Session()
session.cookies.update(cookies)
if prime_session(session):
    for year in range(2000, 2027):
        success = download_year(session, year)
        if not success:
            print(f"Stopped at {year} due to failure.")
            break
        time.sleep(2) # Be nice
else:
    print("Failed to start session.")
