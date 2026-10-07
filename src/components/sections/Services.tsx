"use client";

import { motion, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";
import SectionScrollButton from "@/components/SectionScrollButton";
import SiruntuWatermarks from "@/components/sections/SiruntuWatermarks";

/**
 * Services — white section (alternating rhythm: navy Works → white Services).
 * The three services intentionally mirror the three category labels shown
 * in the Hero collage placeholders (Wedding Film, Brand Content, Documentary
 * Stories), so a visitor who scrolled past Hero recognizes the thread
 * instead of meeting a fresh, disconnected list.
 */

const services = [
  {
    n: "01",
    title: "Wedding Documentation",
    desc: "Documentary coverage for weddings, crafted around ceremony emotion, venue atmosphere, and cinematic storytelling.",
    tags: ["Wedding Film", "Event Coverage", "Highlight Edit"],
  },
  {
    n: "02",
    title: "Brand & Social Media",
    desc: "We're a creative team ready to assist in developing your social media strategies. That includes Instagram, feed, reels, and yes, even TikTok! Over the past few months, we've been entrusted with managing a brand, and we consider it both an honor and an achievement to be able to expand it into future businesses.",
    tags: ["Brand Strategy", "Content Pillar", "Monthly Report Account"],
  },
  {
    n: "03",
    title: "Creative Direction",
    desc: "Long form storytelling, campaign ideas, and visual concept development for projects  and event that require clarity, cohesion, and emotional resonance.",
    tags: ["Visual Strategy", "Build Brand Strategy", "Concept Development"],
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

function ServicesBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.2]"
      style={{
        backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
        backgroundSize: "clamp(38px, 6vw, 78px) clamp(38px, 6vw, 78px)",
      }}
    />
  );
}

function ServicesContent() {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative z-10 mx-auto max-w-6xl">
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
          <SiruntuMark animate={false} />
        </span>
        <span className="border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Services</span>
      </motion.div>

      <motion.p variants={fadeUp} className="mt-8 max-w-2xl border-l-4 border-gold pl-5 font-display text-2xl leading-snug text-text sm:text-3xl lg:text-4xl">
        Three focused ways we help moments, brands, and ideas become publish-ready visual stories.
      </motion.p>

      <div className="relative isolate mt-14 border-2 border-text bg-bg shadow-[8px_8px_0_var(--gold)] lg:mt-16">
        <SiruntuWatermarks section="services" light />
        {services.map((s) => (
          <motion.div key={s.n} variants={fadeUp} className="relative z-10 grid gap-4 border-b-2 border-line p-5 last:border-b-0 sm:grid-cols-12 sm:items-start sm:gap-6 sm:p-7 lg:p-8">
            <div className="sm:col-span-2">
              <span className="font-display text-sm text-gold">{s.n}</span>
            </div>
            <h3 className="font-display text-2xl text-text sm:col-span-4 sm:text-3xl">{s.title}</h3>
            <div className="sm:col-span-6">
              <p className="max-w-md font-sans text-sm leading-relaxed text-text-muted sm:text-base">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="border-2 border-line bg-surface px-3 py-1 font-sans text-[11px] font-black uppercase tracking-[0.1em] text-text-muted">
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
        <SectionScrollButton
          sectionId="contact"
          className="border-2 border-text bg-gold px-6 py-3 font-sans text-xs font-black uppercase tracking-[0.15em] text-bg shadow-[5px_5px_0_var(--text)] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft sm:text-sm"
        >
          Contact Us
        </SectionScrollButton>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-white relative z-20 -mt-[90dvh] isolate overflow-hidden px-6 pt-8 pb-24 sm:px-10 sm:pt-8 sm:pb-28 md:mt-0 md:pt-24 lg:px-16 lg:pb-32 lg:pt-32">
      <ServicesBackground />
      <ServicesContent />
    </section>
  );
}
