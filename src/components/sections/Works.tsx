"use client";

import { useEffect, useRef, useState } from "react";
import { Images, MapPin, Play, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
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
    title: "Trip Surf Documentary",
    category: "Long-term Documentary",
    venue: "Sekaringsrengenge Surf Trips",
    summary: "Captured the ongoing women’s surf journey for Sekaringsrengenge, documenting each departure with thoughtful storytelling and editorial continuity.",
    previewLabel: "Ongoing trip coverage",
    detailTag: "Long-term documentation",
    intro: "Sekaringsrengenge partnered with SIRUNTU for a long-term documentary collaboration, chronicling every women-only surf departure from departure to finale.",
    approach: "The production combined travel documentation, surf storytelling, and editing that preserved the atmosphere, energy, and continuity of the series over time.",
    highlights: ["Long-term documentation", "Surf storytelling", "Editorial editing", "Journey continuity"],
    closing: "This ongoing collaboration demonstrates how SIRUNTU sustains a brand story over time, delivering consistent and evocative documentation for the Sekaringsrengenge surf series.",
  },
  {
    title: "WCC Wedding Content",
    category: "Documentary & Editing",
    venue: "Wedding Content Service",
    summary: "Produced documentary wedding content and polished edits for WCC, serving personal clients and event organizer collaborations.",
    previewLabel: "Story-led wedding content",
    detailTag: "Documentary production",
    intro: "WCC engaged SIRUNTU to capture weddings as documentary stories with thoughtful editing. The work supported couples directly as well as collaborations with wedding organizers and event planners.",
    approach: "We focused on authentic storytelling, seamless coverage, and editing that turned each event into a cinematic, emotionally engaging narrative.",
    highlights: ["Event documentation", "Wedding storytelling", "Collaborative editing", "Personal client work"],
    closing: "This project illustrates SIRUNTU’s ability to deliver documentary-driven wedding content that feels both polished and genuinely personal.",
  },
  {
    title: "Sealpak Packaging",
    category: "Packaging & Social Media",
    venue: "Food-grade Packaging",
    summary: "Translated Sealpak’s food-safe packaging expertise into a stronger brand story and social media presence.",
    previewLabel: "Packaging storytelling",
    detailTag: "Brand and content management",
    intro: "Sealpak worked with SIRUNTU to build a cohesive brand presence for its food-grade packaging business. We helped shape messaging, visuals, and content strategy that reflected the company's product reliability.",
    approach: "Our approach centered on packaging storytelling, social media handling, and creating a consistent feed that communicated quality, safety, and professional expertise.",
    highlights: ["Brand identity", "Social media handling", "Packaging content", "Feed consistency"],
    closing: "The collaboration gave Sealpak a more confident and polished brand expression while ensuring its social media channels were managed end to end.",
  },
  {
    title: "KENIYORU Skincare",
    category: "Brand Strategy",
    venue: "Facial Serum Brand",
    summary: "Shaped KENIYORU's brand image and social voice for its facial serum line with polished strategy and content direction.",
    previewLabel: "Social media strategy",
    detailTag: "End-to-end brand handling",
    intro: "KENIYORU partnered with SIRUNTU to define a stronger skincare brand presence. Our work focused on brand analysis, visual direction, and building a consistent social media identity for the facial serum line.",
    approach: "The project combined brand positioning, creative planning, and full social media management—from content concepts and visual storytelling to caption strategy and posting rhythm.",
    highlights: ["Brand strategy", "Social media management", "Visual identity", "Brand analysis"],
    closing: "This engagement positioned KENIYORU with a clearer brand image and a polished, consistent social presence across relevant platforms.",
  },
];

type Project = (typeof projects)[number];

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
  summary,
  onOpen,
  progress,
  range,
  targetScale,
}: {
  i: number;
  total: number;
  title: string;
  category: string;
  summary: string;
  onOpen: () => void;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  const openFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div className="sticky top-[8vh] flex items-center justify-center py-3 sm:top-[10vh] sm:py-4">
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${title}`}
        onClick={onOpen}
        onKeyDown={openFromKeyboard}
        style={{ scale, top: `${i * 10}px` }}
        className="group relative aspect-video w-full max-w-4xl origin-top cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface/60 outline-none transition-colors duration-300 hover:border-gold/45 focus-visible:border-gold/70 focus-visible:ring-2 focus-visible:ring-gold/35 xl:max-w-none"
      >
        <div
          className="absolute inset-0 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.09]"
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
            <p className="mt-1 font-sans text-xs text-text-muted sm:text-sm">{summary}</p>
          </div>
          <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-gold sm:text-[11px]">{category}</span>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const detailsScrollRef = useRef<HTMLDivElement>(null);

  const stopScrollPropagation = (event: React.WheelEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="work-modal-title"
    >
      <button className="absolute inset-0 cursor-default bg-bg/72" aria-label="Close project details" onClick={onClose} />

      <motion.div
        ref={panelScrollRef}
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        onWheel={stopScrollPropagation}
        onTouchMove={stopScrollPropagation}
        className="work-modal-scrollbar relative flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl touch-pan-y flex-col overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface shadow-2xl shadow-black/35 lg:h-[min(760px,calc(100dvh-4rem))] lg:grid lg:grid-cols-[minmax(320px,44%)_minmax(0,56%)] lg:overflow-hidden"
        initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 18, scale: 0.97, filter: "blur(8px)" }}
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative min-h-[280px] overflow-hidden border-b border-line bg-bg/70 sm:min-h-[360px] lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, var(--text-muted) 0px, var(--text-muted) 1px, transparent 1px, transparent 18px)",
            }}
          />
          <div className="absolute inset-5 rounded-xl border border-gold/25 sm:inset-7" />
          <div className="relative flex h-full min-h-[280px] flex-col justify-between p-5 sm:min-h-[360px] sm:p-7 lg:min-h-full">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/75 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-text-muted">
                <Images size={14} aria-hidden="true" />
                {project.previewLabel}
              </span>
              <span className="h-3 w-3 border-r border-t border-gold/60" />
            </div>

            <div className="mx-auto flex aspect-[4/5] w-full max-w-[320px] items-center justify-center rounded-xl border border-line bg-surface/55 p-6 text-center sm:max-w-[380px]">
              <div>
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/35 text-gold">
                  <Play size={20} fill="currentColor" aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-2xl text-text sm:text-3xl">{project.title}</p>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.18em] text-text-muted">{project.category}</p>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 font-sans text-[10px] uppercase tracking-[0.2em] text-text-muted">
              <span>01 / 05</span>
              <span>Portfolio ready</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-0 lg:overflow-hidden">
          <div
            ref={detailsScrollRef}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={stopScrollPropagation}
            onTouchMove={stopScrollPropagation}
            className="work-modal-scrollbar min-h-0 touch-pan-y overscroll-contain lg:h-full lg:overflow-y-auto"
          >
            <div className="p-5 sm:p-7 lg:p-9 lg:pr-12">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold">{project.category}</span>
                  <h3 id="work-modal-title" className="mt-3 font-display text-3xl leading-tight text-text sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-text-muted transition-colors duration-300 hover:border-gold/50 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35"
                  aria-label="Close modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 font-sans text-xs text-text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2">
                  <MapPin size={14} aria-hidden="true" />
                  {project.venue}
                </span>
                <span className="inline-flex rounded-full border border-line px-3 py-2">{project.detailTag}</span>
              </div>

              <div className="mt-8 space-y-7 font-sans text-sm leading-7 text-text-muted sm:text-base sm:leading-8">
                <p>{project.intro}</p>
                <p>{project.approach}</p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <div key={item} className="rounded-xl border border-line bg-bg/45 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{item}</p>
                    <p className="mt-3 font-sans text-sm leading-6 text-text-muted">Planned and documented with attention to pacing, visual consistency, and the final audience experience.</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-line bg-bg/45 p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">Project note</p>
                <div className="mt-5 space-y-4 font-sans text-sm leading-7 text-text-muted">
                  <p>{project.closing}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="section-surface relative isolate px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(280px,30%)_minmax(0,70%)] xl:gap-12">
        <div className="mb-14 max-w-6xl lg:mb-16 xl:sticky xl:top-20 xl:mb-0 xl:self-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
            <div className="max-w-md xl:max-w-[24rem]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
                  <SiruntuMark animate={false} />
                </span>
                <span className="border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Selected Work</span>
              </div>
              <h2 className="mt-7 border-2 border-text bg-bg/70 p-5 font-display text-3xl leading-[1.02] text-text shadow-[7px_7px_0_var(--gold)] sm:text-4xl xl:p-4 xl:text-[2.65rem]">
                A closer look at the stories, brands, and <span className="italic text-gold-soft">celebrations we have shaped.</span>
              </h2>
              <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-text-muted sm:text-base xl:mt-5 xl:text-[15px] xl:leading-7">
                From skincare strategy to packaging narratives, wedding content, and ongoing documentary projects, each story is designed with clear visual intent and professional polish.
              </p>
              <div className="mt-8 hidden xl:block">
                <span className="inline-flex border-2 border-line bg-bg/60 px-4 py-2 font-sans text-[11px] font-black uppercase tracking-[0.16em] text-gold">Selected stories</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div ref={container} className="relative mx-auto w-full min-w-0 max-w-4xl pb-[14vh] sm:pb-[18vh] lg:pb-[22vh] xl:max-w-none xl:pb-[14vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} i={i} total={projects.length} {...p} onOpen={() => setActiveProject(p)} progress={scrollYProgress} range={[i / projects.length, 1]} targetScale={Math.max(0.85, 1 - (projects.length - i - 1) * 0.05)} />
          ))}
        </div>
      </div>

      <AnimatePresence>{activeProject ? <ProjectModal key={activeProject.title} project={activeProject} onClose={() => setActiveProject(null)} /> : null}</AnimatePresence>
    </section>
  );
}
