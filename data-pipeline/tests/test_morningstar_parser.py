from sources.morningstar.parser import (
    build_tab_urls,
    extract_fund_house_slug,
    extract_morningstar_fund_id,
    parse_directory_page,
    parse_factsheet_page,
    parse_overview_page,
    parse_performance_page,
    parse_risk_page,
)


DIRECTORY_HTML = """
<html>
  <body>
    <h1>Aditya Birla Sun Life AMC Ltd</h1>
    <table>
      <tr>
        <th>Fund Name</th><th>Category</th><th>Distribution Type</th><th>Structure</th><th>Latest NAV</th><th>NAV Date</th>
      </tr>
      <tr>
        <td><a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx">Aditya Birla Sun Life Small Cap Fund Growth</a></td>
        <td>Small-Cap</td>
        <td>Growth</td>
        <td>Open Ended</td>
        <td>80.3777</td>
        <td>Mar 18, 2026</td>
      </tr>
    </table>
  </body>
</html>
"""

OVERVIEW_HTML = """
<html>
  <head><title>Aditya Birla Sun Life Small Cap Fund Growth INF209K01EN2 | Morningstar India</title></head>
  <body>
    <h1>Aditya Birla Sun Life Small Cap Fund Growth INF209K01EN2</h1>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx">Overview</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/portfolio.aspx">Portfolio</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/performance.aspx">Performance</a>
    <a href="/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/riskrating.aspx">Risk & Rating</a>
    <div>Category : Small-Cap Distribution Type : Growth Structure : Open Ended Latest NAV : 80.3777 NAV Date : Mar 18, 2026 Benchmark : Nifty Smallcap 250 TRI</div>
  </body>
</html>
"""

PERFORMANCE_HTML = """
<html>
  <body>
    <h2>Trailing Returns</h2>
    <table>
      <tr><th>Period</th><th>Fund</th><th>Category</th><th>Benchmark</th><th>Quartile</th><th>% Rank</th><th># of Invest. in Category</th></tr>
      <tr><td>1 Year</td><td>12.5</td><td>8.1</td><td>9.4</td><td>1</td><td>92</td><td>117</td></tr>
      <tr><td>3 Years</td><td>18.2</td><td>14.5</td><td>16.9</td><td>1</td><td>88</td><td>104</td></tr>
    </table>
    <h2>Calendar Returns</h2>
    <table>
      <tr><th>Year</th><th>Fund</th><th>Category</th><th>Benchmark</th></tr>
      <tr><td>2024</td><td>24.1</td><td>19.8</td><td>21.0</td></tr>
    </table>
  </body>
</html>
"""

RISK_HTML = """
<html>
  <body>
    <table>
      <tr><th>Metric</th><th>Value</th></tr>
      <tr><td>Alpha</td><td>1.25</td></tr>
      <tr><td>Beta</td><td>0.91</td></tr>
      <tr><td>Sharpe Ratio</td><td>0.88</td></tr>
      <tr><td>Downside Capture Ratio</td><td>89.5</td></tr>
    </table>
    <div>Morningstar Risk High Star Rating 4</div>
  </body>
</html>
"""

FACTSHEET_HTML = """
<html>
  <body>
    <iframe src="/documents/factsheets/f000000i3x.pdf"></iframe>
  </body>
</html>
"""


def test_extract_ids_and_slugs():
    assert extract_morningstar_fund_id("https://www.morningstar.in/mutualfunds/f000000i3x/foo/overview.aspx") == "f000000i3x"
    assert extract_fund_house_slug("https://www.morningstar.in/funds/adityabirla.aspx") == "adityabirla"


def test_parse_directory_page_extracts_scheme_rows():
    parsed = parse_directory_page(DIRECTORY_HTML, "https://www.morningstar.in/funds/adityabirla.aspx")
    assert parsed["fund_house_slug"] == "adityabirla"
    assert parsed["fund_house_name"] == "Aditya Birla Sun Life AMC Ltd"
    assert len(parsed["rows"]) == 1
    row = parsed["rows"][0]
    assert row["morningstar_fund_id"] == "f000000i3x"
    assert row["category_name"] == "Small-Cap"
    assert row["distribution_type"] == "Growth"
    assert row["structure"] == "Open Ended"
    assert row["latest_nav"] == 80.3777


def test_parse_overview_page_extracts_ids_and_tabs():
    parsed = parse_overview_page(OVERVIEW_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/aditya-birla-sun-life-small-cap-fund-growth/overview.aspx")
    assert parsed["morningstar_fund_id"] == "f000000i3x"
    assert parsed["isin"] == "INF209K01EN2"
    assert parsed["scheme_name"] == "Aditya Birla Sun Life Small Cap Fund Growth"
    assert parsed["category_name"] == "Small-Cap"
    assert parsed["benchmark_name"] == "Nifty Smallcap 250 TRI"
    assert parsed["tabs"]["portfolio"].endswith("/portfolio.aspx")


def test_parse_performance_page_maps_trailing_and_calendar_returns():
    parsed = parse_performance_page(PERFORMANCE_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/performance.aspx")
    assert len(parsed["trailing_returns"]) == 2
    one_year = parsed["trailing_returns"][0]
    assert one_year["horizon_code"] == "1Y"
    assert one_year["fund_return"] == 12.5
    assert one_year["benchmark_return"] == 9.4
    assert one_year["peer_count"] == 117
    assert parsed["calendar_returns"][0]["period_label"] == "2024"


def test_parse_risk_page_maps_metrics():
    parsed = parse_risk_page(RISK_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/riskrating.aspx")
    metrics = parsed["risk_metrics"]
    assert metrics["alpha"] == 1.25
    assert metrics["beta"] == 0.91
    assert metrics["sharpe"] == 0.88
    assert metrics["downside_capture"] == 89.5
    assert metrics["star_rating"] == 4.0
    assert metrics["morningstar_risk_label"] == "High"


def test_parse_factsheet_page_extracts_pdf_url():
    parsed = parse_factsheet_page(FACTSHEET_HTML, "https://www.morningstar.in/mutualfunds/f000000i3x/foo/fund-factsheet.aspx")
    assert parsed["document_url"] == "https://www.morningstar.in/documents/factsheets/f000000i3x.pdf"


def test_build_tab_urls():
    tabs = build_tab_urls("https://www.morningstar.in/mutualfunds/f000000i3x/foo/overview.aspx")
    assert tabs["factsheet"].endswith("/fund-factsheet.aspx")
