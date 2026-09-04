import Image from "next/image";
import ContactButton from "./ContactButton";

type Expert = {
  name: string;
  role: string;
  background: string;
  experience: string;
  clients?: string;
  image: string;
};

const expertsRow1: Expert[] = [
  { name: "Abhishek", role: "Technology & Marketing Head, Kreditfin", background: "Ex- Oracle, IBM — IT Professional", experience: "14+ Years Experience", clients: "1950+ Clients Assisted", image: "/assets/team/Abhishek.jpg" },
  { name: "Shantanu Kr Rai", role: "Co-Founder, Kreditfin", background: "Ex- ICICI Bank, Banking & Loans", experience: "10+ Years Experience", clients: "1850+ Clients Assisted", image: "/assets/team/Shantanu.png" },
  { name: "Hitesh Khandelwal", role: "Chief Home Loan Consultant, Kreditfin", background: "Ex- ICICI Bank, Banking & Credit Head", experience: "12+ Years Experience", clients: "1550+ Clients Assisted", image: "/assets/team/Hitesh.png" },
  { name: "Sarvesh Kumar", role: "Co-Founder & Chief Credit Analysis Expert, Kreditfin", background: "10+ Yrs Sales", experience: "10+ Years Experience", clients: "1400+ Clients Assisted", image: "/assets/team/Sarvesh.png" },
];

const expertsRow2: Expert[] = [
  { name: "Divya", role: "Sales Head, Kreditfin", background: "10+ Yrs Sales & Marketing", experience: "10+ Years Experience", clients: "1800+ Clients Assisted", image: "/assets/team/Divya.png" },
  { name: "Sagar", role: "Home Loan Mortgage Head, Kreditfin", background: "Ex- HDFC, Mortgage Expert", experience: "8+ Years Experience", clients: "1450+ Clients Assisted", image: "/assets/team/Sagar.png" },
  { name: "Maithili Sharma", role: "HR, Kreditfin", background: "10+ Yrs HR", experience: "10+ Years Experience", image: "/assets/team/Maithali.png" },
  { name: "Ramkumar Yadav", role: "Assistant Manager, Kreditfin", background: "Ex- Bajaj Finance, Team Lead", experience: "7+ Years Experience", clients: "1250+ Clients Assisted", image: "/assets/team/Ramkumar.png" },
];

function MaskIcon({ src, size }: { src: string; size: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: "#4caf50",
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
  );
}

function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <div
      className="w-[322px] h-[164px] shrink-0 bg-white rounded-[16px] p-4 flex flex-col gap-3"
      style={{ filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.15))" }}
    >
      {/* Top */}
      <div className="flex gap-6 items-start">
        {/* Avatar */}
        <div className="flex flex-col items-center w-20 shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image src={expert.image} alt={expert.name} width={80} height={80} unoptimized className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex flex-col gap-[2px]">
            <p className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{expert.name}</p>
            <p className="text-[10px] leading-[15px] text-[rgba(26,31,46,0.7)]">{expert.role}</p>
          </div>
          <div className="flex items-start gap-1">
            <span className="w-1 h-1 rounded-full bg-[#1a1f2e] shrink-0 mt-[6px]" />
            <span className="text-[10px] leading-[15px] text-[#1a1f2e]">{expert.background}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 w-full">
        <div className="h-px w-full bg-[rgba(26,31,46,0.1)]" />
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <MaskIcon src="/assets/ic-shield.png" size={12} />
            <span className="text-[10px] leading-[18px] text-[#1a1f2e] whitespace-nowrap">{expert.experience}</span>
          </div>
          {expert.clients && (
            <div className="flex items-center gap-1">
              <MaskIcon src="/assets/ic-friends.png" size={12} />
              <span className="text-[10px] leading-[18px] text-[#1a1f2e] whitespace-nowrap">{expert.clients}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ experts, direction }: { experts: Expert[]; direction: "left" | "right" }) {
  // duplicate the list so the track can loop seamlessly
  const loop = [...experts, ...experts];
  return (
    <div className="marquee-row overflow-hidden py-2">
      <div
        className={`marquee-track flex gap-6 w-max px-3 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {loop.map((expert, i) => (
          <ExpertCard key={i} expert={expert} />
        ))}
      </div>
    </div>
  );
}

export default function ExpertsSection() {
  return (
    <section className="w-full py-24 relative overflow-hidden bg-white">
      {/* Background grid + white radial veil (Figma Rectangle 64 / sl_072622) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.15] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/experts-bg.jpg')" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 50%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.72) 100%)" }}
        />
      </div>

      <div className="relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#1a1f2e] leading-[40px]">
              Talk to Real Financial Experts
            </h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1177px] mx-auto">
              Banking professionals who&apos;ve worked inside the lenders you&apos;re applying to — not just call center scripts.
            </p>
          </div>
        </div>

        {/* Two-row marquee (full-bleed) */}
        <div className="flex flex-col gap-6 py-4">
          <MarqueeRow experts={expertsRow1} direction="left" />
          <MarqueeRow experts={expertsRow2} direction="right" />
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center pt-20">
            <div className="flex items-center gap-6 mb-8">
              {/* Left comet — faint → blue with bulb at inner end */}
              <div className="hidden sm:flex flex-1 items-center">
                <div
                  className="flex-1 h-[1px]"
                  style={{ background: "linear-gradient(to right, rgba(41,182,246,0) 0%, #29B6F6 100%)" }}
                />
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] flex-shrink-0" />
              </div>

              <p className="text-[18px] sm:text-[24px] font-semibold text-[#1a1f2e] leading-[28px] sm:leading-[32px] text-center sm:whitespace-nowrap">
                No complexity. Just finance experts. Talk now.
              </p>

              {/* Right comet — bulb at inner end, blue → faint */}
              <div className="hidden sm:flex flex-1 items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-[#29B6F6] flex-shrink-0" />
                <div
                  className="flex-1 h-[1px]"
                  style={{ background: "linear-gradient(to left, rgba(41,182,246,0) 0%, #29B6F6 100%)" }}
                />
              </div>
            </div>

            <ContactButton className="inline-flex items-center gap-3 bg-[#4caf50] text-white rounded-full px-12 py-4 text-[18px] font-semibold hover:bg-[#43a047] transition-colors">
              Talk to Our Experts
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path d="M1 6h18M13 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
}
