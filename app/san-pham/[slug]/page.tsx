'use client';

import { categories, Category } from "@/lib/products";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowLeft, Info, Ruler, Package, Layers, Droplets, Shield, Wrench, Sparkles, ArrowLeftRight, Box } from "lucide-react";
import { useState, useEffect } from "react";
import ImageViewer from "@/components/ImageViewer";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const specs = category.specifications;
  const [images, setImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllImages, setShowAllImages] = useState(false);
  const initialImageCount = 6;

  useEffect(() => {
    // Set timeout to prevent long waiting
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        // Use category.colors as fallback if API takes too long
        setImages(category.colors);
        setIsLoading(false);
      }
    }, 2000); // 2 second timeout

    // Fetch images from API route
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        clearTimeout(timeoutId);
        // Use API images if available, otherwise use category.colors
        const imagesToUse = data.images && data.images.length > 0 ? data.images : category.colors;
        setImages(imagesToUse);
        setIsLoading(false);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        // Fallback to category.colors on error
        setImages(category.colors);
        setIsLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [slug, category.colors, isLoading]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh mục
          </Link>

          {/* Product Header */}
          <div className="mb-12">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {specs.origin}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{category.name}</h1>
            <div className="mb-4">
              {category.priceRange ? (
                <div className="text-3xl font-bold text-amber-600">{category.priceRange}</div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-amber-600">{category.discountedPrice}</div>
                  <div className="text-xl line-through text-gray-400">{category.originalPrice}</div>
                </div>
              )}
            </div>
            <p className="text-xl text-gray-600">{category.shortDescription}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Product Specifications */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Info className="w-5 h-5 text-amber-600" />
                  </div>
                  Thông số kỹ thuật
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Package className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 mb-0.5">Xuất xứ</div>
                      <div className="font-semibold text-gray-900">{specs.origin}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Ruler className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 mb-0.5">Kích thước</div>
                      <div className="font-semibold text-gray-900">{specs.size}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Layers className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 mb-0.5">Độ dày</div>
                      <div className="font-semibold text-gray-900">{specs.thickness}</div>
                    </div>
                  </div>
                  {specs.waterproof && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Droplets className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-0.5">Chống nước</div>
                        <div className="font-semibold text-gray-900">{specs.waterproof}</div>
                      </div>
                    </div>
                  )}
                  {specs.durability && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-0.5">Độ bền</div>
                        <div className="font-semibold text-gray-900">{specs.durability}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Wrench className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 mb-0.5">Lắp đặt</div>
                      <div className="font-semibold text-gray-900">{specs.installation}</div>
                    </div>
                  </div>
                  {specs.surface.length > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-1">Bề mặt</div>
                        <ul className="space-y-1">
                          {specs.surface.map((item, index) => (
                            <li key={index} className="font-semibold text-sm text-gray-900 flex items-start gap-1">
                              <span className="text-amber-600 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {specs.width && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <ArrowLeftRight className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-0.5">Độ rộng</div>
                        <div className="font-semibold text-gray-900">{specs.width}</div>
                      </div>
                    </div>
                  )}
                  {specs.material && (
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <Box className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700 mb-0.5">Chất liệu</div>
                        <div className="font-semibold text-gray-900">{specs.material}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Shield className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 mb-0.5">Bảo hành</div>
                      <div className="font-bold text-amber-700">{specs.warranty}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl text-center">
                    <div className="text-base font-medium mb-2">Giá bán</div>
                    {category.priceRange ? (
                      <div className="text-2xl font-bold mb-4">{category.priceRange}</div>
                    ) : (
                      <>
                        <div className="text-sm line-through opacity-75 mb-1">{category.originalPrice}</div>
                        <div className="text-3xl font-bold mb-4">{category.discountedPrice}</div>
                      </>
                    )}
                    <div className="space-y-2">
                      <a
                        href="tel:0363974768"
                        className="inline-flex items-center gap-2 bg-white text-amber-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full justify-center"
                      >
                        <Phone className="w-5 h-5" />
                        0363.974.768
                      </a>
                      <a
                        href="tel:0969897297"
                        className="inline-flex items-center gap-2 bg-white text-amber-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full justify-center"
                      >
                        <Phone className="w-5 h-5" />
                        0969.897.297
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Images Gallery */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between text-gray-900">
                <span>Thư viện ảnh sản phẩm</span>
                {!isLoading && images.length > 0 && (
                  <span className="text-sm font-medium text-gray-700">
                    {showAllImages ? images.length : Math.min(initialImageCount, images.length)} / {images.length} ảnh
                  </span>
                )}
              </h2>
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-xl h-64 animate-pulse"></div>
                  ))}
                </div>
              ) : images.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(showAllImages ? images : images.slice(0, initialImageCount)).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative h-64">
                          <Image
                            src={image}
                            alt={`${category.name} ${index + 1}`}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            loading={index < 3 ? "eager" : "lazy"}
                            quality={75}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="bg-white/95 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                              <span className="text-sm font-bold text-gray-900">Xem ảnh</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            Mã: {image.split('/').pop()?.split('.')[0]}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {!showAllImages && images.length > initialImageCount && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setShowAllImages(true)}
                        className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl"
                      >
                        Xem thêm {images.length - initialImageCount} ảnh
                        <ArrowLeft className="w-5 h-5 rotate-[-90deg]" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <p className="text-gray-600 text-lg">Đang cập nhật hình ảnh sản phẩm...</p>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cần tư vấn chi tiết?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Đội ngũ chuyên viên của chúng tôi sẵn sàng tư vấn miễn phí và báo giá chi tiết cho bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0363974768"
                className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <Phone className="w-6 h-6" />
                0363.974.768
              </a>
              <a
                href="tel:0969897297"
                className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <Phone className="w-6 h-6" />
                0969.897.297
              </a>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-900 transition-all"
              >
                Gửi tin nhắn
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImageIndex !== null && (
        <ImageViewer
          images={images}
          currentIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
          onNavigate={setSelectedImageIndex}
        />
      )}
    </>
  );
}
