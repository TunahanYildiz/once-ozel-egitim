'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import BlogEditor from './BlogEditor';
import { 
  Plus, Search, Edit3, Trash2, Calendar, CheckCircle2, 
  Clock, AlertCircle, FileText, ExternalLink, RefreshCw, Sparkles 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  slug: string;
  cover_url: string | null;
  published: boolean;
  created_at: string;
  title_tr: string;
  summary_tr: string;
  content_tr: string;
  title_en?: string | null;
  summary_en?: string | null;
  content_en?: string | null;
  title_de?: string | null;
  summary_de?: string | null;
  content_de?: string | null;
  title_ru?: string | null;
  summary_ru?: string | null;
  content_ru?: string | null;
}

import { ALL_TEMPLATES, BlogPostTemplate } from './blogTemplates';

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addingSlug, setAddingSlug] = useState<string | null>(null);

  // Tek tıkla şablon makalesini doğrudan Supabase veritabanına ekle
  const handleQuickAddTemplate = async (template: BlogPostTemplate) => {
    setAddingSlug(template.slug);
    setErrorMsg(null);
    try {
      const { badge, tagline, id, created_at, ...postData } = template;
      const { error } = await supabase.from('blog_posts').insert([{
        ...postData,
        created_at: new Date().toISOString(),
      }]);

      if (error) throw error;
      await fetchPosts();
    } catch (err: any) {
      setErrorMsg(`Yazı eklenirken hata oluştu: ${err.message}`);
    } finally {
      setAddingSlug(null);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      setErrorMsg(`Yazılar yüklenirken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Hızlı yayınlama / taslağa alma durumu değiştirme
  const togglePublish = async (post: BlogPost) => {
    const newStatus = !post.published;
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: newStatus })
        .eq('id', post.id);

      if (error) throw error;
      setPosts(posts.map(p => p.id === post.id ? { ...p, published: newStatus } : p));
    } catch (err: any) {
      alert(`Durum güncellenemedi: ${err.message}`);
    }
  };

  // Yazı Silme
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(posts.filter(p => p.id !== id));
    } catch (err: any) {
      alert(`Silme işlemi başarısız: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Eğer yeni yazı oluşturuluyorsa veya düzenleniyorsa BlogEditor'ü aç
  if (isCreatingNew || editingPost) {
    return (
      <BlogEditor
        initialPost={editingPost}
        onBack={() => {
          setIsCreatingNew(false);
          setEditingPost(null);
        }}
        onSaveSuccess={() => {
          setIsCreatingNew(false);
          setEditingPost(null);
          fetchPosts();
        }}
      />
    );
  }

  const filteredPosts = posts.filter(post => 
    (post.title_tr || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.slug || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unaddedTemplates = ALL_TEMPLATES.filter(
    (template: BlogPostTemplate) => !posts.some((p) => p.slug === template.slug)
  );

  return (
    <div className="space-y-6">
      {/* Header & New Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Blog Yazıları
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Toplam {posts.length} makale kayıtlı. Sitenin arama motoru görünürlüğünü artırmak için güncel içerikler ekleyin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Listeyi Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsCreatingNew(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold text-sm rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Yazı Ekle</span>
          </button>
        </div>
      </div>

      {/* Önerilen Hazır Makaleler (Pendik Yerel SEO & 4 Dilli) */}
      {unaddedTemplates.length > 0 && (
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/5 border border-amber-200 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Yayınlanmaya Hazır Uzman Makaleleri (Özel Fotoğraflı & 4 Dilli)
                </h2>
                <p className="text-xs text-slate-600">
                  Masaüstünüzdeki fotoğraflarla eşleştirilmiş, 4 dilde (TR, EN, DE, RU) klinik içerikleri hazır makaleleri tek tıkla inceleyebilir veya hemen yayınlayabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {unaddedTemplates.map((template) => (
              <div
                key={template.slug}
                className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold">
                      {template.badge}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      🇹🇷 🇬🇧 🇩🇪 🇷🇺 Hazır
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1.5 group-hover:text-amber-700 transition-colors">
                    {template.title_tr}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {template.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setEditingPost(template as unknown as BlogPost)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Yazıyı ve çevirilerini incele"
                  >
                    <span>İncele / Önizle</span>
                  </button>

                  <button
                    onClick={() => handleQuickAddTemplate(template)}
                    disabled={addingSlug === template.slug}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Tek tıkla hemen veritabanına ekle"
                  >
                    {addingSlug === template.slug ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Hemen Yayınla</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Başlık veya URL ara..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-xs"
          />
        </div>

        <div className="text-xs text-slate-500 font-semibold flex items-center gap-4 self-end sm:self-auto">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {posts.filter(p => p.published).length} Yayında
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {posts.filter(p => !p.published).length} Taslak
          </span>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Post List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-8 h-8 border-3 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">Yazılar yükleniyor...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Henüz yazı bulunamadı</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              {searchQuery ? 'Arama kriterlerinize uygun makale bulunamadı.' : 'İlk blog yazınızı eklemek için "Yeni Yazı Ekle" butonuna tıklayın.'}
            </p>
          </div>
          {!searchQuery && (
            <button
              onClick={() => setIsCreatingNew(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Hemen Bir Yazı Oluştur</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    {post.cover_url ? (
                      <Image
                        src={post.cover_url}
                        alt={post.title_tr}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <FileText className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-[var(--color-primary)] transition-colors">
                        {post.title_tr || '(Başlıksız)'}
                      </h3>

                      {post.published ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Yayında</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>Taslak</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <span>/blog/{post.slug}</span>
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(post.created_at).toLocaleDateString('tr-TR', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-slate-400 hover:text-[var(--color-primary)] hover:bg-slate-100 rounded-xl transition-colors"
                    title="Canlı Sitede Gör"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => togglePublish(post)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors border ${
                      post.published
                        ? 'text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100'
                        : 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    {post.published ? 'Taslağa Al' : 'Yayınla'}
                  </button>

                  <button
                    onClick={() => setEditingPost(post)}
                    className="p-2 text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-100 rounded-xl transition-colors"
                    title="Düzenle"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(post.id, post.title_tr)}
                    disabled={deletingId === post.id}
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                    title="Sil"
                  >
                    {deletingId === post.id ? (
                      <div className="w-4 h-4 border-2 border-rose-600/30 border-t-rose-600 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
