'use client';

import { Phone, Mail, MapPin, Facebook, MessageCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  defaultSiteSettings,
  defaultFooterContent,
  type SiteSettings,
  type FooterContent,
} from '@/lib/default-data';

/** lucide-react has no TikTok glyph, so the brand mark is inlined. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12v-3.2a5.98 5.98 0 0 0-.76-.05 5.72 5.72 0 1 0 5.72 5.72V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.28-1.48z" />
    </svg>
  );
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [content, setContent] = useState<FooterContent>(defaultFooterContent);

  useEffect(() => {
    fetch('/api/content?key=site-settings')
      .then((res) => res.json())
      .then((json) => { if (json.data) setSettings(json.data); })
      .catch(() => {});

    fetch('/api/content?key=footer')
      .then((res) => res.json())
      // Merge so a footer.json saved before a field existed still renders it.
      .then((json) => { if (json.data) setContent({ ...defaultFooterContent, ...json.data }); })
      .catch(() => {});
  }, []);

  const socials = [
    { url: settings.facebookUrl, label: 'Facebook', hover: 'hover:bg-blue-600', icon: <Facebook className="w-5 h-5" /> },
    { url: settings.tiktokUrl, label: 'TikTok', hover: 'hover:bg-black', icon: <TikTokIcon className="w-5 h-5" /> },
    { url: settings.zaloUrl, label: 'Zalo', hover: 'hover:bg-green-600', icon: <MessageCircle className="w-5 h-5" /> },
  ].filter((s) => s.url && s.url !== '#');

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-xl p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt={settings.shopName}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>
              <h3 className="text-2xl font-bold text-white">{settings.shopName}</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">{content.description}</p>
            <div className="flex space-x-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`bg-gray-800 ${social.hover} p-3 rounded-lg transition-all`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{content.quickLinksTitle}</h3>
            <ul className="space-y-3">
              {content.quickLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{content.contactTitle}</h3>
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
            <h3 className="text-lg font-bold mb-6 text-white">{content.hoursTitle}</h3>
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
                <p className="text-sm font-semibold mb-2">{content.ctaTitle}</p>
                <p className="text-xs opacity-90">{content.ctaSubtitle}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{content.copyright}</p>
            <p className="text-gray-500 text-sm">{content.credit}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
