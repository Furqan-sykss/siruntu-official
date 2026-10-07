"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Images, MapPin, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
import Image from "next/image";
import { EffectCards, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SiruntuMark from "@/components/marks/SiruntuMark";
import SiruntuWatermarks from "@/components/sections/SiruntuWatermarks";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-fade";

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
    imageFolder: "tripsurf-image",
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
    imageFolder: "wccwedding-image",
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
    imageFolder: "sealpak-image",
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
    imageFolder: "keniyoru-image",
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

const projectPhotoFiles = [
  "balazs-ketyi-9VzoRKfBsMM-unsplash.jpg",
  "balazs-ketyi-FeuEg-8XlA8-unsplash.jpg",
  "cherrydeck-oVWc3lehRz8-unsplash.jpg",
  "cherrydeck-Qx7A7SChpnI-unsplash.jpg",
  "cherrydeck-rMILC1PIwM0-unsplash.jpg",
  "cherrydeck-UpsEF48wAgk-unsplash.jpg",
  "daniela-almeida-ys2phgbHfJU-unsplash.jpg",
  "kobu-agency-csJt89dL9pE-unsplash.jpg",
  "krisztian-tabori-IyaNci0CyRk-unsplash.jpg",
  "labib-jaffar-ylx85nvunvw-unsplash.jpg",
  "marvin-meyer-SYTO3xs06fU-unsplash.jpg",
  "nikita-kachanovsky-g-YiX8ynmnY-unsplash.jpg",
  "patrik-michalicka-r3iAqHb7JWs-unsplash.jpg",
  "pexels-aleson-padilha-945919991-34104803.jpg",
  "pexels-cadomaestro-1170412.jpg",
  "pexels-canvastudio-3194519.jpg",
  "pexels-cottonbro-3888216.jpg",
  "pexels-ivan-s-8117415.jpg",
  "pexels-jakubzerdzicki-31313716.jpg",
  "pexels-jakubzerdzicki-31949770.jpg",
  "pexels-karola-g2-6224.jpg",
  "pexels-kindelmedia-7688336.jpg",
  "pexels-mikael-blomkvist-6476257.jpg",
  "pexels-mikael-blomkvist-6476578.jpg",
  "pexels-mikael-blomkvist-6476580.jpg",
  "pexels-mike-c-2151163165-31663601.jpg",
  "pexels-ofspace-16323580.jpg",
  "pexels-silverkblack-23496709.jpg",
  "pexels-silverkblack-39190479.jpg",
  "pexels-thirdman-7180492.jpg",
  "roberto-nickson-TB_cvdUHUuc-unsplash.jpg",
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
  summary,
  onOpen,
  progress,
  range,
  targetScale,
  isDesktop,
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
  isDesktop: boolean;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  const openFromKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <div className="works-slide relative flex w-[88%] shrink-0 snap-center items-center justify-center py-3 md:sticky md:top-[10vh] md:w-full md:shrink md:snap-none md:py-4">
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${title}`}
        onClick={onOpen}
        onKeyDown={openFromKeyboard}
        style={{ scale: isDesktop ? scale : 1, top: isDesktop ? `${i * 10}px` : 0 }}
        className="group relative aspect-4/5 w-full max-w-4xl origin-top cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface/60 outline-none transition-colors duration-300 hover:border-gold/45 focus-visible:border-gold/70 focus-visible:ring-2 focus-visible:ring-gold/35 md:aspect-video xl:max-w-none"
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

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 sm:p-6 md:flex-row md:items-end md:justify-between md:gap-2">
          <div>
            <h3 className="font-display text-lg text-text sm:text-2xl lg:text-3xl">{title}</h3>
            <p className="mt-1 max-w-2xl font-sans text-xs leading-5 text-text-muted sm:text-sm">{summary}</p>
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
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);
    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

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

  return createPortal(
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
        <div className="relative flex min-h-[280px] shrink-0 flex-col overflow-hidden border-b border-line bg-bg/70 sm:min-h-[360px] lg:h-full lg:min-h-0 lg:shrink lg:border-b-0 lg:border-r">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "repeating-linear-gradient(135deg, var(--text-muted) 0px, var(--text-muted) 1px, transparent 1px, transparent 18px)",
            }}
          />
          <div className="absolute inset-5 rounded-xl border border-gold/25 sm:inset-7" />
          <div className="relative z-10 flex min-h-[280px] flex-1 flex-col p-5 sm:min-h-[360px] sm:p-7 lg:min-h-0">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/75 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-text-muted">
                <Images size={14} aria-hidden="true" />
                {project.previewLabel}
              </span>
              <span className="font-sans text-[10px] tabular-nums tracking-[0.16em] text-text-muted" aria-live="polite">
                {String(activePhoto + 1).padStart(2, "0")} / {String(projectPhotoFiles.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="relative my-5 h-[min(45dvh,380px)] shrink-0 overflow-hidden rounded-xl border border-line bg-black/25 sm:h-[min(48dvh,430px)] lg:h-auto lg:min-h-0 lg:flex-1"
              role="region"
              aria-label={`${project.title} photo gallery`}
              aria-roledescription="carousel"
            >
              <Swiper
                key={isMobile ? "mobile-cards" : "desktop-fade"}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActivePhoto(swiper.realIndex)}
                modules={isMobile ? [EffectCards, Keyboard] : [EffectFade, Keyboard]}
                effect={isMobile ? "cards" : "fade"}
                cardsEffect={isMobile ? { perSlideOffset: 12 } : undefined}
                fadeEffect={{ crossFade: true }}
                grabCursor={isMobile}
                loop={isMobile}
                spaceBetween={isMobile ? 40 : 0}
                keyboard={{ enabled: true, onlyInViewport: true }}
                slidesPerView={1}
                className={`work-photo-carousel mx-auto h-full ${isMobile ? "w-[calc(100%-36px)] max-w-[260px] overflow-visible" : "w-full"}`}
              >
                {projectPhotoFiles.map((fileName, index) => (
                  <SwiperSlide key={fileName} style={{ height: isMobile ? "calc(100% - 50px)" : "100%", top: isMobile ? "25px" : undefined }} className="relative h-full w-full overflow-hidden rounded-3xl">
                    <Image
                      src={`/img/${project.imageFolder}/${fileName}`}
                      alt={`${project.title} documentation photo ${index + 1}`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 44vw"
                      className="object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="pointer-events-none absolute inset-x-6 top-1/2 z-20 flex -translate-y-1/2 justify-between" style={{ top: isMobile ? "calc(50% - 25px)" : "50%" }}>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={!isMobile && activePhoto === 0}
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] transition-transform hover:scale-110 disabled:opacity-35 sm:h-10 sm:w-10"
                >
                  <ChevronLeft size={27} strokeWidth={3} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={!isMobile && activePhoto === projectPhotoFiles.length - 1}
                  className="pointer-events-auto flex h-9 w-9 items-center justify-center text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] transition-transform hover:scale-110 disabled:opacity-35 sm:h-10 sm:w-10"
                >
                  <ChevronRight size={27} strokeWidth={3} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-4">
              <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.18em] text-text-muted">Documentation</span>
              <div className="h-px flex-1 overflow-hidden bg-line" role="progressbar" aria-label="Photo position" aria-valuemin={1} aria-valuemax={projectPhotoFiles.length} aria-valuenow={activePhoto + 1}>
                <motion.div className="h-full bg-gold" animate={{ width: `${((activePhoto + 1) / projectPhotoFiles.length) * 100}%` }} transition={{ duration: 0.3, ease: "easeOut" }} />
              </div>
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
    </motion.div>,
    document.body,
  );
}

export default function Works() {
  const container = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);
    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  const scrollToSlide = (index: number) => {
    const carousel = container.current;
    const slide = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !slide) return;

    carousel.scrollTo({
      left: slide.offsetLeft - (carousel.clientWidth - slide.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const updateActiveSlide = () => {
    const carousel = container.current;
    if (!carousel) return;

    const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    Array.from(carousel.children).forEach((child, index) => {
      const bounds = child.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - carouselCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  };

  return (
    <section id="work" className="section-surface relative isolate px-6 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "clamp(40px, 6vw, 80px) clamp(40px, 6vw, 80px)",
        }}
      />
      <SiruntuWatermarks section="works" />
      <div className="relative z-10 mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(280px,30%)_minmax(0,70%)] xl:gap-12">
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
                From skincare strategy to packaging narratives, wedding content, and any event projects, each story is designed with clear visual intent and professional polish.
              </p>
              <div className="mt-8 hidden xl:block">
                <span className="inline-flex border-2 border-line bg-bg/60 px-4 py-2 font-sans text-[11px] font-black uppercase tracking-[0.16em] text-gold">Selected stories</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          ref={container}
          role="region"
          aria-label="Selected work projects"
          aria-roledescription="carousel"
          tabIndex={0}
          onScroll={updateActiveSlide}
          className="works-carousel relative -mx-6 flex w-auto min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[6vw] pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:-mx-10 md:mx-auto md:block md:w-full md:max-w-4xl md:overflow-visible md:px-0 md:pb-[18vh] lg:pb-[22vh] xl:max-w-none xl:pb-[14vh]"
        >
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
              isDesktop={isDesktop}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2" role="group" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                aria-label={`Go to project ${index + 1}: ${project.title}`}
                aria-current={activeSlide === index ? "true" : undefined}
                onClick={() => scrollToSlide(index)}
                className={`flex h-10 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${activeSlide === index ? "w-8" : "w-5"}`}
              >
                <span className={`h-1 w-full rounded-full transition-colors ${activeSlide === index ? "bg-gold" : "bg-line"}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
              disabled={activeSlide === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-gold/60 disabled:opacity-35"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span className="min-w-12 text-center font-sans text-xs tabular-nums text-text-muted" aria-live="polite">
              {String(activeSlide + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollToSlide(Math.min(projects.length - 1, activeSlide + 1))}
              disabled={activeSlide === projects.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-gold/60 disabled:opacity-35"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>{activeProject ? <ProjectModal key={activeProject.title} project={activeProject} onClose={() => setActiveProject(null)} /> : null}</AnimatePresence>
    </section>
  );
}
