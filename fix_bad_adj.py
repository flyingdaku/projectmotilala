from pipelines.adjust_prices import compute_adj_close_for_asset
from utils.db import get_db

with get_db() as conn:
    # Fix IDX_IRX
    rows = compute_adj_close_for_asset("IDX_IRX", conn)
    print(f"Modified IDX_IRX: {rows} rows")
    
    # Also find other assets with HUGE adj_close vs close and fix them
    bad_assets = conn.execute("""
        SELECT DISTINCT asset_id FROM daily_prices 
        WHERE adj_close > close * 20 OR adj_close < close * 0.05
    """).fetchall()
    
    for row in bad_assets:
        aid = row["asset_id"]
        # Skip if asset NOT in assets table (orphans)
        exists = conn.execute("SELECT 1 FROM assets WHERE id = ?", (aid,)).fetchone()
        if exists:
            # Check actions count 
            actions = conn.execute("SELECT count(*) FROM corporate_actions WHERE asset_id = ?", (aid,)).fetchone()[0]
            if actions == 0:
                print(f"Fixing zero-action anomaly for {aid}...")
                compute_adj_close_for_asset(aid, conn)
            else:
                # If they HAVE actions, maybe the adjustment is just extreme (e.g. many splits)
                # But let's re-run it anyway to be safe
                print(f"Re-adjusting {aid} ({actions} actions)...")
                compute_adj_close_for_asset(aid, conn)
