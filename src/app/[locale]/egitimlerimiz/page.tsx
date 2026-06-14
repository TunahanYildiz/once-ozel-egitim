import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  MessageSquare, Brain, BookOpen, Zap, Scissors,
  BarChart2, Users, Activity, Focus, Gamepad2, HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { PROGRAMS } from '@/lib/programs';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Eğitimlerimiz | Önce Özel Eğitim — 28 Uzmanlaşmış Terapi ve Eğitim Programı',
    description: 'Dil-konuşma terapisi, otizm eğitimi, disleksi, ABA terapisi, duyu bütünleme, ergoterapi, DEHB ve daha fazlası. Pendik İstanbul\'da bilimsel temelli 28 özel eğitim programı.',
  },
  en: {
    title: 'Our Programs | Önce Özel Eğitim — 28 Specialized Therapy & Education Programs',
    description: 'Speech therapy, autism education, dyslexia, ABA therapy, sensory integration, occupational therapy, ADHD and more. 28 science-based special education programs in Pendik, Istanbul.',
  },
  de: {
    title: 'Unsere Programme | Önce Özel Eğitim — 28 Spezialisierte Therapieprogramme',
    description: 'Sprachtherapie, Autismus-Förderung, Legasthenie, ABA-Therapie, sensorische Integration, Ergotherapie, ADHS und mehr. 28 wissenschaftlich fundierte Förderprogramme in Pendik.',
  },
  ru: {
    title: 'Наши Программы | Önce Özel Eğitim — 28 Специализированных программ',
    description: 'Логопедия, обучение аутизму, дислексия, АВА-терапия, сенсорная интеграция, трудотерапия, СДВиГ и другое. 28 научно обоснованных программ в Пендике, Стамбул.',
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

const ICONS = [MessageSquare, Brain, BookOpen, Zap, Scissors, BarChart2, Users, Activity, Focus, Gamepad2, HeartHandshake];

const CATEGORY_DATA = [
  {
    id: 'cat1',
    color: 'from-blue-50 to-blue-100/50',
    iconColor: 'text-blue-500',
    titleKey: 'cat1Title',
    Icon: MessageSquare,
    keys: ['c1_p1', 'c1_p2', 'c1_p3', 'c1_p4', 'c1_p5'],
  },
  {
    id: 'cat2',
    color: 'from-amber-50 to-amber-100/50',
    iconColor: 'text-amber-500',
    titleKey: 'cat2Title',
    Icon: BookOpen,
    keys: ['c2_p1', 'c2_p2', 'c2_p3', 'c2_p4', 'c2_p5'],
  },
  {
    id: 'cat3',
    color: 'from-purple-50 to-purple-100/50',
    iconColor: 'text-purple-500',
    titleKey: 'cat3Title',
    Icon: Brain,
    keys: ['c3_p1', 'c3_p2', 'c3_p3', 'c3_p4', 'c3_p5'],
  },
  {
    id: 'cat4',
    color: 'from-emerald-50 to-emerald-100/50',
    iconColor: 'text-emerald-500',
    titleKey: 'cat4Title',
    Icon: Activity,
    keys: ['c4_p1', 'c4_p2', 'c4_p3', 'c4_p4', 'c4_p5', 'c4_p6'],
  },
  {
    id: 'cat5',
    color: 'from-rose-50 to-rose-100/50',
    iconColor: 'text-rose-500',
    titleKey: 'cat5Title',
    Icon: HeartHandshake,
    keys: ['c5_p1', 'c5_p2', 'c5_p3', 'c5_p4', 'c5_p5', 'c5_p6', 'c5_p7'],
  },
];

export default async function EgitimlerimizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Egitimlerimiz');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://onceozelegitim.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": t('pageTitle'),
                "item": `https://onceozelegitim.com/${locale}/egitimlerimiz`
              }
            ]
          })
        }}
      />
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-16 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            {t('headerBadge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-6 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {CATEGORY_DATA.map((cat, catIndex) => (
            <div key={cat.id} className="mb-24 last:mb-12">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-gray-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.color} shadow-sm`}>
                  <cat.Icon className={`w-6 h-6 ${cat.iconColor}`} />
                </div>
                <h2 className="text-3xl font-extrabold text-[var(--color-primary)]">
                  {t(cat.titleKey as any)}
                </h2>
              </div>

              {/* Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.keys.map((progKey, idx) => {
                  // Pseudo-random icon selection
                  const ProgramIcon = ICONS[(catIndex * 5 + idx) % ICONS.length];
                  // Find matching slug for this program
                  const programData = PROGRAMS.find(p => p.translationKey === progKey);
                  const programHref = programData ? `/egitimlerimiz/${programData.slug}` : '/iletisim';
                  return (
                    <Link
                      href={programHref as any}
                      key={progKey}
                      className={`group relative bg-gradient-to-br ${cat.color} rounded-3xl p-8 border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden block`}
                    >
                      {/* Background number */}
                      <span className="absolute top-4 right-6 text-6xl font-black text-black/[0.03] select-none">
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      <div className="relative z-10">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <ProgramIcon className={`w-6 h-6 ${cat.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                          {t(progKey as any)}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {t(`${progKey}_desc` as any)}
                        </p>
                        <span
                          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors group/btn"
                        >
                          {t('ctaBtn')}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Bottom CTA banner */}
          <div className="mt-10 bg-[var(--color-primary)] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-secondary)] to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('ctaBannerTitle')}
              </h2>
              <p className="text-blue-200 mb-8 text-xl max-w-2xl mx-auto">
                {t('ctaBannerDesc')}
              </p>
              <a
                href="https://b2c.beeasist.com/c/3lBkwZOb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-[var(--color-secondary)] text-white font-bold text-lg rounded-full hover:bg-[var(--color-secondary-light)] transition-all shadow-lg shadow-[var(--color-secondary)]/30 hover:-translate-y-1"
              >
                {t('ctaBtn')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
