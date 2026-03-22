import { NextRequest, NextResponse } from "next/server";
import { determineQuadrant, getQuadrantColor, type RRGDataPoint } from "@/lib/utils/rrg";
import { pgDb } from "@/lib/data/db-postgres";

type HierarchyLevel = "sector" | "industry_group" | "industry" | "sub_industry";
type Period = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "3Y";

interface HierarchyNode {
  id: string;
  name: string;
  code: string;
  level: HierarchyLevel;
  returns: Record<Period, number>;
  pe?: number;
  pb?: number;
  marketCapCr?: number;
  marketCapPct?: number;
  stockCount: number;
  avgVolume?: number;
}

type HierarchyRow = {
  name: string;
  stock_count: string | number;
  market_cap_cr: number | null;
  pe: number | null;
  pb: number | null;
  return_1d: number | null;
  return_1w: number | null;
  return_1m: number | null;
  return_3m: number | null;
  return_6m: number | null;
  return_1y: number | null;
  return_3y: number | null;
};

const LEVEL_COLUMNS: Record<HierarchyLevel, string> = {
  sector: "a.sector",
  industry_group: "a.industry_group",
  industry: "a.industry",
  sub_industry: "a.sub_industry",
};

const PARENT_CHAIN: Record<HierarchyLevel, string[]> = {
  sector: [],
  industry_group: ["a.sector"],
  industry: ["a.sector", "a.industry_group"],
  sub_industry: ["a.sector", "a.industry_group", "a.industry"],
};

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toNumber(value: number | string | null | undefined): number {
  return value == null ? 0 : Number(value);
}

function round(value: number | null | undefined, digits = 2): number {
  if (value == null || Number.isNaN(value)) return 0;
  return Number(value.toFixed(digits));
}

function getMomentumPeriod(period: Period): Period {
  switch (period) {
    case "1D":
      return "1W";
    case "1W":
      return "1M";
    case "1M":
      return "3M";
    case "3M":
      return "6M";
    case "6M":
      return "1Y";
    case "1Y":
      return "3Y";
    case "3Y":
      return "1Y";
  }
}

function buildWhere(level: HierarchyLevel, path: string, params: string[]) {
  const where = [
    "a.is_active = 1",
    "a.asset_class = 'EQUITY'",
    `${LEVEL_COLUMNS[level]} IS NOT NULL`,
  ];

  const pathSegments = path.split(",").map((segment) => segment.trim()).filter(Boolean);
  const parentColumns = PARENT_CHAIN[level];

  parentColumns.forEach((column, index) => {
    if (!pathSegments[index]) return;
    params.push(pathSegments[index]);
    where.push(`${column} = $${params.length}`);
  });

  return where;
}

function buildNode(level: HierarchyLevel, row: HierarchyRow, totalMarketCapCr: number): HierarchyNode {
  const marketCapCr = row.market_cap_cr ?? 0;
  return {
    id: row.name,
    name: row.name,
    code: slugify(row.name),
    level,
    returns: {
      "1D": round(row.return_1d),
      "1W": round(row.return_1w),
      "1M": round(row.return_1m),
      "3M": round(row.return_3m),
      "6M": round(row.return_6m),
      "1Y": round(row.return_1y),
      "3Y": round(row.return_3y),
    },
    pe: row.pe ?? undefined,
    pb: row.pb ?? undefined,
    marketCapCr,
    marketCapPct: totalMarketCapCr > 0 ? round((marketCapCr / totalMarketCapCr) * 100, 1) : undefined,
    stockCount: toNumber(row.stock_count),
  };
}

function buildRRGData(nodes: HierarchyNode[], period: Period): RRGDataPoint[] {
  if (nodes.length === 0) return [];
  const benchmark = nodes.reduce((sum, node) => sum + node.returns[period], 0) / nodes.length;
  const momentumPeriod = getMomentumPeriod(period);

  return nodes
    .filter((node) => (node.marketCapCr ?? 0) > 0)
    .map((node) => {
      const rsRatio = 100 + (node.returns[period] - benchmark);
      const rsMomentum = node.returns[period] - node.returns[momentumPeriod];
      const quadrant = determineQuadrant(rsRatio, rsMomentum);

      return {
        id: node.id,
        name: node.name,
        rs: node.returns[period],
        rsRatio: round(rsRatio),
        rsMomentum: round(rsMomentum),
        quadrant,
        color: getQuadrantColor(quadrant),
        size: node.marketCapCr,
      };
    });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = (searchParams.get("level") || "sector") as HierarchyLevel;
    const path = searchParams.get("path") || "";
    const period = (searchParams.get("period") || "1M") as Period;

    const params: string[] = [];
    const where = buildWhere(level, path, params);
    const groupColumn = LEVEL_COLUMNS[level];

    const rows = await pgDb.queryAll<HierarchyRow>(
      `SELECT ${groupColumn} AS name,
              COUNT(*) AS stock_count,
              SUM(
                COALESCE(
                  cr.market_cap_cr,
                  CASE WHEN am.market_cap IS NOT NULL THEN am.market_cap / 10000000.0 END,
                  CASE WHEN m.market_cap IS NOT NULL THEN m.market_cap / 10000000.0 END,
                  0
                )
              ) AS market_cap_cr,
              AVG(COALESCE(cr.pe_ttm, am.pe_ratio, m.pe_ratio)) AS pe,
              AVG(COALESCE(cr.pb, am.pb_ratio)) AS pb,
              AVG(am.return_1d) AS return_1d,
              AVG(am.return_1w) AS return_1w,
              AVG(am.return_1m) AS return_1m,
              AVG(am.return_3m) AS return_3m,
              AVG(am.return_6m) AS return_6m,
              AVG(am.return_1y) AS return_1y,
              AVG(am.return_3y) AS return_3y
       FROM assets a
       LEFT JOIN asset_metrics am ON am.asset_id = a.id
       LEFT JOIN computed_ratios cr ON cr.asset_id = a.id
       LEFT JOIN msi_company_data m ON m.asset_id = a.id
       WHERE ${where.join(" AND ")}
       GROUP BY ${groupColumn}
       ORDER BY market_cap_cr DESC NULLS LAST, name ASC`,
      params,
    );

    const totalMarketCapCr = rows.reduce((sum, row) => sum + (row.market_cap_cr ?? 0), 0);
    const nodes = rows.map((row) => buildNode(level, row, totalMarketCapCr));
    const rrgData = buildRRGData(nodes, period);

    return NextResponse.json({
      nodes,
      rrgData,
      level,
      path,
      period,
    });
  } catch (error) {
    console.error("Error fetching sector hierarchy:", error);
    return NextResponse.json(
      { error: "Failed to fetch sector hierarchy data" },
      { status: 500 },
    );
  }
}
