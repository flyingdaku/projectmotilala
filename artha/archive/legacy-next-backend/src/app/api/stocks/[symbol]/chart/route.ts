import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol: rawSymbol } = await params;
        const symbol = rawSymbol.toUpperCase();
        const range = req.nextUrl.searchParams.get('range') || '1y';

        const stock = await adapter.stocks.getBySymbol(symbol);
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const assetId = String(stock.id);
        const endDate = new Date().toISOString().slice(0, 10);
        const startDate = new Date(
            Date.now() - (range === '5y' ? 5 : range === '3y' ? 3 : range === '10y' ? 10 : 1) * 365 * 24 * 60 * 60 * 1000
        ).toISOString().slice(0, 10);

        const [prices, corpActions] = await Promise.all([
            adapter.prices.getPrices(stock.id, { startDate, endDate }),
            adapter.company.getCorporateActions(assetId, 50),
        ]);

        // Also get benchmark (Nifty 50) for comparison — best effort
        let benchmark: unknown[] = [];
        try {
            const nifty = await adapter.stocks.getBySymbol('NIFTY50');
            if (nifty) {
                benchmark = await adapter.prices.getPrices(nifty.id, { startDate, endDate });
            }
        } catch { /* benchmark is optional */ }

        return NextResponse.json({ prices, corpActions, benchmark });
    } catch (err) {
        console.error('[stock chart]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
