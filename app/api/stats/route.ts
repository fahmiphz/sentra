import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM stats WHERE is_active = 1 ORDER BY order_index ASC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value, label, order_index = 0, is_active = true } = body;

    const result = db.prepare(
      'INSERT INTO stats (value, label, order_index, is_active) VALUES (?, ?, ?, ?)'
    ).run(value, label, order_index, is_active ? 1 : 0);

    const newStat = db.prepare('SELECT * FROM stats WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newStat, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 });
  }
}
