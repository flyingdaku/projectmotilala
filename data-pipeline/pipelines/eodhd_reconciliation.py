#!/usr/bin/env python3
"""
EODHD Price Reconciliation Engine.

Compares NSE/BSE/EODHD prices and flags discrepancies for data quality monitoring.

Rules:
- Close price deviation >0.5% → MINOR_DEVIATION
- Close price deviation >2% → MAJOR_DEVIATION (alert)
- Adj close deviation >2% → MAJOR_DEVIATION (alert + CA audit)
- Volume deviation >50% → Flag for review
- Missing in primary source but present in EODHD → EODHD_ONLY
"""

from __future__ import annotations

import json
import logging
from datetime import date, datetime
from typing import Any, Dict, List, Optional, Tuple

from core.db import get_connection, get_prices_db, generate_id
from utils.alerts import send_telegram_alert

logger = logging.getLogger(__name__)

# Deviation thresholds
CLOSE_MINOR_THRESHOLD = 0.5  # percent
CLOSE_MAJOR_THRESHOLD = 2.0  # percent
ADJ_CLOSE_THRESHOLD = 2.0    # percent
VOLUME_THRESHOLD = 50.0      # percent


def calculate_deviation_pct(value1: Optional[float], value2: Optional[float]) -> Optional[float]:
    """Calculate percentage deviation between two values."""
    if value1 is None or value2 is None or value1 == 0:
        return None
    
    return abs((value2 - value1) / value1 * 100)


def get_price_data(meta_conn, prices_conn, asset_id: str, trade_date: date, source: str) -> Optional[Dict[str, Any]]:
    """Get price data for an asset from a specific source."""
    if source in ("NSE", "BSE"):
        row = prices_conn.execute("""
            SELECT close, adj_close, volume
            FROM daily_prices
            WHERE asset_id = %s AND date = %s AND source_exchange = %s
        """, (asset_id, trade_date.isoformat(), source)).fetchone()
    elif source in ("EODHD_NSE", "EODHD_BSE"):
        exchange = source.replace("EODHD_", "")
        row = meta_conn.execute("""
            SELECT close, adjusted_close as adj_close, volume
            FROM eodhd_daily_prices
            WHERE asset_id = %s AND date = %s AND exchange = %s
        """, (asset_id, trade_date.isoformat(), exchange)).fetchone()
    else:
        return None

    if row:
        return {
            "close": row["close"],
            "adj_close": row["adj_close"],
            "volume": row["volume"]
        }

    return None


def determine_status_and_flags(
    nse_data: Optional[Dict],
    bse_data: Optional[Dict],
    eodhd_nse_data: Optional[Dict],
    eodhd_bse_data: Optional[Dict]
) -> Tuple[str, List[str]]:
    """
    Determine reconciliation status and flags based on price comparisons.
    
    Returns:
        Tuple of (status, flags)
    """
    flags = []
    
    # Check if we have any data
    if not any([nse_data, bse_data, eodhd_nse_data, eodhd_bse_data]):
        return "MISSING_SOURCE", ["no_data_available"]
    
    # Check if EODHD-only
    if (eodhd_nse_data or eodhd_bse_data) and not (nse_data or bse_data):
        return "EODHD_ONLY", ["eodhd_only_source"]
    
    # Compare NSE vs EODHD NSE
    if nse_data and eodhd_nse_data:
        close_dev = calculate_deviation_pct(nse_data["close"], eodhd_nse_data["close"])
        if close_dev is not None:
            if close_dev > CLOSE_MAJOR_THRESHOLD:
                flags.append(f"nse_close_major_deviation_{close_dev:.2f}pct")
            elif close_dev > CLOSE_MINOR_THRESHOLD:
                flags.append(f"nse_close_minor_deviation_{close_dev:.2f}pct")
        
        # Compare adjusted close
        if nse_data["adj_close"] and eodhd_nse_data["adj_close"]:
            adj_dev = calculate_deviation_pct(nse_data["adj_close"], eodhd_nse_data["adj_close"])
            if adj_dev is not None and adj_dev > ADJ_CLOSE_THRESHOLD:
                flags.append(f"nse_adj_close_deviation_{adj_dev:.2f}pct")
        
        # Compare volume
        if nse_data["volume"] and eodhd_nse_data["volume"]:
            vol_dev = calculate_deviation_pct(nse_data["volume"], eodhd_nse_data["volume"])
            if vol_dev is not None and vol_dev > VOLUME_THRESHOLD:
                flags.append(f"nse_volume_deviation_{vol_dev:.2f}pct")
    
    # Compare BSE vs EODHD BSE
    if bse_data and eodhd_bse_data:
        close_dev = calculate_deviation_pct(bse_data["close"], eodhd_bse_data["close"])
        if close_dev is not None:
            if close_dev > CLOSE_MAJOR_THRESHOLD:
                flags.append(f"bse_close_major_deviation_{close_dev:.2f}pct")
            elif close_dev > CLOSE_MINOR_THRESHOLD:
                flags.append(f"bse_close_minor_deviation_{close_dev:.2f}pct")
        
        # Compare adjusted close
        if bse_data["adj_close"] and eodhd_bse_data["adj_close"]:
            adj_dev = calculate_deviation_pct(bse_data["adj_close"], eodhd_bse_data["adj_close"])
            if adj_dev is not None and adj_dev > ADJ_CLOSE_THRESHOLD:
                flags.append(f"bse_adj_close_deviation_{adj_dev:.2f}pct")
        
        # Compare volume
        if bse_data["volume"] and eodhd_bse_data["volume"]:
            vol_dev = calculate_deviation_pct(bse_data["volume"], eodhd_bse_data["volume"])
            if vol_dev is not None and vol_dev > VOLUME_THRESHOLD:
                flags.append(f"bse_volume_deviation_{vol_dev:.2f}pct")
    
    # Determine overall status
    if any("major_deviation" in f for f in flags):
        return "MAJOR_DEVIATION", flags
    elif any("minor_deviation" in f for f in flags):
        return "MINOR_DEVIATION", flags
    elif flags:
        return "MINOR_DEVIATION", flags
    else:
        return "MATCH", []


def reconcile_prices(trade_date: date, alert_on_major: bool = True) -> Dict[str, Any]:
    """
    Reconcile NSE/BSE/EODHD prices for a given date.
    
    Args:
        trade_date: Date to reconcile
        alert_on_major: Send Telegram alert on major deviations
        
    Returns:
        Dict with reconciliation stats
    """
    logger.info(f"Reconciling prices for {trade_date}...")
    
    with get_connection() as meta_conn, get_prices_db() as prices_conn:

        # Get all assets with EODHD mappings
        assets = meta_conn.execute("""
            SELECT DISTINCT a.id, a.nse_symbol, a.name
            FROM assets a
            JOIN eodhd_symbol_mapping esm ON a.id = esm.asset_id
            WHERE a.is_active = 1 AND esm.is_active = 1
        """).fetchall()

        logger.info(f"Reconciling {len(assets)} assets...")

        stats = {
            "total": len(assets),
            "match": 0,
            "minor_deviation": 0,
            "major_deviation": 0,
            "missing_source": 0,
            "eodhd_only": 0
        }

        major_deviations = []

        for asset in assets:
            asset_id = asset["id"]
            nse_symbol = asset["nse_symbol"]
            name = asset["name"]

            # Get price data from all sources
            nse_data = get_price_data(meta_conn, prices_conn, asset_id, trade_date, "NSE")
            bse_data = get_price_data(meta_conn, prices_conn, asset_id, trade_date, "BSE")
            eodhd_nse_data = get_price_data(meta_conn, prices_conn, asset_id, trade_date, "EODHD_NSE")
            eodhd_bse_data = get_price_data(meta_conn, prices_conn, asset_id, trade_date, "EODHD_BSE")
            
            # Determine status and flags
            status, flags = determine_status_and_flags(
                nse_data, bse_data, eodhd_nse_data, eodhd_bse_data
            )
            
            # Calculate deviations for storage
            close_deviation = None
            adj_close_deviation = None
            
            if nse_data and eodhd_nse_data:
                close_deviation = calculate_deviation_pct(nse_data["close"], eodhd_nse_data["close"])
                if nse_data["adj_close"] and eodhd_nse_data["adj_close"]:
                    adj_close_deviation = calculate_deviation_pct(
                        nse_data["adj_close"], eodhd_nse_data["adj_close"]
                    )
            
            # Insert reconciliation record
            meta_conn.execute("""
                INSERT INTO price_reconciliation
                (id, asset_id, date, nse_close, bse_close, eodhd_nse_close, eodhd_bse_close,
                 internal_adj_close, eodhd_adj_close, close_deviation_pct, adj_close_deviation_pct,
                 volume_nse, volume_eodhd, status, flags, reconciled_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (asset_id, date) DO UPDATE SET
                  nse_close = EXCLUDED.nse_close, bse_close = EXCLUDED.bse_close,
                  eodhd_nse_close = EXCLUDED.eodhd_nse_close, eodhd_bse_close = EXCLUDED.eodhd_bse_close,
                  internal_adj_close = EXCLUDED.internal_adj_close,
                  eodhd_adj_close = EXCLUDED.eodhd_adj_close,
                  close_deviation_pct = EXCLUDED.close_deviation_pct,
                  adj_close_deviation_pct = EXCLUDED.adj_close_deviation_pct,
                  volume_nse = EXCLUDED.volume_nse, volume_eodhd = EXCLUDED.volume_eodhd,
                  status = EXCLUDED.status, flags = EXCLUDED.flags,
                  reconciled_at = EXCLUDED.reconciled_at
            """, (
                generate_id(),
                asset_id,
                trade_date.isoformat(),
                nse_data["close"] if nse_data else None,
                bse_data["close"] if bse_data else None,
                eodhd_nse_data["close"] if eodhd_nse_data else None,
                eodhd_bse_data["close"] if eodhd_bse_data else None,
                nse_data["adj_close"] if nse_data else None,
                eodhd_nse_data["adj_close"] if eodhd_nse_data else None,
                close_deviation,
                adj_close_deviation,
                nse_data["volume"] if nse_data else None,
                eodhd_nse_data["volume"] if eodhd_nse_data else None,
                status,
                json.dumps(flags),
                datetime.now().isoformat()
            ))
            
            # Update stats
            if status == "MATCH":
                stats["match"] += 1
            elif status == "MINOR_DEVIATION":
                stats["minor_deviation"] += 1
            elif status == "MAJOR_DEVIATION":
                stats["major_deviation"] += 1
                major_deviations.append({
                    "symbol": nse_symbol or name,
                    "nse_close": nse_data["close"] if nse_data else None,
                    "eodhd_close": eodhd_nse_data["close"] if eodhd_nse_data else None,
                    "deviation_pct": close_deviation,
                    "flags": flags
                })
            elif status == "MISSING_SOURCE":
                stats["missing_source"] += 1
            elif status == "EODHD_ONLY":
                stats["eodhd_only"] += 1
        
        
        
        
        # Log results
        logger.info("=" * 60)
        logger.info(f"Price Reconciliation Results for {trade_date}:")
        logger.info(f"  Total assets:       {stats['total']}")
        logger.info(f"  Match:              {stats['match']}")
        logger.info(f"  Minor deviations:   {stats['minor_deviation']}")
        logger.info(f"  Major deviations:   {stats['major_deviation']}")
        logger.info(f"  Missing source:     {stats['missing_source']}")
        logger.info(f"  EODHD only:         {stats['eodhd_only']}")
        logger.info("=" * 60)
        
        # Alert on major deviations
    if alert_on_major and major_deviations:
        alert_msg = f"⚠️ EODHD Price Reconciliation Alert - {trade_date}\n\n"
        alert_msg += f"Found {len(major_deviations)} major deviations:\n\n"
        
        for i, dev in enumerate(major_deviations[:5], 1):  # Show top 5
            alert_msg += f"{i}. {dev['symbol']}\n"
            alert_msg += f"   NSE: ₹{dev['nse_close']:.2f} | EODHD: ₹{dev['eodhd_close']:.2f}\n"
            alert_msg += f"   Deviation: {dev['deviation_pct']:.2f}%\n\n"
        
        if len(major_deviations) > 5:
            alert_msg += f"... and {len(major_deviations) - 5} more\n"
        
        send_telegram_alert(alert_msg, level="WARNING")
    
    return stats


def main():
    """CLI entry point for manual reconciliation."""
    import argparse
    from datetime import timedelta
    
    parser = argparse.ArgumentParser(description="Reconcile EODHD prices")
    parser.add_argument("date", nargs="?", help="Date to reconcile (YYYY-MM-DD), default: yesterday")
    parser.add_argument("--no-alert", action="store_true", help="Disable Telegram alerts")
    
    args = parser.parse_args()
    
    if args.date:
        trade_date = date.fromisoformat(args.date)
    else:
        trade_date = date.today() - timedelta(days=1)
    
    logger.info(f"Running EODHD price reconciliation for {trade_date}...")
    
    try:
        stats = reconcile_prices(trade_date, alert_on_major=not args.no_alert)
        
        # Check if reconciliation is healthy
        if stats["total"] > 0:
            major_pct = stats["major_deviation"] / stats["total"] * 100
            if major_pct > 5:
                logger.error(f"High major deviation rate: {major_pct:.1f}%")
            elif major_pct > 1:
                logger.warning(f"Elevated major deviation rate: {major_pct:.1f}%")
        
        logger.info("EODHD price reconciliation complete!")
        
    except Exception as e:
        logger.error(f"Reconciliation failed: {e}", exc_info=True)
        raise


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
