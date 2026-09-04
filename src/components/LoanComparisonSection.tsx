import Image from "next/image";

const loans = [
  {
    name: "Home Loan",
    type: "Secured Loan",
    outstanding: "₹ 40,00,000",
    roi: "8.50%",
    tenure: "20 Years",
    emi: "₹ 43,391",
    accent: "#2196f3",
    accentTint: "rgba(33,150,243,0.1)",
    highRate: false,
    icon: <path d="M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5M9 21v-6h6v6" />,
  },
  {
    name: "Credit Card Usage",
    type: "Unsecured Loan",
    outstanding: "₹ 2,50,000",
    roi: "45%",
    tenure: "NA",
    emi: "₹ 12,500",
    accent: "#8b6de0",
    accentTint: "rgba(139,109,224,0.1)",
    highRate: true,
    icon: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
  },
  {
    name: "Personal Loan",
    type: "Unsecured Loan",
    outstanding: "₹ 9,00,000",
    roi: "13%",
    tenure: "4 Years",
    emi: "₹ 26,827",
    accent: "#4caf50",
    accentTint: "rgba(76,175,80,0.1)",
    highRate: false,
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></>,
  },
  {
    name: "Car Loan",
    type: "Secured Loan",
    outstanding: "₹ 5,50,000",
    roi: "9%",
    tenure: "5 Years",
    emi: "₹ 14,531",
    accent: "#ef6c00",
    accentTint: "rgba(239,108,0,0.1)",
    highRate: false,
    icon: <><path d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13" /><rect x="3" y="13" width="18" height="5" rx="1" /><circle cx="7.5" cy="18" r="1.3" /><circle cx="16.5" cy="18" r="1.3" /></>,
  },
  {
    name: "Application Loans",
    type: "Unsecured Loan",
    outstanding: "₹ 4,50,000",
    roi: "24%",
    tenure: "2 Years",
    emi: "₹ 26,436",
    accent: "#e06666",
    accentTint: "rgba(224,102,102,0.1)",
    highRate: true,
    icon: <><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="10" y1="18" x2="14" y2="18" /></>,
  },
];

const totalOutstanding = "₹ 61,50,000";
const totalEmi = "₹ 1,23,685";

const simplified = {
  newEmi: "₹ 64,220",
  save: "₹ 59,465",
  savePercent: "48% Less EMI",
  loanAmount: "₹ 61,50,000",
  tenure: "15 Years",
  rate: "9.50%",
};

const checklist = [
  "Lower Interest Rate",
  "Reduced Financial Stress",
  "Single Monthly Payment",
  "Better Cash Flow",
];

function ExistingLoansCard() {
  return (
    <div
      className="w-full rounded-[16px] bg-white p-5 sm:p-6 flex flex-col"
      style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[10px] bg-[rgba(76,175,80,0.1)] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="7" y1="14" x2="13" y2="14" />
          </svg>
        </div>
        <div>
          <p className="text-[17px] sm:text-[18px] font-bold text-[#1a1f2e] leading-[24px]">Your Existing Loans</p>
          <p className="text-[12px] sm:text-[13px] text-[rgba(26,31,46,0.55)]">{loans.length} Active Loans</p>
        </div>
      </div>

      {/* Column headers — desktop only */}
      <div className="hidden sm:flex items-center gap-2 mt-5 pl-3">
        <span className="w-8 shrink-0" />
        <span className="flex-1 min-w-0 text-[11px] font-semibold tracking-wide text-[rgba(26,31,46,0.45)] uppercase">Loan Details</span>
        <span className="text-[11px] font-semibold tracking-wide text-[rgba(26,31,46,0.45)] uppercase text-right w-[88px] shrink-0">Outstanding</span>
        <span className="text-[11px] font-semibold tracking-wide text-[rgba(26,31,46,0.45)] uppercase text-right w-[76px] shrink-0">Tenure / ROI</span>
        <span className="text-[11px] font-semibold tracking-wide text-[rgba(26,31,46,0.45)] uppercase text-right w-[68px] shrink-0">EMI</span>
      </div>

      <div className="flex flex-col mt-2">
        {loans.map((loan) => (
          <div
            key={loan.name}
            className="py-3 border-b border-[rgba(26,31,46,0.06)] last:border-b-0 pl-3 -ml-3"
            style={{ borderLeft: `3px solid ${loan.accent}` }}
          >
            {/* Icon + name — shared by both layouts */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0" style={{ background: loan.accentTint }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={loan.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {loan.icon}
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] sm:text-[15px] font-semibold text-[#1a1f2e] leading-[19px] truncate">{loan.name}</p>
                <p className="text-[11px] text-[rgba(26,31,46,0.5)]">{loan.type}</p>
              </div>
              {/* Outstanding — inline on desktop only */}
              <span className="hidden sm:block text-[13px] font-medium text-[#1a1f2e] text-right w-[88px] shrink-0">{loan.outstanding}</span>
              <span className="hidden sm:flex flex-col text-right w-[76px] shrink-0 leading-[16px]">
                <span className="text-[12px] text-[rgba(26,31,46,0.6)]">{loan.tenure}</span>
                <span className="text-[13px] font-medium" style={{ color: loan.highRate ? "#e06666" : "#4caf50" }}>{loan.roi}</span>
              </span>
              <span className="hidden sm:block text-[13px] font-bold text-[#1a1f2e] text-right w-[68px] shrink-0">{loan.emi}</span>
            </div>

            {/* Mobile: outstanding / roi / emi as a second line */}
            <div className="sm:hidden flex items-center justify-between mt-2 pl-[42px] text-[13px]">
              <div className="flex flex-col">
                <span className="text-[rgba(26,31,46,0.45)] text-[11px]">Outstanding</span>
                <span className="font-medium text-[#1a1f2e]">{loan.outstanding}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[rgba(26,31,46,0.45)] text-[11px]">Tenure / ROI</span>
                <span className="text-[rgba(26,31,46,0.6)]">{loan.tenure}</span>
                <span className="font-medium" style={{ color: loan.highRate ? "#e06666" : "#4caf50" }}>{loan.roi}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[rgba(26,31,46,0.45)] text-[11px]">EMI</span>
                <span className="font-bold text-[#1a1f2e]">{loan.emi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-[10px] p-3.5" style={{ background: "rgba(33,150,243,0.08)" }}>
          <p className="text-[11px] font-medium text-[rgba(26,31,46,0.6)]">Total Loan Outstanding</p>
          <p className="text-[16px] sm:text-[18px] font-bold text-[#1a1f2e] mt-0.5">{totalOutstanding}</p>
        </div>
        <div className="rounded-[10px] p-3.5" style={{ background: "rgba(139,109,224,0.08)" }}>
          <p className="text-[11px] font-medium text-[rgba(26,31,46,0.6)]">Total Monthly EMI</p>
          <p className="text-[16px] sm:text-[18px] font-bold text-[#1a1f2e] mt-0.5">{totalEmi}</p>
        </div>
      </div>
    </div>
  );
}

function SimplifiedLoanCard() {
  return (
    <div
      className="w-full rounded-[16px] p-5 sm:p-6 flex flex-col"
      style={{ background: "linear-gradient(180deg, rgba(76,175,80,0.06) 0%, #ffffff 100%)", border: "1px solid rgba(76,175,80,0.2)", boxShadow: "0px 4px 24px rgba(76,175,80,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4 10-10" />
          </svg>
        </span>
        <div>
          <p className="text-[17px] sm:text-[18px] font-bold text-[#1a1f2e] leading-[24px]">One Simplified Loan</p>
          <p className="text-[12px] sm:text-[13px] text-[rgba(26,31,46,0.55)]">Lower Interest · Single EMI · Better Life</p>
        </div>
      </div>

      <div className="h-px bg-[rgba(26,31,46,0.08)] my-5" />

      {/* Highlighted EMI box */}
      <div className="rounded-[12px] p-5 text-center" style={{ background: "rgba(76,175,80,0.08)" }}>
        <p className="text-[13px] font-medium text-[rgba(26,31,46,0.6)]">Your New Monthly EMI</p>
        <p className="text-[34px] sm:text-[38px] font-extrabold text-[#4caf50] leading-[44px] mt-1">{simplified.newEmi}</p>
      </div>

      {/* Savings row */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <p className="text-[12px] font-medium text-[rgba(26,31,46,0.55)]">You Save Every Month</p>
          <p className="text-[20px] sm:text-[22px] font-bold text-[#4caf50] mt-0.5">{simplified.save}</p>
        </div>
        <span className="rounded-full bg-[rgba(76,175,80,0.12)] text-[#3d9942] text-[13px] font-semibold px-3.5 py-1.5 whitespace-nowrap">
          {simplified.savePercent}
        </span>
      </div>

      <div className="h-px bg-[rgba(26,31,46,0.08)] my-5" />

      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[11px] text-[rgba(26,31,46,0.55)]">Loan Amount</p>
          <p className="text-[14px] sm:text-[15px] font-bold text-[#1a1f2e] mt-0.5">{simplified.loanAmount}</p>
        </div>
        <div>
          <p className="text-[11px] text-[rgba(26,31,46,0.55)]">Tenure</p>
          <p className="text-[14px] sm:text-[15px] font-bold text-[#1a1f2e] mt-0.5">{simplified.tenure}</p>
        </div>
        <div>
          <p className="text-[11px] text-[rgba(26,31,46,0.55)]">Interest Rate</p>
          <p className="text-[14px] sm:text-[15px] font-bold text-[#1a1f2e] mt-0.5">{simplified.rate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-6">
        {checklist.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="12" cy="12" r="11" fill="#4caf50" />
              <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12.5px] sm:text-[13px] font-medium text-[#1a1f2e]">{item}</span>
          </div>
        ))}
      </div>

      <p className="text-[10.5px] text-[rgba(26,31,46,0.4)] mt-auto pt-5">*Values are approximate and for illustration purpose only.</p>
    </div>
  );
}

export default function LoanComparisonSection() {
  return (
    <section className="w-full" style={{ background: "linear-gradient(180deg, rgba(76,175,80,0.08) 0%, #ffffff 100%)" }}>
      {/* Header band */}
      <div className="py-10 text-center px-4">
        <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
          See How Much You Can Save
        </h2>
        <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-2 leading-[28px]">
          Use our smart calculator to see your potential EMI reduction
        </p>
      </div>

      {/* Desktop: cards pushed to the outer edges; illustration sized to the gap so it's never covered */}
      <div className="hidden lg:block w-full">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-[16px] xl:px-[24px] py-16">
          <div className="w-[500px] xl:w-[540px] shrink-0">
            <ExistingLoansCard />
          </div>

          <div className="flex-1 min-w-0 self-stretch flex items-center justify-center">
            <div className="relative w-full" style={{ aspectRatio: "820 / 758" }}>
              <Image
                src="/assets/loan-compare-bg.png"
                alt=""
                fill
                unoptimized
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>

          <div className="w-[380px] xl:w-[400px] shrink-0">
            <SimplifiedLoanCard />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: cards stacked, connected by a downward animated arrow */}
      <div className="lg:hidden flex flex-col px-4 sm:px-8 py-8 gap-0">
        <ExistingLoansCard />

        <div className="flex flex-col items-center py-2">
          <span
            className="arrow-flow-vertical w-[3px] h-10"
            style={{ backgroundImage: "repeating-linear-gradient(to bottom, #4caf50 0 7px, transparent 7px 14px)" }}
          />
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="chevron-nudge-vertical shrink-0 -mt-2">
            <path d="M5 4l7 7 7-7M5 13l7 7 7-7" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <SimplifiedLoanCard />
      </div>
    </section>
  );
}
