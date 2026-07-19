import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getContent, setContent, type ContentKey } from '@/lib/s3-storage';

const VALID_KEYS: ContentKey[] = [
  'site-settings',
  'products',
  'best-sellers',
  'news',
  'media',
  'about',
];

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
    return NextResponse.json({ success: true, url });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('[admin/content PUT]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
