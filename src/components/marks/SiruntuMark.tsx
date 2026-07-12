"use client";

import { motion } from "framer-motion";

/**
 * SiruntuMark
 * A reinterpretation of SIRUNTU's geometric brand mark — a zigzag "wave"
 * line, scattered dots, and a pair of diagonal slashes — built as animatable
 * SVG primitives so it can "draw itself" on load and be reused as a quiet
 * recurring motif (dividers, loaders, corner ornaments) across the site.
 *
 * Colored via `currentColor`, so wrap with a text-color utility class.
 */
const dots: Array<[number, number, number]> = [
  [22, 52, 2.4],
  [94, 53, 2],
  [166, 52, 2.6],
  [206, 53, 1.8],
];

export default function SiruntuMark({
  animate = true,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full overflow-visible ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d="M4,46 L40,14 L76,46 L112,14 L148,46 L184,14 L220,46"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />

      {dots.map(([cx, cy, r], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="currentColor"
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.3, ease: "easeOut" }}
        />
      ))}

      <motion.line
        x1="240"
        y1="46"
        x2="256"
        y2="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.78, duration: 0.3 }}
      />
      <motion.line
        x1="256"
        y1="46"
        x2="272"
        y2="10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.88, duration: 0.3 }}
      />
    </svg>
  );
}
