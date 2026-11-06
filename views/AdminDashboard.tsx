'use client';
import React, { useState, useEffect } from 'react';
import { 
  Code, Trophy, Image as ImageIcon, BookOpen, LogOut, Plus, Edit2, Trash2, 
  X, User, Laptop, Store, Target, Filter, 
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: any;
}

interface Item {
  id: string;
  title: string;
  [key: string]: any;
}

interface TabData {
  [key: string]: Item[];
}

const API_MAP: Record<string, string> = {
  projects: '/api/karyas',
  prestasi: '/api/prestasi',
  galeri: '/api/galeri',
  blog: '/api/blogs',
  banners: '/api/banners',
  teachers: '/api/teachers',
  kegiatan: '/api/kegiatan',
  partners: '/api/partners',
  stats: '/api/stats',
};

const TABS: TabItem[] = [
  { id: 'banners', label: 'Hero Banner', icon: ImageIcon },
  { id: 'projects', label: 'Karya', icon: Code },
  { id: 'prestasi', label: 'Prestasi', icon: Trophy },
  { id: 'galeri', label: 'Galeri', icon: ImageIcon },
  { id: 'blog', label: 'Blog', icon: BookOpen },
  { id: 'teachers', label: 'Pengajar', icon: User },
  { id: 'kegiatan', label: 'Kegiatan', icon: Laptop },
  { id: 'partners', label: 'Mitra Industri', icon: Store },
  { id: 'stats', label: 'Statistik', icon: Target },
];

const COHORT_OPTIONS = [
  { value: 'all', label: 'Semua Angkatan' },
  { value: 'Vistara', label: 'Vistara' },
  { value: 'Rexavylion', label: 'Rexavylion' },
  { value: 'Angkatan 3', label: 'Angkatan 3' },
];

export default function AdminDashboard({ user, setAdminState, setCurrentView }: any = {}) {
  const [activeTab, setActiveTab] = useState('banners');
  const [data, setData] = useState<TabData>({});
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  
  // For photo upload tabs
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addPreview, setAddPreview] = useState<string | null>(null);
  
  // For text input tabs (stats)
  const [editValue, setEditValue] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [addValue, setAddValue] = useState('');
  const [addLabel, setAddLabel] = useState('');
  
  // For cohort filter (karyas, prestasi)
  const [selectedCohort, setSelectedCohort] = useState('all');
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const url = API_MAP[activeTab];
    if (!url) return;
    setLoading(true);
    
    // Add cohort filter for karyas and prestasi
    let fetchUrl = url;
    if ((activeTab === 'projects' || activeTab === 'prestasi') && selectedCohort && selectedCohort !== 'all') {
      fetchUrl += `?cohort=${encodeURIComponent(selectedCohort)}`;
    }
    
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((json) => {
        setData({ ...data, [activeTab]: Array.isArray(json) ? json : [] });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      });
  }, [activeTab, selectedCohort]);

  const handleLogout = () => {
    if (setAdminState) setAdminState(false);
    if (setCurrentView) setCurrentView('home');
  };

  const getImageField = (item: Item): string => {
    if (activeTab === 'blog') return item.cover_image || '';
    if (activeTab === 'partners') return item.logo_url || '';
    return item.image_url || '';
  };

  const getColumns = (tab: string) => {
    switch (tab) {
      case 'banners':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'is_active', label: 'Status', format: (v: any) => v === 1 ? 'Aktif' : 'Nonaktif' },
        ];
      case 'projects':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'cohort', label: 'Angkatan' },
          { key: 'tech_stack', label: 'Tech Stack' },
        ];
      case 'prestasi':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'peringkat', label: 'Peringkat' },
          { key: 'tingkat', label: 'Tingkat' },
          { key: 'tahun', label: 'Tahun' },
          { key: 'cohort', label: 'Angkatan' },
        ];
      case 'galeri':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'kategori', label: 'Kategori' },
        ];
      case 'blog':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'author', label: 'Penulis' },
        ];
      case 'teachers':
        return [
          { key: 'name', label: 'Nama' },
          { key: 'role', label: 'Role' },
          { key: 'is_head', label: 'Status', format: (v: any) => v === 1 ? 'Kepala Program' : 'Pengajar' },
        ];
      case 'kegiatan':
        return [
          { key: 'title', label: 'Judul' },
          { key: 'kategori', label: 'Kategori' },
        ];
      case 'partners':
        return [
          { key: 'name', label: 'Nama Mitra' },
          { key: 'website_url', label: 'Website' },
        ];
      case 'stats':
        return [
          { key: 'value', label: 'Nilai' },
          { key: 'label', label: 'Keterangan' },
          { key: 'is_active', label: 'Status', format: (v: any) => v === 1 ? 'Aktif' : 'Nonaktif' },
        ];
      default:
        return [{ key: 'title', label: 'Judul' }];
    }
  };

  const handleEdit = (item: Item) => {
    setEditItem(item);
    setEditFile(null);
    setEditPreview(null);
    setEditValue(item.value || '');
    setEditLabel(item.label || '');
    setEditModal(true);
  };

  const handleAdd = () => {
    setAddFile(null);
    setAddPreview(null);
    setAddValue('');
    setAddLabel('');
    setAddModal(true);
  };

  const handleEditFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditFile(file);
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const handleAddFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddFile(file);
      setAddPreview(URL.createObjectURL(file));
    }
  };

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditLabel(e.target.value);
  };

  const handleAddValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(e.target.value);
  };

  const handleAddLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddLabel(e.target.value);
  };

  const handleEditCohortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleAddCohortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(e.target.value);
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!data.url) throw new Error(data.error || 'Upload failed');
    return data.url;
  };

  const handleSaveEdit = async () => {
    if (!editItem) return;
    setUploading(true);
    try {
      if (activeTab === 'stats') {
        await fetch(`${API_MAP[activeTab]}/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: editValue, label: editLabel }),
        });
      } else if (activeTab === 'projects' || activeTab === 'prestasi') {
        if (!editFile) {
          alert('Silakan pilih foto terlebih dahulu');
          setUploading(false);
          return;
        }
        const url = await uploadFile(editFile);
        let imageField = 'image_url';
        
        await fetch(`${API_MAP[activeTab]}/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            [imageField]: url,
            cohort: editValue, // For karyas/prestasi, editValue is used for cohort when editing
          }),
        });
      } else {
        if (!editFile) {
          alert('Silakan pilih foto terlebih dahulu');
          setUploading(false);
          return;
        }
        const url = await uploadFile(editFile);
        let imageField = 'image_url';
        if (activeTab === 'blog') imageField = 'cover_image';
        
        await fetch(`${API_MAP[activeTab]}/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [imageField]: url }),
        });
      }

      const url2 = API_MAP[activeTab];
      if (url2) {
        let fetchUrl = url2;
        if ((activeTab === 'projects' || activeTab === 'prestasi') && selectedCohort && selectedCohort !== 'all') {
          fetchUrl += `?cohort=${encodeURIComponent(selectedCohort)}`;
        }
        fetch(fetchUrl)
          .then((r) => r.json())
          .then((json) => {
            setData({ ...data, [activeTab]: Array.isArray(json) ? json : [] });
          });
      }

      setUploading(false);
      setEditModal(false);
      setEditItem(null);
      setEditFile(null);
      setEditPreview(null);
      setEditValue('');
      setEditLabel('');
      alert('Data berhasil diperbarui!');
    } catch (err) {
      setUploading(false);
      alert('Gagal memperbarui data: ' + (err as Error).message);
    }
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      if (activeTab === 'stats') {
        const body = {
          value: addValue,
          label: addLabel,
          order_index: 0,
          is_active: 1,
        };
        const res = await fetch(API_MAP[activeTab], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const created = await res.json();
        if (created.id) {
          setData({ ...data, [activeTab]: [created, ...(data[activeTab] || [])] });
        }
      } else if (activeTab === 'projects' || activeTab === 'prestasi') {
        if (!addFile) {
          alert('Silakan pilih foto terlebih dahulu');
          setUploading(false);
          return;
        }
        const url = await uploadFile(addFile);
        let imageField = 'image_url';
        
        const body: any = {
          [imageField]: url,
          cohort: addValue, // For karyas/prestasi, addValue is used for cohort
        };
        
        if (activeTab === 'projects') {
          body.title = body.title || 'Karya Baru';
          body.description = body.description || '';
          body.tech_stack = body.tech_stack || '';
          body.link_url = body.link_url || '#';
        } else if (activeTab === 'prestasi') {
          body.title = body.title || 'Prestasi Baru';
          body.peringkat = body.peringkat || 'Juara';
          body.tingkat = body.tingkat || 'Nasional';
          body.tahun = body.tahun || 2025;
        }

        const res = await fetch(API_MAP[activeTab], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const created = await res.json();
        if (created.id) {
          setData({ ...data, [activeTab]: [created, ...(data[activeTab] || [])] });
        }
      } else {
        if (!addFile) {
          alert('Silakan pilih foto terlebih dahulu');
          setUploading(false);
          return;
        }
        const url = await uploadFile(addFile);
        let imageField = 'image_url';
        if (activeTab === 'blog') imageField = 'cover_image';

        const body: any = { [imageField]: url };
        
        if (activeTab === 'banners') {
          body.title = body.title || 'Banner Baru';
          body.is_active = 1;
          body.order_index = 0;
        } else if (activeTab === 'projects') {
          body.title = body.title || 'Karya Baru';
          body.description = body.description || '';
          body.tech_stack = body.tech_stack || '';
          body.link_url = body.link_url || '#';
        } else if (activeTab === 'prestasi') {
          body.title = body.title || 'Prestasi Baru';
          body.peringkat = body.peringkat || 'Juara';
          body.tingkat = body.tingkat || 'Nasional';
          body.tahun = body.tahun || 2025;
        } else if (activeTab === 'galeri') {
          body.title = body.title || 'Foto Baru';
          body.kategori = body.kategori || 'Umum';
        } else if (activeTab === 'blog') {
          body.slug = body.slug || 'artikel-baru';
          body.title = body.title || 'Artikel Baru';
          body.content = body.content || '';
          body.author = body.author || 'Admin';
          body.is_published = 1;
        } else if (activeTab === 'teachers') {
          body.name = body.name || 'Guru Baru';
          body.role = body.role || 'Guru';
          body.spec = body.spec || '';
          body.cert = body.cert || '';
          body.is_head = 0;
        } else if (activeTab === 'kegiatan') {
          body.title = body.title || 'Kegiatan Baru';
          body.description = body.description || '';
          body.kategori = body.kategori || 'Umum';
        } else if (activeTab === 'partners') {
          body.name = body.name || 'Mitra Baru';
          body.website_url = body.website_url || '';
          body.is_active = 1;
        }

        const res = await fetch(API_MAP[activeTab], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const created = await res.json();
        if (created.id) {
          setData({ ...data, [activeTab]: [created, ...(data[activeTab] || [])] });
        }
      }

      setUploading(false);
      setAddModal(false);
      setAddFile(null);
      setAddPreview(null);
      setAddValue('');
      setAddLabel('');
      alert('Data baru berhasil ditambahkan!');
    } catch (err) {
      setUploading(false);
      alert('Gagal menambahkan data: ' + (err as Error).message);
    }
  };

  const handleDelete = (item: Item) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    fetch(`${API_MAP[activeTab]}/${item.id}`, { method: 'DELETE' })
      .then(() => {
        setData({
          ...data,
          [activeTab]: (data[activeTab] || []).filter((i) => i.id !== item.id),
        });
        alert('Data berhasil dihapus!');
      })
      .catch((err) => {
        alert('Gagal menghapus data');
        console.error(err);
      });
  };

  const columns = getColumns(activeTab);
  const items = data[activeTab] || [];

  // Show cohort filter only for karyas and prestasi
  const showCohortFilter = activeTab === 'projects' || activeTab === 'prestasi';

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white rounded-[32px] shadow-sm border border-gray-100 p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">RPL SMK-IT As-Syifa</p>
          </div>
          {setAdminState || setCurrentView ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors text-sm font-semibold">
              <LogOut size={14} /> Keluar
            </button>
          ) : null}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedCohort('all'); // Reset cohort filter when switching tabs
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 capitalize">{activeTab} Management</h2>
          <div className="flex gap-2">
            {showCohortFilter && (
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filter Angkatan:</label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {COHORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} /> Tambah Data
            </button>
            <button
              onClick={() => {
                const url = API_MAP[activeTab];
                if (url) {
                  let fetchUrl = url;
                  if ((activeTab === 'projects' || activeTab === 'prestasi') && selectedCohort && selectedCohort !== 'all') {
                    fetchUrl += `?cohort=${encodeURIComponent(selectedCohort)}`;
                  }
                  fetch(fetchUrl)
                    .then((r) => r.json())
                    .then((json) => {
                      setData({ ...data, [activeTab]: Array.isArray(json) ? json : [] });
                    });
                }
              }}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <span className="mr-1">↻</span> Segarkan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Memuat data...</div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p>Belum ada data {activeTab}. Klik "Tambah Data" untuk menambah.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="p-4 font-semibold text-gray-500 uppercase text-xs">
                        {col.label}
                      </th>
                    ))}
                    <th className="p-4 font-semibold text-gray-500 uppercase text-xs text-right w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      {columns.map((col) => (
                        <td key={col.key} className="p-4">
                          {col.format ? col.format(item[col.key]) : item[col.key] || '-'}
                        </td>
                      ))}
                      <td className="p-4 flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Photo/Stat Modal */}
      {editModal && editItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                {activeTab === 'stats' ? 'Edit Statistik' : activeTab === 'partners' ? 'Edit Mitra' : activeTab === 'teachers' ? 'Edit Pengajar' : activeTab === 'kegiatan' ? 'Edit Kegiatan' : 'Edit Foto'} - {editItem.title || editItem.name || editItem.value || ''}
              </h3>
              <button
                onClick={() => {
                  setEditModal(false);
                  setEditItem(null);
                  setEditFile(null);
                  setEditPreview(null);
                  setEditValue('');
                  setEditLabel('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {activeTab === 'stats' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nilai (Angka)
                    </label>
                    <input
                      type="text"
                      defaultValue={editItem.value || ''}
                      onChange={handleEditValueChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      defaultValue={editItem.label || ''}
                      onChange={handleEditLabelChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'partners' ? 'Nama Mitra' : activeTab === 'teachers' ? 'Nama Pengajar' : activeTab === 'kegiatan' ? 'Judul Kegiatan' : activeTab === 'projects' ? 'Judul Karya' : activeTab === 'prestasi' ? 'Judul Prestasi' : 'Judul'}
                    </label>
                    <input
                      type="text"
                      defaultValue={editItem.title || editItem.name || editItem.value || ''}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      readOnly
                    />
                  </div>
                  
                  {activeTab === 'projects' || activeTab === 'prestasi' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Angkatan (Cohort)
                      </label>
                      <select
                        defaultValue={editItem.cohort || 'Angkatan 3'}
                        onChange={handleEditCohortChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {COHORT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ganti Foto
                      </label>
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditFileSelect}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                        {editPreview && (
                          <img src={editPreview} alt="Preview" className="w-64 h-48 object-cover rounded-xl border border-gray-200 shadow-sm" />
                        )}
                        {getImageField(editItem) && (
                          <img src={getImageField(editItem)} alt="Current" className="w-64 h-48 object-cover rounded-xl border border-gray-200 shadow-sm mt-2" />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setEditModal(false);
                    setEditItem(null);
                    setEditFile(null);
                    setEditPreview(null);
                    setEditValue('');
                    setEditLabel('');
                  }}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={uploading}
                  className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    uploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  }`}
                >
                  {uploading ? 'Menyimpan...' : activeTab === 'stats' ? 'Simpan Statistik' : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Data Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                {activeTab === 'stats' ? 'Tambah Statistik' : activeTab === 'partners' ? 'Tambah Mitra' : activeTab === 'teachers' ? 'Tambah Pengajar' : activeTab === 'kegiatan' ? 'Tambah Kegiatan' : activeTab === 'projects' ? 'Tambah Karya' : activeTab === 'prestasi' ? 'Tambah Prestasi' : 'Tambah Data'}
              </h3>
              <button
                onClick={() => {
                  setAddModal(false);
                  setAddFile(null);
                  setAddPreview(null);
                  setAddValue('');
                  setAddLabel('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="p-6 space-y-6">
              {activeTab === 'stats' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nilai (Angka)
                    </label>
                    <input
                      type="text"
                      defaultValue={addValue}
                      onChange={handleAddValueChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      defaultValue={addLabel}
                      onChange={handleAddLabelChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {activeTab === 'partners' ? 'Nama Mitra' : activeTab === 'teachers' ? 'Nama Pengajar' : activeTab === 'kegiatan' ? 'Judul Kegiatan' : activeTab === 'projects' ? 'Judul Karya' : activeTab === 'prestasi' ? 'Judul Prestasi' : 'Judul'}
                    </label>
                    <input
                      type="text"
                      defaultValue={addValue}
                      onChange={handleAddValueChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  {activeTab === 'projects' || activeTab === 'prestasi' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Angkatan (Cohort)
                      </label>
                      <select
                        defaultValue={addValue || 'Angkatan 3'}
                        onChange={handleAddCohortChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        {COHORT_OPTIONS.filter(o => o.value !== 'all').map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Foto
                      </label>
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAddFileSelect}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                        {addPreview && (
                          <img src={addPreview} alt="Preview" className="w-64 h-48 object-cover rounded-xl border border-gray-200 shadow-sm" />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setAddModal(false);
                    setAddFile(null);
                    setAddPreview(null);
                    setAddValue('');
                    setAddLabel('');
                  }}
                  className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    uploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
                  }`}
                >
                  {uploading ? 'Menyimpan...' : activeTab === 'stats' ? 'Simpan Statistik' : 'Simpan Data Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
