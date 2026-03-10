import logging
import requests
import time
import json
from datetime import date, datetime
from typing import Any, List, Dict, Tuple

from core.db import DatabaseConnection, generate_id
from core.models import Asset
from core.registry import SourceIngester, register_source

logger = logging.getLogger(__name__)

@register_source
class NiftyIndicesIngester(SourceIngester):
    SOURCE_ID = "NIFTY_INDICES"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
        })
        # Prime the session
        try:
            self.session.get("https://www.nseindia.com", timeout=15)
            self.session.get("https://www.niftyindices.com", timeout=15)
        except Exception as e:
            logger.warning(f"Failed to prime session for NIFTY_INDICES: {e}")

    def get_all_indices(self) -> List[Dict[str, str]]:
        """Fetch list of all indices from NSE API."""
        url = "https://www.nseindia.com/api/allIndices"
        try:
            resp = self.session.get(url, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                return data.get('data', [])
            else:
                logger.error(f"Failed to fetch indices list, status {resp.status_code}")
        except Exception as e:
            logger.error(f"Error fetching indices list: {e}")
        return []

    def get_index_constituents(self, index_name: str) -> List[Dict[str, Any]]:
        """Fetch real-time constituents and weights for an index from NSE API."""
        import urllib.parse
        encoded_name = urllib.parse.quote(index_name)
        url = f"https://www.nseindia.com/api/equity-stockIndices?index={encoded_name}"
        try:
            resp = self.session.get(url, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                # NSE returns index itself as the first item (priority 1), actual constituents follow (priority 0)
                constituents = [item for item in data.get('data', []) if item.get('priority', 0) == 0]
                
                # Calculate total FFMC to derive weights since it isn't explicitly returned as a percentage
                total_ffmc = sum([c.get('ffmc', 0) for c in constituents])
                
                results = []
                for c in constituents:
                    sym = c.get('symbol')
                    ffmc = c.get('ffmc', 0)
                    if sym and total_ffmc > 0:
                        weight = (ffmc / total_ffmc) * 100.0
                        results.append({
                            'symbol': sym,
                            'weight': weight,
                            'ffmc': ffmc
                        })
                return results
        except Exception as e:
            logger.warning(f"Error fetching constituents for {index_name}: {e}")
        return []

    def fetch(self, trade_date: date) -> List[Any]:
        # Implementation of fetch is complex because this source pulls multiple things:
        # 1. Master list of indices
        # 2. Constituents per index
        # 3. Daily OHLC for indices
        # It's better implemented directly in run()
        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        # Handled in run()
        return 0
        
    def _resolve_asset_id(self, conn: DatabaseConnection, symbol: str, name: str, is_index: bool = False) -> str:
        """Find or create asset and return its ID."""
        if is_index:
            row = conn.execute("SELECT id FROM assets WHERE asset_class = 'INDEX' AND nse_symbol = ?", (symbol,)).fetchone()
        else:
            row = conn.execute("SELECT id FROM assets WHERE nse_symbol = ?", (symbol,)).fetchone()
            
        if row:
            return row['id']
            
        new_id = generate_id()
        asset_class = 'INDEX' if is_index else 'EQUITY'
        conn.execute(
            """INSERT INTO assets (id, nse_symbol, name, asset_class, is_active)
               VALUES (?, ?, ?, ?, 1)""",
            (new_id, symbol, name, asset_class)
        )
        return new_id

    def run(self, trade_date: date, conn: DatabaseConnection) -> Any:
        start_time = time.time()
        logger.info(f"[{self.SOURCE_ID}] Starting ingestion for {trade_date}")
        
        indices = self.get_all_indices()
        if not indices:
            logger.error(f"[{self.SOURCE_ID}] Failed to get indices list. Aborting.")
            self._log_run(conn, trade_date, "FAILED", 0, "Failed to get indices list")
            return
            
        logger.info(f"[{self.SOURCE_ID}] Found {len(indices)} indices to process.")
        
        prices_inserted = 0
        constituents_inserted = 0
        
        for idx_data in indices:
            idx_name = idx_data.get('indexSymbol')
            if not idx_name:
                continue
                
            idx_symbol = f"^{idx_name.upper().replace(' ', '')}"
            idx_id = self._resolve_asset_id(conn, idx_symbol, idx_name, is_index=True)
            
            # Fetch daily close data (today's close comes directly from the allIndices endpoint)
            last_price = idx_data.get('last')
            open_price = idx_data.get('open')
            high_price = idx_data.get('high')
            low_price = idx_data.get('low')
            
            if last_price:
                # Upsert daily price
                conn.execute(
                    """INSERT OR REPLACE INTO daily_prices 
                       (asset_id, date, open, high, low, close, source_exchange, is_verified)
                       VALUES (?, ?, ?, ?, ?, ?, 'NSE', 1)""",
                    (idx_id, trade_date.isoformat(), open_price, high_price, low_price, last_price)
                )
                prices_inserted += 1
                
            # Fetch constituents
            constituents = self.get_index_constituents(idx_name)
            time.sleep(0.5) # Rate limiting
            
            for c in constituents:
                stock_id = self._resolve_asset_id(conn, c['symbol'], c['symbol'], is_index=False)
                conn.execute(
                    """INSERT OR REPLACE INTO index_constituents
                       (index_id, asset_id, date, weight, ffmc)
                       VALUES (?, ?, ?, ?, ?)""",
                    (idx_id, stock_id, trade_date.isoformat(), c['weight'], c['ffmc'])
                )
                constituents_inserted += 1
                
        duration_ms = int((time.time() - start_time) * 1000)
        self._log_run(conn, trade_date, "SUCCESS", prices_inserted + constituents_inserted, None, duration_ms)
        logger.info(f"[{self.SOURCE_ID}] Completed. Prices: {prices_inserted}, Constituents: {constituents_inserted}")

    def _log_run(self, conn, trade_date, status, records, error, duration_ms=0):
        run_id = generate_id()
        conn.execute(
            """INSERT INTO pipeline_runs 
               (id, run_date, pipeline_type, source, status, records_inserted, error_log, duration_ms)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (run_id, trade_date.isoformat(), self.PIPELINE_TYPE, self.SOURCE_ID, status, records, error, duration_ms)
        )
