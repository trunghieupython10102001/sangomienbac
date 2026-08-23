'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultHomeHero, type HomeHero, type HeroHighlight } from '@/lib/default-data';
import UploadInput from '@/components/admin/UploadInput';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500';

export default function HomeHeroAdminPage() {
  const [data, setData] = useState<HomeHero>(defaultHomeHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');

  useUnsavedWarning(dirty);

  useEffect(() => {
    fetchContent<HomeHero>('home-hero').then((res) => {
      if (res) setData({ ...defaultHomeHero, ...res });
      setLoading(false);
    });
  }, []);

  function commit(updates: Partial<HomeHero>) {
    setData((prev) => ({ ...prev, ...updates }));
    setDirty(true);
  }

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('home-hero', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateHighlight(index: number, updates: Partial<HeroHighlight>) {
    commit({
      highlights: data.highlights.map((h, i) => (i === index ? { ...h, ...updates } : h)),
    });
  }

  function addHighlight() {
    commit({ highlights: [...data.highlights, { title: '', description: '' }] });
  }

  function removeHighlight(index: number) {
    commit({ highlights: data.highlights.filter((_, i) => i !== index) });
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl pb-24">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Hero trang chủ</h1>
        <p className="text-sm text-gray-500">
          Phần giới thiệu ở đầu trang chủ. Không có ảnh thì nội dung sẽ tự căn giữa toàn chiều rộng.
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-lg p-3 text-sm ${
            message.includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={data.enabled}
            onChange={(e) => commit({ enabled: e.target.checked })}
            className="h-4 w-4 accent-amber-600"
          />
          <span className="text-sm font-medium text-gray-700">Hiển thị phần này trên trang chủ</span>
        </label>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nhãn nhỏ phía trên</label>
          <input
            type="text"
            value={data.badge}
            onChange={(e) => commit({ badge: e.target.value })}
            placeholder="PHÂN PHỐI & THI CÔNG TRỌN GÓI"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tiêu đề chính</label>
          <textarea
            value={data.title}
            onChange={(e) => commit({ title: e.target.value })}
            rows={2}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả</label>
          <textarea
            value={data.description}
            onChange={(e) => commit({ description: e.target.value })}
            rows={4}
            className={inputClass}
          />
        </div>

        <UploadInput
          label="Ảnh minh họa (để trống sẽ căn giữa toàn chiều rộng)"
          value={data.image}
          onChange={(url) => commit({ image: url })}
          onMessage={showMsg}
          preview
        />
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-gray-900">Nút bấm</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Nút chính - chữ</label>
            <input
              type="text"
              value={data.primaryCta.label}
              onChange={(e) => commit({ primaryCta: { ...data.primaryCta, label: e.target.value } })}
              className={`${inputClass} text-sm`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Nút chính - liên kết</label>
            <input
              type="text"
              value={data.primaryCta.href}
              onChange={(e) => commit({ primaryCta: { ...data.primaryCta, href: e.target.value } })}
              placeholder="/san-pham"
              className={`${inputClass} text-sm`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Nút phụ - chữ</label>
            <input
              type="text"
              value={data.secondaryCta.label}
              onChange={(e) =>
                commit({ secondaryCta: { ...data.secondaryCta, label: e.target.value } })
              }
              className={`${inputClass} text-sm`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Nút phụ - liên kết</label>
            <input
              type="text"
              value={data.secondaryCta.href}
              onChange={(e) =>
                commit({ secondaryCta: { ...data.secondaryCta, href: e.target.value } })
              }
              placeholder="/lien-he"
              className={`${inputClass} text-sm`}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-gray-500">Để trống phần chữ nếu muốn ẩn nút.</p>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Điểm nhấn ({data.highlights.length})</h2>
          <button
            onClick={addHighlight}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white transition hover:bg-green-700"
          >
            <Plus className="h-4 w-4" /> Thêm
          </button>
        </div>

        <div className="space-y-2">
          {data.highlights.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateHighlight(index, { title: e.target.value })}
                placeholder="Tiêu đề"
                className={`${inputClass} flex-1 text-sm`}
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateHighlight(index, { description: e.target.value })}
                placeholder="Mô tả ngắn"
                className={`${inputClass} flex-1 text-sm`}
              />
              <button
                onClick={() => removeHighlight(index)}
                aria-label="Xóa điểm nhấn"
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <AdminSaveBar dirty={dirty} saving={saving} onSave={handleSave} />
    </div>
  );
}
