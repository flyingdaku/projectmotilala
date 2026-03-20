from __future__ import annotations

import json
import re
from typing import Any, Dict, Iterable, List, Optional
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup


FUND_PATH_RE = re.compile(r"/mutualfunds/([^/]+)/([^/]+)/(?P<tab>[^/?#]+)\.aspx", re.I)
FUND_ID_RE = re.compile(r"/mutualfunds/([^/]+)/", re.I)
FUND_HOUSE_RE = re.compile(r"/funds/([^/.?#]+)\.aspx", re.I)
ISIN_RE = re.compile(r"\b([A-Z0-9]{12})\b")

TAB_KEYS = {
    "overview": "overview.aspx",
    "portfolio": "portfolio.aspx",
    "detailed_portfolio": "detailedportfolio.aspx",
    "performance": "performance.aspx",
    "risk": "riskrating.aspx",
    "factsheet": "fund-factsheet.aspx",
    "analysis": "morningstar-analysis.aspx",
}

RETURN_HORIZON_MAP = {
    "1 day": "1D",
    "1 week": "1W",
    "1 month": "1M",
    "3 months": "3M",
    "6 months": "6M",
    "ytd": "YTD",
    "1 year": "1Y",
    "3 years": "3Y",
    "5 years": "5Y",
    "10 years": "10Y",
    "since inception": "SI",
}

ASSET_BUCKETS = {
    "stock",
    "stocks",
    "bond",
    "bonds",
    "cash",
    "convertible",
    "other",
    "equity",
    "debt",
}

STYLE_KEYWORDS = (
    "large value",
    "large blend",
    "large growth",
    "mid value",
    "mid blend",
    "mid growth",
    "small value",
    "small blend",
    "small growth",
)

RISK_FIELD_MAP = {
    "alpha": "alpha",
    "beta": "beta",
    "r-squared": "r_squared",
    "r squared": "r_squared",
    "sharpe ratio": "sharpe",
    "sortino ratio": "sortino",
    "treynor ratio": "treynor",
    "standard deviation": "stddev",
    "upside capture ratio": "upside_capture",
    "downside capture ratio": "downside_capture",
}


def normalize_space(value: Optional[str]) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def maybe_float(value: Optional[str]) -> Optional[float]:
    if value is None:
        return None
    text = normalize_space(value)
    if not text or text in {"-", "--", "N/A", "NA", "n.a."}:
        return None
    text = text.replace("%", "").replace(",", "").replace("₹", "").replace("x", "")
    match = re.search(r"-?\d+(?:\.\d+)?", text)
    if not match:
        return None
    try:
        return float(match.group(0))
    except ValueError:
        return None


def json_dumps(value: Any) -> str:
    return json.dumps(value, ensure_ascii=True, sort_keys=True)


def extract_morningstar_fund_id(url: str) -> Optional[str]:
    match = FUND_ID_RE.search(url or "")
    return match.group(1).lower() if match else None


def extract_fund_house_slug(url: str) -> Optional[str]:
    match = FUND_HOUSE_RE.search(url or "")
    return match.group(1).lower() if match else None


def canonicalize_scheme_url(url: str) -> str:
    parsed = urlparse(url)
    clean = parsed._replace(query="", fragment="")
    return clean.geturl()


def parse_fund_house_links(html: str, base_url: str) -> List[Dict[str, str]]:
    soup = BeautifulSoup(html, "html.parser")
    records: List[Dict[str, str]] = []
    seen: set[str] = set()
    reserved = {"fundshome", "fundslist"}
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"]
        slug = extract_fund_house_slug(href)
        if not slug or slug in reserved:
            continue
        full_url = urljoin(base_url, href)
        if full_url in seen:
            continue
        seen.add(full_url)
        records.append({
            "fund_house_slug": slug,
            "fund_house_name": normalize_space(anchor.get_text(" ", strip=True)),
            "url": full_url,
        })
    return records


def _extract_context_metadata(text: str) -> Dict[str, Any]:
    patterns = {
        "category_name": r"Category\s*:\s*(.*?)(?=\s+Distribution Type\s*:|\s+Structure\s*:|\s+Latest NAV\s*:|$)",
        "distribution_type": r"Distribution Type\s*:\s*(.*?)(?=\s+Structure\s*:|\s+Latest NAV\s*:|$)",
        "structure": r"Structure\s*:\s*(.*?)(?=\s+Latest NAV\s*:|\s+NAV Date\s*:|$)",
        "latest_nav": r"Latest NAV\s*:\s*([0-9.,]+)",
        "nav_date": r"NAV Date\s*:\s*([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})",
        "benchmark_name": r"(?:Benchmark|Index)\s*:\s*(.*?)(?=\s+[A-Z][a-z]+?\s*:|$)",
    }
    parsed: Dict[str, Any] = {}
    for key, pattern in patterns.items():
        match = re.search(pattern, text, flags=re.I)
        if not match:
            continue
        parsed[key] = normalize_space(match.group(1))
    parsed["latest_nav"] = maybe_float(parsed.get("latest_nav"))
    return parsed


def parse_directory_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    fund_house_name = ""
    heading = soup.find(["h1", "h2"])
    if heading:
        fund_house_name = normalize_space(heading.get_text(" ", strip=True))
    rows: List[Dict[str, Any]] = []
    seen: set[str] = set()
    for anchor in soup.find_all("a", href=True):
        href = anchor["href"]
        if "/mutualfunds/" not in href.lower() or "overview.aspx" not in href.lower():
            continue
        full_url = canonicalize_scheme_url(urljoin(page_url, href))
        fund_id = extract_morningstar_fund_id(full_url)
        if not fund_id or full_url in seen:
            continue
        seen.add(full_url)
        row_container = anchor.find_parent("tr")
        context_text = ""
        if row_container:
            cells = [normalize_space(cell.get_text(" ", strip=True)) for cell in row_container.find_all(["td", "th"])]
            if len(cells) >= 6:
                rows.append({
                    "morningstar_fund_id": fund_id,
                    "scheme_name": normalize_space(anchor.get_text(" ", strip=True)),
                    "scheme_url": full_url,
                    "category_name": cells[1] or None,
                    "distribution_type": cells[2] or None,
                    "structure": cells[3] or None,
                    "latest_nav": maybe_float(cells[4]),
                    "nav_date": cells[5] or None,
                })
                continue
            context_text = normalize_space(row_container.get_text(" ", strip=True))
        else:
            parent = anchor.find_parent(["li", "div", "p"]) or anchor.parent
            context_text = normalize_space(parent.get_text(" ", strip=True))
        meta = _extract_context_metadata(context_text)
        rows.append({
            "morningstar_fund_id": fund_id,
            "scheme_name": normalize_space(anchor.get_text(" ", strip=True)),
            "scheme_url": full_url,
            **meta,
        })
    return {
        "fund_house_slug": extract_fund_house_slug(page_url),
        "fund_house_name": fund_house_name,
        "rows": rows,
    }


def build_tab_urls(overview_url: str) -> Dict[str, str]:
    base = overview_url.rsplit("/", 1)[0] + "/"
    return {key: urljoin(base, suffix) for key, suffix in TAB_KEYS.items()}


def parse_overview_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    heading = soup.find(["h1", "title"])
    heading_text = normalize_space(heading.get_text(" ", strip=True)) if heading else ""
    heading_text = heading_text.split("|")[0].strip()
    isin_match = ISIN_RE.search(heading_text)
    isin = isin_match.group(1) if isin_match else None
    scheme_name = normalize_space(heading_text.replace(isin, "").strip()) if isin else heading_text
    tabs = build_tab_urls(canonicalize_scheme_url(page_url))
    for anchor in soup.find_all("a", href=True):
        href = canonicalize_scheme_url(urljoin(page_url, anchor["href"]))
        match = FUND_PATH_RE.search(href)
        if not match:
            continue
        tab_name = match.group("tab").lower()
        for key, suffix in TAB_KEYS.items():
            if suffix.startswith(tab_name):
                tabs[key] = href
                break
    text = normalize_space(soup.get_text(" ", strip=True))
    meta = _extract_context_metadata(text)
    amc_name = ""
    parsed_title = urlparse(page_url).path.strip("/").split("/")
    if len(parsed_title) >= 2 and parsed_title[0].lower() == "mutualfunds":
        amc_name = ""
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "scheme_name": scheme_name or None,
        "isin": isin,
        "amc_name": amc_name or None,
        "tabs": tabs,
        **meta,
    }


def parse_html_tables(html: str) -> List[Dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    tables: List[Dict[str, Any]] = []
    for index, table in enumerate(soup.find_all("table")):
        headers: List[str] = []
        rows: List[List[str]] = []
        title = ""
        caption = table.find("caption")
        if caption:
            title = normalize_space(caption.get_text(" ", strip=True))
        if not title:
            prev_heading = table.find_previous(["h1", "h2", "h3", "h4", "h5", "strong"])
            if prev_heading:
                title = normalize_space(prev_heading.get_text(" ", strip=True))
        for tr in table.find_all("tr"):
            cells = [normalize_space(cell.get_text(" ", strip=True)) for cell in tr.find_all(["th", "td"])]
            if not cells:
                continue
            if tr.find_all("th") and not headers:
                headers = cells
            else:
                rows.append(cells)
        if rows:
            tables.append({
                "table_index": index,
                "title": title,
                "headers": headers,
                "rows": rows,
            })
    return tables


def _classify_return_table(table: Dict[str, Any]) -> str:
    title = normalize_space(table.get("title", "")).lower()
    headers = [normalize_space(h).lower() for h in table.get("headers", [])]
    first_col = normalize_space(table["rows"][0][0]).lower() if table.get("rows") else ""
    if "monthly" in title or re.match(r"jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec", first_col):
        return "MONTHLY"
    if "quarter" in title or re.match(r"q[1-4]|fy\d{2}", first_col):
        return "QUARTERLY"
    if "calendar" in title or re.match(r"(19|20)\d{2}$", first_col):
        return "CALENDAR"
    if any(key in headers for key in ("fund", "category", "benchmark", "index")):
        return "TRAILING"
    return "OTHER"


def parse_performance_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    trailing_returns: List[Dict[str, Any]] = []
    calendar_returns: List[Dict[str, Any]] = []
    monthly_returns: List[Dict[str, Any]] = []
    quarterly_returns: List[Dict[str, Any]] = []
    for table in tables:
        table_kind = _classify_return_table(table)
        headers = [normalize_space(h).lower() for h in table.get("headers", [])]
        if table_kind == "TRAILING":
            for row in table.get("rows", []):
                if not row:
                    continue
                horizon_key = normalize_space(row[0]).lower()
                horizon_code = RETURN_HORIZON_MAP.get(horizon_key)
                if not horizon_code:
                    continue
                values = {headers[idx]: row[idx] for idx in range(min(len(headers), len(row)))} if headers else {}
                trailing_returns.append({
                    "horizon_code": horizon_code,
                    "fund_return": maybe_float(values.get("fund") or values.get("return") or (row[1] if len(row) > 1 else None)),
                    "category_return": maybe_float(values.get("category") or values.get("category avg") or values.get("category average")),
                    "benchmark_return": maybe_float(values.get("benchmark") or values.get("index")),
                    "rank": maybe_float(values.get("rank")),
                    "quartile": values.get("quartile"),
                    "percentile_rank": maybe_float(values.get("% rank") or values.get("percentage rank") or values.get("percentile rank")),
                    "peer_count": int(maybe_float(values.get("# of invest. in category") or values.get("peer count") or values.get("number of funds")) or 0) or None,
                })
        elif table_kind == "CALENDAR":
            for row in table.get("rows", []):
                if not row:
                    continue
                label = normalize_space(row[0])
                if not re.match(r"(19|20)\d{2}$", label):
                    continue
                calendar_returns.append({
                    "period_kind": "YEAR",
                    "period_label": label,
                    "fund_return": maybe_float(row[1] if len(row) > 1 else None),
                    "category_return": maybe_float(row[2] if len(row) > 2 else None),
                    "benchmark_return": maybe_float(row[3] if len(row) > 3 else None),
                })
        elif table_kind == "MONTHLY":
            for row in table.get("rows", []):
                if row:
                    monthly_returns.append({"cells": row})
        elif table_kind == "QUARTERLY":
            for row in table.get("rows", []):
                if row:
                    quarterly_returns.append({"cells": row})
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "trailing_returns": trailing_returns,
        "calendar_returns": calendar_returns,
        "monthly_returns": monthly_returns,
        "quarterly_returns": quarterly_returns,
    }


def parse_risk_page(html: str, page_url: str) -> Dict[str, Any]:
    text = normalize_space(BeautifulSoup(html, "html.parser").get_text(" ", strip=True))
    tables = parse_html_tables(html)
    metrics: Dict[str, Any] = {}
    for table in tables:
        for row in table.get("rows", []):
            if len(row) < 2:
                continue
            label = normalize_space(row[0]).lower()
            for key, target in RISK_FIELD_MAP.items():
                if key in label:
                    metrics[target] = maybe_float(row[1])
                    break
    risk_label_match = re.search(r"Morningstar Risk\s*(?:Indicates|:)?\s*(Low|Below Average|Average|Above Average|High)", text, flags=re.I)
    star_match = re.search(r"Star Rating\s*:?\s*([0-5](?:\.\d+)?)", text, flags=re.I)
    if risk_label_match:
        metrics["morningstar_risk_label"] = normalize_space(risk_label_match.group(1))
    if star_match:
        metrics["star_rating"] = maybe_float(star_match.group(1))
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "risk_metrics": metrics,
        "tables": tables,
    }


def parse_portfolio_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    asset_allocation: List[Dict[str, Any]] = []
    style_box: List[Dict[str, Any]] = []
    characteristics: List[Dict[str, Any]] = []
    managers: List[Dict[str, Any]] = []
    for table in tables:
        for row in table.get("rows", []):
            if len(row) < 2:
                continue
            label = normalize_space(row[0])
            lower = label.lower()
            value = row[1]
            if lower in ASSET_BUCKETS:
                asset_allocation.append({"asset_bucket": label, "weight_pct": maybe_float(value)})
            elif lower in STYLE_KEYWORDS:
                style_box.append({"style_dimension": label, "weight_pct": maybe_float(value)})
            elif "manager" in lower or "tenure" in lower:
                managers.append({"label": label, "value": value})
            else:
                characteristics.append({"characteristic_name": label, "characteristic_value": value})
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "asset_allocation": asset_allocation,
        "style_box": style_box,
        "characteristics": characteristics,
        "managers": managers,
    }


def parse_holdings_page(html: str, page_url: str) -> Dict[str, Any]:
    tables = parse_html_tables(html)
    holdings: List[Dict[str, Any]] = []
    for table in tables:
        headers = [normalize_space(h).lower() for h in table.get("headers", [])]
        name_idx = 0
        weight_idx = None
        if headers:
            for idx, header in enumerate(headers):
                if "weight" in header or "%" in header or "assets" in header:
                    weight_idx = idx
                    break
        for rank, row in enumerate(table.get("rows", []), start=1):
            if not row:
                continue
            name = normalize_space(row[name_idx]) if len(row) > name_idx else ""
            if not name or name.lower() in {"name", "security", "company"}:
                continue
            holdings.append({
                "holding_name": name,
                "weight_pct": maybe_float(row[weight_idx]) if weight_idx is not None and len(row) > weight_idx else None,
                "rank": rank,
            })
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "tables": tables,
        "holdings": holdings,
    }


def parse_factsheet_page(html: str, page_url: str) -> Dict[str, Any]:
    soup = BeautifulSoup(html, "html.parser")
    iframe = soup.find(["iframe", "embed"], src=True)
    document_url = urljoin(page_url, iframe["src"]) if iframe else None
    if not document_url:
        html_text = str(soup)
        match = re.search(r"https?://[^\"']+\.pdf(?:\?[^\"']+)?", html_text, flags=re.I)
        if match:
            document_url = match.group(0)
    return {
        "morningstar_fund_id": extract_morningstar_fund_id(page_url),
        "scheme_url": canonicalize_scheme_url(page_url),
        "document_url": document_url,
    }


def merge_unique_dicts(items: Iterable[Dict[str, Any]], unique_key: str) -> List[Dict[str, Any]]:
    merged: List[Dict[str, Any]] = []
    seen: set[Any] = set()
    for item in items:
        key = item.get(unique_key)
        if key in seen:
            continue
        seen.add(key)
        merged.append(item)
    return merged
