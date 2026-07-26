'use client';

import { useEffect } from 'react';
import { Save, Loader2, Check } from 'lucide-react';

/** Warn the user before leaving (refresh / close / URL change) with unsaved edits. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);
}

interface AdminSaveBarProps {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  /** Extra info shown next to the status (e.g. item count). */
  info?: React.ReactNode;
}

/**
 * Sticky footer that keeps "Save" reachable no matter how long the list is,
 * and surfaces unsaved-changes / saved status at a glance.
 * Renders full-bleed by cancelling the dashboard main's `p-6` padding (`-mx-6`).
 */
export default function AdminSaveBar({ dirty, saving, onSave, info }: AdminSaveBarProps) {
  return (
    <div className="sticky bottom-0 z-20 -mx-6 mt-6 flex items-center justify-between border-t border-gray-200 bg-white/95 px-6 py-3 backdrop-blur">
      <div className="flex items-center gap-2 text-sm">
        {dirty ? (
          <span className="flex items-center gap-1.5 font-medium text-amber-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            Có thay đổi chưa lưu
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-green-600">
            <Check className="h-4 w-4" /> Đã lưu
          </span>
        )}
        {info != null && <span className="text-gray-300">•</span>}
        {info != null && <span className="text-gray-500">{info}</span>}
      </div>
      <button
        onClick={onSave}
        disabled={saving || !dirty}
        aria-label="Lưu thay đổi"
        className="flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2 font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Lưu thay đổi
      </button>
    </div>
  );
}
