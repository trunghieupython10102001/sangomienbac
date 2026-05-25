'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { newsArticles as staticNews, type NewsArticle } from '@/lib/news';
import UploadInput from '@/components/admin/UploadInput';
import MultiUploadInput from '@/components/admin/MultiUploadInput';

export default function NewsAdminPage() {
  const [data, setData] = useState<NewsArticle[]>(staticNews);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    fetchContent<NewsArticle[]>('news').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('news', data);
    setMessage(result.ok ? 'Lưu thành công!' : `Lỗi: ${result.error}`);
    setSaving(false);
    setTimeout(() => setMessage(''), 5000);
  }

  function updateArticle(id: number, updates: Partial<NewsArticle>) {
    setData(data.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }

  function addArticle() {
    const newId = Math.max(...data.map((a) => a.id)) + 1;
    const newArticle: NewsArticle = {
      id: newId,
      title: 'Bài viết mới',
      slug: 'bai-viet-moi-' + newId,
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      thumbnail: '',
      images: [],
    };
    setData([...data, newArticle]);
    setExpandedId(newId);
  }

  function removeArticle(id: number) {
    if (confirm('Xóa bài viết này?')) {
      setData(data.filter((a) => a.id !== id));
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
        <h1 className="text-2xl font-bold text-gray-900">Tin tức ({data.length})</h1>
        <div className="flex gap-2">
          <button
            onClick={addArticle}
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

      {(message || uploadMsg) && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${(message || uploadMsg).includes('thành công') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message || uploadMsg}
        </div>
      )}

      <div className="space-y-3">
        {data.map((article) => (
          <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
            >
              <div>
                <h3 className="font-semibold text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeArticle(article.id); }}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === article.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </div>
            </div>

            {expandedId === article.id && (
              <div className="border-t border-gray-100 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) => updateArticle(article.id, { title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input
                      type="text"
                      value={article.slug}
                      onChange={(e) => updateArticle(article.id, { slug: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                    <input
                      type="date"
                      value={article.date}
                      onChange={(e) => updateArticle(article.id, { date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                    />
                  </div>
                  <UploadInput
                    label="Thumbnail"
                    value={article.thumbnail}
                    onChange={(url) => updateArticle(article.id, { thumbnail: url })}
                    preview
                    onMessage={(msg) => { setUploadMsg(msg); setTimeout(() => setUploadMsg(''), 3000); }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
                  <textarea
                    value={article.excerpt}
                    onChange={(e) => updateArticle(article.id, { excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung (Markdown)</label>
                  <textarea
                    value={article.content}
                    onChange={(e) => updateArticle(article.id, { content: e.target.value })}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm text-gray-900"
                  />
                </div>

                <MultiUploadInput
                  label={`Ảnh bài viết (${article.images.length} ảnh)`}
                  values={article.images}
                  onChange={(urls) => updateArticle(article.id, { images: urls })}
                  onMessage={(msg) => { setUploadMsg(msg); setTimeout(() => setUploadMsg(''), 3000); }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
