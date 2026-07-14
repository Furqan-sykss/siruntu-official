"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * Hero
 * First full view after the preloader curtain lifts. Typography-led on
 * purpose — SIRUNTU doesn't have final photo/video assets in yet, so rather
 * than sit on gray placeholder boxes, the right-hand collage leans into
 * being a *labelled* placeholder: it previews the three work categories
 * (wedding film, brand content, creative direction) that will later hold
 * real imagery, framed like a moodboard rather than "under construction".
 *
 * Animation only starts once `ready` flips true — i.e. once the preloader
 * curtain has finished rising — so the two motions read as one continuous
 * gesture instead of two unrelated animations colliding.
 *
 * Interactivity: on fine-pointer devices (mouse), the watermark mark and
 * the collage tilt slightly toward the cursor — a lightweight CSS 3D
 * effect (perspective + rotateX/rotateY), not WebGL, so it stays cheap on
 * every device. On touch devices there's no cursor to react to, so the
 * collage instead does a slow idle float — still feels alive, no gyroscope
 * permission prompts involved. Both are skipped entirely under
 * prefers-reduced-motion.
 */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// Each headline line sits inside an overflow-hidden mask, so this reads as
// the line sliding up from behind a curtain rather than a plain fade.
const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const frameCategories = [
  {
    label: "Wedding Film",
    ratio: "aspect-[5/6] md:aspect-[0.9/1.12] lg:aspect-[3/4]",
    area: "md:row-span-2",
    image: "/img/IMG-20240313-WA0051.jpg",
  },
  {
    label: "Brand Content",
    ratio: "aspect-[4/3] md:aspect-[1.05/1]",
    area: "",
    image: "/img/IMG-20240314-WA0048.jpeg",
  },
  {
    label: "Creative Direction",
    ratio: "aspect-[4/3] md:aspect-[1.05/1]",
    area: "",
    image: "/img/IMG-20240315-WA0038.jpeg",
  },
];

function PlaceholderFrame({ label, className = "", image = "" }: { label: string; className?: string; image?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm border border-line bg-surface/60 ${className}`}
      style={{
        backgroundImage: image ? `url('${image}')` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay for better text readability */}
      {image && <div className="absolute inset-0 bg-black/30" />}
      {/* faint diagonal hatch — reads as "moodboard placeholder", not empty */}
      {!image && (
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, var(--text-muted) 0px, var(--text-muted) 1px, transparent 1px, transparent 14px)",
          }}
        />
      )}
      {/* corner crosshairs, like a framing guide */}
      <span className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-gold/50" />
      <span className="absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-gold/50" />

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3 sm:p-4">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted sm:text-[11px]">{label}</span>
        {!image && <span className="font-sans text-[10px] text-text-muted/60">soon</span>}
      </div>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState<boolean | null>(null);

  // Raw pointer position, normalized to -1..1 within the section bounds.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 16, mass: 0.6 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 16, mass: 0.6 });

  const markX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const markY = useTransform(smoothY, [-1, 1], [-14, 14]);
  const collageRotateY = useTransform(smoothX, [-1, 1], [7, -7]);
  const collageRotateX = useTransform(smoothY, [-1, 1], [-4, 4]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // One-time sync from an external system (matchMedia) into React state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTiltEnabled(fine && !reduced);
  }, []);

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    if (!tiltEnabled || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section id="hero" ref={sectionRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className="section-surface relative flex min-h-[100svh] flex-col overflow-hidden px-6 pb-14 pt-28 sm:px-10 sm:pt-32 lg:px-16">
      {/* oversized watermark mark, decorative only — static outer positioning,
          inner motion.div carries only the mouse-parallax offset so the two
          transforms never clobber each other. */}
      <div className="pointer-events-none absolute -right-24 top-1/3 w-[520px] -translate-y-1/2 rotate-[-8deg] sm:w-[720px]">
        <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={ready ? { opacity: 0.05 } : {}} transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }} style={{ x: markX, y: markY }} className="text-text">
          <SiruntuMark animate={false} />
        </motion.div>
      </div>

      <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-12 md:flex-row md:items-center md:gap-8 lg:gap-12">
        {/* Text column */}
        <div className="flex flex-col gap-7 md:w-[54%] lg:w-[56%]">
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-7 text-text">
              <SiruntuMark animate={false} />
            </span>
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">SIRUNTU&rsquo; Creative Exploration</span>
          </motion.div>

          <h1 className="font-display leading-[1.02] text-text">
            <span className="block overflow-hidden">
              <motion.span variants={lineReveal} className="block text-[13vw] font-medium sm:text-6xl md:text-[clamp(3.4rem,5.6vw,4.8rem)] lg:text-7xl">
                We Create
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={lineReveal} className="block text-[15vw] italic text-gold-soft sm:text-7xl md:text-[clamp(4rem,6.4vw,5.4rem)] lg:text-8xl">
                Visual Stories
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={lineReveal} className="block text-[13vw] font-medium sm:text-6xl md:text-[clamp(3.4rem,5.6vw,4.8rem)] lg:text-7xl">
                That Stay
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="max-w-[46ch] font-sans text-sm leading-relaxed text-text-muted sm:text-base">
            A creative team from Jakarta helping brands and celebrations grow through photography, video, social media content, and thoughtful visual exploration.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#work" className="rounded-full bg-gold px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-gold-soft sm:text-sm">
              View Our Work
            </a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-text transition-colors hover:border-gold hover:text-gold sm:text-sm">
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Collage placeholder column — perspective wrapper enables the
            child's rotateX/rotateY to read as a real 3D tilt rather than a
            flat skew. */}
        <motion.div variants={fadeUp} style={{ perspective: 1000 }} className="md:w-[46%] lg:w-[44%]">
          {tiltEnabled === true && (
            <motion.div
              style={{
                rotateX: collageRotateX,
                rotateY: collageRotateY,
                transformStyle: "preserve-3d",
              }}
              className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-rows-2"
            >
              {frameCategories.map((f) => (
                <PlaceholderFrame key={f.label} label={f.label} image={f.image} className={`${f.ratio} ${f.area} ${f.label === "Wedding Film" ? "col-span-2 sm:col-span-1" : ""}`} />
              ))}
            </motion.div>
          )}
          {tiltEnabled === false && (
            <motion.div
              animate={{
                rotateY: [0, 3, 0, -3, 0],
                rotateX: [0, -2, 0, 2, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-rows-2"
            >
              {frameCategories.map((f) => (
                <PlaceholderFrame key={f.label} label={f.label} image={f.image} className={`${f.ratio} ${f.area} ${f.label === "Wedding Film" ? "col-span-2 sm:col-span-1" : ""}`} />
              ))}
            </motion.div>
          )}
          {tiltEnabled === null && (
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:grid-rows-2">
              {frameCategories.map((f) => (
                <PlaceholderFrame key={f.label} label={f.label} image={f.image} className={`${f.ratio} ${f.area} ${f.label === "Wedding Film" ? "col-span-2 sm:col-span-1" : ""}`} />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.1 }} className="relative z-10 mx-auto mt-10 flex flex-col items-center gap-3 lg:mt-6">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-text-muted">Scroll Down</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
