import React from "react";
import { Link } from "react-router-dom";

// Libellés / liens
const CTA_PRIMARY_LABEL = "Contactez-nous";
const CTA_PRIMARY_TO = "/contact";      // redirige vers /contact
const CTA_SECONDARY_LABEL = "Demande de devis";
const CTA_SECONDARY_TO = "/contact";    // idem → même page Contact

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-[92vh] flex items-center bg-gradient-to-r from-[#0B0B0B] via-[#161B24] to-[#3E495C] text-zinc-100 py-16 md:py-24"
    >
      <div className="w-full">
        <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16">
          {/* Titre multi-lignes avec accent couleur */}
          <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight">
            <span className="block">
              Installation, Mise aux normes, Rénovation,
            </span>
            <span className="block">
              Dépannage — <span className="text-[#F6C90E]">2DK Électricité</span>
            </span>
          </h1>

          {/* Sous-texte */}
          <p className="mt-6 md:mt-8 max-w-3xl text-lg md:text-xl text-zinc-300">
            Interventions rapides et travaux soignés pour particuliers et professionnels. Devis gratuit.
          </p>

          {/* CTA */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-5">
            {/* CTA principal */}
            <Link
              to={CTA_PRIMARY_TO}
              className="inline-flex items-center justify-center gap-3 px-6 md:px-7 h-12 md:h-14 text-base md:text-lg font-semibold bg-red-600 text-white border border-red-700 hover:bg-red-700 active:translate-y-[1px] transition-all shadow-sm hover:shadow-md"
            >
              {/* Icône enveloppe */}
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="currentColor"
              >
                <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11ZM5 7l7 4.5L19 7H5Z" />
              </svg>
              <span>{CTA_PRIMARY_LABEL}</span>
            </Link>

            {/* CTA secondaire */}
            <Link
              to={CTA_SECONDARY_TO}
              className="inline-flex items-center justify-center gap-3 px-6 md:px-7 h-12 md:h-14 text-base md:text-lg font-semibold bg-red-600 text-white border border-red-700 hover:bg-red-700 active:translate-y-[1px] transition-all shadow-sm hover:shadow-md"
            >
              {CTA_SECONDARY_LABEL}
            </Link>
          </div>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm md:text-base text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F6C90E]" />
              Devis gratuit
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F6C90E]" />
              Intervention rapide
            </span>
          </div>
        </div>
      </div>

      {/* Respiration visuelle à droite */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/12 md:w-2/12 lg:w-3/12"
      />
    </section>
  );
}
