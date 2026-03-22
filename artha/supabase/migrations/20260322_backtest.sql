CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS backtest_strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    name TEXT NOT NULL CHECK (char_length(name) <= 100),
    position_type TEXT NOT NULL CHECK (position_type IN ('long', 'short')),
    entry_criteria JSONB,
    entry_criteria_mode TEXT NOT NULL DEFAULT 'builder'
        CHECK (entry_criteria_mode IN ('builder', 'formula', 'screen')),
    entry_screen_id UUID,
    entry_exec_model TEXT NOT NULL DEFAULT 'close'
        CHECK (entry_exec_model IN ('close', 'next_open', 'next_if')),
    entry_exec_params JSONB,
    entry_limit_to TEXT CHECK (entry_limit_to IN ('eod', 'eow', 'eom')),
    entry_prioritize JSONB,
    exit_criteria JSONB,
    exit_criteria_mode TEXT NOT NULL DEFAULT 'builder'
        CHECK (exit_criteria_mode IN ('builder', 'formula', 'screen')),
    exit_screen_id UUID,
    exit_exec_model TEXT NOT NULL DEFAULT 'close'
        CHECK (exit_exec_model IN ('close', 'next_open')),
    exit_limit_to TEXT CHECK (exit_limit_to IN ('eod', 'eow', 'eom')),
    unit TEXT NOT NULL DEFAULT 'pct'
        CHECK (unit IN ('pct', 'atr')),
    stop_loss NUMERIC(8,4),
    trailing_stop NUMERIC(8,4),
    take_profit NUMERIC(8,4),
    close_after_bars INTEGER CHECK (close_after_bars > 0),
    close_at_end_of TEXT CHECK (close_at_end_of IN ('year', 'semester', 'quarter', 'month', 'week', 'day')),
    initial_capital BIGINT NOT NULL DEFAULT 1000000,
    capital_at_risk NUMERIC(8,4) NOT NULL DEFAULT 5,
    risk_unit TEXT NOT NULL DEFAULT 'pct'
        CHECK (risk_unit IN ('pct', 'fixed')),
    portfolio_max_size INTEGER NOT NULL DEFAULT 20
        CHECK (portfolio_max_size BETWEEN 1 AND 200),
    commission NUMERIC(10,2) NOT NULL DEFAULT 20,
    commission_unit TEXT NOT NULL DEFAULT 'inr'
        CHECK (commission_unit IN ('inr', 'pct')),
    bid_ask_spread NUMERIC(8,4) NOT NULL DEFAULT 0.05,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    benchmark TEXT NOT NULL DEFAULT 'NIFTY50',
    universe TEXT NOT NULL DEFAULT 'NIFTY500',
    custom_universe TEXT[],
    include_delisted BOOLEAN NOT NULL DEFAULT FALSE,
    circuit_breaker_compliance BOOLEAN NOT NULL DEFAULT TRUE,
    liquidity_min_value BIGINT DEFAULT 1000000,
    cost_config JSONB NOT NULL DEFAULT '{
      "stt_delivery_sell": 0.1,
      "stt_intraday_sell": 0.025,
      "sebi_charges": 0.0001,
      "exchange_charges": 0.00335,
      "stamp_duty_buy": 0.015,
      "gst_on_brokerage": 18
    }'::jsonb,
    tax_config JSONB NOT NULL DEFAULT '{
      "apply_tax": true,
      "stcg_rate": 20,
      "ltcg_rate": 12.5,
      "ltcg_exemption": 125000
    }'::jsonb,
    grouping_icon TEXT,
    tags TEXT[],
    is_public BOOLEAN NOT NULL DEFAULT FALSE,
    is_template BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_backtest_strategies_user_created
    ON backtest_strategies (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_backtest_strategies_public
    ON backtest_strategies (is_public) WHERE is_public = TRUE;
CREATE INDEX IF NOT EXISTS idx_backtest_strategies_template
    ON backtest_strategies (is_template) WHERE is_template = TRUE;

DROP TRIGGER IF EXISTS strategy_updated_at ON backtest_strategies;
CREATE TRIGGER strategy_updated_at
    BEFORE UPDATE ON backtest_strategies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS backtest_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    strategy_id UUID NOT NULL REFERENCES backtest_strategies(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    share_slug TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'queued'
        CHECK (status IN ('queued', 'running', 'completed', 'failed')),
    progress INTEGER NOT NULL DEFAULT 0
        CHECK (progress BETWEEN 0 AND 100),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_msg TEXT,
    strategy_snapshot JSONB NOT NULL,
    metrics JSONB,
    equity_curve JSONB,
    monthly_returns JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_backtest_runs_user_created
    ON backtest_runs (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_backtest_runs_strategy
    ON backtest_runs (strategy_id);
CREATE INDEX IF NOT EXISTS idx_backtest_runs_share_slug
    ON backtest_runs (share_slug) WHERE share_slug IS NOT NULL;

CREATE TABLE IF NOT EXISTS backtest_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID NOT NULL REFERENCES backtest_runs(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    claimed_at TIMESTAMPTZ,
    worker_pid INTEGER,
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_backtest_jobs_run_id
    ON backtest_jobs (run_id);
CREATE INDEX IF NOT EXISTS idx_backtest_jobs_unclaimed
    ON backtest_jobs (claimed_at) WHERE claimed_at IS NULL;

CREATE TABLE IF NOT EXISTS nse_trading_calendar (
    trading_date DATE PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION notify_backtest_job()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    PERFORM pg_notify('backtest_jobs', NEW.run_id::text);
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS backtest_job_trigger ON backtest_jobs;
CREATE TRIGGER backtest_job_trigger
    AFTER INSERT ON backtest_jobs
    FOR EACH ROW EXECUTE FUNCTION notify_backtest_job();

-- Run this section against the TimescaleDB database.
CREATE TABLE IF NOT EXISTS backtest_trades (
    id BIGSERIAL,
    run_id UUID NOT NULL,
    symbol TEXT NOT NULL,
    company_name TEXT,
    direction TEXT NOT NULL CHECK (direction IN ('long', 'short')),
    entry_date TIMESTAMPTZ NOT NULL,
    entry_price NUMERIC(14,4) NOT NULL,
    exit_date TIMESTAMPTZ NOT NULL,
    exit_price NUMERIC(14,4) NOT NULL,
    shares INTEGER NOT NULL,
    trade_value NUMERIC(16,2),
    gross_pnl NUMERIC(16,2),
    total_costs NUMERIC(16,2),
    tax NUMERIC(16,2),
    net_pnl NUMERIC(16,2),
    net_pnl_pct NUMERIC(10,4),
    duration_days INTEGER,
    exit_reason TEXT CHECK (exit_reason IN (
        'stop_loss', 'trailing_sl', 'take_profit',
        'criteria', 'time_bars', 'time_period', 'circuit'
    )),
    gains_type TEXT CHECK (gains_type IN ('stcg', 'ltcg')),
    PRIMARY KEY (id, entry_date)
);

SELECT create_hypertable(
    'backtest_trades',
    'entry_date',
    if_not_exists => TRUE,
    chunk_time_interval => INTERVAL '3 months'
);

CREATE INDEX IF NOT EXISTS idx_backtest_trades_run_date
    ON backtest_trades (run_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_backtest_trades_symbol_date
    ON backtest_trades (symbol, entry_date DESC);
