import { NextRequest, NextResponse } from 'next/server';
import { getContent, type ContentKey } from '@/lib/s3-storage';

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key') as ContentKey;

  if (!key || !VALID_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 });
  }

  const data = await getContent(key);
  return NextResponse.json({ data }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
