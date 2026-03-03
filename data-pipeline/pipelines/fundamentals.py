"""
Fundamentals Pipeline Orchestrator.
Merges source-specific tables into a unified fundamentals view with conflict resolution.
"""
import logging
import time
from datetime import date
from typing import Dict, Any, Optional, List

from utils.db import get_db, generate_id

logger = logging.getLogger(__name__)

UNIFIED_FIELDS = [
    'revenue', 'operating_profit', 'ebit', 'interest', 'pbt', 'tax', 'pat', 'eps',
    'total_assets', 'total_equity', 'total_debt', 'cash_equivalents',
    'cfo', 'capex', 'fcf', 'book_value_per_share', 'shares_outstanding'
]

def map_nse_field(row: Dict, field: str) -> Optional[float]:
    if not row: return None
    mapping = {
        'revenue': 'revenue',
        'operating_profit': 'operating_profit',
        'interest': 'interest',
        'pbt': 'pbt',
        'tax': 'tax',
        'pat': 'pat',
        'eps': 'eps',
    }
    return row.get(mapping.get(field))

def map_bse_field(row: Dict, field: str) -> Optional[float]:
    if not row: return None
    mapping = {
        'revenue': 'revenue',
        'operating_profit': 'operating_profit',
        'interest': 'interest',
        'pbt': 'pbt',
        'tax': 'tax',
        'pat': 'pat',
        'eps': 'eps',
    }
    return row.get(mapping.get(field))

def map_screener_field(q: Dict, bs: Dict, cf: Dict, r: Dict, field: str) -> Optional[float]:
    if not any([q, bs, cf, r]): return None
    
    # Quarterly / Income Statement
    if field == 'revenue': return q.get('sales') if q else None
    if field == 'operating_profit': return q.get('operating profit') if q else None
    if field == 'interest': return q.get('interest') if q else None
    if field == 'pbt': return q.get('profit before tax') if q else None
    if field == 'pat': return q.get('net profit') if q else None
    if field == 'eps': return q.get('eps in rs') if q else None
    if field == 'tax':
        if q and q.get('tax %') is not None and q.get('profit before tax') is not None:
            return (q['tax %'] / 100.0) * q['profit before tax']
        return None
        
    # Balance Sheet
    if field == 'total_assets': return bs.get('total assets') if bs else None
    if field == 'total_equity': 
        if bs and bs.get('share capital') is not None and bs.get('reserves') is not None:
            return bs['share capital'] + bs['reserves']
        return None
    if field == 'total_debt': return bs.get('borrowings') if bs else None
    if field == 'cash_equivalents': return bs.get('other assets') if bs else None # Heuristic if cash not split

    # Cash Flow
    if field == 'cfo': return cf.get('cash from operating activity') if cf else None
    if field == 'capex': return cf.get('cash from investing activity') if cf else None # Usually negative
    if field == 'fcf':
        if cf and cf.get('cash from operating activity') is not None and cf.get('cash from investing activity') is not None:
             return cf['cash from operating activity'] + cf['cash from investing activity']
        return None

    return None

def log_conflict(conn, p, field, values, chosen_val, chosen_source, conflict_type, pct_dev):
    conn.execute("""
        INSERT OR REPLACE INTO fundamental_conflicts (
            id, asset_id, period_end_date, field_name, nse_value, bse_value, scr_value, chosen_source, pct_deviation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        generate_id(), p['asset_id'], p['period_end_date'], field,
        values.get('NSE'), values.get('BSE'), values.get('SCREENER'),
        chosen_source, pct_dev
    ))

def upsert_unified(conn, p, merged):
    merged_clean = {k: v for k, v in merged.items() if v is not None}
    merged_clean['id'] = generate_id()
    merged_clean['asset_id'] = p['asset_id']
    merged_clean['period_end_date'] = p['period_end_date']
    merged_clean['is_consolidated'] = p['is_consolidated']
    
    placeholders = ", ".join(["?"] * len(merged_clean))
    columns = ", ".join(merged_clean.keys())
    
    conn.execute(f"INSERT OR REPLACE INTO fundamentals ({columns}) VALUES ({placeholders})", list(merged_clean.values()))

def refresh_unified_view():
    """Merge source tables into unified fundamentals with conflict detection."""
    logger.info("[FUNDAMENTALS] Refreshing unified view...")
    with get_db() as conn:
        periods = conn.execute("""
            SELECT DISTINCT asset_id, period_end_date, is_consolidated FROM (
                SELECT asset_id, period_end_date, is_consolidated FROM nse_fundamentals
                UNION
                SELECT asset_id, period_end_date, is_consolidated FROM bse_fundamentals
                UNION
                SELECT asset_id, period_end_date, is_consolidated FROM screener_quarterly
            )
        """).fetchall()
        
        for p in periods:
            # Fetch source rows
            nse = conn.execute("SELECT * FROM nse_fundamentals WHERE asset_id = ? AND period_end_date = ? AND is_consolidated = ?", 
                               (p['asset_id'], p['period_end_date'], p['is_consolidated'])).fetchone()
            bse = conn.execute("SELECT * FROM bse_fundamentals WHERE asset_id = ? AND period_end_date = ? AND is_consolidated = ?", 
                               (p['asset_id'], p['period_end_date'], p['is_consolidated'])).fetchone()
            
            # For screener, we might need multiple tables for the same period
            scr_q = conn.execute("SELECT * FROM screener_quarterly WHERE asset_id = ? AND period_end_date = ? AND is_consolidated = ?", 
                                (p['asset_id'], p['period_end_date'], p['is_consolidated'])).fetchone()
            scr_bs = conn.execute("SELECT * FROM screener_balance_sheet WHERE asset_id = ? AND period_end_date = ?", 
                                 (p['asset_id'], p['period_end_date'])).fetchone()
            scr_cf = conn.execute("SELECT * FROM screener_cashflow WHERE asset_id = ? AND period_end_date = ?", 
                                 (p['asset_id'], p['period_end_date'])).fetchone()
            
            merged = {}
            for field in UNIFIED_FIELDS:
                nse_val = map_nse_field(nse, field)
                bse_val = map_bse_field(bse, field)
                scr_val = map_screener_field(scr_q, scr_bs, scr_cf, None, field)
                
                values = {'NSE': nse_val, 'BSE': bse_val, 'SCREENER': scr_val}
                available = {k: v for k, v in values.items() if v is not None}
                
                if not available:
                    merged[field] = None
                    continue
                
                if len(available) == 1:
                    source, val = next(iter(available.items()))
                    merged[field] = val
                    continue
                
                # Check agreement
                vals = list(available.values())
                max_v = max(abs(v) for v in vals if v != 0) or 1
                pct_dev = (max(vals) - min(vals)) / max_v * 100
                
                if pct_dev < 2.0:
                    merged[field] = available.get('BSE', available.get('SCREENER', vals[0]))
                else:
                    merged[field] = available.get('BSE', vals[0])
                    log_conflict(conn, p, field, values, merged[field], 'BSE', 'MATERIAL', pct_dev)
            
            # Metadata
            if scr_q: merged['source'] = 'SCREENER'
            elif bse: merged['source'] = 'BSE'
            elif nse: merged['source'] = 'NSE'
                
            upsert_unified(conn, p, merged)
            
    logger.info(f"[FUNDAMENTALS] Refreshed {len(periods)} unified records.")

def run_fundamentals_pipeline(trade_date: date):
    from pipelines.nse_fundamentals import run_nse_fundamentals
    from pipelines.bse_fundamentals import run_bse_fundamentals
    from pipelines.screener_fundamentals import run_screener_fundamentals
    
    logger.info(f"[FUNDAMENTALS] Starting pipeline for {trade_date}")
    
    try: run_nse_fundamentals(trade_date)
    except Exception as e: logger.error(f"NSE phase failed: {e}")
    
    try: run_bse_fundamentals(trade_date)
    except Exception as e: logger.error(f"BSE phase failed: {e}")
    
    try: run_screener_fundamentals(trade_date)
    except Exception as e: logger.error(f"Screener phase failed: {e}")
    
    refresh_unified_view()
