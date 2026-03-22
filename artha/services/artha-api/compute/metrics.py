from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING, Any

import numpy as np
import pandas as pd

if TYPE_CHECKING:
    from compute.simulation import CompletedTrade


def _empty_metrics(
    equity_curve: list[dict[str, Any]],
    initial_capital: float,
    benchmark_initial: float,
    benchmark_final: float,
) -> dict[str, Any]:
    final_value = equity_curve[-1]["portfolio_value"] if equity_curve else initial_capital
    capital_growth_pct = (final_value / initial_capital - 1) * 100 if initial_capital else 0.0
    benchmark_return_pct = (benchmark_final / benchmark_initial - 1) * 100 if benchmark_initial else 0.0
    if equity_curve and len(equity_curve) >= 2:
        _first = date.fromisoformat(str(equity_curve[0]["date"]))
        _last = date.fromisoformat(str(equity_curve[-1]["date"]))
        _n_years = max((_last - _first).days / 365.25, 1 / 365.25)
    else:
        _n_years = 1.0
    _avg_annual_return = round(capital_growth_pct / _n_years, 4)
    _cagr = round(((final_value / initial_capital) ** (1 / _n_years) - 1) * 100, 4) if initial_capital else 0.0
    return {
        "total_profit_inr": round(final_value - initial_capital, 2),
        "total_profit_pct": round(capital_growth_pct, 4),
        "capital_growth_pct": round(capital_growth_pct, 4),
        "profit_factor": None,
        "payoff_ratio": None,
        "max_drawdown_pct": round(min((point["drawdown_pct"] for point in equity_curve), default=0.0), 4),
        "max_drawdown_inr": 0.0,
        "restoration_factor": None,
        "avg_annual_return_pct": _avg_annual_return,
        "cagr_pct": _cagr,
        "sharpe_ratio": None,
        "sortino_ratio": None,
        "calmar_ratio": None,
        "total_trades": 0,
        "profit_trades": 0,
        "profit_trades_pct": 0.0,
        "avg_trade_duration_days": 0.0,
        "avg_profit_per_trade_pct": 0.0,
        "avg_profit_per_day_pct": 0.0,
        "avg_market_impact": "Minor",
        "viability_score": 0.0,
        "total_taxes_inr": 0.0,
        "total_costs_inr": 0.0,
        "net_profit_after_tax_inr": round(final_value - initial_capital, 2),
        "benchmark_return_pct": round(benchmark_return_pct, 4),
        "alpha_pct": round(-benchmark_return_pct, 4),
        "dividend_income_inr": 0.0,
        "stocks_excluded_liquidity": 0,
        "avg_win_pct": None,
        "avg_loss_pct": None,
        "largest_win_pct": None,
        "largest_loss_pct": None,
        "max_consecutive_wins": None,
        "max_consecutive_losses": None,
    }


def compute_viability_score(m: dict[str, Any]) -> float:
    score = 0.0
    pf = m.get("profit_factor") or 0
    if pf >= 2.0:
        score += 2.0
    elif pf >= 1.5:
        score += 1.5
    elif pf >= 1.0:
        score += 0.5

    wr = m.get("profit_trades_pct") or 0
    if wr >= 60:
        score += 2.0
    elif wr >= 50:
        score += 1.5
    elif wr >= 40:
        score += 0.5

    mdd = abs(m.get("max_drawdown_pct") or 100)
    if mdd <= 10:
        score += 2.0
    elif mdd <= 20:
        score += 1.5
    elif mdd <= 30:
        score += 1.0

    rf = m.get("restoration_factor") or 0
    if rf >= 10:
        score += 2.0
    elif rf >= 5:
        score += 1.5
    elif rf >= 2:
        score += 1.0

    if (m.get("total_trades") or 0) >= 30:
        score += 1.0

    sr = m.get("sharpe_ratio") or 0
    if sr >= 1.5:
        score += 1.0
    elif sr >= 1.0:
        score += 0.5

    return round(score, 1)


def compute_monthly_returns(equity_curve: list[dict[str, Any]]) -> dict[str, dict[str, float | None]]:
    if not equity_curve:
        return {}
    df = pd.DataFrame(equity_curve)
    df["date"] = pd.to_datetime(df["date"])
    df = df.set_index("date")
    monthly = df["portfolio_value"].resample("ME").last()
    monthly_ret = monthly.pct_change() * 100
    result: dict[str, dict[str, float | None]] = {}
    for ts, val in monthly_ret.items():
        year = str(ts.year)
        month = str(ts.month)
        result.setdefault(year, {})[month] = round(float(val), 4) if not pd.isna(val) else None
    return result


def compute_metrics(
    trades: list["CompletedTrade"],
    equity_curve: list[dict[str, Any]],
    initial_capital: float,
    benchmark_initial: float,
    benchmark_final: float,
    symbol_metadata: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    if not trades:
        return _empty_metrics(equity_curve, initial_capital, benchmark_initial, benchmark_final)

    final_value = float(equity_curve[-1]["portfolio_value"]) if equity_curve else initial_capital
    first_date = date.fromisoformat(str(equity_curve[0]["date"]))
    last_date = date.fromisoformat(str(equity_curve[-1]["date"]))
    n_years = max((last_date - first_date).days / 365.25, 1 / 365.25)

    total_profit_inr = sum(float(t.net_pnl) for t in trades)
    total_profit_pct = total_profit_inr / initial_capital * 100 if initial_capital else 0.0
    capital_growth_pct = (final_value / initial_capital - 1) * 100 if initial_capital else 0.0

    winners = [t for t in trades if float(t.gross_pnl) > 0]
    losers = [t for t in trades if float(t.gross_pnl) < 0]

    gross_profit = sum(float(t.gross_pnl) for t in winners)
    gross_loss = abs(sum(float(t.gross_pnl) for t in losers))
    profit_factor = round(gross_profit / gross_loss, 4) if gross_loss > 0 else None

    avg_win = gross_profit / len(winners) if winners else 0.0
    avg_loss = gross_loss / len(losers) if losers else 0.0
    payoff_ratio = round(avg_win / avg_loss, 4) if avg_loss > 0 else None

    max_drawdown_pct = min(float(point["drawdown_pct"]) for point in equity_curve)

    peak = initial_capital
    max_dd_inr = 0.0
    for point in equity_curve:
        value = float(point["portfolio_value"])
        if value > peak:
            peak = value
        drawdown = peak - value
        if drawdown > max_dd_inr:
            max_dd_inr = drawdown

    restoration_factor = round(total_profit_inr / max_dd_inr, 4) if max_dd_inr > 0 else None
    avg_annual_return = round(capital_growth_pct / n_years, 4)
    cagr = round(((final_value / initial_capital) ** (1 / n_years) - 1) * 100, 4) if initial_capital else 0.0

    risk_free_annual = 0.065
    portfolio_values = pd.Series([float(point["portfolio_value"]) for point in equity_curve])
    daily_returns = portfolio_values.pct_change().dropna()

    ann_return = float(daily_returns.mean()) * 252 if not daily_returns.empty else 0.0
    ann_vol = float(daily_returns.std()) * np.sqrt(252) if not daily_returns.empty else 0.0
    sharpe = round((ann_return - risk_free_annual) / ann_vol, 4) if ann_vol > 0 else None

    downside = float(daily_returns[daily_returns < 0].std()) * np.sqrt(252) if not daily_returns.empty else 0.0
    sortino = round((ann_return - risk_free_annual) / downside, 4) if downside > 0 else None
    calmar = round(cagr / abs(max_drawdown_pct), 4) if max_drawdown_pct != 0 else None

    profit_trades_pct = round(len(winners) / len(trades) * 100, 2)
    avg_duration = round(sum(int(t.duration_days) for t in trades) / len(trades), 1)
    avg_profit_trade = round(sum(float(t.net_pnl_pct) for t in trades) / len(trades), 4)
    avg_profit_day = round(total_profit_pct / max((last_date - first_date).days, 1), 4)

    impact_ratios = []
    for trade in trades:
        avg_daily_vol = float(symbol_metadata.get(trade.symbol, {}).get("avg_daily_vol", trade.trade_value or 0) or trade.trade_value or 0)
        denominator = avg_daily_vol if avg_daily_vol > 0 else float(trade.trade_value or 1.0)
        impact_ratios.append(float(trade.trade_value) / denominator)
    avg_impact_ratio = float(np.mean(impact_ratios)) if impact_ratios else 0.0
    if avg_impact_ratio < 0.005:
        market_impact = "Minor"
    elif avg_impact_ratio < 0.02:
        market_impact = "Moderate"
    else:
        market_impact = "Significant"

    avg_win_pct = round(sum(float(t.net_pnl_pct) for t in winners) / len(winners), 4) if winners else None
    avg_loss_pct = round(sum(float(t.net_pnl_pct) for t in losers) / len(losers), 4) if losers else None
    largest_win_pct = round(max(float(t.net_pnl_pct) for t in winners), 4) if winners else None
    largest_loss_pct = round(min(float(t.net_pnl_pct) for t in losers), 4) if losers else None

    sorted_trades = sorted(trades, key=lambda t: t.entry_date)
    flags = [float(t.gross_pnl) > 0 for t in sorted_trades]

    def _max_run(flag_list: list[bool], val: bool) -> int:
        best = cur = 0
        for f in flag_list:
            cur = cur + 1 if f == val else 0
            best = max(best, cur)
        return best

    max_consecutive_wins = _max_run(flags, True)
    max_consecutive_losses = _max_run(flags, False)

    total_costs_inr = sum(float(t.total_costs) for t in trades)
    total_taxes_inr = sum(float(t.tax) for t in trades)
    bm_return = round((benchmark_final / benchmark_initial - 1) * 100, 4) if benchmark_initial > 0 else 0.0
    alpha = round(cagr - bm_return, 4)
    viability = compute_viability_score(
        {
            "profit_factor": profit_factor,
            "profit_trades_pct": profit_trades_pct,
            "max_drawdown_pct": max_drawdown_pct,
            "restoration_factor": restoration_factor,
            "total_trades": len(trades),
            "sharpe_ratio": sharpe,
        }
    )

    return {
        "total_profit_inr": round(total_profit_inr, 2),
        "total_profit_pct": round(total_profit_pct, 4),
        "capital_growth_pct": round(capital_growth_pct, 4),
        "profit_factor": profit_factor,
        "payoff_ratio": payoff_ratio,
        "max_drawdown_pct": round(max_drawdown_pct, 4),
        "max_drawdown_inr": round(max_dd_inr, 2),
        "restoration_factor": restoration_factor,
        "avg_annual_return_pct": avg_annual_return,
        "cagr_pct": cagr,
        "sharpe_ratio": sharpe,
        "sortino_ratio": sortino,
        "calmar_ratio": calmar,
        "total_trades": len(trades),
        "profit_trades": len(winners),
        "profit_trades_pct": profit_trades_pct,
        "avg_trade_duration_days": avg_duration,
        "avg_profit_per_trade_pct": avg_profit_trade,
        "avg_profit_per_day_pct": avg_profit_day,
        "avg_market_impact": market_impact,
        "viability_score": viability,
        "total_taxes_inr": round(total_taxes_inr, 2),
        "total_costs_inr": round(total_costs_inr, 2),
        "net_profit_after_tax_inr": round(total_profit_inr, 2),
        "benchmark_return_pct": bm_return,
        "alpha_pct": alpha,
        "dividend_income_inr": 0.0,
        "stocks_excluded_liquidity": 0,
        "avg_win_pct": avg_win_pct,
        "avg_loss_pct": avg_loss_pct,
        "largest_win_pct": largest_win_pct,
        "largest_loss_pct": largest_loss_pct,
        "max_consecutive_wins": max_consecutive_wins,
        "max_consecutive_losses": max_consecutive_losses,
    }
