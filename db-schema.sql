-- Create Hero Images table
CREATE TABLE IF NOT EXISTS hero_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Kegiatan Jurusan table
CREATE TABLE IF NOT EXISTS kegiatan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Kegiatan Images table
CREATE TABLE IF NOT EXISTS kegiatan_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kegiatan_id UUID NOT NULL REFERENCES kegiatan(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Teacher Profiles table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  spec TEXT NOT NULL,
  cert TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_head BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  developer VARCHAR(255) NOT NULL,
  cohort VARCHAR(100) NOT NULL,
  thumbnail_url TEXT NOT NULL,
  dashboard_img_url TEXT,
  student_img_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  tech_stack TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Prestasi table
CREATE TABLE IF NOT EXISTS prestasi (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  level VARCHAR(50) NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  cohort VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  avatar_url TEXT,
  year INT,
  is_highlight BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Blog table
CREATE TABLE IF NOT EXISTS blog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security) untuk keamanan
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('rpl-content', 'rpl-content', true) ON CONFLICT DO NOTHING;

-- RLS Policy: Anyone can read
CREATE POLICY "Public read access" ON hero_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON kegiatan FOR SELECT USING (true);
CREATE POLICY "Public read access" ON kegiatan_images FOR SELECT USING (true);
CREATE POLICY "Public read access" ON teachers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON prestasi FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read access" ON blog FOR SELECT USING (true);

-- RLS Policy: Authenticated users (admin) can insert/update/delete
CREATE POLICY "Admin write access" ON hero_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON hero_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON hero_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON kegiatan FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON kegiatan FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON kegiatan FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON kegiatan_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON kegiatan_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON kegiatan_images FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON teachers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON teachers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON teachers FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON prestasi FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON prestasi FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON prestasi FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access" ON blog FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON blog FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON blog FOR DELETE USING (auth.role() = 'authenticated');
