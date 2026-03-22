import { NextRequest, NextResponse } from "next/server";
import { getDataAdapter } from "@/lib/data";
import type { PeerComparison, PriceBar } from "@/lib/data/types";

type Period = "1y" | "3y" | "5y";

type ReturnMap = Map<string, number>;

function getPeriodStart(period: Period): string {
  const now = new Date();
  const start = new Date(now);
  if (period === "1y") start.setFullYear(now.getFullYear() - 1);
  else if (period === "5y") start.setFullYear(now.getFullYear() - 5);
  else start.setFullYear(now.getFullYear() - 3);
  return start.toISOString().split("T")[0];
}

function minOverlapForPeriod(period: Period): number {
  if (period === "1y") return 80;
  if (period === "5y") return 240;
  return 160;
}

function buildReturnMap(series: PriceBar[]): ReturnMap {
  const returns = new Map<string, number>();
  for (let index = 1; index < series.length; index += 1) {
    const prev = series[index - 1];
    const current = series[index];
    if (!prev?.close || !current?.close || prev.close <= 0 || current.close <= 0) continue;
    returns.set(current.date, Math.log(current.close / prev.close));
  }
  return returns;
}

function pearsonCorrelation(x: number[], y: number[]): number | null {
  if (x.length !== y.length || x.length < 2) return null;
  const n = x.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  for (let i = 0; i < n; i += 1) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }
  const numerator = (n * sumXY) - (sumX * sumY);
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  if (denominator === 0) return null;
  return numerator / denominator;
}

function computePairCorrelation(left: ReturnMap, right: ReturnMap, minOverlap: number) {
  const sharedDates = [...left.keys()].filter((date) => right.has(date)).sort();
  if (sharedDates.length < minOverlap) {
    return { correlation: null, overlapDays: sharedDates.length };
  }

  const x: number[] = [];
  const y: number[] = [];
  for (const date of sharedDates) {
    x.push(left.get(date)!);
    y.push(right.get(date)!);
  }

  return {
    correlation: pearsonCorrelation(x, y),
    overlapDays: sharedDates.length,
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol: rawSymbol } = await params;
    const symbol = rawSymbol.toUpperCase();
    const period = (req.nextUrl.searchParams.get("period") ?? "3y").toLowerCase() as Period;
    const resolvedPeriod: Period = ["1y", "3y", "5y"].includes(period) ? period : "3y";
    const limit = Math.min(Math.max(Number(req.nextUrl.searchParams.get("limit") ?? "5"), 3), 6);

    const adapter = await getDataAdapter();

    const stock = await adapter.stocks.getBySymbol(symbol);
    if (!stock) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const allPeers = await adapter.stocks.getPeers(symbol);
    const peers = [...allPeers]
      .sort((a, b) => (b.marketCapCr ?? -1) - (a.marketCapCr ?? -1))
      .slice(0, limit);

    const startDate = getPeriodStart(resolvedPeriod);
    const endDate = new Date().toISOString().split("T")[0];
    const minOverlap = minOverlapForPeriod(resolvedPeriod);

    const subjectSeries = await adapter.prices.getPrices(stock.id, { startDate, endDate });
    const subjectReturns = buildReturnMap(subjectSeries);

    const seriesBySymbol = new Map<string, ReturnMap>();
    seriesBySymbol.set(symbol, subjectReturns);

    const peerRows: Array<PeerComparison & { correlation: number | null; overlapDays: number }> = [];

    for (const peer of peers) {
      const peerSymbol = peer.nseSymbol ?? peer.symbol;
      const peerSummary = await adapter.stocks.getBySymbol(peerSymbol);
      if (!peerSummary) continue;

      const peerSeries = await adapter.prices.getPrices(peerSummary.id, { startDate, endDate });
      const peerReturns = buildReturnMap(peerSeries);
      seriesBySymbol.set(peerSymbol, peerReturns);

      const pair = computePairCorrelation(subjectReturns, peerReturns, minOverlap);
      peerRows.push({
        ...peer,
        correlation: pair.correlation != null ? +pair.correlation.toFixed(2) : null,
        overlapDays: pair.overlapDays,
      });
    }

    const matrixSymbols = [symbol, ...peerRows.map((peer) => peer.nseSymbol ?? peer.symbol)];
    const matrix: Record<string, Record<string, number | null>> = {};
    const overlap: Record<string, Record<string, number>> = {};

    for (const leftSymbol of matrixSymbols) {
      matrix[leftSymbol] = {};
      overlap[leftSymbol] = {};
      for (const rightSymbol of matrixSymbols) {
        if (leftSymbol === rightSymbol) {
          matrix[leftSymbol][rightSymbol] = 1;
          overlap[leftSymbol][rightSymbol] = seriesBySymbol.get(leftSymbol)?.size ?? 0;
          continue;
        }
        const pair = computePairCorrelation(
          seriesBySymbol.get(leftSymbol) ?? new Map(),
          seriesBySymbol.get(rightSymbol) ?? new Map(),
          minOverlap
        );
        matrix[leftSymbol][rightSymbol] = pair.correlation != null ? +pair.correlation.toFixed(2) : null;
        overlap[leftSymbol][rightSymbol] = pair.overlapDays;
      }
    }

    const validPeerRows = peerRows.filter((peer) => peer.correlation != null);
    const sortedByCorrelation = [...validPeerRows].sort((a, b) => (b.correlation ?? -1) - (a.correlation ?? -1));
    const closestPeer = sortedByCorrelation[0] ?? null;
    const diversifier = sortedByCorrelation.at(-1) ?? null;
    const averageCorrelation = validPeerRows.length > 0
      ? +(validPeerRows.reduce((sum, row) => sum + (row.correlation ?? 0), 0) / validPeerRows.length).toFixed(2)
      : null;

    return NextResponse.json({
      period: resolvedPeriod,
      minOverlap,
      subject: {
        symbol,
        name: stock.name,
      },
      summary: {
        closestPeer: closestPeer
          ? {
              symbol: closestPeer.nseSymbol ?? closestPeer.symbol,
              name: closestPeer.name,
              correlation: closestPeer.correlation,
            }
          : null,
        diversifier: diversifier
          ? {
              symbol: diversifier.nseSymbol ?? diversifier.symbol,
              name: diversifier.name,
              correlation: diversifier.correlation,
            }
          : null,
        averageCorrelation,
      },
      peers: peerRows,
      matrixSymbols,
      matrix,
      overlap,
    });
  } catch (error) {
    console.error("[stock peer correlations]", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
