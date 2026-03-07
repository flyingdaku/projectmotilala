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
  pledged_shares          REAL,
  released_shares         REAL,
  promoter_holding_shares REAL,
  pledged_pct_of_promoter REAL,
  pledged_pct_of_total    REAL,
  source_page_url         TEXT,
  raw_json                TEXT,
  created_at              TEXT DEFAULT (datetime('now')),
  UNIQUE (asset_id, entity_name, period_end_date, promoter_name),
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
