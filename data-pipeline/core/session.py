"""
HTTP session factory for exchange APIs.

Centralises User-Agent strings, cookie priming, and retry logic so that
individual source ingesters don't duplicate header boilerplate.
"""
from __future__ import annotations

import logging
import os
import time
import requests
from typing import Optional
from requests.adapters import HTTPAdapter

try:
    from urllib3.util.retry import Retry
except ImportError:  # pragma: no cover
    Retry = None

logger = logging.getLogger(__name__)


# ── Header Presets ────────────────────────────────────────────────────────────

CHROME_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)

_DEFAULT_HEADERS = {
    "User-Agent": CHROME_UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
}


# ── Session Builders ──────────────────────────────────────────────────────────

def create_nse_session(max_retries: int = 3, retry_delay: float = 5.0) -> requests.Session:
    """
    Return a cookie-primed NSE session.

    NSE requires an initial GET to https://www.nseindia.com to set cookies
    before any API call will succeed.
    """
    session = requests.Session()
    session.headers.update({
        **_DEFAULT_HEADERS,
        "Referer": "https://www.nseindia.com",
    })

    for attempt in range(1, max_retries + 1):
        try:
            session.get("https://www.nseindia.com", timeout=15)
            logger.debug("NSE session primed (attempt %d)", attempt)
            return session
        except Exception as e:
            logger.warning("NSE session prime attempt %d failed: %s", attempt, e)
            if attempt < max_retries:
                time.sleep(retry_delay)

    logger.error("Could not prime NSE session after %d attempts — returning unprimed", max_retries)
    return session


def create_bse_session() -> requests.Session:
    """
    Return a BSE API session.

    BSE's public API requires Origin and Referer headers but no cookie priming.
    """
    session = requests.Session()
    session.headers.update({
        "User-Agent": CHROME_UA,
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://www.bseindia.com/",
        "Origin": "https://www.bseindia.com",
    })
    return session


def create_screener_session() -> requests.Session:
    """
    Return a Screener.in session.

    Screener serves HTML pages; no special priming needed.
    """
    session = requests.Session()
    session.headers.update({
        **_DEFAULT_HEADERS,
        "Referer": "https://www.screener.in/",
    })
    return session


def create_amfi_session() -> requests.Session:
    """
    Return an AMFI NAV session.

    AMFI's endpoint is a plain-text file; minimal headers needed.
    """
    session = requests.Session()
    session.headers.update({
        "User-Agent": CHROME_UA,
        "Accept": "text/plain, */*",
    })
    return session


def create_morningstar_session() -> requests.Session:
    """
    Return a Morningstar India session.

    Public Morningstar fund pages behave like normal HTML pages. We keep a
    browser-like session and set a Morningstar referer so the scraper can fall
    back to public page crawling without needing login in v1.
    """
    session = requests.Session()
    session.headers.update({
        **_DEFAULT_HEADERS,
        "Referer": "https://www.morningstar.in/",
    })
    if Retry is not None:
        retry = Retry(
            total=3,
            connect=3,
            read=3,
            backoff_factor=1.0,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=frozenset({"GET", "HEAD"}),
            raise_on_status=False,
        )
        adapter = HTTPAdapter(max_retries=retry)
        session.mount("https://", adapter)
        session.mount("http://", adapter)
    return session


def create_cogencis_session(prime: bool = False) -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
        "Connection": "keep-alive",
        "DNT": "1",
        "Referer": os.getenv("COGENCIS_REFERER", "https://iinvest.cogencis.com/"),
    })
    cookie_header = os.getenv("COGENCIS_COOKIE", "").strip()
    if cookie_header:
        session.headers["Cookie"] = cookie_header
    bearer_token = os.getenv("COGENCIS_BEARER_TOKEN", "").strip()
    if not bearer_token and cookie_header:
        for cookie_part in cookie_header.split(";"):
            name, _, value = cookie_part.strip().partition("=")
            if name == "next-auth.token" and value:
                bearer_token = value.strip()
                break
    if bearer_token:
        session.headers["Authorization"] = f"Bearer {bearer_token}"
    session.headers.setdefault("Origin", "https://iinvest.cogencis.com")
    session.headers.setdefault("Sec-Fetch-Dest", "empty")
    session.headers.setdefault("Sec-Fetch-Mode", "cors")
    session.headers.setdefault("Sec-Fetch-Site", "same-site")
    if prime:
        prime_url = os.getenv("COGENCIS_PRIME_URL", "https://iinvest.cogencis.com/")
        try:
            session.get(prime_url, timeout=15)
            # Auto-extract bearer token from session cookies if not already set
            if not bearer_token:
                for cookie in session.cookies:
                    if cookie.name in ("next-auth.token", "__Secure-next-auth.session-token"):
                        bearer_token = cookie.value
                        session.headers["Authorization"] = f"Bearer {bearer_token}"
                        logger.debug("Cogencis: auto-extracted bearer token from cookie %s", cookie.name)
                        break
        except Exception as exc:
            logger.warning("Cogencis session prime failed: %s", exc)
    if not bearer_token:
        logger.warning(
            "[COGENCIS] No bearer token found. Set COGENCIS_BEARER_TOKEN env var or use "
            "--bearer-token flag. API calls to data.cogencis.com will fail."
        )
    return session
