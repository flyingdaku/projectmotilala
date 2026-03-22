import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { buildDataMeta, getCoverage, getObjectCoverage } from '@/lib/stock/presentation';

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

        const [detail, profile, corpActions, events] = await Promise.all([
            adapter.stocks.getDetail(symbol),
            adapter.company.getProfile(assetId),
            adapter.company.getCorporateActions(assetId, 10),
            adapter.company.getEvents(assetId, 10),
        ]);

        const heroCoverage = detail
            ? getObjectCoverage(detail as unknown as Record<string, unknown>, [
                'price',
                'marketCapCr',
                'pe',
                'roce',
                'roe',
                'avgVolume',
                'high52w',
                'low52w',
            ])
            : 0;

        const overviewCoverage = getCoverage([
            detail?.sector,
            detail?.industry,
            profile?.descriptionShort,
            profile?.website,
            profile?.foundedYear,
            profile?.headquarters,
            profile?.employees,
            profile?.businessSegments?.length ? profile.businessSegments : null,
            profile?.indexMemberships?.length ? profile.indexMemberships : null,
        ]);

        return NextResponse.json({
            stock: detail,
            profile,
            corpActions,
            events,
            meta: {
                hero: buildDataMeta({
                    asOfCandidates: [detail?.priceDate, events[0]?.eventDate, corpActions[0]?.exDate],
                    coverage: heroCoverage,
                    status: detail?.price != null ? 'delayed' : 'partial',
                    note: 'Quote and key metrics are delayed.',
                }),
                overview: buildDataMeta({
                    asOfCandidates: [events[0]?.eventDate, corpActions[0]?.exDate, detail?.listedDate],
                    coverage: overviewCoverage,
                    note: 'Business profile combines exchange metadata and enriched reference data.',
                }),
            },
        });
    } catch (err) {
        console.error('[stock overview]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
