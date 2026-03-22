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
from core.db import generate_id, get_db, get_prices_db

logger = logging.getLogger(__name__)


def compute_adj_close_for_asset(asset_id: str, meta_conn, prices_conn) -> int:
    """
    Recompute adj_close for a single asset.
    Returns the number of rows updated.

    Algorithm:
      For each historical price row, multiply close by the product of all
      adjustment factors for corporate actions with ex_date AFTER that row's date.
      This gives the "as-if" price in today's share count terms.

    Args:
      meta_conn: relational DB connection (for corporate_actions)
      prices_conn: timeseries DB connection (for daily_prices read/write)
    """
    # Get all corporate actions for this asset from relational DB, sorted by ex_date DESC
    actions = meta_conn.execute(
        """SELECT ex_date, adjustment_factor
           FROM corporate_actions
           WHERE asset_id = %s
           ORDER BY ex_date DESC""",
        (asset_id,),
    ).fetchall()

    if not actions:
        # No corporate actions — adj_close = close
        prices_conn.execute(
            "UPDATE daily_prices SET adj_close = close WHERE asset_id = %s",
            (asset_id,),
        )
        return 0

    # Get all prices for this asset from timeseries DB
    prices = prices_conn.execute(
        """SELECT date, close FROM daily_prices
           WHERE asset_id = %s
           ORDER BY date ASC""",
        (asset_id,),
    ).fetchall()

    if not prices:
        return 0

    # Build list of (ex_date_str, factor) — filter out invalid factors (<=0 or >100)
    action_list = []
    for a in actions:
        factor = float(a["adjustment_factor"]) if a["adjustment_factor"] is not None else 1.0
        if factor <= 0 or factor > 100:
            logger.warning(
                f"Skipping invalid adjustment_factor={factor} for asset_id={asset_id} ex_date={a['ex_date']}"
            )
            continue
        action_list.append((str(a["ex_date"]), factor))

    rows_to_update = []
    for price in prices:
        price_date = str(price["date"])
        close = float(price["close"])

        # Cumulative factor = product of all adjustment factors for actions AFTER this date
        cumulative_factor = 1.0
        for ex_date_str, factor in action_list:
            if ex_date_str > price_date:
                cumulative_factor *= factor

        adj_close = round(close * cumulative_factor, 4)
        rows_to_update.append((adj_close, asset_id, price_date))

    prices_conn.executemany(
        "UPDATE daily_prices SET adj_close = %s WHERE asset_id = %s AND date = %s",
        rows_to_update,
    )
    return len(rows_to_update)


def compute_adj_close_for_all_assets():
    """
    Recompute adj_close for ALL active assets.
    Fetches corporate_actions from relational DB and updates daily_prices in timeseries DB.
    """
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    run_id = generate_id()
    source = "ADJUST_PRICES"

    try:
        with get_db() as meta_conn:
            assets = meta_conn.execute(
                "SELECT id, nse_symbol FROM assets WHERE is_active = 1"
            ).fetchall()

        total_assets = len(assets)
        total_rows = 0

        logger.info(f"[{source}] Recomputing adj_close for {total_assets} assets...")

        for i, asset in enumerate(assets):
            asset_id = asset["id"]

            with get_db() as meta_conn:
                with get_prices_db() as prices_conn:
                    rows = compute_adj_close_for_asset(asset_id, meta_conn, prices_conn)
                    total_rows += rows

            if (i + 1) % 500 == 0:
                logger.info(f"[{source}] Progress: {i+1}/{total_assets} assets processed")

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)

        with get_db() as meta_conn:
            meta_conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, duration_ms)
                   VALUES (%s, %s, %s, 'SUCCESS', %s, %s)""",
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
        with get_db() as meta_conn:
            meta_conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (%s, %s, %s, 'FAILED', %s, %s)""",
                (run_id, date.today().isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), date.today().isoformat())
        raise


def compute_adj_close_for_single_asset(isin: str):
    """Recompute adj_close for a single asset by ISIN. Useful for targeted fixes."""
    with get_db() as meta_conn:
        row = meta_conn.execute(
            "SELECT id FROM assets WHERE isin = %s", (isin,)
        ).fetchone()
    if not row:
        raise ValueError(f"Asset not found for ISIN: {isin}")
    asset_id = row["id"]

    with get_db() as meta_conn:
        with get_prices_db() as prices_conn:
            rows = compute_adj_close_for_asset(asset_id, meta_conn, prices_conn)

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
