'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultBestSellers, type BestSeller } from '@/lib/default-data';

export default function BestSellersAdminPage() {
  const [data, setData] = useState<BestSeller[]>(defaultBestSellers);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent<BestSeller[]>('best-sellers').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('best-sellers', data);
    setMessage(result.ok ? 'Lưu thành công!' : `Lỗi: ${result.error}`);
    setSaving(false);
    setTimeout(() => setMessage(''), 5000);
  }

  function updateItem(index: number, updates: Partial<BestSeller>) {
    const newData = [...data];
    newData[index] = { ...newData[index], ...updates };
    setData(newData);
  }

  function addItem() {
    setData([...data, { code: '', price: '', image: '' }]);
  }

  function removeItem(index: number) {
    if (confirm('Xóa sản phẩm này?')) {
      setData(data.filter((_, i) => i !== index));
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
        <h1 className="text-2xl font-bold text-gray-900">Sản phẩm bán chạy ({data.length})</h1>
        <div className="flex gap-2">
          <button
            onClick={addItem}
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
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start gap-4">
              {item.image && (
                <img src={item.image} alt={item.code} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Mã sản phẩm</label>
                  <input
                    type="text"
                    value={item.code}
                    onChange={(e) => updateItem(index, { code: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Giá (VNĐ/m²)</label>
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateItem(index, { price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Ảnh (URL)</label>
                  <input
                    type="text"
                    value={item.image}
                    onChange={(e) => updateItem(index, { image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                  />
                </div>
              </div>
              <button
                onClick={() => removeItem(index)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
