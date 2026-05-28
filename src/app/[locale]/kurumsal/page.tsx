import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { HandHeart, Heart, FlaskConical, Baby } from 'lucide-react';

export default async function KurumsalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Kurumsal');

  const values = [
    {
      icon: <HandHeart className="w-8 h-8 text-[var(--color-secondary)]" />,
      title: t('val1Title'),
      desc: t('val1Desc'),
      bg: 'bg-[var(--color-secondary)]/10',
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: t('val2Title'),
      desc: t('val2Desc'),
      bg: 'bg-rose-50',
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-[var(--color-primary)]" />,
      title: t('val3Title'),
      desc: t('val3Desc'),
      bg: 'bg-[var(--color-primary)]/5',
    },
    {
      icon: <Baby className="w-8 h-8 text-amber-500" />,
      title: t('val4Title'),
      desc: t('val4Desc'),
      bg: 'bg-amber-50',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Önce Özel Eğitim
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Story + Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
                {t('storyTitle')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {t('storyText')}
              </p>
              {/* Mission + Vision */}
              <div className="space-y-6">
                <div className="flex gap-5 p-6 bg-[var(--color-primary)]/4 rounded-2xl border border-[var(--color-primary)]/10">
                  <div className="w-1 bg-[var(--color-primary)] rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-[var(--color-primary)] text-lg mb-2">{t('missionTitle')}</h3>
                    <p className="text-gray-600 leading-relaxed">{t('missionText')}</p>
                  </div>
                </div>
                <div className="flex gap-5 p-6 bg-[var(--color-secondary)]/5 rounded-2xl border border-[var(--color-secondary)]/15">
                  <div className="w-1 bg-[var(--color-secondary)] rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-[var(--color-secondary)] text-lg mb-2">{t('visionTitle')}</h3>
                    <p className="text-gray-600 leading-relaxed">{t('visionText')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
                  alt="Önce Özel Eğitim merkezi"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/30 to-transparent"></div>
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 text-center">
                <div className="text-3xl font-extrabold text-[var(--color-secondary)]">1000+</div>
                <div className="text-sm text-gray-500 font-semibold">{t('statHappyFamily')}</div>
              </div>
              <div className="absolute -top-4 -left-4 bg-[var(--color-primary)] rounded-2xl shadow-xl p-5 border text-center">
                <div className="text-3xl font-extrabold text-white">15+</div>
                <div className="text-xs text-blue-200 font-semibold">{t('statYearsExp')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]">{t('valuesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 ${val.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{val.title}</h3>
                <p className="text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
