export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white shrink-0 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-600">
            SENTRA Admin
          </h1>
          <p className="text-xs text-slate-400 mt-1">RPL SMK-IT As-Syifa</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <a
            href="/admin"
            className="block p-3 rounded-lg bg-blue-600 text-white font-medium"
          >
            Dashboard
          </a>
          <a
            href="/admin/banners"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Hero Banner
          </a>
          <a
            href="/admin/karyas"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Karya
          </a>
          <a
            href="/admin/prestasi"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Prestasi
          </a>
          <a
            href="/admin/galeri"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Galeri
          </a>
          <a
            href="/admin/blogs"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Blog
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <a
            href="/"
            className="block p-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm"
          >
            Kembali ke Website
          </a>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}