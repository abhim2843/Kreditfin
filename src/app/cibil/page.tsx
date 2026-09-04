import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ---------- data ---------- */

const trustBadges = [
  { label: "No CIBIL impact" },
  { label: "RBI Regulated" },
  { label: "No spam calls" },
];

type Bureau = {
  name: string;
  wordmark: React.ReactNode;
  tag: string;
  desc: string;
  feature: string;
  featureIcon: React.ReactNode;
  cta: string;
  url: string;
  highlight?: boolean;
};

const CheckIcon = ({ color = "#4caf50" }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.12" />
    <path d="M8 12.5l2.5 2.5L16 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const bureaus: Bureau[] = [
  {
    name: "Equifax",
    wordmark: <span className="text-[22px] font-extrabold tracking-tight text-[#c8102e]">EQUIFAX</span>,
    tag: "Trusted Globally",
    desc: "One of the world's oldest credit bureaus with extensive credit data and insights.",
    feature: "Accepted by many lenders worldwide",
    featureIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    cta: "Check with Equifax",
    url: "https://www.equifax.com/",
  },
  {
    name: "CIBIL",
    wordmark: (
      <span className="flex flex-col items-center leading-none">
        <span className="text-[24px] font-extrabold tracking-tight text-[#1b3a6b]">CIBIL</span>
        <span className="text-[7px] font-semibold tracking-[0.15em] text-[#1b3a6b]/70 mt-0.5">A TRANSUNION COMPANY</span>
      </span>
    ),
    tag: "India's Most Trusted",
    desc: "India's leading credit bureau, used by 90%+ lenders in India.",
    feature: "Most commonly used by banks & NBFCs",
    featureIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    cta: "Check with CIBIL",
    url: "https://www.cibil.com/",
    highlight: true,
  },
  {
    name: "Experian",
    wordmark: <span className="text-[22px] font-bold tracking-tight text-[#26478d]">experian<span className="text-[#8e44ad]">.</span></span>,
    tag: "Global Presence",
    desc: "A global credit reporting bureau trusted by financial institutions across the world.",
    feature: "Accepted by many banks and institutions",
    featureIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4caf50" strokeWidth="1.6" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    cta: "Check with Experian",
    url: "https://www.experian.in/",
  },
];

/* ---------- page ---------- */

export default function CibilPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white pt-12 sm:pt-16 pb-6">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 text-center">
          <h1 className="text-[28px] sm:text-[40px] font-extrabold leading-[36px] sm:leading-[48px]">
            <span className="text-[#1a1f2e]">Check Your </span>
            <span className="text-[#4caf50]">Credit Score</span>
          </h1>
          <p className="text-[14px] sm:text-[16px] text-[rgba(26,31,46,0.7)] mt-4 leading-[24px] sm:leading-[26px] max-w-[560px] mx-auto">
            Your credit score reflects your financial health. Choose a trusted bureau to get started.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-7">
            {trustBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-2 text-[13px] sm:text-[14px] font-medium text-[#1a1f2e]">
                <CheckIcon />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Choose a Credit Bureau */}
      <section className="w-full bg-white pt-2 sm:pt-4 pb-10 sm:pb-14">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-[22px] sm:text-[28px] font-bold text-[#1a1f2e] leading-[30px] sm:leading-[36px]">Choose a Credit Bureau</h2>
            <p className="text-[14px] sm:text-[15px] text-[rgba(26,31,46,0.65)] mt-2">
              Select the bureau from which you&apos;d like to retrieve your credit score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {bureaus.map((b) => (
              <div
                key={b.name}
                className={`relative flex flex-col rounded-[16px] p-7 pt-9 transition-all ${
                  b.highlight
                    ? "border-2 border-[#4caf50] bg-[#f6fbf6] shadow-[0_12px_36px_rgba(76,175,80,0.18)] md:-mt-2"
                    : "border border-[rgba(26,31,46,0.1)] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
                }`}
              >
                {b.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#4caf50] text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-[0_4px_12px_rgba(76,175,80,0.35)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    MOST USED IN INDIA
                  </span>
                )}

                {/* Logo disc */}
                <div className="mx-auto w-[120px] h-[120px] rounded-full bg-[#f4f6f8] flex items-center justify-center">
                  {b.wordmark}
                </div>

                <h3 className="text-[22px] font-bold text-[#1a1f2e] text-center mt-5">{b.name}</h3>

                <div className="flex justify-center mt-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full ${
                      b.highlight ? "bg-[rgba(76,175,80,0.14)] text-[#2e7d32]" : "bg-[rgba(26,31,46,0.06)] text-[rgba(26,31,46,0.7)]"
                    }`}
                  >
                    <CheckIcon color={b.highlight ? "#4caf50" : "#6b7280"} />
                    {b.tag}
                  </span>
                </div>

                <p className="text-[14px] text-[rgba(26,31,46,0.65)] text-center mt-4 leading-[22px]">{b.desc}</p>

                <div className="flex items-center gap-3 mt-5 px-4 py-3 rounded-[10px] bg-[rgba(76,175,80,0.07)]">
                  <span className="shrink-0">{b.featureIcon}</span>
                  <span className="text-[13px] font-medium text-[#1a1f2e] leading-[18px]">{b.feature}</span>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full rounded-[10px] py-3 text-[14px] font-semibold transition-colors ${
                      b.highlight
                        ? "bg-[#4caf50] text-white hover:bg-[#43a047] shadow-[0_4px_14px_rgba(76,175,80,0.3)]"
                        : "border border-[#4caf50] text-[#2e7d32] hover:bg-[rgba(76,175,80,0.08)]"
                    }`}
                  >
                    {b.cta}
                    <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6h12M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data safe banner */}
      <section className="w-full bg-white pb-10 sm:pb-14">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-5 rounded-[16px] bg-[#f1f7f1] border border-[rgba(76,175,80,0.18)] px-6 sm:px-8 py-6">
            <span className="shrink-0 w-12 h-12 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="9" rx="2" stroke="#2e7d32" strokeWidth="1.6" /><path d="M8 11V8a4 4 0 018 0v3" stroke="#2e7d32" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </span>
            <div className="flex-1">
              <h3 className="text-[16px] sm:text-[18px] font-bold text-[#1a1f2e]">Your Data is 100% Safe &amp; Secure</h3>
              <p className="text-[13px] sm:text-[14px] text-[rgba(26,31,46,0.65)] mt-1 leading-[20px]">
                We use bank-level encryption to protect your information. Your data is never shared with anyone.
              </p>
            </div>
            <span className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-[#4caf50] items-center justify-center shadow-[0_4px_12px_rgba(76,175,80,0.35)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" fill="white" fillOpacity="0.18" stroke="white" strokeWidth="1.4" /><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        </div>
      </section>

      {/* Not sure which bureau */}
      <section className="w-full bg-white pb-16">
        <div className="max-w-[700px] mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          <span className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center mb-4">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M4 15a8 8 0 1116 0" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" /><path d="M12 15l4-3" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" /><circle cx="12" cy="15" r="1.6" fill="#1a1f2e" /></svg>
          </span>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1a1f2e]">Not sure which bureau to choose?</h3>
          <p className="text-[14px] text-[rgba(26,31,46,0.65)] mt-2 leading-[22px] max-w-[460px]">
            You can check your score from any bureau. All are trusted and accurate.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
