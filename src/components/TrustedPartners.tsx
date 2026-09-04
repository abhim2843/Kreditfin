import Image from "next/image";

export default function TrustedPartners() {
  const partners = [
    { name: "Kotak Mahindra Bank", logo: "/assets/bank-kotak.png", scale: 1 },
    { name: "HDFC Bank", logo: "/assets/bank-hdfc.png", scale: 2 },
    { name: "Axis Bank", logo: "/assets/bank-axis.png", scale: 1 },
    { name: "ICICI Bank", logo: "/assets/bank-icici.png", scale: 1 },
    { name: "Chola", logo: "/assets/bank-chola.png", scale: 1 },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        {/* Divider with text */}
        <div className="flex items-center gap-3 sm:gap-5 mb-8">
          {/* Left line: faint green → blue, with blue bulb at inner end */}
          <div className="flex-1 flex items-center">
            <div
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(to right, rgba(76,175,80,0.11), #29B6F6)" }}
            />
            <div className="w-[6px] h-[6px] rounded-full bg-[#29B6F6] flex-shrink-0" />
          </div>

          <span className="text-[11px] sm:text-[18px] font-medium tracking-[0.6px] text-[#1a1f2e] uppercase text-center leading-[16px] sm:leading-normal sm:whitespace-nowrap max-w-[55%] sm:max-w-none shrink-0">
            COMPARE OFFERS FROM 50+ TRUSTED BANKS &amp; NBFCS
          </span>

          {/* Right line: mirror — blue bulb at inner end, fading to faint green */}
          <div className="flex-1 flex items-center">
            <div className="w-[6px] h-[6px] rounded-full bg-[#29B6F6] flex-shrink-0" />
            <div
              className="flex-1 h-[1px]"
              style={{ background: "linear-gradient(to left, rgba(76,175,80,0.11), #29B6F6)" }}
            />
          </div>
        </div>

        {/* Partner Logos — seamless marquee */}
        <div
          className="marquee-row relative overflow-hidden mb-5"
          style={{
            maskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <div className="marquee-track animate-marquee-left flex w-max items-center">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="shrink-0 mr-4 sm:mr-6 lg:mr-10 flex items-center justify-center w-[130px] sm:w-[160px] lg:w-[200px] h-[64px] sm:h-[72px] lg:h-[80px] rounded-[8px] border border-[rgba(26,31,46,0.08)] bg-white hover:border-[#4caf50] transition-colors cursor-pointer px-3"
                style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.06)" }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={266}
                  height={64}
                  unoptimized
                  loading="eager"
                  className="max-h-[64px] w-auto object-contain"
                  style={{ transform: `scale(${partner.scale})` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Verified text */}
        <div className="flex items-center justify-center gap-2">
          <Image src="/assets/verified-icon.png" alt="verified" width={12} height={12} />
          <span className="text-[14px] text-[rgba(26,31,46,0.6)]">
            Partnered with leading banks &amp; NBFCs to bring you the best
          </span>
        </div>
      </div>
    </section>
  );
}
