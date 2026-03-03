"""
Screener.in Fundamentals Fetcher.
Parses HTML tables for Quarterly Results, Balance Sheet, Cash Flows, and Ratios.
"""
import logging
import requests
from pathlib import Path
import time
import calendar
from datetime import date, datetime
from typing import Dict, Any, List, Optional
from bs4 import BeautifulSoup
from utils.db import get_db, generate_id

logger = logging.getLogger(__name__)

SCREENER_BASE = "https://www.screener.in"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
}

def _parse_screener_table(soup: BeautifulSoup, table_id: str) -> List[Dict]:
    section = soup.select_one(f"section{table_id}")
    if not section: return []
    
    table = section.find("table", class_="data-table")
    if not table: return []
    
    thead = table.find("thead")
    if not thead: return []
    headers = [th.text.strip() for th in thead.find_all("th")][1:] # Skip first 'Row'
    
    # Store rows: {period: {label: value}}
    period_rows = {}
    
    tbody = table.find("tbody")
    if not tbody: return []
    
    for tr in tbody.find_all("tr", class_=None):
        cols = tr.find_all("td")
        if not cols: continue
        row_label = cols[0].text.strip().lower()
        values = [c.text.strip().replace(",", "") for c in cols[1:]]
        
        for i, val in enumerate(values):
            if i >= len(headers): break
            period = headers[i]
            if period not in period_rows: period_rows[period] = {"period": period}
            try:
                # Remove extra chars for items like "OPM %"
                clean_val = val.replace("%", "").strip()
                if clean_val and clean_val != "0.00" and clean_val != "":
                    period_rows[period][row_label] = float(clean_val)
                else:
                    period_rows[period][row_label] = 0.0
            except:
                period_rows[period][row_label] = None
                
    return list(period_rows.values())

SCREENER_CACHE_DIR = Path(__file__).resolve().parent.parent / "raw_data" / "SCREENER"


def _screener_cache_path(identifier: str) -> Path:
    return SCREENER_CACHE_DIR / f"{identifier}.html"


def fetch_screener_data(identifier: str) -> Dict[str, List[Dict]]:
    """
    Parse Screener.in HTML for a company.
    Reads from raw_data/SCREENER/{identifier}.html if available (pre-fetched),
    otherwise falls back to a live HTTP request and caches the result.
    """
    SCREENER_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = _screener_cache_path(identifier)

    html = None

    # 1. Try cache first
    if cache_path.exists() and cache_path.stat().st_size > 5000:
        logger.debug(f"[SCREENER] Loading {identifier} from cache")
        html = cache_path.read_text(encoding="utf-8")

    # 2. Fallback: live fetch
    if not html:
        for url in [
            f"https://www.screener.in/company/{identifier}/consolidated/",
            f"https://www.screener.in/company/{identifier}/",
        ]:
            try:
                resp = requests.get(url, headers=HEADERS, timeout=20)
                if resp.status_code == 404:
                    continue
                resp.raise_for_status()
                html = resp.text
                # Save for future runs
                cache_path.write_text(html, encoding="utf-8")
                break
            except Exception as e:
                logger.warning(f"[SCREENER] fetch failed for {identifier}: {e}")

    if not html:
        return {}

    try:
        soup = BeautifulSoup(html, "html.parser")
        return {
            "quarters":     _parse_screener_table(soup, "#quarters"),
            "annual":       _parse_screener_table(soup, "#profit-loss"),
            "balance_sheet":_parse_screener_table(soup, "#balance-sheet"),
            "cash_flow":    _parse_screener_table(soup, "#cash-flow"),
            "ratios":       _parse_screener_table(soup, "#ratios"),
            "shareholding": _parse_screener_table(soup, "#shareholding"),
        }
    except Exception as e:
        logger.warning(f"[SCREENER] parse failed for {identifier}: {e}")
        return {}

def _period_to_iso(period_str: str) -> Optional[str]:
     try:
        dt = datetime.strptime(period_str, "%b %Y")
        last_day = calendar.monthrange(dt.year, dt.month)[1]
        return dt.replace(day=last_day).strftime("%Y-%m-%d")
     except:
        return None

def run_screener_fundamentals(trade_date: date):
    logger.info("[SCREENER] Starting fundamentals scrape...")
    # Import classification scraper for inline enrichment
    try:
        from scripts.scrape_screener_classification import fetch_classification, update_asset_classification
        do_classification = True
    except ImportError:
        do_classification = False

    with get_db() as conn:
        assets = conn.execute("SELECT id, nse_symbol, bse_code FROM assets WHERE is_active = 1").fetchall()
        
    for asset in assets:
        identifier = asset["nse_symbol"] or asset["bse_code"]
        if not identifier: continue
        
        logger.info(f"[SCREENER] Fetching {identifier}...")
        data = fetch_screener_data(identifier)
        if not data: continue

        # Opportunistically update 4-level classification while we have the page
        if do_classification:
            cls = fetch_classification(identifier)
            if cls:
                update_asset_classification(asset["id"], cls)
            # 1. Quarterly Results
            for row in data.get("quarters", []):
                period_date = _period_to_iso(row["period"])
                if not period_date: continue
                conn.execute("""
                    INSERT OR REPLACE INTO screener_quarterly (
                        id, asset_id, period_end_date, sales, expenses, operating_profit, opm_pct, pbt, tax_pct, net_profit, eps
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    generate_id(), asset["id"], period_date,
                    row.get("sales"), row.get("expenses"), row.get("operating profit"),
                    row.get("opm %"), row.get("profit before tax"), row.get("tax %"),
                    row.get("net profit"), row.get("eps in rs")
                ))

            # 2. Balance Sheet
            for row in data.get("balance_sheet", []):
                period_date = _period_to_iso(row["period"])
                if not period_date: continue
                conn.execute("""
                    INSERT OR REPLACE INTO screener_balance_sheet (
                        id, asset_id, period_end_date, share_capital, reserves, borrowings, other_liabilities, fixed_assets, cwip, investments, other_assets, total_assets
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    generate_id(), asset["id"], period_date,
                    row.get("share capital"), row.get("reserves"), row.get("borrowings"),
                    row.get("other liabilities"), row.get("fixed assets"), row.get("cwip"),
                    row.get("investments"), row.get("other assets"), row.get("total assets")
                ))

            # 3. Cash Flow
            for row in data.get("cash_flow", []):
                period_date = _period_to_iso(row["period"])
                if not period_date: continue
                conn.execute("""
                    INSERT OR REPLACE INTO screener_cashflow (
                        id, asset_id, period_end_date, cash_from_operating, cash_from_investing, cash_from_financing, net_cash_flow
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (
                    generate_id(), asset["id"], period_date,
                    row.get("cash from operating activity"), row.get("cash from investing activity"),
                    row.get("cash from financing activity"), row.get("net cash flow")
                ))

        logger.info(f"[SCREENER] Updated {identifier}")
        time.sleep(1) 
