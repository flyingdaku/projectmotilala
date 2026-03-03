CREATE TABLE IF NOT EXISTS msi_company_data (
    asset_id TEXT PRIMARY KEY,
    msi_instrument_id INTEGER,
    -- Core CANSLIM ratings
    master_score    INTEGER,
    eps_rating      INTEGER,
    rs_rating       INTEGER,
    composite_rating INTEGER,        -- overall CANSLIM composite 1-99
    smr_rating      TEXT,            -- Supply/Demand: A/B/C/D/E
    acc_dis_rating  TEXT,            -- Accumulation/Distribution: A/B/C/D/E
    buyer_demand    TEXT,
    -- Price position
    price_strength  REAL,            -- 52-week RS vs market
    week_high_52    REAL,
    week_low_52     REAL,
    pct_from_high   REAL,            -- % below 52-week high
    -- Industry classification (MSI's own taxonomy)
    group_rank      INTEGER,
    industry_group  TEXT,
    industry_group_rank TEXT,
    sector          TEXT,
    sub_group       TEXT,
    industry_symbol TEXT,
    -- MSI proprietary analysis
    canslim_checklist TEXT,          -- full JSON blob
    red_flags       TEXT,            -- JSON array
    chart_patterns  TEXT,            -- JSON (legacy field; msi_chart_patterns table is preferred)
    ai_report_summary TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_fundamentals_annual (
    asset_id TEXT,
    period_end_date DATE,
    revenue_ops REAL, total_revenue REAL, other_income REAL,
    materials_consumed REAL, employee_benefits REAL,
    depreciation REAL, ebitda REAL, finance_costs REAL,
    profit_before_tax REAL, tax_amount REAL, net_profit REAL,
    basic_eps REAL, diluted_eps REAL, dividend_rate REAL,
    -- Growth rates (pre-computed by MSI)
    sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_fundamentals_quarterly (
    asset_id TEXT,
    period_end_date DATE,
    revenue_ops REAL, total_revenue REAL, other_income REAL,
    materials_consumed REAL, employee_benefits REAL,
    depreciation REAL, ebitda REAL, finance_costs REAL,
    profit_before_tax REAL, tax_amount REAL, net_profit REAL,
    basic_eps REAL, diluted_eps REAL,
    -- QoQ/YoY growth
    sales_growth_yoy REAL, pat_growth_yoy REAL, eps_growth_yoy REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_balance_sheets (
    asset_id TEXT,
    period_end_date DATE,
    equity_capital REAL, reserves REAL,
    long_term_borrowings REAL, short_term_borrowings REAL,
    total_liabilities REAL,
    fixed_assets REAL, cwip REAL, goodwill REAL, intangible_assets REAL,
    investments REAL, inventories REAL, trade_receivables REAL,
    cash_equivalents REAL, deferred_tax REAL, total_assets REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_cash_flows (
    asset_id TEXT,
    period_end_date DATE,
    ops_profit_before_wc REAL, wc_changes REAL,
    net_cash_operating REAL, capex REAL, free_cash_flow REAL,
    net_cash_investing REAL, net_cash_financing REAL,
    dividend_paid REAL, net_change_in_cash REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_annual (
    asset_id TEXT,
    period_end_date DATE,
    ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
    roe REAL, roa REAL, roce REAL,
    debt_equity REAL, current_ratio REAL, interest_coverage REAL,
    asset_turnover REAL, inventory_turnover REAL,
    debtor_days REAL, creditor_days REAL,
    pe_ratio REAL, pb_ratio REAL, ev_ebitda REAL, ps_ratio REAL,
    dividend_yield REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_quarterly (
    asset_id TEXT,
    period_end_date DATE,
    ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
    roe REAL, roa REAL, roce REAL,
    debt_equity REAL, current_ratio REAL, interest_coverage REAL,
    asset_turnover REAL, inventory_turnover REAL,
    debtor_days REAL, creditor_days REAL,
    pe_ratio REAL, pb_ratio REAL, ev_ebitda REAL, ps_ratio REAL,
    dividend_yield REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_shareholding (
    asset_id TEXT,
    period_end_date DATE,
    promoter_holding REAL, promoter_change_qoq REAL,
    fii_holding REAL, fii_change_qoq REAL,
    dii_holding REAL, dii_change_qoq REAL,
    public_holding REAL, pledged_shares REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

-- Structured CANSLIM pass/fail (replaces opaque JSON blob in msi_company_data)
CREATE TABLE IF NOT EXISTS msi_canslim_checklist (
    asset_id        TEXT NOT NULL,
    check_date      TEXT NOT NULL,
    c_eps_growth_qoq    INTEGER,
    c_eps_growth_yoy    INTEGER,
    c_sales_growth      INTEGER,
    a_eps_growth_3y     INTEGER,
    a_roe               INTEGER,
    n_near_52w_high     INTEGER,
    n_new_product       INTEGER,
    s_smr_rating        TEXT,
    s_acc_dis_rating    TEXT,
    s_up_vol_ratio      REAL,
    l_rs_rating         INTEGER,
    l_industry_rank     INTEGER,
    i_sponsor_rating    TEXT,
    i_num_funds         INTEGER,
    m_market_in_uptrend INTEGER,
    overall_score       INTEGER,
    updated_at          TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (asset_id, check_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

-- Chart patterns (Cup & Handle, Flag, Double Bottom, etc.)
CREATE TABLE IF NOT EXISTS msi_chart_patterns (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id        TEXT NOT NULL,
    pattern_type    TEXT,
    status          TEXT,
    pivot_price     REAL,
    depth_pct       REAL,
    detected_on     TEXT,
    raw_json        TEXT,
    updated_at      TEXT DEFAULT (datetime('now')),
    UNIQUE (asset_id, pattern_type, detected_on),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);
CREATE INDEX IF NOT EXISTS idx_msi_chart_patterns_asset ON msi_chart_patterns(asset_id);

-- Institutional accumulation/distribution
CREATE TABLE IF NOT EXISTS msi_institutional_activity (
    asset_id        TEXT NOT NULL,
    period_end_date TEXT NOT NULL,
    fii_buy_value   REAL, fii_sell_value  REAL,
    dii_buy_value   REAL, dii_sell_value  REAL,
    net_fii REAL, net_dii REAL,
    raw_json TEXT,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

-- Daily/weekly industry group RS rankings (all 197 MSI groups)
CREATE TABLE IF NOT EXISTS msi_industry_group_rankings (
    date            TEXT NOT NULL,
    industry_symbol TEXT NOT NULL,
    industry_name   TEXT,
    rs_rank         INTEGER,
    rs_rating       INTEGER,
    pct_above_50ma  REAL,
    raw_json        TEXT,
    PRIMARY KEY (date, industry_symbol)
);
CREATE INDEX IF NOT EXISTS idx_msi_igr_date ON msi_industry_group_rankings(date DESC);

CREATE TABLE IF NOT EXISTS msi_block_deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id TEXT, deal_date DATE, deal_type TEXT, client_name TEXT,
    quantity REAL, price REAL, value REAL, exchange TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id TEXT, news_date DATETIME, headline TEXT, source TEXT, url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_pipeline_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    run_finished_at DATETIME,
    total_symbols INTEGER, success_count INTEGER, failure_count INTEGER,
    failed_symbols TEXT, notes TEXT
);
