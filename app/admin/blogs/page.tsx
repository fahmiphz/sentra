import db from '@/lib/db';
import Link from 'next/link';

export default function AdminBlogs() {
  const blogs = db
    .prepare('SELECT * FROM blogs ORDER BY created_at DESC')
    .all() as any[];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
        <Link
          href="/admin/blogs/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Tambah Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={b.cover_image}
                alt={b.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                {b.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{b.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{b.author}</p>
              <Link
                href={`/admin/blogs/${b.id}`}
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