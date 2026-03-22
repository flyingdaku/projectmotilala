CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS chart_layouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    content JSONB NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chart_layouts_user_id
    ON chart_layouts (user_id);

CREATE UNIQUE INDEX IF NOT EXISTS uq_chart_layouts_one_default_per_user
    ON chart_layouts (user_id)
    WHERE is_default = TRUE;

CREATE TABLE IF NOT EXISTS chart_drawings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    timeframe TEXT NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_chart_drawings_user_symbol_timeframe UNIQUE (user_id, symbol, timeframe)
);

CREATE INDEX IF NOT EXISTS idx_chart_drawings_user_symbol
    ON chart_drawings (user_id, symbol);

CREATE TABLE IF NOT EXISTS chart_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    price NUMERIC(14,4) NOT NULL,
    condition TEXT NOT NULL CHECK (condition IN ('above', 'below')),
    message TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    triggered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chart_alerts_user_symbol_active
    ON chart_alerts (user_id, symbol, is_active);
