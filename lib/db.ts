import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(process.cwd(), 'dev.db');

const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS home_banners (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT,
      image_url TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      order_index INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS karyas (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      tech_stack TEXT,
      link_url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS prestasi (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      peringkat TEXT NOT NULL,
      tingkat TEXT NOT NULL,
      tahun INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS galeri (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT,
      image_url TEXT NOT NULL,
      kategori TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      author TEXT DEFAULT 'Admin',
      is_published INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      spec TEXT NOT NULL,
      cert TEXT NOT NULL,
      image_url TEXT NOT NULL,
      is_head INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS kegiatan (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      kategori TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS stats (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      value TEXT NOT NULL,
      label TEXT NOT NULL,
      order_index INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);
}

export function seedDB() {
  const banners = db.prepare('SELECT COUNT(*) as cnt FROM home_banners').get() as { cnt: number };
  if (banners.cnt === 0) {
    const insertBanner = db.prepare(
      'INSERT INTO home_banners (title, image_url, is_active, order_index) VALUES (?, ?, ?, ?)'
    );
    insertBanner.run(
      'Lab Coding & Modern Web Development',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&auto=format&fit=crop&q=85',
      1,
      1
    );
    insertBanner.run(
      'Pembelajaran Software Engineering & Architecture',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&auto=format&fit=crop&q=85',
      1,
      2
    );
    insertBanner.run(
      'Kolaborasi Teamwork Project TEFA',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&auto=format&fit=crop&q=85',
      1,
      3
    );
  }

  const karyas = db.prepare('SELECT COUNT(*) as cnt FROM karyas').get() as { cnt: number };
  if (karyas.cnt === 0) {
    const insertKarya = db.prepare(
      'INSERT INTO karyas (title, description, image_url, tech_stack, link_url) VALUES (?, ?, ?, ?, ?)'
    );
    insertKarya.run(
      'Sistem Akademik Terpadu',
      'Sistem manajemen akademik terpadu untuk sekolah.',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'React, Node.js, PostgreSQL',
      '#'
    );
    insertKarya.run(
      'Aplikasi Koperasi Syariah',
      'Aplikasi manajemen koperasi berbasis syariah.',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      'Flutter, Firebase',
      '#'
    );
    insertKarya.run(
      'Smart Pesantren IoT Monitoring',
      'Sistem monitoring IoT untuk pesantren.',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      'ESP32, React, Tailwind CSS',
      '#'
    );
  }

  const prestasi = db.prepare('SELECT COUNT(*) as cnt FROM prestasi').get() as { cnt: number };
  if (prestasi.cnt === 0) {
    const insertPrestasi = db.prepare(
      'INSERT INTO prestasi (title, peringkat, tingkat, tahun, image_url) VALUES (?, ?, ?, ?, ?)'
    );
    insertPrestasi.run(
      'Juara 1 LKS Web Tech Provinsi',
      'Juara 1',
      'Provinsi',
      2025,
      'https://images.unsplash.com/photo-1561408904-056241a4a66a?w=800&auto=format&fit=crop&q=80'
    );
    insertPrestasi.run(
      'Medal of Excellence Hackathon Nasional',
      'Medal of Excellence',
      'Nasional',
      2024,
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
    );
  }

  const galeri = db.prepare('SELECT COUNT(*) as cnt FROM galeri').get() as { cnt: number };
  if (galeri.cnt === 0) {
    const insertGaleri = db.prepare(
      'INSERT INTO galeri (title, image_url, kategori) VALUES (?, ?, ?)'
    );
    insertGaleri.run(
      'Kunjungan Industri & Teaching Factory Telkom',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60',
      'Kunjungan'
    );
    insertGaleri.run(
      'Workshop Fullstack Development dengan Industry Expert',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60',
      'Workshop'
    );
  }

  const blogs = db.prepare('SELECT COUNT(*) as cnt FROM blogs').get() as { cnt: number };
  if (blogs.cnt === 0) {
    const insertBlog = db.prepare(
      'INSERT INTO blogs (slug, title, content, cover_image, author, is_published) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertBlog.run(
      'mengenal-nextjs-app-router',
      'Mengenal Next.js App Router & Server Components',
      'Next.js App Router membawa paradigma baru dalam pengembangan web modern dengan performa maksimal...',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      'Tim Kurikulum RPL',
      1
    );
  }

  const teachers = db.prepare('SELECT COUNT(*) as cnt FROM teachers').get() as { cnt: number };
  if (teachers.cnt === 0) {
    const insertTeacher = db.prepare(
      'INSERT INTO teachers (name, role, spec, cert, image_url, is_head) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertTeacher.run(
      'Rizal Arisandi, S.Kom.',
      'Guru Mobile & IoT Specialist',
      'Pengembangan Aplikasi Mobile (Flutter), Internet of Things (ESP32), dan Database Realtime (Firebase).',
      'Dicoding Certified Android & Multi-Platform Developer',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      0
    );
    insertTeacher.run(
      'Ahmad Fauzi, S.T., M.Kom.',
      'Kepala Program Keahlian RPL',
      'Arsitektur Fullstack Web, Cloud Computing, dan Manajemen Proyek Perangkat Lunak.',
      'Asesor Kompetensi BNSP & AWS Certified Cloud Practitioner Educator',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      1
    );
    insertTeacher.run(
      'Siti Rahmawati, S.Tr.T.',
      'Instruktur UI/UX & Web Frontend',
      'Desain Antarmuka (Figma), Riset Pengalaman Pengguna (UX), React JS, dan Framework Tailwind CSS.',
      'Google UX Design Professional Certificate',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      0
    );
  }

  const kegiatan = db.prepare('SELECT COUNT(*) as cnt FROM kegiatan').get() as { cnt: number };
  if (kegiatan.cnt === 0) {
    const insertKegiatan = db.prepare(
      'INSERT INTO kegiatan (title, description, image_url, kategori) VALUES (?, ?, ?, ?)'
    );
    insertKegiatan.run(
      'Bootcamp & Hackathon',
      'Bootcamp pemrograman intensif dan hackathon rutin.',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      'Bootcamp'
    );
    insertKegiatan.run(
      'Kunjungan Industri',
      'Kunjungan ke perusahaan industri untuk pengalaman langsung.',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      'Kunjungan'
    );
    insertKegiatan.run(
      'Praktik Kerja Lapangan',
      'PKL di perusahaan partner untuk pengalaman kerja nyata.',
      'https://images.unsplash.com/photo-1522071901873-411886a10004?w=800&auto=format&fit=crop&q=80',
      'PKL'
    );
    insertKegiatan.run(
      'Uji Kompetensi',
      'Uji kompetensi sertifikasi BNSP untuk siswa.',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      'Uji Kompetensi'
    );
  }

  const stats = db.prepare('SELECT COUNT(*) as cnt FROM stats').get() as { cnt: number };
  if (stats.cnt === 0) {
    const insertStat = db.prepare(
      'INSERT INTO stats (value, label, order_index, is_active) VALUES (?, ?, ?, ?)'
    );
    insertStat.run('120 +', 'Student', 1, 1);
    insertStat.run('85 +', 'Successfully Portfolio', 2, 1);
    insertStat.run('100 +', 'BNSP Certified', 3, 1);
    insertStat.run('20 +', 'Internship Placement', 4, 1);
  }
}

export default db;
