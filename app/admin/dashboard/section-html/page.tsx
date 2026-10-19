'use client';

import { useState, useEffect } from 'react';
import { Loader2, Download, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { splitScripts } from '@/lib/html';
import {
  defaultSectionHtml,
  type SectionHtml,
  type SectionHtmlKey,
  type SectionHtmlOverride,
} from '@/lib/default-data';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

const SECTIONS: { key: SectionHtmlKey; label: string; page: string; note?: string }[] = [
  { key: 'header', label: 'Header (menu trên cùng)', page: '/', note: 'Nút mở menu trên điện thoại sẽ không hoạt động nếu thay bằng HTML tĩnh.' },
  { key: 'home-hero', label: 'Trang chủ — Hero', page: '/' },
  { key: 'home-product-groups', label: 'Trang chủ — Danh mục sản phẩm', page: '/' },
  { key: 'home-best-sellers', label: 'Trang chủ — Bán chạy', page: '/' },
  { key: 'home-categories', label: 'Trang chủ — Danh mục sàn gỗ cao cấp', page: '/' },
  { key: 'home-features', label: 'Trang chủ — 3 ưu điểm', page: '/' },
  { key: 'home-cta', label: 'Trang chủ — Nhận tư vấn miễn phí', page: '/' },
  { key: 'about-page', label: 'Trang Giới thiệu (toàn bộ nội dung)', page: '/gioi-thieu' },
  { key: 'footer', label: 'Footer', page: '/' },
];

const EMPTY: SectionHtmlOverride = { enabled: false, html: '' };

/** One tag per line so a captured section is editable rather than one giant line. */
function formatHtml(html: string): string {
  return html.replace(/>\s*</g, '>\n<').trim();
}

export default function SectionHtmlAdminPage() {
  const [data, setData] = useState<SectionHtml>(defaultSectionHtml);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [previewKey, setPreviewKey] = useState<SectionHtmlKey | null>(null);
  const [capturing, setCapturing] = useState<SectionHtmlKey | null>(null);

  useUnsavedWarning(dirty);

  useEffect(() => {
    fetchContent<SectionHtml>('section-html').then((res) => {
      if (res) setData({ ...defaultSectionHtml, ...res });
      setLoading(false);
    });
  }, []);

  function update(key: SectionHtmlKey, updates: Partial<SectionHtmlOverride>) {
    setData((prev) => ({ ...prev, [key]: { ...EMPTY, ...prev[key], ...updates } }));
    setDirty(true);
  }

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('section-html', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  /** Pulls the section's live server-rendered HTML as a starting point for editing. */
  async function captureCurrent(key: SectionHtmlKey, page: string) {
    if (data[key]?.html.trim() && !confirm('Thay mã HTML đang có bằng HTML hiện tại của trang?')) return;
    setCapturing(key);
    try {
      const res = await fetch(page, { cache: 'no-store' });
      const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
      const el = doc.querySelector(`[data-section="${key}"]`);
      if (!el) throw new Error('Không tìm thấy phần này trên trang');
      update(key, { html: formatHtml(el.innerHTML) });
    } catch (e) {
      showMsg(`Lỗi: ${e instanceof Error ? e.message : String(e)}`);
    }
    setCapturing(null);
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thay phần bằng HTML</h1>
        <p className="text-sm text-gray-500">
          Bật một phần để thay toàn bộ giao diện mặc định của nó bằng mã HTML của bạn. Tắt đi là trang trở về như
          cũ. Bấm <strong>Lấy HTML hiện tại</strong> để chép giao diện đang hiển thị rồi sửa tiếp.
        </p>
      </div>

      <div className="mb-6 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <span>
          Khi bật, phần đó không còn tự cập nhật theo dữ liệu admin khác (sản phẩm, số điện thoại…). Class Tailwind chỉ
          có tác dụng nếu trang web đã dùng class đó ở đâu đó — với kiểu mới, hãy dùng thuộc tính{' '}
          <code>style=&quot;…&quot;</code>. Luôn kiểm tra trên điện thoại sau khi lưu.
        </span>
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

      <div className="space-y-4">
        {SECTIONS.map(({ key, label, page, note }) => {
          const section = data[key] ?? EMPTY;
          return (
            <div
              key={key}
              className={`rounded-xl border bg-white p-5 shadow-sm ${section.enabled ? 'border-amber-400' : 'border-gray-200'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={(e) => update(key, { enabled: e.target.checked })}
                    className="h-4 w-4 accent-amber-600"
                  />
                  <span className="font-semibold text-gray-900">{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      section.enabled ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {section.enabled ? 'Đang dùng HTML' : 'Mặc định'}
                  </span>
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => captureCurrent(key, page)}
                    disabled={capturing === key}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  >
                    {capturing === key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    Lấy HTML hiện tại
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewKey(previewKey === key ? null : key)}
                    className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800"
                  >
                    {previewKey === key ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {previewKey === key ? 'Ẩn xem trước' : 'Xem trước'}
                  </button>
                </div>
              </div>
              {note && <p className="mt-2 text-xs text-gray-500">{note}</p>}

              {(section.enabled || section.html) && (
                <textarea
                  value={section.html}
                  onChange={(e) => update(key, { html: e.target.value })}
                  rows={14}
                  spellCheck={false}
                  placeholder="Dán mã HTML, hoặc bấm “Lấy HTML hiện tại”"
                  className="mt-4 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                />
              )}

              {previewKey === key && (
                <div className="mt-4">
                  <p className="mb-1 text-xs text-gray-500">Xem trước (script không chạy ở đây)</p>
                  <div
                    className="overflow-auto rounded-lg border border-gray-200"
                    dangerouslySetInnerHTML={{ __html: splitScripts(section.html).markup }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AdminSaveBar dirty={dirty} saving={saving} onSave={handleSave} />
    </div>
  );
}
