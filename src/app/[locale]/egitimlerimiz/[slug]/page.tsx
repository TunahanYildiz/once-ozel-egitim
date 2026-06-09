import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { PROGRAMS, getProgramBySlug } from '@/lib/programs';
import { getProgramContent } from '@/lib/programContentIndex';
import {
  ArrowLeft, ArrowRight, CheckCircle, Users, Settings, Sparkles,
  Phone, MessageCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';

// Generate static params for all programs x all locales
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['tr', 'en', 'de', 'ru']) {
    for (const program of PROGRAMS) {
      params.push({ locale, slug: program.slug });
    }
  }
  return params;
}

// Dynamic SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};

  const content = getProgramContent(slug, locale);
  if (!content) return {};

  const path = `/egitimlerimiz/${slug}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
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
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: 'Önce Özel Eğitim',
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: content.metaTitle }],
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'ru_RU',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const content = getProgramContent(slug, locale);
  if (!content) notFound();

  const t = await getTranslations('Egitimlerimiz');
  const tIletisim = await getTranslations('Iletisim');

  // Find related programs from same category (excluding self)
  const relatedPrograms = PROGRAMS
    .filter(p => p.categoryId === program.categoryId && p.slug !== slug)
    .slice(0, 3);

  // Breadcrumb + MedicalWebPage JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Ana Sayfa', 'item': BASE_URL },
      { '@type': 'ListItem', 'position': 2, 'name': t('pageTitle'), 'item': `${BASE_URL}/${locale}/egitimlerimiz` },
      { '@type': 'ListItem', 'position': 3, 'name': t(program.translationKey as any), 'item': `${BASE_URL}/${locale}/egitimlerimiz/${slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    'name': content.metaTitle,
    'description': content.metaDescription,
    'url': `${BASE_URL}/${locale}/egitimlerimiz/${slug}`,
    'specialty': t(program.translationKey as any),
    'provider': {
      '@type': 'MedicalBusiness',
      'name': 'Önce Özel Eğitim',
      'url': BASE_URL,
      'telephone': '+905535575515',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Kavakpınar Mah, Bulvar Cd. No:28A',
        'addressLocality': 'Pendik',
        'addressRegion': 'İstanbul',
        'addressCountry': 'TR',
      },
    },
  };

  const faqSchema = content.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': content.faq.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
    })),
  } : null;

  // Labels by locale
  const labels = {
    tr: { whoIsItFor: 'Kimler İçin?', howItWorks: 'Nasıl Çalışır?', benefits: 'Faydaları', faq: 'Sık Sorulan Sorular', related: 'Benzer Programlar', cta: 'Ücretsiz Değerlendirme Randevusu', ctaSub: 'Uzmanlarımız çocuğunuzun gelişim ihtiyaçlarını ücretsiz değerlendirir.', callNow: 'Hemen Arayın', whatsapp: 'WhatsApp', backToAll: 'Tüm Programlar', learnMore: 'Detaylı Bilgi' },
    en: { whoIsItFor: 'Who Is It For?', howItWorks: 'How Does It Work?', benefits: 'Benefits', faq: 'Frequently Asked Questions', related: 'Related Programs', cta: 'Free Assessment Appointment', ctaSub: 'Our experts evaluate your child\'s developmental needs for free.', callNow: 'Call Now', whatsapp: 'WhatsApp', backToAll: 'All Programs', learnMore: 'Learn More' },
    de: { whoIsItFor: 'Für wen?', howItWorks: 'Wie funktioniert es?', benefits: 'Vorteile', faq: 'Häufig gestellte Fragen', related: 'Ähnliche Programme', cta: 'Kostenloser Beurteilungstermin', ctaSub: 'Unsere Experten bewerten die Entwicklungsbedürfnisse Ihres Kindes kostenlos.', callNow: 'Jetzt anrufen', whatsapp: 'WhatsApp', backToAll: 'Alle Programme', learnMore: 'Mehr erfahren' },
    ru: { whoIsItFor: 'Для кого?', howItWorks: 'Как это работает?', benefits: 'Преимущества', faq: 'Часто задаваемые вопросы', related: 'Похожие программы', cta: 'Бесплатная консультация', ctaSub: 'Наши специалисты бесплатно оценят потребности развития вашего ребёнка.', callNow: 'Позвонить', whatsapp: 'WhatsApp', backToAll: 'Все программы', learnMore: 'Подробнее' },
  };
  const l = labels[locale as keyof typeof labels] || labels.tr;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/95 to-[var(--color-secondary)]/80 pt-12 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/egitimlerimiz"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {l.backToAll}
            </Link>
          </div>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold px-4 py-1.5 rounded-full tracking-wide uppercase">
              {t(program.categoryKey as any)}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
            {t(program.translationKey as any)}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
            {content.heroSubtitle}
          </p>

          {/* Quick CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-[var(--color-secondary)] text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              {l.callNow}
            </Link>
            <a
              href="https://wa.me/905535575515"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--color-primary)] transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              {l.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Main Content (2 cols wide) */}
            <div className="lg:col-span-2 space-y-12">

              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                {content.intro.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-5 text-[17px]">{para}</p>
                ))}
              </div>

              {/* Who Is It For? */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-3xl p-8 border border-blue-100/50">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-[var(--color-secondary)]" />
                  {l.whoIsItFor}
                </h2>
                <ul className="space-y-3">
                  {content.whoIsItFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-[var(--color-secondary)]" />
                  {l.howItWorks}
                </h2>
                <div className="space-y-4">
                  {content.howItWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 bg-[var(--color-secondary)] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-8 border border-emerald-100/50">
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  {l.benefits}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white/70 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {content.faq.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                    {l.faq}
                  </h2>
                  <div className="space-y-4">
                    {content.faq.map((item, i) => (
                      <details key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-100/70 transition-colors">
                          <span className="font-semibold text-[var(--color-primary)] pr-4">{item.q}</span>
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="text-gray-600 leading-relaxed">{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* CTA Card */}
              <div className="sticky top-28 space-y-6">
                <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/90 rounded-3xl p-8 text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-3">{l.cta}</h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">{l.ctaSub}</p>
                  <div className="space-y-3">
                    <Link
                      href="/iletisim"
                      className="flex items-center justify-center gap-2 w-full bg-[var(--color-secondary)] text-white font-bold py-3 px-6 rounded-xl hover:brightness-110 transition-all shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      {l.callNow}
                    </Link>
                    <a
                      href="https://wa.me/905535575515"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 text-white font-bold py-3 px-6 rounded-xl hover:bg-white/20 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {l.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Related Programs */}
                {relatedPrograms.length > 0 && (
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">{l.related}</h3>
                    <div className="space-y-3">
                      {relatedPrograms.map(rp => (
                        <Link
                          key={rp.slug}
                          href={`/egitimlerimiz/${rp.slug}` as any}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-[var(--color-secondary)]/30 hover:shadow-sm transition-all group"
                        >
                          <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">
                            {t(rp.translationKey as any)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-secondary)] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/90 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--color-secondary)] to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{l.cta}</h2>
              <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">{l.ctaSub}</p>
              <Link
                href="/iletisim"
                className="inline-block px-10 py-4 bg-[var(--color-secondary)] text-white font-bold text-lg rounded-full hover:bg-[var(--color-secondary-light)] transition-all shadow-lg shadow-[var(--color-secondary)]/30 hover:-translate-y-1"
              >
                {t('ctaBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
