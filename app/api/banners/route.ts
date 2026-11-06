import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM home_banners ORDER BY order_index ASC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, image_url, is_active = true, order_index = 0 } = body;

    const result = db.prepare(
      'INSERT INTO home_banners (title, image_url, is_active, order_index) VALUES (?, ?, ?, ?)'
    ).run(title, image_url, is_active ? 1 : 0, order_index);

    const newBanner = db.prepare('SELECT * FROM home_banners WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newBanner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}