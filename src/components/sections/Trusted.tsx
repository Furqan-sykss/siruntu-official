"use client";

import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * Trusted
 * Compact navy band between Services and Contact — social proof before the
 * closing CTA. Only two verified client names exist right now, so rather
 * than pad the marquee with invented brands, row 1 repeats the real names
 * and row 2 (opposite direction) cycles through actual service categories
 * instead of fabricated logos. Both rows are the same content doubled back
 * to back, translated by exactly -50%, for a seamless infinite loop.
 */

const clients = ["KENIYORU", "Sealpak Packaging", "Palm Wedding Organizer", "Sekaringsrengenge"];
const capabilities = ["Wedding Film", "Brand & Social Media", "Documentary Storytelling"];

function MarqueeRow({ items, reverse = false, emphasis = false }: { items: string[]; reverse?: boolean; emphasis?: boolean }) {
  const row = [...items, ...items, ...items];
  const doubled = [...row, ...row];

  return (
    <div className="overflow-hidden">
      <div className={`flex w-max items-center gap-4 sm:gap-6 lg:gap-8 ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className={`flex items-center gap-2 whitespace-nowrap font-display italic sm:gap-3 ${emphasis ? "text-2xl text-text sm:text-3xl lg:text-5xl" : "text-lg text-text/50 sm:text-2xl lg:text-3xl"}`}>
            {label}
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" aria-hidden="true" />
            <span className="w-4 shrink-0 text-gold sm:w-5" aria-hidden="true">
              <SiruntuMark animate={false} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Trusted() {
  return (
    <section className="section-surface relative overflow-hidden py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)",
        }}
      />
      <div className="relative mx-auto mb-10 max-w-6xl px-6 sm:px-10 lg:px-16">
        <span className="border-2 border-line bg-bg/65 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Trusted By</span>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-6">
        <MarqueeRow items={clients} emphasis />
        <MarqueeRow items={capabilities} reverse />
      </div>
    </section>
  );
}
