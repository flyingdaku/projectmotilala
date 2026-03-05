-- ─── ASSET MASTER ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assets (
  id             TEXT PRIMARY KEY,
  isin           TEXT UNIQUE,
  nse_symbol     TEXT,
  bse_code       TEXT,
  amfi_code      TEXT,
  screener_id    TEXT,           -- e.g. 'IOC' or 'RELIANCE'
  name           TEXT NOT NULL,
  asset_class    TEXT NOT NULL CHECK(asset_class IN ('EQUITY', 'MF', 'ETF', 'INDEX')),
  series         TEXT,
  -- ── 4-level industry classification (from Screener.in peers section) ──────
  sector         TEXT,           -- Level 1: e.g. 'Energy'
  industry_group TEXT,           -- Level 2: e.g. 'Oil, Gas & Consumable Fuels'
  industry       TEXT,           -- Level 3: e.g. 'Petroleum Products'
  sub_industry   TEXT,           -- Level 4: e.g. 'Refineries & Marketing'
  screener_sector_code       TEXT, -- e.g. 'IN03'
  screener_industry_group_code TEXT, -- e.g. 'IN0301'
  screener_industry_code     TEXT, -- e.g. 'IN030103'
  screener_sub_industry_code TEXT, -- e.g. 'IN030103001'
  -- ── MSI classification (from MarketSmith India) ─────────────────────────
  msi_sector     TEXT,           -- MSI's own sector label
  msi_industry_group TEXT,       -- MSI's industry group label
  msi_group_rank INTEGER,        -- MSI's industry group rank (1-197)
  -- ── ───────────────────────────────────────────────────────────────────
  listing_date   TEXT,
  delisting_date TEXT,
  is_active      INTEGER DEFAULT 1,
  nse_listed     INTEGER DEFAULT 0,
  bse_listed     INTEGER DEFAULT 0,
  classification_updated_at TEXT, -- when sector/industry was last synced
  created_at     TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_assets_nse_symbol  ON assets(nse_symbol);
CREATE INDEX IF NOT EXISTS idx_assets_bse_code    ON assets(bse_code);
CREATE INDEX IF NOT EXISTS idx_assets_isin        ON assets(isin);
CREATE INDEX IF NOT EXISTS idx_assets_asset_class ON assets(asset_class);

-- ─── DAILY PRICES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_prices (
  asset_id        TEXT NOT NULL,
  date            TEXT NOT NULL,
  open            REAL,
  high            REAL,
  low             REAL,
  close           REAL NOT NULL,
  adj_close       REAL,
  volume          INTEGER,
  trades          INTEGER,
  source_exchange TEXT NOT NULL CHECK(source_exchange IN ('NSE', 'BSE', 'AMFI')),
  is_verified     INTEGER DEFAULT 0,
  PRIMARY KEY     (asset_id, date),
  FOREIGN KEY     (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_daily_prices_asset_date ON daily_prices(asset_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_prices_date       ON daily_prices(date);

-- ─── CORPORATE ACTIONS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS corporate_actions (
  id                TEXT PRIMARY KEY,
  asset_id          TEXT NOT NULL,
  action_type       TEXT NOT NULL CHECK(action_type IN ('SPLIT','BONUS','DIVIDEND','RIGHTS','MERGER','DEMERGER','BUYBACK','NAME_CHANGE','FACE_VALUE_CHANGE')),
  ex_date           TEXT NOT NULL,
  record_date       TEXT,
  announcement_date TEXT,
  ratio_numerator   REAL,
  ratio_denominator REAL,
  dividend_amount   REAL,
  rights_ratio      TEXT,
  rights_price      REAL,
  adjustment_factor REAL,
  source_exchange   TEXT,
  raw_announcement  TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  FOREIGN KEY       (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_corp_actions_asset  ON corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_corp_actions_exdate ON corporate_actions(ex_date);
CREATE INDEX IF NOT EXISTS idx_corp_actions_type   ON corporate_actions(action_type);

-- ─── MERGER EVENTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS merger_events (
  id                  TEXT PRIMARY KEY,
  acquired_asset_id   TEXT,
  acquirer_asset_id   TEXT,
  effective_date      TEXT NOT NULL,
  swap_ratio_acquired REAL,
  swap_ratio_acquirer REAL,
  notes               TEXT,
  FOREIGN KEY (acquired_asset_id) REFERENCES assets(id),
  FOREIGN KEY (acquirer_asset_id) REFERENCES assets(id)
);

-- ─── FUNDAMENTALS (Unified View) ──────────────────────────────
CREATE TABLE IF NOT EXISTS fundamentals (
  id                   TEXT PRIMARY KEY,
  asset_id             TEXT NOT NULL,
  period_end_date      TEXT NOT NULL,
  fiscal_quarter       TEXT,
  fiscal_year          TEXT,
  is_consolidated      INTEGER DEFAULT 1,
  revenue              REAL,
  operating_profit     REAL,
  ebit                 REAL,
  interest             REAL,
  pbt                  REAL,
  tax                  REAL,
  pat                  REAL,
  eps                  REAL,
  total_assets         REAL,
  total_equity         REAL,
  total_debt           REAL,
  cash_equivalents     REAL,
  cfo                  REAL,
  capex                REAL,
  fcf                  REAL,
  book_value_per_share REAL,
  shares_outstanding   INTEGER,
  source               TEXT,
  filing_date          TEXT,
  created_at           TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date, is_consolidated),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_fundamentals_asset ON fundamentals(asset_id, period_end_date DESC);

-- ─── SOURCE-SPECIFIC FUNDAMENTALS ─────────────────────────────
-- Dropped nse_fundamentals and bse_fundamentals (0 rows, subsumed by MSI/Screener)

CREATE TABLE IF NOT EXISTS src_screener_quarterly (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  is_consolidated         INTEGER DEFAULT 1,
  sales                   REAL,
  expenses                REAL,
  operating_profit        REAL,
  opm_pct                 REAL,
  other_income            REAL,
  interest                REAL,
  depreciation            REAL,
  pbt                     REAL,
  tax_pct                 REAL,
  net_profit              REAL,
  eps                     REAL,
  raw_html                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date, is_consolidated),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_screener_balance_sheet (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  share_capital           REAL,
  reserves                REAL,
  borrowings              REAL,
  other_liabilities       REAL,
  total_liabilities       REAL,
  fixed_assets            REAL,
  cwip                    REAL,
  investments             REAL,
  other_assets            REAL,
  total_assets            REAL,
  raw_html                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_screener_cashflow (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  cash_from_operating     REAL,
  cash_from_investing     REAL,
  cash_from_financing     REAL,
  net_cash_flow           REAL,
  raw_html                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_screener_ratios (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  debtor_days             REAL,
  inventory_days          REAL,
  days_payable            REAL,
  cash_conversion_cycle   REAL,
  working_capital_days    REAL,
  roc_pct                 REAL,
  raw_html                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_screener_shareholding (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  promoters_pct           REAL,
  fii_pct                 REAL,
  dii_pct                 REAL,
  government_pct          REAL,
  public_pct              REAL,
  num_shareholders        INTEGER,
  raw_html                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS fundamental_conflicts (
  id                TEXT PRIMARY KEY,
  asset_id          TEXT NOT NULL,
  period_end_date   TEXT NOT NULL,
  field_name        TEXT NOT NULL,
  nse_value         REAL,
  bse_value         REAL,
  scr_value         REAL,
  chosen_source     TEXT,
  pct_deviation     REAL,
  resolved_at       TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- ─── PRE-COMPUTED METRICS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS asset_metrics (
  asset_id         TEXT PRIMARY KEY,
  computed_on      TEXT NOT NULL,
  return_1d        REAL,
  return_1w        REAL,
  return_1m        REAL,
  return_3m        REAL,
  return_6m        REAL,
  return_1y        REAL,
  return_3y        REAL,
  return_5y        REAL,
  return_10y       REAL,
  volatility_1y    REAL,
  beta_1y          REAL,
  max_drawdown_1y  REAL,
  sharpe_1y        REAL,
  pe_ratio         REAL,
  pb_ratio         REAL,
  ev_ebitda        REAL,
  market_cap       REAL,
  updated_at       TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

-- ─── PIPELINE AUDIT LOG ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS pipeline_runs (
  id               TEXT PRIMARY KEY,
  run_date         TEXT NOT NULL,
  pipeline_type    TEXT NOT NULL DEFAULT 'DAILY', -- DAILY / BACKFILL / WEEKLY
  source           TEXT NOT NULL,
  status           TEXT NOT NULL CHECK(status IN ('SUCCESS', 'PARTIAL', 'FAILED')),
  records_inserted INTEGER,
  records_skipped  INTEGER,
  circuit_breaks   INTEGER,
  error_log        TEXT,
  duration_ms      INTEGER,
  created_at       TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pipeline_runs_date ON pipeline_runs(run_date DESC);

-- ─── NSE TRADING CALENDAR CACHE ───────────────────────────────
CREATE TABLE IF NOT EXISTS trading_holidays (
  date        TEXT PRIMARY KEY,
  description TEXT,
  exchange    TEXT NOT NULL DEFAULT 'NSE',
  fetched_at  TEXT DEFAULT (datetime('now'))
);

-- Enable WAL mode for better concurrent write performance
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;
