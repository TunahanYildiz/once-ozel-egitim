import { MetadataRoute } from 'next';

export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/test', '/admin', '/*/admin'],
      },
    ],
    sitemap: 'https://onceozelegitim.com/sitemap.xml',
    host: 'https://onceozelegitim.com',
  };
}
