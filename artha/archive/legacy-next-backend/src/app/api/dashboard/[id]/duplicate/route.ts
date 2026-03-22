/**
 * POST /api/dashboard/[id]/duplicate — clone a dashboard + all its widgets
 */

import { NextResponse } from 'next/server';
import { pgDb, withPgTransaction } from '@/lib/data/db-postgres';
import { getAuthenticatedUserId } from '@/lib/server/auth';

type Params = { params: Promise<{ id: string }> };

export async function POST(_req: Request, { params }: Params) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const result = await withPgTransaction(async (client) => {
      const original = await client.query<{
        id: string; name: string; layout_json: string;
      }>(
        `SELECT id, name, layout_json FROM user_dashboards WHERE id = $1 AND user_id = $2`,
        [id, userId]
      );
      if (original.rows.length === 0) throw new Error('not_found');

      const src = original.rows[0];
      const newDash = await client.query<{ id: string }>(
        `INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
         VALUES ($1, $2, false, $3::jsonb)
         RETURNING id`,
        [userId, `${src.name} (copy)`, JSON.stringify(src.layout_json)]
      );
      const newId = newDash.rows[0].id;

      const widgets = await client.query(
        `SELECT widget_type, title, config_json, sort_order
         FROM user_widgets WHERE dashboard_id = $1
         ORDER BY sort_order ASC`,
        [id]
      );

      for (const w of widgets.rows) {
        await client.query(
          `INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
           VALUES ($1, $2, $3, $4::jsonb, $5)`,
          [newId, w.widget_type, w.title, JSON.stringify(w.config_json), w.sort_order]
        );
      }

      return { id: newId, name: `${src.name} (copy)` };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === 'not_found') {
      return NextResponse.json({ error: 'Dashboard not found' }, { status: 404 });
    }
    console.error('[POST /api/dashboard/[id]/duplicate]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
