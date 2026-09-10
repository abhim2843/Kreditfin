"use client";

// Impure calls must stay out of render (React 19 purity rule).
const nowMs = () => Date.now();

import React, { useState, useEffect, useRef } from 'react';
import { KreditFinLogo } from './components/KreditFinLogo';

export const OPTIONS = {
  products: [
    'Loan Against Property',
    'Personal Loan',
  ],
  employmentTypes: [
    'Salaried',
    'Self-Employed',
  ],
  salaryBands: [
    'Below ₹50,000',
    '₹50,000 - ₹75,000',
    '₹75,000 - ₹1 Lakh',
    '₹1 Lakh - ₹1.5 Lakh',
    '₹1.5 Lakh+',
  ],
  turnoverBands: [
    'Below ₹75 Lakh',
    '₹75 Lakh - ₹2 Crore',
    '₹2 Crore - ₹5 Crore',
    '₹5 Crore+',
  ],
  loanBandsPL: [
    'Below ₹5 Lakh',
    '₹5 Lakh - ₹10 Lakh',
    '₹10 Lakh - ₹20 Lakh',
    '₹20 Lakh - ₹30 Lakh',
    '₹30 Lakh - ₹50 Lakh',
  ],
  loanBandsLAP: [
    'Below ₹30 Lakh',
    '₹30 Lakh - ₹40 Lakh',
    '₹40 Lakh - ₹50 Lakh',
    '₹50 Lakh - ₹75 Lakh',
    '₹75 Lakh - ₹1 Crore',
    '₹1 Crore+',
  ],
  // READ BEFORE EDITING. Lead Desk Code.gs grade_() matches these by
  // SUBSTRING: 'above 750' -> A, '700'/'650' -> B, 'below 650' -> D,
  // blank -> C. Reword any of them and every lead silently grades B.
  cibilBands: [
    'Above 750',
    '700 to 750',
    '650 to 700',
    'Below 650',
    'Not sure',
  ],
  // No 'Yes' prefix: grade_() tests 'yes' BEFORE 'home loan', so
  // 'Yes, home loan running' would wrongly grade A.
  propertyOwnership: [
    'Fully paid off',
    'Home loan running',
    'No property owned',
  ],
  bestTimes: [
    '10 - 11 AM',
    '11 AM - 12 PM',
    '12 - 3 PM',
    '3 - 6 PM',
    '6 - 8 PM',
    'Anytime',
  ],
} as const;

export interface LeadPayload {
  product: string;
  employment: string;
  salary_band: string;
  turnover_band: string;
  loan_band_pl: string;
  loan_band_lap: string;
  cibil_band: string;
  property: string;
  full_name: string;
  whatsapp_number: string;
  email: string;
  employer: string;
  best_time: string;
  pincode: string;
  city: string;
  company_website: string;
  elapsed_ms: number;
  campaign_id?: string;
  campaign_name?: string;
  adset_id?: string;
  adset_name?: string;
  ad_id?: string;
  ad_name?: string;
  platform?: string;
  fbclid?: string;
  page_path?: string;
}

export default function ConsolidationLandingPage() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const [formData, setFormData] = useState({
    product: '',
    employment: '',
    salary_band: '',
    turnover_band: '',
    loan_band_pl: '',
    loan_band_lap: '',
    cibil_band: '',
    property: '',
    full_name: '',
    whatsapp_number: '',
    email: '',
    employer: '',
    best_time: '',
    pincode: '',
    city: '',
    company_website: '',
    consent: false,
  });

  const [resolvedCity, setResolvedCity] = useState<string>('');
  const [isLookingUpPin, setIsLookingUpPin] = useState<boolean>(false);

  const mountTimeRef = useRef<number>(0);
  const formTopRef = useRef<HTMLDivElement>(null);

  const urlParamsRef = useRef<{
    campaign_id: string;
    campaign_name: string;
    adset_id: string;
    adset_name: string;
    ad_id: string;
    ad_name: string;
    platform: string;
    fbclid: string;
    page_path: string;
  }>({
    campaign_id: '',
    campaign_name: '',
    adset_id: '',
    adset_name: '',
    ad_id: '',
    ad_name: '',
    platform: '',
    fbclid: '',
    page_path: '',
  });

  // Capture URL query params on mount
  useEffect(() => {
    mountTimeRef.current = nowMs();
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      urlParamsRef.current = {
        campaign_id: params.get('campaign_id') || '',
        campaign_name: params.get('campaign_name') || '',
        adset_id: params.get('adset_id') || '',
        adset_name: params.get('adset_name') || '',
        ad_id: params.get('ad_id') || '',
        ad_name: params.get('ad_name') || '',
        platform: params.get('platform') || '',
        fbclid: params.get('fbclid') || '',
        page_path: window.location.pathname || '/',
      };
    }
  }, []);

  // Scroll to top of the form on each step change
  useEffect(() => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  // Pincode lookup with 400ms debounce.
  // Every setState runs inside an async callback, never synchronously in the
  // effect body — React 19 rejects the latter as a cascading render.
  useEffect(() => {
    const pin = formData.pincode.trim();
    if (!/^\d{6}$/.test(pin)) return;

    let cancelled = false;
    const spinner = setTimeout(() => {
      if (!cancelled) setIsLookingUpPin(true);
    }, 0);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const po = data[0].PostOffice[0];
          const cityString = `${po.District || po.Name}, ${po.State}`;
          setResolvedCity(cityString);
          setFormData(prev => ({ ...prev, city: cityString }));
        }
      } catch {
        // Failure is silent — city is a nice-to-have, never a blocker.
      } finally {
        if (!cancelled) setIsLookingUpPin(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(spinner);
      clearTimeout(timer);
    };
  }, [formData.pincode]);

  // Rule 2: Changing product clears loan-amount answers and property answer
  const handleSelectProduct = (product: string) => {
    setFormData(prev => {
      if (prev.product === product) return prev;
      return {
        ...prev,
        product,
        loan_band_pl: '',
        loan_band_lap: '',
        property: '',
      };
    });
  };

  // Rule 2: Changing employment clears both income answers
  const handleSelectEmployment = (employment: string) => {
    setFormData(prev => {
      if (prev.employment === employment) return prev;
      return {
        ...prev,
        employment,
        salary_band: '',
        turnover_band: '',
      };
    });
  };

  // Step validation
  const isStep1Valid = formData.product !== '';
  const isStep2Valid =
    formData.employment !== '' &&
    (formData.employment === 'Salaried' ? formData.salary_band !== '' : formData.turnover_band !== '');
  const isStep3Valid =
    formData.product === 'Personal Loan'
      ? formData.loan_band_pl !== ''
      : formData.loan_band_lap !== '';
  const isStep4Valid =
    formData.cibil_band !== '' &&
    (formData.product === 'Personal Loan' || formData.property !== '');

  const isPhone10Digits = formData.whatsapp_number.length === 10;
  const isPhoneStartingValid = /^[6-9]/.test(formData.whatsapp_number);
  const isPhoneValid = isPhone10Digits && isPhoneStartingValid;

  const isStep5Valid =
    formData.full_name.trim().length > 0 &&
    isPhoneValid &&
    formData.pincode.trim().length === 6 &&
    formData.employer.trim().length > 0 &&
    formData.consent;

  const handleNext = () => {
    if (step === 1 && !isStep1Valid) return;
    if (step === 2 && !isStep2Valid) return;
    if (step === 3 && !isStep3Valid) return;
    if (step === 4 && !isStep4Valid) return;
    setStep(prev => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    setSubmitError('');
    if (!isStep5Valid) return;

    const payload: LeadPayload = {
      product: formData.product,
      employment: formData.employment,
      salary_band: formData.employment === 'Salaried' ? formData.salary_band : '',
      turnover_band: formData.employment === 'Self-Employed' ? formData.turnover_band : '',
      loan_band_pl: formData.product === 'Personal Loan' ? formData.loan_band_pl : '',
      loan_band_lap: formData.product === 'Loan Against Property' ? formData.loan_band_lap : '',
      cibil_band: formData.cibil_band,
      property: formData.product === 'Loan Against Property' ? formData.property : '',
      full_name: formData.full_name.trim(),
      whatsapp_number: formData.whatsapp_number.trim(),
      email: formData.email.trim(),
      employer: formData.employer.trim(),
      best_time: formData.best_time,
      pincode: formData.pincode.trim(),
      city: formData.city || resolvedCity || '',
      company_website: formData.company_website,
      elapsed_ms: mountTimeRef.current ? Math.max(0, nowMs() - mountTimeRef.current) : 0,
      campaign_id: urlParamsRef.current.campaign_id,
      campaign_name: urlParamsRef.current.campaign_name,
      adset_id: urlParamsRef.current.adset_id,
      adset_name: urlParamsRef.current.adset_name,
      ad_id: urlParamsRef.current.ad_id,
      ad_name: urlParamsRef.current.ad_name,
      platform: urlParamsRef.current.platform,
      fbclid: urlParamsRef.current.fbclid,
      page_path: urlParamsRef.current.page_path,
    };

    try {
      const res = await fetch('/api/lp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');

      const w = window as unknown as { fbq?: (...a: unknown[]) => void };
      if (typeof w.fbq === 'function') {
        w.fbq('track', 'Lead',
          { content_name: payload.product, content_category: payload.employment },
          { eventID: json.id });
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const progressPercent = step * 20;

  return (
    <div className="min-h-screen bg-white text-[#1a1f2e] flex flex-col font-['Manrope',sans-serif]">
      {/* Main Container */}
      <div className="flex-1 w-full flex flex-col md:flex-row">
        {/* Left Desktop Panel (Visible on md 768px and up: Navy background with all Kreditfin USPs) */}
        <aside className="hidden md:flex md:w-[320px] lg:w-[380px] xl:w-[36%] bg-gradient-to-b from-[#1a1f2e] via-[#1a1f2e] to-[#121622] text-white flex-col justify-between p-6 lg:p-10 xl:p-12 border-r border-[#1a1f2e]/20 shrink-0">
          <div className="space-y-6 lg:space-y-8">
            {/* Brand Logo & Est. */}
            <div className="space-y-2">
              <KreditFinLogo variant="desktop" theme="dark" height={48} />
              <p className="text-xs text-gray-400 font-medium pl-0.5 font-['Outfit',sans-serif]">
                AS Fintech Private Limited · <span className="text-emerald-400 font-bold tracking-wider uppercase">Est. 2018</span>
              </p>
            </div>

            {/* Hook Headline & Sub */}
            <div className="space-y-3 pt-2">
              <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white">
                Too many EMIs? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-200">
                  Merge them into one.
                </span>
              </h1>
              <p className="text-lg text-gray-300 font-medium leading-snug">
                Cut your monthly outflow by up to 50%.
              </p>
              <p className="text-sm text-[#4caf50] font-medium pt-1">
                Five quick questions. No documents needed to check.
              </p>
            </div>

            {/* Three Ticked Lines */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#4caf50]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-200 leading-snug font-normal">
                  An ex-HDFC and ex-ICICI team, 15+ years on bank credit desks
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#4caf50]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-200 leading-snug font-normal">
                  Personal loans, credit cards and app loans, all in one file
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#4caf50]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-200 leading-snug font-normal">
                  Empanelled with 50+ banks and NBFCs
                </p>
              </div>
            </div>

            {/* Four Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-xl font-bold text-[#4caf50]">15+ years</p>
                <p className="text-xs text-gray-400 font-normal">Banking experience</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-[#4caf50]">15,000+</p>
                <p className="text-xs text-gray-400 font-normal">Customers served</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-[#4caf50]">₹500 Cr+</p>
                <p className="text-xs text-gray-400 font-normal">Loans processed</p>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-[#4caf50]">50+</p>
                <p className="text-xs text-gray-400 font-normal">Lender empanelments</p>
              </div>
            </div>

            {/* Google My Business Review Card in Sidebar */}
            <a
              href="https://share.google/FsBhu4gvLNjihBZur"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 p-3.5 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.1] transition-all flex items-center justify-between gap-3 group block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Google Reviews</span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-300">4.9/5 Rating on Google My Business</p>
                </div>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Bottom Italic Tagline */}
          <div className="pt-6">
            <p className="text-xs text-gray-400 italic">
              Ghar hi bachayega aapka Ghar
            </p>
          </div>
        </aside>

        {/* Right Form Area (Responsive desktop/tablet/mobile) */}
        <main className="flex-1 md:w-[calc(100%-320px)] lg:w-[calc(100%-380px)] xl:w-[64%] min-w-0 bg-white flex flex-col justify-start">
          <div ref={formTopRef} />

          {/* Mobile Header (Hidden on desktop & tablet ≥768px) */}
          <header className="block md:hidden px-4 py-2.5 border-b border-gray-100 bg-white">
            {step === 1 ? (
              /* Step 1: Exactly cut-down header */
              <div className="space-y-2">
                {/* [logo] KreditFin ... Est. 2018 */}
                <div className="flex items-center justify-between">
                  <KreditFinLogo variant="mobile" height={36} />
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/90 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0" />
                    <span className="text-[11px] font-black tracking-wider uppercase font-['Outfit',sans-serif] text-emerald-950">
                      Est. 2018
                    </span>
                  </div>
                </div>

                {/* Headline and subheadline */}
                <div className="space-y-0.5">
                  <h1 className="text-lg font-extrabold text-[#1a1f2e] leading-snug">
                    Too many EMIs? Merge them into one.
                  </h1>
                  <p className="text-xs font-semibold text-[#4caf50]">
                    Cut your monthly outflow by up to 50%.
                  </p>
                </div>

                {/* ONE line of small text with single green shield icon */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#1a1f2e] font-semibold whitespace-nowrap overflow-hidden text-ellipsis pt-0.5">
                  <svg
                    className="w-3.5 h-3.5 text-[#4caf50] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="truncate">No CIBIL impact · 50+ lenders · 15+ yrs ex-HDFC/ICICI team</span>
                </div>
              </div>
            ) : (
              /* Step 2 onward: Collapsed single compact row */
              <div className="flex items-center justify-between py-0.5">
                {/* Left: Logo */}
                <KreditFinLogo variant="mobile" height={28} />

                {/* Right: "No CIBIL impact" with shield icon */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a1f2e]">
                  <svg
                    className="w-3.5 h-3.5 text-[#4caf50] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>No CIBIL impact</span>
                </div>
              </div>
            )}
          </header>

          {/* Form Container */}
          <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 sm:px-8 sm:py-8 lg:py-10 flex flex-col justify-between">
            {isSubmitted ? (
              /* Success Screen */
              <div className="py-6 sm:py-10 space-y-8 animate-fadeIn" role="status">
                {/* Green check in a soft circle */}
                <div className="space-y-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-full bg-[#4caf50]/15 flex items-center justify-center mx-auto sm:mx-0">
                    <svg
                      className="w-8 h-8 text-[#4caf50]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1f2e] leading-tight">
                    Our Loan champions will contact you in Next 24 hours.
                  </h2>
                </div>

                {/* WhatsApp Fast-Track Card */}
                <div className="p-6 rounded-xl border border-[#4caf50]/30 bg-[rgba(76,175,80,0.06)] space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#1a1f2e]">
                      Want to skip the wait?
                    </h3>
                    <p className="text-sm text-gray-700 font-normal">
                      Message us on WhatsApp and we&apos;ll pick your file up first.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/917303820386?text=${encodeURIComponent(
                      `Hi KreditFin, I've submitted my ${formData.product || 'loan'} enquiry on your website. Please check my eligibility.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#4caf50] hover:bg-[#43a047] text-white font-semibold text-base transition-colors shadow-sm"
                  >
                    {/* WhatsApp SVG Glyph */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.96.526 1.838.802 2.805.802h.005c3.181 0 5.767-2.586 5.768-5.766.001-3.18-2.585-5.768-5.767-5.768zm0 10.369c-.845 0-1.636-.232-2.316-.638l-.166-.098-1.718.451.459-1.674-.108-.172c-.443-.703-.677-1.503-.676-2.472.001-2.42 1.969-4.389 4.39-4.389 2.42 0 4.389 1.968 4.39 4.388-.001 2.421-1.97 4.39-4.39 4.39zm2.408-3.287c-.132-.066-.782-.386-.903-.43-.121-.044-.209-.066-.297.066-.088.132-.341.43-.418.518-.077.088-.154.099-.286.033-.132-.066-.557-.205-1.061-.655-.392-.35-.657-.783-.734-.915-.077-.132-.008-.204.058-.269.059-.059.132-.154.198-.231.066-.077.088-.132.132-.22.044-.088.022-.165-.011-.231-.033-.066-.297-.715-.407-.98-.107-.258-.216-.223-.297-.227l-.253-.004c-.088 0-.231.033-.352.165s-.462.451-.462 1.101.473 1.277.539 1.365c.066.088.931 1.421 2.256 1.993.315.136.561.217.753.278.317.101.605.087.833.053.254-.038.782-.32.892-.628.11-.308.11-.572.077-.628-.033-.055-.121-.088-.253-.154z" />
                    </svg>
                    Message us on WhatsApp
                  </a>
                </div>

                {/* Google My Business Review link on Thank You Screen */}
                <a
                  href="https://share.google/FsBhu4gvLNjihBZur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl border border-gray-200/90 bg-gray-50/70 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 block group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1a1f2e]">Kreditfin</span>
                        <span className="text-[11px] text-gray-500">· Google Business</span>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-600">Rated 4.9/5 · Read verified customer reviews</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#4caf50] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    <span>Reviews</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>

                <div className="pt-2 text-center sm:text-left">
                  <a
                    href="https://kreditfin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-[#1a1f2e] underline underline-offset-4 decoration-gray-300 font-normal transition-colors"
                  >
                    kreditfin.com
                  </a>
                </div>
              </div>
            ) : (
              /* Multi-step Form Flow */
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company_website}
                  onChange={e => setFormData(prev => ({ ...prev, company_website: e.target.value }))}
                  className="sr-only absolute opacity-0 pointer-events-none -z-10 h-0 w-0"
                  aria-hidden="true"
                />

                <div className="space-y-6">
                  {/* Step Header: Counter, Percentage, Thin Progress Bar, Back Button */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                      <div className="flex items-center gap-3">
                        {step > 1 && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-1 text-gray-600 hover:text-[#1a1f2e] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] rounded-sm py-0.5 px-1 -ml-1"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Back
                          </button>
                        )}
                        <span>Step {step} of 5</span>
                      </div>
                      <span className="text-[#4caf50] font-bold">{progressPercent}%</span>
                    </div>

                    {/* Thin animated progress bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4caf50] transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* STEP 1: What are you looking for? */}
                  {step === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2e]">
                          What are you looking for?
                        </h2>
                        <p className="text-sm text-gray-500 font-normal">
                          Select the loan option that fits your situation.
                        </p>
                      </div>

                      <div className="space-y-3" role="radiogroup" aria-label="What are you looking for?">
                        {OPTIONS.products.map(productOption => {
                          const isSelected = formData.product === productOption;
                          return (
                            <div
                              key={productOption}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              onClick={() => handleSelectProduct(productOption)}
                              onKeyDown={e => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSelectProduct(productOption);
                                }
                              }}
                              className={`w-full min-h-[52px] py-3.5 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                isSelected
                                  ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                  : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                              }`}
                            >
                              <span className="text-base font-semibold leading-none select-none">
                                {productOption}
                              </span>

                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-[#4caf50] border-[#4caf50]'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: How do you earn? */}
                  {step === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* Employment Type */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2e]">
                            How do you earn?
                          </h2>
                          <p className="text-sm text-gray-500 font-normal">
                            Choose your primary income source.
                          </p>
                        </div>

                        <div className="space-y-2.5" role="radiogroup" aria-label="How do you earn?">
                          {OPTIONS.employmentTypes.map(empOption => {
                            const isSelected = formData.employment === empOption;
                            return (
                              <div
                                key={empOption}
                                role="radio"
                                aria-checked={isSelected}
                                tabIndex={0}
                                onClick={() => handleSelectEmployment(empOption)}
                                onKeyDown={e => {
                                  if (e.key === ' ' || e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSelectEmployment(empOption);
                                  }
                                }}
                                className={`w-full min-h-[50px] py-3 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                  isSelected
                                    ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                    : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                                }`}
                              >
                                <span className="text-base font-semibold leading-none select-none">
                                  {empOption}
                                </span>
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? 'bg-[#4caf50] border-[#4caf50]'
                                      : 'border-gray-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Second Group: Monthly in-hand salary OR Annual business turnover */}
                      {formData.employment === 'Salaried' && (
                        <div className="space-y-3 pt-3 border-t border-gray-100 animate-fadeIn">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-[#1a1f2e]">
                              Your monthly in-hand salary
                            </h3>
                            <p className="text-xs text-gray-500 italic">
                              The amount that actually credits to your bank account.
                            </p>
                          </div>

                          <div className="space-y-2" role="radiogroup" aria-label="Monthly in-hand salary">
                            {OPTIONS.salaryBands.map(salOption => {
                              const isSelected = formData.salary_band === salOption;
                              return (
                                <div
                                  key={salOption}
                                  role="radio"
                                  aria-checked={isSelected}
                                  tabIndex={0}
                                  onClick={() => setFormData(prev => ({ ...prev, salary_band: salOption }))}
                                  onKeyDown={e => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                      e.preventDefault();
                                      setFormData(prev => ({ ...prev, salary_band: salOption }));
                                    }
                                  }}
                                  className={`w-full min-h-[48px] py-2.5 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                    isSelected
                                      ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                      : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                                  }`}
                                >
                                  <span className="text-sm font-medium leading-none select-none">
                                    {salOption}
                                  </span>
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected
                                        ? 'bg-[#4caf50] border-[#4caf50]'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                  >
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {formData.employment === 'Self-Employed' && (
                        <div className="space-y-3 pt-3 border-t border-gray-100 animate-fadeIn">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-[#1a1f2e]">
                              Your annual business turnover
                            </h3>
                          </div>

                          <div className="space-y-2" role="radiogroup" aria-label="Annual business turnover">
                            {OPTIONS.turnoverBands.map(turnOption => {
                              const isSelected = formData.turnover_band === turnOption;
                              return (
                                <div
                                  key={turnOption}
                                  role="radio"
                                  aria-checked={isSelected}
                                  tabIndex={0}
                                  onClick={() => setFormData(prev => ({ ...prev, turnover_band: turnOption }))}
                                  onKeyDown={e => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                      e.preventDefault();
                                      setFormData(prev => ({ ...prev, turnover_band: turnOption }));
                                    }
                                  }}
                                  className={`w-full min-h-[48px] py-2.5 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                    isSelected
                                      ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                      : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                                  }`}
                                >
                                  <span className="text-sm font-medium leading-none select-none">
                                    {turnOption}
                                  </span>
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected
                                        ? 'bg-[#4caf50] border-[#4caf50]'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                  >
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: Loan Amount */}
                  {step === 3 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2e]">
                          {formData.product === 'Personal Loan'
                            ? 'How much do you need?'
                            : 'How much do you need against your property?'}
                        </h2>
                        <p className="text-xs text-gray-500 italic">
                          If you&apos;re consolidating, add up everything you want cleared.
                        </p>
                      </div>

                      <div className="space-y-2.5" role="radiogroup" aria-label="Loan amount">
                        {(formData.product === 'Personal Loan'
                          ? OPTIONS.loanBandsPL
                          : OPTIONS.loanBandsLAP
                        ).map(bandOption => {
                          const isSelected =
                            formData.product === 'Personal Loan'
                              ? formData.loan_band_pl === bandOption
                              : formData.loan_band_lap === bandOption;

                          return (
                            <div
                              key={bandOption}
                              role="radio"
                              aria-checked={isSelected}
                              tabIndex={0}
                              onClick={() => {
                                if (formData.product === 'Personal Loan') {
                                  setFormData(prev => ({ ...prev, loan_band_pl: bandOption }));
                                } else {
                                  setFormData(prev => ({ ...prev, loan_band_lap: bandOption }));
                                }
                              }}
                              onKeyDown={e => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault();
                                  if (formData.product === 'Personal Loan') {
                                    setFormData(prev => ({ ...prev, loan_band_pl: bandOption }));
                                  } else {
                                    setFormData(prev => ({ ...prev, loan_band_lap: bandOption }));
                                  }
                                }
                              }}
                              className={`w-full min-h-[50px] py-3 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                isSelected
                                  ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                  : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                              }`}
                            >
                              <span className="text-base font-semibold leading-none select-none">
                                {bandOption}
                              </span>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                  isSelected
                                    ? 'bg-[#4caf50] border-[#4caf50]'
                                    : 'border-gray-300 bg-white'
                                }`}
                              >
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Credit and property */}
                  {step === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      {/* CIBIL Score Group */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2e]">
                            Your CIBIL score
                          </h2>
                          <p className="text-xs text-gray-500 italic">
                            A rough idea is fine. Pick &quot;Not sure&quot; if you haven&apos;t checked recently.
                          </p>
                        </div>

                        <div className="space-y-2" role="radiogroup" aria-label="Your CIBIL score">
                          {OPTIONS.cibilBands.map(cibilOption => {
                            const isSelected = formData.cibil_band === cibilOption;
                            return (
                              <div
                                key={cibilOption}
                                role="radio"
                                aria-checked={isSelected}
                                tabIndex={0}
                                onClick={() => setFormData(prev => ({ ...prev, cibil_band: cibilOption }))}
                                onKeyDown={e => {
                                  if (e.key === ' ' || e.key === 'Enter') {
                                    e.preventDefault();
                                    setFormData(prev => ({ ...prev, cibil_band: cibilOption }));
                                  }
                                }}
                                className={`w-full min-h-[48px] py-2.5 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                  isSelected
                                    ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                    : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                                }`}
                              >
                                <span className="text-sm font-semibold leading-none select-none">
                                  {cibilOption}
                                </span>
                                <div
                                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? 'bg-[#4caf50] border-[#4caf50]'
                                      : 'border-gray-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Soft green-tinted reassurance strip directly beneath the six options */}
                        <div className="p-3.5 rounded-xl bg-[rgba(76,175,80,0.08)] flex items-start gap-2.5 text-xs text-[#1a1f2e] leading-snug">
                          <svg
                            className="w-4 h-4 text-[#4caf50] shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                          </svg>
                          <p>
                            <strong className="font-bold text-[#1a1f2e]">No impact on your CIBIL score.</strong>{' '}
                            We don&apos;t run a credit check on this page — you&apos;re telling us, we&apos;re not looking it up.
                          </p>
                        </div>
                      </div>

                      {/* Second group: Only if Loan Against Property was chosen */}
                      {formData.product === 'Loan Against Property' && (
                        <div className="space-y-3 pt-4 border-t border-gray-100 animate-fadeIn">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-[#1a1f2e]">
                              Do you own a property?
                            </h3>
                            <p className="text-xs text-gray-500 italic">
                              Residential or commercial. This decides how much you can raise.
                            </p>
                          </div>

                          <div className="space-y-2" role="radiogroup" aria-label="Do you own a property?">
                            {OPTIONS.propertyOwnership.map(propOption => {
                              const isSelected = formData.property === propOption;
                              return (
                                <div
                                  key={propOption}
                                  role="radio"
                                  aria-checked={isSelected}
                                  tabIndex={0}
                                  onClick={() => setFormData(prev => ({ ...prev, property: propOption }))}
                                  onKeyDown={e => {
                                    if (e.key === ' ' || e.key === 'Enter') {
                                      e.preventDefault();
                                      setFormData(prev => ({ ...prev, property: propOption }));
                                    }
                                  }}
                                  className={`w-full min-h-[48px] py-2.5 px-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] ${
                                    isSelected
                                      ? 'border-[#4caf50] bg-[rgba(76,175,80,0.05)] text-[#1a1f2e] ring-1 ring-[#4caf50]'
                                      : 'border-gray-200 hover:border-gray-300 bg-white text-[#1a1f2e]'
                                  }`}
                                >
                                  <span className="text-sm font-semibold leading-none select-none">
                                    {propOption}
                                  </span>
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected
                                        ? 'bg-[#4caf50] border-[#4caf50]'
                                        : 'border-gray-300 bg-white'
                                    }`}
                                  >
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 5: Contact details */}
                  {step === 5 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="space-y-1">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1f2e]">
                          Where should we reach you?
                        </h2>
                        <p className="text-sm text-gray-500 font-normal">
                          We&apos;ll call once. No spam, no automated calls.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="full_name" className="block text-xs font-semibold text-[#1a1f2e]">
                            Full name
                          </label>
                          <input
                            id="full_name"
                            type="text"
                            value={formData.full_name}
                            onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                            placeholder="As per your PAN card"
                            className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-200 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50] outline-none transition-all placeholder:text-gray-400 text-[#1a1f2e] bg-white"
                          />
                        </div>

                        {/* WhatsApp Number with Fixed +91 */}
                        <div className="space-y-1.5">
                          <label htmlFor="whatsapp_number" className="block text-xs font-semibold text-[#1a1f2e]">
                            WhatsApp number
                          </label>
                          <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#4caf50] focus-within:ring-1 focus-within:ring-[#4caf50] transition-all bg-white">
                            <span className="px-3.5 py-3 bg-[#f9fafc] border-r border-gray-200 text-sm font-semibold text-[#1a1f2e] select-none flex items-center shrink-0">
                              +91
                            </span>
                            <input
                              id="whatsapp_number"
                              type="tel"
                              inputMode="numeric"
                              maxLength={10}
                              value={formData.whatsapp_number}
                              onChange={e => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setFormData(prev => ({ ...prev, whatsapp_number: val }));
                              }}
                              placeholder="98765 43210"
                              className="w-full px-3.5 py-3 text-sm outline-none text-[#1a1f2e] placeholder:text-gray-400 bg-white"
                            />
                          </div>

                          {/* Validation rule 4: Number starting with 6-9 */}
                          {isPhone10Digits && !isPhoneStartingValid && (
                            <div role="alert" className="text-xs text-[#c0392b] font-medium pt-0.5">
                              Indian mobile numbers start with 6, 7, 8 or 9.
                            </div>
                          )}

                          {/* Rule 3: Phone echo-back */}
                          {isPhoneValid && (
                            <div className="text-xs text-gray-600 font-medium pt-0.5">
                              We&apos;ll call you on +91 {formData.whatsapp_number.slice(0, 5)}{' '}
                              {formData.whatsapp_number.slice(5)} — correct?
                            </div>
                          )}
                        </div>

                        {/* Pincode and Employer side by side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {/* Pincode */}
                          <div className="space-y-1.5">
                            <label htmlFor="pincode" className="block text-xs font-semibold text-[#1a1f2e]">
                              Pincode
                            </label>
                            <input
                              id="pincode"
                              type="text"
                              inputMode="numeric"
                              maxLength={6}
                              value={formData.pincode}
                              onChange={e => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setFormData(prev => ({ ...prev, pincode: val, city: val.length < 6 ? '' : prev.city }));
                                if (val.length < 6) setResolvedCity('');
                              }}
                              placeholder="110001"
                              className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-200 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50] outline-none transition-all placeholder:text-gray-400 text-[#1a1f2e] bg-white"
                            />
                            {/* District, State resolution */}
                            {resolvedCity && (
                              <div className="text-xs text-gray-500 font-normal truncate">
                                {resolvedCity}
                              </div>
                            )}
                            {isLookingUpPin && !resolvedCity && (
                              <div className="text-xs text-gray-400 font-normal">
                                Verifying pincode...
                              </div>
                            )}
                          </div>

                          {/* Employer */}
                          <div className="space-y-1.5">
                            <label htmlFor="employer" className="block text-xs font-semibold text-[#1a1f2e]">
                              {formData.employment === 'Self-Employed' ? 'Business name' : 'Employer'}
                            </label>
                            <input
                              id="employer"
                              type="text"
                              value={formData.employer}
                              onChange={e => setFormData(prev => ({ ...prev, employer: e.target.value }))}
                              placeholder={
                                formData.employment === 'Self-Employed'
                                  ? 'Registered firm name'
                                  : 'Company name'
                              }
                              className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-200 focus:border-[#4caf50] focus:ring-1 focus:ring-[#4caf50] outline-none transition-all placeholder:text-gray-400 text-[#1a1f2e] bg-white"
                            />
                          </div>
                        </div>



                        {/* Best time to call — optional chips */}
                        <div className="space-y-2">
                          <label className="block text-xs font-semibold text-[#1a1f2e]">
                            Best time to call <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {OPTIONS.bestTimes.map(timeOpt => {
                              const isSelected = formData.best_time === timeOpt;
                              return (
                                <button
                                  key={timeOpt}
                                  type="button"
                                  onClick={() =>
                                    setFormData(prev => ({
                                      ...prev,
                                      best_time: prev.best_time === timeOpt ? '' : timeOpt,
                                    }))
                                  }
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4caf50] whitespace-nowrap ${
                                    isSelected
                                      ? 'bg-[#4caf50] text-white border border-[#4caf50]'
                                      : 'bg-[#f9fafc] text-gray-700 hover:bg-gray-100 border border-gray-200'
                                  }`}
                                >
                                  {timeOpt}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Consent Checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={formData.consent}
                              onChange={e => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                              className="mt-1 w-4 h-4 rounded border-gray-300 text-[#4caf50] focus:ring-[#4caf50] shrink-0"
                            />
                            <span className="text-xs text-gray-600 font-normal leading-relaxed">
                              I authorise KreditFin (AS Fintech Private Limited) and its partner banks and NBFCs to contact me by call, SMS, email or WhatsApp about this enquiry, and I accept the Privacy Policy. This overrides my DNC/NDNC registration.
                            </span>
                          </label>
                        </div>

                        {/* Security Badges List */}
                        <div className="pt-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-700">
                              <svg className="w-3.5 h-3.5 text-[#4caf50] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                              <span>256-bit SSL</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-700">
                              <svg className="w-3.5 h-3.5 text-[#4caf50] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                              </svg>
                              <span>Data Encrypted</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-700">
                              <svg className="w-3.5 h-3.5 text-[#4caf50] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 2 7h20L12 2z"></path>
                              </svg>
                              <span>RBI-Regulated Partners</span>
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200/80 text-[11px] font-medium text-gray-700">
                              <svg className="w-3.5 h-3.5 text-[#4caf50] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                              </svg>
                              <span>100% Confidential</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions & Disclaimers */}
                <div className="space-y-3 pt-5 border-t border-gray-100">
                  {/* Continue / Submit Button */}
                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        (step === 1 && !isStep1Valid) ||
                        (step === 2 && !isStep2Valid) ||
                        (step === 3 && !isStep3Valid) ||
                        (step === 4 && !isStep4Valid)
                      }
                      className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all text-white shadow-sm flex items-center justify-center gap-2 ${
                        (step === 1 && !isStep1Valid) ||
                        (step === 2 && !isStep2Valid) ||
                        (step === 3 && !isStep3Valid) ||
                        (step === 4 && !isStep4Valid)
                          ? 'bg-gray-300 cursor-not-allowed opacity-70'
                          : 'bg-[#4caf50] hover:bg-[#43a047] active:scale-[0.99] cursor-pointer'
                      }`}
                    >
                      Continue
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={!isStep5Valid || isSending}
                        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all text-white shadow-sm flex items-center justify-center gap-2 ${
                          !isStep5Valid || isSending
                            ? 'bg-gray-300 cursor-not-allowed opacity-70'
                            : 'bg-[#4caf50] hover:bg-[#43a047] active:scale-[0.99] cursor-pointer'
                        }`}
                      >
                        {isSending ? 'Sending\u2026' : 'Submit enquiry'}
                      </button>

                      {submitError && (
                        <p role="alert" className="text-xs text-[#c0392b] font-medium text-center">
                          {submitError}
                        </p>
                      )}

                      {/* Directly under the submit button on step 5 only */}
                      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
                        <svg
                          className="w-3.5 h-3.5 text-[#4caf50]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span>No CIBIL impact · Takes 60 seconds</span>
                      </div>
                    </div>
                  )}

                  {/* Google My Business Review Social Proof — Always visible on all steps */}
                  <a
                    href="https://share.google/FsBhu4gvLNjihBZur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50/90 via-white to-gray-50/50 hover:border-gray-300 hover:shadow-xs transition-all flex items-center justify-between gap-3 block group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          />
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-[#1a1f2e]">Kreditfin</span>
                          <span className="text-[11px] text-gray-500">· Google Business</span>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-600 font-normal">
                          Rated 4.9/5 by borrowers · Read verified reviews
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#4caf50] group-hover:translate-x-0.5 transition-transform shrink-0">
                      <span>Reviews</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>

                  {/* Footer disclaimer on every step */}
                  <p className="text-[11px] text-gray-400 font-normal leading-normal text-center sm:text-left pt-1">
                    KreditFin is a DSA and referral partner of RBI-regulated banks and NBFCs. We do not lend. Approval, final interest rate and tenure are decided by the lender. A longer tenure lowers your monthly outflow but can increase the total interest you pay.
                  </p>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
