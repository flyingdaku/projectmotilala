from __future__ import annotations

from datetime import date, timedelta

import numpy as np
import pandas as pd

from compute.criteria_eval import evaluate_criteria_to_signals


def _fixture_df() -> pd.DataFrame:
    dates = [date(2024, 1, 1) + timedelta(days=i) for i in range(10)]
    rows = []
    for symbol in ["A", "B", "C"]:
        for idx, day in enumerate(dates):
            rows.append(
                {
                    "symbol": symbol,
                    "date": day,
                    "close": 100 + idx,
                    "rsi_14": 50.0,
                    "sma_50": 100.0,
                    "sma_200": 100.0,
                    "volume": 1000 + idx,
                }
            )
    frame = pd.DataFrame(rows).set_index(["symbol", "date"]).sort_index()
    return frame


def test_evaluate_criteria_to_signals_when_simple_less_than_then_only_matching_row_is_true() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 6)
    df.loc[("A", target_day), "rsi_14"] = 25.0
    criteria = {"operator": "AND", "rules": [{"field": "rsi_14", "op": "<", "value": 30}]}
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is True
    assert int(result.sum()) == 1


def test_evaluate_criteria_to_signals_when_field_vs_field_then_compares_columns() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 3)
    df.loc[("A", target_day), ["close", "sma_200"]] = [105.0, 100.0]
    df.loc[("B", target_day), ["close", "sma_200"]] = [95.0, 100.0]
    criteria = {"operator": "AND", "rules": [{"field": "close", "op": ">", "value_field": "sma_200"}]}
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is True
    assert bool(result.loc[("B", target_day)]) is False


def test_evaluate_criteria_to_signals_when_and_operator_then_requires_both_conditions() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 4)
    df.loc[("A", target_day), ["rsi_14", "close", "sma_200"]] = [25.0, 110.0, 100.0]
    df.loc[("B", target_day), ["rsi_14", "close", "sma_200"]] = [25.0, 90.0, 100.0]
    criteria = {
        "operator": "AND",
        "rules": [
            {"field": "rsi_14", "op": "<", "value": 30},
            {"field": "close", "op": ">", "value_field": "sma_200"},
        ],
    }
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is True
    assert bool(result.loc[("B", target_day)]) is False


def test_evaluate_criteria_to_signals_when_or_operator_then_accepts_either_condition() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 5)
    df.loc[("A", target_day), "rsi_14"] = 25.0
    df.loc[("B", target_day), ["close", "sma_200"]] = [110.0, 100.0]
    criteria = {
        "operator": "OR",
        "rules": [
            {"field": "rsi_14", "op": "<", "value": 30},
            {"field": "close", "op": ">", "value_field": "sma_200"},
        ],
    }
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is True
    assert bool(result.loc[("B", target_day)]) is True


def test_evaluate_criteria_to_signals_when_nested_groups_then_subtrees_evaluate_correctly() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 6)
    df.loc[("A", target_day), ["rsi_14", "close", "sma_50"]] = [75.0, 110.0, 100.0]
    df.loc[("B", target_day), ["rsi_14", "close", "sma_50"]] = [25.0, 95.0, 100.0]
    criteria = {
        "operator": "AND",
        "rules": [
            {
                "operator": "OR",
                "rules": [
                    {"field": "rsi_14", "op": "<", "value": 30},
                    {"field": "rsi_14", "op": ">", "value": 70},
                ],
            },
            {"field": "close", "op": ">", "value_field": "sma_50"},
        ],
    }
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is True
    assert bool(result.loc[("B", target_day)]) is False


def test_evaluate_criteria_to_signals_when_nan_values_then_comparison_returns_false() -> None:
    df = _fixture_df()
    target_day = date(2024, 1, 7)
    df.loc[("A", target_day), "rsi_14"] = np.nan
    criteria = {"operator": "AND", "rules": [{"field": "rsi_14", "op": "<", "value": 30}]}
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", target_day)]) is False


def test_evaluate_criteria_to_signals_when_crosses_above_then_only_crossing_day_is_true() -> None:
    df = _fixture_df()
    day4 = date(2024, 1, 4)
    day5 = date(2024, 1, 5)
    day6 = date(2024, 1, 6)
    df.loc[("A", day4), ["close", "sma_50"]] = [99.0, 100.0]
    df.loc[("A", day5), ["close", "sma_50"]] = [101.0, 100.0]
    df.loc[("A", day6), ["close", "sma_50"]] = [103.0, 100.0]
    criteria = {"operator": "AND", "rules": [{"field": "close", "op": "crosses_above", "value_field": "sma_50"}]}
    result = evaluate_criteria_to_signals(df, criteria)
    assert bool(result.loc[("A", day4)]) is False
    assert bool(result.loc[("A", day5)]) is True
    assert bool(result.loc[("A", day6)]) is False
