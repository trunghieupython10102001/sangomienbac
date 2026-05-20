import { put, list } from '@vercel/blob';

const BLOB_PREFIX = 'site-content/';

export type ContentKey =
  | 'site-settings'
  | 'products'
  | 'best-sellers'
  | 'news'
  | 'media'
  | 'about';

export async function getContent<T>(key: ContentKey): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX + key });
    if (blobs.length === 0) return null;

    const latestBlob = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];

    const response = await fetch(latestBlob.url, { next: { revalidate: 60 } });
    if (!response.ok) return null;

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function setContent<T>(key: ContentKey, data: T): Promise<string> {
  const blob = await put(
    BLOB_PREFIX + key + '.json',
    JSON.stringify(data, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    }
  );
  return blob.url;
}
