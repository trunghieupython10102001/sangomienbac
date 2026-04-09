'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      area: formData.get('area') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.' });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra. Vui lòng thử lại.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập họ và tên của bạn"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-gray-700">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-semibold mb-2 text-gray-700">
          Khu vực cần thi công
        </label>
        <input
          type="text"
          id="area"
          name="area"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Ví dụ: Hoàn Kiếm, Hà Nội"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
          Nội dung thêm
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none text-gray-900 placeholder:text-gray-500"
          placeholder="Mô tả chi tiết về công việc cần thi công..."
        />
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
      </button>
      <p className="text-sm text-gray-500 text-center">
        Chúng tôi sẽ phản hồi trong vòng 24 giờ
      </p>
    </form>
  );
}
