import db from '@/lib/db';
import Link from 'next/link';

export default function AdminPrestasi() {
  const prestasi = db
    .prepare('SELECT * FROM prestasi ORDER BY tahun DESC, created_at DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Prestasi</h1>
        <Link
          href="/admin/prestasi/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Tambah Prestasi
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {prestasi.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-yellow-500/90 text-white text-xs px-2 py-1 rounded">
                {p.peringkat}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{p.tingkat} • {p.tahun}</p>
              <Link
                href={`/admin/prestasi/${p.id}`}
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