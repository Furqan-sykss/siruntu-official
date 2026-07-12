"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/**
 * SmoothScrollProvider
 * Wraps the whole app with Lenis smooth-scroll (root mode — it enhances the
 * native document scroll rather than adding wrapper divs, so it doesn't
 * change layout/DOM structure). Disables itself automatically if the user
 * has prefers-reduced-motion set, falling back to native scroll.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      // One-time sync from an external system (matchMedia) into React state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnabled(false);
    }
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
