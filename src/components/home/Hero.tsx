"use client";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background)] to-gray-50 pt-20 pb-32 min-h-[85vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1920&q=80"
          alt="Çocuk eğitim"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50"></div>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-[500px] bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-primary)]/5 blur-3xl -z-10 rounded-full opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            key={`hero-${pathname}`}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-primary)] tracking-tight mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-xl leading-relaxed">
              {t('heroSubtitle')}
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              <a 
                href="https://b2c.beeasist.com/c/3lBkwZOb" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-bold text-lg hover:bg-[var(--color-secondary-light)] transition-all shadow-lg shadow-[var(--color-secondary)]/30 hover:-translate-y-1 text-center"
              >
                {t('heroBtn1')}
              </a>
              <Link 
                href="/egitimlerimiz" 
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-[var(--color-primary)] border-2 border-[var(--color-primary)] rounded-full font-bold text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-md hover:-translate-y-1 text-center"
              >
                {t('heroBtn2')}
              </Link>
            </div>
          </motion.div>

          {/* Right: Feature image (visible on lg+) */}
          <motion.div
            key={`hero-img-${pathname}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pendik-ozel-egitim-merkezi-dis-cekim.webp"
                alt="Önce Özel Eğitim Merkezi Binası"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent"></div>
            </div>
            {/* Decorative floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="text-3xl font-extrabold text-[var(--color-secondary)]">15+</div>
              <div className="text-sm text-gray-600 font-semibold">{t('stats3')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
