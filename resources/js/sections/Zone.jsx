import React from "react";
import chantierImg from "../../images/zone/chantier-electrique.jpg";

export default function Zone() {
  return (
    <section
      className="relative overflow-hidden bg-[#0c1116] text-slate-100"
      id="zone"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Travaux d’électricité à{" "}
              <span className="underline decoration-[#F6C90E] underline-offset-8">
                Bordeaux & CUB
              </span>
            </h2>

            <p className="mt-6 text-slate-200">
              <a
                href="/expertise"
                className="underline decoration-[#F6C90E] underline-offset-4 hover:text-[#F6C90E] transition-colors"
              >
                Experts en électricité
              </a>
              , nous intervenons également pour créer ou rénover :
            </p>

            <ul className="mt-4 space-y-2 pl-6 list-disc marker:text-[#F6C90E] text-slate-200">
              <li>vos réseaux d’alimentation et de prises,</li>
              <li>installer vos éclairages et équipements,</li>
              <li>
                et{" "}
                <span className="font-semibold text-[#F6C90E]">
                  résoudre rapidement
                </span>{" "}
                les pannes ou disjonctions.
              </li>
            </ul>

            <p className="mt-5 text-slate-200">
              Que ce soit pour la cuisine ou la salle de bain, nous assurons un
              travail soigné,
              <span className="font-semibold text-[#F6C90E]">
                {" "}
                alliant performance et réactivité
              </span>
              .
            </p>

            {/* Filets décoratifs */}
            <div className="mt-6 space-y-2">
              <div className="h-[3px] w-44 rounded bg-[#F6C90E]" />
              <div className="h-[3px] w-36 rounded bg-zinc-600" />
            </div>
          </div>

          {/* Image à droite */}
          <div>
            <img
              src={chantierImg}
              alt="Chantier électricité"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
