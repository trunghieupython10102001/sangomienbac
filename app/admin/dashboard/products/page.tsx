'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Loader2,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Upload,
  X,
  Copy,
  ArrowUp,
  ArrowDown,
  Search,
  Wand2,
  AlertTriangle,
} from 'lucide-react';
import { fetchContent, saveContent, uploadFile } from '@/lib/admin-helpers';
import { categories as staticCategories, type Category } from '@/lib/products';
import UploadInput from '@/components/admin/UploadInput';
import AdminSaveBar, { useUnsavedWarning } from '@/components/admin/AdminSaveBar';

/** Slugify a Vietnamese name into a URL-safe slug. */
function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function ProductsAdminPage() {
  const [data, setData] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const colorInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useUnsavedWarning(dirty);

  useEffect(() => {
    fetchContent<Category[]>('products').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  /** Route every user edit through here so dirty-tracking stays correct. */
  function commit(next: Category[]) {
    setData(next);
    setDirty(true);
  }

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('products', data);
    if (result.ok) {
      setDirty(false);
      showMsg('Lưu thành công!');
    } else {
      showMsg(`Lỗi: ${result.error}`);
    }
    setSaving(false);
  }

  function updateCategory(id: string, updates: Partial<Category>) {
    commit(data.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)));
  }

  function updateSpec(id: string, field: string, value: string) {
    const cat = data.find((c) => c.id === id);
    if (!cat) return;
    updateCategory(id, { specifications: { ...cat.specifications, [field]: value } });
  }

  function nextId(): string {
    return String(Math.max(...data.map((c) => Number(c.id) || 0), 0) + 1);
  }

  function addCategory() {
    const newId = nextId();
    const newCat: Category = {
      id: newId,
      name: 'Sản phẩm mới',
      slug: 'san-pham-moi-' + newId,
      description: '',
      shortDescription: '',
      image: '',
      colorCount: 0,
      colors: [],
      specifications: {
        origin: '',
        size: '',
        thickness: '',
        installation: '',
        surface: [],
        warranty: '',
      },
    };
    commit([...data, newCat]);
    setExpandedId(newId);
  }

  function removeCategory(id: string) {
    if (confirm('Xóa sản phẩm này?')) {
      commit(data.filter((c) => c.id !== id));
    }
  }

  function duplicateCategory(id: string) {
    const cat = data.find((c) => c.id === id);
    if (!cat) return;
    const newId = nextId();
    const newCat = { ...cat, id: newId, name: cat.name + ' (copy)', slug: cat.slug + '-copy' };
    commit([...data, newCat]);
    setExpandedId(newId);
  }

  function move(id: string, dir: -1 | 1) {
    const index = data.findIndex((c) => c.id === id);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= data.length) return;
    const next = [...data];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  function removeColor(catId: string, index: number) {
    const cat = data.find((c) => c.id === catId);
    if (!cat) return;
    const newColors = cat.colors.filter((_, i) => i !== index);
    updateCategory(catId, { colors: newColors, colorCount: newColors.length });
  }

  async function uploadColorFiles(catId: string, files: File[]) {
    const images = files.filter((f) => f.type.startsWith('image/'));
    if (images.length === 0) return;
    setUploading(true);
    const cat = data.find((c) => c.id === catId);
    if (!cat) {
      setUploading(false);
      return;
    }
    const newUrls: string[] = [];
    for (const file of images) {
      try {
        newUrls.push(await uploadFile(file));
      } catch (e) {
        showMsg(`Lỗi upload: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    if (newUrls.length > 0) {
      const allColors = [...cat.colors, ...newUrls];
      updateCategory(catId, { colors: allColors, colorCount: allColors.length });
      showMsg(`Upload ${newUrls.length} ảnh thành công!`);
    }
    setUploading(false);
  }

  async function handleColorDrop(catId: string, e: React.DragEvent) {
    e.preventDefault();
    setDragOverId(null);
    await uploadColorFiles(catId, Array.from(e.dataTransfer.files));
  }

  function missingOf(cat: Category): string[] {
    const m: string[] = [];
    if (!cat.image) m.push('Thiếu ảnh đại diện');
    if (!cat.discountedPrice && !cat.priceRange && !cat.originalPrice) m.push('Chưa có giá');
    if (cat.colors.length === 0) m.push('Chưa có ảnh màu');
    return m;
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;
  const visibleCount = q
    ? data.filter((c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)).length
    : data.length;

  return (
    <div className="max-w-4xl pb-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm ({data.length})</h1>
          <p className="text-sm text-gray-500">Thứ tự bên dưới là thứ tự hiển thị trên trang sản phẩm.</p>
        </div>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <Plus className="h-4 w-4" /> Thêm
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm sản phẩm theo tên hoặc slug..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
        />
        {searching && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {visibleCount} kết quả
          </span>
        )}
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
        {data.map((cat, catIndex) => {
          if (q && !(cat.name.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q))) {
            return null;
          }
          const missing = missingOf(cat);
          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  {/* Order controls */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => move(cat.id, -1)}
                      disabled={searching || catIndex === 0}
                      aria-label="Di chuyển lên"
                      title={searching ? 'Xóa tìm kiếm để sắp xếp' : 'Di chuyển lên'}
                      className="rounded p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <span className="text-[10px] font-mono text-gray-400">{catIndex + 1}</span>
                    <button
                      onClick={() => move(cat.id, 1)}
                      disabled={searching || catIndex === data.length - 1}
                      aria-label="Di chuyển xuống"
                      title={searching ? 'Xóa tìm kiếm để sắp xếp' : 'Di chuyển xuống'}
                      className="rounded p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    aria-expanded={expandedId === cat.id}
                  >
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="h-12 w-12 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-[9px] text-gray-400">
                        No img
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">{cat.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="text-xs text-gray-500">
                          {cat.colors.length} màu • {cat.discountedPrice || cat.priceRange || 'Chưa có giá'}
                        </p>
                        {missing.map((m) => (
                          <span
                            key={m}
                            className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700"
                          >
                            <AlertTriangle className="h-2.5 w-2.5" /> {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => duplicateCategory(cat.id)}
                    aria-label="Nhân bản sản phẩm"
                    title="Nhân bản"
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeCategory(cat.id)}
                    aria-label="Xóa sản phẩm"
                    title="Xóa"
                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
                    aria-label={expandedId === cat.id ? 'Thu gọn' : 'Mở rộng'}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100"
                  >
                    {expandedId === cat.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedId === cat.id && (
                <div className="space-y-5 border-t border-gray-100 p-4">
                  {/* Basic info */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Slug (URL)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={cat.slug}
                          onChange={(e) => updateCategory(cat.id, { slug: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button
                          onClick={() => updateCategory(cat.id, { slug: slugify(cat.name) })}
                          aria-label="Tạo slug từ tên"
                          title="Tạo slug từ tên"
                          className="flex items-center gap-1 whitespace-nowrap rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 transition hover:bg-amber-100"
                        >
                          <Wand2 className="h-4 w-4" /> Tạo
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả ngắn</label>
                    <input
                      type="text"
                      value={cat.shortDescription}
                      onChange={(e) => updateCategory(cat.id, { shortDescription: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                    <textarea
                      value={cat.description}
                      onChange={(e) => updateCategory(cat.id, { description: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Main image */}
                  <UploadInput
                    label="Ảnh đại diện"
                    value={cat.image}
                    onChange={(url) => updateCategory(cat.id, { image: url })}
                    preview
                    onMessage={showMsg}
                  />

                  {/* Pricing */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Giá gốc</label>
                      <input
                        type="text"
                        value={cat.originalPrice || ''}
                        onChange={(e) => updateCategory(cat.id, { originalPrice: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="420.000đ/m²"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Giá khuyến mãi</label>
                      <input
                        type="text"
                        value={cat.discountedPrice || ''}
                        onChange={(e) => updateCategory(cat.id, { discountedPrice: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="370.000đ/m²"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Khoảng giá</label>
                      <input
                        type="text"
                        value={cat.priceRange || ''}
                        onChange={(e) => updateCategory(cat.id, { priceRange: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="270.000đ/m²"
                      />
                    </div>
                  </div>

                  {/* Color images - visual grid */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-700">Ảnh màu sắc ({cat.colors.length})</h4>
                      <button
                        onClick={() => colorInputRefs.current[cat.id]?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-600 transition hover:bg-blue-100 disabled:opacity-50"
                      >
                        {uploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Upload ảnh
                      </button>
                      <input
                        ref={(el) => {
                          colorInputRefs.current[cat.id] = el;
                        }}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            uploadColorFiles(cat.id, Array.from(e.target.files));
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverId(cat.id);
                      }}
                      onDragLeave={() => setDragOverId(null)}
                      onDrop={(e) => handleColorDrop(cat.id, e)}
                      className={`rounded-lg border-2 border-dashed p-3 transition-all ${
                        dragOverId === cat.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      {cat.colors.length > 0 ? (
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                          {cat.colors.map((url, index) => (
                            <div
                              key={index}
                              className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
                            >
                              <img src={url} alt={`Màu ${index + 1}`} className="h-full w-full object-cover" />
                              <button
                                onClick={() => removeColor(cat.id, index)}
                                aria-label={`Xóa màu ${index + 1}`}
                                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <span className="absolute bottom-0 left-0 right-0 bg-black/50 py-0.5 text-center text-[10px] text-white">
                                {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-gray-400">
                          <Upload className="mx-auto mb-2 h-8 w-8" />
                          <p className="text-sm">Kéo thả ảnh vào đây hoặc nhấn Upload</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 font-semibold text-gray-700">Thông số kỹ thuật</h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {[
                        { key: 'origin', label: 'Xuất xứ' },
                        { key: 'size', label: 'Kích thước' },
                        { key: 'thickness', label: 'Độ dày' },
                        { key: 'installation', label: 'Lắp đặt' },
                        { key: 'waterproof', label: 'Chống nước' },
                        { key: 'durability', label: 'Độ bền' },
                        { key: 'material', label: 'Chất liệu' },
                        { key: 'width', label: 'Độ rộng' },
                        { key: 'warranty', label: 'Bảo hành' },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
                          <input
                            type="text"
                            value={
                              (cat.specifications as unknown as Record<string, string | string[]>)[
                                key
                              ]?.toString() || ''
                            }
                            onChange={(e) => updateSpec(cat.id, key, e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      ))}
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium text-gray-500">
                          Bề mặt (mỗi dòng 1 đặc tính)
                        </label>
                        <textarea
                          value={cat.specifications.surface.join('\n')}
                          onChange={(e) =>
                            updateCategory(cat.id, {
                              specifications: {
                                ...cat.specifications,
                                surface: e.target.value.split('\n').filter(Boolean),
                              },
                            })
                          }
                          rows={2}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AdminSaveBar dirty={dirty} saving={saving} onSave={handleSave} info={`${data.length} sản phẩm`} />
    </div>
  );
}
