import { NextRequest, NextResponse } from "next/server";
import { getDataAdapter } from "@/lib/data";
import { calculateRRGPoint, shouldIncludeInRRG, DEFAULT_RRG_FILTERS } from "@/lib/utils/rrg";
import type { RRGDataPoint } from "@/lib/utils/rrg";

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

/**
 * GET /api/sectors/hierarchy
 * 
 * Query params:
 * - level: sector | industry_group | industry | sub_industry
 * - path: comma-separated parent IDs (e.g., "Energy,Oil-Gas-Consumable-Fuels")
 * - period: 1D | 1W | 1M | 3M | 6M | 1Y | 3Y
 * 
 * Returns:
 * - nodes: Array of HierarchyNode at the requested level
 * - rrgData: Array of RRGDataPoint for RRG plot
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const level = (searchParams.get("level") || "sector") as HierarchyLevel;
    const path = searchParams.get("path") || "";
    const period = (searchParams.get("period") || "1M") as Period;

    const adapter = getDataAdapter();
    
    // For now, return mock data until we implement real database queries
    // In production, this would query the assets table with sector/industry_group/industry/sub_industry fields
    
    const mockNodes = await generateMockHierarchyData(level, path, period);
    const mockRRGData = await generateMockRRGData(level, path, period);

    return NextResponse.json({
      nodes: mockNodes,
      rrgData: mockRRGData,
      level,
      path,
      period,
    });
  } catch (error) {
    console.error("Error fetching sector hierarchy:", error);
    return NextResponse.json(
      { error: "Failed to fetch sector hierarchy data" },
      { status: 500 }
    );
  }
}

/**
 * Generate mock hierarchy data
 * TODO: Replace with real database queries
 */
async function generateMockHierarchyData(
  level: HierarchyLevel,
  path: string,
  period: Period
): Promise<HierarchyNode[]> {
  // Mock data for demonstration
  // In production, query the database:
  // SELECT sector, COUNT(*) as stock_count, AVG(pe) as avg_pe, SUM(market_cap_cr) as total_mcap
  // FROM assets WHERE asset_class = 'EQUITY' AND is_active = 1
  // GROUP BY sector
  
  if (level === "sector") {
    return [
      {
        id: "Energy",
        name: "Energy",
        code: "IN03",
        level: "sector",
        returns: { "1D": 0.6, "1W": -1.2, "1M": 3.1, "3M": 8.9, "6M": 14.4, "1Y": 24.8, "3Y": 61.3 },
        pe: 12.8,
        pb: 1.9,
        marketCapCr: 1580000,
        marketCapPct: 15.8,
        stockCount: 42,
      },
      {
        id: "Information Technology",
        name: "Information Technology",
        code: "IN09",
        level: "sector",
        returns: { "1D": 1.4, "1W": 3.2, "1M": 7.8, "3M": 14.2, "6M": 22.1, "1Y": 38.4, "3Y": 89.2 },
        pe: 28.4,
        pb: 7.1,
        marketCapCr: 1840000,
        marketCapPct: 18.4,
        stockCount: 128,
      },
      {
        id: "Financials",
        name: "Financials",
        code: "IN04",
        level: "sector",
        returns: { "1D": -0.8, "1W": 1.1, "1M": -2.4, "3M": 4.8, "6M": 9.2, "1Y": 18.6, "3Y": 42.1 },
        pe: 16.2,
        pb: 2.4,
        marketCapCr: 2210000,
        marketCapPct: 22.1,
        stockCount: 312,
      },
      {
        id: "Consumer Discretionary",
        name: "Consumer Discretionary",
        code: "IN02",
        level: "sector",
        returns: { "1D": -1.2, "1W": -2.8, "1M": -4.1, "3M": 2.4, "6M": 8.8, "1Y": 22.4, "3Y": 68.9 },
        pe: 22.8,
        pb: 4.1,
        marketCapCr: 540000,
        marketCapPct: 5.4,
        stockCount: 186,
      },
      {
        id: "Health Care",
        name: "Health Care",
        code: "IN05",
        level: "sector",
        returns: { "1D": 2.1, "1W": 4.8, "1M": 9.2, "3M": 18.4, "6M": 28.6, "1Y": 52.1, "3Y": 112.4 },
        pe: 31.4,
        pb: 5.2,
        marketCapCr: 680000,
        marketCapPct: 6.8,
        stockCount: 94,
      },
      {
        id: "Materials",
        name: "Materials",
        code: "IN08",
        level: "sector",
        returns: { "1D": -2.4, "1W": -4.1, "1M": -8.2, "3M": -6.4, "6M": 4.2, "1Y": 12.8, "3Y": 38.4 },
        pe: 9.4,
        pb: 1.4,
        marketCapCr: 480000,
        marketCapPct: 4.8,
        stockCount: 156,
      },
      {
        id: "Real Estate",
        name: "Real Estate",
        code: "IN10",
        level: "sector",
        returns: { "1D": 1.8, "1W": 3.4, "1M": 8.4, "3M": 19.2, "6M": 32.4, "1Y": 64.8, "3Y": 148.2 },
        pe: 38.4,
        pb: 3.8,
        marketCapCr: 320000,
        marketCapPct: 3.2,
        stockCount: 78,
      },
      {
        id: "Industrials",
        name: "Industrials",
        code: "IN06",
        level: "sector",
        returns: { "1D": 0.9, "1W": 1.8, "1M": 4.2, "3M": 10.8, "6M": 18.4, "1Y": 34.2, "3Y": 82.4 },
        pe: 28.1,
        pb: 4.2,
        marketCapCr: 410000,
        marketCapPct: 4.1,
        stockCount: 224,
      },
      {
        id: "Consumer Staples",
        name: "Consumer Staples",
        code: "IN01",
        level: "sector",
        returns: { "1D": 0.3, "1W": 0.8, "1M": 1.9, "3M": 5.2, "6M": 11.8, "1Y": 19.4, "3Y": 47.8 },
        pe: 42.1,
        pb: 9.8,
        marketCapCr: 820000,
        marketCapPct: 8.2,
        stockCount: 142,
      },
      {
        id: "Communication Services",
        name: "Communication Services",
        code: "IN11",
        level: "sector",
        returns: { "1D": 0.2, "1W": -0.8, "1M": 2.1, "3M": 6.8, "6M": 14.2, "1Y": 28.4, "3Y": 71.2 },
        pe: 44.8,
        pb: 6.8,
        marketCapCr: 720000,
        marketCapPct: 7.2,
        stockCount: 48,
      },
    ];
  }
  
  // Mock industry groups for Energy sector
  if (level === "industry_group" && path.includes("Energy")) {
    return [
      {
        id: "Oil-Gas-Consumable-Fuels",
        name: "Oil, Gas & Consumable Fuels",
        code: "IN0301",
        level: "industry_group",
        returns: { "1D": 0.8, "1W": -0.9, "1M": 3.8, "3M": 9.4, "6M": 15.2, "1Y": 26.1, "3Y": 64.2 },
        pe: 11.2,
        pb: 1.7,
        marketCapCr: 1420000,
        marketCapPct: 89.9,
        stockCount: 38,
      },
      {
        id: "Energy-Equipment-Services",
        name: "Energy Equipment & Services",
        code: "IN0302",
        level: "industry_group",
        returns: { "1D": -0.4, "1W": -2.1, "1M": 0.8, "3M": 6.2, "6M": 11.4, "1Y": 18.9, "3Y": 42.1 },
        pe: 18.4,
        pb: 2.8,
        marketCapCr: 160000,
        marketCapPct: 10.1,
        stockCount: 4,
      },
    ];
  }

  // Return empty array for other levels (to be implemented)
  return [];
}

/**
 * Generate mock RRG data
 * TODO: Replace with real calculations based on price history
 */
async function generateMockRRGData(
  level: HierarchyLevel,
  path: string,
  period: Period
): Promise<RRGDataPoint[]> {
  // Mock RRG data
  // In production, calculate RS and RS-Momentum from actual price data
  
  if (level === "sector") {
    return [
      {
        id: "Energy",
        name: "Energy",
        rs: 98.2,
        rsRatio: 98.5,
        rsMomentum: -1.2,
        quadrant: "lagging",
        color: "#EF4444",
        size: 1580,
      },
      {
        id: "Information Technology",
        name: "IT",
        rs: 112.4,
        rsRatio: 108.2,
        rsMomentum: 2.8,
        quadrant: "leading",
        color: "#10B981",
        size: 1840,
      },
      {
        id: "Financials",
        name: "Financials",
        rs: 95.8,
        rsRatio: 97.2,
        rsMomentum: 0.8,
        quadrant: "improving",
        color: "#3B82F6",
        size: 2210,
      },
      {
        id: "Consumer Discretionary",
        name: "Cons. Disc.",
        rs: 88.4,
        rsRatio: 92.1,
        rsMomentum: -2.4,
        quadrant: "lagging",
        color: "#EF4444",
        size: 540,
      },
      {
        id: "Health Care",
        name: "Healthcare",
        rs: 118.6,
        rsRatio: 112.4,
        rsMomentum: 3.8,
        quadrant: "leading",
        color: "#10B981",
        size: 680,
      },
      {
        id: "Materials",
        name: "Materials",
        rs: 84.2,
        rsRatio: 88.6,
        rsMomentum: -3.2,
        quadrant: "lagging",
        color: "#EF4444",
        size: 480,
      },
      {
        id: "Real Estate",
        name: "Real Estate",
        rs: 124.8,
        rsRatio: 115.2,
        rsMomentum: 4.2,
        quadrant: "leading",
        color: "#10B981",
        size: 320,
      },
      {
        id: "Industrials",
        name: "Industrials",
        rs: 106.4,
        rsRatio: 104.8,
        rsMomentum: 1.4,
        quadrant: "leading",
        color: "#10B981",
        size: 410,
      },
      {
        id: "Consumer Staples",
        name: "Cons. Staples",
        rs: 102.1,
        rsRatio: 101.4,
        rsMomentum: -0.6,
        quadrant: "weakening",
        color: "#F59E0B",
        size: 820,
      },
      {
        id: "Communication Services",
        name: "Comm. Services",
        rs: 108.2,
        rsRatio: 105.6,
        rsMomentum: -1.8,
        quadrant: "weakening",
        color: "#F59E0B",
        size: 720,
      },
    ];
  }

  return [];
}
