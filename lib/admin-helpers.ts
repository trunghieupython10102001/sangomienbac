import type { ContentKey } from './blob-storage';

export async function fetchContent<T>(key: ContentKey): Promise<T | null> {
  const res = await fetch(`/api/admin/content?key=${key}`);
  if (!res.ok) return null;
  const json = await res.json();
  return json.data as T | null;
}

export async function saveContent<T>(key: ContentKey, data: T): Promise<boolean> {
  const res = await fetch('/api/admin/content', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, data }),
  });
  return res.ok;
}
