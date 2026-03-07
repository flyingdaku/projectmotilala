from __future__ import annotations

import hashlib
import json
import logging
import re
import time
from collections import deque
from datetime import date, datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import parse_qs, urljoin, urlparse

from bs4 import BeautifulSoup

from core.db import DatabaseConnection, generate_id
from core.registry import SourceIngester, register_source
from core.session import create_cogencis_session
from utils.storage import save_raw_file

logger = logging.getLogger(__name__)


def parse_cogencis_company_url(company_url: str) -> Optional[Dict[str, str]]:
    parsed = urlparse(company_url)
    parts = [part for part in parsed.path.split("/") if part]
    if len(parts) < 5:
        return None
    return {
        "company_url": f"{parsed.scheme}://{parsed.netloc}{parsed.path}",
        "isin_token": parts[0],
        "group_slug": parts[1] if len(parts) > 1 else "",
        "exchange_code": parts[2] if len(parts) > 2 else "",
        "symbol_slug": parts[3] if len(parts) > 3 else "",
        "company_slug": parts[4] if len(parts) > 4 else "",
    }


def upsert_cogencis_company_map(conn: Any, asset_id: str, company_url: str) -> Dict[str, str]:
    parsed = parse_cogencis_company_url(company_url)
    if not parsed:
        raise ValueError(f"Invalid Cogencis company URL: {company_url}")
    conn.execute(
        """INSERT OR REPLACE INTO src_cogencis_company_map
           (asset_id, company_url, isin_token, group_slug, exchange_code, symbol_slug, company_slug, is_active, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1, datetime('now'))""",
        (
            asset_id,
            parsed["company_url"],
            parsed["isin_token"],
            parsed["group_slug"],
            parsed["exchange_code"],
            parsed["symbol_slug"],
            parsed["company_slug"],
        ),
    )
    return parsed


def _clean_text(value: Any) -> str:
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value).replace("\xa0", " ")).strip()


def _norm_key(value: str) -> str:
    cleaned = _clean_text(value).lower()
    cleaned = re.sub(r"[^a-z0-9]+", "_", cleaned)
    return cleaned.strip("_")


def _parse_number(value: Any) -> Optional[float]:
    if value is None:
        return None
    text = _clean_text(value)
    if not text or text in {"-", "--", "na", "n/a"}:
        return None
    negative = text.startswith("(") and text.endswith(")")
    text = text.replace("(", "").replace(")", "")
    text = text.replace("₹", "").replace(",", "").replace("%", "")
    text = re.sub(r"[^0-9.+-]", "", text)
    if not text:
        return None
    try:
        number = float(text)
        return -number if negative else number
    except ValueError:
        return None


def _parse_date(value: Any) -> Optional[str]:
    text = _clean_text(value)
    if not text or text in {"-", "--"}:
        return None
    formats = [
        "%Y-%m-%d",
        "%d-%m-%Y",
        "%d/%m/%Y",
        "%d %b %y",
        "%d %B %y",
        "%d %b %Y",
        "%d %B %Y",
        "%b %d, %Y",
        "%B %d, %Y",
        "%d-%b-%Y",
        "%d-%B-%Y",
    ]
    for fmt in formats:
        try:
            return datetime.strptime(text, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    month_year = re.match(r"^([A-Za-z]{3,9})\s+(\d{4})$", text)
    if month_year:
        try:
            dt = datetime.strptime(text, "%b %Y")
        except ValueError:
            try:
                dt = datetime.strptime(text, "%B %Y")
            except ValueError:
                return None
        next_month = dt.replace(day=28) + timedelta(days=4)
        month_end = next_month.replace(day=1) - timedelta(days=1)
        return month_end.strftime("%Y-%m-%d")
    return None


def _extract_title(node: Any) -> str:
    caption = node.find("caption")
    if caption:
        return _clean_text(caption.get_text(" ", strip=True))
    for tag in ["h1", "h2", "h3", "h4", "h5", "strong"]:
        heading = node.find_previous(tag)
        if heading:
            text = _clean_text(heading.get_text(" ", strip=True))
            if text:
                return text
    return ""


def _extract_tables(soup: BeautifulSoup) -> List[Dict[str, Any]]:
    tables: List[Dict[str, Any]] = []
    for table in soup.find_all("table"):
        headers: List[str] = []
        thead = table.find("thead")
        if thead:
            header_row = thead.find("tr")
            if header_row:
                headers = [_clean_text(cell.get_text(" ", strip=True)) for cell in header_row.find_all(["th", "td"])]
        if not headers:
            first_row = table.find("tr")
            if first_row:
                first_headers = [_clean_text(cell.get_text(" ", strip=True)) for cell in first_row.find_all("th")]
                if first_headers:
                    headers = first_headers
        row_nodes = table.find_all("tr")
        rows: List[Dict[str, Any]] = []
        for row_index, row in enumerate(row_nodes):
            cells = row.find_all(["td", "th"])
            if not cells:
                continue
            values = [_clean_text(cell.get_text(" ", strip=True)) for cell in cells]
            if headers and values == headers:
                continue
            links = []
            for anchor in row.find_all("a", href=True):
                href = _clean_text(anchor.get("href"))
                if href:
                    links.append({
                        "label": _clean_text(anchor.get_text(" ", strip=True)),
                        "url": href,
                    })
            rows.append({
                "row_order": row_index,
                "cells": values,
                "links": links,
            })
        if not rows:
            continue
        if not headers:
            max_width = max(len(row["cells"]) for row in rows)
            headers = [f"col_{idx}" for idx in range(1, max_width + 1)]
        tables.append({
            "title": _extract_title(table),
            "headers": headers,
            "rows": rows,
        })
    return tables


def _row_to_dict(headers: List[str], cells: List[str]) -> Dict[str, str]:
    result: Dict[str, str] = {}
    for idx, header in enumerate(headers):
        result[_norm_key(header) or f"col_{idx + 1}"] = cells[idx] if idx < len(cells) else ""
    return result


def _extract_entities(soup: BeautifulSoup, page_url: str) -> Tuple[List[Dict[str, str]], str]:
    entities: List[Dict[str, str]] = []
    current_entity = ""
    for select in soup.find_all("select"):
        for option in select.find_all("option"):
            name = _clean_text(option.get_text(" ", strip=True))
            if not name or name.lower() in {"select", "all", "please select"}:
                continue
            raw_url = option.get("value") or option.get("data-url") or option.get("data-href") or ""
            entity_url = urljoin(page_url, raw_url) if raw_url else ""
            entities.append({
                "name": name,
                "url": entity_url,
                "kind": _clean_text(select.get("name") or select.get("id") or "dropdown"),
                "is_primary": "1" if option.has_attr("selected") else "0",
            })
            if option.has_attr("selected") and not current_entity:
                current_entity = name
    if not current_entity:
        heading = soup.find(["h1", "h2"])
        if heading:
            current_entity = _clean_text(heading.get_text(" ", strip=True))
    deduped: List[Dict[str, str]] = []
    seen = set()
    for entity in entities:
        key = (entity["name"], entity["url"], entity["kind"])
        if key in seen:
            continue
        seen.add(key)
        deduped.append(entity)
    return deduped, current_entity


def _classify_ownership_table(title: str) -> str:
    name = _norm_key(title)
    if "bulk" in name and "deal" in name:
        return "BULK_DEALS"
    if "block" in name and "deal" in name:
        return "BLOCK_DEALS"
    if "insider" in name:
        return "INSIDER_TRADES"
    if "sast" in name or "takeover" in name:
        return "SAST"
    if "pledge" in name:
        return "PLEDGE"
    if "capital" in name and "history" in name:
        return "CAPITAL_HISTORY"
    return "SHAREHOLDING"


def _looks_like_period_header(value: str) -> bool:
    text = _clean_text(value)
    return bool(re.search(r"\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b", text.lower())) or bool(re.search(r"\b\d{4}\b", text))


def _pick_value(data: Dict[str, str], candidates: List[str], fallback_index: Optional[int] = None, cells: Optional[List[str]] = None) -> str:
    for candidate in candidates:
        for key, value in data.items():
            if candidate in key and _clean_text(value):
                return value
    if fallback_index is not None and cells is not None and fallback_index < len(cells):
        return cells[fallback_index]
    return ""


def _safe_url(base_url: str, href: str) -> str:
    if not href:
        return ""
    return urljoin(base_url, href)


def _json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True)


def _flatten_dict_items(payload: Any, prefix: str = "") -> Dict[str, Any]:
    items: Dict[str, Any] = {}
    if isinstance(payload, dict):
        for key, value in payload.items():
            next_prefix = f"{prefix}.{key}" if prefix else str(key)
            if isinstance(value, dict):
                items.update(_flatten_dict_items(value, next_prefix))
            else:
                items[next_prefix] = value
    return items


def _extract_next_data_payload(html: str) -> Optional[Dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    node = soup.find("script", id="__NEXT_DATA__")
    if not node:
        return None
    raw_json = node.string or node.get_text(strip=True)
    if not raw_json:
        return None
    try:
        return json.loads(raw_json)
    except json.JSONDecodeError:
        return None


def _find_best_overview_candidate(payload: Any) -> Optional[Dict[str, Any]]:
    best: Optional[Dict[str, Any]] = None
    best_score = -1

    def walk(node: Any):
        nonlocal best, best_score
        if isinstance(node, dict):
            flat = _flatten_dict_items(node)
            normalized_keys = {_norm_key(key) for key in flat.keys()}
            score = 0
            for candidate in [
                "company_name",
                "companyname",
                "isin",
                "cin",
                "listing_date",
                "market_cap",
                "marketcap",
                "email",
                "website",
                "phone",
                "address",
                "face_value",
                "book_value",
                "dividend_yield",
            ]:
                if any(candidate in key for key in normalized_keys):
                    score += 1
            if score > best_score:
                best_score = score
                best = node
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            for value in node:
                walk(value)

    walk(payload)
    return best if best_score > 0 else None


def _pick_flat_value(flat_items: Dict[str, Any], candidates: List[str]) -> str:
    normalized = [(_norm_key(key), value) for key, value in flat_items.items()]
    for candidate in candidates:
        for key, value in normalized:
            if candidate in key and _clean_text(value):
                return _clean_text(value)
    return ""


def _api_table_from_response(title: str, response_payload: Dict[str, Any], source_page_url: str) -> Optional[Dict[str, Any]]:
    columns = response_payload.get("columns") or []
    data_rows = response_payload.get("data") or []
    if not columns or not isinstance(data_rows, list):
        return None
    headers = [_clean_text(col.get("displayName") or col.get("field") or "") for col in columns]
    field_names = [str(col.get("field") or "") for col in columns]
    url_fields = {str(col.get("field") or "") for col in columns if _clean_text(col.get("action")) == "url"}
    rows: List[Dict[str, Any]] = []
    for row_index, item in enumerate(data_rows):
        if not isinstance(item, dict):
            continue
        cells: List[str] = []
        links: List[Dict[str, str]] = []
        for header, field_name in zip(headers, field_names):
            raw_value = item.get(field_name)
            if isinstance(raw_value, (dict, list)):
                value_text = _json_dumps(raw_value)
            else:
                value_text = _clean_text(raw_value)
            cells.append(value_text)
            if field_name in url_fields and value_text:
                links.append({
                    "label": header or "Link",
                    "url": _safe_url(source_page_url, value_text),
                })
        rows.append({
            "row_order": row_index,
            "cells": cells,
            "links": links,
        })
    if not rows:
        return None
    return {
        "title": title,
        "headers": headers,
        "rows": rows,
    }


def _extract_keyshareholders_periods(payload: Any) -> List[str]:
    candidates: List[List[str]] = []

    def walk(node: Any):
        if isinstance(node, dict):
            for value in node.values():
                if isinstance(value, list):
                    labels: List[str] = []
                    score = 0
                    for item in value:
                        text = ""
                        if isinstance(item, str):
                            text = _clean_text(item)
                        elif isinstance(item, dict):
                            text = _clean_text(
                                item.get("displayName")
                                or item.get("label")
                                or item.get("name")
                                or item.get("title")
                                or item.get("quarter")
                                or item.get("period")
                            )
                        labels.append(text)
                        if text and (_looks_like_period_header(text) or _parse_date(text)):
                            score += 1
                    if score >= 2:
                        candidates.append(labels)
                walk(value)
        elif isinstance(node, list):
            for value in node:
                walk(value)

    walk(payload)
    if not candidates:
        return []
    best = max(candidates, key=lambda items: sum(1 for item in items if item and (_looks_like_period_header(item) or _parse_date(item))))
    return [item for item in best if item and (_looks_like_period_header(item) or _parse_date(item))]


def _extract_keyshareholders_rows(payload: Any) -> List[List[Any]]:
    candidates: List[List[List[Any]]] = []

    def walk(node: Any):
        if isinstance(node, dict):
            for value in node.values():
                walk(value)
        elif isinstance(node, list):
            row_like = [item for item in node if isinstance(item, list) and len(item) >= 4]
            if row_like and len(row_like) >= max(1, len(node) // 2):
                candidates.append(row_like)
            for value in node:
                walk(value)

    walk(payload)
    if not candidates:
        return []
    return max(candidates, key=len)


@register_source
class CogencisFundamentalsIngester(SourceIngester):
    SOURCE_ID = "COGENCIS_FUNDAMENTALS"
    PIPELINE_TYPE = "WEEKLY"

    def __init__(self, page_limit: int = 30, delay_seconds: float = 0.75, asset_ids: Optional[List[str]] = None):
        self.page_limit = page_limit
        self.delay_seconds = delay_seconds
        self.asset_ids = set(asset_ids or [])
        self._session = None
        self.request_timeout = 45
        self.max_retries = 3

    def fetch(self, trade_date: date) -> List[Any]:
        return []

    def ingest(self, records: List[Any], conn: DatabaseConnection) -> int:
        sql = """SELECT m.asset_id, m.company_url
                 FROM src_cogencis_company_map m
                 JOIN assets a ON a.id = m.asset_id
                 WHERE m.is_active = 1 AND a.is_active = 1"""
        params: List[str] = []
        if self.asset_ids:
            placeholders = ", ".join(["?"] * len(self.asset_ids))
            sql += f" AND m.asset_id IN ({placeholders})"
            params.extend(sorted(self.asset_ids))
        mappings = conn.fetchall(sql, tuple(params))
        inserted = 0
        for mapping in mappings:
            inserted += self._scrape_asset(mapping["asset_id"], mapping["company_url"], conn)
        return inserted

    def _ensure_session(self):
        if self._session is None:
            self._session = create_cogencis_session(prime=True)

    def _scrape_asset(self, asset_id: str, company_url: str, conn: DatabaseConnection) -> int:
        self._ensure_session()
        parsed = parse_cogencis_company_url(company_url)
        if not parsed:
            logger.warning("[COGENCIS] invalid company url for asset %s: %s", asset_id, company_url)
            return 0
        crawl_date = date.today()
        base_url = parsed["company_url"]
        inserted = self._ingest_api_sources(asset_id, parsed, crawl_date, conn)
        queue = deque([
            (base_url, "overview", "root", 1),
            (f"{base_url}?tab=management", "management", "", 1),
            (f"{base_url}?tab=ownership-data", "ownership-data", "", 1),
            (f"{base_url}?tab=market-data", "market-data", "announcements", 1),
            (f"{base_url}?tab=market-data&type=board-meetings", "market-data", "board-meetings", 1),
            (f"{base_url}?tab=market-data&type=corporate-action", "market-data", "corporate-action", 1),
            (f"{base_url}?tab=due-diligence", "due-diligence", "", 1),
        ])
        visited = set()
        while queue and len(visited) < self.page_limit:
            current_url, tab_key, page_kind, page_number = queue.popleft()
            normalized_url = self._normalize_url(current_url)
            if normalized_url in visited:
                continue
            visited.add(normalized_url)
            html, final_url = self._fetch_page(asset_id, current_url, tab_key, page_kind, page_number, crawl_date, conn)
            if not html:
                continue
            soup = BeautifulSoup(html, "html.parser")
            entities, current_entity = _extract_entities(soup, final_url)
            inserted += self._store_entities(asset_id, entities, tab_key, conn)
            tables = _extract_tables(soup)
            if tab_key == "overview":
                inserted += self._ingest_overview_page(asset_id, html, final_url, conn)
            elif tab_key == "management":
                inserted += self._ingest_management(asset_id, current_entity, entities, tables, final_url, conn)
            elif tab_key == "ownership-data":
                inserted += self._ingest_ownership(asset_id, current_entity, tables, final_url, conn)
            elif tab_key == "market-data" and page_kind == "corporate-action":
                inserted += self._ingest_corporate_actions(asset_id, current_entity, page_kind, tables, final_url, conn)
            elif tab_key == "market-data":
                inserted += self._ingest_filings(asset_id, current_entity, page_kind, tables, final_url, conn)
            elif tab_key == "due-diligence":
                inserted += self._ingest_due_diligence(asset_id, current_entity, tables, final_url, conn)
            for entity in entities:
                entity_url = entity.get("url") or ""
                if not entity_url:
                    continue
                parsed_entity = urlparse(entity_url)
                entity_query = parse_qs(parsed_entity.query)
                entity_tab = _clean_text((entity_query.get("tab") or [tab_key])[0]) or tab_key
                entity_kind = _clean_text((entity_query.get("type") or [page_kind])[0])
                entity_page = 1
                normalized_entity = self._normalize_url(entity_url)
                if normalized_entity not in visited:
                    queue.append((entity_url, entity_tab, entity_kind, entity_page))
            for discovered_url, discovered_tab, discovered_kind, discovered_page in self._discover_urls(base_url, soup):
                normalized_discovered = self._normalize_url(discovered_url)
                if normalized_discovered not in visited:
                    queue.append((discovered_url, discovered_tab, discovered_kind, discovered_page))
            time.sleep(self.delay_seconds)
        conn.execute(
            "UPDATE src_cogencis_company_map SET last_scraped_at = datetime('now'), updated_at = datetime('now') WHERE asset_id = ?",
            (asset_id,),
        )
        inserted += self._enrich_connected_companies(asset_id, crawl_date, conn)
        return inserted

    def _ingest_api_sources(
        self,
        asset_id: str,
        parsed_company_url: Dict[str, str],
        crawl_date: date,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        path = "/".join(
            [
                parsed_company_url.get("isin_token", ""),
                parsed_company_url.get("group_slug", ""),
                parsed_company_url.get("exchange_code", ""),
                parsed_company_url.get("symbol_slug", ""),
                parsed_company_url.get("company_slug", ""),
            ]
        ).strip("/")
        isin = parsed_company_url.get("isin_token", "")
        base_url = parsed_company_url.get("company_url", "")
        inserted += self._ingest_auditors(asset_id, isin, base_url, crawl_date, conn)
        keyshareholders_payloads = self._fetch_api_payload_pages(
            asset_id,
            "keyshareholders",
            {"path": path, "detailed": "true", "jsonArray": "undefined"},
            "ownership-data",
            "keyshareholders",
            crawl_date,
            conn,
        )
        if keyshareholders_payloads:
            inserted += self._ingest_keyshareholders(asset_id, "", keyshareholders_payloads, base_url, conn)
        ownership_specs = [
            ("blockdeals", "Bulk Deals", {"path": path, "type": 1}, self._ingest_trade_table, "src_cogencis_bulk_deals"),
            ("blockdeals", "Block Deals", {"path": path, "type": 2}, self._ingest_trade_table, "src_cogencis_block_deals"),
            ("insidertrading", "Insider Trading", {"path": path}, self._ingest_insider_trades, None),
            ("sast", "SAST", {"path": path, "actionType": "undefined"}, self._ingest_sast, None),
            ("pledgedshares", "Pledged Shares", {"path": path, "actionType": "undefined"}, self._ingest_pledge, None),
            ("capitalhistory", "Capital History", {"path": path}, self._ingest_capital_history, None),
        ]
        for endpoint, title, params, handler, table_name in ownership_specs:
            table = self._fetch_api_table_pages(asset_id, endpoint, params, "ownership-data", endpoint, title, crawl_date, conn)
            if not table:
                continue
            if table_name:
                inserted += handler(table_name, asset_id, "", table, base_url, conn)
            else:
                inserted += handler(asset_id, "", table, base_url, conn)
        market_specs = [
            ("announcements", "Announcements", {"path": path}, self._ingest_filings, "announcements"),
            ("boardmeetings", "Board Meetings", {"path": path}, self._ingest_filings, "board-meetings"),
        ]
        for endpoint, title, params, handler, page_kind in market_specs:
            table = self._fetch_api_table_pages(asset_id, endpoint, params, "market-data", page_kind, title, crawl_date, conn)
            if table:
                inserted += handler(asset_id, "", page_kind, [table], base_url, conn)
        for action_type, title in [
            ("undefined", "Corporate Actions"),
            ("Dividend", "Corporate Actions - Dividend"),
            ("Splits", "Corporate Actions - Splits"),
            ("Bonus", "Corporate Actions - Bonus"),
            ("Others", "Corporate Actions - Others"),
        ]:
            table = self._fetch_api_table_pages(
                asset_id,
                "corporateaction",
                {"path": path, "actionType": action_type},
                "market-data",
                f"corporate-action:{action_type}",
                title,
                crawl_date,
                conn,
            )
            if table:
                inserted += self._ingest_corporate_actions(asset_id, "", title, [table], base_url, conn)
        due_diligence_tables: List[Dict[str, Any]] = []
        for endpoint, title in [
            ("legalcases", "Legal Cases"),
            ("tribunals", "Tribunals"),
            ("indexofcharges", "Index Of Charges"),
        ]:
            table = self._fetch_api_table_pages(
                asset_id,
                endpoint,
                {"isin": isin},
                "due-diligence",
                endpoint,
                title,
                crawl_date,
                conn,
            )
            if table:
                due_diligence_tables.append(table)
        if due_diligence_tables:
            inserted += self._ingest_due_diligence(asset_id, "", due_diligence_tables, base_url, conn)
        return inserted

    def _fetch_api_table_pages(
        self,
        asset_id: str,
        endpoint: str,
        params: Dict[str, Any],
        tab_key: str,
        page_kind: str,
        title: str,
        crawl_date: date,
        conn: DatabaseConnection,
        page_size: int = 20,
    ) -> Optional[Dict[str, Any]]:
        all_rows: List[Dict[str, Any]] = []
        headers: List[str] = []
        seen_signatures = set()
        for page_no in range(1, self.page_limit + 1):
            payload = self._fetch_api_json(
                asset_id,
                endpoint,
                {
                    **params,
                    "pageNo": page_no,
                    "pageSize": page_size,
                    "detailed": "true",
                    "jsonArray": "true",
                },
                tab_key,
                page_kind,
                page_no,
                crawl_date,
                conn,
            )
            if not payload:
                break
            table = _api_table_from_response(title, payload, f"https://data.cogencis.com/api/v1/{endpoint}")
            if not table or not table["rows"]:
                break
            if not headers:
                headers = table["headers"]
            signature = hashlib.sha1(_json_dumps([row["cells"] for row in table["rows"]]).encode("utf-8")).hexdigest()
            if signature in seen_signatures:
                break
            seen_signatures.add(signature)
            row_offset = len(all_rows)
            for row in table["rows"]:
                all_rows.append({
                    "row_order": row_offset + row["row_order"],
                    "cells": row["cells"],
                    "links": row["links"],
                })
            paging_info = payload.get("pagingInfo") or {}
            record_count = paging_info.get("recordCount")
            no_of_pages = paging_info.get("noOfPages")
            if isinstance(record_count, int) and record_count < page_size:
                break
            if isinstance(no_of_pages, int) and no_of_pages > 0 and page_no >= no_of_pages:
                break
        if not headers or not all_rows:
            return None
        return {
            "title": title,
            "headers": headers,
            "rows": all_rows,
        }

    def _fetch_api_payload_pages(
        self,
        asset_id: str,
        endpoint: str,
        params: Dict[str, Any],
        tab_key: str,
        page_kind: str,
        crawl_date: date,
        conn: DatabaseConnection,
        page_size: int = 20,
    ) -> List[Dict[str, Any]]:
        payloads: List[Dict[str, Any]] = []
        seen_signatures = set()
        for page_no in range(1, self.page_limit + 1):
            payload = self._fetch_api_json(
                asset_id,
                endpoint,
                {
                    **params,
                    "pageNo": page_no,
                    "pageSize": page_size,
                },
                tab_key,
                page_kind,
                page_no,
                crawl_date,
                conn,
            )
            if not payload:
                break
            signature = hashlib.sha1(_json_dumps(payload).encode("utf-8")).hexdigest()
            if signature in seen_signatures:
                break
            seen_signatures.add(signature)
            payloads.append(payload)
            paging_info = payload.get("pagingInfo") or {}
            record_count = paging_info.get("recordCount")
            no_of_pages = paging_info.get("noOfPages")
            if isinstance(record_count, int) and record_count < page_size:
                break
            if isinstance(no_of_pages, int) and no_of_pages > 0 and page_no >= no_of_pages:
                break
        return payloads

    def _fetch_api_json(
        self,
        asset_id: str,
        endpoint: str,
        params: Dict[str, Any],
        tab_key: str,
        page_kind: str,
        page_number: int,
        crawl_date: date,
        conn: DatabaseConnection,
    ) -> Optional[Dict[str, Any]]:
        fetch_id = generate_id()
        request_url = f"https://data.cogencis.com/api/v1/{endpoint}"
        last_error = None
        for attempt in range(1, self.max_retries + 1):
            try:
                response = self._session.get(request_url, params=params, timeout=self.request_timeout)
                final_url = response.url
                content_hash = hashlib.sha1(response.content).hexdigest()
                filename = f"{asset_id}_{tab_key}_{page_kind or endpoint}_{page_number}_{content_hash[:12]}.json"
                raw_path = save_raw_file("COGENCIS", crawl_date, filename, response.content)
                parse_error = None
                payload = None
                if response.ok:
                    try:
                        payload = response.json()
                    except Exception as exc:
                        parse_error = str(exc)[:1000]
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_page_fetches
                       (id, asset_id, tab_key, page_kind, page_number, request_url, final_url, raw_path, http_status, content_hash, parse_status, parse_error)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        fetch_id,
                        asset_id,
                        tab_key,
                        page_kind,
                        page_number,
                        request_url,
                        final_url,
                        str(raw_path),
                        response.status_code,
                        content_hash,
                        "FETCHED_JSON" if response.ok and payload is not None else "HTTP_ERROR" if not response.ok else "JSON_ERROR",
                        parse_error if response.ok else response.text[:1000],
                    ),
                )
                if response.ok and payload is not None:
                    return payload.get("response") if isinstance(payload, dict) else None
                last_error = parse_error if response.ok else response.text[:1000]
            except Exception as exc:
                last_error = str(exc)[:2000]
                if attempt == self.max_retries:
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_page_fetches
                           (id, asset_id, tab_key, page_kind, page_number, request_url, http_status, parse_status, parse_error)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            fetch_id,
                            asset_id,
                            tab_key,
                            page_kind,
                            page_number,
                            request_url,
                            None,
                            "EXCEPTION",
                            last_error,
                        ),
                    )
                else:
                    time.sleep(min(self.delay_seconds * attempt, 2.0))
                continue
            if attempt < self.max_retries:
                time.sleep(min(self.delay_seconds * attempt, 2.0))
        logger.warning("[COGENCIS] api fetch failed for %s: %s", request_url, last_error)
        return None

    def _ingest_overview_page(self, asset_id: str, html: str, page_url: str, conn: DatabaseConnection) -> int:
        next_payload = _extract_next_data_payload(html)
        if not next_payload:
            return 0
        candidate = _find_best_overview_candidate(next_payload)
        if not candidate:
            return 0
        flat_items = _flatten_dict_items(candidate)
        existing = conn.fetchone("SELECT auditors_json FROM src_cogencis_company_overview WHERE asset_id = ?", (asset_id,))
        auditors_json = existing["auditors_json"] if existing else None
        conn.execute(
            """INSERT OR REPLACE INTO src_cogencis_company_overview
               (asset_id, company_name, isin, cin, listing_date, phone, email, website_url, address_text, market_cap_text, face_value_text, book_value_text, pe_ttm_text, dividend_yield_text, auditors_json, overview_json, source_page_url, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))""",
            (
                asset_id,
                _pick_flat_value(flat_items, ["company_name", "companyname", "name"]),
                _pick_flat_value(flat_items, ["isin"]),
                _pick_flat_value(flat_items, ["cin"]),
                _parse_date(_pick_flat_value(flat_items, ["listing_date", "date_of_listing", "listing"])),
                _pick_flat_value(flat_items, ["phone", "telephone"]),
                _pick_flat_value(flat_items, ["email", "mail"]),
                _pick_flat_value(flat_items, ["website", "site"]),
                _pick_flat_value(flat_items, ["address"]),
                _pick_flat_value(flat_items, ["market_cap", "marketcap"]),
                _pick_flat_value(flat_items, ["face_value", "fv"]),
                _pick_flat_value(flat_items, ["book_value", "bv"]),
                _pick_flat_value(flat_items, ["pe_ttm", "pettm", "pe"]),
                _pick_flat_value(flat_items, ["dividend_yield", "yield"]),
                auditors_json,
                _json_dumps(candidate),
                page_url,
            ),
        )
        return 1

    def _ingest_auditors(self, asset_id: str, isin: str, base_url: str, crawl_date: date, conn: DatabaseConnection) -> int:
        payload = self._fetch_api_json(
            asset_id,
            "auditors",
            {"isin": isin, "detailed": "true", "jsonArray": "true"},
            "overview",
            "auditors",
            1,
            crawl_date,
            conn,
        )
        if not payload:
            return 0
        auditors = payload.get("data") if isinstance(payload, dict) else None
        if auditors is None:
            return 0
        existing = conn.fetchone("SELECT * FROM src_cogencis_company_overview WHERE asset_id = ?", (asset_id,))
        conn.execute(
            """INSERT OR REPLACE INTO src_cogencis_company_overview
               (asset_id, company_name, isin, cin, listing_date, phone, email, website_url, address_text, market_cap_text, face_value_text, book_value_text, pe_ttm_text, dividend_yield_text, auditors_json, overview_json, source_page_url, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))""",
            (
                asset_id,
                existing["company_name"] if existing else None,
                existing["isin"] if existing else isin,
                existing["cin"] if existing else None,
                existing["listing_date"] if existing else None,
                existing["phone"] if existing else None,
                existing["email"] if existing else None,
                existing["website_url"] if existing else None,
                existing["address_text"] if existing else None,
                existing["market_cap_text"] if existing else None,
                existing["face_value_text"] if existing else None,
                existing["book_value_text"] if existing else None,
                existing["pe_ttm_text"] if existing else None,
                existing["dividend_yield_text"] if existing else None,
                _json_dumps(auditors),
                existing["overview_json"] if existing else None,
                base_url,
            ),
        )
        return len(auditors) if isinstance(auditors, list) else 1

    def _enrich_connected_companies(self, asset_id: str, crawl_date: date, conn: DatabaseConnection) -> int:
        rows = conn.execute(
            "SELECT id, person_name, connected_companies_json, raw_json FROM src_cogencis_management_people WHERE asset_id = ?",
            (asset_id,),
        ).fetchall()
        inserted = 0
        for row in rows:
            raw_json = row["raw_json"]
            if not raw_json:
                continue
            try:
                raw_payload = json.loads(raw_json)
            except Exception:
                continue
            data = raw_payload.get("data") if isinstance(raw_payload, dict) else None
            if not isinstance(data, dict):
                continue
            din = _clean_text(_pick_value(data, ["din", "director_identification_number"]))
            if not din:
                continue
            payload = self._fetch_api_json(
                asset_id,
                "connectedcompanies",
                {"din": din, "detailed": "true", "jsonArray": "true"},
                "management",
                f"connectedcompanies:{din}",
                1,
                crawl_date,
                conn,
            )
            if not payload:
                continue
            companies = payload.get("data") if isinstance(payload, dict) else None
            if not isinstance(companies, list):
                continue
            existing_names: List[str] = []
            if row["connected_companies_json"]:
                try:
                    parsed_existing = json.loads(row["connected_companies_json"])
                    if isinstance(parsed_existing, list):
                        existing_names = [_clean_text(item) for item in parsed_existing if _clean_text(item)]
                except Exception:
                    existing_names = []
            merged_names = set(existing_names)
            for company in companies:
                if not isinstance(company, dict):
                    continue
                company_name = _clean_text(company.get("companyName") or company.get("name") or company.get("company"))
                if company_name and company_name != _clean_text(row["person_name"]):
                    merged_names.add(company_name)
            normalized_names = sorted(merged_names)
            conn.execute(
                "UPDATE src_cogencis_management_people SET connected_companies_json = ? WHERE id = ?",
                (_json_dumps(normalized_names), row["id"]),
            )
            inserted += len(normalized_names)
        return inserted

    def _normalize_url(self, url: str) -> str:
        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        normalized_items = []
        for key in sorted(query.keys()):
            for value in sorted(query[key]):
                normalized_items.append(f"{key}={value}")
        normalized_query = "&".join(normalized_items)
        return f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{normalized_query}".rstrip("?")

    def _fetch_page(
        self,
        asset_id: str,
        request_url: str,
        tab_key: str,
        page_kind: str,
        page_number: int,
        crawl_date: date,
        conn: DatabaseConnection,
    ) -> Tuple[Optional[str], str]:
        fetch_id = generate_id()
        final_url = request_url
        last_error = None
        for attempt in range(1, self.max_retries + 1):
            try:
                response = self._session.get(request_url, timeout=self.request_timeout, allow_redirects=True)
                final_url = response.url
                content_hash = hashlib.sha1(response.content).hexdigest()
                filename = f"{asset_id}_{tab_key}_{page_kind or 'root'}_{page_number}_{content_hash[:12]}.html"
                raw_path = save_raw_file("COGENCIS", crawl_date, filename, response.content)
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_page_fetches
                       (id, asset_id, tab_key, page_kind, page_number, request_url, final_url, raw_path, http_status, content_hash, parse_status, parse_error)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        fetch_id,
                        asset_id,
                        tab_key,
                        page_kind,
                        page_number,
                        request_url,
                        final_url,
                        str(raw_path),
                        response.status_code,
                        content_hash,
                        "FETCHED" if response.ok else "HTTP_ERROR",
                        None if response.ok else response.text[:1000],
                    ),
                )
                if response.ok:
                    return response.text, final_url
                last_error = response.text[:1000]
            except Exception as exc:
                last_error = str(exc)[:2000]
                if attempt == self.max_retries:
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_page_fetches
                           (id, asset_id, tab_key, page_kind, page_number, request_url, http_status, parse_status, parse_error)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            fetch_id,
                            asset_id,
                            tab_key,
                            page_kind,
                            page_number,
                            request_url,
                            None,
                            "EXCEPTION",
                            last_error,
                        ),
                    )
                else:
                    time.sleep(min(self.delay_seconds * attempt, 2.0))
                continue
            if attempt < self.max_retries:
                time.sleep(min(self.delay_seconds * attempt, 2.0))
        logger.warning("[COGENCIS] fetch failed for %s: %s", request_url, last_error)
        return None, final_url

    def _discover_urls(self, base_url: str, soup: BeautifulSoup) -> List[Tuple[str, str, str, int]]:
        discovered: List[Tuple[str, str, str, int]] = []
        base_parsed = urlparse(base_url)
        for anchor in soup.find_all("a", href=True):
            href = _safe_url(base_url, anchor.get("href", ""))
            if not href:
                continue
            parsed = urlparse(href)
            if parsed.netloc and parsed.netloc != base_parsed.netloc:
                continue
            if parsed.path != base_parsed.path:
                continue
            query = parse_qs(parsed.query)
            tab_key = _clean_text((query.get("tab") or [""])[0])
            if not tab_key:
                continue
            page_kind = _clean_text((query.get("type") or [""])[0])
            page_number = 1
            for key in ["page", "pageno", "pageNo", "page_no"]:
                if key in query:
                    try:
                        page_number = int((query.get(key) or ["1"])[0])
                    except ValueError:
                        page_number = 1
                    break
            discovered.append((href, tab_key, page_kind, page_number))
        return discovered

    def _store_entities(self, asset_id: str, entities: List[Dict[str, str]], source_tab: str, conn: DatabaseConnection) -> int:
        inserted = 0
        for entity in entities:
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_management_entities
                   (id, asset_id, entity_name, entity_kind, entity_url, source_tab, is_primary)
                   VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity["name"],
                    entity.get("kind"),
                    entity.get("url"),
                    source_tab,
                    int(entity.get("is_primary") == "1"),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_management(
        self,
        asset_id: str,
        current_entity: str,
        entities: List[Dict[str, str]],
        tables: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        entity_name = current_entity or (entities[0]["name"] if entities else "")
        for table in tables:
            headers = table["headers"]
            for row in table["rows"]:
                data = _row_to_dict(headers, row["cells"])
                person_name = _pick_value(data, ["name", "director", "person", "member", "official"], 0, row["cells"])
                if not _clean_text(person_name):
                    continue
                designation = _pick_value(data, ["designation", "role", "position", "category"], 1, row["cells"])
                appointment_date = _parse_date(_pick_value(data, ["appointment", "joined", "from"]))
                cessation_date = _parse_date(_pick_value(data, ["cessation", "left", "to"]))
                connected_names = []
                for key, value in data.items():
                    if "company" in key and _clean_text(value):
                        connected_names.append(_clean_text(value))
                for link in row["links"]:
                    if link["label"]:
                        connected_names.append(link["label"])
                connected_names = sorted(set(name for name in connected_names if name and name != _clean_text(person_name)))
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_management_people
                       (id, asset_id, entity_name, person_name, designation, role_type, committee_name, appointment_date, cessation_date, profile_text, connected_companies_json, source_page_url, raw_json)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        generate_id(),
                        asset_id,
                        entity_name,
                        _clean_text(person_name),
                        _clean_text(designation),
                        _clean_text(_pick_value(data, ["role_type", "type", "category"])),
                        _clean_text(_pick_value(data, ["committee"])),
                        appointment_date,
                        cessation_date,
                        _clean_text(_pick_value(data, ["profile", "details", "experience", "bio"])),
                        json.dumps(connected_names) if connected_names else None,
                        page_url,
                        json.dumps({"title": table["title"], "data": data, "links": row["links"]}),
                    ),
                )
                inserted += 1
        return inserted

    def _ingest_ownership(
        self,
        asset_id: str,
        entity_name: str,
        tables: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        for table in tables:
            table_type = _classify_ownership_table(table["title"])
            if table_type == "SHAREHOLDING":
                inserted += self._ingest_shareholding(asset_id, entity_name, table, page_url, conn)
            elif table_type == "BULK_DEALS":
                inserted += self._ingest_trade_table("src_cogencis_bulk_deals", asset_id, entity_name, table, page_url, conn)
            elif table_type == "BLOCK_DEALS":
                inserted += self._ingest_trade_table("src_cogencis_block_deals", asset_id, entity_name, table, page_url, conn)
            elif table_type == "INSIDER_TRADES":
                inserted += self._ingest_insider_trades(asset_id, entity_name, table, page_url, conn)
            elif table_type == "SAST":
                inserted += self._ingest_sast(asset_id, entity_name, table, page_url, conn)
            elif table_type == "PLEDGE":
                inserted += self._ingest_pledge(asset_id, entity_name, table, page_url, conn)
            elif table_type == "CAPITAL_HISTORY":
                inserted += self._ingest_capital_history(asset_id, entity_name, table, page_url, conn)
        return inserted

    def _ingest_keyshareholders(
        self,
        asset_id: str,
        entity_name: str,
        payloads: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        seen_records = set()
        for payload in payloads:
            periods = _extract_keyshareholders_periods(payload)
            rows = _extract_keyshareholders_rows(payload)
            if not periods or not rows:
                continue
            for row_index, row in enumerate(rows):
                if not isinstance(row, list):
                    continue
                name_index = next((idx for idx, item in enumerate(row) if isinstance(item, str) and _clean_text(item)), None)
                if name_index is None:
                    continue
                shareholder_name = _clean_text(row[name_index])
                if not shareholder_name:
                    continue
                period_cells = row[name_index + 1:name_index + 1 + len(periods)]
                for period_label, cell in zip(periods, period_cells):
                    period_end_date = _parse_date(period_label)
                    if not period_end_date or not isinstance(cell, dict):
                        continue
                    holding_pct = _parse_number(cell.get("per"))
                    share_count = _parse_number(cell.get("val"))
                    if holding_pct is None and share_count is None:
                        continue
                    dedupe_key = (asset_id, entity_name, period_end_date, shareholder_name, holding_pct, share_count)
                    if dedupe_key in seen_records:
                        continue
                    seen_records.add(dedupe_key)
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_shareholding_categories
                           (id, asset_id, entity_name, period_end_date, parent_category, category_name, holding_pct, share_count, change_qoq_pct, row_order, raw_json)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            generate_id(),
                            asset_id,
                            entity_name,
                            period_end_date,
                            "Key Shareholders",
                            shareholder_name,
                            holding_pct,
                            share_count,
                            None,
                            row_index,
                            _json_dumps({"period": period_label, "cell": cell, "row": row}),
                        ),
                    )
                    inserted += 1
        return inserted

    def _ingest_shareholding(
        self,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        headers = table["headers"]
        rows = table["rows"]
        inserted = 0
        if len(headers) > 1 and any(_looks_like_period_header(header) for header in headers[1:]):
            summaries: Dict[int, Dict[str, Any]] = {}
            for col_index, header in enumerate(headers[1:], start=1):
                period_end_date = _parse_date(header)
                if not period_end_date:
                    continue
                summaries[col_index] = {
                    "period_end_date": period_end_date,
                    "promoter_holding": None,
                    "promoter_group_holding": None,
                    "fii_holding": None,
                    "dii_holding": None,
                    "mutual_fund_holding": None,
                    "insurance_holding": None,
                    "government_holding": None,
                    "public_holding": None,
                    "non_institutional_holding": None,
                    "other_holding": None,
                    "pledged_shares_pct": None,
                }
            for row in rows:
                if not row["cells"]:
                    continue
                label = _clean_text(row["cells"][0])
                for col_index, summary in summaries.items():
                    if col_index >= len(row["cells"]):
                        continue
                    value = _parse_number(row["cells"][col_index])
                    if value is None:
                        continue
                    self._apply_shareholding_value(summary, label, value)
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_shareholding_categories
                           (id, asset_id, entity_name, period_end_date, parent_category, category_name, holding_pct, share_count, change_qoq_pct, row_order, raw_json)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            generate_id(),
                            asset_id,
                            entity_name,
                            summary["period_end_date"],
                            table["title"],
                            label,
                            value,
                            None,
                            None,
                            row["row_order"],
                            json.dumps({"title": table["title"], "headers": headers, "row": row["cells"]}),
                        ),
                    )
                    inserted += 1
            for summary in summaries.values():
                total_holding_reported = sum(value for key, value in summary.items() if key.endswith("holding") and value is not None)
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_shareholding_summary
                       (id, asset_id, entity_name, period_end_date, promoter_holding, promoter_group_holding, fii_holding, dii_holding, mutual_fund_holding, insurance_holding, government_holding, public_holding, non_institutional_holding, other_holding, pledged_shares_pct, total_holding_reported, raw_json)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        generate_id(),
                        asset_id,
                        entity_name,
                        summary["period_end_date"],
                        summary["promoter_holding"],
                        summary["promoter_group_holding"],
                        summary["fii_holding"],
                        summary["dii_holding"],
                        summary["mutual_fund_holding"],
                        summary["insurance_holding"],
                        summary["government_holding"],
                        summary["public_holding"],
                        summary["non_institutional_holding"],
                        summary["other_holding"],
                        summary["pledged_shares_pct"],
                        total_holding_reported,
                        json.dumps(summary),
                    ),
                )
                inserted += 1
            return inserted
        for row in rows:
            data = _row_to_dict(headers, row["cells"])
            period_end_date = _parse_date(_pick_value(data, ["quarter", "period", "as_on", "as_of", "date"], 0, row["cells"]))
            if not period_end_date:
                continue
            summary = {
                "promoter_holding": _parse_number(_pick_value(data, ["promoter"])),
                "promoter_group_holding": _parse_number(_pick_value(data, ["promoter_group"])),
                "fii_holding": _parse_number(_pick_value(data, ["fii", "foreign_investor"])),
                "dii_holding": _parse_number(_pick_value(data, ["dii", "institutional"])),
                "mutual_fund_holding": _parse_number(_pick_value(data, ["mutual_fund"])),
                "insurance_holding": _parse_number(_pick_value(data, ["insurance"])),
                "government_holding": _parse_number(_pick_value(data, ["government"])),
                "public_holding": _parse_number(_pick_value(data, ["public"])),
                "non_institutional_holding": _parse_number(_pick_value(data, ["non_institutional"])),
                "other_holding": _parse_number(_pick_value(data, ["other"])),
                "pledged_shares_pct": _parse_number(_pick_value(data, ["pledge", "pledged"])),
            }
            total_holding_reported = sum(value for key, value in summary.items() if key.endswith("holding") and value is not None)
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_shareholding_summary
                   (id, asset_id, entity_name, period_end_date, promoter_holding, promoter_group_holding, fii_holding, dii_holding, mutual_fund_holding, insurance_holding, government_holding, public_holding, non_institutional_holding, other_holding, pledged_shares_pct, total_holding_reported, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    period_end_date,
                    summary["promoter_holding"],
                    summary["promoter_group_holding"],
                    summary["fii_holding"],
                    summary["dii_holding"],
                    summary["mutual_fund_holding"],
                    summary["insurance_holding"],
                    summary["government_holding"],
                    summary["public_holding"],
                    summary["non_institutional_holding"],
                    summary["other_holding"],
                    summary["pledged_shares_pct"],
                    total_holding_reported,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _apply_shareholding_value(self, summary: Dict[str, Any], label: str, value: float):
        norm = _norm_key(label)
        if "promoter_group" in norm:
            summary["promoter_group_holding"] = value
        elif "promoter" in norm:
            summary["promoter_holding"] = value
        elif norm.startswith("fii") or "foreign" in norm:
            summary["fii_holding"] = value
        elif norm.startswith("dii") or "domestic" in norm:
            summary["dii_holding"] = value
        elif "mutual" in norm and "fund" in norm:
            summary["mutual_fund_holding"] = value
        elif "insurance" in norm:
            summary["insurance_holding"] = value
        elif "government" in norm:
            summary["government_holding"] = value
        elif "public" in norm:
            summary["public_holding"] = value
        elif "non_institutional" in norm or ("non" in norm and "institution" in norm):
            summary["non_institutional_holding"] = value
        elif "pledge" in norm:
            summary["pledged_shares_pct"] = value
        elif "other" in norm:
            summary["other_holding"] = value

    def _ingest_trade_table(
        self,
        table_name: str,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        headers = table["headers"]
        for row in table["rows"]:
            data = _row_to_dict(headers, row["cells"])
            conn.execute(
                f"""INSERT OR REPLACE INTO {table_name}
                    (id, asset_id, entity_name, deal_date, exchange, buyer_name, seller_name, quantity, price, deal_value, percent_equity, source_page_url, raw_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    _parse_date(_pick_value(data, ["date", "deal_date"], 0, row["cells"])),
                    _clean_text(_pick_value(data, ["exchange"])),
                    _clean_text(_pick_value(data, ["buyer"])),
                    _clean_text(_pick_value(data, ["seller"])),
                    _parse_number(_pick_value(data, ["qty", "quantity", "shares"])),
                    _parse_number(_pick_value(data, ["price"])),
                    _parse_number(_pick_value(data, ["value", "deal_value"])),
                    _parse_number(_pick_value(data, ["equity", "holding", "percent"])),
                    page_url,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_insider_trades(
        self,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        headers = table["headers"]
        for row in table["rows"]:
            data = _row_to_dict(headers, row["cells"])
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_insider_trades
                   (id, asset_id, entity_name, disclosure_date, trade_date, insider_name, designation, relation_type, transaction_type, security_type, quantity, price, trade_value, pre_holding, post_holding, source_page_url, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    _parse_date(_pick_value(data, ["disclosure", "filing", "reported"])),
                    _parse_date(_pick_value(data, ["trade", "transaction", "date"], 0, row["cells"])),
                    _clean_text(_pick_value(data, ["name", "insider", "person"], 1, row["cells"])),
                    _clean_text(_pick_value(data, ["designation", "role"])),
                    _clean_text(_pick_value(data, ["relation", "category"])),
                    _clean_text(_pick_value(data, ["transaction", "type", "trade_type"])),
                    _clean_text(_pick_value(data, ["security", "instrument"])),
                    _parse_number(_pick_value(data, ["qty", "quantity", "shares"])),
                    _parse_number(_pick_value(data, ["price"])),
                    _parse_number(_pick_value(data, ["value"])),
                    _parse_number(_pick_value(data, ["pre_holding", "before"])),
                    _parse_number(_pick_value(data, ["post_holding", "after"])),
                    page_url,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_sast(
        self,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        headers = table["headers"]
        for row in table["rows"]:
            data = _row_to_dict(headers, row["cells"])
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_sast_events
                   (id, asset_id, entity_name, event_date, filing_date, acquirer_name, seller_name, event_type, trigger_type, pre_holding_pct, post_holding_pct, shares_acquired, source_page_url, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    _parse_date(_pick_value(data, ["event", "transaction", "date"], 0, row["cells"])),
                    _parse_date(_pick_value(data, ["filing", "disclosure"])),
                    _clean_text(_pick_value(data, ["acquirer", "buyer", "name"], 1, row["cells"])),
                    _clean_text(_pick_value(data, ["seller", "disposer"])),
                    _clean_text(_pick_value(data, ["type", "event_type"])),
                    _clean_text(_pick_value(data, ["trigger"])),
                    _parse_number(_pick_value(data, ["pre_holding", "before", "pre"])),
                    _parse_number(_pick_value(data, ["post_holding", "after", "post"])),
                    _parse_number(_pick_value(data, ["acquired", "shares"])),
                    page_url,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_pledge(
        self,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        headers = table["headers"]
        for row in table["rows"]:
            data = _row_to_dict(headers, row["cells"])
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_pledge_shares
                   (id, asset_id, entity_name, period_end_date, promoter_name, pledged_shares, released_shares, promoter_holding_shares, pledged_pct_of_promoter, pledged_pct_of_total, source_page_url, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    _parse_date(_pick_value(data, ["period", "quarter", "date"], 0, row["cells"])),
                    _clean_text(_pick_value(data, ["promoter", "name"], 1, row["cells"])),
                    _parse_number(_pick_value(data, ["pledged", "shares_pledged"])),
                    _parse_number(_pick_value(data, ["released"])),
                    _parse_number(_pick_value(data, ["holding", "promoter_holding"])),
                    _parse_number(_pick_value(data, ["promoter_pct", "pledged_pct_of_promoter"])),
                    _parse_number(_pick_value(data, ["total_pct", "pledged_pct_of_total"])),
                    page_url,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_capital_history(
        self,
        asset_id: str,
        entity_name: str,
        table: Dict[str, Any],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        headers = table["headers"]
        for row in table["rows"]:
            data = _row_to_dict(headers, row["cells"])
            conn.execute(
                """INSERT OR REPLACE INTO src_cogencis_capital_history
                   (id, asset_id, entity_name, effective_date, event_type, ratio_text, face_value_from, face_value_to, quantity_before, quantity_after, source_page_url, raw_json)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (
                    generate_id(),
                    asset_id,
                    entity_name,
                    _parse_date(_pick_value(data, ["date", "effective"])),
                    _clean_text(_pick_value(data, ["event", "type"], 1, row["cells"])),
                    _clean_text(_pick_value(data, ["ratio"])),
                    _parse_number(_pick_value(data, ["face_value_from", "from"])),
                    _parse_number(_pick_value(data, ["face_value_to", "to"])),
                    _parse_number(_pick_value(data, ["before"])),
                    _parse_number(_pick_value(data, ["after"])),
                    page_url,
                    json.dumps({"title": table["title"], "data": data}),
                ),
            )
            inserted += 1
        return inserted

    def _ingest_filings(
        self,
        asset_id: str,
        entity_name: str,
        page_kind: str,
        tables: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        filing_type = "BOARD_MEETING" if page_kind == "board-meetings" else "ANNOUNCEMENT"
        for table in tables:
            headers = table["headers"]
            for row in table["rows"]:
                data = _row_to_dict(headers, row["cells"])
                filing_id = generate_id()
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_filings
                       (id, asset_id, filing_type, entity_name, event_date, filing_date, headline, subcategory, exchange, reference_no, detail_text, source_page_url, raw_json)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        filing_id,
                        asset_id,
                        filing_type,
                        entity_name,
                        _parse_date(_pick_value(data, ["event", "meeting", "date"], 0, row["cells"])),
                        _parse_date(_pick_value(data, ["filing", "announcement", "reported"])),
                        _clean_text(_pick_value(data, ["headline", "subject", "title", "details"], 1, row["cells"])),
                        _clean_text(table["title"] or page_kind),
                        _clean_text(_pick_value(data, ["exchange"])),
                        _clean_text(_pick_value(data, ["reference", "ref_no", "reference_no"])),
                        _clean_text(_pick_value(data, ["details", "summary", "notes"], None, row["cells"])),
                        page_url,
                        json.dumps({"title": table["title"], "data": data, "links": row["links"]}),
                    ),
                )
                for link in row["links"]:
                    attachment_url = _safe_url(page_url, link.get("url", ""))
                    if not attachment_url:
                        continue
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_filing_attachments
                           (id, filing_id, label, attachment_url)
                           VALUES (?, ?, ?, ?)""",
                        (
                            generate_id(),
                            filing_id,
                            link.get("label"),
                            attachment_url,
                        ),
                    )
                    inserted += 1
                inserted += 1
        return inserted

    def _ingest_corporate_actions(
        self,
        asset_id: str,
        entity_name: str,
        page_kind: str,
        tables: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        for table in tables:
            headers = table["headers"]
            subcategory = _clean_text(table["title"] or page_kind or "ALL").upper()
            for row in table["rows"]:
                data = _row_to_dict(headers, row["cells"])
                conn.execute(
                    """INSERT OR REPLACE INTO src_cogencis_corporate_actions
                       (id, asset_id, entity_name, subcategory, announcement_date, ex_date, record_date, action_type, ratio_text, amount_text, notes_text, source_page_url, raw_json)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        generate_id(),
                        asset_id,
                        entity_name,
                        subcategory,
                        _parse_date(_pick_value(data, ["announcement", "declared", "date"], 0, row["cells"])),
                        _parse_date(_pick_value(data, ["ex_date", "ex", "exdate"])),
                        _parse_date(_pick_value(data, ["record"])),
                        _clean_text(_pick_value(data, ["action", "type", "purpose"], 1, row["cells"])),
                        _clean_text(_pick_value(data, ["ratio"])),
                        _clean_text(_pick_value(data, ["amount", "dividend", "value"])),
                        _clean_text(_pick_value(data, ["note", "remarks", "details"], None, row["cells"])),
                        page_url,
                        json.dumps({"title": table["title"], "data": data, "links": row["links"]}),
                    ),
                )
                inserted += 1
        return inserted

    def _ingest_due_diligence(
        self,
        asset_id: str,
        entity_name: str,
        tables: List[Dict[str, Any]],
        page_url: str,
        conn: DatabaseConnection,
    ) -> int:
        inserted = 0
        for table in tables:
            headers = table["headers"]
            for row in table["rows"]:
                row_label = row["cells"][0] if row["cells"] else ""
                for col_index, header in enumerate(headers[1:], start=1):
                    if col_index >= len(row["cells"]):
                        continue
                    conn.execute(
                        """INSERT OR REPLACE INTO src_cogencis_due_diligence_entries
                           (id, asset_id, entity_name, table_name, row_label, column_name, column_value, row_order, col_order, source_page_url, raw_json)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (
                            generate_id(),
                            asset_id,
                            entity_name,
                            _clean_text(table["title"] or "Due Diligence"),
                            _clean_text(row_label),
                            _clean_text(header),
                            _clean_text(row["cells"][col_index]),
                            row["row_order"],
                            col_index,
                            page_url,
                            json.dumps({"title": table["title"], "headers": headers, "row": row["cells"]}),
                        ),
                    )
                    inserted += 1
        return inserted
