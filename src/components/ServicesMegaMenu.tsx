import Image from "next/image";
import Link from "next/link";

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

export default function ServicesMegaMenu() {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_12px_40px_rgba(0,0,0,0.12)] border border-[#f3f4f6] p-2 grid grid-cols-3">
      {services.map((s) => (
        <Link
          key={s.title}
          href={s.href ?? "/services"}
          className="group flex flex-col gap-2 rounded-[10px] p-4 border border-transparent hover:border-[rgba(76,175,80,0.25)] hover:bg-[rgba(76,175,80,0.1)] hover:shadow-[0_6px_18px_rgba(76,175,80,0.15)] hover:-translate-y-0.5 transition-all duration-200 ease-out"
        >
          <Image src={s.icon} alt="" width={28} height={28} unoptimized className="w-7 h-7 transition-transform duration-200 group-hover:scale-110" />
          <h3 className="text-[14px] font-bold text-[#111] leading-[20px]">{s.title}</h3>
          <p className="text-[12px] font-normal text-[rgba(26,31,46,0.7)] leading-[18px]">{s.desc}</p>
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#4caf50] mt-auto pt-0.5 group-hover:gap-2 transition-all">
            Learn More
            <svg width="14" height="10" viewBox="0 0 16 12" fill="none" className="shrink-0">
              <path d="M1 6h12M9 1l5 5-5 5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
