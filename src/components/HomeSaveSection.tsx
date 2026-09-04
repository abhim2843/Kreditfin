import Image from "next/image";
import ContactButton from "./ContactButton";

function Headings() {
  return (
    <>
      <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold leading-[28px] sm:leading-[36px] lg:leading-[40px] text-[#1a1f2e] sm:whitespace-nowrap">
        Your Home will <span className="text-[#4caf50]">Save your Home</span>
      </h2>
      <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold leading-[28px] sm:leading-[36px] lg:leading-[40px] text-[#1a1f2e] mt-2 sm:mt-4 sm:whitespace-nowrap">
        घर ही <span className="text-[#4caf50]">बचाएगा आपका घर</span>
      </h2>
    </>
  );
}

function CtaButton() {
  return (
    <ContactButton className="mt-5 sm:mt-8 inline-flex w-fit items-center gap-[10px] bg-[#4caf50] text-white rounded-full px-6 sm:px-12 py-2.5 sm:py-3 text-[14px] sm:text-[16px] font-medium hover:bg-[#43a047] transition-colors">
      Find out how?
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="shrink-0">
        <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </ContactButton>
  );
}

export default function HomeSaveSection() {
  return (
    <section className="w-full" style={{ background: "#e8f5ed" }}>
      {/* Mobile / tablet — stacked: text on top, house image below */}
      <div className="lg:hidden flex flex-col">
        <div className="flex flex-col px-5 sm:px-10 pt-8">
          <Headings />
          <CtaButton />
        </div>
        <div className="relative w-full h-[180px] sm:h-[240px] mt-4">
          <Image
            src="/assets/cta-banner.png"
            alt="Your home will save your home"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Desktop — overlay banner */}
      <div className="hidden lg:block relative max-w-[1440px] mx-auto h-[250px] overflow-hidden">
        <Image
          src="/assets/cta-banner.png"
          alt=""
          fill
          priority
          unoptimized
          sizes="1440px"
          className="object-contain object-right"
        />
        <div className="absolute left-[150px] top-[37px] flex flex-col">
          <Headings />
          <CtaButton />
        </div>
      </div>
    </section>
  );
}
