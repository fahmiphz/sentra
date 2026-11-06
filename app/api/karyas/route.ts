import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cohort = searchParams.get('cohort');
    
    let query = 'SELECT * FROM karyas';
    const params: any[] = [];
    
    if (cohort && cohort !== 'all') {
      query += ' WHERE cohort = ?';
      params.push(cohort);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const rows = db.prepare(query).all(...params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch karyas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image_url, tech_stack, link_url, cohort = 'Angkatan 3' } = body;

    const result = db.prepare(
      'INSERT INTO karyas (title, description, image_url, tech_stack, link_url, cohort) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, description, image_url, tech_stack, link_url, cohort);

    const newKarya = db.prepare('SELECT * FROM karyas WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newKarya, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create karya' }, { status: 500 });
  }
}
