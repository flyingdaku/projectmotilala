import { NextRequest, NextResponse } from 'next/server';
import { getDataAdapter } from '@/lib/data';

const MOCK_USER_ID = 'user_demo';

export async function GET(req: NextRequest) {
    try {
        const adapter = await getDataAdapter();
        const limit = Number(req.nextUrl.searchParams.get('limit') ?? '50');
        const offset = Number(req.nextUrl.searchParams.get('offset') ?? '0');

        const [feed, unreadCount] = await Promise.all([
            adapter.feed.getUserFeed(MOCK_USER_ID, limit, offset),
            adapter.feed.getUnreadCount(MOCK_USER_ID),
        ]);

        return NextResponse.json({ feed, unreadCount });
    } catch (err) {
        console.error('[feed GET]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const adapter = await getDataAdapter();
        const body = await req.json();
        const { eventIds } = body;

        if (Array.isArray(eventIds)) {
            await adapter.feed.markAsRead(MOCK_USER_ID, eventIds);
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('[feed POST]', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
