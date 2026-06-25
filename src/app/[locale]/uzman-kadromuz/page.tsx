import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import StaffGrid from '@/components/staff/StaffGrid';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Uzman Kadromuz | Önce Özel Eğitim — Alanında Uzman Terapist ve Eğitimciler',
    description: 'Önce Özel Eğitim\'in uzman ekibiyle tanışın. Dil-konuşma terapistleri, özel eğitim öğretmenleri, çocuk psikologları ve fizyoterapistlerden oluşan deneyimli kadromuz.',
  },
  en: {
    title: 'Our Specialists | Önce Özel Eğitim — Expert Therapists & Educators',
    description: 'Meet the expert team of Önce Özel Eğitim. Experienced speech therapists, special education teachers, child psychologists, and physiotherapists.',
  },
  de: {
    title: 'Unser Team | Önce Özel Eğitim — Experten in Therapie und Förderung',
    description: 'Lernen Sie das Expertenteam von Önce Özel Eğitim kennen. Erfahrene Sprachtherapeuten, Sonderpädagogen, Kinderpsychologen und Physiotherapeuten.',
  },
  ru: {
    title: 'Наши специалисты | Önce Özel Eğitim — Эксперты в терапии и образовании',
    description: 'Познакомьтесь с командой экспертов Önce Özel Eğitim. Опытные логопеды, педагоги специального образования, детские психологи и физиотерапевты.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.tr;
  const path = '/uzman-kadromuz';
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


const STAFF_PHOTOS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
];

const CARD_COLORS = [
  'from-blue-100 to-[var(--color-primary)]/20',
  'from-emerald-100 to-[var(--color-secondary)]/20',
  'from-rose-100 to-pink-200/50',
  'from-amber-100 to-orange-200/50',
];

export default async function UzmanKadromuzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('UzmanKadrosu');

  const members = [
    {
      name: t('staff1Name'),
      role: t('staff1Role'),
      expertise: '',
      photo: '/images/fizyoterapist.jpeg',
      color: CARD_COLORS[0],
    },
    {
      name: t('staff5Name'),
      role: t('staff5Role'),
      expertise: '',
      photo: '/images/uzman-fizyoterapist-ezgi.webp',
      color: CARD_COLORS[1],
    }
  ];

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
                "item": `https://onceozelegitim.com/${locale}/uzman-kadromuz`
              }
            ]
          })
        }}
      />
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-10 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-0 leading-tight">
            {t('pageTitle')}
          </h1>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaffGrid members={members} />
        </div>
      </section>
    </>
  );
}
