import sys
import os
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

"""
Integration tests for the data pipeline.
These tests use a temporary in-memory SQLite database.

Run with: pytest tests/test_pipeline_integration.py -v
"""
import io
import json
import sqlite3
import tempfile
import zipfile
from datetime import date, timedelta
from unittest.mock import MagicMock, patch

import pandas as pd
import pytest



# ─── FIXTURES ─────────────────────────────────────────────────────────────────

@pytest.fixture
def tmp_db(tmp_path, monkeypatch):
    """Create a temporary SQLite database with the full schema."""
    db_path = str(tmp_path / "test_market_data.db")
    schema_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "db", "schema.sql")

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    with open(schema_path) as f:
        conn.executescript(f.read())
    conn.close()

    # Patch DEFAULT_DB_PATH in core.db
    monkeypatch.setattr("core.db.DEFAULT_DB_PATH", db_path)
    return db_path


@pytest.fixture
def sample_bhavcopy_csv() -> bytes:
    """Create a minimal NSE Bhavcopy CSV in new format."""
    csv_content = (
        "TradDt,BizDt,Sgmt,Src,FinInstrmTp,FinInstrmId,ISIN,TckrSymb,SctySrs,"
        "OpnPric,HghPric,LwPric,ClsPric,LastPric,PrvsClsgPric,TtlTradgVol,TtlNbOfTxsExctd\n"
        "2024-01-15,2024-01-15,CM,,EQ,,INE009A01021,INFOSYS,EQ,"
        "1500.00,1520.00,1490.00,1510.00,1510.00,1505.00,1000000,5000\n"
        "2024-01-15,2024-01-15,CM,,EQ,,INE002A01018,RELIANCE,EQ,"
        "2800.00,2850.00,2780.00,2820.00,2820.00,2810.00,2000000,8000\n"
        "2024-01-15,2024-01-15,CM,,EQ,,INE001A01036,HDFCBANK,GB,"  # GB series — should be filtered
        "1600.00,1620.00,1590.00,1610.00,1610.00,1605.00,500000,2000\n"
    )
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("BhavCopy_NSE_CM_0_0_0_20240115_F_0000.csv", csv_content)
    return buf.getvalue()


@pytest.fixture
def seed_assets(tmp_db):
    """Insert two test assets into the database."""
    import core.db as db_module
    from core.db import generate_id

    with db_module.get_db() as conn:
        conn.execute(
            """INSERT OR IGNORE INTO assets (id, isin, nse_symbol, name, asset_class, nse_listed, is_active)
               VALUES (?, ?, ?, ?, 'EQUITY', 1, 1)""",
            (generate_id(), "INE009A01021", "INFOSYS", "Infosys Limited"),
        )
        conn.execute(
            """INSERT OR IGNORE INTO assets (id, isin, nse_symbol, name, asset_class, nse_listed, is_active)
               VALUES (?, ?, ?, ?, 'EQUITY', 1, 1)""",
            (generate_id(), "INE002A01018", "RELIANCE", "Reliance Industries"),
        )


# ─── BHAVCOPY PARSING TESTS ───────────────────────────────────────────────────

class TestBhavcopyparsing:
    def test_parse_new_format_filters_eq_only(self, sample_bhavcopy_csv):
        from sources.nse.bhavcopy import parse_bhavcopy

        df = parse_bhavcopy(sample_bhavcopy_csv, is_zip=True)

        assert len(df) == 2  # GB series row should be filtered out
        assert set(df["SYMBOL"].tolist()) == {"INFOSYS", "RELIANCE"}

    def test_parse_returns_required_columns(self, sample_bhavcopy_csv):
        from sources.nse.bhavcopy import parse_bhavcopy

        df = parse_bhavcopy(sample_bhavcopy_csv, is_zip=True)
        required = {"TIMESTAMP", "ISIN", "SYMBOL", "SERIES", "OPEN", "HIGH", "LOW", "CLOSE", "VOLUME"}
        assert required.issubset(set(df.columns))

    def test_parse_date_format(self, sample_bhavcopy_csv):
        from sources.nse.bhavcopy import parse_bhavcopy

        df = parse_bhavcopy(sample_bhavcopy_csv, is_zip=True)
        assert df["TIMESTAMP"].iloc[0] == "2024-01-15"

    def test_parse_numeric_prices(self, sample_bhavcopy_csv):
        from sources.nse.bhavcopy import parse_bhavcopy

        df = parse_bhavcopy(sample_bhavcopy_csv, is_zip=True)
        infosys = df[df["SYMBOL"] == "INFOSYS"].iloc[0]
        assert float(infosys["CLOSE"]) == pytest.approx(1510.0)
        assert float(infosys["OPEN"]) == pytest.approx(1500.0)


# ─── ASSET UPSERT TESTS ───────────────────────────────────────────────────────

class TestAssetUpsert:
    def test_new_assets_created(self, tmp_db):
        from core.db import SqliteConnection
        from db.repositories.assets import AssetRepository
        from core.models import Asset
        from core.db import generate_id

        conn = SqliteConnection(tmp_db)
        asset = Asset(id=generate_id(), isin="INE999A01001", nse_symbol="TESTCO", name="", asset_class="EQUITY", series="EQ", is_active=True, nse_listed=True)
        AssetRepository(conn).upsert(asset)

        row = conn.fetchone("SELECT * FROM assets WHERE isin = ?", ("INE999A01001",))

        assert row is not None
        assert row["nse_symbol"] == "TESTCO"
        assert row["nse_listed"] == 1

    def test_existing_asset_symbol_updated(self, tmp_db, seed_assets):
        from core.db import SqliteConnection
        from db.repositories.assets import AssetRepository
        from core.models import Asset

        conn = SqliteConnection(tmp_db)
        # seed_assets adds INE009A01021 with symbol INFOSYS. Upsert slightly changes it to INFY.
        existing = AssetRepository(conn).find_by_isin("INE009A01021")
        asset = Asset(id=existing.id, isin="INE009A01021", nse_symbol="INFY", name="Infosys Limited", asset_class="EQUITY", series="EQ", is_active=True, nse_listed=True)
        AssetRepository(conn).upsert(asset)

        row = conn.fetchone("SELECT nse_symbol FROM assets WHERE isin = ?", ("INE009A01021",))

        assert row["nse_symbol"] == "INFY"

    def test_security_master_populates_name(self, tmp_db):
        from core.db import SqliteConnection
        from db.repositories.assets import AssetRepository
        from core.models import Asset
        from core.db import generate_id

        conn = SqliteConnection(tmp_db)
        asset = Asset(id=generate_id(), isin="INE888A01001", nse_symbol="NEWCO", name="New Company Ltd", asset_class="EQUITY", series="EQ", is_active=True, nse_listed=True, listing_date="2020-01-01")
        AssetRepository(conn).upsert(asset)

        row = conn.fetchone("SELECT name FROM assets WHERE isin = ?", ("INE888A01001",))

        assert row["name"] == "New Company Ltd"


# ─── PRICE INSERT TESTS ───────────────────────────────────────────────────────

class TestPriceInsert:
    def test_prices_inserted_correctly(self, tmp_db, seed_assets):
        from core.db import SqliteConnection
        from db.repositories.prices import PriceRepository
        from db.repositories.assets import AssetRepository
        from core.models import PriceBar

        conn = SqliteConnection(tmp_db)
        asset_id = AssetRepository(conn).find_by_isin("INE009A01021").id

        bar = PriceBar(asset_id=asset_id, date="2024-01-15", open=1500.0, high=1520.0, low=1490.0, close=1510.0, adj_close=1510.0, volume=1000000, trades=5000, source_exchange="NSE")
        PriceRepository(conn).upsert_batch([bar])

        row = conn.fetchone(
            """SELECT dp.* FROM daily_prices dp
               JOIN assets a ON dp.asset_id = a.id
               WHERE a.isin = ? AND dp.date = ?""",
            ("INE009A01021", "2024-01-15"),
        )

        assert row is not None
        assert float(row["close"]) == pytest.approx(1510.0)
        assert float(row["adj_close"]) == pytest.approx(1510.0)
        assert row["source_exchange"] == "NSE"

    def test_price_insert_idempotent(self, tmp_db, seed_assets):
        """Running insert twice should not create duplicates."""
        from core.db import SqliteConnection
        from db.repositories.prices import PriceRepository
        from db.repositories.assets import AssetRepository
        from core.models import PriceBar

        conn = SqliteConnection(tmp_db)
        asset_id = AssetRepository(conn).find_by_isin("INE009A01021").id
        bar = PriceBar(asset_id=asset_id, date="2024-01-15", open=1500.0, high=1520.0, low=1490.0, close=1510.0, adj_close=1510.0, volume=1000000, trades=5000, source_exchange="NSE")

        PriceRepository(conn).upsert_batch([bar])
        PriceRepository(conn).upsert_batch([bar])

        count = conn.fetchone(
            """SELECT COUNT(*) as cnt FROM daily_prices dp
               JOIN assets a ON dp.asset_id = a.id
               WHERE a.isin = ? AND dp.date = ?""",
            ("INE009A01021", "2024-01-15"),
        )["cnt"]

        assert count == 1


# ─── CIRCUIT BREAKER TESTS ────────────────────────────────────────────────────

class TestCircuitBreakers:
    def test_zero_price_rejected(self, tmp_db):
        from utils.circuit_breakers import run_circuit_breakers

        df = pd.DataFrame([
            {"isin": "INE001", "symbol": "TEST", "close": 0.0, "volume": 1000},
        ])
        clean, flagged = run_circuit_breakers(df, date(2024, 1, 15))

        assert len(clean) == 0
        assert len(flagged) == 1
        assert flagged[0]["reason"] == "ZERO_PRICE"

    def test_negative_price_rejected(self, tmp_db):
        from utils.circuit_breakers import run_circuit_breakers

        df = pd.DataFrame([
            {"isin": "INE001", "symbol": "TEST", "close": -10.0, "volume": 1000},
        ])
        clean, flagged = run_circuit_breakers(df, date(2024, 1, 15))

        assert len(clean) == 0
        assert flagged[0]["reason"] == "ZERO_PRICE"

    def test_normal_price_passes(self, tmp_db):
        from utils.circuit_breakers import run_circuit_breakers

        df = pd.DataFrame([
            {"isin": "INE001", "symbol": "TEST", "close": 100.0, "volume": 1000},
        ])
        clean, flagged = run_circuit_breakers(df, date(2024, 1, 15))

        assert len(clean) == 1
        zero_price_flags = [f for f in flagged if f["reason"] == "ZERO_PRICE"]
        assert len(zero_price_flags) == 0


# ─── ADJUSTED CLOSE TESTS ─────────────────────────────────────────────────────

class TestAdjustedClose:
    def test_adj_close_after_bonus(self, tmp_db, seed_assets):
        """
        After a 1:1 bonus (factor=0.5), historical prices should be halved.
        """
        from pipelines.corporate_actions import retroactively_adjust_history
        from pipelines.adjust_prices import compute_adj_close_for_all_assets
        from core.db import SqliteConnection
        from db.repositories.assets import AssetRepository
        from db.repositories.prices import PriceRepository
        from core.models import PriceBar
        from core.db import generate_id

        conn = SqliteConnection(tmp_db)
        asset_id = AssetRepository(conn).find_by_isin("INE009A01021").id

        bar = PriceBar(asset_id=asset_id, date="2024-01-10", open=1500.0, high=1520.0, low=1490.0, close=1500.0, adj_close=1500.0, volume=1000000, trades=5000, source_exchange="NSE")
        PriceRepository(conn).upsert_batch([bar])

        # Insert a 1:1 bonus with ex_date 2024-01-15
        conn.execute(
            """INSERT INTO corporate_actions
               (id, asset_id, action_type, ex_date, ratio_numerator, ratio_denominator, adjustment_factor)
               VALUES (?, ?, 'BONUS', '2024-01-15', 1, 1, 0.5)""",
            (generate_id(), asset_id),
        )

        conn.commit()
        # Recompute adj_close
        compute_adj_close_for_all_assets()

        # Historical price (before ex_date) should be halved
        row = conn.fetchone(
            """SELECT adj_close FROM daily_prices
               WHERE asset_id = ? AND date = '2024-01-10'""",
            (asset_id,),
        )

        assert row is not None
        assert float(row["adj_close"]) == pytest.approx(750.0, rel=1e-4)

    def test_no_corp_action_adj_equals_close(self, tmp_db, seed_assets):
        """Without corporate actions, adj_close should equal close."""
        from pipelines.adjust_prices import compute_adj_close_for_all_assets
        from core.db import SqliteConnection
        from db.repositories.assets import AssetRepository
        from db.repositories.prices import PriceRepository
        from core.models import PriceBar

        conn = SqliteConnection(tmp_db)
        asset_id = AssetRepository(conn).find_by_isin("INE009A01021").id
        bar = PriceBar(asset_id=asset_id, date="2024-01-10", open=1500.0, high=1520.0, low=1490.0, close=1500.0, adj_close=1500.0, volume=1000000, trades=5000, source_exchange="NSE")
        PriceRepository(conn).upsert_batch([bar])
        conn.commit()

        compute_adj_close_for_all_assets()

        row = conn.fetchone(
            """SELECT close, adj_close FROM daily_prices
               WHERE asset_id = ?
               AND date = '2024-01-10'""",
            (asset_id,),
        )

        assert float(row["adj_close"]) == pytest.approx(float(row["close"]), rel=1e-6)
