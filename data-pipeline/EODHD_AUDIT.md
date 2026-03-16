# EODHD Data Audit and Backfill Plan

This document outlines the steps to audit and complete the EODHD data (EOD, Intraday, Corporate Actions) sequentially, as the current raw data is incomplete.

## Phase 1: Environment Setup
1. [x] Removed `MCX` from target exchanges since it refers to the Russian exchange (MOEX), not the Indian Commodity Exchange.
2. [x] Cleaned up existing `MCX` files.
3. [x] Reorganized EODHD raw data cache structure into specific subfolders (`eod`, `intraday`, `dividends`, `splits`, `master`).

## Phase 2: Auditing EOD Data
EODHD EOD prices are used as a secondary source. The goal is to fetch back to the oldest available data for all active NSE/BSE symbols.

**Steps:**
1. Retrieve the master list of all active tickers from our database.
2. Determine the earliest available date for each ticker in EODHD (can be done using bulk API checks or by trying to backfill from a far past date like 2000-01-01).
3. Write an audit script `audit_eodhd_eod.py` that checks the `eodhd_daily_prices` table vs expected dates.
4. Run backfill sequentially, ticker by ticker or day by day (using bulk API). The Bulk API is more efficient (1 request per day for the whole exchange instead of 1 request per ticker).

## Phase 3: Auditing Intraday Data
EODHD provides Intraday data (1h and 5m intervals) for NSE starting from ~October 2020. We need to ensure we have the complete 1h and 5m dataset.

**Steps:**
1. Determine the exact start date EODHD has intraday data for NSE (approx Oct 2020).
2. Write an audit script `audit_eodhd_intraday.py` that checks our database (`eodhd_intraday_1h` / `eodhd_intraday_5m` if they exist) or the raw files to find missing dates.
3. Create a sequential backfill script that processes one ticker at a time from Oct 2020 to present, respecting rate limits.

## Phase 4: Auditing Corporate Actions (Splits & Dividends)
1. Write a script `audit_eodhd_ca.py` to identify missing dates in corporate actions.
2. We can use the bulk API to fetch CA data per day, or the per-symbol API for all historical CAs. Given the limits, fetching full history per symbol might be faster than bulk querying 9000 days.

## Execution
Run the audit scripts sequentially. Do not run in parallel to avoid hitting the 20 req/sec rate limit of EODHD.
