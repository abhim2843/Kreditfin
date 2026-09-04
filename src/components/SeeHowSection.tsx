"use client";

import Image from "next/image";
import { useState } from "react";
import VideoLightbox from "./VideoLightbox";
import { DEMO_VIDEO_ID } from "@/lib/demoVideo";

export default function SeeHowSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-10">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[40px]">
            See How KreditFin Works
          </h2>
          <p className="text-[16px] sm:text-[20px] font-normal text-[rgba(26,31,46,0.7)] mt-2 leading-[32px]">
            From 4 EMIs to 1 — in 4 steps
          </p>
        </div>

        {/* Video thumbnail */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play demo video"
          className="group relative block w-full aspect-[4960/1400] rounded-[16px] overflow-hidden bg-[#eef4f3] cursor-pointer"
        >
          <Image
            src="/assets/vido-thumbnail.png"
            alt="30 seconds to reduce EMI by 30% — watch how KreditFin works"
            fill
            sizes="(max-width: 1024px) 100vw, 1240px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {/* Hover dim for affordance (the thumbnail already includes a play button) */}
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </button>
      </div>

      <VideoLightbox open={open} onClose={() => setOpen(false)} videoId={DEMO_VIDEO_ID} />
    </section>
  );
}
