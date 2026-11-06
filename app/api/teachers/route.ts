import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM teachers ORDER BY is_head DESC, name ASC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, spec, cert, image_url, is_head = false } = body;

    const result = db.prepare(
      'INSERT INTO teachers (name, role, spec, cert, image_url, is_head) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(name, role, spec, cert, image_url, is_head ? 1 : 0);

    const newTeacher = db.prepare('SELECT * FROM teachers WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}
