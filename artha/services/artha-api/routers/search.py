from __future__ import annotations

from fastapi import APIRouter, Query, Request

from adapters.stocks import StocksAdapter
from core.rate_limit import limiter


router = APIRouter(prefix="/api/search", tags=["search"])
stocks_adapter = StocksAdapter()


@router.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok", "router": "search"}


@router.get("")
@limiter.limit("100/minute")
async def search(
    request: Request,
    q: str = Query(..., min_length=1),
    limit: int = Query(default=10, ge=1, le=20),
) -> dict[str, list[dict[str, object]]]:
    query = q.strip()
    if not query:
        return {"results": []}

    stocks = await stocks_adapter.search(query, limit)
    results = [
        {
            "id": item["id"],
            "symbol": item["symbol"],
            "name": item["name"],
            "exchange": item.get("exchange") or "NSE",
            "sector": item.get("sector"),
        }
        for item in stocks
    ]
    return {"results": results}
