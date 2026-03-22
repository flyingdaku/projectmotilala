from __future__ import annotations

from datetime import date

from compute.costs import (
    calc_entry_cost,
    calc_exit_cost,
    calc_tax,
    calc_trade_result,
    get_fy_year,
)
from models.backtest import TaxConfig


def test_calc_entry_cost_when_standard_delivery_trade_then_matches_manual_formula(cost_config) -> None:
    result = calc_entry_cost(100_000, 20, "inr", cost_config, 0.05)
    expected = 20 + 15 + 0.1 + 3.35 + 3.6 + 25
    assert abs(result - expected) < 0.01


def test_calc_entry_cost_when_percentage_brokerage_then_total_exceeds_brokerage(cost_config) -> None:
    result = calc_entry_cost(100_000, 0.03, "pct", cost_config, 0.05)
    brokerage_only = 30.0
    assert result > brokerage_only
    # 30 brokerage + 15 stamp duty + 0.1 SEBI + 3.35 exchange + 5.4 GST + 25 spread.
    assert abs(result - 78.85) < 0.01


def test_calc_entry_cost_when_zero_brokerage_then_only_regulatory_costs_apply(cost_config) -> None:
    result = calc_entry_cost(100_000, 0, "inr", cost_config, 0.05)
    # No brokerage means GST is also zero because it is applied on brokerage only.
    expected = 15 + 0.1 + 3.35 + 25
    assert abs(result - expected) < 0.01


def test_calc_exit_cost_when_delivery_trade_then_uses_delivery_stt_rate(cost_config) -> None:
    result = calc_exit_cost(100_000, 20, "inr", cost_config, 0.05, is_intraday=False)
    expected = 20 + 100 + 0.1 + 3.35 + 3.6 + 25
    assert abs(result - expected) < 0.01


def test_calc_exit_cost_when_intraday_trade_then_uses_intraday_stt_rate(cost_config) -> None:
    result = calc_exit_cost(100_000, 20, "inr", cost_config, 0.05, is_intraday=True)
    expected = 20 + 25 + 0.1 + 3.35 + 3.6 + 25
    assert abs(result - expected) < 0.01


def test_calc_exit_cost_when_delivery_vs_intraday_then_delivery_cost_is_higher(cost_config) -> None:
    delivery = calc_exit_cost(100_000, 20, "inr", cost_config, 0.05, is_intraday=False)
    intraday = calc_exit_cost(100_000, 20, "inr", cost_config, 0.05, is_intraday=True)
    assert delivery > intraday


def test_calc_tax_when_short_term_gain_then_applies_stcg_rate(tax_config) -> None:
    tax, gains_type = calc_tax(50_000, date(2024, 1, 1), date(2024, 6, 1), tax_config, {})
    assert gains_type == "stcg"
    assert abs(tax - 10_000) < 0.01


def test_calc_tax_when_long_term_gain_below_exemption_then_zero_tax(tax_config) -> None:
    cumulative: dict[int, float] = {}
    tax, gains_type = calc_tax(80_000, date(2023, 1, 1), date(2024, 6, 1), tax_config, cumulative)
    assert gains_type == "ltcg"
    assert abs(tax - 0.0) < 0.01


def test_calc_tax_when_long_term_gain_above_exemption_then_taxes_only_taxable_portion(tax_config) -> None:
    cumulative: dict[int, float] = {}
    tax, gains_type = calc_tax(200_000, date(2023, 1, 1), date(2024, 6, 1), tax_config, cumulative)
    assert gains_type == "ltcg"
    assert abs(tax - 9_375) < 0.01


def test_calc_tax_when_second_ltcg_trade_uses_remaining_exemption_then_partial_tax_applies(tax_config) -> None:
    cumulative: dict[int, float] = {}
    first_tax, _ = calc_tax(80_000, date(2023, 1, 1), date(2024, 6, 1), tax_config, cumulative)
    second_tax, gains_type = calc_tax(80_000, date(2023, 2, 1), date(2024, 7, 1), tax_config, cumulative)
    assert abs(first_tax - 0.0) < 0.01
    assert gains_type == "ltcg"
    assert abs(second_tax - 4_375) < 0.01


def test_calc_tax_when_loss_then_returns_zero_tax(tax_config) -> None:
    tax, gains_type = calc_tax(-5_000, date(2024, 1, 1), date(2024, 6, 1), tax_config, {})
    assert gains_type == "stcg"
    assert abs(tax - 0.0) < 0.01


def test_calc_tax_when_tax_disabled_then_returns_zero_for_any_profit() -> None:
    disabled = TaxConfig(apply_tax=False)
    tax, gains_type = calc_tax(50_000, date(2024, 1, 1), date(2024, 6, 1), disabled, {})
    assert gains_type == "stcg"
    assert abs(tax - 0.0) < 0.01


def test_calc_trade_result_when_profitable_long_trade_then_net_pnl_is_less_than_gross(cost_config, tax_config) -> None:
    result = calc_trade_result(
        symbol="AAA",
        entry_price=100,
        exit_price=120,
        shares=100,
        entry_date=date(2024, 1, 1),
        exit_date=date(2024, 2, 1),
        direction="long",
        commission=20,
        commission_unit="inr",
        cost_config=cost_config,
        bid_ask_spread_pct=0.05,
        tax_config=tax_config,
        cumulative_ltcg_fy={},
    )
    assert abs(result.gross_pnl - 2_000) < 0.01
    assert result.net_pnl < 2_000


def test_calc_trade_result_when_profitable_short_trade_then_gross_pnl_is_positive(cost_config, tax_config) -> None:
    result = calc_trade_result(
        symbol="AAA",
        entry_price=120,
        exit_price=100,
        shares=100,
        entry_date=date(2024, 1, 1),
        exit_date=date(2024, 2, 1),
        direction="short",
        commission=20,
        commission_unit="inr",
        cost_config=cost_config,
        bid_ask_spread_pct=0.05,
        tax_config=tax_config,
        cumulative_ltcg_fy={},
    )
    assert abs(result.gross_pnl - 2_000) < 0.01
    assert result.net_pnl > 0


def test_calc_trade_result_when_losing_long_trade_then_net_pnl_negative_and_tax_zero(cost_config, tax_config) -> None:
    result = calc_trade_result(
        symbol="AAA",
        entry_price=100,
        exit_price=90,
        shares=100,
        entry_date=date(2024, 1, 1),
        exit_date=date(2024, 2, 1),
        direction="long",
        commission=20,
        commission_unit="inr",
        cost_config=cost_config,
        bid_ask_spread_pct=0.05,
        tax_config=tax_config,
        cumulative_ltcg_fy={},
    )
    assert result.net_pnl < 0
    assert abs(result.tax - 0.0) < 0.01


def test_get_fy_year_when_boundary_dates_then_returns_indian_financial_year() -> None:
    assert get_fy_year(date(2024, 4, 1)) == 2024
    assert get_fy_year(date(2024, 3, 31)) == 2023
    assert get_fy_year(date(2024, 1, 15)) == 2023
    assert get_fy_year(date(2024, 12, 31)) == 2024
