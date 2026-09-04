"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedPartners from "@/components/TrustedPartners";
import FAQSection from "@/components/FAQSection";
import LeadForm from "@/components/LeadForm";

/* ---------- shared bits ---------- */

function CometCTA() {
  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] text-center">
        <div className="flex items-center gap-3 sm:gap-6 mb-8">
          <div className="flex-1 flex items-center">
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to right, rgba(41,182,246,0), #29B6F6)" }} />
            <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
          </div>
          <p className="text-[16px] sm:text-[24px] font-semibold text-[#1a1f2e] leading-[22px] sm:leading-[32px] text-center sm:whitespace-nowrap">
            No complexity. Just finance experts. Talk now.
          </p>
          <div className="flex-1 flex items-center">
            <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
            <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to left, rgba(41,182,246,0), #29B6F6)" }} />
          </div>
        </div>
        <Link href="/contact" className="inline-flex items-center gap-3 bg-[#4caf50] text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-[16px] sm:text-[18px] font-semibold hover:bg-[#43a047] transition-colors">
          Talk to Our Experts
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 6h18M13 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
    </section>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center mb-10 sm:mb-12 max-w-[1145px] mx-auto">
      <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">{title}</h2>
      <p className="text-[14px] sm:text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[24px] sm:leading-[28px]">{sub}</p>
    </div>
  );
}

/* ---------- data ---------- */

const stats = [
  { value: "₹3,200 Cr+", label: "Debt Managed" },
  { value: "20,000+", label: "Account Closed" },
  { value: "20L+", label: "Customers Counselled" },
  { value: "4.7/5", label: "3,000+ Reviews" },
];

const statIcons = [
  // people / customers
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // wallet (accounts)
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // map pin (counselled / location)
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" stroke="#4caf50" strokeWidth="1.6" /></svg>,
  // user (reviews)
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
];

const whyCards = [
  { title: "Higher Loan Eligibility", desc: "Get access to higher funding amounts based on your property's market value." },
  { title: "Low Interest", desc: "Benefit from attractive interest rates compared to other unsecured financing." },
  { title: "Flexible Repayment", desc: "Choose repayment tenures that align with your financial goals and cash flow." },
  { title: "Dedicated Support", desc: "Expert assistance throughout your loan against property journey." },
];

const whyIcons = [
  // higher loan eligibility (trending up)
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 7-7M21 8v5M21 8h-5" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // low interest (percent down)
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M19 5L5 19M8.5 8.5a2 2 0 11-4 0 2 2 0 014 0zM19.5 15.5a2 2 0 11-4 0 2 2 0 014 0z" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // flexible repayment (calendar/refresh)
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 11-3-6.7M21 4v5h-5" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // support (headset)
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M4 13v-1a8 8 0 0116 0v1M4 13a2 2 0 012 2v2a2 2 0 01-4 0v-2a2 2 0 012-2zM20 13a2 2 0 00-2 2v2a2 2 0 004 0v-2a2 2 0 00-2-2zM18 17a6 4 0 01-6 4" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
];

const beforeRows = ["Lengthy Approval Process", "Limited Comparison Options", "Multiple Branch Visits", "Complex Documentation"];
const afterRows = ["Faster Loan Processing", "Unified Due Dates", "Dedicated Support", "Simplified Documentation"];

// one icon per row (shared between Before/After, recoloured per side)
const rowIconPaths = [
  "M12 8v4l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // clock / process speed
  "M3 6h13M3 12h9M3 18h13M18 9l3 3-3 3", // compare / options
  "M9 21V9l6-4 6 4v12M3 21h18M9 21v-6h6v6", // building / branch
  "M9 12h6M9 16h6M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V7l-5-5zM14 2v5h5", // document
];

function RowIcon({ i, color }: { i: number; color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d={rowIconPaths[i]} stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tips = [
  "Maintain a Good Credit Score",
  "Keep Property Documents Updated",
  "Declare Accurate Income Details",
  "Apply For The Right Loan Amount",
  "Maintain Stable Banking Records",
  "Reduce Existing Debt Obligations",
];

const quickSteps = [
  { title: "Share Your Loan Details", desc: "Provide property information and funding needs for eligibility assessment." },
  { title: "Compare The Best Offers", desc: "Evaluate multiple lender options with competitive rates and terms." },
  { title: "Get Your Loan Disbursed", desc: "Complete verification and get funds disbursed to your account." },
];

const faqs = [
  {
    question: "What is Loan Against Property?",
    answer:
      "A Loan Against Property (LAP) lets you borrow funds by pledging your residential or commercial property as collateral, while continuing to own and use it.",
  },
  {
    question: "How much loan can I get against my property?",
    answer:
      "Lenders typically offer 50–70% of your property's current market value as the loan amount, depending on the property type, location, and your repayment profile.",
  },
  {
    question: "What can the funds be used for?",
    answer:
      "There are no restrictions — you can use the funds for business expansion, education, medical expenses, debt consolidation, or any personal financial need.",
  },
  {
    question: "How long does the process take?",
    answer:
      "From application and property valuation to disbursement, the process usually takes 7–15 business days. Our experts help expedite approvals at every step.",
  },
  {
    question: "Will a Loan Against Property affect my property ownership?",
    answer:
      "No. You retain full ownership and use of your property throughout the loan tenure. The lender only holds it as security until the loan is fully repaid.",
  },
];

const contactOptions = [
  { title: "Call Us", sub: "Speak to a loan advisor", btn: "Call Now", value: "+91 73038 20386", href: "tel:+917303820386", icon: <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.5 0 1 .4 1 1V20c0 .5-.5 1-1 1-9.4 0-17-7.6-17-17 0-.5.5-1 1-1h3.5c.6 0 1 .5 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" fill="#4caf50" /> },
  { title: "Chat With Us", sub: "Speak to a loan advisor", btn: "Chat Now", value: "+91 73038 20386", href: "https://wa.me/917303820386?text=Hi%20KreditFin%2C%20I%27d%20like%20to%20know%20more%20about%20your%20loan%20services.", icon: <path d="M21 11.5a8.4 8.4 0 01-9 8.4 8.5 8.5 0 01-3.9-.9L3 20l1.3-3.9A8.4 8.4 0 1121 11.5z" stroke="#4caf50" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
  { title: "Locate Us", sub: "Find your nearest branch", btn: "Find a Branch", value: "", href: "https://maps.app.goo.gl/VfzMD8BbHaJmbUGS6", icon: <path d="M12 21s-7-5.6-7-11a7 7 0 1114 0c0 5.4-7 11-7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="#4caf50" strokeWidth="1.6" fill="none" strokeLinejoin="round" /> },
];

/* ---------- EMI calculator ---------- */

function fmt(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function EmiCalculator() {
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(60);

  const r = rate / 12 / 100;
  const emi = r === 0 ? amount / months : (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  const interest = total - amount;
  const principalPct = Math.round((amount / total) * 100);
  const interestPct = 100 - principalPct;

  // donut
  const C = 2 * Math.PI * 70;
  const principalDash = (principalPct / 100) * C;

  const sliders = [
    { label: "Loan Amount (₹)", value: amount, set: setAmount, min: 30000, max: 3000000, step: 5000, display: fmt(amount), minLabel: "₹30,000", maxLabel: "₹30,00,000" },
    { label: "Interest Rate ( % p.a )", value: rate, set: setRate, min: 1, max: 36, step: 0.1, display: `${rate}%`, minLabel: "1%", maxLabel: "36%" },
    { label: "Tenure ( Months )", value: months, set: setMonths, min: 6, max: 240, step: 1, display: `${months}`, minLabel: "6 Months", maxLabel: "240 Months" },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Inputs */}
          <div className="w-full lg:flex-1 rounded-[16px] border border-[rgba(26,31,46,0.1)] p-6 sm:p-8">
            <h3 className="text-[22px] font-bold text-[#1a1f2e]">Your Loan Detail</h3>
            <p className="text-[14px] text-[rgba(26,31,46,0.7)] mt-1">Adjust the value and see your EMI in real - time</p>

            <div className="flex flex-col gap-7 mt-7">
              {sliders.map((s) => {
                const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
                return (
                  <div key={s.label}>
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-medium text-[#1a1f2e]">{s.label}</span>
                      <span className="text-[15px] font-semibold text-[#1a1f2e] bg-white border border-[rgba(26,31,46,0.15)] rounded-[8px] px-3 py-1.5 min-w-[90px] text-center">{s.display}</span>
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={s.value}
                      onChange={(e) => s.set(Number(e.target.value))}
                      className="emi-slider w-full mt-3"
                      style={{ background: `linear-gradient(to right, #4caf50 ${pct}%, #e5e7eb ${pct}%)` }}
                    />
                    <div className="flex justify-between text-[12px] text-[rgba(26,31,46,0.5)] mt-1">
                      <span>{s.minLabel}</span>
                      <span>{s.maxLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA banner */}
            <div
              className="mt-8 rounded-[16px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ background: "linear-gradient(90deg, #eaf7ec 0%, #f2faf5 100%)" }}
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-bold text-[#1a1f2e] leading-[26px]">Need help with your loan?</h3>
                <p className="text-[13px] text-[rgba(26,31,46,0.65)] leading-[20px] max-w-[300px]">
                  Talk to our experts and get the lowest EMI tailored to your needs.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-6 py-3 text-[14px] font-medium hover:bg-[#43a047] transition-colors whitespace-nowrap"
              >
                Contact Us
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
                  <path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Result */}
          <div className="w-full lg:flex-1 rounded-[16px] bg-[#f6fbf6] border border-[rgba(76,175,80,0.15)] p-6 sm:p-8 flex flex-col">
            <div className="flex flex-col items-center">
              <div className="relative w-[200px] h-[200px]">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#e3f0e4" strokeWidth="24" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#4caf50" strokeWidth="24" strokeDasharray={`${principalDash} ${C}`} strokeLinecap="butt" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#ef4444" strokeWidth="24" strokeDasharray={`${C - principalDash} ${C}`} strokeDashoffset={-principalDash} strokeLinecap="butt" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[26px] font-bold text-[#1a1f2e] whitespace-nowrap">{fmt(emi)}</span>
                  <span className="text-[13px] text-[rgba(26,31,46,0.6)]">Monthly EMI</span>
                </div>
              </div>
              <div className="flex gap-5 mt-3">
                <span className="flex items-center gap-2 text-[13px] text-[#1a1f2e]"><span className="w-3 h-3 rounded-full bg-[#4caf50]" />Principal ({principalPct}%)</span>
                <span className="flex items-center gap-2 text-[13px] text-[#1a1f2e]"><span className="w-3 h-3 rounded-full bg-[#ef4444]" />Interest ({interestPct}%)</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {[
                { label: "Total Amount", value: fmt(amount) },
                { label: "Total Interest", value: fmt(interest) },
                { label: "Total Payment", value: fmt(total) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between bg-white rounded-[10px] px-4 py-3">
                  <span className="text-[14px] text-[rgba(26,31,46,0.7)]">{row.label}</span>
                  <span className="text-[16px] font-semibold text-[#1a1f2e]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function LoanAgainstPropertyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full relative overflow-hidden bg-[#fdfdfd]">
        {/* Right illustration — bleeds to the viewport right edge (desktop) */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[58%] max-w-[940px] h-full max-h-[480px]">
          <Image
            src="/assets/lap-hero-illustration.png"
            alt="Loan against property"
            fill
            priority
            sizes="56vw"
            className="object-contain object-right"
          />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-12 lg:py-0 flex flex-col lg:flex-row items-center lg:min-h-[480px]">
          <div className="flex flex-col gap-6 w-full lg:max-w-[560px] z-10">
            <h1 className="text-[30px] sm:text-[44px] lg:text-[52px] font-extrabold leading-[38px] sm:leading-[54px] lg:leading-[60px]">
              <span className="text-[#1a1f2e]">Loan Against Property</span><br />
              <span className="text-[#4caf50]">Unlock More Value</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] text-[rgba(26,31,46,0.7)] leading-[26px] sm:leading-[30px] max-w-[510px]">
              Leverage your residential or commercial property to access higher loan amounts with competitive interest rates and flexible repayment options.
            </p>
            <Link href="/emi-calculator" className="inline-flex w-fit items-center gap-3 bg-[#4caf50] text-white rounded-full px-8 py-3 text-[16px] font-medium hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.3)]">
              Check My Savings
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>

          {/* Mobile illustration (below text) */}
          <div className="lg:hidden w-full relative aspect-[1238/830] mt-6">
            <Image src="/assets/lap-hero-illustration.png" alt="Loan against property" fill priority sizes="100vw" className="object-contain" />
          </div>
        </div>
      </section>

      <TrustedPartners />

      {/* Stats band */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="grid grid-cols-2 gap-y-8 lg:flex">
            {stats.map((s, i) => (
              <div key={i} className="relative lg:flex-1 flex flex-col items-center text-center gap-2 px-2">
                <div className="w-12 h-12 rounded-[8px] bg-[rgba(76,175,80,0.1)] flex items-center justify-center">
                  {statIcons[i]}
                </div>
                <span className="text-[30px] sm:text-[40px] font-extrabold text-[#4caf50] leading-[40px]">{s.value}</span>
                <span className="text-[14px] sm:text-[16px] text-[rgba(26,31,46,0.7)]">{s.label}</span>
                {/* Divider between columns (desktop) */}
                {i < stats.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[90px] bg-[rgba(26,31,46,0.12)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is */}
      <section className="w-full bg-[#f9fafc] py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-[100px] text-center">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">What is Loan Against Property?</h2>
          <p className="text-[15px] sm:text-[18px] text-[rgba(26,31,46,0.7)] mt-4 leading-[26px] sm:leading-[30px]">
            Unlock the value of your residential or commercial property without selling it. Access substantial funds at competitive interest rates for business expansion, education, medical expenses, or personal needs. Enjoy flexible repayment options and expert guidance throughout the process.
          </p>
        </div>
      </section>

      {/* See how it works — hidden until the demo video is ready */}
      {false && (
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <SectionHead title="See How Loan Against Property Works" sub="Turn your property's value into accessible funds while keeping ownership intact." />
          <div className="relative w-full aspect-[1240/350] rounded-[16px] bg-[#eef1f4] flex items-center justify-center overflow-hidden">
            <button className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center" aria-label="Play">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none"><path d="M2 2l16 10L2 22V2z" fill="#4caf50" /></svg>
            </button>
          </div>
        </div>
      </section>
      )}

      <CometCTA />

      {/* Why Choose */}
      <section className="w-full bg-[#f9fafc] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <SectionHead title="Why Choose Kreditfin for Loan Against Property" sub="We combine creative thinking with data-driven strategies to deliver results that matter for your financial journey." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCards.map((c, i) => (
              <div key={i} className="bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] p-6 flex flex-col gap-4 hover:border-[#4caf50] hover:shadow-[0_4px_24px_rgba(76,175,80,0.12)] transition-all">
                <div className="w-16 h-16 rounded-[12px] bg-[rgba(76,175,80,0.1)] flex items-center justify-center">{whyIcons[i]}</div>
                <h3 className="text-[18px] font-semibold text-[#1a1f2e] leading-[26px]">{c.title}</h3>
                <p className="text-[14px] text-[rgba(26,31,46,0.7)] leading-[22px]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <EmiCalculator />

      {/* What Makes Us Better — Before / After */}
      <section className="w-full bg-[#f9fafc] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <SectionHead title="What Make's Us Better" sub="Reach out to us through the contact details below" />
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
            {/* Before */}
            <div className="w-full lg:w-[400px] rounded-[16px] bg-white border border-[rgba(26,31,46,0.06)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-6">
              <div className="flex items-center gap-2 bg-[#fdeeee] rounded-[10px] px-4 py-3 mb-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#ef4444" strokeWidth="1.6" /><path d="M9.5 9.5a2.5 2.5 0 013.5-.4c1 .8 1 2 0 2.6-.6.4-1 .8-1 1.5M12 16.5v.2" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[18px] font-semibold text-[#1a1f2e]">Before Kreditfin</span>
              </div>
              {beforeRows.map((row, i) => (
                <div key={row} className={`flex items-center gap-3 py-4 ${i < beforeRows.length - 1 ? "border-b border-[rgba(26,31,46,0.08)]" : ""}`}>
                  <span className="w-10 h-10 rounded-[8px] bg-[#fdeeee] flex items-center justify-center shrink-0">
                    <RowIcon i={i} color="#ef4444" />
                  </span>
                  <span className="text-[16px] font-medium text-[#1a1f2e]">{row}</span>
                </div>
              ))}
            </div>

            {/* Center connector with logo badge (desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-[440px] self-center px-2">
              {/* left dashed arrow (red) */}
              <span className="arrow-flow flex-1 h-[3px]" style={{ backgroundImage: "repeating-linear-gradient(to right, #ef4444 0 7px, transparent 7px 14px)" }} />
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="chevron-nudge mx-2 shrink-0">
                <path d="M4 5l7 7-7 7M13 5l7 7-7 7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* badge */}
              <div className="w-[120px] h-[120px] rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center shrink-0">
                <Image src="/assets/logo-mobile.png" alt="Kreditfin" width={80} height={76} unoptimized className="w-[70px] h-auto object-contain" />
              </div>
              {/* right dashed arrow (green) */}
              <span className="arrow-flow flex-1 h-[3px] ml-2" style={{ backgroundImage: "repeating-linear-gradient(to right, #4caf50 0 7px, transparent 7px 14px)" }} />
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="chevron-nudge ml-2 shrink-0">
                <path d="M4 5l7 7-7 7M13 5l7 7-7 7" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Center badge (mobile, between stacked cards) */}
            <div className="lg:hidden flex justify-center -my-4 z-10">
              <div className="w-[88px] h-[88px] rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center">
                <Image src="/assets/logo-mobile.png" alt="Kreditfin" width={64} height={60} unoptimized className="w-[54px] h-auto object-contain" />
              </div>
            </div>

            {/* After */}
            <div className="w-full lg:w-[400px] rounded-[16px] bg-white border border-[rgba(76,175,80,0.2)] shadow-[0_4px_24px_rgba(76,175,80,0.08)] p-6">
              <div className="flex items-center gap-2 bg-[rgba(76,175,80,0.1)] rounded-[10px] px-4 py-3 mb-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4caf50" strokeWidth="1.6" /><path d="M8 12l3 3 5-6" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="text-[18px] font-semibold text-[#1a1f2e]">After Kreditfin</span>
              </div>
              {afterRows.map((row, i) => (
                <div key={row} className={`flex items-center gap-3 py-4 ${i < afterRows.length - 1 ? "border-b border-[rgba(76,175,80,0.12)]" : ""}`}>
                  <span className="w-10 h-10 rounded-[8px] bg-[rgba(76,175,80,0.1)] flex items-center justify-center shrink-0">
                    <RowIcon i={i} color="#4caf50" />
                  </span>
                  <span className="text-[16px] font-medium text-[#1a1f2e]">{row}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tips to get any approval */}
      <section className="w-full py-12 sm:py-16" style={{ background: "#eef7ee" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <SectionHead title="Tips to Get Any Approval" sub="Reach out to us through the contact details below" />
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left tips */}
            <div className="flex flex-col w-full lg:flex-1">
              {[tips[0], tips[2], tips[4]].map((t, i) => (
                <div key={t} className={`flex items-center gap-4 py-5 ${i < 2 ? "border-b border-[rgba(26,31,46,0.06)]" : ""}`}>
                  <span className="w-12 h-12 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-semibold text-[#1a1f2e]">{t}</span>
                </div>
              ))}
            </div>

            {/* Center image */}
            <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full bg-[#f4f8fa] flex items-center justify-center shrink-0">
              <Image src="/assets/tips-center.png" alt="Loan approval checklist" width={247} height={192} unoptimized className="w-[70%] h-auto object-contain" />
            </div>

            {/* Right tips */}
            <div className="flex flex-col w-full lg:flex-1">
              {[tips[1], tips[3], tips[5]].map((t, i) => (
                <div key={t} className={`flex items-center gap-4 py-5 ${i < 2 ? "border-b border-[rgba(26,31,46,0.06)]" : ""}`}>
                  <span className="w-12 h-12 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-[16px] sm:text-[18px] font-semibold text-[#1a1f2e]">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Comet CTA — inside the same green section */}
          <div className="text-center pt-16 sm:pt-20">
            <div className="flex items-center gap-3 sm:gap-6 mb-8">
              <div className="flex-1 flex items-center">
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to right, rgba(41,182,246,0), #29B6F6)" }} />
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
              </div>
              <p className="text-[16px] sm:text-[24px] font-semibold text-[#1a1f2e] leading-[22px] sm:leading-[32px] text-center sm:whitespace-nowrap">
                No complexity. Just finance experts. Talk now.
              </p>
              <div className="flex-1 flex items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to left, rgba(41,182,246,0), #29B6F6)" }} />
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-[#4caf50] text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-[16px] sm:text-[18px] font-semibold hover:bg-[#43a047] transition-colors">
              Talk to Our Experts
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 6h18M13 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Easy & Quick steps */}
      <section className="w-full bg-[#f9fafc] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <SectionHead title="Easy & Quick Steps" sub="Whether you want to lower your EMI, improve your credit profile, or get expert guidance, we'll help you find the right path forward." />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="w-full lg:w-[483px] flex flex-col gap-5">
              {quickSteps.map((s, i) => (
                <div key={s.title} className="flex gap-4 bg-white rounded-[12px] border border-[rgba(26,31,46,0.08)] p-5">
                  <span className="w-12 h-12 rounded-full bg-[#4caf50] text-white flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[18px] font-semibold text-[#1a1f2e]">{s.title}</h3>
                    <p className="text-[14px] text-[rgba(26,31,46,0.7)] leading-[22px]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative w-full lg:flex-1 aspect-[566/377] rounded-[16px] overflow-hidden">
              <Image src="/assets/emi-steps.png" alt="Easy and quick steps" fill loading="lazy" sizes="(max-width: 1024px) 100vw, 700px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (reused) */}
      <FAQSection faqs={faqs} />

      {/* How to reach us */}
      <section className="w-full bg-[#f9fafc] py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px] text-center mb-10">How to Reach Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactOptions.map((c) => (
              <div key={c.title} className="bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] p-8 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24">{c.icon}</svg>
                </div>
                <h3 className="text-[20px] font-semibold text-[#1a1f2e]">{c.title}</h3>
                <p className="text-[14px] text-[rgba(26,31,46,0.6)]">{c.sub}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-2 bg-[#4caf50] text-white rounded-full px-6 py-2.5 text-[14px] font-medium hover:bg-[#43a047] transition-colors">{c.btn}</a>
                {c.value && <p className="text-[14px] text-[rgba(26,31,46,0.7)] mt-1">{c.value}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form — Let's Find the Right Loan Together */}
      <section className="w-full py-12 sm:py-16" style={{ background: "#eef7ee" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className="flex flex-col gap-6">
              <h2 className="text-[28px] sm:text-[40px] font-bold text-[#1a1f2e] leading-[36px] sm:leading-[48px]">
                Let&apos;s Find the Right Loan Together
              </h2>
              <p className="text-[16px] sm:text-[18px] text-[rgba(26,31,46,0.7)] leading-[28px] max-w-[545px]">
                Tell us about your financial requirements and our experts will guide you toward the most suitable loan options with complete transparency and personalized support.
              </p>
              <div className="flex flex-col gap-5 mt-2">
                {[
                  { title: "Share Your Requirements", desc: "Tell us about your loan needs, financial goals, and preferred repayment plans.", icon: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M9 13l2 2 4-4" stroke="#1a1f2e" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
                  { title: "Speak With An Expert", desc: "Our loan specialists will review details and recommend the best available options.", icon: <path d="M4 13v-1a8 8 0 0116 0v1M4 13a2 2 0 012 2v2a2 2 0 01-4 0v-2a2 2 0 012-2zM20 13a2 2 0 00-2 2v2a2 2 0 004 0v-2a2 2 0 00-2-2zM18 17a6 4 0 01-6 4" stroke="#1a1f2e" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /> },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="22" height="22" viewBox="0 0 24 24">{f.icon}</svg>
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-[18px] font-semibold text-[#1a1f2e]">{f.title}</h3>
                      <p className="text-[14px] text-[rgba(26,31,46,0.6)] leading-[20px]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form card */}
            <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0_4px_40px_rgba(0,0,0,0.06)] flex flex-col gap-5">
              <LeadForm subject="New KreditFin enquiry (Loan Against Property)" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
