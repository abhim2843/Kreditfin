"use client";

import { useState } from "react";
import { submitLead } from "@/lib/submitLead";

function Field({ label, name, placeholder, type = "text", required = true }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[14px] font-medium text-[#1a1f2e]">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="border border-[rgba(26,31,46,0.15)] rounded-[10px] px-4 py-3 text-[14px] text-[#1a1f2e] placeholder:text-[rgba(26,31,46,0.4)] focus:outline-none focus:border-[#4caf50] transition-colors"
      />
    </div>
  );
}

export default function LeadForm({ subject, onSuccess }: { subject?: string; onSuccess?: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      "Full Name": String(fd.get("name") || ""),
      "Mobile Number": String(fd.get("mobile") || ""),
      "Email Address": String(fd.get("email") || ""),
      "Total Loan Amount": String(fd.get("amount") || ""),
    };
    setStatus("submitting");
    setError("");
    try {
      await submitLead(data, subject ?? "New KreditFin enquiry");
      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-8">
        <span className="w-14 h-14 rounded-full bg-[rgba(76,175,80,0.12)] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-10" stroke="#4caf50" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <h3 className="text-[20px] font-bold text-[#1a1f2e]">Thank you!</h3>
        <p className="text-[14px] text-[rgba(26,31,46,0.7)] max-w-[360px]">
          Your details have been received. Our experts will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-[14px] font-medium text-[#4caf50] hover:underline cursor-pointer"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" placeholder="Enter Your Full Name" />
        <Field label="Mobile Number" name="mobile" type="tel" placeholder="Enter Your Mobile No" />
      </div>
      <Field label="Email Address" name="email" type="email" placeholder="Enter Your Email" />
      <Field label="Total Loan Amount" name="amount" placeholder="Enter Total Amount" required={false} />

      {status === "error" && (
        <p className="text-[13px] text-[#ef4444] text-center">{error}</p>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-3 bg-[#4caf50] text-white rounded-full px-10 py-3.5 text-[16px] font-medium hover:bg-[#43a047] transition-colors shadow-[0_6px_18px_rgba(76,175,80,0.3)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === "submitting" ? "Sending…" : "Talk to Our Experts"}
          {status !== "submitting" && (
            <svg width="18" height="14" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M9 1l6 5-6 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </button>
      </div>
    </form>
  );
}
