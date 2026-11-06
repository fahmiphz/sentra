'use client';
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, Globe, Cpu, BookOpen, Monitor, ShieldCheck, Briefcase, 
  ChevronRight, MonitorPlay, Sparkles, GraduationCap, Store, 
  Laptop, Award, ArrowRightCircle, Shield, LayoutGrid, Brain, X, Phone, Mail, 
  Target, Users, Graduation, Building, Code2, Layers, 
  Book, ShieldCheck as ShieldCheckIcon, Briefcase as BriefcaseIcon,
  FileText, Users as UsersIcon,
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: any;
}

export default function HomeView({ setCurrentView }: any) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activitySlideIndex, setActivitySlideIndex] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [kegiatanData, setKegiatanData] = useState<any[]>([]);
  const [partnersData, setPartnersData] = useState<any[]>([]);
  const [statsData, setStatsData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/banners')
      .then((res) => res.json())
      .then((data) => {
        setHeroBanners(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch banners:', err));
  }, []);

  useEffect(() => {
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => {
        setTeachers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch teachers:', err));
  }, []);

  useEffect(() => {
    fetch('/api/kegiatan')
      .then((res) => res.json())
      .then((data) => {
        setKegiatanData(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch kegiatan:', err));
  }, []);

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => res.json())
      .then((data) => {
        setPartnersData(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch partners:', err));
  }, []);

  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        setStatsData(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to fetch stats:', err));
  }, []);

  useEffect(() => {
    if (!heroBanners || heroBanners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroBanners]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <main className="relative">
        {/* 1. HERO SECTION - Minimalis, Tanpa Ikon */}
        <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-black">
          {heroBanners?.map((img: any, idx: number) => {
            const isActive = idx === currentSlideIndex;
            return (
              <div
                key={img.id || idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={img.image_url}
                  alt={img.title || ''}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/60" />
              </div>
            );
          })}
          <div className="relative z-20 text-center max-w-6xl mx-auto space-y-8 px-6 pt-12 w-full text-white">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-sm md:text-base font-medium tracking-widest uppercase text-white/90">
              <span>SISTEM EDUKASI DAN INFORMASI TERPADU</span>
            </div>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-0.5 bg-white/20"></div>
              <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">Program Keahlian</span>
              <div className="flex-1 h-0.5 bg-white/20"></div>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-[70px] font-black tracking-[-0.02em] leading-[1.05] text-white">
              <span className="text-white">Rekayasa Perangkat</span>
              <span className="ml-8 text-white">Lunak</span>
            </h1>
            <div className="pt-6 flex flex-wrap gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentView('karya')}
                className="bg-white text-gray-900 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 flex items-center gap-2"
              >
                Lihat Karya Siswa <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setCurrentView('lab3d')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2 hover:scale-105"
              >
                <MonitorPlay size={16} /> Explore Lab 3D
              </button>
            </div>
            <div className="pt-10 flex flex-col items-center gap-3">
              <div className="flex justify-center items-center gap-2.5">
                {heroBanners?.map((_: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentSlideIndex
                        ? 'w-9 bg-white shadow-lg'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATS SECTION */}
        <section className="w-full py-16 bg-[#f8fafc] border-t border-gray-100 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData?.map((stat) => (
                <div key={stat.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                  <div className="text-4xl sm:text-5xl font-black text-[#2a688d] mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. VISI MISI SECTION */}
        <section className="w-full py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-4xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">LANDASAN UTAMA</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                Visi
              </h1>
              <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed italic">
                "Menjadi Kiblat Pendidikan Rekayasa Perangkat Lunak yang Melahirkan Pemimpin Berkarakter Islami, Hafiz, dan Kompeten di Industri Perangkat Lunak."
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-600/30">
                    <Monitor size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Misi</h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      Menyelenggarakan pendidikan terpadu melalui pendekatan CRUD untuk mencetak talenta global.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {[
                    {
                      num: '01',
                      title: 'Create with Akhlak',
                      desc: 'Pendidikan dimulai dari landasan syariat, adab, dan integritas tinggi.'
                    },
                    {
                      num: '02',
                      title: 'Read & Code System',
                      desc: 'Memahami arsitektur sistem kompleks, logika, dan penulisan standar kode.'
                    },
                    {
                      num: '03',
                      title: 'Upgrade to Industrial Standard',
                      desc: 'Meningkatkan kompetensi siwa dengan standar baku industri global.'
                    },
                    {
                      num: '04',
                      title: 'Deploy Globally',
                      desc: 'Memublikasikan karya ke publik dan melalui lulusan berada sunga internasional.'
                    }
                  ].map((item, idx) => (
                    <div key={item.num} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-teal-50 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-2xl font-black text-teal-600">{item.num}</span>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                  <p className="text-gray-600 text-sm italic">
                    Siap bekerja di industri, mandiri berwirausaha digital, atau melanjutkan kuliah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. JURUSAN RPL / KEUNGGULAN */}
        <section className="w-full py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">Program Keahlian</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2a688d] tracking-tight">Keunggulan Program Keahlian RPL</h2>
              <p className="text-gray-500 text-sm mt-2">Tiga jalur pembelajaran yang dirancang untuk mempersiapkan siapa saja menjadi profesional TI yang handal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Kurikulum Berbasis Industri',
                  icon: GraduationCap,
                  desc: 'Pembelajaran disusun sesuai kebutuhan industri yang relevan dan siap berkarya.'
                },
                {
                  title: 'Fasilitas Lab Modern',
                  icon: Building,
                  desc: 'Didukung laboratorium komputer dan studio TEFA serta menghasilkan karya.'
                },
                {
                  title: 'Penguatan Karakter',
                  icon: Shield,
                  desc: 'Membentuk siwa yang kreatif, disiplin, bertanggung jawab, dan berakhlak Islami dalam kerja.'
                },
                {
                  title: 'Portofolio Pekerjaan',
                  icon: Award,
                  desc: 'Siwa dibimbing membuat portofolio nyata sebagai bekal melanjutkan studi maupun karir.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FOKUS MATERI KEAHLIAN */}
        <section className="w-full py-24 px-6 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">KURIKULUM & KOMPETENSI</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Fokus Materi Keahlian</h2>
              <p className="text-gray-500 text-sm mt-2">Pembagian pilar materi fundamental dan kompetensi keahlian khusus untuk siwa Rekayasa Perangkat Lunak.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FUNDAMENTAL */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-[2rem] shadow-lg shadow-blue-600/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                <div className="flex items-start gap-4 mb-6">
                  <Code2 className="text-white w-8 h-8 shrink-0" />
                  <div>
                    <span className="text-blue-100 text-xs font-bold tracking-widest uppercase">FUNDAMENTAL</span>
                    <h3 className="text-3xl font-black text-white mb-4">Materi Dasar</h3>
                  </div>
                </div>
                <ul className="space-y-4 text-blue-50/90 text-sm leading-relaxed">
                  {[
                    'Web Dev Fundamental',
                    'Database & Data Engineering',
                    'Mobile Apps Fundamental',
                    'Production & Enterprise Project'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/50 rounded-full shrink-0 mt-0.5"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* KHUSUS */}
              <div className="bg-gradient-to-br from-teal-500 to-teal-700 p-8 rounded-[2rem] shadow-lg shadow-teal-600/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                <div className="flex items-start gap-4 mb-6">
                  <Code2 className="text-white w-8 h-8 shrink-0" />
                  <div>
                    <span className="text-teal-100 text-xs font-bold tracking-widest uppercase">KHUSUS</span>
                    <h3 className="text-3xl font-black text-white mb-4">Materi Khusus</h3>
                  </div>
                </div>
                <ul className="space-y-4 text-teal-50/90 text-sm leading-relaxed">
                  {[
                    'Teaching Factory (TeFa)',
                    'IoT/Robotic',
                    'Game Developer',
                    'Cyber Security',
                    'AI Engineer'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/50 rounded-full shrink-0 mt-0.5"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Professional Development Card */}
              <div className="mt-8 bg-gradient-to-r from-indigo-500 to-indigo-700 p-8 rounded-[2rem] shadow-lg shadow-indigo-600/30 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 md:w-24 md:h-24">
                  <Award size={48} />
                </div>
                <div>
                  <span className="text-indigo-100 text-xs font-bold tracking-widest uppercase block mb-2">KEAHLIAN LANJUT</span>
                  <h3 className="text-2xl font-black text-white mb-4">Professional Development</h3>
                  <p className="text-indigo-100/90 text-sm leading-relaxed">
                    Program pengembangan keterampilan profesional melalui sertifikasi, magang, dan proyek nyata bersama mitra industri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. KEGIATAN JURUSAN */}
        <section className="w-full py-20 bg-white border-y border-gray-100 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">Ekosistem Belajar</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Kegiatan Jurusan</h2>
              <p className="text-gray-500 text-sm mt-2">Dokumentasi program pembentukan mentalitas industri di luar jam pelajaran kelas.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {kegiatanData?.map((k, idx) => (
                <div key={k.id} className="relative overflow-hidden rounded-[2rem] bg-white border border-gray-100 shadow-sm group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={k.image_url}
                      alt={k.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur text-white text-xs font-bold rounded-full border border-white/30">
                        {k.kategori}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{k.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{k.description || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. PROFIL PENGAJAR - Terurut: Head of Program di Tengah */}
        <section className="w-full py-24 px-6 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">Tenaga Pendidik</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Profil Pengajar & Instruktur</h2>
              <p className="text-gray-500 text-sm md:text-base">Klik kartu profil untuk melihat detail kualifikasi pendidik profesional kami.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-start">
              {teachers?.sort((a: any, b: any) => (b.is_head || 0) - (a.is_head || 0)).map((teacher, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`relative flex flex-col overflow-hidden bg-white border-2 rounded-[2.5rem] shadow-lg group hover:shadow-2xl transition-all duration-300 cursor-pointer ${teacher.is_head ? 'border-teal-600/50 bg-teal-50/20' : 'border-gray-100'}`}
                >
                  <div className="aspect-[4/5] w-full overflow-hidden relative">
                    <img
                      src={teacher.image_url}
                      alt={teacher.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    {teacher.is_head && (
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-full shadow-lg shadow-teal-600/40 animate-pulse">
                        <span className="bg-yellow-300 text-teal-900 w-2 h-2 rounded-full animate-pulse"></span>
                        <span className="text-[11px] font-black tracking-widest uppercase">KEPALA PROGRAM</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 text-gray-900 px-5 py-2 rounded-full border border-white/40 text-sm font-semibold flex items-center gap-2 shadow-sm">
                        <BookOpen className="text-teal-600 mr-1 w-4 h-4 shrink-0" />
                        Lihat Profil
                      </span>
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold uppercase tracking-tighter">
                        {teacher.name.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                      <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-teal-600 mb-1">
                        <span className="px-2 py-1 bg-teal-50/50 text-teal-600 rounded text-[10px] font-bold">{teacher.role.split(' ')[0]}</span>
                        <span className="w-0.5 h-0.5 bg-teal-600 rounded-full"></span>
                        <span className="text-gray-500">{teacher.role.split(' ').slice(1).join(' ') || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. MITRA INDUSTRI */}
        <section className="w-full py-20 bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center mb-12 px-4">
            <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">Sinergi Industri</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Mitra Industri & Sertifikasi Profesi</h2>
            <p className="text-gray-500 text-sm mt-2">Bekerja sama dengan ekosistem perusahaan teknologi terkemuka.</p>
          </div>
          <div className="relative w-full overflow-hidden py-6">
            <div className="flex whitespace-nowrap animate-marquee-mini gap-8">
              {partnersData?.map((partner: any) => (
                <div
                  key={partner.id}
                  className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center min-w-[200px] md:min-w-[240px] h-20 text-gray-700 font-bold text-lg hover:text-teal-600 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
                >
                  {partner.name}
                </div>
              ))}
              {partnersData?.map((partner: any) => (
                <div
                  key={`dup-${partner.id}`}
                  className="px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center min-w-[200px] md:min-w-[240px] h-20 text-gray-700 font-bold text-lg hover:text-teal-600 hover:border-teal-300 hover:shadow-md transition-all cursor-pointer"
                >
                  {partner.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER BIRU GALERI */}
        <footer className="w-full bg-gradient-to-r from-[#397d91] to-[#458e9f] py-14 px-6 text-white border-t border-teal-700/30">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <div className="font-black text-4xl tracking-wider flex items-center gap-2">
                  <MonitorPlay size={40} className="text-white" /> RPL
                </div>
              </div>
              <p className="text-[15px] font-medium text-white/95 leading-relaxed max-w-sm">
                Program Keahlian Rekayasa Perangkat Lunak<br />
                SMK-IT As-Syifa Boarding School<br />
                Subang.
              </p>
              <div className="space-y-3 pt-4">
                <p className="text-sm font-medium flex items-center gap-3">
                  <Phone size={18} /> TLP/WA : +62 81122223934
                </p>
                <p className="text-sm font-medium flex items-center gap-3">
                  <Mail size={18} /> Email: assyifasmkit@gmail.com
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <h4 className="font-bold text-lg">Company</h4>
              <ul className="space-y-3 text-[15px] font-medium text-white/90">
                <li><a href="#" className="hover:text-white transition-colors">Website Sekolah</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Portofolio DKV</a></li>
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
      </main>

      {/* MODAL PROFIL GURU */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white p-2 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>
            <div className="aspect-[4/5] w-full relative">
              <img src={selectedTeacher.image_url} alt={selectedTeacher.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 leading-tight">{selectedTeacher.name}</h3>
                <p className="text-teal-400 font-semibold">{selectedTeacher.role}</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2">Bidang Keahlian & Fokus</h4>
                <p className="text-gray-800 font-medium text-sm leading-relaxed">{selectedTeacher.spec}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2">Sertifikasi Profesional</h4>
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                  <Award className="text-teal-600 mt-0.5 shrink-0" size={20} />
                  <p className="text-gray-900 font-bold text-sm leading-snug">{selectedTeacher.cert}</p>
                </div>
              </div>
              {selectedTeacher.is_head && (
                <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-center gap-3">
                  <BriefcaseIcon className="text-teal-600 shrink-0" size={20} />
                  <p className="text-sm text-teal-800 font-semibold">Menjabat sebagai Kepala Program Keahlian RPL</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
