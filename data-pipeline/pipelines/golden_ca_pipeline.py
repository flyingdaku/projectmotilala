"""
Golden Corporate Actions Pipeline.

Reads from source-specific raw tables (src_nse_corporate_actions, src_bse_corporate_actions).
Parses using the tested classifiers and parsers from corporate_actions.py and
bse_corporate_actions_parser.py. Deduplicates and resolves conflicts (NSE priority).
Writes the "golden" record to the unified `corporate_actions` table.

DB routing:
  - src_nse_corporate_actions, src_bse_corporate_actions, assets, corporate_actions → relational DB (get_db)
  - daily_prices (prev_close lookup) → timeseries DB (get_prices_db)
"""
import logging
import json
import os
import re
from collections import defaultdict
from datetime import date, timedelta
from typing import Dict, Any, List, Optional, Tuple

from core.db import get_db, get_prices_db, generate_id
from pipelines.bse_corporate_actions_parser import (
    classify_bse_action,
    parse_bse_dividend_amount,
    parse_bse_bonus_ratio,
)
from pipelines.corporate_actions import (
    _map_action_type as classify_nse_action,
    calculate_adjustment_factor,
)

logger = logging.getLogger(__name__)


def _parse_nse_split_ratio(subject: str) -> Tuple[float, float]:
    """Parse 'From Rs X/- To Rs Y/-' style NSE split subjects → (new_fv, old_fv)."""
    m = re.search(
        r"from\s+(?:rs|re|inr)[\.\s/-]*(\d+(?:\.\d+)?)"
        r".*?to\s+(?:rs|re|inr)[\.\s/-]*(\d+(?:\.\d+)?)",
        subject,
        re.IGNORECASE,
    )
    if m:
        return float(m.group(1)), float(m.group(2))
    return 0.0, 1.0


def _parse_nse_bonus_ratio(subject: str) -> Tuple[float, float]:
    """Parse 'Bonus N:M' style NSE subjects → (N, M)."""
    m = re.search(r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", subject)
    if m:
        return float(m.group(1)), float(m.group(2))
    return 0.0, 1.0


def _parse_nse_rights(subject: str) -> Tuple[float, float, float]:
    """Parse 'Rights N:M @ Premium Rs P/-' → (N, M, price)."""
    ratio_m = re.search(r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", subject)
    price_m = re.search(
        r"(?:@\s*(?:premium\s*)?(?:rs|re|inr)[\.\s/-]*)(\d+(?:\.\d+)?)",
        subject,
        re.IGNORECASE,
    )
    num = float(ratio_m.group(1)) if ratio_m else 0.0
    den = float(ratio_m.group(2)) if ratio_m else 1.0
    price = float(price_m.group(1)) if price_m else 0.0
    return num, den, price


def _parse_nse_dividend(subject: str) -> float:
    """Extract dividend amount from NSE subject string (sum all Rs amounts)."""
    matches = re.findall(r"(?:rs|re|₹|inr)[\.\s/-]*(\d+(?:\.\d+)?)", subject, re.IGNORECASE)
    return sum(float(m) for m in matches) if matches else 0.0


def _parse_nse_record(subject: str, face_value: float = 0.0) -> Dict[str, Any]:
    """
    Parse NSE subject string into normalized fields using the tested classifier
    and purpose-specific parsers. Returns action_type, ratio_numerator,
    ratio_denominator, dividend_amount, rights_price.
    """
    action_type = classify_nse_action(subject)
    if action_type is None:
        return {"action_type": None, "ratio_numerator": 0.0, "ratio_denominator": 1.0,
                "dividend_amount": 0.0, "rights_price": 0.0}

    num, den, div_amt, rights_price = 0.0, 1.0, 0.0, 0.0

    if action_type in ("SPLIT", "FACE_VALUE_CHANGE"):
        num, den = _parse_nse_split_ratio(subject)

    elif action_type == "BONUS":
        num, den = _parse_nse_bonus_ratio(subject)

    elif action_type == "RIGHTS":
        num, den, rights_price = _parse_nse_rights(subject)
        if rights_price > 0 and face_value > 0:
            rights_price += face_value  # Premium + face value = issue price

    elif action_type == "DIVIDEND":
        div_amt = _parse_nse_dividend(subject)

    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt,
        "rights_price": rights_price,
    }


def _get_prev_close(asset_id: str, ex_date: str) -> float:
    """Fetch closing price from timeseries DB for the last day before ex_date."""
    with get_prices_db() as conn:
        row = conn.execute(
            """SELECT close FROM daily_prices
               WHERE asset_id = %s AND date < %s
               ORDER BY date DESC LIMIT 1""",
            (asset_id, ex_date),
        ).fetchone()
    return float(row["close"]) if row else 0.0


def run_golden_ca_pipeline(from_date: date, to_date: date):
    logger.info(f"[GOLDEN_CA] Starting merge from {from_date} to {to_date}")

    log_base_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "CA_LOGS")
    mapping_logs = defaultdict(dict)

    with get_db() as conn:
        # Clear existing records for the range to allow clean reprocessing
        conn.execute(
            "DELETE FROM corporate_actions WHERE ex_date BETWEEN %s AND %s",
            (from_date.isoformat(), to_date.isoformat()),
        )

        # Fetch NSE staging records
        nse_raw = conn.execute(
            """SELECT id, asset_id, symbol, subject, ex_date, record_date, face_value
               FROM src_nse_corporate_actions
               WHERE ex_date BETWEEN %s AND %s""",
            (from_date.isoformat(), to_date.isoformat()),
        ).fetchall()

        # Fetch BSE staging records
        bse_raw = conn.execute(
            """SELECT id, asset_id, scrip_code, purpose, ex_date, record_date
               FROM src_bse_corporate_actions
               WHERE ex_date BETWEEN %s AND %s""",
            (from_date.isoformat(), to_date.isoformat()),
        ).fetchall()

        candidates: Dict[tuple, Dict] = {}  # key: (asset_id, ex_date, action_type)

        # ── NSE (highest priority) ────────────────────────────────────
        for r in nse_raw:
            fv = 0.0
            try:
                fv = float(r["face_value"] or 0)
            except (TypeError, ValueError):
                pass

            parsed = _parse_nse_record(str(r["subject"]), face_value=fv)
            if parsed["action_type"] is None:
                continue

            key = (r["asset_id"], str(r["ex_date"]), parsed["action_type"])
            candidates[key] = {
                "asset_id": r["asset_id"],
                "action_type": parsed["action_type"],
                "ex_date": str(r["ex_date"]),
                "ratio_numerator": parsed["ratio_numerator"],
                "ratio_denominator": parsed["ratio_denominator"],
                "dividend_amount": parsed["dividend_amount"],
                "rights_price": parsed["rights_price"],
                "source_exchange": "NSE",
                "raw_announcement": r["subject"],
                "record_date": r["record_date"],
            }

            # Audit log
            try:
                ex_d = date.fromisoformat(str(r["ex_date"]))
                log_path = os.path.join(log_base_path, "NSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except Exception:
                log_path = os.path.join(log_base_path, "NSE", "UNKNOWN", "log.json")
            subject_key = str(r["subject"]).strip()
            if subject_key not in mapping_logs[log_path]:
                mapping_logs[log_path][subject_key] = {
                    "source": "NSE",
                    "company_symbol": r["symbol"],
                    "ex_date": str(r["ex_date"]),
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}",
                }

        # ── BSE (fallback for NSE-missing records) ───────────────────
        for r in bse_raw:
            act_type = classify_bse_action(str(r["purpose"]))
            if not act_type:
                continue

            div_amt = parse_bse_dividend_amount(str(r["purpose"])) if act_type == "DIVIDEND" else 0.0
            num, den = (
                parse_bse_bonus_ratio(str(r["purpose"])) if act_type in ("BONUS", "SPLIT") else (0.0, 1.0)
            )

            key = (r["asset_id"], str(r["ex_date"]), act_type)
            if key not in candidates:
                candidates[key] = {
                    "asset_id": r["asset_id"],
                    "action_type": act_type,
                    "ex_date": str(r["ex_date"]),
                    "ratio_numerator": num,
                    "ratio_denominator": den,
                    "dividend_amount": div_amt,
                    "rights_price": 0.0,
                    "source_exchange": "BSE",
                    "raw_announcement": r["purpose"],
                    "record_date": r["record_date"],
                }

            try:
                ex_d = date.fromisoformat(str(r["ex_date"]))
                log_path = os.path.join(log_base_path, "BSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except Exception:
                log_path = os.path.join(log_base_path, "BSE", "UNKNOWN", "log.json")
            if str(r["purpose"]) not in mapping_logs[log_path]:
                mapping_logs[log_path][str(r["purpose"])] = {
                    "source": "BSE",
                    "company_symbol": r["scrip_code"],
                    "ex_date": str(r["ex_date"]),
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}",
                }

        # ── Compute adjustment factors and upsert ─────────────────────
        inserted = 0
        updated = 0

        for key, best in candidates.items():
            asset_id, ex_date_str, action_type = key

            # prev_close lives in timeseries DB
            prev_close = _get_prev_close(asset_id, ex_date_str)

            adj_factor = calculate_adjustment_factor(
                action_type=action_type,
                ratio_num=best["ratio_numerator"],
                ratio_den=best["ratio_denominator"],
                dividend_amount=best["dividend_amount"],
                prev_close=prev_close,
                rights_price=best["rights_price"],
            )

            existing = conn.execute(
                """SELECT id FROM corporate_actions
                   WHERE asset_id = %s AND ex_date = %s AND action_type = %s""",
                key,
            ).fetchone()

            if existing:
                conn.execute(
                    """UPDATE corporate_actions
                       SET ratio_numerator = %s, ratio_denominator = %s, dividend_amount = %s,
                           adjustment_factor = %s, source_exchange = %s, raw_announcement = %s,
                           record_date = %s
                       WHERE id = %s""",
                    (
                        best["ratio_numerator"], best["ratio_denominator"], best["dividend_amount"],
                        adj_factor, best["source_exchange"], best["raw_announcement"],
                        best["record_date"], existing["id"],
                    ),
                )
                updated += 1
            else:
                conn.execute(
                    """INSERT INTO corporate_actions
                       (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator,
                        dividend_amount, rights_price, adjustment_factor, source_exchange,
                        raw_announcement, record_date)
                       VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                    (
                        generate_id(), asset_id, action_type, ex_date_str,
                        best["ratio_numerator"], best["ratio_denominator"],
                        best["dividend_amount"], best["rights_price"],
                        adj_factor, best["source_exchange"],
                        best["raw_announcement"], best["record_date"],
                    ),
                )
                inserted += 1

    # Persist audit logs
    for path, data in mapping_logs.items():
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            existing_data: Dict = {}
            if os.path.exists(path):
                with open(path, "r") as lf:
                    existing_data = json.load(lf)
            existing_data.update(data)
            with open(path, "w") as lf:
                json.dump(existing_data, lf, indent=2)
        except Exception as e:
            logger.error(f"Failed to save mapping log at {path}: {e}")

    logger.info(f"[GOLDEN_CA] ✅ Done. {inserted} inserted, {updated} updated")
    return inserted, updated


if __name__ == "__main__":
    import logging as _logging
    _logging.basicConfig(level=_logging.INFO)
    today = date.today()
    run_golden_ca_pipeline(today - timedelta(days=30), today)
