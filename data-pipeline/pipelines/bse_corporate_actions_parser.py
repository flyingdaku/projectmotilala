"""
BSE Corporate Actions Parser.
Extracts normalized action types and amounts from BSE purpose strings.

Improved: better regex patterns for dividend amounts, split/bonus ratios,
and face value change detection.
"""
import re
from typing import Optional, Tuple


def classify_bse_action(purpose: str) -> Optional[str]:
    """Classify BSE Purpose string into canonical action type.
    
    Priority ordering mirrors the NSE classifier:
    structural events > share issuance > capital return > dividend.
    """
    p = purpose.upper().strip()

    # ── Structural (highest priority) ────────────────────────────
    if any(k in p for k in ("DEMERGER", "DE-MERGER", "SPIN-OFF", "SPINOFF", "SPIN OFF")):
        return "DEMERGER"
    if any(k in p for k in ("MERGER", "AMALGAMATION", "AMALGAM")):
        return "MERGER"
    if any(k in p for k in ("SPLIT", "SUB-DIVISION", "SUBDIVISION", "STOCK SPLIT")):
        return "SPLIT"
    if any(k in p for k in ("FACE VALUE", "FV CHANGE", "CHANGE IN FACE VALUE",
                             "REDUCTION OF FACE VALUE")):
        return "FACE_VALUE_CHANGE"

    # ── Share issuance ───────────────────────────────────────────
    if "BONUS" in p:
        return "BONUS"
    if "RIGHTS" in p or "RIGHT ISSUE" in p:
        return "RIGHTS"

    # ── Capital return ───────────────────────────────────────────
    if any(k in p for k in ("BUYBACK", "BUY BACK", "BUY-BACK")):
        return "BUYBACK"

    # ── Dividend (lowest structural priority) ────────────────────
    if any(k in p for k in ("INTERIM DIV", "FINAL DIV", "SPECIAL DIV", "DIVIDEND", "DIV.", "DIV-", "DIV ")):
        return "DIVIDEND"

    # ── Administrative ───────────────────────────────────────────
    if "NAME CHANGE" in p:
        return "NAME_CHANGE"

    return None


def parse_bse_dividend_amount(purpose: str) -> float:
    """Extract dividend amount from BSE Purpose string."""
    # Find all dividend amounts mentioned and sum them
    import re
    matches = re.findall(r"(?:RS|RE|₹|INR)[\.\s-]*(\d+(?:\.\d+)?)", purpose, re.IGNORECASE)
    if matches:
        return sum(float(m) for m in matches)
    return 0.0


def parse_bse_bonus_ratio(purpose: str) -> Tuple[float, float]:
    import re
    # Direct ratio pattern: "4:1", "1 : 1"
    match = re.search(r"(\d+(?:\.\d+)?)\s*[:]\s*(\d+(?:\.\d+)?)", purpose)
    if match:
        return float(match.group(1)), float(match.group(2))

    # Face value split pattern
    match = re.search(r"from\s+(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)[\s/-]*to\s+(?:RS|RE|INR)[\.\s-]*(\d+(?:\.\d+)?)", purpose, re.IGNORECASE)
    if match:
        old_fv = float(match.group(1))
        new_fv = float(match.group(2))
        if new_fv > 0:
            return old_fv, new_fv

    return 0.0, 1.0
