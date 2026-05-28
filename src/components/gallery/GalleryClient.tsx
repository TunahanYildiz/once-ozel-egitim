'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  src: string;
  category: string;
}

export default function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const t = useTranslations('Galeri');
  const [activeCategory, setActiveCategory] = useState('hepsi');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const CATEGORIES = [
    { key: 'hepsi', label: t('catAll') },
    { key: 'terapi', label: t('catTherapy') },
    { key: 'egitim', label: t('catEducation') },
    { key: 'mekan', label: t('catVenue') },
    { key: 'etkinlik', label: t('catActivity') },
  ];

  const CATEGORY_LABELS: Record<string, string> = {
    terapi: t('overlayTherapy'),
    egitim: t('overlayEducation'),
    mekan: t('overlayVenue'),
    etkinlik: t('overlayActivity'),
  };

  const GALLERY_ITEMS = initialImages.map((item) => ({
    ...item,
    alt: t('altText'),
  }));

  const filtered = activeCategory === 'hepsi'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(img => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextImage = () => setLightboxIdx(i => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <>
      {/* Filter Bar */}
      <section className="bg-white py-6 sticky top-20 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Camera className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
            <div className="flex gap-2 flex-shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat.key
                      ? 'bg-[var(--color-secondary)] text-white shadow-lg shadow-[var(--color-secondary)]/30 scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="ml-auto text-sm text-gray-400 flex-shrink-0 hidden sm:block">
              {filtered.length} {t('photoCount')}
            </span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-block bg-[var(--color-secondary)] text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-1.5 capitalize">
                          {CATEGORY_LABELS[img.category] || img.category}
                        </span>
                        <p className="text-white text-sm font-semibold leading-tight">{img.alt}</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('catAll')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIdx].src}
                alt={filtered[lightboxIdx].alt}
                width={1200}
                height={900}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl p-5">
                <p className="text-white font-semibold">{filtered[lightboxIdx].alt}</p>
                <p className="text-white/60 text-sm">{lightboxIdx + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
