import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {Inter} from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import type { Metadata } from 'next';

export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL('https://onceozelegitim.com'),
  verification: {
    google: 'uHP7KHzra0VNF_nGG7sbUg1CgSvCMUg3UTbG4U5faUY',
    yandex: 'yandex-verification-code-buraya-gelecek',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
};

const inter = Inter({ subsets: ['latin', 'latin-ext', 'cyrillic'], variable: '--font-inter' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}



export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <ScrollToTop />
          <WhatsAppButton />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
