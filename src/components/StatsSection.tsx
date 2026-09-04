const statIconSrc: Record<string, string> = {
  people: "/assets/stat-customers.png",
  rupee: "/assets/stat-debt.png",
  team: "/assets/stat-team.png",
  globe: "/assets/stat-globe.png",
};

function StatIcon({ type }: { type: string }) {
  if (type === "experience") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="w-[20px] h-[20px] sm:w-[26px] sm:h-[26px]">
        <circle cx="12" cy="9" r="6" stroke="#4caf50" strokeWidth="1.7" />
        <path d="M9.5 9l1.7 1.7L15 7.3" stroke="#4caf50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.5 14.5L7 22l5-2.6L17 22l-1.5-7.5" stroke="#4caf50" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className="block w-[20px] h-[18px] sm:w-[30px] sm:h-[26px] bg-[#4caf50]"
      style={{
        WebkitMaskImage: `url('${statIconSrc[type]}')`,
        maskImage: `url('${statIconSrc[type]}')`,
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

export default function StatsSection() {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: "linear-gradient(242deg, rgba(41,182,246,0.125) 16%, rgba(255,255,255,0) 72%), linear-gradient(160deg, rgba(76,175,80,0.02) 175%, rgba(255,255,255,0.24) 82%)",
        minHeight: "400px",
      }}
    >
      {/* Perspective grid background */}
      <div
        className="absolute inset-0 opacity-[0.24] pointer-events-none bg-no-repeat bg-cover bg-top"
        style={{ backgroundImage: "url('/assets/grid-bg.jpg')" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-16">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[30px] sm:leading-[40px]">
            KreditFin Growth At A Glance
          </h2>
          <p className="text-[14px] sm:text-[18px] lg:text-[20px] font-normal text-[rgba(26,31,46,0.7)] mt-2 leading-[22px] sm:leading-[32px]">
            Numbers that speak for themselves
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-6">
          {[
            { value: "15,000+", label: "Customers Served", icon: "people" },
            { value: "₹500 Cr+", label: "Loans Processed", icon: "rupee" },
            { value: "150+", label: "NRI Customers Served", icon: "globe" },
            { value: "100+", label: "Customer Focused Team", icon: "team" },
            { value: "8+", label: "Years of Experience", icon: "experience" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2 sm:gap-4 p-4 sm:p-6 lg:p-4 rounded-[16px] border border-[rgba(0,0,0,0.05)] ${
                i === arr.length - 1 && arr.length % 2 === 1 ? "col-span-2 sm:col-span-1 max-w-[calc(50%-8px)] sm:max-w-none mx-auto sm:mx-0" : ""
              }`}
              style={{
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0px 1px 4px 0px rgba(76,175,80,0.1)",
              }}
            >
              {/* Icon */}
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-[8px] bg-[rgba(76,175,80,0.1)] flex items-center justify-center">
                <StatIcon type={stat.icon} />
              </div>
              {/* Value */}
              <div className="text-center">
                <p className="text-[24px] sm:text-[36px] lg:text-[38px] font-extrabold leading-[30px] sm:leading-[44px] lg:leading-[46px] text-[#4caf50] whitespace-nowrap">{stat.value}</p>
                <p className="text-[13px] sm:text-[16px] lg:text-[17px] font-normal leading-[18px] sm:leading-[24px] lg:leading-[26px] text-[#1a1f2e] mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
