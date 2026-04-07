import Image from "next/image";
import { CheckCircle, Award, Users, Truck, Star, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-b from-amber-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              VỀ CHÚNG TÔI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kho sàn gỗ Miền Bắc
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa chất lượng cao - Giá tại kho
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-10 md:p-12 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Giới thiệu về Kho Sàn Gỗ Miền Bắc</h2>
              </div>
              <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                <p>
                  <span className="font-semibold text-amber-700">Kho Sàn Gỗ Miền Bắc</span> là đơn vị chuyên cung cấp và thi công các dòng sàn gỗ công nghiệp, sàn nhựa chất lượng cao với mức giá cạnh tranh trực tiếp tại kho.
                </p>
                <p>
                  Với định hướng phát triển bền vững, chúng tôi tập trung vào 3 yếu tố cốt lõi:<br/>
                  <span className="font-semibold">👉 Chất lượng sản phẩm – Giá thành hợp lý – Thi công chuẩn kỹ thuật</span>
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl mt-6">
                  <h3 className="text-blue-900 font-semibold text-xl mb-2">🎯 Sứ mệnh của chúng tôi</h3>
                  <p className="text-blue-800">
                    Mang đến cho khách hàng những giải pháp sàn bền – đẹp – phù hợp khí hậu Miền Bắc, giúp không gian sống trở nên hiện đại, tiện nghi và lâu dài theo thời gian.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-r-xl mt-6">
                  <h3 className="text-amber-900 font-semibold text-xl mb-3">🔹 Sản phẩm chủ lực</h3>
                  <ul className="text-amber-800 space-y-2 ml-4">
                    <li>• Sàn gỗ công nghiệp (cốt xanh, cốt đen, chống ẩm, chống nước)</li>
                    <li>• Sàn gỗ xương cá</li>
                    <li>• Sàn nhựa hèm khóa, sàn nhựa dán keo</li>
                    <li>• Phụ kiện hoàn thiện sàn (phào, nẹp, xốp lót…)</li>
                  </ul>
                  <div className="mt-4 space-y-1">
                    <p className="text-green-700">✔ Sản phẩm được chọn lọc kỹ, phù hợp với khí hậu nồm ẩm Miền Bắc</p>
                    <p className="text-green-700">✔ Đạt tiêu chuẩn về độ bền, chống xước, chống mối mọt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-10 md:p-12 border border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">🔧 Dịch vụ thi công</h2>
              </div>
              <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                <p>
                  Không chỉ cung cấp sản phẩm, <span className="font-semibold text-green-700">Kho Sàn Gỗ Miền Bắc</span> còn có đội ngũ thi công chuyên nghiệp:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Thi công nhanh – gọn – đúng tiến độ</span></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Đảm bảo kỹ thuật:</span> phẳng nền, khít hèm, hạn chế cong vênh</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><span className="font-semibold">Tư vấn tận nơi, khảo sát miễn phí</span></span>
                  </li>
                </ul>
                <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-xl mt-6">
                  <p className="text-green-900 font-semibold text-lg flex items-start gap-2">
                    <span className="text-2xl">👉</span>
                    <span>Chúng tôi hiểu rằng: <em>&ldquo;Độ bền của sàn gỗ phụ thuộc rất lớn vào tay nghề thi công&rdquo;</em></span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-10 md:p-12 border border-blue-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">🤝 Khách hàng phục vụ</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Chủ nhà chung cư, nhà phố</span>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Khách hàng xây mới hoặc cải tạo</span>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Nhà thầu xây dựng</span>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg">Đơn vị thiết kế nội thất, kiến trúc</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-xl p-10 md:p-12 border border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">💰 Cam kết</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Giá tại kho – không qua trung gian</h3>
                    <p className="text-gray-600 text-sm">Tiết kiệm chi phí tối đa cho khách hàng</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Sản phẩm đúng chất lượng, đúng mô tả</h3>
                    <p className="text-gray-600 text-sm">Cam kết 100% như đã giới thiệu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Bảo hành rõ ràng</h3>
                    <p className="text-gray-600 text-sm">Chế độ bảo hành minh bạch, hỗ trợ lâu dài</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hỗ trợ tư vấn tận tâm</h3>
                    <p className="text-gray-600 text-sm">Trước – trong – sau khi thi công</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                SHOWROOM
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Hình ảnh showroom & sản phẩm
              </h2>
              <p className="text-gray-600 text-lg">
                Không gian trưng bày hiện đại với đầy đủ các dòng sản phẩm
              </p>
            </div>
            
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group mb-8 border-4 border-white">
              <Image
                src="/intro.jpg"
                alt="Showroom sàn gỗ Miền Bắc - Chuyên cung cấp sàn gỗ cao cấp"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group border-2 border-gray-100">
                <Image
                  src="/intro1.jpg"
                  alt="Showroom sàn gỗ cao cấp"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group border-2 border-gray-100">
                <Image
                  src="/intro2.jpg"
                  alt="Các loại sàn gỗ đa dạng"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group border-2 border-gray-100">
                <Image
                  src="/intro3.jpg"
                  alt="Thi công sàn gỗ chuyên nghiệp"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-xl group border-2 border-gray-100">
                <Image
                  src="/intro4.jpg"
                  alt="Sản phẩm sàn gỗ hoàn thiện"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ƯU ĐIỂM
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Tại sao chọn chúng tôi?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 border border-green-100">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Chất lượng sản phẩm</h3>
              <p className="text-gray-600 leading-relaxed">
                Sản phẩm được chọn lọc kỹ, phù hợp khí hậu nồm ẩm Miền Bắc, đạt tiêu chuẩn về độ bền
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 border border-amber-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Giá thành hợp lý</h3>
              <p className="text-gray-600 leading-relaxed">
                Giá tại kho – không qua trung gian, mức giá cạnh tranh nhất thị trường
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Thi công chuẩn kỹ thuật</h3>
              <p className="text-gray-600 leading-relaxed">
                Thi công nhanh – gọn – đúng tiến độ. Đảm bảo phẳng nền, khít hèm, hạn chế cong vênh
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Tư vấn tận nơi</h3>
              <p className="text-gray-600 leading-relaxed">
                Khảo sát miễn phí, tư vấn tận tâm trước – trong – sau khi thi công
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0tMTIgNmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTI0IDI0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              CAM KẾT
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Khách hàng & Cam kết
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Phục vụ đa dạng khách hàng với cam kết chất lượng
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="font-bold text-2xl mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Khách hàng phục vụ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Chủ nhà chung cư, nhà phố</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Khách hàng xây mới hoặc cải tạo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Nhà thầu xây dựng</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Đơn vị thiết kế nội thất, kiến trúc</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Giá tại kho – không qua trung gian</h3>
                  <p className="text-white/90">Mua trực tiếp tại kho, tiết kiệm chi phí tối đa</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Sản phẩm đúng chất lượng, đúng mô tả</h3>
                  <p className="text-white/90">Cam kết 100% sản phẩm như đã giới thiệu</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Bảo hành rõ ràng</h3>
                  <p className="text-white/90">Chế độ bảo hành minh bạch, hỗ trợ lâu dài</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Hỗ trợ tư vấn tận tâm</h3>
                  <p className="text-white/90">Tư vấn trước – trong – sau khi thi công</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-xl font-semibold mb-2">💡 Chúng tôi hiểu rằng:</p>
              <p className="text-lg text-white/90">
                &ldquo;Độ bền của sàn gỗ phụ thuộc rất lớn vào tay nghề thi công&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
