'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { defaultSiteSettings, type SiteSettings } from '@/lib/default-data';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    fetch('/api/content?key=site-settings')
      .then((res) => res.json())
      .then((json) => { if (json.data) setSettings(json.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const header = document.querySelector('header');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          header?.classList.add('scrolled');
        } else {
          header?.classList.remove('scrolled');
        }
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );

    const sentinel = document.getElementById('header-sentinel');
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="header-sentinel" className="absolute top-0 h-px w-full pointer-events-none" />
      <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-out">
        <div className="top-bar bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 overflow-hidden transition-all duration-300 ease-out">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <div className="flex gap-2">
                {settings.phones.map((phone, i) => (
                  <span key={phone} className="flex items-center gap-2">
                    {i > 0 && <span>-</span>}
                    <a href={`tel:${phone}`} className="hover:text-amber-100 transition">
                      {phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3')}
                    </a>
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{settings.email}</span>
            </div>
          </div>
          <span className="font-medium">{settings.slogan}</span>
        </div>
      </div>

      <nav className="container mx-auto px-4 transition-all duration-300 ease-out">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="logo-container relative flex-shrink-0 transition-all duration-300 ease-out">
              <Image
                src="/logo.png"
                alt="Kho sàn gỗ Miền Bắc Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 80px, 80px"
              />
            </div>
            <div className="flex flex-col">
              <span className="logo-text font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent group-hover:from-amber-800 group-hover:to-amber-700 transition-all duration-300 ease-out">
                Kho sàn gỗ Miền Bắc
              </span>
              <span className="logo-tagline text-xs sm:text-sm text-gray-600 font-medium transition-all duration-300 ease-out">{settings.tagline}</span>
            </div>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <ul className="hidden md:flex items-center space-x-1">
            <li>
              <Link href="/" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/san-pham" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/video-hinh-anh" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all">
                Video & Hình ảnh
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-all">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all shadow-md">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-1 pb-4">
            <li>
              <Link href="/" className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-all">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-all">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/san-pham" className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-all">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/video-hinh-anh" className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-all">
                Video & Hình ảnh
              </Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="block px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-all">
                Tin tức
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="block px-4 py-3 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all text-center">
                Liên hệ
              </Link>
            </li>
          </ul>
        )}
      </nav>
      </header>
    </>
  );
}
