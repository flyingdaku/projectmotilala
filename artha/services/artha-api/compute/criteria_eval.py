from __future__ import annotations

from typing import Any

import pandas as pd

from compute.indicators import normalize_indicator_name


def _resolve_series(df: pd.DataFrame, field_name: str) -> pd.Series:
    normalized = normalize_indicator_name(field_name)
    if normalized not in df.columns:
        raise ValueError(f"Unknown criteria field: {field_name}")
    return df[normalized]


def _series_compare(left: pd.Series, op: str, right: pd.Series | float | int) -> pd.Series:
    if op == "<":
        return left.lt(right).fillna(False)
    if op == ">":
        return left.gt(right).fillna(False)
    if op == "<=":
        return left.le(right).fillna(False)
    if op == ">=":
        return left.ge(right).fillna(False)
    if op == "=":
        return left.eq(right).fillna(False)
    if op == "!=":
        return left.ne(right).fillna(False)
    raise ValueError(f"Unsupported operator: {op}")


def _cross_compare(left: pd.Series, op: str, right: pd.Series | float | int) -> pd.Series:
    prev_left = left.groupby(level=0).shift(1) if isinstance(left.index, pd.MultiIndex) else left.shift(1)
    if isinstance(right, pd.Series):
        prev_right = right.groupby(level=0).shift(1) if isinstance(right.index, pd.MultiIndex) else right.shift(1)
    else:
        prev_right = right
    if op == "crosses_above":
        return ((prev_left < prev_right) & (left >= right)).fillna(False)
    if op == "crosses_below":
        return ((prev_left > prev_right) & (left <= right)).fillna(False)
    raise ValueError(f"Unsupported operator: {op}")


def _evaluate_rule(df: pd.DataFrame, rule: dict[str, Any]) -> pd.Series:
    if "rules" in rule:
        return _evaluate_group(df, rule)

    field_name = rule.get("field")
    if not isinstance(field_name, str):
        raise ValueError("Criteria rule is missing field")
    op = str(rule.get("op") or "").strip().lower()
    if not op:
        raise ValueError("Criteria rule is missing op")

    left = _resolve_series(df, field_name)
    if "value_field" in rule and isinstance(rule["value_field"], str):
        right: pd.Series | float | int = _resolve_series(df, rule["value_field"])
    else:
        right = rule.get("value")
        if right is None:
            raise ValueError("Criteria rule is missing value")

    if op in {"crosses_above", "crosses_below"}:
        return _cross_compare(left, op, right)
    return _series_compare(left, op, right)


def _evaluate_group(df: pd.DataFrame, node: dict[str, Any]) -> pd.Series:
    rules = node.get("rules")
    if not isinstance(rules, list) or not rules:
        raise ValueError("Criteria group must include rules")

    operator = str(node.get("operator") or "AND").upper()
    masks = [_evaluate_rule(df, rule) for rule in rules if isinstance(rule, dict)]
    if not masks:
        raise ValueError("Criteria group has no valid rules")

    combined = masks[0]
    for mask in masks[1:]:
        if operator == "AND":
            combined = combined & mask
        elif operator == "OR":
            combined = combined | mask
        else:
            raise ValueError(f"Unsupported logical operator: {operator}")
    return combined.fillna(False)


def evaluate_criteria_to_signals(
    ohlcv_with_indicators: pd.DataFrame,
    criteria_tree: dict[str, Any],
) -> pd.Series:
    if ohlcv_with_indicators.empty:
        return pd.Series(dtype=bool)
    if not criteria_tree:
        return pd.Series(True, index=ohlcv_with_indicators.index, dtype=bool)

    df = ohlcv_with_indicators.copy()
    if "symbol" in df.columns and "date" in df.columns:
        df = df.set_index(["symbol", "date"]).sort_index()
    return _evaluate_group(df, criteria_tree)


def evaluate_for_screener(
    criteria_tree: dict[str, Any],
    symbols: list[str],
    as_of_date: str,
    lookback_days: int,
    ohlcv_df: pd.DataFrame,
) -> dict[str, bool]:
    del lookback_days

    if ohlcv_df.empty:
        return {symbol: False for symbol in symbols}

    df = ohlcv_df.copy()
    if "symbol" in df.columns and "date" in df.columns:
        df = df.set_index(["symbol", "date"]).sort_index()
    signals = evaluate_criteria_to_signals(df, criteria_tree)
    target_date = pd.Timestamp(as_of_date).date()

    results: dict[str, bool] = {}
    for symbol in symbols:
        symbol_upper = symbol.upper()
        try:
            symbol_signals = signals.xs(symbol_upper, level=0)
        except KeyError:
            results[symbol_upper] = False
            continue
        valid_index = [idx for idx in symbol_signals.index if getattr(idx, "date", lambda: idx)() <= target_date]
        if not valid_index:
            results[symbol_upper] = False
            continue
        latest_idx = max(valid_index)
        results[symbol_upper] = bool(symbol_signals.loc[latest_idx])
    return results


def evaluate_for_backtest(
    criteria_tree: dict[str, Any],
    ohlcv_with_indicators: pd.DataFrame,
) -> pd.Series:
    return evaluate_criteria_to_signals(ohlcv_with_indicators, criteria_tree)
