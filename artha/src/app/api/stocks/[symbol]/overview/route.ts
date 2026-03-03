import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

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

        return NextResponse.json({ stock: detail, profile, corpActions, events });
    } catch (err) {
        console.error('[stock overview]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
