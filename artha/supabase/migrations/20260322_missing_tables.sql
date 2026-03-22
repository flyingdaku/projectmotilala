CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- pgDb (relational PostgreSQL): nse_trading_calendar
-- ============================================================================

CREATE TABLE IF NOT EXISTS nse_trading_calendar (
    trading_date DATE PRIMARY KEY,
    is_holiday BOOLEAN NOT NULL DEFAULT FALSE,
    holiday_name TEXT,
    exchange TEXT NOT NULL DEFAULT 'NSE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE nse_trading_calendar IS
    'NSE/BSE trading days and market holidays.
     Populated via scripts/seed_nse_calendar.py.
     Fallback in nse_calendar.py generates weekdays when table is empty.';

CREATE INDEX IF NOT EXISTS idx_trading_cal_date_active
    ON nse_trading_calendar (trading_date)
    WHERE is_holiday = FALSE;

INSERT INTO nse_trading_calendar (trading_date, is_holiday)
SELECT
    d::date,
    EXTRACT(DOW FROM d) IN (0, 6)
FROM generate_series(
    '2000-01-01'::date,
    '2030-12-31'::date,
    '1 day'::interval
) AS d
ON CONFLICT (trading_date) DO NOTHING;

-- ============================================================================
-- tsDb (TimescaleDB): index_prices + index_metadata
-- ============================================================================

CREATE TABLE IF NOT EXISTS index_prices (
    index_symbol TEXT NOT NULL,
    date DATE NOT NULL,
    open NUMERIC(14,4),
    high NUMERIC(14,4),
    low NUMERIC(14,4),
    close NUMERIC(14,4) NOT NULL,
    volume BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (index_symbol, date)
);

SELECT create_hypertable(
    'index_prices',
    'date',
    chunk_time_interval => INTERVAL '1 year',
    if_not_exists => TRUE
);

CREATE INDEX IF NOT EXISTS idx_index_prices_symbol_date
    ON index_prices (index_symbol, date DESC);

COMMENT ON TABLE index_prices IS
    'OHLCV for market indices used as benchmarks in backtests.
     Covers: NIFTY50, NIFTY500, NIFTY_MIDCAP100, NIFTY_SMALLCAP100,
     SENSEX, BANKNIFTY, NIFTYNEXT50 at minimum.';

CREATE TABLE IF NOT EXISTS index_metadata (
    index_symbol TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    description TEXT,
    exchange TEXT NOT NULL DEFAULT 'NSE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO index_metadata (index_symbol, display_name) VALUES
    ('NIFTY50', 'Nifty 50'),
    ('NIFTY500', 'Nifty 500'),
    ('NIFTY_MIDCAP100', 'Nifty Midcap 100'),
    ('NIFTY_SMALLCAP100', 'Nifty Smallcap 100'),
    ('BANKNIFTY', 'Nifty Bank'),
    ('NIFTYNEXT50', 'Nifty Next 50'),
    ('SENSEX', 'BSE Sensex')
ON CONFLICT (index_symbol) DO NOTHING;

-- ============================================================================
-- tsDb (TimescaleDB): daily_prices.adj_factor + helper function
-- ============================================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'daily_prices'
          AND column_name = 'adj_factor'
    ) THEN
        ALTER TABLE daily_prices
            ADD COLUMN adj_factor NUMERIC(14,8) NOT NULL DEFAULT 1.0;

        COMMENT ON COLUMN daily_prices.adj_factor IS
            'Multiplicative split/bonus adjustment factor.
             adjusted_close = close * adj_factor.
             Recalculated backwards when a new corporate action is recorded.
             Default 1.0 = unadjusted.';
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_daily_prices_asset_adj
    ON daily_prices (asset_id, date DESC)
    WHERE adj_factor != 1.0;

-- Also add adj_factor to any materialized views that select from daily_prices.
-- Inspect with: SELECT matviewname FROM pg_matviews;

CREATE OR REPLACE FUNCTION recalc_adj_factor(
    p_asset_id TEXT,
    p_action_date DATE,
    p_ratio NUMERIC
) RETURNS void LANGUAGE plpgsql AS $$
BEGIN
    UPDATE daily_prices
    SET adj_factor = adj_factor * p_ratio
    WHERE asset_id = p_asset_id
      AND date < p_action_date;
END;
$$;

COMMENT ON FUNCTION recalc_adj_factor IS
    'Call this from your data pipeline whenever a stock split or bonus
     is inserted into corporate_actions. Pass the adjustment ratio.
     For a 2:1 split: ratio = 0.5 (halves all pre-split prices).
     For a 1:1 bonus: ratio = 0.5 (same effect).';
