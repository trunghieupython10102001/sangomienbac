'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { isHtml, splitScripts } from '@/lib/html';

interface HtmlFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  /** Applied to the preview box, e.g. a dark background for footer/hero text. */
  previewClassName?: string;
}

/** Textarea for long text that also accepts HTML, with a live preview toggle. */
export default function HtmlField({
  label,
  value,
  onChange,
  rows = 6,
  placeholder,
  previewClassName = 'bg-white text-gray-800',
}: HtmlFieldProps) {
  const [preview, setPreview] = useState(false);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}{' '}
          <span className="font-normal text-gray-400">
            — chữ thường hoặc HTML ({'<b>'}, {'<a>'}, {'<ul>'}, {'<img>'}…)
          </span>
        </label>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="flex flex-shrink-0 items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800"
        >
          {preview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {preview ? 'Ẩn xem trước' : 'Xem trước'}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        spellCheck={false}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
      />
      {preview && (
        <div className={`mt-2 overflow-auto rounded-lg border border-gray-200 p-4 ${previewClassName}`}>
          {isHtml(value) ? (
            <div className="rich-html" dangerouslySetInnerHTML={{ __html: splitScripts(value).markup }} />
          ) : (
            <p className="whitespace-pre-line">{value}</p>
          )}
        </div>
      )}
    </div>
  );
}
