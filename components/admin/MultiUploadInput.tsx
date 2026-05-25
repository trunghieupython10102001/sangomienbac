'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, Trash2, Plus } from 'lucide-react';
import { uploadFile } from '@/lib/admin-helpers';

interface MultiUploadInputProps {
  values: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  label?: string;
  onMessage?: (msg: string) => void;
}

export default function MultiUploadInput({
  values,
  onChange,
  accept = 'image/*',
  label,
  onMessage,
}: MultiUploadInputProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateUrl(index: number, url: string) {
    const newValues = [...values];
    newValues[index] = url;
    onChange(newValues);
  }

  function removeUrl(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function addEmpty() {
    onChange([...values, '']);
  }

  async function handleFiles(files: FileList) {
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        const url = await uploadFile(file);
        newUrls.push(url);
      } catch (e) {
        onMessage?.(`Lỗi upload "${file.name}": ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    if (newUrls.length > 0) {
      onChange([...values, ...newUrls]);
      onMessage?.(`Upload ${newUrls.length} file thành công!`);
    }
    setUploading(false);
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <div className="space-y-2">
        {values.map((url, index) => (
          <div key={index} className="flex items-center gap-2">
            {url && (
              <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={url}
              onChange={(e) => updateUrl(index, e.target.value)}
              placeholder="URL ảnh..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
            />
            <button
              onClick={() => removeUrl(index)}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg transition"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={addEmpty}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 transition"
        >
          <Plus className="w-3 h-3" /> Thêm URL
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition ${
            uploading ? 'text-gray-400 border-gray-200' : 'text-blue-600 border-blue-200 hover:bg-blue-50'
          }`}
        >
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          Upload ảnh
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
