"use client";
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const slides = [
    {
      id: 'main',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1920&q=80',
      position: 'object-center',
      title: t('heroTitle'),
      subtitle: t('heroSubtitle'),
      buttons: [
        { text: t('heroBtn1'), href: 'https://b2c.beeasist.com/c/3lBkwZOb', external: true, primary: true },
        { text: t('heroBtn2'), href: '/egitimlerimiz', external: false, primary: false }
      ]
    },
    {
      id: 'konaklama',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80',
      position: 'object-center',
      title: t('heroKonaklamaTitle'),
      subtitle: t('heroKonaklamaSubtitle'),
      buttons: [
        { text: t('heroKonaklamaBtn'), href: '/hizmetlerimiz#bolum-2', external: false, primary: true }
      ]
    },
    {
      id: 'kamp',
      image: '/images/kamp-hero.jpg',
      position: 'object-[85%_center] md:object-center',
      title: t('heroKampTitle'),
      subtitle: t('heroKampSubtitle'),
      buttons: [
        { text: t('heroKampBtn'), href: '/hizmetlerimiz', external: false, primary: true }
      ]
    },
    {
      id: 'egitimler',
      image: '/images/yeni.jpg',
      position: 'object-[90%_center] md:object-center',
      title: t('heroEgitimlerTitle'),
      subtitle: t('heroEgitimlerSubtitle'),
      buttons: [
        { text: t('heroEgitimlerBtn'), href: '/egitimlerimiz', external: false, primary: true }
      ]
    }
  ];

  // Auto-play logic with reset on interaction
  useEffect(() => {
    // Force scroll to top on mount (useful for restoring position when navigating back from a hash link)
    window.scrollTo(0, 0);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide
    return () => clearInterval(timer);
  }, [slides.length, lastInteraction, pathname]);

  const handleInteraction = () => setLastInteraction(Date.now());

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    handleInteraction();
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    handleInteraction();
  };

  const setSlide = (idx: number) => {
    setCurrentSlide(idx);
    handleInteraction();
  };

  return (
    <section className="relative overflow-hidden bg-gray-900 h-[60vh] min-h-[450px] md:h-[85vh] md:min-h-[600px] flex items-center group touch-pan-y">
      {/* Background Images with Crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className={`object-cover ${slides[currentSlide].position || 'object-center md:object-center'}`}
            priority
          />
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
      </AnimatePresence>

      {/* Swipeable invisible overlay for mobile */}
      <motion.div
        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, { offset }) => {
          if (offset.x < -50) nextSlide();
          else if (offset.x > 50) prevSlide();
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex items-end pb-20 md:pb-0 md:items-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl w-[85%] sm:w-full pt-10 lg:pt-20 pointer-events-auto"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-3 md:mb-6 leading-tight drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="mt-3 md:mt-6 text-base sm:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              {slides[currentSlide].buttons.map((btn, idx) => (
                btn.external ? (
                  <a 
                    key={idx}
                    href={btn.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:-translate-y-1 text-center shrink-0 ${
                      btn.primary 
                        ? 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-light)] shadow-[var(--color-secondary)]/30' 
                        : 'bg-white/20 backdrop-blur-md text-white border-2 border-white hover:bg-white hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {btn.text}
                  </a>
                ) : (
                  <Link 
                    key={idx}
                    href={btn.href} 
                    className={`w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg transition-all shadow-lg hover:-translate-y-1 text-center shrink-0 ${
                      btn.primary 
                        ? 'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-light)] shadow-[var(--color-secondary)]/30' 
                        : 'bg-white/20 backdrop-blur-md text-white border-2 border-white hover:bg-white hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {btn.text}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {currentSlide !== 0 && (
        <button 
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100"
          aria-label="Önceki"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-black/40 hover:scale-110 transition-all opacity-100 sm:opacity-0 group-hover:opacity-100"
        aria-label="Sonraki"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === idx 
                ? 'w-10 h-3 bg-[var(--color-secondary)] shadow-[0_0_10px_rgba(34,197,94,0.5)]' 
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slayt ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
