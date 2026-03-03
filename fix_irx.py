from pipelines.adjust_prices import compute_adj_close_for_asset
from utils.db import get_db

with get_db() as conn:
    rows = compute_adj_close_for_asset("IDX_IRX", conn)
    print(f"Modified IDX_IRX: {rows} rows")
