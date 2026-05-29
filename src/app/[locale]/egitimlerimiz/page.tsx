import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  MessageSquare, Brain, BookOpen, Zap, Scissors,
  BarChart2, Users, Activity, Focus, Gamepad2, HeartHandshake,
} from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Eğitimlerimiz | Önce Özel Eğitim — 11 Uzmanlaşmış Terapi ve Eğitim Programı',
    description: 'Dil-konuşma terapisi, otizm eğitimi, disleksi, ABA terapisi, duyu bütünleme, ergoterapi, DEHB ve daha fazlası. Pendik İstanbul\'da bilimsel temelli 11 özel eğitim programı.',
  },
  en: {
    title: 'Our Programs | Önce Özel Eğitim — 11 Specialized Therapy & Education Programs',
    description: 'Speech therapy, autism education, dyslexia, ABA therapy, sensory integration, occupational therapy, ADHD and more. 11 science-based special education programs in Pendik, Istanbul.',
  },
  de: {
    title: 'Unsere Programme | Önce Özel Eğitim — 11 Spezialisierte Therapieprogramme',
    description: 'Sprachtherapie, Autismus-Förderung, Legasthenie, ABA-Therapie, sensorische Integration, Ergotherapie, ADHS und mehr. 11 wissenschaftlich fundierte Förderprogramme in Pendik.',
  },
  ru: {
    title: 'Наши Программы | Önce Özel Eğitim — 11 Специализированных программ',
    description: 'Логопедия, обучение аутизму, дислексия, АВА-терапия, сенсорная интеграция, трудотерапия, СДВиГ и другое. 11 научно обоснованных программ в Пендике, Стамбул.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.tr;
  const path = '/egitimlerimiz';
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        'tr': `${BASE_URL}/tr${path}`,
        'en': `${BASE_URL}/en${path}`,
        'de': `${BASE_URL}/de${path}`,
        'ru': `${BASE_URL}/ru${path}`,
        'x-default': `${BASE_URL}/tr${path}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: 'Önce Özel Eğitim',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Önce Özel Eğitim' }],
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}


const PROGRAM_ICONS = [
  MessageSquare,
  Brain,
  BookOpen,
  Zap,
  Scissors,
  BarChart2,
  Users,
  Activity,
  Focus,
  Gamepad2,
  HeartHandshake,
];

const CARD_COLORS = [
  'from-blue-50 to-blue-100/50',
  'from-purple-50 to-purple-100/50',
  'from-emerald-50 to-emerald-100/50',
  'from-amber-50 to-amber-100/50',
  'from-rose-50 to-rose-100/50',
  'from-cyan-50 to-cyan-100/50',
  'from-indigo-50 to-indigo-100/50',
  'from-orange-50 to-orange-100/50',
  'from-teal-50 to-teal-100/50',
  'from-lime-50 to-lime-100/50',
  'from-pink-50 to-pink-100/50',
];

const ICON_COLORS = [
  'text-blue-500', 'text-purple-500', 'text-emerald-500', 'text-amber-500',
  'text-rose-500', 'text-cyan-500', 'text-indigo-500', 'text-orange-500',
  'text-teal-500', 'text-lime-600', 'text-pink-500',
];

export default async function EgitimlerimizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Egitimlerimiz');

  const programs = Array.from({ length: 11 }, (_, i) => ({
    title: t(`prog${i + 1}` as any),
    desc: t(`prog${i + 1}desc` as any),
    Icon: PROGRAM_ICONS[i],
    color: CARD_COLORS[i],
    iconColor: ICON_COLORS[i],
  }));

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t('headerBadge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${prog.color} rounded-3xl p-8 border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Background number */}
                <span className="absolute top-4 right-6 text-7xl font-black text-black/[0.04] select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <prog.Icon className={`w-7 h-7 ${prog.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{prog.desc}</p>
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors group/btn"
                  >
                    {t('ctaBtn')}
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA banner */}
          <div className="mt-16 bg-[var(--color-primary)] rounded-3xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-secondary)] to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('ctaBannerTitle')}
              </h2>
              <p className="text-blue-200 mb-8 text-lg">
                {t('ctaBannerDesc')}
              </p>
              <Link
                href="/iletisim"
                className="inline-block px-10 py-4 bg-[var(--color-secondary)] text-white font-bold text-lg rounded-full hover:bg-[var(--color-secondary-light)] transition-all shadow-lg shadow-[var(--color-secondary)]/30 hover:-translate-y-1"
              >
                {t('ctaBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
