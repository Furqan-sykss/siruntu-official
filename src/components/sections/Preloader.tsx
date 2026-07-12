"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion";
import SiruntuMark from "@/components/marks/SiruntuMark";

const WORDS = ["Menjelajah", "Merekam Momen", "Meracik Visual", "Berkolaborasi"];
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

export default function Preloader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("words");
  const [wordIndex, setWordIndex] = useState(0);
  const [skip, setSkip] = useState<boolean | null>(null);
  const [progressDisplay, setProgressDisplay] = useState(0);
  const progress = useMotionValue(0);
  const completedRef = useRef(false);

  useEffect(() => {
    // Don't replay the full intro every time within the same session —
    // it's a first-impression moment, not something to sit through twice.
    const alreadySeen =
      typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);

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
    const unsubscribe = progress.on("change", (v) =>
      setProgressDisplay(Math.round(v)),
    );

    const timers: ReturnType<typeof setTimeout>[] = [];
    WORDS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setWordIndex(i), i * WORD_HOLD));
    });
    timers.push(setTimeout(() => setPhase("brand"), WORDS.length * WORD_HOLD));
    timers.push(setTimeout(() => setPhase("exiting"), totalMs));
    timers.push(
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
        sessionStorage.setItem(SESSION_KEY, "1");
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }, totalMs + EXIT_DURATION * 1000),
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg"
          role="status"
          aria-live="polite"
          aria-label="Memuat SIRUNTU' Creative Exploration"
        >
          {/* faint corner framing — echoes the print-invitation feel of their wedding work */}
          <div className="pointer-events-none absolute inset-4 border border-line/60 sm:inset-6" />

          {/* trailing gold edge — brightens right as the curtain lifts */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold) 20%, var(--gold-soft) 50%, var(--gold) 80%, transparent)",
            }}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: phase === "exiting" ? 1 : 0.3,
              boxShadow:
                phase === "exiting"
                  ? "0 0 24px 3px rgba(198,164,97,0.55)"
                  : "0 0 0px 0px rgba(198,164,97,0)",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="absolute left-6 top-6 font-sans text-[10px] uppercase tracking-[0.25em] text-text-muted sm:left-8 sm:top-8 sm:text-xs">
            SIRUNTU&rsquo;
          </div>
          <div className="absolute right-6 top-6 font-sans text-[10px] uppercase tracking-[0.25em] tabular-nums text-text-muted sm:right-8 sm:top-8 sm:text-xs">
            {String(progressDisplay).padStart(2, "0")}%
          </div>
          <div className="absolute bottom-6 left-6 max-w-[16ch] font-sans text-[10px] uppercase leading-relaxed tracking-[0.25em] text-text-muted sm:bottom-8 sm:left-8 sm:text-xs">
            Creative Exploration
          </div>
          <div className="absolute bottom-6 right-6 max-w-[14ch] text-right font-sans text-[10px] uppercase leading-relaxed tracking-[0.25em] text-text-muted sm:bottom-8 sm:right-8 sm:text-xs">
            Aceh, Indonesia
          </div>

          <div className="w-[150px] text-text sm:w-[220px]">
            <SiruntuMark />
          </div>

          <div className="mt-8 flex h-[1.5em] items-center justify-center overflow-hidden px-6 text-center sm:mt-10">
            <AnimatePresence mode="wait">
              {phase === "words" ? (
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="block font-display text-2xl italic text-text sm:text-3xl"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              ) : (
                <motion.span
                  key="brand"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="block font-display text-3xl text-gold-soft sm:text-4xl"
                >
                  {BRAND}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 h-4">
            {phase !== "words" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="max-w-[30ch] text-center font-sans text-[11px] tracking-[0.12em] text-text-muted sm:text-xs"
              >
                {TAGLINE}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
