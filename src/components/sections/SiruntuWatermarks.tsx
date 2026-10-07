import SiruntuMark from "@/components/marks/SiruntuMark";

const placements = {
  preloader: ["left-[7%] top-[20%] w-20 -rotate-[10deg] opacity-[0.08] sm:w-28 lg:w-36", "right-[8%] bottom-[16%] w-24 rotate-[12deg] opacity-[0.09] sm:w-32 lg:w-40"],
  hero: ["left-[8%] top-[34%] w-20 -rotate-12 opacity-[0.16] sm:w-28 lg:w-36", "left-[57%] bottom-[5%] w-24 rotate-[14deg] opacity-[0.17] sm:w-32 lg:w-40"],
  about: ["left-[8%] top-[22%] w-24 -rotate-[14deg] opacity-[0.18] sm:w-36 lg:w-44", "right-[9%] top-[48%] w-20 rotate-[12deg] opacity-[0.17] sm:w-28 lg:w-36", "left-[42%] bottom-[4%] w-24 rotate-[-8deg] opacity-[0.16] sm:w-32 lg:w-40"],
  works: ["right-[6%] top-[10%] w-24 rotate-[12deg] opacity-[0.17] sm:w-36 lg:w-44", "left-[5%] top-[48%] w-20 -rotate-[10deg] opacity-[0.16] sm:w-28 lg:w-36", "right-[28%] bottom-[5%] w-24 rotate-[-8deg] opacity-[0.17] sm:w-32 lg:w-40"],
  documentation: ["right-[8%] top-[12%] w-24 rotate-[12deg] opacity-[0.17] sm:w-36 lg:w-44", "left-[12%] bottom-[8%] w-20 -rotate-[10deg] opacity-[0.16] sm:w-28 lg:w-36"],
  services: ["right-[7%] top-[8%] w-28 rotate-[12deg] opacity-[0.24] sm:w-36 lg:w-44", "left-[6%] top-[42%] w-24 -rotate-[12deg] opacity-[0.22] sm:w-32 lg:w-40", "right-[28%] bottom-[4%] w-28 rotate-[-8deg] opacity-[0.24] sm:w-36 lg:w-44"],
  trusted: ["left-[11%] top-[8%] w-20 -rotate-[12deg] opacity-[0.16] sm:w-28 lg:w-36", "right-[9%] bottom-[6%] w-24 rotate-[12deg] opacity-[0.17] sm:w-32 lg:w-40"],
  contact: ["right-[10%] top-[12%] w-24 rotate-[12deg] opacity-[0.17] sm:w-36 lg:w-44", "right-[34%] bottom-[5%] w-20 -rotate-[10deg] opacity-[0.16] sm:w-28 lg:w-36"],
} as const;

type WatermarkSection = keyof typeof placements;

export default function SiruntuWatermarks({ section, light = false }: { section: WatermarkSection; light?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {placements[section].map((className, index) => (
        <div key={`${section}-${index}`} className={`absolute ${className}`}>
          <SiruntuMark animate={false} className={`brightness-0 ${light ? "" : "invert"}`} />
        </div>
      ))}
    </div>
  );
}
