'use client';

import { useState, FormEvent, useEffect, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const submittedPhonesRef = useRef<Set<string>>(new Set());

  const isValidPhone = (phone: string) => {
    return phone.length >= 10 && /^[0-9]+$/.test(phone);
  };

  const submitForm = useCallback(async (data: typeof formData, isAuto = false) => {
    if (!data.phone || !isValidPhone(data.phone)) return;
    
    if (submittedPhonesRef.current.has(data.phone)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

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
        submittedPhonesRef.current.add(data.phone);
        if (!isAuto) {
          setMessage({ 
            type: 'success', 
            text: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ lại sớm.' 
          });
        }
        if (isAuto) {
          setHasAutoSubmitted(true);
        }
      } else {
        if (!isAuto) {
          setMessage({ type: 'error', text: result.error || 'Có lỗi xảy ra. Vui lòng thử lại.' });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (!isAuto) {
        setMessage({ type: 'error', text: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (formData.phone && isValidPhone(formData.phone) && !hasAutoSubmitted) {
      debounceTimerRef.current = setTimeout(() => {
        submitForm(formData, true);
      }, 3000);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData, hasAutoSubmitted, submitForm]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm(formData, false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'phone') {
      setHasAutoSubmitted(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">
          Họ và tên
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập họ và tên của bạn"
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
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập email của bạn"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">
          Nội dung
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none resize-none text-gray-900 placeholder:text-gray-500"
          placeholder="Nhập nội dung tin nhắn của bạn..."
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
