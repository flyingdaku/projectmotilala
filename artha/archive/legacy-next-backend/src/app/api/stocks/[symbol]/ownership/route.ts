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

        const ownership = await adapter.company.getOwnership(assetId);
        const shareholding = Array.isArray(ownership?.shareholding) ? ownership.shareholding : [];
        const governance = ownership?.governance ?? null;
        return NextResponse.json({
            shareholding,
            governance,
            meta: buildDataMeta({
                asOfCandidates: [shareholding[0]?.quarterEnd, shareholding[0]?.quarter],
                coverage: getCoverage([
                    shareholding.length ? shareholding : null,
                    governance?.overallScore ?? governance?.overall ?? null,
                    governance?.independentDirectorsPct ?? null,
                ]),
                note: 'Ownership updates are quarterly; governance fields may be partial.',
            }),
        });
    } catch (err) {
        console.error('[stock ownership]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
