import Link from 'next/link';
import { Settings, Package, Flame, Newspaper, Image, Info } from 'lucide-react';

const sections = [
  {
    href: '/admin/dashboard/site-settings',
    label: 'Thông tin cửa hàng',
    description: 'Tên shop, SĐT, email, địa chỉ, giờ làm việc',
    icon: Settings,
    color: 'from-blue-500 to-blue-600',
  },
  {
    href: '/admin/dashboard/products',
    label: 'Sản phẩm',
    description: 'Quản lý danh mục sản phẩm, giá, thông số',
    icon: Package,
    color: 'from-amber-500 to-orange-600',
  },
  {
    href: '/admin/dashboard/best-sellers',
    label: 'Sản phẩm bán chạy',
    description: 'Quản lý sản phẩm bán chạy hiển thị trên trang chủ',
    icon: Flame,
    color: 'from-red-500 to-red-600',
  },
  {
    href: '/admin/dashboard/news',
    label: 'Tin tức',
    description: 'Quản lý bài viết, tin tức',
    icon: Newspaper,
    color: 'from-green-500 to-emerald-600',
  },
  {
    href: '/admin/dashboard/media',
    label: 'Video & Hình ảnh',
    description: 'Quản lý video, hình ảnh thực tế',
    icon: Image,
    color: 'from-purple-500 to-purple-600',
  },
  {
    href: '/admin/dashboard/about',
    label: 'Trang giới thiệu',
    description: 'Chỉnh sửa nội dung trang giới thiệu',
    icon: Info,
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Quản lý nội dung website Kho sàn gỗ Miền Bắc</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-amber-200 transition group"
            >
              <div className={`bg-gradient-to-br ${section.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{section.label}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
