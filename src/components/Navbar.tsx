"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ServicesMegaMenu from "./ServicesMegaMenu";

const tools = [
  { label: "EMI Calculator", href: "/emi-calculator" },
  { label: "FD Calculator", href: "/fd-calculator" },
  { label: "Consolidated EMI Calculator", href: "/consolidated-emi-calculator" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Trust Band */}
      <div className="hidden xl:block bg-[#f5f5f5] py-[10px] sm:py-[15px] px-4 sm:px-8 lg:px-[100px]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <span className="flex items-center gap-2 text-[12px] sm:text-[14px] font-normal text-[#1a1f2e]">
            <span
              aria-hidden
              className="block w-[18px] h-[18px] shrink-0"
              style={{
                backgroundColor: "#4caf50",
                WebkitMaskImage: "url('/assets/ic-friends.png')",
                maskImage: "url('/assets/ic-friends.png')",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            Trusted by over <span className="text-[#4caf50]">15,000+</span> users all over India
          </span>
          <div className="hidden md:flex items-center gap-5">
            <Link href="/about" className="text-[14px] text-[#1a1f2e] hover:text-[#4caf50] transition-colors">About Us</Link>
            <div className="w-px h-4 bg-[rgba(26,31,46,0.2)]" />
            <Link href="https://wa.me/917303820386?text=Hi%20KreditFin%2C%20I%27d%20like%20to%20know%20more%20about%20your%20loan%20services." target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1a1f2e] hover:text-[#4caf50] transition-colors">Ask The Experts</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav ref={mobileMenuRef} className="relative bg-white border-b border-[rgba(26,31,46,0.08)] shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        <div
          className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-[14px] flex items-center justify-between"
          onMouseLeave={() => {
            setServicesOpen(false);
            setToolsOpen(false);
          }}
        >
          {/* Mobile hamburger - left */}
          <button
            className="xl:hidden p-1 -ml-1 text-[#1a1f2e]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Menu"}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <Link
            href="/"
            className="flex-shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:static xl:left-auto xl:top-auto xl:translate-x-0 xl:translate-y-0"
          >
            <Image
              src="/assets/logo.png"
              alt="KreditFin"
              width={163}
              height={41}
              priority
              className="h-[32px] xl:h-[38px] w-auto object-contain"
            />
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden xl:flex items-center gap-6">
            <Link href="/cibil" onMouseEnter={() => { setServicesOpen(false); setToolsOpen(false); }} className="nav-link text-[14px] font-medium text-[#1a1f2e] hover:text-[#4caf50] transition-colors">Check CIBIL</Link>
            <div className="relative flex items-center gap-1 cursor-pointer group" onMouseEnter={() => { setToolsOpen(true); setServicesOpen(false); }}>
              <span className={`nav-link text-[14px] font-medium transition-colors ${toolsOpen ? "nav-link-open text-[#4caf50]" : "text-[#1a1f2e] hover:text-[#4caf50]"}`}>Tools</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${toolsOpen ? "rotate-180 text-[#4caf50]" : "text-[#1a1f2e]"}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Tools dropdown */}
              <div
                className={`absolute left-0 top-full pt-3 z-50 transition-all duration-200 ease-out ${
                  toolsOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-[240px] bg-white rounded-[10px] border border-[rgba(26,31,46,0.08)] shadow-[0_12px_24px_rgba(0,0,0,0.1)] p-2 flex flex-col">
                  {tools.map((tool) => (
                    <Link
                      key={tool.label}
                      href={tool.href}
                      className="px-3 py-2.5 rounded-[8px] text-[14px] font-medium text-[#1a1f2e] hover:bg-[rgba(76,175,80,0.08)] hover:text-[#4caf50] transition-colors"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 cursor-pointer group" onMouseEnter={() => { setServicesOpen(true); setToolsOpen(false); }}>
              <Link href="/services" className={`nav-link text-[14px] font-medium transition-colors ${servicesOpen ? "nav-link-open text-[#4caf50]" : "text-[#1a1f2e] hover:text-[#4caf50]"}`}>Services</Link>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${servicesOpen ? "rotate-180 text-[#4caf50]" : "text-[#1a1f2e]"}`}>
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Link href="/contact" onMouseEnter={() => { setServicesOpen(false); setToolsOpen(false); }} className="nav-link text-[14px] font-medium text-[#1a1f2e] hover:text-[#4caf50] transition-colors">Contact Us</Link>
            <Link href="/about" onMouseEnter={() => { setServicesOpen(false); setToolsOpen(false); }} className="nav-link text-[14px] font-medium text-[#1a1f2e] hover:text-[#4caf50] transition-colors">About Us</Link>
            <Link href="/blogs" onMouseEnter={() => { setServicesOpen(false); setToolsOpen(false); }} className="nav-link text-[14px] font-medium text-[#1a1f2e] hover:text-[#4caf50] transition-colors">Blogs</Link>
          </div>

          {/* Right CTAs */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="https://wa.me/917303820386?text=Hi%20KreditFin%2C%20I%27d%20like%20to%20know%20more%20about%20your%20loan%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-[#25d366] rounded-[8px] px-4 py-[9px] text-[14px] font-medium text-[#1a1f2e] hover:bg-[#f0fdf4] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.52 5.856L.057 23.857l6.174-1.458A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 16.994c-.232.644-1.353 1.232-1.863 1.283-.51.05-.993.239-3.32-.691-2.79-1.115-4.593-3.975-4.73-4.157-.136-.181-1.112-1.481-1.112-2.825 0-1.343.7-2.004 1.007-2.282.307-.278.67-.347.893-.347.224 0 .447.002.642.01.205.01.481-.078.752.573.281.672.955 2.31.04 2.478-.114.022-.2.194-.2.194s-.2.37.446 1.24c.647.871 1.673 1.788 2.363 2.174.69.386 1.103.323 1.453.046.35-.277.559-.924.702-1.086.143-.162.347-.208.596-.124.25.084 1.587.749 1.859.886.272.136.453.205.521.318.068.113.068.656-.165 1.3z"/>
              </svg>
              WhatsApp
            </Link>
            <Link
              href="/apply"
              className="flex items-center gap-2 bg-[#4caf50] rounded-[8px] px-5 py-[9px] text-[14px] font-medium text-white hover:bg-[#43a047] transition-colors shadow-[0_4px_12px_rgba(76,175,80,0.25)]"
            >
              Apply For Loan
            </Link>
          </div>

          {/* Services mega-menu (desktop hover) */}
          <div
            className={`hidden xl:block absolute left-0 right-0 top-full px-4 sm:px-8 lg:px-[100px] z-50 transition-all duration-200 ease-out ${
              servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            onMouseEnter={() => setServicesOpen(true)}
          >
            <div className="mx-auto max-w-[920px] mt-2">
              <ServicesMegaMenu />
            </div>
          </div>

        </div>

        {/* Mobile Menu — animated overlay */}
        <div
          className={`xl:hidden absolute top-full left-0 right-0 z-50 grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
            menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-white border-t border-[rgba(26,31,46,0.08)] shadow-[0_12px_24px_rgba(0,0,0,0.1)] px-3 py-3 flex flex-col">
              <Link
                href="/cibil"
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between px-4 py-3.5 rounded-[10px] text-[15px] font-medium text-[#1a1f2e] hover:bg-[rgba(76,175,80,0.08)] hover:text-[#4caf50] transition-colors"
              >
                Check CIBIL
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[rgba(26,31,46,0.3)] group-hover:text-[#4caf50] group-hover:translate-x-0.5 transition-all">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Tools (expandable) */}
              <button
                type="button"
                onClick={() => setMobileToolsOpen((v) => !v)}
                className="flex items-center justify-between px-4 py-3.5 rounded-[10px] text-[15px] font-medium text-[#1a1f2e] hover:bg-[rgba(76,175,80,0.08)] hover:text-[#4caf50] transition-colors"
              >
                Tools
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${mobileToolsOpen ? "rotate-180 text-[#4caf50]" : "text-[rgba(26,31,46,0.4)]"}`}>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                  mobileToolsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden flex flex-col pl-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.label}
                      href={tool.href}
                      onClick={() => { setMenuOpen(false); setMobileToolsOpen(false); }}
                      className="group flex items-center justify-between px-4 py-3 rounded-[10px] text-[14px] font-medium text-[rgba(26,31,46,0.8)] hover:bg-[rgba(76,175,80,0.08)] hover:text-[#4caf50] transition-colors"
                    >
                      {tool.label}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[rgba(26,31,46,0.3)] group-hover:text-[#4caf50] group-hover:translate-x-0.5 transition-all">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {[
                { label: "Services", href: "/services" },
                { label: "Contact Us", href: "/contact" },
                { label: "About Us", href: "/about" },
                { label: "Blogs", href: "/blogs" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-[10px] text-[15px] font-medium text-[#1a1f2e] hover:bg-[rgba(76,175,80,0.08)] hover:text-[#4caf50] transition-colors"
                >
                  {item.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[rgba(26,31,46,0.3)] group-hover:text-[#4caf50] group-hover:translate-x-0.5 transition-all">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 bg-[#4caf50] text-white rounded-full py-3 text-[15px] font-medium hover:bg-[#43a047] transition-colors"
              >
                Apply For Loan
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h11M8 1l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating WhatsApp button - mobile only */}
      <Link
        href="https://wa.me/917303820386?text=Hi%20KreditFin%2C%20I%27d%20like%20to%20know%20more%20about%20your%20loan%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="xl:hidden fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25d366] shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.52 5.856L.057 23.857l6.174-1.458A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.894 16.994c-.232.644-1.353 1.232-1.863 1.283-.51.05-.993.239-3.32-.691-2.79-1.115-4.593-3.975-4.73-4.157-.136-.181-1.112-1.481-1.112-2.825 0-1.343.7-2.004 1.007-2.282.307-.278.67-.347.893-.347.224 0 .447.002.642.01.205.01.481-.078.752.573.281.672.955 2.31.04 2.478-.114.022-.2.194-.2.194s-.2.37.446 1.24c.647.871 1.673 1.788 2.363 2.174.69.386 1.103.323 1.453.046.35-.277.559-.924.702-1.086.143-.162.347-.208.596-.124.25.084 1.587.749 1.859.886.272.136.453.205.521.318.068.113.068.656-.165 1.3z"/>
        </svg>
      </Link>
    </header>
  );
}
