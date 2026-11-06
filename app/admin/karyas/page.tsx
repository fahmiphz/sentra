import db from '@/lib/db';
import Link from 'next/link';

export default function AdminKaryas() {
  const karyas = db.prepare('SELECT * FROM karyas ORDER BY created_at DESC').all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Karya</h1>
        <Link
          href="/admin/karyas/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Tambah Karya
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {karyas.map((karya) => (
          <div key={karya.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={karya.image_url}
                alt={karya.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{karya.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{karya.tech_stack || '-'}</p>
              <Link
                href={`/admin/karyas/${karya.id}`}
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