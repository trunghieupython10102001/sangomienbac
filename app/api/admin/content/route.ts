import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getContent, setContent, type ContentKey } from '@/lib/s3-storage';

const VALID_KEYS: ContentKey[] = [
  'site-settings',
  'products',
  'product-groups',
  'best-sellers',
  'news',
  'media',
  'about',
  'footer',
  'home-hero',
];

// Server-rendered pages read content through the AWS SDK (not `fetch`), so
// Next.js can't auto-revalidate them. After a save we invalidate the specific
// routes that render each content key so the next visit re-reads S3.
const REVALIDATE_PATHS: Record<ContentKey, Array<{ path: string; type?: 'page' | 'layout' }>> = {
  'site-settings': [{ path: '/' }, { path: '/lien-he' }],
  'products': [{ path: '/' }, { path: '/san-pham' }, { path: '/danh-muc/[slug]', type: 'page' }],
  'product-groups': [
    { path: '/' },
    { path: '/san-pham' },
    { path: '/danh-muc/[slug]', type: 'page' },
  ],
  'best-sellers': [{ path: '/' }],
  'news': [{ path: '/tin-tuc' }, { path: '/tin-tuc/[slug]', type: 'page' }],
  'about': [{ path: '/gioi-thieu' }],
  'media': [{ path: '/video-hinh-anh' }],
  // The footer renders inside the shared shell, so every route caches it.
  'footer': [{ path: '/', type: 'layout' }],
  'home-hero': [{ path: '/' }],
};

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token?.value === 'authenticated';
}

export async function GET(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key') as ContentKey;

  if (!key || !VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  const data = await getContent(key);
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { key, data } = await request.json();

    if (!key || !VALID_KEYS.includes(key)) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
    }

    const url = await setContent(key, data);

    // Purge the statically-cached public pages that render this content.
    for (const { path, type } of REVALIDATE_PATHS[key as ContentKey] ?? []) {
      revalidatePath(path, type);
    }

    return NextResponse.json({ success: true, url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('[admin/content PUT]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
