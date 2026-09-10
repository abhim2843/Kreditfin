import type { Metadata } from "next";

// Everything under /lp is a paid-traffic landing page. Keep it out of search
// indexes so it doesn't compete with the real service pages for the same
// keywords, and so a bare form never shows up as a search result.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
