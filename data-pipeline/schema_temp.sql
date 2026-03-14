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
  face_value     REAL,
  website_url    TEXT,
  description    TEXT,
  management_json TEXT,
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
  source_exchange TEXT NOT NULL CHECK(source_exchange IN ('NSE', 'BSE', 'AMFI', 'NSE_TRI')),
  is_verified     INTEGER DEFAULT 0,
  PRIMARY KEY     (asset_id, date),
  FOREIGN KEY     (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_daily_prices_asset_date ON daily_prices(asset_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_prices_date       ON daily_prices(date);

-- ─── CORPORATE ACTIONS ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS src_nse_corporate_actions (
  id                TEXT PRIMARY KEY,
  asset_id          TEXT NOT NULL,
  symbol            TEXT,
  series            TEXT,
  subject           TEXT,
  ex_date           TEXT,
  record_date       TEXT,
  bc_start_date     TEXT,
  bc_end_date       TEXT,
  nd_start_date     TEXT,
  nd_end_date       TEXT,
  company_name      TEXT,
  isin              TEXT,
  face_value        TEXT,
  raw_json          TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, ex_date, subject),
  FOREIGN KEY       (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_src_nse_ca_asset  ON src_nse_corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_src_nse_ca_exdate ON src_nse_corporate_actions(ex_date);

CREATE TABLE IF NOT EXISTS src_bse_corporate_actions (
  id                TEXT PRIMARY KEY,
  asset_id          TEXT NOT NULL,
  scrip_code        TEXT,
  scrip_name        TEXT,
  purpose           TEXT,
  ex_date           TEXT,
  record_date       TEXT,
  bc_start_date     TEXT,
  bc_end_date       TEXT,
  nd_start_date     TEXT,
  nd_end_date       TEXT,
  raw_json          TEXT,
  created_at        TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, ex_date, purpose),
  FOREIGN KEY       (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_src_bse_ca_asset  ON src_bse_corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_src_bse_ca_exdate ON src_bse_corporate_actions(ex_date);
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
  trade_receivables    REAL,
  cfo                  REAL,
  cash_from_investing  REAL,
  cash_from_financing  REAL,
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

CREATE TABLE IF NOT EXISTS msi_company_data (
  asset_id                TEXT PRIMARY KEY,
  msi_instrument_id       INTEGER,
  master_score            INTEGER,
  eps_rating              INTEGER,
  rs_rating               INTEGER,
  composite_rating        INTEGER,
  smr_rating              TEXT,
  acc_dis_rating          TEXT,
  price_strength          REAL,
  week_high_52            REAL,
  week_low_52             REAL,
  pct_from_high           REAL,
  buyer_demand            TEXT,
  group_rank              INTEGER,
  industry_group          TEXT,
  industry_group_rank     TEXT,
  sector                  TEXT,
  sub_group               TEXT,
  industry_symbol         TEXT,
  market_cap              REAL,
  pe_ratio                REAL,
  roe_ttm                 REAL,
  book_value_per_share_ttm REAL,
  dividend_yield_ttm      REAL,
  total_shares_thousands  REAL,
  shares_in_float_thousands REAL,
  cash_flow_ttm           REAL,
  debt                    REAL,
  website_url             TEXT,
  canslim_checklist       TEXT,
  red_flags               TEXT,
  chart_patterns          TEXT,
  ai_report_summary       TEXT,
  updated_at              TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_fundamentals_annual (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  revenue_ops             REAL,
  total_revenue           REAL,
  other_income            REAL,
  operating_profit        REAL,
  ebit                    REAL,
  materials_consumed      REAL,
  employee_benefits       REAL,
  depreciation            REAL,
  ebitda                  REAL,
  finance_costs           REAL,
  profit_before_tax       REAL,
  tax_amount              REAL,
  net_profit              REAL,
  basic_eps               REAL,
  diluted_eps             REAL,
  dividend_rate           REAL,
  sales_growth_yoy        REAL,
  pat_growth_yoy          REAL,
  eps_growth_yoy          REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_ratios_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ebit_margin             REAL,
  pre_tax_margin          REAL,
  net_profit_margin       REAL,
  roe                     REAL,
  roa                     REAL,
  roce                    REAL,
  debt_equity             REAL,
  current_ratio           REAL,
  quick_ratio             REAL,
  interest_coverage       REAL,
  asset_turnover          REAL,
  inventory_turnover      REAL,
  debtor_days             REAL,
  creditor_days           REAL,
  sales                   REAL,
  sales_growth_yoy        REAL,
  net_income              REAL,
  net_income_growth_yoy   REAL,
  basic_eps               REAL,
  basic_eps_growth_yoy    REAL,
  book_value_per_share    REAL,
  ebit                    REAL,
  ev_ebitda               REAL,
  dividend_payout         REAL,
  earnings_retention      REAL,
  cash_earnings_retention REAL,
  pbdit_margin            REAL,
  ebit_growth_yoy         REAL,
  pre_tax_income          REAL,
  pre_tax_income_growth_yoy REAL,
  total_sales             REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_fundamentals_annual_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  revenue_ops             REAL,
  total_revenue           REAL,
  other_income            REAL,
  operating_profit        REAL,
  ebit                    REAL,
  materials_consumed      REAL,
  employee_benefits       REAL,
  depreciation            REAL,
  ebitda                  REAL,
  finance_costs           REAL,
  profit_before_tax       REAL,
  tax_amount              REAL,
  net_profit              REAL,
  basic_eps               REAL,
  diluted_eps             REAL,
  dividend_rate           REAL,
  sales_growth_yoy        REAL,
  pat_growth_yoy          REAL,
  eps_growth_yoy          REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_quarterly (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  revenue_ops             REAL,
  total_revenue           REAL,
  other_income            REAL,
  operating_profit        REAL,
  ebit                    REAL,
  materials_consumed      REAL,
  employee_benefits       REAL,
  depreciation            REAL,
  ebitda                  REAL,
  finance_costs           REAL,
  profit_before_tax       REAL,
  tax_amount              REAL,
  net_profit              REAL,
  basic_eps               REAL,
  diluted_eps             REAL,
  traded_goods            REAL,
  power_fuel              REAL,
  admin_selling           REAL,
  research_dev            REAL,
  other_expenses          REAL,
  sales_growth_yoy        REAL,
  pat_growth_yoy          REAL,
  eps_growth_yoy          REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_quarterly_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  revenue_ops             REAL,
  total_revenue           REAL,
  other_income            REAL,
  operating_profit        REAL,
  ebit                    REAL,
  materials_consumed      REAL,
  employee_benefits       REAL,
  depreciation            REAL,
  ebitda                  REAL,
  finance_costs           REAL,
  profit_before_tax       REAL,
  tax_amount              REAL,
  net_profit              REAL,
  basic_eps               REAL,
  diluted_eps             REAL,
  traded_goods            REAL,
  power_fuel              REAL,
  admin_selling           REAL,
  research_dev            REAL,
  other_expenses          REAL,
  sales_growth_yoy        REAL,
  pat_growth_yoy          REAL,
  eps_growth_yoy          REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_balance_sheet (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  equity_shares_number    REAL,
  equity_capital          REAL,
  reserves                REAL,
  shareholders_funds_total REAL,
  long_term_borrowings    REAL,
  short_term_borrowings   REAL,
  total_liabilities       REAL,
  fixed_assets            REAL,
  tangible_assets         REAL,
  intangible_assets       REAL,
  goodwill                REAL,
  cwip                    REAL,
  investments             REAL,
  inventories             REAL,
  trade_receivables       REAL,
  cash_equivalents        REAL,
  other_assets            REAL,
  trade_payables          REAL,
  other_current_liabilities REAL,
  total_current_liabilities REAL,
  total_current_assets    REAL,
  total_assets            REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_balance_sheet_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  equity_shares_number    REAL,
  equity_capital          REAL,
  reserves                REAL,
  shareholders_funds_total REAL,
  long_term_borrowings    REAL,
  short_term_borrowings   REAL,
  total_liabilities       REAL,
  fixed_assets            REAL,
  tangible_assets         REAL,
  intangible_assets       REAL,
  goodwill                REAL,
  cwip                    REAL,
  investments             REAL,
  inventories             REAL,
  trade_receivables       REAL,
  cash_equivalents        REAL,
  other_assets            REAL,
  trade_payables          REAL,
  other_current_liabilities REAL,
  total_current_liabilities REAL,
  total_current_assets    REAL,
  total_assets            REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_cashflow (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ops_profit_before_wc    REAL,
  wc_changes              REAL,
  net_cash_operating      REAL,
  capex                   REAL,
  free_cash_flow          REAL,
  net_cash_investing      REAL,
  net_cash_financing      REAL,
  dividend_paid           REAL,
  net_change_in_cash      REAL,
  cash_begin_of_year      REAL,
  cash_end_of_year        REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_cashflow_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ops_profit_before_wc    REAL,
  wc_changes              REAL,
  net_cash_operating      REAL,
  capex                   REAL,
  free_cash_flow          REAL,
  net_cash_investing      REAL,
  net_cash_financing      REAL,
  dividend_paid           REAL,
  net_change_in_cash      REAL,
  cash_begin_of_year      REAL,
  cash_end_of_year        REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_annual (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ebit_margin             REAL,
  pre_tax_margin          REAL,
  net_profit_margin       REAL,
  roe                     REAL,
  roa                     REAL,
  roce                    REAL,
  debt_equity             REAL,
  current_ratio           REAL,
  quick_ratio             REAL,
  interest_coverage       REAL,
  asset_turnover          REAL,
  inventory_turnover      REAL,
  debtor_days             REAL,
  creditor_days           REAL,
  sales                   REAL,
  sales_growth_yoy        REAL,
  net_income              REAL,
  net_income_growth_yoy   REAL,
  basic_eps               REAL,
  basic_eps_growth_yoy    REAL,
  book_value_per_share    REAL,
  ebit                    REAL,
  ev_ebitda               REAL,
  dividend_payout         REAL,
  earnings_retention      REAL,
  cash_earnings_retention REAL,
  pbdit_margin            REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_annual_standalone (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ebit_margin             REAL,
  pre_tax_margin          REAL,
  net_profit_margin       REAL,
  roe                     REAL,
  roa                     REAL,
  roce                    REAL,
  debt_equity             REAL,
  current_ratio           REAL,
  quick_ratio             REAL,
  interest_coverage       REAL,
  asset_turnover          REAL,
  inventory_turnover      REAL,
  debtor_days             REAL,
  creditor_days           REAL,
  sales                   REAL,
  sales_growth_yoy        REAL,
  net_income              REAL,
  net_income_growth_yoy   REAL,
  basic_eps               REAL,
  basic_eps_growth_yoy    REAL,
  book_value_per_share    REAL,
  ebit                    REAL,
  ev_ebitda               REAL,
  dividend_payout         REAL,
  earnings_retention      REAL,
  cash_earnings_retention REAL,
  pbdit_margin            REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_ratios (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  ebit_margin             REAL,
  pre_tax_margin          REAL,
  net_profit_margin       REAL,
  roe                     REAL,
  roa                     REAL,
  roce                    REAL,
  debt_equity             REAL,
  current_ratio           REAL,
  quick_ratio             REAL,
  interest_coverage       REAL,
  asset_turnover          REAL,
  inventory_turnover      REAL,
  debtor_days             REAL,
  creditor_days           REAL,
  sales                   REAL,
  sales_growth_yoy        REAL,
  net_income              REAL,
  net_income_growth_yoy   REAL,
  basic_eps               REAL,
  basic_eps_growth_yoy    REAL,
  book_value_per_share    REAL,
  ebit                    REAL,
  ev_ebitda               REAL,
  dividend_payout         REAL,
  earnings_retention      REAL,
  cash_earnings_retention REAL,
  pbdit_margin            REAL,
  ebit_growth_yoy         REAL,
  pre_tax_income          REAL,
  pre_tax_income_growth_yoy REAL,
  total_sales             REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_shareholding (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  promoter_holding        REAL,
  promoter_change_qoq     REAL,
  fii_holding             REAL,
  fii_change_qoq          REAL,
  dii_holding             REAL,
  dii_change_qoq          REAL,
  public_holding          REAL,
  pledged_shares          REAL,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_top_owners (
  asset_id                TEXT NOT NULL,
  holding_date            TEXT NOT NULL,
  shareholder_name        TEXT NOT NULL,
  holding_pct             REAL,
  is_top_investor         INTEGER DEFAULT 0,
  PRIMARY KEY (asset_id, holding_date, shareholder_name),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_management (
  asset_id                TEXT NOT NULL,
  person_name             TEXT NOT NULL,
  designation             TEXT,
  PRIMARY KEY (asset_id, person_name, designation),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_chart_patterns (
  asset_id                TEXT NOT NULL,
  pattern_type            TEXT NOT NULL,
  status                  TEXT,
  pivot_price             REAL,
  depth_pct               REAL,
  detected_on             TEXT,
  raw_json                TEXT,
  PRIMARY KEY (asset_id, pattern_type, detected_on),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_msi_institutional_activity (
  asset_id                TEXT NOT NULL,
  period_end_date         TEXT NOT NULL,
  fii_buy_value           REAL,
  fii_sell_value          REAL,
  dii_buy_value           REAL,
  dii_sell_value          REAL,
  net_fii                 REAL,
  net_dii                 REAL,
  raw_json                TEXT,
  PRIMARY KEY (asset_id, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_company_map (
  asset_id                TEXT PRIMARY KEY,
  company_url             TEXT NOT NULL UNIQUE,
  isin_token              TEXT,
  group_slug              TEXT,
  exchange_code           TEXT,
  symbol_slug             TEXT,
  company_slug            TEXT,
  is_active               INTEGER DEFAULT 1,
  last_scraped_at         TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  updated_at              TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_page_fetches (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  tab_key                 TEXT NOT NULL,
  page_kind               TEXT NOT NULL DEFAULT '',
  page_number             INTEGER DEFAULT 1,
  request_url             TEXT NOT NULL,
  final_url               TEXT,
  raw_path                TEXT,
  http_status             INTEGER,
  content_hash            TEXT,
  parse_status            TEXT,
  parse_error             TEXT,
  fetched_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, tab_key, page_kind, page_number, request_url),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_management_entities (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL,
  entity_kind             TEXT,
  entity_url              TEXT,
  source_tab              TEXT NOT NULL DEFAULT 'management',
  is_primary              INTEGER DEFAULT 0,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, source_tab),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_management_people (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  person_name             TEXT NOT NULL,
  designation             TEXT,
  role_type               TEXT,
  committee_name          TEXT,
  appointment_date        TEXT,
  cessation_date          TEXT,
  profile_text            TEXT,
  connected_companies_json TEXT,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, person_name, designation),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_company_overview (
  asset_id                TEXT PRIMARY KEY,
  company_name            TEXT,
  isin                    TEXT,
  cin                     TEXT,
  listing_date            TEXT,
  phone                   TEXT,
  email                   TEXT,
  website_url             TEXT,
  address_text            TEXT,
  market_cap_text         TEXT,
  face_value_text         TEXT,
  book_value_text         TEXT,
  pe_ttm_text             TEXT,
  dividend_yield_text     TEXT,
  auditors_json           TEXT,
  overview_json           TEXT,
  source_page_url         TEXT,
  updated_at              TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_shareholding_summary (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  period_end_date         TEXT NOT NULL,
  promoter_holding        REAL,
  promoter_group_holding  REAL,
  fii_holding             REAL,
  dii_holding             REAL,
  mutual_fund_holding     REAL,
  insurance_holding       REAL,
  government_holding      REAL,
  public_holding          REAL,
  non_institutional_holding REAL,
  other_holding           REAL,
  pledged_shares_pct      REAL,
  total_holding_reported  REAL,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, period_end_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_shareholding_categories (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  period_end_date         TEXT NOT NULL,
  parent_category         TEXT,
  category_name           TEXT NOT NULL,
  holding_pct             REAL,
  share_count             REAL,
  change_qoq_pct          REAL,
  row_order               INTEGER,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, period_end_date, category_name),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_bulk_deals (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  deal_date               TEXT,
  exchange                TEXT,
  buyer_name              TEXT,
  seller_name             TEXT,
  quantity                REAL,
  price                   REAL,
  deal_value              REAL,
  percent_equity          REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, deal_date, buyer_name, seller_name, quantity, price),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_block_deals (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  deal_date               TEXT,
  exchange                TEXT,
  buyer_name              TEXT,
  seller_name             TEXT,
  quantity                REAL,
  price                   REAL,
  deal_value              REAL,
  percent_equity          REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, deal_date, buyer_name, seller_name, quantity, price),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_insider_trades (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  disclosure_date         TEXT,
  trade_date              TEXT,
  insider_name            TEXT,
  designation             TEXT,
  relation_type           TEXT,
  transaction_type        TEXT,
  security_type           TEXT,
  quantity                REAL,
  price                   REAL,
  trade_value             REAL,
  pre_holding             REAL,
  post_holding            REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, disclosure_date, insider_name, transaction_type, quantity, price),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_sast_events (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  event_date              TEXT,
  filing_date             TEXT,
  acquirer_name           TEXT,
  seller_name             TEXT,
  event_type              TEXT,
  trigger_type            TEXT,
  pre_holding_pct         REAL,
  post_holding_pct        REAL,
  shares_acquired         REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, event_date, acquirer_name, event_type),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_pledge_shares (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  period_end_date         TEXT,
  promoter_name           TEXT,
  event_type              TEXT,
  pledged_shares          REAL,
  released_shares         REAL,
  promoter_holding_shares REAL,
  pledged_pct_of_promoter REAL,
  pledged_pct_of_total    REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, period_end_date, promoter_name, event_type),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_capital_history (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  effective_date          TEXT,
  event_type              TEXT,
  ratio_text              TEXT,
  face_value_from         REAL,
  face_value_to           REAL,
  quantity_before         REAL,
  quantity_after          REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, effective_date, event_type, ratio_text),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_filings (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  filing_type             TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  event_date              TEXT,
  filing_date             TEXT,
  headline                TEXT,
  subcategory             TEXT,
  exchange                TEXT,
  reference_no            TEXT,
  detail_text             TEXT,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, filing_type, entity_name, filing_date, headline, reference_no),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_filing_attachments (
  id                      TEXT PRIMARY KEY,
  filing_id               TEXT NOT NULL,
  label                   TEXT,
  attachment_url          TEXT NOT NULL,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (filing_id, attachment_url),
  FOREIGN KEY (filing_id) REFERENCES src_cogencis_filings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS src_cogencis_corporate_actions (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  subcategory             TEXT NOT NULL DEFAULT 'ALL',
  announcement_date       TEXT,
  ex_date                 TEXT,
  record_date             TEXT,
  action_type             TEXT,
  ratio_text              TEXT,
  amount_text             TEXT,
  notes_text              TEXT,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, subcategory, ex_date, action_type, ratio_text, amount_text),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS src_cogencis_due_diligence_entries (
  id                      TEXT PRIMARY KEY,
  asset_id                TEXT NOT NULL,
  entity_name             TEXT NOT NULL DEFAULT '',
  table_name              TEXT NOT NULL,
  row_label               TEXT,
  column_name             TEXT NOT NULL,
  column_value            TEXT,
  row_order               INTEGER,
  col_order               INTEGER,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, table_name, row_label, column_name, row_order, col_order),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE INDEX IF NOT EXISTS idx_cogencis_fetch_asset_tab ON src_cogencis_page_fetches(asset_id, tab_key, page_kind, page_number);
CREATE INDEX IF NOT EXISTS idx_cogencis_mgmt_asset ON src_cogencis_management_people(asset_id, entity_name);
CREATE INDEX IF NOT EXISTS idx_cogencis_overview_asset ON src_cogencis_company_overview(asset_id);
CREATE INDEX IF NOT EXISTS idx_cogencis_sh_summary_asset ON src_cogencis_shareholding_summary(asset_id, period_end_date DESC);
CREATE INDEX IF NOT EXISTS idx_cogencis_sh_cat_asset ON src_cogencis_shareholding_categories(asset_id, period_end_date DESC);
CREATE INDEX IF NOT EXISTS idx_cogencis_filings_asset ON src_cogencis_filings(asset_id, filing_type, filing_date DESC);
CREATE INDEX IF NOT EXISTS idx_cogencis_ca_asset ON src_cogencis_corporate_actions(asset_id, ex_date DESC);
CREATE INDEX IF NOT EXISTS idx_cogencis_dd_asset ON src_cogencis_due_diligence_entries(asset_id, table_name);

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

CREATE TABLE IF NOT EXISTS daily_market_cap (
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  shares_outstanding INTEGER NOT NULL,
  close_price REAL NOT NULL,
  market_cap REAL NOT NULL,
  source TEXT CHECK(source IN ('COMPUTED', 'SCREENER', 'MANUAL')),
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_daily_market_cap_date ON daily_market_cap(date);
CREATE INDEX IF NOT EXISTS idx_daily_market_cap_asset ON daily_market_cap(asset_id, date DESC);

CREATE TABLE IF NOT EXISTS annual_book_value (
  asset_id TEXT NOT NULL,
  fiscal_year_end TEXT NOT NULL,
  book_value_per_share REAL NOT NULL,
  total_equity REAL,
  shares_outstanding INTEGER,
  source TEXT CHECK(source IN ('SCREENER', 'FUNDAMENTALS', 'MANUAL')),
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, fiscal_year_end),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_annual_book_value_year ON annual_book_value(fiscal_year_end);

CREATE TABLE IF NOT EXISTS rbi_tbill_yields (
  auction_date TEXT PRIMARY KEY,
  maturity_days INTEGER DEFAULT 91,
  yield_pct REAL NOT NULL,
  cutoff_price REAL,
  notified_amount REAL,
  source_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_tbill_date ON rbi_tbill_yields(auction_date DESC);

CREATE TABLE IF NOT EXISTS ff_breakpoints (
  rebalance_date TEXT NOT NULL,
  breakpoint_type TEXT NOT NULL CHECK(breakpoint_type IN ('SIZE', 'VALUE', 'MOMENTUM')),
  percentile INTEGER NOT NULL CHECK(percentile IN (30, 50, 70)),
  value REAL NOT NULL,
  num_stocks_below INTEGER,
  num_stocks_above INTEGER,
  num_stocks_total INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (rebalance_date, breakpoint_type, percentile)
);
CREATE INDEX IF NOT EXISTS idx_breakpoints_date ON ff_breakpoints(rebalance_date DESC);

CREATE TABLE IF NOT EXISTS ff_portfolio_constituents (
  portfolio_id TEXT NOT NULL,
  rebalance_date TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  weight REAL NOT NULL,
  market_cap REAL,
  book_to_market REAL,
  past_12m_return REAL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (portfolio_id, rebalance_date, asset_id),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_date ON ff_portfolio_constituents(rebalance_date DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_constituents_asset ON ff_portfolio_constituents(asset_id);

CREATE TABLE IF NOT EXISTS ff_factor_returns (
  date TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK(frequency IN ('DAILY', 'MONTHLY', 'YEARLY')),
  market_return REAL,
  rf_rate REAL,
  market_premium REAL,
  smb REAL,
  hml REAL,
  wml REAL,
  num_stocks INTEGER,
  num_portfolios INTEGER,
  source TEXT DEFAULT 'COMPUTED' CHECK(source IN ('COMPUTED', 'IIMA', 'MANUAL')),
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (date, frequency, source)
);
CREATE INDEX IF NOT EXISTS idx_ff_returns_date ON ff_factor_returns(date DESC);
CREATE INDEX IF NOT EXISTS idx_ff_returns_freq ON ff_factor_returns(frequency, date DESC);

-- ─── INDEX METADATA ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS index_metadata (
  id                    TEXT PRIMARY KEY,
  asset_id              TEXT NOT NULL UNIQUE,
  index_name            TEXT NOT NULL,
  nse_symbol            TEXT,
  -- ── Classification ──────────────────────────────────────────
  category              TEXT CHECK(category IN ('BROAD_MARKET', 'SECTORAL', 'THEMATIC', 'STRATEGY', 'FIXED_INCOME', 'COMMODITY', 'CUSTOM')),
  sub_category          TEXT,
  index_type            TEXT CHECK(index_type IN ('BENCHMARK', 'SECTOR', 'THEMATIC', 'FACTOR', 'LEVERAGED', 'INVERSE', 'CUSTOM')),
  -- ── Data Source & Quality ───────────────────────────────────
  primary_source        TEXT NOT NULL CHECK(primary_source IN ('NSE_TRI', 'NSE', 'BSE', 'CUSTOM')),
  data_type             TEXT CHECK(data_type IN ('TRI', 'PRI', 'MIXED')),
  has_full_ohlc         INTEGER DEFAULT 0,
  -- ── Coverage & Status ───────────────────────────────────────
  earliest_date         TEXT,
  latest_date           TEXT,
  total_records         INTEGER DEFAULT 0,
  last_updated          TEXT,
  update_frequency      TEXT CHECK(update_frequency IN ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'INACTIVE')),
  is_active             INTEGER DEFAULT 1,
  -- ── Index Characteristics ───────────────────────────────────
  base_date             TEXT,
  base_value            REAL,
  num_constituents      INTEGER,
  rebalance_frequency   TEXT CHECK(rebalance_frequency IN ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL', 'NA')),
  methodology_url       TEXT,
  -- ── Data Quality Metrics ────────────────────────────────────
  coverage_pct          REAL,
  data_completeness     TEXT CHECK(data_completeness IN ('COMPLETE', 'PARTIAL', 'SPARSE', 'UNKNOWN')),
  has_gaps              INTEGER DEFAULT 0,
  gap_count             INTEGER DEFAULT 0,
  longest_gap_days      INTEGER,
  -- ── Extensible Fields ───────────────────────────────────────
  tags                  TEXT,
  notes                 TEXT,
  metadata_json         TEXT,
  -- ── Audit Fields ────────────────────────────────────────────
  created_at            TEXT DEFAULT (datetime('now')),
  updated_at            TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE INDEX IF NOT EXISTS idx_index_metadata_asset ON index_metadata(asset_id);
CREATE INDEX IF NOT EXISTS idx_index_metadata_category ON index_metadata(category, sub_category);
CREATE INDEX IF NOT EXISTS idx_index_metadata_source ON index_metadata(primary_source);
CREATE INDEX IF NOT EXISTS idx_index_metadata_active ON index_metadata(is_active, update_frequency);
CREATE INDEX IF NOT EXISTS idx_index_metadata_updated ON index_metadata(last_updated DESC);

CREATE TABLE IF NOT EXISTS ff_portfolio_returns (
  portfolio_id TEXT NOT NULL,
  date TEXT NOT NULL,
  return REAL NOT NULL,
  num_stocks INTEGER,
  total_market_cap REAL,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (portfolio_id, date)
);
CREATE INDEX IF NOT EXISTS idx_portfolio_returns_date ON ff_portfolio_returns(date DESC);

CREATE TABLE IF NOT EXISTS ff_validation (
  date TEXT NOT NULL,
  factor TEXT NOT NULL CHECK(factor IN ('MARKET', 'SMB', 'HML', 'WML')),
  our_value REAL,
  iima_value REAL,
  deviation REAL,
  deviation_pct REAL,
  abs_deviation REAL,
  rolling_correlation REAL,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (date, factor)
);
CREATE INDEX IF NOT EXISTS idx_validation_date ON ff_validation(date DESC);
CREATE INDEX IF NOT EXISTS idx_validation_factor ON ff_validation(factor, date DESC);

CREATE TABLE IF NOT EXISTS ff_stock_eligibility (
  asset_id TEXT NOT NULL,
  rebalance_date TEXT NOT NULL,
  is_eligible INTEGER DEFAULT 0,
  market_cap REAL,
  median_price REAL,
  failed_filters TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, rebalance_date),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_stock_eligibility_date ON ff_stock_eligibility(rebalance_date);
CREATE INDEX IF NOT EXISTS idx_stock_eligibility_eligible ON ff_stock_eligibility(rebalance_date, is_eligible);

CREATE TABLE IF NOT EXISTS ff_computation_log (
  id TEXT PRIMARY KEY,
  run_date TEXT NOT NULL,
  computation_type TEXT NOT NULL CHECK(computation_type IN ('DAILY', 'MONTHLY', 'REBALANCE', 'BACKFILL')),
  start_date TEXT,
  end_date TEXT,
  status TEXT NOT NULL CHECK(status IN ('RUNNING', 'SUCCESS', 'PARTIAL', 'FAILED')),
  num_stocks_eligible INTEGER,
  num_portfolios_formed INTEGER,
  factors_computed TEXT,
  error_log TEXT,
  duration_ms INTEGER,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_computation_log_date ON ff_computation_log(run_date DESC);
CREATE INDEX IF NOT EXISTS idx_computation_log_status ON ff_computation_log(status);

CREATE TABLE IF NOT EXISTS ff_iima_portfolio_returns (
  date TEXT NOT NULL,
  frequency TEXT NOT NULL CHECK(frequency IN ('DAILY', 'MONTHLY', 'YEARLY')),
  portfolio_family TEXT NOT NULL CHECK(portfolio_family IN ('SIZE_VALUE', 'SIZE_MOMENTUM')),
  portfolio_code TEXT NOT NULL,
  return_pct REAL NOT NULL,
  release_tag TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (date, frequency, portfolio_family, portfolio_code)
);
CREATE INDEX IF NOT EXISTS idx_ff_iima_portfolio_returns_lookup ON ff_iima_portfolio_returns(portfolio_family, frequency, date DESC);

CREATE TABLE IF NOT EXISTS ff_iima_breakpoints (
  period_key TEXT NOT NULL,
  breakpoint_family TEXT NOT NULL CHECK(breakpoint_family IN ('SIZE_VALUE', 'SIZE_MOMENTUM')),
  size_p90 REAL,
  low_cut REAL,
  high_cut REAL,
  release_tag TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (period_key, breakpoint_family)
);
CREATE INDEX IF NOT EXISTS idx_ff_iima_breakpoints_family_period ON ff_iima_breakpoints(breakpoint_family, period_key DESC);

CREATE TABLE IF NOT EXISTS ff_iima_drawdowns (
  factor_code TEXT PRIMARY KEY CHECK(factor_code IN ('ERP', 'HML', 'SMB', 'WML')),
  factor_name TEXT NOT NULL,
  annualized_return REAL,
  annualized_volatility REAL,
  worst_drawdown REAL,
  drawdown_duration_years REAL,
  source_url TEXT,
  release_tag TEXT,
  created_at TEXT DEFAULT (datetime('now'))
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

-- ─── INDEX CONSTITUENTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS index_constituents (
  index_id        TEXT NOT NULL,
  asset_id        TEXT NOT NULL,
  date            TEXT NOT NULL,
  weight          REAL NOT NULL,
  ffmc            REAL,
  created_at      TEXT DEFAULT (datetime('now')),
  PRIMARY KEY     (index_id, asset_id, date),
  FOREIGN KEY     (index_id) REFERENCES assets(id),
  FOREIGN KEY     (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_index_constituents_index_date ON index_constituents(index_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_index_constituents_asset ON index_constituents(asset_id);

-- ─── EODHD DATA INTEGRATION ────────────────────────────────────────────

-- EODHD raw EOD prices (supplementary validation source)
CREATE TABLE IF NOT EXISTS eodhd_daily_prices (
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  open REAL,
  high REAL,
  low REAL,
  close REAL NOT NULL,
  adjusted_close REAL,      -- EODHD's pre-computed adjusted close
  volume INTEGER,
  eodhd_symbol TEXT,         -- e.g., RELIANCE.NSE
  exchange TEXT CHECK(exchange IN ('NSE', 'BSE')),
  fetched_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, date, exchange),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_eodhd_daily_asset_date ON eodhd_daily_prices(asset_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_eodhd_daily_date ON eodhd_daily_prices(date);
CREATE INDEX IF NOT EXISTS idx_eodhd_daily_exchange ON eodhd_daily_prices(exchange, date DESC);

-- Price reconciliation tracking (NSE/BSE/EODHD comparison)
CREATE TABLE IF NOT EXISTS price_reconciliation (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  nse_close REAL,
  bse_close REAL,
  eodhd_nse_close REAL,
  eodhd_bse_close REAL,
  internal_adj_close REAL,  -- Our computed adj_close
  eodhd_adj_close REAL,     -- EODHD's adjusted_close
  close_deviation_pct REAL,
  adj_close_deviation_pct REAL,
  volume_nse INTEGER,
  volume_eodhd INTEGER,
  status TEXT CHECK(status IN ('MATCH', 'MINOR_DEVIATION', 'MAJOR_DEVIATION', 'MISSING_SOURCE', 'EODHD_ONLY')),
  flags TEXT,                -- JSON array of issues
  reconciled_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_price_recon_asset_date ON price_reconciliation(asset_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_price_recon_status ON price_reconciliation(status, date DESC);
CREATE INDEX IF NOT EXISTS idx_price_recon_date ON price_reconciliation(date DESC);

-- EODHD symbol mapping (asset_id to EODHD ticker format)
CREATE TABLE IF NOT EXISTS eodhd_symbol_mapping (
  asset_id TEXT PRIMARY KEY,
  eodhd_nse_symbol TEXT,     -- e.g., RELIANCE.NSE
  eodhd_bse_symbol TEXT,     -- e.g., RELIANCE.BSE
  eodhd_mcx_symbol TEXT,     -- e.g., CRUDEOIL.MCX (commodities)
  isin TEXT,
  exchange_preference TEXT CHECK(exchange_preference IN ('NSE', 'BSE', 'MCX')),
  is_active INTEGER DEFAULT 1,
  is_delisted INTEGER DEFAULT 0,  -- 1 = delisted, survivorship-bias-free flag
  delisted_date TEXT,             -- Date of delisting if known
  match_method TEXT,              -- isin | symbol | name | manual
  last_verified TEXT,
  notes TEXT,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_eodhd_mapping_nse_symbol ON eodhd_symbol_mapping(eodhd_nse_symbol);
CREATE INDEX IF NOT EXISTS idx_eodhd_mapping_bse_symbol ON eodhd_symbol_mapping(eodhd_bse_symbol);
CREATE INDEX IF NOT EXISTS idx_eodhd_mapping_active ON eodhd_symbol_mapping(is_active);

-- Corporate actions from EODHD (for validation against our CA table)
CREATE TABLE IF NOT EXISTS eodhd_corporate_actions (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  date TEXT NOT NULL,
  type TEXT,                 -- dividend, split, bonus
  value REAL,
  declaration_date TEXT,
  payment_date TEXT,
  record_date TEXT,
  raw_json TEXT,
  fetched_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_eodhd_ca_asset_date ON eodhd_corporate_actions(asset_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_eodhd_ca_type ON eodhd_corporate_actions(type, date DESC);

-- EODHD intraday prices (Phase 2)
CREATE TABLE IF NOT EXISTS eodhd_intraday_prices (
  asset_id TEXT NOT NULL,
  timestamp TEXT NOT NULL,  -- ISO 8601 with timezone
  resolution TEXT NOT NULL CHECK(resolution IN ('1m', '5m', '15m', '1h')),
  open REAL,
  high REAL,
  low REAL,
  close REAL NOT NULL,
  volume INTEGER,
  eodhd_symbol TEXT,
  exchange TEXT CHECK(exchange IN ('NSE', 'BSE')),
  fetched_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (asset_id, timestamp, resolution)
);
CREATE INDEX IF NOT EXISTS idx_eodhd_intraday_asset_time ON eodhd_intraday_prices(asset_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_eodhd_intraday_resolution ON eodhd_intraday_prices(resolution, timestamp DESC);
