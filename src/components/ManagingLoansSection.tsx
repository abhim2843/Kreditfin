import Image from "next/image";
import Link from "next/link";

const struggleItems = [
  { icon: "/assets/ml-calendar.png", text: "Different EMIs & due dates" },
  { icon: "/assets/ml-percent.png", text: "High interest rates" },
  { icon: "/assets/ml-phone.png", text: "Multiple reminders & calls" },
  { icon: "/assets/ml-chart.png", text: "Hard to track & manage" },
];

const reliefItems = [
  { icon: "/assets/ml-calendar-g.png", text: "One EMI, one due date" },
  { icon: "/assets/ml-percent-g.png", text: "Lower interest rates" },
  { icon: "/assets/ml-check-g.png", text: "No more reminder calls" },
  { icon: "/assets/ml-chart-g.png", text: "Easy to track & manage" },
];

function MaskIcon({ src, color }: { src: string; color: string }) {
  return (
    <span
      aria-hidden
      className="block w-5 h-5"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function ItemList({
  items,
  iconColor,
  circleBg,
  dividerColor,
}: {
  items: { icon: string; text: string }[];
  iconColor: string;
  circleBg: string;
  dividerColor: string;
}) {
  return (
    <div className="flex flex-col w-[200px]">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 h-[42px] sm:h-[56px]"
          style={i > 0 ? { borderTop: `1px solid ${dividerColor}` } : undefined}
        >
          <div
            className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ background: circleBg }}
          >
            <MaskIcon src={item.icon} color={iconColor} />
          </div>
          <span className="text-[12px] sm:text-[14px] font-normal text-[#1a1f2e] leading-[18px] sm:leading-[22px] whitespace-nowrap">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ManagingLoansSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-12">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[30px] sm:leading-[40px]">
            Managing Multiple Loans is Stressful
          </h2>
          <p className="text-[14px] sm:text-[20px] font-normal text-[rgba(26,31,46,0.7)] mt-2 leading-[22px] sm:leading-[32px]">
            Multiple Payments, Multiple Due Dates, Endless Stress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Struggle Side */}
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ background: "#fff5f5" }}
          >
            <Image
              src="/assets/struggle-image.png"
              alt="Managing multiple loans is stressful"
              width={580}
              height={434}
              className="absolute top-0 bottom-0 right-0 h-full w-[69%] object-cover object-bottom lg:static lg:w-full lg:h-[434px] lg:object-cover lg:object-center lg:rounded-[16px]"
            />
            {/* Content — in-flow on mobile, overlaid on desktop */}
            <div className="relative z-10 lg:absolute lg:top-0 lg:left-0 p-5 sm:p-6">
              {/* Badge */}
              <div className="flex items-center gap-1 bg-[#fef1f1] border-[0.5px] border-[rgba(255,0,0,0.5)] rounded-[2px] px-2 py-1 w-fit mb-[16px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="red" strokeWidth="1.5" fill="none"/>
                  <path d="M8 5v4M8 11v1" stroke="red" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[12px] text-red-600 font-normal leading-[20px]">THE STRUGGLE</span>
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[24px] sm:leading-[28px] w-[195px]">
                Managing Multiple Loans is Stressful
              </h3>
              <div className="w-[80px] h-[2px] bg-red-500 mt-2 mb-3 sm:mt-3 sm:mb-6" />

              <ItemList
                items={struggleItems}
                iconColor="#ff0000"
                circleBg="rgba(255,0,0,0.08)"
                dividerColor="rgba(255,0,0,0.1)"
              />
            </div>
          </div>

          {/* Relief Side */}
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{ background: "#f1fcf3" }}
          >
            <Image
              src="/assets/relief-image.png"
              alt="KreditFin provides relief from multiple loans"
              width={580}
              height={434}
              className="absolute top-0 bottom-0 right-0 h-full w-[69%] object-cover object-bottom lg:static lg:w-full lg:h-[434px] lg:object-cover lg:object-center lg:rounded-[16px]"
            />
            {/* Content — in-flow on mobile, overlaid on desktop */}
            <div className="relative z-10 lg:absolute lg:top-0 lg:left-0 p-5 sm:p-6">
              {/* Badge */}
              <div className="flex items-center gap-1 bg-[#f1fcf3] border-[0.5px] border-[rgba(76,175,80,0.5)] rounded-[2px] px-2 py-1 w-fit mb-[16px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#4caf50" strokeWidth="1.5" fill="none"/>
                  <path d="M5 8l2 2 4-4" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-[12px] text-[#4caf50] font-normal leading-[20px]">THE RELIEF</span>
              </div>
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[24px] sm:leading-[28px] w-[195px]">
                KreditFin Simplifies Everything
              </h3>
              <div className="w-[80px] h-[2px] bg-[#4caf50] mt-2 mb-3 sm:mt-3 sm:mb-6" />

              <ItemList
                items={reliefItems}
                iconColor="#77c279"
                circleBg="rgba(76,175,80,0.1)"
                dividerColor="rgba(76,175,80,0.15)"
              />
            </div>
          </div>
        </div>

        {/* Center connector — white circle with green down chevron (desktop only) */}
        <div className="hidden lg:flex justify-center -mt-[241px] mb-[217px] relative z-10 pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
            style={{ boxShadow: "0 2px 3.7px rgba(0,0,0,0.1)" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M12 8L20 16L12 24" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="flex justify-center mt-8 lg:mt-0">
          <Link
            href="/consolidated-emi-calculator"
            className="inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-[14px] sm:text-[16px] font-semibold hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.25)]"
          >
            Calculate Consolidated EMI
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
              <path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
