import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const row = db.prepare('SELECT * FROM prestasi WHERE id = ?').get(id);
    if (!row) {
      return NextResponse.json({ error: 'Prestasi not found' }, { status: 404 });
    }
    return NextResponse.json(row);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prestasi' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, peringkat, tingkat, tahun, image_url } = body;

    const updates: string[] = [];
    const values: any[] = [];

    if (title !== undefined) { updates.push('title = ?'); values.push(title); }
    if (peringkat !== undefined) { updates.push('peringkat = ?'); values.push(peringkat); }
    if (tingkat !== undefined) { updates.push('tingkat = ?'); values.push(tingkat); }
    if (tahun !== undefined) { updates.push('tahun = ?'); values.push(tahun); }
    if (image_url !== undefined) { updates.push('image_url = ?'); values.push(image_url); }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    updates.push('updated_at = datetime(\'now\')');
    values.push(id);

    db.prepare(
      `UPDATE prestasi SET ${updates.join(', ')} WHERE id = ?`
    ).run(...values);

    const updated = db.prepare('SELECT * FROM prestasi WHERE id = ?').get(id);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update prestasi' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    db.prepare('DELETE FROM prestasi WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete prestasi' }, { status: 500 });
  }
}
