from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict


class StockSummary(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    symbol: str
    name: str
    exchange: str | None = None
    sector: str | None = None
    industryGroup: str | None = None
    industry: str | None = None
    subIndustry: str | None = None
    isin: str | None = None
    assetClass: str | None = None


class PriceBar(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: str
    open: float
    high: float
    low: float
    close: float
    volume: float | None = None


class CorporateAction(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int
    actionType: str
    exDate: str
    recordDate: str | None = None
    dividendAmount: float | None = None
    splitFactor: float | None = None
    bonusRatio: str | None = None
    notes: str | None = None


class BusinessSegment(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str
    revenuePct: float
    description: str | None = None


class RiskTag(BaseModel):
    model_config = ConfigDict(extra="forbid")

    label: str
    severity: str
    desc: str | None = None


class AnalystRatings(BaseModel):
    model_config = ConfigDict(extra="forbid")

    buy: int
    hold: int
    sell: int
    targetPrice: float | None = None


class CompanyProfile(BaseModel):
    model_config = ConfigDict(extra="forbid")

    description: str | None = None
    descriptionShort: str | None = None
    descriptionAnalyst: str | None = None
    founded: str | None = None
    foundedYear: int | None = None
    headquarters: str | None = None
    employees: str | None = None
    website: str | None = None
    md: str | None = None
    chairman: str | None = None
    creditRating: str | None = None
    creditRatingAgency: str | None = None
    businessSegments: list[BusinessSegment] | None = None
    riskTags: list[RiskTag] | None = None
    indexMemberships: list[str] | None = None
    investmentThesis: list[str] | None = None
    analystRatings: AnalystRatings | None = None


class CompanyEvent(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    eventType: str
    title: str | None = None
    eventDate: str
    severity: str | None = None
    eventData: dict[str, Any] | None = None
    assetId: str | None = None
    nseSymbol: str | None = None
    stockName: str | None = None
    isRead: bool | None = None


class QuarterlyResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    quarter: str | None = None
    periodEnd: str | None = None
    periodType: str | None = None
    revenue: float | None = None
    ebitda: float | None = None
    operatingProfit: float | None = None
    ebit: float | None = None
    interest: float | None = None
    pbt: float | None = None
    tax: float | None = None
    pat: float | None = None
    netProfit: float | None = None
    cfo: float | None = None
    eps: float | None = None
    revenueGrowth: float | None = None
    patGrowth: float | None = None
    ebitdaMargin: float | None = None
    patMargin: float | None = None
    depreciation: float | None = None


class BalanceSheet(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str | None = None
    periodEnd: str | None = None
    periodEndDate: str | None = None
    totalAssets: float | None = None
    totalEquity: float | None = None
    totalDebt: float | None = None
    borrowings: float | None = None
    equityCapital: float | None = None
    reserves: float | None = None
    tradeReceivables: float | None = None
    cashEquivalents: float | None = None
    cash: float | None = None
    debtEquity: float | None = None
    bookValue: float | None = None
    fixedAssets: float | None = None
    investments: float | None = None


class CashFlow(BaseModel):
    model_config = ConfigDict(extra="forbid")

    year: str | None = None
    periodEnd: str | None = None
    periodEndDate: str | None = None
    operatingCf: float | None = None
    cashFromOperating: float | None = None
    investingCf: float | None = None
    cashFromInvesting: float | None = None
    financingCf: float | None = None
    cashFromFinancing: float | None = None
    netChangeInCash: float | None = None
    cashBeginOfYear: float | None = None
    cashEndOfYear: float | None = None
    freeCF: float | None = None
    freeCashFlow: float | None = None
    capex: float | None = None


class AnomalyFlag(BaseModel):
    model_config = ConfigDict(extra="forbid")

    type: str
    severity: str
    description: str
    metric: str | None = None
    value: float | None = None
    threshold: float | None = None


class ShareholdingPattern(BaseModel):
    model_config = ConfigDict(extra="forbid")

    quarter: str | None = None
    quarterEnd: str | None = None
    promoter: float | None = None
    promoterPct: float | None = None
    promoterChangeQoq: float | None = None
    fii: float | None = None
    fiiPct: float | None = None
    fiiChangeQoq: float | None = None
    dii: float | None = None
    diiPct: float | None = None
    diiChangeQoq: float | None = None
    mfPct: float | None = None
    retail: float | None = None
    publicPct: float | None = None
    pledged: float | None = None
    pledgedPct: float | None = None
    promoterPledgePct: float | None = None


class GovernanceScore(BaseModel):
    model_config = ConfigDict(extra="forbid")

    overall: float | None = None
    overallScore: float | None = None
    boardIndependence: float | None = None
    disclosure: float | None = None
    relatedParty: float | None = None
    auditQuality: float | None = None
    independentDirectorsPct: float | None = None
    boardSize: float | None = None
    ceoTenureYears: float | None = None
    auditOpinion: str | None = None
    relatedPartyTxnFlag: bool | None = None


class FactorExposure(BaseModel):
    model_config = ConfigDict(extra="forbid")

    marketBeta: float | None = None
    smbLoading: float | None = None
    hmlLoading: float | None = None
    wmlLoading: float | None = None
    alpha: float | None = None
    rSquared: float | None = None
    sampleSize: float | None = None
    regressionStartDate: str | None = None
    regressionEndDate: str | None = None


class FactorSnapshot(BaseModel):
    model_config = ConfigDict(extra="forbid")

    frequency: str
    asOf: str
    marketReturn: float | None = None
    marketPremium: float | None = None
    rfRate: float | None = None
    smb: float | None = None
    hml: float | None = None
    wml: float | None = None
    notes: str | None = None


class FactorDrawdownStat(BaseModel):
    model_config = ConfigDict(extra="forbid")

    factorCode: str
    factorName: str
    annualizedReturn: float | None = None
    annualizedVolatility: float | None = None
    worstDrawdown: float | None = None
    drawdownDurationYears: float | None = None


class FactorContext(BaseModel):
    model_config = ConfigDict(extra="forbid")

    releaseTag: str | None = None
    latestSnapshots: list[FactorSnapshot]
    drawdowns: list[FactorDrawdownStat]


class EarningsQuality(BaseModel):
    model_config = ConfigDict(extra="forbid")

    overallScore: float | None = None
    cfoPatRatio: float | None = None
    accrualRatio: float | None = None
    revenueConsistency: float | None = None
    flags: list[str] | None = None


class ComputedRatios(BaseModel):
    model_config = ConfigDict(extra="forbid")

    peTtm: float | None = None
    pb: float | None = None
    evEbitda: float | None = None
    dividendYield: float | None = None
    roce: float | None = None
    roe: float | None = None
    debtEquity: float | None = None
    interestCoverage: float | None = None
    patMargin: float | None = None
    operatingMargin: float | None = None
    revenueGrowth1y: float | None = None
    patGrowth1y: float | None = None
    rsi14: float | None = None
    pctFrom52wHigh: float | None = None
    pctFrom52wLow: float | None = None
    marketCapCr: float | None = None
    price: float | None = None
    pctChange1d: float | None = None
    qualityScore: float | None = None
    computedDate: str | None = None


class PeerComparison(BaseModel):
    model_config = ConfigDict(extra="forbid")

    symbol: str
    nseSymbol: str | None = None
    name: str
    marketCapCr: float | None = None
    peTtm: float | None = None
    pb: float | None = None
    evEbitda: float | None = None
    roce: float | None = None
    roe: float | None = None
    debtEquity: float | None = None
    patMargin: float | None = None
    operatingMargin: float | None = None
    revenueGrowth1y: float | None = None
    patGrowth1y: float | None = None
    dividendYield: float | None = None
    price: float | None = None
    pctChange1d: float | None = None


class FeedEvent(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    assetId: str
    nseSymbol: str | None = None
    bseCode: str | None = None
    stockName: str | None = None
    eventType: str
    title: str | None = None
    severity: str | None = None
    eventDate: str
    isRead: bool
    eventData: dict[str, Any] | None = None


class StockDetail(StockSummary):
    model_config = ConfigDict(extra="forbid")

    nseSymbol: str | None = None
    bseCode: str | None = None
    price: float | None = None
    priceDate: str | None = None
    pctChange1d: float | None = None
    high52w: float | None = None
    low52w: float | None = None
    marketCapCr: float | None = None
    pe: float | None = None
    pb: float | None = None
    dividendYield: float | None = None
    roce: float | None = None
    roe: float | None = None
    debtEquity: float | None = None
    volume: float | None = None
    avgVolume: float | None = None
    faceValue: float | None = None
    listedDate: str | None = None


class DocumentItem(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    title: str | None = None
    docType: str
    docDate: str
    fiscalYear: str | None = None
    fiscalQuarter: str | None = None
    fileUrl: str | None = None
    filePath: str | None = None
    aiSentiment: float | None = None
    aiSummary: str | None = None
    aiKeyPoints: list[str] | None = None


class ChartResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    prices: list[PriceBar]
    corpActions: list[CorporateAction]
    benchmark: list[PriceBar]


class AnalyticsData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    factorExposure: FactorExposure | None = None
    factorContext: FactorContext
    earningsQuality: EarningsQuality
    ratioHistory: list[ComputedRatios]
    ratios: ComputedRatios


class OwnershipData(BaseModel):
    model_config = ConfigDict(extra="forbid")

    shareholding: list[ShareholdingPattern]
    governance: GovernanceScore
