"""
Nightly Metrics Computation Pipeline.

Computes pre-aggregated metrics for all active assets:
  - Returns: 1d, 1w, 1m, 3m, 6m, 1y, 3y, 5y, 10y
  - Risk: volatility_1y, beta_1y (vs Nifty 50), max_drawdown_1y, sharpe_1y
  - Valuation: pe_ratio, pb_ratio, market_cap (from latest fundamentals)

Results stored in asset_metrics table for fast API reads.
"""
import logging
import math
from datetime import date, datetime, timedelta, timezone
from typing import Optional

import pandas as pd

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from core.db import generate_id, get_db, get_prices_db

logger = logging.getLogger(__name__)

NIFTY50_SYMBOL = "NIFTY 50"
RISK_FREE_RATE = 0.065  # 6.5% annualized (approximate India 91-day T-bill)


def _get_price_series(asset_id: str, lookback_days: int, prices_conn) -> pd.Series:
    """Return adj_close price series as a pandas Series indexed by date."""
    cutoff = (date.today() - timedelta(days=lookback_days)).isoformat()
    rows = prices_conn.execute(
        """SELECT date, adj_close FROM daily_prices
           WHERE asset_id = %s AND date >= %s AND adj_close IS NOT NULL
           ORDER BY date ASC""",
        (asset_id, cutoff),
    ).fetchall()
    if not rows:
        return pd.Series(dtype=float)
    s = pd.Series(
        {r["date"]: float(r["adj_close"]) for r in rows},
        dtype=float,
    )
    return s


def _compute_return(prices: pd.Series, days: int) -> Optional[float]:
    """Compute return over the last `days` calendar days."""
    if prices.empty or len(prices) < 2:
        return None
    cutoff = (date.today() - timedelta(days=days)).isoformat()
    past = prices[prices.index <= cutoff]
    if past.empty:
        return None
    start_price = past.iloc[-1]
    end_price = prices.iloc[-1]
    if start_price <= 0:
        return None
    return round((end_price / start_price - 1) * 100, 4)


def _compute_volatility(prices: pd.Series) -> Optional[float]:
    """Annualized volatility (std dev of daily log returns * sqrt(252))."""
    if len(prices) < 20:
        return None
    log_returns = prices.pct_change().dropna()
    if log_returns.empty:
        return None
    return round(float(log_returns.std() * math.sqrt(252) * 100), 4)


def _compute_beta(asset_prices: pd.Series, benchmark_prices: pd.Series) -> Optional[float]:
    """Beta vs benchmark using 1-year daily returns."""
    if len(asset_prices) < 50 or len(benchmark_prices) < 50:
        return None
    asset_ret = asset_prices.pct_change().dropna()
    bench_ret = benchmark_prices.pct_change().dropna()
    aligned = pd.concat([asset_ret, bench_ret], axis=1, join="inner").dropna()
    aligned.columns = ["asset", "bench"]
    if len(aligned) < 20:
        return None
    cov = aligned["asset"].cov(aligned["bench"])
    var = aligned["bench"].var()
    if var == 0:
        return None
    return round(cov / var, 4)


def _compute_max_drawdown(prices: pd.Series) -> Optional[float]:
    """Maximum drawdown over the price series (as a negative percentage)."""
    if len(prices) < 5:
        return None
    rolling_max = prices.cummax()
    drawdown = (prices - rolling_max) / rolling_max * 100
    return round(float(drawdown.min()), 4)


def _compute_sharpe(prices: pd.Series) -> Optional[float]:
    """Annualized Sharpe ratio using daily returns."""
    if len(prices) < 20:
        return None
    daily_returns = prices.pct_change().dropna()
    if daily_returns.empty:
        return None
    ann_return = daily_returns.mean() * 252
    ann_vol = daily_returns.std() * math.sqrt(252)
    if ann_vol == 0:
        return None
    return round(float((ann_return - RISK_FREE_RATE) / ann_vol), 4)


def _get_ttm_values(conn, asset_id: str) -> dict:
    """
    Fetch the last 4 quarters of fundamentals from the golden layer and aggregate them
    to compute Trailing Twelve Months (TTM) values.
    Returns an empty dict if < 4 quarters are available.
    """
    rows = conn.execute(
        """
        SELECT revenue_ops as revenue, operating_profit, profit_before_tax as pbt,
               net_profit as pat, basic_eps as eps,
               finance_costs as interest, depreciation
        FROM src_msi_quarterly
        WHERE asset_id = %s
        ORDER BY period_end_date DESC
        LIMIT 4
        """,
        (asset_id,),
    ).fetchall()

    if len(rows) < 4:
        # Fallback to screener if MSI doesn't have 4 quarters
        rows = conn.execute(
            """
            SELECT sales as revenue, operating_profit, pbt, net_profit as pat, eps,
                   interest, depreciation
            FROM src_screener_quarterly
            WHERE asset_id = %s
            ORDER BY period_end_date DESC
            LIMIT 4
            """,
            (asset_id,),
        ).fetchall()

        if len(rows) < 4:
            return {}

    ttm = {
        "revenue": 0.0,
        "operating_profit": 0.0,
        "pbt": 0.0,
        "pat": 0.0,
        "eps": 0.0,
        "interest": 0.0,
        "depreciation": 0.0,
    }

    for idx, r in enumerate(rows):
        for k in ttm.keys():
            val = r[k]
            if val is not None:
                ttm[k] += float(val)
                
    return ttm


def _get_nifty50_prices(meta_conn, prices_conn) -> pd.Series:
    """Get Nifty 50 index price series for beta calculation."""
    nifty_row = meta_conn.execute(
        "SELECT id FROM assets WHERE nse_symbol = %s LIMIT 1",
        (NIFTY50_SYMBOL,),
    ).fetchone()
    if not nifty_row:
        return pd.Series(dtype=float)
    rows = prices_conn.execute(
        """SELECT date, adj_close FROM daily_prices
           WHERE asset_id = %s AND adj_close IS NOT NULL
             AND date >= %s
           ORDER BY date ASC""",
        (nifty_row["id"], (date.today() - timedelta(days=400)).isoformat()),
    ).fetchall()
    if not rows:
        return pd.Series(dtype=float)
    return pd.Series({r["date"]: float(r["adj_close"]) for r in rows}, dtype=float)


def compute_metrics_for_asset(asset_id: str, meta_conn, prices_conn, nifty_prices: pd.Series) -> Optional[dict]:
    """Compute all metrics for a single asset. Returns dict or None if insufficient data."""
    prices_1y = _get_price_series(asset_id, 400, prices_conn)  # Extra buffer for 1y

    if prices_1y.empty:
        return None

    prices_10y = _get_price_series(asset_id, 3700, prices_conn)

    metrics = {
        "asset_id": asset_id,
        "computed_on": date.today().isoformat(),
        "return_1d": _compute_return(prices_1y, 1),
        "return_1w": _compute_return(prices_1y, 7),
        "return_1m": _compute_return(prices_1y, 30),
        "return_3m": _compute_return(prices_1y, 91),
        "return_6m": _compute_return(prices_1y, 182),
        "return_1y": _compute_return(prices_1y, 365),
        "return_3y": _compute_return(prices_10y, 1095),
        "return_5y": _compute_return(prices_10y, 1825),
        "return_10y": _compute_return(prices_10y, 3650),
        "volatility_1y": _compute_volatility(prices_1y),
        "beta_1y": _compute_beta(prices_1y, nifty_prices) if not nifty_prices.empty else None,
        "max_drawdown_1y": _compute_max_drawdown(prices_1y),
        "sharpe_1y": _compute_sharpe(prices_1y),
    }

    # Valuation from latest fundamentals (relational DB)
    fund = meta_conn.execute(
        """SELECT eps, book_value_per_share, shares_outstanding
           FROM fundamentals
           WHERE asset_id = %s
           ORDER BY period_end_date DESC LIMIT 1""",
        (asset_id,),
    ).fetchone()

    latest_price = float(prices_1y.iloc[-1]) if not prices_1y.empty else None

    if fund and latest_price:
        eps = fund["eps"]
        bvps = fund["book_value_per_share"]
        shares = fund["shares_outstanding"]
        metrics["pe_ratio"] = round(latest_price / eps, 4) if eps and eps > 0 else None
        metrics["pb_ratio"] = round(latest_price / bvps, 4) if bvps and bvps > 0 else None
        metrics["market_cap"] = round(latest_price * shares, 2) if shares else None
    else:
        metrics["pe_ratio"] = None
        metrics["pb_ratio"] = None
        metrics["market_cap"] = None

    metrics["ev_ebitda"] = None  # Requires EV calculation — future enhancement

    return metrics


def run_compute_metrics_pipeline():
    """Compute nightly metrics for all active assets."""
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    run_id = generate_id()
    source = "COMPUTE_METRICS"

    try:
        with get_db() as meta_conn, get_prices_db() as prices_conn:
            assets = meta_conn.execute(
                "SELECT id FROM assets WHERE is_active = 1"
            ).fetchall()
            nifty_prices = _get_nifty50_prices(meta_conn, prices_conn)

            logger.info(f"[{source}] Computing metrics for {len(assets)} assets...")

            computed = 0
            skipped = 0

            for asset in assets:
                asset_id = asset["id"]
                metrics = compute_metrics_for_asset(asset_id, meta_conn, prices_conn, nifty_prices)

                if not metrics:
                    skipped += 1
                    continue

                meta_conn.execute(
                    """INSERT INTO asset_metrics
                       (asset_id, computed_on, return_1d, return_1w, return_1m, return_3m,
                        return_6m, return_1y, return_3y, return_5y, return_10y,
                        volatility_1y, beta_1y, max_drawdown_1y, sharpe_1y,
                        pe_ratio, pb_ratio, ev_ebitda, market_cap)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                       ON CONFLICT (asset_id) DO UPDATE SET
                         computed_on = EXCLUDED.computed_on,
                         return_1d = EXCLUDED.return_1d, return_1w = EXCLUDED.return_1w,
                         return_1m = EXCLUDED.return_1m, return_3m = EXCLUDED.return_3m,
                         return_6m = EXCLUDED.return_6m, return_1y = EXCLUDED.return_1y,
                         return_3y = EXCLUDED.return_3y, return_5y = EXCLUDED.return_5y,
                         return_10y = EXCLUDED.return_10y,
                         volatility_1y = EXCLUDED.volatility_1y, beta_1y = EXCLUDED.beta_1y,
                         max_drawdown_1y = EXCLUDED.max_drawdown_1y, sharpe_1y = EXCLUDED.sharpe_1y,
                         pe_ratio = EXCLUDED.pe_ratio, pb_ratio = EXCLUDED.pb_ratio,
                         ev_ebitda = EXCLUDED.ev_ebitda, market_cap = EXCLUDED.market_cap""",
                    (
                        metrics["asset_id"], metrics["computed_on"],
                        metrics["return_1d"], metrics["return_1w"], metrics["return_1m"],
                        metrics["return_3m"], metrics["return_6m"], metrics["return_1y"],
                        metrics["return_3y"], metrics["return_5y"], metrics["return_10y"],
                        metrics["volatility_1y"], metrics["beta_1y"], metrics["max_drawdown_1y"],
                        metrics["sharpe_1y"], metrics["pe_ratio"], metrics["pb_ratio"],
                        metrics["ev_ebitda"], metrics["market_cap"],
                    ),
                )
                computed += 1

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, records_skipped, duration_ms)
                   VALUES (%s, %s, %s, 'SUCCESS', %s, %s, %s)""",
                (run_id, date.today().isoformat(), source, computed, skipped, duration_ms),
            )

        logger.info(f"[{source}] ✅ Done. {computed} computed, {skipped} skipped, {duration_ms}ms")
        alert_pipeline_success(source, computed, 0, duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] ❌ Failed: {e}", exc_info=True)
        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (%s, %s, %s, 'FAILED', %s, %s)""",
                (run_id, date.today().isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), date.today().isoformat())
        raise


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_compute_metrics_pipeline()
