"use client";
import Link from "next/link";
import { useState } from "react";

const REVIEWS_URL = "https://g.page/r/CQX95r7FpmfzEBM/review";

const testimonials = [
  {
    name: "Nikita Sharma",
    role: "Loan Consolidation Customer",
    review: "I saw KreditFin on Facebook and decided to give it a try. I had multiple loans and a high EMI burden, but their team helped me with loan consolidation and EMI reduction. The process was smooth and transparent. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sapna Dubey",
    role: "Loan Advisory Customer",
    review: "Got the loan advice and loan very professionally. Step wise process was explained. No impact on my CIBIL. Good work.",
    rating: 5,
  },
  {
    name: "Pranjal Rai",
    role: "OD Facility Customer",
    review: "Took OD facility from Bajaj Finserv - the whole loan process was smooth and all the charges were well explained. The whole process was completed within 1 day. Good work guys, keep it up.",
    rating: 5,
  },
  {
    name: "Grow India",
    role: "Business Loan Customer",
    review: "Received help for a business loan in record 7 working days, approved and amount dispatched in such a short term. Kudos to the team. Thanks to Divya and team for such a great work.",
    rating: 5,
  },
  {
    name: "Harsh Mathur",
    role: "Loan Consolidation Customer",
    review: "I had an excellent experience with KreditFin from start to finish. The entire loan process was smooth, transparent, and well-managed. A special thanks to Hitesh Khand, who handled my case with exceptional professionalism and dedication. He was always available to answer my queries, provided honest guidance, kept me updated at every stage, and ensured the entire process was completely hassle-free. His knowledge, patience, and commitment to customer satisfaction truly stood out. I'd also like to thank Shantanu Rai for his support and coordination throughout the process. The team's responsiveness and customer-first approach made the entire experience stress-free. I highly recommend KreditFin to anyone looking for reliable and trustworthy loan assistance. Thank you, Hitesh, Shantanu, and the entire KreditFin team, for the outstanding service!",
    rating: 5,
  },
  {
    name: "Imran Khan",
    role: "Loan Consolidation Customer",
    review: "We have been working with them for the last five years, and our experience has been outstanding. They are highly professional, trustworthy, and always maintain complete transparency throughout the entire loan process. Their service is fast, reliable, and customer-focused, ensuring that loans are processed smoothly and without unnecessary delays. We truly appreciate their dedication and commitment to delivering excellent service. We highly recommend them to anyone looking for a dependable and hassle-free loan experience.",
    rating: 5,
  },
  {
    name: "Rahul Saxena",
    role: "Local Guide · 24 reviews",
    review: "My experience with Kreditfin has been exceptionally positive and truly transformative. I was struggling with multiple loans, each with different EMIs, timelines, and interest rates. Managing them had become stressful and overwhelming. What seemed like a complicated and nearly impossible situation was handled by Kreditfin with remarkable ease and professionalism.\n\nFrom the very beginning, Mr. Sarvesh ji provided clear guidance, transparent communication, and a reassuring approach. He understood my financial challenges in detail and offered a well-structured solution tailored specifically to my needs. Kreditfin successfully consolidated all my loans into one simplified and manageable loan, something I had not expected to be achievable this smoothly.\n\nThe entire process—right from assessment to execution—was seamless, efficient, and handled with great expertise. Kreditfin not only reduced my financial burden but also restored a sense of stability and peace of mind.\n\nI genuinely appreciate the professionalism, dedication, and problem-solving mindset displayed throughout the journey. For anyone facing stress due to multiple loans, I strongly recommend Kreditfin and especially Mr. Sarvesh ji. They are one of the few institutions that deliver exactly what they promise—and do so with integrity and excellence.",
    rating: 5,
  },
  {
    name: "Sushil Khandelwal",
    role: "3 reviews",
    review: "\"I wanted to expand my business. Kcreditfin explained the entire process step-by-step, helped with the documentation, and the loan was disbursed in just 4 days. The interest rate was also lower than the market rate. The team is very professional and supportive. Thank you so much!\"",
    rating: 5,
  },
  {
    name: "Sudha Khandelwal",
    role: "2 reviews",
    review: "1. “Excellent service! My loan process was handled professionally and I received regular updates until disbursement.” “The team understood my financial profile and connected me with the right lender. Great experience.”",
    rating: 5,
  },
];

const STEP = 210; // vertical distance between adjacent card centers

// On-brand avatar palette (theme greens + one blue accent), picked deterministically per name.
const AVATAR_COLORS = ["#4caf50", "#2e7d32", "#43a047", "#388e3c", "#29b6f6"];

function InitialAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bg = AVATAR_COLORS[hash % AVATAR_COLORS.length];
  return (
    <div
      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[18px] font-semibold select-none"
      style={{ background: bg }}
      aria-label={name}
    >
      {initial}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#4caf50">
          <path d="M10 1.5l2.5 5.1 5.6.8-4.1 4 .97 5.6L10 14.4l-4.97 2.6.97-5.6-4.1-4 5.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ name, role, review, rating, focused }: {
  name: string; role: string; review: string; rating: number; focused: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.length > 200;

  return (
    <div
      className="bg-white rounded-[16px] p-4 flex flex-col gap-4 w-full max-w-[543px] h-[340px]"
      style={{ boxShadow: focused ? "0px 2px 40px rgba(76,175,80,0.18)" : "0px 2px 24px rgba(76,175,80,0.08)" }}
    >
      {/* Author */}
      <div className="flex items-center gap-4 shrink-0">
        <InitialAvatar name={name} />
        <div>
          <p className="text-[16px] font-medium text-[#1a1f2e] leading-[24px]">{name}</p>
          <p className="text-[10px] font-normal text-[rgba(26,31,46,0.7)] leading-[18px]">{role}</p>
        </div>
      </div>

      {/* Review Content */}
      <div
        className="p-4 rounded-[8px] flex-1 min-h-0 flex flex-col gap-4"
        style={{ background: "linear-gradient(90deg, rgba(113,254,131,0.1) 65%, rgba(255,255,255,0.1) 85%)" }}
      >
        <StarRating count={rating} />
        <div className="relative flex-1 min-h-0">
          <p
            className={`text-[16px] font-normal text-[#1a1f2e] leading-[28px] h-full whitespace-pre-line ${expanded ? "overflow-y-auto pr-1" : "overflow-hidden"}`}
          >
            {review}
          </p>
          {!expanded && isLong && (
            <div
              className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #f2fbf3 100%)" }}
            />
          )}
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 self-start text-[14px] font-semibold text-[#4caf50] hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // start in the middle so a card is visible above and below
  const [activeIndex, setActiveIndex] = useState(Math.floor((testimonials.length - 1) / 2));
  const last = testimonials.length - 1;

  // Next → the card on TOP scrolls down to the center (focus the previous item)
  const handleNext = () => setActiveIndex((i) => Math.max(0, i - 1));
  // Prev → the card on BOTTOM scrolls up to the center (focus the next item)
  const handlePrev = () => setActiveIndex((i) => Math.min(last, i + 1));

  return (
    <section
      className="w-full py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(109deg, #edf7ed 12%, rgba(237,247,237,0.25) 32%, #f6f9fe 60%, #fefefe 94%)",
        minHeight: "560px",
      }}
    >
      {/* Decorative circles behind the cards */}
      <div className="hidden lg:block absolute left-[860px] top-1/2 -translate-y-1/2 w-[542px] h-[542px] rounded-full border border-[rgba(76,175,80,0.1)] pointer-events-none" />
      <div className="hidden lg:block absolute left-[920px] top-1/2 -translate-y-1/2 w-[425px] h-[425px] rounded-full border border-[rgba(76,175,80,0.08)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[373px_1fr] gap-10 lg:gap-16 lg:min-h-[520px]">
          {/* Left - Heading */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-bold text-[#1a1f2e] leading-[40px]">
                What our customers say
              </h2>
              <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[28px]">
                Real stories from customers who simplified their loans with KreditFin
              </p>
            </div>

            {/* Google reviews badge */}
            <Link
              href={REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-[rgba(26,31,46,0.08)] rounded-[12px] px-4 py-3 w-fit hover:border-[#4caf50] transition-colors"
              style={{ boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.06)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.07-1.47-.23-2.12H12v3.85h6.62c-.13 1.1-.86 2.77-2.47 3.89l-.02.15 3.59 2.78.25.02c2.28-2.1 3.55-5.2 3.55-8.57z" />
                <path fill="#34A853" d="M12 23.5c3.24 0 5.96-1.07 7.95-2.9l-3.79-2.94c-1.02.71-2.38 1.2-4.16 1.2-3.18 0-5.88-2.1-6.84-5l-.14.01-3.72 2.88-.05.13C3.24 20.86 7.28 23.5 12 23.5z" />
                <path fill="#FBBC05" d="M5.16 13.86A6.99 6.99 0 0 1 4.77 12c0-.65.11-1.28.37-1.86l-.01-.14-3.77-2.93-.12.06A11.5 11.5 0 0 0 .5 12c0 1.86.45 3.62 1.24 5.17l3.42-2.31z" />
                <path fill="#EA4335" d="M12 4.72c2.25 0 3.77.97 4.64 1.78l3.39-3.31C17.95 1.36 15.24.5 12 .5 7.28.5 3.24 3.14 1.24 6.83l3.9 3.03c.98-2.9 3.68-5.14 6.86-5.14z" />
              </svg>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-semibold text-[#1a1f2e] leading-[18px]">5.0</span>
                  <div className="flex items-center gap-[1px]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill="#fbbc05">
                        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-[12px] font-normal text-[rgba(26,31,46,0.6)] leading-[16px]">Google Reviews</span>
              </div>
            </Link>

            <div>
              <Link
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-[16px] font-normal text-[#4caf50] leading-[28px] w-fit"
              >
                View All
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={handleNext}
                disabled={activeIndex === 0}
                aria-label="Previous testimonial (scroll up)"
                className="w-9 h-9 rounded-full bg-white border border-[rgba(26,31,46,0.1)] flex items-center justify-center hover:border-[#4caf50] transition-colors disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 10l4-4 4 4" stroke="#1a1f2e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={handlePrev}
                disabled={activeIndex === last}
                aria-label="Next testimonial (scroll down)"
                className="w-9 h-9 rounded-full bg-[#4caf50] flex items-center justify-center hover:bg-[#43a047] transition-colors disabled:opacity-40"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right - vertical card carousel */}
          <div className="relative h-[520px] overflow-hidden">
            {testimonials.map((t, i) => {
              const pos = i - activeIndex; // -1 top, 0 center, 1 bottom
              const isCenter = pos === 0;
              const visible = Math.abs(pos) <= 1;
              return (
                <div
                  key={i}
                  className="absolute left-0 right-0 top-1/2 transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(calc(-50% + ${pos * STEP}px)) translateX(${isCenter ? 0 : 48}px) scale(${isCenter ? 1 : 0.9})`,
                    opacity: visible ? (isCenter ? 1 : 0.45) : 0,
                    zIndex: isCenter ? 20 : 10,
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <TestimonialCard {...t} focused={isCenter} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
