import Image from "next/image";
import Link from "next/link";
import ScrollTopButton from "./ScrollTopButton";

type Col = { title: string; links: { label: string; href: string }[]; wide?: boolean };

const serviceLinks = [
  { label: "Multiple EMI Consolidation", href: "/services/multiple-emi-consolidation" },
  { label: "Loan Against Property", href: "/services/loan-against-property" },
  { label: "Home Loan Balance Transfer", href: "/services/home-loan-balance-transfer" },
  { label: "Home Loan Top-Up", href: "/services/home-loan-top-up" },
  { label: "Personal Loans", href: "/services/personal-loans" },
  { label: "Business Loans", href: "/services/business-loans" },
  { label: "Mortgage Advisory", href: "/services/mortgage-advisory" },
  { label: "Financial Structuring", href: "/services/financial-structuring" },
  { label: "Debt Management Solutions", href: "/services/debt-management-solutions" },
];

const columns: Col[] = [
  { title: "Services", wide: true, links: serviceLinks },
  {
    title: "Tools",
    links: [
      { label: "EMI Calculator", href: "/emi-calculator" },
      { label: "FD Calculator", href: "/fd-calculator" },
      { label: "SIP Calculator", href: "/sip-calculator" },
    ],
  },
];

function ColLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="text-[15px] font-normal text-[rgba(26,31,46,0.7)] leading-[28px] whitespace-nowrap hover:text-[#4caf50] transition-colors"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Regulatory disclaimer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-6 border-b border-[rgba(26,31,46,0.08)]">
        <p className="text-[11px] sm:text-[12px] italic text-[rgba(26,31,46,0.5)] leading-[18px] sm:leading-[20px]">
          KreditFin(AS Fintech Pvt Ltd) is a Direct Selling Agent (DSA) and operates as a loan facilitation intermediary.
          <br />
          Loans are disbursed by RBI-regulated banks and NBFCs. KreditFin does not lend money directly.
        </p>
        <p className="mt-3 text-[11px] sm:text-[12px] italic text-[rgba(26,31,46,0.5)] leading-[18px] sm:leading-[20px]">
          Grievance Redressal Officer: Mr. Sarvesh[Director]AS Fintech Private Limited, Plot No 4, 3rd Floor, Vikas Marg,
          Swasthya Vihar, New Delhi – 110092{" "}
          <a href="mailto:support@kreditfin.com" className="underline hover:text-[#4caf50] transition-colors not-italic">
            support@kreditfin.com
          </a>{" "}
          |Complaints will be acknowledged within 2 working days and resolved within 15 working days.
        </p>
      </div>

      {/* Main */}
      <div className="bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] pt-12 pb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* Brand */}
            <div className="flex flex-col w-full lg:w-[220px] xl:w-[280px] lg:shrink-0">
              <Image
                src="/assets/logo.png"
                alt="KreditFin"
                width={200}
                height={50}
                className="h-12 w-auto self-start object-contain object-left"
              />
              <p className="mt-5 text-[18px] font-normal text-[rgba(26,31,46,0.75)] leading-[28px] max-w-[360px]">
                Ghar hi Bachaieyga aapka Ghar
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-fit items-center gap-2 bg-[#4caf50] text-white rounded-full px-6 py-3 text-[14px] font-medium hover:bg-[#43a047] transition-colors"
              >
                Get Free Consultation
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="shrink-0">
                  <path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            {/* Link columns */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-8 lg:gap-6 xl:gap-10 pt-1">
              {/* Services (three sub-columns of three, filled top-to-bottom) */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px] mb-1">Services</h4>
                <div className="flex flex-col sm:flex-row gap-y-3 gap-x-8 xl:gap-x-12">
                  {[0, 3, 6].map((start) => (
                    <div key={start} className="flex flex-col gap-3">
                      {serviceLinks.slice(start, start + 3).map((l) => (
                        <ColLink key={l.label} {...l} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block w-px self-stretch bg-[rgba(26,31,46,0.1)]" />

              <div className="flex flex-col gap-3">
                <h4 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px] mb-1">{columns[1].title}</h4>
                {columns[1].links.map((l) => (
                  <ColLink key={l.label} {...l} />
                ))}
              </div>
            </div>
          </div>

          {/* Address + social */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <p className="text-[14px] sm:text-[16px] font-normal text-[#1a1f2e] leading-[24px] sm:leading-[28px]">
              Address - AS Fintech PVT LTD, Plot No 4, 3rd Floor, Vikas Marg, Swasthya Vihar, New Delhi 110092
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/p/Kreditfin-61575129701414/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center text-white hover:bg-[#43a047] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/kreditfin.loans/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center text-white hover:bg-[#43a047] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <ScrollTopButton />
            </div>
          </div>
        </div>
      </div>

      {/* Rate disclaimer */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-6">
        <p className="text-[11px] sm:text-[12px] italic text-[rgba(26,31,46,0.5)] leading-[18px] sm:leading-[20px]">
          Interest rates on loan products facilitated by KreditFin range from 8% to 18% per annum, subject to lender policy and borrower eligibility.
          <br />
          Loan tenure ranges from 12 to 240 months. Representative example: ₹30,00,000 loan at 9% p.a. over 15 years = EMI of approx. ₹30,428.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-[#f0f0f1]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[14px] font-normal text-[#1a1f2e] leading-[28px]">
            © 2025 AS Fintech Private Limited. All Rights Reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <a href="mailto:support@kreditfin.com" className="flex items-center gap-2 text-[14px] text-[#1a1f2e] hover:text-[#4caf50] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              support@kreditfin.com
            </a>
            <a href="tel:+917303820386" className="flex items-center gap-2 text-[14px] text-[#1a1f2e] hover:text-[#4caf50] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4caf50">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              +91 73038 20386
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
