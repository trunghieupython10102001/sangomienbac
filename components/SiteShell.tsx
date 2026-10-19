'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import MessengerButtons from './MessengerButtons';
import CustomHtmlSlot from './CustomHtmlSlot';
import { Section } from './Section';
import type { CustomHtmlBlock, SectionHtml } from '@/lib/default-data';

export default function SiteShell({
  children,
  sections,
  customHtml,
}: {
  children: React.ReactNode;
  sections: SectionHtml;
  customHtml: CustomHtmlBlock[];
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Section id="header" overrides={sections}>
        <Header />
      </Section>
      <CustomHtmlSlot blocks={customHtml} position="after-header" />
      <main className="flex-1">{children}</main>
      <CustomHtmlSlot blocks={customHtml} position="before-footer" />
      <Section id="footer" overrides={sections}>
        <Footer />
      </Section>
      <BackToTop />
      <MessengerButtons />
    </>
  );
}
