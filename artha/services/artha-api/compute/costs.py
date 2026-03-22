from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from typing import Any

from models.backtest import CostConfig


@dataclass(slots=True)
class TradeResult:
    entry_cost: float
    exit_cost: float
    gross_pnl: float
    total_costs: float
    pre_tax_pnl: float
    tax: float
    net_pnl: float
    net_pnl_pct: float
    net_proceeds: float
    gains_type: str


def calc_entry_cost(
    trade_value: float,
    commission: float,
    commission_unit: str,
    cost_config: CostConfig,
    bid_ask_spread_pct: float,
) -> float:
    brokerage = commission if commission_unit == "inr" else trade_value * (commission / 100)
    stamp_duty = trade_value * (cost_config.stamp_duty_buy / 100)
    sebi = trade_value * (cost_config.sebi_charges / 100)
    exchange = trade_value * (cost_config.exchange_charges / 100)
    gst = brokerage * (cost_config.gst_on_brokerage / 100)
    spread_cost = trade_value * (bid_ask_spread_pct / 2 / 100)
    return round(brokerage + stamp_duty + sebi + exchange + gst + spread_cost, 2)


def calc_exit_cost(
    trade_value: float,
    commission: float,
    commission_unit: str,
    cost_config: CostConfig,
    bid_ask_spread_pct: float,
    is_intraday: bool,
) -> float:
    brokerage = commission if commission_unit == "inr" else trade_value * (commission / 100)
    stt_rate = cost_config.stt_intraday_sell if is_intraday else cost_config.stt_delivery_sell
    stt = trade_value * (stt_rate / 100)
    sebi = trade_value * (cost_config.sebi_charges / 100)
    exchange = trade_value * (cost_config.exchange_charges / 100)
    gst = brokerage * (cost_config.gst_on_brokerage / 100)
    spread_cost = trade_value * (bid_ask_spread_pct / 2 / 100)
    return round(brokerage + stt + sebi + exchange + gst + spread_cost, 2)


def get_fy_year(d: date) -> int:
    return d.year if d.month >= 4 else d.year - 1


def calc_tax(
    gross_pnl: float,
    entry_date: date,
    exit_date: date,
    tax_config: Any,
    cumulative_ltcg_fy: dict[int, float],
) -> tuple[float, str]:
    holding_days = (exit_date - entry_date).days
    gains_type = "ltcg" if holding_days >= 365 else "stcg"

    if not getattr(tax_config, "apply_tax", True) or gross_pnl <= 0:
        return 0.0, gains_type

    if gains_type == "ltcg":
        fy_year = get_fy_year(exit_date)
        used_exemption = cumulative_ltcg_fy.get(fy_year, 0.0)
        remaining = max(0.0, float(getattr(tax_config, "ltcg_exemption", 0.0)) - used_exemption)
        taxable = max(0.0, gross_pnl - remaining)
        tax = taxable * (float(getattr(tax_config, "ltcg_rate", 0.0)) / 100)
        cumulative_ltcg_fy[fy_year] = used_exemption + gross_pnl
        return round(tax, 2), gains_type

    tax = gross_pnl * (float(getattr(tax_config, "stcg_rate", 0.0)) / 100)
    return round(tax, 2), gains_type


def calc_trade_result(
    symbol: str,
    entry_price: float,
    exit_price: float,
    shares: int,
    entry_date: date,
    exit_date: date,
    direction: str,
    commission: float,
    commission_unit: str,
    cost_config: CostConfig,
    bid_ask_spread_pct: float,
    tax_config: Any,
    cumulative_ltcg_fy: dict[int, float],
) -> TradeResult:
    entry_value = entry_price * shares
    exit_value = exit_price * shares
    entry_cost = calc_entry_cost(entry_value, commission, commission_unit, cost_config, bid_ask_spread_pct)
    exit_cost = calc_exit_cost(
        exit_value,
        commission,
        commission_unit,
        cost_config,
        bid_ask_spread_pct,
        is_intraday=(entry_date == exit_date),
    )
    if direction == "short":
        gross_pnl = (entry_price - exit_price) * shares
    else:
        gross_pnl = (exit_price - entry_price) * shares
    total_costs = entry_cost + exit_cost
    pre_tax_pnl = gross_pnl - total_costs
    tax, gains_type = calc_tax(pre_tax_pnl, entry_date, exit_date, tax_config, cumulative_ltcg_fy)
    net_pnl = pre_tax_pnl - tax
    net_proceeds = exit_value - exit_cost - tax
    invested = max(entry_value + entry_cost, 1.0)
    net_pnl_pct = (net_pnl / invested) * 100
    return TradeResult(
        entry_cost=round(entry_cost, 2),
        exit_cost=round(exit_cost, 2),
        gross_pnl=round(gross_pnl, 2),
        total_costs=round(total_costs, 2),
        pre_tax_pnl=round(pre_tax_pnl, 2),
        tax=round(tax, 2),
        net_pnl=round(net_pnl, 2),
        net_pnl_pct=round(net_pnl_pct, 4),
        net_proceeds=round(net_proceeds, 2),
        gains_type=gains_type,
    )
