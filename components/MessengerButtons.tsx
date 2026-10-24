'use client';

import { useState, useEffect } from 'react';
import ContactFormModal from './ContactFormModal';

/** How long a visitor browses before the consultation form invites itself in. */
const AUTO_OPEN_DELAY_MS = 30_000;
const AUTO_OPEN_FLAG = 'consult-popup-shown';

const pill: React.CSSProperties = {
  color: '#fff',
  fontWeight: 600,
  borderRadius: 50,
  padding: '10px 25px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
};

/**
 * Fixed bottom contact bar. These are plain <a href> links (not buttons that
 * call window.open) so Google Tag Manager link-click triggers can track them
 * as conversions.
 */
export default function MessengerButtons() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Open the consultation form once per browsing session. sessionStorage (not
  // localStorage) means it returns for a genuinely new visit but never nags
  // someone clicking through several pages.
  useEffect(() => {
    if (sessionStorage.getItem(AUTO_OPEN_FLAG)) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(AUTO_OPEN_FLAG, '1');
      setShowContactForm(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Reserves room so the fixed bar never hides the end of the footer (it wraps to 2 rows on phones). */}
      <div aria-hidden className="h-28 sm:h-16 bg-gray-900" />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
          padding: '10px 0',
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 9999,
          flexWrap: 'wrap',
        }}
      >
        <a
          href="https://zalo.me/0363974768"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...pill, backgroundColor: '#0078FF' }}
        >
          💬 Chat Zalo
        </a>
        <a
          href="https://www.messenger.com/t/280400238494126/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...pill, backgroundColor: '#0866FF' }}
        >
          💬 Messenger
        </a>
        <a href="tel:0363974768" style={{ ...pill, backgroundColor: '#FF6600' }}>
          ☎️ 0363.974.768
        </a>
        <a href="tel:0377602023" style={{ ...pill, backgroundColor: '#FF6600' }}>
          ☎️ 0377.602.023
        </a>
      </div>

      <ContactFormModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </>
  );
}
