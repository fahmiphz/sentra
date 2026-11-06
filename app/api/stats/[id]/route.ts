import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = db.prepare('SELECT * FROM stats WHERE id = ?').get(id);
    if (!row) {
      return NextResponse.json({ error: 'Stat not found' }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stat' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { value, label, order_index, is_active } = body;

    const updates: string[] = [];
    const values: any[] = [];

    if (value !== undefined) { updates.push('value = ?'); values.push(value); }
    if (label !== undefined) { updates.push('label = ?'); values.push(label); }
    if (order_index !== undefined) { updates.push('order_index = ?'); values.push(order_index); }
    if (is_active !== undefined) { updates.push('is_active = ?'); values.push(is_active ? 1 : 0); }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updates.push('updated_at = datetime(\'now\')');
    values.push(id);

    db.prepare(
      `UPDATE stats SET ${updates.join(', ')} WHERE id = ?`
    ).run(...values);

    const updated = db.prepare('SELECT * FROM stats WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    db.prepare('DELETE FROM stats WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete stat' }, { status: 500 });
  }
}
