'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminNavbar from '@/components/admin/AdminNavbar';
import BlogManager from '@/components/admin/BlogManager';
import GalleryManager from '@/components/admin/GalleryManager';
import AppointmentsManager from '@/components/admin/AppointmentsManager';
import DeployManager from '@/components/admin/DeployManager';
import { 
  FileText, Image as ImageIcon, Users, Rocket 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blogs' | 'gallery' | 'appointments' | 'deploy'>('blogs');

  useEffect(() => {
    // Oturum durumunu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Yönetim Paneli Yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  // Oturum yoksa Login ekranını göster
  if (!session) {
    return (
      <AdminLogin 
        onLoginSuccess={() => {
          supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
          });
        }} 
      />
    );
  }

  const TABS = [
    { key: 'blogs', label: 'Blog Yazıları', icon: FileText },
    { key: 'gallery', label: 'Galeri Fotoğrafları', icon: ImageIcon },
    { key: 'appointments', label: 'Gelen Randevular', icon: Users },
    { key: 'deploy', label: 'Canlıya Güncelle (Deploy)', icon: Rocket },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Topbar */}
      <AdminNavbar
        userEmail={session?.user?.email || null}
        onLogout={() => setSession(null)}
      />

      {/* Admin Subnav / Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {activeTab === 'blogs' && <BlogManager />}
        {activeTab === 'gallery' && <GalleryManager />}
        {activeTab === 'appointments' && <AppointmentsManager />}
        {activeTab === 'deploy' && <DeployManager />}
      </main>
    </div>
  );
}
