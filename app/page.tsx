import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Phone, CheckCircle, Award, Truck, Star, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">


      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              SẢN PHẨM
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Danh Mục Sàn Gỗ Cao Cấp
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đa dạng các dòng sàn gỗ, sàn nhựa đang thịnh hành trên thị trường
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <ProductCard
                key={category.id}
                name={category.name}
                image={category.image}
                slug={category.slug}
                shortDescription={category.shortDescription}
                priceRange={category.priceRange}
                originalPrice={category.originalPrice}
                discountedPrice={category.discountedPrice}
                colorCount={category.colorCount}
                colors={category.colors}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Chất lượng đảm bảo</h3>
              <p className="text-gray-600 leading-relaxed">
                Sản phẩm chính hãng 100%, nhập khẩu từ các thương hiệu uy tín hàng đầu thế giới
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 border border-amber-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Giá cạnh tranh</h3>
              <p className="text-gray-600 leading-relaxed">
                Giá tốt nhất thị trường, cam kết hoàn tiền 100% nếu tìm được nơi rẻ hơn
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Thi công chuyên nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">
                Đội ngũ thợ lành nghề 10+ năm kinh nghiệm, thi công nhanh chóng, bảo hành dài hạn
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0tMTIgNmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTI0IDI0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nhận Tư Vấn Miễn Phí Ngay Hôm Nay
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Đội ngũ chuyên viên tư vấn sẵn sàng hỗ trợ 24/7. Báo giá nhanh chóng, chính xác
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0363974768"
                className="group inline-flex items-center gap-3 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>0363.974.768</span>
              </a>
              <a
                href="tel:0969897297"
                className="group inline-flex items-center gap-3 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>0969.897.297</span>
              </a>
            </div>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-900 transition-all"
            >
              Hoặc gửi tin nhắn
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
