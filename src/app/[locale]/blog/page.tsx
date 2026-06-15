import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const pageMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Blog | Önce Özel Eğitim — Özel Eğitim ve Terapi Blogu',
    description: 'Özel eğitim ve terapi alanında uzmanlarımızdan güncel bilgiler, ailelere pratik rehberler ve çocuk gelişimi ipuçları. Otizm, dil terapisi, DEHB ve daha fazlası.',
  },
  en: {
    title: 'Blog | Önce Özel Eğitim — Special Education & Therapy Blog',
    description: 'Up-to-date information from our specialists on special education and therapy, practical guides for families, and child development tips. Autism, speech therapy, ADHD and more.',
  },
  de: {
    title: 'Blog | Önce Özel Eğitim — Sonderpädagogik und Therapie-Blog',
    description: 'Aktuelle Informationen von unseren Experten zu Sonderpädagogik und Therapie, praktische Leitfäden für Familien und Tipps zur Kindesentwicklung.',
  },
  ru: {
    title: 'Блог | Önce Özel Eğitim — Блог о специальном образовании и терапии',
    description: 'Актуальная информация от наших специалистов по специальному образованию и терапии, практические руководства для семей и советы по развитию ребёнка.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] ?? pageMeta.tr;
  const path = '/blog';
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




interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  cover_url: string | null;
  created_at: string;
}

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Çocuklarda Dil Gelişimi ve Konuşma Terapisi',
    slug: 'cocuklarda-dil-gelisimi',
    summary: '0-5 yaş arasındaki dil gelişimi aşamaları, normalden sapmaları erken fark etme yöntemleri ve konuşma terapisinin çocuğunuza nasıl katkı sağlayabileceğine dair kapsamlı bir rehber.',
    cover_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-05-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Otizmde Erken Tanının Hayat Kurtaran Önemi',
    slug: 'otizmde-erken-tani',
    summary: 'Erken müdahalenin otizm spektrum bozukluğunda ne denli kritik olduğunu, ebeveynlerin dikkat etmesi gereken ilk belirtileri ve doğru kaynaklara nasıl ulaşılacağını bu yazıda ele aldık.',
    cover_url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-04-15T00:00:00Z',
  },
  {
    id: '3',
    title: 'Duyu Bütünleme Nedir? Belirtileri ve Tedavisi',
    slug: 'duyu-butunleme-nedir',
    summary: 'Duyusal işleme güçlüğü yaşayan çocuklarda gözlemlenen belirtiler, günlük yaşama etkileri ve duyu bütünleme terapisinin bu süreçteki rolü hakkında bilmeniz gerekenler.',
    cover_url: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=800&q=80',
    created_at: '2026-03-20T00:00:00Z',
  },
];

async function getPosts(locale: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return MOCK_POSTS;
    
    return data.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      cover_url: post.cover_url,
      created_at: post.created_at,
      title: post[`title_${locale}`] || post.title_tr || post.title || '',
      summary: post[`summary_${locale}`] || post.summary_tr || post.summary || '',
    })) as BlogPost[];
  } catch {
    return MOCK_POSTS;
  }
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'de' ? 'de-DE' : locale === 'ru' ? 'ru-RU' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Blog');
  const posts = await getPosts(locale);

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
                "item": `https://onceozelegitim.com/${locale}/blog`
              }
            ]
          })
        }}
      />
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-10 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-0 leading-tight">
            {t('pageTitle')}
          </h1>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">{t('noPostsYet')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <Link href={`/blog/${post.slug}` as any} className="flex flex-col flex-grow">
                    {/* Cover Image */}
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                      {post.cover_url ? (
                        <Image
                          src={post.cover_url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[var(--color-secondary)]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col flex-grow">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.created_at, locale)} {t('publishedOn')}</span>
                      </div>

                      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-3 leading-snug group-hover:text-[var(--color-secondary)] transition-colors">
                        {post.title}
                      </h2>

                      {post.summary && (
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">{post.summary}</p>
                      )}

                      <div className="mt-auto">
                        <span
                          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors group/btn"
                        >
                          {t('readMore')}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
