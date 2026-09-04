"use client";

import Image from "next/image";
import ContactButton from "./ContactButton";

export default function HeroSlideGhar() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#f7f7f7]"
      style={{ minHeight: "520px" }}
    >
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[120px] pt-12 pb-0 lg:py-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 lg:min-h-[520px]">
        {/* Left Content */}
        <div className="flex flex-col gap-6 w-full lg:max-w-[509px] z-10 items-center text-center lg:items-start lg:text-left">
          <h2 className="flex flex-col gap-2">
            <span className="block text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-[#1a1f2e]">
              Ghar hi bachayega
            </span>
            <span className="block text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[40px] sm:leading-[48px] lg:leading-[56px] text-[#4caf50]">
              aapka Ghar
            </span>
          </h2>

          <p className="text-[16px] sm:text-[20px] lg:text-[24px] font-normal leading-[26px] sm:leading-[32px] lg:leading-[36px] text-[#1a1f2e]">
            When multiple EMIs become a burden, your home could be the key to financial freedom.
          </p>

          <ContactButton className="flex items-center gap-2 sm:gap-3 whitespace-nowrap bg-[#4caf50] text-white rounded-full px-6 sm:px-12 py-2.5 sm:py-3 text-[14px] sm:text-[16px] font-medium hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.3)]">
            Check My Savings
            <svg width="14" height="11" viewBox="0 0 16 12" fill="none" className="shrink-0">
              <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ContactButton>
        </div>

        {/* Right Image (desktop) */}
        <div className="hidden lg:block relative w-[52%] max-w-[859px] aspect-[1329/734]">
          <Image
            src="/assets/ghar-hero-house.png"
            alt="One home, one simplified EMI"
            fill
            sizes="52vw"
            className="object-contain"
          />
        </div>

        {/* Mobile / tablet image (below text) */}
        <div className="lg:hidden w-full relative aspect-[1329/734] mt-2">
          <Image
            src="/assets/ghar-hero-house.png"
            alt="One home, one simplified EMI"
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
