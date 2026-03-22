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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(req);
    const row = await pgDb.queryOne<LayoutRow>(
      `SELECT id, name, content, is_default, updated_at
       FROM chart_layouts
       WHERE id = $1 AND user_id = $2`,
      [id, userId],
    );

    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ layout: toLayout(row) });
  } catch (err) {
    console.error('[charts/layouts/[id] GET]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(req);
    const body = (await req.json()) as LayoutState & { isDefault?: boolean };
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ error: 'name required' }, { status: 400 });
    }

    if (body.isDefault) {
      await pgDb.queryOne(
        `UPDATE chart_layouts
         SET is_default = FALSE
         WHERE user_id = $1 AND id != $2`,
        [userId, id],
      );
    }

    const content = {
      ...body,
      id,
      name,
      updatedAt: new Date().toISOString(),
    };

    const row = await pgDb.queryOne<LayoutRow>(
      `UPDATE chart_layouts
       SET name = $1,
           content = $2::jsonb,
           is_default = $3,
           updated_at = NOW()
       WHERE id = $4 AND user_id = $5
       RETURNING id, name, content, is_default, updated_at`,
      [name, JSON.stringify(content), Boolean(body.isDefault), id, userId],
    );

    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ layout: toLayout(row) });
  } catch (err) {
    console.error('[charts/layouts/[id] PUT]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(req);
    await pgDb.queryOne(
      `DELETE FROM chart_layouts
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId],
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/layouts/[id] DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
