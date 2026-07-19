import { getObjectJson, uploadToS3 } from './s3';

const CONTENT_PREFIX = 'site-content/';

export type ContentKey =
  | 'site-settings'
  | 'products'
  | 'best-sellers'
  | 'news'
  | 'media'
  | 'about';

export async function getContent<T>(key: ContentKey): Promise<T | null> {
  return getObjectJson<T>(`${CONTENT_PREFIX}${key}.json`);
}

export async function setContent<T>(key: ContentKey, data: T): Promise<string> {
  return uploadToS3(
    `${CONTENT_PREFIX}${key}.json`,
    JSON.stringify(data, null, 2),
    'application/json'
  );
}
