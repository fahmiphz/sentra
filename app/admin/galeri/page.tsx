import db from '@/lib/db';
import Link from 'next/link';

export default function AdminGaleri() {
  const galeri = db.prepare('SELECT * FROM galeri ORDER BY created_at DESC').all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
        <Link
          href="/admin/galeri/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Tambah Galeri
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {galeri.map((g) => (
          <div key={g.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={g.image_url}
                alt={g.title || ''}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{g.title || 'Tanpa Judul'}</h3>
              <p className="text-xs text-gray-500 mt-1">{g.kategori || '-'}</p>
              <Link
                href={`/admin/galeri/${g.id}`}
                className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 text-center"
              >
                Edit Foto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}