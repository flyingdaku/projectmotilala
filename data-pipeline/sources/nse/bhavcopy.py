"""
NSE Bhavcopy Source — download and parse NSE daily price data.

Wraps the existing logic from pipelines/nse_bhavcopy.py into the
SourceIngester interface.

URL Patterns (documented in docs/sources/nse.md):
  Pre-2016:  https://nsearchives.nseindia.com/content/historical/EQUITIES/{YYYY}/{MMM}/cm{DD}{MMM}{YYYY}bhav.csv.zip
  Post-2016: https://nsearchives.nseindia.com/products/content/sec_bhavdata_full_{DD}{MM}{YYYY}.csv
  2024+:     https://nsearchives.nseindia.com/content/cm/BhavCopy_NSE_CM_0_0_0_{YYYYMMDD}_{N}.csv.zip

Data Fields:
  SYMBOL, SERIES, OPEN, HIGH, LOW, CLOSE, LAST, PREVCLOSE, TOTTRDQTY, TOTTRDVAL, TOTALTRADES, ISIN

Corner Cases:
  - Pre-2010: some ZIPs use different internal filenames
  - Symbol changes: tracked via corporate actions
  - Series filtering: only EQ/BE/BZ series for equity prices
"""
from __future__ import annotations

import io
import logging
import zipfile
from datetime import date
from typing import Any, List

import pandas as pd

from core.db import DatabaseConnection, generate_id
from core.models import PriceBar, Asset
from core.registry import SourceIngester, register_source
from core.session import create_nse_session

logger = logging.getLogger(__name__)


# ── URL generators ────────────────────────────────────────────────────────────

def _build_url(trade_date: date) -> List[str]:
    """
    Return candidate URLs for the NSE Bhavcopy, ordered newest format first.
    Multiple URLs are returned because the format changed over the years.
    """
    d = trade_date
    mon = d.strftime("%b").upper()
    urls = []

    # Format 3: 2024+ new CSV ZIP format
    urls.append(
        f"https://nsearchives.nseindia.com/content/cm/"
        f"BhavCopy_NSE_CM_0_0_0_{d.strftime('%Y%m%d')}_F.csv.zip"
    )

    # Format 2: 2016-2024 full bhavdata CSV (no ZIP)
    urls.append(
        f"https://nsearchives.nseindia.com/products/content/"
        f"sec_bhavdata_full_{d.strftime('%d%m%Y')}.csv"
    )

    # Format 1: Pre-2016 historical ZIP
    urls.append(
        f"https://nsearchives.nseindia.com/content/historical/EQUITIES/"
        f"{d.year}/{mon}/cm{d.strftime('%d')}{mon}{d.year}bhav.csv.zip"
    )

    return urls


# ── Parser ────────────────────────────────────────────────────────────────────

EQUITY_SERIES = {"EQ", "BE", "BZ", "SM", "ST"}


def parse_bhavcopy(content: bytes, is_zip: bool = True) -> pd.DataFrame:
    """
    Parse Bhavcopy content (ZIP or plain CSV) into a DataFrame.
    Normalises column names across all format generations.
    """
    if is_zip:
        with zipfile.ZipFile(io.BytesIO(content)) as zf:
            csv_name = [n for n in zf.namelist() if n.endswith(".csv")][0]
            with zf.open(csv_name) as f:
                df = pd.read_csv(f)
    else:
        df = pd.read_csv(io.BytesIO(content))

    # Normalise column names (strip whitespace, uppercase)
    df.columns = df.columns.str.strip().str.upper().str.replace(" ", "_")

    # Rename variants to canonical names
    rename_map = {
        "TOTTRDQTY": "VOLUME", "TTL_TRD_QNTY": "VOLUME", "TOTAL_TRADED_QUANTITY": "VOLUME", "TTLTRADGVOL": "VOLUME",
        "TOTTRDVAL": "TURNOVER", "TTL_TRD_VAL": "TURNOVER",
        "TOTALTRADES": "TRADES", "NO_OF_TRADES": "TRADES", "TTLNBOFTXSEXCTD": "TRADES",
        "PREV_CLOSE": "PREVCLOSE", "PREVIOUS_CLOSE": "PREVCLOSE", "PRVSCLSGPRIC": "PREVCLOSE",
        "TCKRSYMB": "SYMBOL", "SCTYSRS": "SERIES",
        "OPNPRIC": "OPEN", "HGHPRIC": "HIGH", "LWPRIC": "LOW", "CLSPRIC": "CLOSE", "LASTPRIC": "LAST",
        "TRADDT": "TIMESTAMP"
    }
    df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns}, inplace=True)

    # Filter to equity series only
    if "SERIES" in df.columns:
        df = df[df["SERIES"].isin(EQUITY_SERIES)]

    return df


# ── Ingester ──────────────────────────────────────────────────────────────────

@register_source
class NseBhavcopyIngester(SourceIngester):
    """
    Downloads and ingests NSE Bhavcopy for a single trading day.

    Registered as SOURCE_ID="NSE_BHAVCOPY" in the source registry.
    """
    SOURCE_ID = "NSE_BHAVCOPY"
    PIPELINE_TYPE = "DAILY"

    def __init__(self):
        self._session = None

    def _ensure_session(self):
        if self._session is None:
            self._session = create_nse_session()

    def fetch(self, trade_date: date) -> List[Any]:
        """Download Bhavcopy and return parsed DataFrame rows as dicts."""
        self._ensure_session()
        urls = _build_url(trade_date)

        for url in urls:
            try:
                resp = self._session.get(url, timeout=20)
                if resp.status_code == 404:
                    continue
                resp.raise_for_status()

                is_zip = url.endswith(".zip")
                df = parse_bhavcopy(resp.content, is_zip=is_zip)

                logger.info(
                    "[NSE_BHAVCOPY] %s: %d rows from %s",
                    trade_date, len(df), url.split("/")[-1],
                )
                return df.to_dict("records")

            except Exception as e:
                logger.warning("[NSE_BHAVCOPY] %s failed (%s): %s", trade_date, url, e)

        logger.error("[NSE_BHAVCOPY] All URLs failed for %s", trade_date)
        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        """
        Upsert parsed bhavcopy rows into assets + daily_prices.

        This is a simplified version of the ingestion logic.
        The full production logic in pipelines/nse_bhavcopy.py handles
        additional edge cases (symbol changes, delisted stocks, etc.)
        and should be used for production runs.
        """
        count = 0
        for row in records:
            symbol = row.get("SYMBOL", "").strip()
            isin = row.get("ISIN", "").strip()
            if not symbol or not isin:
                continue

            # Resolve asset_id
            asset_row = conn.fetchone(
                "SELECT id FROM assets WHERE isin = ? OR nse_symbol = ? LIMIT 1",
                (isin, symbol),
            )
            if not asset_row:
                continue

            asset_id = asset_row["id"]
            trade_date = row.get("DATE1", row.get("TIMESTAMP", "")).strip()

            # Normalise date
            if trade_date and len(trade_date) > 10:
                try:
                    from datetime import datetime
                    trade_date = datetime.strptime(trade_date, "%d-%b-%Y").strftime("%Y-%m-%d")
                except Exception:
                    pass

            conn.execute(
                """INSERT OR REPLACE INTO daily_prices
                   (asset_id, date, open, high, low, close, volume, trades, source_exchange)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NSE')""",
                (
                    asset_id, trade_date,
                    row.get("OPEN"), row.get("HIGH"),
                    row.get("LOW"), row.get("CLOSE"),
                    row.get("VOLUME"), row.get("TRADES"),
                ),
            )
            count += 1

        return count
