"use client";

import Image from "next/image";
import { useState } from "react";
import WatchDemoButton from "./WatchDemoButton";
import ApplyLoanModal from "./ApplyLoanModal";

export default function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5fdf5 0%, #f0f9ff 50%, #f9fafc 100%)",
        minHeight: "520px",
      }}
    >
      {/* Right video - bleeds to viewport right edge (desktop) */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[55%] max-w-[920px] h-full max-h-[680px] z-0">
        <video
          src="/assets/hero-demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain object-right"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] pt-12 pb-0 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 lg:min-h-[520px]">
        {/* Left Content */}
        <div className="flex flex-col gap-6 w-full lg:max-w-[520px] z-10 items-center text-center lg:items-start lg:text-left">
          {/* Trust Badge */}
          <div className="flex items-center gap-2 border border-[#4caf50] bg-gradient-to-r from-[rgba(76,175,80,0.2)] to-[rgba(76,175,80,0.1)] rounded-full px-4 py-1 w-fit">
            <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
            <span className="text-[14px] text-[#4caf50] font-normal">Trusted by 15,000+ Customers</span>
          </div>

          {/* Headline */}
          <h1 className="flex flex-col gap-2">
            <span className="block text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-[#1a1f2e]">
              One Loan. Lower EMI.
            </span>
            <span className="block text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-[#4caf50]">
              Better Life.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[16px] font-normal leading-[28px] text-[rgba(26,31,46,0.7)]">
            KreditFin helps you consolidate multiple loans into one simplified loan, with a lower interest rate
          </p>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="flex items-center gap-2 sm:gap-3 whitespace-nowrap bg-[#4caf50] text-white rounded-full px-5 sm:px-10 py-2 sm:py-3 text-[13px] sm:text-[16px] font-medium cursor-pointer hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.3)]"
            >
              Talk to experts
              <svg width="14" height="11" viewBox="0 0 16 12" fill="none" className="shrink-0">
                <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <WatchDemoButton />
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-2">
              <Image src="/assets/hero-avatar1.png" alt="User" width={28} height={28} className="rounded-full border-2 border-white w-7 h-7 object-cover" />
              <Image src="/assets/hero-avatar2.png" alt="User" width={28} height={28} className="rounded-full border-2 border-white w-7 h-7 object-cover" />
              <Image src="/assets/hero-avatar3.png" alt="User" width={28} height={28} className="rounded-full border-2 border-white w-7 h-7 object-cover" />
            </div>
            <div className="flex flex-col">
              <Image src="/assets/hero-stars.svg" alt="5 stars" width={60} height={12} className="h-3 w-[60px]" />
              <span className="text-[12px] text-[#1a1f2e] font-normal">5.0 / 5 from 67 Reviews</span>
            </div>
          </div>
        </div>

        {/* Mobile / tablet video (below text) — full-bleed, flush to next section */}
        <div className="lg:hidden -mx-4 sm:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] relative aspect-[1818/1144]">
          <video
            src="/assets/hero-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
        </div>
      </div>

      <ApplyLoanModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
