from __future__ import annotations

import random

from compute.correlations import compute_autocorrelations, compute_correlation_matrix


def test_compute_correlation_matrix_when_perfect_positive_then_returns_close_to_one() -> None:
    result = compute_correlation_matrix(
        {"A": [100, 101, 102, 103, 104, 105], "B": [200, 202, 204, 206, 208, 210]},
        {"A": [f"2024-01-0{i}" for i in range(1, 7)], "B": [f"2024-01-0{i}" for i in range(1, 7)]},
    )
    assert abs(result["matrix"][0][1] - 1.0) < 0.001


def test_compute_correlation_matrix_when_perfect_negative_then_returns_close_to_minus_one() -> None:
    result = compute_correlation_matrix(
        {"A": [100, 101, 102, 103, 104, 105], "B": [200, 198.02, 196.0598, 194.119202, 192.19799898, 190.2959889902]},
        {"A": [f"2024-01-0{i}" for i in range(1, 7)], "B": [f"2024-01-0{i}" for i in range(1, 7)]},
    )
    assert abs(result["matrix"][0][1] - (-1.0)) < 0.001


def test_compute_correlation_matrix_when_self_correlation_then_diagonal_is_one() -> None:
    result = compute_correlation_matrix(
        {"A": [100, 101, 102, 103], "B": [50, 51, 52, 53]},
        {"A": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"], "B": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"]},
    )
    assert abs(result["matrix"][0][0] - 1.0) < 0.001
    assert abs(result["matrix"][1][1] - 1.0) < 0.001


def test_compute_correlation_matrix_when_same_dates_then_overlap_counts_drop_first_return_row() -> None:
    result = compute_correlation_matrix(
        {"A": [100, 101, 102, 103], "B": [50, 51, 52, 53]},
        {"A": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"], "B": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"]},
    )
    assert result["overlap_counts"][0][1] == 3


def test_compute_autocorrelations_when_random_walk_then_lag_one_is_near_zero() -> None:
    random.seed(7)
    prices = [100.0]
    for _ in range(200):
        prices.append(prices[-1] + random.uniform(-1, 1))
    result = compute_autocorrelations(prices, [1])
    assert abs(result[1]) < 0.25


def test_compute_autocorrelations_when_trending_series_then_lag_one_is_positive() -> None:
    prices = [100 + i * 2 for i in range(40)]
    result = compute_autocorrelations(prices, [1])
    assert result[1] is not None
    assert result[1] > 0


def test_compute_autocorrelations_when_lag_exceeds_history_then_returns_none() -> None:
    prices = [100, 101, 102]
    result = compute_autocorrelations(prices, [5])
    assert result[5] is None


def test_compute_correlation_matrix_when_serialized_then_matrix_values_are_python_floats() -> None:
    result = compute_correlation_matrix(
        {"A": [100, 101, 102, 103], "B": [200, 202, 204, 206]},
        {"A": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"], "B": ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04"]},
    )
    assert type(result["matrix"][0][0]) is float
