from __future__ import annotations

import asyncio
from typing import Any

import numpy as np
import pandas as pd


INDICATOR_ALIAS_MAP: dict[str, str] = {
    "sma20": "sma_20",
    "sma50": "sma_50",
    "sma200": "sma_200",
    "ema20": "ema_20",
    "ema50": "ema_50",
    "rsi14": "rsi_14",
    "rsi2": "rsi_2",
    "rsi3": "rsi_3",
    "macd": "macd_line",
    "signal": "macd_signal",
    "macd_signal": "macd_signal",
    "macd_hist": "macd_hist",
    "atr14": "atr_14",
    "norm_atr14": "norm_atr_14",
    "bb_upper": "bb_upper_20",
    "bb_mid": "bb_mid_20",
    "bb_middle": "bb_mid_20",
    "bb_lower": "bb_lower_20",
    "adx14": "adx_14",
    "stoch_k": "stoch_k",
    "stoch_d": "stoch_d",
    "cci20": "cci_20",
    "roc14": "roc_14",
    "roc2": "roc_2",
    "roc3": "roc_3",
}

PRICE_FIELDS = {"open", "high", "low", "close", "volume"}
SUPPORTED_INDICATORS = {
    "sma_20",
    "sma_50",
    "sma_200",
    "ema_20",
    "ema_50",
    "rsi_14",
    "rsi_2",
    "rsi_3",
    "macd_line",
    "macd_signal",
    "macd_hist",
    "atr_14",
    "bb_upper_20",
    "bb_mid_20",
    "bb_lower_20",
    "norm_atr_14",
    "obv",
    "vwap",
    "adx_14",
    "stoch_k",
    "stoch_d",
    "cci_20",
    "roc_14",
    "roc_2",
    "roc_3",
}


def _safe_float(value: Any) -> float | None:
    if value is None or pd.isna(value):
        return None
    return float(value)


def _build_annual_sync(quarterly: list[dict[str, Any]]) -> list[dict[str, Any]]:
    if not quarterly:
        return []

    frame = pd.DataFrame(quarterly)
    if "periodEnd" not in frame.columns:
        return []

    frame["periodEnd"] = pd.to_datetime(frame["periodEnd"], errors="coerce")
    frame = frame.dropna(subset=["periodEnd"]).copy()
    if frame.empty:
        return []

    frame["fiscalYear"] = frame["periodEnd"].dt.year.where(frame["periodEnd"].dt.month >= 4, frame["periodEnd"].dt.year - 1)

    flow_fields = ["revenue", "ebitda", "operatingProfit", "ebit", "pat", "netProfit", "cfo", "capex", "freeCF", "freeCashFlow", "eps"]
    stock_fields = ["totalAssets", "totalDebt", "totalEquity"]

    annual_rows: list[dict[str, Any]] = []
    grouped = frame.sort_values("periodEnd").groupby("fiscalYear", sort=False)
    for fiscal_year, group in grouped:
        row: dict[str, Any] = {
            "periodEnd": f"{int(fiscal_year) + 1}-03-31",
            "periodType": "ANNUAL",
        }
        for field_name in flow_fields:
            if field_name in group.columns:
                series = pd.to_numeric(group[field_name], errors="coerce")
                row[field_name] = _safe_float(series.sum(min_count=1))
        for field_name in stock_fields:
            if field_name in group.columns:
                series = pd.to_numeric(group[field_name], errors="coerce")
                last_valid = series.dropna()
                row[field_name] = _safe_float(last_valid.iloc[-1]) if not last_valid.empty else None
        annual_rows.append(row)

    annual_rows.sort(key=lambda item: item["periodEnd"], reverse=True)
    return annual_rows[:8]


async def build_annual(quarterly: list[dict[str, Any]]) -> list[dict[str, Any]]:
    loop = asyncio.get_running_loop()
    # Avoid creating a process pool at import time; some sandboxed environments
    # disallow the semaphore checks used by ProcessPoolExecutor construction.
    return await loop.run_in_executor(None, _build_annual_sync, quarterly)


def normalize_indicator_name(name: str) -> str:
    lowered = name.strip().lower()
    return INDICATOR_ALIAS_MAP.get(lowered, lowered)


def compute_sma(series: pd.Series, period: int) -> pd.Series:
    return series.rolling(period, min_periods=period).mean()


def compute_ema(series: pd.Series, period: int) -> pd.Series:
    return series.ewm(span=period, adjust=False, min_periods=period).mean()


def compute_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    avg_loss = loss.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    return 100 - (100 / (1 + rs))


def compute_atr(high: pd.Series, low: pd.Series, close: pd.Series, period: int = 14) -> pd.Series:
    prev_close = close.shift(1)
    true_range = pd.concat(
        [
            high - low,
            (high - prev_close).abs(),
            (low - prev_close).abs(),
        ],
        axis=1,
    ).max(axis=1)
    return true_range.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()


def compute_macd(
    series: pd.Series,
    fast: int = 12,
    slow: int = 26,
    signal: int = 9,
) -> tuple[pd.Series, pd.Series, pd.Series]:
    ema_fast = compute_ema(series, fast)
    ema_slow = compute_ema(series, slow)
    macd_line = ema_fast - ema_slow
    signal_line = macd_line.ewm(span=signal, adjust=False, min_periods=signal).mean()
    hist = macd_line - signal_line
    return macd_line, signal_line, hist


def compute_bollinger_bands(series: pd.Series, period: int = 20, std: float = 2.0) -> tuple[pd.Series, pd.Series, pd.Series]:
    mid = compute_sma(series, period)
    rolling_std = series.rolling(period, min_periods=period).std(ddof=0)
    upper = mid + (rolling_std * std)
    lower = mid - (rolling_std * std)
    return upper, mid, lower


def compute_normalized_atr(high: pd.Series, low: pd.Series, close: pd.Series, period: int = 14) -> pd.Series:
    atr = compute_atr(high, low, close, period)
    return (atr / close.replace(0, np.nan)) * 100


def _compute_obv(close: pd.Series, volume: pd.Series) -> pd.Series:
    direction = np.sign(close.diff().fillna(0))
    return (direction * volume.fillna(0)).cumsum()


def _compute_vwap(group: pd.DataFrame) -> pd.Series:
    typical = (group["high"] + group["low"] + group["close"]) / 3
    cumulative_value = (typical * group["volume"].fillna(0)).cumsum()
    cumulative_volume = group["volume"].fillna(0).cumsum().replace(0, np.nan)
    return cumulative_value / cumulative_volume


def _compute_adx(group: pd.DataFrame, period: int = 14) -> pd.Series:
    high = group["high"]
    low = group["low"]
    close = group["close"]
    up_move = high.diff()
    down_move = -low.diff()
    plus_dm = pd.Series(np.where((up_move > down_move) & (up_move > 0), up_move, 0.0), index=group.index)
    minus_dm = pd.Series(np.where((down_move > up_move) & (down_move > 0), down_move, 0.0), index=group.index)
    atr = compute_atr(high, low, close, period)
    plus_di = 100 * plus_dm.ewm(alpha=1 / period, adjust=False, min_periods=period).mean() / atr.replace(0, np.nan)
    minus_di = 100 * minus_dm.ewm(alpha=1 / period, adjust=False, min_periods=period).mean() / atr.replace(0, np.nan)
    dx = ((plus_di - minus_di).abs() / (plus_di + minus_di).replace(0, np.nan)) * 100
    return dx.ewm(alpha=1 / period, adjust=False, min_periods=period).mean()


def _compute_stochastic(group: pd.DataFrame, period: int = 14, smooth: int = 3) -> tuple[pd.Series, pd.Series]:
    lowest = group["low"].rolling(period, min_periods=period).min()
    highest = group["high"].rolling(period, min_periods=period).max()
    percent_k = ((group["close"] - lowest) / (highest - lowest).replace(0, np.nan)) * 100
    percent_d = percent_k.rolling(smooth, min_periods=smooth).mean()
    return percent_k, percent_d


def _compute_cci(group: pd.DataFrame, period: int = 20) -> pd.Series:
    typical = (group["high"] + group["low"] + group["close"]) / 3
    mean = typical.rolling(period, min_periods=period).mean()
    mad = typical.rolling(period, min_periods=period).apply(lambda values: np.mean(np.abs(values - np.mean(values))), raw=True)
    return (typical - mean) / (0.015 * mad.replace(0, np.nan))


def _compute_group_indicators(group: pd.DataFrame, required: set[str]) -> pd.DataFrame:
    result = group.copy()
    close = result["close"]
    high = result["high"]
    low = result["low"]
    volume = result["volume"].fillna(0)

    if {"sma_20", "sma_50", "sma_200"} & required:
        if "sma_20" in required:
            result["sma_20"] = compute_sma(close, 20)
        if "sma_50" in required:
            result["sma_50"] = compute_sma(close, 50)
        if "sma_200" in required:
            result["sma_200"] = compute_sma(close, 200)

    if {"ema_20", "ema_50"} & required:
        if "ema_20" in required:
            result["ema_20"] = compute_ema(close, 20)
        if "ema_50" in required:
            result["ema_50"] = compute_ema(close, 50)

    if {"rsi_14", "rsi_2", "rsi_3"} & required:
        if "rsi_14" in required:
            result["rsi_14"] = compute_rsi(close, 14)
        if "rsi_2" in required:
            result["rsi_2"] = compute_rsi(close, 2)
        if "rsi_3" in required:
            result["rsi_3"] = compute_rsi(close, 3)

    if {"macd_line", "macd_signal", "macd_hist"} & required:
        macd_line, signal_line, hist = compute_macd(close)
        if "macd_line" in required:
            result["macd_line"] = macd_line
        if "macd_signal" in required:
            result["macd_signal"] = signal_line
        if "macd_hist" in required:
            result["macd_hist"] = hist

    if {"atr_14", "norm_atr_14"} & required:
        atr_14 = compute_atr(high, low, close, 14)
        if "atr_14" in required:
            result["atr_14"] = atr_14
        if "norm_atr_14" in required:
            result["norm_atr_14"] = (atr_14 / close.replace(0, np.nan)) * 100

    if {"bb_upper_20", "bb_mid_20", "bb_lower_20"} & required:
        upper, mid, lower = compute_bollinger_bands(close, 20, 2.0)
        if "bb_upper_20" in required:
            result["bb_upper_20"] = upper
        if "bb_mid_20" in required:
            result["bb_mid_20"] = mid
        if "bb_lower_20" in required:
            result["bb_lower_20"] = lower

    if "obv" in required:
        result["obv"] = _compute_obv(close, volume)
    if "vwap" in required:
        result["vwap"] = _compute_vwap(result)
    if "adx_14" in required:
        result["adx_14"] = _compute_adx(result, 14)
    if {"stoch_k", "stoch_d"} & required:
        stoch_k, stoch_d = _compute_stochastic(result)
        if "stoch_k" in required:
            result["stoch_k"] = stoch_k
        if "stoch_d" in required:
            result["stoch_d"] = stoch_d
    if "cci_20" in required:
        result["cci_20"] = _compute_cci(result, 20)
    if {"roc_14", "roc_2", "roc_3"} & required:
        if "roc_14" in required:
            result["roc_14"] = close.pct_change(14) * 100
        if "roc_2" in required:
            result["roc_2"] = close.pct_change(2) * 100
        if "roc_3" in required:
            result["roc_3"] = close.pct_change(3) * 100
    return result


def compute_all_indicators(ohlcv: pd.DataFrame, required_indicators: set[str]) -> pd.DataFrame:
    if ohlcv.empty or not required_indicators:
        return ohlcv

    normalized = {normalize_indicator_name(name) for name in required_indicators}
    needed = {name for name in normalized if name in SUPPORTED_INDICATORS}
    if not needed:
        return ohlcv

    working = ohlcv.copy()
    if "symbol" not in working.columns:
        working = working.reset_index()
    grouped = working.groupby("symbol", group_keys=False, sort=False)
    computed = grouped.apply(_compute_group_indicators, required=needed)
    computed = computed.set_index(["symbol", "date"]).sort_index()
    return computed


def _extract_fields_from_rule(rule: dict[str, Any], result: set[str]) -> None:
    field = rule.get("field")
    if isinstance(field, str):
        normalized = normalize_indicator_name(field)
        if normalized not in PRICE_FIELDS:
            result.add(normalized)

    value_field = rule.get("value_field")
    if isinstance(value_field, str):
        normalized = normalize_indicator_name(value_field)
        if normalized not in PRICE_FIELDS:
            result.add(normalized)


def extract_required_indicators(criteria_tree: dict[str, Any]) -> set[str]:
    required: set[str] = set()

    def _walk(node: dict[str, Any]) -> None:
        if not isinstance(node, dict):
            return
        if "rules" in node and isinstance(node["rules"], list):
            for child in node["rules"]:
                if isinstance(child, dict):
                    _walk(child)
            return
        _extract_fields_from_rule(node, required)

    _walk(criteria_tree)
    return {name for name in required if name in SUPPORTED_INDICATORS}
