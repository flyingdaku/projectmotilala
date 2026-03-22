import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { buildDataMeta, getCoverage } from '@/lib/stock/presentation';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol: rawSymbol } = await params;
        const symbol = rawSymbol.toUpperCase();

        const stock = await adapter.stocks.getBySymbol(symbol);
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const assetId = String(stock.id);

        const data = await adapter.company.getAnalytics(assetId);
        return NextResponse.json({
            ...data,
            meta: buildDataMeta({
                asOfCandidates: [
                    data.ratios?.computedDate,
                    data.ratioHistory?.[0]?.computedDate as string | null | undefined,
                    data.factorContext?.latestSnapshots?.[0]?.asOf,
                    data.factorExposure?.regressionEndDate,
                ],
                coverage: getCoverage([
                    data.factorExposure,
                    data.factorContext?.latestSnapshots?.length ? data.factorContext.latestSnapshots : null,
                    data.earningsQuality,
                    data.ratioHistory?.length ? data.ratioHistory : null,
                    data.ratios,
                ]),
                note: 'Derived ratios and factor exposures use adjusted local market data.',
            }),
        });
    } catch (err) {
        console.error('[stock analytics]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
