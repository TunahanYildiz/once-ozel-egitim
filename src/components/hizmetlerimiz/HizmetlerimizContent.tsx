"use client";

import { useEffect } from 'react';
import {
  GraduationCap,
  Brain,
  Activity,
  MessageCircle,
  Gamepad2,
  BarChart2,
  Waves,
  HeartHandshake,
  Home,
  Car,
  Plane,
} from 'lucide-react';

const BRANCH_ICONS = [
  GraduationCap,
  Activity,
  Brain,
  MessageCircle,
  Gamepad2,
  BarChart2,
  Waves,
  HeartHandshake,
];

const BRANCH_COLORS = [
  'from-blue-500 to-blue-600',
  'from-emerald-500 to-emerald-600',
  'from-violet-500 to-violet-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
  'from-cyan-500 to-cyan-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
];

interface Strings {
  pageTitle: string;
  pageSubtitle: string;
  pageSlogan: string;
  section1Badge: string;
  section1Title: string;
  section1Subtitle: string;
  section1Para1: string;
  section1Para2: string;
  section1Para3: string;
  section1BranchesLabel: string;
  branches: string[];
  section2Badge: string;
  section2Title: string;
  section2TitleSpan: string;
  section2Step1Title: string;
  section2Step1Desc: string;
  section2Step2Title: string;
  section2Step2Desc: string;
  section2Step3Title: string;
  section2Step3Desc: string;
  section2Para1: string;
  section2Para2: string;
  section3Badge: string;
  section3Title: string;
  section3Item1: string;
  section3Item2: string;
  section3Item3: string;
  section3Item4: string;
  periods: string[];
}

export default function HizmetlerimizContent({ strings: s }: { strings: Strings }) {
  // Fade-in on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in-section');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-in-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gallery-card { overflow: hidden; border-radius: 16px; position: relative; cursor: pointer; }
        .gallery-card img { transition: transform 0.5s ease; width: 100%; height: 100%; object-fit: cover; display: block; }
        .gallery-card:hover img { transform: scale(1.06); }
        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 60%);
          opacity: 0; transition: opacity .35s;
          display: flex; align-items: flex-end; padding: 16px;
        }
        .gallery-card:hover .gallery-overlay { opacity: 1; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <section className="relative bg-gradient-to-b from-[var(--color-primary)]/8 to-white pt-14 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--color-secondary)]/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-5 leading-tight">
            {s.pageTitle}
          </h1>
          <p className="text-lg font-semibold text-[var(--color-secondary)] mb-3">
            {s.pageSlogan}
          </p>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {s.pageSubtitle}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 1 — KAMP EĞİTİMİ
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {s.section1Badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4 leading-tight">
              {s.section1Title}
              <span className="block text-xl md:text-2xl font-semibold text-gray-400 mt-2">
                {s.section1Subtitle}
              </span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-12">
              {/* Left: Text */}
              <div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {s.section1Para1}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {s.section1Para2}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {s.section1Para3}
                </p>
                {/* Period badges */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {s.periods.map((period, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-[var(--color-primary)] text-white font-bold rounded-full text-sm shadow-md"
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Branches grid */}
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                  {s.section1BranchesLabel}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {s.branches.map((label, i) => {
                    const Icon = BRANCH_ICONS[i] ?? GraduationCap;
                    const color = BRANCH_COLORS[i] ?? 'from-blue-500 to-blue-600';
                    return (
                      <div
                        key={i}
                        className="group flex flex-col items-center gap-3 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
                      >
                        <div className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-[var(--color-primary)] leading-snug">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — KONAKLAMA & TRANSFER
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {s.section2Badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4 leading-tight">
              {s.section2Title}
              <br className="hidden md:block" />
              <span className="text-[var(--color-secondary)]">{s.section2TitleSpan}</span>
            </h2>

            {/* Route infographic */}
            <div className="mt-10 mb-14">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 relative">
                {/* Connecting line (desktop) */}
                <div className="absolute top-10 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-0.5 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] hidden sm:block" />
                {[
                  { icon: Plane, step: '01', title: s.section2Step1Title, desc: s.section2Step1Desc },
                  { icon: Home,  step: '02', title: s.section2Step2Title, desc: s.section2Step2Desc },
                  { icon: Car,   step: '03', title: s.section2Step3Title, desc: s.section2Step3Desc },
                ].map(({ icon: Icon, step, title, desc }) => (
                  <div key={step} className="flex flex-col items-center text-center px-6 relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[var(--color-secondary)]/30 flex items-center justify-center shadow-md mb-4 relative">
                      <Icon className="w-9 h-9 text-[var(--color-secondary)]" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-secondary)] text-white text-xs font-black rounded-full flex items-center justify-center">
                        {step}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--color-primary)] mb-2 leading-snug">{title}</h3>
                    <p className="text-sm text-gray-500">{desc}</p>
                    <div className="sm:hidden text-2xl text-[var(--color-secondary)] mt-4 mb-2">↓</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left: Text */}
              <div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {s.section2Para1}
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {s.section2Para2}
                </p>
              </div>

              {/* Right: Gallery grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80', alt: 'Modern apart konaklama' },
                  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80', alt: 'Oturma odası' },
                  { src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80', alt: 'Konforlu yatak odası' },
                  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80', alt: 'Mutfak' },
                ].map(({ src, alt }, i) => (
                  <div key={i} className="gallery-card" style={{ height: '180px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={alt} loading="lazy" />
                    <div className="gallery-overlay">
                      <span className="text-white text-xs font-semibold">{alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — SAĞLIKLI BESLENME
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {s.section3Badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-10 leading-tight max-w-2xl">
              {s.section3Title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[s.section3Item1, s.section3Item2, s.section3Item3, s.section3Item4].map((item, i) => {
                // Split emoji from text
                const emojiMatch = item.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)\s*(.*)/u);
                const emoji = emojiMatch ? emojiMatch[1] : '✨';
                const text = emojiMatch ? emojiMatch[2] : item;

                return (
                  <div key={i} className="bg-green-50/50 rounded-3xl p-6 border border-green-100 hover:border-green-300 transition-colors shadow-sm hover:shadow-md group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {emoji}
                    </div>
                    <p className="text-gray-700 font-semibold leading-relaxed">
                      {text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
