'use client';

import { useState, useEffect, useRef } from 'react';
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

const ZALO_NUMBERS = [
  { phone: '0363974768', label: '0363.974.768' },
  { phone: '0377602023', label: '0377.602.023' },
];

/**
 * Fixed bottom contact bar. These are plain <a href> links (not buttons that
 * call window.open) so Google Tag Manager link-click triggers can track them
 * as conversions.
 */
export default function MessengerButtons() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [zaloOpen, setZaloOpen] = useState(false);
  const zaloRef = useRef<HTMLDivElement>(null);

  // Close the Zalo number picker on an outside click or Escape.
  useEffect(() => {
    if (!zaloOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (!zaloRef.current?.contains(e.target as Node)) setZaloOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZaloOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [zaloOpen]);

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
        {/* The pill only opens the picker; the tracked conversions are the zalo.me <a> links inside it. */}
        <div ref={zaloRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setZaloOpen((o) => !o)}
            aria-expanded={zaloOpen}
            aria-haspopup="true"
            style={{ ...pill, backgroundColor: '#0078FF', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            💬 Chat Zalo
          </button>
          {zaloOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 10px)',
                left: 0,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                minWidth: 200,
              }}
            >
              <p style={{ margin: '2px 8px 4px', fontSize: 13, color: '#555' }}>Chọn số Zalo để chat:</p>
              {ZALO_NUMBERS.map((z) => (
                <a
                  key={z.phone}
                  href={`https://zalo.me/${z.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setZaloOpen(false)}
                  style={{ ...pill, backgroundColor: '#0078FF', padding: '10px 18px', boxShadow: 'none', whiteSpace: 'nowrap' }}
                >
                  💬 Zalo {z.label}
                </a>
              ))}
            </div>
          )}
        </div>
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
