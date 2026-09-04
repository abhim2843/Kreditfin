"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fmt = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");
const centerFont = (s: string) => (s.length > 14 ? 18 : s.length > 12 ? 21 : s.length > 10 ? 24 : 28);

function Slider({
  label, icon, value, min, max, step, kind, prefix, suffix, minLabel, maxLabel, onChange,
}: {
  label: string; icon: React.ReactNode; value: number; min: number; max: number; step: number;
  kind: "amount" | "rate" | "int"; prefix?: string; suffix?: string;
  minLabel: string; maxLabel: string; onChange: (v: number) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const pct = ((value - min) / (max - min)) * 100;

  const formatted = kind === "amount" ? value.toLocaleString("en-IN") : String(value);
  const display = draft ?? formatted;

  const handleInput = (raw: string) => {
    const cleaned = kind === "rate" ? raw.replace(/[^0-9.]/g, "") : raw.replace(/[^0-9]/g, "");
    setDraft(cleaned);
    const num = kind === "rate" ? parseFloat(cleaned) : parseInt(cleaned, 10);
    if (!isNaN(num)) onChange(Math.min(max, num)); // clamp upper while typing
  };
  const commit = () => {
    let num = kind === "rate" ? parseFloat(draft ?? "") : parseInt(draft ?? "", 10);
    if (isNaN(num)) num = value;
    if (kind === "rate") num = Math.round(num * 10) / 10;
    onChange(Math.min(max, Math.max(min, num)));
    setDraft(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 shrink-0 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center text-[#4caf50] text-[14px] font-semibold">{icon}</div>
          <span className="text-[16px] font-medium text-[#1a1f2e]">{label}</span>
        </div>
        <div className="self-start sm:self-auto shrink-0 flex items-center justify-center gap-0.5 min-w-[110px] rounded-[8px] bg-[rgba(76,175,80,0.1)] px-3 py-1 text-[16px] font-semibold text-[#4caf50] focus-within:ring-1 focus-within:ring-[#4caf50]">
          {prefix && <span>{prefix}</span>}
          <input
            type="text"
            inputMode={kind === "rate" ? "decimal" : "numeric"}
            value={display}
            onChange={(e) => handleInput(e.target.value)}
            onFocus={() => setDraft(String(value))}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
            className="bg-transparent outline-none text-center text-[#4caf50] font-semibold min-w-0"
            style={{ width: `${Math.max(display.length, 2)}ch` }}
            aria-label={label}
          />
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="emi-slider w-full"
        style={{ background: `linear-gradient(to right, #4caf50 ${pct}%, rgba(26,31,46,0.1) ${pct}%)` }}
      />
      <div className="flex items-center justify-between text-[14px] text-[rgba(26,31,46,0.6)]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function EmiCalculatorPage() {
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(1);
  const [tenure, setTenure] = useState(60);

  const { emi, totalInterest, totalPayment, principalPct, interestPct } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - amount;
    const principalPct = (amount / totalPayment) * 100;
    const interestPct = (totalInterest / totalPayment) * 100;
    return { emi, totalInterest, totalPayment, principalPct, interestPct };
  }, [amount, rate, tenure]);

  // donut geometry
  const R = 80, C = 2 * Math.PI * R;
  const principalLen = (principalPct / 100) * C;

  const results = [
    { icon: "≡", label: "Monthly EMI", value: fmt(emi) },
    { icon: "₹", label: "Principal Amount", value: fmt(amount) },
    { icon: "%", label: "Total Interest", value: fmt(totalInterest) },
    { icon: "↻", label: "Total Amount", value: fmt(totalPayment) },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="w-full bg-white py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[32px] font-bold text-[#1a1f2e] leading-[40px]">Calculate Your EMI</h1>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              Adjust the loan amount, interest rate, and tenure to instantly see your monthly EMI and a full breakdown of your payments.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 items-stretch">
            {/* Left — inputs */}
            <div className="w-full lg:flex-1 bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] p-5 sm:p-8 flex flex-col" style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.04)" }}>
              <h2 className="text-[20px] font-bold text-[#1a1f2e] leading-[32px]">Your Loan Detail</h2>
              <p className="text-[14px] text-[rgba(26,31,46,0.6)] mt-1 mb-8">Adjust the value and see your EMI in real - time</p>

              <div className="flex flex-col gap-10">
                <Slider
                  label="Loan Amount" icon="₹" value={amount} min={30000} max={3000000} step={10000}
                  kind="amount" prefix="₹" minLabel="₹30,000" maxLabel="₹30,00,000" onChange={setAmount}
                />
                <Slider
                  label="Interest Rate (p.a)" icon="%" value={rate} min={1} max={36} step={0.1}
                  kind="rate" suffix="%" minLabel="1%" maxLabel="36%" onChange={(v) => setRate(Math.round(v * 10) / 10)}
                />
                <Slider
                  label="Tenure (Months)" icon="⏱" value={tenure} min={6} max={240} step={1}
                  kind="int" minLabel="6 Months" maxLabel="240 Months" onChange={setTenure}
                />
              </div>

              {/* Result rows */}
              <div className="w-full flex flex-col gap-4 mt-10">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between rounded-[12px] bg-[#f7f9fb] px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center text-[#4caf50] text-[18px] font-semibold">{r.icon}</div>
                      <span className="text-[16px] font-medium text-[#1a1f2e]">{r.label}</span>
                    </div>
                    <span className="text-[18px] font-bold text-[#1a1f2e]">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — result */}
            <div className="w-full lg:flex-1 bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] p-5 sm:p-8 flex flex-col items-center justify-center gap-10" style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.04)" }}>
              {/* Donut */}
              <div className="relative w-[224px] h-[224px] mt-2">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r={R} fill="none" stroke="#29b6f6" strokeWidth="24" />
                  <circle
                    cx="100" cy="100" r={R} fill="none" stroke="#4caf50" strokeWidth="24"
                    strokeDasharray={`${principalLen} ${C - principalLen}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <span className="font-bold text-[#1a1f2e] leading-[32px] whitespace-nowrap" style={{ fontSize: centerFont(fmt(emi)) }}>{fmt(emi)}</span>
                  <span className="text-[16px] text-[rgba(26,31,46,0.6)] mt-1">Monthly EMI</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4caf50]" />
                  <span className="text-[14px] text-[#1a1f2e]">Principal ({Math.round(principalPct)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#29b6f6]" />
                  <span className="text-[14px] text-[#1a1f2e]">Interest ({Math.round(interestPct)}%)</span>
                </div>
              </div>

              {/* CTA banner (enlarged) */}
              <div
                className="w-full rounded-[20px] p-8 sm:p-10 flex flex-col items-center text-center gap-4"
                style={{ background: "linear-gradient(135deg, #eaf7ec 0%, #f2faf5 100%)" }}
              >
                <h3 className="text-[22px] sm:text-[26px] font-bold text-[#1a1f2e] leading-[32px]">
                  Need help with your loan?
                </h3>
                <p className="text-[15px] sm:text-[16px] text-[rgba(26,31,46,0.65)] leading-[24px] max-w-[360px]">
                  Talk to our experts and get the lowest EMI tailored to your needs.
                </p>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-8 py-3.5 text-[15px] font-medium hover:bg-[#43a047] transition-colors whitespace-nowrap"
                >
                  Contact Us
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
                    <path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
