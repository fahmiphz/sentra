'use client';
import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  MapPin, 
  Calendar, 
  MonitorPlay,
  Phone,
  Mail,
  Star
} from 'lucide-react';

// --- MOCK DATA PRESTASI HIGHLIGHT ---
const HIGHLIGHT_PRESTASI = {
  title: "Juara 1 Lomba Kompetensi Siswa (LKS) Nasional 2025",
  category: "Web Technologies",
  student: "Ahmad Faisal",
  cohort: "Vistara",
  description: "Berhasil meraih medali emas pada ajang LKS Tingkat Nasional mengalahkan 34 provinsi lainnya dalam bidang pengembangan perangkat lunak berbasis web.",
  img: "https://images.unsplash.com/photo-1561408904-056241a4a66a?w=800&auto=format&fit=crop&q=80" // Foto piala/medali
};

// --- GENERATOR DATA PRESTASI ---
const generatePrestasi = () => {
  const levels = ["Nasional", "Provinsi", "Kabupaten"];
  const categories = ["Web Design", "Software IT", "Cyber Security", "UI/UX Design", "Olimpiade Komputer"];
  let data = [];
  
  for (let i = 1; i <= 24; i++) {
    const level = levels[i % 3];
    const category = categories[i % categories.length];
    
    data.push({
      id: i,
      title: `Juara ${ (i % 3) + 1 } ${category}`,
      level: level,
      student: `Siswa Berprestasi ${i}`,
      cohort: i % 2 === 0 ? "Vistara" : "Rexavylion",
      year: "202" + (4 + (i % 2)),
      img: `https://picsum.photos/seed/prestasi${i}/600/400`,
      avatar: `https://ui-avatars.com/api/?name=Siswa+${i}&background=random`
    });
  }
  return data;
};

const PRESTASI_LIST = generatePrestasi();
const FILTERS = ["Semua", "Nasional", "Provinsi", "Kabupaten"];

export default function PrestasiView() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredPrestasi = PRESTASI_LIST.filter(p => 
    activeFilter === "Semua" ? true : p.level === activeFilter
  );

  return (
    <div className="bg-white min-h-screen flex flex-col pt-24">
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-24">
        
        {/* HERO HALL OF FAME */}
        <div className="w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-800 rounded-[2.5rem] p-10 md:p-14 lg:p-20 shadow-2xl relative overflow-hidden mb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Ornamen Glow Emas */}
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 backdrop-blur-md rounded-full border border-yellow-500/20 text-xs font-bold tracking-wide text-yellow-500 mb-8">
              <Trophy size={16} /> HALL OF FAME RPL
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Jejak Kebanggaan <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                Talenta Muda
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-lg">
              Mendedikasikan karya, mengukir sejarah. Ruang apresiasi bagi siswa/i RPL yang telah mengharumkan nama sekolah di berbagai ajang kompetisi.
            </p>

            {/* Statistik Cepat */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-black text-white mb-1">24+</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Nasional</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">50+</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Provinsi</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">100+</p>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Kabupaten</p>
              </div>
            </div>
          </div>

          {/* Highlight Prestasi Tertinggi */}
          <div className="relative z-10 w-full lg:w-1/2">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-2xl relative">
              <div className="absolute -top-5 -right-5 bg-yellow-400 text-black w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-zinc-900 rotate-12">
                <Star size={24} fill="currentColor" />
              </div>
              
              <img 
                src={HIGHLIGHT_PRESTASI.img} 
                alt="Highlight Prestasi" 
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-inner"
              />
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-lg border border-yellow-500/20">
                  Nasional
                </span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-lg">
                  {HIGHLIGHT_PRESTASI.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                {HIGHLIGHT_PRESTASI.title}
              </h3>
              
              <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                {HIGHLIGHT_PRESTASI.description}
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-400 font-bold border border-white/5">
                  AF
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">{HIGHLIGHT_PRESTASI.student}</p>
                  <p className="text-xs font-medium text-zinc-500 mt-1">{HIGHLIGHT_PRESTASI.cohort}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HEADER & FILTER PRESTASI */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-black tracking-tight mb-2">
              Daftar Prestasi
            </h2>
            <p className="text-zinc-500 text-base font-medium">
              Menampilkan {filteredPrestasi.length} penghargaan yang diraih oleh siswa RPL.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 bg-zinc-50 p-1.5 rounded-2xl border border-zinc-200">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeFilter === filter 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* GRID PRESTASI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPrestasi.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Gambar Lomba/Piala */}
              <div className="w-full aspect-[4/3] bg-zinc-100 relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm backdrop-blur-md border flex items-center gap-1.5
                    ${item.level === 'Nasional' ? 'bg-yellow-100/90 text-yellow-700 border-yellow-200' : 
                      item.level === 'Provinsi' ? 'bg-blue-100/90 text-blue-700 border-blue-200' : 
                      'bg-zinc-100/90 text-zinc-700 border-zinc-200'}
                  `}>
                    {item.level === 'Nasional' ? <Trophy size={14}/> : <Award size={14}/>}
                    Tingkat {item.level}
                  </span>
                </div>
              </div>

              {/* Konten Text */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-black mb-4 leading-tight group-hover:text-zinc-600 transition-colors">
                  {item.title}
                </h3>
                
                <div className="space-y-2 mb-6 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                    <Calendar size={14} /> Tahun {item.year}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                    <MapPin size={14} /> Kategori Lomba Siswa
                  </div>
                </div>
                
                {/* Profil Pemenang */}
                <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
                  <img 
                    src={item.avatar} 
                    alt={item.student} 
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-black leading-none">{item.student}</p>
                    <p className="text-xs font-medium text-zinc-500 mt-1">{item.cohort}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* --- FOOTER FULL DENGAN TEMA TOSCA --- */}
      <footer className="w-full bg-gradient-to-r from-[#397d91] to-[#458e9f] py-14 px-6 text-white border-t border-teal-700/30 mt-auto">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Kolom 1 - Identitas */}
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
          
          {/* Kolom 2 - Company */}
          <div className="space-y-5">
            <h4 className="font-bold text-lg">Company</h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90">
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Website Sekolah</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Web Portofolio DKV</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Web Portofolio RPL</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Landing Page PMB</a></li>
            </ul>
          </div>

          {/* Kolom 3 - Working Hours */}
          <div className="space-y-5">
            <h4 className="font-bold text-lg">Working Hours</h4>
            <ul className="space-y-3 text-[15px] font-medium text-white/90">
              <li>Senin - Sabtu : 08:00AM - 15:00 PM</li>
              <li>Ahad : Silahkan Konfirmasi</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-[1440px] mx-auto border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex flex-col text-center md:text-left">
            <p className="font-medium text-white/90">
              © 2026 Program Keahlian RPL SMK-IT As-Syifa Boarding School Subang.
            </p>
            <p className="text-white/80 text-xs mt-1.5">
              Membangun peradaban digital dengan akhlaq mulia & standar teknologi global.
            </p>
          </div>
          <div className="flex gap-5 font-bold tracking-wider text-xs">
            <a href="#" className="hover:text-yellow-300 transition-colors">FACEBOOK</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">TIKTOK</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-yellow-300 transition-colors">YOUTUBE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}