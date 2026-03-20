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
    build_sal_endpoint_urls,
    canonicalize_scheme_url,
    extract_sal_fund_config_url,
    extract_fund_house_slug,
    parse_sal_holdings_json,
    parse_sal_overview_json,
    parse_sal_page_context,
    parse_sal_performance_json,
    parse_sal_portfolio_json,
    parse_sal_risk_json,
    parse_sal_runtime_js,
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
from sources.morningstar.schema import ensure_morningstar_schema
from utils.storage import get_raw_path, load_raw_file, raw_file_exists, save_raw_file

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


def _insert_pipeline_checkpoint(
    conn: DatabaseConnection,
    *,
    run_id: str,
    source: str,
    processed_count: int,
    inserted_count: int,
    skipped_count: int,
    error_count: int,
    details: Optional[Dict[str, Any]] = None,
) -> None:
    conn.execute(
        """
        INSERT INTO pipeline_run_checkpoints (
          id, run_id, source, processed_count, inserted_count, skipped_count, error_count, details_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            generate_id(),
            run_id,
            source,
            processed_count,
            inserted_count,
            skipped_count,
            error_count,
            json_dumps(details or {}),
        ),
    )


class MorningstarBaseIngester(SourceIngester):
    RATE_LIMIT_QPS = float(os.getenv("MORNINGSTAR_RATE_LIMIT_QPS", "1.0") or "1.0")
    DOWNLOAD_RETRIES = max(1, int(os.getenv("MORNINGSTAR_DOWNLOAD_RETRIES", "4") or "4"))
    RETRY_BACKOFF_BASE = float(os.getenv("MORNINGSTAR_RETRY_BACKOFF_BASE", "1.5") or "1.5")

    def __init__(self):
        self.session = create_morningstar_session()
        self.use_playwright = _env_flag("MORNINGSTAR_USE_PLAYWRIGHT", default=False)
        self._sal_runtime: Optional[Dict[str, Any]] = None

    def _sleep(self) -> None:
        qps = max(self.RATE_LIMIT_QPS, 0.1)
        base_delay = 1.0 / qps
        time.sleep(base_delay + random.uniform(0.25, 0.75))

    def _download_text(
        self,
        trade_date: date,
        url: str,
        source_bucket: str,
        filename_prefix: str,
        extension: str,
        headers: Optional[Dict[str, str]] = None,
        use_cache: bool = True,
    ) -> Dict[str, Any]:
        request_url = url
        digest = hashlib.sha1(request_url.encode("utf-8")).hexdigest()[:12]
        filename = f"{filename_prefix}_{digest}.{extension}"
        if use_cache and raw_file_exists(source_bucket, trade_date, filename):
            raw = load_raw_file(source_bucket, trade_date, filename)
            return {
                "text": raw.decode("utf-8", errors="replace"),
                "path": str(save_raw_file(source_bucket, trade_date, filename, raw)),
                "final_url": request_url,
            }
        last_error: Optional[Exception] = None
        for attempt in range(1, self.DOWNLOAD_RETRIES + 1):
            try:
                self._sleep()
                response = self.session.get(request_url, timeout=30, headers=headers)
                response.raise_for_status()
                if use_cache:
                    path = save_raw_file(source_bucket, trade_date, filename, response.content)
                else:
                    path = get_raw_path(source_bucket, trade_date, filename)
                    path.write_bytes(response.content)
                return {"text": response.text, "path": str(path), "final_url": str(response.url)}
            except requests.RequestException as exc:
                last_error = exc
                if attempt >= self.DOWNLOAD_RETRIES:
                    break
                delay = self.RETRY_BACKOFF_BASE * (2 ** (attempt - 1)) + random.uniform(0.1, 0.5)
                logger.warning(
                    "[MORNINGSTAR] fetch retry %s/%s failed for %s: %s; retrying in %.2fs",
                    attempt,
                    self.DOWNLOAD_RETRIES,
                    request_url,
                    exc,
                    delay,
                )
                time.sleep(delay)
        assert last_error is not None
        raise last_error

    def _download_html(
        self,
        trade_date: date,
        url: str,
        source_bucket: str,
        filename_prefix: str,
        use_cache: bool = True,
    ) -> Dict[str, Any]:
        return self._download_text(trade_date, url, source_bucket, filename_prefix, "html", use_cache=use_cache)

    def _download_json(
        self,
        trade_date: date,
        url: str,
        source_bucket: str,
        filename_prefix: str,
        headers: Dict[str, str],
    ) -> Dict[str, Any]:
        payload = self._download_text(trade_date, url, source_bucket, filename_prefix, "json", headers=headers)
        try:
            data = json.loads(payload["text"])
        except json.JSONDecodeError as exc:
            preview = payload["text"][:250]
            raise ValueError(f"JSON decode failed for {url}: {exc}; preview={preview!r}") from exc
        return {**payload, "data": data}

    def _sal_headers(self, context: Dict[str, Any], referer: str, include_realtime: bool = False) -> Dict[str, str]:
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Origin": "https://www.morningstar.in",
            "Referer": referer,
            "Authorization": f"Bearer {context['access_token']}",
            "X-SAL-ContentType": context["sal_content_type"],
        }
        if include_realtime and context.get("realtime_token"):
            headers["X-API-REALTIME-E"] = context["realtime_token"]
        return headers

    def _load_sal_runtime(self, trade_date: date, page_html: str, page_url: str) -> Dict[str, Any]:
        if self._sal_runtime is not None:
            return self._sal_runtime
        config_url = extract_sal_fund_config_url(page_html, page_url)
        if not config_url:
            self._sal_runtime = {}
            return self._sal_runtime
        try:
            resource = self._download_text(trade_date, config_url, SOURCE_TABS, "fund_config", "js")
            runtime = parse_sal_runtime_js(resource["text"])
            runtime["raw_js_path"] = resource["path"]
            runtime["config_url"] = config_url
            self._sal_runtime = runtime
        except Exception as exc:
            logger.warning("[MORNINGSTAR] could not load SAL runtime config %s: %s", config_url, exc)
            self._sal_runtime = {}
        return self._sal_runtime

    def run(self, trade_date: date, conn: DatabaseConnection) -> PipelineRun:  # type: ignore[override]
        t0 = time.time()
        errors: List[str] = []
        try:
            ensure_morningstar_schema(conn)
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
        self.include_factsheet = _env_flag("MORNINGSTAR_INCLUDE_FACTSHEET", default=False)
        self.progress_every = max(1, int(os.getenv("MORNINGSTAR_PROGRESS_EVERY", "25") or "25"))

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

    def _fetch_sal_bundle(
        self,
        trade_date: date,
        fund_id: str,
        context: Dict[str, Any],
        referer: str,
        endpoint_names: List[str],
    ) -> tuple[Dict[str, Any], Dict[str, str], List[str]]:
        urls = build_sal_endpoint_urls(context)
        payloads: Dict[str, Any] = {}
        raw_paths: Dict[str, str] = {}
        errors: List[str] = []
        for endpoint_name in endpoint_names:
            try:
                resource = self._download_json(
                    trade_date,
                    urls[endpoint_name],
                    SOURCE_TABS,
                    f"{fund_id}_{endpoint_name}",
                    self._sal_headers(context, referer),
                )
                payloads[endpoint_name] = resource["data"]
                raw_paths[endpoint_name] = resource["path"]
            except Exception as exc:
                errors.append(f"{fund_id} {endpoint_name}: {exc}")
        return payloads, raw_paths, errors

    def _fetch_candidate_bundle(self, trade_date: date, candidate: Dict[str, Any]) -> tuple[Optional[Dict[str, Any]], List[str]]:
        scheme_url = canonicalize_scheme_url(candidate["scheme_url"])
        tabs = build_tab_urls(scheme_url)
        bundle: Dict[str, Any] = {
            "asset_id": candidate.get("asset_id"),
            "morningstar_fund_id": candidate["morningstar_fund_id"],
            "scheme_url": scheme_url,
            "directory_row": candidate,
        }
        errors: List[str] = []
        try:
            overview_page = self._download_html(
                trade_date,
                tabs["overview"],
                SOURCE_TABS,
                f"{candidate['morningstar_fund_id']}_overview",
                use_cache=False,
            )
            overview_fallback = parse_overview_page(overview_page["text"], tabs["overview"])
            overview_fallback["raw_html_path"] = overview_page["path"]
            overview_fallback["source_page_url"] = tabs["overview"]
            bundle["overview"] = overview_fallback
            tabs = overview_fallback.get("tabs") or tabs
        except Exception as exc:
            return None, [f"{scheme_url} overview: {exc}"]

        sal_runtime = self._load_sal_runtime(trade_date, overview_page["text"], tabs["overview"])
        sal_context = parse_sal_page_context(overview_page["text"], tabs["overview"], sal_runtime)
        quote_payload: Optional[Dict[str, Any]] = None
        people_payload: Optional[Dict[str, Any]] = None

        if sal_context:
            sal_payloads, sal_paths, sal_errors = self._fetch_sal_bundle(
                trade_date,
                candidate["morningstar_fund_id"],
                sal_context,
                tabs["overview"],
                ["quote"],
            )
            errors.extend(sal_errors)
            quote_payload = sal_payloads.get("quote")
            if quote_payload:
                overview = parse_sal_overview_json(quote_payload, fallback=bundle["overview"])
                overview.update({
                    "morningstar_fund_id": candidate["morningstar_fund_id"],
                    "scheme_url": scheme_url,
                    "tabs": tabs,
                    "raw_html_path": overview_page["path"],
                    "raw_json_path": json_dumps(sal_paths),
                    "raw_json": {
                        "quote_payload_path": sal_paths.get("quote"),
                        "overview_stats": overview.get("overview_stats", {}),
                    },
                    "source_page_url": tabs["overview"],
                })
                bundle["overview"] = overview

        try:
            performance_page = self._download_html(
                trade_date,
                tabs["performance"],
                SOURCE_TABS,
                f"{candidate['morningstar_fund_id']}_performance",
                use_cache=False,
            )
            performance_fallback = parse_performance_page(performance_page["text"], tabs["performance"])
            performance_fallback["raw_html_path"] = performance_page["path"]
            performance_fallback["source_page_url"] = tabs["performance"]
            performance_fallback["raw_json"] = {"tables": performance_fallback.get("tables", [])}
            bundle["performance"] = performance_fallback
            if sal_context:
                sal_payloads, sal_paths, sal_errors = self._fetch_sal_bundle(
                    trade_date,
                    candidate["morningstar_fund_id"],
                    sal_context,
                    tabs["performance"],
                    ["performance_chart", "performance_table", "trailing_returns"],
                )
                errors.extend(sal_errors)
                if sal_payloads.get("performance_chart") and sal_payloads.get("trailing_returns"):
                    performance = parse_sal_performance_json(
                        sal_payloads.get("performance_chart"),
                        sal_payloads.get("trailing_returns"),
                        sal_payloads.get("performance_table"),
                    )
                    performance.update({
                        "morningstar_fund_id": candidate["morningstar_fund_id"],
                        "scheme_url": scheme_url,
                        "raw_html_path": performance_page["path"],
                        "raw_json_path": json_dumps(sal_paths),
                        "raw_json": {
                            "performance_chart_path": sal_paths.get("performance_chart"),
                            "performance_table_path": sal_paths.get("performance_table"),
                            "trailing_returns_path": sal_paths.get("trailing_returns"),
                            "annual_table": performance.get("annual_table"),
                        },
                        "source_page_url": tabs["performance"],
                    })
                    bundle["performance"] = performance
        except Exception as exc:
            errors.append(f"{scheme_url} performance: {exc}")

        try:
            risk_page = self._download_html(
                trade_date,
                tabs["risk"],
                SOURCE_TABS,
                f"{candidate['morningstar_fund_id']}_risk",
                use_cache=False,
            )
            risk_fallback = parse_risk_page(risk_page["text"], tabs["risk"])
            risk_fallback["raw_html_path"] = risk_page["path"]
            risk_fallback["source_page_url"] = tabs["risk"]
            risk_fallback["raw_json"] = {"tables": risk_fallback.get("tables", [])}
            bundle["risk"] = risk_fallback
            if sal_context:
                sal_payloads, sal_paths, sal_errors = self._fetch_sal_bundle(
                    trade_date,
                    candidate["morningstar_fund_id"],
                    sal_context,
                    tabs["risk"],
                    ["risk_summary", "risk_volatility", "risk_scatter", "market_volatility"],
                )
                errors.extend(sal_errors)
                if sal_payloads.get("risk_volatility") and sal_payloads.get("risk_summary") and sal_payloads.get("market_volatility"):
                    risk = parse_sal_risk_json(
                        quote_payload,
                        sal_payloads.get("risk_volatility"),
                        sal_payloads.get("risk_summary"),
                        sal_payloads.get("market_volatility"),
                        sal_payloads.get("risk_scatter"),
                    )
                    risk.update({
                        "morningstar_fund_id": candidate["morningstar_fund_id"],
                        "scheme_url": scheme_url,
                        "raw_html_path": risk_page["path"],
                        "raw_json_path": json_dumps(sal_paths),
                        "raw_json": {
                            "risk_summary_path": sal_paths.get("risk_summary"),
                            "risk_volatility_path": sal_paths.get("risk_volatility"),
                            "risk_scatter_path": sal_paths.get("risk_scatter"),
                            "market_volatility_path": sal_paths.get("market_volatility"),
                            "selected_period": risk.get("selected_period"),
                        },
                        "source_page_url": tabs["risk"],
                    })
                    bundle["risk"] = risk
        except Exception as exc:
            errors.append(f"{scheme_url} risk: {exc}")

        try:
            portfolio_page = self._download_html(
                trade_date,
                tabs["portfolio"],
                SOURCE_TABS,
                f"{candidate['morningstar_fund_id']}_portfolio",
                use_cache=False,
            )
            portfolio_fallback = parse_portfolio_page(portfolio_page["text"], tabs["portfolio"])
            portfolio_fallback["raw_html_path"] = portfolio_page["path"]
            portfolio_fallback["source_page_url"] = tabs["portfolio"]
            portfolio_fallback["raw_json"] = {"tables": portfolio_fallback.get("tables", [])}
            bundle["portfolio"] = portfolio_fallback
            if sal_context:
                sal_payloads, sal_paths, sal_errors = self._fetch_sal_bundle(
                    trade_date,
                    candidate["morningstar_fund_id"],
                    sal_context,
                    tabs["portfolio"],
                    ["asset_allocation", "ownership_zone", "style_weight", "people"],
                )
                errors.extend(sal_errors)
                people_payload = sal_payloads.get("people")
                if quote_payload and sal_payloads.get("asset_allocation") and sal_payloads.get("ownership_zone"):
                    portfolio = parse_sal_portfolio_json(
                        quote_payload,
                        sal_payloads.get("asset_allocation"),
                        sal_payloads.get("ownership_zone"),
                        sal_payloads.get("style_weight"),
                        people_payload,
                    )
                    portfolio.update({
                        "morningstar_fund_id": candidate["morningstar_fund_id"],
                        "scheme_url": scheme_url,
                        "raw_html_path": portfolio_page["path"],
                        "raw_json_path": json_dumps(sal_paths),
                        "raw_json": {
                            "asset_allocation_path": sal_paths.get("asset_allocation"),
                            "ownership_zone_path": sal_paths.get("ownership_zone"),
                            "style_weight_path": sal_paths.get("style_weight"),
                            "people_path": sal_paths.get("people"),
                            "manager_summary": portfolio.get("manager_summary", {}),
                        },
                        "source_page_url": tabs["portfolio"],
                    })
                    bundle["portfolio"] = portfolio
                    if quote_payload:
                        overview = parse_sal_overview_json(quote_payload, people_payload, fallback=bundle["overview"])
                        overview.update({
                            "morningstar_fund_id": candidate["morningstar_fund_id"],
                            "scheme_url": scheme_url,
                            "tabs": tabs,
                            "raw_html_path": overview_page["path"],
                            "raw_json_path": bundle["overview"].get("raw_json_path"),
                            "raw_json": {
                                **(bundle["overview"].get("raw_json") or {}),
                                "people_payload_path": sal_paths.get("people"),
                            },
                            "source_page_url": tabs["overview"],
                        })
                        bundle["overview"] = overview
        except Exception as exc:
            errors.append(f"{scheme_url} portfolio: {exc}")

        try:
            detailed_page = self._download_html(
                trade_date,
                tabs["detailed_portfolio"],
                SOURCE_TABS,
                f"{candidate['morningstar_fund_id']}_detailed_portfolio",
                use_cache=False,
            )
            detailed_fallback = parse_holdings_page(detailed_page["text"], tabs["detailed_portfolio"])
            detailed_fallback["raw_html_path"] = detailed_page["path"]
            detailed_fallback["source_page_url"] = tabs["detailed_portfolio"]
            detailed_fallback["raw_json"] = {"tables": detailed_fallback.get("tables", [])}
            bundle["detailed_portfolio"] = detailed_fallback
            if sal_context:
                sal_payloads, sal_paths, sal_errors = self._fetch_sal_bundle(
                    trade_date,
                    candidate["morningstar_fund_id"],
                    sal_context,
                    tabs["detailed_portfolio"],
                    ["holdings"],
                )
                errors.extend(sal_errors)
                if sal_payloads.get("holdings"):
                    detailed = parse_sal_holdings_json(sal_payloads.get("holdings"))
                    detailed.update({
                        "morningstar_fund_id": candidate["morningstar_fund_id"],
                        "scheme_url": scheme_url,
                        "raw_html_path": detailed_page["path"],
                        "raw_json_path": json_dumps(sal_paths),
                        "raw_json": {
                            "holdings_path": sal_paths.get("holdings"),
                            "holding_summary": detailed.get("holding_summary", {}),
                        },
                        "source_page_url": tabs["detailed_portfolio"],
                    })
                    bundle["detailed_portfolio"] = detailed
        except Exception as exc:
            errors.append(f"{scheme_url} detailed_portfolio: {exc}")

        if self.include_factsheet:
            try:
                page = self._download_html(trade_date, tabs["factsheet"], SOURCE_FACTSHEETS, f"{candidate['morningstar_fund_id']}_factsheet")
                parsed = parse_factsheet_page(page["text"], tabs["factsheet"])
                parsed["raw_html_path"] = page["path"]
                parsed["source_page_url"] = tabs["factsheet"]
                bundle["factsheet"] = parsed
            except Exception as exc:
                errors.append(f"{scheme_url} factsheet: {exc}")
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
        return bundle, errors

    def fetch(self, trade_date: date) -> Dict[str, Any]:
        if self.use_playwright:
            logger.info("[MORNINGSTAR] MORNINGSTAR_USE_PLAYWRIGHT is enabled, but v1 still prefers public HTML fetches where possible.")
        records: List[Dict[str, Any]] = []
        errors: List[str] = []
        for candidate in self._load_candidates():
            bundle, candidate_errors = self._fetch_candidate_bundle(trade_date, candidate)
            errors.extend(candidate_errors)
            if bundle:
                records.append(bundle)
        return {"records": records, "errors": errors}

    def run(self, trade_date: date, conn: DatabaseConnection) -> PipelineRun:  # type: ignore[override]
        t0 = time.time()
        run_id = generate_id()
        errors: List[str] = []
        inserted = 0
        skipped = 0
        try:
            ensure_morningstar_schema(conn)
            if self.use_playwright:
                logger.info("[MORNINGSTAR] MORNINGSTAR_USE_PLAYWRIGHT is enabled, but v1 still prefers public HTML fetches where possible.")
            candidates = self._load_candidates()
            _upsert_pipeline_run(
                conn,
                PipelineRun(
                    id=run_id,
                    run_date=trade_date.isoformat(),
                    source=self.SOURCE_ID,
                    status="PARTIAL",
                    pipeline_type=self.PIPELINE_TYPE,
                    records_inserted=0,
                    records_skipped=0,
                    error_log=None,
                    duration_ms=0,
                ),
            )
            conn.commit()
            for idx, candidate in enumerate(candidates, start=1):
                bundle, candidate_errors = self._fetch_candidate_bundle(trade_date, candidate)
                errors.extend(candidate_errors)
                if bundle:
                    inserted += self.ingest([bundle], conn)
                else:
                    skipped += 1
                if idx % self.progress_every == 0 or idx == len(candidates):
                    checkpoint_details = {
                        "total_candidates": len(candidates),
                        "last_fund_id": candidate.get("morningstar_fund_id"),
                        "last_scheme_url": candidate.get("scheme_url"),
                    }
                    _insert_pipeline_checkpoint(
                        conn,
                        run_id=run_id,
                        source=self.SOURCE_ID,
                        processed_count=idx,
                        inserted_count=inserted,
                        skipped_count=skipped,
                        error_count=len(errors),
                        details=checkpoint_details,
                    )
                    _upsert_pipeline_run(
                        conn,
                        PipelineRun(
                            id=run_id,
                            run_date=trade_date.isoformat(),
                            source=self.SOURCE_ID,
                            status="PARTIAL",
                            pipeline_type=self.PIPELINE_TYPE,
                            records_inserted=inserted,
                            records_skipped=skipped,
                            error_log=json.dumps(errors[:20]) if errors else None,
                            duration_ms=int((time.time() - t0) * 1000),
                        ),
                    )
                    conn.commit()
                    logger.info(
                        "[MORNINGSTAR] details progress processed=%s/%s inserted=%s errors=%s",
                        idx,
                        len(candidates),
                        inserted,
                        len(errors),
                    )
            status = "PARTIAL" if errors else "SUCCESS"
            return PipelineRun(
                id=run_id,
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status=status,
                pipeline_type=self.PIPELINE_TYPE,
                records_inserted=inserted,
                records_skipped=skipped,
                circuit_breaks=0,
                error_log=json.dumps(errors[:20]) if errors else None,
                duration_ms=int((time.time() - t0) * 1000),
            )
        except Exception as exc:
            logger.exception("[%s] failed", self.SOURCE_ID)
            conn.rollback()
            failed_run = PipelineRun(
                id=run_id,
                run_date=trade_date.isoformat(),
                source=self.SOURCE_ID,
                status="FAILED",
                pipeline_type=self.PIPELINE_TYPE,
                records_inserted=inserted,
                records_skipped=skipped,
                error_log=str(exc),
                duration_ms=int((time.time() - t0) * 1000),
            )
            _upsert_pipeline_run(conn, failed_run)
            conn.commit()
            return failed_run

    def _upsert_overview(self, conn: DatabaseConnection, asset_id: Optional[str], overview: Dict[str, Any]) -> None:
        conn.execute(
            """
            INSERT INTO src_morningstar_fund_overview (
              id, asset_id, morningstar_fund_id, scheme_url, scheme_name, isin, amc_name,
              category_name, distribution_type, structure, latest_nav, nav_date, benchmark_name,
              tabs_json, raw_html_path, raw_json_path, raw_json, source_page_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
              raw_json_path = excluded.raw_json_path,
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
                overview.get("raw_json_path"),
                json_dumps(overview.get("raw_json", overview)),
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
                      id, asset_id, morningstar_fund_id, scheme_url, as_of_date, growth_of_10000_json,
                      trailing_returns_json, calendar_returns_json, monthly_returns_json,
                      quarterly_returns_json, raw_html_path, raw_json_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      as_of_date = COALESCE(excluded.as_of_date, src_morningstar_fund_performance.as_of_date),
                      growth_of_10000_json = excluded.growth_of_10000_json,
                      trailing_returns_json = excluded.trailing_returns_json,
                      calendar_returns_json = excluded.calendar_returns_json,
                      monthly_returns_json = excluded.monthly_returns_json,
                      quarterly_returns_json = excluded.quarterly_returns_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json_path = excluded.raw_json_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        performance.get("morningstar_fund_id"),
                        performance.get("scheme_url"),
                        performance.get("as_of_date"),
                        json_dumps(performance.get("growth_of_10000", {})),
                        json_dumps(performance.get("trailing_returns", [])),
                        json_dumps(performance.get("calendar_returns", [])),
                        json_dumps(performance.get("monthly_returns", [])),
                        json_dumps(performance.get("quarterly_returns", [])),
                        performance.get("raw_html_path"),
                        performance.get("raw_json_path"),
                        json_dumps(performance.get("raw_json", performance)),
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
                                row.get("as_of_date") or performance.get("as_of_date"),
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
                      id, asset_id, morningstar_fund_id, scheme_url, as_of_date, star_rating,
                      morningstar_risk_label, risk_json, raw_html_path, raw_json_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      as_of_date = COALESCE(excluded.as_of_date, src_morningstar_fund_risk.as_of_date),
                      star_rating = COALESCE(excluded.star_rating, src_morningstar_fund_risk.star_rating),
                      morningstar_risk_label = COALESCE(excluded.morningstar_risk_label, src_morningstar_fund_risk.morningstar_risk_label),
                      risk_json = excluded.risk_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json_path = excluded.raw_json_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        risk.get("morningstar_fund_id"),
                        risk.get("scheme_url"),
                        risk.get("as_of_date"),
                        metrics.get("star_rating"),
                        metrics.get("morningstar_risk_label"),
                        json_dumps(metrics),
                        risk.get("raw_html_path"),
                        risk.get("raw_json_path"),
                        json_dumps(risk.get("raw_json", risk)),
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
                            risk.get("as_of_date"),
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
                      id, asset_id, morningstar_fund_id, scheme_url, as_of_date, asset_allocation_json,
                      style_box_json, characteristics_json, raw_html_path, raw_json_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      as_of_date = COALESCE(excluded.as_of_date, src_morningstar_fund_portfolio.as_of_date),
                      asset_allocation_json = excluded.asset_allocation_json,
                      style_box_json = excluded.style_box_json,
                      characteristics_json = excluded.characteristics_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json_path = excluded.raw_json_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        portfolio.get("morningstar_fund_id"),
                        portfolio.get("scheme_url"),
                        portfolio.get("as_of_date"),
                        json_dumps(portfolio.get("asset_allocation", [])),
                        json_dumps(portfolio.get("style_box", [])),
                        json_dumps(portfolio.get("characteristics", [])),
                        portfolio.get("raw_html_path"),
                        portfolio.get("raw_json_path"),
                        json_dumps(portfolio.get("raw_json", portfolio)),
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
                        json_dumps({
                            "manager_summary": portfolio.get("manager_summary", {}),
                            "raw_json_path": portfolio.get("raw_json_path"),
                        }),
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
                                portfolio.get("as_of_date"),
                                row.get("asset_bucket"),
                                row.get("weight_pct"),
                                portfolio.get("source_page_url"),
                            ),
                        )
                    manager_rows = portfolio.get("managers", [])
                    for row in manager_rows:
                        if not isinstance(row, dict):
                            continue
                        manager_name = normalize_space(row.get("manager_name"))
                        if not manager_name:
                            continue
                        conn.execute(
                            """
                            INSERT INTO mf_manager_assignments (
                              id, asset_id, morningstar_fund_id, manager_name, role, start_date, end_date, tenure_years_text, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, manager_name, role, start_date, end_date) DO UPDATE SET
                              tenure_years_text = COALESCE(excluded.tenure_years_text, mf_manager_assignments.tenure_years_text),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                portfolio.get("morningstar_fund_id"),
                                manager_name,
                                row.get("role"),
                                row.get("start_date"),
                                row.get("end_date"),
                                row.get("tenure_years_text"),
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
                                portfolio.get("as_of_date"),
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
                                portfolio.get("as_of_date"),
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
                      id, asset_id, morningstar_fund_id, scheme_url, holdings_kind, as_of_date,
                      holdings_json, raw_html_path, raw_json_path, raw_json, source_page_url
                    ) VALUES (?, ?, ?, ?, 'DETAILED', ?, ?, ?, ?, ?, ?)
                    ON CONFLICT(morningstar_fund_id, scheme_url, holdings_kind) DO UPDATE SET
                      asset_id = excluded.asset_id,
                      as_of_date = COALESCE(excluded.as_of_date, src_morningstar_fund_holdings.as_of_date),
                      holdings_json = excluded.holdings_json,
                      raw_html_path = excluded.raw_html_path,
                      raw_json_path = excluded.raw_json_path,
                      raw_json = excluded.raw_json,
                      source_page_url = excluded.source_page_url,
                      captured_at = datetime('now')
                    """,
                    (
                        generate_id(),
                        asset_id,
                        detailed.get("morningstar_fund_id"),
                        detailed.get("scheme_url"),
                        detailed.get("as_of_date"),
                        json_dumps(detailed.get("holdings", [])),
                        detailed.get("raw_html_path"),
                        detailed.get("raw_json_path"),
                        json_dumps(detailed.get("raw_json", detailed)),
                        detailed.get("source_page_url"),
                    ),
                )
                if asset_id:
                    for row in detailed.get("holdings", []):
                        conn.execute(
                            """
                            INSERT INTO mf_holdings (
                              id, asset_id, as_of_date, holding_name, holding_type, holding_isin, holding_ticker,
                              weight_pct, market_value, share_count, sector, country, rank, source_page_url
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            ON CONFLICT(asset_id, as_of_date, holding_name, rank) DO UPDATE SET
                              holding_type = COALESCE(excluded.holding_type, mf_holdings.holding_type),
                              holding_isin = COALESCE(excluded.holding_isin, mf_holdings.holding_isin),
                              holding_ticker = COALESCE(excluded.holding_ticker, mf_holdings.holding_ticker),
                              weight_pct = COALESCE(excluded.weight_pct, mf_holdings.weight_pct),
                              market_value = COALESCE(excluded.market_value, mf_holdings.market_value),
                              share_count = COALESCE(excluded.share_count, mf_holdings.share_count),
                              sector = COALESCE(excluded.sector, mf_holdings.sector),
                              country = COALESCE(excluded.country, mf_holdings.country),
                              source_page_url = excluded.source_page_url
                            """,
                            (
                                generate_id(),
                                asset_id,
                                detailed.get("as_of_date"),
                                row.get("holding_name"),
                                row.get("holding_type"),
                                row.get("holding_isin"),
                                row.get("holding_ticker"),
                                row.get("weight_pct"),
                                row.get("market_value"),
                                row.get("share_count"),
                                row.get("sector"),
                                row.get("country"),
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
