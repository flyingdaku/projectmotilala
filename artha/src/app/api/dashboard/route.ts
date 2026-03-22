/**
 * GET  /api/dashboard  — list user's dashboards
 * POST /api/dashboard  — create a new dashboard
 */

import { NextResponse } from 'next/server';
import { pgDb } from '@/lib/data/db-postgres';
import { getAuthenticatedUserId } from '@/lib/server/auth';
import { PRESET_WIDGETS, DEFAULT_PRESET_IDS } from '@/lib/dashboard/presets';

// ── GET ───────────────────────────────────────────────────────────────────────

export async function GET() {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const rows = await pgDb.queryAll<{
      id: string;
      name: string;
      is_default: boolean;
      widget_count: string;
      updated_at: string;
    }>(
      `SELECT d.id, d.name, d.is_default, d.updated_at,
              COUNT(w.id)::text AS widget_count
       FROM user_dashboards d
       LEFT JOIN user_widgets w ON w.dashboard_id = d.id
       WHERE d.user_id = $1
       GROUP BY d.id
       ORDER BY d.is_default DESC, d.updated_at DESC`,
      [userId]
    );

    // First visit: seed a default dashboard
    if (rows.length === 0) {
      const seeded = await seedDefaultDashboard(userId);
      return NextResponse.json({ dashboards: [seeded] });
    }

    return NextResponse.json({
      dashboards: rows.map(r => ({
        ...r,
        widget_count: parseInt(r.widget_count, 10),
      })),
    });
  } catch (err) {
    console.error('[GET /api/dashboard]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST ──────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const name = (body.name as string)?.trim() || 'My Dashboard';

    const row = await pgDb.queryOne<{ id: string; name: string; is_default: boolean; updated_at: string }>(
      `INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
       VALUES ($1, $2, false, '[]'::jsonb)
       RETURNING id, name, is_default, updated_at`,
      [userId, name]
    );

    return NextResponse.json({ dashboard: { ...row, widget_count: 0 } }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/dashboard]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── Seed helper ───────────────────────────────────────────────────────────────

async function seedDefaultDashboard(userId: string) {
  const dashboard = await pgDb.queryOne<{ id: string }>(
    `INSERT INTO user_dashboards (user_id, name, is_default, layout_json)
     VALUES ($1, 'My Dashboard', true, $2::jsonb)
     RETURNING id`,
    [userId, JSON.stringify(buildDefaultLayout())]
  );

  if (!dashboard) throw new Error('Failed to seed dashboard');

  const presets = DEFAULT_PRESET_IDS
    .map(id => PRESET_WIDGETS.find(p => p.id === id))
    .filter(Boolean) as typeof PRESET_WIDGETS;

  for (let i = 0; i < presets.length; i++) {
    const p = presets[i];
    await pgDb.queryOne(
      `INSERT INTO user_widgets (dashboard_id, widget_type, title, config_json, sort_order)
       VALUES ($1, $2, $3, $4::jsonb, $5)`,
      [dashboard.id, p.widget_type, p.name, JSON.stringify(p.config), i]
    );
  }

  return { id: dashboard.id, name: 'My Dashboard', is_default: true, widget_count: presets.length, updated_at: new Date().toISOString() };
}

function buildDefaultLayout() {
  return [
    { i: '__placeholder__', x: 0, y: 0, w: 6, h: 4, minW: 3, minH: 2 },
    { i: '__placeholder2__', x: 6, y: 0, w: 6, h: 4, minW: 3, minH: 2 },
    { i: '__placeholder3__', x: 0, y: 4, w: 6, h: 5, minW: 3, minH: 2 },
    { i: '__placeholder4__', x: 6, y: 4, w: 6, h: 5, minW: 3, minH: 2 },
  ];
}
