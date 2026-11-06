import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM kegiatan ORDER BY created_at DESC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch kegiatan' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image_url, kategori } = body;

    const result = db.prepare(
      'INSERT INTO kegiatan (title, description, image_url, kategori) VALUES (?, ?, ?, ?)'
    ).run(title, description, image_url, kategori);

    const newKegiatan = db.prepare('SELECT * FROM kegiatan WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newKegiatan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create kegiatan' }, { status: 500 });
  }
}
