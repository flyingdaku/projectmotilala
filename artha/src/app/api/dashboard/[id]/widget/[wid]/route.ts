/**
 * PUT    /api/dashboard/[id]/widget/[wid] — update widget config / title / type
 * DELETE /api/dashboard/[id]/widget/[wid] — delete widget
 */

import { NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import { getAuthenticatedUserId } from '@/lib/server/auth';

type Params = { params: Promise<{ id: string; wid: string }> };

export async function PUT(req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, wid } = await params;
  try {
    const owner = await pgDb.queryOne(
      `SELECT d.id FROM user_dashboards d
       JOIN user_widgets w ON w.dashboard_id = d.id
       WHERE d.id = $1 AND d.user_id = $2 AND w.id = $3`,
      [id, userId, wid]
    );
    if (!owner) return NextResponse.json({ error: 'Widget not found' }, { status: 404 });

    const body = await req.json();
    const setClauses: string[] = ['updated_at = NOW()'];
    const queryParams: unknown[] = [];

    if (body.title !== undefined) {
      queryParams.push(body.title);
      setClauses.push(`title = $${queryParams.length}`);
    }
    if (body.widget_type !== undefined) {
      queryParams.push(body.widget_type);
      setClauses.push(`widget_type = $${queryParams.length}`);
    }
    if (body.config_json !== undefined) {
      queryParams.push(JSON.stringify(body.config_json));
      setClauses.push(`config_json = $${queryParams.length}::jsonb`);
    }

    queryParams.push(wid);
    const widget = await pgDb.queryOne(
      `UPDATE user_widgets
       SET ${setClauses.join(', ')}
       WHERE id = $${queryParams.length}
       RETURNING id, dashboard_id, widget_type, title, config_json, sort_order, updated_at`,
      queryParams
    );

    return NextResponse.json({ widget });
  } catch (err) {
    console.error('[PUT /api/dashboard/[id]/widget/[wid]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, wid } = await params;
  try {
    const row = await pgDb.queryOne(
      `DELETE FROM user_widgets
       WHERE id = $1
         AND dashboard_id = (SELECT id FROM user_dashboards WHERE id = $2 AND user_id = $3)
       RETURNING id`,
      [wid, id, userId]
    );
    if (!row) return NextResponse.json({ error: 'Widget not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/dashboard/[id]/widget/[wid]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
