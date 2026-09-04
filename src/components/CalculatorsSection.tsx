import Image from "next/image";
import ContactButton from "./ContactButton";

const calculators = [
  {
    bgImage: "/assets/calc1-bg.png",
    iconSrc: "/assets/calc-save-icon.png",
    iconColor: "#4caf50",
    title: "How Much Can I Save?",
    description: "See how much you could reduces your monthly EMI through debt consolidation.",
    cta: "Calculate My Savings",
    ctaBg: "#4caf50",
    ctaText: "#ffffff",
  },
  {
    bgImage: "/assets/calc2-bg.png",
    iconSrc: "/assets/calc-emi-icon.png",
    iconColor: "#29b6f6",
    title: "What Will MY EMI Be?",
    description: "See how much you could reduces your monthly EMI through debt consolidation.",
    cta: "Calculate EMI",
    ctaBg: "#29b6f6",
    ctaText: "#1a1f2e",
  },
];

export default function CalculatorsSection() {
  return (
    <section className="w-full pt-16 pb-8 sm:py-20" style={{ background: "linear-gradient(180deg, #f5f9f5 0%, #ffffff 100%)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-12">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
            Financial Calculators
          </h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px]">
            Choose the calculator that matches your goal and make smarter financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {calculators.map((calc, index) => (
            <div
              key={index}
              className="relative aspect-[343/194] lg:aspect-auto lg:h-[338px] rounded-[16px] overflow-hidden"
              style={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.15)" }}
            >
              {/* Background illustration */}
              <Image
                src={calc.bgImage}
                alt=""
                fill
                priority
                unoptimized
                sizes="600px"
                className="object-cover"
              />

              {/* Content overlay (left) */}
              <div className="absolute left-4 top-4 sm:left-6 sm:top-[38px] w-[50%] sm:w-[263px] flex flex-col gap-3 sm:gap-10">
                <div className="flex flex-col gap-2 sm:gap-6">
                  {/* Icon — white rounded box with masked icon */}
                  <div
                    className="w-9 h-9 sm:w-16 sm:h-16 rounded-[8px] bg-white relative"
                    style={{ boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.1)" }}
                  >
                    <span
                      aria-hidden
                      className="absolute left-1.5 top-1.5 w-6 h-6 sm:left-2 sm:top-2 sm:w-12 sm:h-12"
                      style={{
                        backgroundColor: calc.iconColor,
                        WebkitMaskImage: `url('${calc.iconSrc}')`,
                        maskImage: `url('${calc.iconSrc}')`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1.5 sm:gap-4">
                    <h3 className="text-[14px] sm:text-[24px] font-bold text-[#1a1f2e] leading-[18px] sm:leading-[32px]">
                      {calc.title}
                    </h3>
                    <p className="text-[8px] sm:text-[14px] font-normal text-[#1a1f2e] leading-[11px] sm:leading-[24px]">
                      {calc.description}
                    </p>
                  </div>
                </div>

                {/* CTA pill */}
                <ContactButton
                  className="inline-flex w-fit items-center gap-[6px] sm:gap-[10px] rounded-[24px] px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[14px] font-normal transition-opacity hover:opacity-90"
                  style={{ background: calc.ctaBg, color: calc.ctaText }}
                >
                  {calc.cta}
                  <svg width="12" height="9" viewBox="0 0 14 10" fill="none" className="shrink-0">
                    <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ContactButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
