/**
 * GET    /api/dashboard/[id]  — full dashboard + widgets + layout
 * PUT    /api/dashboard/[id]  — update name and/or layout_json
 * DELETE /api/dashboard/[id]  — delete dashboard (cascades widgets)
 */

import { NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import { getAuthenticatedUserId } from '@/lib/server/auth';

type Params = { params: Promise<{ id: string }> };

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET(_req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const dashboard = await pgDb.queryOne<{
      id: string;
      user_id: string;
      name: string;
      is_default: boolean;
      layout_json: string;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT id, user_id, name, is_default, layout_json, created_at, updated_at
       FROM user_dashboards
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (!dashboard) {
      return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 });
    }

    const widgets = await pgDb.queryAll<{
      id: string;
      dashboard_id: string;
      widget_type: string;
      title: string;
      config_json: string;
      sort_order: number;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT id, dashboard_id, widget_type, title, config_json, sort_order, created_at, updated_at
       FROM user_widgets
       WHERE dashboard_id = $1
       ORDER BY sort_order ASC, created_at ASC`,
      [id]
    );

    return NextResponse.json({
      dashboard: { ...dashboard, widgets },
    });
  } catch (err) {
    console.error('[GET /api/dashboard/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── PUT ───────────────────────────────────────────────────────────────────────

export async function PUT(req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const setClauses: string[] = ['updated_at = NOW()'];
    const queryParams: unknown[] = [];

    if (body.name !== undefined) {
      queryParams.push(body.name);
      setClauses.push(`name = $${queryParams.length}`);
    }
    if (body.layout_json !== undefined) {
      queryParams.push(JSON.stringify(body.layout_json));
      setClauses.push(`layout_json = $${queryParams.length}::jsonb`);
    }
    if (body.is_default !== undefined) {
      queryParams.push(body.is_default);
      setClauses.push(`is_default = $${queryParams.length}`);
      // Unset other defaults if setting this one
      if (body.is_default) {
        await pgDb.queryOne(
          `UPDATE user_dashboards SET is_default = false WHERE user_id = $1 AND id != $2`,
          [userId, id]
        );
      }
    }

    queryParams.push(id, userId);
    const row = await pgDb.queryOne(
      `UPDATE user_dashboards
       SET ${setClauses.join(', ')}
       WHERE id = $${queryParams.length - 1} AND user_id = $${queryParams.length}
       RETURNING id, name, is_default, updated_at`,
      queryParams
    );

    if (!row) return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 });
    return NextResponse.json({ dashboard: row });
  } catch (err) {
    console.error('[PUT /api/dashboard/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── DELETE ────────────────────────────────────────────────────────────────────

export async function DELETE(_req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const row = await pgDb.queryOne(
      `DELETE FROM user_dashboards
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId]
    );
    if (!row) return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/dashboard/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
