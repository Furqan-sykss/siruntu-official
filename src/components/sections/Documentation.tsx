"use client";

import { motion, type MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SiruntuMark from "@/components/marks/SiruntuMark";
import SiruntuWatermarks from "@/components/sections/SiruntuWatermarks";

const desktopImages = [
  "/img/IMG-20240313-WA0000.jpg",
  "/img/IMG-20240313-WA0001.jpg",
  "/img/IMG-20240313-WA0007.jpg",
  "/img/IMG-20240313-WA0008.jpg",
  "/img/IMG-20240313-WA0012.jpg",
  "/img/IMG-20240313-WA0021.jpg",
  "/img/IMG-20240313-WA0051.jpg",
  "/img/IMG-20240313-WA0056.jpg",
  "/img/IMG-20240313-WA0061.jpg",
  "/img/IMG-20240313-WA0063.jpg",
  "/img/IMG-20240313-WA0064.jpeg",
  "/img/IMG-20240313-WA0068.jpg",
];

const mobileImages = [
  { src: "/img/IMG-20240313-WA0000.jpg", alt: "SIRUNTU wedding documentation moment 01" },
  { src: "/img/IMG-20240313-WA0001.jpg", alt: "SIRUNTU wedding documentation moment 02" },
  { src: "/img/IMG-20240313-WA0007.jpg", alt: "SIRUNTU wedding documentation moment 03" },
  { src: "/img/IMG-20240313-WA0008.jpg", alt: "SIRUNTU wedding documentation moment 04" },
  { src: "/img/IMG-20240313-WA0012.jpg", alt: "SIRUNTU wedding documentation moment 05" },
  { src: "/img/IMG-20240313-WA0021.jpg", alt: "SIRUNTU wedding documentation moment 06" },
  { src: "/img/IMG-20240313-WA0051.jpg", alt: "SIRUNTU wedding documentation moment 07" },
  { src: "/img/IMG-20240313-WA0056.jpg", alt: "SIRUNTU wedding documentation moment 08" },
  { src: "/img/IMG-20240313-WA0061.jpg", alt: "SIRUNTU wedding documentation moment 09" },
  { src: "/img/IMG-20240313-WA0063.jpg", alt: "SIRUNTU wedding documentation moment 10" },
  { src: "/img/IMG-20240313-WA0064.jpeg", alt: "SIRUNTU wedding documentation moment 11" },
  { src: "/img/IMG-20240313-WA0068.jpg", alt: "SIRUNTU wedding documentation moment 12" },
  { src: "/img/IMG-20240313-WA0070.jpg", alt: "SIRUNTU wedding documentation moment 13" },
  { src: "/img/IMG-20240313-WA0072.jpg", alt: "SIRUNTU wedding documentation moment 14" },
  { src: "/img/IMG-20240313-WA0073.jpg", alt: "SIRUNTU wedding documentation moment 15" },
  { src: "/img/IMG-20240314-WA0008.jpg", alt: "SIRUNTU wedding documentation moment 16" },
  { src: "/img/IMG-20240314-WA0009.jpg", alt: "SIRUNTU wedding documentation moment 17" },
  { src: "/img/IMG-20240314-WA0010.jpg", alt: "SIRUNTU wedding documentation moment 18" },
  { src: "/img/IMG-20240314-WA0034.jpg", alt: "SIRUNTU wedding documentation moment 19" },
  { src: "/img/IMG-20240314-WA0045.jpg", alt: "SIRUNTU wedding documentation moment 20" },
];

const mobilePhotoLayouts = [
  { width: 244, height: 360, offset: -12 },
  { width: 196, height: 280, offset: 15 },
  { width: 310, height: 420, offset: -6 },
  { width: 230, height: 320, offset: 12 },
  { width: 270, height: 390, offset: -15 },
  { width: 218, height: 300, offset: 8 },
  { width: 320, height: 440, offset: -3 },
  { width: 242, height: 335, offset: 16 },
  { width: 284, height: 405, offset: -11 },
  { width: 202, height: 285, offset: 6 },
  { width: 312, height: 430, offset: -8 },
  { width: 225, height: 315, offset: 14 },
  { width: 260, height: 375, offset: -16 },
  { width: 300, height: 415, offset: 4 },
  { width: 214, height: 295, offset: 10 },
  { width: 318, height: 445, offset: -5 },
  { width: 238, height: 330, offset: 15 },
  { width: 280, height: 400, offset: -13 },
  { width: 208, height: 290, offset: 7 },
  { width: 305, height: 425, offset: -9 },
];

export default function Documentation() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: isMobile === false ? gallery : undefined,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const baseY = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const baseY2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const baseY3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const baseY4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const y = useSpring(baseY, { stiffness: 90, damping: 24, mass: 0.6 });
  const y2 = useSpring(baseY2, { stiffness: 85, damping: 26, mass: 0.7 });
  const y3 = useSpring(baseY3, { stiffness: 95, damping: 24, mass: 0.65 });
  const y4 = useSpring(baseY4, { stiffness: 85, damping: 28, mass: 0.75 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(mediaQuery.matches);
    };

    resize();
    window.addEventListener("resize", resize);
    mediaQuery.addEventListener("change", resize);

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", resize);
    };
  }, []);

  if (isMobile === null) {
    return (
      <section id="documentation" className="section-white relative isolate min-h-screen overflow-hidden">
        <SiruntuWatermarks section="documentation" />
      </section>
    );
  }

  return (
    <section id="documentation" className={`${isMobile ? "text-text" : "section-white"} relative overflow-x-clip`}>
      {isMobile ? (
        <div className="relative isolate px-6 pb-12 pt-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <SiruntuWatermarks section="documentation" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
                <SiruntuMark animate={false} />
              </span>
              <span className="border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Documentation</span>
            </div>
            <h2 className="mt-7 border-2 border-text bg-bg/70 p-5 font-display text-4xl leading-[0.96] text-text shadow-[7px_7px_0_var(--gold)] sm:p-6 sm:text-5xl">
              Every project deserves a visual story that feels <span className="italic text-gold-soft">polished, human, and alive.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
              From wedding coverage to branded social media moments, we turn raw documentation into a clean, cinematic presentation that feels premium across every screen.
            </p>
          </div>

          <div className="relative -mx-6 mt-12 w-[calc(100%+3rem)]">
            <MobileDocumentationGallery images={mobileImages.slice(0, 20)} viewportWidth={dimension.width} viewportHeight={dimension.height} />
          </div>
        </div>
      ) : (
        <div className="w-full bg-bg text-text">
          <div className="relative isolate mx-auto flex min-h-[52vh] max-w-6xl items-center px-6 py-20 sm:px-10 lg:px-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "clamp(42px, 6vw, 80px) clamp(42px, 6vw, 80px)",
              }}
            />
            <SiruntuWatermarks section="documentation" />
            <div className="relative z-10 w-full">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center border-2 border-text bg-bg p-2 shadow-[4px_4px_0_var(--gold)] text-text">
                  <SiruntuMark animate={false} />
                </span>
                <span className="border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[11px] font-black uppercase tracking-[0.24em] text-gold-soft">Documentation</span>
              </div>
              <h2 className="mt-7 max-w-5xl border-2 border-text bg-bg/70 p-7 font-display text-5xl leading-[0.94] text-text shadow-[8px_8px_0_var(--gold)] sm:text-6xl lg:text-7xl">
                Visual documentation crafted to feel <span className="italic text-gold-soft">cinematic, refined, and ready to publish.</span>
              </h2>
              <p className="mt-7 max-w-3xl text-base leading-8 text-text-muted sm:text-lg">We capture wedding moments, brand stories, and behind the scenes details with a presentation style that feels intentional on every scroll.</p>
            </div>
          </div>

          <div ref={gallery} className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-[#0c111f] p-[2vw]">
            <DesktopColumn images={[desktopImages[0], desktopImages[1], desktopImages[2]]} y={y} />
            <DesktopColumn images={[desktopImages[3], desktopImages[4], desktopImages[5]]} y={y2} />
            <DesktopColumn images={[desktopImages[6], desktopImages[7], desktopImages[8]]} y={y3} />
            <DesktopColumn images={[desktopImages[9], desktopImages[10], desktopImages[11]]} y={y4} />
          </div>
        </div>
      )}
    </section>
  );
}

type DesktopColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

function DesktopColumn({ images, y }: DesktopColumnProps) {
  return (
    <motion.div className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]" style={{ y }}>
      {images.map((src, index) => (
        <div key={`${src}-${index}`} className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="SIRUNTU visual documentation" className="pointer-events-none h-full w-full object-cover" />
        </div>
      ))}
    </motion.div>
  );
}

function MobileDocumentationGallery({ images, viewportWidth, viewportHeight }: { images: { src: string; alt: string }[]; viewportWidth: number; viewportHeight: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [horizontalTravel, setHorizontalTravel] = useState(0);
  const maxImageWidth = Math.max(0, viewportWidth - 48);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    const measureTravel = () => {
      setHorizontalTravel(Math.max(0, content.scrollWidth - viewport.clientWidth));
    };

    const resizeObserver = new ResizeObserver(measureTravel);
    resizeObserver.observe(viewport);
    resizeObserver.observe(content);
    measureTravel();

    return () => resizeObserver.disconnect();
  }, [images.length, viewportHeight]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 0.88, 1], [0, -horizontalTravel, -horizontalTravel]);
  return (
    <div ref={sectionRef} style={{ height: `${viewportHeight + horizontalTravel}px` }} className="relative">
      <div ref={viewportRef} className="sticky top-0 flex h-dvh items-center overflow-hidden bg-bg">
        <motion.div ref={contentRef} style={{ x }} className="flex h-full w-max items-center gap-8 px-6">
          {images.map((image, index) => {
            const layout = mobilePhotoLayouts[index % mobilePhotoLayouts.length];

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                style={{
                  width: `${Math.min(layout.width, maxImageWidth)}px`,
                  height: `${layout.height}px`,
                  maxHeight: "60dvh",
                  transform: `translateY(${layout.offset}vh)`,
                }}
                className="block shrink-0 rounded-lg object-contain drop-shadow-[0_10px_18px_rgba(12,17,31,0.2)]"
              />
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
