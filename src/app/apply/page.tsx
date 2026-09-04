"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { submitLead } from "@/lib/submitLead";

const benefits = [
  { title: "Quick & Easy Personal Loans", desc: "Interest rates starting at 9.99%*", icon: <path d="M9 3h6a1 1 0 011 1v1h2a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h2V4a1 1 0 011-1zM8 5v1h8V5M8.5 12l2 2 4-4" /> },
  { title: "Grow Your Business", desc: "Expand with quick-approval business loans", icon: <path d="M3 21h18M5 21V7l6-4 6 4v14M9 21v-6h4v6" /> },
  { title: "Save Up to 50%", desc: "Consolidate multiple EMIs into just one", icon: <path d="M20.8 6.6a5 5 0 00-7.1 0L12 8.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 21.5l8.8-7.8a5 5 0 000-7.1z" /> },
  { title: "Overdraft, Your Way", desc: "Pay interest only on the amount you use", icon: <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .4 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /> },
];

const trustStats = [
  { value: "15,000+", label: "Customers Served" },
  { value: "5.0/5", label: "Google Reviews" },
  { value: "₹500 Cr+", label: "Loans Processed" },
  { value: "8yrs+", label: "Experience" },
];

const workProfiles = [
  { key: "salaried", label: "Salaried" },
  { key: "self-employed", label: "Self-Employed" },
];

const loanCategories = [
  {
    key: "consolidation",
    label: "Loan Consolidation",
    amountLabel: "Total Loans + Credit Card Amount Outstanding",
    amountPlaceholder: "Min amount: ₹1 Lac",
  },
  {
    key: "fresh",
    label: "Fresh Loan",
    amountLabel: "Loan Amount Required",
    amountPlaceholder: "Min amount: ₹1 Lac",
  },
  {
    key: "overdraft",
    label: "Overdraft Loan",
    amountLabel: "Overdraft Limit Required",
    amountPlaceholder: "Min amount: ₹1 Lac",
  },
  {
    key: "property",
    label: "Loan Against Property",
    amountLabel: "Loan Amount Required",
    amountPlaceholder: "Min amount: ₹1 Lac",
  },
];

const inputClass =
  "border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-2.5 lg:py-3 text-[13px] lg:text-[15px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.4)] focus:outline-none focus:border-[#4caf50] transition-colors w-full";
const labelClass = "text-[12px] lg:text-[14px] font-medium text-[#1a1f2e]";

export default function ApplyPage() {
  const [workProfile, setWorkProfile] = useState("salaried");
  const [loanCategory, setLoanCategory] = useState("consolidation");
  const activeCategory = loanCategories.find((c) => c.key === loanCategory) ?? loanCategories[0];
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const [pincode, setPincode] = useState("");
  const [pincodeLookup, setPincodeLookup] = useState<{ status: "idle" | "loading" | "found" | "not-found" | "error"; place: string }>({
    status: "idle",
    place: "",
  });

  useEffect(() => {
    const digits = pincode.trim();
    if (digits.length !== 6 || !/^\d{6}$/.test(digits)) {
      setPincodeLookup({ status: "idle", place: "" });
      return;
    }
    let cancelled = false;
    setPincodeLookup({ status: "loading", place: "" });
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${digits}`);
        const json = await res.json();
        const office = json?.[0]?.PostOffice?.[0];
        if (cancelled) return;
        if (json?.[0]?.Status === "Success" && office) {
          setPincodeLookup({ status: "found", place: `${office.District}, ${office.State}` });
        } else {
          setPincodeLookup({ status: "not-found", place: "" });
        }
      } catch {
        if (!cancelled) setPincodeLookup({ status: "error", place: "" });
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pincode]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) {
      setError("Please agree to the terms to continue.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = {
      "First Name": String(fd.get("firstName") || ""),
      "Last Name": String(fd.get("lastName") || ""),
      "Work Profile": workProfiles.find((p) => p.key === workProfile)?.label ?? "",
      "Loan Category": loanCategories.find((c) => c.key === loanCategory)?.label ?? "",
      "Pincode": pincodeLookup.status === "found" ? `${pincode} (${pincodeLookup.place})` : String(fd.get("pincode") || ""),
      "Loan Amount Required": String(fd.get("amount") || ""),
      "Net Monthly Salary": String(fd.get("salary") || ""),
      "Mobile Number": String(fd.get("mobile") || ""),
    };
    setStatus("submitting");
    setError("");
    try {
      await submitLead(data, "New KreditFin loan application");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-white flex flex-col lg:flex-row">
      {/* Left panel — hidden on mobile to keep the form single-view */}
      <div className="hidden lg:flex lg:w-[38%] xl:w-[34%] h-full bg-gradient-to-br from-[#1a1f2e] to-[#0f2818] text-white px-8 xl:px-10 py-6 flex-col overflow-y-auto">
        <Link href="/" className="inline-flex items-center gap-2 w-fit">
          <Image src="/assets/logo-mobile.png" alt="KreditFin" width={32} height={30} unoptimized className="w-7 h-auto object-contain" />
          <span className="text-[18px] font-extrabold text-white">Kreditfin</span>
        </Link>

        <h1 className="text-[22px] xl:text-[26px] font-extrabold leading-[28px] xl:leading-[34px] mt-5">
          Apply, Get Approved, Borrow — In Just a Few Steps
        </h1>

        <div className="flex flex-col gap-4 mt-5">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {b.icon}
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-[18px]">{b.title}</p>
                <p className="text-[12px] text-white/65 leading-[17px] mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-2 gap-3 rounded-[14px] bg-white/10 p-4">
            {trustStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-[16px] font-extrabold text-[#4caf50]">{s.value}</span>
                <span className="text-[10px] text-white/70 leading-[14px]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:flex-1 h-full overflow-y-auto px-5 sm:px-8 lg:px-12 xl:px-20 py-4 lg:py-6 flex flex-col lg:justify-center lg:items-center">
       <div className="w-full max-w-[640px] lg:max-w-[820px] xl:max-w-[900px]">
        {/* Mobile-only compact header (replaces the hidden left panel) */}
        <div className="lg:hidden flex items-center justify-between mb-3">
          <Link href="/" className="inline-flex items-center gap-1.5">
            <Image src="/assets/logo-mobile.png" alt="KreditFin" width={26} height={24} unoptimized className="w-6 h-auto object-contain" />
            <span className="text-[15px] font-extrabold text-[#1a1f2e]">Kreditfin</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1a1f2e]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back
          </Link>
        </div>

        <Link
          href="/"
          className="hidden lg:inline-flex w-fit items-center gap-1.5 border border-[rgba(26,31,46,0.15)] rounded-full pl-3 pr-4 py-1.5 text-[13px] font-medium text-[#1a1f2e] hover:border-[#4caf50] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </Link>

        {status !== "success" && (
          <h2 className="text-[19px] sm:text-[22px] lg:text-[26px] font-bold text-[#1a1f2e] mt-3 lg:mt-4">Enter Your Basic Details</h2>
        )}

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center text-center gap-2 flex-1">
            <span className="w-14 h-14 rounded-full bg-[rgba(76,175,80,0.12)] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="#4caf50" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <h3 className="text-[19px] font-bold text-[#1a1f2e]">Application received!</h3>
            <p className="text-[13px] text-[rgba(26,31,46,0.7)] max-w-[380px]">
              Thanks for applying. One of our loan experts will call you shortly to complete the next steps.
            </p>
            <Link href="/" className="mt-1 text-[13px] font-medium text-[#4caf50] hover:underline">
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 lg:gap-4 mt-3 lg:mt-5 w-full">
            {/* First name + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  First Name<span className="text-[#ef4444]">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter first name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Enter last name"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Work profile */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                Current Work Profile<span className="text-[#ef4444]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {workProfiles.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setWorkProfile(p.key)}
                    className={`rounded-[8px] border px-3 py-2 lg:py-3 text-[13px] lg:text-[15px] font-medium text-center transition-colors cursor-pointer ${
                      workProfile === p.key
                        ? "border-[#4caf50] text-[#4caf50] bg-[rgba(76,175,80,0.06)]"
                        : "border-[rgba(26,31,46,0.15)] text-[#1a1f2e] hover:border-[rgba(26,31,46,0.3)]"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loan category */}
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>
                Loan Category<span className="text-[#ef4444]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {loanCategories.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setLoanCategory(c.key)}
                    className={`rounded-[8px] border px-2 py-2 lg:py-3 text-[11px] sm:text-[13px] lg:text-[15px] font-medium text-center transition-colors cursor-pointer ${
                      loanCategory === c.key
                        ? "border-[#4caf50] text-[#4caf50] bg-[rgba(76,175,80,0.06)]"
                        : "border-[rgba(26,31,46,0.15)] text-[#1a1f2e] hover:border-[rgba(26,31,46,0.3)]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pincode + Amount */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Pincode<span className="text-[#ef4444]">*</span>
                </label>
                <input
                  name="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="Residential pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className={inputClass}
                />
                <div className="min-h-[15px]">
                  {pincodeLookup.status === "loading" && (
                    <span className="text-[11px] text-[rgba(26,31,46,0.5)]">Checking pincode…</span>
                  )}
                  {pincodeLookup.status === "found" && (
                    <span className="text-[11px] text-[#4caf50] font-medium">{pincodeLookup.place}</span>
                  )}
                  {pincodeLookup.status === "not-found" && (
                    <span className="text-[11px] text-[#ef4444]">Pincode not found</span>
                  )}
                  {pincodeLookup.status === "error" && (
                    <span className="text-[11px] text-[rgba(26,31,46,0.5)]">Couldn&apos;t verify pincode</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={`${labelClass} truncate`} title={activeCategory.amountLabel}>
                  {activeCategory.amountLabel}<span className="text-[#ef4444]">*</span>
                </label>
                <input
                  key={activeCategory.key}
                  name="amount"
                  type="text"
                  required
                  placeholder={activeCategory.amountPlaceholder}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Salary + Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Net Monthly Salary<span className="text-[#ef4444]">*</span>
                </label>
                <input
                  name="salary"
                  type="text"
                  required
                  placeholder="Enter salary"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>
                  Mobile Number<span className="text-[#ef4444]">*</span>
                </label>
                <input
                  name="mobile"
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  className={inputClass}
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setError("");
                }}
                className="mt-0.5 w-3.5 h-3.5 accent-[#4caf50] shrink-0"
              />
              <span className="text-[11px] text-[rgba(26,31,46,0.7)] leading-[16px]">
                By continuing, you agree to KreditFin&apos;s{" "}
                <Link href="/contact" className="text-[#4caf50] hover:underline">Credit Report Terms of Use</Link>,{" "}
                <Link href="/contact" className="text-[#4caf50] hover:underline">Terms and Conditions</Link>, and{" "}
                <Link href="/contact" className="text-[#4caf50] hover:underline">Privacy Policy</Link>, and authorize contact via Call, SMS, Email, or WhatsApp.
              </span>
            </label>

            {error && <p className="text-[12px] text-[#ef4444]">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#4caf50] text-white rounded-full py-2.5 text-[14px] font-semibold hover:bg-[#43a047] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "submitting" ? "Submitting…" : "Apply Now"}
            </button>
          </form>
        )}
       </div>
      </div>
    </main>
  );
}
