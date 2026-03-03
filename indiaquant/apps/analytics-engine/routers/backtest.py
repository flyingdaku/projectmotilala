"""
Backtest router — Strategy pattern for pluggable backtest engines.

Each strategy is a class implementing BacktestStrategy protocol.
New strategies (e.g., DynamicAllocation) can be added without modifying existing code.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd

router = APIRouter()


# ---------------------------------------------------------------------------
# Pydantic models (request / response)
# ---------------------------------------------------------------------------

class AllocationItem(BaseModel):
    asset_id: str
    weight: float = Field(ge=0, le=100)


class BacktestRequest(BaseModel):
    allocations: list[AllocationItem]
    benchmark_id: str | None = None
    start_date: str  # YYYY-MM-DD
    end_date: str
    initial_amount: float = Field(gt=0)
    monthly_contribution: float = Field(ge=0, default=0)
    rebalance_frequency: str = "ANNUAL"  # MONTHLY | QUARTERLY | ANNUAL | NEVER
    inflation_adjusted: bool = False
    expense_ratio: float = Field(ge=0, le=5, default=0)
    strategy: str = "ASSET_ALLOCATION"  # ASSET_ALLOCATION | SIP | LUMPSUM


class BacktestMetrics(BaseModel):
    cagr: float
    std_dev: float
    sharpe_ratio: float
    sortino_ratio: float
    max_drawdown: float
    max_drawdown_date: str
    recovery_period_days: int | None
    longest_drawdown_days: int
    total_return: float
    final_value: float
    ulcer_index: float
    calmar_ratio: float


class DataPoint(BaseModel):
    date: str
    portfolio_value: float
    benchmark_value: float | None
    drawdown: float


class BacktestResponse(BaseModel):
    metrics: BacktestMetrics
    data_points: list[DataPoint]
    annual_returns: dict[str, float]
    monthly_returns: dict[str, float]
    rolling_returns_1yr: list[dict[str, Any]]
    rolling_returns_3yr: list[dict[str, Any]]
    rolling_returns_5yr: list[dict[str, Any]]
    rolling_returns_10yr: list[dict[str, Any]]


# ---------------------------------------------------------------------------
# Strategy Pattern — Backtest Strategies
# ---------------------------------------------------------------------------

class BacktestStrategy(ABC):
    """Abstract base class for all backtest strategies."""

    @abstractmethod
    def run(
        self,
        prices: pd.DataFrame,
        request: BacktestRequest,
    ) -> tuple[pd.Series, pd.Series]:
        """
        Returns (portfolio_series, benchmark_series) as daily value series.
        """
        ...


class AssetAllocationStrategy(BacktestStrategy):
    """
    Rebalanced asset allocation backtest.
    Supports monthly/quarterly/annual/threshold rebalancing.
    """

    def run(
        self,
        prices: pd.DataFrame,
        request: BacktestRequest,
    ) -> tuple[pd.Series, pd.Series]:
        weights = {a.asset_id: a.weight / 100.0 for a in request.allocations}
        available_assets = [a for a in weights if a in prices.columns]

        if not available_assets:
            raise ValueError("No price data found for requested assets")

        # Normalize weights to available assets
        total_weight = sum(weights[a] for a in available_assets)
        norm_weights = {a: weights[a] / total_weight for a in available_assets}

        prices_subset = prices[available_assets].dropna(how="all")
        daily_returns = prices_subset.pct_change().fillna(0)

        # Determine rebalance dates
        rebalance_dates = self._get_rebalance_dates(
            prices_subset.index, request.rebalance_frequency
        )

        # Simulate portfolio
        portfolio_values = [request.initial_amount]
        current_weights = dict(norm_weights)
        holding_values = {
            a: request.initial_amount * current_weights[a] for a in available_assets
        }

        for i, date in enumerate(prices_subset.index[1:], 1):
            # Apply daily returns
            for asset in available_assets:
                ret = daily_returns.iloc[i][asset] if asset in daily_returns.columns else 0
                holding_values[asset] *= (1 + ret)

            # Add monthly contribution
            if request.monthly_contribution > 0:
                days_in_month = 21  # Trading days
                daily_contrib = request.monthly_contribution / days_in_month
                for asset in available_assets:
                    holding_values[asset] += daily_contrib * current_weights[asset]

            total = sum(holding_values.values())

            # Rebalance if needed
            if date in rebalance_dates:
                for asset in available_assets:
                    holding_values[asset] = total * norm_weights[asset]

            portfolio_values.append(total)

        portfolio_series = pd.Series(
            portfolio_values, index=prices_subset.index, name="portfolio"
        )

        # Benchmark series
        benchmark_series = None
        if request.benchmark_id and request.benchmark_id in prices.columns:
            bench_prices = prices[request.benchmark_id].dropna()
            bench_series = (
                bench_prices / bench_prices.iloc[0] * request.initial_amount
            )
            benchmark_series = bench_series.reindex(prices_subset.index).ffill()

        return portfolio_series, benchmark_series

    def _get_rebalance_dates(
        self, index: pd.DatetimeIndex, frequency: str
    ) -> set:
        if frequency == "NEVER":
            return set()
        elif frequency == "MONTHLY":
            return set(index[index.is_month_end])
        elif frequency == "QUARTERLY":
            return set(index[index.is_quarter_end])
        elif frequency == "ANNUAL":
            return set(index[index.is_year_end])
        return set()


class SIPStrategy(BacktestStrategy):
    """Monthly SIP investment strategy."""

    def run(
        self,
        prices: pd.DataFrame,
        request: BacktestRequest,
    ) -> tuple[pd.Series, pd.Series]:
        weights = {a.asset_id: a.weight / 100.0 for a in request.allocations}
        available_assets = [a for a in weights if a in prices.columns]
        total_weight = sum(weights[a] for a in available_assets)
        norm_weights = {a: weights[a] / total_weight for a in available_assets}

        prices_subset = prices[available_assets].dropna(how="all")
        daily_returns = prices_subset.pct_change().fillna(0)

        holding_values = {a: 0.0 for a in available_assets}
        portfolio_values = [0.0]
        monthly_sip = request.monthly_contribution or request.initial_amount

        trading_day_count = 0

        for i, date in enumerate(prices_subset.index[1:], 1):
            for asset in available_assets:
                ret = daily_returns.iloc[i][asset] if asset in daily_returns.columns else 0
                holding_values[asset] *= (1 + ret)

            trading_day_count += 1
            # Invest SIP on first trading day of each month (~21 trading days)
            if trading_day_count % 21 == 1:
                for asset in available_assets:
                    holding_values[asset] += monthly_sip * norm_weights[asset]

            portfolio_values.append(sum(holding_values.values()))

        return (
            pd.Series(portfolio_values, index=prices_subset.index),
            None,
        )


# ---------------------------------------------------------------------------
# Strategy Factory
# ---------------------------------------------------------------------------

STRATEGY_MAP: dict[str, type[BacktestStrategy]] = {
    "ASSET_ALLOCATION": AssetAllocationStrategy,
    "SIP": SIPStrategy,
    "LUMPSUM": AssetAllocationStrategy,  # Lumpsum = allocation with no contribution
}


# ---------------------------------------------------------------------------
# Metric Computation
# ---------------------------------------------------------------------------

def compute_metrics(
    portfolio: pd.Series,
    risk_free_rate: float = 0.065,
) -> BacktestMetrics:
    """Compute all backtest metrics from a portfolio value series."""
    daily_returns = portfolio.pct_change().dropna()
    years = len(portfolio) / 252

    # CAGR
    cagr = (portfolio.iloc[-1] / portfolio.iloc[0]) ** (1 / years) - 1 if years > 0 else 0

    # Std Dev (annualized)
    std_dev = daily_returns.std() * np.sqrt(252)

    # Sharpe
    daily_rfr = risk_free_rate / 252
    excess_returns = daily_returns - daily_rfr
    sharpe = (excess_returns.mean() / excess_returns.std() * np.sqrt(252)) if excess_returns.std() > 0 else 0

    # Sortino
    downside = excess_returns[excess_returns < 0]
    downside_std = np.sqrt((downside ** 2).mean()) * np.sqrt(252) if len(downside) > 0 else 0
    sortino = (excess_returns.mean() * np.sqrt(252) / downside_std) if downside_std > 0 else 0

    # Drawdown
    rolling_max = portfolio.cummax()
    drawdown_series = (portfolio - rolling_max) / rolling_max
    max_dd = drawdown_series.min()
    max_dd_date = drawdown_series.idxmin()

    # Recovery period
    recovery_date = None
    if max_dd < 0:
        post_trough = portfolio[portfolio.index > max_dd_date]
        peak_value = rolling_max[max_dd_date]
        recovered = post_trough[post_trough >= peak_value]
        if len(recovered) > 0:
            recovery_date = recovered.index[0]

    recovery_days = None
    if recovery_date is not None:
        recovery_days = (recovery_date - max_dd_date).days

    # Longest drawdown
    in_drawdown = drawdown_series < 0
    longest = 0
    current = 0
    for val in in_drawdown:
        if val:
            current += 1
            longest = max(longest, current)
        else:
            current = 0

    # Ulcer Index
    ulcer = np.sqrt((drawdown_series ** 2).mean()) * 100

    # Calmar
    calmar = cagr / abs(max_dd) if max_dd != 0 else 0

    return BacktestMetrics(
        cagr=round(cagr, 6),
        std_dev=round(std_dev, 6),
        sharpe_ratio=round(sharpe, 4),
        sortino_ratio=round(sortino, 4),
        max_drawdown=round(max_dd, 6),
        max_drawdown_date=str(max_dd_date.date()),
        recovery_period_days=recovery_days,
        longest_drawdown_days=longest,
        total_return=round((portfolio.iloc[-1] / portfolio.iloc[0]) - 1, 6),
        final_value=round(portfolio.iloc[-1], 2),
        ulcer_index=round(ulcer, 4),
        calmar_ratio=round(calmar, 4),
    )


def compute_rolling_returns(
    portfolio: pd.Series, window_years: int
) -> list[dict[str, Any]]:
    """Compute rolling CAGR for a given window."""
    window_days = int(window_years * 252)
    results = []
    for i in range(window_days, len(portfolio)):
        start_val = portfolio.iloc[i - window_days]
        end_val = portfolio.iloc[i]
        if start_val > 0:
            cagr = (end_val / start_val) ** (1 / window_years) - 1
            results.append({"date": str(portfolio.index[i].date()), "cagr": round(cagr, 6)})
    return results


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------

@router.post("/run", response_model=BacktestResponse)
async def run_backtest(request: BacktestRequest):
    """
    Run a backtest with the specified strategy and asset allocation.
    Fetches historical price data from Supabase and runs the simulation.
    """
    from db.repository import AssetPriceRepository

    try:
        # Fetch price data
        asset_ids = [a.asset_id for a in request.allocations]
        if request.benchmark_id:
            asset_ids.append(request.benchmark_id)

        repo = AssetPriceRepository()
        prices_df = await repo.get_prices(
            asset_ids=asset_ids,
            start_date=request.start_date,
            end_date=request.end_date,
        )

        if prices_df.empty:
            raise HTTPException(status_code=404, detail="No price data found for requested assets and date range")

        # Run strategy
        strategy_class = STRATEGY_MAP.get(request.strategy, AssetAllocationStrategy)
        strategy = strategy_class()
        portfolio_series, benchmark_series = strategy.run(prices_df, request)

        # Apply expense ratio drag
        if request.expense_ratio > 0:
            daily_drag = (1 - request.expense_ratio / 100) ** (1 / 252)
            portfolio_series = portfolio_series * (daily_drag ** np.arange(len(portfolio_series)))

        # Apply inflation adjustment
        if request.inflation_adjusted:
            cpi_repo = AssetPriceRepository()
            cpi_df = await cpi_repo.get_prices(["CPI_INDIA"], request.start_date, request.end_date)
            if not cpi_df.empty and "CPI_INDIA" in cpi_df.columns:
                cpi = cpi_df["CPI_INDIA"].reindex(portfolio_series.index).ffill()
                cpi_normalized = cpi / cpi.iloc[0]
                portfolio_series = portfolio_series / cpi_normalized

        # Compute metrics
        metrics = compute_metrics(portfolio_series)

        # Build data points
        rolling_max = portfolio_series.cummax()
        drawdown_series = (portfolio_series - rolling_max) / rolling_max

        data_points = [
            DataPoint(
                date=str(portfolio_series.index[i].date()),
                portfolio_value=round(portfolio_series.iloc[i], 2),
                benchmark_value=round(benchmark_series.iloc[i], 2) if benchmark_series is not None else None,
                drawdown=round(drawdown_series.iloc[i], 6),
            )
            for i in range(len(portfolio_series))
        ]

        # Annual returns
        annual_returns = {}
        for year, group in portfolio_series.groupby(portfolio_series.index.year):
            if len(group) > 1:
                annual_returns[str(year)] = round((group.iloc[-1] / group.iloc[0]) - 1, 6)

        # Monthly returns
        monthly_returns = {}
        for (year, month), group in portfolio_series.groupby(
            [portfolio_series.index.year, portfolio_series.index.month]
        ):
            if len(group) > 1:
                key = f"{year}-{month:02d}"
                monthly_returns[key] = round((group.iloc[-1] / group.iloc[0]) - 1, 6)

        return BacktestResponse(
            metrics=metrics,
            data_points=data_points,
            annual_returns=annual_returns,
            monthly_returns=monthly_returns,
            rolling_returns_1yr=compute_rolling_returns(portfolio_series, 1),
            rolling_returns_3yr=compute_rolling_returns(portfolio_series, 3),
            rolling_returns_5yr=compute_rolling_returns(portfolio_series, 5),
            rolling_returns_10yr=compute_rolling_returns(portfolio_series, 10),
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
