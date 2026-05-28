import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Camera, Sparkles } from 'lucide-react';
import GalleryClient from '@/components/gallery/GalleryClient';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Cache page for 1 hour

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
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/90 to-[var(--color-secondary)] pt-28 pb-16">
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

          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>

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

      {/* Bottom Note */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/10 rounded-3xl border border-[var(--color-secondary)]/20 p-8 text-center">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-secondary)]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <Camera className="w-10 h-10 text-[var(--color-secondary)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2">{t('bottomTitle')}</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              📸 {t('bottomDesc')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
