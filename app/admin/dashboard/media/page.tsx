'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Save, Loader2, Trash2, Upload, Image, Film } from 'lucide-react';
import { fetchContent, saveContent } from '@/lib/admin-helpers';
import { defaultMediaItems, type MediaItem } from '@/lib/default-data';

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    credentials: 'same-origin',
    body: formData,
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error || `Upload failed: ${res.status}`);
  }
  const json = await res.json();
  return json.url;
}

export default function MediaAdminPage() {
  const [data, setData] = useState<MediaItem[]>(defaultMediaItems);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchContent<MediaItem[]>('media').then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const result = await saveContent('media', data);
    setMessage(result.ok ? 'Lưu thành công!' : `Lỗi: ${result.error}`);
    setSaving(false);
    setTimeout(() => setMessage(''), 5000);
  }

  function updateItem(index: number, updates: Partial<MediaItem>) {
    const newData = [...data];
    newData[index] = { ...newData[index], ...updates };
    setData(newData);
  }

  function removeItem(index: number) {
    if (confirm('Xóa mục này?')) {
      setData(data.filter((_, i) => i !== index));
    }
  }

  async function handleUploadForItem(index: number, field: 'src' | 'thumbnail', file: File) {
    const uploadKey = `${index}-${field}`;
    setUploading((prev) => ({ ...prev, [uploadKey]: true }));
    try {
      const url = await uploadFile(file);
      updateItem(index, { [field]: url });
      setMessage(`Upload "${file.name}" thành công!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      setMessage(`Lỗi upload: ${e instanceof Error ? e.message : String(e)}`);
    }
    setUploading((prev) => ({ ...prev, [uploadKey]: false }));
  }

  const handleBulkUpload = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      const isVideo = file.type.startsWith('video/');
      const isImage = file.type.startsWith('image/');
      if (!isVideo && !isImage) continue;

      const type: 'video' | 'image' = isVideo ? 'video' : 'image';
      const name = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');

      const tempIndex = data.length;
      const newItem: MediaItem = {
        type,
        src: '',
        title: name,
        description: '',
        ...(isVideo ? { thumbnail: '' } : {}),
      };

      setData((prev) => [...prev, newItem]);
      const uploadKey = `${tempIndex}-src-new`;
      setUploading((prev) => ({ ...prev, [uploadKey]: true }));

      try {
        const url = await uploadFile(file);
        setData((prev) => {
          const updated = [...prev];
          const idx = updated.length - (fileArray.length - fileArray.indexOf(file));
          if (idx >= 0 && idx < updated.length) {
            updated[idx] = { ...updated[idx], src: url };
          }
          return updated;
        });
      } catch (e) {
        setMessage(`Lỗi upload "${file.name}": ${e instanceof Error ? e.message : String(e)}`);
      }
      setUploading((prev) => ({ ...prev, [uploadKey]: false }));
    }
    setMessage('Upload xong! Nhấn "Lưu" để lưu thay đổi.');
    setTimeout(() => setMessage(''), 5000);
  }, [data.length]);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleBulkUpload(e.dataTransfer.files);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  const videos = data.filter((i) => i.type === 'video');
  const images = data.filter((i) => i.type === 'image');

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900">
          Video & Hình ảnh ({videos.length} video, {images.length} ảnh)
        </h1>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            <Upload className="w-4 h-4" /> Upload files
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

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleBulkUpload(e.target.files);
            e.target.value = '';
          }
        }}
      />

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${message.includes('thành công') || message.includes('xong') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-6 border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragOver ? 'border-amber-500 bg-amber-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">Kéo thả ảnh/video vào đây</p>
        <p className="text-gray-400 text-sm mt-1">hoặc nhấn nút &ldquo;Upload files&rdquo; ở trên</p>
        <p className="text-gray-400 text-xs mt-2">Hỗ trợ: JPG, PNG, JPEG, MP4, MOV — Tối đa 50MB/file</p>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${item.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {item.type === 'video' ? <Film className="w-4 h-4" /> : <Image className="w-4 h-4" />}
                </span>
                {item.src && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    {item.type === 'image' ? (
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    ) : item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Film className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tiêu đề</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(index, { title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {item.type === 'video' ? 'Video' : 'Ảnh'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.src}
                        onChange={(e) => updateItem(index, { src: e.target.value })}
                        placeholder="URL hoặc upload file..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                      />
                      <label className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm cursor-pointer transition ${
                        uploading[`${index}-src`] ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}>
                        {uploading[`${index}-src`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <input
                          type="file"
                          accept={item.type === 'video' ? 'video/*' : 'image/*'}
                          className="hidden"
                          disabled={!!uploading[`${index}-src`]}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadForItem(index, 'src', file);
                            e.target.value = '';
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {item.type === 'video' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Thumbnail</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.thumbnail || ''}
                          onChange={(e) => updateItem(index, { thumbnail: e.target.value })}
                          placeholder="URL hoặc upload ảnh..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
                        />
                        <label className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm cursor-pointer transition ${
                          uploading[`${index}-thumbnail`] ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}>
                          {uploading[`${index}-thumbnail`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={!!uploading[`${index}-thumbnail`]}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadForItem(index, 'thumbnail', file);
                              e.target.value = '';
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
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

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Image className="w-12 h-12 mx-auto mb-3" />
          <p>Chưa có media nào. Kéo thả file hoặc nhấn Upload.</p>
        </div>
      )}
    </div>
  );
}
