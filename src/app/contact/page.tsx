import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchDemoButton from "@/components/WatchDemoButton";
import ContactButton from "@/components/ContactButton";
import LeadForm from "@/components/LeadForm";

const contactCards = [
  {
    title: "Talk to Our Team",
    value: "+91 73038 20386",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "Email",
    value: "support@kreditfin.com",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    ),
  },
  {
    title: "Operating Hours",
    value: "Everyday | 24*7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const formFeatures = [
  { title: "Share Your Requirements", desc: "Tell us about your loan needs, financial goals, and preferred repayment plans." },
  { title: "Speak With An Expert", desc: "Our loan specialists will review your details and recommend the best available options." },
];

const ctaItems = [
  {
    label: "Call Us",
    value: "+91 73038 20386",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#4caf50"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>,
  },
  {
    label: "Email Us",
    value: "support@kreditfin.com",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
  },
  {
    label: "Visit Us",
    value: "New Delhi, India",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f1f9f1 0%, #f6fbf6 60%, #ffffff 100%)" }}>
        {/* Phone illustration on the right (desktop) */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-[50%]">
          <Image src="/assets/contact-hero.png" alt="" fill priority unoptimized className="object-contain object-right" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-12 lg:py-0 lg:h-[520px] flex flex-col justify-center">
          <div className="flex flex-col gap-6 w-full lg:w-[520px] z-10">
            <div className="flex items-center gap-2 border border-[#4caf50] bg-gradient-to-r from-[rgba(76,175,80,0.2)] to-[rgba(76,175,80,0.1)] rounded-[42px] px-4 py-1 w-fit">
              <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
              <span className="text-[13px] sm:text-[14px] font-normal text-[#4caf50] leading-[24px]">We&apos;re here for you</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-[40px] sm:leading-[48px] lg:leading-[56px]">
              <span className="text-[#1a1f2e]">Let&apos;s Connect With </span>
              <span className="text-[#4caf50]">KreditFin</span>
            </h1>
            <p className="text-[16px] sm:text-[20px] lg:text-[24px] font-normal leading-[26px] sm:leading-[32px] lg:leading-[36px] text-[#1a1f2e]">
              Consolidate multiple loans into one simple loan with a lower interest rate and a single EMI
            </p>
            <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-3 mt-2">
              <ContactButton className="flex w-fit items-center gap-2 whitespace-nowrap bg-[#4caf50] text-white rounded-full px-5 sm:px-7 py-2.5 text-[14px] sm:text-[15px] font-medium hover:bg-[#43a047] transition-colors">
                Check My Savings
                <svg width="15" height="11" viewBox="0 0 16 12" fill="none" className="shrink-0"><path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </ContactButton>
              <WatchDemoButton />
            </div>
          </div>

          {/* Mobile phone illustration */}
          <div className="lg:hidden relative w-full h-[260px] sm:h-[340px] mt-8">
            <Image src="/assets/contact-hero.png" alt="" fill priority unoptimized className="object-contain" />
          </div>
        </div>
      </section>

      {/* Contact Us heading + cards */}
      <section className="w-full bg-white py-12 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Contact Us</h2>
            <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] mt-3 leading-[28px]">
              Reach out to us through the contact details below
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
            {contactCards.map((c, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3 rounded-[16px] border border-[rgba(26,31,46,0.08)] py-8 sm:py-10 px-6">
                <div className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center mb-1">{c.icon}</div>
                <h3 className="text-[20px] font-semibold text-[#1a1f2e] leading-[28px]">{c.title}</h3>
                <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)]">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="w-full py-12 sm:py-20" style={{ background: "#f8f9fb" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 items-center">
            {/* Left copy */}
            <div className="w-full lg:w-[591px] lg:shrink-0 flex flex-col gap-6">
              <h2 className="text-[26px] sm:text-[32px] font-bold text-[#1a1f2e] leading-[34px] sm:leading-[40px]">Let&apos;s Find the Right Loan Together</h2>
              <p className="text-[16px] font-normal text-[rgba(26,31,46,0.7)] leading-[24px]">
                Tell us about your financial requirements and our experts will guide you toward the most suitable loan options with complete transparency and personalized support.
              </p>
              <div className="flex flex-col gap-6 mt-2">
                {formFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(76,175,80,0.1)] flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[18px] font-semibold text-[#1a1f2e] leading-[27px]">{f.title}</h3>
                      <p className="text-[14px] font-normal text-[rgba(26,31,46,0.6)] leading-[20px]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card */}
            <div className="w-full lg:flex-1 bg-white rounded-[16px] p-6 sm:p-8" style={{ boxShadow: "0px 4px 24px rgba(0,0,0,0.06)" }}>
              <LeadForm subject="New KreditFin enquiry (Contact page)" />
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="w-full bg-white py-12 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 items-stretch">
            {/* Info card */}
            <div className="w-full lg:w-[502px] lg:shrink-0 rounded-[16px] border border-[rgba(26,31,46,0.08)] p-6 sm:p-8 flex flex-col">
              <h3 className="text-[24px] font-bold text-[#1a1f2e] leading-[32px]">KreditFin Headquarters</h3>
              <div className="flex items-start gap-3 mt-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" className="shrink-0 mt-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <p className="text-[16px] text-[rgba(26,31,46,0.7)] leading-[24px]">Plot No 4, 3rd Floor , Vikas Marg, Swasthya Vihar, New Delhi - 110092</p>
              </div>
              <div className="h-px bg-[rgba(26,31,46,0.1)] my-6" />
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#4caf50" className="shrink-0"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                <p className="text-[16px] text-[#1a1f2e]">+91 73038 20386</p>
              </div>
              <div className="h-px bg-[rgba(26,31,46,0.1)] my-6" />
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" className="shrink-0"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>
                <p className="text-[16px] text-[#1a1f2e]">support@kreditfin.com</p>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Kreditfin%2C%20Plot%20No%204%2C%203rd%20Floor%2C%20Vikas%20Marg%2C%20Swasthya%20Vihar%2C%20New%20Delhi%20110092"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-[10px] bg-[#4caf50] text-white rounded-full px-7 py-3 text-[14px] font-medium hover:bg-[#43a047] transition-colors mt-8"
              >
                Get Directions
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
            {/* Map */}
            <div className="w-full lg:flex-1 rounded-[16px] overflow-hidden relative min-h-[280px] sm:min-h-[433px]">
              <Image src="/assets/contact-map.png" alt="KreditFin location" fill unoptimized className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Help CTA banner */}
      <section className="w-full bg-white pb-12 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="rounded-[16px] px-6 sm:px-12 py-8 sm:py-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-10" style={{ background: "linear-gradient(90deg, #f1f9f1 0%, #f6fbf6 100%)" }}>
            <div className="flex items-center gap-5 lg:shrink-0">
              <div className="w-16 h-16 rounded-full bg-[rgba(76,175,80,0.12)] flex items-center justify-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[24px] font-bold leading-[32px]"><span className="text-[#1a1f2e]">We&apos;re Here to </span><span className="text-[#4caf50]">Help You</span></h3>
                <p className="text-[14px] text-[rgba(26,31,46,0.6)] leading-[20px]">Have questions or need assistance? Our team is ready to support you.</p>
              </div>
            </div>
            <div className="w-full lg:flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {ctaItems.map((c, i) => (
                <div key={i} className={`flex flex-col items-center text-center gap-1 ${i === ctaItems.length - 1 ? "max-sm:col-span-2" : ""}`}>
                  <div className="mb-1">{c.icon}</div>
                  <span className="text-[14px] font-semibold text-[#1a1f2e]">{c.label}</span>
                  <span className="text-[13px] text-[#4caf50]">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
