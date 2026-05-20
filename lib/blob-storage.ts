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
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const { blobs } = await list({ prefix: BLOB_PREFIX + key, token: token || undefined });
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
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  }
  const blob = await put(
    BLOB_PREFIX + key + '.json',
    JSON.stringify(data, null, 2),
    {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    }
  );
  return blob.url;
}
