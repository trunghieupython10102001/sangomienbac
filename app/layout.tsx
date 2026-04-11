import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import MessengerButtons from "@/components/MessengerButtons";

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
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icon-192.png',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <MessengerButtons />
      </body>
    </html>
  );
}
