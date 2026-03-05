import sqlite3
import json
import time
import logging
import argparse
import os
from datetime import datetime
from pathlib import Path
import requests
import threading
import concurrent.futures
from queue import Queue

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_BASE_DIR = os.path.join(BASE_DIR, "raw_data", "MARKETSMITHINDIA")
os.makedirs(RAW_BASE_DIR, exist_ok=True)

BASE_URL = "https://marketsmithindia.com/gateway/simple-api/ms-india"
DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
}
RATIONAL_DELAY = 0.5  # seconds between API calls
MAX_RETRIES = 3

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()],
)
log = logging.getLogger(__name__)

# Global lock for DB writes across threads
db_lock = threading.Lock()


# ---------------------------------------------------------------------------
# DB setup
# ---------------------------------------------------------------------------

def setup_db(db_path):
    conn = sqlite3.connect(db_path, timeout=30.0)
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_company_data (
        asset_id TEXT PRIMARY KEY,
        msi_instrument_id INTEGER,
        master_score INTEGER,
        eps_rating INTEGER,
        rs_rating INTEGER,
        composite_rating INTEGER,
        smr_rating TEXT,
        acc_dis_rating TEXT,
        price_strength INTEGER,
        week_high_52 REAL,
        week_low_52 REAL,
        pct_from_high REAL,
        buyer_demand TEXT,
        group_rank INTEGER,
        industry_group TEXT,
        industry_group_rank TEXT,
        sector TEXT,
        sub_group TEXT,
        industry_symbol TEXT,
        canslim_checklist TEXT,
        red_flags TEXT,
        chart_patterns TEXT,
        ai_report_summary TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_fundamentals_annual (
        asset_id TEXT,
        period_end_date TEXT,
        revenue_ops REAL, total_revenue REAL, materials_consumed REAL,
        employee_benefits REAL, depreciation REAL, finance_costs REAL,
        profit_before_tax REAL, net_profit REAL,
        basic_eps REAL, diluted_eps REAL, dividend_rate REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_quarterly (
        asset_id TEXT,
        period_end_date TEXT,
        revenue_ops REAL, total_revenue REAL, materials_consumed REAL,
        employee_benefits REAL, depreciation REAL, finance_costs REAL,
        profit_before_tax REAL, net_profit REAL,
        basic_eps REAL, diluted_eps REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_balance_sheet (
        asset_id TEXT,
        period_end_date TEXT,
        equity_capital REAL, reserves REAL,
        long_term_borrowings REAL, short_term_borrowings REAL,
        total_liabilities REAL, fixed_assets REAL, cwip REAL,
        investments REAL, inventories REAL, trade_receivables REAL,
        cash_equivalents REAL, total_assets REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_cash_flows (
        asset_id TEXT,
        period_end_date TEXT,
        ops_profit_before_wc REAL, wc_changes REAL,
        net_cash_operating REAL, capex REAL,
        net_cash_investing REAL, net_cash_financing REAL,
        net_change_in_cash REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_ratios_annual (
        asset_id TEXT,
        period_end_date TEXT,
        ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
        roe REAL, roce REAL, debt_equity REAL,
        asset_turnover REAL, inventory_turnover REAL,
        debtor_days REAL, creditor_days REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_ratios_quarterly (
        asset_id TEXT,
        period_end_date TEXT,
        ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
        roe REAL, roce REAL, debt_equity REAL,
        asset_turnover REAL, inventory_turnover REAL,
        debtor_days REAL, creditor_days REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_shareholding (
        asset_id TEXT,
        period_end_date TEXT,
        promoter_holding REAL, fii_holding REAL,
        dii_holding REAL, public_holding REAL, pledged_shares REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_block_deals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id TEXT,
        deal_date TEXT, deal_type TEXT, client_name TEXT,
        quantity REAL, price REAL, value REAL, exchange TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        asset_id TEXT,
        news_date TEXT, headline TEXT, source TEXT, url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS msi_pipeline_runs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        run_started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        run_finished_at DATETIME,
        total_symbols INTEGER,
        success_count INTEGER,
        failure_count INTEGER,
        failed_symbols TEXT,
        notes TEXT
    );
    ''')
    conn.commit()
    return conn


# ---------------------------------------------------------------------------
# HTTP helper
# ---------------------------------------------------------------------------

def _get(url, retries=MAX_RETRIES):
    for attempt in range(1, retries + 1):
        try:
            resp = requests.get(url, headers=DEFAULT_HEADERS, timeout=15)
            if resp.status_code == 401 or resp.status_code == 403:
                raise PermissionError(f"Auth error {resp.status_code} – refresh ms-auth token")
            if resp.status_code == 429:
                wait = 60 * attempt
                log.warning(f"Rate limited. Sleeping {wait}s before retry {attempt}/{retries}")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()
        except PermissionError:
            raise
        except Exception as e:
            log.warning(f"Attempt {attempt}/{retries} failed for {url}: {e}")
            if attempt < retries:
                time.sleep(2 ** attempt)
    return None


# ---------------------------------------------------------------------------
# API fetch functions
# ---------------------------------------------------------------------------

def _get_date_params():
    now = datetime.now()
    # Provide a 5 year window for historical queries (s and e)
    e = now.strftime('%Y%m%d')
    from datetime import timedelta
    s = (now - timedelta(days=365*5)).strftime('%Y%m%d')
    return s, e

def get_msi_instrument_id(symbol, auth_token):
    url = f"{BASE_URL}/instr/srch.json?text={symbol}&lang=en&ver=2&ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        results = data['response'].get('results', [])
        if results:
            # Return full dict so we have industrySymbol etc early
            return results[0]
    return None


def fetch_ratings(instrument_id, auth_token):
    s, e = _get_date_params()
    url = f"{BASE_URL}/instr/0/{instrument_id}/eHeaderDetails.json?p=1&s={s}&e={e}&ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', {}), data
    if data and 'headerDetails' in data:
        return data.get('headerDetails') or {}, data
    return {}, data


def fetch_canslim(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/0/{instrument_id}/wisdom.json?lang=en&ver=2&ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', {}), data
    return {}, data


def fetch_finance_details(instrument_id, auth_token, consolidated=False):
    flag = 'true' if consolidated else 'false'
    url = f"{BASE_URL}/instr/0/{instrument_id}/financeDetails.json?isConsolidated={flag}&ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'], data
    return data or {}, data


def fetch_red_flags(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/{instrument_id}/getRedFlags.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


def fetch_ai_report(instrument_id, auth_token):
    url = f"{BASE_URL}/aireport/getAiReport.json?osid={instrument_id}&ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('reportText') or data['response'].get('data', ''), data
    return '', data


def fetch_block_deals(instrument_id, auth_token):
    url = f"{BASE_URL}/{instrument_id}/getBulkBlockDeals.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


def fetch_news(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/0/{instrument_id}/getStockInstrumentNews.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


def fetch_symboldetails(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/0/{instrument_id}/symboldetails.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'], data
    return {}, data


def fetch_chart_patterns(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/0/{instrument_id}/getChartPatterns.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


def fetch_institutional_activity(instrument_id, auth_token):
    url = f"{BASE_URL}/instr/0/{instrument_id}/getInstitutionalActivity.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


def fetch_industry_group_rankings(auth_token):
    """Fetch all 197 industry group RS rankings for today."""
    url = f"{BASE_URL}/market/getIndustryGroupPerformance.json?ms-auth={auth_token}"
    data = _get(url)
    if data and 'response' in data:
        return data['response'].get('data', []), data
    return [], data


# ---------------------------------------------------------------------------
# Header -> column index mapping helpers
# ---------------------------------------------------------------------------

def _build_header_map(header_list):
    """Returns {displayName_lower: c_index} from MSI header arrays."""
    return {h['shortName'].strip().lower(): h['id'] for h in (header_list or [])}


def _val(row, col_id, default=None):
    """Safely get a numeric value from a financeDetails row dict."""
    raw = row.get(col_id)
    if raw is None or raw == '' or raw == '0.00' and default is not None:
        return default
    try:
        return float(raw)
    except (ValueError, TypeError):
        return default


def _find_col(header_map, *candidates):
    """Find the first matching column id from a set of candidate short names."""
    for name in candidates:
        if name.lower() in header_map:
            return header_map[name.lower()]
    return None


# ---------------------------------------------------------------------------
# Finance details parsers
# ---------------------------------------------------------------------------

def _parse_income(fin, asset_id, is_quarterly=False):
    data_key = 'incQuarterData' if is_quarterly else 'incAnnualData'
    header_key = 'incQuarterHeader' if is_quarterly else 'incAnnualHeader'
    rows = fin.get(data_key, [])
    headers = fin.get(header_key, [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period    = 'c0'
    col_rev_ops   = _find_col(hmap, 'net sales', 'revenue from operations', 'revenue (ops)', 'revenue-ops', 'interest earned')
    col_tot_rev   = _find_col(hmap, 'total revenue', 'total income')
    col_other_inc = _find_col(hmap, 'other income', 'non-operating income')
    col_materials = _find_col(hmap, 'material cost', 'materials consumed', 'raw materials')
    col_emp       = _find_col(hmap, 'employee cost', 'employee benefits', 'payments to employees')
    col_dep       = _find_col(hmap, 'depreciation', 'd&a')
    col_ebitda    = _find_col(hmap, 'ebitda', 'operating profit')
    col_fin_cost  = _find_col(hmap, 'finance cost', 'interest', 'interest expended')
    col_pbt       = _find_col(hmap, 'pbt', 'profit before tax', 'p/l- before tax')
    col_tax       = _find_col(hmap, 'tax', 'tax expense', 'provision for tax')
    col_pat       = _find_col(hmap, 'pat', 'net profit', 'net income', 'profit/loss', 'profit / loss')
    col_basic_eps = _find_col(hmap, 'eps', 'basic eps', 'basic eps(rs.)')
    col_dil_eps   = _find_col(hmap, 'diluted eps', 'diluted eps(rs.)')
    col_div       = _find_col(hmap, 'dividend', 'dividend rate', 'dividend rate (%)', 'equity share div') if not is_quarterly else None
    col_sg        = _find_col(hmap, 'sales growth', 'revenue growth yoy')
    col_pg        = _find_col(hmap, 'pat growth', 'net profit growth')
    col_eg        = _find_col(hmap, 'eps growth', 'eps growth yoy')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        record = {
            'asset_id': asset_id,
            'period_end_date': period,
            'revenue_ops':        _val(row, col_rev_ops),
            'total_revenue':      _val(row, col_tot_rev),
            'other_income':       _val(row, col_other_inc),
            'materials_consumed': _val(row, col_materials),
            'employee_benefits':  _val(row, col_emp),
            'depreciation':       _val(row, col_dep),
            'ebitda':             _val(row, col_ebitda),
            'finance_costs':      _val(row, col_fin_cost),
            'profit_before_tax':  _val(row, col_pbt),
            'tax_amount':         _val(row, col_tax),
            'net_profit':         _val(row, col_pat),
            'basic_eps':          _val(row, col_basic_eps),
            'diluted_eps':        _val(row, col_dil_eps),
            'sales_growth_yoy':   _val(row, col_sg),
            'pat_growth_yoy':     _val(row, col_pg),
            'eps_growth_yoy':     _val(row, col_eg),
        }
        if not is_quarterly:
            record['dividend_rate'] = _val(row, col_div)
        parsed.append(record)
    return parsed


def _parse_balance_sheet(fin, asset_id):
    rows = fin.get('bsData', [])
    headers = fin.get('bsHeader', [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period   = 'c0'
    col_eq_cap   = _find_col(hmap, 'equity capital', 'share capital', 'equity share')
    col_reserves = _find_col(hmap, 'reserves', 'reserves & surplus')
    col_lt_borrow = _find_col(hmap, 'long term borrowings', 'lt borrowings')
    col_st_borrow = _find_col(hmap, 'short term borrowings', 'st borrowings')
    col_tot_liab  = _find_col(hmap, 'total liabilities', 'total equity & liabilities', 'current liab-total')
    col_fixed     = _find_col(hmap, 'net block', 'fixed assets')
    col_cwip      = _find_col(hmap, 'cwip', 'capital work in progress', 'work-in-progress')
    col_invest    = _find_col(hmap, 'investments', 'lt investments', 'current investments')
    col_inv       = _find_col(hmap, 'inventories', 'inventory')
    col_rec       = _find_col(hmap, 'trade receivables', 'debtors')
    col_cash      = _find_col(hmap, 'cash', 'cash & equivalents', 'cash & bank', 'cash & equiv')
    col_tot_assets = _find_col(hmap, 'total assets')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        parsed.append({
            'asset_id': asset_id,
            'period_end_date':      period,
            'equity_capital':       _val(row, col_eq_cap),
            'reserves':             _val(row, col_reserves),
            'long_term_borrowings': _val(row, col_lt_borrow),
            'short_term_borrowings':_val(row, col_st_borrow),
            'total_liabilities':    _val(row, col_tot_liab),
            'fixed_assets':         _val(row, col_fixed),
            'cwip':                 _val(row, col_cwip),
            'investments':          _val(row, col_invest),
            'inventories':          _val(row, col_inv),
            'trade_receivables':    _val(row, col_rec),
            'cash_equivalents':     _val(row, col_cash),
            'total_assets':         _val(row, col_tot_assets),
        })
    return parsed


def _parse_cash_flows(fin, asset_id):
    rows = fin.get('cfData', [])
    headers = fin.get('cfHeader', [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period    = 'c0'
    col_ops_pbwc  = _find_col(hmap, 'operating profit', 'profit before wc changes', 'profits before tax')
    col_wc        = _find_col(hmap, 'wc changes', 'changes in working capital')
    col_net_ops   = _find_col(hmap, 'net cash from operations', 'cfo', 'cf-ops act')
    col_capex     = _find_col(hmap, 'capex', 'fixed assets purchased', 'purchase of fixed assets')
    col_net_inv   = _find_col(hmap, 'net cash from investing', 'cfi', 'cf-investing act')
    col_net_fin   = _find_col(hmap, 'net cash from financing', 'cff', 'cf-finance act')
    col_net_chg   = _find_col(hmap, 'net change in cash', 'net inc/dec in cash', 'cash & equiv-chg')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        parsed.append({
            'asset_id': asset_id,
            'period_end_date':    period,
            'ops_profit_before_wc': _val(row, col_ops_pbwc),
            'wc_changes':           _val(row, col_wc),
            'net_cash_operating':   _val(row, col_net_ops),
            'capex':                _val(row, col_capex),
            'net_cash_investing':   _val(row, col_net_inv),
            'net_cash_financing':   _val(row, col_net_fin),
            'net_change_in_cash':   _val(row, col_net_chg),
        })
    return parsed


def _parse_ratios(fin, asset_id, is_quarterly=False):
    data_key   = 'ratiosQuarterData' if is_quarterly else 'ratiosAnnualData'
    header_key = 'ratiosQuarterHeader' if is_quarterly else 'ratiosAnnualHeader'
    rows    = fin.get(data_key, [])
    headers = fin.get(header_key, [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period = 'c0'
    col_ebit   = _find_col(hmap, 'ebit margin', 'ebit margin (%)')
    col_pt     = _find_col(hmap, 'pt margin', 'pre tax margin', 'pre tax margin (%)')
    col_pat    = _find_col(hmap, 'atm', 'after tax margin', 'net profit margin')
    col_roe    = _find_col(hmap, 'roe', 'return on equity')
    col_roa    = _find_col(hmap, 'roa', 'return on assets')
    col_roce   = _find_col(hmap, 'roce', 'return on capital employed')
    col_de     = _find_col(hmap, 'lt debttoequity', 'd/e', 'debt/equity', 'debt equity ratio')
    col_cr     = _find_col(hmap, 'current ratio')
    col_ic     = _find_col(hmap, 'interest coverage', 'int coverage')
    col_at     = _find_col(hmap, 'asset turnover', 'asset turn')
    col_it     = _find_col(hmap, 'inventory turnover', 'inv turn')
    col_dd     = _find_col(hmap, 'debtor days', 'receivable days')
    col_cd     = _find_col(hmap, 'creditor days', 'payable days')
    col_pe     = _find_col(hmap, 'p/e', 'pe ratio', 'price/earnings')
    col_pb     = _find_col(hmap, 'p/bv', 'pb ratio', 'price/book')
    col_ev     = _find_col(hmap, 'ev/ebitda', 'ev ebitda')
    col_ps     = _find_col(hmap, 'p/s', 'price/sales', 'ps ratio')
    col_dy     = _find_col(hmap, 'dividend yield', 'div yield')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        parsed.append({
            'asset_id': asset_id,
            'period_end_date':   period,
            'ebit_margin':       _val(row, col_ebit),
            'pre_tax_margin':    _val(row, col_pt),
            'net_profit_margin': _val(row, col_pat),
            'roe':               _val(row, col_roe),
            'roa':               _val(row, col_roa),
            'roce':              _val(row, col_roce),
            'debt_equity':       _val(row, col_de),
            'current_ratio':     _val(row, col_cr),
            'interest_coverage': _val(row, col_ic),
            'asset_turnover':    _val(row, col_at),
            'inventory_turnover':_val(row, col_it),
            'debtor_days':       _val(row, col_dd),
            'creditor_days':     _val(row, col_cd),
            'pe_ratio':          _val(row, col_pe),
            'pb_ratio':          _val(row, col_pb),
            'ev_ebitda':         _val(row, col_ev),
            'ps_ratio':          _val(row, col_ps),
            'dividend_yield':    _val(row, col_dy),
        })
    return parsed


def _parse_shareholding(fin, asset_id):
    rows = fin.get('shareholdingLatestFourQuaterPatternModel', [])
    if not rows:
        return []

    # Format is: [{"name": "Promoters", "value": 71.77, "month": "Dec-25", "displayOrder": "1"}, ...]
    # We need to pivot this by month
    by_period = {}
    for row in rows:
        period = row.get('month', '').strip()
        if not period:
            continue
        if period not in by_period:
            by_period[period] = {
                'asset_id': asset_id,
                'period_end_date': period,
                'promoter_holding': None,
                'fii_holding': None,
                'dii_holding': None,
                'public_holding': None,
                'pledged_shares': None
            }
        
        name = row.get('name', '').lower()
        val = _safe_float(row.get('value'))
        
        if 'promoter' in name:
            by_period[period]['promoter_holding'] = val
        elif 'foreign' in name or 'fii' in name:
            by_period[period]['fii_holding'] = val
        elif 'mutual' in name or 'insurance' in name or 'institution' in name or 'dii' in name:
            # aggregate DII
            curr = by_period[period]['dii_holding'] or 0.0
            by_period[period]['dii_holding'] = curr + (val or 0.0)
        elif 'individual' in name or 'public' in name or 'other' in name:
            # aggregate Public/Other
            curr = by_period[period]['public_holding'] or 0.0
            by_period[period]['public_holding'] = curr + (val or 0.0)

    # Clean up 0.0 to None if it was just initialized
    for p in by_period.values():
        if p['dii_holding'] == 0.0: p['dii_holding'] = None
        if p['public_holding'] == 0.0: p['public_holding'] = None

    return list(by_period.values())


def _safe_float(val):
    try:
        return float(val) if val not in (None, '', 'null') else None
    except (ValueError, TypeError):
        return None


# ---------------------------------------------------------------------------
# DB upsert helpers
# ---------------------------------------------------------------------------

def _upsert_income(conn, records, is_quarterly=False):
    table = 'src_msi_quarterly' if is_quarterly else 'msi_fundamentals_annual'
    base_cols = 'asset_id, period_end_date, revenue_ops, total_revenue, materials_consumed, employee_benefits, depreciation, finance_costs, profit_before_tax, net_profit, basic_eps, diluted_eps'
    base_placeholders = ', '.join(['?'] * 12)
    for r in records:
        if is_quarterly:
            conn.execute(f'''
                INSERT INTO {table} ({base_cols})
                VALUES ({base_placeholders})
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                    revenue_ops=excluded.revenue_ops, total_revenue=excluded.total_revenue,
                    materials_consumed=excluded.materials_consumed, employee_benefits=excluded.employee_benefits,
                    depreciation=excluded.depreciation, finance_costs=excluded.finance_costs,
                    profit_before_tax=excluded.profit_before_tax, net_profit=excluded.net_profit,
                    basic_eps=excluded.basic_eps, diluted_eps=excluded.diluted_eps;
            ''', (r['asset_id'], r['period_end_date'], r['revenue_ops'], r['total_revenue'],
                  r['materials_consumed'], r['employee_benefits'], r['depreciation'], r['finance_costs'],
                  r['profit_before_tax'], r['net_profit'], r['basic_eps'], r['diluted_eps']))
        else:
            conn.execute(f'''
                INSERT INTO {table} ({base_cols}, dividend_rate)
                VALUES ({base_placeholders}, ?)
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                    revenue_ops=excluded.revenue_ops, total_revenue=excluded.total_revenue,
                    materials_consumed=excluded.materials_consumed, employee_benefits=excluded.employee_benefits,
                    depreciation=excluded.depreciation, finance_costs=excluded.finance_costs,
                    profit_before_tax=excluded.profit_before_tax, net_profit=excluded.net_profit,
                    basic_eps=excluded.basic_eps, diluted_eps=excluded.diluted_eps,
                    dividend_rate=excluded.dividend_rate;
            ''', (r['asset_id'], r['period_end_date'], r['revenue_ops'], r['total_revenue'],
                  r['materials_consumed'], r['employee_benefits'], r['depreciation'], r['finance_costs'],
                  r['profit_before_tax'], r['net_profit'], r['basic_eps'], r['diluted_eps'], r['dividend_rate']))


def _upsert_balance_sheet(conn, records):
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_balance_sheet
              (asset_id, period_end_date, equity_capital, reserves, long_term_borrowings,
               short_term_borrowings, total_liabilities, fixed_assets, cwip, investments,
               inventories, trade_receivables, cash_equivalents, total_assets)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              equity_capital=excluded.equity_capital, reserves=excluded.reserves,
              long_term_borrowings=excluded.long_term_borrowings, short_term_borrowings=excluded.short_term_borrowings,
              total_liabilities=excluded.total_liabilities, fixed_assets=excluded.fixed_assets,
              cwip=excluded.cwip, investments=excluded.investments, inventories=excluded.inventories,
              trade_receivables=excluded.trade_receivables, cash_equivalents=excluded.cash_equivalents,
              total_assets=excluded.total_assets;
        ''', (r['asset_id'], r['period_end_date'], r['equity_capital'], r['reserves'],
              r['long_term_borrowings'], r['short_term_borrowings'], r['total_liabilities'],
              r['fixed_assets'], r['cwip'], r['investments'], r['inventories'],
              r['trade_receivables'], r['cash_equivalents'], r['total_assets']))


def _upsert_cash_flows(conn, records):
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_cashflow
              (asset_id, period_end_date, ops_profit_before_wc, wc_changes, net_cash_operating,
               capex, net_cash_investing, net_cash_financing, net_change_in_cash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              ops_profit_before_wc=excluded.ops_profit_before_wc, wc_changes=excluded.wc_changes,
              net_cash_operating=excluded.net_cash_operating, capex=excluded.capex,
              net_cash_investing=excluded.net_cash_investing, net_cash_financing=excluded.net_cash_financing,
              net_change_in_cash=excluded.net_change_in_cash;
        ''', (r['asset_id'], r['period_end_date'], r['ops_profit_before_wc'], r['wc_changes'],
              r['net_cash_operating'], r['capex'], r['net_cash_investing'],
              r['net_cash_financing'], r['net_change_in_cash']))


def _upsert_ratios(conn, records, is_quarterly=False):
    table = 'src_msi_ratios' if is_quarterly else 'msi_ratios_annual'
    for r in records:
        conn.execute(f'''
            INSERT INTO {table}
              (asset_id, period_end_date, ebit_margin, pre_tax_margin, net_profit_margin,
               roe, roce, debt_equity, asset_turnover, inventory_turnover, debtor_days, creditor_days)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              ebit_margin=excluded.ebit_margin, pre_tax_margin=excluded.pre_tax_margin,
              net_profit_margin=excluded.net_profit_margin, roe=excluded.roe, roce=excluded.roce,
              debt_equity=excluded.debt_equity, asset_turnover=excluded.asset_turnover,
              inventory_turnover=excluded.inventory_turnover, debtor_days=excluded.debtor_days,
              creditor_days=excluded.creditor_days;
        ''', (r['asset_id'], r['period_end_date'], r['ebit_margin'], r['pre_tax_margin'],
              r['net_profit_margin'], r['roe'], r['roce'], r['debt_equity'],
              r['asset_turnover'], r['inventory_turnover'], r['debtor_days'], r['creditor_days']))


def _upsert_shareholding(conn, records):
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_shareholding
              (asset_id, period_end_date, promoter_holding, fii_holding, dii_holding, public_holding, pledged_shares)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              promoter_holding=excluded.promoter_holding, fii_holding=excluded.fii_holding,
              dii_holding=excluded.dii_holding, public_holding=excluded.public_holding,
              pledged_shares=excluded.pledged_shares;
        ''', (r['asset_id'], r['period_end_date'], r['promoter_holding'], r['fii_holding'],
              r['dii_holding'], r['public_holding'], r['pledged_shares']))


def _insert_block_deals(conn, asset_id, deals):
    conn.execute('DELETE FROM msi_block_deals WHERE asset_id = ?', (asset_id,))
    for d in deals:
        conn.execute('''
            INSERT INTO msi_block_deals (asset_id, deal_date, deal_type, client_name, quantity, price, value, exchange)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            asset_id,
            d.get('date') or d.get('dealDate'),
            d.get('dealType') or d.get('type'),
            d.get('clientName') or d.get('client'),
            _safe_float(d.get('quantity') or d.get('qty')),
            _safe_float(d.get('price')),
            _safe_float(d.get('value') or d.get('tradeValue')),
            d.get('exchange') or d.get('exch'),
        ))


def _insert_news(conn, asset_id, news_items):
    conn.execute('DELETE FROM msi_news WHERE asset_id = ?', (asset_id,))
    for n in news_items:
        conn.execute('''
            INSERT INTO msi_news (asset_id, news_date, headline, source, url)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            asset_id,
            n.get('date') or n.get('newsDate') or n.get('publishedAt'),
            n.get('headline') or n.get('title'),
            n.get('source') or n.get('newsSource'),
            n.get('url') or n.get('link'),
        ))


# ---------------------------------------------------------------------------
# Main per-company processor
# ---------------------------------------------------------------------------

def process_company(conn, asset_id, nse_symbol, auth_token):
    log.info(f"Processing {nse_symbol}...")
    
    raw_file = Path(RAW_BASE_DIR) / f"{nse_symbol}.json"
    mega_data = {}
    
    if raw_file.exists():
        log.info(f"  -> Loading {nse_symbol} from raw data on disk (skipping scraping)")
        with open(raw_file, 'r') as f:
            mega_data = json.load(f)
    else:
        # --- Scraping Logic ---
        basics_raw = get_msi_instrument_id(nse_symbol, auth_token)
        inst_id = basics_raw.get('instrumentId') if basics_raw else None
        if not inst_id:
            log.warning(f"  -> Could not resolve instrument ID for {nse_symbol}")
            return False

        time.sleep(RATIONAL_DELAY)

        # Ratings
        ratings_extracted, ratings_raw = fetch_ratings(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)
        
        # CANSLIM
        canslim_extracted, canslim_raw = fetch_canslim(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # Red Flags
        red_flags_extracted, red_flags_raw = fetch_red_flags(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # AI Report
        ai_report_extracted, ai_report_raw = fetch_ai_report(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # Finance
        fin_extracted, fin_raw = fetch_finance_details(inst_id, auth_token, consolidated=True)
        time.sleep(RATIONAL_DELAY)

        # Symbol Details (for sector/industry/rank info)
        sd_extracted, sd_raw = fetch_symboldetails(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # Block Deals
        deals_extracted, deals_raw = fetch_block_deals(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # News
        news_extracted, news_raw = fetch_news(inst_id, auth_token)
        time.sleep(RATIONAL_DELAY)

        # Assemble mega_data for disk storage
        mega_data = {
            'msi_instrument_id': inst_id,
            'instrument_basics': basics_raw,
            'ratings': ratings_raw,
            'canslim': canslim_raw,
            'red_flags': red_flags_raw,
            'ai_report': ai_report_raw,
            'finance_details': fin_raw,
            'symboldetails': sd_raw,
            'block_deals': deals_raw,
            'news': news_raw,
            'scraped_at': datetime.now().isoformat()
        }
        
        # Save to disk
        with open(raw_file, 'w') as f:
            json.dump(mega_data, f, indent=2)
        log.info(f"  -> Saved aggregated raw data to disk: {raw_file.name}")

    # --- Database Sync (from mega_data bundle) ---
    inst_id = mega_data.get('msi_instrument_id')

    # Ratings extracted
    ratings_extracted = {}
    r_raw = mega_data.get('ratings') or {}
    if r_raw and 'response' in r_raw:
        ratings_extracted = r_raw['response'].get('data', {})
    elif r_raw and 'headerDetails' in r_raw:
        ratings_extracted = r_raw.get('headerDetails') or {}

    master_score     = ratings_extracted.get('masterScore')
    eps_rating       = ratings_extracted.get('epsRating')
    rs_rating        = ratings_extracted.get('rsRating')
    buyer_demand     = ratings_extracted.get('buyerDemand')
    group_rank       = ratings_extracted.get('groupRank')
    composite_rating = ratings_extracted.get('compositeRating') or ratings_extracted.get('compositeScore')
    smr_rating       = ratings_extracted.get('smrRating') or ratings_extracted.get('smr')
    acc_dis_rating   = ratings_extracted.get('accDisRating') or ratings_extracted.get('accumDistRating')
    price_strength   = _safe_float(ratings_extracted.get('priceStrength') or ratings_extracted.get('rs52WeekHigh'))
    week_high_52     = _safe_float(ratings_extracted.get('weekHigh52') or ratings_extracted.get('high52Week'))
    week_low_52      = _safe_float(ratings_extracted.get('weekLow52') or ratings_extracted.get('low52Week'))
    pct_from_high    = _safe_float(ratings_extracted.get('percentFromHigh') or ratings_extracted.get('pctBelowHigh'))

    # CANSLIM extracted
    c_raw = mega_data.get('canslim') or {}
    c_extracted = c_raw.get('response', {}).get('data', {}) if 'response' in c_raw else {}
    canslim_str = json.dumps(c_extracted) if c_extracted else None

    # Red Flags
    rf_raw = mega_data.get('red_flags') or {}
    rf_extracted = rf_raw.get('response', {}).get('data', []) if 'response' in rf_raw else []
    red_flags_str = json.dumps(rf_extracted) if rf_extracted else None

    # AI Report
    ai_raw = mega_data.get('ai_report') or {}
    ai_text = ai_raw.get('response', {}).get('reportText') or ai_raw.get('response', {}).get('data', '') if 'response' in ai_raw else ''

    # Finance
    f_raw = mega_data.get('finance_details') or {}
    fin_extracted = f_raw.get('response') if 'response' in f_raw else f_raw
    if fin_extracted:
        _upsert_income(conn, _parse_income(fin_extracted, asset_id, is_quarterly=False), is_quarterly=False)
        _upsert_income(conn, _parse_income(fin_extracted, asset_id, is_quarterly=True), is_quarterly=True)
        _upsert_balance_sheet(conn, _parse_balance_sheet(fin_extracted, asset_id))
        _upsert_cash_flows(conn, _parse_cash_flows(fin_extracted, asset_id))
        _upsert_ratios(conn, _parse_ratios(fin_extracted, asset_id, is_quarterly=False), is_quarterly=False)
        _upsert_ratios(conn, _parse_ratios(fin_extracted, asset_id, is_quarterly=True), is_quarterly=True)
        _upsert_shareholding(conn, _parse_shareholding(fin_extracted, asset_id))

    # Block Deals
    d_raw = mega_data.get('block_deals') or {}
    d_extracted = d_raw.get('response', {}).get('data', []) if 'response' in d_raw else []
    _insert_block_deals(conn, asset_id, d_extracted)

    # News
    n_raw = mega_data.get('news') or {}
    n_extracted = n_raw.get('response', {}).get('data', []) if 'response' in n_raw else []
    _insert_news(conn, asset_id, n_extracted)

    # Industry & Sector extraction
    industry_group = None
    industry_group_rank_str = None
    sector = None
    sub_group = None
    industry_symbol = None

    # Try Basics first (srch.json)
    b_raw = mega_data.get('instrument_basics') or {}
    if b_raw:
        industry_group = b_raw.get('industryName')
        industry_symbol = b_raw.get('industrySymbol')

    # Try Wisdom/Canslim for labels/rank
    c_raw = mega_data.get('canslim') or {}
    c_results = c_raw.get('response', {}).get('results', [])
    if not industry_group and 'instrumentBasicData' in c_raw.get('response', {}):
        industry_group = c_raw['response']['instrumentBasicData'].get('industryName')

    for r in c_results:
        if r.get('name') == "Industry Group Rank":
            industry_group_rank_str = r.get('itemValue') # e.g. "60 of 197"
            break

    # Try SymbolDetails for precise rank/header
    sd_raw = mega_data.get('symboldetails') or {}
    sd_response = sd_raw.get('response', {})
    if 'detailsGeneralInformationHeader' in sd_response:
        id_block = sd_response['detailsGeneralInformationHeader']
        if not industry_group: industry_group = id_block.get('industryName')
        if not industry_group_rank_str and id_block.get('industryGroupRank'):
             industry_group_rank_str = f"{id_block.get('industryGroupRank')} of 197"
    
    # Heuristic Cleanup & Split
    if industry_group:
        # Remove NSE-/BSE- prefix
        if '-' in industry_group:
            parts = industry_group.split('-', 1)
            if parts[0] in ('NSE', 'BSE'):
                industry_group = parts[1]
        
        # Split into Sector and Sub-group if dash remains (e.g. Banks-Money Center)
        if '-' in industry_group:
            s_parts = industry_group.split('-', 1)
            sector = s_parts[0].strip()
            sub_group = s_parts[1].strip()
        else:
            sector = industry_group 

    # Core Sync - Use global lock for the transaction
    with db_lock:
        conn.execute('''
            INSERT INTO msi_company_data (
                asset_id, msi_instrument_id, master_score, eps_rating, rs_rating,
                composite_rating, smr_rating, acc_dis_rating,
                price_strength, week_high_52, week_low_52, pct_from_high,
                buyer_demand, group_rank, industry_group, industry_group_rank, sector,
                sub_group, industry_symbol,
                canslim_checklist, red_flags,
                ai_report_summary, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(asset_id) DO UPDATE SET
                msi_instrument_id=excluded.msi_instrument_id,
                master_score=excluded.master_score,
                eps_rating=excluded.eps_rating,
                rs_rating=excluded.rs_rating,
                composite_rating=excluded.composite_rating,
                smr_rating=excluded.smr_rating,
                acc_dis_rating=excluded.acc_dis_rating,
                price_strength=excluded.price_strength,
                week_high_52=excluded.week_high_52,
                week_low_52=excluded.week_low_52,
                pct_from_high=excluded.pct_from_high,
                buyer_demand=excluded.buyer_demand,
                group_rank=excluded.group_rank,
                industry_group=excluded.industry_group,
                industry_group_rank=excluded.industry_group_rank,
                sector=excluded.sector,
                sub_group=excluded.sub_group,
                industry_symbol=excluded.industry_symbol,
                canslim_checklist=excluded.canslim_checklist,
                red_flags=excluded.red_flags,
                ai_report_summary=excluded.ai_report_summary,
                updated_at=CURRENT_TIMESTAMP;
        ''', (asset_id, inst_id, master_score, eps_rating, rs_rating,
              composite_rating, smr_rating, acc_dis_rating,
              price_strength, week_high_52, week_low_52, pct_from_high,
              buyer_demand, group_rank,
              industry_group, industry_group_rank_str, sector,
              sub_group, industry_symbol,
              canslim_str, red_flags_str, ai_text))

        # Sync MSI classification back to assets table
        if sector or industry_group:
            conn.execute('''
                UPDATE assets SET
                    msi_sector = ?, msi_industry_group = ?, msi_group_rank = ?
                WHERE id = ?
            ''', (sector, industry_group, group_rank, asset_id))

        conn.commit()
    log.info(f"  -> Done: {nse_symbol} (inst={inst_id})")
    return True


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="MarketSmithIndia data scraper")
    parser.add_argument('--auth', required=True, help='ms-auth token (copy from browser network tab)')
    parser.add_argument('--db', default='../db/market_data.db', help='Path to SQLite DB')
    parser.add_argument('--limit', type=int, default=10, help='Max companies to process')
    parser.add_argument('--symbol', help='Process a single NSE symbol (overrides --limit)')
    parser.add_argument('--workers', type=int, default=8, help='Number of parallel workers')
    args = parser.parse_args()

    setup_conn = setup_db(args.db)
    run_start = datetime.utcnow()

    cursor = setup_conn.cursor()
    if args.symbol:
        cursor.execute("SELECT id, nse_symbol FROM assets WHERE nse_symbol = ? LIMIT 1", (args.symbol.upper(),))
    else:
        cursor.execute(
            "SELECT id, nse_symbol FROM assets WHERE asset_class = 'EQUITY' AND is_active = 1 AND nse_symbol IS NOT NULL ORDER BY nse_symbol ASC LIMIT ?",
            (args.limit,)
        )
    assets = cursor.fetchall()
    setup_conn.close()

    success_count, failure_count = 0, 0
    failed_symbols = []
    
    # Thread-local storage doesn't work well for SQLite pointers across executors, 
    # so we'll just have each task open/close its own short-lived connection or handle it per task.
    
    def process_task(asset_info):
        asset_id, nse_symbol = asset_info
        # Open thread-specific connection
        thread_conn = sqlite3.connect(args.db, timeout=30.0)
        thread_conn.execute("PRAGMA journal_mode = WAL")
        thread_conn.execute("PRAGMA foreign_keys = ON")
        
        try:
            ok = process_company(thread_conn, asset_id, nse_symbol, args.auth)
            return ok, nse_symbol
        except Exception as e:
            log.error(f"  -> Error for {nse_symbol}: {e}")
            return False, nse_symbol
        finally:
            thread_conn.close()

    log.info(f"Starting parallel run with {args.workers} workers...")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(process_task, asset): asset for asset in assets}
        
        for future in concurrent.futures.as_completed(futures):
            ok, nse_symbol = future.result()
            if ok:
                success_count += 1
            else:
                failure_count += 1
                failed_symbols.append(nse_symbol)

    run_end = datetime.utcnow()
    
    # Final write for run stats
    final_conn = setup_db(args.db)
    with db_lock:
        final_conn.execute('''
            INSERT INTO msi_pipeline_runs
              (run_started_at, run_finished_at, total_symbols, success_count, failure_count, failed_symbols)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (run_start.isoformat(), run_end.isoformat(), len(assets),
              success_count, failure_count, json.dumps(failed_symbols)))
        final_conn.commit()
    final_conn.close()

    log.info(f"\nRun complete: {success_count} succeeded, {failure_count} failed out of {len(assets)} symbols.")
    if failed_symbols:
        log.info(f"Failed symbols: {', '.join(failed_symbols[:100])}{'...' if len(failed_symbols) > 100 else ''}")
