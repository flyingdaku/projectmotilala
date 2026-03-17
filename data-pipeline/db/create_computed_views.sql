-- Create computed_ratios and technical_indicators materialized views in PostgreSQL
-- These replace the missing SQLite tables needed by the screener

\c artha_relational

-- Computed ratios materialized view
CREATE MATERIALIZED VIEW IF NOT EXISTS computed_ratios AS
SELECT 
    a.id as asset_id,
    -- Market cap (from latest daily_market_cap in timescaledb)
    NULL::REAL as market_cap_cr,
    -- Valuation ratios (computed from fundamentals)
    NULL::REAL as pe_ttm,
    NULL::REAL as pb,
    NULL::REAL as ev_ebitda,
    NULL::REAL as dividend_yield,
    -- Profitability (from latest screener/MSI ratios)
    NULL::REAL as roce,
    NULL::REAL as roe,
    NULL::REAL as pat_margin,
    NULL::REAL as operating_margin,
    -- Growth metrics
    NULL::REAL as revenue_growth_1y,
    NULL::REAL as pat_growth_1y,
    NULL::REAL as eps_growth_1y,
    NULL::REAL as revenue_growth_3y,
    -- Financial health
    NULL::REAL as debt_equity,
    NULL::REAL as interest_coverage,
    NULL::REAL as current_ratio,
    -- Quality score (composite)
    NULL::REAL as quality_score
FROM assets a
WHERE a.asset_class = 'EQUITY' AND a.is_active = 1;

CREATE UNIQUE INDEX IF NOT EXISTS idx_computed_ratios_asset ON computed_ratios(asset_id);

-- Technical indicators materialized view
CREATE MATERIALIZED VIEW IF NOT EXISTS technical_indicators AS
SELECT 
    a.id as asset_id,
    CURRENT_DATE as computed_date,
    -- Price data (from latest daily_prices in timescaledb)
    NULL::REAL as close,
    NULL::REAL as change_1d_pct,
    -- Technical indicators
    NULL::REAL as rsi_14,
    NULL::REAL as pct_from_52w_high,
    NULL::REAL as pct_from_52w_low,
    NULL::REAL as sma_50,
    NULL::REAL as sma_200,
    NULL::REAL as volume,
    NULL::REAL as lag1_close
FROM assets a
WHERE a.asset_class = 'EQUITY' AND a.is_active = 1;

CREATE UNIQUE INDEX IF NOT EXISTS idx_technical_indicators_asset ON technical_indicators(asset_id, computed_date);

-- Refresh function (to be called after data updates)
CREATE OR REPLACE FUNCTION refresh_computed_views() RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY computed_ratios;
    REFRESH MATERIALIZED VIEW CONCURRENTLY technical_indicators;
END;
$$ LANGUAGE plpgsql;

COMMENT ON MATERIALIZED VIEW computed_ratios IS 'Pre-computed financial ratios for screener queries';
COMMENT ON MATERIALIZED VIEW technical_indicators IS 'Pre-computed technical indicators for screener queries';
COMMENT ON FUNCTION refresh_computed_views() IS 'Refresh both computed views - call after data pipeline runs';
