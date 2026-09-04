import Image from "next/image";

const usPoints = [
  { icon: "/assets/cmp-data.png", title: "Strategy Before Submission", desc: "Profile assessment first, lender approach second." },
  { icon: "/assets/cmp-report.png", title: "Solution-Led Approach", desc: "Focused on solving financial challenges, not selling loan products." },
  { icon: "/assets/cmp-support.png", title: "Credit & Banking Expertise", desc: "Banking professionals who understand how lending decisions are made." },
  { icon: "/assets/cmp-adaptive.png", title: "Credit Profile Protection", desc: "Structured applications designed to minimise unnecessary credit enquiries." },
];
const themPoints = [
  { title: "Multiple Applications", desc: "Apply with several lenders and wait for approval outcomes." },
  { title: "Product-First Selling", desc: "Focused on selling available loan products rather than strategy." },
  { title: "Limited Credit Insight", desc: "General loan assistance without specialist credit assessment expertise." },
  { title: "Excessive Credit Checks", desc: "Multiple lender enquiries that may impact credit standing." },
];

// 12-point seal for the VS badge
const starPoints = Array.from({ length: 24 }, (_, k) => {
  const a = ((-90 + k * 15) * Math.PI) / 180;
  const r = k % 2 === 0 ? 22 : 17;
  return `${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

export default function WhatMakesDifferentSection() {
  return (
    <section className="w-full py-16 lg:py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6fbf6 100%)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-12 max-w-[1145px] mx-auto">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[40px]">Why KreditFin is Different</h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px]">
            We don&apos;t believe in finding a lender for your file. We believe in building the right solution for your financial profile
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* VS badge (center, desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                <polygon points={starPoints} fill="#4caf50" strokeLinejoin="round" stroke="#4caf50" strokeWidth="2" />
              </svg>
              <span className="relative text-white text-[14px] font-bold">VS</span>
            </div>
          </div>

          {/* Kreditfin (left) */}
          <div className="rounded-[16px] p-5 sm:p-6 flex flex-col gap-5" style={{ background: "rgba(76,175,80,0.05)" }}>
            <Image src="/assets/logo.png" alt="Kreditfin" width={150} height={38} className="h-9 w-auto object-contain mb-1" />
            {usPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-4 rounded-[8px] bg-white p-4 sm:p-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[8px] bg-[#eaf4ed] flex items-center justify-center shrink-0">
                  <span
                    aria-hidden
                    className="block w-8 h-8"
                    style={{
                      backgroundColor: "#4caf50",
                      WebkitMaskImage: `url('${p.icon}')`, maskImage: `url('${p.icon}')`,
                      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain", maskSize: "contain",
                      WebkitMaskPosition: "center", maskPosition: "center",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{p.title}</h4>
                  <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[20px]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Other Brands (right) */}
          <div className="rounded-[16px] p-5 sm:p-6 flex flex-col gap-5" style={{ background: "rgba(26,31,46,0.03)" }}>
            <h3 className="text-[20px] sm:text-[28px] font-bold text-[#1a1f2e] leading-[28px] sm:leading-[36px] mb-1">Other Brands</h3>
            {themPoints.map((p, i) => (
              <div key={i} className="flex items-center gap-4 rounded-[8px] bg-white p-4 sm:p-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[8px] bg-[#fdeaea] flex items-center justify-center shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 7l10 10M17 7L7 17" stroke="#ff5e5e" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{p.title}</h4>
                  <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[20px]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
