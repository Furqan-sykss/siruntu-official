"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const lineReveal: Variants = {
  hidden: { y: "112%", rotate: 1.5 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.86, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroFrames = [
  {
    label: "Field Work",
    src: "/img/IMG-20240314-WA0090.jpg",
    className: "col-span-5 row-span-3 sm:col-span-6 lg:col-span-5",
    imageClassName: "object-[54%_45%]",
  },
  {
    label: "Brand System",
    src: "/img/IMG-20240316-WA0043.jpg",
    className: "col-span-7 row-span-2 sm:col-span-6 lg:col-span-7",
    imageClassName: "object-[48%_45%]",
  },
  {
    label: "Launch Detail",
    src: "/img/IMG-20240314-WA0111.jpg",
    className: "col-span-7 row-span-2 sm:col-span-7 lg:col-span-6",
    imageClassName: "object-[50%_55%]",
  },
  {
    label: "Content Ops",
    src: "/img/IMG-20240317-WA0048.jpg",
    className: "col-span-5 row-span-3 sm:col-span-5 lg:col-span-6",
    imageClassName: "object-[48%_42%]",
  },
];

const capabilities = ["Visual Direction", "Photo + Video", "Social Content", "Brand Story"];

function HeroFrame({
  label,
  src,
  className,
  imageClassName,
}: {
  label: string;
  src: string;
  className: string;
  imageClassName: string;
}) {
  return (
    <div className={`group relative overflow-hidden border-2 border-text bg-surface shadow-[6px_6px_0_var(--gold)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`SIRUNTU ${label.toLowerCase()} documentation`} className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${imageClassName}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/82 via-bg/10 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.11] mix-blend-screen"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute left-2 top-2 h-5 w-5 border-l-2 border-t-2 border-gold sm:left-3 sm:top-3" />
      <span className="absolute bottom-2 left-2 bg-text px-2 py-1 font-sans text-[9px] font-black uppercase tracking-[0.16em] text-bg sm:bottom-3 sm:left-3 sm:text-[10px]">{label}</span>
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [tiltEnabled, setTiltEnabled] = useState<boolean | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 70, damping: 18, mass: 0.65 });
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18, mass: 0.65 });

  const markX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const markY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const boardRotateY = useTransform(smoothX, [-1, 1], [5, -5]);
  const boardRotateX = useTransform(smoothY, [-1, 1], [-3, 3]);
  const accentX = useTransform(smoothX, [-1, 1], [-10, 10]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // One-time sync from browser media queries into the interactive hero state.
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

  const boardMotion =
    tiltEnabled === true
      ? { rotateX: boardRotateX, rotateY: boardRotateY, transformStyle: "preserve-3d" as const }
      : {
          transformStyle: "preserve-3d" as const,
        };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="section-surface relative isolate flex min-h-[100svh] overflow-hidden px-4 pb-8 pt-[4.5rem] sm:px-6 sm:pb-10 sm:pt-[5.5rem] lg:px-10 lg:pb-12 lg:pt-10 xl:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(36px, 5vw, 72px) clamp(36px, 5vw, 72px)",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-16 h-56 w-56 border-2 border-gold/30 bg-gold/10 sm:h-72 sm:w-72 lg:left-8 lg:top-20 lg:h-80 lg:w-80" />
      <motion.div aria-hidden="true" style={{ x: markX, y: markY }} className="pointer-events-none absolute -right-14 top-14 w-[220px] rotate-[-10deg] text-text opacity-[0.045] sm:w-[340px] lg:right-10 lg:top-4 lg:w-[520px]">
        <SiruntuMark animate={false} />
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"} className="relative z-10 mx-auto grid w-full max-w-[1500px] flex-1 content-center gap-7 lg:grid-cols-[minmax(0,1.03fr)_minmax(420px,0.97fr)] lg:items-center lg:gap-8 xl:gap-12">
        <div className="min-w-0">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)]">
              <SiruntuMark animate={false} />
            </span>
            <span className="border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-gold-soft sm:text-[11px]">Creative exploration studio</span>
          </motion.div>

          <div className="mt-6 max-w-[920px] sm:mt-7 lg:mt-8">
            <h1 className="font-display text-text">
              <span className="block overflow-hidden pb-1">
                <motion.span variants={lineReveal} className="block text-[clamp(3.1rem,16vw,6.4rem)] font-black uppercase leading-[0.78] tracking-normal sm:text-[clamp(5.2rem,12vw,8.8rem)] lg:text-[clamp(5.6rem,8.3vw,9.5rem)]">
                  Siruntu
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span variants={lineReveal} className="inline-block -rotate-1 border-2 border-text bg-gold px-2 text-[clamp(2.8rem,14vw,5.8rem)] font-black italic leading-[0.9] text-bg shadow-[7px_7px_0_var(--text)] sm:px-4 sm:text-[clamp(4.4rem,10vw,7.6rem)] lg:text-[clamp(4.8rem,7.2vw,8.3rem)]">
                  visual stories
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={lineReveal} className="block text-[clamp(2.6rem,12.5vw,5.4rem)] font-black uppercase leading-[0.86] sm:text-[clamp(4.1rem,9vw,7.3rem)] lg:text-[clamp(4.5rem,6.6vw,7.6rem)]">
                  built louder
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.div variants={fadeUp} className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-8">
            <p className="max-w-2xl font-sans text-sm leading-7 text-text-muted sm:text-base lg:text-lg lg:leading-8">
              We help brands, weddings, and documentary projects move from raw moment to publish-ready story through sharp direction, photography, video, and social content.
            </p>
            <div className="hidden w-36 border-2 border-line bg-surface/80 p-3 font-sans text-[10px] uppercase tracking-[0.18em] text-text-muted shadow-[5px_5px_0_rgba(255,255,255,0.12)] md:block">
              Based in Jakarta
              <span className="mt-2 block font-display text-3xl italic leading-none text-gold-soft">ID</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3 min-[420px]:flex-row sm:mt-8">
            <a href="#work" className="group inline-flex min-h-12 items-center justify-center gap-2 border-2 border-text bg-text px-5 py-3 font-sans text-xs font-black uppercase tracking-[0.18em] text-bg shadow-[5px_5px_0_var(--gold)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--gold)] sm:px-6">
              View Work
              <ArrowUpRight size={16} className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center border-2 border-line bg-bg/65 px-5 py-3 font-sans text-xs font-black uppercase tracking-[0.18em] text-text shadow-[5px_5px_0_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold-soft sm:px-6">
              Start Project
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 grid grid-cols-2 border-2 border-line bg-bg/40 sm:mt-9 sm:grid-cols-4">
            {capabilities.map((item, index) => (
              <div key={item} className={`min-h-20 p-3 sm:min-h-24 sm:p-4 ${index > 0 ? "border-t-2 border-line sm:border-l-2 sm:border-t-0" : ""} ${index === 2 ? "border-t-2 border-line sm:border-t-0" : ""}`}>
                <span className="font-display text-xl italic text-gold-soft sm:text-2xl">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-sans text-[10px] font-black uppercase tracking-[0.14em] text-text-muted sm:text-[11px]">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} style={{ perspective: 1100 }} className="relative min-w-0 lg:min-h-[620px]">
          <motion.div style={{ x: accentX }} className="absolute -right-2 top-2 z-20 hidden rotate-3 border-2 border-text bg-gold px-4 py-2 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-bg shadow-[5px_5px_0_var(--text)] sm:block lg:right-4">
            Concept to publish
          </motion.div>

          <motion.div
            style={boardMotion}
            animate={
              tiltEnabled === false
                ? {
                    rotateX: [0, -1.5, 0, 1.5, 0],
                    rotateY: [0, 2, 0, -2, 0],
                  }
                : undefined
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto grid h-[520px] max-w-[680px] grid-cols-12 grid-rows-5 gap-3 border-2 border-text bg-bg p-3 shadow-[10px_10px_0_var(--gold)] sm:h-[600px] sm:gap-4 sm:p-4 lg:h-[min(72svh,690px)] lg:max-w-none"
          >
            <div className="absolute -bottom-5 -left-3 z-20 border-2 border-text bg-[#f7f4ed] px-3 py-2 font-sans text-[10px] font-black uppercase tracking-[0.18em] text-[#171b2c] shadow-[5px_5px_0_var(--gold)] sm:-left-5 sm:px-4">
              04 modes / one team
            </div>

            {heroFrames.map((frame) => (
              <HeroFrame key={frame.label} {...frame} />
            ))}

            <div className="absolute left-1/2 top-1/2 z-30 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] items-center justify-center border-2 border-text bg-bg/92 p-4 text-center shadow-[6px_6px_0_var(--gold)] backdrop-blur sm:h-36 sm:w-36">
              <div>
                <Sparkles className="mx-auto text-gold" size={22} aria-hidden="true" />
                <p className="mt-2 font-display text-xl italic leading-none text-text sm:text-2xl">Creative agency energy</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.05 }} className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 font-sans text-[10px] font-black uppercase tracking-[0.22em] text-text-muted lg:flex">
        <span>Scroll</span>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} className="h-px w-14 bg-gold" />
      </motion.div>
    </section>
  );
}
