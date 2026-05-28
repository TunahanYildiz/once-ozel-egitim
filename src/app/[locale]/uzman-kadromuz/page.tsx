import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import StaffGrid from '@/components/staff/StaffGrid';

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

  const members = [1, 2, 3, 4].map((n, i) => ({
    name: t(`staff${n}Name` as any),
    role: t(`staff${n}Role` as any),
    expertise: t(`staff${n}Expertise` as any),
    photo: STAFF_PHOTOS[i],
    color: CARD_COLORS[i],
  }));

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            {t('headerBadge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaffGrid members={members} />
        </div>
      </section>

      {/* Team Values Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-14">
            <div className="text-5xl mb-6">🎓</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-4">
              {t('teamBannerTitle')}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              {t('teamBannerDesc')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
