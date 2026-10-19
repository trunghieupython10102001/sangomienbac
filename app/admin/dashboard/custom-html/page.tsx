'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import {
  defaultCustomHtml,
  type CustomHtmlBlock,
  type CustomHtmlPosition,
} from '@/lib/default-data';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500';

const POSITIONS: { value: CustomHtmlPosition; label: string }[] = [
  { value: 'after-header', label: 'Dưới header (đầu trang)' },
  { value: 'before-footer', label: 'Trên footer (cuối trang)' },
];

function newBlock(): CustomHtmlBlock {
  return {
    id: crypto.randomUUID(),
    name: 'Khối HTML mới',
    html: '',
    position: 'before-footer',
    paths: '',
    enabled: true,
  };
}

export default function CustomHtmlAdminPage() {
  const [blocks, setBlocks] = useState<CustomHtmlBlock[]>(defaultCustomHtml);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [previewId, setPreviewId] = useState<string | null>(null);

  useUnsavedWarning(dirty);

  useEffect(() => {
    fetchContent<CustomHtmlBlock[]>('custom-html').then((res) => {
      if (Array.isArray(res)) setBlocks(res);
      setLoading(false);
    });
  }, []);

  function commit(next: CustomHtmlBlock[]) {
    setBlocks(next);
    setDirty(true);
  }

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('custom-html', blocks);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateBlock(index: number, updates: Partial<CustomHtmlBlock>) {
    commit(blocks.map((b, i) => (i === index ? { ...b, ...updates } : b)));
  }

  function removeBlock(index: number) {
    if (confirm('Xóa khối HTML này?')) commit(blocks.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
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
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HTML tùy chỉnh</h1>
          <p className="text-sm text-gray-500">
            Chèn đoạn HTML (banner, bản đồ, video nhúng, widget, mã theo dõi…) vào đầu hoặc cuối các trang.
            Dùng được thẻ &lt;script&gt;. Với kiểu mới nên dùng thuộc tính style=&quot;…&quot; (class Tailwind chỉ có tác dụng nếu trang đã dùng class đó).
          </p>
        </div>
        <button
          onClick={() => commit([...blocks, newBlock()])}
          className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-700"
        >
          <Plus className="h-4 w-4" /> Thêm khối
        </button>
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

      {blocks.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Chưa có khối HTML nào. Bấm <strong>Thêm khối</strong> để bắt đầu.
        </div>
      )}

      <div className="space-y-5">
        {blocks.map((block, index) => (
          <div
            key={block.id}
            className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${block.enabled ? '' : 'opacity-60'}`}
          >
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={block.name}
                onChange={(e) => updateBlock(index, { name: e.target.value })}
                placeholder="Tên khối (chỉ hiển thị trong admin)"
                className={`${inputClass} flex-1 font-medium`}
              />
              <label className="flex items-center gap-2 whitespace-nowrap px-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={block.enabled}
                  onChange={(e) => updateBlock(index, { enabled: e.target.checked })}
                  className="h-4 w-4 accent-amber-600"
                />
                Hiển thị
              </label>
              <button
                onClick={() => moveBlock(index, -1)}
                disabled={index === 0}
                aria-label="Di chuyển lên"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => moveBlock(index, 1)}
                disabled={index === blocks.length - 1}
                aria-label="Di chuyển xuống"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeBlock(index)}
                aria-label="Xóa khối"
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Vị trí</label>
                <select
                  value={block.position}
                  onChange={(e) => updateBlock(index, { position: e.target.value as CustomHtmlPosition })}
                  className={inputClass}
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Hiện ở trang</label>
                <input
                  type="text"
                  value={block.paths}
                  onChange={(e) => updateBlock(index, { paths: e.target.value })}
                  placeholder="Để trống = tất cả trang. VD: /, /san-pham/*"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Mã HTML</label>
                <button
                  onClick={() => setPreviewId(previewId === block.id ? null : block.id)}
                  className="flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800"
                >
                  {previewId === block.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {previewId === block.id ? 'Ẩn xem trước' : 'Xem trước'}
                </button>
              </div>
              <textarea
                value={block.html}
                onChange={(e) => updateBlock(index, { html: e.target.value })}
                rows={10}
                spellCheck={false}
                placeholder={'<div class="container mx-auto px-4 py-8">\n  <h2>Tiêu đề</h2>\n  <p>Nội dung…</p>\n</div>'}
                className={`${inputClass} font-mono text-sm`}
              />
            </div>

            {previewId === block.id && (
              <div className="mt-4">
                <p className="mb-1 text-xs text-gray-500">
                  Xem trước (script không chạy ở đây — xem trên trang thật sau khi lưu)
                </p>
                <div
                  className="overflow-auto rounded-lg border border-gray-200 bg-white"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <AdminSaveBar dirty={dirty} saving={saving} onSave={handleSave} info={`${blocks.length} khối`} />
    </div>
  );
}
