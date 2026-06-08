import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/test'],
      },
    ],
    sitemap: 'https://onceozelegitim.com/sitemap.xml',
    host: 'https://onceozelegitim.com',
  };
}
