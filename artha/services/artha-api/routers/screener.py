from __future__ import annotations

import asyncio
from concurrent.futures import ProcessPoolExecutor
import logging
import re
import time
from typing import Any

from fastapi import APIRouter, HTTPException, Query, Request, status

from compute.screener_dsl import DslParseError, FIELD_MAP, INDIA_INDICES, parse_dsl_formula, validate_dsl_formula
from core.cache import cached
from core.db import get_pg
from core.rate_limit import limiter
from models.screener import (
    FormulaValidationResponse,
    RangeFilter,
    ScreenerFilters,
    ScreenerMetaResponse,
    ScreenerPageInfo,
    ScreenerRunRequest,
    ScreenerRunResponse,
)


router = APIRouter(prefix="/api/screener", tags=["screener"])
logger = logging.getLogger("artha_api.screener")
_META_CACHE: dict[str, Any] = {"value": None, "ts": 0.0}

MCAP_BUCKETS: dict[str, dict[str, float]] = {
    "large": {"min": 20000},
    "mid": {"min": 5000, "max": 20000},
    "small": {"min": 500, "max": 5000},
    "micro": {"max": 500},
}

SORT_FIELD_MAP: dict[str, str] = {
    "marketCapCr": "cr.market_cap_cr",
    "pe": "cr.pe_ttm",
    "pb": "cr.pb",
    "evEbitda": "cr.ev_ebitda",
    "dividendYield": "cr.dividend_yield",
    "roce": "cr.roce",
    "roe": "cr.roe",
    "patMargin": "cr.pat_margin",
    "operatingMargin": "cr.operating_margin",
    "revenueGrowth1y": "cr.revenue_growth_1y",
    "patGrowth1y": "cr.pat_growth_1y",
    "epsGrowth1y": "cr.eps_growth_1y",
    "debtEquity": "cr.debt_equity",
    "qualityScore": "cr.quality_score",
    "price": "ti.close",
    "pctChange": "ti.change_1d_pct",
    "rsi14": "ti.rsi_14",
    "pctFrom52wHigh": "ti.pct_from_52w_high",
    "sma20": "ti.sma_20",
    "sma50": "ti.sma_50",
    "sma200": "ti.sma_200",
}

RANGE_COLUMN_MAP: dict[str, str] = {
    "marketCapCr": "cr.market_cap_cr",
    "peTtm": "cr.pe_ttm",
    "pb": "cr.pb",
    "evEbitda": "cr.ev_ebitda",
    "dividendYield": "cr.dividend_yield",
    "roce": "cr.roce",
    "roe": "cr.roe",
    "patMargin": "cr.pat_margin",
    "operatingMargin": "cr.operating_margin",
    "revenueGrowth1y": "cr.revenue_growth_1y",
    "revenueGrowth3y": "cr.revenue_growth_3y",
    "patGrowth1y": "cr.pat_growth_1y",
    "epsGrowth1y": "cr.eps_growth_1y",
    "debtEquity": "cr.debt_equity",
    "interestCoverage": "cr.interest_coverage",
    "currentRatio": "cr.current_ratio",
    "qualityScore": "cr.quality_score",
    "rsi14": "ti.rsi_14",
    "pctFrom52wHigh": "ti.pct_from_52w_high",
    "pctFrom52wLow": "ti.pct_from_52w_low",
    "ffBeta": "ff.market_beta",
    "ffSmb": "ff.smb_loading",
    "ffHml": "ff.hml_loading",
    "ffWml": "ff.wml_loading",
    "ffAlpha": "ff.alpha",
    "ffRSquared": "ff.r_squared",
}


def _apply_range(column: str, value: RangeFilter | None, where: list[str], params: list[object]) -> None:
    if value is None:
        return
    if value.min is not None:
        params.append(value.min)
        where.append(f"{column} >= ${len(params)}")
    if value.max is not None:
        params.append(value.max)
        where.append(f"{column} <= ${len(params)}")


def _compile_formula_worker(formula: str) -> tuple[str, list[object]]:
    formula_params: list[object] = []
    sql = parse_dsl_formula(formula, formula_params)
    return sql, formula_params


async def _run_formula_in_pool(request: Request, formula: str) -> tuple[str, list[object]]:
    loop = asyncio.get_running_loop()
    pool: ProcessPoolExecutor = request.app.state.process_pool
    return await loop.run_in_executor(pool, _compile_formula_worker, formula)


def _base_filters_from_body(body: ScreenerRunRequest) -> ScreenerFilters:
    filters = body.filters or ScreenerFilters()
    if body.limit is not None:
        filters.limit = body.limit
    if body.offset is not None:
        filters.offset = body.offset
    return filters


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "screener"}


@router.get("/meta", response_model=ScreenerMetaResponse)
async def meta() -> ScreenerMetaResponse:
    async def _fetch_meta() -> ScreenerMetaResponse:
        async with get_pg() as sector_conn:
            sector_rows = await sector_conn.fetch(
                """
                SELECT DISTINCT sector
                FROM assets
                WHERE is_active = 1
                  AND asset_class = 'EQUITY'
                  AND sector IS NOT NULL
                  AND sector != ''
                ORDER BY sector ASC
                """
            )
        async with get_pg() as index_conn:
            index_rows = await index_conn.fetch(
                """
                SELECT DISTINCT a.name
                FROM index_constituents ic
                JOIN assets a ON a.id = ic.index_id
                ORDER BY a.name ASC
                """
            )

        sectors = [str(row["sector"]) for row in sector_rows]
        db_index_names = {str(row["name"]) for row in index_rows}
        indices = [
            {"value": key, "label": name}
            for key, name in INDIA_INDICES.items()
            if name in db_index_names
        ]
        return ScreenerMetaResponse(sectors=sectors, indices=indices)

    return await cached("screener_meta", "meta", 1800, _fetch_meta)


@router.get("/validate-formula", response_model=FormulaValidationResponse)
@limiter.limit("60/minute")
async def validate_formula(request: Request, formula: str = Query(..., min_length=1)) -> FormulaValidationResponse:
    is_valid, error = validate_dsl_formula(formula)
    return FormulaValidationResponse(valid=is_valid, error=error)


@router.post("/run", response_model=ScreenerRunResponse)
@limiter.limit("30/minute")
async def run_screener(request: Request, body: ScreenerRunRequest) -> ScreenerRunResponse:
    filters = _base_filters_from_body(body)
    where: list[str] = ["a.is_active = 1"]
    params: list[object] = []

    if filters.assetClass:
        mapped = [value.upper() for value in filters.assetClass]
        params.append(mapped)
        where.append(f"a.asset_class = ANY(${len(params)}::text[])")
    else:
        where.append("a.asset_class = 'EQUITY'")

    if filters.sector:
        params.append(filters.sector)
        where.append(f"a.sector = ANY(${len(params)}::text[])")

    if filters.indexMembership:
        index_names = [INDIA_INDICES.get(value.lower(), value) for value in filters.indexMembership]
        if index_names:
            params.append(index_names)
            where.append(
                """
                a.id IN (
                  SELECT ic.asset_id
                  FROM index_constituents ic
                  JOIN assets idx_a ON idx_a.id = ic.index_id
                  WHERE idx_a.name = ANY($%d::text[])
                    AND ic.date = (
                      SELECT MAX(ic2.date)
                      FROM index_constituents ic2
                      WHERE ic2.index_id = ic.index_id
                    )
                )
                """
                % len(params)
            )

    if filters.marketCapBucket:
        bucket_clauses: list[str] = []
        for bucket in filters.marketCapBucket:
            bounds = MCAP_BUCKETS.get(bucket.lower())
            if bounds is None:
                continue
            bucket_parts: list[str] = []
            if "min" in bounds:
                params.append(bounds["min"])
                bucket_parts.append(f"cr.market_cap_cr >= ${len(params)}")
            if "max" in bounds:
                params.append(bounds["max"])
                bucket_parts.append(f"cr.market_cap_cr < ${len(params)}")
            if bucket_parts:
                bucket_clauses.append(f"({' AND '.join(bucket_parts)})")
        if bucket_clauses:
            where.append(f"({' OR '.join(bucket_clauses)})")

    for field_name, column in RANGE_COLUMN_MAP.items():
        _apply_range(column, getattr(filters, field_name), where, params)

    if filters.query:
        params.append(f"%{filters.query.strip()}%")
        where.append(f"(a.name ILIKE ${len(params)} OR a.nse_symbol ILIKE ${len(params)})")

    if filters.formula:
        for formula in filters.formula:
            if not formula or not formula.strip():
                continue
            try:
                fragment, fragment_params = await _run_formula_in_pool(request, formula.strip())
            except DslParseError as exc:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc
            except ValueError as exc:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc
            if fragment:
                offset = len(params)
                remapped_fragment = fragment
                for idx, value in enumerate(fragment_params, start=1):
                    params.append(value)
                    remapped_fragment = re_placeholder_replace(remapped_fragment, idx, len(params))
                where.append(f"({remapped_fragment})")

    sort_sql = "cr.market_cap_cr"
    sort_dir = "DESC"
    if filters.sort:
        field_key = filters.sort.field
        sort_sql = SORT_FIELD_MAP.get(field_key) or FIELD_MAP.get(field_key.lower()) or sort_sql
        sort_dir = "DESC" if filters.sort.desc else "ASC"

    base_sql = f"""
      FROM assets a
      LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
      LEFT JOIN technical_indicators ti ON ti.asset_id = a.id
      LEFT JOIN LATERAL (
        SELECT
          NULL::double precision AS market_beta,
          NULL::double precision AS smb_loading,
          NULL::double precision AS hml_loading,
          NULL::double precision AS wml_loading,
          NULL::double precision AS alpha,
          NULL::double precision AS r_squared
      ) ff ON TRUE
      WHERE {' AND '.join(where)}
    """

    data_params = list(params)
    data_params.append(filters.limit)
    limit_placeholder = f"${len(data_params)}"
    data_params.append(filters.offset)
    offset_placeholder = f"${len(data_params)}"

    data_sql = f"""
      SELECT
        a.id,
        a.nse_symbol         AS symbol,
        a.name,
        a.sector,
        a.industry_group     AS "industryGroup",
        a.asset_class        AS "assetClass",
        cr.market_cap_cr     AS "marketCapCr",
        cr.pe_ttm            AS pe,
        cr.pb,
        cr.ev_ebitda         AS "evEbitda",
        cr.dividend_yield    AS "dividendYield",
        cr.roce,
        cr.roe,
        cr.pat_margin        AS "patMargin",
        cr.operating_margin  AS "operatingMargin",
        cr.revenue_growth_1y AS "revenueGrowth1y",
        cr.pat_growth_1y     AS "patGrowth1y",
        cr.eps_growth_1y     AS "epsGrowth1y",
        cr.debt_equity       AS "debtEquity",
        cr.quality_score     AS "qualityScore",
        ti.close             AS price,
        ti.change_1d_pct     AS "pctChange",
        ti.rsi_14            AS rsi14,
        ti.pct_from_52w_high AS "pctFrom52wHigh",
        ti.sma_20            AS sma20,
        ti.sma_50            AS sma50,
        ti.sma_200           AS sma200
      {base_sql}
      ORDER BY {sort_sql} {sort_dir} NULLS LAST
      LIMIT {limit_placeholder}
      OFFSET {offset_placeholder}
    """

    count_sql = f"SELECT COUNT(*) {base_sql}"

    async with get_pg() as count_conn, get_pg() as data_conn:
        count_row, rows = await asyncio.gather(
            count_conn.fetchrow(count_sql, *params),
            data_conn.fetch(data_sql, *data_params),
        )

    total = int(count_row["count"]) if count_row is not None else 0
    results = [
        {
            "symbol": row["symbol"],
            "name": row["name"],
            "sector": row["sector"],
            "industryGroup": row["industryGroup"],
            "assetClass": row["assetClass"],
            "marketCapCr": row["marketCapCr"],
            "price": row["price"],
            "pctChange": row["pctChange"],
            "pe": row["pe"],
            "pb": row["pb"],
            "evEbitda": row["evEbitda"],
            "dividendYield": row["dividendYield"],
            "roce": row["roce"],
            "roe": row["roe"],
            "patMargin": row["patMargin"],
            "operatingMargin": row["operatingMargin"],
            "revenueGrowth1y": row["revenueGrowth1y"],
            "patGrowth1y": row["patGrowth1y"],
            "epsGrowth1y": row["epsGrowth1y"],
            "debtEquity": row["debtEquity"],
            "qualityScore": row["qualityScore"],
            "rsi14": row["rsi14"],
            "pctFrom52wHigh": row["pctFrom52wHigh"],
            "sma20": row["sma20"],
            "sma50": row["sma50"],
            "sma200": row["sma200"],
        }
        for row in rows
    ]
    page_info = ScreenerPageInfo(
        limit=filters.limit,
        offset=filters.offset,
        has_more=filters.offset + len(results) < total,
    )
    return ScreenerRunResponse(results=results, total=total, page_info=page_info)


def re_placeholder_replace(fragment: str, old_index: int, new_index: int) -> str:
    temp = re.sub(rf"\${old_index}(?![0-9])", f"__TEMP_PH_{new_index}__", fragment)
    return re.sub(r"__TEMP_PH_(\d+)__", r"$\1", temp)
