import { MetadataRoute } from 'next';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
