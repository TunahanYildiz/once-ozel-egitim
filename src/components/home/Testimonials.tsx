"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { usePathname } from '@/i18n/routing';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const pathname = usePathname();

  const testimonials = [
    { review: t('review1'), author: t('author1') },
    { review: t('review2'), author: t('author2') },
    { review: t('review3'), author: t('author3') }
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]">
            {t('title')}
          </h2>
        </div>
        
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((item, idx) => (
            <motion.div
              key={`testimonial-${idx}-${pathname}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative z-10 min-w-[280px] w-[85vw] md:w-auto md:min-w-0 snap-center flex-shrink-0"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-gray-100" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 italic">
                &ldquo;{item.review}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div className="w-12 h-12 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center text-[var(--color-secondary)] font-bold text-lg">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary)]">{item.author}</h4>
                  <span className="text-sm text-gray-500">Veli</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
