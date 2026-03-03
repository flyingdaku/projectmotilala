import { NextRequest, NextResponse } from 'next/server';
import { getChartingDB } from '@/lib/charting/db';

const ANON_USER = 'anon';

function getUserId(req: NextRequest): string {
  return req.headers.get('x-user-id') ?? ANON_USER;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = getUserId(req);
    const layout = await getChartingDB().layouts.get(userId, id);
    if (!layout) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ layout });
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
    const body = await req.json();
    const layout = await getChartingDB().layouts.save(userId, { ...body, id });
    return NextResponse.json({ layout });
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
    await getChartingDB().layouts.delete(userId, id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[charts/layouts/[id] DELETE]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
