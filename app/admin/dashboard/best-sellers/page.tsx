'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultBestSellers, type BestSeller } from '@/lib/default-data';
import { categories as staticCategories, type Category } from '@/lib/products';
import UploadInput from '@/components/admin/UploadInput';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

/** Keep only digits and dots from a price string, e.g. "420.000đ/m²" → "420.000". */
function priceDigits(s?: string): string {
  return (s ?? '').replace(/[^\d.]/g, '');
}

/** Suggest a product code from an image path, e.g. "/a/b/N773.jpg" → "N773". */
function codeFromImage(url?: string): string {
  return (url ?? '').split('/').pop()?.replace(/\.[^.]+$/, '').trim() ?? '';
}

/** Numeric value of a price string for discount math. "590.000" → 590000. */
function priceNumber(s?: string): number {
  const n = Number((s ?? '').replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export default function BestSellersAdminPage() {
  const [data, setData] = useState<BestSeller[]>(defaultBestSellers);
  const [products, setProducts] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');

  useUnsavedWarning(dirty);

  useEffect(() => {
    Promise.all([
      fetchContent<BestSeller[]>('best-sellers'),
      fetchContent<Category[]>('products'),
    ]).then(([bs, prods]) => {
      if (bs) setData(bs);
      if (prods) setProducts(prods);
      setLoading(false);
    });
  }, []);

  /** Route every user edit through here so dirty-tracking stays correct. */
  function commit(next: BestSeller[]) {
    setData(next);
    setDirty(true);
  }

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('best-sellers', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateItem(index: number, updates: Partial<BestSeller>) {
    commit(data.map((it, i) => (i === index ? { ...it, ...updates } : it)));
  }

  function addItem() {
    commit([...data, { code: '', price: '', image: '' }]);
  }

  /** Prefill a card from a catalog product. */
  function fillFromProduct(index: number, categoryId: string) {
    const cat = products.find((c) => c.id === categoryId);
    if (!cat) return;
    updateItem(index, {
      name: cat.name,
      code: codeFromImage(cat.image) || data[index]?.code || '',
      price: priceDigits(cat.discountedPrice || cat.priceRange || cat.originalPrice),
      originalPrice: priceDigits(
        cat.originalPrice && cat.discountedPrice ? cat.originalPrice : ''
      ),
      image: cat.image,
    });
  }

  function removeItem(index: number) {
    if (confirm('Xóa sản phẩm này?')) {
      commit(data.filter((_, i) => i !== index));
    }
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= data.length) return;
    const next = [...data];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  function missingOf(item: BestSeller): string[] {
    const m: string[] = [];
    if (!item.image) m.push('Thiếu ảnh');
    if (!item.code.trim()) m.push('Thiếu mã');
    if (!item.price.trim()) m.push('Chưa có giá');
    return m;
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl pb-4">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm bán chạy ({data.length})</h1>
          <p className="text-sm text-gray-500">Thứ tự bên dưới là thứ tự hiển thị trên trang chủ.</p>
        </div>
        <button
          onClick={addItem}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <Plus className="h-4 w-4" /> Thêm
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

      <div className="space-y-3">
        {data.map((item, index) => {
          const missing = missingOf(item);
          const discount =
            priceNumber(item.originalPrice) > priceNumber(item.price) && priceNumber(item.price) > 0
              ? Math.round((1 - priceNumber(item.price) / priceNumber(item.originalPrice)) * 100)
              : 0;
          return (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                {/* Order controls */}
                <div className="flex flex-col items-center gap-1 pt-1">
                  <span className="text-xs font-mono text-gray-400">{index + 1}</span>
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Di chuyển lên"
                    title="Di chuyển lên"
                    className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === data.length - 1}
                    aria-label="Di chuyển xuống"
                    title="Di chuyển xuống"
                    className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.code}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-[10px] text-gray-400">
                    Chưa có ảnh
                  </div>
                )}

                <div className="flex-1 space-y-3">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {missing.length > 0 ? (
                      missing.map((m) => (
                        <span
                          key={m}
                          className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"
                        >
                          <AlertTriangle className="h-3 w-3" /> {m}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Đầy đủ
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                        -{discount}%
                      </span>
                    )}
                  </div>

                  {/* Catalog prefill */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Điền nhanh từ sản phẩm
                    </label>
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) fillFromProduct(index, e.target.value);
                        e.target.value = '';
                      }}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">— Chọn sản phẩm để tự điền mã, giá, ảnh —</option>
                      {products.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Tên hiển thị (tùy chọn)
                      </label>
                      <input
                        type="text"
                        value={item.name ?? ''}
                        onChange={(e) => updateItem(index, { name: e.target.value })}
                        placeholder="VD: Sàn Gỗ Cốt Xanh"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">Mã sản phẩm</label>
                      <input
                        type="text"
                        value={item.code}
                        onChange={(e) => updateItem(index, { code: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">Giá (VNĐ/m²)</label>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => updateItem(index, { price: e.target.value })}
                        placeholder="590.000"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-gray-500">
                        Giá gốc (tùy chọn, để hiện % giảm)
                      </label>
                      <input
                        type="text"
                        value={item.originalPrice ?? ''}
                        onChange={(e) => updateItem(index, { originalPrice: e.target.value })}
                        placeholder="645.000"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <UploadInput
                    label="Ảnh sản phẩm"
                    value={item.image}
                    onChange={(url) => updateItem(index, { image: url })}
                    onMessage={showMsg}
                  />
                </div>

                <button
                  onClick={() => removeItem(index)}
                  aria-label="Xóa sản phẩm"
                  title="Xóa"
                  className="flex-shrink-0 rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AdminSaveBar dirty={dirty} saving={saving} onSave={handleSave} info={`${data.length} sản phẩm`} />
    </div>
  );
}
