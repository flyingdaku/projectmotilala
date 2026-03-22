import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { getAuthenticatedUserId } from '@/lib/server/auth';

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ symbol: string }> }
) {
    try {
        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const status = await adapter.follow.getStatus(userId, symbol);
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
        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const body = await req.json().catch(() => ({}));
        const alertConfig = body.alertConfig;

        await adapter.follow.follow(userId, symbol, alertConfig);
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
        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const adapter = await getDataAdapter();
        const { symbol } = await params;
        const stock = await adapter.stocks.getBySymbol(symbol.toUpperCase());
        if (!stock) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        await adapter.follow.unfollow(userId, symbol);
        return NextResponse.json({ isFollowing: false });
    } catch (err) {
        console.error('[follow DELETE]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
