# Artha Frontend

Artha is a Next.js App Router application for Indian-market research, analytics, screener workflows, stock detail pages, feed tracking, and portfolio tooling.

## Runtime Dependencies

The app reads from:

- PostgreSQL for relational metadata and product state
- TimescaleDB for prices, fundamentals, and shareholding history
- Supabase for authentication/session management

Key files:

- `src/lib/data/db-postgres.ts`
- `src/lib/data/pg-adapter.ts`
- `src/lib/server/auth.ts`
- `src/middleware.ts`

## App Areas

Primary route groups:

- `(marketing)`: landing and login
- `(app)`: authenticated product experience
- `api/`: server routes for search, stocks, feed, screener, analytics, sectors

Notable routes:

- `/dashboard`
- `/feed`
- `/screener`
- `/stocks/[symbol]`
- `/analytics/*`
- `/portfolio/*`

## Commands

```bash
npm install --cache /tmp/projectmotilala-npm-cache
npm run lint
npm run test
npm run build
npm run dev
```

## Testing

Formal tests:

- `src/lib/__tests__/`

Vitest config:

- `vitest.config.ts`

Manual diagnostics:

- `scripts/diagnostics/`

These diagnostics are useful for local debugging but are not the supported CI-style test suite.

## Follow And Feed

Follow state:

- stored in `user_asset_follows`
- keyed by Supabase `user.id`

Feed state:

- built from followed assets plus market datasets
- read/unread state stored in `user_feed_reads`

Current event sources:

- corporate actions
- latest quarterly fundamentals
- latest shareholding changes

## Environment

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
PG_RELATIONAL_URL=postgresql://...
PG_TIMESERIES_URL=postgresql://...
```

## Notes

- The frontend no longer ships a supported SQLite data adapter.
- Sector hierarchy data is sourced from database aggregates, not hardcoded mock responses.
