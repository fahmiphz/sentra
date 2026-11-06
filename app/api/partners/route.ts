import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const rows = db.prepare('SELECT * FROM partners WHERE is_active = 1 ORDER BY name ASC').all();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, logo_url, website_url, is_active = true } = body;

    const result = db.prepare(
      'INSERT INTO partners (name, logo_url, website_url, is_active) VALUES (?, ?, ?, ?)'
    ).run(name, logo_url, website_url, is_active ? 1 : 0);

    const newPartner = db.prepare('SELECT * FROM partners WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newPartner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
