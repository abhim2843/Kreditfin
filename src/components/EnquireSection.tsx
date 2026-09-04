"use client";
import { useState } from "react";

export default function EnquireSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    loanType: "",
    loanAmount: "",
  });

  return (
    <section className="w-full py-20" style={{ background: "linear-gradient(135deg, #f5fdf5 0%, #f0f9ff 100%)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-[30px] sm:text-[40px] font-extrabold text-[#1a1f2e] leading-[40px] sm:leading-[52px]">
                Get a Free Consultation Today
              </h2>
              <p className="text-[18px] font-normal text-[rgba(26,31,46,0.7)] leading-[30px]">
                Talk to our experts and find out how much you can save on your monthly EMI with KreditFin&apos;s loan consolidation service.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "✓", text: "100% Free consultation, no hidden charges" },
                { icon: "✓", text: "Certified financial advisors with 10+ years experience" },
                { icon: "✓", text: "Best rates from 20+ partner banks & NBFCs" },
                { icon: "✓", text: "Quick approval in 7-14 business days" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[rgba(76,175,80,0.15)] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[16px] font-normal text-[#1a1f2e]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {[
                { value: "15,000+", label: "Happy Customers" },
                { value: "₹500 Cr+", label: "Loans Consolidated" },
                { value: "4.8★", label: "Customer Rating" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 text-center bg-white rounded-[12px] p-4" style={{ boxShadow: "0px 1px 8px rgba(76,175,80,0.08)" }}>
                  <span className="text-[24px] font-bold text-[#4caf50]">{stat.value}</span>
                  <span className="text-[12px] font-normal text-[rgba(26,31,46,0.6)]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div
            className="bg-white rounded-[24px] p-8 flex flex-col gap-5"
            style={{ boxShadow: "0px 4px 40px rgba(76,175,80,0.12)" }}
          >
            <div className="mb-2">
              <h3 className="text-[20px] sm:text-[24px] font-bold text-[#1a1f2e] leading-[32px]">Enquire Now</h3>
              <p className="text-[14px] text-[rgba(26,31,46,0.6)] mt-1">Fill in your details and we&apos;ll get back to you within 24 hours</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1a1f2e]">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-3 text-[14px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.35)] focus:outline-none focus:border-[#4caf50] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1a1f2e]">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-3 text-[14px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.35)] focus:outline-none focus:border-[#4caf50] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1a1f2e]">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-3 text-[14px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.35)] focus:outline-none focus:border-[#4caf50] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1a1f2e]">Loan Type *</label>
                <select
                  value={form.loanType}
                  onChange={(e) => setForm({ ...form, loanType: e.target.value })}
                  className="border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-3 text-[14px] text-[#1a1f2e] focus:outline-none focus:border-[#4caf50] transition-colors bg-white"
                >
                  <option value="">Select loan type</option>
                  <option value="home">Home Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="multiple">Multiple Loans</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#1a1f2e]">Total Outstanding Amount *</label>
                <input
                  type="text"
                  placeholder="₹ Enter amount"
                  value={form.loanAmount}
                  onChange={(e) => setForm({ ...form, loanAmount: e.target.value })}
                  className="border border-[rgba(26,31,46,0.15)] rounded-[8px] px-4 py-3 text-[14px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.35)] focus:outline-none focus:border-[#4caf50] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4caf50] text-white rounded-full py-4 text-[16px] font-medium hover:bg-[#43a047] transition-colors shadow-[0_4px_16px_rgba(76,175,80,0.3)] mt-2"
            >
              Get Free Consultation
            </button>

            <p className="text-[12px] text-center text-[rgba(26,31,46,0.5)]">
              By submitting, you agree to our Privacy Policy. We&apos;ll never spam you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
