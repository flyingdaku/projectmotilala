
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
    """Fetch corporate actions fragment from Screener cache if available."""
    cache_path = CACHE_DIR / f"{identifier}.html"
    if cache_path.exists() and cache_path.stat().st_size > 500:
        return cache_path.read_text(encoding="utf-8")
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
    
    from core.db import get_pg_connection
    
    with get_pg_connection() as conn:
        # 1. Ensure schema exists (Postgres syntax)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS src_screener_actions (
                id                TEXT PRIMARY KEY,
                asset_id          TEXT NOT NULL REFERENCES assets(id),
                action_type       TEXT NOT NULL,
                ex_date           DATE NOT NULL,
                title             TEXT,
                description       TEXT,
                created_at        TIMESTAMPTZ DEFAULT NOW(),
                UNIQUE(asset_id, action_type, ex_date)
            )
        """)
        
        # 2. Get active assets
        assets = conn.fetchall("SELECT id, nse_symbol, bse_code FROM assets WHERE is_active = 1")
    
        for asset in assets:
            identifier = asset["nse_symbol"] or asset["bse_code"]
            if not identifier: continue
            
            # Check if we have main page cached to extract company ID
            main_cache = MAIN_CACHE_DIR / f"{identifier}.html"
            company_id = None
            if main_cache.exists():
                company_id = extract_company_id(main_cache.read_text(encoding="utf-8"))
            
            if not company_id:
                # Modest attempt if not in cache (login likely required for many)
                continue
            
            logger.info(f"Processing {identifier} (ID: {company_id})...")
            html = fetch_actions_html(identifier, company_id)
            if not html:
                continue
                
            actions = parse_actions_fragment(html)
            
            for action_type, rows in actions.items():
                for row in rows:
                    try:
                        conn.execute("""
                            INSERT INTO src_screener_actions (
                                id, asset_id, action_type, ex_date, title, description
                            ) VALUES (%s, %s, %s, %s, %s, %s)
                            ON CONFLICT (asset_id, action_type, ex_date) DO NOTHING
                        """, (
                            generate_id(), asset["id"], row["action_type"],
                            row["date"], row["title"], row["description"]
                        ))
                    except Exception as e:
                        logger.error(f"DB Error for {identifier}: {e}")
            
            logger.info(f"Updated actions for {identifier}")
            conn.commit()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    run_screener_actions_pipeline()
