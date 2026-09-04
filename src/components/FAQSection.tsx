"use client";
import Image from "next/image";
import { useState } from "react";
import ContactButton from "./ContactButton";

type FAQ = { question: string; answer: string };

const defaultFaqs: FAQ[] = [
  {
    question: "What is Kreditfin?",
    answer:
      "KreditFin is a loan advisory and facilitation partner that helps you consolidate multiple loans — personal loans, credit cards, and app loans — into one simplified loan with a single EMI and a lower interest rate, working with RBI-regulated banks and NBFCs to structure a plan suited to your credit profile and repayment capacity.",
  },
  {
    question: "How much can I reduce my EMI?",
    answer:
      "The EMI reduction you can achieve depends on your existing loans, interest rates, and credit profile. Most KreditFin customers see their combined monthly EMI drop by 20–40% after consolidation, since a single loan at a lower blended rate typically costs far less than juggling multiple high-interest loans separately.",
  },
  {
    question: "Is there any fee to check my eligibility?",
    answer:
      "Checking your loan eligibility with KreditFin is completely free and does not affect your CIBIL score, since it only involves a soft profile assessment. You'll only ever pay the partner bank or NBFC's standard processing charges if you choose to proceed with an actual loan application and it gets approved.",
  },
  {
    question: "How long does the process take?",
    answer:
      "From application to disbursement, the entire loan consolidation process with KreditFin typically takes 7–14 business days, depending on your documentation, lender requirements, and property or income verification if applicable. Our team works closely with partner banks and NBFCs to expedite approvals and keep the transition to a single EMI as smooth as possible.",
  },
  {
    question: "What types of loans can be consolidated?",
    answer:
      "KreditFin can consolidate a wide range of loans, including home loans, personal loans, gold loans, credit card outstanding balances, car loans, and app-based digital loans, into one simplified loan with a single monthly EMI. This is especially useful if you're juggling multiple lenders, due dates, and interest rates and want one manageable payment instead.",
  },
];

export default function FAQSection({ faqs = defaultFaqs }: { faqs?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      className="w-full py-20"
      style={{ background: "radial-gradient(120% 90% at 50% 50%, rgba(255,255,255,0.82) 0%, #ffffff 100%)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[22px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">
            Everything You Need to Know
          </h2>
          <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px] max-w-[1177px] mx-auto">
            Answers to the questions we hear most before someone applies.
          </p>
        </div>

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-12 xl:gap-[100px] items-center">
          {/* Left — image with concentric rings + button */}
          <div className="w-full lg:w-[420px] xl:w-[508px] lg:shrink-0 flex flex-col items-center">
            <div className="relative w-full max-w-[508px] h-[300px] sm:h-[350px] flex items-center justify-center overflow-hidden">
              {/* Concentric decorative rings */}
              <div className="absolute w-[395px] h-[395px] rounded-full border border-[rgba(76,175,80,0.12)]" />
              <div className="absolute w-[307px] h-[307px] rounded-full border border-[rgba(76,175,80,0.16)]" />
              <div className="absolute w-[175px] h-[175px] rounded-full border border-[rgba(76,175,80,0.2)]" />
              {/* Image */}
              <Image
                src="/assets/faq-image.png"
                alt="Frequently asked questions"
                width={508}
                height={350}
                unoptimized
                className="relative z-10 w-full h-full object-contain"
              />
            </div>

            <ContactButton className="mt-20 inline-flex items-center gap-2 bg-[#4caf50] text-white rounded-full px-7 py-3 text-[14px] font-medium hover:bg-[#43a047] transition-colors">
              View All
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="shrink-0">
                <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ContactButton>
          </div>

          {/* Right — accordion */}
          <div className="w-full lg:flex-1 lg:min-w-0 xl:max-w-[632px] flex flex-col gap-6">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-[8px] overflow-hidden"
                  style={{ boxShadow: "0px 1px 4px 0px rgba(76,175,80,0.15)" }}
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="w-full flex items-center justify-between px-5 py-5 text-left"
                  >
                    <span className="text-[16px] sm:text-[20px] font-semibold text-[#1a1f2e] leading-[24px] sm:leading-[28px] pr-4">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        open ? "bg-[#4caf50]" : "bg-[rgba(76,175,80,0.1)]"
                      }`}
                    >
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke={open ? "white" : "#4caf50"}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {open && (
                    <div className="px-5 pb-5 -mt-2">
                      <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[24px]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
