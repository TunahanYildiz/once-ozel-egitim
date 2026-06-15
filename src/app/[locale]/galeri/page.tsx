import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Camera, Sparkles } from 'lucide-react';
import GalleryClient from '@/components/gallery/GalleryClient';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Galeri | Önce Özel Eğitim — Sınıflarımız, Terapi Odaları ve Etkinlikler',
    description: 'Önce Özel Eğitim merkezinden fotoğraflar: Modern terapi odalarımız, donanımlı sınıflarımız ve etkinliklerimizden kareler. Pendik, İstanbul.',
  },
  en: {
    title: 'Gallery | Önce Özel Eğitim — Our Classrooms, Therapy Rooms & Events',
    description: 'Photos from Önce Özel Eğitim center: our modern therapy rooms, equipped classrooms and event highlights in Pendik, Istanbul.',
  },
  de: {
    title: 'Galerie | Önce Özel Eğitim — Unsere Klassenräume, Therapieräume und Aktivitäten',
    description: 'Fotos aus dem Önce Özel Eğitim Zentrum: unsere modernen Therapieräume, ausgestatteten Klassenräume und Veranstaltungsmomente in Pendik, Istanbul.',
  },
  ru: {
    title: 'Галерея | Önce Özel Eğitim — Наши классы, кабинеты терапии и мероприятия',
    description: 'Фотографии из центра Önce Özel Eğitim: современные кабинеты терапии, оснащённые классы и мероприятия в Пендике, Стамбул.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.tr;
  const path = '/galeri';
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




const MOCK_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80', category: 'terapi' },
  { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', category: 'egitim' },
  { src: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=600&q=80', category: 'mekan' },
  { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80', category: 'egitim' },
  { src: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=800&q=80', category: 'terapi' },
  { src: 'https://images.unsplash.com/photo-1560099098-b55af58bb4ee?auto=format&fit=crop&w=600&q=80', category: 'etkinlik' },
  { src: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=800&q=80', category: 'egitim' },
  { src: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80', category: 'terapi' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80', category: 'etkinlik' },
];

async function getGalleryImages(): Promise<{ src: string; category: string }[]> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('image_url, category')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_IMAGES;
    }

    return data.map((item: any) => ({
      src: item.image_url,
      category: item.category,
    }));
  } catch {
    return MOCK_IMAGES;
  }
}

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Galeri');
  const images = await getGalleryImages();

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
                "item": `https://onceozelegitim.com/${locale}/galeri`
              }
            ]
          })
        }}
      />
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/90 to-[var(--color-secondary)] pt-16 pb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">{t('badge')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {t('pageTitle')}
          </h1>


          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-10">
            {[
              { num: `${images.length}+`, label: t('statPhotos') },
              { num: '4', label: t('statCategories') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-white">{stat.num}</div>
                <div className="text-white/60 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 50C480 40 240 10 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Gallery Client Component */}
      <GalleryClient initialImages={images} />

    </>
  );
}
