'use client';

import { Phone, Mail, MapPin, Facebook, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { defaultSiteSettings, type SiteSettings } from '@/lib/default-data';

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    fetch('/api/content?key=site-settings')
      .then((res) => res.json())
      .then((json) => { if (json.data) setSettings(json.data); })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-xl p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Kho sàn gỗ Miền Bắc"
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">Kho sàn gỗ Miền Bắc</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa cao cấp
              với giá tốt nhất thị trường.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-lg transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-600 p-3 rounded-lg transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/bao-gia" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Báo giá
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Liên hệ</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3 group">
                <div className="bg-amber-600/10 p-2 rounded-lg group-hover:bg-amber-600/20 transition-colors">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                </div>
                <span className="leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-amber-600/10 p-2 rounded-lg group-hover:bg-amber-600/20 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                </div>
                <div className="space-y-1">
                  {settings.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="hover:text-amber-500 transition-colors font-semibold block">
                      {phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-amber-600/10 p-2 rounded-lg group-hover:bg-amber-600/20 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                </div>
                <a href={`mailto:${settings.email}`} className="hover:text-amber-500 transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Giờ làm việc</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-600/10 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-gray-400">
                  <p className="font-semibold text-white mb-1">{settings.workingHours}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-xl">
                <p className="text-sm font-semibold mb-2">Tư vấn 24/7</p>
                <p className="text-xs opacity-90">Luôn sẵn sàng hỗ trợ bạn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Kho sàn gỗ Miền Bắc. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Designed with ❤️ for quality flooring
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
