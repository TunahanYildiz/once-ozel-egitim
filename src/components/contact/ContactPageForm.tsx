"use client";
import { useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const PHONE_REGEX = /^(\+90|0)?[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{2})[- ]?(\d{2})$/;

export default function ContactPageForm() {
  const t = useTranslations('Iletisim');
  const [formState, setFormState] = useState<FormState>('idle');
  const [values, setValues] = useState({ fullName: '', phone: '', topic: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 2) e.fullName = t('validationName');
    if (!values.phone.trim() || !PHONE_REGEX.test(values.phone.replace(/\s/g, ''))) e.phone = t('validationPhone');
    if (!values.topic.trim() || values.topic.trim().length < 2) e.topic = t('validationArea');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setValues((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined as unknown as string }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState('loading');

    const { error } = await supabase.from('appointments').insert([{
      full_name: values.fullName.trim(),
      phone: values.phone.trim(),
      category: values.topic.trim(),
      status: 'new',
    }]);

    if (error) { setFormState('error'); }
    else {
      setFormState('success');
      setValues({ fullName: '', phone: '', topic: '' });
      setErrors({});
    }
  };

  const base = 'w-full px-5 py-4 rounded-xl border transition-all bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent';
  const normal = `${base} border-gray-200 focus:ring-[var(--color-secondary)]`;
  const err = `${base} border-red-400 focus:ring-red-400 bg-red-50`;

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{t('successTitle')}</h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">{t('successMessage')}</p>
        </div>
        <button
          onClick={() => setFormState('idle')}
          className="mt-2 px-6 py-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-full font-semibold hover:bg-[var(--color-secondary)] hover:text-white transition-all"
        >
          Yeni Mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formState === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{t('errorMessage')}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('validationName').replace('zorunludur.', '').replace('is required.', '').replace('ist erforderlich.', '').replace('обязательно.', '') || 'Ad Soyad'} <span className="text-red-500">*</span>
        </label>
        <input
          type="text" value={values.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Ad Soyad"
          className={errors.fullName ? err : normal}
          disabled={formState === 'loading'}
          autoComplete="name"
        />
        {errors.fullName && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Telefon <span className="text-red-500">*</span>
        </label>
        <input
          type="tel" value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+90 5XX XXX XX XX"
          className={errors.phone ? err : normal}
          disabled={formState === 'loading'}
          autoComplete="tel"
        />
        {errors.phone && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('topicPlaceholder')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text" value={values.topic}
          onChange={(e) => handleChange('topic', e.target.value)}
          placeholder={t('topicPlaceholder')}
          className={errors.topic ? err : normal}
          disabled={formState === 'loading'}
        />
        {errors.topic && <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.topic}</p>}
      </div>

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full py-4 mt-2 bg-[var(--color-secondary)] text-white font-bold text-lg rounded-xl hover:bg-[var(--color-secondary-light)] transition-all transform hover:-translate-y-1 shadow-lg shadow-[var(--color-secondary)]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {formState === 'loading' ? (
          <><Loader2 className="w-5 h-5 animate-spin" />{t('submitBtnLoading')}</>
        ) : (
          <><Send className="w-5 h-5" />{t('submitBtn')}</>
        )}
      </button>
    </form>
  );
}
