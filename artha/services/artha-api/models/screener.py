from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class RangeFilter(BaseModel):
    model_config = ConfigDict(extra="forbid")

    min: float | None = None
    max: float | None = None


class SortConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    field: str
    desc: bool = True


class ScreenerFilters(BaseModel):
    model_config = ConfigDict(extra="forbid")

    query: str | None = None
    formula: list[str] | None = None

    marketCapCr: RangeFilter | None = None
    marketCapBucket: list[str] | None = None

    peTtm: RangeFilter | None = None
    pb: RangeFilter | None = None
    evEbitda: RangeFilter | None = None
    dividendYield: RangeFilter | None = None

    roce: RangeFilter | None = None
    roe: RangeFilter | None = None
    patMargin: RangeFilter | None = None
    operatingMargin: RangeFilter | None = None

    revenueGrowth1y: RangeFilter | None = None
    revenueGrowth3y: RangeFilter | None = None
    patGrowth1y: RangeFilter | None = None
    epsGrowth1y: RangeFilter | None = None

    debtEquity: RangeFilter | None = None
    interestCoverage: RangeFilter | None = None
    currentRatio: RangeFilter | None = None

    qualityScore: RangeFilter | None = None

    rsi14: RangeFilter | None = None
    pctFrom52wHigh: RangeFilter | None = None
    pctFrom52wLow: RangeFilter | None = None

    sector: list[str] | None = None
    assetClass: list[str] | None = None
    indexMembership: list[str] | None = None

    ffBeta: RangeFilter | None = None
    ffSmb: RangeFilter | None = None
    ffHml: RangeFilter | None = None
    ffWml: RangeFilter | None = None
    ffAlpha: RangeFilter | None = None
    ffRSquared: RangeFilter | None = None

    sort: SortConfig | None = None
    limit: int = Field(default=100, ge=1, le=500)
    offset: int = Field(default=0, ge=0)


class ScreenerRunRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    filters: ScreenerFilters | None = None
    limit: int | None = Field(default=None, ge=1, le=500)
    offset: int | None = Field(default=None, ge=0)


class ScreenerRow(BaseModel):
    model_config = ConfigDict(extra="forbid")

    symbol: str | None = None
    name: str | None = None
    sector: str | None = None
    industryGroup: str | None = None
    assetClass: str | None = None
    marketCapCr: float | None = None
    price: float | None = None
    pctChange: float | None = None
    pe: float | None = None
    pb: float | None = None
    evEbitda: float | None = None
    dividendYield: float | None = None
    roce: float | None = None
    roe: float | None = None
    patMargin: float | None = None
    operatingMargin: float | None = None
    revenueGrowth1y: float | None = None
    patGrowth1y: float | None = None
    epsGrowth1y: float | None = None
    debtEquity: float | None = None
    qualityScore: float | None = None
    rsi14: float | None = None
    pctFrom52wHigh: float | None = None
    sma20: float | None = None
    sma50: float | None = None
    sma200: float | None = None


class ScreenerMetaIndex(BaseModel):
    model_config = ConfigDict(extra="forbid")

    value: str
    label: str


class ScreenerMetaResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    sectors: list[str]
    indices: list[ScreenerMetaIndex]


class ScreenerPageInfo(BaseModel):
    model_config = ConfigDict(extra="forbid")

    limit: int
    offset: int
    has_more: bool


class ScreenerRunResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    results: list[ScreenerRow]
    total: int
    page_info: ScreenerPageInfo


class FormulaValidationResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    valid: bool
    error: str | None = None
