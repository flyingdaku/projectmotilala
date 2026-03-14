export interface RangeFilter {
  min?: number;
  max?: number;
}

// ── Feed / Event types ──────────────────────────────────────────────────────

export type EventType =
  | "RED_FLAG"
  | "RESULT"
  | "CONCALL"
  | "SHAREHOLDING_CHANGE"
  | "CORP_ACTION"
  | "ANNOUNCEMENT"
  | "RATING_CHANGE"
  | "INSIDER_TRADE";

export type Severity = "CRITICAL" | "WARNING" | "INFO";

export interface FeedItem {
  id: string;
  assetId: string;
  nseSymbol?: string;
  bseCode?: string;
  stockName?: string;
  eventType: EventType;
  title?: string;
  severity?: Severity;
  eventDate: string;
  isRead: boolean;
  eventData?: Record<string, unknown>;
}

// ── Stock / Company types ────────────────────────────────────────────────────

export interface StockSummary {
  id: number;
  symbol: string;
  name: string;
  exchange?: string;
  sector?: string;
  industryGroup?: string;
  industry?: string;
  subIndustry?: string;
  isin?: string;
  assetClass?: string;
}

export interface PriceBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CorporateAction {
  id: number;
  actionType: string;
  exDate: string;
  recordDate?: string;
  dividendAmount?: number;
  splitFactor?: number;
  bonusRatio?: string;
  notes?: string;
}

// Alias for chart section
export type DailyPrice = PriceBar;

// ── Company detail types ─────────────────────────────────────────────────────

export interface BusinessSegment {
  name: string;
  revenuePct: number;
  description?: string;
}

export interface CompanyProfile {
  description?: string;
  descriptionShort?: string;
  descriptionAnalyst?: string;
  founded?: string;
  foundedYear?: number | null;
  headquarters?: string;
  employees?: string;
  website?: string;
  md?: string;
  chairman?: string;
  creditRating?: string | null;
  creditRatingAgency?: string | null;
  businessSegments?: BusinessSegment[];
  riskTags?: { label: string; severity: "high" | "medium" | "low"; desc?: string }[];
  indexMemberships?: string[];
  investmentThesis?: string[];
  analystRatings?: { buy: number; hold: number; sell: number; targetPrice?: number };
}

export interface CompanyDocument {
  id: string;
  title?: string;
  docType: string;
  docDate: string;
  fiscalYear?: string | null;
  fiscalQuarter?: string | null;
  fileUrl?: string | null;
  filePath?: string | null;
  aiSentiment?: number | null;
  aiSummary?: string | null;
}

export interface CompanyEvent {
  id: string;
  eventType: string;
  title?: string;
  eventDate: string;
  severity?: "CRITICAL" | "WARNING" | "INFO";
  eventData?: Record<string, unknown>;
  assetId?: string;
  nseSymbol?: string;
  stockName?: string;
  isRead?: boolean;
}

// ── Financials types ─────────────────────────────────────────────────────────

export interface QuarterlyResult {
  quarter?: string;
  periodEnd?: string;
  periodType?: string;
  revenue: number | null;
  ebitda?: number | null;
  operatingProfit?: number | null;
  ebit?: number | null;
  interest?: number | null;
  pbt?: number | null;
  tax?: number | null;
  pat?: number | null;
  netProfit?: number | null;
  cfo?: number | null;
  eps: number | null;
  revenueGrowth?: number | null;
  patGrowth?: number | null;
  ebitdaMargin?: number | null;
  patMargin?: number | null;
}

export interface BalanceSheet {
  year?: string;
  periodEnd?: string;
  periodEndDate?: string;
  totalAssets: number | null;
  totalEquity: number | null;
  totalDebt?: number | null;
  borrowings?: number | null;
  equityCapital?: number | null;
  reserves?: number | null;
  tradeReceivables?: number | null;
  cashEquivalents?: number | null;
  cash: number | null;
  debtEquity?: number | null;
  bookValue?: number | null;
}

export interface CashFlow {
  year?: string;
  periodEnd?: string;
  periodEndDate?: string;
  operatingCF?: number | null;
  cashFromOperating?: number | null;
  investingCF?: number | null;
  cashFromInvesting?: number | null;
  financingCF?: number | null;
  cashFromFinancing?: number | null;
  netChangeInCash?: number | null;
  cashBeginOfYear?: number | null;
  cashEndOfYear?: number | null;
  freeCF?: number | null;
  freeCashFlow?: number | null;
  capex?: number | null;
}

export interface AnomalyFlag {
  type: string;
  severity: "high" | "medium" | "low" | "CRITICAL" | "WARNING" | "INFO";
  description: string;
  metric?: string;
  value?: number;
  threshold?: number;
}

export interface CompanyDocument {
  id: string;
  title?: string;
  docType: string;
  docDate: string;
  fiscalYear?: string | null;
  fiscalQuarter?: string | null;
  fileUrl?: string | null;
  filePath?: string | null;
  aiSentiment?: number | null;
  aiSummary?: string | null;
  aiKeyPoints?: string[];
}

// ── Ownership / Governance types ─────────────────────────────────────────────

export interface ShareholdingPattern {
  quarter?: string;
  quarterEnd?: string;
  promoter?: number;
  promoterPct?: number;
  promoterChangeQoq?: number;
  fii?: number;
  fiiPct?: number;
  fiiChangeQoq?: number;
  dii?: number;
  diiPct?: number;
  diiChangeQoq?: number;
  mfPct?: number;
  retail?: number;
  publicPct?: number;
  pledged?: number;
  pledgedPct?: number;
  promoterPledgePct?: number;
}

export interface GovernanceScore {
  overall?: number | null;
  overallScore?: number | null;
  boardIndependence?: number | null;
  disclosure?: number | null;
  relatedParty?: number | null;
  auditQuality?: number | null;
  independentDirectorsPct?: number | null;
  boardSize?: number | null;
  ceoTenureYears?: number | null;
  auditOpinion?: string | null;
  relatedPartyTxnFlag?: boolean | null;
}

// ── Analytics / Factor types ─────────────────────────────────────────────────

export interface FactorExposure {
  marketBeta?: number | null;
  smbLoading?: number | null;
  hmlLoading?: number | null;
  wmlLoading?: number | null;
  alpha?: number | null;
  rSquared?: number | null;
  sampleSize?: number | null;
  regressionStartDate?: string | null;
  regressionEndDate?: string | null;
}

export interface FactorSnapshot {
  frequency: "DAILY" | "MONTHLY" | "YEARLY";
  asOf: string;
  marketReturn?: number | null;
  marketPremium?: number | null;
  rfRate?: number | null;
  smb?: number | null;
  hml?: number | null;
  wml?: number | null;
  notes?: string | null;
}

export interface FactorDrawdownStat {
  factorCode: "ERP" | "HML" | "SMB" | "WML";
  factorName: string;
  annualizedReturn?: number | null;
  annualizedVolatility?: number | null;
  worstDrawdown?: number | null;
  drawdownDurationYears?: number | null;
}

export interface FactorContext {
  releaseTag?: string | null;
  latestSnapshots: FactorSnapshot[];
  drawdowns: FactorDrawdownStat[];
}

export interface EarningsQuality {
  overallScore?: number | null;
  cfoPatRatio?: number | null;
  accrualRatio?: number | null;
  revenueConsistency?: number | null;
  flags?: string[];
}

export interface ComputedRatios {
  peTtm?: number | null;
  pb?: number | null;
  evEbitda?: number | null;
  dividendYield?: number | null;
  roce?: number | null;
  roe?: number | null;
  debtEquity?: number | null;
  interestCoverage?: number | null;
  patMargin?: number | null;
  operatingMargin?: number | null;
  revenueGrowth1y?: number | null;
  patGrowth1y?: number | null;
  rsi14?: number | null;
  pctFrom52wHigh?: number | null;
  pctFrom52wLow?: number | null;
  marketCapCr?: number | null;
  price?: number | null;
  pctChange1d?: number | null;
  qualityScore?: number | null;
  computedDate?: string | null;
}

// ── Peer comparison ──────────────────────────────────────────────────────────

export interface PeerComparison {
  symbol: string;
  nseSymbol?: string;
  name: string;
  marketCapCr?: number | null;
  peTtm?: number | null;
  pb?: number | null;
  evEbitda?: number | null;
  roce?: number | null;
  roe?: number | null;
  debtEquity?: number | null;
  patMargin?: number | null;
  operatingMargin?: number | null;
  revenueGrowth1y?: number | null;
  patGrowth1y?: number | null;
  dividendYield?: number | null;
  price?: number | null;
  pctChange1d?: number | null;
}

export interface ScreenerFilters {
  query?: string;
  formula?: string[];

  // Market cap
  marketCapCr?: RangeFilter;
  marketCapBucket?: string[];

  // Valuation
  peTtm?: RangeFilter;
  pb?: RangeFilter;
  evEbitda?: RangeFilter;
  dividendYield?: RangeFilter;

  // Profitability
  roce?: RangeFilter;
  roe?: RangeFilter;
  patMargin?: RangeFilter;
  operatingMargin?: RangeFilter;

  // Growth
  revenueGrowth1y?: RangeFilter;
  revenueGrowth3y?: RangeFilter;
  patGrowth1y?: RangeFilter;
  epsGrowth1y?: RangeFilter;

  // Financial health
  debtEquity?: RangeFilter;
  interestCoverage?: RangeFilter;
  currentRatio?: RangeFilter;

  // Quality
  qualityScore?: RangeFilter;

  // Technical
  rsi14?: RangeFilter;
  pctFrom52wHigh?: RangeFilter;
  pctFrom52wLow?: RangeFilter;

  // Universe / classification
  sector?: string[];
  assetClass?: string[];

  // Factor exposure (IIMA Carhart 4-Factor)
  ffBeta?: RangeFilter;
  ffSmb?: RangeFilter;
  ffHml?: RangeFilter;
  ffWml?: RangeFilter;
  ffAlpha?: RangeFilter;
  ffRSquared?: RangeFilter;
}
