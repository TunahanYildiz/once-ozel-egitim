"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, Award, HeartHandshake, Laptop, CheckCircle, Users, Star } from 'lucide-react';
import { usePathname } from '@/i18n/routing';
import Image from 'next/image';

export default function BentoGrid() {
  const t = useTranslations('BentoGrid');
  const pathname = usePathname();

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t('whyUs')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight">
            Neden <span className="text-[var(--color-secondary)]">Önce</span> Biz?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[280px]">

          {/* Card 1 — Large: Uzman Kadro */}
          <motion.div
            key={`bento-0-${pathname}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-500 h-[480px] md:h-auto"
          >
            <Image
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
              alt={t('title1')}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/40 to-transparent"></div>

            {/* Top badge */}
            <div className="absolute top-6 left-6 bg-[var(--color-secondary)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ⭐ {t('title1')}
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{t('title1')}</h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-md">{t('desc1')}</p>
              {/* Mini stats row */}
              <div className="flex gap-4">
                {[
                  { val: '20+', label: 'Uzman' },
                  { val: '1000+', label: 'Aile' },
                  { val: '15+', label: 'Yıl' },
                ].map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/15">
                    <div className="text-white font-extrabold text-lg">{s.val}</div>
                    <div className="text-blue-200 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2 — MEB / Devlet */}
          <motion.div
            key={`bento-1-${pathname}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-400 bg-[var(--color-primary)] h-auto min-h-[280px]"
          >
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-secondary)] rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>

            <div className="relative z-10 h-full flex flex-col p-7">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-5 border border-white/20 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-[var(--color-secondary)]" />
              </div>
              <div className="mb-2">
                <span className="bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] text-xs font-bold px-2.5 py-1 rounded-full">MEB Onaylı</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3 flex-grow">{t('title2')}</h3>
              <p className="text-blue-200 text-sm leading-relaxed">{t('desc2')}</p>
            </div>
          </motion.div>

          {/* Card 3 — BEP */}
          <motion.div
            key={`bento-2-${pathname}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-400 bg-gradient-to-br from-emerald-50 to-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/15 h-auto min-h-[280px]"
          >
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[var(--color-secondary)] rounded-full opacity-10 blur-xl group-hover:opacity-25 transition-opacity"></div>

            <div className="relative z-10 h-full flex flex-col p-7">
              <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7 text-[var(--color-secondary)]" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                {[CheckCircle, CheckCircle, CheckCircle].map((Icon, i) => (
                  <Icon key={i} className="w-4 h-4 text-[var(--color-secondary)]" />
                ))}
                <span className="text-xs text-[var(--color-secondary)] font-semibold">Her Çocuğa Özel</span>
              </div>
              <h3 className="text-xl font-extrabold text-[var(--color-primary)] mb-3 flex-grow">{t('title3')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('desc3')}</p>
            </div>
          </motion.div>

          {/* Card 4 — Modern Sınıflar */}
          <motion.div
            key={`bento-3-${pathname}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-400 h-auto min-h-[340px] md:h-auto"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80"
                alt={t('title4')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:via-white/85"></div>
            </div>

            <div className="relative z-10 p-6 md:p-10 flex flex-col justify-center h-full max-w-lg">
              <div className="w-12 h-12 bg-[var(--color-primary)]/8 rounded-xl flex items-center justify-center mb-5">
                <Laptop className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-extrabold text-[var(--color-primary)] mb-3">{t('title4')}</h3>
              <p className="text-gray-700 leading-relaxed mb-6 font-medium md:font-normal">{t('desc4')}</p>
              <div className="flex flex-wrap gap-3">
                {['Teknolojik Altyapı', 'Güvenli Ortam', 'Duyusal Ekipman', 'Bireysel Alanlar'].map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-[var(--color-primary)]/8 text-[var(--color-primary)] text-xs font-bold px-3 py-1.5 rounded-full border border-[var(--color-primary)]/15">
                    <Users className="w-3 h-3 text-[var(--color-secondary)]" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
