import db from '@/lib/db';
import Link from 'next/link';

export default function AdminBanners() {
  const banners = db.prepare('SELECT * FROM home_banners ORDER BY order_index ASC').all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Hero Banner</h1>
        <Link
          href="/admin/banners/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Tambah Banner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={banner.image_url}
                alt={banner.title || ''}
                className="w-full h-full object-cover"
              />
              {banner.is_active ? (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  Aktif
                </span>
              ) : (
                <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs px-2 py-1 rounded">
                  Nonaktif
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{banner.title || 'Tanpa Judul'}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Urutan: {banner.order_index}
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/admin/banners/${banner.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 text-center"
                >
                  Edit Foto
                </Link>
                <Link
                  href={`/admin/banners/${banner.id}`}
                  className="px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200 text-center"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}