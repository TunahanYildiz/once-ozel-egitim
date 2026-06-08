import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HizmetlerimizContent from '@/components/hizmetlerimiz/HizmetlerimizContent';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Hizmetlerimiz | Önce Özel Eğitim — Kamp Eğitimi & VIP Konaklama',
    description: 'Yoğun kamp eğitimi, yurt dışı ailelere özel konaklama ve VIP transfer hizmetleri. İstanbul Pendik\'te özel eğitim alanında kapsamlı destek.',
  },
  en: {
    title: 'Our Services | Önce Özel Eğitim — Camp Education & VIP Accommodation',
    description: 'Intensive camp education, accommodation and VIP transfer services for international families. Comprehensive support in special education in Istanbul.',
  },
  de: {
    title: 'Unsere Leistungen | Önce Özel Eğitim — Camp-Ausbildung & VIP-Unterkunft',
    description: 'Intensive Lagerausbildung, Unterkunft und VIP-Transfer für internationale Familien. Umfassende Unterstützung in der Sonderpädagogik in Istanbul.',
  },
  ru: {
    title: 'Наши Услуги | Önce Özel Eğitim — Лагерное Обучение & VIP Проживание',
    description: 'Интенсивное лагерное обучение, проживание и VIP-трансфер для международных семей. Всесторонняя поддержка в специальном образовании в Стамбуле.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.tr;
  const path = '/hizmetlerimiz';
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

export default async function HizmetlerimizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Hizmetlerimiz');

  const strings = {
    pageTitle: t('pageTitle'),
    pageSubtitle: t('pageSubtitle'),
    pageSlogan: t('pageSlogan'),
    section1Badge: t('section1Badge'),
    section1Title: t('section1Title'),
    section1Subtitle: t('section1Subtitle'),
    section1Para1: t('section1Para1'),
    section1Para2: t('section1Para2'),
    section1Para3: t('section1Para3'),
    section1BranchesLabel: t('section1BranchesLabel'),
    branches: [
      t('branch1'), t('branch2'), t('branch3'), t('branch4'),
      t('branch5'), t('branch6'), t('branch7'), t('branch8'),
    ],
    section2Badge: t('section2Badge'),
    section2Title: t('section2Title'),
    section2TitleSpan: t('section2TitleSpan'),
    section2Step1Title: t('section2Step1Title'),
    section2Step1Desc: t('section2Step1Desc'),
    section2Step2Title: t('section2Step2Title'),
    section2Step2Desc: t('section2Step2Desc'),
    section2Step3Title: t('section2Step3Title'),
    section2Step3Desc: t('section2Step3Desc'),
    section2Para1: t('section2Para1'),
    section2Para2: t('section2Para2'),
    section3Badge: t('section3Badge'),
    section3Title: t('section3Title'),
    section3Desc: t('section3Desc'),
    section3Item1: t('section3Item1'),
    section3Item2: t('section3Item2'),
    section3Item3: t('section3Item3'),
    section3Item4: t('section3Item4'),
    periods: [t('period1'), t('period3'), t('period6'), t('period9')],
  };

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
                "item": `https://onceozelegitim.com/${locale}/hizmetlerimiz`
              }
            ]
          })
        }}
      />
      <HizmetlerimizContent strings={strings} />
    </>
  );
}
