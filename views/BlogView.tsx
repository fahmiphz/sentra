import React, { useState, useEffect } from 'react';
import { MonitorPlay, Phone, Mail } from 'lucide-react';

interface BlogItem {
  id: string;
  title: string;
  content: string;
  author: string;
  cover_image: string;
  is_published: number;
}

export default function BlogView() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
      })
      .catch((err) => console.error('Failed to fetch blogs:', err));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">Jurnal & Artikel IT</h2>
      <div className="space-y-6">
        {blogs.map(b => (
          <div key={b.id} className="bg-white border border-gray-100 p-8 rounded-3xl hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-teal-600 cursor-pointer">{b.title}</h3>
            <p className="text-xs text-gray-400 mb-4">Penulis: {b.author}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{b.content}</p>
          </div>
        ))}
      </div>

      {/* FOOTER BIRU BLOG --- */}
      <footer className="w-full bg-gradient-to-r from-[#397d91] to-[#458e9f] py-14 px-6 text-white border-t border-teal-700/30 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="font-black text-4xl tracking-wider flex items-center gap-2">
                <MonitorPlay size={40} className="text-white" /> RPL
              </div>
            </div>
            <p className="text-[15px] font-medium text-white/95 leading-relaxed max-w-sm">
              Program Keahlian Rekayasa Perangkat Lunak<br/>
              SMK-IT As-Syifa Boarding School<br/>
              Subang.
            </p>
            <div className="space-y-3 pt-4">
              <p className="text-sm font-medium flex items-center gap-3">
                <Phone size={18}/> TLP/WA : +62 81122223934
              </p>
              <p className="text-sm font-medium flex items-center gap-3">
                <Mail size={18}/> Email: assyifasmkit@gmail.com
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <h4 className="font-bold text-lg">Company</h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">Website Sekolah</a></li>
              <li><a href="#" className="hover:text-white transition-colors\">Web Portofolio DKV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Portofolio RPL</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Landing Page PMB</a></li>
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className="font-bold text-lg">Working Hours</h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90">
              <li>Senin - Sabtu : 08:00AM - 15:00 PM</li>
              <li>Ahad : Silahkan Konfirmasi</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p className="font-medium text-white/90">
            ©2026. All Rights Reserved by <span className="font-bold text-[#facc15]">Prodi RPL</span>
          </p>
          <div className="flex gap-5 font-bold tracking-wider text-xs">
            <a href="#" className="hover:text-[#facc15] transition-colors">FACEBOOK</a>
            <a href="#" className="hover:text-[#facc15] transition-colors">TIKTOK</a>
            <a href="#" className="hover:text-[#facc15] transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-[#facc15] transition-colors">YOUTUBE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
