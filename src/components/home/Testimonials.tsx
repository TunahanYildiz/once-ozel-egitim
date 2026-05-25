"use client";
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { usePathname } from '@/i18n/routing';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    { review: t('review1'), author: t('author1') },
    { review: t('review2'), author: t('author2') },
    { review: t('review3'), author: t('author3') }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth || 280;
      const index = Math.round(scrollLeft / (cardWidth + 16)); // Card width + gap
      setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
    }
  };

  return (
    <section className="py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t('title')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]">
            {t('title')}
          </h2>
        </div>
        
        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 md:mx-0 md:px-0"
        >
          {testimonials.map((item, idx) => (
            <motion.div
              key={`testimonial-${idx}-${pathname}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative z-10 w-[78vw] md:w-auto min-w-[260px] md:min-w-0 snap-center flex-shrink-0 first:ml-[4vw] last:mr-[4vw] md:first:ml-0 md:last:mr-0"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 italic">
                &ldquo;{item.review}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center text-[var(--color-secondary)] font-bold text-base md:text-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary)] text-sm md:text-base">{item.author}</h4>
                  <span className="text-xs md:text-sm text-gray-400 font-semibold">Veli</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Pagination Dots (Mobile Only) */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const card = scrollRef.current.querySelector('div');
                  if (card) {
                    const cardWidth = card.offsetWidth;
                    scrollRef.current.scrollTo({
                      left: i * (cardWidth + 16),
                      behavior: 'smooth'
                    });
                  }
                }
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === i 
                  ? 'w-6 bg-[var(--color-secondary)]' 
                  : 'w-2.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
