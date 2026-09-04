import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  { icon: "/assets/svc-emi-consolidation.svg", title: "Multiple EMI Consolidation", desc: "Simplify your finances with easy steps to manage your EMIs and reduce your monthly stress.", href: "/services/multiple-emi-consolidation" },
  { icon: "/assets/svc-loan-property.svg", title: "Loan Against Property", desc: "Use the value of your property to access funds at competitive interest rates.", href: "/services/loan-against-property" },
  { icon: "/assets/svc-balance-transfer.svg", title: "Home Loan Balance Transfer", desc: "Transfer your existing home loan to enjoy lower interest rates and better loan benefits.", href: "/services/home-loan-balance-transfer" },
  { icon: "/assets/svc-topup.svg", title: "Home Loan Top-Up", desc: "Get additional home loan funds for your important needs.", href: "/services/home-loan-top-up" },
  { icon: "/assets/svc-personal.svg", title: "Personal Loans", desc: "Quick, hassle-free personal loans to support your dreams and emergencies.", href: "/services/personal-loans" },
  { icon: "/assets/svc-business.svg", title: "Business Loans", desc: "Power your business growth with flexible business loans tailored to your business needs.", href: "/services/business-loans" },
  { icon: "/assets/svc-mortgage.svg", title: "Mortgage Advisory", desc: "Expert guidance to help you choose the right mortgage solution for your goals.", href: "/services/mortgage-advisory" },
  { icon: "/assets/svc-structuring.svg", title: "Financial Structuring", desc: "Tailored financial structuring solutions to optimize your financial goals.", href: "/services/financial-structuring" },
  { icon: "/assets/svc-debt.svg", title: "Debt Management Solutions", desc: "Professional debt management solutions to ease your repayments and move you toward financial freedom.", href: "/services/debt-management-solutions" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Services grid */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-10 sm:mb-12 max-w-[760px] mx-auto">
            <h1 className="text-[26px] sm:text-[36px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[44px]">Our Services</h1>
            <p className="text-[14px] sm:text-[16px] text-[rgba(26,31,46,0.7)] mt-3 leading-[24px] sm:leading-[28px]">
              Explore our range of financial solutions designed to simplify your loans and put you back in control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col gap-3 rounded-[8px] border border-[#f3f4f6] bg-white p-7 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)] hover:border-[rgba(76,175,80,0.3)] hover:shadow-[0_8px_30px_rgba(76,175,80,0.12)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <Image src={s.icon} alt="" width={36} height={36} unoptimized className="w-9 h-9 transition-transform duration-200 group-hover:scale-110" />
                <h3 className="text-[16px] font-bold text-[#111] leading-[24px]">{s.title}</h3>
                <p className="text-[14px] font-normal text-[rgba(26,31,46,0.7)] leading-[22px]">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#4caf50] mt-auto pt-1 group-hover:gap-2 transition-all">
                  Learn More
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="shrink-0">
                    <path d="M1 6h12M9 1l5 5-5 5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="w-full bg-white pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="relative w-full rounded-[16px] overflow-hidden min-h-[200px] sm:min-h-[250px]">
            <Image src="/assets/services-cta.png" alt="" fill unoptimized sizes="1240px" className="object-cover" />
            <div className="relative z-10 flex flex-col gap-4 max-w-[600px] px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
              <h2 className="text-[22px] sm:text-[30px] font-bold text-[#1a1f2e] leading-[30px] sm:leading-[40px] max-w-[485px]">
                Need Help Choosing? Speak With A Kreditfin Expert.
              </h2>
              <p className="text-[14px] sm:text-[16px] text-[rgba(26,31,46,0.7)] leading-[24px] sm:leading-[28px] max-w-[585px]">
                Our experts understand your goals and guide you on the best financial decision.
              </p>
              <Link href="/contact" className="inline-flex w-fit items-center gap-3 bg-[#4caf50] text-white rounded-full px-8 py-3 text-[16px] font-medium hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.3)]">
                Find out how?
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
