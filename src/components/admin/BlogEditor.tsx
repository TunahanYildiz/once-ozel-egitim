'use client';

import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Save, ArrowLeft, Upload, Image as ImageIcon, Eye, Code, 
  Heading2, Heading3, Bold, Italic, List, ListOrdered, Quote, Link2, 
  AlertCircle, CheckCircle2, Sparkles, X, Globe, Check
} from 'lucide-react';
import Image from 'next/image';
import { ALL_TEMPLATES, BlogPostTemplate } from './blogTemplates';

interface BlogPostData {
  id?: string;
  slug: string;
  cover_url: string | null;
  published: boolean;
  created_at?: string;
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

interface BlogEditorProps {
  initialPost?: BlogPostData | null;
  onBack: () => void;
  onSaveSuccess: () => void;
}

type LangKey = 'tr' | 'en' | 'de' | 'ru';

const LANGUAGES: { key: LangKey; label: string; flag: string }[] = [
  { key: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { key: 'en', label: 'English', flag: '🇬🇧' },
  { key: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { key: 'ru', label: 'Русский', flag: '🇷🇺' },
];

function generateSlug(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  };

  return text
    .split('')
    .map(c => trMap[c] || c)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogEditor({ initialPost, onBack, onSaveSuccess }: BlogEditorProps) {
  const isEditing = !!initialPost?.id;

  // Ortak Alanlar
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [coverUrl, setCoverUrl] = useState(initialPost?.cover_url || '');
  const [published, setPublished] = useState(initialPost?.published ?? true);

  // Dil Sekmesi
  const [currentLang, setCurrentLang] = useState<LangKey>('tr');

  // Çoklu Dil State'leri
  const [titleTr, setTitleTr] = useState(initialPost?.title_tr || '');
  const [summaryTr, setSummaryTr] = useState(initialPost?.summary_tr || '');
  const [contentTr, setContentTr] = useState(initialPost?.content_tr || '');

  const [titleEn, setTitleEn] = useState(initialPost?.title_en || '');
  const [summaryEn, setSummaryEn] = useState(initialPost?.summary_en || '');
  const [contentEn, setContentEn] = useState(initialPost?.content_en || '');

  const [titleDe, setTitleDe] = useState(initialPost?.title_de || '');
  const [summaryDe, setSummaryDe] = useState(initialPost?.summary_de || '');
  const [contentDe, setContentDe] = useState(initialPost?.content_de || '');

  const [titleRu, setTitleRu] = useState(initialPost?.title_ru || '');
  const [summaryRu, setSummaryRu] = useState(initialPost?.summary_ru || '');
  const [contentRu, setContentRu] = useState(initialPost?.content_ru || '');

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>(
    initialPost && !initialPost.id ? 'preview' : 'editor'
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aktif dildeki değerleri dinamik alma ve güncelleme
  const getActiveTitle = () => {
    switch (currentLang) {
      case 'tr': return titleTr;
      case 'en': return titleEn;
      case 'de': return titleDe;
      case 'ru': return titleRu;
    }
  };

  const getActiveSummary = () => {
    switch (currentLang) {
      case 'tr': return summaryTr;
      case 'en': return summaryEn;
      case 'de': return summaryDe;
      case 'ru': return summaryRu;
    }
  };

  const getActiveContent = () => {
    switch (currentLang) {
      case 'tr': return contentTr;
      case 'en': return contentEn;
      case 'de': return contentDe;
      case 'ru': return contentRu;
    }
  };

  const setActiveTitle = (val: string) => {
    switch (currentLang) {
      case 'tr':
        setTitleTr(val);
        if (!isEditing || !slug) setSlug(generateSlug(val));
        break;
      case 'en': setTitleEn(val); break;
      case 'de': setTitleDe(val); break;
      case 'ru': setTitleRu(val); break;
    }
  };

  const setActiveSummary = (val: string) => {
    switch (currentLang) {
      case 'tr': setSummaryTr(val); break;
      case 'en': setSummaryEn(val); break;
      case 'de': setSummaryDe(val); break;
      case 'ru': setSummaryRu(val); break;
    }
  };

  const setActiveContent = (val: string) => {
    switch (currentLang) {
      case 'tr': setContentTr(val); break;
      case 'en': setContentEn(val); break;
      case 'de': setContentDe(val); break;
      case 'ru': setContentRu(val); break;
    }
  };

  const isLangFilled = (lang: LangKey) => {
    switch (lang) {
      case 'tr': return !!titleTr && !!contentTr;
      case 'en': return !!titleEn && !!contentEn;
      case 'de': return !!titleDe && !!contentDe;
      case 'ru': return !!titleRu && !!contentRu;
    }
  };

  // Metin editörü araç çubuğu fonksiyonları
  const insertTag = (openTag: string, closeTag: string, placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || placeholder;

    const replacement = `${openTag}${selected}${closeTag}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);

    setActiveContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + selected.length
      );
    }, 10);
  };

  const insertSnippet = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newContent = text.substring(0, start) + snippet + text.substring(end);
    setActiveContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 10);
  };

  // Görsel Yükleme
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Görsel boyutu 10MB dan küçük olmalıdır.');
      return;
    }

    setUploadingImage(true);
    setErrorMsg(null);

    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      const uniqueFileName = `blog/${Date.now()}-${cleanFileName}.${fileExt}`;

      const { error } = await supabase.storage
        .from('gallery_photos')
        .upload(uniqueFileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('gallery_photos')
        .getPublicUrl(uniqueFileName);

      setCoverUrl(publicUrlData.publicUrl);
      setSuccessMsg('Görsel başarıyla yüklendi!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(`Görsel yüklenemedi: ${err.message}`);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Hazır 4 Dilli SEO Makalesi Şablonu Yükleyici
  const loadTemplate = (template: BlogPostTemplate) => {
    setSlug(template.slug);
    setCoverUrl(template.cover_url);
    setPublished(template.published);
    setTitleTr(template.title_tr);
    setSummaryTr(template.summary_tr);
    setContentTr(template.content_tr);
    setTitleEn(template.title_en);
    setSummaryEn(template.summary_en);
    setContentEn(template.content_en);
    setTitleDe(template.title_de);
    setSummaryDe(template.summary_de);
    setContentDe(template.content_de);
    setTitleRu(template.title_ru);
    setSummaryRu(template.summary_ru);
    setContentRu(template.content_ru);
    setActiveTab('preview');
    setSuccessMsg(`✨ "${template.badge}" 4 dilli uzman makalesi editöre yüklendi!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Blog Kaydetme
  const handleSave = async () => {
    if (!titleTr.trim()) {
      setErrorMsg('Lütfen en azından Türkçe başlığı doldurunuz.');
      setCurrentLang('tr');
      return;
    }
    if (!slug.trim()) {
      setErrorMsg('Lütfen bir URL uzantısı (slug) belirleyiniz.');
      return;
    }
    if (!contentTr.trim()) {
      setErrorMsg('Lütfen Türkçe yazı içeriğini doldurunuz.');
      setCurrentLang('tr');
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    const postPayload = {
      slug: slug.trim().toLowerCase(),
      cover_url: coverUrl.trim() || null,
      published,
      title_tr: titleTr.trim(),
      summary_tr: summaryTr.trim() || null,
      content_tr: contentTr.trim(),
      title_en: titleEn.trim() || null,
      summary_en: summaryEn.trim() || null,
      content_en: contentEn.trim() || null,
      title_de: titleDe.trim() || null,
      summary_de: summaryDe.trim() || null,
      content_de: contentDe.trim() || null,
      title_ru: titleRu.trim() || null,
      summary_ru: summaryRu.trim() || null,
      content_ru: contentRu.trim() || null,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postPayload)
          .eq('id', initialPost.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{
            ...postPayload,
            created_at: new Date().toISOString(),
          }]);

        if (error) throw error;
      }

      setSuccessMsg(isEditing ? 'Yazı başarıyla güncellendi!' : 'Yeni yazı başarıyla oluşturuldu!');
      setTimeout(() => {
        onSaveSuccess();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(`Kayıt başarısız: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Geri Dön"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Yazıyı Düzenle' : 'Yeni Blog Yazısı Oluştur'}
            </h1>
            <p className="text-xs text-slate-400">
              {isEditing ? `ID: ${initialPost.id}` : '4 dil destekli makale oluşturun.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isEditing && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500 mr-1 hidden lg:inline">Hazır Makaleler:</span>
              {ALL_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.slug}
                  type="button"
                  onClick={() => loadTemplate(tmpl)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer"
                  title={`${tmpl.badge} makalesini 4 dilde doldur`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{tmpl.badge}</span>
                </button>
              ))}
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)] cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700">
              {published ? 'Yayında' : 'Taslak'}
            </span>
          </label>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white text-sm font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isEditing ? 'Güncellemeleri Kaydet' : 'Yazıyı Yayınla'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-700 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Language Selector Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">İçerik Dili:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {LANGUAGES.map(lang => {
            const filled = isLangFilled(lang.key);
            const active = currentLang === lang.key;

            return (
              <button
                key={lang.key}
                type="button"
                onClick={() => setCurrentLang(lang.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {filled && (
                  <span className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-300' : 'bg-emerald-500'}`} title="İçerik girilmiş" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Başlık ({LANGUAGES.find(l => l.key === currentLang)?.label}) {currentLang === 'tr' && <span className="text-rose-500">*</span>}
                </label>
                {currentLang !== 'tr' && !getActiveTitle() && (
                  <span className="text-[11px] text-amber-600 font-medium">Boş bırakılırsa Türkçe başlık gösterilir</span>
                )}
              </div>
              <input
                type="text"
                value={getActiveTitle()}
                onChange={(e) => setActiveTitle(e.target.value)}
                placeholder={`${LANGUAGES.find(l => l.key === currentLang)?.label} başlık yazın...`}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>

            {/* Slug is common for all languages */}
            {currentLang === 'tr' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  URL Uzantısı (Slug) <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="bg-slate-100 border border-r-0 border-slate-200 px-3 py-2.5 rounded-l-xl text-xs text-slate-500 font-mono">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlug(e.target.value))}
                    placeholder="otizmde-erken-tani"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-slate-800 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Kısa Özet ({LANGUAGES.find(l => l.key === currentLang)?.label})
              </label>
              <textarea
                value={getActiveSummary()}
                onChange={(e) => setActiveSummary(e.target.value)}
                rows={2}
                placeholder="1-2 cümlelik kısa özet (kartlarda ve arama motorlarında görünür)..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>
          </div>

          {/* Editor & Preview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50/70">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'editor'
                      ? 'bg-white text-[var(--color-primary)] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Editör ({currentLang.toUpperCase()})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white text-[var(--color-primary)] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Canlı Önizleme</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                {activeTab === 'editor' ? 'HTML veya zengin metin' : 'Sitedeki görünüm simülasyonu'}
              </span>
            </div>

            {/* Toolbar */}
            {activeTab === 'editor' && (
              <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100/60 border-b border-slate-200 text-slate-700">
                <button
                  type="button"
                  onClick={() => insertTag('<h2>', '</h2>', 'Büyük Ara Başlık')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all text-xs font-bold flex items-center gap-1 px-2"
                  title="Başlık 2 (H2)"
                >
                  <Heading2 className="w-4 h-4" />
                  <span>H2</span>
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<h3>', '</h3>', 'Küçük Alt Başlık')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all text-xs font-bold flex items-center gap-1 px-2"
                  title="Başlık 3 (H3)"
                >
                  <Heading3 className="w-4 h-4" />
                  <span>H3</span>
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertTag('<strong>', '</strong>', 'kalın metin')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="Kalın (Bold)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<em>', '</em>', 'italik metin')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="İtalik"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertSnippet('\n<ul>\n  <li>Madde 1</li>\n  <li>Madde 2</li>\n  <li>Madde 3</li>\n</ul>\n')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="Madde Listesi"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('\n<ol>\n  <li>Adım 1</li>\n  <li>Adım 2</li>\n  <li>Adım 3</li>\n</ol>\n')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="Numaralı Liste"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<blockquote>', '</blockquote>', 'Önemli alıntı metni...')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="Alıntı"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTag('<a href="https://..." target="_blank">', '</a>', 'Bağlantı Metni')}
                  className="p-1.5 hover:bg-white hover:shadow-xs rounded-lg transition-all"
                  title="Link Ekle"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertSnippet('<p>Yeni paragraf metni buraya gelecek.</p>\n\n')}
                  className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  + Paragraf
                </button>
              </div>
            )}

            {/* Content Area */}
            {activeTab === 'editor' ? (
              <div className="p-4">
                <textarea
                  ref={textareaRef}
                  value={getActiveContent()}
                  onChange={(e) => setActiveContent(e.target.value)}
                  rows={16}
                  placeholder={`<p>${LANGUAGES.find(l => l.key === currentLang)?.label} makalenin giriş paragrafı...</p>`}
                  className="w-full p-4 font-mono text-sm leading-relaxed text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
            ) : (
              <div className="p-8 bg-white min-h-[400px]">
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-3xl font-extrabold text-[var(--color-primary)] mb-4">
                    {getActiveTitle() || 'Yazı Başlığı'}
                  </h1>
                  {getActiveSummary() && (
                    <p className="text-base text-slate-500 mb-6 font-medium leading-relaxed">
                      {getActiveSummary()}
                    </p>
                  )}
                  {coverUrl && (
                    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-8 bg-slate-100">
                      <Image
                        src={coverUrl}
                        alt="Kapak"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div 
                    className="space-y-4 text-slate-700 leading-relaxed text-base [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[var(--color-primary)] [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[var(--color-primary)] [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-3 [&>strong]:font-bold [&>em]:italic"
                    dangerouslySetInnerHTML={{ __html: getActiveContent() || '<p className="text-slate-400 italic">İçerik henüz girilmedi...</p>' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar / Media */}
        <div className="space-y-6">
          {/* Cover Image Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Kapak Görseli</span>
            </h3>

            {coverUrl ? (
              <div className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                <Image
                  src={coverUrl}
                  alt="Kapak Önizleme"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverUrl('')}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-600 text-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  title="Görseli Kaldır"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-[var(--color-primary)] rounded-xl p-6 text-center cursor-pointer hover:bg-slate-50/50 transition-all group"
              >
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-[var(--color-primary)] mx-auto mb-2 transition-colors" />
                <p className="text-xs font-bold text-slate-700">Fotoğraf Seç veya Sürükle</p>
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP (Maks. 10MB)</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {uploadingImage && (
              <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-primary)] font-bold py-2 bg-slate-50 rounded-xl">
                <div className="w-3.5 h-3.5 border-2 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin" />
                <span>Görsel yükleniyor...</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                veya Doğrudan Görsel Bağlantısı:
              </label>
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] font-mono"
              />
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/10 p-5 rounded-2xl border border-[var(--color-secondary)]/20 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
              <Sparkles className="w-4 h-4 text-[var(--color-secondary)]" />
              <span>4 Dil Desteği</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Üstteki <strong>🇹🇷 TR, 🇬🇧 EN, 🇩🇪 DE, 🇷🇺 RU</strong> sekmelerinden her dil için başlık, özet ve içerik girebilirsiniz. Yabancı diller boş bırakılırsa otomatik Türkçe içerik gösterilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
