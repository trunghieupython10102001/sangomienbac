'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultProductGroups, type ProductGroup } from '@/lib/default-data';
import { categories as staticCategories, type Category } from '@/lib/products';
import UploadInput from '@/components/admin/UploadInput';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

/** Vietnamese-aware slug: "Sàn Gỗ Công Nghiệp" → "san-go-cong-nghiep". */
function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProductGroupsAdminPage() {
  const [data, setData] = useState<ProductGroup[]>(defaultProductGroups);
  const [products, setProducts] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');

  useUnsavedWarning(dirty);

  useEffect(() => {
    Promise.all([
      fetchContent<ProductGroup[]>('product-groups'),
      fetchContent<Category[]>('products'),
    ]).then(([groups, prods]) => {
      if (groups) setData(groups);
      if (prods) setProducts(prods);
      setLoading(false);
    });
  }, []);

  /** Route every user edit through here so dirty-tracking stays correct. */
  function commit(next: ProductGroup[]) {
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
    const result = await saveContent('product-groups', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateItem(index: number, updates: Partial<ProductGroup>) {
    commit(data.map((it, i) => (i === index ? { ...it, ...updates } : it)));
  }

  /** Keep the slug tracking the name until the admin types their own. */
  function updateName(index: number, name: string) {
    const item = data[index];
    const slugWasAuto = !item.slug || item.slug === slugify(item.name);
    updateItem(index, { name, ...(slugWasAuto ? { slug: slugify(name) } : {}) });
  }

  function addItem() {
    commit([
      ...data,
      {
        id: `${Date.now()}`,
        name: '',
        slug: '',
        shortDescription: '',
        image: '',
        categorySlugs: [],
      },
    ]);
  }

  function removeItem(index: number) {
    if (confirm(`Xóa danh mục "${data[index].name || 'chưa đặt tên'}"?`)) {
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

  function toggleCategory(index: number, slug: string) {
    const current = data[index].categorySlugs;
    updateItem(index, {
      categorySlugs: current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    });
  }

  function missingOf(item: ProductGroup): string[] {
    const m: string[] = [];
    if (!item.name.trim()) m.push('Thiếu tên');
    if (!item.slug.trim()) m.push('Thiếu đường dẫn');
    if (item.categorySlugs.length === 0) m.push('Chưa chọn sản phẩm');
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
    <div className="max-w-3xl pb-24">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh mục sản phẩm ({data.length})</h1>
          <p className="text-sm text-gray-500">
            Hiển thị ở trang chủ và trang sản phẩm. Thứ tự bên dưới là thứ tự hiển thị.
          </p>
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

      <div className="space-y-4">
        {data.map((item, index) => {
          const missing = missingOf(item);
          return (
            <div key={item.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium text-gray-500">Tên danh mục</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateName(index, e.target.value)}
                    placeholder="Ví dụ: Sàn gỗ công nghiệp"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-1 pt-6">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label="Di chuyển lên"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === data.length - 1}
                    aria-label="Di chuyển xuống"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    aria-label="Xóa danh mục"
                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-gray-500">
                  Đường dẫn (/danh-muc/...)
                </label>
                <input
                  type="text"
                  value={item.slug}
                  onChange={(e) => updateItem(index, { slug: slugify(e.target.value) })}
                  placeholder="san-go-cong-nghiep"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-xs font-medium text-gray-500">Mô tả ngắn</label>
                <textarea
                  value={item.shortDescription}
                  onChange={(e) => updateItem(index, { shortDescription: e.target.value })}
                  rows={2}
                  placeholder="Mô tả hiển thị trên thẻ danh mục..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="mb-4">
                <UploadInput
                  label="Ảnh đại diện (để trống sẽ dùng ảnh sản phẩm đầu tiên)"
                  value={item.image}
                  onChange={(url) => updateItem(index, { image: url })}
                  onMessage={showMsg}
                  preview
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-gray-500">
                  Sản phẩm trong danh mục ({item.categorySlugs.length})
                </p>
                <div className="grid max-h-56 grid-cols-1 gap-1 overflow-y-auto rounded-lg border border-gray-200 p-2 sm:grid-cols-2">
                  {products.map((cat) => (
                    <label
                      key={cat.slug}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition hover:bg-amber-50"
                    >
                      <input
                        type="checkbox"
                        checked={item.categorySlugs.includes(cat.slug)}
                        onChange={() => toggleCategory(index, cat.slug)}
                        className="h-4 w-4 accent-amber-600"
                      />
                      <span className="truncate">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {missing.length > 0 && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {missing.join(' • ')}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AdminSaveBar
        dirty={dirty}
        saving={saving}
        onSave={handleSave}
        info={`${data.length} danh mục`}
      />
    </div>
  );
}
