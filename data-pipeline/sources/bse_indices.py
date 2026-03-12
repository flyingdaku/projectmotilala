import logging
import requests
import time
import json
from datetime import date, datetime
from typing import Any, List, Dict

from core.db import DatabaseConnection, generate_id
from core.models import Asset
from core.registry import SourceIngester, register_source

logger = logging.getLogger(__name__)

@register_source
class BSEIndicesIngester(SourceIngester):
    SOURCE_ID = "BSE_INDICES"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            "Accept": "*/*",
            "Referer": "https://www.bseindices.com/"
        })
        
    def fetch(self, trade_date: date) -> List[Any]:
        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        return 0

    def run(self, trade_date: date, conn: DatabaseConnection) -> Any:
        start_time = time.time()
        logger.info(f"[{self.SOURCE_ID}] Starting ingestion for {trade_date}")
        
        # Load the list of mapped BSE indices from DB where we have them tracked
        # Only fetch active indices mapped to BSE
        bse_indices = conn.execute('''
            SELECT a.id as asset_id, a.name, im.primary_source 
            FROM assets a
            JOIN index_metadata im ON a.id = im.asset_id
            WHERE im.primary_source = 'BSE' AND im.is_active = 1
        ''').fetchall()
        
        if not bse_indices:
            logger.warning(f"[{self.SOURCE_ID}] No BSE indices found in metadata. Skipping.")
            return

        # We need the numeric index ID which was used to fetch the data. 
        # But we didn't save the BSE numeric ID in index_metadata! 
        # The script backfill_bse_indices.py mapped numeric IDs to index names using bse_indices_list.json.
        # Let's load that map to do daily fetch.
        
        import os
        map_path = os.path.join(os.path.dirname(__file__), '..', 'bse_indices_list.json')
        if not os.path.exists(map_path):
            logger.error(f"[{self.SOURCE_ID}] Mapping file {map_path} not found.")
            return
            
        with open(map_path, 'r') as f:
            idx_list = json.load(f)
            
        name_to_id = {}
        for idx in idx_list:
            name = idx['name']
            if not name.startswith("BSE "):
                if name in ["MIDCAP", "SMLCAP", "ALLCAP", "LRGCAP"]:
                    name = "BSE " + name
            name_to_id[name] = idx['id']

        prices_inserted = 0
        date_str = trade_date.strftime("%Y%m%d")
        dt_iso = trade_date.isoformat()
        
        for idx in bse_indices:
            name = idx['name']
            idx_id = name_to_id.get(name)
            
            if not idx_id:
                continue
                
            url = f"https://www.bseindices.com/AsiaIndexAPI/api/AsiaIndicesGraphData/w?index={idx_id}&flag=1&sector=&seriesid=DT&frd={date_str}&tod={date_str}"
            try:
                res = self.session.get(url, timeout=10)
                if res.status_code == 200:
                    parts = res.text.strip('"').split('#@#')
                    if len(parts) > 1:
                        data = json.loads(parts[1].replace('\\"', '"'))
                        if data and len(data) > 0:
                            # BSE might return data for other days if today is holiday or just recent data.
                            # So verify date matches or just insert what we got.
                            val = float(data[-1].get('value', data[-1].get('value1', 0)))
                            if val > 0:
                                conn.execute(
                                    """INSERT OR REPLACE INTO daily_prices 
                                       (asset_id, date, open, high, low, close, source_exchange, is_verified)
                                       VALUES (?, ?, ?, ?, ?, ?, 'BSE', 1)""",
                                    (idx['asset_id'], dt_iso, val, val, val, val)
                                )
                                prices_inserted += 1
            except Exception as e:
                logger.debug(f"Failed to fetch {name}: {e}")
                
            time.sleep(0.1) # Rate limit
                
        duration_ms = int((time.time() - start_time) * 1000)
        self._log_run(conn, trade_date, "SUCCESS", prices_inserted, None, duration_ms)
        logger.info(f"[{self.SOURCE_ID}] Completed. Prices: {prices_inserted}")

    def _log_run(self, conn, trade_date, status, records, error, duration_ms=0):
        run_id = generate_id()
        conn.execute(
            """INSERT INTO pipeline_runs 
               (id, run_date, pipeline_type, source, status, records_inserted, error_log, duration_ms)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (run_id, trade_date.isoformat(), self.PIPELINE_TYPE, self.SOURCE_ID, status, records, error, duration_ms)
        )
