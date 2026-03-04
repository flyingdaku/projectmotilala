yes-- ─── MSI EXTENDED SCHEMA ──────────────────────────────────────────────────────
-- Applied via ALTER TABLE on existing DB; new tables created fresh.

-- Chart patterns detected by MSI (Cup with Handle, Flag, Double Bottom, etc.)
CREATE TABLE IF NOT EXISTS msi_chart_patterns (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    asset_id        TEXT NOT NULL,
    pattern_type    TEXT,          -- e.g. 'CUP_WITH_HANDLE', 'FLAG', 'DOUBLE_BOTTOM'
    status          TEXT,          -- e.g. 'FORMING', 'BREAKOUT', 'FAILED'
    pivot_price     REAL,          -- ideal buy point
    depth_pct       REAL,          -- depth of base in %
    detected_on     TEXT,          -- date first detected
    raw_json        TEXT,
    updated_at      TEXT DEFAULT (datetime('now')),
    UNIQUE (asset_id, pattern_type, detected_on)
);
CREATE INDEX IF NOT EXISTS idx_msi_chart_patterns_asset ON msi_chart_patterns(asset_id);

-- Institutional accumulation/distribution activity over time
CREATE TABLE IF NOT EXISTS msi_institutional_activity (
    asset_id        TEXT NOT NULL,
    period_end_date TEXT NOT NULL,
    fii_buy_value   REAL,
    fii_sell_value  REAL,
    dii_buy_value   REAL,
    dii_sell_value  REAL,
    net_fii         REAL,
    net_dii         REAL,
    raw_json        TEXT,
    PRIMARY KEY (asset_id, period_end_date)
);

-- Daily industry group RS rankings (all 197 groups)
CREATE TABLE IF NOT EXISTS msi_industry_group_rankings (
    date            TEXT NOT NULL,
    industry_symbol TEXT NOT NULL,
    industry_name   TEXT,
    rs_rank         INTEGER,       -- 1 = strongest relative strength
    rs_rating       INTEGER,       -- 1-99
    pct_above_50ma  REAL,          -- % of stocks above 50-day MA
    raw_json        TEXT,
    PRIMARY KEY (date, industry_symbol)
);
CREATE INDEX IF NOT EXISTS idx_msi_igr_date ON msi_industry_group_rankings(date DESC);

-- Structured CANSLIM pass/fail per criterion (instead of opaque JSON blob)
CREATE TABLE IF NOT EXISTS msi_canslim_checklist (
    asset_id        TEXT NOT NULL,
    check_date      TEXT NOT NULL,
    -- C: Current earnings
    c_eps_growth_qoq    INTEGER,   -- 1=pass, 0=fail, NULL=unknown
    c_eps_growth_yoy    INTEGER,
    c_sales_growth      INTEGER,
    -- A: Annual earnings
    a_eps_growth_3y     INTEGER,
    a_roe               INTEGER,
    -- N: New product/high
    n_near_52w_high     INTEGER,
    n_new_product       INTEGER,
    -- S: Supply/Demand
    s_smr_rating        TEXT,      -- A/B/C/D/E
    s_acc_dis_rating    TEXT,      -- A/B/C/D/E
    s_up_vol_ratio      REAL,
    -- L: Leader/Laggard
    l_rs_rating         INTEGER,
    l_industry_rank     INTEGER,
    -- I: Institutional Sponsorship
    i_sponsor_rating    TEXT,
    i_num_funds         INTEGER,
    -- M: Market direction
    m_market_in_uptrend INTEGER,
    overall_score       INTEGER,   -- composite 1-99
    updated_at          TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (asset_id, check_date)
);
