-- PostgreSQL Schema: artha_relational (Relational/Metadata tables)

CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY, isin TEXT UNIQUE, nse_symbol TEXT, bse_code TEXT,
  amfi_code TEXT, amc_name TEXT, mf_category TEXT, screener_id TEXT, name TEXT NOT NULL,
  asset_class TEXT NOT NULL CHECK(asset_class IN ('EQUITY','MF','ETF','INDEX')),
  series TEXT, sector TEXT, industry_group TEXT, industry TEXT, sub_industry TEXT,
  screener_sector_code TEXT, screener_industry_group_code TEXT,
  screener_industry_code TEXT, screener_sub_industry_code TEXT,
  msi_sector TEXT, msi_industry_group TEXT, msi_group_rank INTEGER,
  listing_date TEXT, delisting_date TEXT, is_active INTEGER DEFAULT 1,
  nse_listed INTEGER DEFAULT 0, bse_listed INTEGER DEFAULT 0,
  face_value REAL, website_url TEXT, description TEXT, management_json TEXT,
  classification_updated_at TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_assets_nse_symbol ON assets(nse_symbol);
CREATE INDEX IF NOT EXISTS idx_assets_bse_code ON assets(bse_code);
CREATE INDEX IF NOT EXISTS idx_assets_isin ON assets(isin);
CREATE INDEX IF NOT EXISTS idx_assets_asset_class ON assets(asset_class);
CREATE INDEX IF NOT EXISTS idx_assets_amfi_code ON assets(amfi_code);
CREATE INDEX IF NOT EXISTS idx_assets_mf_category ON assets(mf_category);

CREATE TABLE IF NOT EXISTS src_nse_corporate_actions (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  symbol TEXT, series TEXT, subject TEXT, ex_date TEXT, record_date TEXT,
  bc_start_date TEXT, bc_end_date TEXT, nd_start_date TEXT, nd_end_date TEXT,
  company_name TEXT, isin TEXT, face_value TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, ex_date, subject)
);
CREATE INDEX IF NOT EXISTS idx_src_nse_ca_asset ON src_nse_corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_src_nse_ca_exdate ON src_nse_corporate_actions(ex_date);

CREATE TABLE IF NOT EXISTS src_bse_corporate_actions (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  scrip_code TEXT, scrip_name TEXT, purpose TEXT, ex_date TEXT,
  record_date TEXT, bc_start_date TEXT, bc_end_date TEXT,
  nd_start_date TEXT, nd_end_date TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, ex_date, purpose)
);
CREATE INDEX IF NOT EXISTS idx_src_bse_ca_asset ON src_bse_corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_src_bse_ca_exdate ON src_bse_corporate_actions(ex_date);

CREATE TABLE IF NOT EXISTS corporate_actions (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  action_type TEXT NOT NULL CHECK(action_type IN (
    'SPLIT','BONUS','DIVIDEND','RIGHTS','MERGER','DEMERGER','BUYBACK',
    'NAME_CHANGE','FACE_VALUE_CHANGE','INVIT_DISTRIBUTION',
    'CAPITAL_REDUCTION','SUSPENSION','DIVIDEND_AND_BONUS')),
  ex_date TEXT NOT NULL, record_date TEXT, announcement_date TEXT,
  ratio_numerator REAL, ratio_denominator REAL, dividend_amount REAL,
  rights_ratio TEXT, rights_price REAL, adjustment_factor REAL,
  source_exchange TEXT, raw_announcement TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_corp_actions_dedup ON corporate_actions(asset_id, ex_date, action_type);
CREATE INDEX IF NOT EXISTS idx_corp_actions_asset ON corporate_actions(asset_id);
CREATE INDEX IF NOT EXISTS idx_corp_actions_exdate ON corporate_actions(ex_date);

CREATE TABLE IF NOT EXISTS distribution_components (
  id TEXT PRIMARY KEY,
  corporate_action_id TEXT NOT NULL REFERENCES corporate_actions(id) ON DELETE CASCADE,
  component_type TEXT NOT NULL CHECK(component_type IN (
    'INTEREST','DIVIDEND','RETURN_OF_CAPITAL','CAPITAL_GAINS','OTHER_INCOME')),
  amount REAL, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS merger_events (
  id TEXT PRIMARY KEY, acquired_asset_id TEXT REFERENCES assets(id),
  acquirer_asset_id TEXT REFERENCES assets(id),
  effective_date TEXT NOT NULL, swap_ratio_acquired REAL, swap_ratio_acquirer REAL, notes TEXT
);

CREATE TABLE IF NOT EXISTS pipeline_runs (
  id TEXT PRIMARY KEY, run_date TEXT NOT NULL,
  pipeline_type TEXT NOT NULL DEFAULT 'DAILY', source TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('SUCCESS','PARTIAL','FAILED')),
  records_inserted INTEGER, records_skipped INTEGER, circuit_breaks INTEGER,
  error_log TEXT, duration_ms INTEGER, created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pipeline_runs_date ON pipeline_runs(run_date DESC);
CREATE INDEX IF NOT EXISTS idx_pipeline_runs_source ON pipeline_runs(source, run_date DESC);
CREATE TABLE IF NOT EXISTS pipeline_run_checkpoints (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  source TEXT NOT NULL,
  processed_count INTEGER NOT NULL,
  inserted_count INTEGER NOT NULL,
  skipped_count INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  details_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pipeline_run_checkpoints_run ON pipeline_run_checkpoints(run_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pipeline_run_checkpoints_source ON pipeline_run_checkpoints(source, created_at DESC);

CREATE TABLE IF NOT EXISTS trading_holidays (
  date TEXT PRIMARY KEY, description TEXT,
  exchange TEXT NOT NULL DEFAULT 'NSE', fetched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS msi_company_data (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id),
  msi_instrument_id INTEGER, master_score INTEGER, eps_rating INTEGER,
  rs_rating INTEGER, composite_rating INTEGER, smr_rating TEXT, acc_dis_rating TEXT,
  price_strength REAL, week_high_52 REAL, week_low_52 REAL, pct_from_high REAL,
  buyer_demand TEXT, group_rank INTEGER, industry_group TEXT, industry_group_rank TEXT,
  sector TEXT, sub_group TEXT, industry_symbol TEXT, market_cap REAL, pe_ratio REAL,
  roe_ttm REAL, book_value_per_share_ttm REAL, dividend_yield_ttm REAL,
  total_shares_thousands REAL, shares_in_float_thousands REAL,
  cash_flow_ttm REAL, debt REAL, website_url TEXT,
  canslim_checklist TEXT, red_flags TEXT, chart_patterns TEXT, ai_report_summary TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS src_msi_top_owners (
  asset_id TEXT NOT NULL REFERENCES assets(id), holding_date TEXT NOT NULL,
  shareholder_name TEXT NOT NULL, holding_pct REAL, is_top_investor INTEGER DEFAULT 0,
  PRIMARY KEY (asset_id, holding_date, shareholder_name)
);

CREATE TABLE IF NOT EXISTS src_msi_management (
  asset_id TEXT NOT NULL REFERENCES assets(id), person_name TEXT NOT NULL, designation TEXT,
  PRIMARY KEY (asset_id, person_name, designation)
);

CREATE TABLE IF NOT EXISTS src_msi_chart_patterns (
  asset_id TEXT NOT NULL REFERENCES assets(id), pattern_type TEXT NOT NULL,
  status TEXT, pivot_price REAL, depth_pct REAL, detected_on TEXT, raw_json TEXT,
  PRIMARY KEY (asset_id, pattern_type, detected_on)
);

CREATE TABLE IF NOT EXISTS fundamental_conflicts (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  period_end_date TEXT NOT NULL, field_name TEXT NOT NULL,
  nse_value REAL, bse_value REAL, scr_value REAL,
  chosen_source TEXT, pct_deviation REAL, resolved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS asset_metrics (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id), computed_on TEXT NOT NULL,
  return_1d REAL, return_1w REAL, return_1m REAL, return_3m REAL,
  return_6m REAL, return_1y REAL, return_3y REAL, return_5y REAL, return_10y REAL,
  volatility_1y REAL, beta_1y REAL, max_drawdown_1y REAL, sharpe_1y REAL,
  pe_ratio REAL, pb_ratio REAL, ev_ebitda REAL, market_cap REAL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS computed_ratios (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id),
  computed_on DATE DEFAULT CURRENT_DATE,
  market_cap_cr REAL,
  pe_ttm REAL,
  pb REAL,
  ev_ebitda REAL,
  dividend_yield REAL,
  roce REAL,
  roe REAL,
  pat_margin REAL,
  operating_margin REAL,
  revenue_growth_1y REAL,
  pat_growth_1y REAL,
  eps_growth_1y REAL,
  revenue_growth_3y REAL,
  debt_equity REAL,
  interest_coverage REAL,
  current_ratio REAL,
  quality_score REAL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS technical_indicators (
  asset_id TEXT REFERENCES assets(id),
  computed_date DATE NOT NULL DEFAULT CURRENT_DATE,
  close REAL,
  change_1d_pct REAL,
  rsi_14 REAL,
  pct_from_52w_high REAL,
  pct_from_52w_low REAL,
  sma_20 REAL,
  sma_50 REAL,
  sma_200 REAL,
  volume REAL,
  lag1_close REAL,
  prev_close REAL,
  prev_high REAL,
  prev_low REAL,
  PRIMARY KEY (asset_id, computed_date)
);
CREATE INDEX IF NOT EXISTS idx_technical_indicators_asset_date ON technical_indicators(asset_id, computed_date DESC);

CREATE TABLE IF NOT EXISTS user_asset_follows (
  user_id TEXT NOT NULL,
  asset_id TEXT NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  alert_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, asset_id)
);
CREATE INDEX IF NOT EXISTS idx_user_asset_follows_asset ON user_asset_follows(asset_id);

CREATE TABLE IF NOT EXISTS user_feed_reads (
  user_id TEXT NOT NULL,
  feed_event_id TEXT NOT NULL,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, feed_event_id)
);

CREATE TABLE IF NOT EXISTS eodhd_symbol_mapping (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id),
  eodhd_nse_symbol TEXT, eodhd_bse_symbol TEXT, eodhd_mcx_symbol TEXT, isin TEXT,
  exchange_preference TEXT CHECK(exchange_preference IN ('NSE','BSE','MCX')),
  is_active INTEGER DEFAULT 1, is_delisted INTEGER DEFAULT 0,
  delisted_date TEXT, match_method TEXT, last_verified TEXT, notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_eodhd_mapping_nse ON eodhd_symbol_mapping(eodhd_nse_symbol);
CREATE INDEX IF NOT EXISTS idx_eodhd_mapping_bse ON eodhd_symbol_mapping(eodhd_bse_symbol);

CREATE TABLE IF NOT EXISTS eodhd_corporate_actions (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  date TEXT NOT NULL, type TEXT, value REAL, declaration_date TEXT,
  payment_date TEXT, record_date TEXT, raw_json TEXT, fetched_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_eodhd_ca_asset_date ON eodhd_corporate_actions(asset_id, date DESC);

CREATE TABLE IF NOT EXISTS index_metadata (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL UNIQUE REFERENCES assets(id),
  index_name TEXT NOT NULL, nse_symbol TEXT, category TEXT, sub_category TEXT,
  index_type TEXT, primary_source TEXT NOT NULL, data_type TEXT,
  has_full_ohlc INTEGER DEFAULT 0, earliest_date TEXT, latest_date TEXT,
  total_records INTEGER DEFAULT 0, last_updated TEXT, update_frequency TEXT,
  is_active INTEGER DEFAULT 1, base_date TEXT, base_value REAL,
  num_constituents INTEGER, rebalance_frequency TEXT, methodology_url TEXT,
  coverage_pct REAL, data_completeness TEXT, has_gaps INTEGER DEFAULT 0,
  gap_count INTEGER DEFAULT 0, longest_gap_days INTEGER,
  tags TEXT, notes TEXT, metadata_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_index_metadata_category ON index_metadata(category);

CREATE TABLE IF NOT EXISTS ff_iima_drawdowns (
  factor_code TEXT PRIMARY KEY, factor_name TEXT NOT NULL,
  annualized_return REAL, annualized_volatility REAL, worst_drawdown REAL,
  drawdown_duration_years REAL, source_url TEXT, release_tag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ff_iima_breakpoints (
  period_key TEXT NOT NULL, breakpoint_family TEXT NOT NULL,
  size_p90 REAL, low_cut REAL, high_cut REAL, release_tag TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (period_key, breakpoint_family)
);

CREATE TABLE IF NOT EXISTS ff_computation_log (
  id TEXT PRIMARY KEY, run_date TEXT NOT NULL, computation_type TEXT NOT NULL,
  start_date TEXT, end_date TEXT, status TEXT NOT NULL,
  num_stocks_eligible INTEGER, num_portfolios_formed INTEGER,
  factors_computed TEXT, error_log TEXT, duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ff_computation_log_date ON ff_computation_log(run_date DESC);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_directory (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  fund_house_slug TEXT NOT NULL,
  fund_house_name TEXT,
  morningstar_fund_id TEXT NOT NULL,
  scheme_name TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  category_name TEXT,
  distribution_type TEXT,
  structure TEXT,
  latest_nav REAL,
  nav_date TEXT,
  isin TEXT,
  raw_html_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);
CREATE INDEX IF NOT EXISTS idx_ms_dir_fund_id ON src_morningstar_fund_directory(morningstar_fund_id);
CREATE INDEX IF NOT EXISTS idx_ms_dir_asset ON src_morningstar_fund_directory(asset_id);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_overview (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  scheme_name TEXT,
  isin TEXT,
  amc_name TEXT,
  category_name TEXT,
  distribution_type TEXT,
  structure TEXT,
  latest_nav REAL,
  nav_date TEXT,
  benchmark_name TEXT,
  tabs_json TEXT,
  raw_html_path TEXT,
  raw_json_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);
CREATE INDEX IF NOT EXISTS idx_ms_overview_asset ON src_morningstar_fund_overview(asset_id);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_performance (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  as_of_date TEXT,
  growth_of_10000_json TEXT,
  trailing_returns_json TEXT,
  calendar_returns_json TEXT,
  monthly_returns_json TEXT,
  quarterly_returns_json TEXT,
  raw_html_path TEXT,
  raw_json_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_risk (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  as_of_date TEXT,
  star_rating REAL,
  morningstar_risk_label TEXT,
  risk_json TEXT,
  raw_html_path TEXT,
  raw_json_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_portfolio (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  as_of_date TEXT,
  asset_allocation_json TEXT,
  style_box_json TEXT,
  characteristics_json TEXT,
  raw_html_path TEXT,
  raw_json_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_holdings (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  holdings_kind TEXT NOT NULL DEFAULT 'DETAILED',
  as_of_date TEXT,
  holdings_json TEXT,
  raw_html_path TEXT,
  raw_json_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url, holdings_kind)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_factsheets (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  document_url TEXT,
  document_type TEXT NOT NULL DEFAULT 'FACTSHEET',
  raw_html_path TEXT,
  raw_pdf_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url, document_type)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_analysis (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  is_login_gated INTEGER DEFAULT 1,
  raw_html_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);

CREATE TABLE IF NOT EXISTS src_morningstar_fund_managers (
  id TEXT PRIMARY KEY,
  asset_id TEXT REFERENCES assets(id),
  morningstar_fund_id TEXT NOT NULL,
  scheme_url TEXT NOT NULL,
  managers_json TEXT,
  raw_html_path TEXT,
  raw_json TEXT,
  source_page_url TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (morningstar_fund_id, scheme_url)
);

CREATE TABLE IF NOT EXISTS mf_scheme_master (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id),
  morningstar_fund_id TEXT UNIQUE,
  scheme_name TEXT NOT NULL,
  amc_name TEXT,
  distribution_type TEXT,
  structure TEXT,
  morningstar_category TEXT,
  benchmark_name TEXT,
  isin TEXT,
  is_active INTEGER DEFAULT 1,
  source_updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mf_manager_assignments (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  morningstar_fund_id TEXT,
  manager_name TEXT NOT NULL,
  role TEXT,
  start_date TEXT,
  end_date TEXT,
  tenure_years_text TEXT,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, manager_name, role, start_date, end_date)
);

CREATE TABLE IF NOT EXISTS mf_trailing_returns (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  morningstar_fund_id TEXT,
  as_of_date TEXT,
  horizon_code TEXT NOT NULL,
  period_type TEXT NOT NULL DEFAULT 'TRAILING',
  fund_return REAL,
  category_return REAL,
  benchmark_return REAL,
  rank REAL,
  quartile TEXT,
  percentile_rank REAL,
  peer_count INTEGER,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, period_type, as_of_date, horizon_code)
);

CREATE TABLE IF NOT EXISTS mf_calendar_returns (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  morningstar_fund_id TEXT,
  period_kind TEXT NOT NULL,
  period_label TEXT NOT NULL,
  fund_return REAL,
  category_return REAL,
  benchmark_return REAL,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, period_kind, period_label)
);

CREATE TABLE IF NOT EXISTS mf_risk_metrics (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  morningstar_fund_id TEXT,
  as_of_date TEXT,
  alpha REAL, beta REAL, r_squared REAL, sharpe REAL, sortino REAL,
  treynor REAL, stddev REAL, upside_capture REAL, downside_capture REAL,
  morningstar_risk_label TEXT, star_rating REAL,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, as_of_date)
);

CREATE TABLE IF NOT EXISTS mf_asset_allocation (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  as_of_date TEXT,
  asset_bucket TEXT NOT NULL,
  weight_pct REAL,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, as_of_date, asset_bucket)
);

CREATE TABLE IF NOT EXISTS mf_style_box_snapshots (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  as_of_date TEXT,
  style_dimension TEXT NOT NULL,
  weight_pct REAL,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, as_of_date, style_dimension)
);

CREATE TABLE IF NOT EXISTS mf_portfolio_characteristics (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  as_of_date TEXT,
  characteristic_name TEXT NOT NULL,
  characteristic_value TEXT,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, as_of_date, characteristic_name)
);

CREATE TABLE IF NOT EXISTS mf_holdings (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  as_of_date TEXT,
  holding_name TEXT NOT NULL,
  holding_type TEXT,
  holding_isin TEXT,
  holding_ticker TEXT,
  weight_pct REAL,
  market_value REAL,
  share_count REAL,
  sector TEXT,
  country TEXT,
  rank INTEGER,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, as_of_date, holding_name, rank)
);

CREATE TABLE IF NOT EXISTS mf_documents (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL REFERENCES assets(id),
  as_of_date TEXT,
  document_type TEXT NOT NULL,
  document_url TEXT,
  source_page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, document_type, document_url)
);

CREATE TABLE IF NOT EXISTS src_cogencis_company_map (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id), company_url TEXT NOT NULL UNIQUE,
  isin_token TEXT, group_slug TEXT, exchange_code TEXT, symbol_slug TEXT,
  company_slug TEXT, is_active INTEGER DEFAULT 1, last_scraped_at TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS src_cogencis_company_overview (
  asset_id TEXT PRIMARY KEY REFERENCES assets(id), company_name TEXT, isin TEXT,
  cin TEXT, listing_date TEXT, phone TEXT, email TEXT, website_url TEXT,
  address_text TEXT, market_cap_text TEXT, face_value_text TEXT, book_value_text TEXT,
  pe_ttm_text TEXT, dividend_yield_text TEXT, auditors_json TEXT, overview_json TEXT,
  source_page_url TEXT, updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS src_cogencis_page_fetches (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  tab_key TEXT NOT NULL, page_kind TEXT NOT NULL DEFAULT '', page_number INTEGER DEFAULT 1,
  request_url TEXT NOT NULL, final_url TEXT, raw_path TEXT, http_status INTEGER,
  content_hash TEXT, parse_status TEXT, parse_error TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, tab_key, page_kind, page_number, request_url)
);
CREATE INDEX IF NOT EXISTS idx_cogencis_fetch_asset_tab ON src_cogencis_page_fetches(asset_id, tab_key);

CREATE TABLE IF NOT EXISTS src_cogencis_management_entities (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  entity_name TEXT NOT NULL, entity_kind TEXT, entity_url TEXT,
  source_tab TEXT NOT NULL DEFAULT 'management', is_primary INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, entity_name, source_tab)
);

CREATE TABLE IF NOT EXISTS src_cogencis_management_people (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  entity_name TEXT NOT NULL DEFAULT '', person_name TEXT NOT NULL,
  designation TEXT, role_type TEXT, committee_name TEXT,
  appointment_date TEXT, cessation_date TEXT, profile_text TEXT,
  connected_companies_json TEXT, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, entity_name, person_name, designation)
);
CREATE INDEX IF NOT EXISTS idx_cogencis_mgmt_asset ON src_cogencis_management_people(asset_id);

CREATE TABLE IF NOT EXISTS src_cogencis_corporate_actions (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  entity_name TEXT NOT NULL DEFAULT '', subcategory TEXT NOT NULL DEFAULT 'ALL',
  announcement_date TEXT, ex_date TEXT, record_date TEXT, action_type TEXT,
  ratio_text TEXT, amount_text TEXT, notes_text TEXT, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, entity_name, subcategory, ex_date, action_type, ratio_text, amount_text)
);
CREATE INDEX IF NOT EXISTS idx_cogencis_ca_asset ON src_cogencis_corporate_actions(asset_id, ex_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_filings (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  filing_type TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  event_date TEXT, filing_date TEXT, headline TEXT, subcategory TEXT,
  exchange TEXT, reference_no TEXT, detail_text TEXT, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, filing_type, entity_name, filing_date, headline, reference_no)
);
CREATE INDEX IF NOT EXISTS idx_cogencis_filings_asset ON src_cogencis_filings(asset_id, filing_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_filing_attachments (
  id TEXT PRIMARY KEY, filing_id TEXT NOT NULL REFERENCES src_cogencis_filings(id) ON DELETE CASCADE,
  label TEXT, attachment_url TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (filing_id, attachment_url)
);

CREATE TABLE IF NOT EXISTS src_cogencis_capital_history (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  entity_name TEXT NOT NULL DEFAULT '', effective_date TEXT, event_type TEXT,
  ratio_text TEXT, face_value_from REAL, face_value_to REAL,
  quantity_before REAL, quantity_after REAL, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, entity_name, effective_date, event_type, ratio_text)
);

CREATE TABLE IF NOT EXISTS src_cogencis_due_diligence_entries (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL REFERENCES assets(id),
  entity_name TEXT NOT NULL DEFAULT '', table_name TEXT NOT NULL,
  row_label TEXT, column_name TEXT NOT NULL, column_value TEXT,
  row_order INTEGER, col_order INTEGER, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id, entity_name, table_name, row_label, column_name, row_order, col_order)
);
CREATE INDEX IF NOT EXISTS idx_cogencis_dd_asset ON src_cogencis_due_diligence_entries(asset_id, table_name);
