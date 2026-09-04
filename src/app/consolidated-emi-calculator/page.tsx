"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WA_NUMBER = "917303820386";

type LoanType = "creditcard" | "personal" | "app" | "business" | "car" | "gold" | "other";

const TYPES: Record<LoanType, { label: string; rate: number; bg: string; fg: string; icon: string }> = {
  creditcard: { label: "Credit Card", rate: 42, bg: "#FFF4E0", fg: "#E3A32E", icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>' },
  personal: { label: "Personal Loan", rate: 16, bg: "#F1ECFD", fg: "#8B6DE0", icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>' },
  app: { label: "App / Instant Loan", rate: 24, bg: "#FDECEC", fg: "#E06666", icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/>' },
  business: { label: "Business Loan", rate: 18, bg: "#E4F5F1", fg: "#17A589", icon: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>' },
  car: { label: "Car Loan", rate: 11, bg: "#E7F3FC", fg: "#3E9AE0", icon: '<path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13"/><rect x="3" y="13" width="18" height="5" rx="1"/><circle cx="7.5" cy="18" r="1.3"/><circle cx="16.5" cy="18" r="1.3"/>' },
  gold: { label: "Gold Loan", rate: 14, bg: "#FFF4E0", fg: "#E3A32E", icon: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/>' },
  other: { label: "Other Loan", rate: 15, bg: "#EEF1F3", fg: "#64748B", icon: '<circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/>' },
};
const ORDER: LoanType[] = ["creditcard", "personal", "app", "business", "car", "gold", "other"];

const PROPERTY_TYPES = [
  { label: "Residential", hint: "Self-use", ltv: 0.7 },
  { label: "Residential", hint: "Rented", ltv: 0.65 },
  { label: "Commercial", hint: "Shop/Office", ltv: 0.6 },
  { label: "Plot", hint: "Land", ltv: 0.5 },
];

const CIBIL_BANDS = [
  { label: "780+", hint: "Best", rate: 8.75 },
  { label: "750–779", hint: "Strong", rate: 9.25 },
  { label: "700–749", hint: "Good", rate: 9.9 },
  { label: "Below 700", hint: "Let's check", rate: 11.5 },
];

type Loan = { type: LoanType; out: number; emi: number };

function digits(s: string) {
  return s.replace(/[^0-9]/g, "");
}
function toNumber(s: string) {
  const n = parseInt(digits(s) || "0", 10);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}
function inr(n: number) {
  if (!Number.isFinite(n)) n = 0;
  n = Math.round(n);
  const s = Math.abs(n).toString();
  let last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  if (rest) last3 = "," + last3;
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d)$)/g, ",") + last3;
  return n < 0 ? `-${formatted}` : formatted;
}
function words(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n >= 1e7) return `≈ ₹${(n / 1e7).toFixed(2).replace(/\.00$/, "")} crore`;
  if (n >= 1e5) return `≈ ₹${(n / 1e5).toFixed(2).replace(/\.00$/, "")} lakh`;
  return `≈ ₹${inr(n)}`;
}
function emiCalc(P: number, annual: number, years: number) {
  if (!Number.isFinite(P) || P <= 0) return 0;
  const r = annual / 12 / 100;
  const n = years * 12;
  if (n <= 0) return 0;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
function pluralize(count: number, singular: string, plural: string) {
  return count === 1 ? singular : plural;
}

export default function ConsolidatedEmiCalculatorPage() {
  const [loans, setLoans] = useState<Loan[]>([
    { type: "creditcard", out: 300000, emi: 15000 },
    { type: "personal", out: 800000, emi: 19500 },
    { type: "app", out: 500000, emi: 16800 },
  ]);
  const [propVal, setPropVal] = useState(15000000);
  const [ltv, setLtv] = useState(0.7);
  const [rateBase, setRateBase] = useState(8.75);
  const [tenure, setTenure] = useState(15);

  const result = useMemo(() => {
    const curEmi = loans.reduce((s, l) => s + l.emi, 0);
    const curOut = loans.reduce((s, l) => s + l.out, 0);

    let eff = ltv;
    const raw = propVal * ltv;
    if (raw > 7500000 && ltv > 0.65) eff = 0.65;
    const elig = Math.max(0, propVal * eff);

    let rate = rateBase;
    if (ltv <= 0.6) rate += 0.5;
    rate = Math.min(18, Math.max(8, rate));

    const sorted = [...loans].sort((a, b) => TYPES[b.type].rate - TYPES[a.type].rate);
    let used = 0;
    let consolidated = 0;
    let leftoverEmi = 0;
    let nConsolidated = 0;
    sorted.forEach((l) => {
      if (l.out > 0 && used + l.out <= elig) {
        used += l.out;
        consolidated += l.out;
        nConsolidated++;
      } else {
        leftoverEmi += l.emi;
      }
    });

    const lapEmi = emiCalc(consolidated, rate, tenure);
    const afterEmi = lapEmi + leftoverEmi;
    const save = curEmi - afterEmi;
    const activeLoanCount = loans.filter((l) => l.emi > 0 || l.out > 0).length;
    const loansWithOut = loans.filter((l) => l.out > 0).length;

    let note = "";
    if (curOut <= 0) {
      note = "Add your loan details above to see your simplified EMI and savings.";
    } else if (consolidated <= 0) {
      note = "Your property value looks too low to cover these loans. Enter the correct value, or talk to an expert about options.";
    } else if (nConsolidated < loansWithOut) {
      note = `Your property covers ₹${inr(consolidated)} of ₹${inr(curOut)}. We've combined your highest-interest loans first — the rest continues as-is. An advisor can help with the balance.`;
    } else if (save <= 0) {
      note = "On these numbers, a shorter tenure keeps your EMI similar. Increase the tenure or talk to an expert to lower your monthly outgo.";
    } else {
      note = `That's about ₹${inr(save * 12)} freed up every year. Remember: a lower EMI over ${tenure} years can mean more total interest — an advisor will help you balance EMI vs total cost.`;
    }

    const text =
      `Hi KreditFin! I used the savings calculator:\n` +
      `• Current loans: ${loans.length}, total EMI ₹${inr(curEmi)}/month\n` +
      `• Total outstanding: ₹${inr(curOut)}\n` +
      `• Property value: ₹${inr(propVal)}\n` +
      `• New simplified EMI (approx): ₹${inr(afterEmi)}/month\n` +
      (save > 0 ? `• Monthly saving (approx): ₹${inr(save)}\n` : "") +
      `Please guide me on the next steps.`;
    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    return { curEmi, curOut, elig, afterEmi, save, activeLoanCount, note, waLink };
  }, [loans, propVal, ltv, rateBase, tenure]);

  function updateLoan(i: number, patch: Partial<Loan>) {
    setLoans((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function removeLoan(i: number) {
    setLoans((prev) => prev.filter((_, idx) => idx !== i));
  }
  function addLoan() {
    setLoans((prev) => [...prev, { type: "personal", out: 0, emi: 0 }]);
  }

  return (
    <main className="min-h-screen" style={{ background: "#F6FAF7" }}>
      <Navbar />

      <section className="w-full py-12 sm:py-16">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* Hero */}
          <div className="text-center max-w-[760px] mx-auto mb-8">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: "#E9F7EC", color: "#3D9942" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#4CAF50" }} />
              Trusted by 15,000+ Customers
            </span>
            <h1 className="mt-4 font-extrabold leading-[1.08] tracking-tight text-[#1B2A3A]" style={{ fontSize: "clamp(30px,6vw,50px)" }}>
              One Loan. Lower EMI. <span style={{ color: "#4CAF50" }}>Better Life.</span>
            </h1>
            <p className="mt-3.5 text-[#4B5A67]" style={{ fontSize: "clamp(15px,2.2vw,18px)" }}>
              List your current loans, add your property, and see your one simplified EMI — and how much you could save every month.
            </p>
          </div>

          {/* Tool grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[18px]">
            {/* Left: current loans */}
            <section className="bg-white rounded-[22px] border border-[#E7ECEA]" style={{ boxShadow: "0 2px 4px rgba(27,42,58,.04), 0 14px 34px rgba(27,42,58,.07)" }}>
              <div className="flex items-center gap-3 px-[22px] pt-5">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: "#E9F7EC", color: "#4CAF50" }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#1B2A3A]">Your current loans</h2>
                  <p className="text-[13px] text-[#8A97A2] mt-0.5">Add each EMI you pay today</p>
                </div>
              </div>

              <div className="px-[22px] pb-[22px] pt-[18px]">
                {loans.map((loan, i) => {
                  const t = TYPES[loan.type];
                  return (
                    <div key={i} className="rounded-[14px] border border-[#E7ECEA] p-3 mb-3" style={{ background: "#F6FAF7" }}>
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                          style={{ background: t.bg, color: t.fg }}
                        >
                          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: t.icon }} />
                        </span>
                        <select
                          value={loan.type}
                          onChange={(e) => updateLoan(i, { type: e.target.value as LoanType })}
                          className="flex-1 font-semibold text-[14px] text-[#1B2A3A] bg-white border border-[#DDE6E1] rounded-[10px] px-2.5 py-2 cursor-pointer"
                        >
                          {ORDER.map((k) => (
                            <option key={k} value={k}>{TYPES[k].label}</option>
                          ))}
                        </select>
                        {loans.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLoan(i)}
                            aria-label="Remove"
                            className="w-[30px] h-[30px] rounded-[8px] border border-[#DDE6E1] bg-white text-[#8A97A2] hover:bg-[#FDECEC] hover:text-[#E06666] transition-colors shrink-0 text-[18px] leading-none"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8A97A2] mb-1.5">Outstanding</label>
                          <div className="relative">
                            <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#8A97A2] pointer-events-none">₹</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={loan.out ? inr(loan.out) : ""}
                              onChange={(e) => updateLoan(i, { out: toNumber(e.target.value) })}
                              className="w-full font-semibold text-[14px] text-[#1B2A3A] bg-white border border-[#DDE6E1] rounded-[10px] pl-6 pr-2.5 py-2.5 focus:outline-none focus:border-[#4CAF50] focus:ring-[3px] focus:ring-[rgba(76,175,80,.14)]"
                            />
                          </div>
                          <div className="text-[10.5px] font-medium text-[#8A97A2] mt-1 min-h-[13px]">{words(loan.out)}</div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#8A97A2] mb-1.5">Monthly EMI</label>
                          <div className="relative">
                            <span className="absolute left-[11px] top-1/2 -translate-y-1/2 text-[13px] font-semibold text-[#8A97A2] pointer-events-none">₹</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={loan.emi ? inr(loan.emi) : ""}
                              onChange={(e) => updateLoan(i, { emi: toNumber(e.target.value) })}
                              className="w-full font-semibold text-[14px] text-[#1B2A3A] bg-white border border-[#DDE6E1] rounded-[10px] pl-6 pr-2.5 py-2.5 focus:outline-none focus:border-[#4CAF50] focus:ring-[3px] focus:ring-[rgba(76,175,80,.14)]"
                            />
                          </div>
                          <div className="text-[10.5px] font-medium text-[#8A97A2] mt-1 min-h-[13px]">{words(loan.emi)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={addLoan}
                  className="w-full font-semibold text-[14px] rounded-[12px] p-3 border border-dashed transition-colors"
                  style={{ color: "#3D9942", background: "#E9F7EC", borderColor: "#4CAF50" }}
                >
                  + Add another loan
                </button>

                <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-[#E7ECEA]">
                  <span className="text-[13px] font-medium text-[#8A97A2]">Total you pay now</span>
                  <span className="text-[20px] font-bold text-[#1B2A3A]">₹{inr(result.curEmi)}<small className="text-[12px] font-medium text-[#8A97A2]"> / month</small></span>
                </div>
                <div className="flex justify-between items-baseline mt-2.5 pt-2.5 border-t border-[#E7ECEA]">
                  <span className="text-[13px] font-medium text-[#8A97A2]">Total outstanding</span>
                  <span className="text-[16px] font-bold text-[#4B5A67]">₹{inr(result.curOut)}</span>
                </div>
              </div>
            </section>

            {/* Right: property */}
            <section className="bg-white rounded-[22px] border border-[#E7ECEA]" style={{ boxShadow: "0 2px 4px rgba(27,42,58,.04), 0 14px 34px rgba(27,42,58,.07)" }}>
              <div className="flex items-center gap-3 px-[22px] pt-5">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: "#E7F3FC", color: "#3E9AE0" }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10.5L12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-[#1B2A3A]">Your property</h2>
                  <p className="text-[13px] text-[#8A97A2] mt-0.5">To back the new loan</p>
                </div>
              </div>

              <div className="px-[22px] pb-[22px] pt-[18px]">
                {/* Property value */}
                <div className="mb-4">
                  <label className="block text-[13px] font-semibold text-[#1B2A3A] mb-2">
                    Property market value <span className="font-normal text-[#8A97A2] text-[12px]">(today&apos;s value)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-[13px] top-1/2 -translate-y-1/2 font-bold text-[#8A97A2]">₹</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={inr(propVal)}
                      onChange={(e) => setPropVal(toNumber(e.target.value))}
                      className="w-full font-bold text-[17px] text-[#1B2A3A] rounded-[12px] pl-7 pr-3 py-3.5 border border-[#DDE6E1] focus:outline-none focus:border-[#3E9AE0] focus:ring-[3px] focus:ring-[rgba(62,154,224,.16)]"
                      style={{ background: "#F6FAF7" }}
                    />
                  </div>
                  <div className="text-[12px] font-semibold mt-1.5 min-h-[14px]" style={{ color: "#3E9AE0" }}>{words(propVal)}</div>
                </div>

                {/* Property type */}
                <div className="mb-4">
                  <label className="block text-[13px] font-semibold text-[#1B2A3A] mb-2">Property type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PROPERTY_TYPES.map((pt) => {
                      const active = ltv === pt.ltv;
                      return (
                        <button
                          key={pt.label + pt.hint}
                          type="button"
                          onClick={() => setLtv(pt.ltv)}
                          className="font-semibold text-[12.5px] rounded-[11px] px-1.5 py-2.5 text-center leading-tight transition-colors"
                          style={active ? { background: "#3E9AE0", borderColor: "#3E9AE0", color: "#fff", border: "1px solid #3E9AE0" } : { background: "#F6FAF7", color: "#4B5A67", border: "1px solid #DDE6E1" }}
                        >
                          {pt.label}
                          <small className="block font-medium text-[10.5px] mt-0.5" style={{ color: active ? "rgba(255,255,255,.8)" : "#8A97A2" }}>{pt.hint}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Credit score */}
                <div className="mb-4">
                  <label className="block text-[13px] font-semibold text-[#1B2A3A] mb-2">
                    Your credit score <span className="font-normal text-[#8A97A2] text-[12px]">(sets the rate)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CIBIL_BANDS.map((c) => {
                      const active = rateBase === c.rate;
                      return (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => setRateBase(c.rate)}
                          className="font-semibold text-[12.5px] rounded-[11px] px-1.5 py-2.5 text-center leading-tight transition-colors"
                          style={active ? { background: "#3E9AE0", borderColor: "#3E9AE0", color: "#fff", border: "1px solid #3E9AE0" } : { background: "#F6FAF7", color: "#4B5A67", border: "1px solid #DDE6E1" }}
                        >
                          {c.label}
                          <small className="block font-medium text-[10.5px] mt-0.5" style={{ color: active ? "rgba(255,255,255,.8)" : "#8A97A2" }}>{c.hint}</small>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tenure */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[12px] text-[#8A97A2]">Longer tenure = lower EMI</span>
                    <b className="text-[16px] font-bold" style={{ color: "#3E9AE0" }}>{tenure} years</b>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={15}
                    step={1}
                    value={tenure}
                    onChange={(e) => setTenure(+e.target.value)}
                    className="w-full mt-2.5 h-1 accent-[#3E9AE0]"
                  />
                </div>

                <div className="flex justify-between items-baseline mt-4 rounded-[12px] px-4 py-3.5" style={{ background: "#E7F3FC" }}>
                  <span className="text-[12px] font-semibold" style={{ color: "#3E9AE0" }}>You can borrow up to</span>
                  <span className="text-[19px] font-bold text-[#1B2A3A]">₹{inr(result.elig)}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Result banner */}
          <div className="mt-5 rounded-[22px] overflow-hidden" style={{ background: "linear-gradient(135deg,#4CAF50 0%,#3D9942 100%)", boxShadow: "0 10px 26px rgba(76,175,80,.28)" }}>
            <div className="p-5 sm:p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.2fr] gap-4 items-center">
                <div className="rounded-[16px] px-[18px] py-4" style={{ background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.22)" }}>
                  <div className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,.8)" }}>Now</div>
                  <div className="text-[28px] font-extrabold mt-1">₹{inr(result.curEmi)}</div>
                  <div className="text-[12.5px] mt-0.5" style={{ color: "rgba(255,255,255,.8)" }}>
                    {result.activeLoanCount} {pluralize(result.activeLoanCount, "EMI", "EMIs")} / month
                  </div>
                </div>

                <div className="flex items-center justify-center lg:rotate-0 rotate-90">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-extrabold text-[20px]" style={{ color: "#4CAF50" }}>»</div>
                </div>

                <div className="relative rounded-[16px] px-5 py-[18px] bg-white text-[#1B2A3A]">
                  <div className="absolute top-4 right-4 w-[26px] h-[26px] rounded-full flex items-center justify-center" style={{ background: "#4CAF50" }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="text-[13px] font-semibold text-[#8A97A2]">One simplified EMI</div>
                  <div className="text-[34px] font-extrabold tracking-tight mt-0.5">₹{inr(result.afterEmi)}<small className="text-[14px] font-semibold text-[#8A97A2]"> / month</small></div>
                  <div className="inline-flex items-center gap-1.5 rounded-full px-[15px] py-2.5 mt-3 font-bold text-[14px]" style={{ background: "#E9F7EC", color: "#3D9942" }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                    </svg>
                    You save ₹{inr(Math.max(0, result.save))} every month
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[12.5px] leading-[1.55] rounded-[12px] px-[15px] py-[11px]" style={{ background: "rgba(255,255,255,.1)" }}>
                {result.note}
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={result.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 font-bold text-[15px] rounded-full px-[26px] py-3.5 bg-white hover:brightness-[.97] transition-[filter]"
                  style={{ color: "#3D9942" }}
                >
                  <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.25-.1-.45-.15-.65.15-.2.3-.75.95-.9 1.15-.2.2-.35.2-.65.05-1.7-.85-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.35-.05-.5-.1-.15-.65-1.55-.9-2.15-.2-.55-.45-.5-.65-.5h-.55c-.2 0-.5.05-.75.35-.25.3-1 1-1 2.4 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.15 5 4.4 1.85.8 2.6.85 3.5.75.55-.05 1.7-.7 1.95-1.4.25-.65.25-1.25.15-1.35-.05-.15-.25-.2-.55-.35zM12 2a10 10 0 00-8.6 15.05L2 22l5.1-1.35A10 10 0 1012 2z" />
                  </svg>
                  Check My Savings on WhatsApp
                </a>
                <a
                  href={result.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 font-bold text-[15px] rounded-full px-[26px] py-3.5 text-white transition-colors"
                  style={{ background: "rgba(255,255,255,.16)", border: "1.5px solid rgba(255,255,255,.4)" }}
                >
                  Talk to an expert
                </a>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-x-[22px] gap-y-2.5 justify-center mt-6">
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#4B5A67]">
              <span style={{ color: "#4CAF50" }}>★★★★★</span> <b className="text-[#1B2A3A] font-bold">5.0 / 5</b> from 67 reviews
            </div>
            <div className="text-[13px] font-medium text-[#4B5A67]">Free consultation</div>
            <div className="text-[13px] font-medium text-[#4B5A67]">Checking this does not affect your credit score</div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11.5px] leading-[1.65] text-[#8A97A2] text-center max-w-[820px] mx-auto mt-4">
            <b className="text-[#4B5A67] font-semibold">This is an indicative estimate, not a loan offer.</b> Your actual eligibility, interest rate and EMI depend on the lender&apos;s policy, property valuation, title and your profile. The amount you can borrow follows RBI loan-to-value guidelines (up to 75% of value for loans up to ₹75 lakh, 65% above). A lower monthly EMI is often achieved through a longer tenure, which can increase the total interest paid over the full loan — an advisor can help you balance both. KreditFin acts as a loan facilitation intermediary; loans are provided by RBI-regulated banks and NBFCs, not by KreditFin directly.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
