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
    title: "Wedding of Egia & Adam",
    category: "Wedding Documentation",
    venue: "Tuscan Dreams, Jakarta Selatan",
    summary: "A soft, floral wedding story captured with Palm Wedding Organizer for an elegant Jakarta celebration.",
    previewLabel: "Ceremony highlight",
    detailTag: "Full wedding package",
    intro:
      "Egia and Adam's wedding was documented as an intimate celebration with a clean romantic tone, lush white florals, and a calm editorial rhythm. The visual direction focused on preserving the atmosphere of the venue while keeping every key moment personal and sincere.",
    approach:
      "Our coverage balanced emotional close-ups, ceremonial details, and venue ambience so the final story could feel polished across reels, highlight edits, and portfolio presentation.",
    highlights: ["Venue coverage", "Couple moments", "Floral details", "Ceremony storytelling"],
    closing:
      "Created in collaboration with Palm Wedding Organizer, this project reflects SIRUNTU's approach to wedding documentation: graceful, attentive, and built around the feeling of the day.",
  },
  {
    title: "Wedding of Caca & Andy",
    category: "Wedding Documentation",
    venue: "Club House, Cibubur",
    summary: "A warm Cibubur wedding documented through ceremony moments, reception details, and family atmosphere.",
    previewLabel: "Reception story",
    detailTag: "Wedding organizer collaboration",
    intro:
      "Caca and Andy's wedding brought together a heartfelt ceremony, refined decor, and a warm guest experience at Club House Cibubur. The documentation was shaped to feel natural, respectful, and memorable from the opening moments through the reception.",
    approach:
      "We focused on steady coverage, thoughtful framing, and a narrative flow that helps the couple and organizer revisit the day with clarity and emotion.",
    highlights: ["Ceremony coverage", "Guest atmosphere", "Decor details", "Reception moments"],
    closing:
      "This collaboration with Palm Wedding Organizer shows how SIRUNTU supports wedding teams with visual documentation that is both useful for promotion and meaningful for the couple.",
  },
  {
    title: "KENIYORU Skincare Brand",
    category: "Brand & Social Media",
    venue: "Skincare Brand",
    summary: "A brand handling project for KENIYORU, covering social media direction, feed content, and visual identity.",
    previewLabel: "Brand case study",
    detailTag: "Content strategy",
    intro:
      "KENIYORU trusted SIRUNTU to help shape their skincare brand presence across social media. The work included visual direction, feed planning, content ideas, and brand communication that could make the account feel clearer, more consistent, and more memorable.",
    approach:
      "The strategy combined product-focused visuals, educational skincare content, and social-first storytelling for Instagram, reels, and future short-form content.",
    highlights: ["Social media strategy", "Feed planning", "Product storytelling", "Brand consistency"],
    closing:
      "The project reflects SIRUNTU's creative exploration in the brand space: building a distinct presence while keeping the content practical for daily social media growth.",
  },
  {
    title: "SIRUNTU Creative Exploration",
    category: "Creative Direction",
    venue: "Studio & Social Media Strategy",
    summary: "A self-introduction concept presenting SIRUNTU as creative kinetic collaborators for brands and stories.",
    previewLabel: "Exploration deck",
    detailTag: "Creative introduction",
    intro:
      "The Creative Exploration series introduced SIRUNTU as a team ready to assist businesses with social media strategy, visual development, and brand storytelling. It framed the studio as a collaborative partner for Instagram feeds, reels, TikTok, and broader brand communication.",
    approach:
      "The content used a clean monochrome studio language, bold typography, and concise copy to communicate what SIRUNTU does without overcomplicating the message.",
    highlights: ["Brand introduction", "Social media planning", "Creative direction", "Visual exploration"],
    closing:
      "This internal project sets the tone for SIRUNTU's portfolio: strategic enough for brands, expressive enough for creative work, and flexible enough for future collaborations.",
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
                <p>
                  {project.intro}
                </p>
                <p>
                  {project.approach}
                </p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <div key={item} className="rounded-xl border border-line bg-bg/45 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">{item}</p>
                    <p className="mt-3 font-sans text-sm leading-6 text-text-muted">
                      Planned and documented with attention to pacing, visual consistency, and the final audience experience.
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-line bg-bg/45 p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">Project note</p>
                <div className="mt-5 space-y-4 font-sans text-sm leading-7 text-text-muted">
                  <p>
                    {project.closing}
                  </p>
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
    <section id="work" className="relative bg-bg px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(280px,30%)_minmax(0,70%)] xl:gap-12">
        <div className="mb-14 max-w-6xl lg:mb-16 xl:sticky xl:top-[22vh] xl:mb-0 xl:self-start">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="xl:flex xl:min-h-[56vh] xl:items-center">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <span className="w-6 text-text">
                  <SiruntuMark animate={false} />
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-text-muted">Selected Work</span>
              </div>
              <p className="mt-6 max-w-2xl font-display text-2xl text-text sm:text-3xl xl:text-5xl xl:leading-[1.02]">
                A closer look at the stories, brands, and celebrations we have shaped.
              </p>
              <p className="mt-6 max-w-sm font-sans text-sm leading-7 text-text-muted sm:text-base">
                From wedding moments with Palm Wedding Organizer to social media
                direction for KENIYORU, each project is built with clear visual
                intent and a story-first point of view.
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
            <ProjectCard
              key={p.title}
              i={i}
              total={projects.length}
              {...p}
              onOpen={() => setActiveProject(p)}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={Math.max(0.85, 1 - (projects.length - i - 1) * 0.05)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject ? <ProjectModal key={activeProject.title} project={activeProject} onClose={() => setActiveProject(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
