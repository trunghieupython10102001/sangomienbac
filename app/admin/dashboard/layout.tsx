'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Settings,
  Package,
  Flame,
  Newspaper,
  Image,
  Info,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/site-settings', label: 'Thông tin cửa hàng', icon: Settings },
  { href: '/admin/dashboard/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/dashboard/best-sellers', label: 'Bán chạy', icon: Flame },
  { href: '/admin/dashboard/news', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/dashboard/media', label: 'Video & Hình ảnh', icon: Image },
  { href: '/admin/dashboard/about', label: 'Giới thiệu', icon: Info },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-amber-400">Admin Panel</h2>
          <p className="text-xs text-gray-400">Kho sàn gỗ Miền Bắc</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-red-600 hover:text-white transition w-full"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
