import Image from "next/image";
import Link from "next/link";
import ContactButton from "./ContactButton";

const steps = [
  {
    number: "01",
    badge: "Quick Assessment",
    title: ["Share Your ", "Loan Details"],
    description:
      "Tell us about your existing loans, EMIs, lenders, and outstanding balances. Our experts will analyze your profile and find the best financing options for you.",
    timeLabel: "Takes less than 2 minutes",
    image: "/assets/step-1.png",
  },
  {
    number: "02",
    badge: "Smart Analysis",
    title: ["Get Your ", "Personalized Plan"],
    description:
      "Our AI analyzes your loans and gives you a personalized consolidation plan instantly. Compare options and choose the best fit for your financial goals.",
    timeLabel: "Instant results",
    image: "/assets/step-2.png",
  },
  {
    number: "03",
    badge: "Expert Guidance",
    title: ["Talk to an ", "Expert Advisor"],
    description:
      "Connect with our certified financial advisors for free guidance and final approval. They'll walk you through every step and answer all your questions.",
    timeLabel: "Free 30-min call",
    image: "/assets/step-3-expert.png",
  },
  {
    number: "04",
    badge: "Get Approved",
    title: ["Get Approved ", "& Start Saving"],
    description:
      "Once approved, your multiple loans become one — with a lower EMI, better life and more money back in your pocket every single month.",
    timeLabel: "7–14 business days",
    image: "/assets/step-3.png",
  },
];

export default function EasyStepsSection() {
  return (
    <section className="w-full pt-8 pb-16 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
            Your Loan in 4 Easy Steps
          </h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[760px] mx-auto">
            From sharing your details to getting approved, here&apos;s exactly what to expect.
          </p>
        </div>

        {/* Card stack — each step is a card; the next scrolls up and stacks over the previous */}
        <div className="flex flex-col gap-[45vh] pb-[15vh]">
          {steps.map((step, i) => (
            <div
              key={i}
              className="sticky"
              style={{ top: `calc(110px + ${i * 24}px)` }}
            >
              <div
                className="relative rounded-[16px] overflow-hidden flex flex-col lg:flex-row items-stretch min-h-[340px]"
                style={{
                  background: "linear-gradient(135deg, #eef7ee 0%, #ffffff 60%)",
                  border: "1px solid rgba(76,175,80,0.12)",
                  boxShadow: "0px 24px 50px -16px rgba(0,0,0,0.18)",
                }}
              >
                {/* Left content */}
                <div className="flex flex-col gap-3 sm:gap-6 p-5 sm:p-10 lg:p-12 flex-1 justify-center items-center text-center lg:items-start lg:text-left">
                  {/* Step badge row */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Big number — mobile inline (desktop has the absolute one) */}
                    <span className="lg:hidden text-[36px] font-bold leading-none" style={{ color: "rgba(76,175,80,0.25)" }}>
                      {step.number}
                    </span>
                    <div className="flex items-center gap-2 bg-[rgba(76,175,80,0.1)] rounded-[6px] px-3 py-1">
                      <span className="text-[12px] font-semibold text-[#4caf50] tracking-wider">STEP {step.number}</span>
                    </div>
                    <span className="text-[13px] sm:text-[14px] text-[rgba(26,31,46,0.5)]">{step.badge}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[18px] sm:text-[36px] font-bold text-[#1a1f2e] leading-[24px] sm:leading-[44px]">
                    {step.title[0]}
                    <span className="text-[#4caf50]">{step.title[1]}</span>
                  </h3>

                  <p className="text-[13px] sm:text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[20px] sm:leading-[28px] max-w-[480px]">
                    {step.description}
                  </p>

                  {/* Time indicator */}
                  <div className="inline-flex items-center gap-2 bg-[rgba(76,175,80,0.08)] rounded-full px-3 py-1 sm:bg-transparent sm:px-0 sm:py-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#4caf50" strokeWidth="1.2" fill="none"/>
                      <path d="M8 5v3.5l2 2" stroke="#4caf50" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[12px] sm:text-[13px] text-[rgba(26,31,46,0.6)]">{step.timeLabel}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-2 sm:gap-4 mt-1">
                    <ContactButton className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap bg-[#4caf50] text-white border-2 border-[#4caf50] rounded-full px-3.5 py-2 text-[11px] sm:px-[26px] sm:py-[14px] sm:text-[16px] font-semibold hover:bg-[#43a047] transition-colors">
                      Get Free Consultation
                      <svg width="12" height="9" viewBox="0 0 14 10" fill="none" className="shrink-0">
                        <path d="M1 5h12M8 1l5 4-5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ContactButton>
                    <a
                      href="https://wa.me/917303820386?text=Hi%20KreditFin%2C%20I%27d%20like%20to%20know%20more%20about%20your%20loan%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap border-2 border-[#4caf50] bg-white rounded-full px-3.5 py-2 text-[11px] sm:px-[26px] sm:py-[14px] sm:text-[16px] font-semibold text-[#4caf50] hover:bg-[rgba(76,175,80,0.06)] transition-colors"
                    >
                      Chat with Advisor
                      <svg width="12" height="9" viewBox="0 0 14 10" fill="none" className="shrink-0">
                        <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Large step number in the right white space, before the image */}
                <span
                  className="hidden lg:block absolute top-[40px] right-[500px] text-[80px] font-bold leading-[100px] select-none pointer-events-none z-0"
                  style={{ color: "rgba(76,175,80,0.1)" }}
                >
                  {step.number}
                </span>

                {/* Right illustration */}
                <div className="relative w-full h-[220px] lg:h-auto lg:w-[480px] flex-shrink-0 overflow-hidden z-10">
                  <Image
                    src={step.image}
                    alt={step.badge}
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10">
          <Link
            href="/consolidated-emi-calculator"
            className="inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[14px] sm:text-[16px] font-semibold hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.25)]"
          >
            Try the Consolidated EMI Calculator
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
              <path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
