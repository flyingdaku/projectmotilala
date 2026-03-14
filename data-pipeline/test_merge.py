import sqlite3
from datetime import date, timedelta
from pipelines.golden_ca_pipeline import run_golden_ca_pipeline

# Check if it runs without errors
try:
    run_golden_ca_pipeline(date(2020, 1, 1), date.today())
    print("Golden CA pipeline run successfully")
except Exception as e:
    print(f"Error: {e}")
