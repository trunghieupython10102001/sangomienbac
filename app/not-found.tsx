import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-amber-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-2">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
