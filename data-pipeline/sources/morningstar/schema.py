from __future__ import annotations

import sqlite3


_ASSET_COLUMNS = {
    "amc_name": "TEXT",
    "mf_category": "TEXT",
}


_DDL = [
    """
    CREATE TABLE IF NOT EXISTS pipeline_run_checkpoints (
      id TEXT PRIMARY KEY,
      run_id TEXT NOT NULL,
      source TEXT NOT NULL,
      processed_count INTEGER NOT NULL,
      inserted_count INTEGER NOT NULL,
      skipped_count INTEGER NOT NULL DEFAULT 0,
      error_count INTEGER NOT NULL DEFAULT 0,
      details_json TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
    """,
    "CREATE INDEX IF NOT EXISTS idx_pipeline_run_checkpoints_run ON pipeline_run_checkpoints(run_id, created_at DESC);",
    "CREATE INDEX IF NOT EXISTS idx_pipeline_run_checkpoints_source ON pipeline_run_checkpoints(source, created_at DESC);",
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_directory (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      fund_house_slug TEXT NOT NULL,
      fund_house_name TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_name TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      category_name TEXT,
      distribution_type TEXT,
      structure TEXT,
      latest_nav REAL,
      nav_date TEXT,
      isin TEXT,
      raw_html_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    "CREATE INDEX IF NOT EXISTS idx_ms_dir_fund_id ON src_morningstar_fund_directory(morningstar_fund_id);",
    "CREATE INDEX IF NOT EXISTS idx_ms_dir_asset ON src_morningstar_fund_directory(asset_id);",
    "CREATE INDEX IF NOT EXISTS idx_ms_dir_house ON src_morningstar_fund_directory(fund_house_slug);",
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_overview (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      scheme_name TEXT,
      isin TEXT,
      amc_name TEXT,
      category_name TEXT,
      distribution_type TEXT,
      structure TEXT,
      latest_nav REAL,
      nav_date TEXT,
      benchmark_name TEXT,
      tabs_json TEXT,
      raw_html_path TEXT,
      raw_json_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    "CREATE INDEX IF NOT EXISTS idx_ms_overview_asset ON src_morningstar_fund_overview(asset_id);",
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_performance (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      as_of_date TEXT,
      growth_of_10000_json TEXT,
      trailing_returns_json TEXT,
      calendar_returns_json TEXT,
      monthly_returns_json TEXT,
      quarterly_returns_json TEXT,
      raw_html_path TEXT,
      raw_json_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_risk (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      as_of_date TEXT,
      star_rating REAL,
      morningstar_risk_label TEXT,
      risk_json TEXT,
      raw_html_path TEXT,
      raw_json_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_portfolio (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      as_of_date TEXT,
      asset_allocation_json TEXT,
      style_box_json TEXT,
      characteristics_json TEXT,
      raw_html_path TEXT,
      raw_json_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_holdings (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      holdings_kind TEXT NOT NULL DEFAULT 'DETAILED',
      as_of_date TEXT,
      holdings_json TEXT,
      raw_html_path TEXT,
      raw_json_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url, holdings_kind),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_factsheets (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      document_url TEXT,
      document_type TEXT NOT NULL DEFAULT 'FACTSHEET',
      raw_html_path TEXT,
      raw_pdf_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url, document_type),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_analysis (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      is_login_gated INTEGER DEFAULT 1,
      raw_html_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS src_morningstar_fund_managers (
      id TEXT PRIMARY KEY,
      asset_id TEXT,
      morningstar_fund_id TEXT NOT NULL,
      scheme_url TEXT NOT NULL,
      managers_json TEXT,
      raw_html_path TEXT,
      raw_json TEXT,
      source_page_url TEXT,
      captured_at TEXT DEFAULT (datetime('now')),
      UNIQUE (morningstar_fund_id, scheme_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_scheme_master (
      asset_id TEXT PRIMARY KEY,
      morningstar_fund_id TEXT UNIQUE,
      scheme_name TEXT NOT NULL,
      amc_name TEXT,
      distribution_type TEXT,
      structure TEXT,
      morningstar_category TEXT,
      benchmark_name TEXT,
      isin TEXT,
      is_active INTEGER DEFAULT 1,
      source_updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_manager_assignments (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      morningstar_fund_id TEXT,
      manager_name TEXT NOT NULL,
      role TEXT,
      start_date TEXT,
      end_date TEXT,
      tenure_years_text TEXT,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, manager_name, role, start_date, end_date),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    "CREATE INDEX IF NOT EXISTS idx_mf_manager_asset ON mf_manager_assignments(asset_id);",
    """
    CREATE TABLE IF NOT EXISTS mf_trailing_returns (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      morningstar_fund_id TEXT,
      as_of_date TEXT,
      horizon_code TEXT NOT NULL,
      period_type TEXT NOT NULL DEFAULT 'TRAILING',
      fund_return REAL,
      category_return REAL,
      benchmark_return REAL,
      rank REAL,
      quartile TEXT,
      percentile_rank REAL,
      peer_count INTEGER,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, period_type, as_of_date, horizon_code),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_calendar_returns (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      morningstar_fund_id TEXT,
      period_kind TEXT NOT NULL,
      period_label TEXT NOT NULL,
      fund_return REAL,
      category_return REAL,
      benchmark_return REAL,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, period_kind, period_label),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_risk_metrics (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      morningstar_fund_id TEXT,
      as_of_date TEXT,
      alpha REAL,
      beta REAL,
      r_squared REAL,
      sharpe REAL,
      sortino REAL,
      treynor REAL,
      stddev REAL,
      upside_capture REAL,
      downside_capture REAL,
      morningstar_risk_label TEXT,
      star_rating REAL,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, as_of_date),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_asset_allocation (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      as_of_date TEXT,
      asset_bucket TEXT NOT NULL,
      weight_pct REAL,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, as_of_date, asset_bucket),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_style_box_snapshots (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      as_of_date TEXT,
      style_dimension TEXT NOT NULL,
      weight_pct REAL,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, as_of_date, style_dimension),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_portfolio_characteristics (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      as_of_date TEXT,
      characteristic_name TEXT NOT NULL,
      characteristic_value TEXT,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, as_of_date, characteristic_name),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_holdings (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      as_of_date TEXT,
      holding_name TEXT NOT NULL,
      holding_type TEXT,
      holding_isin TEXT,
      holding_ticker TEXT,
      weight_pct REAL,
      market_value REAL,
      share_count REAL,
      sector TEXT,
      country TEXT,
      rank INTEGER,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, as_of_date, holding_name, rank),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS mf_documents (
      id TEXT PRIMARY KEY,
      asset_id TEXT NOT NULL,
      as_of_date TEXT,
      document_type TEXT NOT NULL,
      document_url TEXT,
      source_page_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE (asset_id, document_type, document_url),
      FOREIGN KEY (asset_id) REFERENCES assets(id)
    );
    """,
]


def ensure_morningstar_schema_sqlite(conn: sqlite3.Connection) -> None:
    existing_cols = {row[1] for row in conn.execute("PRAGMA table_info(assets)").fetchall()}
    for column_name, column_type in _ASSET_COLUMNS.items():
        if column_name not in existing_cols:
            conn.execute(f"ALTER TABLE assets ADD COLUMN {column_name} {column_type}")
    for ddl in _DDL:
        conn.execute(ddl)
    conn.commit()
