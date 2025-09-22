import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Zone from "../sections/Zone";
import FinalCTA from "../sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Zone />
      <FinalCTA />
    </main>
  );
}
