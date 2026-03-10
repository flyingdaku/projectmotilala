from __future__ import annotations

import argparse
import logging
import re
import sqlite3
import time
from datetime import date
from io import StringIO
from pathlib import Path
from typing import Dict, Iterable, Optional

import pandas as pd
import requests

from core.db import DB_PATH, generate_id, init_db

logger = logging.getLogger(__name__)


class IIMADataDownloader:
    SOURCE_ID = "IIMA_FF"
    LANDING_PAGE = "https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/"
    DRAWDOWN_URL = "https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/drawdown.php"
    BASE_URL = "https://faculty.iima.ac.in/iffm/Indian-Fama-French-Momentum/DATA"
    FREQUENCY_MAP = {"daily": "DAILY", "monthly": "MONTHLY", "yearly": "YEARLY"}
    DATASET_PATTERNS = {
        "factor_returns": {
            "daily": "{tag}_FourFactors_and_Market_Returns_Daily_SurvivorshipBiasAdjusted.csv",
            "monthly": "{tag}_FourFactors_and_Market_Returns_Monthly_SurvivorshipBiasAdjusted.csv",
            "yearly": "{tag}_FourFactors_and_Market_Returns_Yearly_SurvivorshipBiasAdjusted.csv",
        },
        "size_value_returns": {
            "daily": "{tag}_Size_Value_Portfolio_Returns_Daily_SurvivorshipBiasAdjusted.csv",
            "monthly": "{tag}_Size_Value_Portfolio_Returns_Monthly_SurvivorshipBiasAdjusted.csv",
            "yearly": "{tag}_Size_Value_Portfolio_Returns_Yearly_SurvivorshipBiasAdjusted.csv",
        },
        "size_momentum_returns": {
            "daily": "{tag}_Size_Momentum_Portfolio_Returns_Daily_SurvivorshipBiasAdjusted.csv",
            "monthly": "{tag}_Size_Momentum_Portfolio_Returns_Monthly_SurvivorshipBiasAdjusted.csv",
            "yearly": "{tag}_Size_Momentum_Portfolio_Returns_Yearly_SurvivorshipBiasAdjusted.csv",
        },
        "size_value_breakpoints": "{tag}_Size_and_Value_Break_Points_for_Size_Value_Portfolios.csv",
        "size_momentum_breakpoints": "{tag}_Size_and_Momentum_Break_Points_for_Size_Momentum_Portfolios.csv",
    }

    def __init__(self, db_path: Path | str = DB_PATH):
        self.db_path = Path(db_path)
        self.conn: Optional[sqlite3.Connection] = None
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
                "Accept": "text/csv,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            }
        )

    def __enter__(self):
        init_db(str(self.db_path))
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row
        self.conn.execute("PRAGMA foreign_keys=ON;")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()
        self.session.close()

    def _request_text(self, url: str) -> str:
        response = self.session.get(url, timeout=60)
        response.raise_for_status()
        return response.text

    def resolve_release_tag(self) -> str:
        html = self._request_text(self.LANDING_PAGE)
        matches = set(
            re.findall(
                r"(\d{4}-\d{2})_FourFactors_and_Market_Returns_(?:Daily|Monthly|Yearly)_SurvivorshipBiasAdjusted\.csv",
                html,
            )
        )
        if not matches:
            raise RuntimeError("Could not resolve latest IIMA release tag")
        return sorted(matches)[-1]

    def dataset_url(self, dataset_key: str, release_tag: str, frequency: Optional[str] = None) -> str:
        pattern = self.DATASET_PATTERNS[dataset_key]
        if isinstance(pattern, dict):
            if frequency is None:
                raise ValueError(f"Frequency is required for {dataset_key}")
            filename = pattern[frequency].format(tag=release_tag)
        else:
            filename = pattern.format(tag=release_tag)
        return f"{self.BASE_URL}/{filename}"

    def download_csv(self, url: str) -> pd.DataFrame:
        return pd.read_csv(StringIO(self._request_text(url)))

    def normalize_factor_returns(self, df: pd.DataFrame, frequency: str, release_tag: str) -> pd.DataFrame:
        normalized = df.rename(columns=lambda value: str(value).strip()).rename(
            columns={"Date": "date", "MF": "market_premium", "RF": "rf_rate", "SMB": "smb", "HML": "hml", "WML": "wml"}
        )
        required_cols = ["date", "market_premium", "rf_rate", "smb", "hml", "wml"]
        missing_cols = [column for column in required_cols if column not in normalized.columns]
        if missing_cols:
            raise RuntimeError(f"IIMA factor dataset missing columns: {missing_cols}")
        for column in ["market_premium", "rf_rate", "smb", "hml", "wml"]:
            normalized[column] = pd.to_numeric(normalized[column], errors="coerce")
        normalized["market_return"] = normalized["market_premium"] + normalized["rf_rate"]
        normalized["date"] = pd.to_datetime(normalized["date"], errors="coerce").dt.strftime("%Y-%m-%d")
        normalized = normalized.dropna(subset=["date"])
        normalized["frequency"] = self.FREQUENCY_MAP[frequency]
        normalized["source"] = "IIMA"
        normalized["num_stocks"] = None
        normalized["num_portfolios"] = None
        normalized["notes"] = f"IIMA delayed survivorship-bias-adjusted release {release_tag}"
        return normalized[["date", "frequency", "market_return", "rf_rate", "market_premium", "smb", "hml", "wml", "num_stocks", "num_portfolios", "source", "notes"]]

    def _extract_portfolio_code(self, raw_label: str) -> str:
        label = str(raw_label).strip()
        match = re.search(r"\b([A-Z]{2})\b(?=\s+returns|\s*$)", label)
        if match:
            return match.group(1)
        match = re.search(r"\b([A-Z]{2})\b", label)
        if match:
            return match.group(1)
        raise RuntimeError(f"Could not determine portfolio code from column: {raw_label}")

    def normalize_portfolio_returns(self, df: pd.DataFrame, portfolio_family: str, frequency: str, release_tag: str) -> pd.DataFrame:
        normalized = df.rename(columns=lambda value: str(value).strip())
        normalized = normalized.rename(columns={normalized.columns[0]: "date"})
        long_df = normalized.melt(id_vars="date", var_name="portfolio_code", value_name="return_pct")
        long_df["portfolio_code"] = long_df["portfolio_code"].map(self._extract_portfolio_code)
        long_df["return_pct"] = pd.to_numeric(long_df["return_pct"], errors="coerce")
        long_df["date"] = pd.to_datetime(long_df["date"], errors="coerce").dt.strftime("%Y-%m-%d")
        long_df = long_df.dropna(subset=["date", "return_pct"])
        long_df["frequency"] = self.FREQUENCY_MAP[frequency]
        long_df["portfolio_family"] = portfolio_family
        long_df["release_tag"] = release_tag
        long_df["notes"] = f"IIMA delayed survivorship-bias-adjusted release {release_tag}"
        return long_df[["date", "frequency", "portfolio_family", "portfolio_code", "return_pct", "release_tag", "notes"]]

    def normalize_breakpoints(self, df: pd.DataFrame, breakpoint_family: str, release_tag: str) -> pd.DataFrame:
        normalized = df.copy().iloc[:, :4]
        normalized.columns = ["period_key", "size_p90", "low_cut", "high_cut"]
        normalized["period_key"] = normalized["period_key"].astype(str).str.strip()
        for column in ["size_p90", "low_cut", "high_cut"]:
            normalized[column] = pd.to_numeric(normalized[column], errors="coerce")
        normalized = normalized.dropna(subset=["period_key"])
        normalized["breakpoint_family"] = breakpoint_family
        normalized["release_tag"] = release_tag
        return normalized[["period_key", "breakpoint_family", "size_p90", "low_cut", "high_cut", "release_tag"]]

    def scrape_drawdowns(self, release_tag: str) -> pd.DataFrame:
        html = self._request_text(self.DRAWDOWN_URL)
        text = re.sub(r"<[^>]+>", " ", html)
        text = re.sub(r"\s+", " ", text)
        factor_specs = {
            "ERP": "Equity Risk Premium (ERP)",
            "HML": "Value Factor (HML)",
            "SMB": "Size Factor (SMB)",
            "WML": "Momentum Factor (WML)",
        }
        records = []
        for factor_code, factor_name in factor_specs.items():
            pattern = (
                rf"{re.escape(factor_name)}.*?annualized return of ([\-\d.]+)% with an annualized volatility of ([\-\d.]+)%\. "
                rf"The worst drawdown was ([\-\d.]+)% and the duration of this drawdown was ([\-\d.]+) years"
            )
            match = re.search(pattern, text)
            if not match:
                raise RuntimeError(f"Could not parse drawdown metrics for {factor_name}")
            records.append(
                {
                    "factor_code": factor_code,
                    "factor_name": factor_name,
                    "annualized_return": float(match.group(1)),
                    "annualized_volatility": float(match.group(2)),
                    "worst_drawdown": float(match.group(3)),
                    "drawdown_duration_years": float(match.group(4)),
                    "source_url": self.DRAWDOWN_URL,
                    "release_tag": release_tag,
                }
            )
        return pd.DataFrame(records)

    def _replace_rows(self, table_name: str, where_sql: str, params: tuple, df: pd.DataFrame) -> int:
        if df.empty:
            return 0
        self.conn.execute(f"DELETE FROM {table_name} WHERE {where_sql}", params)
        df.to_sql(table_name, self.conn, if_exists="append", index=False)
        return len(df)

    def ingest_release(self, release_tag: str, frequencies: Iterable[str]) -> Dict[str, int]:
        summary = {"ff_factor_returns": 0, "ff_iima_portfolio_returns": 0, "ff_iima_breakpoints": 0, "ff_iima_drawdowns": 0}
        for frequency in frequencies:
            factor_df = self.normalize_factor_returns(self.download_csv(self.dataset_url("factor_returns", release_tag, frequency)), frequency, release_tag)
            summary["ff_factor_returns"] += self._replace_rows("ff_factor_returns", "source = 'IIMA' AND frequency = ?", (self.FREQUENCY_MAP[frequency],), factor_df)
            size_value_df = self.normalize_portfolio_returns(self.download_csv(self.dataset_url("size_value_returns", release_tag, frequency)), "SIZE_VALUE", frequency, release_tag)
            summary["ff_iima_portfolio_returns"] += self._replace_rows("ff_iima_portfolio_returns", "portfolio_family = ? AND frequency = ?", ("SIZE_VALUE", self.FREQUENCY_MAP[frequency]), size_value_df)
            size_momentum_df = self.normalize_portfolio_returns(self.download_csv(self.dataset_url("size_momentum_returns", release_tag, frequency)), "SIZE_MOMENTUM", frequency, release_tag)
            summary["ff_iima_portfolio_returns"] += self._replace_rows("ff_iima_portfolio_returns", "portfolio_family = ? AND frequency = ?", ("SIZE_MOMENTUM", self.FREQUENCY_MAP[frequency]), size_momentum_df)
        size_value_bp_df = self.normalize_breakpoints(self.download_csv(self.dataset_url("size_value_breakpoints", release_tag)), "SIZE_VALUE", release_tag)
        summary["ff_iima_breakpoints"] += self._replace_rows("ff_iima_breakpoints", "breakpoint_family = ?", ("SIZE_VALUE",), size_value_bp_df)
        size_momentum_bp_df = self.normalize_breakpoints(self.download_csv(self.dataset_url("size_momentum_breakpoints", release_tag)), "SIZE_MOMENTUM", release_tag)
        summary["ff_iima_breakpoints"] += self._replace_rows("ff_iima_breakpoints", "breakpoint_family = ?", ("SIZE_MOMENTUM",), size_momentum_bp_df)
        drawdown_df = self.scrape_drawdowns(release_tag)
        summary["ff_iima_drawdowns"] += self._replace_rows("ff_iima_drawdowns", "factor_code IN ('ERP', 'HML', 'SMB', 'WML')", tuple(), drawdown_df)
        self.conn.commit()
        return summary

    def log_pipeline_run(self, trade_date: date, status: str, records_inserted: int, duration_ms: int, error_log: Optional[str] = None) -> None:
        self.conn.execute(
            """
            INSERT INTO pipeline_runs (id, run_date, pipeline_type, source, status, records_inserted, records_skipped, duration_ms, error_log)
            VALUES (?, ?, 'DAILY', ?, ?, ?, ?, ?, ?)
            """,
            (generate_id(), trade_date.isoformat(), self.SOURCE_ID, status, records_inserted, 0, duration_ms, error_log),
        )
        self.conn.commit()

    def run(self, trade_date: Optional[date] = None, frequencies: Optional[Iterable[str]] = None) -> Dict[str, int]:
        effective_trade_date = trade_date or date.today()
        effective_frequencies = list(frequencies or ["daily", "monthly", "yearly"])
        start_time = time.time()
        try:
            release_tag = self.resolve_release_tag()
            summary = self.ingest_release(release_tag, effective_frequencies)
            records_inserted = sum(summary.values())
            self.log_pipeline_run(effective_trade_date, "SUCCESS", records_inserted, int((time.time() - start_time) * 1000))
            logger.info("IIMA FF pipeline complete: release=%s summary=%s", release_tag, summary)
            return summary
        except Exception as exc:
            duration_ms = int((time.time() - start_time) * 1000)
            if self.conn:
                self.conn.rollback()
                self.log_pipeline_run(effective_trade_date, "FAILED", 0, duration_ms, str(exc))
            raise


def run_iima_ff_pipeline(trade_date: Optional[date] = None, frequencies: Optional[Iterable[str]] = None) -> Dict[str, int]:
    with IIMADataDownloader() as downloader:
        return downloader.run(trade_date=trade_date, frequencies=frequencies)


def main() -> None:
    parser = argparse.ArgumentParser(description="IIMA Fama-French Data Downloader")
    parser.add_argument("--frequency", choices=["daily", "monthly", "yearly", "all"], default="all")
    parser.add_argument("--trade-date", default=None)
    args = parser.parse_args()
    frequencies = [args.frequency] if args.frequency != "all" else ["daily", "monthly", "yearly"]
    trade_date = date.fromisoformat(args.trade_date) if args.trade_date else None
    run_iima_ff_pipeline(trade_date=trade_date, frequencies=frequencies)


if __name__ == "__main__":
    main()
