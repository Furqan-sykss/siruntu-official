"use client";

import { motion, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";
import SiruntuWatermarks from "@/components/sections/SiruntuWatermarks";

/**
 * Contact — closing CTA, pink section (rhythm: navy Works → white Services
 * → pink Contact, ending warm).
 *
 * Contact destinations are centralized here so cards and CTA buttons stay
 * in sync.
 */
const WHATSAPP_NUMBER = "62895604275372"; // digits only, country code, no "+"
const EMAIL = "contact.siruntu@gmail.com";
const INSTAGRAM_HANDLE = "siruntuofficial";

const contactLinks = [
  {
    label: "WhatsApp",
    value: "+62 895-6042-75372",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    label: "Instagram",
    value: `@${INSTAGRAM_HANDLE}`,
    href: `https://www.instagram.com/${INSTAGRAM_HANDLE}`,
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

export default function Contact() {
  return (
    <section id="contact" className="section-pink relative isolate overflow-hidden px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(38px, 6vw, 78px) clamp(38px, 6vw, 78px)",
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.16 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute -left-16 bottom-0 w-[420px] rotate-[6deg] text-text sm:w-[560px]"
      >
        <SiruntuMark animate={false} />
      </motion.div>
      <SiruntuWatermarks section="contact" light />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative z-10 mx-auto max-w-4xl">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
            <SiruntuMark animate={false} />
          </span>
          <span className="border-2 border-line bg-bg/45 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Contact Us</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="mt-8 max-w-2xl border-2 border-text bg-bg/40 p-5 font-display text-3xl leading-[1.1] text-text shadow-[8px_8px_0_var(--gold)] sm:p-7 sm:text-5xl lg:text-6xl">
          Let&rsquo;s shape <span className="italic text-gold-soft">your next story</span> with intention.
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 max-w-md font-sans text-sm leading-relaxed text-text-muted sm:text-base">
          Tell us about your wedding, brand, packaging, documentary, or creative project. We will help translate the idea into a polished visual direction.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4 lg:mt-12">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="border-2 border-text bg-gold px-6 py-3 font-sans text-xs font-black uppercase tracking-[0.15em] text-white shadow-[5px_5px_0_var(--text)] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-soft sm:text-sm"
          >
            Chat via WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="border-2 border-line bg-bg/45 px-6 py-3 font-sans text-xs font-black uppercase tracking-[0.15em] text-text shadow-[5px_5px_0_rgba(23,27,44,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:text-sm"
          >
            Send Email
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-14 grid gap-4 sm:grid-cols-3 lg:mt-16">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "Instagram" ? "_blank" : undefined}
              rel={c.label === "Instagram" ? "noopener noreferrer" : undefined}
              className="group flex min-h-28 flex-col justify-between border-2 border-line bg-surface/58 p-4 shadow-[5px_5px_0_rgba(23,27,44,0.12)]"
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted">{c.label}</span>
              <span className="font-display text-lg text-text transition-colors group-hover:text-gold sm:text-xl">{c.value}</span>
            </a>
          ))}
        </motion.div>

        <motion.p variants={fadeUp} className="mt-10 font-sans text-xs uppercase tracking-[0.2em] text-text-muted">
          Jakarta, Indonesia
        </motion.p>
      </motion.div>
    </section>
  );
}
