'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Upload, Trash2, Camera, RefreshCw, AlertCircle, 
  CheckCircle2, Plus, Filter, Image as ImageIcon 
} from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id?: string | number;
  image_url: string;
  category: string;
  sort_order?: number;
}

const CATEGORIES = [
  { key: 'terapi', label: 'Terapi Odaları' },
  { key: 'egitim', label: 'Eğitim Sınıfları' },
  { key: 'mekan', label: 'Merkez & Mekan' },
  { key: 'etkinlik', label: 'Etkinlikler & Sosyal' },
];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('hepsi');
  const [uploadCategory, setUploadCategory] = useState('terapi');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGallery = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (err: any) {
      setErrorMsg(`Galeri fotoğrafları yüklenirken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Fotoğraf Yükleme (Toplu veya tekil)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    let successCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 15 * 1024 * 1024) continue; // 15MB limit

        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
        const filePath = `gallery/${Date.now()}-${cleanName}.${fileExt}`;

        // 1. Supabase Storage'a Yükle
        const { error: uploadError } = await supabase.storage
          .from('gallery_photos')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        // 2. Public URL Al
        const { data: publicUrlData } = supabase.storage
          .from('gallery_photos')
          .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;

        // 3. gallery_images Tablosuna Kaydet
        const { error: dbError } = await supabase
          .from('gallery_images')
          .insert([{
            image_url: imageUrl,
            category: uploadCategory,
            sort_order: images.length + successCount + 1,
          }]);

        if (dbError) {
          console.error('Database insert error:', dbError);
        } else {
          successCount++;
        }
      }

      if (successCount > 0) {
        setSuccessMsg(`${successCount} adet fotoğraf galeriye başarıyla eklendi!`);
        setTimeout(() => setSuccessMsg(null), 3000);
        await fetchGallery();
      } else {
        setErrorMsg('Fotoğraflar yüklenirken bir hata oluştu.');
      }
    } catch (err: any) {
      setErrorMsg(`Hata: ${err.message}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Fotoğraf Silme
  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Bu fotoğrafı galeriden silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeletingUrl(item.image_url);
    try {
      // Tablodan sil
      let query = supabase.from('gallery_images').delete();
      if (item.id) {
        query = query.eq('id', item.id);
      } else {
        query = query.eq('image_url', item.image_url);
      }

      const { error } = await query;
      if (error) throw error;

      setImages(images.filter(img => img.image_url !== item.image_url));
      setSuccessMsg('Fotoğraf galeriden silindi.');
      setTimeout(() => setSuccessMsg(null), 2500);
    } catch (err: any) {
      alert(`Silme işlemi başarısız: ${err.message}`);
    } finally {
      setDeletingUrl(null);
    }
  };

  const filteredImages = activeFilter === 'hepsi'
    ? images
    : images.filter(img => img.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Galeri Yönetimi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Merkezinizin sınıflarını, terapi odalarını ve etkinlik fotoğraflarını yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchGallery}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Upload Box Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[var(--color-primary)]" />
          <span>Yeni Fotoğraf Yükle</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Kategori Seçin
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.key} value={cat.key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Dosya Seçimi
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-[var(--color-primary)] rounded-xl py-3 px-4 text-center cursor-pointer hover:bg-slate-50 transition-all flex items-center justify-center gap-3 group"
            >
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-[var(--color-primary)] transition-colors" />
              <span className="text-xs font-bold text-slate-700">
                {uploading ? 'Yükleniyor...' : 'Bilgisayarınızdan Fotoğraf Seçin (Toplu Seçilebilir)'}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </div>
        </div>

        {uploading && (
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[var(--color-primary)] py-2 bg-slate-50 rounded-xl">
            <div className="w-4 h-4 border-2 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin" />
            <span>Fotoğraflar Supabase Storage'a yükleniyor, lütfen bekleyin...</span>
          </div>
        )}
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveFilter('hepsi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'hepsi'
              ? 'bg-[var(--color-primary)] text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Hepsi ({images.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = images.filter(img => img.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeFilter === cat.key
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-8 h-8 border-3 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">Galeri yükleniyor...</p>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Camera className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">Bu kategoride fotoğraf bulunamadı</p>
          <p className="text-xs text-slate-400">Yukarıdaki panelden bu kategori için fotoğraf yükleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredImages.map((img, idx) => {
            const catLabel = CATEGORIES.find(c => c.key === img.category)?.label || img.category;
            return (
              <div 
                key={img.id || img.image_url || idx}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={img.image_url}
                    alt={catLabel}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-[11px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {catLabel}
                    </span>

                    <button
                      onClick={() => handleDelete(img)}
                      disabled={deletingUrl === img.image_url}
                      className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50"
                      title="Fotoğrafı Sil"
                    >
                      {deletingUrl === img.image_url ? (
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
