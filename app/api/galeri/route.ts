import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM galeri ORDER BY created_at DESC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch galeri' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, image_url, kategori } = body;

    const result = db.prepare(
      'INSERT INTO galeri (title, image_url, kategori) VALUES (?, ?, ?)'
    ).run(title, image_url, kategori);

    const newGaleri = db.prepare('SELECT * FROM galeri WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newGaleri, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create galeri' }, { status: 500 });
  }
}