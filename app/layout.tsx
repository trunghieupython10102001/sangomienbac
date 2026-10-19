import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { getCustomHtml, getSectionHtml } from "@/lib/site-data";

const GTM_ID = 'GTM-P483V36J';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kho sàn gỗ Miền Bắc - Chuyên cung cấp sàn gỗ cao cấp",
  description: "Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa cao cấp với giá tốt nhất thị trường",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Kho sàn gỗ Miền Bắc - Chuyên cung cấp sàn gỗ cao cấp",
    description: "Chuyên cung cấp và thi công sàn gỗ công nghiệp, sàn nhựa cao cấp với giá tốt nhất thị trường",
    images: [{ url: '/logo.png', width: 1408, height: 768 }],
    type: 'website',
    locale: 'vi_VN',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sections, customHtml] = await Promise.all([getSectionHtml(), getCustomHtml()]);
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager — inline in <head>, as high as possible, per GTM install guide. */}
        <script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18067397087"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18067397087');
          `}
        </Script>
        <Script id="google-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-18067397087/COpHCIy4jZkcEN-zmqdD',
                'value': 1.0,
                'currency': 'VND',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
        <SiteShell sections={sections} customHtml={customHtml}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
