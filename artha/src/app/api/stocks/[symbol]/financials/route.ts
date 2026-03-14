import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { buildDataMeta, getCoverage } from '@/lib/stock/presentation';

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

        const { quarterly, annual, balanceSheet, cashFlow, ratios, anomalies } = await adapter.company.getFinancials(assetId, { consolidated });
        const coverage = getCoverage([
            quarterly.length ? quarterly : null,
            annual.length ? annual : null,
            balanceSheet.length ? balanceSheet : null,
            cashFlow.length ? cashFlow : null,
            ratios.length ? ratios : null,
        ]);

        return NextResponse.json({
            quarterly,
            annual,
            balanceSheets: balanceSheet,
            cashFlows: cashFlow,
            ratios,
            anomalies,
            meta: buildDataMeta({
                asOfCandidates: [
                    quarterly[0]?.periodEnd,
                    quarterly[0]?.quarter,
                    annual[0]?.periodEnd,
                    balanceSheet[0]?.periodEndDate,
                    cashFlow[0]?.periodEndDate,
                    ratios[0]?.periodEndDate,
                ],
                coverage,
                note: 'Financial statements are shown in ₹ Cr unless stated otherwise.',
                unitLabel: '₹ Cr unless stated',
            }),
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        const stack = err instanceof Error ? err.stack : undefined;
        console.error('[stock financials error]', message, stack);
        return NextResponse.json({ error: 'Internal error', details: message }, { status: 500 });
    }
}
