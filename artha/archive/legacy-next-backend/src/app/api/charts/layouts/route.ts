import { NextRequest, NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import type { LayoutState } from '@/components/charting/core/types';

const ANON_USER = 'anon';

function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

type LayoutRow = {
  id: string;
  name: string;
  content: LayoutState;
  is_default: boolean;
  updated_at: string;
};

function toLayout(row: LayoutRow): LayoutState & { isDefault?: boolean } {
  const content = (row.content ?? {}) as LayoutState & { isDefault?: boolean };
  return {
    ...content,
    id: row.id,
    name: row.name,
    updatedAt: content.updatedAt ?? row.updated_at,
    isDefault: row.is_default,
  };
}

export async function GET(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const rows = await pgDb.queryAll<LayoutRow>(
      `SELECT id, name, content, is_default, updated_at
       FROM chart_layouts
       WHERE user_id = $1
       ORDER BY is_default DESC, updated_at DESC`,
      [userId],
    );

    return NextResponse.json({ layouts: rows.map(toLayout) });
  } catch (err) {
    console.error('[charts/layouts GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req);
    const body = (await req.json()) as LayoutState & { isDefault?: boolean };
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ error: 'name required' }, { status: 400 });
    }

    const content = {
      ...body,
      name,
      updatedAt: new Date().toISOString(),
    };

    const row = await pgDb.queryOne<LayoutRow>(
      `INSERT INTO chart_layouts (user_id, name, content, is_default, updated_at)
       VALUES ($1, $2, $3::jsonb, $4, NOW())
       RETURNING id, name, content, is_default, updated_at`,
      [userId, name, JSON.stringify(content), Boolean(body.isDefault)],
    );

    return NextResponse.json({ layout: row ? toLayout(row) : null });
  } catch (err) {
    console.error('[charts/layouts POST]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
