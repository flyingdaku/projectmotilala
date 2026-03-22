/**
 * POST /api/dashboard/[id]/widget — create a new widget in a dashboard
 */

import { NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import { getAuthenticatedUserId } from '@/lib/server/auth';

type Params = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const owner = await pgDb.queryOne(
      `SELECT id FROM user_dashboards WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    if (!owner) return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 });

    const body = await req.json();
    const { widget_type, title, config_json } = body;

    if (!widget_type) {
      return NextResponse.json({ error: 'widget_type is required' }, { status: 400 });
    }

    const countRow = await pgDb.queryOne<{ cnt: string }>(
      `SELECT COUNT(*)::text AS cnt FROM user_widgets WHERE dashboard_id = $1`,
      [id]
    );
    const sortOrder = parseInt(countRow?.cnt ?? '0', 10);

    const widget = await pgDb.queryOne(
      `INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
       VALUES ($1, $2, $3, $4::jsonb, $5)
       RETURNING id, dashboard_id, widget_type, title, config_json, sort_order, created_at, updated_at`,
      [id, widget_type, title || 'Untitled Widget', JSON.stringify(config_json ?? {}), sortOrder]
    );

    return NextResponse.json({ widget }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/dashboard/[id]/widget]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
