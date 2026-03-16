#!/usr/bin/env python3
"""
Build EODHD symbol mapping for NSE/BSE/MCX assets — active AND delisted.

This script:
1. Fetches EODHD symbol lists for NSE, BSE, MCX (active + delisted tickers)
2. Matches with our assets table by ISIN (primary — most reliable)
3. Falls back to symbol code + name matching
4. Inserts/updates eodhd_symbol_mapping with is_delisted flag
5. Reports unmapped assets to logs/eodhd_unmapped_assets.json

Delisted coverage:
  EODHD provides EOD history for ALL delisted companies.
  Fundamentals + CA only for companies delisted after 2018.
  We flag is_delisted=1 so backfill can target those symbols.

Usage:
    python scripts/build_eodhd_mapping.py           # incremental
    python scripts/build_eodhd_mapping.py --refresh  # full rebuild
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.db import get_connection, generate_id
from sources.eodhd.client import EODHDClient

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger(__name__)

# EODHD valid Indian exchanges:
# - NSE: all Indian equities (NSE-listed + some BSE-only) + MFs/ETFs
# BSE is NOT a valid EODHD exchange code (returns 404).
EXCHANGES = ["NSE"]


def _norm(s: str) -> str:
    """Normalise a symbol/name for fuzzy matching."""
    return s.upper().replace("-", "").replace("_", "").replace(".", "").replace(" ", "").replace("&", "AND")


def fetch_all_symbols(client: EODHDClient) -> Dict[str, List[Dict]]:
    """
    Fetch active + delisted symbol lists for all Indian exchanges.

    Returns {exchange: [symbol_dicts]}.  Each dict has:
      Code, Name, Country, Exchange, Currency, Type, Isin
    The delisted tickers come from a second call with &delisted=1;
    we tag each with _is_delisted=True before merging.
    """
    all_symbols: Dict[str, List[Dict]] = {}

    for exchange in EXCHANGES:
        active   = client.get_exchange_symbols(exchange, include_delisted=False)
        delisted = client.get_exchange_symbols(exchange, include_delisted=True)

        # tag the ones that appear only in the delisted list
        active_codes = {s.get("Code", "").upper() for s in active}
        merged = list(active)
        for sym in delisted:
            code = sym.get("Code", "").upper()
            if code not in active_codes:
                sym = dict(sym)          # copy so we don't mutate cached data
                sym["_is_delisted"] = True
                merged.append(sym)

        all_symbols[exchange] = merged
        logger.info(
            f"[{exchange}] {len(active)} active + "
            f"{len(merged) - len(active)} delisted = {len(merged)} total"
        )

    return all_symbols


def build_indexes(all_symbols: Dict[str, List[Dict]]) -> Tuple[Dict, Dict]:
    """
    Build two lookup indexes from EODHD symbol data:
      isin_idx:  isin → {exchange → symbol_dict}
      code_idx:  normalised_code → {exchange → symbol_dict}
    """
    isin_idx: Dict[str, Dict] = {}
    code_idx: Dict[str, Dict] = {}

    for exchange, symbols in all_symbols.items():
        for sym in symbols:
            isin = (sym.get("Isin") or "").strip()
            code = sym.get("Code", "")
            name = sym.get("Name", "")

            if isin:
                if isin not in isin_idx:
                    isin_idx[isin] = {}
                isin_idx[isin][exchange] = sym

            for key in (_norm(code), _norm(name)):
                if not key:
                    continue
                if key not in code_idx:
                    code_idx[key] = {}
                # Prefer active over delisted in fallback index
                if exchange not in code_idx[key] or not sym.get("_is_delisted"):
                    code_idx[key][exchange] = sym

    return isin_idx, code_idx


def _resolve(asset: Any, isin_idx: Dict, code_idx: Dict) -> Tuple[Optional[str], Optional[str], Optional[str], str, bool]:
    """
    Try to find EODHD NSE/BSE symbols for one asset row.

    Returns: (nse_symbol, bse_symbol, match_method, exchange_preference, is_delisted)
    """
    isin       = (asset["isin"] or "").strip()
    nse_symbol = asset["nse_symbol"] or ""
    bse_code   = asset["bse_code"] or ""
    name       = asset["name"] or ""

    nse_sym = bse_sym = None
    method  = "none"
    delisted = False

    # ── 1. ISIN match (most reliable) ─────────────────────────
    if isin and isin in isin_idx:
        hits = isin_idx[isin]
        if "NSE" in hits:
            nse_sym  = f"{hits['NSE']['Code']}.NSE"
            delisted = bool(hits["NSE"].get("_is_delisted"))
        if "BSE" in hits:
            bse_sym  = f"{hits['BSE']['Code']}.BSE"
            if not delisted:
                delisted = bool(hits["BSE"].get("_is_delisted"))
        if nse_sym or bse_sym:
            method = "isin"

    # ── 2. Symbol / name fallback ──────────────────────────────
    if not nse_sym and not bse_sym:
        for key in (_norm(nse_symbol), _norm(bse_code), _norm(name)):
            if not key:
                continue
            if key in code_idx:
                hits = code_idx[key]
                if "NSE" in hits and not nse_sym:
                    nse_sym  = f"{hits['NSE']['Code']}.NSE"
                    delisted = bool(hits["NSE"].get("_is_delisted"))
                if "BSE" in hits and not bse_sym:
                    bse_sym  = f"{hits['BSE']['Code']}.BSE"
                if nse_sym or bse_sym:
                    method = "symbol" if key in (_norm(nse_symbol), _norm(bse_code)) else "name"
                    break

    # ── Determine exchange preference ──────────────────────────
    pref = None
    if nse_sym and asset["nse_listed"]:
        pref = "NSE"
    elif bse_sym and asset["bse_listed"]:
        pref = "BSE"
    elif nse_sym:
        pref = "NSE"
    elif bse_sym:
        pref = "BSE"

    return nse_sym, bse_sym, pref, method, delisted



def build_mappings(refresh: bool = False) -> Dict[str, Any]:
    """
    Build/update eodhd_symbol_mapping for all equity assets (active + delisted).
    """
    client      = EODHDClient()
    all_symbols = fetch_all_symbols(client)
    isin_idx, code_idx = build_indexes(all_symbols)

    stats = {
        "total": 0, "mapped_by_isin": 0, "mapped_by_symbol": 0,
        "unmapped": 0, "nse_mapped": 0, "bse_mapped": 0,
        "dual_mapped": 0, "delisted_mapped": 0,
    }
    unmapped: List[Dict] = []
    now = datetime.now().isoformat()

    with get_connection() as conn:
        if refresh:
            logger.info("Clearing existing EODHD mappings (--refresh)...")
            conn.execute("DELETE FROM eodhd_symbol_mapping")

        # All equities: active AND inactive (for delisted coverage)
        assets = conn.execute("""
            SELECT id, isin, nse_symbol, bse_code, name,
                   nse_listed, bse_listed, is_active
            FROM   assets
            WHERE  asset_class IN ('EQUITY', 'ETF')
        """).fetchall()

        stats["total"] = len(assets)
        logger.info(f"Processing {len(assets)} equity assets (active + delisted)...")

        for asset in assets:
            nse_sym, bse_sym, pref, method, is_delisted = _resolve(asset, isin_idx, code_idx)

            if not nse_sym and not bse_sym:
                stats["unmapped"] += 1
                unmapped.append({
                    "asset_id":   asset["id"],
                    "nse_symbol": asset["nse_symbol"],
                    "bse_code":   asset["bse_code"],
                    "name":       asset["name"],
                    "isin":       asset["isin"],
                })
                continue

            conn.execute("""
                INSERT OR REPLACE INTO eodhd_symbol_mapping
                (asset_id, eodhd_nse_symbol, eodhd_bse_symbol, isin,
                 exchange_preference, is_active, is_delisted,
                 match_method, last_verified, notes)
                VALUES (?,?,?,?,?,1,?,?,?,?)
            """, (
                asset["id"], nse_sym, bse_sym, asset["isin"],
                pref, 1 if is_delisted else 0,
                method, now,
                f"mapped by {method}{' (delisted)' if is_delisted else ''}",
            ))

            if method == "isin":
                stats["mapped_by_isin"] += 1
            else:
                stats["mapped_by_symbol"] += 1
            if nse_sym:
                stats["nse_mapped"] += 1
            if bse_sym:
                stats["bse_mapped"] += 1
            if nse_sym and bse_sym:
                stats["dual_mapped"] += 1
            if is_delisted:
                stats["delisted_mapped"] += 1

    # Report
    logger.info("=" * 60)
    logger.info("EODHD Symbol Mapping Results:")
    for k, v in stats.items():
        logger.info(f"  {k:<22} {v}")
    logger.info("=" * 60)

    if unmapped:
        rpt = Path(__file__).parent.parent / "logs" / "eodhd_unmapped_assets.json"
        rpt.parent.mkdir(exist_ok=True)
        rpt.write_text(json.dumps(unmapped, indent=2))
        logger.info(f"Unmapped assets ({len(unmapped)}) → {rpt}")

    return stats


def main():
    parser = argparse.ArgumentParser(description="Build EODHD symbol mappings")
    parser.add_argument("--refresh", action="store_true",
                        help="Rebuild all mappings from scratch")
    args = parser.parse_args()

    logger.info("Starting EODHD symbol mapping build...")
    try:
        stats = build_mappings(refresh=args.refresh)
        mapped = stats["total"] - stats["unmapped"]
        pct    = mapped / stats["total"] * 100 if stats["total"] else 0
        logger.info(f"Coverage: {mapped}/{stats['total']} ({pct:.1f}%)")
        if pct < 80:
            logger.warning("Coverage below 80% — check MCX/BSE symbol availability")
        logger.info("Done.")
    except Exception as exc:
        logger.error(f"Mapping build failed: {exc}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
