import { NextRequest, NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import type { DrawingData } from '@/components/charting/core/types';

const ANON_USER = 'anon';

function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

type DrawingRow = {
  content: DrawingData[];
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string; tf: string }> }
) {
  try {
    const { symbol, tf } = await params;
    const userId = getUserId(req);
    const row = await pgDb.queryOne<DrawingRow>(
      `SELECT content
       FROM chart_drawings
       WHERE user_id = $1 AND symbol = $2 AND timeframe = $3`,
      [userId, symbol.toUpperCase(), tf],
    );

    return NextResponse.json({ drawings: row?.content ?? [] });
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
    const { drawings } = (await req.json()) as { drawings?: DrawingData[] };

    await pgDb.queryOne(
      `INSERT INTO chart_drawings (user_id, symbol, timeframe, content, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, NOW())
       ON CONFLICT (user_id, symbol, timeframe)
       DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
       RETURNING id`,
      [userId, symbol.toUpperCase(), tf, JSON.stringify(drawings ?? [])],
    );

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
    await pgDb.queryOne(
      `DELETE FROM chart_drawings
       WHERE user_id = $1 AND symbol = $2 AND timeframe = $3
       RETURNING id`,
      [userId, symbol.toUpperCase(), tf],
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/drawings DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
