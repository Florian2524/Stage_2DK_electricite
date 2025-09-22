import React from "react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-24"
      aria-label="Hero"
    >
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581091223563-1b1a0f0a5cfa?q=80&w=1920&auto=format&fit=crop')",
        }}
        aria-hidden="true"
      />

      {/* Voile sombre façon dégradé gauche → droite (pour lisibilité du texte) */}
      <div
        className="absolute inset-0 bg-slate-900/65 md:bg-gradient-to-r md:from-slate-900/85 md:via-slate-900/60 md:to-slate-900/10"
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="relative">
        <div className="container-2dk min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex items-center py-14 md:py-20">
          <div className="max-w-3xl text-white">
            {/* Gros titre (tu peux adapter le texte si tu veux coller mot à mot à l’exemple) */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Installation, Mise aux normes, Rénovation, Dépannage —{" "}
              <span className="text-amber-400">2DK Électricité</span>
            </h1>

            {/* Sous-texte */}
            <p className="mt-5 text-lg md:text-xl text-white/85">
              Interventions rapides et travaux soignés pour particuliers et professionnels. Devis gratuit.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/contact?motif=contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold
                           bg-red-600 text-white shadow hover:bg-red-500 transition"
              >
                {/* icône enveloppe simple */}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Contactez-nous
              </a>

              <a
                href="/contact?motif=devis"
                className="inline-flex items-center rounded-xl px-6 py-3 text-base font-semibold
                           border border-white/25 bg-white/10 text-white hover:bg-white/15 transition backdrop-blur"
              >
                Demande de devis
              </a>
            </div>

            {/* Labels optionnels comme dans ton exemple */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Devis gratuit
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Intervention rapide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
