"use client";

import { motion } from "framer-motion";

const LOGO_SRC = `/img/${encodeURIComponent("ᨔᨗᨑᨘᨊᨈᨘᨀ (3).png")}`;

export default function SiruntuMark({
  animate = true,
  className = "",
}: {
  animate?: boolean;
  className?: string;
}) {
  return (
    <motion.img
      src={LOGO_SRC}
      alt="SIRUNTU logo"
      draggable={false}
      className={`h-auto w-full select-none object-contain ${className}`}
      initial={animate ? { opacity: 0, scale: 0.96 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
