'use client';

import { supabase } from '@/lib/supabase';
import { LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AdminNavbarProps {
  userEmail: string | null;
  onLogout: () => void;
}

export default function AdminNavbar({ userEmail, onLogout }: AdminNavbarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                Önce Özel Eğitim
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-200">
                Yönetim
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:block">
              İçerik ve Danışan Yönetim Paneli
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[var(--color-primary)] px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
            title="Siteyi yeni sekmede aç"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Siteyi Gör</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {userEmail && (
            <div className="text-xs text-slate-500 font-medium hidden md:block max-w-[180px] truncate" title={userEmail}>
              {userEmail}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış</span>
          </button>
        </div>
      </div>
    </header>
  );
}
