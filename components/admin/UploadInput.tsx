'use client';

import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/admin-helpers';

interface UploadInputProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  placeholder?: string;
  preview?: boolean;
  onMessage?: (msg: string) => void;
}

export default function UploadInput({
  value,
  onChange,
  accept = 'image/*',
  label,
  placeholder = 'URL hoặc upload file...',
  preview = false,
  onMessage,
}: UploadInputProps) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      onChange(url);
      onMessage?.(`Upload "${file.name}" thành công!`);
    } catch (e) {
      onMessage?.(`Lỗi upload: ${e instanceof Error ? e.message : String(e)}`);
    }
    setUploading(false);
  }

  return (
    <div>
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none text-gray-900"
        />
        <label className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm cursor-pointer transition ${
          uploading ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      {preview && value && (
        <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
