# Golden Dataset Guide

## Purpose
This document defines which data source to use as the "source of truth" for each field. When multiple sources provide the same data, the golden source is preferred. Fallbacks are used when the golden source has no coverage for a specific stock.

---

## Technicals (Price Data)

| Field | Golden Source | Fallback | Rationale |
|---|---|---|---|
| **Daily OHLCV (dual-listed)** | NSE Bhavcopy | BSE Bhavcopy | NSE has higher liquidity, better price discovery |
| **Daily OHLCV (BSE-only)** | BSE Bhavcopy | — | Only source for BSE-exclusive stocks |
| **Daily NAV (MF/ETF)** | AMFI | — | Official NAV publisher |
| **Daily Index Close (TRI)** | NiftyIndices.com (TR) | NiftyIndices.com (HR) | Total Return Index includes dividend reinvestment for accurate backtesting |
| **Daily Index Close (PRI)** | NiftyIndices.com (HR) | — | Price Return Index used only when TRI unavailable |
| **Adjusted Close** | Computed | — | Derived from raw close + corporate actions |
| **Corporate Actions** | NSE | BSE | NSE API is more reliable and complete |

## Fundamentals (Financial Data)

| Field | Golden Source | Fallback | Rationale |
|---|---|---|---|
| **Revenue / PAT / EPS** | MSI | Screener | MSI data is institution-verified, more granular |
| **Balance Sheet** | MSI | Screener | MSI has more fields (trade receivables, CWIP breakdown) |
| **Cash Flow** | MSI | Screener | MSI separates capex from investing CF |
| **Shareholding** | MSI | Screener | MSI includes pledged% and more granular FII/DII split |
| **Quarterly Results (expanded universe)** | Screener | — | Screener covers ~16K stocks vs MSI's ~2.9K |

## Ratings & Proprietary Metrics

| Field | Source | Fallback | Notes |
|---|---|---|---|
| **RS Rating** | MSI | — | O'Neil proprietary |
| **EPS Rating** | MSI | — | O'Neil proprietary |
| **Master Score** | MSI | — | Composite CANSLIM score |
| **Group Rank** | MSI | — | Industry group relative strength |
| **A/D Rating** | MSI | — | Accumulation/Distribution |

## Classification & Metadata

| Field | Golden Source | Fallback | Rationale |
|---|---|---|---|
| **Sector / Industry (4-level)** | Screener | MSI | Screener has standardised market codes (INxx), better for peer matching |
| **MSI Sector / Industry** | MSI | — | Supplementary classification with group ranks |
| **Company Description** | Screener Cache | — | Extracted from "About" section |
| **Face Value / Website** | Screener Cache | — | From company profile metadata |
| **ISIN** | NSE Security Master | BSE Bhavcopy | NSE master is most reliable |

## Reference Data

| Field | Golden Source | Notes |
|---|---|---|
| **Trading Holidays** | NSE Calendar API | Only NSE calendar tracked; BSE mirrors ~98% |
| **Risk-Free Rate** | RBI T-Bill Yields | 91-day T-bill auction cutoff |
| **Fama-French Factors** | Computed | From `ff_*` pipeline using daily prices + market cap |

---

## Merge Strategy

When populating the golden `fundamentals` table:

1. **Primary pass**: Ingest MSI quarterly data for all covered stocks (~2,915)
2. **Gap-fill pass**: For stocks NOT in MSI, ingest Screener quarterly data
3. **Conflict detection**: For stocks with BOTH sources, compare Revenue/PAT. If deviation > 5%, log to `fundamental_conflicts` table
4. **Resolution**: MSI always wins in conflicts (verified institutional data)

> [!IMPORTANT]
> The golden `fundamentals` table is currently empty (0 rows). Phase 2 of
> the refactor will populate it using the merge strategy above.
