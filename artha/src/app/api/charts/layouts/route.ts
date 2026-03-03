import { NextRequest, NextResponse } from 'next/server';
import { getChartingDB } from '@/lib/charting/db';

const ANON_USER = 'anon';

function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const layouts = await getChartingDB().layouts.list(userId);
    return NextResponse.json({ layouts });
  } catch (err) {
    console.error('[charts/layouts GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = await req.json();
    const layout = await getChartingDB().layouts.save(userId, body);
    return NextResponse.json({ layout });
  } catch (err) {
    console.error('[charts/layouts POST]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
