from __future__ import annotations

import asyncio
import sys
from datetime import UTC, datetime, timedelta
from decimal import Decimal
import secrets
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Body, Depends, HTTPException, Query, Request, Response, status
from pydantic import BaseModel, ConfigDict, Field

from compute.criteria_eval import evaluate_for_screener
from compute.indicators import compute_all_indicators, extract_required_indicators
from compute.screener_dsl import validate_dsl_formula
from core.auth import get_optional_user_id, get_user_id
from core.cache import cached
from core.db import get_pg, get_ts
from core.rate_limit import limiter
from models.backtest import (
    PRIORITIZE_METRICS,
    BacktestRun,
    BacktestStrategy,
    BacktestStrategyBase,
    CreateStrategyRequest,
    RunBacktestRequest,
    ShareResponse,
    TradeLogQueryParams,
    UpdateStrategyRequest,
)


router = APIRouter(prefix="/api/backtest", tags=["backtest"])
criteria_router = APIRouter(tags=["criteria"])

BENCHMARKS = [
    {"key": "NIFTY50", "label": "NIFTY 50"},
    {"key": "NIFTY100", "label": "NIFTY 100"},
    {"key": "NIFTY200", "label": "NIFTY 200"},
    {"key": "NIFTY500", "label": "NIFTY 500"},
    {"key": "SENSEX", "label": "BSE SENSEX"},
    {"key": "BANKNIFTY", "label": "NIFTY Bank"},
]

UNIVERSES = [
    {"key": "NIFTY50", "label": "NIFTY 50"},
    {"key": "NIFTY100", "label": "NIFTY 100"},
    {"key": "NIFTY200", "label": "NIFTY 200"},
    {"key": "NIFTY500", "label": "NIFTY 500"},
    {"key": "CUSTOM", "label": "Custom Universe"},
]

POPULAR_STRATEGIES = [
    {
        "name": "NIFTY 500 Momentum",
        "description": "Trend-following basket that stays with strong names above long-term trend.",
        "entry_criteria_summary": "close > sma200 AND rsi14 > 50",
        "default_params": {"stop_loss": 8, "take_profit": 20, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "Oversold Value",
        "description": "Looks for fundamentally cheaper names during technical washouts.",
        "entry_criteria_summary": "rsi14 < 30 AND pe < 20 AND market_cap > 500Cr",
        "default_params": {"stop_loss": 6, "take_profit": 18, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "52-Week Breakout",
        "description": "Breakout model for strong trend continuation with participation confirmation.",
        "entry_criteria_summary": "close == week52_high AND volume > avg_volume * 1.5",
        "default_params": {"stop_loss": 7, "take_profit": 25, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "Golden Cross",
        "description": "Classic medium-term trend turn signal using moving-average crossovers.",
        "entry_criteria_summary": "sma50 crosses above sma200",
        "default_params": {"stop_loss": 8, "take_profit": 18, "period": "10y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "Mean Reversion (RSI-2)",
        "description": "Short-horizon pullback model inside larger uptrends.",
        "entry_criteria_summary": "rsi2 < 10 AND close > sma200",
        "default_params": {"stop_loss": 4, "take_profit": 8, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "MACD Momentum",
        "description": "Momentum continuation with trend filter and MACD confirmation.",
        "entry_criteria_summary": "macd crosses signal AND close > sma50",
        "default_params": {"stop_loss": 7, "take_profit": 16, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "Earnings Momentum",
        "description": "Growth-biased setup leaning on strong revenue acceleration and price confirmation.",
        "entry_criteria_summary": "revenue_growth > 20% AND close > sma50",
        "default_params": {"stop_loss": 8, "take_profit": 18, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
    {
        "name": "Low Volatility",
        "description": "Prefers steadier compounders with healthy profitability and muted range expansion.",
        "entry_criteria_summary": "norm_atr14 < 2 AND roe > 15",
        "default_params": {"stop_loss": 5, "take_profit": 14, "period": "5y"},
        "clone_label": "Clone to My Backtests",
    },
]

TRADE_SORT_FIELDS = {
    "entry_date",
    "exit_date",
    "symbol",
    "net_pnl",
    "net_pnl_pct",
    "duration_days",
    "gross_pnl",
    "trade_value",
}


class FormulaValidationRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    formula: str = Field(..., min_length=1)


class CriteriaEvalRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    criteria: dict[str, Any]
    symbols: list[str]
    as_of_date: str
    lookback_days: int = Field(default=300, ge=30, le=1000)
    mode: str = Field(default="screener")


def _evaluate_criteria_job(
    criteria: dict[str, Any],
    symbols: list[str],
    as_of_date: str,
    lookback_days: int,
    ohlcv_records: list[dict[str, Any]],
    indicators: list[str],
) -> dict[str, Any]:
    from compute.simulation import build_dataframes

    df = build_dataframes(ohlcv_records)
    if indicators:
        df = compute_all_indicators(df, set(indicators))
    results = evaluate_for_screener(criteria, symbols, as_of_date, lookback_days, df)
    insufficient = 0
    for symbol in symbols:
        try:
            symbol_rows = df.xs(symbol, level=0)
            if len(symbol_rows) < 30:
                insufficient += 1
        except Exception:
            insufficient += 1
    return {
        "results": results,
        "symbols_excluded_insufficient_data": insufficient,
    }


class CloneResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    strategy: BacktestStrategy


def _to_float(value: Any) -> Any:
    if isinstance(value, Decimal):
        return float(value)
    return value


def _normalize_row(row: dict[str, Any]) -> dict[str, Any]:
    return {key: _to_float(value) for key, value in row.items()}


def _parse_snapshot(snapshot: dict[str, Any]) -> BacktestStrategy:
    return BacktestStrategy(**snapshot)


def _parse_run(row: dict[str, Any], include_equity_curve: bool) -> BacktestRun:
    snapshot = row.get("strategy_snapshot") or {}
    if row.get("metrics") is None:
        metrics = None
    else:
        metrics = row["metrics"]
    equity_curve = row.get("equity_curve") if include_equity_curve else None
    return BacktestRun(
        id=row["id"],
        strategy_id=row["strategy_id"],
        user_id=row["user_id"],
        share_slug=row.get("share_slug"),
        status=row["status"],
        progress=int(row.get("progress", 0) or 0),
        started_at=row.get("started_at"),
        completed_at=row.get("completed_at"),
        error_msg=row.get("error_msg"),
        strategy_snapshot=_parse_snapshot(snapshot),
        metrics=metrics,
        equity_curve=equity_curve,
        monthly_returns=row.get("monthly_returns"),
        created_at=row["created_at"],
    )


async def _get_strategy_row(strategy_id: str) -> dict[str, Any] | None:
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            SELECT *
            FROM backtest_strategies
            WHERE id = $1
            """,
            strategy_id,
        )
    return _normalize_row(dict(row)) if row is not None else None


async def _ensure_owned_strategy(strategy_id: str, user_id: str) -> dict[str, Any]:
    row = await _get_strategy_row(strategy_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    if row["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return row


async def _ensure_strategy_for_run(payload: RunBacktestRequest, user_id: str) -> dict[str, Any]:
    if payload.strategy_id:
        return await _ensure_owned_strategy(payload.strategy_id, user_id)

    if payload.strategy is None:
        raise HTTPException(status_code=422, detail="Strategy payload required")

    now = datetime.now(UTC)
    strategy_id = str(uuid4())
    strategy_data = payload.strategy.model_dump(mode="json")
    tags = list(strategy_data.get("tags") or [])
    if "__adhoc__" not in tags:
        tags.append("__adhoc__")
    strategy_data["tags"] = tags

    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO backtest_strategies (
                id, user_id, name, position_type, entry_criteria, entry_criteria_mode, entry_screen_id,
                entry_exec_model, entry_exec_params, entry_limit_to, entry_prioritize, exit_criteria,
                exit_criteria_mode, exit_screen_id, exit_exec_model, exit_limit_to, unit, stop_loss,
                trailing_stop, take_profit, close_after_bars, close_at_end_of, initial_capital,
                capital_at_risk, risk_unit, portfolio_max_size, commission, commission_unit,
                bid_ask_spread, period_start, period_end, benchmark, universe, custom_universe,
                include_delisted, circuit_breaker_compliance, liquidity_min_value, cost_config,
                tax_config, grouping_icon, tags, is_public, is_template, created_at, updated_at
            ) VALUES (
                $1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::jsonb,$10,$11::jsonb,$12::jsonb,$13,$14,$15,$16,
                $17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,
                $38::jsonb,$39::jsonb,$40,$41,$42,$43,$44,$45
            )
            RETURNING *
            """,
            strategy_id,
            user_id,
            strategy_data["name"],
            strategy_data["position_type"],
            strategy_data.get("entry_criteria"),
            strategy_data["entry_criteria_mode"],
            strategy_data.get("entry_screen_id"),
            strategy_data["entry_exec_model"],
            strategy_data.get("entry_exec_params"),
            strategy_data.get("entry_limit_to"),
            strategy_data.get("entry_prioritize"),
            strategy_data.get("exit_criteria"),
            strategy_data["exit_criteria_mode"],
            strategy_data.get("exit_screen_id"),
            strategy_data["exit_exec_model"],
            strategy_data.get("exit_limit_to"),
            strategy_data["unit"],
            strategy_data.get("stop_loss"),
            strategy_data.get("trailing_stop"),
            strategy_data.get("take_profit"),
            strategy_data.get("close_after_bars"),
            strategy_data.get("close_at_end_of"),
            strategy_data["initial_capital"],
            strategy_data["capital_at_risk"],
            strategy_data["risk_unit"],
            strategy_data["portfolio_max_size"],
            strategy_data["commission"],
            strategy_data["commission_unit"],
            strategy_data["bid_ask_spread"],
            strategy_data["period_start"],
            strategy_data["period_end"],
            strategy_data["benchmark"],
            strategy_data["universe"],
            strategy_data.get("custom_universe"),
            strategy_data["include_delisted"],
            strategy_data["circuit_breaker_compliance"],
            strategy_data["liquidity_min_value"],
            strategy_data["cost_config"],
            strategy_data["tax_config"],
            strategy_data.get("grouping_icon"),
            strategy_data.get("tags"),
            False,
            False,
            now,
            now,
        )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to create ad-hoc strategy")
    return _normalize_row(dict(row))


async def _get_run_row(run_id: str) -> dict[str, Any] | None:
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            SELECT *
            FROM backtest_runs
            WHERE id = $1
            """,
            run_id,
        )
    return _normalize_row(dict(row)) if row is not None else None


async def _ensure_run_access(run_id: str, user_id: str | None) -> dict[str, Any]:
    row = await _get_run_row(run_id)
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    if row.get("share_slug"):
        return row
    if user_id is None:
        raise HTTPException(status_code=401, detail="Missing authentication token")
    if row["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return row


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "backtest"}


@router.post("/strategies", status_code=status.HTTP_201_CREATED)
async def create_strategy(
    payload: CreateStrategyRequest,
    user_id: str = Depends(get_user_id),
) -> BacktestStrategy:
    now = datetime.now(UTC)
    data = payload.model_dump(mode="json")
    strategy_id = str(uuid4())
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO backtest_strategies (
                id, user_id, name, position_type, entry_criteria, entry_criteria_mode, entry_screen_id,
                entry_exec_model, entry_exec_params, entry_limit_to, entry_prioritize, exit_criteria,
                exit_criteria_mode, exit_screen_id, exit_exec_model, exit_limit_to, unit, stop_loss,
                trailing_stop, take_profit, close_after_bars, close_at_end_of, initial_capital,
                capital_at_risk, risk_unit, portfolio_max_size, commission, commission_unit,
                bid_ask_spread, period_start, period_end, benchmark, universe, custom_universe,
                include_delisted, circuit_breaker_compliance, liquidity_min_value, cost_config,
                tax_config, grouping_icon, tags, is_public, is_template, created_at, updated_at
            ) VALUES (
                $1,$2,$3,$4,$5::jsonb,$6,$7,$8,$9::jsonb,$10,$11::jsonb,$12::jsonb,$13,$14,$15,$16,
                $17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,
                $38::jsonb,$39::jsonb,$40,$41,$42,$43,$44,$45
            )
            RETURNING *
            """,
            strategy_id,
            user_id,
            data["name"],
            data["position_type"],
            data.get("entry_criteria"),
            data["entry_criteria_mode"],
            data.get("entry_screen_id"),
            data["entry_exec_model"],
            data.get("entry_exec_params"),
            data.get("entry_limit_to"),
            data.get("entry_prioritize"),
            data.get("exit_criteria"),
            data["exit_criteria_mode"],
            data.get("exit_screen_id"),
            data["exit_exec_model"],
            data.get("exit_limit_to"),
            data["unit"],
            data.get("stop_loss"),
            data.get("trailing_stop"),
            data.get("take_profit"),
            data.get("close_after_bars"),
            data.get("close_at_end_of"),
            data["initial_capital"],
            data["capital_at_risk"],
            data["risk_unit"],
            data["portfolio_max_size"],
            data["commission"],
            data["commission_unit"],
            data["bid_ask_spread"],
            data["period_start"],
            data["period_end"],
            data["benchmark"],
            data["universe"],
            data.get("custom_universe"),
            data["include_delisted"],
            data["circuit_breaker_compliance"],
            data["liquidity_min_value"],
            data["cost_config"],
            data["tax_config"],
            data.get("grouping_icon"),
            data.get("tags"),
            data["is_public"],
            data["is_template"],
            now,
            now,
        )
    if row is None:
        raise HTTPException(status_code=500, detail="Failed to create strategy")
    return BacktestStrategy(**_normalize_row(dict(row)))


@router.get("/strategies")
async def list_strategies(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    user_id: str = Depends(get_user_id),
) -> dict[str, Any]:
    offset = (page - 1) * page_size
    async with get_pg() as conn:
        total_row, rows = await asyncio.gather(
            conn.fetchrow(
                """
                SELECT COUNT(*) AS total
                FROM backtest_strategies
                WHERE user_id = $1
                  AND NOT ('__adhoc__' = ANY(COALESCE(tags, ARRAY[]::text[])))
                """,
                user_id,
            ),
            conn.fetch(
                """
                SELECT *
                FROM backtest_strategies
                WHERE user_id = $1
                  AND NOT ('__adhoc__' = ANY(COALESCE(tags, ARRAY[]::text[])))
                ORDER BY updated_at DESC, created_at DESC
                LIMIT $2 OFFSET $3
                """,
                user_id,
                page_size,
                offset,
            ),
        )
    strategies = [BacktestStrategy(**_normalize_row(dict(row))) for row in rows]
    total = int(total_row["total"] if total_row is not None else 0)
    return {
        "strategies": strategies,
        "total": total,
        "page": page,
        "page_size": page_size,
        "has_more": offset + len(strategies) < total,
    }


@router.get("/strategies/{strategy_id}")
async def get_strategy(strategy_id: str, user_id: str = Depends(get_user_id)) -> BacktestStrategy:
    return BacktestStrategy(**await _ensure_owned_strategy(strategy_id, user_id))


@router.put("/strategies/{strategy_id}")
async def update_strategy(
    strategy_id: str,
    payload: UpdateStrategyRequest,
    user_id: str = Depends(get_user_id),
) -> BacktestStrategy:
    await _ensure_owned_strategy(strategy_id, user_id)
    data = payload.model_dump(mode="json")
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            UPDATE backtest_strategies SET
                name = $3,
                position_type = $4,
                entry_criteria = $5::jsonb,
                entry_criteria_mode = $6,
                entry_screen_id = $7,
                entry_exec_model = $8,
                entry_exec_params = $9::jsonb,
                entry_limit_to = $10,
                entry_prioritize = $11::jsonb,
                exit_criteria = $12::jsonb,
                exit_criteria_mode = $13,
                exit_screen_id = $14,
                exit_exec_model = $15,
                exit_limit_to = $16,
                unit = $17,
                stop_loss = $18,
                trailing_stop = $19,
                take_profit = $20,
                close_after_bars = $21,
                close_at_end_of = $22,
                initial_capital = $23,
                capital_at_risk = $24,
                risk_unit = $25,
                portfolio_max_size = $26,
                commission = $27,
                commission_unit = $28,
                bid_ask_spread = $29,
                period_start = $30,
                period_end = $31,
                benchmark = $32,
                universe = $33,
                custom_universe = $34,
                include_delisted = $35,
                circuit_breaker_compliance = $36,
                liquidity_min_value = $37,
                cost_config = $38::jsonb,
                tax_config = $39::jsonb,
                grouping_icon = $40,
                tags = $41,
                is_public = $42,
                is_template = $43
            WHERE id = $1 AND user_id = $2
            RETURNING *
            """,
            strategy_id,
            user_id,
            data["name"],
            data["position_type"],
            data.get("entry_criteria"),
            data["entry_criteria_mode"],
            data.get("entry_screen_id"),
            data["entry_exec_model"],
            data.get("entry_exec_params"),
            data.get("entry_limit_to"),
            data.get("entry_prioritize"),
            data.get("exit_criteria"),
            data["exit_criteria_mode"],
            data.get("exit_screen_id"),
            data["exit_exec_model"],
            data.get("exit_limit_to"),
            data["unit"],
            data.get("stop_loss"),
            data.get("trailing_stop"),
            data.get("take_profit"),
            data.get("close_after_bars"),
            data.get("close_at_end_of"),
            data["initial_capital"],
            data["capital_at_risk"],
            data["risk_unit"],
            data["portfolio_max_size"],
            data["commission"],
            data["commission_unit"],
            data["bid_ask_spread"],
            data["period_start"],
            data["period_end"],
            data["benchmark"],
            data["universe"],
            data.get("custom_universe"),
            data["include_delisted"],
            data["circuit_breaker_compliance"],
            data["liquidity_min_value"],
            data["cost_config"],
            data["tax_config"],
            data.get("grouping_icon"),
            data.get("tags"),
            data["is_public"],
            data["is_template"],
        )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    return BacktestStrategy(**_normalize_row(dict(row)))


@router.delete("/strategies/{strategy_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_strategy(strategy_id: str, user_id: str = Depends(get_user_id)) -> Response:
    await _ensure_owned_strategy(strategy_id, user_id)
    async with get_pg() as conn:
        run_rows = await conn.fetch("SELECT id FROM backtest_runs WHERE strategy_id = $1", strategy_id)
        run_ids = [str(row["id"]) for row in run_rows]
    if run_ids:
        async with get_ts() as ts_conn:
            await ts_conn.execute("DELETE FROM backtest_trades WHERE run_id = ANY($1)", run_ids)
    async with get_pg() as conn:
        async with conn.transaction():
            await conn.execute("DELETE FROM backtest_jobs WHERE run_id IN (SELECT id FROM backtest_runs WHERE strategy_id = $1)", strategy_id)
            await conn.execute("DELETE FROM backtest_runs WHERE strategy_id = $1", strategy_id)
            await conn.execute("DELETE FROM backtest_strategies WHERE id = $1 AND user_id = $2", strategy_id, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/strategies/{strategy_id}/clone", status_code=status.HTTP_201_CREATED)
async def clone_strategy(strategy_id: str, user_id: str = Depends(get_user_id)) -> CloneResponse:
    original = await _ensure_owned_strategy(strategy_id, user_id)
    clone_id = str(uuid4())
    now = datetime.now(UTC)
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            INSERT INTO backtest_strategies (
                id, user_id, name, position_type, entry_criteria, entry_criteria_mode, entry_screen_id,
                entry_exec_model, entry_exec_params, entry_limit_to, entry_prioritize, exit_criteria,
                exit_criteria_mode, exit_screen_id, exit_exec_model, exit_limit_to, unit, stop_loss,
                trailing_stop, take_profit, close_after_bars, close_at_end_of, initial_capital,
                capital_at_risk, risk_unit, portfolio_max_size, commission, commission_unit,
                bid_ask_spread, period_start, period_end, benchmark, universe, custom_universe,
                include_delisted, circuit_breaker_compliance, liquidity_min_value, cost_config,
                tax_config, grouping_icon, tags, is_public, is_template, created_at, updated_at
            )
            SELECT
                $1, user_id, $2, position_type, entry_criteria, entry_criteria_mode, entry_screen_id,
                entry_exec_model, entry_exec_params, entry_limit_to, entry_prioritize, exit_criteria,
                exit_criteria_mode, exit_screen_id, exit_exec_model, exit_limit_to, unit, stop_loss,
                trailing_stop, take_profit, close_after_bars, close_at_end_of, initial_capital,
                capital_at_risk, risk_unit, portfolio_max_size, commission, commission_unit,
                bid_ask_spread, period_start, period_end, benchmark, universe, custom_universe,
                include_delisted, circuit_breaker_compliance, liquidity_min_value, cost_config,
                tax_config, grouping_icon, tags, FALSE, is_template, $3, $3
            FROM backtest_strategies
            WHERE id = $4 AND user_id = $5
            RETURNING *
            """,
            clone_id,
            f"{original['name']} (Copy)",
            now,
            strategy_id,
            user_id,
        )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    return CloneResponse(strategy=BacktestStrategy(**_normalize_row(dict(row))))


@router.post("/run", status_code=status.HTTP_202_ACCEPTED)
@limiter.limit("5/minute", key_func=lambda req: req.headers.get("Authorization", "anon")[:40])
async def run_backtest(request: Request, payload: RunBacktestRequest, user_id: str = Depends(get_user_id)) -> dict[str, str]:
    strategy = await _ensure_strategy_for_run(payload, user_id)
    run_id = str(uuid4())
    strategy_snapshot = dict(strategy)
    async with get_pg() as conn:
        async with conn.transaction():
            await conn.execute(
                """
                INSERT INTO backtest_runs (
                    id, strategy_id, user_id, status, progress, strategy_snapshot
                ) VALUES ($1, $2, $3, 'queued', 0, $4::jsonb)
                """,
                run_id,
                strategy["id"],
                user_id,
                strategy_snapshot,
            )
            await conn.execute(
                """
                INSERT INTO backtest_jobs (run_id)
                VALUES ($1)
                """,
                run_id,
            )
    return {"run_id": run_id, "status": "queued"}


@router.get("/run/{run_id}")
async def get_run(
    run_id: str,
    include_equity_curve: bool = Query(default=False),
    user_id: str | None = Depends(get_optional_user_id),
) -> BacktestRun:
    row = await _ensure_run_access(run_id, user_id)
    if not include_equity_curve:
        row["equity_curve"] = None
    return _parse_run(row, include_equity_curve=include_equity_curve)


@router.get("/run/{run_id}/trades")
async def get_run_trades(
    run_id: str,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=50, ge=1, le=200),
    sort_by: str = Query(default="entry_date"),
    sort_dir: str = Query(default="desc"),
    symbol: str | None = Query(default=None),
    exit_reason: list[str] | None = Query(default=None),
    gains_type: str | None = Query(default=None),
    pnl_filter: str = Query(default="all"),
    user_id: str | None = Depends(get_optional_user_id),
) -> dict[str, Any]:
    await _ensure_run_access(run_id, user_id)
    sort_field = sort_by if sort_by in TRADE_SORT_FIELDS else "entry_date"
    sort_direction = "ASC" if sort_dir.lower() == "asc" else "DESC"
    offset = (page - 1) * page_size

    where_clauses = ["run_id = $1"]
    params: list[Any] = [run_id]
    if symbol:
        params.append(f"%{symbol.upper()}%")
        where_clauses.append(f"symbol ILIKE ${len(params)}")
    if exit_reason:
        params.append(exit_reason)
        where_clauses.append(f"exit_reason = ANY(${len(params)}::text[])")
    if gains_type:
        params.append(gains_type)
        where_clauses.append(f"gains_type = ${len(params)}")
    if pnl_filter == "positive":
        where_clauses.append("net_pnl > 0")
    elif pnl_filter == "negative":
        where_clauses.append("net_pnl < 0")
    where_sql = " AND ".join(where_clauses)

    async with get_ts() as conn:
        count_task = conn.fetchrow(f"SELECT COUNT(*) AS total FROM backtest_trades WHERE {where_sql}", *params)
        trade_params = [*params, page_size, offset]
        rows_task = conn.fetch(
            f"""
            SELECT *
            FROM backtest_trades
            WHERE {where_sql}
            ORDER BY {sort_field} {sort_direction}
            LIMIT ${len(params) + 1}
            OFFSET ${len(params) + 2}
            """,
            *trade_params,
        )
        count_row, rows = await asyncio.gather(count_task, rows_task)

    trades = [_normalize_row(dict(row)) for row in rows]
    total = int(count_row["total"] if count_row is not None else 0)
    return {
        "trades": trades,
        "total": total,
        "page": page,
        "page_size": page_size,
        "has_more": offset + len(trades) < total,
    }


@router.post("/run/{run_id}/share")
async def share_run(
    run_id: str,
    request: Request,
    user_id: str = Depends(get_user_id),
) -> ShareResponse:
    run = await _ensure_run_access(run_id, user_id)
    if run["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    slug = run.get("share_slug")
    if not slug:
        slug = secrets.token_urlsafe(6)[:8]
        async with get_pg() as conn:
            await conn.execute(
                """
                UPDATE backtest_runs
                SET share_slug = $2
                WHERE id = $1 AND user_id = $3
                """,
                run_id,
                slug,
                user_id,
            )
    base_url = str(request.base_url).rstrip("/")
    return ShareResponse(url=f"{base_url}/api/backtest/share/{slug}", slug=slug)


@router.get("/share/{slug}")
async def get_shared_run(slug: str) -> BacktestRun:
    async with get_pg() as conn:
        row = await conn.fetchrow(
            """
            SELECT *
            FROM backtest_runs
            WHERE share_slug = $1
            """,
            slug,
        )
    if row is None:
        raise HTTPException(status_code=404, detail="Not found")
    data = _normalize_row(dict(row))
    data["equity_curve"] = None
    return _parse_run(data, include_equity_curve=False)


@router.get("/meta/benchmarks")
async def list_benchmarks() -> list[dict[str, str]]:
    return await cached("backtest_meta", "benchmarks", sys.maxsize, lambda: asyncio.sleep(0, result=BENCHMARKS))


@router.get("/meta/universes")
async def list_universes() -> list[dict[str, str]]:
    return await cached("backtest_meta", "universes", sys.maxsize, lambda: asyncio.sleep(0, result=UNIVERSES))


@router.get("/meta/prioritize-metrics")
async def list_prioritize_metrics() -> list[dict[str, str]]:
    return await cached(
        "backtest_meta",
        "prioritize_metrics",
        sys.maxsize,
        lambda: asyncio.sleep(
            0,
            result=[{"key": metric, "label": metric.replace("_", " ").title()} for metric in sorted(PRIORITIZE_METRICS)],
        ),
    )


@router.get("/popular")
async def popular_strategies() -> list[dict[str, Any]]:
    return await cached("backtest_popular", "popular", 3600, lambda: asyncio.sleep(0, result=POPULAR_STRATEGIES))


@router.post("/validate-formula")
@limiter.limit("60/minute")
async def validate_formula(request: Request, payload: FormulaValidationRequest) -> dict[str, Any]:
    valid, error = validate_dsl_formula(payload.formula)
    return {"valid": valid, "error": error}


@criteria_router.post("/api/evaluate-criteria")
async def evaluate_criteria(request: Request, payload: CriteriaEvalRequest = Body(...)) -> dict[str, Any]:
    indicators = sorted(extract_required_indicators(payload.criteria))
    symbols = [symbol.upper() for symbol in payload.symbols]
    start_date = datetime.fromisoformat(payload.as_of_date).date() - timedelta(days=payload.lookback_days)
    end_date = datetime.fromisoformat(payload.as_of_date).date()

    async with get_pg() as pg_conn:
        asset_rows = await pg_conn.fetch(
            """
            SELECT id, COALESCE(nse_symbol, bse_code) AS symbol
            FROM assets
            WHERE UPPER(COALESCE(nse_symbol, bse_code)) = ANY($1)
            """,
            symbols,
        )
    asset_map = {str(row["id"]): str(row["symbol"]).upper() for row in asset_rows}
    if not asset_map:
        return {
            "results": {},
            "computed_at": datetime.now(UTC).isoformat(),
            "indicators_used": indicators,
            "symbols_evaluated": 0,
            "symbols_excluded_insufficient_data": len(symbols),
        }

    async with get_ts() as ts_conn:
        rows = await ts_conn.fetch(
            """
            SELECT asset_id, date::date, open::float, high::float, low::float, close::float, volume::bigint
            FROM daily_prices
            WHERE asset_id = ANY($1)
              AND date BETWEEN $2 AND $3
            ORDER BY asset_id, date
            """,
            list(asset_map.keys()),
            start_date,
            end_date,
        )

    ohlcv_records = [
        {
            "symbol": asset_map[str(row["asset_id"])],
            "date": row["date"],
            "open": float(row["open"] or 0),
            "high": float(row["high"] or 0),
            "low": float(row["low"] or 0),
            "close": float(row["close"] or 0),
            "volume": int(row["volume"] or 0),
        }
        for row in rows
    ]

    loop = asyncio.get_running_loop()
    process_pool = request.app.state.process_pool
    evaluation = await loop.run_in_executor(
        process_pool,
        _evaluate_criteria_job,
        payload.criteria,
        symbols,
        payload.as_of_date,
        payload.lookback_days,
        ohlcv_records,
        indicators,
    )

    return {
        "results": evaluation["results"],
        "computed_at": datetime.now(UTC).isoformat(),
        "indicators_used": indicators,
        "symbols_evaluated": len(evaluation["results"]),
        "symbols_excluded_insufficient_data": evaluation["symbols_excluded_insufficient_data"],
    }
