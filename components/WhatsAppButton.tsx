'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '84363777986';
  const message = 'Xin chào, tôi muốn tư vấn về sàn gỗ';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 left-8 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 flex items-center gap-3 group transform hover:scale-105"
      aria-label="Chat qua WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      <span className="hidden group-hover:inline-block whitespace-nowrap font-semibold pr-2">
        Chat WhatsApp
      </span>
    </button>
  );
}
