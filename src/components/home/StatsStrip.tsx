"use client";
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { Users, GraduationCap, Calendar, Heart } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from '@/i18n/routing';

function CountUp({ to, duration = 2 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeOut * to));
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };
      animationFrame = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationFrame);
    }
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsStrip() {
  const t = useTranslations('StatsStrip');
  const pathname = usePathname();

  const stats = [
    { label: t('statsText1'), num: 1000, suffix: "+", icon: <Users className="w-8 h-8" /> },
    { label: t('statsText2'), num: 20, suffix: "+", icon: <GraduationCap className="w-8 h-8" /> },
    { label: t('statsText3'), num: 15, suffix: "+", icon: <Calendar className="w-8 h-8" /> },
    { label: t('statsText4'), prefix: "%", num: 100, suffix: "", icon: <Heart className="w-8 h-8" /> },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={`stat-${idx}-${pathname}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center p-4 group"
            >
              <div className="bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] flex items-center justify-center">
                {stat.prefix && <span>{stat.prefix}</span>}
                <CountUp to={stat.num} duration={2.5} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="text-gray-600 mt-3 font-semibold text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
