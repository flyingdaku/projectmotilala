/**
 * POST /api/dashboard/widget/query — execute a widget query and return rows
 */

import { NextResponse } from 'next/server';
import { getAuthenticatedUserId } from '@/lib/server/auth';
import { executeWidgetQuery } from '@/lib/dashboard/query-engine';
import type { WidgetQueryRequest } from '@/lib/dashboard/types';

export async function POST(req: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = (await req.json()) as WidgetQueryRequest;

    if (!body.config || !body.widget_type) {
      return NextResponse.json({ error: 'config and widget_type are required' }, { status: 400 });
    }

    const result = await executeWidgetQuery(body.config, body.widget_type);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[POST /api/dashboard/widget/query]', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
