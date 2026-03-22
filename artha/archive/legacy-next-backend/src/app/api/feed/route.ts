import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';
import { getAuthenticatedUserId } from '@/lib/server/auth';

export async function GET(req: NextRequest) {
    try {
        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const adapter = await getDataAdapter();
        const limit = Number(req.nextUrl.searchParams.get('limit') ?? '50');
        const offset = Number(req.nextUrl.searchParams.get('offset') ?? '0');
        const feed = await adapter.feed.getUserFeed(userId, limit, offset);
        const unreadCount = feed.filter((item) => !item.isRead).length;

        return NextResponse.json({ feed, unreadCount });
    } catch (err) {
        console.error('[feed GET]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = await getAuthenticatedUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const adapter = await getDataAdapter();
        const body = await req.json();
        const { eventIds } = body;

        if (Array.isArray(eventIds)) {
            await adapter.feed.markAsRead(userId, eventIds);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[feed POST]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
