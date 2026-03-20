-- Frontend relational tables and computed-table alignment for Postgres source of truth.

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

ALTER TABLE technical_indicators ADD COLUMN IF NOT EXISTS sma_20 REAL;

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
