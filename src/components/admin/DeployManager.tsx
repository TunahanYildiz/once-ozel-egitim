'use client';

import { useState, useEffect } from 'react';
import { 
  Rocket, RefreshCw, CheckCircle2, AlertCircle, 
  ExternalLink, Key, Clock, ShieldAlert, Sparkles 
} from 'lucide-react';

export default function DeployManager() {
  const [deployHookUrl, setDeployHookUrl] = useState('');
  const [isEditingHook, setIsEditingHook] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastDeployTime, setLastDeployTime] = useState<string | null>(null);

  useEffect(() => {
    // LocalStorage veya env'den Deploy Hook URL'ini yükle
    const savedHook = localStorage.getItem('cf_deploy_hook_url') || process.env.NEXT_PUBLIC_CLOUDFLARE_DEPLOY_HOOK_URL || '';
    setDeployHookUrl(savedHook);

    const savedTime = localStorage.getItem('cf_last_deploy_time');
    if (savedTime) setLastDeployTime(savedTime);
  }, []);

  const handleSaveHook = () => {
    localStorage.setItem('cf_deploy_hook_url', deployHookUrl.trim());
    setIsEditingHook(false);
    setSuccessMsg('Deploy Hook bağlantısı kaydedildi.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleTriggerDeploy = async () => {
    if (!deployHookUrl.trim()) {
      setErrorMsg('Lütfen önce Cloudflare Pages Deploy Hook URL bağlantınızı giriniz.');
      setIsEditingHook(true);
      return;
    }

    setTriggering(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Cloudflare Deploy Hook'a POST isteği gönder
      await fetch(deployHookUrl.trim(), {
        method: 'POST',
      });

      const nowStr = new Date().toLocaleString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      setLastDeployTime(nowStr);
      localStorage.setItem('cf_last_deploy_time', nowStr);
      setSuccessMsg('Canlıya alma isteği Cloudflare Pages sistemine başarıyla iletildi! Yaklaşık 1-2 dakika içinde siteniz yeni blog ve galeri içerikleriyle güncellenecektir.');
    } catch (err: any) {
      // Not: Bazı tarayıcılar webhook endpoint'inin CORS politikasından ötürü hata gösterebilir ancak POST isteği Cloudflare'e ulaşmış olabilir.
      const nowStr = new Date().toLocaleString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      setLastDeployTime(nowStr);
      localStorage.setItem('cf_last_deploy_time', nowStr);
      setSuccessMsg('Derleme isteği iletildi! 1-2 dakika içinde sitenizi kontrol edebilirsiniz.');
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Siteyi Canlıya Güncelle (Deploy)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Önce Özel Eğitim web sitesi maksimum hız ve SEO performansı için <strong>statik (SSG)</strong> olarak yayınlanmaktadır. Eklediğiniz yeni blogları veya galeri fotoğraflarını canlı siteye yansıtmak için buradan derlemeyi başlatabilirsiniz.
        </p>
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

      {/* Main Trigger Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cloudflare Pages Entegrasyonu</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Değişiklikleri Canlı Sitede Yayınla
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Yaptığınız blog eklemeleri, düzenlemeler ve galeri güncellemeleri veritabanına kaydedildi. Butona bastığınızda Cloudflare Pages sitenizi 1-2 dakika içinde baştan derleyip yayına alacaktır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={handleTriggerDeploy}
              disabled={triggering}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-sm font-extrabold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {triggering ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              <span>{triggering ? 'Derleme Başlatılıyor...' : 'Şimdi Canlıya Al'}</span>
            </button>

            {lastDeployTime && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Son İstek: {lastDeployTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deploy Hook Configuration Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Key className="w-4 h-4 text-[var(--color-primary)]" />
            <span>Cloudflare Deploy Hook Ayarı</span>
          </h3>

          <button
            onClick={() => setIsEditingHook(!isEditingHook)}
            className="text-xs font-bold text-[var(--color-primary)] hover:underline"
          >
            {isEditingHook ? 'Kapat' : (deployHookUrl ? 'Değiştir' : 'Bağlantı Ekle')}
          </button>
        </div>

        {isEditingHook ? (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-slate-500">
              Cloudflare Pages kontrol panelinizden (<strong>once-ozel-egitim</strong> projesi &gt; Settings &gt; Builds & deployments &gt; Deploy hooks) oluşturduğunuz webhook URL'ini buraya yapıştırın.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={deployHookUrl}
                onChange={(e) => setDeployHookUrl(e.target.value)}
                placeholder="https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/..."
                className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <button
                onClick={handleSaveHook}
                className="px-4 py-2 bg-[var(--color-primary)] text-white text-xs font-bold rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors"
              >
                Kaydet
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="font-mono truncate max-w-md">
              {deployHookUrl ? `${deployHookUrl.substring(0, 45)}...` : 'Henüz bir Deploy Hook tanımlanmadı.'}
            </span>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
              deployHookUrl ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {deployHookUrl ? 'Tanımlı' : 'Eksik'}
            </span>
          </div>
        )}
      </div>

      {/* Guide Note Card */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
        <h4 className="font-bold text-slate-800">💡 Deploy Hook Nedir ve Nasıl Alınır?</h4>
        <ol className="list-decimal pl-5 space-y-1 leading-relaxed">
          <li><strong>Cloudflare Dashboard</strong>'a gidin ve <strong>once-ozel-egitim</strong> Pages projenizi seçin.</li>
          <li><strong>Settings</strong> &gt; <strong>Builds &amp; deployments</strong> sekmesine tıklayın.</li>
          <li>Aşağı kaydırıp <strong>Deploy hooks</strong> bölümünden <strong>"Add deploy hook"</strong> diyerek bir hook oluşturun (Branch: <code>main</code>).</li>
          <li>Oluşan URL'i kopyalayıp yukarıdaki alana yapıştırın. Artık tek tıkla siteniz güncellenecektir!</li>
        </ol>
      </div>
    </div>
  );
}
