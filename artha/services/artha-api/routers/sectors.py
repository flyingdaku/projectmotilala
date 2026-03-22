from __future__ import annotations

import asyncio
import re
from concurrent.futures import ProcessPoolExecutor
from typing import Any

from fastapi import APIRouter, Query, Request

from compute.rrg import compute_rrg_data
from core.cache import cached, make_cache_key
from core.db import get_pg
from core.rate_limit import limiter


router = APIRouter(prefix="/api/sectors", tags=["sectors"])

HierarchyLevel = str
Period = str

LEVEL_COLUMNS: dict[HierarchyLevel, str] = {
    "sector": "a.sector",
    "industry_group": "a.industry_group",
    "industry": "a.industry",
    "sub_industry": "a.sub_industry",
}

PARENT_CHAIN: dict[HierarchyLevel, list[str]] = {
    "sector": [],
    "industry_group": ["a.sector"],
    "industry": ["a.sector", "a.industry_group"],
    "sub_industry": ["a.sector", "a.industry_group", "a.industry"],
}


def slugify(value: str) -> str:
    return re.sub(r"(^-+|-+$)", "", re.sub(r"[^a-z0-9]+", "-", value.lower()))


def round_value(value: float | None, digits: int = 2) -> float:
    if value is None:
        return 0.0
    return round(float(value), digits)


def get_momentum_period(period: Period) -> Period:
    mapping = {
        "1D": "1W",
        "1W": "1M",
        "1M": "3M",
        "3M": "6M",
        "6M": "1Y",
        "1Y": "3Y",
        "3Y": "1Y",
    }
    return mapping[period]


def build_where(level: HierarchyLevel, path: str, params: list[str]) -> list[str]:
    where = [
        "a.is_active = 1",
        "a.asset_class = 'EQUITY'",
        f"{LEVEL_COLUMNS[level]} IS NOT NULL",
    ]
    path_segments = [segment.strip() for segment in path.split(",") if segment.strip()]

    for index, column in enumerate(PARENT_CHAIN[level]):
        if index >= len(path_segments):
            break
        params.append(path_segments[index])
        where.append(f"{column} = ${len(params)}")
    return where


async def _run_cpu_bound(request: Request, payload: list[dict[str, Any]]) -> list[dict[str, Any]]:
    loop = asyncio.get_running_loop()
    pool: ProcessPoolExecutor = request.app.state.process_pool
    return await loop.run_in_executor(pool, compute_rrg_data, payload)


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "sectors"}


@router.get("/hierarchy")
@limiter.limit("30/minute")
async def hierarchy(
    request: Request,
    level: HierarchyLevel = Query(default="sector"),
    path: str = Query(default=""),
    period: Period = Query(default="1M"),
) -> dict[str, Any]:
    resolved_level = level if level in LEVEL_COLUMNS else "sector"
    resolved_period = period if period in {"1D", "1W", "1M", "3M", "6M", "1Y", "3Y"} else "1M"

    async def _fetch_hierarchy() -> dict[str, Any]:
        params: list[str] = []
        where = build_where(resolved_level, path, params)
        group_column = LEVEL_COLUMNS[resolved_level]

        async with get_pg() as conn:
            rows = await conn.fetch(
                f"""
                SELECT {group_column} AS name,
                       COUNT(*) AS stock_count,
                       SUM(
                         COALESCE(
                           cr.market_cap_cr,
                           CASE WHEN am.market_cap IS NOT NULL THEN am.market_cap / 10000000.0 END,
                           CASE WHEN m.market_cap IS NOT NULL THEN m.market_cap / 10000000.0 END,
                           0
                         )
                       ) AS market_cap_cr,
                       AVG(COALESCE(cr.pe_ttm, am.pe_ratio, m.pe_ratio)) AS pe,
                       AVG(COALESCE(cr.pb, am.pb_ratio)) AS pb,
                       AVG(am.return_1d) AS return_1d,
                       AVG(am.return_1w) AS return_1w,
                       AVG(am.return_1m) AS return_1m,
                       AVG(am.return_3m) AS return_3m,
                       AVG(am.return_6m) AS return_6m,
                       AVG(am.return_1y) AS return_1y,
                       AVG(am.return_3y) AS return_3y
                FROM assets a
                LEFT JOIN asset_metrics am ON am.asset_id = a.id
                LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
                LEFT JOIN msi_company_data m ON m.asset_id = a.id
                WHERE {" AND ".join(where)}
                GROUP BY {group_column}
                ORDER BY market_cap_cr DESC NULLS LAST, name ASC
                """,
                *params,
            )

        rows_dict = [dict(row) for row in rows]
        total_market_cap_cr = sum(float(row.get("market_cap_cr") or 0.0) for row in rows_dict)

        nodes: list[dict[str, Any]] = []
        for row in rows_dict:
            market_cap_cr = float(row.get("market_cap_cr") or 0.0)
            nodes.append(
                {
                    "id": row["name"],
                    "name": row["name"],
                    "code": slugify(row["name"]),
                    "level": resolved_level,
                    "returns": {
                        "1D": round_value(row.get("return_1d")),
                        "1W": round_value(row.get("return_1w")),
                        "1M": round_value(row.get("return_1m")),
                        "3M": round_value(row.get("return_3m")),
                        "6M": round_value(row.get("return_6m")),
                        "1Y": round_value(row.get("return_1y")),
                        "3Y": round_value(row.get("return_3y")),
                    },
                    "pe": row.get("pe"),
                    "pb": row.get("pb"),
                    "marketCapCr": market_cap_cr,
                    "marketCapPct": round_value((market_cap_cr / total_market_cap_cr) * 100, 1) if total_market_cap_cr > 0 else None,
                    "stockCount": int(row.get("stock_count") or 0),
                }
            )

        benchmark = (
            sum(node["returns"][resolved_period] for node in nodes) / len(nodes)
            if nodes
            else 0.0
        )
        momentum_period = get_momentum_period(resolved_period)
        rrg_seed = [
            {
                "id": node["id"],
                "name": node["name"],
                "rs": node["returns"][resolved_period],
                "rsRatio": round_value(100 + (node["returns"][resolved_period] - benchmark)),
                "rsMomentum": round_value(node["returns"][resolved_period] - node["returns"][momentum_period]),
                "size": node.get("marketCapCr"),
            }
            for node in nodes
            if (node.get("marketCapCr") or 0) > 0
        ]

        rrg_data = await _run_cpu_bound(request, rrg_seed)
        return {
            "nodes": nodes,
            "rrgData": rrg_data,
            "level": resolved_level,
            "path": path,
            "period": resolved_period,
        }

    return await cached(
        "sector_hierarchy",
        make_cache_key(resolved_level, path, resolved_period),
        900,
        _fetch_hierarchy,
    )
