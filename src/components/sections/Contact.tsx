"use client";

import { motion, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * Contact — closing CTA, pink section (rhythm: navy Works → white Services
 * → pink Contact, ending warm).
 *
 * CONTACT DETAILS ARE PLACEHOLDERS. Update the three constants below once
 * final numbers/handles are confirmed — nothing else in this file needs to
 * change.
 */
const WHATSAPP_NUMBER = "6288212947116"; // digits only, country code, no "+"
const EMAIL = "hello@siruntu.id";
const INSTAGRAM_HANDLE = "siruntuofficial";

const contactLinks = [
  {
    label: "WhatsApp",
    value: "+62 882-1294-7116",
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
    href: `https://instagram.com/${INSTAGRAM_HANDLE}`,
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
    <section id="contact" className="section-pink relative overflow-hidden px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute -left-16 bottom-0 w-[420px] rotate-[6deg] text-text sm:w-[560px]"
      >
        <SiruntuMark animate={false} />
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="relative mx-auto max-w-4xl">
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="w-6 text-text">
            <SiruntuMark animate={false} />
          </span>
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">Contact Us</span>
        </motion.div>

        <motion.h2 variants={fadeUp} className="mt-8 max-w-2xl font-display text-3xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
          Let&rsquo;s shape <span className="italic text-gold-soft">your next story</span> with intention.
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-6 max-w-md font-sans text-sm leading-relaxed text-text-muted sm:text-base">
          Tell us about your wedding, brand, packaging, documentary, or creative project. We will help translate the idea into a polished visual direction.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4 lg:mt-12">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="rounded-full bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-gold-soft sm:text-sm">
            Chat via WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="rounded-full border border-line px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-text transition-colors hover:border-gold hover:text-gold sm:text-sm">
            Send Email
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3 lg:mt-16">
          {contactLinks.map((c) => (
            <a key={c.label} href={c.href} target={c.label === "Instagram" ? "_blank" : undefined} rel={c.label === "Instagram" ? "noopener noreferrer" : undefined} className="group flex flex-col gap-1">
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
