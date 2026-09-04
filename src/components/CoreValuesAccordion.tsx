"use client";
import { useState } from "react";

const coreValues = [
  {
    title: "Understand",
    desc: "We listen before we advise.",
  },
  {
    title: "Assess",
    desc: "We analyse your profile and financial position.",
  },
  {
    title: "Strategise",
    desc: "We identify the right lender and loan structure.",
  },
  {
    title: "Execute",
    desc: "We coordinate with banks and manage the complete process.",
  },
  {
    title: "Communicate",
    desc: "Transparent updates from application to disbursement.",
  },
  {
    title: "Transform",
    desc: "Smarter debt structures. Better cash flow. Greater financial freedom.",
  },
];

export default function CoreValuesAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="w-full lg:w-[596px] lg:shrink-0 flex flex-col">
      {coreValues.map((v, i) => {
        const open = openIndex === i;
        return (
          <div key={i} className={i < coreValues.length - 1 ? "border-b border-[rgba(26,31,46,0.1)]" : ""}>
            <button
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full py-6 flex items-center justify-between text-left"
            >
              <h3 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{v.title}</h3>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Animated panel */}
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[24px] pb-6 max-w-[548px]">
                  {v.desc}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
