"use client";

import type { ButtonHTMLAttributes } from "react";
import { useLenis } from "lenis/react";

type SectionScrollButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  sectionId: string;
};

export default function SectionScrollButton({ sectionId, ...props }: SectionScrollButtonProps) {
  const lenis = useLenis();

  const scrollToSection = () => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return <button type="button" onClick={scrollToSection} {...props} />;
}
