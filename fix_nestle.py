from pipelines.adjust_prices import compute_adj_close_for_asset
from utils.db import get_db

with get_db() as conn:
    rows = compute_adj_close_for_asset("06853f0812364fa6ae07a3f3630a983c", conn)
    print(f"Modified NESTLEIND: {rows} rows")
