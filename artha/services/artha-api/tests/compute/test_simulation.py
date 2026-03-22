from __future__ import annotations

from collections import defaultdict
from datetime import date, timedelta

import pandas as pd

from compute.simulation import SimulationConfig, run_simulation
from tests.conftest import make_ohlcv_fixture


def make_fixture_config(**overrides: object) -> SimulationConfig:
    payload: dict[str, object] = {
        "initial_capital": 1_000_000,
        "capital_at_risk": 10.0,
        "risk_unit": "pct",
        "portfolio_max_size": 3,
        "commission": 20.0,
        "commission_unit": "inr",
        "bid_ask_spread": 0.05,
        "stop_loss": None,
        "trailing_stop": None,
        "take_profit": None,
        "close_after_bars": None,
        "close_at_end_of": None,
        "circuit_breaker_compliance": False,
        "unit": "pct",
        "entry_exec_model": "close",
        "entry_exec_params": None,
        "exit_exec_model": "close",
        "entry_prioritize": None,
        "cost_config": {
            "stt_delivery_sell": 0.1,
            "stt_intraday_sell": 0.025,
            "sebi_charges": 0.0001,
            "exchange_charges": 0.00335,
            "stamp_duty_buy": 0.015,
            "gst_on_brokerage": 18.0,
        },
        "tax_config": {
            "apply_tax": True,
            "stcg_rate": 20.0,
            "ltcg_rate": 12.5,
            "ltcg_exemption": 125000.0,
        },
        "position_type": "long",
    }
    payload.update(overrides)
    return SimulationConfig(**payload)


def _make_signals(index: pd.MultiIndex, truthy: bool) -> pd.Series:
    return pd.Series(truthy, index=index, dtype=bool)


def _make_benchmark(trading_days: list[date]) -> pd.Series:
    return pd.Series({day: 1000.0 + idx * 2.0 for idx, day in enumerate(trading_days)})


def _make_symbol_metadata(symbols: list[str]) -> dict[str, dict[str, float | str]]:
    return {symbol: {"name": f"{symbol} Ltd", "avg_daily_vol": 5_000_000.0} for symbol in symbols}


def test_run_simulation_when_all_signals_true_then_runs_without_error() -> None:
    symbols = ["AAA", "BBB", "CCC"]
    ohlcv = make_ohlcv_fixture(symbols, 60)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    result = run_simulation(
        config=make_fixture_config(),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(symbols),
    )
    assert len(result.equity_curve) == len(trading_days)
    assert result.final_portfolio_value > 0


def test_run_simulation_when_no_signals_then_keeps_initial_capital() -> None:
    symbols = ["AAA", "BBB", "CCC"]
    ohlcv = make_ohlcv_fixture(symbols, 60)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    result = run_simulation(
        config=make_fixture_config(),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, False),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(symbols),
    )
    assert result.trades == []
    assert abs(result.final_portfolio_value - 1_000_000.0) < 0.01
    assert abs(result.equity_curve[0]["portfolio_value"] - 1_000_000.0) < 0.01


def test_run_simulation_when_stop_loss_hit_then_exits_with_stop_loss() -> None:
    ohlcv = make_ohlcv_fixture(["AAA"], 20)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    ohlcv.loc[("AAA", trading_days[4]), ["open", "high", "low", "close"]] = [85.0, 90.0, 80.0, 82.0]
    result = run_simulation(
        config=make_fixture_config(stop_loss=10.0),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(["AAA"]),
    )
    assert len(result.trades) >= 1
    assert result.trades[0].exit_reason == "stop_loss"
    assert result.trades[0].net_pnl < 0


def test_run_simulation_when_take_profit_hit_then_exits_with_take_profit() -> None:
    ohlcv = make_ohlcv_fixture(["AAA"], 20)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    ohlcv.loc[("AAA", trading_days[4]), ["open", "high", "low", "close"]] = [118.0, 126.0, 117.0, 125.0]
    result = run_simulation(
        config=make_fixture_config(take_profit=20.0),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(["AAA"]),
    )
    assert len(result.trades) >= 1
    assert result.trades[0].exit_reason == "take_profit"
    assert result.trades[0].net_pnl > 0


def test_run_simulation_when_close_after_bars_set_then_trade_durations_respect_limit() -> None:
    symbols = ["AAA", "BBB"]
    ohlcv = make_ohlcv_fixture(symbols, 30)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    result = run_simulation(
        config=make_fixture_config(close_after_bars=5),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(symbols),
    )
    assert result.trades
    assert all(trade.duration_days <= 5 for trade in result.trades)


def test_run_simulation_when_many_candidates_then_portfolio_max_size_is_respected() -> None:
    symbols = [f"S{i}" for i in range(10)]
    ohlcv = make_ohlcv_fixture(symbols, 30)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    result = run_simulation(
        config=make_fixture_config(portfolio_max_size=3),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(symbols),
    )
    overlap_counts: defaultdict[date, int] = defaultdict(int)
    for trade in result.trades:
        current = trade.entry_date
        while current <= trade.exit_date:
            overlap_counts[current] += 1
            current += timedelta(days=1)
    assert max(overlap_counts.values(), default=0) <= 3


def test_run_simulation_when_any_valid_config_then_portfolio_value_never_negative() -> None:
    symbols = ["AAA", "BBB", "CCC"]
    ohlcv = make_ohlcv_fixture(symbols, 40)
    trading_days = sorted({idx[1] for idx in ohlcv.index})
    result = run_simulation(
        config=make_fixture_config(),
        ohlcv=ohlcv,
        entry_signals=_make_signals(ohlcv.index, True),
        exit_signals=None,
        benchmark_series=_make_benchmark(trading_days),
        trading_days=trading_days,
        symbol_metadata=_make_symbol_metadata(symbols),
    )
    assert min(point["portfolio_value"] for point in result.equity_curve) >= 0
