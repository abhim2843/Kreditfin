import Image from "next/image";

const cards = [
  {
    bg: "/assets/way-card1.png",
    accent: "#4caf50",
    bestForBg: "rgba(76,175,80,0.1)",
    bestForBorder: "rgba(76,175,80,0.5)",
    overlay: null as string | null,
    title: "Smart Consolidation",
    desc: "Combine multiple unsecured EMIs — credit cards, personal loans, app loans — into one smarter repayment, without pledging any assets.",
    points: ["One EMI instead of many", "One due date", "A cleaner monthly budget"],
    bestFor: "Professionals who want one manageable EMI and a single due date.",
  },
  {
    bg: "/assets/way-card2.png",
    accent: "#29b6f6",
    bestForBg: "rgba(41,182,246,0.1)",
    bestForBorder: "rgba(41,182,246,0.5)",
    // strengthen the blue on the left (text area), fading toward the illustration on the right
    overlay: "linear-gradient(to right, rgba(41,182,246,0.28) 0%, rgba(41,182,246,0.12) 42%, rgba(41,182,246,0) 72%)",
    title: "Property-Backed Restructuring",
    desc: "Use the value already built into your property to close high-interest unsecured debts — and switch to long home-loan-like structures.",
    points: ["A lower rate (from 9%*)", "Tenure up to 15 years", "Significantly better cash flow"],
    bestFor: "Property owners carrying multiple high-interest loans.",
  },
];

function Check({ color }: { color: string }) {
  return (
    <span className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: color }}>
      <svg viewBox="0 0 14 14" fill="none" className="w-2 h-2 sm:w-[11px] sm:h-[11px]">
        <path d="M3 7.5L6 10.5L11 4.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function WaysToHelpSection() {
  return (
    <section className="w-full relative overflow-hidden py-16 lg:py-20 bg-white">
      {/* Grid + white radial veil background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/grid-bg.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.72) 100%)" }}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-12 max-w-[1145px] mx-auto">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[30px] sm:leading-[40px]">
            Two ways we help you bring many EMIs into one
          </h2>
          <p className="text-[14px] sm:text-[20px] font-normal text-[#4a5565] mt-3 leading-[22px] sm:leading-[32px]">
            There&apos;s no single right answer. We review your full picture and recommend the path that fits you — not the other way around.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-[16px] overflow-hidden min-h-[240px] sm:min-h-[400px] lg:min-h-[420px] shadow-[0px_2px_24px_rgba(76,175,80,0.08)]"
            >
              <Image src={card.bg} alt="" fill unoptimized className="object-cover" />
              {card.overlay && <div className="absolute inset-0 pointer-events-none" style={{ background: card.overlay }} />}

              <div className="relative h-full p-4 sm:p-8 flex flex-col">
                {/* Text — kept in the left column so it never overlaps the illustration */}
                <div className="w-[56%] sm:w-[54%] flex flex-col">
                  <h3 className="text-[15px] sm:text-[24px] font-bold text-[#1a1f2e] leading-[20px] sm:leading-[32px]">{card.title}</h3>
                  <p className="text-[9px] sm:text-[14px] font-normal text-[#4a5565] leading-[13px] sm:leading-[20px] mt-1 sm:mt-2">{card.desc}</p>

                  <div className="flex flex-col gap-1 sm:gap-2 mt-2 sm:mt-5">
                    {card.points.map((p) => (
                      <div key={p} className="flex items-center gap-1.5 sm:gap-2">
                        <Check color={card.accent} />
                        <span className="text-[9px] sm:text-[14px] font-medium text-[#1a1f2e] leading-tight">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best for — full-width block under the illustration, with breathing room */}
                <div
                  className="mt-auto pt-5 sm:pt-8 w-full"
                >
                  <div
                    className="w-full rounded-[8px] sm:rounded-[10px] border px-2.5 py-2 sm:px-4 sm:py-2.5 text-[9px] sm:text-[14px] leading-[13px] sm:leading-[20px] backdrop-blur-sm"
                    style={{ background: card.bestForBg, borderColor: card.bestForBorder }}
                  >
                    <span className="font-semibold" style={{ color: card.accent }}>Best for:</span>{" "}
                    <span className="text-[#1a1f2e]">{card.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
