import {setRequestLocale} from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import BentoGrid from '@/components/home/BentoGrid';
import TestBanner from '@/components/home/TestBanner';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';

type Props = { params: Promise<{ locale: string }> };

const homeMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Önce Özel Eğitim | Pendik\'te Özel Eğitim & Terapi Merkezi',
    description: 'Pendik, İstanbul\'da özel eğitim ve terapi merkezi. Otizm, disleksi, dil terapisi, ABA ve duyu bütünleme hizmetleri. Ücretsiz değerlendirme için arayın.',
  },
  en: {
    title: 'Önce Özel Eğitim | Special Education & Therapy Center in Pendik, Istanbul',
    description: 'Special education and therapy services in Pendik, Istanbul. Autism, speech therapy, dyslexia, ABA, sensory integration and more. Free initial assessment available.',
  },
  de: {
    title: 'Önce Özel Eğitim | Förderzentrum in Pendik, Istanbul',
    description: 'Sonderpädagogische und therapeutische Dienstleistungen in Pendik, Istanbul. Autismus, Sprachtherapie, Legasthenie, ABA, sensorische Integration. Kostenlose Erstbeurteilung.',
  },
  ru: {
    title: 'Önce Özel Eğitim | Центр специального образования в Пендик, Стамбул',
    description: 'Услуги специального образования и терапии в Пендике, Стамбул. Аутизм, логопедия, дислексия, АВА-терапия, сенсорная интеграция. Бесплатная первичная оценка.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = homeMeta[locale] ?? homeMeta.tr;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        'tr': `${BASE_URL}/tr`,
        'en': `${BASE_URL}/en`,
        'de': `${BASE_URL}/de`,
        'ru': `${BASE_URL}/ru`,
        'x-default': `${BASE_URL}/tr`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
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


export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations('FAQ');

  // Fetch SSS (FAQ) from Supabase
  let faqs: { question: string; answer: string }[] = [];
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (data && !error) {
      faqs = data.map((item: any) => ({
        question: item[`question_${locale}`] || item.question_tr || '',
        answer: item[`answer_${locale}`] || item.answer_tr || '',
      }));
    }
  } catch (err) {
    console.error('Error fetching FAQs:', err);
  }

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.length > 0
      ? faqs.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          }
        }))
      : [1, 2, 3, 4, 5].map(n => ({
          "@type": "Question",
          "name": tFaq(`q${n}` as any),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": tFaq(`a${n}` as any),
          }
        }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Önce Özel Eğitim",
    "alternateName": "Önce Özel Eğitim ve Rehabilitasyon Merkezi",
    "description": "Pendik, İstanbul'da özel eğitim ve terapi merkezi. Otizm, dil-konuşma terapisi, disleksi, ABA terapisi, duyu bütünleme ve ergoterapi hizmetleri.",
    "image": "https://onceozelegitim.com/og-image.png",
    "logo": "https://onceozelegitim.com/logo.png",
    "url": "https://onceozelegitim.com",
    "telephone": "+905535575515",
    "email": "onceozelegitim@gmail.com",
    "priceRange": "₺₺",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kavakpınar Mah, Bulvar Cd. No:28A",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "postalCode": "34899",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.868194,
      "longitude": 29.280861
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "areaServed": [
      "Pendik", "Kartal", "Tuzla", "Maltepe", "Gebze",
      "Kadıköy", "Ataşehir", "Üsküdar", "Ümraniye",
      "Sultanbeyli", "Sancaktepe"
    ],
    "hasMap": "https://www.google.com/maps/search/?api=1&query=40.868194,29.280861",
    "sameAs": [
      "https://www.instagram.com/onceozelegitim/"
    ],
    "medicalSpecialty": [
      "Speech Therapy",
      "Occupational Therapy",
      "Physical Therapy",
      "Behavioral Therapy",
      "Special Education"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <StatsStrip />
      <BentoGrid />
      <TestBanner />
      <Testimonials />
      <FAQ items={faqs} />
    </>
  );
}
