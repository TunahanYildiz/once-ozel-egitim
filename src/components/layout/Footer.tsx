import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MapPin, Phone, Mail } from 'lucide-react';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Navbar');

  return (
    <footer className="bg-[var(--color-primary)] text-white pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* About Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-2">{t('about')}</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              {t('aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-2">{t('quickLinks')}</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <li><Link href="/kurumsal" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('corporate')}</Link></li>
              <li><Link href="/egitimlerimiz" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('education')}</Link></li>
              <li><Link href="/hizmetlerimiz" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('services')}</Link></li>
              <li><Link href="/uzman-kadromuz" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('staff')}</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('blog')}</Link></li>
              <li><Link href="/galeri" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('galeri')}</Link></li>
              <li className="col-span-2 md:col-span-1"><Link href="/iletisim" className="text-gray-300 hover:text-white transition-colors text-sm">{tNav('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-2">{t('contact')}</h3>
            <ul className="space-y-2.5">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=40.868194,29.280861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('address')}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                <a
                  href={`tel:${t('phone').replace(/[^+\d]/g, '')}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
                <a
                  href={`mailto:${t('email')}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
