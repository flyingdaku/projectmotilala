from __future__ import annotations

from datetime import date

from compute.metrics import compute_metrics, compute_monthly_returns, compute_viability_score
from tests.conftest import make_completed_trade, make_equity_curve


def test_compute_viability_score_when_perfect_strategy_then_score_is_high() -> None:
    score = compute_viability_score(
        {
            "profit_factor": 3.0,
            "profit_trades_pct": 65.0,
            "max_drawdown_pct": -5.0,
            "restoration_factor": 12.0,
            "total_trades": 40,
            "sharpe_ratio": 1.7,
        }
    )
    assert score >= 8.0


def test_compute_viability_score_when_terrible_strategy_then_score_is_low() -> None:
    score = compute_viability_score(
        {
            "profit_factor": 0.8,
            "profit_trades_pct": 35.0,
            "max_drawdown_pct": -40.0,
            "restoration_factor": 0.5,
            "total_trades": 10,
            "sharpe_ratio": 0.2,
        }
    )
    assert score <= 3.0


def test_compute_viability_score_when_average_strategy_then_score_is_midrange() -> None:
    score = compute_viability_score(
        {
            "profit_factor": 1.5,
            "profit_trades_pct": 52.0,
            "max_drawdown_pct": -20.0,
            "restoration_factor": 5.0,
            "total_trades": 25,
            "sharpe_ratio": 1.0,
        }
    )
    assert 4.0 <= score <= 7.0


def test_compute_monthly_returns_when_three_month_curve_then_first_month_is_none_and_values_match() -> None:
    equity_curve = [
        {"date": "2024-01-31", "portfolio_value": 1000.0, "benchmark_value": 1000.0, "drawdown_pct": 0.0},
        {"date": "2024-02-29", "portfolio_value": 1100.0, "benchmark_value": 1005.0, "drawdown_pct": 0.0},
        {"date": "2024-03-31", "portfolio_value": 1210.0, "benchmark_value": 1010.0, "drawdown_pct": 0.0},
    ]
    monthly = compute_monthly_returns(equity_curve)
    assert monthly["2024"]["1"] is None
    assert abs(monthly["2024"]["2"] - 10.0) < 0.0001
    assert abs(monthly["2024"]["3"] - 10.0) < 0.0001


def test_compute_metrics_when_two_year_growth_then_cagr_matches_manual_estimate() -> None:
    equity_curve = make_equity_curve([1_000_000.0, 1_500_000.0], start_date=date(2022, 1, 1))
    equity_curve[1]["date"] = "2024-01-01"
    metrics = compute_metrics(
        trades=[make_completed_trade(net_pnl=500_000.0, gross_pnl=520_000.0, total_costs=15_000.0, tax=5_000.0)],
        equity_curve=equity_curve,
        initial_capital=1_000_000.0,
        benchmark_initial=1_000_000.0,
        benchmark_final=1_100_000.0,
        symbol_metadata={"AAA": {"avg_daily_vol": 1_000_000.0}},
    )
    assert abs(metrics["cagr_pct"] - 22.47) < 0.1


def test_compute_metrics_when_equity_curve_has_drawdown_then_max_drawdown_matches_manual_value() -> None:
    trades = [make_completed_trade()]
    equity_curve = [
        {"date": "2024-01-01", "portfolio_value": 100.0, "benchmark_value": 100.0, "drawdown_pct": 0.0},
        {"date": "2024-01-02", "portfolio_value": 110.0, "benchmark_value": 101.0, "drawdown_pct": 0.0},
        {"date": "2024-01-03", "portfolio_value": 105.0, "benchmark_value": 102.0, "drawdown_pct": -4.5455},
        {"date": "2024-01-04", "portfolio_value": 95.0, "benchmark_value": 103.0, "drawdown_pct": -13.6364},
        {"date": "2024-01-05", "portfolio_value": 100.0, "benchmark_value": 104.0, "drawdown_pct": -9.0909},
        {"date": "2024-01-06", "portfolio_value": 115.0, "benchmark_value": 105.0, "drawdown_pct": 0.0},
    ]
    metrics = compute_metrics(
        trades=trades,
        equity_curve=equity_curve,
        initial_capital=100.0,
        benchmark_initial=100.0,
        benchmark_final=105.0,
        symbol_metadata={"AAA": {"avg_daily_vol": 1_000_000.0}},
    )
    assert abs(metrics["max_drawdown_pct"] - (-13.6364)) < 0.001


def test_compute_metrics_when_zero_trades_then_returns_empty_safe_metrics() -> None:
    equity_curve = make_equity_curve([1_000_000.0, 1_000_000.0, 1_000_000.0])
    metrics = compute_metrics(
        trades=[],
        equity_curve=equity_curve,
        initial_capital=1_000_000.0,
        benchmark_initial=1_000_000.0,
        benchmark_final=1_020_000.0,
        symbol_metadata={},
    )
    assert metrics["total_trades"] == 0
    assert abs(metrics["cagr_pct"] - 0.0) < 0.0001
    assert abs(metrics["capital_growth_pct"] - 0.0) < 0.0001
