import {setRequestLocale} from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import StatsStrip from '@/components/home/StatsStrip';
import BentoGrid from '@/components/home/BentoGrid';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import QuickContactForm from '@/components/home/QuickContactForm';
import { supabase } from '@/lib/supabase';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations('FAQ');

  // Fetch SSS (FAQ) from Supabase
  let faqs: { question: string; answer: string }[] = [];
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (data && !error) {
      faqs = data.map((item: any) => ({
        question: item[`question_${locale}`] || item.question_tr || '',
        answer: item[`answer_${locale}`] || item.answer_tr || '',
      }));
    }
  } catch (err) {
    console.error('Error fetching FAQs:', err);
  }

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.length > 0
      ? faqs.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          }
        }))
      : [1, 2, 3, 4, 5].map(n => ({
          "@type": "Question",
          "name": tFaq(`q${n}` as any),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": tFaq(`a${n}` as any),
          }
        }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Önce Özel Eğitim",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pendik",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "areaServed": [
      "Pendik", "Kartal", "Tuzla", "Maltepe", "Gebze", 
      "Kadıköy", "Ataşehir", "Üsküdar", "Ümraniye", 
      "Sultanbeyli", "Sancaktepe"
    ],
    "telephone": "+902160000000",
    "url": "https://onceozelegitim.com"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <StatsStrip />
      <BentoGrid />
      <Testimonials />
      <FAQ items={faqs} />
      <QuickContactForm />
    </>
  );
}
