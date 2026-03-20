# Current State

## Overview

The repository now follows a single supported product data path:

- Auth: Supabase
- Relational data: PostgreSQL (`artha_relational`)
- Timeseries data: TimescaleDB (`artha_timeseries`)
- Frontend runtime: Next.js app in `artha/`
- Data production: Python ingestion and computation jobs in `data-pipeline/`

The frontend no longer keeps a parallel SQLite adapter or mock application data path for stock, follow, and feed APIs.

## Frontend Runtime

Key files:

- `artha/src/lib/data/index.ts`
- `artha/src/lib/data/db-postgres.ts`
- `artha/src/lib/data/pg-adapter.ts`
- `artha/src/lib/server/auth.ts`

What the app expects:

- `assets`
- `asset_metrics`
- `computed_ratios`
- `technical_indicators`
- `corporate_actions`
- `msi_company_data`
- `daily_prices`
- `src_msi_quarterly`
- `src_msi_shareholding`
- `user_asset_follows`
- `user_feed_reads`

## Product Wiring

### Follow

Route:

- `artha/src/app/api/stocks/[symbol]/follow/route.ts`

Behavior:

- Resolves the signed-in Supabase user.
- Resolves the requested stock from `assets`.
- Stores follow state in `user_asset_follows`.
- Persists alert preferences as JSONB.
- Returns follower counts from the relational table.

### Feed

Route:

- `artha/src/app/api/feed/route.ts`

Behavior:

- Resolves the signed-in Supabase user.
- Reads followed assets from `user_asset_follows`.
- Builds feed events from:
  - `corporate_actions`
  - latest `src_msi_quarterly`
  - latest two `src_msi_shareholding` rows
- Tracks read state in `user_feed_reads`.

Current feed event coverage is intentionally conservative. It covers the highest-signal datasets already present in the checked-in schema rather than inventing new source systems.

### Sector Hierarchy

Route:

- `artha/src/app/api/sectors/hierarchy/route.ts`

Behavior:

- Aggregates active equities from `assets`.
- Uses `asset_metrics`, `computed_ratios`, and `msi_company_data` for return and valuation summaries.
- Generates RRG-like points from live aggregates rather than mock fixtures.

## Database Alignment

Fresh relational environments should use:

- `data-pipeline/db/init-postgres.sql`

Existing relational environments should also apply:

- `data-pipeline/db/migrations/002_frontend_product_tables.sql`

Reason:

- Older setups may be missing `computed_ratios`, `technical_indicators.sma_20`, `user_asset_follows`, and `user_feed_reads`.

## Computed Tables

`computed_ratios` and `technical_indicators` are part of the frontend query surface.

They are populated by:

- `data-pipeline/scripts/compute_pg_indicators.py`

Important detail:

- `technical_indicators` now includes `sma_20`, matching the frontend screener query shape.

## Testing

### Frontend

Supported commands:

- `npm run lint`
- `npm run test`
- `npm run build`

Formal unit tests currently live under:

- `artha/src/lib/__tests__/`

Manual diagnostics were moved to:

- `artha/scripts/diagnostics/`

### Pipeline

Supported command:

- `pytest`

Pytest configuration:

- `data-pipeline/pytest.ini`

## Repository Organization

Changes made to reduce ambiguity:

- Removed deprecated frontend SQLite adapter code.
- Removed SQLite-only diagnostic scripts.
- Moved ad hoc frontend diagnostics out of the app root.
- Replaced the placeholder frontend README with runtime-specific documentation.

## Remaining Operational Expectations

- Supabase environment variables must be configured for authenticated app routes.
- Postgres/Timescale connection strings must point to the populated relational/timeseries databases.
- `compute_pg_indicators.py` should be run after significant data refreshes so screener and analytics tables stay current.
