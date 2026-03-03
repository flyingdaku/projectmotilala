import { NextRequest, NextResponse } from 'next/server';
import { getChartingDB } from '@/lib/charting/db';
import type { ChartAlert } from '@/components/charting/core/types';

const ANON_USER = 'anon';
function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const symbol = req.nextUrl.searchParams.get('symbol') ?? undefined;
    const alerts = await getChartingDB().alerts.list(userId, symbol);
    return NextResponse.json({ alerts });
  } catch (err) {
    console.error('[charts/alerts GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = await req.json() as Partial<ChartAlert>;
    if (!body.symbol || !body.price || !body.direction) {
      return NextResponse.json({ error: 'symbol, price, direction required' }, { status: 400 });
    }
    const alert: ChartAlert = {
      id:        `alert_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      symbol:    body.symbol,
      price:     body.price,
      direction: body.direction,
      active:    true,
      note:      body.note,
      createdAt: new Date().toISOString(),
    };
    await getChartingDB().alerts.upsert(userId, alert);
    return NextResponse.json({ alert });
  } catch (err) {
    console.error('[charts/alerts POST]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    await getChartingDB().alerts.delete(userId, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/alerts DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
