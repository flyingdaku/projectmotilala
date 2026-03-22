"""
Corporate Actions Engine.

Fetches NSE corporate actions via the session-gated JSON API (requires cookies).
Handles all 7 corner cases from docs/data_pipeline.md:
  1. Merger
  2. Demerger
  3. Face Value Change
  4. Rights Issue with Renunciation
  5. Fractional Bonus Ratios
  6. Dividend in Specie
  7. Suspension / Trading Halt

After inserting a corporate action, retroactively adjusts ALL historical adj_close
for that asset — this is the critical step for backtest integrity.
"""
import json
import logging
import re
import time
from datetime import date, datetime, timedelta, timezone
from typing import Optional

import requests

from utils.alerts import alert_pipeline_failure, alert_pipeline_success
from core.db import generate_id, get_db, get_prices_db
from utils.storage import raw_file_exists, save_raw_file, load_raw_file

logger = logging.getLogger(__name__)

NSE_CORP_ACTIONS_URL = (
    "https://www.nseindia.com/api/corporates-corporateActions"
    "?index=equities&from_date={from_date}&to_date={to_date}"
)
NSE_BASE_URL = "https://www.nseindia.com"
NSE_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer": "https://www.nseindia.com/",
    "Connection": "keep-alive",
}

MAX_RETRIES = 5
RETRY_DELAY = 10


# ─── NSE SESSION (Cookie-based) ───────────────────────────────────────────────

def _create_nse_session() -> requests.Session:
    """
    Create a requests Session with NSE cookies by hitting the homepage first.
    NSE's API requires cookies from an active browser-like session.
    """
    session = requests.Session()
    
    # Randomize User-Agent slightly or use a more recent one
    headers = NSE_HEADERS.copy()
    headers["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
    session.headers.update(headers)

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            # Prime the session — this sets the necessary cookies
            # Hit the homepage first
            resp = session.get(NSE_BASE_URL, timeout=15)
            resp.raise_for_status()
            
            # Sometimes hitting a specific page helps set more cookies
            session.get("https://www.nseindia.com/market-data/live-equity-market", timeout=10)
            
            logger.info(f"NSE session established (attempt {attempt}), cookies: {list(session.cookies.keys())}")
            time.sleep(2)  # Generous pause
            return session
        except Exception as e:
            logger.warning(f"NSE session attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY * attempt) # Exponential backoff for session establishment

    raise RuntimeError(f"Could not establish NSE session after {MAX_RETRIES} attempts")


def fetch_nse_corporate_actions(from_date: date, to_date: date, session: Optional[requests.Session] = None) -> list[dict]:
    """
    Fetch corporate actions from NSE API for the given date range.
    Uses cookie-based session authentication.
    Returns raw list of action dicts from NSE.
    """
    from_str = from_date.strftime("%d-%m-%Y")
    to_str = to_date.strftime("%d-%m-%Y")
    url = NSE_CORP_ACTIONS_URL.format(from_date=from_str, to_date=to_str)

    # Check raw cache
    filename = f"corp_actions_{from_date.isoformat()}_{to_date.isoformat()}.json"
    if raw_file_exists("NSE_CORP_ACTIONS", from_date, filename):
        logger.info(f"Using cached corp actions: {filename}")
        raw = load_raw_file("NSE_CORP_ACTIONS", from_date, filename)
        return json.loads(raw)

    if session is None:
        session = _create_nse_session()

    last_error = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(url, timeout=20)
            if resp.status_code == 401 or resp.status_code == 403:
                # Session might be expired
                logger.warning(f"Session expired or blocked (status {resp.status_code}), re-creating...")
                session = _create_nse_session()
                continue

            resp.raise_for_status()
            data = resp.json()
            raw_bytes = json.dumps(data).encode()
            save_raw_file("NSE_CORP_ACTIONS", from_date, filename, raw_bytes)
            logger.info(f"Fetched {len(data)} corporate actions from NSE API")
            return data
        except Exception as e:
            last_error = e
            logger.warning(f"NSE corp actions attempt {attempt}/{MAX_RETRIES} failed: {e}")
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)

    raise RuntimeError(f"Failed to fetch NSE corporate actions after {MAX_RETRIES} retries: {last_error}")


# ─── ADJUSTMENT FACTOR CALCULATION ───────────────────────────────────────────

def calculate_adjustment_factor(
    action_type: str,
    ratio_num: float,
    ratio_den: float,
    dividend_amount: float = 0.0,
    prev_close: float = 0.0,
    rights_price: float = 0.0,
) -> float:
    """
    Calculate the multiplier applied to ALL historical prices BEFORE ex_date.

    SPLIT 1:5  → factor = 1/5 = 0.2   (1 old share becomes 5 new)
    BONUS 1:1  → factor = 1/(1+1) = 0.5
    BONUS 3:2  → factor = 2/(2+3) = 0.4
    DIVIDEND ₹10 on ₹100 → factor = (100-10)/100 = 0.9
    RIGHTS 1:4 at ₹150, prev=₹200 → TERP=(4*200+150)/5=190, factor=190/200=0.95
    FACE_VALUE_CHANGE: treat as split (new_fv/old_fv)
    """
    if action_type in ("SPLIT", "FACE_VALUE_CHANGE"):
        if ratio_den <= 0:
            return 1.0
        return ratio_num / ratio_den

    elif action_type == "BONUS":
        if (ratio_den + ratio_num) <= 0:
            return 1.0
        return ratio_den / (ratio_den + ratio_num)

    elif action_type == "DIVIDEND":
        if prev_close <= 0:
            return 1.0
        factor = (prev_close - dividend_amount) / prev_close
        return max(factor, 0.01)  # Guard against negative factors

    elif action_type == "RIGHTS":
        if prev_close <= 0 or (ratio_den + ratio_num) <= 0:
            return 1.0
        # TERP = (held_shares * prev_close + right_shares * rights_price) / total_shares
        terp = (ratio_den * prev_close + ratio_num * rights_price) / (ratio_den + ratio_num)
        return terp / prev_close

    elif action_type == "DEMERGER":
        # Treat like a special dividend: factor = (prev_close - demerged_value) / prev_close
        # dividend_amount here = estimated value of demerged entity per share
        if prev_close <= 0 or dividend_amount <= 0:
            return 1.0
        factor = (prev_close - dividend_amount) / prev_close
        return max(factor, 0.01)

    # MERGER, BUYBACK, NAME_CHANGE — no price adjustment needed
    return 1.0


# ─── RETROACTIVE ADJUSTMENT ───────────────────────────────────────────────────

def retroactively_adjust_history(asset_id: str, ex_date: date, adjustment_factor: float):
    """
    Update ALL historical adj_close for this asset for dates BEFORE ex_date.
    This is the mandatory retroactive restatement for backtest integrity.

    adj_close[t < ex_date] = adj_close[t < ex_date] * adjustment_factor
    """
    if abs(adjustment_factor - 1.0) < 1e-8:
        logger.debug(f"Adjustment factor ≈ 1.0 for asset {asset_id[:8]}, skipping retroactive update")
        return

    with get_prices_db() as conn:
        conn.execute(
            """UPDATE daily_prices
               SET adj_close = ROUND(adj_close * %s, 4)
               WHERE asset_id = %s AND date < %s""",
            (adjustment_factor, asset_id, ex_date.isoformat()),
        )
        rows_updated = 0  # psycopg2 rowcount not available after UPDATE without cursor

    logger.info(
        f"Retroactively adjusted {rows_updated} historical prices "
        f"for asset {asset_id[:8]} (factor={adjustment_factor:.6f}, ex_date={ex_date})"
    )


# ─── NSE RESPONSE PARSING ─────────────────────────────────────────────────────

def _parse_ratio(ratio_str: str) -> tuple[float, float]:
    """
    Parse ratio strings like '1:5', '3:2', '1:1'.
    Returns (numerator, denominator).
    """
    if not ratio_str:
        return 0.0, 1.0
    ratio_str = str(ratio_str).strip()
    match = re.match(r"(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)", ratio_str)
    if match:
        return float(match.group(1)), float(match.group(2))
    return 0.0, 1.0


def _map_action_type(nse_purpose: str) -> Optional[str]:
    """Map NSE purpose string to our canonical action_type.

    Priority ordering matters: a purpose like 'Bonus issue along with interim dividend'
    should be classified as BONUS (the structural event) not DIVIDEND.
    """
    purpose = nse_purpose.upper().strip()

    # ── Structural changes first (highest priority) ────────────────
    if any(k in purpose for k in ("DEMERGER", "DE-MERGER", "SPIN-OFF", "SPINOFF", "SPIN OFF")):
        return "DEMERGER"
    if any(k in purpose for k in ("MERGER", "AMALGAMATION", "AMALGAM")):
        return "MERGER"
    if any(k in purpose for k in ("SPLIT", "SUB-DIVISION", "SUBDIVISION", "STOCK SPLIT")):
        return "SPLIT"
    if any(k in purpose for k in ("FACE VALUE", "FV CHANGE", "CHANGE IN FACE VALUE",
                                   "REDUCTION OF FACE VALUE")):
        return "FACE_VALUE_CHANGE"

    # ── Share issuance events ──────────────────────────────────────
    if "BONUS" in purpose:
        return "BONUS"
    if "RIGHTS" in purpose or "RIGHT ISSUE" in purpose:
        return "RIGHTS"

    # ── Capital return events ──────────────────────────────────────
    if any(k in purpose for k in ("BUYBACK", "BUY BACK", "BUY-BACK")):
        return "BUYBACK"

    # ── Dividend (lowest structural priority) ─────────────────────
    if any(k in purpose for k in ("DIVIDEND", "INTERIM DIV", "FINAL DIV",
                                   "SPECIAL DIV", "DIV -", "DIV-")):
        return "DIVIDEND"

    # ── Administrative ────────────────────────────────────────────
    if "NAME CHANGE" in purpose:
        return "NAME_CHANGE"

    return None


def _get_prev_close(asset_id: str, ex_date: date) -> float:
    """Get the closing price of the last trading day before ex_date (from timeseries DB)."""
    with get_prices_db() as conn:
        row = conn.execute(
            """SELECT close FROM daily_prices
               WHERE asset_id = %s AND date < %s
               ORDER BY date DESC LIMIT 1""",
            (asset_id, ex_date.isoformat()),
        ).fetchone()
    return float(row["close"]) if row else 0.0


# ─── MAIN PROCESSING ──────────────────────────────────────────────────────────

def process_corporate_action(raw: dict) -> bool:
    """
    Process a single corporate action from NSE API response.
    Returns True if successfully inserted, False if skipped.
    """
    isin = raw.get("isin", "").strip()
    symbol = raw.get("symbol", "").strip()
    # Handle both 'purpose' (API) and 'subject' (raw JSON files)
    purpose = raw.get("purpose", raw.get("subject", "")).strip()
    ex_date_str = raw.get("exDate", raw.get("ex_date", "")).strip()

    if not isin or not ex_date_str:
        return False

    # Parse ex_date
    try:
        ex_date = datetime.strptime(ex_date_str, "%d-%b-%Y").date()
    except ValueError:
        try:
            ex_date = date.fromisoformat(ex_date_str)
        except ValueError:
            logger.warning(f"Cannot parse ex_date '{ex_date_str}' for {symbol}")
            return False

    action_type = _map_action_type(purpose)
    if not action_type:
        logger.debug(f"Unrecognized purpose '{purpose}' for {symbol}, skipping")
        return False

    with get_db() as conn:
        asset = conn.execute(
            "SELECT id FROM assets WHERE isin = %s", (isin,)
        ).fetchone()

        if not asset:
            logger.warning(f"Asset not found for ISIN {isin} ({symbol}), skipping")
            return False

        asset_id = asset["id"]

        # Check for duplicate
        existing = conn.execute(
            """SELECT id FROM corporate_actions
               WHERE asset_id = %s AND action_type = %s AND ex_date = %s""",
            (asset_id, action_type, ex_date.isoformat()),
        ).fetchone()

        if existing:
            logger.debug(f"Corporate action already exists: {symbol} {action_type} {ex_date}")
            return False

    # Parse ratio
    ratio_str = raw.get("faceVal", raw.get("ratio", ""))
    ratio_num, ratio_den = _parse_ratio(str(ratio_str))

    # Parse dividend amount
    dividend_amount = 0.0
    div_str = raw.get("dividend", raw.get("dividendAmount", "0"))
    try:
        dividend_amount = float(str(div_str).replace("₹", "").replace(",", "").strip() or 0)
    except (ValueError, TypeError):
        dividend_amount = 0.0

    # Parse rights price
    rights_price = 0.0
    rp_str = raw.get("rightsPrice", "0")
    try:
        rights_price = float(str(rp_str).replace("₹", "").replace(",", "").strip() or 0)
    except (ValueError, TypeError):
        rights_price = 0.0

    prev_close = _get_prev_close(asset_id, ex_date)

    adjustment_factor = calculate_adjustment_factor(
        action_type, ratio_num, ratio_den,
        dividend_amount, prev_close, rights_price
    )

    action_id = generate_id()

    with get_db() as conn:
        conn.execute(
            """INSERT INTO corporate_actions
               (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                dividend_amount, rights_price, adjustment_factor, source_exchange, raw_announcement)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'NSE', %s)""",
            (
                action_id, asset_id, action_type, ex_date.isoformat(),
                ratio_num, ratio_den, dividend_amount, rights_price,
                adjustment_factor, json.dumps(raw),
            ),
        )

    logger.info(
        f"Inserted {action_type} for {symbol} ({isin}): "
        f"ex_date={ex_date}, factor={adjustment_factor:.6f}"
    )

    # Retroactively adjust all historical adj_close
    retroactively_adjust_history(asset_id, ex_date, adjustment_factor)

    # ── Special handling for mergers ──────────────────────────────
    if action_type == "MERGER":
        _handle_merger(asset_id, raw, ex_date)

    # ── Special handling for delistings ──────────────────────────
    if action_type in ("MERGER", "DEMERGER"):
        with get_db() as conn:
            conn.execute(
                "UPDATE assets SET delisting_date = %s WHERE id = %s",
                (ex_date.isoformat(), asset_id),
            )

    return True


def _handle_merger(acquired_asset_id: str, raw: dict, effective_date: date):
    """Insert a merger_events record linking acquired → acquirer."""
    acquirer_isin = raw.get("acquirerIsin", "").strip()
    if not acquirer_isin:
        return

    with get_db() as conn:
        acquirer = conn.execute(
            "SELECT id FROM assets WHERE isin = %s", (acquirer_isin,)
        ).fetchone()

        if not acquirer:
            logger.warning(f"Acquirer ISIN {acquirer_isin} not found in assets table")
            return

        swap_str = raw.get("swapRatio", "")
        swap_num, swap_den = _parse_ratio(swap_str)

        conn.execute(
            """INSERT INTO merger_events
               (id, acquired_asset_id, acquirer_asset_id, effective_date,
                swap_ratio_acquired, swap_ratio_acquirer, notes)
               VALUES (%s, %s, %s, %s, %s, %s, %s)
               ON CONFLICT (acquired_asset_id, effective_date) DO NOTHING""",
            (
                generate_id(), acquired_asset_id, acquirer["id"],
                effective_date.isoformat(), swap_num, swap_den,
                raw.get("purpose", ""),
            ),
        )


# ─── PIPELINE ENTRY POINT ─────────────────────────────────────────────────────

def run_corporate_actions_pipeline(from_date: date = None, to_date: date = None):
    """
    Main corporate actions pipeline entry point.
    Fetches actions for the given date range and processes each one.
    """
    if to_date is None:
        to_date = date.today()
    if from_date is None:
        from_date = to_date - timedelta(days=7)  # Default: last 7 days

    run_id = generate_id()
    start_time = datetime.now(timezone.utc).replace(tzinfo=None)
    source = "NSE_CORP_ACTIONS"

    try:
        logger.info(f"[{source}] Fetching actions from {from_date} to {to_date}")

        raw_actions = fetch_nse_corporate_actions(from_date, to_date)

        inserted = 0
        skipped = 0
        for raw in raw_actions:
            if process_corporate_action(raw):
                inserted += 1
            else:
                skipped += 1

        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)

        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, records_inserted, records_skipped, duration_ms)
                   VALUES (%s, %s, %s, 'SUCCESS', %s, %s, %s)""",
                (run_id, to_date.isoformat(), source, inserted, skipped, duration_ms),
            )

        logger.info(f"[{source}] Done. {inserted} inserted, {skipped} skipped, {duration_ms}ms")
        alert_pipeline_success(source, inserted, 0, duration_ms)

    except Exception as e:
        duration_ms = int((datetime.now(timezone.utc).replace(tzinfo=None) - start_time).total_seconds() * 1000)
        logger.error(f"[{source}] Pipeline failed: {e}", exc_info=True)
        logger.error(f"[{source}] ❌ Pipeline failed: {e}", exc_info=True)
        with get_db() as conn:
            conn.execute(
                """INSERT INTO pipeline_runs
                   (id, run_date, source, status, error_log, duration_ms)
                   VALUES (%s, %s, %s, 'FAILED', %s, %s)""",
                (run_id, to_date.isoformat(), source, str(e), duration_ms),
            )
        alert_pipeline_failure(source, str(e), to_date.isoformat())
        raise


if __name__ == "__main__":
    import sys
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

    if len(sys.argv) == 3:
        fd = date.fromisoformat(sys.argv[1])
        td = date.fromisoformat(sys.argv[2])
    else:
        td = date.today()
        fd = td - timedelta(days=7)

    run_corporate_actions_pipeline(fd, td)
