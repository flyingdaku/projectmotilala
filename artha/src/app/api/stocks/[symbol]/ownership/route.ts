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

        const { shareholding, governance } = await adapter.company.getOwnership(assetId);
        return NextResponse.json({ shareholding, governance });
    } catch (err) {
        console.error('[stock ownership]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
