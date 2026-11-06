import db from '@/lib/db';

export default function AdminDashboard() {
  const stats = {
    banners: db.prepare('SELECT COUNT(*) as cnt FROM home_banners').get() as { cnt: number },
    karyas: db.prepare('SELECT COUNT(*) as cnt FROM karyas').get() as { cnt: number },
    prestasi: db.prepare('SELECT COUNT(*) as cnt FROM prestasi').get() as { cnt: number },
    galeri: db.prepare('SELECT COUNT(*) as cnt FROM galeri').get() as { cnt: number },
    blogs: db.prepare('SELECT COUNT(*) as cnt FROM blogs').get() as { cnt: number },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Kelola seluruh konten dan foto website dari satu tempat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {value.cnt}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                📷
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Panduan Singkat</h2>
        <ol className="list-disc list-inside text-gray-600 space-y-3">
          <li>
            Pilih menu di sidebar (Hero Banner, Karya, Prestasi, Galeri, Blog).
          </li>
          <li>
            Klik tombol <span className="bg-gray-100 px-2 py-1 rounded text-sm">Edit Foto</span>
            untuk mengganti foto.
          </li>
          <li>
            Pilih file gambar baru, lalu klik <span className="bg-blue-100 px-2 py-1 rounded text-sm text-blue-700">Simpan</span>.
          </li>
          <li>
            Perubahan akan langsung terlihat di halaman website.
          </li>
        </ol>
      </div>
    </div>
  );
}