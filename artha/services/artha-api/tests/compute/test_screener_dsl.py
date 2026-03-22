from __future__ import annotations

import pytest

from compute.screener_dsl import DslParseError, parse_dsl_formula, validate_dsl_formula


def test_parse_dsl_formula_when_simple_field_value_then_parameterizes_literal() -> None:
    params: list[object] = []
    result = parse_dsl_formula("rsi14 < 30", params)
    assert result == "ti.rsi_14 < $1"
    assert params == [30.0]


def test_parse_dsl_formula_when_field_vs_field_then_uses_column_names_only() -> None:
    params: list[object] = []
    result = parse_dsl_formula("close > sma200", params)
    assert result == "ti.close > ti.sma_200"
    assert params == []


def test_parse_dsl_formula_when_and_operator_then_output_contains_both_clauses() -> None:
    result = parse_dsl_formula("rsi14 < 30 AND pe < 20", [])
    assert "AND" in result
    assert "ti.rsi_14" in result
    assert "cr.pe_ttm" in result


def test_parse_dsl_formula_when_or_operator_then_output_contains_or() -> None:
    result = parse_dsl_formula("rsi14 < 30 OR rsi14 > 70", [])
    assert "OR" in result


def test_parse_dsl_formula_when_parentheses_present_then_parentheses_are_preserved() -> None:
    result = parse_dsl_formula("(rsi14 < 30 OR close > sma200) AND pe < 20", [])
    assert "(" in result


def test_parse_dsl_formula_when_existing_params_then_new_param_numbering_starts_after_existing() -> None:
    params: list[object] = [99]
    result = parse_dsl_formula("rsi14 < 30 AND pe < 15", params)
    assert "$2" in result
    assert "$3" in result
    assert params == [99, 30.0, 15.0]


def test_parse_dsl_formula_when_unknown_field_then_raises_with_field_name() -> None:
    with pytest.raises(DslParseError) as exc:
        parse_dsl_formula("unknownfield < 30", [])
    assert "unknownfield" in str(exc.value)


def test_parse_dsl_formula_when_sql_injection_attempt_then_raises_parse_error() -> None:
    with pytest.raises(DslParseError):
        parse_dsl_formula("close > 100; DROP TABLE assets;--", [])


def test_validate_dsl_formula_when_valid_then_returns_true_without_error() -> None:
    valid, err = validate_dsl_formula("rsi14 < 30 AND close > sma200")
    assert valid is True
    assert err is None


def test_validate_dsl_formula_when_invalid_then_returns_false_with_error() -> None:
    valid, err = validate_dsl_formula("unknownfield < 30")
    assert valid is False
    assert err is not None
