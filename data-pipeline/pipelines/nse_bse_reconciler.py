"""
NSE-BSE Corporate Actions Reconciler.
Cross-validates corporate actions between exchanges to identify missing or mismatched data.
"""
import logging
from datetime import date, timedelta
from typing import List, Dict

from utils.db import get_db

logger = logging.getLogger(__name__)

AMOUNT_TOLERANCE_PCT = 1.0 # 1% tolerance for dividend amounts
FACTOR_TOLERANCE_PCT = 0.5 # 0.5% tolerance for adjustment factors

def run_reconciliation(from_date: date, to_date: date, raise_on_critical: bool = False) -> List[Dict]:
    """Compare NSE and BSE corporate actions for the given date range."""
    start_date = from_date.isoformat()
    end_date = to_date.isoformat()
    
    discrepancies = []
    
    with get_db() as conn:
        # Get dual-listed assets
        dual_listed = conn.execute("""
            SELECT id, nse_symbol, bse_code FROM assets 
            WHERE nse_symbol IS NOT NULL AND nse_symbol != '' 
              AND bse_code IS NOT NULL AND bse_code != ''
        """).fetchall()
        dual_ids = {r["id"]: r for r in dual_listed}
        
        # Get NSE actions
        nse_rows = conn.execute("""
            SELECT ca.*, a.nse_symbol, a.name 
            FROM corporate_actions ca
            JOIN assets a ON a.id = ca.asset_id
            WHERE ca.source_exchange = 'NSE' AND ca.ex_date BETWEEN ? AND ?
        """, (start_date, end_date)).fetchall()
        
        # Get BSE actions
        bse_rows = conn.execute("""
            SELECT ca.*, a.bse_code, a.name 
            FROM corporate_actions ca
            JOIN assets a ON a.id = ca.asset_id
            WHERE ca.source_exchange = 'BSE' AND ca.ex_date BETWEEN ? AND ?
        """, (start_date, end_date)).fetchall()
        
    # Group by asset_id and action_type
    nse_map = {}
    for r in nse_rows:
        key = (r["asset_id"], r["action_type"])
        nse_map[key] = r
        
    bse_map = {}
    for r in bse_rows:
        key = (r["asset_id"], r["action_type"])
        bse_map[key] = r
        
    # 1. Check NSE records against BSE
    for key, nse in nse_map.items():
        asset_id, action_type = key
        if asset_id not in dual_ids: continue
        
        symbol = nse["nse_symbol"]
        bse = bse_map.get(key)
        
        if not bse:
            discrepancies.append({
                "type": "NSE_ONLY",
                "symbol": symbol,
                "action": action_type,
                "message": f"{symbol}: NSE has {action_type} but BSE has no matching record"
            })
            continue
            
        if action_type == "DIVIDEND":
            nse_amt = nse["dividend_amount"] or 0
            bse_amt = bse["dividend_amount"] or 0
            if nse_amt > 0 and abs(nse_amt - bse_amt) / nse_amt * 100 > AMOUNT_TOLERANCE_PCT:
                discrepancies.append({
                    "type": "AMOUNT_MISMATCH",
                    "symbol": symbol,
                    "message": f"{symbol}: Dividend mismatch NSE {nse_amt} vs BSE {bse_amt}"
                })
        
        nse_f = nse["adjustment_factor"] or 1.0
        bse_f = bse["adjustment_factor"] or 1.0
        if abs(nse_f - bse_f) / nse_f * 100 > FACTOR_TOLERANCE_PCT:
             discrepancies.append({
                "type": "FACTOR_MISMATCH",
                "symbol": symbol,
                "message": f"{symbol}: Factor mismatch NSE {nse_f:.4f} vs BSE {bse_f:.4f}"
            })
             
    # 2. Check BSE records against NSE
    for key, bse in bse_map.items():
        asset_id, action_type = key
        if asset_id not in dual_ids: continue
        if key not in nse_map:
            symbol = dual_ids[asset_id]["nse_symbol"]
            discrepancies.append({
                "type": "BSE_ONLY",
                "symbol": symbol,
                "action": action_type,
                "message": f"{symbol}: BSE has {action_type} but NSE has no matching record"
            })

    if discrepancies:
        for d in discrepancies:
            logger.warning(f"[RECONCILE] {d['message']}")
        
        critical = [d for d in discrepancies if d["type"] in ("NSE_ONLY", "FACTOR_MISMATCH")]
        if raise_on_critical and critical:
            raise RuntimeError(f"Critical reconciliation failures: {len(critical)}")
    else:
        logger.info(f"[RECONCILE] All actions from {start_date} to {end_date} are reconciled.")
        
    return discrepancies
