"use client";

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, Globe, ChevronDown, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { PROGRAMS } from '@/lib/programs';

// Program groups for the Education mega menu
function EduMegaMenu({ t, onClose }: { t: ReturnType<typeof useTranslations<'Navbar'>>; onClose: () => void }) {
  const groups = [
    {
      cat: t('eduMenu.cat1'),
      items: [
        { key: 'c1_p1', label: t('eduMenu.c1_p1') },
        { key: 'c1_p2', label: t('eduMenu.c1_p2') },
        { key: 'c1_p3', label: t('eduMenu.c1_p3') },
        { key: 'c1_p4', label: t('eduMenu.c1_p4') },
        { key: 'c1_p5', label: t('eduMenu.c1_p5') },
      ],
    },
    {
      cat: t('eduMenu.cat2'),
      items: [
        { key: 'c2_p1', label: t('eduMenu.c2_p1') },
        { key: 'c2_p2', label: t('eduMenu.c2_p2') },
        { key: 'c2_p3', label: t('eduMenu.c2_p3') },
        { key: 'c2_p4', label: t('eduMenu.c2_p4') },
        { key: 'c2_p5', label: t('eduMenu.c2_p5') },
      ],
    },
    {
      cat: t('eduMenu.cat3'),
      items: [
        { key: 'c3_p1', label: t('eduMenu.c3_p1') },
        { key: 'c3_p2', label: t('eduMenu.c3_p2') },
        { key: 'c3_p3', label: t('eduMenu.c3_p3') },
        { key: 'c3_p4', label: t('eduMenu.c3_p4') },
        { key: 'c3_p5', label: t('eduMenu.c3_p5') },
      ],
    },
    {
      cat: t('eduMenu.cat4'),
      items: [
        { key: 'c4_p1', label: t('eduMenu.c4_p1') },
        { key: 'c4_p2', label: t('eduMenu.c4_p2') },
        { key: 'c4_p3', label: t('eduMenu.c4_p3') },
        { key: 'c4_p4', label: t('eduMenu.c4_p4') },
        { key: 'c4_p5', label: t('eduMenu.c4_p5') },
        { key: 'c4_p6', label: t('eduMenu.c4_p6') },
      ],
    },
    {
      cat: t('eduMenu.cat5'),
      items: [
        { key: 'c5_p1', label: t('eduMenu.c5_p1') },
        { key: 'c5_p2', label: t('eduMenu.c5_p2') },
        { key: 'c5_p3', label: t('eduMenu.c5_p3') },
        { key: 'c5_p4', label: t('eduMenu.c5_p4') },
        { key: 'c5_p5', label: t('eduMenu.c5_p5') },
        { key: 'c5_p6', label: t('eduMenu.c5_p6') },
        { key: 'c5_p7', label: t('eduMenu.c5_p7') },
      ],
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header strip */}
      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 px-6 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-sm tracking-wide uppercase">
          {t('education')}
        </span>
        <Link
          href="/egitimlerimiz"
          onClick={onClose}
          className="text-white/80 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1"
        >
          {t('eduMenu.viewAll')}
        </Link>
      </div>
      {/* Programs grid */}
      <div className="p-5 grid grid-cols-5 gap-4">
        {groups.map((group) => (
          <div key={group.cat}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-secondary)] mb-2 pb-1 border-b border-gray-100">
              {group.cat}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const prog = PROGRAMS.find(p => p.translationKey === item.key);
                const href = prog ? `/egitimlerimiz/${prog.slug}` : '/egitimlerimiz';
                return (
                <li key={item.key}>
                  <Link
                    href={href as any}
                    onClick={onClose}
                    className="block text-sm text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors leading-snug"
                  >
                    {item.label}
                  </Link>
                </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [eduOpen, setEduOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;
  const eduRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (eduRef.current && !eduRef.current.contains(e.target as Node)) {
        setEduOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { href: '/kurumsal', label: t('corporate') },
    { href: '/hizmetlerimiz', label: t('services') },
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
      <nav className="sticky top-0 z-50 glass border-b border-gray-200/50" aria-label="Ana navigasyon">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="font-bold text-xl text-[var(--color-primary)] leading-tight whitespace-nowrap">
                {t('logo')}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-4">

              {/* Eğitimlerimiz with mega menu */}
              <div ref={eduRef}>
                <button
                  onClick={() => setEduOpen((v) => !v)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    eduOpen ? 'text-[var(--color-secondary)]' : 'text-gray-700 hover:text-[var(--color-secondary)]'
                  }`}
                  aria-expanded={eduOpen}
                  aria-haspopup="true"
                >
                  {t('education')}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${eduOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {eduOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-4 right-4 lg:left-8 lg:right-8 mx-auto max-w-[1000px] top-full mt-2 z-50"
                    >
                      <EduMegaMenu t={t} onClose={() => setEduOpen(false)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Regular links */}
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="text-gray-700 hover:text-[var(--color-secondary)] text-sm font-medium transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side: Phone + Language + CTA */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">

              {/* Phone — only show on xl to avoid crowding on DE/RU */}
              <a
                href={`tel:${t('phone').replace(/\s|\(|\)|-/g, '')}`}
                className="hidden xl:flex items-center gap-1.5 text-gray-600 hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
                aria-label="Telefon"
              >
                <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                <span className="whitespace-nowrap">{t('phone')}</span>
              </a>

              {/* Language */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className={`flex items-center space-x-1 transition-colors py-2 ${
                    langOpen ? 'text-[var(--color-primary)]' : 'text-gray-600 hover:text-[var(--color-primary)]'
                  }`}
                  aria-expanded={langOpen}
                  aria-haspopup="true"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase">{currentLocale}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden z-50"
                    >
                      <Link href={pathname as any} locale="tr" className="px-4 py-2 hover:bg-gray-50 text-sm focus:bg-gray-50 outline-none" onClick={() => setLangOpen(false)}>Türkçe</Link>
                      <Link href={pathname as any} locale="en" className="px-4 py-2 hover:bg-gray-50 text-sm focus:bg-gray-50 outline-none" onClick={() => setLangOpen(false)}>English</Link>
                      <Link href={pathname as any} locale="de" className="px-4 py-2 hover:bg-gray-50 text-sm focus:bg-gray-50 outline-none" onClick={() => setLangOpen(false)}>Deutsch</Link>
                      <Link href={pathname as any} locale="ru" className="px-4 py-2 hover:bg-gray-50 text-sm focus:bg-gray-50 outline-none" onClick={() => setLangOpen(false)}>Русский</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <a
                href="https://b2c.beeasist.com/c/3lBkwZOb"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 xl:px-5 bg-[var(--color-secondary)] text-white rounded-full font-semibold hover:bg-[var(--color-secondary-light)] transition-all shadow-md shadow-[var(--color-secondary)]/20 transform hover:-translate-y-0.5 whitespace-nowrap text-sm"
              >
                {t('cta')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] rounded-md p-2"
                aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={isOpen}
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
                {/* Eğitimlerimiz in mobile */}
                <Link
                  href="/egitimlerimiz"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[var(--color-secondary)] hover:bg-gray-50"
                >
                  {t('education')}
                </Link>
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
                  {/* Phone in mobile */}
                  <a
                    href={`tel:${t('phone').replace(/\s|\(|\)|-/g, '')}`}
                    className="flex items-center gap-2 text-base font-medium text-gray-700"
                  >
                    <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                    {t('phone')}
                  </a>
                  <div className="flex space-x-4">
                    <Link href={pathname as any} locale="tr" className="text-sm font-medium hover:text-[var(--color-secondary)]">TR</Link>
                    <Link href={pathname as any} locale="en" className="text-sm font-medium hover:text-[var(--color-secondary)]">EN</Link>
                    <Link href={pathname as any} locale="de" className="text-sm font-medium hover:text-[var(--color-secondary)]">DE</Link>
                    <Link href={pathname as any} locale="ru" className="text-sm font-medium hover:text-[var(--color-secondary)]">RU</Link>
                  </div>
                  <a
                    href="https://b2c.beeasist.com/c/3lBkwZOb"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-6 py-3 bg-[var(--color-secondary)] text-white rounded-full font-semibold"
                  >
                    {t('cta')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
