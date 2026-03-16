import sys
import os
from datetime import date, timedelta
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.storage import raw_file_exists

def audit_bhavcopies(start_date: date, end_date: date):
    print(f"\n--- Auditing NSE & BSE Bhavcopies ({start_date} to {end_date}) ---")
    current = start_date
    nse_missing = 0
    bse_missing = 0
    total_days = 0
    
    while current <= end_date:
        if current.weekday() < 5:  # Monday-Friday
            total_days += 1
            
            # NSE
            nse_filename = f"cm{current.strftime('%d%b%Y').upper()}bhav.csv.zip"
            if not raw_file_exists("NSE_BHAVCOPY", current, nse_filename):
                nse_missing += 1
                
            # BSE
            bse_filename = f"EQ_ISINCODE_{current.strftime('%d%m%y')}.zip"
            if not raw_file_exists("BSE_BHAVCOPY", current, bse_filename):
                bse_missing += 1
                
        current += timedelta(days=1)
        
    print(f"Total Trading Days Checked: ~{total_days}")
    print(f"NSE Bhavcopy Missing: {nse_missing} days")
    print(f"BSE Bhavcopy Missing: {bse_missing} days")
    
def count_screener_files():
    screener_dir = Path(__file__).parent.parent / "raw_data" / "SCREENER"
    if not screener_dir.exists():
        print("\n--- Screener Raw Data ---")
        print("Directory does not exist.")
        return
        
    files = list(screener_dir.rglob("*.html"))
    print(f"\n--- Screener Raw Data ---")
    print(f"Total Screener HTML files cached: {len(files)}")
    
def count_msi_files():
    msi_dir = Path(__file__).parent.parent / "raw_data" / "MARKETSMITHINDIA"
    if not msi_dir.exists():
        print("\n--- MarketSmith India Raw Data ---")
        print("Directory does not exist.")
        return
        
    files = list(msi_dir.rglob("*.json"))
    print(f"\n--- MarketSmith India Raw Data ---")
    print(f"Total MSI JSON files cached: {len(files)}")

def run_audit():
    print("=====================================")
    print("      DATA PIPELINE RAW DATA AUDIT    ")
    print("=====================================")
    
    end_date = date.today()
    start_date = end_date - timedelta(days=365 * 5) # Last 5 years
    
    audit_bhavcopies(start_date, end_date)
    count_screener_files()
    count_msi_files()
    
    print("\nAudit Complete.")

if __name__ == "__main__":
    run_audit()
