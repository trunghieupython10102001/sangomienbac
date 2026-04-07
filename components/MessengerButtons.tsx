'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import ContactFormModal from './ContactFormModal';

export default function MessengerButtons() {
  const [showZaloOptions, setShowZaloOptions] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const facebookPageId = 'Khosangomienbac';
  const zaloPhoneNumbers = ['0363974768', '0969897297'];

  const handleFacebookClick = () => {
    window.open(`https://m.me/${facebookPageId}`, '_blank');
  };

  const handleZaloClick = (phoneNumber: string) => {
    window.open(`https://zalo.me/${phoneNumber}`, '_blank');
    setShowZaloOptions(false);
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
        <button
          onClick={() => setShowContactForm(true)}
          className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-110 animate-[shake_1s_ease-in-out_infinite]"
          aria-label="Đăng ký tư vấn"
        >
          <ClipboardList className="w-8 h-8 text-white" />
        </button>

        <button
          onClick={handleFacebookClick}
          className="group bg-white hover:bg-blue-50 p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-110 animate-[shake_1s_ease-in-out_infinite]"
          aria-label="Chat qua Facebook"
        >
          <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4C12.954 4 4 12.954 4 24C4 34.028 11.402 42.392 21.092 43.776V29.82H15.632V24H21.092V19.632C21.092 14.232 24.296 11.264 29.168 11.264C31.484 11.264 33.908 11.672 33.908 11.672V16.96H31.236C28.604 16.96 27.816 18.564 27.816 20.208V24H33.66L32.748 29.82H27.816V43.776C37.506 42.392 44.908 34.028 44.908 24C44.908 12.954 35.954 4 24 4Z" fill="#1877F2"/>
            <path d="M32.748 29.82L33.66 24H27.816V20.208C27.816 18.564 28.604 16.96 31.236 16.96H33.908V11.672C33.908 11.672 31.484 11.264 29.168 11.264C24.296 11.264 21.092 14.232 21.092 19.632V24H15.632V29.82H21.092V43.776C22.032 43.924 22.996 44 24 44C25.004 44 25.968 43.924 26.908 43.776V29.82H32.748Z" fill="white"/>
          </svg>
        </button>

        <div className="relative">
          {showZaloOptions && (
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-2 min-w-[200px] animate-in slide-in-from-bottom-2">
              <div className="text-xs font-semibold text-gray-600 px-3 py-2">Chọn số Zalo:</div>
              {zaloPhoneNumbers.map((phone) => (
                <button
                  key={phone}
                  onClick={() => handleZaloClick(phone)}
                  className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-md transition-colors flex items-center gap-2"
                >
                  <Image
                    src="/zalo-logo.png"
                    alt="Zalo"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="font-medium text-gray-700">{phone}</span>
                </button>
              ))}
            </div>
          )}
          
          <button
            onClick={() => setShowZaloOptions(!showZaloOptions)}
            className="group bg-white hover:bg-blue-50 p-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-110 animate-[shake_1s_ease-in-out_infinite]"
            aria-label="Chat qua Zalo"
          >
            <Image
              src="/zalo-logo.png"
              alt="Zalo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </button>
        </div>
      </div>

      <ContactFormModal 
        isOpen={showContactForm} 
        onClose={() => setShowContactForm(false)} 
      />
    </>
  );
}
