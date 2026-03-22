from __future__ import annotations

import asyncio
import json
from concurrent.futures import ProcessPoolExecutor
from datetime import UTC, date, datetime, timedelta
from typing import Any, Callable

from fastapi import APIRouter, HTTPException, Query, Request, status

from adapters.stocks import StocksAdapter
from compute.correlations import (
    compute_autocorrelations,
    compute_correlation_matrix,
    compute_factor_attribution,
)
from core.cache import cached, make_cache_key
from core.db import get_pg, get_ts
from core.rate_limit import limiter


router = APIRouter(prefix="/api/analytics", tags=["analytics"])
stocks_adapter = StocksAdapter()


def _parse_period_to_start(period: str) -> date:
    normalized = (period or "1y").strip().lower()
    if not normalized:
        normalized = "1y"
    unit = normalized[-1]
    try:
        value = int(normalized[:-1])
    except ValueError as exc:
        raise HTTPException(status_code=422, detail="Invalid period") from exc

    today = datetime.now(UTC).date()
    if unit == "d":
        return today - timedelta(days=value)
    if unit == "w":
        return today - timedelta(weeks=value)
    if unit == "m":
        return today - timedelta(days=value * 30)
    if unit == "y":
        return today - timedelta(days=value * 365)
    raise HTTPException(status_code=422, detail="Invalid period")


def _parse_symbols(raw: str | None, minimum: int, maximum: int) -> list[str]:
    if not raw:
        raise HTTPException(status_code=422, detail="Assets are required")
    symbols = [item.strip().upper() for item in raw.split(",") if item.strip()]
    if len(symbols) < minimum:
        raise HTTPException(status_code=422, detail=f"At least {minimum} assets are required")
    if len(symbols) > maximum:
        raise HTTPException(status_code=422, detail=f"At most {maximum} assets are allowed")
    return symbols


def _parse_lags(raw_lags: str | None, max_lag: int | None) -> list[int]:
    if raw_lags:
        lags = [int(item.strip()) for item in raw_lags.split(",") if item.strip()]
    else:
        upper = max_lag or 10
        lags = list(range(1, upper + 1))
    cleaned = sorted({lag for lag in lags if lag > 0})
    if not cleaned:
        raise HTTPException(status_code=422, detail="At least one positive lag is required")
    return cleaned


async def _run_cpu_bound(
    request: Request,
    fn: Callable[..., Any],
    *args: Any,
) -> Any:
    loop = asyncio.get_running_loop()
    pool: ProcessPoolExecutor = request.app.state.process_pool
    return await loop.run_in_executor(pool, fn, *args)


async def _resolve_symbols(symbols: list[str]) -> tuple[dict[str, dict], list[str]]:
    async with get_pg() as conn:
        resolved = await stocks_adapter.resolve_many_by_symbol(conn, symbols)
    missing = [symbol for symbol in symbols if symbol not in resolved]
    return resolved, missing


async def _fetch_prices_for_assets(
    asset_map: dict[str, dict],
    start_date: date,
) -> tuple[dict[str, dict[str, float]], dict[str, list[float]], dict[str, list[str]], dict[str, int]]:
    asset_ids = [str(item["id"]) for item in asset_map.values()]
    if not asset_ids:
        return {}, {}, {}, {}

    async with get_ts() as conn:
        rows = await conn.fetch(
            """
            SELECT asset_id, date, close, source_exchange
            FROM daily_prices
            WHERE asset_id = ANY($1::text[])
              AND date >= $2
            ORDER BY asset_id ASC, date ASC
            """,
            asset_ids,
            start_date,
        )

    symbol_by_asset_id = {str(item["id"]): symbol for symbol, item in asset_map.items()}
    price_data: dict[str, dict[str, float]] = {symbol: {} for symbol in asset_map}

    for row in rows:
        item = dict(row)
        symbol = symbol_by_asset_id.get(str(item["asset_id"]))
        if symbol is None:
            continue
        date_key = item["date"].isoformat() if hasattr(item["date"], "isoformat") else str(item["date"])
        existing = price_data[symbol].get(date_key)
        close = float(item["close"])
        if existing is None or item["source_exchange"] == "NSE":
            price_data[symbol][date_key] = close

    price_map = {symbol: [value for _, value in sorted(dates.items())] for symbol, dates in price_data.items()}
    dates_map = {symbol: [day for day, _ in sorted(dates.items())] for symbol, dates in price_data.items()}
    counts = {symbol: len(values) for symbol, values in price_map.items()}
    return price_data, price_map, dates_map, counts


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "analytics"}


@router.get("/correlations")
@limiter.limit("20/minute")
async def correlations(
    request: Request,
    assets: str | None = Query(default=None),
    symbols: str | None = Query(default=None),
    period: str = Query(default="3y"),
    method: str = Query(default="pearson"),
) -> dict[str, Any]:
    symbol_list = _parse_symbols(symbols or assets, minimum=2, maximum=20)
    resolved_period = period
    resolved_method = method.lower()

    async def _fetch_correlations() -> dict[str, Any]:
        resolved, missing = await _resolve_symbols(symbol_list)

        if len(resolved) == 0:
            raise HTTPException(status_code=404, detail="No valid symbols found")

        start_date = _parse_period_to_start(resolved_period)
        price_data, price_map, dates_map, counts = await _fetch_prices_for_assets(resolved, start_date)

        valid_symbols = [symbol for symbol in symbol_list if counts.get(symbol, 0) >= 30]
        if len(valid_symbols) < 2:
            raise HTTPException(status_code=422, detail="Insufficient price history (< 30 days)")

        compute_input_price_map = {symbol: price_map[symbol] for symbol in valid_symbols}
        compute_input_dates_map = {symbol: dates_map[symbol] for symbol in valid_symbols}
        computed = await _run_cpu_bound(
            request,
            compute_correlation_matrix,
            compute_input_price_map,
            compute_input_dates_map,
            resolved_method,
        )

        matrix_lookup: dict[str, dict[str, float | None]] = {}
        computed_symbols: list[str] = computed["symbols"]
        for i, left_symbol in enumerate(computed_symbols):
            matrix_lookup[left_symbol] = {}
            for j, right_symbol in enumerate(computed_symbols):
                matrix_lookup[left_symbol][right_symbol] = computed["matrix"][i][j]

        matrix: dict[str, dict[str, float]] = {}
        for left_symbol in symbol_list:
            matrix[left_symbol] = {}
            for right_symbol in symbol_list:
                if left_symbol == right_symbol:
                    matrix[left_symbol][right_symbol] = 1.0
                else:
                    value = matrix_lookup.get(left_symbol, {}).get(right_symbol)
                    matrix[left_symbol][right_symbol] = float(value) if value is not None else 0.0

        return {
            "matrix": matrix,
            "assets": symbol_list,
            "priceData": {symbol: price_data.get(symbol, {}) for symbol in symbol_list},
            **({"warnings": [f"{symbol}: not found" for symbol in missing]} if missing else {}),
        }

    return await cached(
        "correlations",
        make_cache_key(symbol_list, resolved_period, resolved_method),
        300,
        _fetch_correlations,
    )


@router.get("/autocorrelations")
@limiter.limit("20/minute")
async def autocorrelations(
    request: Request,
    assets: str | None = Query(default=None),
    symbols: str | None = Query(default=None),
    period: str = Query(default="3y"),
    maxLag: int | None = Query(default=10),
    lags: str | None = Query(default=None),
) -> dict[str, Any]:
    symbol_list = _parse_symbols(symbols or assets, minimum=1, maximum=10)
    resolved_period = period
    lag_values = _parse_lags(lags, maxLag)

    async def _fetch_autocorrelations() -> dict[str, Any]:
        resolved, missing = await _resolve_symbols(symbol_list)
        if len(resolved) == 0:
            raise HTTPException(status_code=404, detail="No valid symbols found")

        start_date = _parse_period_to_start(resolved_period)
        _, price_map, _, counts = await _fetch_prices_for_assets(resolved, start_date)

        valid_symbols = [symbol for symbol in symbol_list if counts.get(symbol, 0) >= 30]
        if len(valid_symbols) == 0:
            raise HTTPException(status_code=422, detail="Insufficient price history (< 30 days)")

        tasks = [
            _run_cpu_bound(request, compute_autocorrelations, price_map[symbol], lag_values)
            for symbol in valid_symbols
        ]
        computed_results = await asyncio.gather(*tasks)

        results: dict[str, list[float | None]] = {}
        for symbol, computed in zip(valid_symbols, computed_results, strict=True):
            results[symbol] = [computed.get(lag) for lag in lag_values]

        for symbol in symbol_list:
            if symbol not in results:
                results[symbol] = [None for _ in lag_values]

        payload: dict[str, Any] = {"results": results, "assets": symbol_list}
        if lags:
            payload["lags"] = lag_values
        if missing:
            payload["warnings"] = [f"{symbol}: not found" for symbol in missing]
        return payload

    return await cached(
        "autocorrelations",
        make_cache_key(symbol_list, resolved_period, lag_values),
        300,
        _fetch_autocorrelations,
    )


async def _handle_factor_attribution(
    request: Request,
    holdings: list[dict[str, Any]],
) -> dict[str, Any]:
    if not isinstance(holdings, list) or len(holdings) == 0:
        raise HTTPException(status_code=400, detail="holdings[] required")

    cleaned_holdings = []
    total_weight = 0.0
    for item in holdings:
        symbol = str(item.get("symbol", "")).strip().upper()
        weight = float(item.get("weight", 0) or 0)
        if not symbol:
            continue
        cleaned_holdings.append({"symbol": symbol, "weight": weight})
        total_weight += weight

    if total_weight <= 0:
        raise HTTPException(status_code=400, detail="holdings weights must sum to > 0")

    symbols = [item["symbol"] for item in cleaned_holdings]
    resolved, missing = await _resolve_symbols(symbols)
    if len(resolved) == 0:
        raise HTTPException(status_code=404, detail="No valid symbols found")

    asset_ids = [str(item["id"]) for item in resolved.values()]
    async with get_pg() as conn:
        rows = await conn.fetch(
            """
            SELECT asset_id,
                   pe_ttm,
                   pb,
                   roe,
                   roce,
                   market_cap_cr,
                   revenue_growth_1y,
                   pat_growth_1y,
                   debt_equity,
                   dividend_yield,
                   ev_ebitda
            FROM computed_ratios
            WHERE asset_id = ANY($1::text[])
            """,
            asset_ids,
        )

    factor_rows = {str(row["asset_id"]): dict(row) for row in rows}
    enriched_holdings: list[dict[str, Any]] = []
    lines: list[dict[str, Any]] = []

    for item in cleaned_holdings:
        normalized_weight = item["weight"] / total_weight
        resolved_asset = resolved.get(item["symbol"])
        if resolved_asset is None:
            lines.append(
                {
                    "symbol": item["symbol"],
                    "weight": normalized_weight,
                    "alpha": None,
                    "marketBeta": None,
                    "smbLoading": None,
                    "hmlLoading": None,
                    "wmlLoading": None,
                    "rSquared": None,
                    "sampleSize": None,
                    "error": "Not found",
                    "factorScores": {},
                }
            )
            continue

        raw_factors = factor_rows.get(str(resolved_asset["id"]), {})
        factor_scores = {
            "peTtm": raw_factors.get("pe_ttm"),
            "pb": raw_factors.get("pb"),
            "roe": raw_factors.get("roe"),
            "roce": raw_factors.get("roce"),
            "marketCapCr": raw_factors.get("market_cap_cr"),
            "revenueGrowth1y": raw_factors.get("revenue_growth_1y"),
            "patGrowth1y": raw_factors.get("pat_growth_1y"),
            "debtEquity": raw_factors.get("debt_equity"),
            "dividendYield": raw_factors.get("dividend_yield"),
            "evEbitda": raw_factors.get("ev_ebitda"),
        }

        enriched_holdings.append(
            {
                "symbol": item["symbol"],
                "weight": normalized_weight,
                "factor_scores": factor_scores,
            }
        )

        lines.append(
            {
                "symbol": item["symbol"],
                "weight": normalized_weight,
                "alpha": None,
                "marketBeta": None,
                "smbLoading": None,
                "hmlLoading": None,
                "wmlLoading": None,
                "rSquared": None,
                "sampleSize": None,
                "factorScores": factor_scores,
            }
        )

    computed = await _run_cpu_bound(request, compute_factor_attribution, enriched_holdings)
    covered_weight = round(sum(item["weight"] for item in enriched_holdings if any(v is not None for v in item["factor_scores"].values())), 4)

    return {
        "portfolio": {
            "alpha": 0.0,
            "marketBeta": 0.0,
            "smbLoading": 0.0,
            "hmlLoading": 0.0,
            "wmlLoading": 0.0,
            "avgRSquared": 0.0,
            "coveredWeight": covered_weight,
            "holdingCount": len(lines),
            "factorScores": computed,
        },
        "holdings": lines,
        **({"meta": {"warnings": [f"{symbol}: not found" for symbol in missing]}} if missing else {}),
    }


@router.get("/factor-attribution")
async def factor_attribution_get(
    request: Request,
    holdings: str = Query(...),
) -> dict[str, Any]:
    try:
        parsed = json.loads(holdings)
    except json.JSONDecodeError:
        parsed = [
            {"symbol": symbol.strip().upper(), "weight": 1.0}
            for symbol in holdings.split(",")
            if symbol.strip()
        ]
    return await _handle_factor_attribution(request, parsed)


@router.post("/factor-attribution")
async def factor_attribution_post(request: Request) -> dict[str, Any]:
    body = await request.json()
    return await _handle_factor_attribution(request, body.get("holdings", []))
