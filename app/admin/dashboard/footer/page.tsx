'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultFooterContent, type FooterContent, type FooterLink } from '@/lib/default-data';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500';

export default function FooterAdminPage() {
  const [data, setData] = useState<FooterContent>(defaultFooterContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');

  useUnsavedWarning(dirty);

  useEffect(() => {
    fetchContent<FooterContent>('footer').then((res) => {
      // Merge so a footer.json saved before a field existed still populates it.
      if (res) setData({ ...defaultFooterContent, ...res });
      setLoading(false);
    });
  }, []);

  function commit(updates: Partial<FooterContent>) {
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
    const result = await saveContent('footer', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateLink(index: number, updates: Partial<FooterLink>) {
    commit({
      quickLinks: data.quickLinks.map((l, i) => (i === index ? { ...l, ...updates } : l)),
    });
  }

  function addLink() {
    commit({ quickLinks: [...data.quickLinks, { label: '', href: '/' }] });
  }

  function removeLink(index: number) {
    commit({ quickLinks: data.quickLinks.filter((_, i) => i !== index) });
  }

  function moveLink(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= data.quickLinks.length) return;
    const next = [...data.quickLinks];
    [next[index], next[target]] = [next[target], next[index]];
    commit({ quickLinks: next });
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
        <h1 className="text-2xl font-bold text-gray-900">Footer</h1>
        <p className="text-sm text-gray-500">
          Địa chỉ, điện thoại, email, giờ làm việc và link mạng xã hội nằm ở mục{' '}
          <strong>Thông tin cửa hàng</strong>.
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
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả cửa hàng</label>
          <textarea
            value={data.description}
            onChange={(e) => commit({ description: e.target.value })}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tiêu đề cột liên kết</label>
            <input
              type="text"
              value={data.quickLinksTitle}
              onChange={(e) => commit({ quickLinksTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tiêu đề cột liên hệ</label>
            <input
              type="text"
              value={data.contactTitle}
              onChange={(e) => commit({ contactTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tiêu đề cột giờ làm</label>
            <input
              type="text"
              value={data.hoursTitle}
              onChange={(e) => commit({ hoursTitle: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tiêu đề hộp tư vấn</label>
            <input
              type="text"
              value={data.ctaTitle}
              onChange={(e) => commit({ ctaTitle: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả hộp tư vấn</label>
            <input
              type="text"
              value={data.ctaSubtitle}
              onChange={(e) => commit({ ctaSubtitle: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Dòng bản quyền</label>
          <input
            type="text"
            value={data.copyright}
            onChange={(e) => commit({ copyright: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Dòng ghi chú cuối</label>
          <input
            type="text"
            value={data.credit}
            onChange={(e) => commit({ credit: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">
            Liên kết nhanh ({data.quickLinks.length})
          </h2>
          <button
            onClick={addLink}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm text-white transition hover:bg-green-700"
          >
            <Plus className="h-4 w-4" /> Thêm liên kết
          </button>
        </div>

        <div className="space-y-2">
          {data.quickLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(index, { label: e.target.value })}
                placeholder="Tên hiển thị"
                className={`${inputClass} flex-1 text-sm`}
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => updateLink(index, { href: e.target.value })}
                placeholder="/duong-dan"
                className={`${inputClass} flex-1 text-sm`}
              />
              <button
                onClick={() => moveLink(index, -1)}
                disabled={index === 0}
                aria-label="Di chuyển lên"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveLink(index, 1)}
                disabled={index === data.quickLinks.length - 1}
                aria-label="Di chuyển xuống"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeLink(index)}
                aria-label="Xóa liên kết"
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
