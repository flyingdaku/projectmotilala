-- ═══════════════════════════════════════════════════════════════════════════
-- FAMA-FRENCH FACTOR MODEL - DATABASE SCHEMA EXTENSIONS
-- ═══════════════════════════════════════════════════════════════════════════
-- Purpose: Support computation of 4-factor model (Market, SMB, HML, WML)
-- Based on: IIMA methodology (https://faculty.iima.ac.in/iffm/)
-- Created: 2026-03-04
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── MARKET CAPITALIZATION HISTORY ─────────────────────────────────────────
-- Stores daily market cap for all stocks (needed for value-weighting)
CREATE TABLE IF NOT EXISTS daily_market_cap (
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  shares_outstanding INTEGER NOT NULL,
  close_price REAL NOT NULL,
  market_cap REAL NOT NULL,  -- close_price × shares_outstanding (in crores)
  source TEXT CHECK(source IN ('COMPUTED', 'SCREENER', 'MANUAL')),
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_daily_market_cap_date ON daily_market_cap(date);
CREATE INDEX IF NOT EXISTS idx_daily_market_cap_asset ON daily_market_cap(asset_id, date DESC);

-- ─── BOOK VALUE HISTORY ────────────────────────────────────────────────────
-- Stores annual book value per share (needed for B/M ratio)
CREATE TABLE IF NOT EXISTS annual_book_value (
  asset_id TEXT NOT NULL,
  fiscal_year_end TEXT NOT NULL,  -- e.g. '2023-03-31' (Indian fiscal year)
  book_value_per_share REAL NOT NULL,
  total_equity REAL,  -- equity_capital + reserves (in crores)
  shares_outstanding INTEGER,
  source TEXT CHECK(source IN ('SCREENER', 'FUNDAMENTALS', 'MANUAL')),
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, fiscal_year_end),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_annual_book_value_year ON annual_book_value(fiscal_year_end);

-- ─── RISK-FREE RATE (91-DAY T-BILLS) ───────────────────────────────────────
-- Stores RBI 91-day T-Bill yields (risk-free rate proxy)
CREATE TABLE IF NOT EXISTS rbi_tbill_yields (
  auction_date TEXT PRIMARY KEY,
  maturity_days INTEGER DEFAULT 91,
  yield_pct REAL NOT NULL,  -- Annualized yield percentage
  cutoff_price REAL,
  notified_amount REAL,  -- In crores
  source_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tbill_date ON rbi_tbill_yields(auction_date DESC);

-- ─── FACTOR BREAKPOINTS ────────────────────────────────────────────────────
-- Stores percentile breakpoints for portfolio formation
CREATE TABLE IF NOT EXISTS ff_breakpoints (
  rebalance_date TEXT NOT NULL,  -- e.g. '2023-10-01' (start of fiscal year)
  breakpoint_type TEXT NOT NULL CHECK(breakpoint_type IN ('SIZE', 'VALUE', 'MOMENTUM')),
  percentile INTEGER NOT NULL CHECK(percentile IN (30, 50, 70)),
  value REAL NOT NULL,  -- The actual breakpoint value
  num_stocks_below INTEGER,
  num_stocks_above INTEGER,
  num_stocks_total INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (rebalance_date, breakpoint_type, percentile)
);
CREATE INDEX IF NOT EXISTS idx_breakpoints_date ON ff_breakpoints(rebalance_date DESC);

-- ─── PORTFOLIO CONSTITUENTS ────────────────────────────────────────────────
-- Stores which stocks belong to which portfolios and their weights
CREATE TABLE IF NOT EXISTS ff_portfolio_constituents (
  portfolio_id TEXT NOT NULL,  -- e.g. 'SMALL_VALUE', 'BIG_LOSER', 'SMALL_HIGH'
  rebalance_date TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  weight REAL NOT NULL,  -- Value-weighted (market_cap / total_portfolio_market_cap)
  market_cap REAL,
  book_to_market REAL,
  past_12m_return REAL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (portfolio_id, rebalance_date, asset_id),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_date ON ff_portfolio_constituents(rebalance_date DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_asset ON ff_portfolio_constituents(asset_id);

-- ─── FACTOR RETURNS ────────────────────────────────────────────────────────
-- Stores computed factor returns (daily/monthly/yearly)
CREATE TABLE IF NOT EXISTS ff_factor_returns (
  date TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK(frequency IN ('DAILY', 'MONTHLY', 'YEARLY')),
  market_return REAL,  -- Rm (value-weighted market return)
  rf_rate REAL,  -- Risk-free rate (annualized)
  market_premium REAL,  -- Rm - Rf
  smb REAL,  -- Small Minus Big (size factor)
  hml REAL,  -- High Minus Low (value factor)
  wml REAL,  -- Winners Minus Losers (momentum factor)
  num_stocks INTEGER,  -- Universe size after filters
  num_portfolios INTEGER,  -- Number of portfolios formed
  source TEXT DEFAULT 'COMPUTED' CHECK(source IN ('COMPUTED', 'IIMA', 'MANUAL')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (date, frequency, source)
);
CREATE INDEX IF NOT EXISTS idx_ff_returns_date ON ff_factor_returns(date DESC);
CREATE INDEX IF NOT EXISTS idx_ff_returns_freq ON ff_factor_returns(frequency, date DESC);

-- ─── PORTFOLIO RETURNS ─────────────────────────────────────────────────────
-- Stores daily returns for each portfolio (for debugging and analysis)
CREATE TABLE IF NOT EXISTS ff_portfolio_returns (
  portfolio_id TEXT NOT NULL,
  date TEXT NOT NULL,
  return REAL NOT NULL,  -- Daily return (HPR)
  num_stocks INTEGER,
  total_market_cap REAL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (portfolio_id, date)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_returns_date ON ff_portfolio_returns(date DESC);

-- ─── VALIDATION & COMPARISON ───────────────────────────────────────────────
-- Stores comparison between our factors and IIMA's published factors
CREATE TABLE IF NOT EXISTS ff_validation (
  date TEXT NOT NULL,
  factor TEXT NOT NULL CHECK(factor IN ('MARKET', 'SMB', 'HML', 'WML')),
  our_value REAL,
  iima_value REAL,
  deviation REAL,  -- our - iima
  deviation_pct REAL,  -- (our - iima) / iima * 100
  abs_deviation REAL,  -- |our - iima|
  rolling_correlation REAL,  -- 30-day rolling correlation
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (date, factor)
);
CREATE INDEX IF NOT EXISTS idx_validation_date ON ff_validation(date DESC);
CREATE INDEX IF NOT EXISTS idx_validation_factor ON ff_validation(factor, date DESC);

-- ─── STOCK ELIGIBILITY TRACKING ────────────────────────────────────────────
-- Tracks which stocks pass filters for each rebalancing period
CREATE TABLE IF NOT EXISTS ff_stock_eligibility (
  asset_id TEXT NOT NULL,
  rebalance_date TEXT NOT NULL,
  is_eligible INTEGER DEFAULT 0,  -- 1 if passes all filters
  market_cap REAL,
  median_price REAL,  -- Median price over preceding year
  failed_filters TEXT,  -- JSON array of failed filter names
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, rebalance_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_stock_eligibility_date ON ff_stock_eligibility(rebalance_date);
CREATE INDEX IF NOT EXISTS idx_stock_eligibility_eligible ON ff_stock_eligibility(rebalance_date, is_eligible);

-- ─── COMPUTATION AUDIT LOG ─────────────────────────────────────────────────
-- Tracks factor computation runs for debugging and monitoring
CREATE TABLE IF NOT EXISTS ff_computation_log (
  id TEXT PRIMARY KEY,
  run_date TEXT NOT NULL,
  computation_type TEXT NOT NULL CHECK(computation_type IN ('DAILY', 'MONTHLY', 'REBALANCE', 'BACKFILL')),
  start_date TEXT,
  end_date TEXT,
  status TEXT NOT NULL CHECK(status IN ('RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED')),
  num_stocks_eligible INTEGER,
  num_portfolios_formed INTEGER,
  factors_computed TEXT,  -- JSON array of factor names
  error_log TEXT,
  duration_ms INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_computation_log_date ON ff_computation_log(run_date DESC);
CREATE INDEX IF NOT EXISTS idx_computation_log_status ON ff_computation_log(status);

-- ═══════════════════════════════════════════════════════════════════════════
-- VIEWS FOR CONVENIENCE
-- ═══════════════════════════════════════════════════════════════════════════

-- Latest factor returns (daily)
CREATE VIEW IF NOT EXISTS vw_latest_ff_factors AS
SELECT 
  date,
  market_return,
  rf_rate,
  market_premium,
  smb,
  hml,
  wml,
  num_stocks
FROM ff_factor_returns
WHERE frequency = 'DAILY' AND source = 'COMPUTED'
ORDER BY date DESC
LIMIT 1;

-- Factor performance summary (last 30 days)
CREATE VIEW IF NOT EXISTS vw_ff_factor_summary_30d AS
SELECT 
  'MARKET' as factor,
  AVG(market_premium) as avg_return,
  STDEV(market_premium) as volatility,
  MIN(market_premium) as min_return,
  MAX(market_premium) as max_return,
  COUNT(*) as num_days
FROM ff_factor_returns
WHERE frequency = 'DAILY' AND source = 'COMPUTED'
  AND date >= date('now', '-30 days')
UNION ALL
SELECT 
  'SMB' as factor,
  AVG(smb) as avg_return,
  STDEV(smb) as volatility,
  MIN(smb) as min_return,
  MAX(smb) as max_return,
  COUNT(*) as num_days
FROM ff_factor_returns
WHERE frequency = 'DAILY' AND source = 'COMPUTED'
  AND date >= date('now', '-30 days')
UNION ALL
SELECT 
  'HML' as factor,
  AVG(hml) as avg_return,
  STDEV(hml) as volatility,
  MIN(hml) as min_return,
  MAX(hml) as max_return,
  COUNT(*) as num_days
FROM ff_factor_returns
WHERE frequency = 'DAILY' AND source = 'COMPUTED'
  AND date >= date('now', '-30 days')
UNION ALL
SELECT 
  'WML' as factor,
  AVG(wml) as avg_return,
  STDEV(wml) as volatility,
  MIN(wml) as min_return,
  MAX(wml) as max_return,
  COUNT(*) as num_days
FROM ff_factor_returns
WHERE frequency = 'DAILY' AND source = 'COMPUTED'
  AND date >= date('now', '-30 days');

-- Validation summary (last 90 days)
CREATE VIEW IF NOT EXISTS vw_ff_validation_summary AS
SELECT 
  factor,
  COUNT(*) as num_days,
  AVG(abs_deviation) as avg_abs_deviation,
  AVG(deviation_pct) as avg_deviation_pct,
  AVG(rolling_correlation) as avg_correlation,
  MIN(rolling_correlation) as min_correlation,
  MAX(rolling_correlation) as max_correlation
FROM ff_validation
WHERE date >= date('now', '-90 days')
GROUP BY factor;

-- ═══════════════════════════════════════════════════════════════════════════
-- HELPER FUNCTIONS (SQLite doesn't support UDFs, these are for documentation)
-- ═══════════════════════════════════════════════════════════════════════════

-- Note: Standard deviation calculation for SQLite
-- STDEV(x) is not built-in, use: SQRT(AVG(x*x) - AVG(x)*AVG(x))

-- ═══════════════════════════════════════════════════════════════════════════
-- END OF SCHEMA EXTENSIONS
-- ═══════════════════════════════════════════════════════════════════════════
