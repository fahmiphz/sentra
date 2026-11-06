'use client'; // Wajib ditambahkan karena file ini menggunakan state & efek (useState, useEffect)

import React, { useState, useEffect } from 'react';


// 2. Import Semua Komponen Tampilan (Views)
import Navbar from '@/components/Navbar';
import HomeView from '@/views/HomeView';
import KaryaView from '@/views/KaryaView';
import PrestasiView from '@/views/PrestasiView';
import GaleriView from '@/views/GaleriView';
import BlogView from '@/views/BlogView';
import Lab3DView from '@/views/Lab3DView';
import LoginView from '@/views/LoginView';
import AdminDashboard from '@/views/AdminDashboard';

export default function App() {
  // State Navigasi
  const [currentView, setCurrentView] = useState('home');
  
  // State Autentikasi (Admin)
  const [user, setUser] = useState<any>(null);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  
  // State Tahun untuk mengatasi Hydration Error
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  

  // Set tahun saat komponen di-mount di klien (Browser)
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // (Nanti letakkan useEffect Firebase Anda di sini sesuai kode asli)

  // 3. Fungsi Render Berdasarkan Menu (Switch Case dari kode asli Anda)
  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView setCurrentView={setCurrentView} />;
      case 'karya': return <KaryaView />;
      case 'prestasi': return <PrestasiView />;
      case 'lab3d': return <Lab3DView />;
      case 'galeri': return <GaleriView />;
      case 'blog': return <BlogView />;
      case 'login': return <LoginView setAdminState={setIsAdminAuth} setCurrentView={setCurrentView} />;
      case 'admin': 
        return isAdminAuth 
          ? <AdminDashboard user={user} setAdminState={setIsAdminAuth} setCurrentView={setCurrentView} /> 
          : <LoginView setAdminState={setIsAdminAuth} setCurrentView={setCurrentView} />;
      default: return <HomeView setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navbar Menerima Props user dan state navigasi */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        user={{ ...user, isAdmin: isAdminAuth }} 
      />
      
      {/* Wadah Utama Tempat Halaman Dirender */}
      <main className="relative">
        {renderView()}
      </main>
      
      {/* Footer disembunyikan saat di halaman Admin/Login */}
      {currentView !== 'admin' && currentView !== 'login' && (
        <footer className="bg-gray-50 py-12 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-xs">
            <p>© {currentYear !== null ? currentYear : ''} Program Keahlian RPL SMK-IT As-Syifa Boarding School Subang.</p>
            <p className="mt-1 text-gray-400">Membangun peradaban digital dengan akhlaq mulia & standar teknologi global.</p>
          </div>
        </footer>
      )}
    </div>
  );
}