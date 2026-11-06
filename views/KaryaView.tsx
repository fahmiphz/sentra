'use client';
import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Code, 
  ChevronRight, 
  ChevronLeft,
  MonitorPlay,
  Phone,
  Mail,
  Sparkles,
  Beaker
} from 'lucide-react';

// --- MOCK DATA CAROUSEL PROJECT TERBAIK ---
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Sistem Akademik Terpadu",
    developer: "Ahmad Faisal",
    cohort: "Vistara (Terbaik 1)",
    link: "/lab",
    studentImg: "https://ui-avatars.com/api/?name=Ahmad+Faisal&background=0D8ABC&color=fff",
    dashboardImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
  },
  {
    id: 2,
    title: "Aplikasi Koperasi Syariah",
    developer: "Budi Santoso",
    cohort: "Rexavylion (Terbaik 1)",
    link: "/lab",
    studentImg: "https://ui-avatars.com/api/?name=Budi+Santoso&background=1D4ED8&color=fff",
    dashboardImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
  },
  {
    id: 3,
    title: "Smart Pesantren IoT",
    developer: "Muhammad Rizky",
    cohort: "Angkatan 3 (Terbaik 1)",
    link: "/lab",
    studentImg: "https://ui-avatars.com/api/?name=Muhammad+Rizky&background=047857&color=fff",
    dashboardImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80" 
  }
];

// --- GENERATOR DATA 55 KARYA (12 Vistara, 16 Rexavylion, 27 Angkatan 3) ---
const generateMockProjects = () => {
  let projects = [];
  let idCounter = 1;

  // Generate 12 Vistara
  for (let i = 1; i <= 12; i++) {
    projects.push({
      id: idCounter++,
      title: `Project Inovasi Vistara ${i}`,
      developer: `Siswa Vistara ${i}`,
      cohort: "Vistara",
      thumbnail: `https://picsum.photos/seed/vistara${i}/600/400`,
      studentImg: `https://ui-avatars.com/api/?name=Vistara+${i}&background=random`
    });
  }

  // Generate 16 Rexavylion
  for (let i = 1; i <= 16; i++) {
    projects.push({
      id: idCounter++,
      title: `Sistem Digital Rexavylion ${i}`,
      developer: `Siswa Rexavylion ${i}`,
      cohort: "Rexavylion",
      thumbnail: `https://picsum.photos/seed/rexa${i}/600/400`,
      studentImg: `https://ui-avatars.com/api/?name=Rexa+${i}&background=random`
    });
  }

  // Generate 27 Angkatan 3
  for (let i = 1; i <= 27; i++) {
    projects.push({
      id: idCounter++,
      title: `Aplikasi Terapan Angkatan Tiga ${i}`,
      developer: `Siswa Angkatan Tiga ${i}`,
      cohort: "Angkatan 3",
      thumbnail: `https://picsum.photos/seed/akt3${i}/600/400`,
      studentImg: `https://ui-avatars.com/api/?name=Angkatan+3+${i}&background=random`
    });
  }

  return projects;
};

const PROJECTS = generateMockProjects();
const FILTERS = ["All", "Vistara", "Rexavylion", "Angkatan 3"];

interface KaryaItem {
  id: string;
  title: string;
  developer: string;
  cohort: string;
  thumbnail: string;
  studentImg: string;
  link: string;
}

export default function KaryaView() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState<KaryaItem[]>([]);

  useEffect(() => {
    fetch("/api/karyas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(p => ({
            id: p.id,
            title: p.title,
            developer: p.title,
            cohort: p.tech_stack || "Umum",
            thumbnail: p.image_url,
            studentImg: p.image_url,
            link: p.link_url || "#",
          })));
        }
      })
      .catch((err) => console.error("Failed to fetch karyas:", err));
  }, []);

  // Filter Project
  const filteredProjects = projects.length > 0
    ? projects.filter(p => activeFilter === "All" ? true : p.cohort === activeFilter)
    : [];

  // Carousel Handlers
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
  };

  const activeFeatured = FEATURED_PROJECTS[currentSlide];

  return (
    <div className="bg-white min-h-screen flex flex-col pt-24">
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-24">
        
        {/* HERO FEATURED PROJECT CAROUSEL */}
        <div className="relative mb-20 group">
          <div className="w-full bg-gradient-to-br from-black via-zinc-900 to-zinc-800 rounded-[2.5rem] p-10 md:p-14 lg:p-20 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-500">
            
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Informasi Hero */}
            <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-start" key={`info-${activeFeatured.id}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold tracking-wide text-zinc-100 mb-8 shadow-sm animate-fade-in">
                <Sparkles size={16} className="text-yellow-400" /> PROJECT TERBAIK {activeFeatured.cohort.split(' ')[0].toUpperCase()}
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 tracking-tight leading-[1.1] drop-shadow-md animate-fade-in-up">
                {activeFeatured.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-12 bg-white/5 p-2.5 pr-6 rounded-full border border-white/10 backdrop-blur-sm w-fit animate-fade-in-up delay-75">
                <img 
                  src={activeFeatured.studentImg} 
                  alt={activeFeatured.developer} 
                  className="w-12 h-12 rounded-full object-cover border border-zinc-500 shadow-md"
                />
                <div>
                  <p className="text-white font-bold text-base leading-tight">{activeFeatured.developer}</p>
                  <p className="text-zinc-400 text-sm font-medium tracking-wide mt-0.5">{activeFeatured.cohort}</p>
                </div>
              </div>
              
              <button className="bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-full text-sm font-bold transition-all flex items-center gap-2 shadow-xl hover:-translate-y-1 animate-fade-in-up delay-150">
                Jelajahi Dashboard <ExternalLink size={18} />
              </button>
            </div>

            {/* Foto Dashboard Hero */}
            <div className="relative z-10 w-full lg:w-1/2" key={`img-${activeFeatured.id}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black animate-fade-in">
                <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/90 backdrop-blur-md flex items-center px-4 gap-2 z-20 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <img 
                  src={activeFeatured.dashboardImg} 
                  alt="Dashboard Mockup" 
                  className="w-full h-auto object-cover mt-8 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Navigasi Carousel */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white backdrop-blur-md p-3 rounded-full border border-white/20 transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Indikator Titik */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {FEATURED_PROJECTS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${currentSlide === idx ? 'bg-black w-8' : 'bg-zinc-300 hover:bg-zinc-400'}`}
              />
            ))}
          </div>
        </div>

        {/* HEADER KATALOG & FILTER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-6 mb-12 mt-12">
          <div>
            <h2 className="text-4xl font-black text-black tracking-tight mb-2">
              Katalog Karya Siswa
            </h2>
            <p className="text-zinc-500 text-base font-medium flex items-center gap-2">
              Menampilkan {filteredProjects.length} karya inovasi lunak ciptaan talenta muda RPL.
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

        {/* GRID KARYA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden"
            >
              {/* Thumbnail Aplikasi */}
              <div className="w-full aspect-[4/3] bg-zinc-100 relative overflow-hidden border-b border-zinc-100">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Konten & Tombol */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-black mb-4 leading-tight group-hover:text-zinc-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-3 mt-auto mb-6">
                  <img 
                    src={project.studentImg} 
                    alt={project.developer} 
                    loading="lazy"
                    className="w-9 h-9 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <p className="text-sm font-bold text-black leading-none">{project.developer}</p>
                    <p className="text-xs font-medium text-zinc-500 mt-1">{project.cohort}</p>
                  </div>
                </div>
                
                {/* Tombol Aksi Ganda */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <button className="flex-1 py-2.5 px-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 text-sm font-bold rounded-xl transition-colors">
                    Lihat Detail
                  </button>
                  <button className="flex-1 py-2.5 px-2 bg-black hover:bg-zinc-800 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md">
                    <Beaker size={16} /> Ke Lab
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* --- FOOTER --- */}
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
      
      {/* Animasi */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .delay-75 { animation-delay: 75ms; }
        .delay-150 { animation-delay: 150ms; }
      `}} />
    </div>
  );
}