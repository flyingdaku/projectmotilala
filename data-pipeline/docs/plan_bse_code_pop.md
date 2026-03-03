# Plan: BSE Code Population

## Objective
A significant number of assets in the `assets` table are currently missing their `bse_code`, despite being listed on BSE. This prevents the reconciliation pipeline from correctly fetching and comparing corporate actions for these assets.

## Implementation Steps

### 1. Extract Mappings from Raw Files
The `raw_data/BSE_BHAVCOPY/` directory contains thousands of historical ZIP files. Each ZIP contains a CSV with an `ISIN` and a `SC_CODE` (BSE numeric code).

### 2. Update Asset Master
Create a script `scripts/sync_bse_codes_from_raw.py` that:
- Recursively scans the raw data directory.
- Parses each CSV to extract `(ISIN, SC_CODE)`.
- Updates the `assets` table where `bse_code` is NULL but a mapping exists.
- This is idempotent and can be re-run whenever new raw data is available.

### 3. Integrated Daily Sync
The `nse_bhavcopy.py` and `bse_bhavcopy.py` pipelines already upsert mappings. However, historical backfills may skip this if the asset was already present in the database.

### 4. Verification Check
A new check in `verification.py` will log assets listed on BSE (per AMFI or master lists) that still lack a `bse_code`.

## Monitoring
Check the `pipeline_runs` for the `SYNC_BSE_CODES` source to see how many mappings were updated.
