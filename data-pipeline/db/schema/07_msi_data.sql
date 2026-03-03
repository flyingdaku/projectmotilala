CREATE TABLE IF NOT EXISTS msi_company_data (
    asset_id TEXT PRIMARY KEY,
    msi_instrument_id INTEGER,
    master_score INTEGER,
    eps_rating INTEGER,
    rs_rating INTEGER,
    buyer_demand TEXT,
    group_rank INTEGER,
    industry_group TEXT,
    industry_group_rank TEXT,
    sector TEXT,
    sub_group TEXT,
    industry_symbol TEXT,
    canslim_checklist TEXT,
    red_flags TEXT,
    chart_patterns TEXT,
    ai_report_summary TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);


CREATE TABLE IF NOT EXISTS msi_fundamentals_annual (
    asset_id TEXT,
    period_end_date DATE,
    revenue_ops REAL,
    total_revenue REAL,
    materials_consumed REAL,
    employee_benefits REAL,
    depreciation REAL,
    finance_costs REAL,
    profit_before_tax REAL,
    net_profit REAL,
    basic_eps REAL,
    diluted_eps REAL,
    dividend_rate REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_balance_sheets (
    asset_id TEXT,
    period_end_date DATE,
    equity_capital REAL,
    reserves REAL,
    long_term_borrowings REAL,
    short_term_borrowings REAL,
    total_liabilities REAL,
    fixed_assets REAL,
    cwip REAL,
    investments REAL,
    inventories REAL,
    trade_receivables REAL,
    cash_equivalents REAL,
    total_assets REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_cash_flows (
    asset_id TEXT,
    period_end_date DATE,
    ops_profit_before_wc REAL,
    wc_changes REAL,
    net_cash_operating REAL,
    capex REAL,
    net_cash_investing REAL,
    net_cash_financing REAL,
    net_change_in_cash REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_annual (
    asset_id TEXT,
    period_end_date DATE,
    ebit_margin REAL,
    pre_tax_margin REAL,
    net_profit_margin REAL,
    roe REAL,
    roce REAL,
    debt_equity REAL,
    asset_turnover REAL,
    inventory_turnover REAL,
    debtor_days REAL,
    creditor_days REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_shareholding (
    asset_id TEXT,
    period_end_date DATE,
    promoter_holding REAL,
    fii_holding REAL,
    dii_holding REAL,
    public_holding REAL,
    pledged_shares REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_fundamentals_quarterly (
    asset_id TEXT,
    period_end_date DATE,
    revenue_ops REAL,
    total_revenue REAL,
    materials_consumed REAL,
    employee_benefits REAL,
    depreciation REAL,
    finance_costs REAL,
    profit_before_tax REAL,
    net_profit REAL,
    basic_eps REAL,
    diluted_eps REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_ratios_quarterly (
    asset_id TEXT,
    period_end_date DATE,
    ebit_margin REAL,
    pre_tax_margin REAL,
    net_profit_margin REAL,
    roe REAL,
    roce REAL,
    debt_equity REAL,
    asset_turnover REAL,
    inventory_turnover REAL,
    debtor_days REAL,
    creditor_days REAL,
    PRIMARY KEY (asset_id, period_end_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_block_deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id TEXT,
    deal_date DATE,
    deal_type TEXT,
    client_name TEXT,
    quantity REAL,
    price REAL,
    value REAL,
    exchange TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id TEXT,
    news_date DATETIME,
    headline TEXT,
    source TEXT,
    url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS msi_pipeline_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    run_finished_at DATETIME,
    total_symbols INTEGER,
    success_count INTEGER,
    failure_count INTEGER,
    failed_symbols TEXT,
    notes TEXT
);
