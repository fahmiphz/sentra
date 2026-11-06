import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cohort = searchParams.get('cohort');
    
    let query = 'SELECT * FROM prestasi';
    const params: any[] = [];
    
    if (cohort && cohort !== 'all') {
      query += ' WHERE cohort = ?';
      params.push(cohort);
    }
    
    query += ' ORDER BY tahun DESC, created_at DESC';
    
    const rows = db.prepare(query).all(...params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prestasi' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, peringkat, tingkat, tahun, image_url, cohort = 'Angkatan 3' } = body;

    const result = db.prepare(
      'INSERT INTO prestasi (title, peringkat, tingkat, tahun, image_url, cohort) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, peringkat, tingkat, tahun, image_url, cohort);

    const newPrestasi = db.prepare('SELECT * FROM prestasi WHERE id = ?').get(result.lastInsertRowid as string);
    return NextResponse.json(newPrestasi, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create prestasi' }, { status: 500 });
  }
}
