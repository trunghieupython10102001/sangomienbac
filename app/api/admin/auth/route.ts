import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const TOKEN_NAME = 'admin_token';
const TOKEN_VALUE = 'authenticated';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Sai mật khẩu' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, TOKEN_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME);
  const isAuthenticated = token?.value === TOKEN_VALUE;
  return NextResponse.json({ authenticated: isAuthenticated });
}
