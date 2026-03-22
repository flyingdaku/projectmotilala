from __future__ import annotations

from datetime import date, datetime
from enum import Enum
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


PRIORITIZE_METRICS = {
    "market_cap",
    "market_cap_desc",
    "market_cap_asc",
    "volume",
    "avg_daily_vol",
    "rsi_14",
    "rsi_2",
    "rsi_3",
    "momentum_20",
    "momentum_63",
    "roc_14",
    "roc_2",
    "roc_3",
    "norm_atr_14",
    "atr_14",
    "adx_14",
}


class PositionType(str, Enum):
    LONG = "long"
    SHORT = "short"


class CriteriaMode(str, Enum):
    BUILDER = "builder"
    FORMULA = "formula"
    SCREEN = "screen"


class ExecModel(str, Enum):
    CLOSE = "close"
    NEXT_OPEN = "next_open"
    NEXT_IF = "next_if"


class LimitTo(str, Enum):
    EOD = "eod"
    EOW = "eow"
    EOM = "eom"


class Unit(str, Enum):
    PCT = "pct"
    ATR = "atr"


class RiskUnit(str, Enum):
    PCT = "pct"
    FIXED = "fixed"


class CommUnit(str, Enum):
    INR = "inr"
    PCT = "pct"


class RunStatus(str, Enum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ExitReason(str, Enum):
    STOP_LOSS = "stop_loss"
    TRAILING_SL = "trailing_sl"
    TAKE_PROFIT = "take_profit"
    CRITERIA = "criteria"
    TIME_BARS = "time_bars"
    TIME_PERIOD = "time_period"
    CIRCUIT = "circuit"


class GainsType(str, Enum):
    STCG = "stcg"
    LTCG = "ltcg"


class MarketImpact(str, Enum):
    MINOR = "Minor"
    MODERATE = "Moderate"
    SIGNIFICANT = "Significant"


class NextIfParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    pct: float = Field(..., gt=0, le=100)
    direction: Literal["above", "below"]
    reference: Literal["prev_high", "prev_close", "prev_low", "open", "gap_up", "gap_down"]


class PrioritizeConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    direction: Literal["highest", "lowest"]
    metric: str

    @model_validator(mode="after")
    def validate_metric(self) -> "PrioritizeConfig":
        if self.metric not in PRIORITIZE_METRICS:
            raise ValueError("Invalid prioritize metric")
        return self


class CostConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    stt_delivery_sell: float = 0.1
    stt_intraday_sell: float = 0.025
    sebi_charges: float = 0.0001
    exchange_charges: float = 0.00335
    stamp_duty_buy: float = 0.015
    gst_on_brokerage: float = 18.0


class TaxConfig(BaseModel):
    model_config = ConfigDict(extra="forbid")

    apply_tax: bool = True
    stcg_rate: float = 20.0
    ltcg_rate: float = 12.5
    ltcg_exemption: float = 125000.0


class BacktestStrategyBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(..., min_length=1, max_length=100)
    position_type: PositionType = PositionType.LONG
    entry_criteria: dict[str, object] | None = None
    entry_criteria_mode: CriteriaMode = CriteriaMode.BUILDER
    entry_screen_id: str | None = None
    entry_exec_model: ExecModel = ExecModel.CLOSE
    entry_exec_params: NextIfParams | None = None
    entry_limit_to: LimitTo | None = None
    entry_prioritize: PrioritizeConfig | None = None
    exit_criteria: dict[str, object] | None = None
    exit_criteria_mode: CriteriaMode = CriteriaMode.BUILDER
    exit_screen_id: str | None = None
    exit_exec_model: Literal["close", "next_open"] = "close"
    exit_limit_to: LimitTo | None = None
    unit: Unit = Unit.PCT
    stop_loss: float | None = Field(default=None, gt=0)
    trailing_stop: float | None = Field(default=None, gt=0)
    take_profit: float | None = Field(default=None, gt=0)
    close_after_bars: int | None = Field(default=None, gt=0)
    close_at_end_of: Literal["year", "semester", "quarter", "month", "week", "day"] | None = None
    initial_capital: int = Field(default=1000000, gt=0)
    capital_at_risk: float = Field(default=5.0, gt=0, le=100)
    risk_unit: RiskUnit = RiskUnit.PCT
    portfolio_max_size: int = Field(default=20, ge=1, le=200)
    commission: float = Field(default=20.0, ge=0)
    commission_unit: CommUnit = CommUnit.INR
    bid_ask_spread: float = Field(default=0.05, ge=0)
    period_start: date
    period_end: date
    benchmark: str = "NIFTY50"
    universe: str = "NIFTY500"
    custom_universe: list[str] | None = None
    include_delisted: bool = False
    circuit_breaker_compliance: bool = True
    liquidity_min_value: int = 1000000
    cost_config: CostConfig = Field(default_factory=CostConfig)
    tax_config: TaxConfig = Field(default_factory=TaxConfig)
    grouping_icon: str | None = None
    tags: list[str] | None = None
    is_public: bool = False
    is_template: bool = False

    @model_validator(mode="after")
    def validate_dates(self) -> "BacktestStrategyBase":
        if self.period_start >= self.period_end:
            raise ValueError("period_start must be before period_end")
        if (self.period_end - self.period_start).days < 30:
            raise ValueError("Backtest period must be at least 30 days")
        return self


class CreateStrategyRequest(BacktestStrategyBase):
    pass


class UpdateStrategyRequest(BacktestStrategyBase):
    pass


class BacktestStrategy(BacktestStrategyBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime


class BacktestMetrics(BaseModel):
    model_config = ConfigDict(extra="forbid")

    total_profit_inr: float
    total_profit_pct: float
    capital_growth_pct: float
    profit_factor: float | None
    payoff_ratio: float | None
    max_drawdown_pct: float
    max_drawdown_inr: float
    restoration_factor: float | None
    avg_annual_return_pct: float
    cagr_pct: float
    sharpe_ratio: float | None
    sortino_ratio: float | None
    calmar_ratio: float | None
    total_trades: int
    profit_trades: int
    profit_trades_pct: float
    avg_trade_duration_days: float
    avg_profit_per_trade_pct: float
    avg_profit_per_day_pct: float
    avg_market_impact: MarketImpact
    viability_score: float
    total_taxes_inr: float
    total_costs_inr: float
    net_profit_after_tax_inr: float
    benchmark_return_pct: float
    alpha_pct: float
    dividend_income_inr: float
    stocks_excluded_liquidity: int
    avg_win_pct: float | None = None
    avg_loss_pct: float | None = None
    largest_win_pct: float | None = None
    largest_loss_pct: float | None = None
    max_consecutive_wins: int | None = None
    max_consecutive_losses: int | None = None


class EquityCurvePoint(BaseModel):
    model_config = ConfigDict(extra="forbid")

    date: str
    portfolio_value: float
    benchmark_value: float
    drawdown_pct: float


class BacktestRun(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    strategy_id: str
    user_id: str
    share_slug: str | None
    status: RunStatus
    progress: int
    started_at: datetime | None
    completed_at: datetime | None
    error_msg: str | None
    strategy_snapshot: BacktestStrategy
    metrics: BacktestMetrics | None
    equity_curve: list[EquityCurvePoint] | None
    monthly_returns: dict[str, dict[str, float | None]] | None
    created_at: datetime


class BacktestTrade(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: int
    run_id: str
    symbol: str
    company_name: str | None
    direction: PositionType
    entry_date: datetime
    entry_price: float
    exit_date: datetime
    exit_price: float
    shares: int
    trade_value: float
    gross_pnl: float
    total_costs: float
    tax: float
    net_pnl: float
    net_pnl_pct: float
    duration_days: int
    exit_reason: ExitReason
    gains_type: GainsType


class RunBacktestRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    strategy_id: str | None = None
    strategy: CreateStrategyRequest | None = None

    @model_validator(mode="after")
    def validate_one_of(self) -> "RunBacktestRequest":
        if not self.strategy_id and not self.strategy:
            raise ValueError("Provide either strategy_id or strategy")
        if self.strategy_id and self.strategy:
            raise ValueError("Provide only one of strategy_id or strategy")
        return self


class TradeLogQueryParams(BaseModel):
    model_config = ConfigDict(extra="forbid")

    page: int = Field(default=1, ge=1)
    page_size: int = Field(default=50, ge=1, le=200)
    sort_by: str = "entry_date"
    sort_dir: Literal["asc", "desc"] = "desc"
    symbol: str | None = None
    exit_reason: list[ExitReason] | None = None
    gains_type: GainsType | None = None
    pnl_filter: Literal["positive", "negative", "all"] = "all"


class ShareResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    url: str
    slug: str
