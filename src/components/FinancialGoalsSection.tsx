import Image from "next/image";
import ContactButton from "./ContactButton";

const goals = [
  {
    badge: "Save up to 40% on monthly EMIs",
    badgeIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke="#4caf50"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M6 10l2.5 2.5L14 7"
          stroke="#4caf50"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Reduce My EMI",
    description:
      "Combine all your loans into one lower EMI & free up your monthly cash flow",
    cta: "Explore EMI Relief",
    image: "/assets/goal-emi.png",
    imageAlt: "Reduce EMI - Man relaxing",
    imageBg: "#eef8ef",
    imageFit: "contain" as const,
  },
  {
    badge: "Better Score. Better Offers. Better Future.",
    badgeIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z"
          stroke="#4caf50"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Improve My CIBIL",
    description:
      "Combine all your loans into one lower EMI & free up your monthly cash flow",
    cta: "Check My CIBIL Score",
    image: "/assets/goal-cibil.png",
    imageAlt: "Improve CIBIL Score",
    imageBg: "rgba(41,182,246,0.1)",
    imageFit: "contain" as const,
  },
  {
    badge: "100% Free. No Obligation.",
    badgeIcon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke="#4caf50"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M7 10h6M10 7v6"
          stroke="#4caf50"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Talk To An Expert",
    description:
      "Combine all your loans into one lower EMI & free up your monthly cash flow",
    cta: "Talk To An Advisor",
    image: "/assets/step-1.png",
    imageAlt: "Talk to Expert",
    imageBg: "#f4f6f8",
    imageFit: "contain" as const,
  },
];

export default function FinancialGoalsSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="text-center mb-10">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
            Choose Your Financial Goal
          </h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1177px] mx-auto">
            Whether you want to lower your EMI, improve your credit profile, or
            get expert guidance, we&apos;ll help you find the right path
            forward.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-8 sm:px-8 pb-2 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[78%] sm:w-[60%] lg:w-auto flex flex-col rounded-[16px] p-5 border border-[rgba(26,31,46,0.08)] bg-white hover:border-[#4caf50] transition-all hover:shadow-[0_4px_24px_rgba(76,175,80,0.15)] group"
            >
              {/* Image */}
              <div
                className="h-[220px] rounded-[8px] overflow-hidden flex items-center justify-center"
                style={{ background: goal.imageBg ?? "rgba(76,175,80,0.05)" }}
              >
                {goal.image && (
                  <Image
                    src={goal.image}
                    alt={goal.imageAlt}
                    width={386}
                    height={220}
                    className={`w-full h-full ${goal.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6 pt-5 flex-1">
                <div className="flex flex-col gap-5">
                  {/* Badge */}
                  <div className="flex items-center gap-2">
                    {goal.badgeIcon}
                    <span className="text-[16px] font-normal text-[#4caf50]">
                      {goal.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[18px] sm:text-[24px] font-bold text-[#1a1f2e] leading-[26px] sm:leading-[32px]">
                      {goal.title}
                    </h3>
                    <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[28px]">
                      {goal.description}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="border-t border-[rgba(26,31,46,0.08)] mt-auto pt-6">
                  <ContactButton className="flex items-center justify-center gap-2 text-[14px] font-medium text-[#4caf50] hover:gap-4 transition-all">
                    {goal.cta}
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path
                        d="M1 6h18M13 1l6 5-6 5"
                        stroke="#4caf50"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </ContactButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
