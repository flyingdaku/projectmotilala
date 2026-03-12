import requests
import json
import sqlite3

def check_tri_pri():
    # If we fetch DT series for Sensex, we get values.
    # What if we fetch TR series?
    headers = {
        'Accept': '*/*',
        'Referer': 'https://www.bseindices.com/',
        'User-Agent': 'Mozilla/5.0'
    }
    
    # Actually, the user's initial curl provided "seriesid=DT" which returned daily values.
    # Wait, in the very first curl I ran, "seriesid=DT" for index 141 (INSLDR) gave us:
    # {"date":"Mon Mar 02 2026 00:00:00", "value":"14626.53"}
    # The API might be: DT = Daily Table? D = Daily Chart?
    # Let's check the keys in the response for DT vs DP.
    
    res_dt = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index=16&flag=1&sector=&seriesid=DT&frd=20260301&tod=20260305", headers=headers).text
    print("DT response:", res_dt[:200])
    
    # Let's check BSE index API behavior for backfilling.
    # BSE API requires "frd" and "tod" params as YYYYMMDD.
    res_history = requests.get("https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index=16&flag=1&sector=&seriesid=DT&frd=20000101&tod=20260311", headers=headers)
    parts = res_history.text.strip('"').split('#@#')
    if len(parts) > 1:
        data = json.loads(parts[1].replace('\\"', '"'))
        print(f"Sensex historical data length (DT): {len(data)}")
        if len(data) > 0:
            print("First date:", data[0].get('date'), data[0].get('value'))
            print("Last date:", data[-1].get('date'), data[-1].get('value'))

check_tri_pri()
