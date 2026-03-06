import requests
import sqlite3
import os
import zipfile
import io
import csv

DB_PATH = os.path.expanduser("~/AllForOne/Skunk/projectmotilala/data-pipeline/db/market_data.db")

def sync_bse_master_file():
    print("Syncing BSE classification via official master file (scrip.zip)...")
    url = "https://www.bseindia.com/downloads/Help/file/scrip.zip"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        resp = requests.get(url, headers=headers, timeout=30)
        resp.raise_for_status()
        
        with zipfile.ZipFile(io.BytesIO(resp.content)) as z:
            csv_name = next((n for n in z.namelist() if n.endswith(".csv")), None)
            if not csv_name:
                print("No CSV found in scrip.zip")
                return
            
            content = z.read(csv_name).decode('utf-8', errors='ignore')
            reader = csv.DictReader(io.StringIO(content))
            
            data = list(reader)
            print(f"  Loaded {len(data)} scrips from BSE master file.")
            
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            
            updated = 0
            for row in data:
                # BSE master CSV usually has 'Scrip Code', 'Group', 'Industry'
                code = row.get('Scrip Code')
                bse_group = row.get('Group')
                bse_industry = row.get('Industry')
                segment = row.get('Segment')
                
                if code and segment == 'Equity':
                    cursor.execute("""
                        UPDATE assets 
                        SET bse_group = ?, bse_industry = ?
                        WHERE bse_code = ?
                    """, (bse_group, bse_industry, str(code)))
                    if cursor.rowcount > 0:
                        updated += 1
            
            conn.commit()
            conn.close()
            print(f"BSE Sync Done. Updated {updated} assets with Group & Industry.")

    except Exception as e:
        print(f"BSE Master Sync Error: {e}")

if __name__ == '__main__':
    sync_bse_master_file()
