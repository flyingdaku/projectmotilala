from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date
from typing import Any

import numpy as np
import pandas as pd

from compute.costs import calc_entry_cost, calc_trade_result
from compute.metrics import compute_metrics, compute_monthly_returns
from models.backtest import CostConfig, TaxConfig


@dataclass(slots=True)
class PositionState:
    symbol: str
    company_name: str | None
    direction: str
    entry_date: date
    entry_price: float
    shares: int
    sl_price: float | None
    tp_price: float | None
    tsl_price: float | None
    tsl_offset: float | None
    entry_cost: float
    bars_held: int = 0
    max_high_since_entry: float = 0.0
    min_low_since_entry: float = float("inf")


@dataclass(slots=True)
class CompletedTrade:
    symbol: str
    company_name: str | None
    direction: str
    entry_date: date
    entry_price: float
    exit_date: date
    exit_price: float
    shares: int
    trade_value: float
    gross_pnl: float
    total_costs: float
    tax: float
    net_pnl: float
    net_pnl_pct: float
    duration_days: int
    exit_reason: str
    gains_type: str
    net_proceeds: float


@dataclass(slots=True)
class SimulationResult:
    trades: list[CompletedTrade]
    equity_curve: list[dict[str, Any]]
    monthly_returns: dict[str, dict[str, float | None]]
    final_portfolio_value: float
    benchmark_final_value: float
    metrics: dict[str, Any]


@dataclass(slots=True)
class SimulationConfig:
    initial_capital: int
    capital_at_risk: float
    risk_unit: str
    portfolio_max_size: int
    commission: float
    commission_unit: str
    bid_ask_spread: float
    stop_loss: float | None
    trailing_stop: float | None
    take_profit: float | None
    close_after_bars: int | None
    close_at_end_of: str | None
    circuit_breaker_compliance: bool
    unit: str
    entry_exec_model: str
    entry_exec_params: dict[str, Any] | None
    exit_exec_model: str
    entry_prioritize: dict[str, Any] | None
    cost_config: dict[str, Any]
    tax_config: dict[str, Any]
    position_type: str = "long"
    entry_limit_to: str | None = None
    exit_limit_to: str | None = None


def _limit_to_allowed(current_day: date, next_day: date | None, limit_to: str | None) -> bool:
    if limit_to is None or limit_to == "eod":
        return True
    if limit_to == "eow":
        return current_day.weekday() == 4 or next_day is None
    if limit_to == "eom":
        return next_day is None or current_day.month != next_day.month
    return True


def build_dataframes(ohlcv_records: list[dict[str, Any]]) -> pd.DataFrame:
    if not ohlcv_records:
        return pd.DataFrame(columns=["open", "high", "low", "close", "volume"])
    frame = pd.DataFrame(ohlcv_records)
    frame["symbol"] = frame["symbol"].astype(str).str.upper()
    frame["date"] = pd.to_datetime(frame["date"]).dt.date
    numeric_cols = ["open", "high", "low", "close", "volume"]
    for column in numeric_cols:
        frame[column] = pd.to_numeric(frame[column], errors="coerce")
    return frame.sort_values(["symbol", "date"]).set_index(["symbol", "date"])


def calc_position_size(cash: float, portfolio: dict[str, "PositionState"], config: SimulationConfig) -> float:
    if config.risk_unit == "fixed":
        return float(config.capital_at_risk)
    open_at_entry = sum(p.shares * p.entry_price for p in portfolio.values())
    return (cash + open_at_entry) * (config.capital_at_risk / 100)


def calc_sl_price(entry_price: float, config: SimulationConfig, day_ohlcv_row: pd.Series | dict[str, Any]) -> float | None:
    if config.stop_loss is None:
        return None
    if config.unit == "pct":
        if config.position_type == "short":
            return entry_price * (1 + config.stop_loss / 100)
        return entry_price * (1 - config.stop_loss / 100)
    atr = float(day_ohlcv_row.get("atr_14", 0) or 0)
    if config.position_type == "short":
        return entry_price + (config.stop_loss * atr)
    return entry_price - (config.stop_loss * atr)


def calc_tp_price(entry_price: float, config: SimulationConfig, day_ohlcv_row: pd.Series | dict[str, Any] | None = None) -> float | None:
    if config.take_profit is None:
        return None
    if config.unit == "pct":
        if config.position_type == "short":
            return entry_price * (1 - config.take_profit / 100)
        return entry_price * (1 + config.take_profit / 100)
    atr = float(day_ohlcv_row.get("atr_14", 0) or 0) if day_ohlcv_row is not None else 0.0
    if config.position_type == "short":
        return entry_price - (config.take_profit * atr)
    return entry_price + (config.take_profit * atr)


def close_at_end_of_triggered(current_day: date, close_at: str | None, next_day: date | None) -> bool:
    if not close_at:
        return False
    if close_at == "day":
        return True
    if next_day is None:
        return True
    if close_at == "week":
        return current_day.weekday() == 4
    if close_at == "month":
        return current_day.month != next_day.month
    if close_at == "quarter":
        return current_day.month in (3, 6, 9, 12) and current_day.month != next_day.month
    if close_at == "semester":
        return current_day.month in (6, 12) and current_day.month != next_day.month
    if close_at == "year":
        return current_day.year != next_day.year
    return False


def _get_day_slice(ohlcv: pd.DataFrame, current_day: date) -> pd.DataFrame:
    try:
        return ohlcv.xs(current_day, level=1).copy()
    except KeyError:
        return pd.DataFrame(columns=ohlcv.columns)


def _signal_for_day(signals: pd.Series | None, signal_day: date, symbols: list[str] | None = None) -> pd.Series:
    if signals is None or signals.empty:
        if symbols is None:
            return pd.Series(dtype=bool)
        return pd.Series(False, index=symbols, dtype=bool)
    try:
        day_values = signals.xs(signal_day, level=1)
    except KeyError:
        if symbols is None:
            return pd.Series(dtype=bool)
        return pd.Series(False, index=symbols, dtype=bool)
    if symbols is not None:
        return day_values.reindex(symbols, fill_value=False).astype(bool)
    return day_values.astype(bool)


def _determine_entry_price(row: pd.Series, prev_row: pd.Series | None, config: SimulationConfig) -> float | None:
    if config.entry_exec_model == "close":
        return float(row["close"])
    if config.entry_exec_model == "next_open":
        return float(row["open"])
    if config.entry_exec_model == "next_if":
        params = config.entry_exec_params or {}
        pct = float(params.get("pct", 0))
        direction = str(params.get("direction", "above"))
        reference = str(params.get("reference", "prev_close"))
        if reference == "prev_high":
            reference_price = float(prev_row["high"]) if prev_row is not None else float(row["open"])
        elif reference == "prev_low":
            reference_price = float(prev_row["low"]) if prev_row is not None else float(row["open"])
        elif reference == "prev_close":
            reference_price = float(prev_row["close"]) if prev_row is not None else float(row["open"])
        elif reference == "gap_up":
            reference_price = float(row["open"])
            return float(row["open"]) if prev_row is not None and float(row["open"]) > float(prev_row["close"]) else None
        elif reference == "gap_down":
            reference_price = float(row["open"])
            return float(row["open"]) if prev_row is not None and float(row["open"]) < float(prev_row["close"]) else None
        else:
            reference_price = float(row["open"])
        target = reference_price * (1 + pct / 100) if direction == "above" else reference_price * (1 - pct / 100)
        if float(row["low"]) <= target <= float(row["high"]):
            return target
        return None
    return float(row["close"])


def _get_sl_exit_price(
    day_open: float,
    day_low: float,
    day_high: float,
    sl_price: float,
    direction: str,
) -> float | None:
    if direction == "long":
        if day_low <= sl_price:
            return day_open if day_open <= sl_price else sl_price
    else:
        if day_high >= sl_price:
            return day_open if day_open >= sl_price else sl_price
    return None


def _update_trailing_stop(position: PositionState, row: pd.Series, config: SimulationConfig) -> None:
    if config.trailing_stop is None:
        return
    day_high = float(row["high"])
    day_low = float(row["low"])
    if position.direction == "long":
        position.max_high_since_entry = max(position.max_high_since_entry, day_high)
        ref = position.max_high_since_entry
        if config.unit == "pct":
            new_tsl = ref * (1 - config.trailing_stop / 100)
        else:
            new_tsl = ref - (config.trailing_stop * (position.tsl_offset or 0.0))
        position.tsl_price = max(position.tsl_price or 0.0, new_tsl)
    else:
        position.min_low_since_entry = min(position.min_low_since_entry, day_low)
        ref = position.min_low_since_entry
        if config.unit == "pct":
            new_tsl = ref * (1 + config.trailing_stop / 100)
        else:
            new_tsl = ref + (config.trailing_stop * (position.tsl_offset or 0.0))
        position.tsl_price = min(position.tsl_price if position.tsl_price is not None else float("inf"), new_tsl)


def run_simulation(
    config: SimulationConfig,
    ohlcv: pd.DataFrame,
    entry_signals: pd.Series | None,
    exit_signals: pd.Series | None,
    benchmark_series: pd.Series,
    trading_days: list[date],
    symbol_metadata: dict[str, dict[str, Any]],
    progress_queue: Any | None = None,
) -> SimulationResult:
    portfolio: dict[str, PositionState] = {}
    cash = float(config.initial_capital)
    peak_value = float(config.initial_capital)
    cumulative_ltcg_fy: dict[int, float] = defaultdict(float)
    all_trades: list[CompletedTrade] = []
    daily_equity: list[dict[str, Any]] = []
    cost_config = CostConfig(**config.cost_config)
    tax_config = TaxConfig(**config.tax_config)
    benchmark_series = benchmark_series.sort_index()
    benchmark_initial = float(benchmark_series.iloc[0]) if not benchmark_series.empty else float(config.initial_capital)

    progress_step = max(1, len(trading_days) // 10) if trading_days else 1

    for index, current_day in enumerate(trading_days):
        previous_day = trading_days[index - 1] if index > 0 else None
        next_day = trading_days[index + 1] if index + 1 < len(trading_days) else None
        day_ohlcv = _get_day_slice(ohlcv, current_day)
        prev_ohlcv = _get_day_slice(ohlcv, previous_day) if previous_day else pd.DataFrame(columns=ohlcv.columns)

        exit_candidates: dict[str, tuple[str, float]] = {}
        if portfolio and not day_ohlcv.empty:
            open_symbols = [symbol for symbol in portfolio.keys() if symbol in day_ohlcv.index]
            day_positions = day_ohlcv.loc[open_symbols] if open_symbols else pd.DataFrame(columns=day_ohlcv.columns)
            criteria_exit = _signal_for_day(exit_signals, previous_day, open_symbols) if previous_day else pd.Series(False, index=open_symbols, dtype=bool)

            for symbol in open_symbols:
                position = portfolio[symbol]
                row = day_positions.loc[symbol]
                position.bars_held += 1
                day_open = float(row["open"])
                day_high = float(row["high"])
                day_low = float(row["low"])
                day_close = float(row["close"])

                # 1. Stop loss (highest priority, gap-aware)
                if position.sl_price is not None:
                    sl_exit = _get_sl_exit_price(day_open, day_low, day_high, position.sl_price, position.direction)
                    if sl_exit is not None:
                        exit_candidates[symbol] = ("stop_loss", sl_exit)
                        continue

                # 2. Trailing stop loss (gap-aware)
                if position.tsl_price is not None:
                    tsl_exit = _get_sl_exit_price(day_open, day_low, day_high, position.tsl_price, position.direction)
                    if tsl_exit is not None:
                        exit_candidates[symbol] = ("trailing_sl", tsl_exit)
                        continue

                # 3. Take profit (SL wins on same bar if both trigger)
                if position.tp_price is not None:
                    tp_hit = (
                        day_high >= position.tp_price
                        if position.direction == "long"
                        else day_low <= position.tp_price
                    )
                    if tp_hit:
                        exit_candidates[symbol] = ("take_profit", float(position.tp_price))
                        continue

                # 4. Criteria exit
                _exit_allowed = _limit_to_allowed(current_day, next_day, config.exit_limit_to)
                if _exit_allowed and bool(criteria_exit.get(symbol, False)):
                    exit_candidates[symbol] = ("criteria", day_close)
                    continue

                # 5. Time-based exit
                if config.close_after_bars and position.bars_held >= config.close_after_bars:
                    exit_candidates[symbol] = ("time_bars", day_close)
                    continue
                if close_at_end_of_triggered(current_day, config.close_at_end_of, next_day):
                    exit_candidates[symbol] = ("time_period", day_close)
                    continue

                # TSL update: runs at END of bar for positions not exiting today
                _update_trailing_stop(position, row, config)

        for symbol, (reason, exit_price) in list(exit_candidates.items()):
            position = portfolio.pop(symbol, None)
            if position is None:
                continue
            trade_result = calc_trade_result(
                symbol=symbol,
                entry_price=position.entry_price,
                exit_price=exit_price,
                shares=position.shares,
                entry_date=position.entry_date,
                exit_date=current_day,
                direction=position.direction,
                commission=config.commission,
                commission_unit=config.commission_unit,
                cost_config=cost_config,
                bid_ask_spread_pct=config.bid_ask_spread,
                tax_config=tax_config,
                cumulative_ltcg_fy=cumulative_ltcg_fy,
            )
            exit_value = exit_price * position.shares
            cash += exit_value - trade_result.exit_cost - trade_result.tax
            all_trades.append(
                CompletedTrade(
                    symbol=symbol,
                    company_name=position.company_name,
                    direction=position.direction,
                    entry_date=position.entry_date,
                    entry_price=round(position.entry_price, 4),
                    exit_date=current_day,
                    exit_price=round(exit_price, 4),
                    shares=position.shares,
                    trade_value=round(position.entry_price * position.shares, 2),
                    gross_pnl=trade_result.gross_pnl,
                    total_costs=trade_result.total_costs,
                    tax=trade_result.tax,
                    net_pnl=trade_result.net_pnl,
                    net_pnl_pct=trade_result.net_pnl_pct,
                    duration_days=(current_day - position.entry_date).days,
                    exit_reason=reason,
                    gains_type=trade_result.gains_type,
                    net_proceeds=trade_result.net_proceeds,
                )
            )

        available_slots = config.portfolio_max_size - len(portfolio)
        _entry_allowed = _limit_to_allowed(current_day, next_day, config.entry_limit_to)
        _exec = config.entry_exec_model
        _need_prev = _exec in ("next_open", "next_if")
        if _entry_allowed and available_slots > 0 and not day_ohlcv.empty and (not _need_prev or previous_day is not None):
            if _exec == "close":
                day_signals = _signal_for_day(entry_signals, current_day)
            else:
                day_signals = _signal_for_day(entry_signals, previous_day)

            candidate_symbols = [
                symbol
                for symbol, passed in day_signals.items()
                if bool(passed) and symbol not in portfolio and symbol in day_ohlcv.index
            ]
            if config.entry_prioritize and candidate_symbols:
                _p_direction = str(config.entry_prioritize.get("direction", "highest"))
                _p_metric = str(config.entry_prioritize.get("metric", "market_cap"))
                candidate_symbols.sort(
                    key=lambda s: float(symbol_metadata.get(s, {}).get(_p_metric, 0) or 0),
                    reverse=(_p_direction == "highest"),
                )

            active_candidates = candidate_symbols[:available_slots]
            n_new = len(active_candidates)
            per_position_cap = cash / n_new if n_new > 0 else 0.0

            _next_if_params = config.entry_exec_params or {}
            _next_if_pct = float(_next_if_params.get("pct", 1.0))
            _next_if_dir = str(_next_if_params.get("direction", "above"))

            for symbol in active_candidates:
                row = day_ohlcv.loc[symbol]
                if config.circuit_breaker_compliance and float(row["high"]) == float(row["low"]):
                    continue

                if _exec == "close":
                    entry_price: float | None = float(row["close"])
                elif _exec == "next_open":
                    entry_price = float(row["open"])
                else:
                    if prev_ohlcv.empty or symbol not in prev_ohlcv.index:
                        continue
                    prev_close = float(prev_ohlcv.loc[symbol, "close"])
                    threshold = prev_close * (1 + _next_if_pct / 100) if _next_if_dir == "above" else prev_close * (1 - _next_if_pct / 100)
                    hit = float(row["high"]) >= threshold if _next_if_dir == "above" else float(row["low"]) <= threshold
                    entry_price = threshold if hit else None

                if entry_price is None or entry_price <= 0:
                    continue
                position_value = min(calc_position_size(cash, portfolio, config), per_position_cap)
                shares = int(position_value // entry_price)
                if shares < 1:
                    continue
                actual_value = shares * entry_price
                entry_cost = calc_entry_cost(actual_value, config.commission, config.commission_unit, cost_config, config.bid_ask_spread)
                if cash < actual_value + entry_cost:
                    continue
                cash -= actual_value + entry_cost
                atr_offset = None
                if config.unit == "atr":
                    atr_offset = float(row.get("atr_14", 0) or 0) * float(config.trailing_stop or 0)
                elif config.trailing_stop is not None:
                    atr_offset = entry_price * (config.trailing_stop / 100)
                tsl_price = None
                if config.trailing_stop is not None and atr_offset is not None:
                    tsl_price = entry_price + atr_offset if config.position_type == "short" else entry_price - atr_offset
                portfolio[symbol] = PositionState(
                    symbol=symbol,
                    company_name=symbol_metadata.get(symbol, {}).get("name"),
                    direction=config.position_type,
                    entry_date=current_day,
                    entry_price=float(entry_price),
                    shares=shares,
                    sl_price=calc_sl_price(entry_price, config, row),
                    tp_price=calc_tp_price(entry_price, config, row),
                    tsl_price=tsl_price,
                    tsl_offset=atr_offset,
                    entry_cost=entry_cost,
                    max_high_since_entry=float(entry_price),
                    min_low_since_entry=float(entry_price),
                )

        open_value = 0.0
        if portfolio and not day_ohlcv.empty:
            open_symbols = [symbol for symbol in portfolio.keys() if symbol in day_ohlcv.index]
            if open_symbols:
                close_prices = day_ohlcv.loc[open_symbols, "close"]
                shares_series = pd.Series({symbol: portfolio[symbol].shares for symbol in open_symbols})
                open_value = float((close_prices * shares_series).sum())
        portfolio_value = cash + open_value
        benchmark_close = float(benchmark_series.loc[current_day]) if current_day in benchmark_series.index else (float(benchmark_series.iloc[-1]) if not benchmark_series.empty else float(config.initial_capital))
        benchmark_value = float(config.initial_capital) * benchmark_close / benchmark_initial if benchmark_initial else float(config.initial_capital)
        peak_value = max(peak_value, portfolio_value)
        drawdown_pct = ((portfolio_value - peak_value) / peak_value * 100) if peak_value else 0.0
        daily_equity.append(
            {
                "date": current_day.isoformat(),
                "portfolio_value": round(float(portfolio_value), 2),
                "benchmark_value": round(float(benchmark_value), 2),
                "drawdown_pct": round(float(drawdown_pct), 4),
            }
        )

        if progress_queue is not None and (index + 1) % progress_step == 0:
            pct = min(99, int(((index + 1) / max(len(trading_days), 1)) * 100))
            progress_queue.put(pct)

    last_day = trading_days[-1] if trading_days else None
    if last_day and portfolio:
        last_ohlcv = _get_day_slice(ohlcv, last_day)
        for symbol, position in list(portfolio.items()):
            if symbol not in last_ohlcv.index:
                continue
            exit_price = float(last_ohlcv.loc[symbol, "close"])
            trade_result = calc_trade_result(
                symbol=symbol,
                entry_price=position.entry_price,
                exit_price=exit_price,
                shares=position.shares,
                entry_date=position.entry_date,
                exit_date=last_day,
                direction=position.direction,
                commission=config.commission,
                commission_unit=config.commission_unit,
                cost_config=cost_config,
                bid_ask_spread_pct=config.bid_ask_spread,
                tax_config=tax_config,
                cumulative_ltcg_fy=cumulative_ltcg_fy,
            )
            all_trades.append(
                CompletedTrade(
                    symbol=symbol,
                    company_name=position.company_name,
                    direction=position.direction,
                    entry_date=position.entry_date,
                    entry_price=round(position.entry_price, 4),
                    exit_date=last_day,
                    exit_price=round(exit_price, 4),
                    shares=position.shares,
                    trade_value=round(position.entry_price * position.shares, 2),
                    gross_pnl=trade_result.gross_pnl,
                    total_costs=trade_result.total_costs,
                    tax=trade_result.tax,
                    net_pnl=trade_result.net_pnl,
                    net_pnl_pct=trade_result.net_pnl_pct,
                    duration_days=(last_day - position.entry_date).days,
                    exit_reason="time_period",
                    gains_type=trade_result.gains_type,
                    net_proceeds=trade_result.net_proceeds,
                )
            )
            cash += (exit_price * position.shares) - trade_result.exit_cost - trade_result.tax
        portfolio.clear()

    benchmark_final = float(daily_equity[-1]["benchmark_value"]) if daily_equity else float(config.initial_capital)
    monthly_returns = compute_monthly_returns(daily_equity)
    metrics = compute_metrics(
        trades=all_trades,
        equity_curve=daily_equity,
        initial_capital=float(config.initial_capital),
        benchmark_initial=float(config.initial_capital),
        benchmark_final=benchmark_final,
        symbol_metadata=symbol_metadata,
    )
    return SimulationResult(
        trades=all_trades,
        equity_curve=daily_equity,
        monthly_returns=monthly_returns,
        final_portfolio_value=float(daily_equity[-1]["portfolio_value"]) if daily_equity else float(config.initial_capital),
        benchmark_final_value=benchmark_final,
        metrics=metrics,
    )
