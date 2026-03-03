import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

const MOCK_USER_ID = 'user_demo';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const status = await adapter.follow.getStatus(MOCK_USER_ID, symbol);
        return NextResponse.json(status);
    } catch (err) {
        console.error('[follow GET]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const body = await req.json().catch(() => ({}));
        const alertConfig = body.alertConfig;

        await adapter.follow.follow(MOCK_USER_ID, symbol, alertConfig);
        return NextResponse.json({ isFollowing: true });
    } catch (err) {
        console.error('[follow POST]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        await adapter.follow.unfollow(MOCK_USER_ID, symbol);
        return NextResponse.json({ isFollowing: false });
    } catch (err) {
        console.error('[follow DELETE]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
