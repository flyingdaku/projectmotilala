import argparse
import logging
import os
import pathlib
from datetime import date
from typing import Optional

from core.db import get_connection
from sources.cogencis import CogencisFundamentalsIngester, upsert_cogencis_company_map


def _load_dotenv() -> None:
    env_path = pathlib.Path(__file__).parent.parent / ".env"
    if not env_path.exists():
        return
    with env_path.open() as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


_load_dotenv()

logger = logging.getLogger(__name__)


def _resolve_asset_id(conn, asset_id: Optional[str] = None, symbol: Optional[str] = None, isin: Optional[str] = None) -> str:
    if asset_id:
        row = conn.fetchone("SELECT id FROM assets WHERE id = ?", (asset_id,))
        if row:
            return row["id"]
        raise ValueError(f"Asset id not found: {asset_id}")
    if symbol:
        row = conn.fetchone(
            """SELECT id FROM assets
               WHERE nse_symbol = ? OR bse_code = ? OR screener_id = ?
               ORDER BY is_active DESC LIMIT 1""",
            (symbol, symbol, symbol),
        )
        if row:
            return row["id"]
        raise ValueError(f"Asset symbol not found: {symbol}")
    if isin:
        row = conn.fetchone("SELECT id FROM assets WHERE isin = ? LIMIT 1", (isin,))
        if row:
            return row["id"]
        raise ValueError(f"Asset ISIN not found: {isin}")
    raise ValueError("Provide asset_id, symbol, or isin")


def run_cogencis_fundamentals(
    trade_date: date,
    asset_id: Optional[str] = None,
    symbol: Optional[str] = None,
    isin: Optional[str] = None,
    company_url: Optional[str] = None,
    page_limit: int = 30,
    delay_seconds: float = 0.75,
    bearer_token: Optional[str] = None,
    cookie: Optional[str] = None,
):
    if bearer_token:
        os.environ["COGENCIS_BEARER_TOKEN"] = bearer_token
    if cookie:
        os.environ["COGENCIS_COOKIE"] = cookie
    with get_connection() as conn:
        target_asset_id = None
        if company_url or asset_id or symbol or isin:
            target_asset_id = _resolve_asset_id(conn, asset_id=asset_id, symbol=symbol, isin=isin)
        if company_url:
            upsert_cogencis_company_map(conn, target_asset_id, company_url)
        ingester = CogencisFundamentalsIngester(
            page_limit=page_limit,
            delay_seconds=delay_seconds,
            asset_ids=[target_asset_id] if target_asset_id else None,
        )
        run = ingester.run(trade_date, conn)
        logger.info("[COGENCIS] status=%s inserted=%s", run.status, run.records_inserted)
        return run


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    parser = argparse.ArgumentParser(description="Run Cogencis fundamentals scrape")
    parser.add_argument("date", nargs="?", default=date.today().isoformat())
    parser.add_argument("--asset-id")
    parser.add_argument("--symbol")
    parser.add_argument("--isin")
    parser.add_argument("--company-url")
    parser.add_argument("--page-limit", type=int, default=30)
    parser.add_argument("--delay-seconds", type=float, default=0.75)
    parser.add_argument(
        "--bearer-token",
        default=os.getenv("COGENCIS_BEARER_TOKEN", ""),
        help="Bearer token for data.cogencis.com API (or set COGENCIS_BEARER_TOKEN env var)",
    )
    parser.add_argument(
        "--cookie",
        default=os.getenv("COGENCIS_COOKIE", ""),
        help="Full Cookie header string (or set COGENCIS_COOKIE env var)",
    )
    args = parser.parse_args()
    run_cogencis_fundamentals(
        trade_date=date.fromisoformat(args.date),
        asset_id=args.asset_id,
        symbol=args.symbol,
        isin=args.isin,
        company_url=args.company_url,
        page_limit=args.page_limit,
        delay_seconds=args.delay_seconds,
        bearer_token=args.bearer_token or None,
        cookie=args.cookie or None,
    )
