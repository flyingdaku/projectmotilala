import sys
import os
from datetime import date, timedelta
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from pipelines.nse_bhavcopy import run_nse_bhavcopy_pipeline
from pipelines.bse_bhavcopy import run_bse_bhavcopy_pipeline

def run_ingestion():
    print("Starting historical Bhavcopy DB ingestion from raw files...")
    
    # Let's ingest the last 3 years of daily prices
    end_date = date.today()
    start_date = end_date - timedelta(days=365 * 3)
    
    current = start_date
    while current <= end_date:
        if current.weekday() < 5:  # Weekdays only
            print(f"Ingesting Bhavcopies for {current}...")
            try:
                run_nse_bhavcopy_pipeline(current)
            except Exception as e:
                pass # Just ignore if no file or fails
                
            try:
                run_bse_bhavcopy_pipeline(current)
            except Exception as e:
                pass
                
        current += timedelta(days=1)
        
    print("Bhavcopy ingestion complete.")

if __name__ == "__main__":
    run_ingestion()
