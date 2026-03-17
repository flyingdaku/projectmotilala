-- TimescaleDB Schema: artha_timeseries (Part 1)
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE IF NOT EXISTS daily_prices (
  asset_id TEXT NOT NULL, date DATE NOT NULL,
  open REAL, high REAL, low REAL, close REAL NOT NULL, adj_close REAL,
  volume BIGINT, trades INTEGER,
  source_exchange TEXT NOT NULL CHECK(source_exchange IN ('NSE','BSE','AMFI','NSE_TRI')),
  is_verified INTEGER DEFAULT 0,
  PRIMARY KEY (asset_id, date, source_exchange)
);
SELECT create_hypertable('daily_prices','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '3 months');
CREATE INDEX IF NOT EXISTS idx_dp_asset_date ON daily_prices(asset_id,date DESC);
CREATE INDEX IF NOT EXISTS idx_dp_date ON daily_prices(date DESC);

CREATE TABLE IF NOT EXISTS daily_market_cap (
  asset_id TEXT NOT NULL, date DATE NOT NULL,
  shares_outstanding BIGINT NOT NULL, close_price REAL NOT NULL, market_cap REAL NOT NULL,
  source TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY (asset_id,date)
);
SELECT create_hypertable('daily_market_cap','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '6 months');

CREATE TABLE IF NOT EXISTS fundamentals (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT,
  fiscal_quarter TEXT, fiscal_year TEXT, is_consolidated INTEGER DEFAULT 1,
  revenue REAL, operating_profit REAL, ebit REAL, interest REAL, pbt REAL,
  tax REAL, pat REAL, eps REAL, total_assets REAL, total_equity REAL, total_debt REAL,
  cash_equivalents REAL, trade_receivables REAL, cfo REAL, cash_from_investing REAL,
  cash_from_financing REAL, net_change_in_cash REAL, capex REAL, fcf REAL,
  book_value_per_share REAL, shares_outstanding BIGINT, source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,period_end_date,is_consolidated)
);
SELECT create_hypertable('fundamentals','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
CREATE INDEX IF NOT EXISTS idx_fund_asset ON fundamentals(asset_id,period_end_date DESC);

CREATE TABLE IF NOT EXISTS src_msi_quarterly (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  revenue_ops REAL, total_revenue REAL, operating_profit REAL, ebit REAL,
  materials_consumed REAL, employee_benefits REAL, depreciation REAL, ebitda REAL,
  finance_costs REAL, profit_before_tax REAL, tax_amount REAL,
  net_profit REAL, basic_eps REAL, diluted_eps REAL,
  sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_quarterly','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
CREATE INDEX IF NOT EXISTS idx_msi_q_asset ON src_msi_quarterly(asset_id,period_end_date DESC);

CREATE TABLE IF NOT EXISTS src_msi_quarterly_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  revenue_ops REAL, total_revenue REAL, operating_profit REAL, ebit REAL,
  materials_consumed REAL, employee_benefits REAL, depreciation REAL, ebitda REAL,
  finance_costs REAL, profit_before_tax REAL, tax_amount REAL,
  net_profit REAL, basic_eps REAL, diluted_eps REAL,
  sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_quarterly_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_msi_ratios (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
  roe REAL, roa REAL, roce REAL, debt_equity REAL, current_ratio REAL,
  interest_coverage REAL, debtor_days REAL, creditor_days REAL,
  sales REAL, sales_growth_yoy REAL, basic_eps REAL, book_value_per_share REAL,
  ebit REAL, ev_ebitda REAL, pbdit_margin REAL, total_sales REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_ratios','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
CREATE INDEX IF NOT EXISTS idx_msi_ratios_asset ON src_msi_ratios(asset_id,period_end_date DESC);

CREATE TABLE IF NOT EXISTS src_msi_ratios_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
  roe REAL, roa REAL, roce REAL, debt_equity REAL, current_ratio REAL,
  interest_coverage REAL, debtor_days REAL, creditor_days REAL,
  sales REAL, sales_growth_yoy REAL, basic_eps REAL, book_value_per_share REAL,
  ebit REAL, ev_ebitda REAL, pbdit_margin REAL, total_sales REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_ratios_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_msi_balance_sheet (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  equity_capital REAL, reserves REAL, long_term_borrowings REAL, short_term_borrowings REAL,
  total_liabilities REAL, fixed_assets REAL, cwip REAL, investments REAL,
  inventories REAL, trade_receivables REAL, cash_equivalents REAL,
  total_current_assets REAL, total_assets REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_balance_sheet','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_msi_cashflow (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  net_cash_operating REAL, capex REAL, free_cash_flow REAL,
  net_cash_investing REAL, net_cash_financing REAL, net_change_in_cash REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_cashflow','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_msi_shareholding (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  promoter_holding REAL, fii_holding REAL, dii_holding REAL, public_holding REAL, pledged_shares REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_shareholding','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_screener_quarterly (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT, is_consolidated INTEGER DEFAULT 1,
  sales REAL, expenses REAL, operating_profit REAL, opm_pct REAL, other_income REAL,
  interest REAL, depreciation REAL, pbt REAL, tax_pct REAL, net_profit REAL, eps REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE (asset_id,period_end_date,is_consolidated)
);
SELECT create_hypertable('src_screener_quarterly','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_screener_balance_sheet (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT,
  share_capital REAL, reserves REAL, borrowings REAL, fixed_assets REAL,
  cwip REAL, investments REAL, total_assets REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE (asset_id,period_end_date)
);
SELECT create_hypertable('src_screener_balance_sheet','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_screener_cashflow (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT,
  cash_from_operating REAL, cash_from_investing REAL, cash_from_financing REAL, net_cash_flow REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE (asset_id,period_end_date)
);
SELECT create_hypertable('src_screener_cashflow','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_screener_shareholding (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT,
  promoters_pct REAL, fii_pct REAL, dii_pct REAL, public_pct REAL, num_shareholders BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE (asset_id,period_end_date)
);
SELECT create_hypertable('src_screener_shareholding','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_factor_returns (
  date DATE NOT NULL, frequency TEXT NOT NULL, source TEXT NOT NULL DEFAULT 'COMPUTED',
  market_return REAL, rf_rate REAL, market_premium REAL, smb REAL, hml REAL, wml REAL,
  num_stocks INTEGER, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (date,frequency,source)
);
SELECT create_hypertable('ff_factor_returns','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_iima_portfolio_returns (
  date DATE NOT NULL, frequency TEXT NOT NULL, portfolio_family TEXT NOT NULL, portfolio_code TEXT NOT NULL,
  return_pct REAL NOT NULL, release_tag TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (date,frequency,portfolio_family,portfolio_code)
);
SELECT create_hypertable('ff_iima_portfolio_returns','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS rbi_tbill_yields (
  auction_date DATE PRIMARY KEY, maturity_days INTEGER DEFAULT 91, yield_pct REAL NOT NULL,
  cutoff_price REAL, created_at TIMESTAMPTZ DEFAULT NOW()
);
SELECT create_hypertable('rbi_tbill_yields','auction_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS index_constituents (
  index_id TEXT NOT NULL, asset_id TEXT NOT NULL, date DATE NOT NULL,
  weight REAL NOT NULL, ffmc REAL, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (index_id, asset_id, date)
);
SELECT create_hypertable('index_constituents','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '6 months');
CREATE INDEX IF NOT EXISTS idx_ic_index_date ON index_constituents(index_id,date DESC);

CREATE TABLE IF NOT EXISTS cogencis_shareholding_timeseries (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  promoter_holding REAL, fii_holding REAL, dii_holding REAL, public_holding REAL, pledged_shares_pct REAL,
  raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (asset_id,period_end_date,entity_name)
);
SELECT create_hypertable('cogencis_shareholding_timeseries','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── STANDALONE MSI BALANCE SHEET & CASHFLOW ─────────────────────────────────
CREATE TABLE IF NOT EXISTS src_msi_balance_sheet_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  equity_capital REAL, reserves REAL, long_term_borrowings REAL, short_term_borrowings REAL,
  total_liabilities REAL, fixed_assets REAL, cwip REAL, investments REAL,
  inventories REAL, trade_receivables REAL, cash_equivalents REAL,
  total_current_assets REAL, total_assets REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_balance_sheet_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS src_msi_cashflow_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  net_cash_operating REAL, capex REAL, free_cash_flow REAL,
  net_cash_investing REAL, net_cash_financing REAL, net_change_in_cash REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_cashflow_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── MSI ANNUAL FUNDAMENTALS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS msi_fundamentals_annual (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  revenue_ops REAL, total_revenue REAL, other_income REAL, operating_profit REAL,
  ebit REAL, materials_consumed REAL, employee_benefits REAL, depreciation REAL,
  ebitda REAL, finance_costs REAL, profit_before_tax REAL, tax_amount REAL,
  net_profit REAL, basic_eps REAL, diluted_eps REAL, dividend_rate REAL,
  sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('msi_fundamentals_annual','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS msi_fundamentals_annual_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  revenue_ops REAL, total_revenue REAL, other_income REAL, operating_profit REAL,
  ebit REAL, materials_consumed REAL, employee_benefits REAL, depreciation REAL,
  ebitda REAL, finance_costs REAL, profit_before_tax REAL, tax_amount REAL,
  net_profit REAL, basic_eps REAL, diluted_eps REAL, dividend_rate REAL,
  sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('msi_fundamentals_annual_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── MSI ANNUAL RATIOS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS msi_ratios_annual (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
  roe REAL, roa REAL, roce REAL, debt_equity REAL, current_ratio REAL,
  interest_coverage REAL, debtor_days REAL, creditor_days REAL,
  sales REAL, sales_growth_yoy REAL, basic_eps REAL, book_value_per_share REAL,
  ebit REAL, ev_ebitda REAL, pbdit_margin REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('msi_ratios_annual','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS msi_ratios_annual_standalone (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
  roe REAL, roa REAL, roce REAL, debt_equity REAL, current_ratio REAL,
  interest_coverage REAL, debtor_days REAL, creditor_days REAL,
  sales REAL, sales_growth_yoy REAL, basic_eps REAL, book_value_per_share REAL,
  ebit REAL, ev_ebitda REAL, pbdit_margin REAL,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('msi_ratios_annual_standalone','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── SCREENER RATIOS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS src_screener_ratios (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL, id TEXT,
  debtor_days REAL, inventory_days REAL, days_payable REAL,
  cash_conversion_cycle REAL, working_capital_days REAL, roc_pct REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(), UNIQUE (asset_id,period_end_date)
);
SELECT create_hypertable('src_screener_ratios','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── ANNUAL BOOK VALUE ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS annual_book_value (
  asset_id TEXT NOT NULL, fiscal_year_end DATE NOT NULL,
  book_value_per_share REAL NOT NULL, total_equity REAL, shares_outstanding BIGINT,
  source TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (asset_id,fiscal_year_end)
);
SELECT create_hypertable('annual_book_value','fiscal_year_end',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '5 years');

-- ─── EODHD PRICES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS eodhd_daily_prices (
  asset_id TEXT NOT NULL, date DATE NOT NULL,
  open REAL, high REAL, low REAL, close REAL NOT NULL, adjusted_close REAL,
  volume BIGINT, eodhd_symbol TEXT, exchange TEXT CHECK(exchange IN ('NSE','BSE')),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (asset_id,date,exchange)
);
SELECT create_hypertable('eodhd_daily_prices','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '3 months');
CREATE INDEX IF NOT EXISTS idx_eodhd_dp_asset ON eodhd_daily_prices(asset_id,date DESC);

CREATE TABLE IF NOT EXISTS eodhd_intraday_prices (
  asset_id TEXT NOT NULL, ts TIMESTAMPTZ NOT NULL,
  resolution TEXT NOT NULL CHECK(resolution IN ('1m','5m','15m','1h')),
  open REAL, high REAL, low REAL, close REAL NOT NULL, volume BIGINT,
  eodhd_symbol TEXT, exchange TEXT CHECK(exchange IN ('NSE','BSE')),
  PRIMARY KEY (asset_id,ts,resolution)
);
SELECT create_hypertable('eodhd_intraday_prices','ts',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '1 week');
CREATE INDEX IF NOT EXISTS idx_eodhd_intraday_asset ON eodhd_intraday_prices(asset_id,ts DESC);

-- ─── PRICE RECONCILIATION ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS price_reconciliation (
  asset_id TEXT NOT NULL, date DATE NOT NULL, id TEXT,
  nse_close REAL, bse_close REAL, eodhd_nse_close REAL, eodhd_bse_close REAL,
  internal_adj_close REAL, eodhd_adj_close REAL,
  close_deviation_pct REAL, adj_close_deviation_pct REAL,
  volume_nse BIGINT, volume_eodhd BIGINT,
  status TEXT CHECK(status IN ('MATCH','MINOR_DEVIATION','MAJOR_DEVIATION','MISSING_SOURCE','EODHD_ONLY')),
  flags TEXT, reconciled_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (asset_id,date)
);
SELECT create_hypertable('price_reconciliation','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '6 months');
CREATE INDEX IF NOT EXISTS idx_pr_status ON price_reconciliation(status,date DESC);

-- ─── MSI INSTITUTIONAL ACTIVITY ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS src_msi_institutional_activity (
  asset_id TEXT NOT NULL, period_end_date DATE NOT NULL,
  fii_buy_value REAL, fii_sell_value REAL, dii_buy_value REAL, dii_sell_value REAL,
  net_fii REAL, net_dii REAL, raw_json TEXT,
  PRIMARY KEY (asset_id,period_end_date)
);
SELECT create_hypertable('src_msi_institutional_activity','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── COGENCIS SHAREHOLDING (detailed categories) ─────────────────────────────
CREATE TABLE IF NOT EXISTS src_cogencis_shareholding_summary (
  id TEXT, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  period_end_date DATE NOT NULL,
  promoter_holding REAL, promoter_group_holding REAL, fii_holding REAL, dii_holding REAL,
  mutual_fund_holding REAL, insurance_holding REAL, government_holding REAL,
  public_holding REAL, non_institutional_holding REAL, other_holding REAL,
  pledged_shares_pct REAL, total_holding_reported REAL, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,period_end_date)
);
SELECT create_hypertable('src_cogencis_shareholding_summary','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
CREATE INDEX IF NOT EXISTS idx_cog_sh_sum_asset ON src_cogencis_shareholding_summary(asset_id,period_end_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_shareholding_categories (
  id TEXT, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  period_end_date DATE NOT NULL,
  parent_category TEXT, category_name TEXT NOT NULL,
  holding_pct REAL, share_count REAL, change_qoq_pct REAL, row_order INTEGER,
  raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,period_end_date,category_name)
);
SELECT create_hypertable('src_cogencis_shareholding_categories','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
CREATE INDEX IF NOT EXISTS idx_cog_sh_cat_asset ON src_cogencis_shareholding_categories(asset_id,period_end_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_bulk_deals (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  deal_date DATE, exchange TEXT, buyer_name TEXT, seller_name TEXT,
  quantity REAL, price REAL, deal_value REAL, percent_equity REAL,
  source_page_url TEXT, raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,deal_date,buyer_name,seller_name,quantity,price)
);
SELECT create_hypertable('src_cogencis_bulk_deals','deal_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '1 year');
CREATE INDEX IF NOT EXISTS idx_cog_bulk_asset ON src_cogencis_bulk_deals(asset_id,deal_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_block_deals (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  deal_date DATE, exchange TEXT, buyer_name TEXT, seller_name TEXT,
  quantity REAL, price REAL, deal_value REAL, percent_equity REAL,
  source_page_url TEXT, raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,deal_date,buyer_name,seller_name,quantity,price)
);
SELECT create_hypertable('src_cogencis_block_deals','deal_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '1 year');

CREATE TABLE IF NOT EXISTS src_cogencis_insider_trades (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  disclosure_date DATE, trade_date DATE, insider_name TEXT, designation TEXT,
  relation_type TEXT, transaction_type TEXT, security_type TEXT,
  quantity REAL, price REAL, trade_value REAL, pre_holding REAL, post_holding REAL,
  source_page_url TEXT, raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,disclosure_date,insider_name,transaction_type,quantity,price)
);
SELECT create_hypertable('src_cogencis_insider_trades','disclosure_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '1 year');
CREATE INDEX IF NOT EXISTS idx_cog_insider_asset ON src_cogencis_insider_trades(asset_id,disclosure_date DESC);

CREATE TABLE IF NOT EXISTS src_cogencis_sast_events (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  event_date DATE, filing_date DATE, acquirer_name TEXT, seller_name TEXT,
  event_type TEXT, trigger_type TEXT, pre_holding_pct REAL, post_holding_pct REAL,
  shares_acquired REAL, source_page_url TEXT, raw_json TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,event_date,acquirer_name,event_type)
);
SELECT create_hypertable('src_cogencis_sast_events','event_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '1 year');

CREATE TABLE IF NOT EXISTS src_cogencis_pledge_shares (
  id TEXT PRIMARY KEY, asset_id TEXT NOT NULL, entity_name TEXT NOT NULL DEFAULT '',
  period_end_date DATE, promoter_name TEXT, event_type TEXT,
  pledged_shares REAL, released_shares REAL, promoter_holding_shares REAL,
  pledged_pct_of_promoter REAL, pledged_pct_of_total REAL,
  source_page_url TEXT, raw_json TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (asset_id,entity_name,period_end_date,promoter_name,event_type)
);
SELECT create_hypertable('src_cogencis_pledge_shares','period_end_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

-- ─── FAMA-FRENCH TABLES ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ff_portfolio_returns (
  portfolio_id TEXT NOT NULL, date DATE NOT NULL, return REAL NOT NULL,
  num_stocks INTEGER, total_market_cap REAL, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (portfolio_id,date)
);
SELECT create_hypertable('ff_portfolio_returns','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_portfolio_constituents (
  portfolio_id TEXT NOT NULL, rebalance_date DATE NOT NULL, asset_id TEXT NOT NULL,
  weight REAL NOT NULL, market_cap REAL, book_to_market REAL, past_12m_return REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (portfolio_id,rebalance_date,asset_id)
);
SELECT create_hypertable('ff_portfolio_constituents','rebalance_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_breakpoints (
  rebalance_date DATE NOT NULL,
  breakpoint_type TEXT NOT NULL CHECK(breakpoint_type IN ('SIZE','VALUE','MOMENTUM')),
  percentile INTEGER NOT NULL CHECK(percentile IN (30,50,70)),
  value REAL NOT NULL, num_stocks_below INTEGER, num_stocks_above INTEGER,
  num_stocks_total INTEGER, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (rebalance_date,breakpoint_type,percentile)
);
SELECT create_hypertable('ff_breakpoints','rebalance_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_stock_eligibility (
  asset_id TEXT NOT NULL, rebalance_date DATE NOT NULL,
  is_eligible INTEGER DEFAULT 0, market_cap REAL, median_price REAL,
  failed_filters TEXT, created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (asset_id,rebalance_date)
);
SELECT create_hypertable('ff_stock_eligibility','rebalance_date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');

CREATE TABLE IF NOT EXISTS ff_validation (
  date DATE NOT NULL, factor TEXT NOT NULL CHECK(factor IN ('MARKET','SMB','HML','WML')),
  our_value REAL, iima_value REAL, deviation REAL, deviation_pct REAL,
  abs_deviation REAL, rolling_correlation REAL, notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (date,factor)
);
SELECT create_hypertable('ff_validation','date',if_not_exists=>TRUE,chunk_time_interval=>INTERVAL '2 years');
