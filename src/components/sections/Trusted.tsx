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

const clients = ["KENIYORU", "Palm Wedding Organizer"];
const capabilities = ["Wedding Film", "Brand & Social Media", "Creative Direction"];

function MarqueeRow({
  items,
  reverse = false,
  emphasis = false,
}: {
  items: string[];
  reverse?: boolean;
  emphasis?: boolean;
}) {
  const row = [...items, ...items, ...items];
  const doubled = [...row, ...row];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 sm:gap-16 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={`flex items-center gap-10 whitespace-nowrap font-display italic sm:gap-16 ${
              emphasis
                ? "text-3xl text-text sm:text-4xl lg:text-5xl"
                : "text-xl text-text/50 sm:text-2xl lg:text-3xl"
            }`}
          >
            {label}
            <span className="w-5 shrink-0 text-gold sm:w-6" aria-hidden="true">
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
    <section className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-6xl px-6 sm:px-10 lg:px-16">
        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">
          Trusted By
        </span>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        <MarqueeRow items={clients} emphasis />
        <MarqueeRow items={capabilities} reverse />
      </div>
    </section>
  );
}
