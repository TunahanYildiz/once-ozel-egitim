"use client";
import { useTranslations } from 'next-intl';
import { CalendarCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  fullName: string;
  phone: string;
  category: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  category?: string;
}

const PHONE_REGEX = /^(\+90|0)?[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{2})[- ]?(\d{2})$/;

export default function QuickContactForm() {
  const t = useTranslations('QuickContact');
  const options = t.raw('areaOptions') as string[];

  const [formState, setFormState] = useState<FormState>('idle');
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    phone: '',
    category: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      newErrors.fullName = t('validationName');
    }

    if (!values.phone.trim() || !PHONE_REGEX.test(values.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('validationPhone');
    }

    if (!values.category) {
      newErrors.category = t('validationArea');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');

    const fullNameTrimmed = values.fullName.trim();
    const phoneTrimmed = values.phone.trim();
    const categoryVal = values.category;

    const { error } = await supabase.from('appointments').insert([
      {
        full_name: fullNameTrimmed,
        phone: phoneTrimmed,
        category: categoryVal,
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      setFormState('error');
    } else {
      // Send email notification in the background
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullNameTrimmed,
          phone: phoneTrimmed,
          category: categoryVal,
          source: 'Hızlı İletişim / Değerlendirme Formu',
        }),
      }).catch(err => console.error('Failed to send email notification:', err));

      setFormState('success');
      setValues({ fullName: '', phone: '', category: '' });
      setErrors({});
    }
  };

  const inputBase =
    'w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border transition-all bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent';
  const inputNormal = `${inputBase} border-gray-200 focus:ring-[var(--color-secondary)]`;
  const inputError = `${inputBase} border-red-400 focus:ring-red-400 bg-red-50`;

  return (
    <section className="py-10 sm:py-16 md:py-24 bg-white" id="randevu-formu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-primary)] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-blue-400 opacity-20 blur-3xl pointer-events-none"></div>

          {/* Left panel */}
          <div className="w-full md:w-5/12 p-6 sm:p-10 md:p-12 flex flex-col justify-center relative z-10">
            <CalendarCheck className="w-12 h-12 md:w-16 md:h-16 text-[var(--color-secondary)] mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {t('title')}
            </h2>
            <p className="text-blue-200 text-base md:text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Right panel: Form or Success/Error */}
          <div className="w-full md:w-7/12 p-5 sm:p-8 md:p-12 relative z-10 bg-white md:rounded-r-[3rem]">

            {/* SUCCESS STATE */}
            {formState === 'success' && (
              <div className="h-full flex flex-col items-center justify-center text-center py-8 gap-6">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                    {t('successTitle')}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                    {t('successMessage')}
                  </p>
                </div>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 px-6 py-3 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] rounded-full font-semibold hover:bg-[var(--color-secondary)] hover:text-white transition-all"
                >
                  Yeni Başvuru
                </button>
              </div>
            )}

            {/* FORM STATE */}
            {formState !== 'success' && (
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5 md:space-y-5">
                {/* Error banner */}
                {formState === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{t('errorMessage')}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    {t('namePlaceholder')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={values.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className={errors.fullName ? inputError : inputNormal}
                    disabled={formState === 'loading'}
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    {t('phonePlaceholder')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder={t('phonePlaceholder')}
                    className={errors.phone ? inputError : inputNormal}
                    disabled={formState === 'loading'}
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    {t('areaPlaceholder')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={values.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className={errors.category ? inputError : inputNormal}
                    disabled={formState === 'loading'}
                  >
                    <option value="" disabled>{t('areaPlaceholder')}</option>
                    {options.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.category}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full py-3 md:py-4 mt-1 md:mt-2 bg-[var(--color-secondary)] text-white font-bold text-lg rounded-xl hover:bg-[var(--color-secondary-light)] transition-all transform hover:-translate-y-1 shadow-lg shadow-[var(--color-secondary)]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {formState === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('submitBtnLoading')}
                    </>
                  ) : (
                    t('submitBtn')
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
