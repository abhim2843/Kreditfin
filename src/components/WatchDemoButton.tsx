"use client";

import { useEffect, useRef, useState } from "react";
import VideoLightbox from "./VideoLightbox";
import { DEMO_VIDEO_ID } from "@/lib/demoVideo";

export default function WatchDemoButton({ label = "Watch Demo Video" }: { label?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(true)}
        className="group relative inline-flex w-fit items-center gap-2 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 text-[14px] sm:text-[15px] font-medium text-[#1a1f2e] whitespace-nowrap cursor-pointer transition-colors duration-300 hover:text-[#4caf50]"
      >
        {/* Animated draw-around border */}
        {w > 0 && (
          <svg className="absolute inset-0 overflow-visible pointer-events-none" width={w} height={h} aria-hidden>
            <rect
              x="1"
              y="1"
              width={w - 2}
              height={h - 2}
              rx={(h - 2) / 2}
              fill="none"
              stroke="#4caf50"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="101"
              strokeDashoffset={101}
              className="transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0]"
            />
          </svg>
        )}

        <span className="relative">{label}</span>
        <span className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#1a1f2e] flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:border-[#4caf50]">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M1 1l6 4-6 4V1z" className="fill-[#1a1f2e] transition-colors duration-300 group-hover:fill-[#4caf50]" />
          </svg>
        </span>
      </button>

      <VideoLightbox open={open} onClose={() => setOpen(false)} videoId={DEMO_VIDEO_ID} />
    </>
  );
}
