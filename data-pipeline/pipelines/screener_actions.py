
import logging
import requests
import re
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
from bs4 import BeautifulSoup
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from core.db import get_db, generate_id

logger = logging.getLogger(__name__)

# Constants
SCREENER_BASE = "https://www.screener.in"
CACHE_DIR = Path(__file__).resolve().parent.parent / "raw_data" / "SCREENER_ACTIONS"
MAIN_CACHE_DIR = Path(__file__).resolve().parent.parent / "raw_data" / "SCREENER"

# Credentials from USER
COOKIES = {
    "csrftoken": "DI8KnSejA0FTEdBcqttO5HNVFXQ7o6Uq",
    "sessionid": "31ihzy1wrg2e6c3qhh6hwjx6xjr0ygdc",
}
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
}

def extract_company_id(html: str) -> Optional[str]:
    """Find company ID in main page HTML."""
    # Look for patterns like /announcements/recent/2726/ or /trades/company-2726/
    match = re.search(r'/(?:announcements|trades|company-actions)/(?:recent/|company-)?(\d+)/', html)
    if match:
        return match.group(1)
    # Fallback to general \d+ search in specific contexts if needed
    return None

def fetch_actions_html(identifier: str, company_id: str) -> Optional[str]:
    """Fetch corporate actions fragment from Screener."""
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path = CACHE_DIR / f"{identifier}.html"
    
    if cache_path.exists() and cache_path.stat().st_size > 500:
        return cache_path.read_text(encoding="utf-8")
    
    url = f"https://www.screener.in/company/actions/{company_id}/"
    for attempt in range(1, 4):
        try:
            resp = requests.get(url, headers=HEADERS, cookies=COOKIES, timeout=20)
            if resp.status_code == 200 and "Register - Screener" not in resp.text:
                html = resp.text
                cache_path.write_text(html, encoding="utf-8")
                return html
            elif resp.status_code == 429:
                wait = 60 * attempt
                logger.warning(f"[SCREENER] Actions 429 for {identifier} - waiting {wait}s...")
                time.sleep(wait)
            else:
                logger.warning(f"Failed to fetch actions for {identifier} (ID: {company_id}). Status: {resp.status_code}")
                return None
        except Exception as e:
            logger.error(f"Error fetching actions for {identifier} (attempt {attempt}): {e}")
            time.sleep(10)
    return None

def _parse_date(date_div: BeautifulSoup) -> Optional[str]:
    try:
        year = date_div.find("div", class_="font-weight-500").text.strip()
        day_month = date_div.find("div", class_="sub").text.strip()
        # "Oct 28" 2024 -> 2024-10-28
        # "2024" "Oct 28"
        full_str = f"{day_month} {year}"
        dt = datetime.strptime(full_str, "%b %d %Y")
        return dt.strftime("%Y-%m-%d")
    except Exception as e:
        return None

def parse_actions_fragment(html: str) -> Dict[str, List[Dict]]:
    soup = BeautifulSoup(html, "html.parser")
    results = {}
    
    tabs = [
        ("equityhistory", "EQUITY_HISTORY"),
        ("esops", "ESOP"),
        ("dividend", "DIVIDEND"),
        ("bonus", "BONUS"),
        ("merger", "MERGER"),
        ("right", "RIGHTS"),
        ("buyback", "BUYBACK")
    ]
    
    for tab_id, action_prefix in tabs:
        section = soup.find("div", id=f"corporate-actions-{tab_id}")
        if not section: continue
        
        rows = []
        # Usually one row per <tbody>, or multiple <tr> in a <tbody>
        for tbody in section.find_all("tbody"):
            for tr in tbody.find_all("tr"):
                cols = tr.find_all("td")
                if len(cols) < 2: continue
                
                date_val = _parse_date(cols[0])
                if not date_val: continue
                
                details_div = cols[1]
                title = details_div.find("div", class_="font-weight-500").text.strip()
                desc_div = details_div.find("div", class_="sub")
                description = desc_div.text.strip() if desc_div else ""
                
                rows.append({
                    "action_type": action_prefix,
                    "date": date_val,
                    "title": title,
                    "description": description
                })
        results[action_prefix] = rows
    return results

def run_screener_actions_pipeline():
    logger.info("Starting Screener Corporate Actions pipeline...")
    
    # 1. Ensure schema exists
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS src_screener_actions (
                id                TEXT PRIMARY KEY,
                asset_id          TEXT NOT NULL,
                action_type       TEXT NOT NULL,
                ex_date           TEXT NOT NULL,
                title             TEXT,
                description       TEXT,
                created_at        TEXT DEFAULT (datetime('now')),
                UNIQUE(asset_id, action_type, ex_date),
                FOREIGN KEY (asset_id) REFERENCES assets(id)
            )
        """)
        
        # 2. Get active assets
        assets = conn.execute("SELECT id, nse_symbol, bse_code FROM assets WHERE is_active = 1").fetchall()
    
    for asset in assets:
        identifier = asset["nse_symbol"] or asset["bse_code"]
        if not identifier: continue
        
        # Check if we have main page cached to extract company ID
        main_cache = MAIN_CACHE_DIR / f"{identifier}.html"
        company_id = None
        if main_cache.exists():
            company_id = extract_company_id(main_cache.read_text(encoding="utf-8"))
        
        if not company_id:
            # Try to fetch main page if not cached (briefly)
            try:
                url = f"https://www.screener.in/company/{identifier}/"
                resp = requests.get(url, headers=HEADERS, cookies=COOKIES, timeout=10)
                company_id = extract_company_id(resp.text)
            except:
                pass
        
        if not company_id:
            logger.warning(f"Could not resolve company ID for {identifier}")
            continue
            
        logger.info(f"Processing {identifier} (ID: {company_id})...")
        html = fetch_actions_html(identifier, company_id)
        if not html:
            continue
            
        actions = parse_actions_fragment(html)
        
        with get_db() as conn:
            for action_type, rows in actions.items():
                for row in rows:
                    try:
                        conn.execute("""
                            INSERT OR IGNORE INTO src_screener_actions (
                                id, asset_id, action_type, ex_date, title, description
                            ) VALUES (?, ?, ?, ?, ?, ?)
                        """, (
                            generate_id(), asset["id"], row["action_type"],
                            row["date"], row["title"], row["description"]
                        ))
                    except Exception as e:
                        logger.error(f"DB Error for {identifier}: {e}")
        
        logger.info(f"Updated actions for {identifier}")
        time.sleep(0.5) # Modest sleep

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_screener_actions_pipeline()
