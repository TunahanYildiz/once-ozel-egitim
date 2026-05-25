import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600;

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

async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, summary, cover_url, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return MOCK_POSTS;
    return data as BlogPost[];
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
  const posts = await getPosts();

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-[var(--color-secondary)]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
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
                      <Link
                        href={`/blog/${post.slug}` as any}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors group/btn"
                      >
                        {t('readMore')}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
