"""
NSE Trading Calendar utility.
Fetches holidays dynamically from NSE API and caches in SQLite.
On failure: checks if the date is a known holiday, else retries 5 times.
"""
import logging
import time
from datetime import date, timedelta
from typing import Optional, Set

import requests

logger = logging.getLogger(__name__)

NSE_HOLIDAY_URL = "https://www.nseindia.com/api/holiday-master?type=trading"
NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.nseindia.com/",
}

MAX_RETRIES = 5
RETRY_DELAY_SECONDS = 10


def fetch_nse_holidays_from_api() -> list[dict]:
    """
    Fetch NSE trading holidays from the NSE API.
    Retries up to MAX_RETRIES times on failure.
    Returns list of {date: str, description: str} dicts.
    """
    session = requests.Session()

    # Prime the session with a browser-like request to get cookies
    try:
        session.get("https://www.nseindia.com", headers=NSE_HEADERS, timeout=15)
    except Exception:
        pass  # Best-effort cookie priming

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(NSE_HOLIDAY_URL, headers=NSE_HEADERS, timeout=15)
            resp.raise_for_status()
            data = resp.json()

            holidays = []
            # NSE returns {"CM": [...], "FO": [...], ...} — use CM (Capital Markets)
            cm_holidays = data.get("CM", [])
            for h in cm_holidays:
                # Format: {"tradingDate": "01-Jan-2025", "weekDay": "Wednesday", "description": "New Year's Day"}
                raw_date = h.get("tradingDate", "")
                try:
                    from datetime import datetime
                    parsed = datetime.strptime(raw_date, "%d-%b-%Y").date()
                    holidays.append({
                        "date": parsed.isoformat(),
                        "description": h.get("description", ""),
                    })
                except ValueError:
                    continue

            logger.info(f"Fetched {len(holidays)} NSE holidays from API")
            return holidays

        except Exception as e:
            last_error = e
            logger.warning(f"NSE holiday API attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY_SECONDS)

    logger.error(f"All {MAX_RETRIES} attempts to fetch NSE holidays failed: {last_error}")
    raise RuntimeError(f"NSE holiday API unavailable after {MAX_RETRIES} retries: {last_error}")


def refresh_holiday_cache():
    """Fetch holidays from NSE and store in the local SQLite cache."""
    from core.db import get_db, generate_id

    holidays = fetch_nse_holidays_from_api()

    with get_db() as conn:
        conn.execute("DELETE FROM trading_holidays WHERE exchange = 'NSE'")
        conn.executemany(
            "INSERT OR REPLACE INTO trading_holidays (date, description, exchange) VALUES (?, ?, 'NSE')",
            [(h["date"], h["description"]) for h in holidays],
        )

    logger.info(f"Holiday cache refreshed: {len(holidays)} NSE holidays stored")


def get_cached_holidays() -> Set[str]:
    """Return the set of NSE holiday date strings from the local cache."""
    from core.db import execute_query

    rows = execute_query("SELECT date FROM trading_holidays WHERE exchange = 'NSE'")
    return {row["date"] for row in rows}


def is_trading_day(check_date: date) -> bool:
    """
    Returns True if check_date is a valid NSE trading day.
    Weekends are always False. Checks holiday cache for public holidays.
    """
    if check_date.weekday() >= 5:  # Saturday=5, Sunday=6
        return False

    holidays = get_cached_holidays()
    return check_date.isoformat() not in holidays


def get_previous_trading_date(from_date: date) -> date:
    """Return the most recent trading day before from_date."""
    candidate = from_date - timedelta(days=1)
    while not is_trading_day(candidate):
        candidate -= timedelta(days=1)
        if (from_date - candidate).days > 30:
            raise RuntimeError(f"Could not find a trading day within 30 days before {from_date}")
    return candidate


def get_next_trading_date(from_date: date) -> date:
    """Return the next trading day after from_date."""
    candidate = from_date + timedelta(days=1)
    while not is_trading_day(candidate):
        candidate += timedelta(days=1)
        if (candidate - from_date).days > 30:
            raise RuntimeError(f"Could not find a trading day within 30 days after {from_date}")
    return candidate


def get_trading_dates_in_range(start: date, end: date) -> list[date]:
    """Return all trading dates between start and end (inclusive)."""
    result = []
    current = start
    while current <= end:
        if is_trading_day(current):
            result.append(current)
        current += timedelta(days=1)
    return result


def ensure_holiday_cache(force_refresh: bool = False):
    """
    Ensure the holiday cache is populated.
    Refreshes if empty or if force_refresh is True.
    On API failure, logs a warning but does not crash — the pipeline
    will still run using weekday logic only.
    """
    from core.db import execute_one

    count = execute_one("SELECT COUNT(*) as cnt FROM trading_holidays WHERE exchange = 'NSE'")
    if force_refresh or (count and count["cnt"] == 0):
        try:
            refresh_holiday_cache()
        except RuntimeError as e:
            logger.warning(
                f"Could not refresh holiday cache: {e}. "
                "Pipeline will proceed using weekday-only logic."
            )
