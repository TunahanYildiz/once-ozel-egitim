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
