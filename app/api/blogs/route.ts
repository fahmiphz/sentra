import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM blogs WHERE is_published = 1 ORDER BY created_at DESC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, title, content, cover_image, author, is_published = false } = body;

    const result = db.prepare(
      'INSERT INTO blogs (slug, title, content, cover_image, author, is_published) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(slug, title, content, cover_image, author, is_published ? 1 : 0);

    const newBlog = db.prepare('SELECT * FROM blogs WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}