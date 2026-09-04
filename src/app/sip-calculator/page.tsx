"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
// shrink the donut centre value so long amounts never overflow the ring
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
    if (!isNaN(num)) onChange(Math.min(max, num));
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

export default function SipCalculatorPage() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  // Groww — SIP: M = P·([(1+i)^n − 1]/i)·(1+i) ; Lumpsum: M = P·(1 + r/100)^t
  const { invested, returns, total, investedPct, returnsPct } = useMemo(() => {
    let total: number, invested: number;
    if (mode === "sip") {
      const i = rate / 100 / 12;
      const n = years * 12;
      total = i === 0 ? amount * n : amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      invested = amount * n;
    } else {
      total = amount * Math.pow(1 + rate / 100, years);
      invested = amount;
    }
    const returns = total - invested;
    const investedPct = (invested / total) * 100;
    const returnsPct = (returns / total) * 100;
    return { invested, returns, total, investedPct, returnsPct };
  }, [amount, rate, years, mode]);

  const R = 80, C = 2 * Math.PI * R;
  const investedLen = (investedPct / 100) * C;

  const results = [
    { icon: "₹", label: "Invested Amount", value: fmt(invested) },
    { icon: "%", label: "Est. Returns", value: fmt(returns) },
    { icon: "↻", label: "Total Value", value: fmt(total) },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="w-full bg-white py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[32px] font-bold text-[#1a1f2e] leading-[40px]">Calculate Your SIP Returns</h1>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              Adjust your monthly investment, expected return, and tenure to instantly see how much your SIP can grow.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 items-stretch">
            {/* Left — inputs */}
            <div className="w-full lg:flex-1 bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] p-5 sm:p-8 flex flex-col" style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.04)" }}>
              {/* SIP / Lumpsum toggle */}
              <div className="flex items-center gap-2 bg-[#f3f5f7] rounded-full p-1 w-fit mb-6">
                {(["sip", "lumpsum"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-6 py-2 rounded-full text-[14px] font-semibold transition-colors ${
                      mode === m ? "bg-[rgba(76,175,80,0.15)] text-[#4caf50]" : "text-[rgba(26,31,46,0.6)] hover:text-[#1a1f2e]"
                    }`}
                  >
                    {m === "sip" ? "SIP" : "Lumpsum"}
                  </button>
                ))}
              </div>

              <h2 className="text-[20px] font-bold text-[#1a1f2e] leading-[32px]">Your {mode === "sip" ? "SIP" : "Lumpsum"} Detail</h2>
              <p className="text-[14px] text-[rgba(26,31,46,0.6)] mt-1 mb-8">Adjust the value and see your returns in real - time</p>

              <div className="flex flex-col gap-10">
                <Slider
                  label={mode === "sip" ? "Monthly Investment" : "Total Investment"}
                  icon="₹"
                  value={amount}
                  min={mode === "sip" ? 500 : 1000}
                  max={mode === "sip" ? 100000 : 10000000}
                  step={mode === "sip" ? 500 : 1000}
                  kind="amount" prefix="₹"
                  minLabel={mode === "sip" ? "₹500" : "₹1,000"}
                  maxLabel={mode === "sip" ? "₹1,00,000" : "₹1,00,00,000"}
                  onChange={setAmount}
                />
                <Slider
                  label="Expected Return Rate (p.a)" icon="%" value={rate} min={1} max={30} step={0.1}
                  kind="rate" suffix="%" minLabel="1%" maxLabel="30%" onChange={(v) => setRate(Math.round(v * 10) / 10)}
                />
                <Slider
                  label="Time Period (Years)" icon="⏱" value={years} min={1} max={40} step={1}
                  kind="int" suffix=" Yr" minLabel="1 Year" maxLabel="40 Years" onChange={setYears}
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
              <div className="relative w-[224px] h-[224px] mt-2">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r={R} fill="none" stroke="#29b6f6" strokeWidth="24" />
                  <circle
                    cx="100" cy="100" r={R} fill="none" stroke="#4caf50" strokeWidth="24"
                    strokeDasharray={`${investedLen} ${C - investedLen}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <span className="font-bold text-[#1a1f2e] leading-[32px] whitespace-nowrap" style={{ fontSize: centerFont(fmt(total)) }}>{fmt(total)}</span>
                  <span className="text-[16px] text-[rgba(26,31,46,0.6)] mt-1">Total Value</span>
                </div>
              </div>

              <div className="flex items-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#4caf50]" />
                  <span className="text-[14px] text-[#1a1f2e]">Invested ({Math.round(investedPct)}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#29b6f6]" />
                  <span className="text-[14px] text-[#1a1f2e]">Returns ({Math.round(returnsPct)}%)</span>
                </div>
              </div>

              {/* CTA banner (enlarged) */}
              <div
                className="w-full rounded-[20px] p-8 sm:p-10 flex flex-col items-center text-center gap-4"
                style={{ background: "linear-gradient(135deg, #eaf7ec 0%, #f2faf5 100%)" }}
              >
                <h3 className="text-[22px] sm:text-[26px] font-bold text-[#1a1f2e] leading-[32px]">Start your investment journey</h3>
                <p className="text-[15px] sm:text-[16px] text-[rgba(26,31,46,0.65)] leading-[24px] max-w-[360px]">Talk to our experts to build a plan that matches your goals.</p>
                <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-8 py-3.5 text-[15px] font-medium hover:bg-[#43a047] transition-colors whitespace-nowrap">
                  Contact Us
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0"><path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
