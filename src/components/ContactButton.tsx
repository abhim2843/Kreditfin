"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import ApplyLoanModal from "./ApplyLoanModal";

/**
 * A CTA button that opens the shared contact / lead-form modal on click.
 * Drop-in replacement for dead `<Link href="#">` CTAs — pass the same
 * className and children (label + icon).
 */
export default function ContactButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`${className ?? ""} cursor-pointer`} style={style}>
        {children}
      </button>
      <ApplyLoanModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
