# Project Motilala

This repository has two active runtime surfaces:

- `artha/`: the Next.js product UI.
- `data-pipeline/`: the ingestion and computation stack that fills the relational and timeseries databases.

## Current Source Of Truth

The supported application data path is:

1. `data-pipeline/` loads and computes market data into PostgreSQL + TimescaleDB.
2. `artha/` reads from those databases through the `pg` adapter in `src/lib/data`.

Legacy SQLite-only frontend paths have been removed from the app code. Existing local SQLite files in `data-pipeline/db/` remain as historical artifacts and migration inputs, not the active frontend backend.

## Repo Layout

- `artha/`
  - `src/app/`: App Router pages and API routes.
  - `src/lib/data/`: typed Postgres/Timescale adapter used by product APIs.
  - `src/lib/supabase/`: auth/session helpers.
  - `scripts/diagnostics/`: manual one-off debugging scripts, not the formal test suite.
- `data-pipeline/`
  - `pipelines/`: scheduled ingestion and computation jobs.
  - `sources/`: source-specific ingesters and parsers.
  - `db/init-postgres.sql`: relational schema bootstrap.
  - `db/init-timescale.sql`: timeseries schema bootstrap.
  - `db/migrations/002_frontend_product_tables.sql`: alignment migration for frontend follow/feed/computed tables.
- `docs/`
  - `current-state.md`: detailed current architecture, runtime assumptions, and operational notes.

## Core Commands

Frontend:

```bash
cd artha
npm install --cache /tmp/projectmotilala-npm-cache
npm run lint
npm run test
npm run build
```

Pipeline:

```bash
cd data-pipeline
pip install -r requirements.txt
pytest
python run_pipeline.py
```

## First-Time Database Setup

For fresh Postgres/Timescale environments:

1. Start services with `data-pipeline/docker-compose.yml`.
2. Apply `data-pipeline/db/init-postgres.sql`.
3. Apply `data-pipeline/db/init-timescale.sql`.
4. For existing relational environments created before the frontend follow/feed work, also apply `data-pipeline/db/migrations/002_frontend_product_tables.sql`.
5. Run `data-pipeline/scripts/compute_pg_indicators.py` to populate `computed_ratios` and `technical_indicators`.

## Notes

- Supabase remains the authentication layer for `artha/`.
- Feed and follow state are now relational tables keyed by Supabase `user.id`.
- Sector hierarchy data now comes from aggregated relational metrics instead of hardcoded API mocks.
