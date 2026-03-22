export interface StockSummary {
  id: string | number;
  symbol: string;
  name: string;
  exchange?: string;
  sector?: string | null;
  industryGroup?: string | null;
  industry?: string | null;
  subIndustry?: string | null;
  isin?: string | null;
  assetClass?: string | null;
}

export interface PriceBar {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number | null;
}

export interface CorporateAction {
  id?: string | number;
  actionType: string;
  exDate: string;
  recordDate?: string | null;
  dividendAmount?: number | null;
  splitFactor?: number | null;
  bonusRatio?: string | null;
  notes?: string | null;
}

export interface CompanyProfile {
  description?: string | null;
  descriptionShort?: string | null;
  descriptionAnalyst?: string | null;
  founded?: string | null;
  foundedYear?: number | null;
  headquarters?: string | null;
  employees?: string | null;
  website?: string | null;
  md?: string | null;
  chairman?: string | null;
  creditRating?: string | null;
  creditRatingAgency?: string | null;
  businessSegments?: Array<{ name: string; revenuePct?: number | null; description?: string | null }>;
  riskTags?: Array<{ label: string; severity: "high" | "medium" | "low"; desc?: string | null }>;
  indexMemberships?: string[];
  investmentThesis?: string[];
  analystRatings?: { buy: number; hold: number; sell: number; targetPrice?: number | null } | null;
}

export interface ComputedRatios {
  [key: string]: string | number | null | undefined;
  computedDate?: string;
  peTtm?: number | null;
  pb?: number | null;
  evEbitda?: number | null;
  roce?: number | null;
  roe?: number | null;
  marketCapCr?: number | null;
  debtEquity?: number | null;
  patMargin?: number | null;
  operatingMargin?: number | null;
  revenueGrowth1y?: number | null;
  patGrowth1y?: number | null;
  dividendYield?: number | null;
}

export interface PeerComparison {
  symbol: string;
  nseSymbol?: string | null;
  name: string;
  sector?: string | null;
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
}

export interface CompanyEvent {
  id: string;
  eventType: string;
  title?: string | null;
  eventDate: string;
  severity?: "CRITICAL" | "WARNING" | "INFO";
  eventData?: Record<string, unknown>;
  assetId?: string;
  nseSymbol?: string | null;
  stockName?: string | null;
  isRead?: boolean;
}

export interface StockDetail {
  [key: string]: string | number | null | undefined;
  id?: string;
  symbol?: string;
  nseSymbol?: string | null;
  bseCode?: string | null;
  name: string;
  sector?: string | null;
  industry?: string | null;
  industryGroup?: string | null;
  subIndustry?: string | null;
  exchange?: string | null;
  listedDate?: string | null;
  price?: number | null;
  pctChange1d?: number | null;
  marketCapCr?: number | null;
  pe?: number | null;
  roce?: number | null;
  roe?: number | null;
  avgVolume?: number | null;
  high52w?: number | null;
  low52w?: number | null;
}

export interface StockOverviewResponse {
  stock: StockDetail | null;
  profile: CompanyProfile | null;
  corpActions?: CorporateAction[];
  events?: CompanyEvent[];
  meta?: {
    hero?: Record<string, unknown>;
    overview?: Record<string, unknown>;
  } | null;
}

export interface QuarterlyResult {
  [key: string]: string | number | null | undefined;
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
  [key: string]: string | number | null | undefined;
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
}

export interface CashFlow {
  [key: string]: string | number | null | undefined;
  year?: string;
  periodEnd?: string;
  periodEndDate?: string;
  operatingCF?: number | null;
  cashFromOperating?: number | null;
  investingCF?: number | null;
  cashFromInvesting?: number | null;
  financingCF?: number | null;
  cashFromFinancing?: number | null;
  freeCF?: number | null;
  freeCashFlow?: number | null;
  capex?: number | null;
}

export interface FinancialsResponse {
  quarterly: QuarterlyResult[];
  annual: QuarterlyResult[];
  balanceSheets: BalanceSheet[];
  cashFlows: CashFlow[];
  ratios: Array<Record<string, string | number | null | undefined>>;
  anomalies?: Array<Record<string, unknown>>;
  meta?: Record<string, unknown>;
}

export interface OwnershipResponse {
  shareholding: Array<Record<string, string | number | null | undefined>>;
  governance: Record<string, unknown> | null;
  meta?: Record<string, unknown>;
}

export interface AnalyticsResponse {
  factorExposure: Record<string, unknown> | null;
  factorContext: Record<string, unknown> | null;
  earningsQuality: Record<string, unknown> | null;
  ratioHistory: ComputedRatios[];
  ratios: ComputedRatios | null;
  meta?: Record<string, unknown>;
}

export interface DocumentItem {
  id: string;
  title?: string | null;
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

export interface DocumentsResponse {
  documents: DocumentItem[];
  meta?: Record<string, unknown>;
}

export interface ChartResponse {
  prices: PriceBar[];
  corpActions: CorporateAction[];
  benchmark?: PriceBar[];
}

export interface FeedEvent {
  id: string;
  assetId: string;
  nseSymbol?: string | null;
  bseCode?: string | null;
  stockName?: string | null;
  eventType: string;
  title?: string | null;
  severity?: string | null;
  eventDate: string;
  isRead: boolean;
  eventData?: Record<string, unknown>;
}

export interface FeedResponse {
  feed: FeedEvent[];
  unreadCount: number;
}

export interface WidgetColumn {
  id: string;
  label: string;
  dslName: string;
  dbColumn?: string;
  aggregation?: "none" | "sum" | "avg" | "min" | "max" | "count";
  format?: "number" | "percent" | "currency" | "text";
  width?: number;
  colorCode?: boolean;
}

export interface WidgetConfig {
  columns: WidgetColumn[];
  filters: Record<string, unknown>;
  groupColumn?: string | null;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  limit?: number;
  dataPerSymbol?: number;
  chartConfig?: Record<string, unknown>;
  refreshInterval?: number | null;
  metricColumn?: string;
  metricLabel?: string;
  metricPrefix?: string;
  metricSuffix?: string;
}

export interface Widget {
  id: string;
  dashboard_id: string;
  widget_type: string;
  title: string;
  config_json: WidgetConfig;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Dashboard {
  id: string;
  user_id?: string;
  name: string;
  is_default: boolean;
  widget_count?: number;
  layout_json?: Array<Record<string, number | string>>;
  widgets?: Widget[] | null;
  created_at?: string;
  updated_at: string;
}

export interface WidgetQueryResponse {
  rows: Record<string, unknown>[];
  columns: WidgetColumn[];
  total: number;
  cached?: boolean;
}

export interface ChartLayout {
  id: string;
  user_id: string;
  name: string;
  content: Record<string, unknown>;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChartDrawings {
  drawings: Record<string, unknown>[];
  updated_at?: string;
}

export interface ChartAlert {
  id: string;
  user_id: string;
  symbol: string;
  price: number;
  condition: "above" | "below";
  message?: string | null;
  is_active: boolean;
  triggered_at?: string | null;
  created_at: string;
}

export interface ScreenerRow {
  [key: string]: string | number | null | undefined;
  symbol: string;
  name: string;
  sector?: string | null;
  marketCapCr?: number | null;
  price?: number | null;
  pctChange?: number | null;
  pe?: number | null;
  pb?: number | null;
  roce?: number | null;
  roe?: number | null;
  rsi14?: number | null;
}

export interface ScreenerResponse {
  results: ScreenerRow[];
  total: number;
  page_info?: {
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface ScreenerMetaResponse {
  sectors: string[];
  indices: Array<{ value: string; label: string }>;
}

export interface BacktestStrategy {
  id: string;
  user_id: string;
  name: string;
  [key: string]: unknown;
}

export interface BacktestMetrics {
  [key: string]: string | number | null | undefined;
  total_profit_inr: number;
  total_profit_pct: number;
  capital_growth_pct: number;
  profit_factor?: number | null;
  max_drawdown_pct: number;
  total_trades: number;
}

export interface BacktestRun {
  id: string;
  strategy_id: string;
  user_id: string;
  share_slug?: string | null;
  status: string;
  progress: number;
  started_at?: string | null;
  completed_at?: string | null;
  error_msg?: string | null;
  strategy_snapshot: BacktestStrategy;
  metrics?: BacktestMetrics | null;
  equity_curve?: Array<Record<string, unknown>> | null;
  monthly_returns?: Record<string, Record<string, number | null>> | null;
  created_at: string;
}

export interface BacktestTrade {
  id: number;
  run_id: string;
  symbol: string;
  company_name?: string | null;
  direction: string;
  entry_date: string;
  entry_price: number;
  exit_date: string;
  exit_price: number;
  shares: number;
  trade_value: number;
  gross_pnl: number;
  total_costs: number;
  tax: number;
  net_pnl: number;
  net_pnl_pct: number;
  duration_days: number;
  exit_reason: string;
  gains_type: string;
}

export interface TradeLogResponse {
  trades: BacktestTrade[];
  total: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

export interface CorrelationMatrix {
  matrix: Record<string, Record<string, number>>;
  assets: string[];
  priceData?: Record<string, Record<string, number>>;
  warnings?: string[];
}

export interface AutocorrelationResponse {
  results: Record<string, Array<number | null>>;
  assets: string[];
  lags?: number[];
  warnings?: string[];
}

export interface SectorHierarchyNode {
  id: string;
  name: string;
  code: string;
  level: string;
  returns: Record<string, number>;
  pe?: number | null;
  pb?: number | null;
  marketCapCr?: number | null;
  marketCapPct?: number | null;
  stockCount: number;
  avgVolume?: number | null;
}

export interface SectorHierarchy {
  nodes: SectorHierarchyNode[];
  rrgData: Array<Record<string, unknown>>;
  level: string;
  path: string;
  period: string;
}
