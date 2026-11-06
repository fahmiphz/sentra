'use client';
import React, { useState } from 'react';
import { Home, Code, Trophy, MonitorPlay, Image as ImageIcon, BookOpen, Settings, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: any;
}

export default function Navbar({ currentView, setCurrentView, user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'karya', label: 'Karya', icon: Code },
    { id: 'prestasi', label: 'Prestasi', icon: Trophy },
    { id: 'lab3d', label: 'Lab 3D', icon: MonitorPlay },
    { id: 'galeri', label: 'Galeri', icon: ImageIcon },
    { id: 'blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none">
      <div className="flex w-full max-w-5xl gap-3 items-center justify-between">
        
        {/* Left Pill - Brand Logo */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-full px-6 py-2.5 shadow-sm flex items-center pointer-events-auto">
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            SENTRA
          </span>
        </div>

        {/* Center Pill - Sliding Navigation */}
        <div className="hidden md:flex bg-white/75 backdrop-blur-xl border border-white/50 rounded-full p-1.5 shadow-sm pointer-events-auto items-center space-x-1 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors duration-200 z-10 ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {/* Background Bergeser/Sliding Animasi */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gray-900 rounded-full -z-10 shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Pill - Admin/Auth */}
        <div className="hidden md:flex bg-white/70 backdrop-blur-xl border border-white/40 rounded-full px-2 py-1.5 shadow-sm pointer-events-auto">
          <button
            onClick={() => setCurrentView(user?.isAdmin ? 'admin' : 'login')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
              currentView === 'admin' || currentView === 'login'
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
            }`}
          >
            <Settings size={14} />
            {user?.isAdmin ? 'Admin' : 'Login'}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-full p-2.5 shadow-md">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 rounded-full p-1">
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-4 pointer-events-auto flex flex-col gap-2 md:hidden z-50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}