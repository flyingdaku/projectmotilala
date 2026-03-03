"""
Parallel Raw Data Pre-fetcher
==============================
Downloads raw data from ALL sources (NSE Bhavcopy, BSE Bhavcopy,
NSE Fundamentals, BSE Fundamentals, Screener.in) and saves to raw_data/
WITHOUT writing anything to the database.

When the main pipeline later runs, it finds the files cached and
skips re-downloading — making the DB-write phase much faster.

Sources run in parallel threads:
  - Thread 1: NSE Bhavcopy (all missing dates)
  - Thread 2: BSE Bhavcopy (all missing dates)
  - Thread 3: Screener.in HTML pages (per symbol)
  - Thread 4: NSE Fundamentals JSON (per symbol)
  - Thread 5: BSE Fundamentals JSON (per symbol)

Usage:
  python scripts/prefetch_raw_data.py --from 2000-01-01
  python scripts/prefetch_raw_data.py --from 2024-01-01 --screener --msi
  python scripts/prefetch_raw_data.py --bhavcopy-only   # fastest
"""

import os
import sys
import time
import logging
import argparse
import threading
import requests
import concurrent.futures
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from utils.storage import raw_file_exists, save_raw_file, get_raw_path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("prefetch")

# ── Progress counters (thread-safe) ──────────────────────────────────────────
_lock = threading.Lock()
_counters = {}

def _inc(key, delta=1):
    with _lock:
        _counters[key] = _counters.get(key, 0) + delta

def _get(key):
    with _lock:
        return _counters.get(key, 0)


# ─────────────────────────────────────────────────────────────────────────────
# NSE Bhavcopy downloader (download-only, no DB)
# ─────────────────────────────────────────────────────────────────────────────

# Shared sessions for each source (created per-thread would cause issues)
_bse_session = None
_bse_session_lock = __import__('threading').Lock()


def _get_bse_session() -> requests.Session:
    global _bse_session
    with _bse_session_lock:
        if _bse_session is None:
            s = requests.Session()
            s.headers.update({
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": "https://www.bseindia.com",
                "Accept": "application/zip, application/octet-stream, */*",
            })
            try:
                s.get("https://www.bseindia.com", timeout=10)
            except Exception:
                pass
            _bse_session = s
        return _bse_session


def _prefetch_nse_day(d: date) -> bool:
    """Download NSE Bhavcopy for one date to raw_data. Returns True if fetched/cached."""
    import requests
    # Try to import the real downloader first (avoids code duplication)
    try:
        from pipelines.nse_bhavcopy import download_nse_bhavcopy, raw_file_exists as _rfe
        # Just checking cache before downloading
        date_str = d.strftime("%Y%m%d")
        new_fn = f"BhavCopy_NSE_CM_0_0_0_{date_str}_F_0000.csv.zip"
        old_fn = f"cm{d.strftime('%d%b%Y').upper()}bhav.csv.zip"
        if raw_file_exists("NSE_BHAVCOPY", d, new_fn) or raw_file_exists("NSE_BHAVCOPY", d, old_fn):
            _inc("nse_cached")
            return True
        download_nse_bhavcopy(d)
        _inc("nse_ok")
        return True
    except Exception as e:
        logger.debug(f"NSE {d}: {e}")
        _inc("nse_miss")
        return False


# ─────────────────────────────────────────────────────────────────────────────
# BSE Bhavcopy downloader (download-only, no DB)
# ─────────────────────────────────────────────────────────────────────────────

def _prefetch_bse_day(d: date) -> bool:
    filename = f"EQ{d.strftime('%d%m%y')}_CSV.zip"
    if raw_file_exists("BSE_BHAVCOPY", d, filename):
        _inc("bse_cached")
        return True
    url = f"https://www.bseindia.com/download/BhavCopy/Equity/{filename}"
    session = _get_bse_session()
    for attempt in range(1, 4):
        try:
            resp = session.get(url, timeout=30)
            if resp.status_code == 200 and len(resp.content) > 1000:
                save_raw_file("BSE_BHAVCOPY", d, filename, resp.content)
                _inc("bse_ok")
                return True
            elif resp.status_code == 404:
                _inc("bse_miss")
                return False
            elif resp.status_code in (403, 429):
                logger.debug(f"BSE rate limited {d}, waiting {attempt*20}s")
                global _bse_session
                with _bse_session_lock:
                    _bse_session = None  # re-prime session
                session = _get_bse_session()
                time.sleep(attempt * 20)
                continue
        except Exception as e:
            logger.debug(f"BSE {d} attempt {attempt}: {e}")
            time.sleep(5)
    _inc("bse_miss")
    return False


# ─────────────────────────────────────────────────────────────────────────────
# Screener.in HTML page downloader (download-only, no DB)
# ─────────────────────────────────────────────────────────────────────────────

SCREENER_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.5",
}

def _screener_cache_path(symbol: str) -> Path:
    """Cache Screener pages in raw_data/SCREENER/{symbol}.html"""
    dir_path = Path(ROOT) / "raw_data" / "SCREENER"
    dir_path.mkdir(parents=True, exist_ok=True)
    return dir_path / f"{symbol}.html"


def _prefetch_screener_symbol(symbol: str) -> bool:
    """Download Screener.in company page and save HTML to raw_data/SCREENER/."""
    import requests
    cache_path = _screener_cache_path(symbol)
    if cache_path.exists() and cache_path.stat().st_size > 5000:
        _inc("screener_cached")
        return True

    for url in [
        f"https://www.screener.in/company/{symbol}/consolidated/",
        f"https://www.screener.in/company/{symbol}/",
    ]:
        try:
            resp = requests.get(url, headers=SCREENER_HEADERS, timeout=20)
            if resp.status_code == 200 and len(resp.text) > 5000:
                cache_path.write_text(resp.text, encoding="utf-8")
                _inc("screener_ok")
                return True
            elif resp.status_code == 404:
                continue
        except Exception as e:
            logger.debug(f"Screener {symbol}: {e}")
        time.sleep(0.5)

    _inc("screener_miss")
    return False


# ─────────────────────────────────────────────────────────────────────────────
# NSE Fundamentals downloader (download-only, no DB)
# ─────────────────────────────────────────────────────────────────────────────

def _prefetch_nse_fundamentals(symbol: str) -> bool:
    """Download NSE top-corp-info JSON for a symbol."""
    from utils.storage import get_raw_path
    import requests, json

    cache_dir = Path(ROOT) / "raw_data" / "NSE_FUNDAMENTALS"
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache_path = cache_dir / f"{symbol}.json"

    if cache_path.exists() and cache_path.stat().st_size > 100:
        _inc("nse_fund_cached")
        return True

    NSE_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Referer": "https://www.nseindia.com",
        "Accept": "application/json",
    }
    session = requests.Session()
    # Establish session cookie
    try:
        session.get("https://www.nseindia.com", headers=NSE_HEADERS, timeout=15)
    except Exception:
        pass

    url = f"https://www.nseindia.com/api/top-corp-info?symbol={symbol}&market=equities&identifier=EQUITIES"
    try:
        resp = session.get(url, headers=NSE_HEADERS, timeout=20)
        if resp.status_code == 200:
            cache_path.write_text(resp.text, encoding="utf-8")
            _inc("nse_fund_ok")
            return True
    except Exception as e:
        logger.debug(f"NSE Fund {symbol}: {e}")

    _inc("nse_fund_miss")
    return False


# ─────────────────────────────────────────────────────────────────────────────
# BSE Fundamentals downloader (download-only, no DB)
# ─────────────────────────────────────────────────────────────────────────────

def _prefetch_bse_fundamentals(bse_code: str) -> bool:
    """Download BSE financial results JSON for a scripcode."""
    import requests

    cache_dir = Path(ROOT) / "raw_data" / "BSE_FUNDAMENTALS"
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache_path = cache_dir / f"{bse_code}.json"

    if cache_path.exists() and cache_path.stat().st_size > 100:
        _inc("bse_fund_cached")
        return True

    BSE_HEADERS = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Referer": "https://www.bseindia.com",
    }
    url = f"https://api.bseindia.com/BseWebAPI/api/FinancialResult/w?scripcode={bse_code}&type=C&yeartype=Q"
    try:
        resp = requests.get(url, headers=BSE_HEADERS, timeout=20)
        if resp.status_code == 200:
            cache_path.write_text(resp.text, encoding="utf-8")
            _inc("bse_fund_ok")
            return True
    except Exception as e:
        logger.debug(f"BSE Fund {bse_code}: {e}")

    _inc("bse_fund_miss")
    return False


# ─────────────────────────────────────────────────────────────────────────────
# Orchestration
# ─────────────────────────────────────────────────────────────────────────────

def get_all_dates(start: date, end: date) -> list[date]:
    dates = []
    d = start
    while d <= end:
        if d.weekday() < 5:  # Mon-Fri only; holidays filtered at download time
            dates.append(d)
        d += timedelta(days=1)
    return dates


def get_active_assets() -> list[dict]:
    from utils.db import execute_query
    return execute_query(
        "SELECT id, nse_symbol, bse_code FROM assets WHERE asset_class='EQUITY' AND is_active=1"
    )


def prefetch_bhavcopy(start: date, end: date, workers: int = 8):
    """Parallel download of NSE + BSE Bhavcopy for all dates in range."""
    dates = get_all_dates(start, end)
    logger.info(f"Pre-fetching Bhavcopy for {len(dates)} weekdays ({start} → {end})")

    # NSE: up to 6 workers (NSE tolerates moderate parallelism)
    # BSE: max 2 workers (BSE is aggressive with rate limiting)
    nse_workers = min(workers, 6)
    bse_workers = min(workers, 2)

    def nse_task(d):
        _prefetch_nse_day(d)
        time.sleep(0.3)

    def bse_task(d):
        _prefetch_bse_day(d)
        time.sleep(1.5)  # BSE needs more breathing room

    with concurrent.futures.ThreadPoolExecutor(max_workers=nse_workers,
                                               thread_name_prefix="nse") as nse_ex, \
         concurrent.futures.ThreadPoolExecutor(max_workers=bse_workers,
                                               thread_name_prefix="bse") as bse_ex:
        nse_futures = [nse_ex.submit(nse_task, d) for d in dates]
        bse_futures = [bse_ex.submit(bse_task, d) for d in dates]

        done = 0
        for f in concurrent.futures.as_completed(nse_futures + bse_futures):
            done += 1
            if done % 200 == 0 or done == len(dates) * 2:
                logger.info(
                    f"  Bhavcopy progress {done}/{len(dates)*2} | "
                    f"NSE ok={_get('nse_ok')} cached={_get('nse_cached')} miss={_get('nse_miss')} | "
                    f"BSE ok={_get('bse_ok')} cached={_get('bse_cached')} miss={_get('bse_miss')}"
                )


def prefetch_fundamentals_and_screener(workers_screener: int = 5,
                                        workers_fund: int = 4):
    """Parallel download of Screener + NSE/BSE Fundamentals for all active assets."""
    assets = get_active_assets()
    logger.info(f"Pre-fetching fundamentals/screener for {len(assets)} assets")

    def screener_task(a):
        sym = a["nse_symbol"] or a["bse_code"]
        if sym:
            _prefetch_screener_symbol(sym)
            time.sleep(1.2)  # polite delay

    def nse_fund_task(a):
        if a["nse_symbol"]:
            _prefetch_nse_fundamentals(a["nse_symbol"])
            time.sleep(0.5)

    def bse_fund_task(a):
        if a["bse_code"]:
            _prefetch_bse_fundamentals(a["bse_code"])
            time.sleep(0.5)

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers_screener,
                                               thread_name_prefix="scr") as scr_ex, \
         concurrent.futures.ThreadPoolExecutor(max_workers=workers_fund,
                                               thread_name_prefix="nfund") as nf_ex, \
         concurrent.futures.ThreadPoolExecutor(max_workers=workers_fund,
                                               thread_name_prefix="bfund") as bf_ex:

        scr_futs  = [scr_ex.submit(screener_task,  a) for a in assets]
        nf_futs   = [nf_ex.submit(nse_fund_task,   a) for a in assets]
        bf_futs   = [bf_ex.submit(bse_fund_task,   a) for a in assets]
        all_futs  = scr_futs + nf_futs + bf_futs

        done = 0
        for f in concurrent.futures.as_completed(all_futs):
            done += 1
            if done % 100 == 0 or done == len(all_futs):
                logger.info(
                    f"  Fundamentals {done}/{len(all_futs)} | "
                    f"Screener ok={_get('screener_ok')} cached={_get('screener_cached')} | "
                    f"NSE-Fund ok={_get('nse_fund_ok')} | "
                    f"BSE-Fund ok={_get('bse_fund_ok')}"
                )


def print_summary():
    print("\n" + "="*60)
    print("  PRE-FETCH SUMMARY")
    print("="*60)
    for k, v in sorted(_counters.items()):
        print(f"  {k:<30} {v:>6}")
    print("="*60)

    # Check raw_data disk usage
    raw_dir = Path(ROOT) / "raw_data"
    if raw_dir.exists():
        total = sum(f.stat().st_size for f in raw_dir.rglob("*") if f.is_file())
        print(f"  raw_data/ total size: {total / 1e9:.2f} GB")
    print()


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Parallel raw data pre-fetcher — downloads to raw_data/ WITHOUT touching the DB"
    )
    parser.add_argument("--from", dest="start_date", default="2000-01-01")
    parser.add_argument("--to",   dest="end_date",   default=None)
    parser.add_argument("--bhavcopy-only", action="store_true",
                        help="Only download NSE + BSE Bhavcopy (fastest)")
    parser.add_argument("--screener",  action="store_true",
                        help="Also download Screener.in pages")
    parser.add_argument("--fundamentals", action="store_true",
                        help="Also download NSE/BSE fundamentals JSON")
    parser.add_argument("--all", action="store_true",
                        help="Download everything (bhavcopy + screener + fundamentals)")
    parser.add_argument("--workers-bhavcopy",    type=int, default=8)
    parser.add_argument("--workers-screener",    type=int, default=5)
    parser.add_argument("--workers-fundamentals", type=int, default=4)
    args = parser.parse_args()

    start = date.fromisoformat(args.start_date)
    end   = date.fromisoformat(args.end_date) if args.end_date else date.today() - timedelta(days=1)

    do_screener      = args.screener or args.all
    do_fundamentals  = args.fundamentals or args.all

    logger.info(f"Pre-fetch: {start} → {end}  |  screener={do_screener}  fund={do_fundamentals}")

    prefetch_bhavcopy(start, end, workers=args.workers_bhavcopy)

    if do_screener or do_fundamentals:
        prefetch_fundamentals_and_screener(
            workers_screener=args.workers_screener if do_screener else 0,
            workers_fund=args.workers_fundamentals if do_fundamentals else 0,
        )

    print_summary()
