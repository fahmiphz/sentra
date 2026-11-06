import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(process.cwd(), 'public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export async function uploadToLocal(
  file: File,
  folder = 'sentra'
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${generateId()}.${ext}`;
  const folderPath = path.join(uploadDir, folder);
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  const filePath = path.join(folderPath, filename);
  fs.writeFileSync(filePath, buffer);
  
  // Return public URL (served from /uploads/)
  return `/uploads/${folder}/${filename}`;
}

export function deleteFromLocal(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), 'public', publicId);
    fs.unlink(filePath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function getLocalFilePath(url: string): string | null {
  try {
    const publicPath = path.join(process.cwd(), 'public', url);
    return publicPath;
  } catch {
    return null;
  }
}
