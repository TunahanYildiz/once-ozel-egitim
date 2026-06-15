import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowLeft, BookOpen, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { MOCK_BLOGS_DETAIL, BlogPostDetail } from '@/lib/mockBlogs';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';





async function getPostFromSupabase(slug: string, locale: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) return null;
    return {
      id: data.id,
      slug: data.slug,
      cover_url: data.cover_url,
      created_at: data.created_at,
      title: data[`title_${locale}`] || data.title_tr || '',
      summary: data[`summary_${locale}`] || data.summary_tr || '',
      content: data[`content_${locale}`] || data.content_tr || '',
    };
  } catch {
    return null;
  }
}

// SEO: Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  // Try Supabase first, then mock data
  let title = 'Blog | Önce Özel Eğitim';
  let description = 'Özel eğitim ve terapi alanında uzman içerikler.';
  let imageUrl = `${BASE_URL}/og-image.png`;

  const dbPost = await getPostFromSupabase(slug, locale);
  if (dbPost) {
    title = dbPost.title;
    description = dbPost.summary || description;
    imageUrl = dbPost.cover_url || imageUrl;
  } else {
    const mockPostGroup = MOCK_BLOGS_DETAIL[slug];
    if (mockPostGroup) {
      const mockPost = mockPostGroup[locale] || mockPostGroup['tr'];
      if (mockPost) {
        title = mockPost.title;
        description = mockPost.summary || description;
        imageUrl = mockPost.cover_url || imageUrl;
      }
    }
  }

  // Truncate description to 160 chars
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  const fullTitle = `${title} | Önce Özel Eğitim`;
  const path = `/blog/${slug}`;

  return {
    title: fullTitle,
    description,
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
      title: fullTitle,
      description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: 'Önce Özel Eğitim',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'ru_RU',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(
    locale === 'tr' ? 'tr-TR' : locale === 'de' ? 'de-DE' : locale === 'ru' ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

// Locale-aware CTA texts
const ctaTexts: Record<string, { heading: string; paragraph: string }> = {
  tr: {
    heading: 'Çocuğunuzun Gelişimi İçin Danışın',
    paragraph: 'Alanında uzman eğitmenlerimiz ve psikologlarımızla çocuğunuzun gelişim ihtiyaçlarını ücretsiz değerlendirelim. Sorularınız için bizimle iletişime geçebilirsiniz.',
  },
  en: {
    heading: "Consult for Your Child's Development",
    paragraph: "Let us evaluate your child's developmental needs free of charge with our expert instructors and psychologists. You can contact us for any questions.",
  },
  de: {
    heading: 'Beratung für die Entwicklung Ihres Kindes',
    paragraph: 'Lassen Sie uns die Entwicklungsbedürfnisse Ihres Kindes mit unseren Fachkräften kostenlos bewerten. Kontaktieren Sie uns gerne bei Fragen.',
  },
  ru: {
    heading: 'Проконсультируйтесь о развитии вашего ребенка',
    paragraph: 'Позвольте нашим специалистам бесплатно оценить потребности развития вашего ребенка. Свяжитесь с нами по любым вопросам.',
  },
};

export default async function BlogPostDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Blog');
  const tContact = await getTranslations('Iletisim');

  // 1. Try to fetch from Supabase
  let post: BlogPostDetail | null = null;
  const dbPost = await getPostFromSupabase(slug, locale);

  if (dbPost) {
    // Convert DB structure to BlogPostDetail
    post = {
      id: dbPost.id,
      title: dbPost.title,
      slug: dbPost.slug,
      summary: dbPost.summary || '',
      cover_url: dbPost.cover_url || 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&w=1200&q=80',
      created_at: dbPost.created_at,
      sections: [],
      content_html: dbPost.content
    };
  } else {
    // 2. Fallback to Local Mock Data
    const mockPostGroup = MOCK_BLOGS_DETAIL[slug];
    if (mockPostGroup) {
      // Find translated version or fallback to default 'tr'
      post = mockPostGroup[locale] || mockPostGroup['tr'];
    }
  }

  // If no post exists in DB or mock, return 404
  if (!post) {
    notFound();
  }

  // BlogPosting JSON-LD Schema for SEO
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.summary,
    'image': post.cover_url,
    'datePublished': post.created_at,
    'author': {
      '@type': 'Organization',
      'name': 'Önce Özel Eğitim',
      'url': 'https://onceozelegitim.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Önce Özel Eğitim',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://onceozelegitim.com/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}/blog/${slug}`,
    },
  };

  const cta = ctaTexts[locale] || ctaTexts.tr;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://onceozelegitim.com/${locale}/blog/${slug}`
              }
            ]
          })
        }}
      />
      <article className="min-h-screen bg-slate-50/50 pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[var(--color-primary)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('backToBlog')}
            </Link>
          </div>

          {/* Post Metadata Header */}
          <header className="mb-10 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                {formatDate(post.created_at, locale)}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                <User className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                Önce Özel Eğitim
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
              {post.summary}
            </p>
          </header>

          {/* Cover Image */}
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-12 bg-gray-100">
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Post Content */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-12">
            {post.content_html ? (
              <div 
                className="space-y-6 text-gray-700 leading-relaxed text-lg [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-[var(--color-primary)] [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[var(--color-primary)] [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[var(--color-primary)] [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>strong]:font-bold [&>b]:font-bold [&>em]:italic"
                dangerouslySetInnerHTML={{ __html: post.content_html }} 
              />
            ) : (
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                {post.sections.map((section, idx) => {
                  if (section.type === 'heading' && section.text) {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)] pt-4 pb-2 border-b border-gray-100"
                      >
                        {section.text}
                      </h2>
                    );
                  }
                  if (section.type === 'list' && section.items) {
                    return (
                      <ul key={idx} className="list-disc pl-6 space-y-3 my-4 text-gray-600">
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (section.type === 'paragraph' && section.text) {
                    return (
                      <p key={idx} className="text-gray-600">
                        {section.text}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          {/* Expert Author CTA */}
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)]/90 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/20 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-[var(--color-secondary)]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {cta.heading}
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                {cta.paragraph}
              </p>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center bg-[var(--color-secondary)] text-white hover:bg-white hover:text-[var(--color-primary)] font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {tContact('submitBtn')}
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
