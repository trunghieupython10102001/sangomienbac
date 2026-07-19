import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

/**
 * Shared AWS S3 client and helpers.
 *
 * Env contract:
 *   AWS_REGION            e.g. ap-southeast-1
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   S3_BUCKET             target bucket name
 *   S3_PUBLIC_URL         optional; base URL for public objects (e.g. a CDN/custom domain).
 *                         If unset, URLs are built as https://<bucket>.s3.<region>.amazonaws.com/<key>
 *
 * Public access is served by a bucket policy (ACLs are not set on objects), so the
 * bucket must allow public reads for the keys the app writes.
 */

// Read env lazily inside functions (not at module top-level) so scripts that call
// dotenv's config() before use still see the values — ES import hoisting would
// otherwise run this module before their config() call.
function getBucket(): string {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error('S3_BUCKET is not configured');
  return bucket;
}

let client: S3Client | null = null;

function getClient(): S3Client {
  const region = process.env.AWS_REGION;
  if (!region) throw new Error('AWS_REGION is not configured');
  if (!client) {
    client = new S3Client({ region });
  }
  return client;
}

/** Build the stable public URL for a stored object key. */
export function publicUrl(key: string): string {
  const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, '');
  if (base) return `${base}/${key}`;
  return `https://${getBucket()}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

/** Upload a body to S3 under `key` and return its public URL. */
export async function uploadToS3(
  key: string,
  body: Buffer | Uint8Array | string | Blob,
  contentType?: string
): Promise<string> {
  const s3 = getClient();

  // The AWS SDK v3 PutObject Body accepts Buffer/Uint8Array/string/stream but not
  // a web File/Blob directly, so normalise Blob-like inputs to a Buffer.
  let payload: Buffer | Uint8Array | string;
  if (typeof body === 'string' || body instanceof Buffer || body instanceof Uint8Array) {
    payload = body;
  } else {
    payload = Buffer.from(await body.arrayBuffer());
  }

  await s3.send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: payload,
      ContentType: contentType,
    })
  );
  return publicUrl(key);
}

/** Fetch and JSON-parse an object. Returns null on miss or any error. */
export async function getObjectJson<T>(key: string): Promise<T | null> {
  try {
    const s3 = getClient();
    const res = await s3.send(new GetObjectCommand({ Bucket: getBucket(), Key: key }));
    const text = await res.Body?.transformToString();
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
