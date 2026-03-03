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
        const consolidated = req.nextUrl.searchParams.get('consolidated') !== 'false';

        const stock = await adapter.stocks.getBySymbol(symbol);
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const assetId = String(stock.id);

        const { quarterly, balanceSheet, cashFlow } = await adapter.company.getFinancials(assetId);
        return NextResponse.json({ quarterly, annual: quarterly, balanceSheets: balanceSheet, cashFlows: cashFlow, ratios: [] });
    } catch (err) {
        console.error('[stock financials]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
