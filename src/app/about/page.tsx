import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoreValuesAccordion from "@/components/CoreValuesAccordion";
import WatchDemoButton from "@/components/WatchDemoButton";
import ContactButton from "@/components/ContactButton";

const valueCards = [
  { title: "Reduce Your EMI Burden", icon: "/assets/val-results.png", desc: "Restructure existing loans into a single, lower monthly EMI tailored to your repayment capacity." },
  { title: "Access The Right Lenders", icon: "/assets/val-amplify.png", desc: "Get matched with the banks and NBFCs best suited to your credit profile and requirements." },
  { title: "Personalised Guidance", icon: "/assets/val-engage.png", desc: "Work with banking professionals who assess your profile before recommending any lender." },
  { title: "Build Lasting Financial Stability", icon: "/assets/val-educate.png", desc: "Move from scattered debt to a simplified plan that supports long-term financial health." },
];

const stats = [
  { value: "15,000+", label: "Customers Served" },
  { value: "₹500 Cr+", label: "Loans Processed" },
  { value: "150+", label: "NRI Customers Served" },
  { value: "100+", label: "Customer Focused Team" },
];

// 12-point seal/burst for the VS badge (evenly computed so the spikes are uniform)
const starPoints = Array.from({ length: 24 }, (_, k) => {
  const a = ((-90 + k * 15) * Math.PI) / 180;
  const r = k % 2 === 0 ? 22 : 17;
  return `${(24 + r * Math.cos(a)).toFixed(2)},${(24 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

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

const team = [
  {
    name: "Abhishek",
    role: "Technology & Marketing Head",
    bio: "Ex-Oracle, IBM — 14+ years as an IT professional.",
    image: "/assets/team/Abhishek.jpg",
  },
  {
    name: "Shantanu Kr Rai",
    role: "Co-Founder",
    bio: "10+ years in Banking and Loans. Ex-ICICI Bank.",
    image: "/assets/team/Shantanu.png",
  },
  {
    name: "Hitesh Khandelwal",
    role: "Chief Home Loan Consultant",
    bio: "12+ years as Banking & Credit Head. Ex-ICICI Bank.",
    image: "/assets/team/Hitesh.png",
  },
  {
    name: "Sarvesh Kumar",
    role: "Co-Founder & Chief Credit Analysis Expert",
    bio: "10+ years in Sales.",
    image: "/assets/team/Sarvesh.png",
  },
];

function CardIcon({ src }: { src: string }) {
  return (
    <div className="w-16 h-16 rounded-[12px] bg-[#4caf50] flex items-center justify-center">
      <span
        aria-hidden
        className="block w-8 h-8"
        style={{
          backgroundColor: "#ffffff",
          WebkitMaskImage: `url('${src}')`,
          maskImage: `url('${src}')`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full relative overflow-hidden bg-[#f9fafc]">
        {/* Mobile stacked text */}
        <div className="lg:hidden px-4 sm:px-8 pt-10 pb-2 flex flex-col gap-5">
          <div className="flex items-center gap-2 border border-[#4caf50] bg-gradient-to-r from-[rgba(76,175,80,0.2)] to-[rgba(76,175,80,0.1)] rounded-[42px] px-4 py-1 w-fit">
            <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
            <span className="text-[13px] font-normal text-[#4caf50] leading-[24px]">Trusted by 15,000+ Customers</span>
          </div>
          <h1 className="flex gap-2 text-[32px] sm:text-[40px] font-extrabold leading-[40px] sm:leading-[48px]">
            <span className="text-[#1a1f2e]">About</span>
            <span className="text-[#4caf50]">KreditFin</span>
          </h1>
          <p className="text-[16px] sm:text-[20px] font-normal leading-[26px] sm:leading-[32px] text-[#1a1f2e]">
            KreditFin helps you consolidate multiple loans into one simplified loan, with a lower interest rate
          </p>
        </div>

        {/* Illustration: dot-grid + waves reach the left, dashboard on the right, 10% side padding */}
        <div className="max-w-[1440px] mx-auto px-[1.67%]">
          <div className="relative w-full aspect-[2.22/1]">
            <Image
              src="/assets/about-hero-left.png"
              alt=""
              fill
              priority
              unoptimized
              className="object-cover object-center"
            />
            {/* Mobile CTAs overlaid on the blank left area of the illustration */}
            <div className="lg:hidden absolute inset-y-0 left-4 sm:left-8 flex flex-col justify-center gap-3 w-[46%]">
              <ContactButton className="flex items-center justify-center gap-2 bg-[#4caf50] text-white rounded-full px-4 py-2.5 text-[13px] sm:text-[15px] font-medium hover:bg-[#43a047] transition-colors whitespace-nowrap shadow-[0_4px_16px_rgba(76,175,80,0.3)]">
                Check My Savings
                <svg width="15" height="11" viewBox="0 0 16 12" fill="none" className="shrink-0">
                  <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ContactButton>
              <WatchDemoButton />
            </div>
          </div>
        </div>

        {/* Text overlay (left) — desktop only */}
        <div className="hidden lg:block absolute inset-0">
          <div className="max-w-[1440px] mx-auto px-[1.67%] h-full flex flex-col justify-center">
            <div className="flex flex-col gap-6 w-[48%] max-w-[509px]">
              {/* Trust badge */}
              <div className="flex items-center gap-2 border border-[#4caf50] bg-gradient-to-r from-[rgba(76,175,80,0.2)] to-[rgba(76,175,80,0.1)] rounded-[42px] px-4 py-1 w-fit">
                <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
                <span className="text-[14px] font-normal text-[#4caf50] leading-[24px]">Trusted by 15,000+ Customers</span>
              </div>
              {/* Heading */}
              <h1 className="flex gap-2 text-[48px] font-extrabold leading-[56px]">
                <span className="text-[#1a1f2e]">About</span>
                <span className="text-[#4caf50]">KreditFin</span>
              </h1>
              {/* Subtitle */}
              <p className="text-[24px] font-normal leading-[36px] text-[#1a1f2e]">
                KreditFin helps you consolidate multiple loans into one simplified loan, with a lower interest rate
              </p>
              {/* CTAs */}
              <div className="flex items-center gap-5 mt-2">
                <ContactButton className="flex items-center gap-[10px] bg-[#4caf50] text-white rounded-full px-12 py-3 text-[16px] font-medium hover:bg-[#43a047] transition-colors">
                  Check My Savings
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="shrink-0">
                    <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ContactButton>
                <WatchDemoButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Boosting / value cards */}
      <section className="w-full bg-white py-12 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Helping You Borrow Smarter</h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              Our vision is to simplify borrowing for every customer, turning complex debt and lending decisions into clear, confident financial outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {valueCards.map((card, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-[16px] border border-[rgba(26,31,46,0.08)] p-6 hover:border-[#4caf50] hover:shadow-[0_4px_24px_rgba(76,175,80,0.12)] transition-all">
                <CardIcon src={card.icon} />
                <h3 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{card.title}</h3>
                <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[22px]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements stats band */}
      <section
        className="w-full py-12 sm:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(233deg, rgba(41,182,246,0.125) 16%, rgba(255,255,255,0) 72%), linear-gradient(165deg, rgba(76,175,80,0.02) 175%, rgba(255,255,255,0.24) 82%)",
        }}
      >
        {/* Perspective grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.24] pointer-events-none bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/grid-bg.jpg')" }}
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12 max-w-[1145px] mx-auto">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Unveiling The Success Of Our Achievements</h2>
            <p className="text-[20px] font-normal text-[#4a5565] mt-3 leading-[32px]">
              We believe that numbers tell a powerful story. Our counters provide a snapshot of the significant achievements we&apos;ve reached in our journey to revolutionize customer support.
            </p>
          </div>
          <div
            className="grid grid-cols-2 lg:flex lg:items-stretch rounded-[16px] border-2 border-white px-6 py-8 sm:px-12 sm:py-12 gap-y-8"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.5) 100%)" }}
          >
            {stats.map((s, i) => (
              <div key={i} className="flex lg:flex-1 items-center justify-center">
                <div className="flex flex-col items-center text-center w-full">
                  <span className="text-[34px] sm:text-[48px] font-extrabold text-[#4caf50] leading-[40px] sm:leading-[56px]">{s.value}</span>
                  <span className="text-[15px] sm:text-[18px] font-normal text-[rgba(26,31,46,0.7)] mt-2">{s.label}</span>
                </div>
                {i < stats.length - 1 && <div className="hidden lg:block w-px self-stretch bg-[rgba(26,31,46,0.1)] ml-6 xl:ml-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="w-full bg-white py-12 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Our Core Values</h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              What we do at KreditFin
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-stretch">
            {/* Left list (interactive accordion) */}
            <CoreValuesAccordion />
            {/* Right image */}
            <div className="flex-1 rounded-[16px] overflow-hidden relative min-h-[240px] sm:min-h-[327px]">
              <Image src="/assets/about-values.png" alt="Our core values" fill unoptimized className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different — comparison */}
      <section className="w-full py-12 sm:py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6fbf6 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Why KreditFin is Different</h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              We don&apos;t believe in finding a lender for your file. We believe in building the right solution for your financial profile
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* VS badge (center) — desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                  <polygon points={starPoints} fill="#4caf50" strokeLinejoin="round" stroke="#4caf50" strokeWidth="2" />
                </svg>
                <span className="relative text-white text-[14px] font-bold">VS</span>
              </div>
            </div>

            {/* Kreditfin (left) */}
            <div className="rounded-[16px] p-6 flex flex-col gap-5" style={{ background: "rgba(76,175,80,0.05)" }}>
              <Image src="/assets/logo.png" alt="Kreditfin" width={150} height={38} className="h-9 w-auto object-contain mb-1" />
              {usPoints.map((p, i) => (
                <div key={i} className="flex items-center gap-4 rounded-[8px] bg-white p-5">
                  <div className="w-16 h-16 rounded-[8px] bg-[#eaf4ed] flex items-center justify-center shrink-0">
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
                    <h4 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{p.title}</h4>
                    <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[20px]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Brands (right) */}
            <div className="rounded-[16px] p-6 flex flex-col gap-5" style={{ background: "rgba(26,31,46,0.03)" }}>
              <h3 className="text-[28px] font-bold text-[#1a1f2e] leading-[36px] mb-1">Other Brands</h3>
              {themPoints.map((p, i) => (
                <div key={i} className="flex items-center gap-4 rounded-[8px] bg-white p-5">
                  <div className="w-16 h-16 rounded-[8px] bg-[#fdeaea] flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 7l10 10M17 7L7 17" stroke="#ff5e5e" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{p.title}</h4>
                    <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[20px]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA comet divider */}
          <div className="text-center pt-12 sm:pt-20">
            <div className="flex items-center gap-3 sm:gap-6 mb-8">
              <div className="flex-1 flex items-center">
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to right, rgba(41,182,246,0), #29B6F6)" }} />
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
              </div>
              <p className="text-[16px] sm:text-[24px] font-semibold text-[#1a1f2e] leading-[22px] sm:leading-[32px] text-center sm:whitespace-nowrap">No complexity. Just finance experts. Talk now.</p>
              <div className="flex-1 flex items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] shrink-0" />
                <div className="flex-1 h-[1px]" style={{ background: "linear-gradient(to left, rgba(41,182,246,0), #29B6F6)" }} />
              </div>
            </div>
            <ContactButton className="inline-flex items-center gap-3 bg-[#4caf50] text-white rounded-full px-8 sm:px-12 py-3 sm:py-4 text-[16px] sm:text-[18px] font-semibold hover:bg-[#43a047] transition-colors">
              Talk to Our Experts
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M1 6h18M13 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </ContactButton>
          </div>
        </div>
      </section>

      {/* Founders / leadership team */}
      <section className="w-full bg-white py-12 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Meet Our Founders</h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1145px] mx-auto">
              The team behind KreditFin, bringing decades of combined experience in banking, credit, and technology.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-[16px] border border-[rgba(26,31,46,0.08)] px-5 py-8 flex flex-col items-center gap-4 hover:border-[rgba(76,175,80,0.3)] hover:shadow-[0_8px_30px_rgba(76,175,80,0.12)] transition-all duration-200"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden relative shrink-0 ring-4 ring-[rgba(76,175,80,0.08)]">
                  <Image src={m.image} alt={m.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-[18px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[26px]">{m.name}</p>
                  <span className="text-[12px] font-medium text-[#4caf50] bg-[rgba(76,175,80,0.1)] rounded-full px-3 py-1 leading-[16px]">
                    {m.role}
                  </span>
                  <p className="text-[13px] font-normal text-[rgba(26,31,46,0.6)] leading-[20px] mt-1">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
