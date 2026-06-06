import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { BrainCircuit } from 'lucide-react';
import TestClient from '@/components/test/TestClient';
import type { Metadata } from 'next';

const BASE_URL = 'https://onceozelegitim.com';
type Props = { params: Promise<{ locale: string }> };

const testMeta: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Öğrenme Güçlüğü Testi | Önce Özel Eğitim',
    description: 'Disleksi, diskalkuli, disgrafi veya dispraksi belirtileri için kısa ön değerlendirme testimizi çözün.',
  },
  en: {
    title: 'Learning Difficulty Test | Önce Özel Eğitim',
    description: 'Take our quick preliminary assessment test for signs of dyslexia, dyscalculia, dysgraphia, or dyspraxia.',
  },
  de: {
    title: 'Lernschwäche-Test | Önce Özel Eğitim',
    description: 'Machen Sie unseren kurzen vorläufigen Bewertungstest auf Anzeichen von Legasthenie, Dyskalkulie, Dysgraphie oder Dyspraxie.',
  },
  ru: {
    title: 'Тест на трудности в обучении | Önce Özel Eğitim',
    description: 'Пройдите наш короткий тест предварительной оценки на наличие признаков дислексии, дискалькулии, дисграфии или диспраксии.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = testMeta[locale] ?? testMeta.tr;
  const path = '/test';
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
  };
}

export default async function TestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Test');

  const strings = {
    pageSubtitle: t('pageSubtitle'),
    questionPrefix: t('questionPrefix'),
    yes: t('yes'),
    no: t('no'),
    next: t('next'),
    finish: t('finish'),
    resultTitle: t('resultTitle'),
    resultDesc: t('resultDesc'),
    contactWhatsApp: t('contactWhatsApp'),
    contactPhone: t('contactPhone'),
    questions: [
      t('q1'), t('q2'), t('q3'), t('q4'), 
      t('q5'), t('q6'), t('q7'), t('q8'), 
      t('q9'), t('q10'), t('q11'), t('q12')
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-xl mb-6">
            <BrainCircuit className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight">
            {t('pageTitle')}
          </h1>
        </div>

        {/* Client Interactive Quiz */}
        <TestClient strings={strings} />
        
      </div>
    </div>
  );
}
