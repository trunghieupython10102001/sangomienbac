import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { uploadToS3 } from '@/lib/s3';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File quá lớn (tối đa 50MB)' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `media/${timestamp}-${safeName}`;

    const url = await uploadToS3(key, file, file.type);

    return NextResponse.json({ url, pathname: key });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('[admin/upload POST]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
