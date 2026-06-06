import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, BrainCircuit, Activity, BookOpen, PenTool } from 'lucide-react';

export default function TestBanner() {
  const t = useTranslations('Test');

  return (
    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              {t('bannerTitle')}
            </h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              {t('bannerDesc')}
            </p>
            
            {/* Badges for conditions */}
            <div className="flex flex-wrap gap-3 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20">
                <BookOpen className="w-4 h-4 text-amber-300" /> Disleksi
              </div>
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20">
                <Activity className="w-4 h-4 text-emerald-300" /> Diskalkuli
              </div>
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20">
                <PenTool className="w-4 h-4 text-blue-300" /> Disgrafi
              </div>
              <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/20">
                <BrainCircuit className="w-4 h-4 text-purple-300" /> Dispraksi
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto text-center lg:text-right">
            <Link
              href="/test"
              className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-white text-[var(--color-primary)] font-bold text-lg rounded-full hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 group"
            >
              <BrainCircuit className="w-5 h-5 text-[var(--color-secondary)] group-hover:rotate-12 transition-transform" />
              {t('bannerBtn')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
