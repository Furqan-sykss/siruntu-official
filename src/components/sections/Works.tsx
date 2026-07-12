"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

/**
 * Works — sticky stacking cards, adapted from the skiper16 reference
 * (StickyCard_001 pattern). No real photos yet, so each card is a labelled
 * placeholder using real project names/venues from SIRUNTU's own work
 * (verified via their Instagram — not invented), same visual language as
 * the Hero collage placeholders. Swap the placeholder div for an <img>/
 * <video> once assets land; the scroll/scale mechanics don't change.
 */

const projects = [
  {
    title: "Wedding of Egia & Adam",
    category: "Wedding Film",
    venue: "Tuscan Dreams, Jakarta Selatan",
  },
  {
    title: "Wedding of Caca & Andy",
    category: "Wedding Film",
    venue: "Club House, Cibubur",
  },
  {
    title: "KENIYORU",
    category: "Brand & Social Media",
    venue: "Skincare Brand",
  },
  {
    title: "Studio Session",
    category: "Creative Direction",
    venue: "Behind the Scenes",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function ProjectCard({
  i,
  total,
  title,
  category,
  venue,
  progress,
  range,
  targetScale,
}: {
  i: number;
  total: number;
  title: string;
  category: string;
  venue: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-[8vh] flex items-center justify-center py-3 sm:top-[10vh] sm:py-4">
      <motion.div style={{ scale, top: `${i * 10}px` }} className="relative aspect-video w-full max-w-4xl origin-top overflow-hidden rounded-2xl border border-line bg-surface/60 xl:max-w-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, var(--text-muted) 0px, var(--text-muted) 1px, transparent 1px, transparent 16px)",
          }}
        />
        <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/50 sm:left-5 sm:top-5" />
        <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/50 sm:bottom-5 sm:right-5" />

        <div className="absolute left-4 top-4 font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted sm:left-6 sm:top-6 sm:text-xs">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 p-4 sm:p-6">
          <div>
            <h3 className="font-display text-lg text-text sm:text-2xl lg:text-3xl">{title}</h3>
            <p className="mt-1 font-sans text-xs text-text-muted sm:text-sm">{venue}</p>
          </div>
          <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-gold sm:text-[11px]">{category}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative bg-bg px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(280px,30%)_minmax(0,70%)] xl:gap-12">
        <div className="mb-14 max-w-6xl lg:mb-16 xl:sticky xl:top-[22vh] xl:mb-0 xl:self-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="xl:flex xl:min-h-[56vh] xl:items-center">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <span className="w-6 text-text">
                  <SiruntuMark animate={false} />
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">Karya Terpilih</span>
              </div>
              <p className="mt-6 max-w-2xl font-display text-2xl text-text sm:text-3xl xl:text-5xl xl:leading-[1.02]">
                Sebagian proyek yang pernah kami kerjakan.
              </p>
              <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-text-muted sm:text-base">
                Placeholder copy: kami membangun dokumentasi visual yang rapi,
                sinematik, dan terasa premium agar setiap proyek tampil kuat saat
                dipresentasikan ke calon klien.
              </p>
              <div className="mt-8 hidden xl:block">
                <span className="inline-flex rounded-full border border-line px-4 py-2 font-sans text-[11px] uppercase tracking-[0.16em] text-gold">
                  Selected stories
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div ref={container} className="relative mx-auto w-full min-w-0 max-w-4xl pb-[14vh] sm:pb-[18vh] lg:pb-[22vh] xl:max-w-none xl:pb-[14vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} i={i} total={projects.length} {...p} progress={scrollYProgress} range={[i / projects.length, 1]} targetScale={Math.max(0.85, 1 - (projects.length - i - 1) * 0.05)} />
          ))}
        </div>
      </div>
    </section>
  );
}
