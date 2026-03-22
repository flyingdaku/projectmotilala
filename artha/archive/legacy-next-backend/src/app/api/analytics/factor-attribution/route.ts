import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

/**
 * POST /api/analytics/factor-attribution
 * Body: { holdings: { symbol: string; weight: number }[] }
 *
 * Returns portfolio-level weighted-average Carhart 4-factor exposure
 * by fetching per-symbol analytics and blending by weight.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { holdings?: { symbol: string; weight: number }[] };
        const holdings = body.holdings;

        if (!Array.isArray(holdings) || holdings.length === 0) {
            return NextResponse.json({ error: 'holdings[] required' }, { status: 400 });
        }

        const totalWeight = holdings.reduce((s, h) => s + (h.weight ?? 0), 0);
        if (totalWeight <= 0) {
            return NextResponse.json({ error: 'holdings weights must sum to > 0' }, { status: 400 });
        }

        const adapter = await getDataAdapter();

        // Normalise weights to fractions
        const items = holdings.map(h => ({ ...h, w: h.weight / totalWeight }));

        let portAlpha = 0;
        let portBeta = 0;
        let portSmb = 0;
        let portHml = 0;
        let portWml = 0;
        let portR2 = 0;
        let coveredWeight = 0;

        const lines: {
            symbol: string;
            weight: number;
            alpha: number | null;
            marketBeta: number | null;
            smbLoading: number | null;
            hmlLoading: number | null;
            wmlLoading: number | null;
            rSquared: number | null;
            sampleSize: number | null;
            error?: string;
        }[] = [];

        for (const item of items) {
            const sym = item.symbol.toUpperCase();
            try {
                const stock = await adapter.stocks.getBySymbol(sym);
                if (!stock) {
                    lines.push({ symbol: sym, weight: item.w, alpha: null, marketBeta: null, smbLoading: null, hmlLoading: null, wmlLoading: null, rSquared: null, sampleSize: null, error: 'Not found' });
                    continue;
                }
                const data = await adapter.company.getAnalytics(String(stock.id));
                const fe = data.factorExposure;
                lines.push({
                    symbol: sym,
                    weight: item.w,
                    alpha: fe?.alpha ?? null,
                    marketBeta: fe?.marketBeta ?? null,
                    smbLoading: fe?.smbLoading ?? null,
                    hmlLoading: fe?.hmlLoading ?? null,
                    wmlLoading: fe?.wmlLoading ?? null,
                    rSquared: fe?.rSquared ?? null,
                    sampleSize: fe?.sampleSize ?? null,
                });
                if (fe) {
                    portAlpha += (fe.alpha ?? 0) * item.w;
                    portBeta  += (fe.marketBeta ?? 0) * item.w;
                    portSmb   += (fe.smbLoading ?? 0) * item.w;
                    portHml   += (fe.hmlLoading ?? 0) * item.w;
                    portWml   += (fe.wmlLoading ?? 0) * item.w;
                    portR2    += (fe.rSquared ?? 0) * item.w;
                    coveredWeight += item.w;
                }
            } catch {
                lines.push({ symbol: sym, weight: item.w, alpha: null, marketBeta: null, smbLoading: null, hmlLoading: null, wmlLoading: null, rSquared: null, sampleSize: null, error: 'Internal error' });
            }
        }

        // Re-normalise portfolio metrics to covered weight
        if (coveredWeight > 0 && coveredWeight < 1) {
            const scale = 1 / coveredWeight;
            portAlpha *= scale;
            portBeta  *= scale;
            portSmb   *= scale;
            portHml   *= scale;
            portWml   *= scale;
            portR2    *= scale;
        }

        return NextResponse.json({
            portfolio: {
                alpha: +portAlpha.toFixed(4),
                marketBeta: +portBeta.toFixed(3),
                smbLoading: +portSmb.toFixed(3),
                hmlLoading: +portHml.toFixed(3),
                wmlLoading: +portWml.toFixed(3),
                avgRSquared: +portR2.toFixed(3),
                coveredWeight: +coveredWeight.toFixed(4),
                holdingCount: lines.length,
            },
            holdings: lines,
        });
    } catch (err) {
        console.error('[factor-attribution]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
