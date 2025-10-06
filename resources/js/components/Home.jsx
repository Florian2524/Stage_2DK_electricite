// resources/js/components/Home.jsx
import React from "react";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Zone from "../sections/Zone";
import Separator from "../components/Separator"; // ligne jaune 2px

export default function Home() {
  const sections = [Hero, Services, Zone];
  return (
    <main>
      {sections.map((Section, index) => (
        <React.Fragment key={index}>
          <Section />
          <Separator />
        </React.Fragment>
      ))}
      {}
    </main>
  );
}
