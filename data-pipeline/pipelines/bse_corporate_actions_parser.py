"""
BSE Corporate Actions Parser.
Extracts normalized action types and amounts from BSE purpose strings.
"""
import re
from typing import Optional, Tuple

def classify_bse_action(purpose: str) -> Optional[str]:
    p = purpose.upper().strip()
    if any(k in p for k in ("SPLIT", "SUB-DIVISION", "SUBDIVISION")): return "SPLIT"
    if "BONUS" in p: return "BONUS"
    if any(k in p for k in ("INTERIM DIV", "FINAL DIV", "SPECIAL DIV", "DIVIDEND")): return "DIVIDEND"
    if "RIGHTS" in p: return "RIGHTS"
    if any(k in p for k in ("MERGER", "AMALGAMATION")): return "MERGER"
    if any(k in p for k in ("DEMERGER", "SPIN-OFF", "SPINOFF", "SPIN OFF")): return "DEMERGER"
    if any(k in p for k in ("BUYBACK", "BUY BACK")): return "BUYBACK"
    if any(k in p for k in ("FACE VALUE", "FV CHANGE")): return "FACE_VALUE_CHANGE"
    if "NAME CHANGE" in p: return "NAME_CHANGE"
    return None

def parse_bse_dividend_amount(purpose: str) -> float:
    """Extract dividend amount from BSE Purpose string."""
    # Pattern 1: "Rs. - 43.0000"
    match = re.search(r"R[se]\.?\s*-\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match: return float(match.group(1))
    
    # Pattern 2: "Rs. 2.5000"
    match = re.search(r"R[se]\.?\s*([\d]+(?:\.[\d]+)?)", purpose, re.IGNORECASE)
    if match: return float(match.group(1))
    
    return 0.0

def parse_bse_bonus_ratio(purpose: str) -> Tuple[float, float]:
    """Parse bonus/split ratio (4:1) -> (4.0, 1.0)"""
    match = re.search(r"(\d+(?:\.\d+)?)\s*[:]\s*(\d+(?:\.\d+)?)", purpose)
    if match: return float(match.group(1)), float(match.group(2))
    return 0.0, 1.0
