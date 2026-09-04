"use client";

export default function ScrollDownIndicator() {
  return (
    <div className="w-full flex justify-center py-3 bg-white">
      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
        className="w-9 h-9 rounded-full border border-[rgba(76,175,80,0.3)] flex items-center justify-center text-[#4caf50] animate-bounce hover:bg-[rgba(76,175,80,0.06)] transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v16M5 13l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
