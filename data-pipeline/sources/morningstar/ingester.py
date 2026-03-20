from __future__ import annotations

import hashlib
import json
import logging
import os
import random
import re
import time
from datetime import date
from typing import Any, Dict, List, Optional
from urllib.parse import urljoin

import requests

from core.db import DatabaseConnection, generate_id, get_connection
from core.models import PipelineRun
from core.registry import SourceIngester, register_source
from core.session import create_morningstar_session
from sources.morningstar.parser import (
    TAB_KEYS,
    build_tab_urls,
    canonicalize_scheme_url,
    extract_fund_house_slug,
    json_dumps,
    normalize_space,
    parse_directory_page,
    parse_factsheet_page,
    parse_fund_house_links,
    parse_holdings_page,
    parse_overview_page,
    parse_performance_page,
    parse_portfolio_page,
    parse_risk_page,
)
from sources.morningstar.schema import ensure_morningstar_schema_sqlite
from utils.storage import load_raw_file, raw_file_exists, save_raw_file

logger = logging.getLogger(__name__)

DISCOVERY_URLS = (
    "https://www.morningstar.in/",
    "https://www.morningstar.in/login.aspx",
)

SOURCE_DIR = "MORNINGSTAR/FUND_DIRECTORY"
SOURCE_TABS = "MORNINGSTAR/FUND_TABS"
SOURCE_FACTSHEETS = "MORNINGSTAR/FACTSHEETS"


def _env_flag(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _normalise_name_for_match(name: Optional[str]) -> Optional[str]:
    if not name:
        return None
    return re.sub(r"\s+", " ", name).strip().lower()


def _asset_id_from_row(conn: DatabaseConnection, scheme_name: Optional[str], amc_name: Optional[str], isin: Optional[str]) -> Optional[str]:
    if isin:
        row = conn.fetchone("SELECT id FROM assets WHERE isin = ? LIMIT 1", (isin,))
        if row:
            return row["id"]
    normalized_name = _normalise_name_for_match(scheme_name)
    normalized_amc = _normalise_name_for_match(amc_name)
    if normalized_name and normalized_amc:
        row = conn.fetchone(
            """
            SELECT id
            FROM assets
            WHERE asset_class = 'MF'
              AND lower(trim(name)) = ?
              AND lower(trim(coalesce(amc_name, ''))) = ?
            ORDER BY is_active DESC
            LIMIT 1
            """,
            (normalized_name, normalized_amc),
        )
        if row:
            return row["id"]
    if normalized_name:
        row = conn.fetchone(
            """
            SELECT id
            FROM assets
            WHERE asset_class = 'MF'
              AND lower(trim(name)) = ?
            ORDER BY is_active DESC
            LIMIT 1
            """,
            (normalized_name,),
        )
        if row:
            return row["id"]
    return None


def _upsert_pipeline_run(conn: DatabaseConnection, run: PipelineRun) -> None:
    conn.execute(
        """
        INSERT INTO pipeline_runs (
          id, run_date, source, status, pipeline_type,
          records_inserted, records_skipped, circuit_breaks, error_log, duration_ms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          status = excluded.status,
          pipeline_type = excluded.pipeline_type,
          records_inserted = excluded.records_inserted,
          records_skipped = excluded.records_skipped,
          circuit_breaks = excluded.circuit_breaks,
          error_log = excluded.error_log,
          duration_ms = excluded.duration_ms
        """,
        (
            run.id,
            run.run_date,
            run.source,
            run.status,
            run.pipeline_type,
            run.records_inserted,
            run.records_skipped,
            run.circuit_breaks,
            run.error_log,
            run.duration_ms,
        ),
    )


class MorningstarBaseIngester(SourceIngester):
    RATE_LIMIT_QPS = float(os.getenv("MORNINGSTAR_RATE_LIMIT_QPS", "1.0") or "1.0")

    def __init__(self):
        self.session = create_morningstar_session()
        self.use_playwright = _env_flag("MORNINGSTAR_USE_PLAYWRIGHT", default=False)

    def _sleep(self) -> None:
        qps = max(self.RATE_LIMIT_QPS, 0.1)
        base_delay = 1.0 / qps
        time.sleep(base_delay + random.uniform(0.25, 0.75))

    def _download_html(self, trade_date: date, url: str, source_bucket: str, filename_prefix: str) -> Dict[str, Any]:
        url = canonicalize_scheme_url(url)
        digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:12]
        filename = f"{filename_prefix}_{digest}.html"
        if raw_file_exists(source_bucket, trade_date, filename):
            raw = load_raw_file(source_bucket, trade_date, filename)
            return {"text": raw.decode("utf-8", errors="replace"), "path": str(save_raw_file(source_bucket, trade_date, filename, raw))}
        self._sleep()
        response = self.session.get(url, timeout=30)
        response.raise_for_status()
        path = save_raw_file(source_bucket, trade_date, filename, response.content)
        return {"text": response.text, "path": str(path), "final_url": str(response.url)}

    def run(self, trade_date: date, conn: DatabaseConnection) -> PipelineRun:  # type: ignore[override]
        t0 = time.time()
        errors: List[str] = []
        try:
            raw_conn = getattr(conn, "raw_connection", None)
            if raw_conn is not None:
                ensure_morningstar_schema_sqlite(raw_conn)
            payload = self.fetch(trade_date)
            count = self.ingest(payload["records"], conn)
            errors = payload.get("errors", [])
            status = "PARTIAL" if errors else "SUCCESS"
            return PipelineRun(
                id=generate_id(),
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status=status,
                pipeline_type=self.PIPELINE_TYPE,
                records_inserted=count,
                records_skipped=payload.get("records_skipped", 0),
                circuit_breaks=payload.get("circuit_breaks", 0),
                error_log=json.dumps(errors[:20]) if errors else None,
                duration_ms=int((time.time() - t0) * 1000),
            )
        except Exception as exc:
            logger.exception("[%s] failed", self.SOURCE_ID)
            return PipelineRun(
                id=generate_id(),
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status="FAILED",
                pipeline_type=self.PIPELINE_TYPE,
                error_log=str(exc),
                duration_ms=int((time.time() - t0) * 1000),
            )


@register_source
class MorningstarFundDirectoryIngester(MorningstarBaseIngester):
    SOURCE_ID = "MORNINGSTAR_FUND_DIRECTORY"
    PIPELINE_TYPE = "DAILY"

    def _discover_fund_house_pages(self, trade_date: date) -> List[Dict[str, str]]:
        configured = [slug.strip().lower() for slug in os.getenv("MORNINGSTAR_FUND_HOUSES", "").split(",") if slug.strip()]
        if configured:
            return [
                {
                    "fund_house_slug": slug,
                    "fund_house_name": slug.upper(),
                    "url": f"https://www.morningstar.in/funds/{slug}.aspx",
                }
                for slug in configured
            ]

        discovered: Dict[str, Dict[str, str]] = {}
        for url in DISCOVERY_URLS:
            try:
                page = self._download_html(trade_date, url, SOURCE_DIR, f"discovery_{extract_fund_house_slug(url) or 'index'}")
                for record in parse_fund_house_links(page["text"], url):
                    discovered.setdefault(record["fund_house_slug"], record)
            except requests.RequestException as exc:
                logger.warning("[MORNINGSTAR] discovery page fetch failed for %s: %s", url, exc)
        return list(discovered.values())

    def fetch(self, trade_date: date) -> Dict[str, Any]:
        records: List[Dict[str, Any]] = []
        errors: List[str] = []
        for fund_house in self._discover_fund_house_pages(trade_date):
            url = fund_house["url"]
            try:
                page = self._download_html(trade_date, url, SOURCE_DIR, fund_house["fund_house_slug"])
                parsed = parse_directory_page(page["text"], url)
                for row in parsed["rows"]:
                    records.append({
                        **row,
                        "fund_house_slug": parsed["fund_house_slug"] or fund_house["fund_house_slug"],
                        "fund_house_name": parsed["fund_house_name"] or fund_house["fund_house_name"],
                        "source_page_url": url,
                        "raw_html_path": page["path"],
                    })
            except Exception as exc:
                errors.append(f"{url}: {exc}")
        return {"records": records, "errors": errors}

    def ingest(self, records: List[Dict[str, Any]], conn: DatabaseConnection) -> int:
        inserted = 0
        for row in records:
            asset_id = _asset_id_from_row(conn, row.get("scheme_name"), row.get("fund_house_name"), row.get("isin"))
            conn.execute(
                """
                INSERT INTO src_morningstar_fund_directory (
                  id, asset_id, fund_house_slug, fund_house_name, morningstar_fund_id,
                  scheme_name, scheme_url, category_name, distribution_type, structure,
                  latest_nav, nav_date, isin, raw_html_path, raw_json, source_page_url
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                  asset_id = excluded.asset_id,
                  fund_house_slug = excluded.fund_house_slug,
                  fund_house_name = excluded.fund_house_name,
                  scheme_name = excluded.scheme_name,
                  category_name = COALESCE(excluded.category_name, src_morningstar_fund_directory.category_name),
                  distribution_type = COALESCE(excluded.distribution_type, src_morningstar_fund_directory.distribution_type),
                  structure = COALESCE(excluded.structure, src_morningstar_fund_directory.structure),
                  latest_nav = COALESCE(excluded.latest_nav, src_morningstar_fund_directory.latest_nav),
                  nav_date = COALESCE(excluded.nav_date, src_morningstar_fund_directory.nav_date),
                  isin = COALESCE(excluded.isin, src_morningstar_fund_directory.isin),
                  raw_html_path = excluded.raw_html_path,
                  raw_json = excluded.raw_json,
                  source_page_url = excluded.source_page_url,
                  captured_at = datetime('now')
                """,
                (
                    generate_id(),
                    asset_id,
                    row.get("fund_house_slug"),
                    row.get("fund_house_name"),
                    row.get("morningstar_fund_id"),
                    row.get("scheme_name"),
                    row.get("scheme_url"),
                    row.get("category_name"),
                    row.get("distribution_type"),
                    row.get("structure"),
                    row.get("latest_nav"),
                    row.get("nav_date"),
                    row.get("isin"),
                    row.get("raw_html_path"),
                    json_dumps(row),
                    row.get("source_page_url"),
                ),
            )
            if asset_id:
                conn.execute(
                    """
                    UPDATE assets
                    SET amc_name = COALESCE(amc_name, ?),
                        mf_category = COALESCE(mf_category, ?)
                    WHERE id = ?
                    """,
                    (row.get("fund_house_name"), row.get("category_name"), asset_id),
                )
                conn.execute(
                    """
                    INSERT INTO mf_scheme_master (
                      asset_id, morningstar_fund_id, scheme_name, amc_name,
                      distribution_type, structure, morningstar_category, isin, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
                    ON CONFLICT(asset_id) DO UPDATE SET
                      morningstar_fund_id = COALESCE(excluded.morningstar_fund_id, mf_scheme_master.morningstar_fund_id),
                      scheme_name = COALESCE(excluded.scheme_name, mf_scheme_master.scheme_name),
                      amc_name = COALESCE(excluded.amc_name, mf_scheme_master.amc_name),
                      distribution_type = COALESCE(excluded.distribution_type, mf_scheme_master.distribution_type),
                      structure = COALESCE(excluded.structure, mf_scheme_master.structure),
                      morningstar_category = COALESCE(excluded.morningstar_category, mf_scheme_master.morningstar_category),
                      isin = COALESCE(excluded.isin, mf_scheme_master.isin),
                      source_updated_at = datetime('now')
                    """,
                    (
                        asset_id,
                        row.get("morningstar_fund_id"),
                        row.get("scheme_name"),
                        row.get("fund_house_name"),
                        row.get("distribution_type"),
                        row.get("structure"),
                        row.get("category_name"),
                        row.get("isin"),
                    ),
                )
            inserted += 1
        return inserted


@register_source
class MorningstarFundDetailsIngester(MorningstarBaseIngester):
    SOURCE_ID = "MORNINGSTAR_FUND_DETAILS"
    PIPELINE_TYPE = "WEEKLY"

    def __init__(self, limit: Optional[int] = None):
        super().__init__()
        self.limit = limit or int(os.getenv("MORNINGSTAR_DETAIL_LIMIT", "0") or "0") or None
        self.include_analysis = _env_flag("MORNINGSTAR_INCLUDE_ANALYSIS", default=False)

    def _load_candidates(self) -> List[Dict[str, Any]]:
        with get_connection() as conn:
            rows = conn.fetchall(
                """
                SELECT morningstar_fund_id, scheme_url, scheme_name, fund_house_name, category_name,
                       distribution_type, structure, latest_nav, nav_date, isin, asset_id
                FROM src_morningstar_fund_directory
                ORDER BY captured_at DESC
                """
            )
        deduped: List[Dict[str, Any]] = []
        seen: set[str] = set()
        for row in rows:
            key = row["morningstar_fund_id"]
            if key in seen:
                continue
            seen.add(key)
            deduped.append(row)
            if self.limit and len(deduped) >= self.limit:
                break
        return deduped

    def fetch(self, trade_date: date) -> Dict[str, Any]:
        if self.use_playwright:
            logger.info("[MORNINGSTAR] MORNINGSTAR_USE_PLAYWRIGHT is enabled, but v1 still prefers public HTML fetches where possible.")
        records: List[Dict[str, Any]] = []
        errors: List[str] = []
        for candidate in self._load_candidates():
            scheme_url = canonicalize_scheme_url(candidate["scheme_url"])
            tabs = build_tab_urls(scheme_url)
            bundle: Dict[str, Any] = {
                "asset_id": candidate.get("asset_id"),
                "morningstar_fund_id": candidate["morningstar_fund_id"],
                "scheme_url": scheme_url,
                "directory_row": candidate,
            }
            try:
                overview_page = self._download_html(trade_date, tabs["overview"], SOURCE_TABS, f"{candidate['morningstar_fund_id']}_overview")
                overview = parse_overview_page(overview_page["text"], tabs["overview"])
                overview["raw_html_path"] = overview_page["path"]
                overview["source_page_url"] = tabs["overview"]
                bundle["overview"] = overview
            except Exception as exc:
                errors.append(f"{scheme_url} overview: {exc}")
                continue

            for tab_key, parser in (
                ("performance", parse_performance_page),
                ("risk", parse_risk_page),
                ("portfolio", parse_portfolio_page),
                ("detailed_portfolio", parse_holdings_page),
                ("factsheet", parse_factsheet_page),
            ):
                try:
                    source_bucket = SOURCE_FACTSHEETS if tab_key == "factsheet" else SOURCE_TABS
                    page = self._download_html(trade_date, tabs[tab_key], source_bucket, f"{candidate['morningstar_fund_id']}_{tab_key}")
                    parsed = parser(page["text"], tabs[tab_key])
                    parsed["raw_html_path"] = page["path"]
                    parsed["source_page_url"] = tabs[tab_key]
                    bundle[tab_key] = parsed
                except Exception as exc:
                    errors.append(f"{scheme_url} {tab_key}: {exc}")
            if self.include_analysis:
                try:
                    page = self._download_html(trade_date, tabs["analysis"], SOURCE_TABS, f"{candidate['morningstar_fund_id']}_analysis")
                    bundle["analysis"] = {
                        "raw_html_path": page["path"],
                        "source_page_url": tabs["analysis"],
                        "is_login_gated": 1,
                    }
                except Exception as exc:
                    errors.append(f"{scheme_url} analysis: {exc}")
            records.append(bundle)
        return {"records": records, "errors": errors}

    def _upsert_overview(self, conn: DatabaseConnection, asset_id: Optional[str], overview: Dict[str, Any]) -> None:
        conn.execute(
            """
            INSERT INTO src_morningstar_fund_overview (
              id, asset_id, morningstar_fund_id, scheme_url, scheme_name, isin, amc_name,
              category_name, distribution_type, structure, latest_nav, nav_date, benchmark_name,
              tabs_json, raw_html_path, raw_json, source_page_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
              asset_id = excluded.asset_id,
              scheme_name = COALESCE(excluded.scheme_name, src_morningstar_fund_overview.scheme_name),
              isin = COALESCE(excluded.isin, src_morningstar_fund_overview.isin),
              amc_name = COALESCE(excluded.amc_name, src_morningstar_fund_overview.amc_name),
              category_name = COALESCE(excluded.category_name, src_morningstar_fund_overview.category_name),
              distribution_type = COALESCE(excluded.distribution_type, src_morningstar_fund_overview.distribution_type),
              structure = COALESCE(excluded.structure, src_morningstar_fund_overview.structure),
              latest_nav = COALESCE(excluded.latest_nav, src_morningstar_fund_overview.latest_nav),
              nav_date = COALESCE(excluded.nav_date, src_morningstar_fund_overview.nav_date),
              benchmark_name = COALESCE(excluded.benchmark_name, src_morningstar_fund_overview.benchmark_name),
              tabs_json = excluded.tabs_json,
              raw_html_path = excluded.raw_html_path,
              raw_json = excluded.raw_json,
              source_page_url = excluded.source_page_url,
              captured_at = datetime('now')
            """,
            (
                generate_id(),
                asset_id,
                overview.get("morningstar_fund_id"),
                overview.get("scheme_url"),
                overview.get("scheme_name"),
                overview.get("isin"),
                overview.get("amc_name"),
                overview.get("category_name"),
                overview.get("distribution_type"),
                overview.get("structure"),
                overview.get("latest_nav"),
                overview.get("nav_date"),
                overview.get("benchmark_name"),
                json_dumps(overview.get("tabs", {})),
                overview.get("raw_html_path"),
                json_dumps(overview),
                overview.get("source_page_url"),
            ),
        )

    def ingest(self, records: List[Dict[str, Any]], conn: DatabaseConnection) -> int:
        inserted = 0
        for bundle in records:
            directory_row = bundle.get("directory_row", {})
            overview = bundle.get("overview") or {}
            asset_id = bundle.get("asset_id") or _asset_id_from_row(
                conn,
                overview.get("scheme_name") or directory_row.get("scheme_name"),
                overview.get("amc_name") or directory_row.get("fund_house_name"),
                overview.get("isin") or directory_row.get("isin"),
            )

            if overview:
                self._upsert_overview(conn, asset_id, overview)

            if asset_id and overview:
                conn.execute(
                    """
                    UPDATE assets
                    SET amc_name = COALESCE(amc_name, ?),
                        mf_category = COALESCE(mf_category, ?)
                    WHERE id = ?
                    """,
                    (
                        overview.get("amc_name") or directory_row.get("fund_house_name"),
                        overview.get("category_name") or directory_row.get("category_name"),
                        asset_id,
                    ),
                )
                conn.execute(
                    """
                    INSERT INTO mf_scheme_master (
                      asset_id, morningstar_fund_id, scheme_name, amc_name, distribution_type,
                      structure, morningstar_category, benchmark_name, isin, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
                    ON CONFLICT(asset_id) DO UPDATE SET
                      morningstar_fund_id = COALESCE(excluded.morningstar_fund_id, mf_scheme_master.morningstar_fund_id),
                      scheme_name = COALESCE(excluded.scheme_name, mf_scheme_master.scheme_name),
                      amc_name = COALESCE(excluded.amc_name, mf_scheme_master.amc_name),
                      distribution_type = COALESCE(excluded.distribution_type, mf_scheme_master.distribution_type),
                      structure = COALESCE(excluded.structure, mf_scheme_master.structure),
                      morningstar_category = COALESCE(excluded.morningstar_category, mf_scheme_master.morningstar_category),
                      benchmark_name = COALESCE(excluded.benchmark_name, mf_scheme_master.benchmark_name),
                      isin = COALESCE(excluded.isin, mf_scheme_master.isin),
                      source_updated_at = datetime('now')
                    """,
                    (
                        asset_id,
                        overview.get("morningstar_fund_id"),
                        overview.get("scheme_name"),
                        overview.get("amc_name") or directory_row.get("fund_house_name"),
                        overview.get("distribution_type") or directory_row.get("distribution_type"),
                        overview.get("structure") or directory_row.get("structure"),
                        overview.get("category_name") or directory_row.get("category_name"),
                        overview.get("benchmark_name"),
                        overview.get("isin") or directory_row.get("isin"),
                    ),
                )

            performance = bundle.get("performance")
            if performance:
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_performance (
                      id, asset_id, morningstar_fund_id, scheme_url, growth_of_10000_json,
                      trailing_returns_json, calendar_returns_json, monthly_returns_json,
                      quarterly_returns_json, raw_html_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      growth_of_10000_json = excluded.growth_of_10000_json,
                      trailing_returns_json = excluded.trailing_returns_json,
                      calendar_returns_json = excluded.calendar_returns_json,
                      monthly_returns_json = excluded.monthly_returns_json,
                      quarterly_returns_json = excluded.quarterly_returns_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        performance.get("morningstar_fund_id"),
                        performance.get("scheme_url"),
                        json_dumps([]),
                        json_dumps(performance.get("trailing_returns", [])),
                        json_dumps(performance.get("calendar_returns", [])),
                        json_dumps(performance.get("monthly_returns", [])),
                        json_dumps(performance.get("quarterly_returns", [])),
                        performance.get("raw_html_path"),
                        json_dumps(performance.get("tables", [])),
                        performance.get("source_page_url"),
                    ),
                )
                if asset_id:
                    for row in performance.get("trailing_returns", []):
                        conn.execute(
                            """
                            INSERT INTO mf_trailing_returns (
                              id, asset_id, morningstar_fund_id, as_of_date, horizon_code, period_type,
                              fund_return, category_return, benchmark_return, rank, quartile,
                              percentile_rank, peer_count, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, 'TRAILING', ?, ?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, period_type, as_of_date, horizon_code) DO UPDATE SET
                              fund_return = COALESCE(excluded.fund_return, mf_trailing_returns.fund_return),
                              category_return = COALESCE(excluded.category_return, mf_trailing_returns.category_return),
                              benchmark_return = COALESCE(excluded.benchmark_return, mf_trailing_returns.benchmark_return),
                              rank = COALESCE(excluded.rank, mf_trailing_returns.rank),
                              quartile = COALESCE(excluded.quartile, mf_trailing_returns.quartile),
                              percentile_rank = COALESCE(excluded.percentile_rank, mf_trailing_returns.percentile_rank),
                              peer_count = COALESCE(excluded.peer_count, mf_trailing_returns.peer_count),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                performance.get("morningstar_fund_id"),
                                None,
                                row.get("horizon_code"),
                                row.get("fund_return"),
                                row.get("category_return"),
                                row.get("benchmark_return"),
                                row.get("rank"),
                                row.get("quartile"),
                                row.get("percentile_rank"),
                                row.get("peer_count"),
                                performance.get("source_page_url"),
                            ),
                        )
                    for row in performance.get("calendar_returns", []):
                        conn.execute(
                            """
                            INSERT INTO mf_calendar_returns (
                              id, asset_id, morningstar_fund_id, period_kind, period_label,
                              fund_return, category_return, benchmark_return, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, period_kind, period_label) DO UPDATE SET
                              fund_return = COALESCE(excluded.fund_return, mf_calendar_returns.fund_return),
                              category_return = COALESCE(excluded.category_return, mf_calendar_returns.category_return),
                              benchmark_return = COALESCE(excluded.benchmark_return, mf_calendar_returns.benchmark_return),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                performance.get("morningstar_fund_id"),
                                row.get("period_kind"),
                                row.get("period_label"),
                                row.get("fund_return"),
                                row.get("category_return"),
                                row.get("benchmark_return"),
                                performance.get("source_page_url"),
                            ),
                        )

            risk = bundle.get("risk")
            if risk:
                metrics = risk.get("risk_metrics", {})
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_risk (
                      id, asset_id, morningstar_fund_id, scheme_url, star_rating,
                      morningstar_risk_label, risk_json, raw_html_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      star_rating = COALESCE(excluded.star_rating, src_morningstar_fund_risk.star_rating),
                      morningstar_risk_label = COALESCE(excluded.morningstar_risk_label, src_morningstar_fund_risk.morningstar_risk_label),
                      risk_json = excluded.risk_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        risk.get("morningstar_fund_id"),
                        risk.get("scheme_url"),
                        metrics.get("star_rating"),
                        metrics.get("morningstar_risk_label"),
                        json_dumps(metrics),
                        risk.get("raw_html_path"),
                        json_dumps(risk.get("tables", [])),
                        risk.get("source_page_url"),
                    ),
                )
                if asset_id:
                    conn.execute(
                        """
                        INSERT INTO mf_risk_metrics (
                          id, asset_id, morningstar_fund_id, as_of_date, alpha, beta, r_squared,
                          sharpe, sortino, treynor, stddev, upside_capture, downside_capture,
                          morningstar_risk_label, star_rating, source_page_url
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(asset_id, as_of_date) DO UPDATE SET
                          alpha = COALESCE(excluded.alpha, mf_risk_metrics.alpha),
                          beta = COALESCE(excluded.beta, mf_risk_metrics.beta),
                          r_squared = COALESCE(excluded.r_squared, mf_risk_metrics.r_squared),
                          sharpe = COALESCE(excluded.sharpe, mf_risk_metrics.sharpe),
                          sortino = COALESCE(excluded.sortino, mf_risk_metrics.sortino),
                          treynor = COALESCE(excluded.treynor, mf_risk_metrics.treynor),
                          stddev = COALESCE(excluded.stddev, mf_risk_metrics.stddev),
                          upside_capture = COALESCE(excluded.upside_capture, mf_risk_metrics.upside_capture),
                          downside_capture = COALESCE(excluded.downside_capture, mf_risk_metrics.downside_capture),
                          morningstar_risk_label = COALESCE(excluded.morningstar_risk_label, mf_risk_metrics.morningstar_risk_label),
                          star_rating = COALESCE(excluded.star_rating, mf_risk_metrics.star_rating),
                          source_page_url = excluded.source_page_url
                        """,
                        (
                            generate_id(),
                            asset_id,
                            risk.get("morningstar_fund_id"),
                            None,
                            metrics.get("alpha"),
                            metrics.get("beta"),
                            metrics.get("r_squared"),
                            metrics.get("sharpe"),
                            metrics.get("sortino"),
                            metrics.get("treynor"),
                            metrics.get("stddev"),
                            metrics.get("upside_capture"),
                            metrics.get("downside_capture"),
                            metrics.get("morningstar_risk_label"),
                            metrics.get("star_rating"),
                            risk.get("source_page_url"),
                        ),
                    )

            portfolio = bundle.get("portfolio")
            if portfolio:
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_portfolio (
                      id, asset_id, morningstar_fund_id, scheme_url, asset_allocation_json,
                      style_box_json, characteristics_json, raw_html_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      asset_allocation_json = excluded.asset_allocation_json,
                      style_box_json = excluded.style_box_json,
                      characteristics_json = excluded.characteristics_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        portfolio.get("morningstar_fund_id"),
                        portfolio.get("scheme_url"),
                        json_dumps(portfolio.get("asset_allocation", [])),
                        json_dumps(portfolio.get("style_box", [])),
                        json_dumps(portfolio.get("characteristics", [])),
                        portfolio.get("raw_html_path"),
                        json_dumps(portfolio.get("tables", [])),
                        portfolio.get("source_page_url"),
                    ),
                )
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_managers (
                      id, asset_id, morningstar_fund_id, scheme_url, managers_json,
                      raw_html_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      managers_json = excluded.managers_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        portfolio.get("morningstar_fund_id"),
                        portfolio.get("scheme_url"),
                        json_dumps(portfolio.get("managers", [])),
                        portfolio.get("raw_html_path"),
                        json_dumps(portfolio.get("tables", [])),
                        portfolio.get("source_page_url"),
                    ),
                )
                if asset_id:
                    for row in portfolio.get("asset_allocation", []):
                        conn.execute(
                            """
                            INSERT INTO mf_asset_allocation (
                              id, asset_id, as_of_date, asset_bucket, weight_pct, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, as_of_date, asset_bucket) DO UPDATE SET
                              weight_pct = COALESCE(excluded.weight_pct, mf_asset_allocation.weight_pct),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                None,
                                row.get("asset_bucket"),
                                row.get("weight_pct"),
                                portfolio.get("source_page_url"),
                            ),
                        )
                    manager_rows = portfolio.get("managers", [])
                    tenure_lookup = {
                        entry.get("label", "").lower(): entry.get("value")
                        for entry in manager_rows
                        if isinstance(entry, dict)
                    }
                    for row in manager_rows:
                        if not isinstance(row, dict):
                            continue
                        label = normalize_space(row.get("label"))
                        value = normalize_space(row.get("value"))
                        if "manager" not in label.lower() or not value:
                            continue
                        conn.execute(
                            """
                            INSERT INTO mf_manager_assignments (
                              id, asset_id, morningstar_fund_id, manager_name, role, tenure_years_text, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, manager_name, role, start_date, end_date) DO UPDATE SET
                              tenure_years_text = COALESCE(excluded.tenure_years_text, mf_manager_assignments.tenure_years_text),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                portfolio.get("morningstar_fund_id"),
                                value,
                                label,
                                tenure_lookup.get("tenure"),
                                portfolio.get("source_page_url"),
                            ),
                        )
                    for row in portfolio.get("style_box", []):
                        conn.execute(
                            """
                            INSERT INTO mf_style_box_snapshots (
                              id, asset_id, as_of_date, style_dimension, weight_pct, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, as_of_date, style_dimension) DO UPDATE SET
                              weight_pct = COALESCE(excluded.weight_pct, mf_style_box_snapshots.weight_pct),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                None,
                                row.get("style_dimension"),
                                row.get("weight_pct"),
                                portfolio.get("source_page_url"),
                            ),
                        )
                    for row in portfolio.get("characteristics", []):
                        conn.execute(
                            """
                            INSERT INTO mf_portfolio_characteristics (
                              id, asset_id, as_of_date, characteristic_name, characteristic_value, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, as_of_date, characteristic_name) DO UPDATE SET
                              characteristic_value = COALESCE(excluded.characteristic_value, mf_portfolio_characteristics.characteristic_value),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                None,
                                row.get("characteristic_name"),
                                row.get("characteristic_value"),
                                portfolio.get("source_page_url"),
                            ),
                        )

            detailed = bundle.get("detailed_portfolio")
            if detailed:
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_holdings (
                      id, asset_id, morningstar_fund_id, scheme_url, holdings_kind,
                      holdings_json, raw_html_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, 'DETAILED', ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url, holdings_kind) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      holdings_json = excluded.holdings_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        detailed.get("morningstar_fund_id"),
                        detailed.get("scheme_url"),
                        json_dumps(detailed.get("holdings", [])),
                        detailed.get("raw_html_path"),
                        json_dumps(detailed.get("tables", [])),
                        detailed.get("source_page_url"),
                    ),
                )
                if asset_id:
                    for row in detailed.get("holdings", []):
                        conn.execute(
                            """
                            INSERT INTO mf_holdings (
                              id, asset_id, as_of_date, holding_name, weight_pct, rank, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, as_of_date, holding_name, rank) DO UPDATE SET
                              weight_pct = COALESCE(excluded.weight_pct, mf_holdings.weight_pct),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                None,
                                row.get("holding_name"),
                                row.get("weight_pct"),
                                row.get("rank"),
                                detailed.get("source_page_url"),
                            ),
                        )

            factsheet = bundle.get("factsheet")
            if factsheet:
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_factsheets (
                      id, asset_id, morningstar_fund_id, scheme_url, document_url,
                      document_type, raw_html_path, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, 'FACTSHEET', ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url, document_type) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      document_url = COALESCE(excluded.document_url, src_morningstar_fund_factsheets.document_url),
                      raw_html_path = excluded.raw_html_path,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        factsheet.get("morningstar_fund_id"),
                        factsheet.get("scheme_url"),
                        factsheet.get("document_url"),
                        factsheet.get("raw_html_path"),
                        factsheet.get("source_page_url"),
                    ),
                )
                if asset_id and factsheet.get("document_url"):
                    conn.execute(
                        """
                        INSERT INTO mf_documents (
                          id, asset_id, as_of_date, document_type, document_url, source_page_url
                        ) VALUES (?, ?, ?, 'FACTSHEET', ?, ?)
                        ON CONFLICT(asset_id, document_type, document_url) DO UPDATE SET
                          source_page_url = excluded.source_page_url
                        """,
                        (
                            generate_id(),
                            asset_id,
                            None,
                            factsheet.get("document_url"),
                            factsheet.get("source_page_url"),
                        ),
                    )

            if self.include_analysis and bundle.get("analysis"):
                analysis = bundle["analysis"]
                conn.execute(
                    """
                    INSERT INTO src_morningstar_fund_analysis (
                      id, asset_id, morningstar_fund_id, scheme_url, is_login_gated,
                      raw_html_path, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      is_login_gated = excluded.is_login_gated,
                      raw_html_path = excluded.raw_html_path,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        bundle.get("morningstar_fund_id"),
                        bundle.get("scheme_url"),
                        int(bool(analysis.get("is_login_gated", 1))),
                        analysis.get("raw_html_path"),
                        analysis.get("source_page_url"),
                    ),
                )

            inserted += 1
        return inserted
