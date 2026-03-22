# EODHD Pipeline

This document is the consolidated reference for the EODHD integration in the
Artha data pipeline. It replaces scattered status notes as the main place to
understand what the pipeline does, where data lands, how it is run, and what
is still incomplete.

## Purpose

EODHD is a supplementary market-data source used for:

- end-of-day OHLCV cross-validation
- adjusted-close validation
- symbol mapping for alternate coverage
- corporate-actions cross-checking
- intraday backfills

It is not the primary daily market-data source for Indian equities. NSE/BSE
and internal adjusted-price computation remain the primary production path.

## Source Code Inventory

Core EODHD implementation:

- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/client.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/client.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_eod.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_eod.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_corporate_actions.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_corporate_actions.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines/eodhd_reconciliation.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines/eodhd_reconciliation.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/build_eodhd_mapping.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/build_eodhd_mapping.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/backfill_eodhd_intraday.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/backfill_eodhd_intraday.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/audit_eodhd_ca.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/audit_eodhd_ca.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/audit_eodhd_intraday.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/audit_eodhd_intraday.py)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/run_pipeline.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/run_pipeline.py)

Supporting docs retained for historical context:

- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/EODHD_AUDIT.md](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/EODHD_AUDIT.md)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/docs/EODHD_INTEGRATION_STATUS.md](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/docs/EODHD_INTEGRATION_STATUS.md)

## What The Pipeline Covers

### 1. Symbol mapping

Script:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/build_eodhd_mapping.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/build_eodhd_mapping.py)

Purpose:
- maps internal `assets.id` to EODHD ticker forms
- supports active and delisted assets
- prefers ISIN matches
- falls back to symbol/name heuristics

Matching order:
1. ISIN
2. NSE symbol / BSE code
3. normalized company name

Important behavior:
- current code treats `NSE` as the only active Indian equity exchange on EODHD
- BSE exchange codes are explicitly treated as unsupported in the symbol-fetch layer
- mapping still stores both `eodhd_nse_symbol` and `eodhd_bse_symbol` columns for compatibility

### 2. EOD daily prices

Ingester:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_eod.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_eod.py)

Client:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/client.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/client.py)

Behavior:
- uses the EODHD bulk EOD endpoint
- archives raw JSON under `raw_data/EODHD/`
- resolves each EODHD code to an internal `asset_id`
- writes supplementary EOD prices without overwriting primary exchange data

Fields captured:
- `open`
- `high`
- `low`
- `close`
- `adjusted_close`
- `volume`
- `eodhd_symbol`
- `exchange`
- `fetched_at`

### 3. Corporate actions

Ingester:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_corporate_actions.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/sources/eodhd/eodhd_corporate_actions.py)

Behavior:
- fetches splits and dividends
- stores them as validation data against our internal corporate-actions pipeline
- handles Indian-market limitations in EODHD’s dividend payloads

Important limitation:
- declaration, record, and payment dates are generally not available for Indian stocks in EODHD the way they are for some US securities

### 4. Price reconciliation

Pipeline:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines/eodhd_reconciliation.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/pipelines/eodhd_reconciliation.py)

Purpose:
- compare internal NSE/BSE prices to EODHD prices
- flag deviations
- support alerts and downstream verification checks

Status categories:
- `MATCH`
- `MINOR_DEVIATION`
- `MAJOR_DEVIATION`
- `MISSING_SOURCE`
- `EODHD_ONLY`

Current thresholds:
- close deviation > `0.5%` => minor
- close deviation > `2.0%` => major
- adjusted close deviation > `2.0%` => flagged
- volume deviation > `50%` => flagged

### 5. Intraday backfill

Script:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/backfill_eodhd_intraday.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/scripts/backfill_eodhd_intraday.py)

Purpose:
- fetch `1h`, `5m`, and optionally `1m` intraday bars
- backfill by mapped symbol
- ingest into `eodhd_intraday_prices`

Important constraints baked into the script:
- EODHD intraday requests use Unix timestamps
- `5m` and `1h` history are expected back to roughly October 2020
- one request span is capped to about 120 days

## Database Tables

### Relational Postgres

Defined in:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/init-postgres.sql](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/init-postgres.sql)
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/schema.sql](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/schema.sql)

Relational EODHD tables:
- `eodhd_symbol_mapping`
- `eodhd_corporate_actions`

### Timescale / time-series Postgres

Defined in:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/init-timescale.sql](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/db/init-timescale.sql)

Time-series EODHD tables:
- `eodhd_daily_prices`
- `eodhd_intraday_prices`
- `price_reconciliation`

## Runtime Flow

Daily runner:
- [/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/run_pipeline.py](/Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline/run_pipeline.py)

Current orchestration:
1. NSE/BSE corporate actions
2. parallel ingestion:
   - NSE
   - BSE
   - AMFI
   - fundamentals
   - IIMA FF
   - Nifty/BSE indices
   - EODHD EOD
   - EODHD corporate actions
   - Morningstar
3. EODHD reconciliation
4. adjusted-close recomputation
5. nightly metrics
6. verification

CLI flags:
- `--skip-eodhd`
- `--skip-eodhd-reconcile`

## Raw Data and Caching

Raw EODHD responses are cached under:
- `raw_data/EODHD/`

The older audit note also references a more structured organization:
- `raw_data/EODHD/eod`
- `raw_data/EODHD/intraday`
- `raw_data/EODHD/dividends`
- `raw_data/EODHD/splits`
- `raw_data/EODHD/master`

This is still the intended cache layout for audit/backfill workflows.

## External API Behavior Encoded In The Client

From the current client implementation:

- bulk EOD: `eod-bulk-last-day/{exchange}`
- bulk splits: same endpoint with `type=splits`
- bulk dividends: same endpoint with `type=dividends`
- per-symbol EOD history: `eod/{SYMBOL}.{EXCHANGE}`
- per-symbol dividends: `div/{SYMBOL}.{EXCHANGE}`
- intraday: `intraday/{SYMBOL}.{EXCHANGE}`
- exchange symbol list: `exchange-symbol-list/{EXCHANGE}`

Client rules currently implemented:
- safe request delay around `0.1s`
- `MAX_RETRIES = 5`
- exponential backoff on request failures
- JSON raw-response caching

## Operational Commands

Build or refresh symbol mappings:

```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline
python3 scripts/build_eodhd_mapping.py
python3 scripts/build_eodhd_mapping.py --refresh
```

Run the main pipeline with EODHD enabled:

```bash
cd /Users/a404a/AllForOne/Skunk/projectmotilala/data-pipeline
python3 run_pipeline.py
```

Skip EODHD during a daily run:

```bash
python3 run_pipeline.py --skip-eodhd
python3 run_pipeline.py --skip-eodhd --skip-eodhd-reconcile
```

Run reconciliation only:

```bash
python3 -m pipelines.eodhd_reconciliation
```

Backfill intraday:

```bash
python3 scripts/backfill_eodhd_intraday.py --interval 1h --from 2020-10-01 --to 2024-03-01
```

## Known Gaps and Caveats

### 1. Documentation drift existed

The status doc referenced:
- `docs/sources/eodhd.md`

That file did not exist before this consolidation. This file is now the intended primary reference.

### 2. Exchange assumptions are opinionated

Current mapping/client code says:
- NSE is the valid Indian equity exchange in EODHD
- BSE is not fetchable as a primary exchange symbol list

That assumption may be right for the current implementation, but any production rollout should periodically verify it against the live EODHD account and API behavior.

### 3. Some implementation details still reflect SQLite-era code

There are still legacy `INSERT OR REPLACE` patterns in EODHD-related scripts and sources. Runtime compatibility shims currently make some of these work, but the code should eventually be normalized to explicit Postgres upserts.

### 4. Status doc contains stale items

The older status note still says the pipeline was blocked on an invalid token. That is historical context, not a trustworthy live operational statement.

### 5. DB split matters

The integration spans both relational and time-series Postgres:
- relational for symbol mapping / CA metadata
- time-series for EOD and intraday bars and reconciliation

Anyone modifying this pipeline needs to check which database a table actually lives in before changing ingestion or validation code.

## Recommended Next Cleanup

High-value follow-up work:
- standardize all EODHD writes to explicit Postgres `ON CONFLICT`
- verify that every EODHD writer is using the intended database target
- add one lightweight health-check doc section with:
  - mapping row count
  - latest EOD date
  - reconciliation status mix
  - raw-cache freshness
- retire or merge the historical audit/status docs once this consolidated doc is accepted
