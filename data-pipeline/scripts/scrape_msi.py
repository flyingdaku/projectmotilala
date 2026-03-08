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


def _ensure_table_columns(conn, table_name, columns):
    existing = {row[1] for row in conn.execute(f"PRAGMA table_info({table_name})").fetchall()}
    for column_name, column_type in columns.items():
        if column_name not in existing:
            conn.execute(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type}")


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
    CREATE TABLE IF NOT EXISTS msi_fundamentals_annual_standalone (
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
    CREATE TABLE IF NOT EXISTS src_msi_quarterly_standalone (
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
    CREATE TABLE IF NOT EXISTS src_msi_balance_sheet_standalone (
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
    CREATE TABLE IF NOT EXISTS msi_ratios_annual_standalone (
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

    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_cashflow (
        asset_id TEXT,
        period_end_date TEXT,
        ops_profit_before_wc REAL, wc_changes REAL,
        net_cash_operating REAL, capex REAL, free_cash_flow REAL,
        net_cash_investing REAL, net_cash_financing REAL,
        dividend_paid REAL, net_change_in_cash REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_cashflow_standalone (
        asset_id TEXT,
        period_end_date TEXT,
        ops_profit_before_wc REAL, wc_changes REAL,
        net_cash_operating REAL, capex REAL, free_cash_flow REAL,
        net_cash_investing REAL, net_cash_financing REAL,
        dividend_paid REAL, net_change_in_cash REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_ratios (
        asset_id TEXT,
        period_end_date TEXT,
        ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
        roe REAL, roa REAL, roce REAL,
        debt_equity REAL, current_ratio REAL, quick_ratio REAL, interest_coverage REAL,
        asset_turnover REAL, inventory_turnover REAL,
        debtor_days REAL, creditor_days REAL,
        sales REAL, sales_growth_yoy REAL, net_income REAL, net_income_growth_yoy REAL,
        basic_eps REAL, basic_eps_growth_yoy REAL,
        book_value_per_share REAL, ebit REAL, ev_ebitda REAL,
        dividend_payout REAL, earnings_retention REAL, cash_earnings_retention REAL,
        pbdit_margin REAL, ebit_growth_yoy REAL, pre_tax_income REAL,
        pre_tax_income_growth_yoy REAL, total_sales REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_ratios_standalone (
        asset_id TEXT,
        period_end_date TEXT,
        ebit_margin REAL, pre_tax_margin REAL, net_profit_margin REAL,
        roe REAL, roa REAL, roce REAL,
        debt_equity REAL, current_ratio REAL, quick_ratio REAL, interest_coverage REAL,
        asset_turnover REAL, inventory_turnover REAL,
        debtor_days REAL, creditor_days REAL,
        sales REAL, sales_growth_yoy REAL, net_income REAL, net_income_growth_yoy REAL,
        basic_eps REAL, basic_eps_growth_yoy REAL,
        book_value_per_share REAL, ebit REAL, ev_ebitda REAL,
        dividend_payout REAL, earnings_retention REAL, cash_earnings_retention REAL,
        pbdit_margin REAL, ebit_growth_yoy REAL, pre_tax_income REAL,
        pre_tax_income_growth_yoy REAL, total_sales REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_shareholding (
        asset_id TEXT,
        period_end_date TEXT,
        promoter_holding REAL, promoter_change_qoq REAL,
        fii_holding REAL, fii_change_qoq REAL,
        dii_holding REAL, dii_change_qoq REAL,
        public_holding REAL, pledged_shares REAL,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_top_owners (
        asset_id TEXT,
        holding_date TEXT,
        shareholder_name TEXT,
        holding_pct REAL,
        is_top_investor INTEGER DEFAULT 0,
        PRIMARY KEY (asset_id, holding_date, shareholder_name)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_management (
        asset_id TEXT,
        person_name TEXT,
        designation TEXT,
        PRIMARY KEY (asset_id, person_name, designation)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_chart_patterns (
        asset_id TEXT,
        pattern_type TEXT,
        status TEXT,
        pivot_price REAL,
        depth_pct REAL,
        detected_on TEXT,
        raw_json TEXT,
        PRIMARY KEY (asset_id, pattern_type, detected_on)
    );
    ''')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS src_msi_institutional_activity (
        asset_id TEXT,
        period_end_date TEXT,
        fii_buy_value REAL, fii_sell_value REAL,
        dii_buy_value REAL, dii_sell_value REAL,
        net_fii REAL, net_dii REAL,
        raw_json TEXT,
        PRIMARY KEY (asset_id, period_end_date)
    );
    ''')

    _ensure_table_columns(conn, 'msi_company_data', {
        'composite_rating': 'INTEGER',
        'smr_rating': 'TEXT',
        'acc_dis_rating': 'TEXT',
        'price_strength': 'REAL',
        'week_high_52': 'REAL',
        'week_low_52': 'REAL',
        'pct_from_high': 'REAL',
        'market_cap': 'REAL',
        'pe_ratio': 'REAL',
        'roe_ttm': 'REAL',
        'book_value_per_share_ttm': 'REAL',
        'dividend_yield_ttm': 'REAL',
        'total_shares_thousands': 'REAL',
        'shares_in_float_thousands': 'REAL',
        'cash_flow_ttm': 'REAL',
        'debt': 'REAL',
        'website_url': 'TEXT',
    })
    _ensure_table_columns(conn, 'msi_fundamentals_annual', {
        'other_income': 'REAL',
        'operating_profit': 'REAL',
        'ebit': 'REAL',
        'ebitda': 'REAL',
        'tax_amount': 'REAL',
        'sales_growth_yoy': 'REAL',
        'pat_growth_yoy': 'REAL',
        'eps_growth_yoy': 'REAL',
    })
    _ensure_table_columns(conn, 'msi_fundamentals_annual_standalone', {
        'other_income': 'REAL',
        'operating_profit': 'REAL',
        'ebit': 'REAL',
        'ebitda': 'REAL',
        'tax_amount': 'REAL',
        'sales_growth_yoy': 'REAL',
        'pat_growth_yoy': 'REAL',
        'eps_growth_yoy': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_quarterly', {
        'other_income': 'REAL',
        'operating_profit': 'REAL',
        'ebit': 'REAL',
        'ebitda': 'REAL',
        'tax_amount': 'REAL',
        'sales_growth_yoy': 'REAL',
        'pat_growth_yoy': 'REAL',
        'eps_growth_yoy': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_quarterly_standalone', {
        'other_income': 'REAL',
        'operating_profit': 'REAL',
        'ebit': 'REAL',
        'ebitda': 'REAL',
        'tax_amount': 'REAL',
        'sales_growth_yoy': 'REAL',
        'pat_growth_yoy': 'REAL',
        'eps_growth_yoy': 'REAL',
        'traded_goods': 'REAL',
        'power_fuel': 'REAL',
        'admin_selling': 'REAL',
        'research_dev': 'REAL',
        'other_expenses': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_balance_sheet', {
        'equity_shares_number': 'REAL',
        'shareholders_funds_total': 'REAL',
        'tangible_assets': 'REAL',
        'intangible_assets': 'REAL',
        'goodwill': 'REAL',
        'other_assets': 'REAL',
        'trade_payables': 'REAL',
        'other_current_liabilities': 'REAL',
        'total_current_liabilities': 'REAL',
        'total_current_assets': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_balance_sheet_standalone', {
        'equity_shares_number': 'REAL',
        'shareholders_funds_total': 'REAL',
        'tangible_assets': 'REAL',
        'intangible_assets': 'REAL',
        'goodwill': 'REAL',
        'other_assets': 'REAL',
        'trade_payables': 'REAL',
        'other_current_liabilities': 'REAL',
        'total_current_liabilities': 'REAL',
        'total_current_assets': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_cashflow', {
        'free_cash_flow': 'REAL',
        'dividend_paid': 'REAL',
        'cash_begin_of_year': 'REAL',
        'cash_end_of_year': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_cashflow_standalone', {
        'free_cash_flow': 'REAL',
        'dividend_paid': 'REAL',
        'cash_begin_of_year': 'REAL',
        'cash_end_of_year': 'REAL',
    })
    _ensure_table_columns(conn, 'msi_ratios_annual', {
        'roa': 'REAL',
        'current_ratio': 'REAL',
        'quick_ratio': 'REAL',
        'interest_coverage': 'REAL',
        'sales': 'REAL',
        'sales_growth_yoy': 'REAL',
        'net_income': 'REAL',
        'net_income_growth_yoy': 'REAL',
        'basic_eps': 'REAL',
        'basic_eps_growth_yoy': 'REAL',
        'book_value_per_share': 'REAL',
        'ebit': 'REAL',
        'ev_ebitda': 'REAL',
        'dividend_payout': 'REAL',
        'earnings_retention': 'REAL',
        'cash_earnings_retention': 'REAL',
        'pbdit_margin': 'REAL',
    })
    _ensure_table_columns(conn, 'msi_ratios_annual_standalone', {
        'roa': 'REAL',
        'current_ratio': 'REAL',
        'quick_ratio': 'REAL',
        'interest_coverage': 'REAL',
        'sales': 'REAL',
        'sales_growth_yoy': 'REAL',
        'net_income': 'REAL',
        'net_income_growth_yoy': 'REAL',
        'basic_eps': 'REAL',
        'basic_eps_growth_yoy': 'REAL',
        'book_value_per_share': 'REAL',
        'ebit': 'REAL',
        'ev_ebitda': 'REAL',
        'dividend_payout': 'REAL',
        'earnings_retention': 'REAL',
        'cash_earnings_retention': 'REAL',
        'pbdit_margin': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_ratios', {
        'roa': 'REAL',
        'current_ratio': 'REAL',
        'quick_ratio': 'REAL',
        'interest_coverage': 'REAL',
        'sales': 'REAL',
        'sales_growth_yoy': 'REAL',
        'net_income': 'REAL',
        'net_income_growth_yoy': 'REAL',
        'basic_eps': 'REAL',
        'basic_eps_growth_yoy': 'REAL',
        'book_value_per_share': 'REAL',
        'ebit': 'REAL',
        'ev_ebitda': 'REAL',
        'dividend_payout': 'REAL',
        'earnings_retention': 'REAL',
        'cash_earnings_retention': 'REAL',
        'pbdit_margin': 'REAL',
        'ebit_growth_yoy': 'REAL',
        'pre_tax_income': 'REAL',
        'pre_tax_income_growth_yoy': 'REAL',
        'total_sales': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_ratios_standalone', {
        'roa': 'REAL',
        'current_ratio': 'REAL',
        'quick_ratio': 'REAL',
        'interest_coverage': 'REAL',
        'sales': 'REAL',
        'sales_growth_yoy': 'REAL',
        'net_income': 'REAL',
        'net_income_growth_yoy': 'REAL',
        'basic_eps': 'REAL',
        'basic_eps_growth_yoy': 'REAL',
        'book_value_per_share': 'REAL',
        'ebit': 'REAL',
        'ev_ebitda': 'REAL',
        'dividend_payout': 'REAL',
        'earnings_retention': 'REAL',
        'cash_earnings_retention': 'REAL',
        'pbdit_margin': 'REAL',
        'ebit_growth_yoy': 'REAL',
        'pre_tax_income': 'REAL',
        'pre_tax_income_growth_yoy': 'REAL',
        'total_sales': 'REAL',
    })
    _ensure_table_columns(conn, 'src_msi_shareholding', {
        'promoter_change_qoq': 'REAL',
        'fii_change_qoq': 'REAL',
        'dii_change_qoq': 'REAL',
    })
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


def _first_number(*values):
    for value in values:
        if value is not None:
            return value
    return None


def _sum_numbers(*values):
    nums = [value for value in values if value is not None]
    return sum(nums) if nums else None


def _period_sort_key(period_label):
    for fmt in ('%b-%y', '%b %Y', '%Y-%m-%d'):
        try:
            return datetime.strptime(period_label, fmt)
        except ValueError:
            continue
    return datetime.min


def _income_table(is_quarterly, is_consolidated):
    if is_quarterly:
        return 'src_msi_quarterly' if is_consolidated else 'src_msi_quarterly_standalone'
    return 'msi_fundamentals_annual' if is_consolidated else 'msi_fundamentals_annual_standalone'


def _balance_sheet_table(is_consolidated):
    return 'src_msi_balance_sheet' if is_consolidated else 'src_msi_balance_sheet_standalone'


def _cashflow_table(is_consolidated):
    return 'src_msi_cashflow' if is_consolidated else 'src_msi_cashflow_standalone'


def _ratios_table(is_quarterly, is_consolidated):
    if is_quarterly:
        return 'src_msi_ratios' if is_consolidated else 'src_msi_ratios_standalone'
    return 'msi_ratios_annual' if is_consolidated else 'msi_ratios_annual_standalone'


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
    if is_quarterly:
        col_rev_ops       = _find_col(hmap, 'income from ops', 'sales from ops')
        col_tot_rev       = _find_col(hmap, 'total revenue')
        col_other_inc     = _find_col(hmap, 'other income')
        col_materials     = _find_col(hmap, 'raw materials')
        col_traded_goods  = _find_col(hmap, 'traded goods')
        col_power_fuel    = _find_col(hmap, 'power and fuel')
        col_emp           = _find_col(hmap, 'employees cost', 'employee benefit')
        col_admin_sell    = _find_col(hmap, 'admin & selling')
        col_research_dev  = _find_col(hmap, 'research & devlopment')
        col_other_exp     = _find_col(hmap, 'other expenses')
        col_dep           = _find_col(hmap, 'depreciation')
        col_op_profit     = _find_col(hmap, 'p/l-before other,int&tax')
        col_ebit          = _find_col(hmap, 'p/l-before int&tax')
        col_fin_cost      = _find_col(hmap, 'interest', 'finance costs')
        col_pbt           = _find_col(hmap, 'p/l-before tax', 'p/l-before except&tax')
        col_tax           = _find_col(hmap, 'tax')
        col_pat           = _find_col(hmap, 'profit/loss', 'p/l-after minority', 'p/l-ordinary act')
        col_basic_eps     = _find_col(hmap, 'basic eps(rs.)', 'earnings per share')
        col_dil_eps       = _find_col(hmap, 'diluted eps(rs.)')
        col_div           = None
    else:
        col_rev_ops   = _find_col(hmap, 'ops revenues-total', 'revenue-ops')
        col_tot_rev   = _find_col(hmap, 'revenue-total', 'total revenue')
        col_other_inc = _find_col(hmap, 'other income')
        col_materials = _find_col(hmap, 'materials consumed')
        col_emp       = _find_col(hmap, 'employee benefit', 'employee benefits')
        col_dep       = _find_col(hmap, 'dep & amort', 'depreciation')
        col_op_profit = None
        col_ebit      = None
        col_fin_cost  = _find_col(hmap, 'finance costs', 'interest')
        col_pbt       = _find_col(hmap, 'p/l-before tax', 'pbt')
        col_tax       = _find_col(hmap, 'tax expenses-total', 'tax')
        col_pat       = _find_col(hmap, 'profit/loss', 'net profit')
        col_basic_eps = _find_col(hmap, 'basic eps(rs.)', 'earnings per share')
        col_dil_eps   = _find_col(hmap, 'diluted eps(rs.)')
        col_div       = None

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        revenue_ops = _val(row, col_rev_ops)
        total_revenue = _first_number(_val(row, col_tot_rev), revenue_ops)
        other_income = _val(row, col_other_inc)
        depreciation = _val(row, col_dep)
        finance_costs = _val(row, col_fin_cost)
        pbt = _val(row, col_pbt)
        tax_amount = _val(row, col_tax)
        net_profit = _val(row, col_pat)
        operating_profit = _val(row, col_op_profit)
        ebit = _val(row, col_ebit)
        if ebit is None and pbt is not None and finance_costs is not None:
            ebit = pbt + finance_costs
        if operating_profit is None and ebit is not None:
            operating_profit = ebit - other_income if other_income is not None else ebit
        ebitda = ebit + depreciation if ebit is not None and depreciation is not None else None
        record = {
            'asset_id': asset_id,
            'period_end_date': period,
            'revenue_ops':        revenue_ops,
            'total_revenue':      total_revenue,
            'other_income':       other_income,
            'operating_profit':   operating_profit,
            'ebit':               ebit,
            'materials_consumed': _val(row, col_materials),
            'employee_benefits':  _val(row, col_emp),
            'depreciation':       depreciation,
            'ebitda':             ebitda,
            'finance_costs':      finance_costs,
            'profit_before_tax':  pbt,
            'tax_amount':         tax_amount,
            'net_profit':         net_profit,
            'basic_eps':          _val(row, col_basic_eps),
            'diluted_eps':        _val(row, col_dil_eps),
            'sales_growth_yoy':   None,
            'pat_growth_yoy':     None,
            'eps_growth_yoy':     None,
        }
        if is_quarterly:
            record['traded_goods']    = _val(row, col_traded_goods)
            record['power_fuel']      = _val(row, col_power_fuel)
            record['admin_selling']   = _val(row, col_admin_sell)
            record['research_dev']    = _val(row, col_research_dev)
            record['other_expenses']  = _val(row, col_other_exp)
        else:
            record['dividend_rate'] = _val(row, col_div)
        parsed.append(record)
    return parsed


def _parse_balance_sheet(fin, asset_id):
    rows = fin.get('bsData', [])
    headers = fin.get('bsHeader', [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period = 'c0'
    col_shares = _find_col(hmap, 'equity shares-number')
    col_eq_cap = _find_col(hmap, 'equity share', 'equity capital')
    col_reserves = _find_col(hmap, 'reserve & surplus-total', 'reserves & surplus')
    col_shareholders = _find_col(hmap, 'shareholders funds-total')
    col_lt_borrow = _find_col(hmap, 'lt borrowings', 'long term borrowings')
    col_st_borrow = _find_col(hmap, 'st borrowings', 'short term borrowings')
    col_tot_liab = _find_col(hmap, 'capital & liab-total', 'total liabilities')
    col_fixed = _find_col(hmap, 'fixed assets')
    col_tangible = _find_col(hmap, 'tangible assets')
    col_intangible = _find_col(hmap, 'intangible assets')
    col_goodwill = _find_col(hmap, 'goodwill')
    col_cwip = _find_col(hmap, 'work-in-progress')
    col_lt_invest = _find_col(hmap, 'lt investments')
    col_curr_invest = _find_col(hmap, 'current investments')
    col_inv = _find_col(hmap, 'inventories')
    col_rec = _find_col(hmap, 'trade receivables')
    col_cash = _find_col(hmap, 'cash & equiv')
    col_other_lt = _find_col(hmap, 'other lt assets')
    col_other_st = _find_col(hmap, 'other st assets')
    col_lt_loans = _find_col(hmap, 'lt loans & advances')
    col_st_loans = _find_col(hmap, 'st loans & advances')
    col_other_assets = _find_col(hmap, 'other assets')
    col_trade_payables = _find_col(hmap, 'trade payables')
    col_other_curr_liab = _find_col(hmap, 'other current liab')
    col_tot_curr_liab = _find_col(hmap, 'current liab-total')
    col_tot_curr_assets = _find_col(hmap, 'st assets-total')
    col_tot_assets = _find_col(hmap, 'total assets')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        parsed.append({
            'asset_id': asset_id,
            'period_end_date':         period,
            'equity_shares_number':    _val(row, col_shares),
            'equity_capital':          _val(row, col_eq_cap),
            'reserves':                _val(row, col_reserves),
            'shareholders_funds_total': _val(row, col_shareholders),
            'long_term_borrowings':    _val(row, col_lt_borrow),
            'short_term_borrowings':   _val(row, col_st_borrow),
            'total_liabilities':       _val(row, col_tot_liab),
            'fixed_assets':            _val(row, col_fixed),
            'tangible_assets':         _val(row, col_tangible),
            'intangible_assets':       _val(row, col_intangible),
            'goodwill':                _val(row, col_goodwill),
            'cwip':                    _val(row, col_cwip),
            'investments':             _sum_numbers(_val(row, col_lt_invest), _val(row, col_curr_invest)),
            'inventories':             _val(row, col_inv),
            'trade_receivables':       _val(row, col_rec),
            'cash_equivalents':        _val(row, col_cash),
            'other_assets':            _sum_numbers(_val(row, col_other_assets), _val(row, col_other_lt), _val(row, col_other_st), _val(row, col_lt_loans), _val(row, col_st_loans)),
            'trade_payables':          _val(row, col_trade_payables),
            'other_current_liabilities': _val(row, col_other_curr_liab),
            'total_current_liabilities': _val(row, col_tot_curr_liab),
            'total_current_assets':    _val(row, col_tot_curr_assets),
            'total_assets':            _val(row, col_tot_assets),
        })
    return parsed


def _parse_cash_flows(fin, asset_id):
    rows = fin.get('cfData', [])
    headers = fin.get('cfHeader', [])
    if not rows:
        return []

    hmap = _build_header_map(headers)
    col_period   = 'c0'
    col_ops_pbwc = _find_col(hmap, 'profits before tax')
    col_net_ops  = _find_col(hmap, 'cf-ops act')
    col_net_inv  = _find_col(hmap, 'cf-investing act')
    col_net_fin  = _find_col(hmap, 'cf-finance act')
    col_net_chg  = _find_col(hmap, 'cash & equiv-chg')
    col_cash_begin = _find_col(hmap, 'cash & equiv-begin')
    col_cash_end   = _find_col(hmap, 'cash & equiv-end')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        net_cash_operating = _val(row, col_net_ops)
        net_cash_investing = _val(row, col_net_inv)
        parsed.append({
            'asset_id': asset_id,
            'period_end_date':      period,
            'ops_profit_before_wc': _val(row, col_ops_pbwc),
            'wc_changes':           None,
            'net_cash_operating':   net_cash_operating,
            'capex':                None,
            'free_cash_flow':       net_cash_operating + net_cash_investing if net_cash_operating is not None and net_cash_investing is not None else None,
            'net_cash_investing':   net_cash_investing,
            'net_cash_financing':   _val(row, col_net_fin),
            'dividend_paid':        None,
            'net_change_in_cash':   _val(row, col_net_chg),
            'cash_begin_of_year':   _val(row, col_cash_begin),
            'cash_end_of_year':     _val(row, col_cash_end),
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
    if is_quarterly:
        col_ebit = _find_col(hmap, 'ebit(cr)')
        col_ebit_growth = _find_col(hmap, 'ebit % chg')
        col_pt_income = _find_col(hmap, 'pt income(cr)')
        col_pt_income_growth = _find_col(hmap, 'pt inc % chg')
        col_net_income = _find_col(hmap, 'ni(cr)')
        col_net_income_growth = _find_col(hmap, 'ni % chg')
        col_total_sales = _find_col(hmap, 'total sales (cr)')
    else:
        col_ebit_margin = _find_col(hmap, 'ebit margin')
        col_pt_margin = _find_col(hmap, 'pt margin')
        col_net_margin = _find_col(hmap, 'atm')
        col_roe = _find_col(hmap, 'roe')
        col_roa = _find_col(hmap, 'roa')
        col_roce = _find_col(hmap, 'roce')
        col_de = _find_col(hmap, 'lt debttoequity')
        col_cr = _find_col(hmap, 'current ratio')
        col_qr = _find_col(hmap, 'quick ratio')
        col_ic = _find_col(hmap, 'int coverage')
        col_at = _find_col(hmap, 'asset turnover')
        col_it = _find_col(hmap, 'inventory turnover')
        col_sales = _find_col(hmap, 'sales(cr)')
        col_sales_growth = _find_col(hmap, 'sales % chg')
        col_net_income = _find_col(hmap, 'ni(cr)')
        col_net_income_growth = _find_col(hmap, 'ni % chg')
        col_basic_eps = _find_col(hmap, 'basiceps')
        col_basic_eps_growth = _find_col(hmap, 'basiceps % chg')
        col_bvps = _find_col(hmap, 'bv/shr(inr)')
        col_ebit = _find_col(hmap, 'ebit')
        col_ev = _find_col(hmap, 'evperebitda')
        col_div_payout = _find_col(hmap, 'dividend payout')
        col_earn_retention = _find_col(hmap, 'earning retention')
        col_cash_earn_retention = _find_col(hmap, 'cashearningretention')
        col_pbdit_margin = _find_col(hmap, 'pbditmargin')

    parsed = []
    for row in rows:
        period = row.get(col_period, '').strip()
        if not period:
            continue
        if is_quarterly:
            parsed.append({
                'asset_id': asset_id,
                'period_end_date': period,
                'ebit_margin': None,
                'pre_tax_margin': None,
                'net_profit_margin': None,
                'roe': None,
                'roa': None,
                'roce': None,
                'debt_equity': None,
                'current_ratio': None,
                'quick_ratio': None,
                'interest_coverage': None,
                'asset_turnover': None,
                'inventory_turnover': None,
                'debtor_days': None,
                'creditor_days': None,
                'sales': None,
                'sales_growth_yoy': None,
                'net_income': _val(row, col_net_income),
                'net_income_growth_yoy': _val(row, col_net_income_growth),
                'basic_eps': None,
                'basic_eps_growth_yoy': None,
                'book_value_per_share': None,
                'ebit': _val(row, col_ebit),
                'ev_ebitda': None,
                'dividend_payout': None,
                'earnings_retention': None,
                'cash_earnings_retention': None,
                'pbdit_margin': None,
                'ebit_growth_yoy': _val(row, col_ebit_growth),
                'pre_tax_income': _val(row, col_pt_income),
                'pre_tax_income_growth_yoy': _val(row, col_pt_income_growth),
                'total_sales': _val(row, col_total_sales),
            })
        else:
            parsed.append({
                'asset_id': asset_id,
                'period_end_date': period,
                'ebit_margin': _val(row, col_ebit_margin),
                'pre_tax_margin': _val(row, col_pt_margin),
                'net_profit_margin': _val(row, col_net_margin),
                'roe': _val(row, col_roe),
                'roa': _val(row, col_roa),
                'roce': _val(row, col_roce),
                'debt_equity': _val(row, col_de),
                'current_ratio': _val(row, col_cr),
                'quick_ratio': _val(row, col_qr),
                'interest_coverage': _val(row, col_ic),
                'asset_turnover': _val(row, col_at),
                'inventory_turnover': _val(row, col_it),
                'debtor_days': None,
                'creditor_days': None,
                'sales': _val(row, col_sales),
                'sales_growth_yoy': _val(row, col_sales_growth),
                'net_income': _val(row, col_net_income),
                'net_income_growth_yoy': _val(row, col_net_income_growth),
                'basic_eps': _val(row, col_basic_eps),
                'basic_eps_growth_yoy': _val(row, col_basic_eps_growth),
                'book_value_per_share': _val(row, col_bvps),
                'ebit': _val(row, col_ebit),
                'ev_ebitda': _val(row, col_ev),
                'dividend_payout': _val(row, col_div_payout),
                'earnings_retention': _val(row, col_earn_retention),
                'cash_earnings_retention': _val(row, col_cash_earn_retention),
                'pbdit_margin': _val(row, col_pbdit_margin),
            })
    return parsed


def _parse_shareholding(fin, asset_id):
    rows = fin.get('shareholdingLatestFourQuaterPatternModel', [])
    if not rows:
        return []

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
                'promoter_change_qoq': None,
                'fii_holding': None,
                'fii_change_qoq': None,
                'dii_holding': None,
                'dii_change_qoq': None,
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
            curr = by_period[period]['dii_holding'] or 0.0
            by_period[period]['dii_holding'] = curr + (val or 0.0)
        elif 'individual' in name or 'public' in name or 'other' in name:
            curr = by_period[period]['public_holding'] or 0.0
            by_period[period]['public_holding'] = curr + (val or 0.0)

    for p in by_period.values():
        if p['dii_holding'] == 0.0:
            p['dii_holding'] = None
        if p['public_holding'] == 0.0:
            p['public_holding'] = None

    ordered_periods = sorted(by_period, key=_period_sort_key)
    prev = None
    for period in ordered_periods:
        curr = by_period[period]
        if prev:
            if curr['promoter_holding'] is not None and prev['promoter_holding'] is not None:
                curr['promoter_change_qoq'] = curr['promoter_holding'] - prev['promoter_holding']
            if curr['fii_holding'] is not None and prev['fii_holding'] is not None:
                curr['fii_change_qoq'] = curr['fii_holding'] - prev['fii_holding']
            if curr['dii_holding'] is not None and prev['dii_holding'] is not None:
                curr['dii_change_qoq'] = curr['dii_holding'] - prev['dii_holding']
        prev = curr

    return [by_period[p] for p in ordered_periods]


def _parse_top_owners(fin, asset_id):
    rows = fin.get('topOwnwerInfoModel', [])
    return [
        {
            'asset_id': asset_id,
            'holding_date': row.get('holdingDate'),
            'shareholder_name': row.get('shareholderDescription'),
            'holding_pct': _safe_float(row.get('holding')),
            'is_top_investor': int(bool(row.get('isTopInvestor'))),
        }
        for row in rows
        if row.get('holdingDate') and row.get('shareholderDescription')
    ]


def _parse_management(fin, asset_id):
    rows = fin.get('managementInfoData', [])
    return [
        {
            'asset_id': asset_id,
            'person_name': row.get('shareHolderName'),
            'designation': row.get('designationDescription'),
        }
        for row in rows
        if row.get('shareHolderName')
    ]


def _safe_float(val):
    try:
        return float(val) if val not in (None, '', 'null') else None
    except (ValueError, TypeError):
        return None


# ---------------------------------------------------------------------------
# DB upsert helpers
# ---------------------------------------------------------------------------

def _upsert_income(conn, records, is_quarterly=False, is_consolidated=True):
    table = _income_table(is_quarterly, is_consolidated)
    for r in records:
        if is_quarterly:
            conn.execute(f'''
                INSERT INTO {table} (
                    asset_id, period_end_date, revenue_ops, total_revenue, other_income,
                    operating_profit, ebit, materials_consumed, employee_benefits,
                    depreciation, ebitda, finance_costs, profit_before_tax, tax_amount,
                    net_profit, basic_eps, diluted_eps, traded_goods, power_fuel,
                    admin_selling, research_dev, other_expenses,
                    sales_growth_yoy, pat_growth_yoy, eps_growth_yoy
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                    revenue_ops=excluded.revenue_ops, total_revenue=excluded.total_revenue, other_income=excluded.other_income,
                    operating_profit=excluded.operating_profit, ebit=excluded.ebit, materials_consumed=excluded.materials_consumed,
                    employee_benefits=excluded.employee_benefits, depreciation=excluded.depreciation, ebitda=excluded.ebitda,
                    finance_costs=excluded.finance_costs, profit_before_tax=excluded.profit_before_tax, tax_amount=excluded.tax_amount,
                    net_profit=excluded.net_profit, basic_eps=excluded.basic_eps, diluted_eps=excluded.diluted_eps,
                    traded_goods=excluded.traded_goods, power_fuel=excluded.power_fuel,
                    admin_selling=excluded.admin_selling, research_dev=excluded.research_dev, other_expenses=excluded.other_expenses,
                    sales_growth_yoy=excluded.sales_growth_yoy, pat_growth_yoy=excluded.pat_growth_yoy, eps_growth_yoy=excluded.eps_growth_yoy;
            ''', (r['asset_id'], r['period_end_date'], r['revenue_ops'], r['total_revenue'], r['other_income'],
                  r['operating_profit'], r['ebit'], r['materials_consumed'], r['employee_benefits'],
                  r['depreciation'], r['ebitda'], r['finance_costs'], r['profit_before_tax'], r['tax_amount'],
                  r['net_profit'], r['basic_eps'], r['diluted_eps'],
                  r.get('traded_goods'), r.get('power_fuel'), r.get('admin_selling'),
                  r.get('research_dev'), r.get('other_expenses'),
                  r['sales_growth_yoy'], r['pat_growth_yoy'], r['eps_growth_yoy']))
        else:
            conn.execute(f'''
                INSERT INTO {table} (
                    asset_id, period_end_date, revenue_ops, total_revenue, other_income,
                    operating_profit, ebit, materials_consumed, employee_benefits,
                    depreciation, ebitda, finance_costs, profit_before_tax, tax_amount,
                    net_profit, basic_eps, diluted_eps, dividend_rate, sales_growth_yoy,
                    pat_growth_yoy, eps_growth_yoy
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                    revenue_ops=excluded.revenue_ops, total_revenue=excluded.total_revenue, other_income=excluded.other_income,
                    operating_profit=excluded.operating_profit, ebit=excluded.ebit, materials_consumed=excluded.materials_consumed,
                    employee_benefits=excluded.employee_benefits, depreciation=excluded.depreciation, ebitda=excluded.ebitda,
                    finance_costs=excluded.finance_costs, profit_before_tax=excluded.profit_before_tax, tax_amount=excluded.tax_amount,
                    net_profit=excluded.net_profit, basic_eps=excluded.basic_eps, diluted_eps=excluded.diluted_eps,
                    dividend_rate=excluded.dividend_rate, sales_growth_yoy=excluded.sales_growth_yoy,
                    pat_growth_yoy=excluded.pat_growth_yoy, eps_growth_yoy=excluded.eps_growth_yoy;
            ''', (r['asset_id'], r['period_end_date'], r['revenue_ops'], r['total_revenue'], r['other_income'],
                  r['operating_profit'], r['ebit'], r['materials_consumed'], r['employee_benefits'],
                  r['depreciation'], r['ebitda'], r['finance_costs'], r['profit_before_tax'], r['tax_amount'],
                  r['net_profit'], r['basic_eps'], r['diluted_eps'], r['dividend_rate'], r['sales_growth_yoy'],
                  r['pat_growth_yoy'], r['eps_growth_yoy']))


def _upsert_balance_sheet(conn, records, is_consolidated=True):
    table = _balance_sheet_table(is_consolidated)
    for r in records:
        conn.execute(f'''
            INSERT INTO {table}
              (asset_id, period_end_date, equity_shares_number, equity_capital, reserves,
               shareholders_funds_total, long_term_borrowings, short_term_borrowings,
               total_liabilities, fixed_assets, tangible_assets, intangible_assets,
               goodwill, cwip, investments, inventories, trade_receivables,
               cash_equivalents, other_assets, trade_payables, other_current_liabilities,
               total_current_liabilities, total_current_assets, total_assets)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              equity_shares_number=excluded.equity_shares_number, equity_capital=excluded.equity_capital, reserves=excluded.reserves,
              shareholders_funds_total=excluded.shareholders_funds_total,
              long_term_borrowings=excluded.long_term_borrowings, short_term_borrowings=excluded.short_term_borrowings,
              total_liabilities=excluded.total_liabilities, fixed_assets=excluded.fixed_assets,
              tangible_assets=excluded.tangible_assets, intangible_assets=excluded.intangible_assets,
              goodwill=excluded.goodwill, cwip=excluded.cwip, investments=excluded.investments, inventories=excluded.inventories,
              trade_receivables=excluded.trade_receivables, cash_equivalents=excluded.cash_equivalents,
              other_assets=excluded.other_assets, trade_payables=excluded.trade_payables,
              other_current_liabilities=excluded.other_current_liabilities,
              total_current_liabilities=excluded.total_current_liabilities,
              total_current_assets=excluded.total_current_assets,
              total_assets=excluded.total_assets;
        ''', (r['asset_id'], r['period_end_date'], r['equity_shares_number'], r['equity_capital'], r['reserves'],
              r['shareholders_funds_total'], r['long_term_borrowings'], r['short_term_borrowings'], r['total_liabilities'],
              r['fixed_assets'], r['tangible_assets'], r['intangible_assets'], r['goodwill'], r['cwip'],
              r['investments'], r['inventories'], r['trade_receivables'], r['cash_equivalents'],
              r['other_assets'], r.get('trade_payables'), r.get('other_current_liabilities'),
              r.get('total_current_liabilities'), r.get('total_current_assets'), r['total_assets']))


def _upsert_cash_flows(conn, records, is_consolidated=True):
    table = _cashflow_table(is_consolidated)
    for r in records:
        conn.execute(f'''
            INSERT INTO {table}
              (asset_id, period_end_date, ops_profit_before_wc, wc_changes, net_cash_operating,
               capex, free_cash_flow, net_cash_investing, net_cash_financing, dividend_paid,
               net_change_in_cash, cash_begin_of_year, cash_end_of_year)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              ops_profit_before_wc=excluded.ops_profit_before_wc, wc_changes=excluded.wc_changes,
              net_cash_operating=excluded.net_cash_operating, capex=excluded.capex,
              free_cash_flow=excluded.free_cash_flow, net_cash_investing=excluded.net_cash_investing,
              net_cash_financing=excluded.net_cash_financing, dividend_paid=excluded.dividend_paid,
              net_change_in_cash=excluded.net_change_in_cash,
              cash_begin_of_year=excluded.cash_begin_of_year, cash_end_of_year=excluded.cash_end_of_year;
        ''', (r['asset_id'], r['period_end_date'], r['ops_profit_before_wc'], r['wc_changes'],
              r['net_cash_operating'], r['capex'], r['free_cash_flow'], r['net_cash_investing'],
              r['net_cash_financing'], r['dividend_paid'], r['net_change_in_cash'],
              r.get('cash_begin_of_year'), r.get('cash_end_of_year')))


def _upsert_ratios(conn, records, is_quarterly=False, is_consolidated=True):
    table = _ratios_table(is_quarterly, is_consolidated)
    for r in records:
        if is_quarterly:
            conn.execute(f'''
                INSERT INTO {table}
                  (asset_id, period_end_date, ebit_margin, pre_tax_margin, net_profit_margin,
                   roe, roa, roce, debt_equity, current_ratio, quick_ratio, interest_coverage,
                   asset_turnover, inventory_turnover, debtor_days, creditor_days, sales,
                   sales_growth_yoy, net_income, net_income_growth_yoy, basic_eps,
                   basic_eps_growth_yoy, book_value_per_share, ebit, ev_ebitda,
                   dividend_payout, earnings_retention, cash_earnings_retention,
                   pbdit_margin, ebit_growth_yoy, pre_tax_income,
                   pre_tax_income_growth_yoy, total_sales)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                  ebit_margin=excluded.ebit_margin, pre_tax_margin=excluded.pre_tax_margin,
                  net_profit_margin=excluded.net_profit_margin, roe=excluded.roe, roa=excluded.roa,
                  roce=excluded.roce, debt_equity=excluded.debt_equity, current_ratio=excluded.current_ratio,
                  quick_ratio=excluded.quick_ratio, interest_coverage=excluded.interest_coverage,
                  asset_turnover=excluded.asset_turnover, inventory_turnover=excluded.inventory_turnover,
                  debtor_days=excluded.debtor_days, creditor_days=excluded.creditor_days,
                  sales=excluded.sales, sales_growth_yoy=excluded.sales_growth_yoy,
                  net_income=excluded.net_income, net_income_growth_yoy=excluded.net_income_growth_yoy,
                  basic_eps=excluded.basic_eps, basic_eps_growth_yoy=excluded.basic_eps_growth_yoy,
                  book_value_per_share=excluded.book_value_per_share, ebit=excluded.ebit,
                  ev_ebitda=excluded.ev_ebitda, dividend_payout=excluded.dividend_payout,
                  earnings_retention=excluded.earnings_retention, cash_earnings_retention=excluded.cash_earnings_retention,
                  pbdit_margin=excluded.pbdit_margin, ebit_growth_yoy=excluded.ebit_growth_yoy,
                  pre_tax_income=excluded.pre_tax_income, pre_tax_income_growth_yoy=excluded.pre_tax_income_growth_yoy,
                  total_sales=excluded.total_sales;
            ''', (r['asset_id'], r['period_end_date'], r['ebit_margin'], r['pre_tax_margin'],
                  r['net_profit_margin'], r['roe'], r['roa'], r['roce'], r['debt_equity'],
                  r['current_ratio'], r['quick_ratio'], r['interest_coverage'], r['asset_turnover'],
                  r['inventory_turnover'], r['debtor_days'], r['creditor_days'], r['sales'],
                  r['sales_growth_yoy'], r['net_income'], r['net_income_growth_yoy'], r['basic_eps'],
                  r['basic_eps_growth_yoy'], r['book_value_per_share'], r['ebit'], r['ev_ebitda'],
                  r['dividend_payout'], r['earnings_retention'], r['cash_earnings_retention'],
                  r['pbdit_margin'], r['ebit_growth_yoy'], r['pre_tax_income'],
                  r['pre_tax_income_growth_yoy'], r['total_sales']))
        else:
            conn.execute(f'''
                INSERT INTO {table}
                  (asset_id, period_end_date, ebit_margin, pre_tax_margin, net_profit_margin,
                   roe, roa, roce, debt_equity, current_ratio, quick_ratio, interest_coverage,
                   asset_turnover, inventory_turnover, debtor_days, creditor_days, sales,
                   sales_growth_yoy, net_income, net_income_growth_yoy, basic_eps,
                   basic_eps_growth_yoy, book_value_per_share, ebit, ev_ebitda,
                   dividend_payout, earnings_retention, cash_earnings_retention,
                   pbdit_margin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
                  ebit_margin=excluded.ebit_margin, pre_tax_margin=excluded.pre_tax_margin,
                  net_profit_margin=excluded.net_profit_margin, roe=excluded.roe, roa=excluded.roa,
                  roce=excluded.roce, debt_equity=excluded.debt_equity, current_ratio=excluded.current_ratio,
                  quick_ratio=excluded.quick_ratio, interest_coverage=excluded.interest_coverage,
                  asset_turnover=excluded.asset_turnover, inventory_turnover=excluded.inventory_turnover,
                  debtor_days=excluded.debtor_days, creditor_days=excluded.creditor_days,
                  sales=excluded.sales, sales_growth_yoy=excluded.sales_growth_yoy,
                  net_income=excluded.net_income, net_income_growth_yoy=excluded.net_income_growth_yoy,
                  basic_eps=excluded.basic_eps, basic_eps_growth_yoy=excluded.basic_eps_growth_yoy,
                  book_value_per_share=excluded.book_value_per_share, ebit=excluded.ebit,
                  ev_ebitda=excluded.ev_ebitda, dividend_payout=excluded.dividend_payout,
                  earnings_retention=excluded.earnings_retention, cash_earnings_retention=excluded.cash_earnings_retention,
                  pbdit_margin=excluded.pbdit_margin;
            ''', (r['asset_id'], r['period_end_date'], r['ebit_margin'], r['pre_tax_margin'],
                  r['net_profit_margin'], r['roe'], r['roa'], r['roce'], r['debt_equity'],
                  r['current_ratio'], r['quick_ratio'], r['interest_coverage'], r['asset_turnover'],
                  r['inventory_turnover'], r['debtor_days'], r['creditor_days'], r['sales'],
                  r['sales_growth_yoy'], r['net_income'], r['net_income_growth_yoy'], r['basic_eps'],
                  r['basic_eps_growth_yoy'], r['book_value_per_share'], r['ebit'], r['ev_ebitda'],
                  r['dividend_payout'], r['earnings_retention'], r['cash_earnings_retention'],
                  r['pbdit_margin']))


def _upsert_shareholding(conn, records):
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_shareholding
              (asset_id, period_end_date, promoter_holding, promoter_change_qoq, fii_holding,
               fii_change_qoq, dii_holding, dii_change_qoq, public_holding, pledged_shares)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(asset_id, period_end_date) DO UPDATE SET
              promoter_holding=excluded.promoter_holding, promoter_change_qoq=excluded.promoter_change_qoq,
              fii_holding=excluded.fii_holding, fii_change_qoq=excluded.fii_change_qoq,
              dii_holding=excluded.dii_holding, dii_change_qoq=excluded.dii_change_qoq,
              public_holding=excluded.public_holding, pledged_shares=excluded.pledged_shares;
        ''', (r['asset_id'], r['period_end_date'], r['promoter_holding'], r['promoter_change_qoq'],
              r['fii_holding'], r['fii_change_qoq'], r['dii_holding'], r['dii_change_qoq'],
              r['public_holding'], r['pledged_shares']))


def _insert_top_owners(conn, asset_id, records):
    conn.execute('DELETE FROM src_msi_top_owners WHERE asset_id = ?', (asset_id,))
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_top_owners (asset_id, holding_date, shareholder_name, holding_pct, is_top_investor)
            VALUES (?, ?, ?, ?, ?)
        ''', (r['asset_id'], r['holding_date'], r['shareholder_name'], r['holding_pct'], r['is_top_investor']))


def _insert_management(conn, asset_id, records):
    conn.execute('DELETE FROM src_msi_management WHERE asset_id = ?', (asset_id,))
    for r in records:
        conn.execute('''
            INSERT INTO src_msi_management (asset_id, person_name, designation)
            VALUES (?, ?, ?)
        ''', (r['asset_id'], r['person_name'], r['designation']))


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

def process_company(conn, asset_id, nse_symbol, auth_token, refresh=False):
    log.info(f"Processing {nse_symbol}...")
    
    raw_file = Path(RAW_BASE_DIR) / f"{nse_symbol}.json"
    mega_data = {}

    if refresh and raw_file.exists():
        raw_file.unlink()
    
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
        fin_consolidated_extracted, fin_consolidated_raw = fetch_finance_details(inst_id, auth_token, consolidated=True)
        time.sleep(RATIONAL_DELAY)

        fin_standalone_extracted, fin_standalone_raw = fetch_finance_details(inst_id, auth_token, consolidated=False)
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
            'finance_details': fin_consolidated_raw,
            'finance_details_consolidated': fin_consolidated_raw,
            'finance_details_standalone': fin_standalone_raw,
            'symboldetails': sd_raw,
            'block_deals': deals_raw,
            'news': news_raw,
            'scraped_at': datetime.now().isoformat()
        }
        
        # Save to disk
        with open(raw_file, 'w') as f:
            json.dump(mega_data, f, indent=2)
        log.info(f"  -> Saved aggregated raw data to disk: {raw_file.name}")

    inst_id = mega_data.get('msi_instrument_id')
    cache_updated = False

    if mega_data.get('finance_details') and not mega_data.get('finance_details_consolidated'):
        mega_data['finance_details_consolidated'] = mega_data.get('finance_details')
        cache_updated = True

    if not mega_data.get('finance_details_consolidated') or not mega_data.get('finance_details_standalone'):
        if not inst_id:
            basics_raw = mega_data.get('instrument_basics') or get_msi_instrument_id(nse_symbol, auth_token)
            inst_id = basics_raw.get('instrumentId') if basics_raw else None
            if basics_raw and not mega_data.get('instrument_basics'):
                mega_data['instrument_basics'] = basics_raw
                mega_data['msi_instrument_id'] = inst_id
                cache_updated = True
        if inst_id and not mega_data.get('finance_details_consolidated'):
            _, fin_consolidated_raw = fetch_finance_details(inst_id, auth_token, consolidated=True)
            mega_data['finance_details_consolidated'] = fin_consolidated_raw
            mega_data['finance_details'] = fin_consolidated_raw
            cache_updated = True
            time.sleep(RATIONAL_DELAY)
        if inst_id and not mega_data.get('finance_details_standalone'):
            _, fin_standalone_raw = fetch_finance_details(inst_id, auth_token, consolidated=False)
            mega_data['finance_details_standalone'] = fin_standalone_raw
            cache_updated = True
            time.sleep(RATIONAL_DELAY)
        if cache_updated:
            with open(raw_file, 'w') as f:
                json.dump(mega_data, f, indent=2)
            log.info(f"  -> Refreshed raw finance payloads on disk: {raw_file.name}")

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

    fin_consolidated_raw = mega_data.get('finance_details_consolidated') or mega_data.get('finance_details') or {}
    fin_standalone_raw = mega_data.get('finance_details_standalone') or {}
    fin_views = [
        (True, fin_consolidated_raw.get('response') if 'response' in fin_consolidated_raw else fin_consolidated_raw),
        (False, fin_standalone_raw.get('response') if 'response' in fin_standalone_raw else fin_standalone_raw),
    ]
    consolidated_annual_ratio_records = []
    consolidated_balance_sheet_records = []
    consolidated_cashflow_records = []
    shareholding_records = []
    top_owner_records = []
    management_records = []
    for is_consolidated, fin_extracted in fin_views:
        if not fin_extracted:
            continue
        annual_income_records = _parse_income(fin_extracted, asset_id, is_quarterly=False)
        quarterly_income_records = _parse_income(fin_extracted, asset_id, is_quarterly=True)
        balance_sheet_records = _parse_balance_sheet(fin_extracted, asset_id)
        cashflow_records = _parse_cash_flows(fin_extracted, asset_id)
        annual_ratio_records = _parse_ratios(fin_extracted, asset_id, is_quarterly=False)
        quarterly_ratio_records = _parse_ratios(fin_extracted, asset_id, is_quarterly=True)

        _upsert_income(conn, annual_income_records, is_quarterly=False, is_consolidated=is_consolidated)
        _upsert_income(conn, quarterly_income_records, is_quarterly=True, is_consolidated=is_consolidated)
        _upsert_balance_sheet(conn, balance_sheet_records, is_consolidated=is_consolidated)
        _upsert_cash_flows(conn, cashflow_records, is_consolidated=is_consolidated)
        _upsert_ratios(conn, annual_ratio_records, is_quarterly=False, is_consolidated=is_consolidated)
        _upsert_ratios(conn, quarterly_ratio_records, is_quarterly=True, is_consolidated=is_consolidated)

        if is_consolidated:
            consolidated_annual_ratio_records = annual_ratio_records
            consolidated_balance_sheet_records = balance_sheet_records
            consolidated_cashflow_records = cashflow_records
            shareholding_records = _parse_shareholding(fin_extracted, asset_id)
            top_owner_records = _parse_top_owners(fin_extracted, asset_id)
            management_records = _parse_management(fin_extracted, asset_id)
        elif not shareholding_records:
            shareholding_records = _parse_shareholding(fin_extracted, asset_id)
            top_owner_records = _parse_top_owners(fin_extracted, asset_id)
            management_records = _parse_management(fin_extracted, asset_id)

    if shareholding_records:
        _upsert_shareholding(conn, shareholding_records)
    if top_owner_records:
        _insert_top_owners(conn, asset_id, top_owner_records)
    if management_records:
        _insert_management(conn, asset_id, management_records)

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
    id_block = sd_response.get('detailsGeneralInformationHeader', {}) if isinstance(sd_response, dict) else {}
    if 'detailsGeneralInformationHeader' in sd_response:
        if not industry_group: industry_group = id_block.get('industryName')
        if not industry_group_rank_str and id_block.get('industryGroupRank'):
             industry_group_rank_str = f"{id_block.get('industryGroupRank')} of 197"

    latest_annual_ratio = max(consolidated_annual_ratio_records, key=lambda r: _period_sort_key(r['period_end_date']), default=None)
    latest_balance_sheet = max(consolidated_balance_sheet_records, key=lambda r: _period_sort_key(r['period_end_date']), default=None)
    latest_cashflow = max(consolidated_cashflow_records, key=lambda r: _period_sort_key(r['period_end_date']), default=None)
    market_cap = _safe_float(id_block.get('marketCapitalization') or id_block.get('marketCap'))
    pe_ratio = _safe_float(id_block.get('peRatio') or id_block.get('pe'))
    roe_ttm = _first_number(_safe_float(id_block.get('returnOnEquity') or id_block.get('roe')), latest_annual_ratio.get('roe') if latest_annual_ratio else None)
    book_value_per_share_ttm = _first_number(_safe_float(id_block.get('bookValue')), latest_annual_ratio.get('book_value_per_share') if latest_annual_ratio else None)
    dividend_yield_ttm = _safe_float(id_block.get('yield') or id_block.get('dividendYield'))
    total_shares_thousands = _first_number(_safe_float(id_block.get('totalShares')), latest_balance_sheet.get('equity_shares_number') if latest_balance_sheet else None)
    shares_in_float_thousands = _safe_float(id_block.get('sharesInFloat'))
    cash_flow_ttm = _first_number(_safe_float(id_block.get('cashFlow')), latest_cashflow.get('free_cash_flow') if latest_cashflow else None)
    debt = _first_number(
        _safe_float(id_block.get('debt')),
        ((latest_balance_sheet.get('long_term_borrowings') or 0.0) + (latest_balance_sheet.get('short_term_borrowings') or 0.0)) if latest_balance_sheet else None,
    )
    website_url = b_raw.get('websiteUrl') if isinstance(b_raw, dict) else None
    
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
                market_cap, pe_ratio, roe_ttm, book_value_per_share_ttm, dividend_yield_ttm,
                total_shares_thousands, shares_in_float_thousands, cash_flow_ttm, debt, website_url,
                canslim_checklist, red_flags,
                ai_report_summary, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
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
                market_cap=excluded.market_cap,
                pe_ratio=excluded.pe_ratio,
                roe_ttm=excluded.roe_ttm,
                book_value_per_share_ttm=excluded.book_value_per_share_ttm,
                dividend_yield_ttm=excluded.dividend_yield_ttm,
                total_shares_thousands=excluded.total_shares_thousands,
                shares_in_float_thousands=excluded.shares_in_float_thousands,
                cash_flow_ttm=excluded.cash_flow_ttm,
                debt=excluded.debt,
                website_url=excluded.website_url,
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
              market_cap, pe_ratio, roe_ttm, book_value_per_share_ttm, dividend_yield_ttm,
              total_shares_thousands, shares_in_float_thousands, cash_flow_ttm, debt, website_url,
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
    parser.add_argument('--refresh', action='store_true', help='Delete MSI raw cache for each processed symbol before refetching')
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
            ok = process_company(thread_conn, asset_id, nse_symbol, args.auth, refresh=args.refresh)
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
