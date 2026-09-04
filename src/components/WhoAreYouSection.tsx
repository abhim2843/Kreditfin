import ContactButton from "./ContactButton";

const situations = [
  {
    title: "First-time borrower",
    desc: "Getting my first loan and have no idea if the rate I've been quoted is good or bad.",
    saving: "Avg. saving: ₹28,500 on first loan",
    accent: "#4caf50",
    accentTint: "rgba(76,175,80,0.1)",
    icon: (
      <path d="M12 3c4 2 6 5 6 9a6 6 0 01-12 0c0-4 2-7 6-9zM12 12v9" />
    ),
  },
  {
    title: "Existing borrower",
    desc: "I have a loan but suspect I'm overpaying. I want to know my options for a better rate.",
    saving: "Avg. saving: ₹72,000 via balance transfer",
    accent: "#29b6f6",
    accentTint: "rgba(41,182,246,0.1)",
    icon: (
      <path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.7-3M3 12a9 9 0 019-9 9 9 0 016.7 3M3 4v5h5M21 20v-5h-5" />
    ),
  },
  {
    title: "Debt-trapped",
    desc: "Multiple EMIs are crushing me. I need consolidation — one lower EMI to replace everything.",
    saving: "Avg. saving: ₹3.5L per year after consolidation",
    accent: "#ef6c00",
    accentTint: "rgba(239,108,0,0.1)",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4zM9 11.5l2 2 4-4.5" />
    ),
  },
];

export default function WhoAreYouSection() {
  return (
    <section className="w-full py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-10 sm:mb-12 max-w-[720px] mx-auto">
          <span className="inline-flex items-center bg-[rgba(76,175,80,0.1)] text-[#4caf50] text-[11px] font-semibold tracking-wider rounded-full px-3 py-1 mb-4">
            YOUR SITUATION
          </span>
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
            Who are <span className="text-[#4caf50]">you</span> today?
          </h2>
          <p className="text-[14px] sm:text-[16px] font-normal text-[rgba(26,31,46,0.6)] mt-3 leading-[22px] sm:leading-[26px]">
            The same platform — three different starting points. Your journey is shaped entirely around where you are right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {situations.map((s) => (
            <div
              key={s.title}
              className="group flex flex-col rounded-[12px] p-5 sm:p-6 border border-[rgba(26,31,46,0.08)] bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)] hover:border-[rgba(76,175,80,0.3)] hover:shadow-[0_8px_30px_rgba(76,175,80,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: s.accentTint }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </div>
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-[#1a1f2e] leading-[24px]">{s.title}</h3>
              <p className="text-[13px] sm:text-[14px] font-normal text-[rgba(26,31,46,0.6)] mt-2 leading-[20px] flex-1">{s.desc}</p>
              <p className="text-[12px] sm:text-[13px] font-semibold mt-4" style={{ color: s.accent }}>{s.saving}</p>

              <ContactButton className="mt-5 inline-flex items-center justify-center gap-1.5 w-fit rounded-full border border-[#4caf50] text-[#4caf50] text-[13px] font-semibold px-4 py-2 hover:bg-[#4caf50] hover:text-white transition-colors duration-200">
                Learn More
                <svg width="12" height="9" viewBox="0 0 14 10" fill="none" className="shrink-0 transition-transform group-hover:translate-x-0.5">
                  <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </ContactButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
