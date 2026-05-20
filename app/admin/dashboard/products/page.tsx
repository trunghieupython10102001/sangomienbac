'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { categories as staticCategories, type Category } from '@/lib/products';

export default function ProductsAdminPage() {
  const [data, setData] = useState<Category[]>(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchContent<Category[]>('products').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const ok = await saveContent('products', data);
    setMessage(ok ? 'Lưu thành công!' : 'Lỗi khi lưu');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  }

  function updateCategory(id: string, updates: Partial<Category>) {
    setData(data.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)));
  }

  function addCategory() {
    const newId = String(Math.max(...data.map((c) => Number(c.id))) + 1);
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
        {data.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
            >
              <div className="flex items-center gap-3">
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.shortDescription}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === cat.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            {expandedId === cat.id && (
              <div className="border-t border-gray-100 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => updateCategory(cat.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input
                      type="text"
                      value={cat.slug}
                      onChange={(e) => updateCategory(cat.id, { slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                  <input
                    type="text"
                    value={cat.shortDescription}
                    onChange={(e) => updateCategory(cat.id, { shortDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
                  <textarea
                    value={cat.description}
                    onChange={(e) => updateCategory(cat.id, { description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện (URL)</label>
                  <input
                    type="text"
                    value={cat.image}
                    onChange={(e) => updateCategory(cat.id, { image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                    <input
                      type="text"
                      value={cat.originalPrice || ''}
                      onChange={(e) => updateCategory(cat.id, { originalPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi</label>
                    <input
                      type="text"
                      value={cat.discountedPrice || ''}
                      onChange={(e) => updateCategory(cat.id, { discountedPrice: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng giá</label>
                    <input
                      type="text"
                      value={cat.priceRange || ''}
                      onChange={(e) => updateCategory(cat.id, { priceRange: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng màu</label>
                  <input
                    type="number"
                    value={cat.colorCount}
                    onChange={(e) => updateCategory(cat.id, { colorCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh sách ảnh màu (mỗi dòng 1 URL)</label>
                  <textarea
                    value={cat.colors.join('\n')}
                    onChange={(e) => updateCategory(cat.id, { colors: e.target.value.split('\n').filter(Boolean) })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Thông số kỹ thuật</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Xuất xứ</label>
                      <input
                        type="text"
                        value={cat.specifications.origin}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, origin: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Kích thước</label>
                      <input
                        type="text"
                        value={cat.specifications.size}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, size: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Độ dày</label>
                      <input
                        type="text"
                        value={cat.specifications.thickness}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, thickness: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Lắp đặt</label>
                      <input
                        type="text"
                        value={cat.specifications.installation}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, installation: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Chống nước</label>
                      <input
                        type="text"
                        value={cat.specifications.waterproof || ''}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, waterproof: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Bảo hành</label>
                      <input
                        type="text"
                        value={cat.specifications.warranty}
                        onChange={(e) => updateCategory(cat.id, { specifications: { ...cat.specifications, warranty: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none"
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
