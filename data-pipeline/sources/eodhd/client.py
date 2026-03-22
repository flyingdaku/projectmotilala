#!/usr/bin/env python3
"""
EODHD API Client — shared low-level HTTP layer.

All EODHD API calls go through this module. No other file should
import `requests` to call EODHD directly.

Key design facts (from official docs):
  - Bulk EOD:  GET /api/eod-bulk-last-day/{EXCHANGE}?date=YYYY-MM-DD&fmt=json
               Costs 100 API calls per exchange.  Returns entire exchange in 1 HTTP req.
               Also works with type=splits and type=dividends for bulk CA.
               NOTE: `symbols` param does NOT work for splits/dividends bulk.

  - Per-symbol EOD: GET /api/eod/{SYMBOL}.{EXCHANGE}?from=...&to=...&fmt=json
               Returns list of OHLCV rows.
               OHLC = raw (unadjusted).  adjusted_close = adj for splits+dividends.
               volume = split-adjusted only.

  - Symbol list: GET /api/exchange-symbol-list/{EXCHANGE}?fmt=json
               Default: active-in-last-month tickers only.
               Add &delisted=1 to also get delisted tickers.

  - Dividends:  GET /api/div/{SYMBOL}.{EXCHANGE}?from=...&fmt=json
               Indian/non-US stocks: only ex_date + value (no decl/record/payment dates).
               Extended format (decl+record+payment) is US-only.

  - Splits:    GET /api/splits/{SYMBOL}.{EXCHANGE}?from=...&fmt=json
               Returns date + split ratio (e.g. "2:1").

  - Intraday:  GET /api/intraday/{SYMBOL}.{EXCHANGE}?interval=5m&from=<unix>&to=<unix>&fmt=json
               from/to MUST be Unix timestamps, NOT YYYY-MM-DD.
               Non-US exchanges: 5m and 1h from Oct 2020 only.
               1m data NOT guaranteed for NSE/BSE.

  - Rate limit: 20 req/sec on standard plans. We enforce REQUEST_DELAY=0.05s.
"""

from __future__ import annotations

import json
import logging
import time
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional

import requests

from utils.storage import raw_file_exists, save_raw_file, load_raw_file

logger = logging.getLogger(__name__)

# ── Configuration ─────────────────────────────────────────────
EODHD_API_TOKEN = "69b25293b6a024.07920337"
EODHD_BASE_URL  = "https://eodhd.com/api"

# Rate limiting — stay well under 20 req/sec hard limit
REQUEST_DELAY = 0.1    # ~10 req/sec (safe margin for parallel workers)
MAX_RETRIES   = 5
BASE_BACKOFF  = 2      # seconds; doubled each retry

# Exchanges we care about for Indian markets.
# IMPORTANT: EODHD only exposes ONE Indian equity exchange: NSE.
# BSE is NOT a valid exchange code on EODHD (returns 404).
# All Indian equities (NSE-listed AND BSE-only that EODHD has) appear under NSE.
# MCX is valid for Indian commodity futures.
INDIAN_EXCHANGES = ["NSE"]          # Equity + MF + ETF
INDIAN_EXCHANGES_ALL = ["NSE"]  # Including commodities
RAW_DATA_DIR = Path(__file__).resolve().parents[2] / "raw_data" / "EODHD"


class EODHDClient:
    """
    Thin, stateless HTTP client for all EODHD API endpoints.

    Handles: rate limiting, retries with exponential backoff,
    raw-response caching to raw_data/EODHD/, transparent JSON parsing.
    """

    def __init__(self, api_token: str = EODHD_API_TOKEN):
        self.api_token = api_token
        self.session   = self._make_session()

    # ── Session ────────────────────────────────────────────────

    def _make_session(self) -> requests.Session:
        s = requests.Session()
        s.headers.update({
            "User-Agent": "Artha-DataPipeline/1.0",
            "Accept": "application/json",
        })
        return s

    def _load_latest_cached_json(self, prefix: str) -> Optional[List[Dict]]:
        """Fallback to the latest matching cached JSON file when today's cache is absent."""
        candidates = sorted(RAW_DATA_DIR.rglob(f"{prefix}*.json"))
        if not candidates:
            return None

        latest = candidates[-1]
        try:
            return json.loads(latest.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            logger.warning("Could not read cached EODHD file %s: %s", latest, exc)
            return None

    # ── Core HTTP primitive ────────────────────────────────────

    def _get(
        self,
        path: str,
        params: Dict[str, Any],
        *,
        cache_key: Optional[str] = None,
        cache_date: Optional[date] = None,
    ) -> Any:
        """
        GET {EODHD_BASE_URL}/{path} with retry + optional raw-data caching.

        cache_key / cache_date: if both supplied, check raw_data/EODHD/ first
        and write response there on success.
        """
        # ── Cache read ─────────────────────────────────────────
        if cache_key and cache_date:
            if raw_file_exists("EODHD", cache_date, cache_key):
                raw = load_raw_file("EODHD", cache_date, cache_key)
                try:
                    if isinstance(raw, (bytes, bytearray)):
                        raw = raw.decode("utf-8")
                    return json.loads(raw)
                except (json.JSONDecodeError, UnicodeDecodeError):
                    pass  # fall through to live fetch

        # ── Live fetch ─────────────────────────────────────────
        params["api_token"] = self.api_token
        params["fmt"] = "json"
        url = f"{EODHD_BASE_URL}/{path}"

        for attempt in range(1, MAX_RETRIES + 1):
            time.sleep(REQUEST_DELAY)
            try:
                resp = self.session.get(url, params=params, timeout=60)

                if resp.status_code == 429:
                    wait = BASE_BACKOFF * (2 ** (attempt - 1))
                    logger.warning(f"EODHD 429 rate-limit on {path}, backing off {wait}s")
                    time.sleep(wait)
                    continue

                if resp.status_code == 404:
                    logger.debug(f"EODHD 404 for {path}")
                    return []

                resp.raise_for_status()
                data = resp.json()

                # ── Cache write ────────────────────────────────
                if cache_key and cache_date:
                    save_raw_file("EODHD", cache_date, cache_key,
                                  json.dumps(data, indent=2).encode("utf-8"))

                return data

            except requests.RequestException as exc:
                if attempt < MAX_RETRIES:
                    wait = BASE_BACKOFF * attempt
                    logger.warning(f"EODHD request error ({attempt}/{MAX_RETRIES}): {exc} — retry in {wait}s")
                    time.sleep(wait)
                else:
                    logger.error(f"EODHD request failed after {MAX_RETRIES} attempts: {exc}")
                    return []

        return []

    # ── Public API methods ──────────────────────────────────────

    def get_bulk_eod(self, exchange: str, trade_date: date) -> List[Dict]:
        """
        Bulk EOD prices for an entire exchange on a specific date.

        URL: /api/eod-bulk-last-day/{exchange}?date=YYYY-MM-DD
        Cost: 100 API calls per request.
        Returns: list of {code, name, date, open, high, low, close,
                           adjusted_close, volume, ...}
        """
        cache_key = f"bulk_eod_{exchange}_{trade_date.isoformat()}.json"
        result = self._get(
            f"eod-bulk-last-day/{exchange}",
            {"date": trade_date.isoformat()},
            cache_key=cache_key,
            cache_date=trade_date,
        )
        return result if isinstance(result, list) else []

    def get_bulk_splits(self, exchange: str, trade_date: date) -> List[Dict]:
        """
        Bulk splits for an entire exchange on a specific date.

        URL: /api/eod-bulk-last-day/{exchange}?type=splits&date=YYYY-MM-DD
        NOTE: `symbols` param is NOT supported for splits bulk calls.
        Returns: list of {code, split_date, ratio}
        """
        cache_key = f"bulk_splits_{exchange}_{trade_date.isoformat()}.json"
        result = self._get(
            f"eod-bulk-last-day/{exchange}",
            {"type": "splits", "date": trade_date.isoformat()},
            cache_key=cache_key,
            cache_date=trade_date,
        )
        return result if isinstance(result, list) else []

    def get_bulk_dividends(self, exchange: str, trade_date: date) -> List[Dict]:
        """
        Bulk dividends for an entire exchange on a specific date.

        URL: /api/eod-bulk-last-day/{exchange}?type=dividends&date=YYYY-MM-DD
        NOTE: `symbols` param is NOT supported for dividends bulk calls.
        Indian stocks: only ex_date + value returned (no decl/record/payment dates).
        Returns: list of {code, ex_dividend_date, value, unadjusted_value, currency}
        """
        cache_key = f"bulk_divs_{exchange}_{trade_date.isoformat()}.json"
        result = self._get(
            f"eod-bulk-last-day/{exchange}",
            {"type": "dividends", "date": trade_date.isoformat()},
            cache_key=cache_key,
            cache_date=trade_date,
        )
        return result if isinstance(result, list) else []

    def get_eod_history(
        self,
        symbol: str,
        exchange: str,
        from_date: date,
        to_date: date,
    ) -> List[Dict]:
        """
        Per-symbol EOD history for a date range (used for backfill).

        URL: /api/eod/{symbol}.{exchange}?from=...&to=...
        Returns: list of {date, open, high, low, close, adjusted_close, volume}
        """
        ticker    = f"{symbol}.{exchange}"
        cache_key = f"eod_{symbol}_{exchange}_{from_date.isoformat()}_{to_date.isoformat()}.json"
        # Use from_date as the cache bucket date
        result = self._get(
            f"eod/{ticker}",
            {"from": from_date.isoformat(), "to": to_date.isoformat(), "period": "d"},
            cache_key=cache_key,
            cache_date=from_date,
        )
        return result if isinstance(result, list) else []

    def get_dividends_history(
        self,
        symbol: str,
        exchange: str,
        from_date: date,
    ) -> List[Dict]:
        """
        Per-symbol full dividend history.

        URL: /api/div/{symbol}.{exchange}?from=...
        Indian stocks: {date, value} only — no declaration/record/payment dates.
        """
        ticker    = f"{symbol}.{exchange}"
        cache_key = f"div_{symbol}_{exchange}_{from_date.isoformat()}.json"
        result = self._get(
            f"div/{ticker}",
            {"from": from_date.isoformat()},
            cache_key=cache_key,
            cache_date=from_date,
        )
        return result if isinstance(result, list) else []

    def get_splits_history(
        self,
        symbol: str,
        exchange: str,
        from_date: date,
    ) -> List[Dict]:
        """
        Per-symbol full splits history.

        URL: /api/splits/{symbol}.{exchange}?from=...
        Returns: list of {date, split} where split is e.g. "2.0000" (2:1 split).
        """
        ticker    = f"{symbol}.{exchange}"
        cache_key = f"splits_{symbol}_{exchange}_{from_date.isoformat()}.json"
        result = self._get(
            f"splits/{ticker}",
            {"from": from_date.isoformat()},
            cache_key=cache_key,
            cache_date=from_date,
        )
        return result if isinstance(result, list) else []

    def get_exchange_symbols(
        self,
        exchange: str,
        *,
        include_delisted: bool = False,
    ) -> List[Dict]:
        """
        Full ticker list for an exchange.

        URL: /api/exchange-symbol-list/{exchange}
        Default: active-in-last-month only.
        include_delisted=True adds delisted tickers (for survivorship-bias-free data).

        Returns: list of {Code, Name, Country, Exchange, Currency, Type, Isin}
        """
        delisted_flag = "1" if include_delisted else "0"
        suffix    = "_delisted" if include_delisted else "_active"
        today     = date.today()
        cache_key = f"symlist_{exchange}{suffix}_{today.isoformat()}.json"
        cached = self._load_latest_cached_json(f"symlist_{exchange}{suffix}_")
        if isinstance(cached, list):
            logger.info("Using latest cached EODHD symbol list for %s%s", exchange, suffix)
            return cached
        params: Dict[str, Any] = {}
        if include_delisted:
            params["delisted"] = 1
        result = self._get(
            f"exchange-symbol-list/{exchange}",
            params,
            cache_key=cache_key,
            cache_date=today,
        )
        return result if isinstance(result, list) else []

    def get_intraday(
        self,
        symbol: str,
        exchange: str,
        from_dt: datetime,
        to_dt: datetime,
        interval: str = "5m",
    ) -> List[Dict]:
        """
        Intraday OHLCV data.

        IMPORTANT:
        - from/to MUST be Unix timestamps (UTC), NOT YYYY-MM-DD strings.
        - Non-US exchanges (NSE/BSE): only 5m and 1h available, from Oct 2020 onwards.
        - 1m data is NOT guaranteed for NSE/BSE.
        - All timestamps in response are UTC Unix format.

        interval: "1m" | "5m" | "1h"
        """
        ticker   = f"{symbol}.{exchange}"
        from_ts  = int(from_dt.replace(tzinfo=timezone.utc).timestamp())
        to_ts    = int(to_dt.replace(tzinfo=timezone.utc).timestamp())
        cache_date = from_dt.date()
        cache_key  = f"intraday_{symbol}_{exchange}_{interval}_{from_ts}_{to_ts}.json"
        result = self._get(
            f"intraday/{ticker}",
            {"interval": interval, "from": from_ts, "to": to_ts},
            cache_key=cache_key,
            cache_date=cache_date,
        )
        return result if isinstance(result, list) else []
