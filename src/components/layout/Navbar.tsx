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

const FlagTR = () => (
  <svg viewBox="0 0 1200 800" className="w-5 h-3.5 object-cover rounded-sm shadow-sm flex-shrink-0">
    <rect width="1200" height="800" fill="#E30A17"/>
    <circle cx="425" cy="400" r="200" fill="#FFF"/>
    <circle cx="475" cy="400" r="160" fill="#E30A17"/>
    <polygon fill="#FFF" points="583.334,400 736.425,449.732 641.808,319.539 641.808,480.461 736.425,350.268"/>
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm shadow-sm flex-shrink-0">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-184 20 6 35L22 480H0v-50l240-129zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm shadow-sm flex-shrink-0">
    <path fill="#ffce00" d="M0 320h640v160H0z"/>
    <path d="M0 0h640v160H0z"/>
    <path fill="#d00" d="M0 160h640v160H0z"/>
  </svg>
);

const FlagRU = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-3.5 object-cover rounded-sm shadow-sm flex-shrink-0">
    <g fillRule="evenodd">
      <path fill="#fff" d="M0 0h640v160H0z"/>
      <path fill="#0039a6" d="M0 160h640v160H0z"/>
      <path fill="#d52b1e" d="M0 320h640v160H0z"/>
    </g>
  </svg>
);

const getFlag = (locale: string) => {
  switch (locale) {
    case 'tr': return <FlagTR />;
    case 'en': return <FlagEN />;
    case 'de': return <FlagDE />;
    case 'ru': return <FlagRU />;
    default: return <FlagTR />;
  }
};

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
                  {getFlag(currentLocale)}
                  <span className="text-sm font-semibold tracking-wide uppercase px-0.5">{currentLocale}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col overflow-hidden z-50 py-1"
                    >
                      <Link href={pathname as any} locale="tr" className={`px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2.5 transition-colors ${currentLocale === 'tr' ? 'bg-gray-50 text-[var(--color-primary)] font-semibold' : 'text-gray-700 font-medium'}`} onClick={() => setLangOpen(false)}>
                        <FlagTR /> <span className="tracking-wide">TÜRKÇE</span>
                      </Link>
                      <Link href={pathname as any} locale="en" className={`px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2.5 transition-colors ${currentLocale === 'en' ? 'bg-gray-50 text-[var(--color-primary)] font-semibold' : 'text-gray-700 font-medium'}`} onClick={() => setLangOpen(false)}>
                        <FlagEN /> <span className="tracking-wide">ENGLISH</span>
                      </Link>
                      <Link href={pathname as any} locale="de" className={`px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2.5 transition-colors ${currentLocale === 'de' ? 'bg-gray-50 text-[var(--color-primary)] font-semibold' : 'text-gray-700 font-medium'}`} onClick={() => setLangOpen(false)}>
                        <FlagDE /> <span className="tracking-wide">DEUTSCH</span>
                      </Link>
                      <Link href={pathname as any} locale="ru" className={`px-4 py-2 hover:bg-gray-50 text-sm flex items-center gap-2.5 transition-colors ${currentLocale === 'ru' ? 'bg-gray-50 text-[var(--color-primary)] font-semibold' : 'text-gray-700 font-medium'}`} onClick={() => setLangOpen(false)}>
                        <FlagRU /> <span className="tracking-wide">РУССКИЙ</span>
                      </Link>
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
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link href={pathname as any} locale="tr" className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${currentLocale === 'tr' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>
                      <FlagTR /> TR
                    </Link>
                    <Link href={pathname as any} locale="en" className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${currentLocale === 'en' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>
                      <FlagEN /> EN
                    </Link>
                    <Link href={pathname as any} locale="de" className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${currentLocale === 'de' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>
                      <FlagDE /> DE
                    </Link>
                    <Link href={pathname as any} locale="ru" className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${currentLocale === 'ru' ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`} onClick={() => setIsOpen(false)}>
                      <FlagRU /> RU
                    </Link>
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
