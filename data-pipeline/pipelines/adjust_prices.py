"""
Adjusted Close Recomputation Pipeline.

Recomputes adj_close for all assets from scratch based on all known corporate actions.
This is a full recalculation — safe to run multiple times (idempotent).

Run this after:
  - Inserting new corporate actions
  - Backfilling historical prices
  - Any data correction
"""
import logging
from datetime import date, datetime, timedelta, timezone

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from utils.db import generate_id, get_db

logger = logging.getLogger(__name__)


def compute_adj_close_for_asset(asset_id: str, conn) -> int:
    """
    Recompute adj_close for a single asset.
    Returns the number of rows updated.

    Algorithm:
      For each historical price row, multiply close by the product of all
      adjustment factors for corporate actions with ex_date AFTER that row's date.
      This gives the "as-if" price in today's share count terms.
    """
    # Get all corporate actions for this asset, sorted by ex_date DESC
    actions = conn.execute(
        """SELECT ex_date, adjustment_factor
           FROM corporate_actions
           WHERE asset_id = ?
           ORDER BY ex_date DESC""",
        (asset_id,),
    ).fetchall()

    if not actions:
        # No corporate actions — adj_close = close
        conn.execute(
            "UPDATE daily_prices SET adj_close = close WHERE asset_id = ?",
            (asset_id,),
        )
        return conn.total_changes

    # Get all prices for this asset
    prices = conn.execute(
        """SELECT date, close FROM daily_prices
           WHERE asset_id = ?
           ORDER BY date ASC""",
        (asset_id,),
    ).fetchall()

    if not prices:
        return 0

    # Build list of (ex_date_str, factor) sorted DESC for efficient lookup
    action_list = [(a["ex_date"], float(a["adjustment_factor"])) for a in actions]

    rows_to_update = []
    for price in prices:
        price_date = price["date"]
        close = float(price["close"])

        # Cumulative factor = product of all adjustment factors for actions AFTER this date
        cumulative_factor = 1.0
        for ex_date_str, factor in action_list:
            if ex_date_str > price_date:
                cumulative_factor *= factor

        adj_close = round(close * cumulative_factor, 4)
        rows_to_update.append((adj_close, asset_id, price_date))

    conn.executemany(
        "UPDATE daily_prices SET adj_close = ? WHERE asset_id = ? AND date = ?",
        rows_to_update,
    )
    return len(rows_to_update)


def compute_adj_close_for_all_assets():
    """
    Recompute adj_close for ALL active assets.
    Runs in a single transaction per asset for efficiency.
    """
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    run_id = generate_id()
    source = "ADJUST_PRICES"

    try:
        with get_db() as conn:
            assets = conn.execute(
                "SELECT id, nse_symbol FROM assets WHERE is_active = 1"
            ).fetchall()

        total_assets = len(assets)
        total_rows = 0

        logger.info(f"[{source}] Recomputing adj_close for {total_assets} assets...")

        for i, asset in enumerate(assets):
            asset_id = asset["id"]
            symbol = asset["nse_symbol"] or asset_id[:8]

            with get_db() as conn:
                rows = compute_adj_close_for_asset(asset_id, conn)
                total_rows += rows

            if (i + 1) % 500 == 0:
                logger.info(f"[{source}] Progress: {i+1}/{total_assets} assets processed")

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, duration_ms)
                   VALUES (?, ?, ?, 'SUCCESS', ?, ?)""",
                (run_id, date.today().isoformat(), source, total_rows, duration_ms),
            )

        logger.info(
            f"[{source}] ✅ Done. {total_rows} adj_close values recomputed "
            f"across {total_assets} assets in {duration_ms}ms"
        )
        alert_pipeline_success(source, total_rows, 0, duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] ❌ Failed: {e}", exc_info=True)
        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (?, ?, ?, 'FAILED', ?, ?)""",
                (run_id, date.today().isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), date.today().isoformat())
        raise


def compute_adj_close_for_single_asset(isin: str):
    """Recompute adj_close for a single asset by ISIN. Useful for targeted fixes."""
    from utils.db import get_asset_id_by_isin

    asset_id = get_asset_id_by_isin(isin)
    if not asset_id:
        raise ValueError(f"Asset not found for ISIN: {isin}")

    with get_db() as conn:
        rows = compute_adj_close_for_asset(asset_id, conn)

    logger.info(f"Recomputed adj_close for {isin}: {rows} rows updated")
    return rows


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    if len(sys.argv) > 1:
        # Single asset mode: python -m pipelines.adjust_prices INE009A01021
        compute_adj_close_for_single_asset(sys.argv[1])
    else:
        compute_adj_close_for_all_assets()
