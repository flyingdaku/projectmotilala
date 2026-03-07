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


def create_cogencis_session(prime: bool = False) -> requests.Session:
    session = requests.Session()
    session.headers.update({
        **_DEFAULT_HEADERS,
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
    if prime:
        prime_url = os.getenv("COGENCIS_PRIME_URL", "https://iinvest.cogencis.com/")
        try:
            session.get(prime_url, timeout=15)
        except Exception as exc:
            logger.warning("Cogencis session prime failed: %s", exc)
    return session
