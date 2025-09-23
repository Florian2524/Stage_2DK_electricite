import React from "react";
import chantierImg from "../../images/zone/chantier-electrique.jpg"; // nouvelle image locale

export default function Zone() {
  return (
    <section className="relative overflow-hidden bg-[#0c1116] text-slate-100">
      {/* texture + bandeau diagonal */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Texte à gauche */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-sky-400 tracking-tight">
              Travaux d’électricité à<br className="hidden md:block" /> Bordeaux & CUB
            </h2>

            <p className="mt-6 text-slate-300">
              <a href="/contact" className="underline decoration-sky-500 underline-offset-4 hover:opacity-90 transition">
                Experts en électricité
              </a>
              , nous intervenons également pour créer ou rénover&nbsp;:
            </p>

            <ul className="mt-4 space-y-2 pl-6 list-disc marker:text-red-500">
              <li>vos réseaux d’alimentation et de prises,</li>
              <li>installer vos éclairages et équipements,</li>
              <li>
                et <span className="font-semibold">résoudre rapidement les pannes</span> ou disjonctions.
              </li>
            </ul>

            <p className="mt-5 text-slate-300">
              Que ce soit pour la cuisine ou la salle de bain, nous assurons un travail soigné,
              <span className="font-semibold text-slate-100"> alliant performance et réactivité</span>.
            </p>

            {/* traits d’accent */}
            <div className="mt-8 space-y-3">
              <div className="h-[3px] w-32 bg-yellow-400 rounded" />
              <div className="h-[3px] w-20 bg-red-500 rounded" />
            </div>

            <p className="mt-6 text-xl md:text-2xl font-extrabold text-slate-100">
              2DK Électricité vous assure une installation performante et fonctionnelle
            </p>
          </div>

          {/* Image à droite (chantier) */}
          <div className="relative">
            <div className="pointer-events-none absolute -top-3 -right-3 h-12 w-12 border-2 border-sky-500/70 rounded-sm" />
            <img
              src={chantierImg}
              alt="Travaux électriques sur chantier"
              loading="lazy"
              decoding="async"
              className="w-full h-[360px] md:h-[500px] object-cover rounded-2xl shadow-xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
