"use client";

import { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import HeroSlideGhar from "./HeroSlideGhar";

const SLIDE_COUNT = 2;
const AUTOPLAY_MS = 3000;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDE_COUNT);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        <div className="w-full shrink-0">
          <HeroSection />
        </div>
        <div className="w-full shrink-0">
          <HeroSlideGhar />
        </div>
      </div>

      {/* Prev / Next arrows (desktop) */}
      <button
        type="button"
        onClick={() => setActive((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
        aria-label="Previous slide"
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm border border-[rgba(26,31,46,0.1)] items-center justify-center hover:bg-white transition-colors shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setActive((i) => (i + 1) % SLIDE_COUNT)}
        aria-label="Next slide"
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm border border-[rgba(26,31,46,0.1)] items-center justify-center hover:bg-white transition-colors shadow-sm"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#1a1f2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              active === i ? "w-6 bg-[#4caf50]" : "w-2 bg-[rgba(26,31,46,0.25)] hover:bg-[rgba(26,31,46,0.4)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
