"""
Stock screener router.
Supports multi-metric filtering with operators: gt, lt, gte, lte, eq, between.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()


class ScreenerFilter(BaseModel):
    metric: str
    operator: str  # gt | lt | gte | lte | eq | between
    value: float
    value2: float | None = None  # for "between"


class ScreenerRequest(BaseModel):
    filters: list[ScreenerFilter]
    sort_by: str = "market_cap"
    sort_order: str = "desc"
    limit: int = Field(ge=1, le=500, default=100)
    offset: int = Field(ge=0, default=0)


class ScreenerResultItem(BaseModel):
    isin: str
    symbol: str
    company_name: str
    sector: str | None
    market_cap: float | None
    pe_ratio: float | None
    pb_ratio: float | None
    roce: float | None
    roe: float | None
    debt_to_equity: float | None
    promoter_holding: float | None
    pledge_percent: float | None
    eps_growth_1yr: float | None
    revenue_growth_1yr: float | None
    indiaquant_score: float | None


class ScreenerResponse(BaseModel):
    results: list[ScreenerResultItem]
    total_count: int


@router.post("/run", response_model=ScreenerResponse)
async def run_screener(request: ScreenerRequest):
    """
    Run stock screener with the given filters.
    Fetches fundamental data from Supabase and applies filters server-side.
    """
    try:
        from db.repository import FundamentalsRepository

        repo = FundamentalsRepository()
        results = await repo.screen_stocks(
            filters=[(f.metric, f.operator, f.value, f.value2) for f in request.filters],
            sort_by=request.sort_by,
            sort_order=request.sort_order,
            limit=request.limit,
            offset=request.offset,
        )

        return ScreenerResponse(
            results=[ScreenerResultItem(**r) for r in results["data"]],
            total_count=results["total"],
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
