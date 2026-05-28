import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Share2, Globe, Video } from 'lucide-react';
import ContactPageForm from '@/components/contact/ContactPageForm';

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Iletisim');

  return (
    <>
      {/* Page Header */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/6 to-white pt-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            Pendik, İstanbul
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-3 leading-tight">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('pageSubtitle')}</p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">{t('addressTitle')}</h2>
                <div className="space-y-5">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=40.868194,29.280861"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[var(--color-secondary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                      <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{t('addressTitle')}</div>
                      <p className="text-gray-800 font-semibold leading-relaxed">{t('address')}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${t('phone').replace(/\s/g, '')}`}
                    className="flex items-start gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[var(--color-secondary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                      <Phone className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{t('phoneTitle')}</div>
                      <p className="text-gray-800 font-semibold">{t('phone')}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${t('email')}`}
                    className="flex items-start gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[var(--color-secondary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                      <Mail className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">{t('emailTitle')}</div>
                      <p className="text-gray-800 font-semibold">{t('email')}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">{t('socialTitle')}</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-pink-500/30"
                  >
                    <Share2 className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-blue-600/30"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-red-600/30"
                  >
                    <Video className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="p-6 bg-[var(--color-primary)]/4 rounded-2xl border border-[var(--color-primary)]/10">
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4">{t('workingHoursTitle')}</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { days: t('weekdays'), hours: t('weekdayHours') },
                    { days: t('saturday'), hours: t('saturdayHours') },
                    { days: t('sunday'), hours: t('closed') },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-[var(--color-primary)]/10 last:border-0">
                      <span className="font-medium text-gray-700">{item.days}</span>
                      <span className={`font-bold ${item.hours === t('closed') ? 'text-red-500' : 'text-[var(--color-secondary)]'}`}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Google Maps */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[var(--color-primary)]">{t('mapTitle')}</h2>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=40.868194,29.280861"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  {t('openInMaps')}
                </a>
              </div>
              <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100" style={{ height: '480px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.8282928509427!2d29.27828607653655!3d40.86819402598379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDUyJzA1LjUiTiAyOcKwMTYnNTEuMSJF!5e0!3m2!1str!2str!4v1716666666666!5m2!1str!2str"
                  width="100%"
                  height="540px"
                  style={{ border: 0, marginTop: '-60px', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Önce Özel Eğitim Konumu"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              {t('formTitle')}
            </h2>
            <p className="text-gray-600 text-lg">{t('formSubtitle')}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
            <ContactPageForm />
          </div>
        </div>
      </section>
    </>
  );
}
