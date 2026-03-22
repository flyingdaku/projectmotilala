import logging
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import get_pg_connection, get_ts_connection

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def recompute_all_adj_close():
    logger.info("Starting global recomputation of adj_close for all assets...")

    # 1. Fetch all distinct asset_ids that have price data (timeseries DB)
    with get_ts_connection() as ts_conn:
        asset_rows = ts_conn.execute("SELECT DISTINCT asset_id FROM daily_prices").fetchall()
    asset_ids = [r["asset_id"] for r in asset_rows]
    logger.info(f"Found {len(asset_ids)} assets to process")

    # 2. Reset adj_close = close for all rows (timeseries DB)
    with get_ts_connection() as ts_conn:
        ts_conn.execute("UPDATE daily_prices SET adj_close = close")
    logger.info("Reset all adj_close to raw close")

    # 3. Fetch all relevant corporate actions from relational DB
    with get_pg_connection() as meta_conn:
        ca_rows = meta_conn.execute(
            """SELECT asset_id, ex_date, adjustment_factor
               FROM corporate_actions
               WHERE adjustment_factor IS NOT NULL
                 AND adjustment_factor > 0
                 AND ABS(adjustment_factor - 1.0) > 1e-8
               ORDER BY asset_id, ex_date DESC"""
        ).fetchall()

    # Group by asset_id
    from collections import defaultdict
    actions_by_asset = defaultdict(list)
    for r in ca_rows:
        actions_by_asset[r["asset_id"]].append(
            (str(r["ex_date"]), float(r["adjustment_factor"]))
        )
    logger.info(f"Loaded {len(ca_rows)} corporate actions for {len(actions_by_asset)} assets")

    # 4. Apply actions asset by asset into timeseries DB
    processed = 0
    total_actions = 0

    with get_ts_connection() as ts_conn:
        for asset_id in asset_ids:
            actions = actions_by_asset.get(asset_id, [])
            if not actions:
                processed += 1
                continue

            for ex_date, factor in actions:
                if abs(factor - 1.0) < 1e-8:
                    continue
                ts_conn.execute(
                    """UPDATE daily_prices
                       SET adj_close = adj_close * %s
                       WHERE asset_id = %s AND date < %s""",
                    (factor, asset_id, ex_date),
                )
                total_actions += 1

            processed += 1
            if processed % 500 == 0:
                logger.info(
                    f"Processed {processed}/{len(asset_ids)} assets "
                    f"({total_actions} actions applied)"
                )

        # Guard: fix any nulls or negatives introduced by bad factors
        ts_conn.execute(
            "UPDATE daily_prices SET adj_close = close WHERE adj_close IS NULL OR adj_close <= 0"
        )

    logger.info(
        f"Finished! Processed {processed} assets and applied "
        f"{total_actions} corporate action adjustment chains."
    )

if __name__ == "__main__":
    recompute_all_adj_close()
