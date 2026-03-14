"""
Fundamentals Pipeline Orchestrator.
Merges source-specific tables into a unified fundamentals view with conflict resolution.
"""
import logging
import time
import calendar
from datetime import date, datetime
from typing import Dict, Any, Optional, List

from core.db import get_db, generate_id

logger = logging.getLogger(__name__)

UNIFIED_FIELDS = [
    'revenue', 'operating_profit', 'ebit', 'interest', 'pbt', 'tax', 'pat', 'eps',
    'total_assets', 'total_equity', 'total_debt', 'cash_equivalents', 'trade_receivables',
    'cfo', 'cash_from_investing', 'cash_from_financing', 'net_change_in_cash', 'cash_begin_of_year', 'cash_end_of_year',
    'capex', 'fcf', 'book_value_per_share', 'shares_outstanding'
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

def map_msi_field(q: Dict, bs: Dict, cf: Dict, ratios: Dict, field: str) -> Optional[float]:
    if not any([q, bs, cf, ratios]): return None
    if field == 'revenue':
        if not q:
            return None
        return q.get('total_revenue') if q.get('total_revenue') is not None else q.get('revenue_ops')
    if field == 'operating_profit':
        if not q:
            return None
        if q.get('operating_profit') is not None:
            return q.get('operating_profit')
        if q.get('ebit') is not None and q.get('other_income') is not None:
            return q['ebit'] - q['other_income']
        return q.get('ebit')
    if field == 'interest': return q.get('finance_costs') if q else None
    if field == 'pbt': return q.get('profit_before_tax') if q else None
    if field == 'pat': return q.get('net_profit') if q else None
    if field == 'eps':
        if q and q.get('basic_eps') is not None:
            return q.get('basic_eps')
        return ratios.get('basic_eps') if ratios else None
    if field == 'tax':
        if q and q.get('tax_amount') is not None:
            return q['tax_amount']
        if q and q.get('profit_before_tax') is not None and q.get('net_profit') is not None:
            return q['profit_before_tax'] - q['net_profit']
        return None
    if field == 'ebit':
        if q and q.get('ebit') is not None:
            return q['ebit']
        if q and q.get('profit_before_tax') is not None and q.get('finance_costs') is not None:
            return q['profit_before_tax'] + q['finance_costs']
        return None
    if field == 'total_assets': return bs.get('total_assets') if bs else None
    if field == 'total_equity':
        if bs and bs.get('shareholders_funds_total') is not None:
            return bs['shareholders_funds_total']
        if bs and bs.get('equity_capital') is not None and bs.get('reserves') is not None:
            return bs['equity_capital'] + bs['reserves']
        return None
    if field == 'total_debt':
        if bs:
            long_term = bs.get('long_term_borrowings') or 0.0
            short_term = bs.get('short_term_borrowings') or 0.0
            return long_term + short_term
        return None
    if field == 'cash_equivalents': return bs.get('cash_equivalents') if bs else None
    if field == 'trade_receivables': return bs.get('trade_receivables') if bs else None
    if field == 'cfo': return cf.get('net_cash_operating') if cf else None
    if field == 'cash_from_investing': return cf.get('net_cash_investing') if cf else None
    if field == 'cash_from_financing': return cf.get('net_cash_financing') if cf else None
    if field == 'net_change_in_cash': return cf.get('net_change_in_cash') if cf else None
    if field == 'cash_begin_of_year': return cf.get('cash_begin_of_year') if cf else None
    if field == 'cash_end_of_year': return cf.get('cash_end_of_year') if cf else None
    if field == 'capex':
        if not cf:
            return None
        if cf.get('capex') is not None:
            return abs(cf['capex'])
        if cf.get('net_cash_investing') is not None:
            return abs(cf['net_cash_investing'])
        return None
    if field == 'fcf':
        if cf and cf.get('free_cash_flow') is not None:
            return cf['free_cash_flow']
        if cf and cf.get('net_cash_operating') is not None:
            if cf.get('capex') is not None:
                return cf['net_cash_operating'] - abs(cf['capex'])
            if cf.get('net_cash_investing') is not None:
                return cf['net_cash_operating'] + cf['net_cash_investing']
        return None
    if field == 'book_value_per_share':
        if ratios and ratios.get('book_value_per_share') is not None:
            return ratios.get('book_value_per_share')
        if bs and bs.get('equity_shares_number') not in (None, 0):
            total_equity = None
            if bs.get('shareholders_funds_total') is not None:
                total_equity = bs.get('shareholders_funds_total')
            elif bs.get('equity_capital') is not None and bs.get('reserves') is not None:
                total_equity = bs['equity_capital'] + bs['reserves']
            if total_equity is not None:
                return total_equity / bs['equity_shares_number']
        return None
    if field == 'shares_outstanding':
        if bs and bs.get('equity_shares_number') is not None:
            return bs.get('equity_shares_number')
        if q and q.get('net_profit') is not None and q.get('basic_eps') not in (None, 0):
            return q['net_profit'] / q['basic_eps']
        return None
    return None

def map_screener_field(q: Dict, bs: Dict, cf: Dict, field: str) -> Optional[float]:
    if not any([q, bs, cf]): return None
    if field == 'revenue': return q.get('sales') if q else None
    if field == 'operating_profit': return q.get('operating_profit') if q else None
    if field == 'interest': return q.get('interest') if q else None
    if field == 'pbt': return q.get('pbt') if q else None
    if field == 'pat': return q.get('net_profit') if q else None
    if field == 'eps': return q.get('eps') if q else None
    if field == 'tax':
        if q and q.get('tax_pct') is not None and q.get('pbt') is not None:
            return (q['tax_pct'] / 100.0) * q['pbt']
        return None
    if field == 'total_assets': return bs.get('total_assets') if bs else None
    if field == 'total_equity':
        if bs and bs.get('share_capital') is not None and bs.get('reserves') is not None:
            return bs['share_capital'] + bs['reserves']
        return None
    if field == 'total_debt': return bs.get('borrowings') if bs else None
    if field == 'cash_equivalents': return bs.get('other_assets') if bs else None
    if field == 'trade_receivables': return None
    if field == 'cfo': return cf.get('cash_from_operating') if cf else None
    if field == 'cash_from_investing': return cf.get('cash_from_investing') if cf else None
    if field == 'cash_from_financing': return cf.get('cash_from_financing') if cf else None
    if field == 'net_change_in_cash': return cf.get('net_cash_flow') if cf else None
    if field == 'cash_begin_of_year': return None
    if field == 'cash_end_of_year': return None
    if field == 'capex': return cf.get('cash_from_investing') if cf else None
    if field == 'fcf':
        if cf and cf.get('cash_from_operating') is not None and cf.get('cash_from_investing') is not None:
             return cf['cash_from_operating'] + cf['cash_from_investing']
        return None
    return None

def _ensure_fundamentals_columns(conn):
    existing = {
        row[1]
        for row in conn.execute("PRAGMA table_info(fundamentals)").fetchall()
    }
    wanted = {
        'trade_receivables': 'REAL',
        'cash_from_investing': 'REAL',
        'cash_from_financing': 'REAL',
        'net_change_in_cash': 'REAL',
        'cash_begin_of_year': 'REAL',
        'cash_end_of_year': 'REAL',
    }
    for column, col_type in wanted.items():
        if column not in existing:
            conn.execute(f"ALTER TABLE fundamentals ADD COLUMN {column} {col_type}")

def log_conflict(conn, p, field, values, chosen_val, chosen_source, conflict_type, pct_dev):
    conn.execute("""
        INSERT OR REPLACE INTO fundamental_conflicts (
            id, asset_id, period_end_date, field_name, nse_value, bse_value, scr_value, chosen_source, pct_deviation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        generate_id(), p['asset_id'], p['period_end_date'], field,
        values.get('MSI', values.get('NSE')), values.get('BSE'), values.get('SCREENER'),
        chosen_source, pct_dev
    ))

def _resolve_table_name(conn, candidates: List[str]) -> Optional[str]:
    for candidate in candidates:
        row = conn.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?",
            (candidate,),
        ).fetchone()
        if row:
            return candidate
    return None

def _normalize_period_date(date_str: Optional[str]) -> Optional[str]:
    if not date_str:
        return None
    if len(date_str) == 10 and date_str.count("-") == 2:
        return date_str
    for fmt in ("%b-%y", "%b %Y"):
        try:
            dt = datetime.strptime(date_str, fmt)
            last_day = calendar.monthrange(dt.year, dt.month)[1]
            return f"{dt.year}-{dt.month:02d}-{last_day:02d}"
        except ValueError:
            continue
    return date_str

def _load_rows_by_period(conn, table_name: Optional[str], default_is_consolidated: int) -> Dict[tuple, Dict[str, Any]]:
    if not table_name:
        return {}
    rows = conn.execute(f"SELECT * FROM {table_name}").fetchall()
    indexed: Dict[tuple, Dict[str, Any]] = {}
    for row in rows:
        record = dict(row)
        normalized_date = _normalize_period_date(record.get('period_end_date'))
        if not normalized_date:
            continue
        is_consolidated = record.get('is_consolidated', default_is_consolidated)
        indexed[(record['asset_id'], normalized_date, is_consolidated)] = record
    return indexed


def _load_rows_by_period_multi(conn, tables: List[tuple[str, int]]) -> Dict[tuple, Dict[str, Any]]:
    indexed: Dict[tuple, Dict[str, Any]] = {}
    for table_name, default_is_consolidated in tables:
        indexed.update(_load_rows_by_period(conn, table_name, default_is_consolidated))
    return indexed

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
        _ensure_fundamentals_columns(conn)
        msi_q_table = _resolve_table_name(conn, ['src_msi_quarterly', 'msi_fundamentals_quarterly'])
        msi_q_table_standalone = _resolve_table_name(conn, ['src_msi_quarterly_standalone'])
        msi_bs_table = _resolve_table_name(conn, ['src_msi_balance_sheet', 'msi_balance_sheets'])
        msi_bs_table_standalone = _resolve_table_name(conn, ['src_msi_balance_sheet_standalone'])
        msi_cf_table = _resolve_table_name(conn, ['src_msi_cashflow', 'msi_cash_flows'])
        msi_cf_table_standalone = _resolve_table_name(conn, ['src_msi_cashflow_standalone'])
        msi_ratio_table = _resolve_table_name(conn, ['src_msi_ratios', 'msi_ratios_quarterly'])
        msi_ratio_table_standalone = _resolve_table_name(conn, ['src_msi_ratios_standalone'])
        scr_q_table = _resolve_table_name(conn, ['src_screener_quarterly', 'screener_quarterly'])
        scr_bs_table = _resolve_table_name(conn, ['src_screener_balance_sheet', 'screener_balance_sheet'])
        scr_cf_table = _resolve_table_name(conn, ['src_screener_cashflow', 'screener_cashflow'])

        if not msi_q_table and not msi_q_table_standalone and not scr_q_table:
            logger.warning("[FUNDAMENTALS] No MSI or Screener quarterly tables available for unified merge")
            return

        conn.execute("DELETE FROM fundamentals")
        conn.execute("DELETE FROM fundamental_conflicts")

        msi_q_rows = _load_rows_by_period_multi(conn, [(t, d) for t, d in [(msi_q_table, 1), (msi_q_table_standalone, 0)] if t])
        msi_bs_rows = _load_rows_by_period_multi(conn, [(t, d) for t, d in [(msi_bs_table, 1), (msi_bs_table_standalone, 0)] if t])
        msi_cf_rows = _load_rows_by_period_multi(conn, [(t, d) for t, d in [(msi_cf_table, 1), (msi_cf_table_standalone, 0)] if t])
        msi_ratio_rows = _load_rows_by_period_multi(conn, [(t, d) for t, d in [(msi_ratio_table, 1), (msi_ratio_table_standalone, 0)] if t])
        scr_q_rows = _load_rows_by_period(conn, scr_q_table, 1)
        scr_bs_rows = _load_rows_by_period(conn, scr_bs_table, 1)
        scr_cf_rows = _load_rows_by_period(conn, scr_cf_table, 1)

        periods = sorted(
            set(msi_q_rows.keys())
            .union(msi_bs_rows.keys())
            .union(msi_cf_rows.keys())
            .union(msi_ratio_rows.keys())
            .union(scr_q_rows.keys())
            .union(scr_bs_rows.keys())
            .union(scr_cf_rows.keys())
        )

        for asset_id, normalized_period_end_date, is_consolidated in periods:
            p = {
                'asset_id': asset_id,
                'period_end_date': normalized_period_end_date,
                'is_consolidated': is_consolidated,
            }

            msi_q = msi_q_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            msi_bs = msi_bs_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            msi_cf = msi_cf_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            msi_ratio = msi_ratio_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            scr_q = scr_q_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            scr_bs = scr_bs_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            scr_cf = scr_cf_rows.get((asset_id, normalized_period_end_date, is_consolidated))
            
            merged = {}
            for field in UNIFIED_FIELDS:
                msi_val = map_msi_field(msi_q, msi_bs, msi_cf, msi_ratio, field)
                scr_val = map_screener_field(scr_q, scr_bs, scr_cf, field)
                
                values = {'MSI': msi_val, 'SCREENER': scr_val}
                available = {k: v for k, v in values.items() if v is not None}
                
                if not available:
                    merged[field] = None
                    continue
                
                if len(available) == 1:
                    source, val = next(iter(available.items()))
                    merged[field] = val
                    continue
                
                vals = list(available.values())
                non_zero_abs = [abs(v) for v in vals if v != 0]
                max_v = max(non_zero_abs) if non_zero_abs else 1
                pct_dev = (max(vals) - min(vals)) / max_v * 100
                
                merged[field] = available.get('MSI', available.get('SCREENER', vals[0]))
                if pct_dev >= 2.0:
                    log_conflict(conn, p, field, values, merged[field], 'MSI', 'MATERIAL', pct_dev)
            
            if msi_q or msi_bs or msi_cf or msi_ratio:
                merged['source'] = 'MSI'
            elif scr_q or scr_bs or scr_cf:
                merged['source'] = 'SCREENER'
                
            upsert_unified(conn, p, merged)
            
    logger.info(f"[FUNDAMENTALS] Refreshed {len(periods)} unified records.")

def run_fundamentals_pipeline(trade_date: date):
    from pipelines.cogencis_fundamentals import run_cogencis_fundamentals
    from pipelines.screener_fundamentals import run_screener_fundamentals
    
    logger.info(f"[FUNDAMENTALS] Starting pipeline for {trade_date}")

    try: run_screener_fundamentals(trade_date)
    except Exception as e: logger.error(f"Screener phase failed: {e}")

    try: run_cogencis_fundamentals(trade_date)
    except Exception as e: logger.error(f"Cogencis phase failed: {e}")
    
    refresh_unified_view()
