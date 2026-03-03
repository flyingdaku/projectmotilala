import { NextRequest, NextResponse } from 'next/server';
import { getChartingDB } from '@/lib/charting/db';

const ANON_USER = 'anon';
function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string; tf: string }> }
) {
  try {
    const { symbol, tf } = await params;
    const userId = getUserId(req);
    const drawings = await getChartingDB().drawings.get(userId, symbol.toUpperCase(), tf);
    return NextResponse.json({ drawings });
  } catch (err) {
    console.error('[charts/drawings GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string; tf: string }> }
) {
  try {
    const { symbol, tf } = await params;
    const userId = getUserId(req);
    const { drawings } = await req.json();
    await getChartingDB().drawings.save(userId, symbol.toUpperCase(), tf, drawings ?? []);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/drawings POST]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string; tf: string }> }
) {
  try {
    const { symbol, tf } = await params;
    const userId = getUserId(req);
    await getChartingDB().drawings.clear(userId, symbol.toUpperCase(), tf);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/drawings DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
