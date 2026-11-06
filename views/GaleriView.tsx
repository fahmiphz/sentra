import React, { useState, useEffect } from 'react';

interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  kategori?: string;
}

export default function GaleriView() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch('/api/galeri')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGallery(data.map(g => ({
            id: g.id,
            title: g.title,
            image_url: g.image_url,
            kategori: g.kategori,
          })));
        }
      })
      .catch((err) => console.error('Failed to fetch galeri:', err));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">Galeri Kegiatan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map(g => (
          <div key={g.id} className="group relative aspect-video rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
            <img src={g.image_url} alt={g.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <h3 className="text-white text-sm font-semibold">{g.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}