# MarketSmithIndia Data Extraction & Integration Plan

This plan details the process for scraping, modeling, storing, and surfacing data from MarketSmithIndia for our custom company pages.

## 1. Extractable Data & Reverse Engineered Endpoints

From a live network inspection of the target page (`https://marketsmithindia.com/mstool/eval/reliance/evaluation.jsp#/`), we found that MSI is a Single Page Application (SPA). Instead of scraping HTML elements, we can hit their internal API endpoints directly. The authorization is usually handled via an `ms-auth` token parameter or cookie, but many data points are accessible via simple GET requests.

### Identified Key API Endpoints
All endpoints are prefixed with `https://marketsmithindia.com/gateway/simple-api/ms-india/`. 

*   **`instr/srch.json?text={SYMBOL}&lang=en&ver=2`**
    *   **Purpose:** Search and get the internal MSI `instrumentId` mapping (e.g., RELIANCE -> `3023127`).
*   **`instr/0/{instrumentId}/symboldetails.json`**
    *   **Purpose:** Company fundamentals, descriptive data, overview, quarterly/annual blocks.
*   **`instr/0/{instrumentId}/financeDetails.json`**
    *   **Purpose:** Financial tables, balance sheets, cash flows, detailed ratios.
*   **`instr/0/{instrumentId}/eHeaderDetails.json`**
    *   **Purpose:** EPS rating, Price Strength (RS) rating, Buyer Demand, Group Rank, Master Score, and current price variables.
*   **`instr/3023127/getRedFlags.json`**
    *   **Purpose:** AI-driven or rules-based technical/fundamental red flags.
*   **`instr/0/{instrumentId}/wisdom.json`**
    *   **Purpose:** CANSILM evaluations, fundamental/technical analysis summary.
*   **`instr/0/{instrumentId}/related2.json`**
    *   **Purpose:** Competitors and Peers.
*   **`aireport/getAiReport.json?osid={instrumentId}`**
    *   **Purpose:** Auto-generated AI report summary of the stock.
*   **`{instrumentId}/getBulkBlockDeals.json`**
    *   **Purpose:** Recent large institutional buying/selling.
*   **`instr/0/{instrumentId}/details.json`**
    *   **Purpose:** Full historical chart data (OHLC) over time to render technical charts.
*   **`pr/{SYMBOL}/patterns.json`**
    *   **Purpose:** Automatically identified chart patterns (Cup with Handle, Flat Base, breakouts, pivot points).

## 2. Target Data Schema (PostgreSQL/SQLite)

We will create a new table `msi_company_data` or integrate into our existing repositories.

| Field Name | Type | Source Endpoint | Description |
| :--- | :--- | :--- | :--- |
| `asset_id` | String | (Internal ID) | FK to our internal `assets` table. |
| `msi_instrument_id` | Integer | `srch.json` | MSI's internal ID for API requests. |
| `master_score` | Integer | `eHeaderDetails.json` | 1-99 overall MSI rating. |
| `eps_rating` | Integer | `eHeaderDetails.json` | 1-99 earnings per share rating. |
| `rs_rating` | Integer | `eHeaderDetails.json` | 1-99 relative price strength rating. |
| `buyer_demand` | String | `eHeaderDetails.json` | A-E accumulation/distribution rating. |
| `group_rank` | Integer | `eHeaderDetails.json` | Industry group rank (1-197). |
| `canslim_checklist` | JSONB | `wisdom.json` | Object of passing/failing CANSLIM criteria. |
| `red_flags` | JSONB | `getRedFlags.json` | Array of identified warning signs. |
| `chart_patterns` | JSONB | `patterns.json` | Currently forming bases, pivots, buy ranges. |
| `ai_report_summary` | String | `getAiReport.json` | Text-based AI summary. |
| `updated_at` | Timestamp | | Last successful scrape time. |

*(Note: We can omit scraping raw financials if our existing pipeline already covers them via Screener, focusing instead on MSI's proprietary ratings/scores).*

## 3. Scraping Methodology

Since we found the underlying JSON APIs, we **do not need a headless browser** (Puppeteer/Selenium) for daily data extraction. We can use a lightweight Node.js/Python script to directly query the APIs.

**Methodology:**
1.  **Direct API Requests:** Use `fetch` or `axios`.
2.  **Session & Auth Handling:** 
    *   Some APIs might require a valid `ms-auth` token. 
    *   *Solution:* We can use Puppeteer **only once a week** to log in or grab an anonymous guest session cookie/token, save it to Redis/DB, and use it for lightweight REST requests.
3.  **Rate Limiting:** Add a delay (e.g., 200ms-500ms) between API calls. Use a rotating proxy if MSI blocks the server IP.
4.  **Batching:** Process symbols in chunks of 50.

## 4. Intermediate Storage & ETL Architecture

**Pipeline Design:**
1.  **Extract:** Python/Node script iterates through our DB's `NSE/BSE` symbols, fetches the `instrumentId`, then fetches the 4-5 key JSON files from MSI.
2.  **Transform:** Normalize the messy JSON arrays into a flat, predictable structure.
3.  **Load:** Upsert into `msi_company_data` table.

**Incremental Update Strategy:**
*   **Daily after market close:** Run pipeline for all active stocks to update price-dependent metrics (RS Rating, Patterns).
*   **Weekly:** Update fundamentals, AI reports, and CANSLIM metrics.

## 5. Error Handling, Quality & Validation

1.  **Missing Fields:** Default to `null`. If a core metric (like `master_score`) is missing, log a warning but proceed.
2.  **Type Checks:** Ensure ratings are between `1-99` and `A-E`. 
3.  **Scrape Failures:** 
    *   If HTTP 403/401 occurs, trigger the Puppeteer script to refresh the `ms-auth` token.
    *   If HTTP 429 (Too Many Requests), exponential backoff and sleep for 60 seconds.
4.  **Logging:** Track `success_count`, `failure_count`, and `failed_symbols` in a `pipeline_runs` log table.

## 6. Sample Python Snippet (API Wrapper)

```python
import requests
import time

class MSIClient:
    def __init__(self, auth_token):
        self.base_url = "https://marketsmithindia.com/gateway/simple-api/ms-india"
        self.auth_token = auth_token

    def get_headers(self):
        return {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

    def get_instrument_id(self, symbol):
        url = f"{self.base_url}/instr/srch.json?text={symbol}&lang=en&ver=2&ms-auth={self.auth_token}"
        res = requests.get(url, headers=self.headers).json()
        return res['response']['results'][0]['instrumentId']

    def get_ratings(self, instrument_id):
        url = f"{self.base_url}/instr/0/{instrument_id}/eHeaderDetails.json?p=1&ms-auth={self.auth_token}"
        return requests.get(url, headers=self.headers).json()
        
    def fetch_all(self, symbol):
        inst_id = self.get_instrument_id(symbol)
        ratings = self.get_ratings(inst_id)
        time.sleep(0.5) # rate limit respect
        return {"symbol": symbol, "instrument_id": inst_id, "ratings": ratings}
```
