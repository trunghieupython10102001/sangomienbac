'use client';

import Image from 'next/image';
import { Flame } from 'lucide-react';

const bestSellers = [
  { code: 'W93', price: '590.000', image: '/Sản phẩm bán chạy/W93 - 590.000.jpg' },
  { code: 'W96', price: '590.000', image: '/Sản phẩm bán chạy/W96 - 590.000.jpg' },
  { code: 'OX8', price: '550.000', image: '/Sản phẩm bán chạy/OX8 - 550.000.jpg' },
  { code: 'M162', price: '460.000', image: '/Sản phẩm bán chạy/M162 - 460.000.jpg' },
  { code: 'M168', price: '460.000', image: '/Sản phẩm bán chạy/M168 - 460.000.jpg' },
  { code: 'PX99-1', price: '430.000', image: '/Sản phẩm bán chạy/PX99-1 - 430.000.JPG' },
  { code: 'Z001', price: '390.000', image: '/Sản phẩm bán chạy/Z001 - 390.000.jpg' },
  { code: 'Z008', price: '390.000', image: '/Sản phẩm bán chạy/Z008 - 390.000.jpg' },
  { code: 'N777', price: '370.000', image: '/Sản phẩm bán chạy/N777 - 370.000.jpg' },
];

export default function BestSellers() {
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
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                  Mã: {product.code}
                </h3>
                <p className="text-red-600 font-bold text-base md:text-lg">
                  {product.price}đ/m²
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
