-- =============================================================================
-- IndiaQuant Initial Schema
-- Migration: 001_initial_schema.sql
--
-- Tables: users, portfolios, holdings, transactions, tax_lots,
--         mutual_fund_nav, asset_prices, goals, watchlist, audit_log
--
-- RLS is enabled on all user-owned tables.
-- Market data tables (asset_prices, mutual_fund_nav) are public read-only.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

CREATE TYPE asset_class AS ENUM (
  'EQUITY_MF', 'DEBT_MF', 'HYBRID_MF', 'ELSS', 'INDEX_FUND',
  'ETF', 'DIRECT_EQUITY', 'GOLD', 'GSEC', 'FD', 'REAL_ESTATE',
  'CRYPTO', 'CUSTOM'
);

CREATE TYPE transaction_type AS ENUM (
  'BUY', 'SELL', 'SWITCH_IN', 'SWITCH_OUT', 'SIP',
  'STP_IN', 'STP_OUT', 'SWP', 'DIVIDEND_REINVEST',
  'DIVIDEND_PAYOUT', 'BONUS', 'SPLIT', 'MERGER'
);

CREATE TYPE transaction_source AS ENUM (
  'CAS_IMPORT', 'BROKER_SYNC', 'CSV_IMPORT', 'MANUAL', 'EMAIL_PARSE'
);

CREATE TYPE tax_lot_method AS ENUM ('FIFO', 'LIFO', 'MIN_GAIN');

CREATE TYPE subscription_tier AS ENUM ('FREE', 'PRO', 'EXPERT');

-- ---------------------------------------------------------------------------
-- Users (extends Supabase auth.users)
-- ---------------------------------------------------------------------------

CREATE TABLE public.users (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT,
  avatar_url      TEXT,
  subscription_tier subscription_tier NOT NULL DEFAULT 'FREE',
  tax_lot_method  tax_lot_method NOT NULL DEFAULT 'FIFO',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Portfolios
-- ---------------------------------------------------------------------------

CREATE TABLE public.portfolios (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  currency    TEXT NOT NULL DEFAULT 'INR',
  is_default  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);

ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own portfolios"
  ON public.portfolios FOR ALL
  USING (auth.uid() = user_id);

-- Ensure only one default portfolio per user
CREATE UNIQUE INDEX idx_portfolios_one_default
  ON public.portfolios(user_id)
  WHERE is_default = TRUE;

-- ---------------------------------------------------------------------------
-- Holdings
-- ---------------------------------------------------------------------------

CREATE TABLE public.holdings (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  isin         CHAR(12),
  folio_number TEXT,
  scheme_name  TEXT NOT NULL,
  amc_name     TEXT,
  asset_class  asset_class NOT NULL,
  units        NUMERIC(20, 8) NOT NULL DEFAULT 0,
  avg_nav      NUMERIC(20, 8) NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_holdings_portfolio_id ON public.holdings(portfolio_id);
CREATE INDEX idx_holdings_isin ON public.holdings(isin) WHERE isin IS NOT NULL;

ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own holdings"
  ON public.holdings FOR ALL
  USING (
    auth.uid() = (
      SELECT user_id FROM public.portfolios WHERE id = portfolio_id
    )
  );

-- ---------------------------------------------------------------------------
-- Transactions
-- ---------------------------------------------------------------------------

CREATE TABLE public.transactions (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  holding_id   UUID NOT NULL REFERENCES public.holdings(id) ON DELETE CASCADE,
  portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
  date         DATE NOT NULL,
  type         transaction_type NOT NULL,
  source       transaction_source NOT NULL DEFAULT 'MANUAL',
  units        NUMERIC(20, 8) NOT NULL,
  nav          NUMERIC(20, 8) NOT NULL,
  amount       NUMERIC(20, 4) NOT NULL,
  folio_number TEXT,
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BRIN index on date for efficient time-series queries
CREATE INDEX idx_transactions_date_brin ON public.transactions USING BRIN(date);
CREATE INDEX idx_transactions_holding_id ON public.transactions(holding_id);
CREATE INDEX idx_transactions_portfolio_id ON public.transactions(portfolio_id);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own transactions"
  ON public.transactions FOR ALL
  USING (
    auth.uid() = (
      SELECT p.user_id FROM public.portfolios p WHERE p.id = portfolio_id
    )
  );

-- ---------------------------------------------------------------------------
-- Tax Lots
-- ---------------------------------------------------------------------------

CREATE TABLE public.tax_lots (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  holding_id        UUID NOT NULL REFERENCES public.holdings(id) ON DELETE CASCADE,
  transaction_id    UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  purchase_date     DATE NOT NULL,
  units             NUMERIC(20, 8) NOT NULL,
  purchase_nav      NUMERIC(20, 8) NOT NULL,
  purchase_amount   NUMERIC(20, 4) NOT NULL,
  grandfathered_nav NUMERIC(20, 8),
  is_elss           BOOLEAN NOT NULL DEFAULT FALSE,
  elss_unlock_date  DATE,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tax_lots_holding_id ON public.tax_lots(holding_id);
CREATE INDEX idx_tax_lots_purchase_date ON public.tax_lots(purchase_date);

ALTER TABLE public.tax_lots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own tax lots"
  ON public.tax_lots FOR ALL
  USING (
    auth.uid() = (
      SELECT p.user_id
      FROM public.portfolios p
      JOIN public.holdings h ON h.portfolio_id = p.id
      WHERE h.id = holding_id
    )
  );

-- ---------------------------------------------------------------------------
-- Mutual Fund NAV (public read-only, updated daily)
-- ---------------------------------------------------------------------------

CREATE TABLE public.mutual_fund_nav (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scheme_code TEXT NOT NULL,
  isin        CHAR(12),
  scheme_name TEXT NOT NULL,
  amc_name    TEXT NOT NULL,
  asset_class asset_class NOT NULL,
  nav         NUMERIC(20, 8) NOT NULL,
  nav_date    DATE NOT NULL,
  UNIQUE(scheme_code, nav_date)
);

CREATE INDEX idx_mf_nav_isin ON public.mutual_fund_nav(isin) WHERE isin IS NOT NULL;
CREATE INDEX idx_mf_nav_date ON public.mutual_fund_nav(nav_date);
-- BRIN index for time-series queries on large NAV history
CREATE INDEX idx_mf_nav_date_brin ON public.mutual_fund_nav USING BRIN(nav_date);

-- Public read access — no auth required for NAV data
ALTER TABLE public.mutual_fund_nav ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read NAV data"
  ON public.mutual_fund_nav FOR SELECT
  USING (TRUE);

-- ---------------------------------------------------------------------------
-- Asset Prices (Nifty, Gold, G-Sec, CPI etc.)
-- ---------------------------------------------------------------------------

CREATE TABLE public.asset_prices (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_id    TEXT NOT NULL,
  date        DATE NOT NULL,
  close_price NUMERIC(20, 8) NOT NULL,
  open_price  NUMERIC(20, 8),
  high_price  NUMERIC(20, 8),
  low_price   NUMERIC(20, 8),
  volume      BIGINT,
  source      TEXT NOT NULL,
  UNIQUE(asset_id, date)
);

-- BRIN index — ideal for append-only time-series
CREATE INDEX idx_asset_prices_date_brin ON public.asset_prices USING BRIN(date);
CREATE INDEX idx_asset_prices_asset_id ON public.asset_prices(asset_id);

ALTER TABLE public.asset_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read asset prices"
  ON public.asset_prices FOR SELECT
  USING (TRUE);

-- ---------------------------------------------------------------------------
-- Goals
-- ---------------------------------------------------------------------------

CREATE TABLE public.goals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  portfolio_id  UUID REFERENCES public.portfolios(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  target_amount NUMERIC(20, 4) NOT NULL,
  target_date   DATE NOT NULL,
  current_value NUMERIC(20, 4) NOT NULL DEFAULT 0,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_goals_user_id ON public.goals(user_id);

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own goals"
  ON public.goals FOR ALL
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Watchlist
-- ---------------------------------------------------------------------------

CREATE TABLE public.watchlist (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  isin        CHAR(12),
  scheme_code TEXT,
  name        TEXT NOT NULL,
  asset_class asset_class NOT NULL,
  added_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_watchlist_user_id ON public.watchlist(user_id);

ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own watchlist"
  ON public.watchlist FOR ALL
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Stock Fundamentals (for screener — public read)
-- ---------------------------------------------------------------------------

CREATE TABLE public.stock_fundamentals (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isin               CHAR(12) NOT NULL UNIQUE,
  symbol             TEXT NOT NULL,
  company_name       TEXT NOT NULL,
  sector             TEXT,
  market_cap         NUMERIC(20, 2),
  pe_ratio           NUMERIC(10, 4),
  pb_ratio           NUMERIC(10, 4),
  roce               NUMERIC(10, 4),
  roe                NUMERIC(10, 4),
  debt_to_equity     NUMERIC(10, 4),
  promoter_holding   NUMERIC(10, 4),
  pledge_percent     NUMERIC(10, 4),
  eps_growth_1yr     NUMERIC(10, 4),
  revenue_growth_1yr NUMERIC(10, 4),
  indiaquant_score   NUMERIC(5, 2),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_fundamentals_market_cap ON public.stock_fundamentals(market_cap DESC NULLS LAST);
CREATE INDEX idx_fundamentals_sector ON public.stock_fundamentals(sector);

ALTER TABLE public.stock_fundamentals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read fundamentals"
  ON public.stock_fundamentals FOR SELECT
  USING (TRUE);

-- ---------------------------------------------------------------------------
-- India Factor Data (for Fama-French regression — public read)
-- ---------------------------------------------------------------------------

CREATE TABLE public.india_factors (
  id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date   DATE NOT NULL UNIQUE,
  mkt_rf NUMERIC(10, 8) NOT NULL,
  smb    NUMERIC(10, 8),
  hml    NUMERIC(10, 8),
  mom    NUMERIC(10, 8),
  rmw    NUMERIC(10, 8),
  cma    NUMERIC(10, 8),
  rf     NUMERIC(10, 8) NOT NULL DEFAULT 0
);

CREATE INDEX idx_india_factors_date ON public.india_factors(date);

ALTER TABLE public.india_factors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read factor data"
  ON public.india_factors FOR SELECT
  USING (TRUE);

-- ---------------------------------------------------------------------------
-- Audit Log
-- ---------------------------------------------------------------------------

CREATE TABLE public.audit_log (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action     TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id  TEXT NOT NULL,
  old_data   JSONB,
  new_data   JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX idx_audit_log_created_at_brin ON public.audit_log USING BRIN(created_at);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own audit log"
  ON public.audit_log FOR SELECT
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Updated_at trigger function
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_portfolios
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_holdings
  BEFORE UPDATE ON public.holdings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_goals
  BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
