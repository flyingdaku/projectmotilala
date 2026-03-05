"""
BSE Bhavcopy Source — download and parse BSE daily price data.

URL Patterns (documented in docs/sources/bse.md):
  2010-2024: https://www.bseindia.com/download/BhsavCopy/Equity/EQ{DDMMYY}_CSV.ZIP
  2024+:     https://www.bseindia.com/download/BhsavCopy/Equity/BhavCopy_BSE_CM_0_0_0_{YYYYMMDD}_F.csv

Data Fields:
  SC_CODE, SC_NAME, SC_GROUP, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, NO_TRADES, NET_TURNOV, NO_OF_SHRS, ISIN

Corner Cases:
  - Pre-2010 data requires legacy FTP endpoint (scripts/fetch_bse_legacy.py)
  - Some days return 0-byte ZIPs (exchange holidays not in our calendar)
  - ISIN may be missing for some SME scrips
"""
from __future__ import annotations

import io
import logging
import zipfile
from datetime import date
from typing import Any, List

import pandas as pd

from core.db import DatabaseConnection, generate_id
from core.registry import SourceIngester, register_source
from core.session import create_bse_session

logger = logging.getLogger(__name__)


def _build_url(trade_date: date) -> List[str]:
    d = trade_date
    urls = []

    # New format (2024+)
    urls.append(
        f"https://www.bseindia.com/download/BhsavCopy/Equity/"
        f"BhavCopy_BSE_CM_0_0_0_{d.strftime('%Y%m%d')}_F.csv"
    )

    # Legacy ZIP format
    urls.append(
        f"https://www.bseindia.com/download/BhsavCopy/Equity/"
        f"EQ{d.strftime('%d%m%y')}_CSV.ZIP"
    )

    return urls


@register_source
class BseBhavcopyIngester(SourceIngester):
    SOURCE_ID = "BSE_BHAVCOPY"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self._session = None

    def _ensure_session(self):
        if self._session is None:
            self._session = create_bse_session()

    def fetch(self, trade_date: date) -> List[Any]:
        self._ensure_session()
        urls = _build_url(trade_date)

        for url in urls:
            try:
                resp = self._session.get(url, timeout=20)
                if resp.status_code == 404:
                    continue
                resp.raise_for_status()

                if url.endswith(".ZIP"):
                    with zipfile.ZipFile(io.BytesIO(resp.content)) as zf:
                        csv_name = [n for n in zf.namelist() if n.endswith(".CSV") or n.endswith(".csv")][0]
                        with zf.open(csv_name) as f:
                            df = pd.read_csv(f)
                else:
                    df = pd.read_csv(io.BytesIO(resp.content))

                df.columns = df.columns.str.strip().str.upper()

                rename_map = {
                    "SC_CODE": "SCRIP_CODE", "SC_NAME": "NAME",
                    "NO_OF_SHRS": "VOLUME", "NET_TURNOV": "TURNOVER",
                    "NO_TRADES": "TRADES",
                }
                df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns}, inplace=True)

                logger.info("[BSE_BHAVCOPY] %s: %d rows", trade_date, len(df))
                return df.to_dict("records")

            except Exception as e:
                logger.warning("[BSE_BHAVCOPY] %s failed (%s): %s", trade_date, url, e)

        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        count = 0
        for row in records:
            isin = str(row.get("ISIN_NO", row.get("ISIN", ""))).strip()
            scrip_code = str(row.get("SCRIP_CODE", "")).strip()
            if not isin and not scrip_code:
                continue

            # Resolve asset
            asset_row = conn.fetchone(
                "SELECT id FROM assets WHERE isin = ? OR bse_code = ? LIMIT 1",
                (isin, scrip_code),
            )
            if not asset_row:
                continue

            conn.execute(
                """INSERT OR IGNORE INTO daily_prices
                   (asset_id, date, open, high, low, close, volume, trades, source_exchange)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'BSE')""",
                (
                    asset_row["id"], row.get("DATE", ""),
                    row.get("OPEN"), row.get("HIGH"),
                    row.get("LOW"), row.get("CLOSE"),
                    row.get("VOLUME"), row.get("TRADES"),
                ),
            )
            count += 1

        return count
