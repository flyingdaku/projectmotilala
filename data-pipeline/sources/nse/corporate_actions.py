"""
NSE Corporate Actions Source.

Fetches corporate actions (bonus, split, dividend, etc.) from the NSE API.
Implements the SourceIngester interface.
"""
from __future__ import annotations

import logging
import json
from datetime import date
from typing import Any, List

from core.db import DatabaseConnection, generate_id
from core.models import CorporateAction
from core.registry import SourceIngester, register_source
from core.session import create_nse_session

logger = logging.getLogger(__name__)

NSE_CORP_ACTIONS_URL = (
    "https://www.nseindia.com/api/corporates-corporateActions"
    "?index=equities&from_date={from_date}&to_date={to_date}"
)


@register_source
class NseCorporateActionsIngester(SourceIngester):
    SOURCE_ID = "NSE_CORP_ACTIONS"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self._session = None

    def _ensure_session(self):
        if self._session is None:
            self._session = create_nse_session()

    def fetch(self, trade_date: date) -> List[Any]:
        self._ensure_session()
        from_str = trade_date.strftime("%d-%m-%Y")
        to_str = trade_date.strftime("%d-%m-%Y")
        url = NSE_CORP_ACTIONS_URL.format(from_date=from_str, to_date=to_str)

        try:
            resp = self._session.get(url, timeout=15)
            if resp.status_code == 404:
                return []
            resp.raise_for_status()

            # The response is usually a list of dicts directly, 
            # or a dict with a "data" key depending on the endpoint variant.
            data = resp.json()
            if isinstance(data, list):
                return data
            return data.get("data", [])
            
        except Exception as e:
            logger.error("[NSE_CORP_ACTIONS] Fetch failed for %s: %s", trade_date, e)
            return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        """
        Write corporate actions into the DB.
        NOTE: Simplified mapping for the refactor. Full logic remains in 
        pipelines/corporate_actions.py for processing adjustment factors.
        """
        count = 0
        for row in records:
            symbol = row.get("symbol", "").strip()
            if not symbol:
                continue

            asset_row = conn.fetchone(
                "SELECT id FROM assets WHERE nse_symbol = ? LIMIT 1",
                (symbol,)
            )
            if not asset_row:
                continue

            action_str = row.get("subject", "").upper()
            action_type = "OTHER"
            if "SPLIT" in action_str:
                action_type = "SPLIT"
            elif "BONUS" in action_str:
                action_type = "BONUS"
            elif "DIVIDEND" in action_str:
                action_type = "DIVIDEND"
            elif "FACE VALUE" in action_str:
                action_type = "FACE_VALUE_CHANGE"

            ex_date = row.get("exDate")
            if not ex_date or ex_date == "-":
                continue
                
            # Normalize ex_date
            try:
                from datetime import datetime
                ex_date = datetime.strptime(ex_date, "%d-%b-%Y").strftime("%Y-%m-%d")
            except Exception:
                pass

            ca = CorporateAction(
                id=generate_id(),
                asset_id=asset_row["id"],
                action_type=action_type,
                ex_date=ex_date,
                record_date=row.get("recordDate"),
                announcement_date=row.get("compDate"),
                source_exchange="NSE",
                raw_announcement=action_str,
            )

            conn.execute(
                """INSERT OR IGNORE INTO src_nse_corporate_actions
                   (id, asset_id, symbol, series, subject, ex_date, record_date, bc_start_date, bc_end_date, nd_start_date, nd_end_date, company_name, isin, face_value, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    ca.id, ca.asset_id, row.get("symbol"), row.get("series"), row.get("subject"), 
                    ca.ex_date, row.get("recordDate"), row.get("bcStartDate"), row.get("bcEndDate"), 
                    row.get("ndStartDate"), row.get("ndEndDate"), row.get("comp"), row.get("isin"), 
                    row.get("faceVal"), json.dumps(row)
                )
            )
            count += 1
            
        return count
