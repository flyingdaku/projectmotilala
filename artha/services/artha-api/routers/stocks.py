from __future__ import annotations

import asyncio
from concurrent.futures import ProcessPoolExecutor
from datetime import UTC, date, datetime, timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Request

from adapters.company import CompanyAdapter
from adapters.follow import FollowAdapter
from adapters.stocks import StocksAdapter
from compute.correlations import compute_correlation_matrix
from core.auth import get_user_id
from core.cache import cached, invalidate, make_cache_key
from core.db import get_pg, get_ts
from core.presentation import build_data_meta, get_coverage, get_dataset_coverage, get_object_coverage
from core.rate_limit import limiter


router = APIRouter(prefix="/api/stocks", tags=["stocks"])
stocks_adapter = StocksAdapter()
company_adapter = CompanyAdapter()
follow_adapter = FollowAdapter()

CATEGORY_MAP: dict[str, list[str]] = {
    "announcements": ["EXCHANGE_ANNOUNCEMENT", "CORPORATE_ACTION"],
    "reports": ["ANNUAL_REPORT", "QUARTERLY_REPORT"],
    "concalls": ["CONCALL_TRANSCRIPT", "CONCALL_AUDIO"],
    "ratings": ["CREDIT_RATING"],
    "presentations": ["INVESTOR_PRESENTATION", "EARNINGS_PRESENTATION"],
}


def _parse_period_to_start(period: str) -> date:
    normalized = (period or "1y").strip().lower()
    mapping = {"1y": 365, "3y": 365 * 3, "5y": 365 * 5}
    days = mapping.get(normalized, 365 * 3)
    return datetime.now(UTC).date() - timedelta(days=days)


def _min_overlap(period: str) -> int:
    if period == "1y":
        return 80
    if period == "5y":
        return 240
    return 160


def _parse_range_dates(range_value: str | None, from_raw: str | None, to_raw: str | None) -> tuple[date, date]:
    today = datetime.now(UTC).date()
    if to_raw:
        to_date = date.fromisoformat(to_raw)
    else:
        to_date = today
    if from_raw:
        from_date = date.fromisoformat(from_raw)
    else:
        years = 5 if range_value == "5y" else 3 if range_value == "3y" else 10 if range_value == "10y" else 1
        from_date = to_date - timedelta(days=years * 365)
    return from_date, to_date


async def _run_cpu_bound(
    request: Request,
    price_map: dict[str, list[float]],
    dates_map: dict[str, list[str]],
    method: str,
) -> dict[str, Any]:
    loop = asyncio.get_running_loop()
    pool: ProcessPoolExecutor = request.app.state.process_pool
    return await loop.run_in_executor(pool, compute_correlation_matrix, price_map, dates_map, method)


async def _get_stock_or_404(symbol: str) -> dict[str, Any]:
    stock = await stocks_adapter.get_by_symbol(symbol.upper())
    if stock is None:
        raise HTTPException(status_code=404, detail="Not found")
    return stock


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "stocks"}


@router.get("/{symbol}/overview")
@limiter.limit("60/minute")
async def overview(request: Request, symbol: str) -> dict[str, Any]:
    normalized_symbol = symbol.upper()

    async def _fetch_overview() -> dict[str, Any]:
        stock = await _get_stock_or_404(normalized_symbol)
        asset_id = str(stock["id"])

        detail, profile, corp_actions, events = await asyncio.gather(
            stocks_adapter.get_detail(asset_id),
            company_adapter.get_profile(asset_id),
            company_adapter.get_corporate_actions(asset_id, 10),
            company_adapter.get_events(asset_id),
        )

        hero_coverage = get_object_coverage(
            detail,
            ["price", "marketCapCr", "pe", "roce", "roe", "avgVolume", "high52w", "low52w"],
        ) if detail else 0.0
        overview_coverage = get_coverage(
            [
                detail.get("sector") if detail else None,
                detail.get("industry") if detail else None,
                profile.get("descriptionShort"),
                profile.get("website"),
                profile.get("foundedYear"),
                profile.get("headquarters"),
                profile.get("employees"),
                profile.get("businessSegments") if profile.get("businessSegments") else None,
                profile.get("indexMemberships") if profile.get("indexMemberships") else None,
            ]
        )

        return {
            "stock": detail,
            "profile": profile,
            "corpActions": corp_actions,
            "events": events,
            "meta": {
                "hero": build_data_meta(
                    {
                        "asOfCandidates": [
                            detail.get("priceDate") if detail else None,
                            events[0]["eventDate"] if events else None,
                            corp_actions[0]["exDate"] if corp_actions else None,
                        ],
                        "coverage": hero_coverage,
                        "status": "delayed" if detail and detail.get("price") is not None else "partial",
                        "note": "Quote and key metrics are delayed.",
                    }
                ),
                "overview": build_data_meta(
                    {
                        "asOfCandidates": [
                            events[0]["eventDate"] if events else None,
                            corp_actions[0]["exDate"] if corp_actions else None,
                            detail.get("listedDate") if detail else None,
                        ],
                        "coverage": overview_coverage,
                        "note": "Business profile combines exchange metadata and enriched reference data.",
                    }
                ),
            },
        }

    return await cached("stock_overview", f"overview:{normalized_symbol}", 120, _fetch_overview)


@router.get("/{symbol}/financials")
@limiter.limit("60/minute")
async def financials(
    request: Request,
    symbol: str,
    consolidated: bool = Query(default=True),
) -> dict[str, Any]:
    normalized_symbol = symbol.upper()

    async def _fetch_financials() -> dict[str, Any]:
        stock = await _get_stock_or_404(normalized_symbol)
        asset_id = str(stock["id"])
        data = await company_adapter.get_financials(asset_id, consolidated=consolidated)
        quarterly = data["quarterly"]
        annual = data["annual"]
        balance_sheet = data["balanceSheet"]
        cash_flow = data["cashFlow"]
        ratios = data["ratios"]

        return {
            "quarterly": quarterly,
            "annual": annual,
            "balanceSheets": balance_sheet,
            "cashFlows": cash_flow,
            "ratios": ratios,
            "anomalies": data["anomalies"],
            "meta": build_data_meta(
                {
                    "asOfCandidates": [
                        quarterly[0].get("periodEnd") if quarterly else None,
                        quarterly[0].get("quarter") if quarterly else None,
                        annual[0].get("periodEnd") if annual else None,
                        balance_sheet[0].get("periodEndDate") if balance_sheet else None,
                        cash_flow[0].get("periodEndDate") if cash_flow else None,
                        ratios[0].get("periodEndDate") if ratios else None,
                    ],
                    "coverage": get_coverage(
                        [
                            quarterly if quarterly else None,
                            annual if annual else None,
                            balance_sheet if balance_sheet else None,
                            cash_flow if cash_flow else None,
                            ratios if ratios else None,
                        ]
                    ),
                    "note": "Financial statements are shown in ₹ Cr unless stated otherwise.",
                    "unitLabel": "₹ Cr unless stated",
                }
            ),
        }

    return await cached(
        "stock_financials",
        f"financials:{normalized_symbol}:{consolidated}",
        600,
        _fetch_financials,
    )


@router.get("/{symbol}/chart")
@limiter.limit("60/minute")
async def chart(
    request: Request,
    symbol: str,
    range: str = Query(default="1y"),
    from_date_raw: str | None = Query(default=None, alias="from"),
    to_date_raw: str | None = Query(default=None, alias="to"),
    interval: str = Query(default="1D"),
    benchmark: str | None = Query(default=None),
) -> dict[str, Any]:
    normalized_symbol = symbol.upper()
    from_date, to_date = _parse_range_dates(range, from_date_raw, to_date_raw)

    async def _fetch_chart() -> dict[str, Any]:
        stock = await _get_stock_or_404(normalized_symbol)
        asset_id = str(stock["id"])

        prices_task = stocks_adapter.get_prices(asset_id, from_date, to_date, interval=interval)
        corp_actions_task = company_adapter.get_corporate_actions(asset_id, 50)

        benchmark_task: asyncio.Future[list[dict[str, Any]]] | None = None
        if benchmark:
            benchmark_stock = await stocks_adapter.get_by_symbol(benchmark.upper())
            if benchmark_stock is not None:
                benchmark_task = asyncio.ensure_future(
                    stocks_adapter.get_prices(str(benchmark_stock["id"]), from_date, to_date, interval=interval)
                )
        else:
            nifty = await stocks_adapter.get_by_symbol("NIFTY50")
            if nifty is not None:
                benchmark_task = asyncio.ensure_future(
                    stocks_adapter.get_prices(str(nifty["id"]), from_date, to_date, interval=interval)
                )

        prices, corp_actions = await asyncio.gather(prices_task, corp_actions_task)
        benchmark_prices = await benchmark_task if benchmark_task is not None else []
        filtered_actions = [
            item for item in corp_actions
            if from_date <= date.fromisoformat(item["exDate"][:10]) <= to_date
        ]
        return {"prices": prices, "corpActions": filtered_actions, "benchmark": benchmark_prices}

    return await cached(
        "stock_chart",
        make_cache_key(normalized_symbol, from_date.isoformat(), to_date.isoformat(), interval, benchmark or ""),
        60,
        _fetch_chart,
    )


@router.get("/{symbol}/peers")
@limiter.limit("60/minute")
async def peers(request: Request, symbol: str) -> dict[str, Any]:
    normalized_symbol = symbol.upper()

    async def _fetch_peers() -> dict[str, Any]:
        stock = await _get_stock_or_404(normalized_symbol)
        peer_rows = await stocks_adapter.get_peers(str(stock["id"]))
        return {
            "peers": peer_rows,
            "meta": build_data_meta(
                {
                    "coverage": get_dataset_coverage(
                        peer_rows,
                        [
                            lambda peer: peer.get("peTtm"),
                            lambda peer: peer.get("pb"),
                            lambda peer: peer.get("roce"),
                            lambda peer: peer.get("roe"),
                            lambda peer: peer.get("marketCapCr"),
                            lambda peer: peer.get("revenueGrowth1y"),
                        ],
                    ),
                    "note": "Peers are ranked using comparable business lines and available metrics.",
                }
            ),
        }

    return await cached("stock_peers", f"peers:{normalized_symbol}", 600, _fetch_peers)


@router.get("/{symbol}/analytics")
async def analytics(symbol: str) -> dict[str, Any]:
    stock = await _get_stock_or_404(symbol)
    data = await company_adapter.get_analytics(str(stock["id"]))
    return {
        **data,
        "meta": build_data_meta(
            {
                "asOfCandidates": [
                    data["ratios"].get("computedDate"),
                    data["ratioHistory"][0].get("computedDate") if data["ratioHistory"] else None,
                    data["factorContext"]["latestSnapshots"][0].get("asOf") if data["factorContext"]["latestSnapshots"] else None,
                    data["factorExposure"]["regressionEndDate"] if data["factorExposure"] else None,
                ],
                "coverage": get_coverage(
                    [
                        data.get("factorExposure"),
                        data["factorContext"]["latestSnapshots"] if data["factorContext"]["latestSnapshots"] else None,
                        data.get("earningsQuality"),
                        data["ratioHistory"] if data["ratioHistory"] else None,
                        data.get("ratios"),
                    ]
                ),
                "note": "Derived ratios and factor exposures use adjusted local market data.",
            }
        ),
    }


@router.get("/{symbol}/ownership")
async def ownership(symbol: str) -> dict[str, Any]:
    stock = await _get_stock_or_404(symbol)
    data = await company_adapter.get_ownership(str(stock["id"]))
    shareholding = data["shareholding"]
    governance = data["governance"]
    return {
        "shareholding": shareholding,
        "governance": governance,
        "meta": build_data_meta(
            {
                "asOfCandidates": [shareholding[0].get("quarterEnd") if shareholding else None, shareholding[0].get("quarter") if shareholding else None],
                "coverage": get_coverage(
                    [
                        shareholding if shareholding else None,
                        governance.get("overallScore") or governance.get("overall"),
                        governance.get("independentDirectorsPct"),
                    ]
                ),
                "note": "Ownership updates are quarterly; governance fields may be partial.",
            }
        ),
    }


@router.get("/{symbol}/documents")
async def documents(
    symbol: str,
    category: str | None = Query(default=None),
    type: str | None = Query(default=None),
) -> dict[str, Any]:
    stock = await _get_stock_or_404(symbol)
    asset_id = str(stock["id"])
    if category and category in CATEGORY_MAP:
        bundles = await asyncio.gather(*[company_adapter.get_documents(asset_id, item) for item in CATEGORY_MAP[category]])
        documents_list = [doc for bundle in bundles for doc in bundle]
        documents_list.sort(key=lambda item: item.get("docDate") or "", reverse=True)
    else:
        documents_list = await company_adapter.get_documents(asset_id, type)

    return {
        "documents": documents_list,
        "meta": build_data_meta(
            {
                "asOfCandidates": [documents_list[0].get("docDate") if documents_list else None],
                "coverage": 1 if documents_list else 0,
                "status": "partial" if documents_list else "unavailable",
                "note": "Documents are grouped by filing category." if documents_list else "This category is not fetched for the current company yet.",
            }
        ),
    }


@router.get("/{symbol}/follow")
async def get_follow_status(symbol: str, user_id: str = Depends(get_user_id)) -> dict[str, bool]:
    stock = await _get_stock_or_404(symbol)
    following = await follow_adapter.get_status(user_id, str(stock["id"]))
    return {"following": following}


@router.post("/{symbol}/follow")
async def update_follow_status(
    symbol: str,
    body: dict[str, Any],
    user_id: str = Depends(get_user_id),
) -> dict[str, bool]:
    normalized_symbol = symbol.upper()
    stock = await _get_stock_or_404(normalized_symbol)
    asset_id = str(stock["id"])
    action = str(body.get("action", "follow")).lower()
    if action == "unfollow":
        await follow_adapter.unfollow(user_id, asset_id)
        invalidate("stock_overview", f"overview:{normalized_symbol}")
        return {"following": False}
    await follow_adapter.follow(user_id, asset_id)
    invalidate("stock_overview", f"overview:{normalized_symbol}")
    return {"following": True}


@router.get("/{symbol}/peer-correlations")
async def peer_correlations(
    request: Request,
    symbol: str,
    period: str = Query(default="1y"),
    method: str = Query(default="pearson"),
    limit: int = Query(default=5),
) -> dict[str, Any]:
    subject_symbol = symbol.strip().upper()
    resolved_period = period.lower() if period.lower() in {"1y", "3y", "5y"} else "3y"
    resolved_limit = min(max(int(limit), 3), 6)
    subject = await _get_stock_or_404(subject_symbol)

    async with get_pg() as conn:
        peer_rows = await conn.fetch(
            """
            SELECT a.id,
                   COALESCE(a.nse_symbol, a.bse_code) AS symbol,
                   a.nse_symbol,
                   a.name,
                   a.sector,
                   cr.market_cap_cr,
                   cr.pe_ttm,
                   cr.pb,
                   cr.ev_ebitda,
                   cr.roce,
                   cr.roe,
                   cr.debt_equity,
                   cr.pat_margin,
                   cr.operating_margin,
                   cr.revenue_growth_1y,
                   cr.pat_growth_1y,
                   cr.dividend_yield
            FROM assets a
            LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
            WHERE a.sector = $1
              AND a.is_active = 1
              AND a.asset_class = 'EQUITY'
              AND COALESCE(a.nse_symbol, a.bse_code) != $2
            ORDER BY cr.market_cap_cr DESC NULLS LAST, a.name ASC
            LIMIT $3
            """,
            subject.get("sector"),
            subject_symbol,
            resolved_limit,
        )

    peer_meta = [dict(row) for row in peer_rows]
    symbol_order = [subject_symbol] + [str(row["nse_symbol"] or row["symbol"]).upper() for row in peer_meta]

    asset_map = {subject_symbol: subject}
    for row in peer_meta:
        peer_symbol = str(row["nse_symbol"] or row["symbol"]).upper()
        asset_map[peer_symbol] = dict(row)

    asset_ids = [str(item["id"]) for item in asset_map.values()]
    start_date = _parse_period_to_start(resolved_period)
    min_overlap = _min_overlap(resolved_period)

    async with get_ts() as conn:
        rows = await conn.fetch(
            """
            SELECT asset_id, date, close, source_exchange
            FROM daily_prices
            WHERE asset_id = ANY($1::text[])
              AND date >= $2
              AND date <= CURRENT_DATE
            ORDER BY asset_id ASC, date ASC
            """,
            asset_ids,
            start_date,
        )

    symbol_by_asset = {str(item["id"]): symbol_key for symbol_key, item in asset_map.items()}
    price_data: dict[str, dict[str, float]] = {symbol_key: {} for symbol_key in asset_map}
    for row in rows:
        item = dict(row)
        symbol_key = symbol_by_asset.get(str(item["asset_id"]))
        if symbol_key is None:
            continue
        day = item["date"].isoformat() if hasattr(item["date"], "isoformat") else str(item["date"])
        existing = price_data[symbol_key].get(day)
        close = float(item["close"])
        if existing is None or item["source_exchange"] == "NSE":
            price_data[symbol_key][day] = close

    price_map = {key: [value for _, value in sorted(series.items())] for key, series in price_data.items()}
    dates_map = {key: [day for day, _ in sorted(series.items())] for key, series in price_data.items()}
    computed = await _run_cpu_bound(request, price_map, dates_map, method.lower())

    corr_lookup: dict[str, dict[str, float | None]] = {}
    overlap_lookup: dict[str, dict[str, int]] = {}
    for i, left_symbol in enumerate(computed["symbols"]):
        corr_lookup[left_symbol] = {}
        overlap_lookup[left_symbol] = {}
        for j, right_symbol in enumerate(computed["symbols"]):
            corr_lookup[left_symbol][right_symbol] = computed["matrix"][i][j]
            overlap_lookup[left_symbol][right_symbol] = int(computed["overlap_counts"][i][j])

    peer_rows_payload: list[dict[str, Any]] = []
    for peer in peer_meta:
        peer_symbol = str(peer["nse_symbol"] or peer["symbol"]).upper()
        overlap_days = overlap_lookup.get(subject_symbol, {}).get(peer_symbol, 0)
        correlation = corr_lookup.get(subject_symbol, {}).get(peer_symbol)
        peer_rows_payload.append(
            {
                "symbol": str(peer["symbol"]),
                "nseSymbol": peer["nse_symbol"],
                "name": peer["name"],
                "marketCapCr": peer["market_cap_cr"],
                "peTtm": peer["pe_ttm"],
                "pb": peer["pb"],
                "evEbitda": peer["ev_ebitda"],
                "roce": peer["roce"],
                "roe": peer["roe"],
                "debtEquity": peer["debt_equity"],
                "patMargin": peer["pat_margin"],
                "operatingMargin": peer["operating_margin"],
                "revenueGrowth1y": peer["revenue_growth_1y"],
                "patGrowth1y": peer["pat_growth_1y"],
                "dividendYield": peer["dividend_yield"],
                "correlation": round(float(correlation), 2) if correlation is not None and overlap_days >= min_overlap else None,
                "overlapDays": overlap_days,
            }
        )

    matrix: dict[str, dict[str, float | None]] = {}
    overlap: dict[str, dict[str, int]] = {}
    for left_symbol in symbol_order:
        matrix[left_symbol] = {}
        overlap[left_symbol] = {}
        for right_symbol in symbol_order:
            overlap_days = overlap_lookup.get(left_symbol, {}).get(right_symbol, 0)
            raw_value = corr_lookup.get(left_symbol, {}).get(right_symbol)
            if left_symbol == right_symbol:
                matrix[left_symbol][right_symbol] = 1
                overlap[left_symbol][right_symbol] = overlap_days
            else:
                matrix[left_symbol][right_symbol] = round(float(raw_value), 2) if raw_value is not None and overlap_days >= min_overlap else None
                overlap[left_symbol][right_symbol] = overlap_days

    valid_peer_rows = [peer for peer in peer_rows_payload if peer["correlation"] is not None]
    sorted_by_correlation = sorted(valid_peer_rows, key=lambda item: float(item["correlation"]), reverse=True)
    closest_peer = sorted_by_correlation[0] if sorted_by_correlation else None
    diversifier = sorted_by_correlation[-1] if sorted_by_correlation else None
    average_correlation = (
        round(sum(float(peer["correlation"]) for peer in valid_peer_rows) / len(valid_peer_rows), 2)
        if valid_peer_rows
        else None
    )

    return {
        "period": resolved_period,
        "minOverlap": min_overlap,
        "subject": {"symbol": subject_symbol, "name": subject["name"]},
        "summary": {
            "closestPeer": (
                {"symbol": closest_peer["nseSymbol"] or closest_peer["symbol"], "name": closest_peer["name"], "correlation": closest_peer["correlation"]}
                if closest_peer else None
            ),
            "diversifier": (
                {"symbol": diversifier["nseSymbol"] or diversifier["symbol"], "name": diversifier["name"], "correlation": diversifier["correlation"]}
                if diversifier else None
            ),
            "averageCorrelation": average_correlation,
        },
        "peers": peer_rows_payload,
        "matrixSymbols": symbol_order,
        "matrix": matrix,
        "overlap": overlap,
    }
