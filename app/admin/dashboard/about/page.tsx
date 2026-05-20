'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultAboutContent, type AboutContent } from '@/lib/default-data';

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutContent>(defaultAboutContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent<AboutContent>('about').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const ok = await saveContent('about', data);
    setMessage(ok ? 'Lưu thành công!' : 'Lỗi khi lưu');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  }

  function updateSection(index: number, updates: { title?: string; content?: string }) {
    const newSections = [...data.sections];
    newSections[index] = { ...newSections[index], ...updates };
    setData({ ...data, sections: newSections });
  }

  function addSection() {
    setData({
      ...data,
      sections: [...data.sections, { title: 'Phần mới', content: '' }],
    });
  }

  function removeSection(index: number) {
    if (confirm('Xóa phần này?')) {
      setData({
        ...data,
        sections: data.sections.filter((_, i) => i !== index),
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trang giới thiệu</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Lưu
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề trang</label>
          <input
            type="text"
            value={data.heroTitle}
            onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phụ đề</label>
          <input
            type="text"
            value={data.heroSubtitle}
            onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Các phần nội dung</h2>
        <button
          onClick={addSection}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition text-sm"
        >
          <Plus className="w-4 h-4" /> Thêm phần
        </button>
      </div>

      <div className="space-y-4">
        {data.sections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 mr-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề phần</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(index, { title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <button
                onClick={() => removeSection(index)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea
                value={section.content}
                onChange={(e) => updateSection(index, { content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
