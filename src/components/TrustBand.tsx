const items = [
  {
    label: "No CIBIL impact",
    icon: (
      <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 5-5" /></>
    ),
  },
  {
    label: "RBI Regulated",
    icon: (
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />
    ),
  },
  {
    label: "No spam calls",
    icon: (
      <><path d="M18 8a6 6 0 00-9.33-5M6 8c0 3.5-1 5.5-2 6.5V16h13M13.73 21a2 2 0 01-3.46 0" /><line x1="3" y1="3" x2="21" y2="21" /></>
    ),
  },
];

export default function TrustBand() {
  return (
    <section className="w-full bg-white py-5 sm:py-6 border-b border-[rgba(26,31,46,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-[rgba(26,31,46,0.55)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                {item.icon}
              </svg>
              <span className="text-[13px] sm:text-[14px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
