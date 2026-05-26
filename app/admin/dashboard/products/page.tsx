'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import { fetchContent, saveContent, uploadFile } from '@/lib/admin-helpers';
import { categories as staticCategories, type Category } from '@/lib/products';
import UploadInput from '@/components/admin/UploadInput';

export default function ProductsAdminPage() {
  const [data, setData] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const colorInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchContent<Category[]>('products').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  function showMsg(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('products', data);
    showMsg(result.ok ? 'Lưu thành công!' : `Lỗi: ${result.error}`);
    setSaving(false);
  }

  function updateCategory(id: string, updates: Partial<Category>) {
    setData(data.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)));
  }

  function updateSpec(id: string, field: string, value: string) {
    const cat = data.find((c) => c.id === id);
    if (!cat) return;
    updateCategory(id, { specifications: { ...cat.specifications, [field]: value } });
  }

  function addCategory() {
    const newId = String(Math.max(...data.map((c) => Number(c.id)), 0) + 1);
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
    setData([...data, newCat]);
    setExpandedId(newId);
  }

  function removeCategory(id: string) {
    if (confirm('Xóa sản phẩm này?')) {
      setData(data.filter((c) => c.id !== id));
    }
  }

  function duplicateCategory(id: string) {
    const cat = data.find((c) => c.id === id);
    if (!cat) return;
    const newId = String(Math.max(...data.map((c) => Number(c.id)), 0) + 1);
    const newCat = { ...cat, id: newId, name: cat.name + ' (copy)', slug: cat.slug + '-copy' };
    setData([...data, newCat]);
    setExpandedId(newId);
  }

  function removeColor(catId: string, index: number) {
    const cat = data.find((c) => c.id === catId);
    if (!cat) return;
    const newColors = cat.colors.filter((_, i) => i !== index);
    updateCategory(catId, { colors: newColors, colorCount: newColors.length });
  }

  async function handleColorDrop(catId: string, e: React.DragEvent) {
    e.preventDefault();
    setDragOverId(null);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (files.length === 0) return;

    setUploading(true);
    const cat = data.find((c) => c.id === catId);
    if (!cat) return;
    const newUrls: string[] = [];
    for (const file of files) {
      try {
        const url = await uploadFile(file);
        newUrls.push(url);
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

  async function handleColorFileSelect(catId: string, files: FileList) {
    setUploading(true);
    const cat = data.find((c) => c.id === catId);
    if (!cat) return;
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadFile(file);
        newUrls.push(url);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sản phẩm ({data.length})</h1>
        <div className="flex gap-2">
          <button
            onClick={addCategory}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-4 h-4" /> Thêm
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
        {data.map((cat, catIndex) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 font-mono w-6">{catIndex + 1}</span>
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500">{cat.colors.length} màu • {cat.discountedPrice || cat.priceRange || 'Chưa có giá'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); duplicateCategory(cat.id); }}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition text-xs"
                  title="Nhân bản"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === cat.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            {expandedId === cat.id && (
              <div className="border-t border-gray-100 p-4 space-y-5">
                {/* Basic info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                    <input type="text" value={cat.name} onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input type="text" value={cat.slug} onChange={(e) => updateCategory(cat.id, { slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                  <input type="text" value={cat.shortDescription} onChange={(e) => updateCategory(cat.id, { shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                  <textarea value={cat.description} onChange={(e) => updateCategory(cat.id, { description: e.target.value })} rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" />
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                    <input type="text" value={cat.originalPrice || ''} onChange={(e) => updateCategory(cat.id, { originalPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" placeholder="420.000đ/m²" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi</label>
                    <input type="text" value={cat.discountedPrice || ''} onChange={(e) => updateCategory(cat.id, { discountedPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" placeholder="370.000đ/m²" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng giá</label>
                    <input type="text" value={cat.priceRange || ''} onChange={(e) => updateCategory(cat.id, { priceRange: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900" placeholder="270.000đ/m²" />
                  </div>
                </div>

                {/* Color images - visual grid */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-700">Ảnh màu sắc ({cat.colors.length})</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => colorInputRefs.current[cat.id]?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1 text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition disabled:opacity-50"
                      >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        Upload ảnh
                      </button>
                      <input
                        ref={(el) => { colorInputRefs.current[cat.id] = el; }}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleColorFileSelect(cat.id, e.target.files);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Drop zone + grid */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOverId(cat.id); }}
                    onDragLeave={() => setDragOverId(null)}
                    onDrop={(e) => handleColorDrop(cat.id, e)}
                    className={`rounded-lg border-2 border-dashed p-3 transition-all ${
                      dragOverId === cat.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    {cat.colors.length > 0 ? (
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                        {cat.colors.map((url, index) => (
                          <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={url} alt={`Màu ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              onClick={() => removeColor(cat.id, index)}
                              className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">
                              {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Kéo thả ảnh vào đây hoặc nhấn Upload</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Thông số kỹ thuật</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                        <input
                          type="text"
                          value={(cat.specifications as unknown as Record<string, string | string[]>)[key]?.toString() || ''}
                          onChange={(e) => updateSpec(cat.id, key, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Bề mặt (mỗi dòng 1 đặc tính)</label>
                      <textarea
                        value={cat.specifications.surface.join('\n')}
                        onChange={(e) => updateCategory(cat.id, {
                          specifications: { ...cat.specifications, surface: e.target.value.split('\n').filter(Boolean) }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
