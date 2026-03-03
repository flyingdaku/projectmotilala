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
from utils.db import generate_id, get_db

logger = logging.getLogger(__name__)

NIFTY50_SYMBOL = "NIFTY 50"
RISK_FREE_RATE = 0.065  # 6.5% annualized (approximate India 91-day T-bill)


def _get_price_series(asset_id: str, lookback_days: int, conn) -> pd.Series:
    """Return adj_close price series as a pandas Series indexed by date."""
    cutoff = (date.today() - timedelta(days=lookback_days)).isoformat()
    rows = conn.execute(
        """SELECT date, adj_close FROM daily_prices
           WHERE asset_id = ? AND date >= ? AND adj_close IS NOT NULL
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
    if daily_returns.std() == 0:
        return None
    daily_rf = RISK_FREE_RATE / 252
    excess = daily_returns - daily_rf
    sharpe = (excess.mean() / excess.std()) * math.sqrt(252)
    return round(float(sharpe), 4)


def _get_nifty50_prices(conn) -> pd.Series:
    """Get Nifty 50 index price series for beta calculation."""
    rows = conn.execute(
        """SELECT dp.date, dp.adj_close
           FROM daily_prices dp
           JOIN assets a ON dp.asset_id = a.id
           WHERE a.nse_symbol = ? AND dp.adj_close IS NOT NULL
             AND dp.date >= ?
           ORDER BY dp.date ASC""",
        (NIFTY50_SYMBOL, (date.today() - timedelta(days=400)).isoformat()),
    ).fetchall()
    if not rows:
        return pd.Series(dtype=float)
    return pd.Series({r["date"]: float(r["adj_close"]) for r in rows}, dtype=float)


def compute_metrics_for_asset(asset_id: str, conn, nifty_prices: pd.Series) -> Optional[dict]:
    """Compute all metrics for a single asset. Returns dict or None if insufficient data."""
    prices_1y = _get_price_series(asset_id, 400, conn)  # Extra buffer for 1y

    if prices_1y.empty:
        return None

    prices_10y = _get_price_series(asset_id, 3700, conn)

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

    # Valuation from latest fundamentals
    fund = conn.execute(
        """SELECT eps, book_value_per_share, shares_outstanding
           FROM fundamentals
           WHERE asset_id = ?
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
        with get_db() as conn:
            assets = conn.execute(
                "SELECT id FROM assets WHERE is_active = 1"
            ).fetchall()
            nifty_prices = _get_nifty50_prices(conn)

        logger.info(f"[{source}] Computing metrics for {len(assets)} assets...")

        computed = 0
        skipped = 0

        for asset in assets:
            asset_id = asset["id"]
            with get_db() as conn:
                metrics = compute_metrics_for_asset(asset_id, conn, nifty_prices)

            if not metrics:
                skipped += 1
                continue

            with get_db() as conn:
                conn.execute(
                    """INSERT OR REPLACE INTO asset_metrics
                       (asset_id, computed_on, return_1d, return_1w, return_1m, return_3m,
                        return_6m, return_1y, return_3y, return_5y, return_10y,
                        volatility_1y, beta_1y, max_drawdown_1y, sharpe_1y,
                        pe_ratio, pb_ratio, ev_ebitda, market_cap)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
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
                   VALUES (?, ?, ?, 'SUCCESS', ?, ?, ?)""",
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
                   VALUES (?, ?, ?, 'FAILED', ?, ?)""",
                (run_id, date.today().isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), date.today().isoformat())
        raise


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run_compute_metrics_pipeline()
