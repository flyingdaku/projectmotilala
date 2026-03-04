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
    if any(k in p for k in ("INTERIM DIV", "FINAL DIV", "SPECIAL DIV", "DIVIDEND")):
        return "DIVIDEND"

    # ── Administrative ───────────────────────────────────────────
    if "NAME CHANGE" in p:
        return "NAME_CHANGE"

    return None


def parse_bse_dividend_amount(purpose: str) -> float:
    """Extract dividend amount from BSE Purpose string.
    
    Handles multiple BSE formats:
      - "Interim Dividend - Rs. - 43.0000"
      - "Final Dividend Rs. 2.5000 Per Share"
      - "Dividend Rs 10/- Per Equity Share"
      - "Dividend @ Rs.5.00 Per Share"
      - "Dividend of Rs 3.50"
    """
    # Pattern 1: "Rs. - 43.0000" or "Rs.- 43.0000"
    match = re.search(r"R[se]\.?\s*-\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match:
        return float(match.group(1))

    # Pattern 2: "@ Rs.5.00" or "@Rs 5"
    match = re.search(r"@\s*R[se]\.?\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match:
        return float(match.group(1))

    # Pattern 3: "Rs 10/-" or "Rs. 2.50/-"
    match = re.search(r"R[se]\.?\s*([\d]+(?:\.[\d]+)?)\s*/", purpose, re.IGNORECASE)
    if match:
        return float(match.group(1))

    # Pattern 4: "of Rs 3.50" or "of Rs. 3.50"
    match = re.search(r"of\s+R[se]\.?\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match:
        return float(match.group(1))

    # Pattern 5: Generic "Rs. 2.5000" or "Rs 2.5"
    match = re.search(r"R[se]\.?\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match:
        return float(match.group(1))

    return 0.0


def parse_bse_bonus_ratio(purpose: str) -> Tuple[float, float]:
    """Parse bonus/split ratio from BSE Purpose string.
    
    Handles:
      - "4:1" or "4 : 1"
      - "Bonus 1:1"
      - "Split from Rs 10/- to Rs 2/-" -> ratio 10:2 = 5:1
    """
    # Direct ratio pattern: "4:1", "1 : 1"
    match = re.search(r"(\d+(?:\.\d+)?)\s*[:]\s*(\d+(?:\.\d+)?)", purpose)
    if match:
        return float(match.group(1)), float(match.group(2))

    # Face value split pattern: "from Rs 10/- to Rs 2/-" or "from Rs.10 to Rs.2"
    match = re.search(
        r"from\s+R[se]\.?\s*([\d]+(?:\.[\d]+)?)\s*/?-?\s*to\s+R[se]\.?\s*([\d]+(?:\.[\d]+)?)",
        purpose, re.IGNORECASE
    )
    if match:
        old_fv = float(match.group(1))
        new_fv = float(match.group(2))
        if new_fv > 0:
            return old_fv, new_fv  # e.g. 10:2 means 1 old→5 new

    return 0.0, 1.0
