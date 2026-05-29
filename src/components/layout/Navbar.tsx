"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const links = [
    { href: '/', label: t('home') },
    { href: '/kurumsal', label: t('corporate') },
    { href: '/egitimlerimiz', label: t('education') },
    { href: '/uzman-kadromuz', label: t('staff') },
    { href: '/blog', label: t('blog') },
    { href: '/galeri', label: t('galeri') },
    { href: '/iletisim', label: t('contact') },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Overlay to close mobile menu on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group" onClick={handleLogoClick}>
            <Image
              src="/logo.png"
              alt="Önce Özel Eğitim Logo"
              width={40}
              height={40}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="font-bold text-xl text-[var(--color-primary)] leading-tight">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className="text-gray-700 hover:text-[var(--color-secondary)] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Language & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-[var(--color-primary)] transition-colors py-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium uppercase">{currentLocale}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-0 w-32 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 flex flex-col overflow-hidden">
                <Link href={pathname as any} locale="tr" className="px-4 py-2 hover:bg-gray-50 text-sm">Türkçe</Link>
                <Link href={pathname as any} locale="en" className="px-4 py-2 hover:bg-gray-50 text-sm">English</Link>
                <Link href={pathname as any} locale="de" className="px-4 py-2 hover:bg-gray-50 text-sm">Deutsch</Link>
                <Link href={pathname as any} locale="ru" className="px-4 py-2 hover:bg-gray-50 text-sm">Русский</Link>
              </div>
            </div>
            
            <Link 
              href="/iletisim" 
              className="px-6 py-2.5 bg-[var(--color-secondary)] text-white rounded-full font-semibold hover:bg-[var(--color-secondary-light)] transition-all shadow-md shadow-[var(--color-secondary)]/20 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[var(--color-primary)] focus:outline-none p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[var(--color-secondary)] hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-4 px-3 border-t border-gray-100">
                <div className="flex space-x-4">
                  <Link href={pathname as any} locale="tr" className="text-sm font-medium hover:text-[var(--color-secondary)]">TR</Link>
                  <Link href={pathname as any} locale="en" className="text-sm font-medium hover:text-[var(--color-secondary)]">EN</Link>
                  <Link href={pathname as any} locale="de" className="text-sm font-medium hover:text-[var(--color-secondary)]">DE</Link>
                  <Link href={pathname as any} locale="ru" className="text-sm font-medium hover:text-[var(--color-secondary)]">RU</Link>
                </div>
                <Link 
                  href="/iletisim" 
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-6 py-3 bg-[var(--color-secondary)] text-white rounded-full font-semibold"
                >
                  {t('cta')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}
