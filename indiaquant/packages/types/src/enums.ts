/**
 * Shared enums used across the entire IndiaQuant platform.
 * These map directly to Postgres enum types in Supabase.
 */

/** Asset classes supported by IndiaQuant */
export enum AssetClass {
  EQUITY_MF = "EQUITY_MF",
  DEBT_MF = "DEBT_MF",
  HYBRID_MF = "HYBRID_MF",
  ELSS = "ELSS",
  INDEX_FUND = "INDEX_FUND",
  ETF = "ETF",
  DIRECT_EQUITY = "DIRECT_EQUITY",
  GOLD = "GOLD",
  GSEC = "GSEC",
  FD = "FD",
  REAL_ESTATE = "REAL_ESTATE",
  CRYPTO = "CRYPTO",
  CUSTOM = "CUSTOM",
}

/** Transaction types for portfolio tracking */
export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL",
  SWITCH_IN = "SWITCH_IN",
  SWITCH_OUT = "SWITCH_OUT",
  SIP = "SIP",
  STP_IN = "STP_IN",
  STP_OUT = "STP_OUT",
  SWP = "SWP",
  DIVIDEND_REINVEST = "DIVIDEND_REINVEST",
  DIVIDEND_PAYOUT = "DIVIDEND_PAYOUT",
  BONUS = "BONUS",
  SPLIT = "SPLIT",
  MERGER = "MERGER",
}

/** Source of a transaction — for trade source tagging */
export enum TransactionSource {
  CAS_IMPORT = "CAS_IMPORT",
  BROKER_SYNC = "BROKER_SYNC",
  CSV_IMPORT = "CSV_IMPORT",
  MANUAL = "MANUAL",
  EMAIL_PARSE = "EMAIL_PARSE",
}

/** Tax lot selection method */
export enum TaxLotMethod {
  FIFO = "FIFO",
  LIFO = "LIFO",
  MIN_GAIN = "MIN_GAIN",
}

/** Indian financial year — used for tax calculations */
export enum FinancialYear {
  FY_2020_21 = "FY_2020_21",
  FY_2021_22 = "FY_2021_22",
  FY_2022_23 = "FY_2022_23",
  FY_2023_24 = "FY_2023_24",
  FY_2024_25 = "FY_2024_25",
  FY_2025_26 = "FY_2025_26",
}

/** Subscription tiers */
export enum SubscriptionTier {
  FREE = "FREE",
  PRO = "PRO",
  EXPERT = "EXPERT",
}

/** Backtest rebalancing frequency */
export enum RebalanceFrequency {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  ANNUAL = "ANNUAL",
  THRESHOLD = "THRESHOLD",
  NEVER = "NEVER",
}

/** Monte Carlo return methodology */
export enum MonteCarloMethod {
  HISTORICAL_BOOTSTRAP = "HISTORICAL_BOOTSTRAP",
  PARAMETERIZED = "PARAMETERIZED",
  SEQUENCE_OF_RETURNS = "SEQUENCE_OF_RETURNS",
}

/** Notification type */
export enum NotificationType {
  LTCG_ELIGIBLE = "LTCG_ELIGIBLE",
  ELSS_UNLOCK = "ELSS_UNLOCK",
  FY_END_REMINDER = "FY_END_REMINDER",
  BROKER_SYNC_FAILURE = "BROKER_SYNC_FAILURE",
  GOAL_MILESTONE = "GOAL_MILESTONE",
  PRICE_ALERT = "PRICE_ALERT",
}
