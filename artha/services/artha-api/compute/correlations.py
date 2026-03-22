from __future__ import annotations

from math import log
from typing import Any

import numpy as np
import pandas as pd


def _to_float(value: Any) -> float | None:
    if value is None:
        return None
    try:
        number = float(value)
    except (TypeError, ValueError):
        return None
    if np.isnan(number) or np.isinf(number):
        return None
    return number


def _build_price_frame(
    price_map: dict[str, list[float]],
    dates_map: dict[str, list[str]],
) -> pd.DataFrame:
    series_map: dict[str, pd.Series] = {}
    for symbol, prices in price_map.items():
        dates = dates_map.get(symbol, [])
        if not prices or not dates or len(prices) != len(dates):
            continue
        series = pd.Series(prices, index=pd.Index(dates, name="date"), dtype="float64")
        series = series[~series.index.duplicated(keep="last")]
        series_map[symbol] = series.sort_index()

    if not series_map:
        return pd.DataFrame()

    return pd.DataFrame(series_map).sort_index()


def _to_python_matrix(frame: pd.DataFrame, digits: int = 4) -> list[list[float | None]]:
    matrix: list[list[float | None]] = []
    for row in frame.to_numpy():
        converted_row: list[float | None] = []
        for value in row:
            if pd.isna(value):
                converted_row.append(None)
            else:
                converted_row.append(round(float(value), digits))
        matrix.append(converted_row)
    return matrix


def _to_python_int_matrix(frame: pd.DataFrame) -> list[list[int]]:
    matrix: list[list[int]] = []
    for row in frame.to_numpy():
        matrix.append([int(value) for value in row])
    return matrix


def compute_correlation_matrix(
    price_map: dict[str, list[float]],
    dates_map: dict[str, list[str]],
    method: str = "pearson",
) -> dict[str, Any]:
    symbols = list(price_map.keys())
    price_frame = _build_price_frame(price_map, dates_map)

    if price_frame.empty:
        size = len(symbols)
        return {
            "symbols": symbols,
            "matrix": [[1.0 if i == j else None for j in range(size)] for i in range(size)],
            "overlap_counts": [[0 for _ in range(size)] for _ in range(size)],
            "date_range": {"from": None, "to": None},
            "method": method,
        }

    log_returns = np.log(price_frame / price_frame.shift(1))
    overlap_counts = log_returns.notna().astype(int).T.dot(log_returns.notna().astype(int))

    if method not in {"pearson", "spearman"}:
        method = "pearson"

    corr = log_returns.corr(method=method, min_periods=2)
    for symbol in symbols:
        if symbol in corr.columns and symbol in corr.index:
            corr.loc[symbol, symbol] = 1.0

    aligned_corr = corr.reindex(index=symbols, columns=symbols)
    aligned_overlap = overlap_counts.reindex(index=symbols, columns=symbols, fill_value=0)
    for idx, symbol in enumerate(symbols):
        if symbol in aligned_overlap.index and symbol in aligned_overlap.columns:
            aligned_overlap.iat[idx, idx] = int(log_returns[symbol].notna().sum()) if symbol in log_returns else 0

    date_values = sorted({date for dates in dates_map.values() for date in dates})
    date_range = {
        "from": date_values[0] if date_values else None,
        "to": date_values[-1] if date_values else None,
    }

    return {
        "symbols": symbols,
        "matrix": _to_python_matrix(aligned_corr),
        "overlap_counts": _to_python_int_matrix(aligned_overlap),
        "date_range": date_range,
        "method": method,
    }


def compute_autocorrelations(prices: list[float], lags: list[int]) -> dict[int, float | None]:
    series = pd.Series(prices, dtype="float64")
    log_returns = np.log(series / series.shift(1)).dropna()
    results: dict[int, float | None] = {}

    for lag in lags:
        if lag <= 0 or len(log_returns) <= lag:
            results[int(lag)] = None
            continue
        value = log_returns.autocorr(lag=lag)
        if value is None or pd.isna(value):
            results[int(lag)] = None
        else:
            results[int(lag)] = round(float(value), 4)

    return results


def compute_factor_attribution(holdings: list[dict[str, Any]]) -> dict[str, float | None]:
    factor_names: set[str] = set()
    for holding in holdings:
        factor_scores = holding.get("factor_scores")
        if isinstance(factor_scores, dict):
            factor_names.update(str(key) for key in factor_scores.keys())

    results: dict[str, float | None] = {}
    for factor_name in sorted(factor_names):
        weighted_sum = 0.0
        total_weight = 0.0

        for holding in holdings:
            weight = _to_float(holding.get("weight"))
            factor_scores = holding.get("factor_scores")
            if weight is None or weight <= 0 or not isinstance(factor_scores, dict):
                continue
            value = _to_float(factor_scores.get(factor_name))
            if value is None:
                continue
            weighted_sum += value * weight
            total_weight += weight

        results[factor_name] = round(weighted_sum / total_weight, 4) if total_weight > 0 else None

    return results
