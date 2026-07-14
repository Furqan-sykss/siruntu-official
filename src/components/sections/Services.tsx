"use client";

import { motion, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * Services — white section (alternating rhythm: navy Works → white Services).
 * The three services intentionally mirror the three category labels shown
 * in the Hero collage placeholders (Wedding Film, Brand Content, Creative
 * Direction), so a visitor who scrolled past Hero recognizes the thread
 * instead of meeting a fresh, disconnected list.
 */

const services = [
  {
    n: "01",
    title: "Wedding Documentation",
    desc: "Photo and video coverage for wedding days, built around emotion, ceremony details, venue atmosphere, and a cinematic final story.",
    tags: ["Wedding Film", "Event Coverage", "Highlight Edit"],
  },
  {
    n: "02",
    title: "Brand & Social Media",
    desc: "Content strategy and visual handling for Instagram feeds, reels, TikTok, and brand communication that stays consistent over time.",
    tags: ["Content Strategy", "Feed & Reels", "TikTok"],
  },
  {
    n: "03",
    title: "Creative Direction",
    desc: "Concept development, product visuals, studio direction, and campaign ideas for brands that need a clearer visual presence.",
    tags: ["Product Visuals", "Studio Session", "Concept Development"],
  },
];

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

export default function Services() {
  return (
    <section id="services" className="section-pink relative px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-6xl">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="w-6 text-text">
            <SiruntuMark animate={false} />
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">Services</span>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 max-w-2xl font-display text-2xl leading-snug text-text sm:text-3xl lg:text-4xl">
          Three focused ways we help moments, brands, and ideas become publish-ready visual stories.
        </motion.p>

        <div className="mt-14 border-t border-line lg:mt-16">
          {services.map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="grid gap-4 border-b border-line py-8 sm:grid-cols-12 sm:items-start sm:gap-6 sm:py-10">
              <div className="sm:col-span-2">
                <span className="font-display text-sm text-gold">{s.n}</span>
              </div>
              <h3 className="font-display text-2xl text-text sm:col-span-4 sm:text-3xl">{s.title}</h3>
              <div className="sm:col-span-6">
                <p className="max-w-md font-sans text-sm leading-relaxed text-text-muted sm:text-base">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-sans text-[11px] uppercase tracking-[0.1em] text-text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className="font-display text-xl italic text-gold-soft sm:text-2xl">Have a project in mind?</p>
          <a href="#contact" className="rounded-full bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-gold-soft sm:text-sm">
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
