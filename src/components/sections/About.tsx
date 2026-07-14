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
const collaborators = ["KENIYORU", "Palm Wedding Organizer"];

export default function About() {
  return (
    <section
      id="about"
      className="section-pink relative px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="w-6 text-text">
            <SiruntuMark animate={false} />
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">
            About Us
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-4xl font-display text-2xl leading-snug text-text sm:text-3xl lg:text-4xl"
        >
          SIRUNTU&rsquo; Creative Exploration was built around one simple belief:{" "}
          <span className="italic text-gold-soft">
            meaningful visuals can help moments last longer and brands speak
            with more confidence.
          </span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:max-w-3xl"
        >
          <p className="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
            We are a compact creative team supported by trusted collaborators,
            working across wedding documentation, brand content, social media
            strategy, and visual direction with a hands-on approach.
          </p>
          <p className="font-sans text-sm leading-relaxed text-text-muted sm:text-base">
            Based in Aceh and working beyond our home city, our portfolio
            includes wedding projects in Jakarta, social media handling for
            KENIYORU, and creative exploration content for SIRUNTU itself.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 lg:mt-12"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-text-muted">
            Trusted By
          </span>
          {collaborators.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              {i > 0 && (
                <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
              )}
              <span className="font-sans text-xs uppercase tracking-[0.15em] text-text sm:text-sm">
                {c}
              </span>
            </span>
          ))}
        </motion.div>

        <div className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:pt-14">
          {steps.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex flex-col gap-3">
              <span className="font-display text-sm text-gold">{s.n}</span>
              <h3 className="font-display text-xl text-text sm:text-2xl">
                {s.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-text-muted">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
