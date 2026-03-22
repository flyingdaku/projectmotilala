import { NextRequest, NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import type { ChartAlert } from '@/components/charting/core/types';

const ANON_USER = 'anon';

function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

type AlertRow = {
  id: string;
  symbol: string;
  price: string | number;
  condition: 'above' | 'below';
  message: string | null;
  is_active: boolean;
  created_at: string;
};

function toAlert(row: AlertRow): ChartAlert {
  return {
    id: row.id,
    symbol: row.symbol,
    price: Number(row.price),
    direction: row.condition,
    active: row.is_active,
    note: row.message ?? undefined,
    createdAt: row.created_at,
  };
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase();
    const rows = await pgDb.queryAll<AlertRow>(
      `SELECT id, symbol, price, condition, message, is_active, created_at
       FROM chart_alerts
       WHERE user_id = $1
         AND ($2::text IS NULL OR symbol = $2)
       ORDER BY created_at DESC`,
      [userId, symbol ?? null],
    );

    return NextResponse.json({ alerts: rows.map(toAlert) });
  } catch (err) {
    console.error('[charts/alerts GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = (await req.json()) as Partial<ChartAlert>;

    if (!body.symbol || body.price == null || !body.direction) {
      return NextResponse.json({ error: 'symbol, price, direction required' }, { status: 400 });
    }

    const row = await pgDb.queryOne<AlertRow>(
      `INSERT INTO chart_alerts (user_id, symbol, price, condition, message, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, symbol, price, condition, message, is_active, created_at`,
      [
        userId,
        body.symbol.toUpperCase(),
        body.price,
        body.direction,
        body.note ?? null,
        body.active ?? true,
      ],
    );

    return NextResponse.json({ alert: row ? toAlert(row) : null });
  } catch (err) {
    console.error('[charts/alerts POST]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 });
    }

    await pgDb.queryOne(
      `DELETE FROM chart_alerts
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId],
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/alerts DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
