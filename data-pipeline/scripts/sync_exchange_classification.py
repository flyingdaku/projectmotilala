import requests
import sqlite3
import os
import time

DB_PATH = os.path.expanduser("~/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db")

NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.nseindia.com"
}

BSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.bseindia.com/corporates/List_Scrips.aspx",
    "Accept": "application/json"
}

def sync_nse():
    print("Syncing NSE classification via multiple large indices...")
    # List of indices to fetch from to cover max symbols
    indices = [
        "NIFTY TOTAL MARKET",
        "NIFTY 500",
        "NIFTY MIDSMALLCAP 400",
        "NIFTY SMALLCAP 250",
        "NIFTY MICROCAP 250",
        "NIFTY 100",
        "NIFTY 200",
        "NIFTY NEXT 50",
        "SECURITIES IN F&O"
    ]
    
    session = requests.Session()
    session.headers.update(NSE_HEADERS)
    session.get("https://www.nseindia.com", timeout=15) # Prime session
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    total_updated = 0
    all_symbols_seen = set()
    
    for index_name in indices:
        try:
            print(f"  Fetching {index_name} index...")
            url_friendly_name = index_name.replace(" ", "%20").replace("&", "%26")
            url = f"https://www.nseindia.com/api/equity-stockIndices?index={url_friendly_name}"
            resp = session.get(url, timeout=15)
            resp.raise_for_status()
            data = resp.json().get('data', [])
            
            print(f"    - Found {len(data)} items")
            
            updated_in_this_index = 0
            for item in data:
                symbol = item.get('symbol')
                if not symbol or symbol in all_symbols_seen: continue
                all_symbols_seen.add(symbol)
                
                meta = item.get('meta', {})
                macro = meta.get('macro')
                sector = meta.get('sector')
                industry = meta.get('industry')
                basic_industry = meta.get('basicIndustry')
                
                if macro or sector or industry or basic_industry:
                    cursor.execute("""
                        UPDATE assets 
                        SET nse_macro = ?, nse_sector = ?, nse_industry = ?, nse_basic_industry = ?
                        WHERE nse_symbol = ?
                    """, (macro, sector, industry, basic_industry, symbol))
                    if cursor.rowcount > 0:
                        updated_in_this_index += 1
            
            total_updated += updated_in_this_index
            print(f"    - Updated {updated_in_this_index} new assets.")
            conn.commit()
            time.sleep(1) # Be nice to NSE
            
        except Exception as e:
            print(f"  [ERROR] FAILED index {index_name}: {e}")
            
    conn.close()
    print(f"NSE Sync Done. Total unique assets updated: {total_updated}")

def sync_bse():
    print("Syncing BSE classification via ListofScripData and cross-referencing industry...")
    # Since BSE industry names are often null in the combined scrip list, 
    # we can try fetching industry-specific lists or using AMFI as a fallback
    
    # Actually, let's try to get a better BSE scrip master URL.
    # The 'Get_Corporate_Action_List' API or other metadata APIs might be better.
    
    print("  Fetching BSE scrip list...")
    url = "https://api.bseindia.com/BseIndiaAPI/api/ListofScripData/w?Group=&Scripcode=&industry=&segment=Equity&status=Active"
    
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=40)
        resp.raise_for_status()
        data = resp.json()
        
        print(f"  Loaded {len(data)} scrips from BSE")
        
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        updated = 0
        for scrip in data:
            code = scrip.get('SCRIP_CD')
            bse_group = scrip.get('GROUP')
            bse_industry = scrip.get('INDUSTRY') # This is often null in the combined API
            
            if code:
                # We update what we have. If industry is null, we at least get the Group.
                # Later we might find a better source for BSE industry names.
                cursor.execute("""
                    UPDATE assets 
                    SET bse_group = ?, bse_industry = ?
                    WHERE bse_code = ?
                """, (bse_group, bse_industry, str(code)))
                if cursor.rowcount > 0:
                    updated += 1
        
        conn.commit()
        conn.close()
        print(f"BSE Sync Done. Updated {updated} assets.")

    except Exception as e:
        print(f"  [ERROR] BSE Sync Error: {e}")

if __name__ == '__main__':
    sync_nse()
    sync_bse()
