"""
Golden Corporate Actions Pipeline.

Reads from source-specific raw tables (src_nse_corporate_actions, src_bse_corporate_actions, eodhd_corporate_actions).
Parses, deduplicates, and resolves conflicts.
Writes the "golden" record to the unified `corporate_actions` table.
"""
import logging
import json
import os
from datetime import date
from typing import Dict, Any, List

from core.db import get_db, generate_id
from pipelines.bse_corporate_actions_parser import classify_bse_action, parse_bse_dividend_amount, parse_bse_bonus_ratio
# Assuming NSE has similar basic parsing logic (usually baked into ingester, we will do it here now)
import re

logger = logging.getLogger(__name__)

def parse_nse_action(subject: str) -> Dict[str, Any]:
    subject = subject.upper()
    action_type = "OTHER"
    div_amt = 0.0
    num = 0.0
    den = 1.0
    rights_price = 0.0

    # Structural
    if any(k in subject for k in ("DEMERGER", "DE-MERGER", "SPIN-OFF")):
        action_type = "DEMERGER"
    elif any(k in subject for k in ("MERGER", "AMALGAMATION")):
        action_type = "MERGER"
    elif any(k in subject for k in ("SPLIT", "SUB-DIVISION", "CONSOLIDATION", "CAPITAL REDUCTION")):
        action_type = "SPLIT"
        match = re.search(r"(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?).*?TO\s*(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "FACE VALUE" in subject:
        action_type = "FACE_VALUE_CHANGE"

    # Issuance / Return
    elif "BONUS" in subject:
        action_type = "BONUS"
        match = re.search(r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
    elif "RIGHTS" in subject or "RIGHT ISSUE" in subject:
        action_type = "RIGHTS"
        match = re.search(r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", subject)
        if match:
            num = float(match.group(1))
            den = float(match.group(2))
        
        # Match price/premium Rs 308/-
        price_match = re.search(r"(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)", subject)
        if price_match:
            rights_price = float(price_match.group(1))
            
    elif "BUYBACK" in subject or "BUY BACK" in subject:
        action_type = "BUYBACK"

    # Dividends & Typos
    elif any(k in subject for k in ("DIVIDEND", "DIVDEND", "DIVIDNED", "DIV.", "DIV-", "DIV ")):
        action_type = "DIVIDEND"
        # Find all dividend amounts mentioned and sum them (e.g. Special Div Rs 10 + Final Div Rs 26)
        matches = re.findall(r"(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)", subject)
        if matches:
            div_amt = sum(float(m) for m in matches)
            
    # Admin
    elif "NAME CHANGE" in subject:
        action_type = "NAME_CHANGE"

    return {
        "action_type": action_type,
        "ratio_numerator": num,
        "ratio_denominator": den,
        "dividend_amount": div_amt,
        "rights_price": rights_price
    }

# Hardcoded overrides for significant historical demergers where value extraction fails
DEMERGER_VALUE_OVERRIDES = {
    ("SUVEN", "2020-01-21"): 185.0,  # Estimated value of demerged entity SPL at listing/near-date
    ("ARCHIDPLY", "2020-02-13"): 11.4,  # Estimated value of demerged entity Archidply Decor
    ("TATACHEM", "2020-03-04"): 409.5,  # Estimated value of consumer business demerged into Tata Consumer
    ("BORORENEW", "2020-03-06"): 156.0   # Value of consumer business demerged into Borosil Ltd
}


def calculate_adjustment_factor(action_type: str, num: float, den: float, div_amt: float, prev_close: float, symbol: str = None, ex_date: str = None, rights_price: float = 0.0) -> float:
    """Calculate price adjustment multiplier."""
    if action_type == "SPLIT" and num > 0 and den > 0:
        # num is old FV, den is new FV. factor = new / old
        return den / num
    elif action_type == "BONUS" and num > 0 and den > 0:
        # num is bonus, den is existing. factor = existing / (existing + bonus)
        return den / (num + den)
    elif action_type == "DIVIDEND" and div_amt > 0 and prev_close > 0:
        return max(0.01, 1.0 - (div_amt / prev_close))
    elif action_type == "RIGHTS" and prev_close > 0 and (num + den) > 0:
        # TERP = (existing * prev_close + rights * price) / (existing + rights)
        terp = (den * prev_close + num * rights_price) / (den + num)
        return terp / prev_close
    elif action_type == "DEMERGER" and prev_close > 0:
        # Check for overrides
        val = 0.0
        if symbol and ex_date and (symbol, ex_date) in DEMERGER_VALUE_OVERRIDES:
            val = DEMERGER_VALUE_OVERRIDES[(symbol, ex_date)]
        
        if val > 0:
            return max(0.01, 1.0 - (val / prev_close))
    return 1.0

def run_golden_ca_pipeline(from_date: date, to_date: date):
    logger.info(f"[GOLDEN_CA] Starting merge from {from_date} to {to_date}")
    
    # Initialize the JSON log mechanism
    from collections import defaultdict
    import datetime
    log_base_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "raw_data", "CA_LOGS")
    # mapping_logs: path -> dictionary of mappings
    mapping_logs = defaultdict(dict)
    
    with get_db() as conn:
        # Get NSE actions
        nse_raw = conn.execute("""
            SELECT id, asset_id, symbol, subject, ex_date, record_date, face_value 
            FROM src_nse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        """, (from_date.isoformat(), to_date.isoformat())).fetchall()

        # Get BSE actions
        bse_raw = conn.execute("""
            SELECT id, asset_id, scrip_code, purpose, ex_date, record_date 
            FROM src_bse_corporate_actions
            WHERE ex_date BETWEEN ? AND ?
        """, (from_date.isoformat(), to_date.isoformat())).fetchall()

        # Group by (asset_id, ex_date, roughly_action_type) to deduplicate
        # We will prioritize NSE over BSE.
        
        candidates = {}  # key: (asset_id, ex_date, action_type) -> best_record

        # Process NSE first (highest priority)
        for r in nse_raw:
            parsed = parse_nse_action(r["subject"])
            if parsed["action_type"] == "OTHER":
                continue
                
            key = (r["asset_id"], r["ex_date"], parsed["action_type"])
            
            candidates[key] = {
                "asset_id": r["asset_id"],
                "action_type": parsed["action_type"],
                "ex_date": r["ex_date"],
                "ratio_numerator": parsed["ratio_numerator"],
                "ratio_denominator": parsed["ratio_denominator"],
                "dividend_amount": parsed["dividend_amount"],
                "rights_price": parsed["rights_price"],
                "source_exchange": "NSE",
                "raw_announcement": r["subject"],
                "record_date": r["record_date"],
                "face_value": r["face_value"]
            }
            
            # Log mapping
            try:
                ex_d = datetime.date.fromisoformat(r["ex_date"])
                log_path = os.path.join(log_base_path, "NSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except:
                log_path = os.path.join(log_base_path, "NSE", "UNKNOWN", "log.json")
                
            # Log mapping (Strip leading spaces from key)
            subject_key = r["subject"].strip()
            if subject_key not in mapping_logs[log_path]:
                mapping_logs[log_path][subject_key] = {
                    "source": "NSE",
                    "company_symbol": r["symbol"],
                    "ex_date": r["ex_date"],
                    "action_type": parsed["action_type"],
                    "dividend_amount": parsed["dividend_amount"],
                    "ratio": f"{parsed['ratio_numerator']}:{parsed['ratio_denominator']}"
                }

        # Process BSE
        for r in bse_raw:
            act_type = classify_bse_action(r["purpose"])
            if not act_type:
                continue
                
            div_amt = parse_bse_dividend_amount(r["purpose"]) if act_type == "DIVIDEND" else 0.0
            num, den = parse_bse_bonus_ratio(r["purpose"]) if act_type in ("BONUS", "SPLIT") else (0.0, 1.0)
            
            key = (r["asset_id"], r["ex_date"], act_type)
            
            # Only add if NSE didn't already provide it (NSE priority)
            if key not in candidates:
                candidates[key] = {
                    "asset_id": r["asset_id"],
                    "action_type": act_type,
                    "ex_date": r["ex_date"],
                    "ratio_numerator": num,
                    "ratio_denominator": den,
                    "dividend_amount": div_amt,
                    "source_exchange": "BSE",
                    "raw_announcement": r["purpose"],
                    "record_date": r["record_date"]
                }
                
            # Log mapping
            try:
                ex_d = datetime.date.fromisoformat(r["ex_date"])
                log_path = os.path.join(log_base_path, "BSE", str(ex_d.year), f"{ex_d.month:02d}", "log.json")
            except:
                log_path = os.path.join(log_base_path, "BSE", "UNKNOWN", "log.json")
                
            if r["purpose"] not in mapping_logs[log_path]:
                mapping_logs[log_path][r["purpose"]] = {
                    "source": "BSE",
                    "company_symbol": r["scrip_code"],
                    "ex_date": r["ex_date"],
                    "action_type": act_type,
                    "dividend_amount": div_amt,
                    "ratio": f"{num}:{den}"
                }
                
        # Now insert into Golden Table
        inserted = 0
        updated = 0
        
        for key, best in candidates.items():
            # Get prev_close for adjustment factor calculation
            prev_close_row = conn.execute("""
                SELECT close FROM daily_prices 
                WHERE asset_id = ? AND date < ? 
                ORDER BY date DESC LIMIT 1
            """, (best["asset_id"], best["ex_date"])).fetchone()
            
            prev_close = float(prev_close_row["close"]) if prev_close_row else 0.0
            
            # Use face_value to adjust rights_price if "Premium" in subject
            r_price = best.get("rights_price", 0.0)
            if best["action_type"] == "RIGHTS" and "@ PREMIUM" in best["raw_announcement"].upper():
                fv = 0.0
                try:
                    fv = float(best.get("face_value") or 0)
                except:
                    pass
                r_price += fv

            adj_factor = calculate_adjustment_factor(
                best["action_type"], best["ratio_numerator"], best["ratio_denominator"], 
                best["dividend_amount"], prev_close,
                symbol=conn.execute("SELECT nse_symbol FROM assets WHERE id = ?", (best["asset_id"],)).fetchone()["nse_symbol"],
                ex_date=best["ex_date"],
                rights_price=r_price
            )
            
            # Upsert into corporate_actions
            existing = conn.execute("""
                SELECT id FROM corporate_actions 
                WHERE asset_id = ? AND ex_date = ? AND action_type = ?
            """, key).fetchone()
            
            if existing:
                conn.execute("""
                    UPDATE corporate_actions 
                    SET ratio_numerator = ?, ratio_denominator = ?, dividend_amount = ?,
                        adjustment_factor = ?, source_exchange = ?, raw_announcement = ?,
                        record_date = ?
                    WHERE id = ?
                """, (
                    best["ratio_numerator"], best["ratio_denominator"], best["dividend_amount"],
                    adj_factor, best["source_exchange"], best["raw_announcement"],
                    best["record_date"], existing["id"]
                ))
                updated += 1
            else:
                conn.execute("""
                    INSERT INTO corporate_actions 
                    (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator, 
                     dividend_amount, adjustment_factor, source_exchange, raw_announcement, record_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    generate_id(), best["asset_id"], best["action_type"], best["ex_date"],
                    best["ratio_numerator"], best["ratio_denominator"], best["dividend_amount"],
                    adj_factor, best["source_exchange"], best["raw_announcement"], best["record_date"]
                ))
                inserted += 1

    # Save the updated mapping logs
    for path, data in mapping_logs.items():
        try:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            # Load existing if any
            existing_data = {}
            if os.path.exists(path):
                with open(path, "r") as lf:
                    existing_data = json.load(lf)
            
            # Update with new
            existing_data.update(data)
            
            with open(path, "w") as lf:
                json.dump(existing_data, lf, indent=2)
        except Exception as e:
            logger.error(f"Failed to save mapping log at {path}: {e}")

    logger.info(f"[GOLDEN_CA] ✅ Done. {inserted} inserted, {updated} updated")
    return inserted, updated

if __name__ == "__main__":
    from datetime import timedelta
    logging.basicConfig(level=logging.INFO)
    today = date.today()
    run_golden_ca_pipeline(today - timedelta(days=30), today)
