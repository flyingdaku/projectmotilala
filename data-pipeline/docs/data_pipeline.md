# Artha Data Pipeline Architecture

## High-Level Workflow
The Artha pipeline is designed to be a resilient, idempotent system that synchronizes market data from multiple Indian exchanges and financial portals.

### 1. Daily Nightly Pipeline (`run_pipeline.py`)
Executes the following critical sequence:
1.  **Holiday Cache Refresh**: Synchronizes the NSE holiday calendar.
2.  **NSE Corporate Actions**: Fetches today's ex-date events and applies restatements.
3.  **BSE Corporate Actions**: Dual-exchange validation to catch missing events.
4.  **NSE/BSE Reconciliation**: Logs any factor or amount mismatches.
5.  **Parallel Data Ingestion**:
    -   **NSE Bhavcopy**: Primary price source.
    -   **BSE Bhavcopy**: Cross-validation + BSE-only assets.
    -   **AMFI NAV**: Daily mutual fund NAVs.
    -   **Fundamentals**: Parallel fetching from NSE, BSE, and Screener.in.
6.  **Adjusted Close Recomputation**: Retroactively restates historical prices after corporate actions.
7.  **Compute Metric Pipeline**: Pre-calculates returns, volatilities, and valuation ratios.
8.  **Verification Engine**: Runs 5 data quality check categories.
9.  **Status Alert**: Sends results to the configured Telegram chat.

### 2. Historical Backfill Engine (`backfill.py`)
Handles multi-year historical data catch-up using chunked API requests and polite session delays. It maintains its own resume state using the `pipeline_runs` table.

### 3. Nifty Indices Backfill (`backfill_indices.py`)
A parallelized script that fetches historical data for all Nifty indices from niftyindices.com. It prioritizes Total Return Index (TRI) data over Price Return (PRI), handles dual response schemas, and uses smart iteration to skip non-existent early-year data efficiently.

### 4. MarketSmith India (MSI) Scraper (`scrape_msi.py`)
A specialized high-throughput scraper that uses a pool of worker threads to extract proprietary institutional metrics, hierarchical industry classifications, and shareholding data.

## Key Design Principles

### Idempotency
All components use `INSERT OR REPLACE` or custom upsert logic, allowing any step to be re-run indefinitely without duplicating data.

### Retroactive restatement
When a corporate action (split/bonus/dividend) is discovered, the pipeline restates *all* historical prices for that asset, ensuring that backtests always operate on split-adjusted data.

### Conflict Resolution for Fundamentals
Source-specific tables (`nse_fundamentals`, `bse_fundamentals`, `screener_quarterly`) are merged into a `fundamentals` unified view. Discrepancies exceeding 2% are logged in the `fundamental_conflicts` table for manual audit.

### Data Archival
Raw response data (JSON/ZIP/CSV) is archived indefinitely in `raw_data/` for auditability and the ability to re-parse data if schemas change in the future.
