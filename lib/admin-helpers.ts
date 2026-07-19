import type { ContentKey } from './s3-storage';

export async function uploadFile(file: File): Promise<string> {
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

export async function fetchContent<T>(key: ContentKey): Promise<T | null> {
  const res = await fetch(`/api/admin/content?key=${key}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data as T | null;
}

export async function saveContent<T>(key: ContentKey, data: T): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ key, data }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { ok: false, error: json.error || `Lỗi ${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
