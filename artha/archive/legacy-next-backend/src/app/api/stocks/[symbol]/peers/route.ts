import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { buildDataMeta, getDatasetCoverage } from '@/lib/stock/presentation';

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

        const peers = await adapter.stocks.getPeers(symbol);

        return NextResponse.json({
            peers,
            meta: buildDataMeta({
                coverage: getDatasetCoverage(peers, [
                    (peer) => peer.peTtm,
                    (peer) => peer.pb,
                    (peer) => peer.roce,
                    (peer) => peer.roe,
                    (peer) => peer.marketCapCr,
                    (peer) => peer.revenueGrowth1y,
                ]),
                note: 'Peers are ranked using comparable business lines and available metrics.',
            }),
        });
    } catch (err) {
        console.error('[stock peers]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
