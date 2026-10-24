'use client';

import { useEffect, useState } from 'react';
import { defaultSiteSettings, type SiteSettings } from './default-data';

/** "0363974768" → "0363.974.768" */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
}

/** Phone numbers from admin "Thông tin cửa hàng", for client pages. */
export function useSitePhones(): string[] {
  const [phones, setPhones] = useState(defaultSiteSettings.phones);

  useEffect(() => {
    fetch('/api/content?key=site-settings')
      .then((res) => res.json())
      .then((json: { data?: SiteSettings | null }) => {
        if (json.data?.phones?.length) setPhones(json.data.phones);
      })
      .catch(() => {});
  }, []);

  return phones;
}
