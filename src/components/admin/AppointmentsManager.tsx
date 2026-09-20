'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, Phone, Calendar, MessageSquare, Search, 
  CheckCircle2, Clock, XCircle, RefreshCw, AlertCircle, PhoneCall 
} from 'lucide-react';

interface Appointment {
  id: string | number;
  full_name: string;
  phone: string;
  category: string;
  status: 'new' | 'called' | 'completed' | 'cancelled' | string;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  new: { label: 'Yeni Başvuru', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  called: { label: 'Arandı', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  completed: { label: 'Tamamlandı', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  cancelled: { label: 'İptal', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
};

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err: any) {
      setErrorMsg(`Randevu başvuruları yüklenirken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setAppointments(appointments.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
    } catch (err: any) {
      alert(`Durum güncellenemedi: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredAppointments = appointments.filter(item => {
    const matchesSearch = 
      (item.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || '').includes(searchQuery) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Gelen Randevular & Talepler
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Web sitesi iletişim ve hızlı randevu formlarından gelen danışan başvuruları.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAppointments}
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Yenile"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim, telefon veya konu ara..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'all'
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tümü ({appointments.length})
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'new'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Yeni ({appointments.filter(a => a.status === 'new').length})
          </button>
          <button
            onClick={() => setStatusFilter('called')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'called'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Arandı ({appointments.filter(a => a.status === 'called').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tamamlandı ({appointments.filter(a => a.status === 'completed').length})
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

      {/* Table Card */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-8 h-8 border-3 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">Talepler yükleniyor...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">Başvuru bulunamadı</p>
          <p className="text-xs text-slate-400">Web sitesinden form doldurulduğunda talepler bu ekrana düşecektir.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Başvuran</th>
                  <th className="py-3.5 px-4 sm:px-6">Telefon & İletişim</th>
                  <th className="py-3.5 px-4 sm:px-6">Konu / Terapi</th>
                  <th className="py-3.5 px-4 sm:px-6">Tarih</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Durum Yönetimi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredAppointments.map((app) => {
                  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.new;
                  const cleanPhone = app.phone ? app.phone.replace(/[^0-9]/g, '') : '';

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Name */}
                      <td className="py-4 px-4 sm:px-6 font-bold text-slate-900 text-sm">
                        {app.full_name || '(İsimsiz)'}
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${app.phone}`}
                            className="inline-flex items-center gap-1.5 font-bold text-[var(--color-primary)] hover:underline font-mono text-xs bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg"
                            title="Doğrudan Ara"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>{app.phone}</span>
                          </a>

                          {cleanPhone && (
                            <a
                              href={`https://wa.me/90${cleanPhone.startsWith('0') ? cleanPhone.substring(1) : cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                              title="WhatsApp'tan Mesaj At"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg text-xs">
                          {app.category || 'Genel Başvuru'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 text-slate-500 font-medium">
                        {app.created_at ? new Date(app.created_at).toLocaleString('tr-TR', {
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : '-'}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <select
                          value={app.status}
                          disabled={updatingId === app.id}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`font-bold text-xs px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${cfg.bg} ${cfg.color} ${cfg.border}`}
                        >
                          <option value="new">Yeni Başvuru</option>
                          <option value="called">Arandı</option>
                          <option value="completed">Tamamlandı</option>
                          <option value="cancelled">İptal Edildi</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
