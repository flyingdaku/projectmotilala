import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

// Map category to document types
const CATEGORY_MAP: Record<string, string[]> = {
    announcements: ['EXCHANGE_ANNOUNCEMENT', 'CORPORATE_ACTION'],
    reports: ['ANNUAL_REPORT', 'QUARTERLY_REPORT'],
    concalls: ['CONCALL_TRANSCRIPT', 'CONCALL_AUDIO'],
    ratings: ['CREDIT_RATING'],
    presentations: ['INVESTOR_PRESENTATION', 'EARNINGS_PRESENTATION'],
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol: rawSymbol } = await params;
        const symbol = rawSymbol.toUpperCase();
        const category = req.nextUrl.searchParams.get('category');
        const docType = req.nextUrl.searchParams.get('type');

        const stock = await adapter.stocks.getBySymbol(symbol);
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const assetId = String(stock.id);
        
        // Get documents based on category or type
        let documents;
        if (category && CATEGORY_MAP[category]) {
            // Fetch all document types for this category
            const allDocs = await Promise.all(
                CATEGORY_MAP[category].map(type => 
                    adapter.company.getDocuments(assetId, type)
                )
            );
            documents = allDocs.flat().sort((a, b) => 
                new Date(b.docDate).getTime() - new Date(a.docDate).getTime()
            );
        } else {
            documents = await adapter.company.getDocuments(assetId, docType || undefined);
        }

        return NextResponse.json({ documents });
    } catch (err) {
        console.error('[stock documents]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
