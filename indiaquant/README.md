# IndiaQuant

> India's most powerful portfolio analytics platform — built for serious investors.

## Architecture

```
indiaquant/
├── apps/
│   ├── client/                  # Expo Universal App (iOS, Android, Web)
│   └── analytics-engine/        # FastAPI Python microservice
├── packages/
│   ├── types/                   # Shared Zod schemas + TypeScript types
│   ├── finance-math/            # Financial math library (decimal.js)
│   ├── config/                  # Shared TS + Tailwind configs
│   └── ui/                      # Shared primitive UI components (NativeWind)
└── supabase/
    └── migrations/              # PostgreSQL schema + RLS policies
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile/Web | Expo 52 (React Native + Web via Metro) |
| Routing | Expo Router v4 (file-based, typed) |
| Styling | NativeWind v4 (Tailwind CSS for RN) |
| State | TanStack Query v5 + Zustand |
| Backend | Supabase (Postgres + Auth + RLS) |
| Analytics Engine | FastAPI + NumPy + Pandas + statsmodels |
| Financial Math | decimal.js (no float rounding errors) |
| Testing | Vitest (unit/integration) + Playwright (E2E) |
| Monorepo | Turborepo + npm workspaces |
| Analytics | PostHog (feature flags + product analytics) |

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Expo CLI (`npm install -g expo-cli`)

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure environment variables

```bash
# Expo client
cp apps/client/.env.example apps/client/.env
# Fill in EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY, etc.

# Analytics engine
cp apps/analytics-engine/.env.example apps/analytics-engine/.env
# Fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
```

### 3. Set up Supabase

```bash
# Apply migrations
supabase db push
# Or manually run supabase/migrations/001_initial_schema.sql
```

### 4. Start the Expo app

```bash
# iOS simulator
npm run ios --workspace=apps/client

# Android emulator
npm run android --workspace=apps/client

# Web browser
npm run dev:web --workspace=apps/client
```

### 5. Start the analytics engine

```bash
cd apps/analytics-engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## Features

### Phase 0 — Viral Tools (No Auth Required)
- **Returns Heatmap** — Calendar heatmap of CAGR by start year × holding period
- **SIP Calculator** — Step-up SIP vs lumpsum with inflation adjustment
- **Rolling Returns** — Best/worst/median outcomes for any holding period
- **Asset Comparison** — Nifty 50 vs Gold vs G-Sec vs Midcap side-by-side

### Phase 1 — Core Portfolio Tracking
- **CAS Import** — Client-side PDF parsing (CAMS + KFintech), zero data leakage
- **Portfolio Dashboard** — Net worth, XIRR, allocation chart, holdings table
- **Multi-portfolio** — Separate portfolios for self, spouse, HUF

### Phase 2 — India Tax Engine
- **LTCG/STCG** — Grandfathering (Jan 31 2018), ₹1.25L exemption
- **Lot Matching** — FIFO / LIFO / Min-Gain
- **Tax Harvesting** — Identify loss-booking opportunities before year-end

### Phase 3 — Backtesting
- **Asset Allocation Backtest** — Any mix of Nifty, Gold, G-Sec, Midcap
- **SIP Backtest** — Monthly SIP simulation with rebalancing
- **Metrics** — CAGR, Sharpe, Sortino, Max Drawdown, annual returns

### Phase 4 — Retirement Planning
- **FI Calculator** — 25× rule, years to FI, progress tracker
- **Monte Carlo** — 5,000 simulations, probability of success, fan chart
- **Goals** — Track financial milestones with progress visualization

### Phase 5 — Power Analytics
- **Stock Screener** — 50+ metrics, preset screens (Quality, Value, Momentum)
- **Factor Analysis** — Fama-French 3/4/5-factor regression, rolling alpha
- **Settings** — Biometric lock, screen capture prevention, subscription management

## Security

- **RLS** — Row-level security on all user tables in Supabase
- **Client-side parsing** — CAS PDFs never leave the device
- **Secure storage** — JWT tokens stored in `expo-secure-store` (Keychain/Keystore)
- **Screen capture prevention** — Portfolio data blocked from screenshots
- **Biometric auth** — Face ID / fingerprint support via `expo-local-authentication`

## Pricing Tiers

| Feature | Free | Pro | Expert |
|---------|------|-----|--------|
| Viral tools | ✓ | ✓ | ✓ |
| Portfolio tracking | ✓ (1) | ✓ (unlimited) | ✓ |
| Tax engine | — | ✓ | ✓ |
| Backtesting | — | ✓ | ✓ |
| Screener | — | ✓ | ✓ |
| Monte Carlo | — | ✓ | ✓ |
| Factor Analysis | — | — | ✓ |
| AI Insights | — | — | ✓ |

Feature flags are managed via PostHog.

## Testing

```bash
# Unit tests (finance-math)
npm run test --workspace=packages/finance-math

# All packages
npm run test

# Type checking
npm run typecheck
```

## Development

```bash
# Lint + format
npm run lint
npm run format

# Build all packages
npm run build
```
