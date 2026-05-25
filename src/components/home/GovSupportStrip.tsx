"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { usePathname } from '@/i18n/routing';

export default function GovSupportStrip() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();

  return (
    <section className="bg-emerald-50 border-y border-emerald-100 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-emerald-200/50 to-transparent blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          key={`gov-${pathname}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"
        >
          <div className="bg-white p-4 rounded-full shadow-sm flex-shrink-0 text-[var(--color-secondary)]">
            <Info className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2">{t('govTitle')}</h3>
            <p className="text-gray-700 text-lg max-w-4xl leading-relaxed font-medium">
              {t('govText')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
