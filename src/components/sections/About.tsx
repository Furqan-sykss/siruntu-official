"use client";

import { motion, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * About
 * Scroll-triggered (whileInView), not gated by the preloader — this section
 * lives below the fold, so it should reveal on its own terms as the visitor
 * scrolls, not wait on the intro sequence above.
 *
 * The four process steps deliberately reuse the same words shown in the
 * Preloader (Menjelajah, Merekam Momen, Meracik Visual, Berkolaborasi),
 * turning what was an abstract loading animation into an actual promise
 * about how SIRUNTU works — a narrative thread tying the two sections
 * together rather than two unrelated moments.
 */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const steps = [
  {
    n: "01",
    title: "Explore",
    desc: "We study the story, audience, tone, and visual direction before the first frame is captured.",
  },
  {
    n: "02",
    title: "Capture",
    desc: "We document real moments on location, from wedding ceremonies to brand and product sessions.",
  },
  {
    n: "03",
    title: "Shape",
    desc: "We refine the work through editing, color, pacing, and layout so every story feels intentional.",
  },
  {
    n: "04",
    title: "Collaborate",
    desc: "We keep the process clear through feedback and revisions until the result feels aligned and ready to publish.",
  },
];

// Real, verified collaborations only — no invented client names or numbers.
const collaborators = ["Sekaringsrengenge (Trip Surf collaboration)", "Palm Wedding Organizer (WCC Wedding Content)", "Sealpak Packaging (PT. Datindo Image Werks)", "KENIYORU Skincare"];

export default function About() {
  return (
    <section id="about" className="section-pink relative isolate overflow-hidden px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(38px, 6vw, 78px) clamp(38px, 6vw, 78px)",
        }}
      />
      <div className="pointer-events-none absolute -right-16 top-16 h-52 w-52 border-2 border-gold/25 bg-surface/45 sm:h-72 sm:w-72" />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative mx-auto max-w-6xl">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
            <SiruntuMark animate={false} />
          </span>
          <span className="border-2 border-line bg-bg/45 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">About Us</span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 max-w-4xl border-2 border-text bg-bg/40 p-5 font-display text-[2rem] leading-[1.08] text-text shadow-[8px_8px_0_var(--gold)] sm:p-7 sm:text-3xl lg:text-4xl">
          SIRUNTU&rsquo; Creative Exploration was built around one simple belief: <span className="italic text-gold-soft">meaningful visuals can help moments last longer and brands speak with more confidence.</span>
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:max-w-3xl">
          <p className="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
            We are a compact creative team supported by trusted collaborators, working across wedding documentation, brand and packaging content, social media strategy, and long-form documentary storytelling.
          </p>
          <p className="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
            Based in Jakarta, Indonesia, our portfolio spans skincare branding for KENIYORU, food-grade packaging storytelling for Sealpak Packaging (PT. Datindo Image Werks), wedding content productions, and ongoing documentary
            collaborations.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3 border-2 border-line bg-surface/55 px-4 py-3 sm:mt-10 lg:mt-12">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-text-muted sm:text-[11px]">Trusted By</span>
          {collaborators.map((c, i) => (
            <span key={c} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && <span className="h-1 w-5 bg-gold/60" aria-hidden="true" />}
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-text sm:text-xs sm:tracking-[0.15em] lg:text-sm">{c}</span>
            </span>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex min-h-56 flex-col gap-3 border-2 border-line bg-surface/58 p-5 shadow-[5px_5px_0_rgba(23,27,44,0.12)]">
              <span className="font-display text-sm text-gold">{s.n}</span>
              <h3 className="font-display text-xl text-text sm:text-2xl">{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-text-muted sm:text-[15px]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
