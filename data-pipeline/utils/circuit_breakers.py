"""
Circuit breaker rules applied BEFORE inserting prices into the database.

Rules:
  1. Price <= 0                          → REJECT (zero/negative price)
  2. Price change > 40% with no corp action → REJECT (price spike)
  3. Volume == 0 for EQ series           → FLAG only (don't reject)
"""
import logging
from datetime import date
from typing import Optional

import pandas as pd

logger = logging.getLogger(__name__)


def run_circuit_breakers(
    df: pd.DataFrame, trade_date: date
) -> tuple[pd.DataFrame, list[dict]]:
    """
    Apply all circuit breaker rules to the incoming price DataFrame.

    Returns:
        (clean_df, flagged_records)
        clean_df: rows that passed all hard-reject rules
        flagged_records: list of dicts describing each flagged row
    """
    flagged: list[dict] = []
    reject_indices: list[int] = []

    prev_close_map = _get_previous_closes(trade_date)
    corp_action_isins = _get_corp_action_isins_for_date(trade_date)

    for idx, row in df.iterrows():
        isin = row.get("isin", "")
        symbol = row.get("symbol", isin)
        close = _safe_float(row.get("close"))

        # ── Rule 1: Zero or negative price ──────────────────────
        if close is None or close <= 0:
            flagged.append({
                "isin": isin, "symbol": symbol,
                "reason": "ZERO_PRICE", "value": close,
            })
            reject_indices.append(idx)
            continue

        # ── Rule 2: Large price move without corporate action ────
        if isin in prev_close_map:
            prev = prev_close_map[isin]
            if prev > 0:
                change_pct = abs((close - prev) / prev) * 100
                if change_pct > 40 and isin not in corp_action_isins:
                    flagged.append({
                        "isin": isin, "symbol": symbol,
                        "reason": "PRICE_SPIKE",
                        "prev_close": prev,
                        "current_close": close,
                        "change_pct": round(change_pct, 2),
                    })
                    reject_indices.append(idx)
                    logger.warning(
                        f"PRICE_SPIKE: {symbol} ({isin}) "
                        f"prev={prev:.2f} curr={close:.2f} Δ={change_pct:.1f}%"
                    )
                    continue

        # ── Rule 3: Zero volume — flag but keep ──────────────────
        volume = _safe_float(row.get("volume", 1))
        if volume is not None and volume == 0:
            flagged.append({
                "isin": isin, "symbol": symbol,
                "reason": "ZERO_VOLUME", "close": close,
            })
            logger.info(f"ZERO_VOLUME (flagged, not rejected): {symbol}")

    clean_df = df.drop(index=reject_indices)
    return clean_df, flagged


def _safe_float(value) -> Optional[float]:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _get_previous_closes(trade_date: date) -> dict[str, float]:
    """Return {isin: close} for the most recent trading day before trade_date."""
    from core.db import get_db
    from utils.calendar import get_previous_trading_date

    try:
        prev_date = get_previous_trading_date(trade_date)
    except RuntimeError:
        return {}

    with get_db() as conn:
        rows = conn.execute(
            """SELECT a.isin, dp.close
               FROM daily_prices dp
               JOIN assets a ON dp.asset_id = a.id
               WHERE dp.date = ?""",
            (prev_date.isoformat(),),
        ).fetchall()

    return {row["isin"]: float(row["close"]) for row in rows}


def _get_corp_action_isins_for_date(trade_date: date) -> set[str]:
    """Return the set of ISINs that have a corporate action ex_date on trade_date."""
    from core.db import get_db

    with get_db() as conn:
        rows = conn.execute(
            """SELECT a.isin
               FROM corporate_actions ca
               JOIN assets a ON ca.asset_id = a.id
               WHERE ca.ex_date = ?""",
            (trade_date.isoformat(),),
        ).fetchall()

    return {row["isin"] for row in rows}
