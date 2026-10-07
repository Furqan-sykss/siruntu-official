"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";
import SiruntuWatermarks from "@/components/sections/SiruntuWatermarks";

const WORDS = ["Explore", "Capture", "Shape", "Collaborate"];
const BRAND = "SIRUNTU'";
const TAGLINE = "Experience the Power of Creative Exploration";

const WORD_HOLD = 480; // ms shown per exploratory word
const BRAND_HOLD = 1000; // ms the brand name + tagline holds
const EXIT_DURATION = 0.9; // seconds for the curtain-rise exit
const SESSION_KEY = "siruntu-intro-seen";

type Phase = "words" | "brand" | "exiting" | "done";

// Panel lift: as it rises, a shadow grows beneath it — reads as physical
// weight, like a stage curtain actually lifting off the floor.
const panelVariants = {
  visible: { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)" },
  exit: {
    y: "-100%",
    boxShadow: "0 60px 90px -20px rgba(0,0,0,0.65)",
  },
};

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<Phase>("words");
  const [wordIndex, setWordIndex] = useState(0);
  const [skip, setSkip] = useState<boolean | null>(null);
  const [progressDisplay, setProgressDisplay] = useState(0);
  const progress = useMotionValue(0);
  const progressScale = useTransform(progress, [0, 100], [0, 1]);
  const completedRef = useRef(false);

  useEffect(() => {
    // Don't replay the full intro every time within the same session —
    // it's a first-impression moment, not something to sit through twice.
    const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);

    if (alreadySeen) {
      // One-time sync from an external system (sessionStorage) into React
      // state on mount — the exact case effects exist for.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkip(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    setSkip(false);
    document.body.style.overflow = "hidden";

    const totalMs = WORDS.length * WORD_HOLD + BRAND_HOLD;
    const controls = animate(progress, 100, {
      duration: totalMs / 1000,
      ease: "easeInOut",
    });
    const unsubscribe = progress.on("change", (v) => setProgressDisplay(Math.round(v)));

    const timers: ReturnType<typeof setTimeout>[] = [];
    WORDS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setWordIndex(i), i * WORD_HOLD));
    });
    timers.push(setTimeout(() => setPhase("brand"), WORDS.length * WORD_HOLD));
    timers.push(setTimeout(() => setPhase("exiting"), totalMs));
    timers.push(
      setTimeout(
        () => {
          setPhase("done");
          document.body.style.overflow = "";
          sessionStorage.setItem(SESSION_KEY, "1");
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
        },
        totalMs + EXIT_DURATION * 1000,
      ),
    );

    return () => {
      timers.forEach(clearTimeout);
      controls.stop();
      unsubscribe();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nothing rendered on server / before the session check resolves, and
  // nothing rendered once we know this visitor has already seen it.
  if (skip === null || skip === true) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          variants={panelVariants}
          initial="visible"
          animate="visible"
          exit="exit"
          transition={{ duration: EXIT_DURATION, ease: [0.76, 0, 0.24, 1] }}
          className="section-surface fixed inset-0 z-[100] isolate flex flex-col items-center justify-center overflow-hidden px-6"
          role="status"
          aria-live="polite"
          aria-label="Loading SIRUNTU' Creative Exploration"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
              backgroundSize: "clamp(36px, 5vw, 72px) clamp(36px, 5vw, 72px)",
            }}
          />
          <SiruntuWatermarks section="preloader" />
          <div className="pointer-events-none absolute -left-16 top-20 h-48 w-48 border-2 border-gold/25 bg-gold/10 sm:h-64 sm:w-64" />
          <div className="pointer-events-none absolute -right-20 bottom-14 h-56 w-56 border-2 border-line bg-bg/30 sm:h-72 sm:w-72" />

          {/* faint corner framing echoes the print-invitation feel of their wedding work */}
          <div className="pointer-events-none absolute inset-4 border-2 border-line/70 sm:inset-6" />

          {/* trailing gold edge — brightens right as the curtain lifts */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold-soft) 50%, var(--gold) 80%, transparent)",
            }}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: phase === "exiting" ? 1 : 0.3,
              boxShadow: phase === "exiting" ? "0 0 24px 3px rgba(227,155,189,0.45)" : "0 0 0px 0px rgba(227,155,189,0)",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="absolute left-6 top-6 border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[10px] font-black uppercase tracking-[0.22em] text-gold-soft shadow-[4px_4px_0_rgba(255,255,255,0.1)] sm:left-8 sm:top-8 sm:text-xs">
            SIRUNTU&rsquo;
          </div>
          <div className="absolute right-6 top-6 border-2 border-line bg-bg/70 px-3 py-2 font-sans text-[10px] font-black uppercase tracking-[0.22em] tabular-nums text-text-muted shadow-[4px_4px_0_rgba(255,255,255,0.1)] sm:right-8 sm:top-8 sm:text-xs">
            {String(progressDisplay).padStart(2, "0")}%
          </div>
          <div className="absolute bottom-6 left-6 hidden max-w-[16ch] border-2 border-line bg-bg/55 px-3 py-2 font-sans text-[10px] font-black uppercase leading-relaxed tracking-[0.2em] text-text-muted sm:bottom-8 sm:left-8 sm:block sm:text-xs">
            Creative Exploration
          </div>
          <div className="absolute bottom-6 right-6 hidden max-w-[14ch] border-2 border-line bg-bg/55 px-3 py-2 text-right font-sans text-[10px] font-black uppercase leading-relaxed tracking-[0.2em] text-text-muted sm:bottom-8 sm:right-8 sm:block sm:text-xs">
            Jakarta, Indonesia
          </div>

          <div className="relative z-10 w-full max-w-[520px] border-2 border-text bg-bg/78 p-6 text-center shadow-[10px_10px_0_var(--gold)] backdrop-blur sm:p-8">
            <div className="absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-gold" />
            <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-gold" />

            <div className="mx-auto w-[150px] text-text sm:w-[220px]">
              <SiruntuMark />
            </div>

            <div className="mt-8 flex h-12 items-center justify-center overflow-hidden px-6 text-center sm:mt-10 sm:h-16">
              <AnimatePresence mode="wait">
                {phase === "words" ? (
                  <motion.span
                    key={WORDS[wordIndex]}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="block font-display text-3xl italic leading-[1.2] text-gold-soft sm:text-4xl"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                ) : (
                  <motion.span
                    key="brand"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="block font-display text-4xl font-black uppercase leading-[1.2] text-text sm:text-5xl"
                  >
                    {BRAND}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 h-8">
              {phase !== "words" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="mx-auto max-w-[32ch] text-center font-sans text-[11px] font-black uppercase tracking-[0.14em] text-text-muted sm:text-xs"
                >
                  {TAGLINE}
                </motion.p>
              )}
            </div>

            <div className="mt-6 h-2 overflow-hidden border-2 border-line bg-surface">
              <motion.div className="h-full origin-left bg-gold" style={{ scaleX: progressScale }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
