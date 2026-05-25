"use client";
import { useTranslations } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const t = useTranslations('FAQ');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const items = [1, 2, 3, 4, 5].map(n => ({
    q: t(`q${n}` as any),
    a: t(`a${n}` as any),
  }));

  return (
    <section className="py-24 bg-white" id="sss">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-[var(--color-primary)]/8 text-[var(--color-primary)] text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            SSS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4">
            {t('sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('sectionSubtitle')}</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIdx === idx
                  ? 'border-[var(--color-secondary)]/40 bg-[var(--color-secondary)]/4 shadow-md'
                  : 'border-gray-100 bg-gray-50/60 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                aria-expanded={openIdx === idx}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    openIdx === idx ? 'bg-[var(--color-secondary)] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className={`font-semibold text-lg transition-colors ${
                    openIdx === idx ? 'text-[var(--color-primary)]' : 'text-gray-800'
                  }`}>
                    {item.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-[var(--color-secondary)]' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIdx === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-7 pb-6 pl-[5.25rem]">
                  <p className="text-gray-600 leading-relaxed text-base">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
