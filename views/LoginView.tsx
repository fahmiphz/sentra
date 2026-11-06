'use client';
import React, { useState } from 'react';

export default function LoginView({ setAdminState, setCurrentView }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@assyifa.sch.id' && password === '123456') {
      setAdminState(true);
      setCurrentView('admin');
    } else {
      alert('Kredensial login salah! Gunakan admin@assyifa.sch.id / 123456');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl mx-auto flex items-center justify-center font-black text-xl mb-3 shadow-md">
            RPL
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-400 text-xs mt-1">Masuk untuk mengelola data jurusan</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Email Admin</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all" 
              placeholder="admin@assyifa.sch.id"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all" 
              placeholder="••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg">
            Masuk Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}