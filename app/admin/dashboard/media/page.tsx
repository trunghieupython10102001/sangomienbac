'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultMediaItems, type MediaItem } from '@/lib/default-data';

export default function MediaAdminPage() {
  const [data, setData] = useState<MediaItem[]>(defaultMediaItems);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent<MediaItem[]>('media').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const ok = await saveContent('media', data);
    setMessage(ok ? 'Lưu thành công!' : 'Lỗi khi lưu');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  }

  function updateItem(index: number, updates: Partial<MediaItem>) {
    const newData = [...data];
    newData[index] = { ...newData[index], ...updates };
    setData(newData);
  }

  function addItem(type: 'video' | 'image') {
    const newItem: MediaItem = {
      type,
      src: '',
      title: '',
      description: '',
      ...(type === 'video' ? { thumbnail: '' } : {}),
    };
    setData([...data, newItem]);
  }

  function removeItem(index: number) {
    if (confirm('Xóa mục này?')) {
      setData(data.filter((_, i) => i !== index));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const videos = data.filter((i) => i.type === 'video');
  const images = data.filter((i) => i.type === 'image');

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Video & Hình ảnh ({videos.length} video, {images.length} ảnh)
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => addItem('video')}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
          >
            <Plus className="w-4 h-4" /> Video
          </button>
          <button
            onClick={() => addItem('image')}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm"
          >
            <Plus className="w-4 h-4" /> Ảnh
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start gap-4">
              <span className={`text-xs font-bold px-2 py-1 rounded ${item.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {item.type === 'video' ? 'VIDEO' : 'ẢNH'}
              </span>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, { title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {item.type === 'video' ? 'Video URL' : 'Ảnh URL'}
                    </label>
                    <input
                      type="text"
                      value={item.src}
                      onChange={(e) => updateItem(index, { src: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  {item.type === 'video' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Thumbnail URL</label>
                      <input
                        type="text"
                        value={item.thumbnail || ''}
                        onChange={(e) => updateItem(index, { thumbnail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
