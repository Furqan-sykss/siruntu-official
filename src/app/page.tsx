"use client";

import { useState } from "react";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Documentation from "@/components/sections/Documentation";
import Services from "@/components/sections/Services";
import Trusted from "@/components/sections/Trusted";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIntroDone(true)} />
      <Hero ready={introDone} />
      <About />
      <Works />
      <Documentation />
      <Services />
      <Trusted />
      <Contact />
    </>
  );
}
