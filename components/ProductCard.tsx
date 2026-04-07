'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  name: string;
  image: string;
  slug: string;
  shortDescription?: string;
  priceRange?: string;
  originalPrice?: string;
  discountedPrice?: string;
  colorCount?: number;
  colors?: string[];
}

export default function ProductCard({ name, image, slug, shortDescription, priceRange, originalPrice, discountedPrice, colorCount, colors }: ProductCardProps) {
  const [selectedImage, setSelectedImage] = useState(image);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col group">
      <Link href={`/san-pham/${slug}`} className="relative h-80 overflow-hidden bg-white block p-4">
        <Image
          src={selectedImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
          <ArrowRight className="w-5 h-5 text-amber-600" />
        </div>
      </Link>
      <div className="p-6 flex-1 flex flex-col">
        <Link href={`/san-pham/${slug}`}>
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
            {name}
          </h3>
        </Link>
        {shortDescription && (
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {shortDescription}
          </p>
        )}
        
        {(priceRange || (originalPrice && discountedPrice)) && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {priceRange ? (
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-medium">Giá tham khảo</span>
                <span className="text-amber-600 font-bold text-lg">{priceRange}</span>
              </div>
            ) : (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 font-medium">Giá khuyến mãi</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    GIẢM GIÁ
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
                  <span className="text-red-600 font-bold text-xl">{discountedPrice}</span>
                </div>
              </div>
            )}
            
            {colors && colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 font-medium">Màu sắc</span>
                  {colorCount && colorCount > colors.length && (
                    <span className="text-xs text-gray-400">+{colorCount - colors.length} màu khác</span>
                  )}
                </div>
                <div className="flex gap-2 mb-3">
                  {colors.slice(0, 4).map((color, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedImage(color);
                      }}
                      className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === color ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-200 hover:border-amber-400'
                      }`}
                    >
                      <Image
                        src={color}
                        alt={`Màu ${idx + 1}`}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <Link href={`/san-pham/${slug}`} className="text-amber-600 font-semibold text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all">
              Xem chi tiết
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
