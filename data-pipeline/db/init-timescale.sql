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
