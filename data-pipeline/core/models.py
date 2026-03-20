"""
Typed domain models for the Artha data pipeline.

All pipeline code should work with these dataclasses instead of raw dicts.
Each model maps 1:1 to a logical concept in the schema, but is intentionally
decoupled from any specific table name or DB dialect.
"""
from __future__ import annotations

from dataclasses import dataclass, field, asdict
from datetime import date, datetime
from typing import Optional, List, Dict, Any


# ── Universe ──────────────────────────────────────────────────────────────────

@dataclass
class Asset:
    """A tradeable security (equity, ETF, mutual fund, index)."""
    id: str
    name: str
    asset_class: str  # EQUITY | MF | ETF | INDEX

    isin: Optional[str] = None
    nse_symbol: Optional[str] = None
    bse_code: Optional[str] = None
    amfi_code: Optional[str] = None
    amc_name: Optional[str] = None
    mf_category: Optional[str] = None
    screener_id: Optional[str] = None
    series: Optional[str] = None

    # 4-level Screener classification
    sector: Optional[str] = None
    industry_group: Optional[str] = None
    industry: Optional[str] = None
    sub_industry: Optional[str] = None
    screener_sector_code: Optional[str] = None
    screener_industry_group_code: Optional[str] = None
    screener_industry_code: Optional[str] = None
    screener_sub_industry_code: Optional[str] = None

    # MSI classification
    msi_sector: Optional[str] = None
    msi_industry_group: Optional[str] = None
    msi_group_rank: Optional[int] = None

    # Metadata
    listing_date: Optional[str] = None
    delisting_date: Optional[str] = None
    is_active: bool = True
    nse_listed: bool = False
    bse_listed: bool = False
    face_value: Optional[float] = None
    website_url: Optional[str] = None
    description: Optional[str] = None
    management_json: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


# ── Technicals ────────────────────────────────────────────────────────────────

@dataclass
class PriceBar:
    """A single day's OHLCV data for one asset from one exchange."""
    asset_id: str
    date: str  # ISO 8601 date string
    open: Optional[float] = None
    high: Optional[float] = None
    low: Optional[float] = None
    close: float = 0.0
    adj_close: Optional[float] = None
    volume: Optional[int] = None
    trades: Optional[int] = None
    source_exchange: str = "NSE"  # NSE | BSE | AMFI


@dataclass
class CorporateAction:
    """A corporate action (split, bonus, dividend, etc.)."""
    id: str
    asset_id: str
    action_type: str  # SPLIT | BONUS | DIVIDEND | RIGHTS | MERGER | ...
    ex_date: str

    record_date: Optional[str] = None
    announcement_date: Optional[str] = None
    ratio_numerator: Optional[float] = None
    ratio_denominator: Optional[float] = None
    dividend_amount: Optional[float] = None
    rights_ratio: Optional[str] = None
    rights_price: Optional[float] = None
    adjustment_factor: Optional[float] = None
    source_exchange: Optional[str] = None
    raw_announcement: Optional[str] = None


# ── Fundamentals ──────────────────────────────────────────────────────────────

@dataclass
class QuarterlyResult:
    """Quarterly income statement data from any source."""
    asset_id: str
    period_end_date: str
    source: str  # MSI | SCREENER | NSE | BSE

    is_consolidated: bool = True
    revenue: Optional[float] = None
    operating_profit: Optional[float] = None
    ebit: Optional[float] = None
    interest: Optional[float] = None
    depreciation: Optional[float] = None
    pbt: Optional[float] = None
    tax: Optional[float] = None
    pat: Optional[float] = None
    eps: Optional[float] = None
    opm_pct: Optional[float] = None


@dataclass
class BalanceSheetRow:
    """Balance sheet snapshot from any source."""
    asset_id: str
    period_end_date: str
    source: str

    equity_capital: Optional[float] = None
    reserves: Optional[float] = None
    total_equity: Optional[float] = None
    long_term_borrowings: Optional[float] = None
    short_term_borrowings: Optional[float] = None
    total_debt: Optional[float] = None
    total_assets: Optional[float] = None
    cash_equivalents: Optional[float] = None
    fixed_assets: Optional[float] = None
    investments: Optional[float] = None
    trade_receivables: Optional[float] = None


@dataclass
class CashFlowRow:
    """Cash flow statement from any source."""
    asset_id: str
    period_end_date: str
    source: str

    operating_cf: Optional[float] = None
    investing_cf: Optional[float] = None
    financing_cf: Optional[float] = None
    capex: Optional[float] = None
    free_cf: Optional[float] = None


@dataclass
class ShareholdingRow:
    """Shareholding pattern snapshot."""
    asset_id: str
    period_end_date: str
    source: str

    promoter_pct: Optional[float] = None
    fii_pct: Optional[float] = None
    dii_pct: Optional[float] = None
    public_pct: Optional[float] = None
    government_pct: Optional[float] = None
    pledged_pct: Optional[float] = None
    num_shareholders: Optional[int] = None


# ── Pipeline Audit ────────────────────────────────────────────────────────────

@dataclass
class PipelineRun:
    """Audit record for a single pipeline execution."""
    id: str
    run_date: str
    source: str
    status: str  # SUCCESS | PARTIAL | FAILED
    pipeline_type: str = "DAILY"  # DAILY | BACKFILL | WEEKLY

    records_inserted: int = 0
    records_skipped: int = 0
    circuit_breaks: int = 0
    error_log: Optional[str] = None
    duration_ms: int = 0
