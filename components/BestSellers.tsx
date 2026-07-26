import Image from 'next/image';
import { Flame } from 'lucide-react';
import { getBestSellers } from '@/lib/site-data';

/** Numeric value of a price string, e.g. "590.000" → 590000. */
function toNum(s?: string): number {
  const n = Number((s ?? '').replace(/[^\d]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/** Discount percentage from original vs current price, or 0 when not applicable. */
function discountPct(price: string, originalPrice?: string): number {
  const now = toNum(price);
  const orig = toNum(originalPrice);
  return orig > now && now > 0 ? Math.round((1 - now / orig) * 100) : 0;
}

export default async function BestSellers() {
  const bestSellers = await getBestSellers();
  return (
    <section className="py-16 bg-gradient-to-b from-red-50 via-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Flame className="w-4 h-4" />
            BÁN CHẠY NHẤT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Sản Phẩm Bán Chạy
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Những mẫu sàn gỗ được khách hàng yêu thích và lựa chọn nhiều nhất
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.code}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={`Sàn gỗ ${product.code}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  HOT
                </div>
                {discountPct(product.price, product.originalPrice) > 0 && (
                  <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded-md">
                    -{discountPct(product.price, product.originalPrice)}%
                  </div>
                )}
              </div>
              <div className="p-3 md:p-4">
                {product.name && (
                  <p className="text-xs text-gray-500 truncate mb-0.5">{product.name}</p>
                )}
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                  {product.code}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-red-600 font-bold text-base md:text-lg">
                    {product.price}đ/m²
                  </p>
                  {discountPct(product.price, product.originalPrice) > 0 && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}đ
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
