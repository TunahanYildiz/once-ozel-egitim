import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { PROGRAMS } from '@/lib/programs';

const BASE_URL = 'https://onceozelegitim.com';
const LOCALES = ['tr', 'en', 'de', 'ru'];

const PAGES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/kurumsal', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/egitimlerimiz', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/hizmetlerimiz', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/uzman-kadromuz', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/galeri', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/iletisim', priority: 0.8, changeFrequency: 'monthly' as const },
];

// Mock blog slugs as fallback
const MOCK_BLOG_SLUGS = [
  { slug: 'cocuklarda-dil-gelisimi', updated_at: '2026-05-01T00:00:00Z' },
  { slug: 'otizmde-erken-tani', updated_at: '2026-04-15T00:00:00Z' },
  { slug: 'duyu-butunleme-nedir', updated_at: '2026-03-20T00:00:00Z' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages with hreflang alternates
  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date('2026-06-09'),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  // Dynamic blog posts
  let blogSlugs = MOCK_BLOG_SLUGS;
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data && !error && data.length > 0) {
      blogSlugs = data;
    }
  } catch {
    // Use mock data
  }

  for (const post of blogSlugs) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || '2026-06-01'),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }
  // Individual education program pages
  for (const program of PROGRAMS) {
    for (const locale of LOCALES) {
      const path = `/egitimlerimiz/${program.slug}`;
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date('2026-06-10'),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
