import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Camera } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    alt: 'Uzman terapist çocukla çalışıyor',
  },
  {
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    alt: 'Çocuk öğrenme etkinliği',
  },
  {
    src: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=600&q=80',
    alt: 'Sınıf ortamı',
  },
  {
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
    alt: 'Eğitim materyalleri',
  },
  {
    src: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=800&q=80',
    alt: 'Oyun terapisi',
  },
  {
    src: 'https://images.unsplash.com/photo-1560099098-b55af58bb4ee?auto=format&fit=crop&w=600&q=80',
    alt: 'Sanat etkinliği',
  },
  {
    src: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=800&q=80',
    alt: 'Okuma ve öğrenme',
  },
  {
    src: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
    alt: 'Terapi seansı',
  },
];

export default async function GaleriPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Galeri');

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-[var(--color-secondary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {GALLERY_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className="relative break-inside-avoid rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Camera className="w-5 h-5" />
                    <span className="text-sm font-semibold">{img.alt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-gray-500 text-base">
              📸 Bu görseller yakında gerçek merkez fotoğraflarımızla güncellenecektir.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
