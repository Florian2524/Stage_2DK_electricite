import React from "react";

// Images temporaires ciblées (source.unsplash.com) — liées au domaine électrique
// Tu peux remplacer "img" par tes imports locaux quand tu voudras.
const cards = [
  {
    title: "Installation",
    desc:
      "Tableaux, circuits, prises, luminaires — installation complète et conforme.",
    href: "/services/installation",
    img: "https://source.unsplash.com/1600x900/?electrician,electrical-panel", // électricien + tableau
  },
  {
    title: "Mise aux normes",
    desc:
      "Sécurité, conformité NF C 15-100, diagnostic et corrections.",
    href: "/services/mise-aux-normes",
    img: "https://source.unsplash.com/1600x900/?circuit-breaker,electric-panel", // disjoncteurs / coffret
  },
  {
    title: "Dépannage",
    desc:
      "Pannes, disjonctions, recherches de défauts — intervention rapide.",
    href: "/services/depannage",
    img: "https://source.unsplash.com/1600x900/?electrician,repair,wire", // dépannage / réparation
  },
  {
    title: "Rénovation",
    desc:
      "Rénovation partielle ou totale, modernisation de l’existant.",
    href: "/services/renovation",
    img: "https://source.unsplash.com/1600x900/?rewiring,electrical-wiring", // recâblage / rénovation
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-16 lg:py-20 bg-white scroll-mt-24"
      aria-label="Nos prestations"
    >
      <div className="container-2dk">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
          Nos prestations
        </h2>
        <p className="mt-2 text-zinc-600">
          Des services adaptés aux particuliers et aux professionnels.
        </p>

        {/* Grille type tuiles visuelles */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group relative block overflow-hidden rounded-2xl border border-zinc-200"
            >
              {/* Image */}
              <img
                src={c.img}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                aria-hidden="true"
              />

              {/* Voiles pour lisibilité */}
              <div className="absolute inset-0 bg-slate-900/25 transition duration-300 group-hover:bg-slate-900/35" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent pointer-events-none" />

              {/* Contenu texte */}
              <div className="relative z-10 h-[240px] sm:h-[260px] md:h-[280px] flex items-end p-5 md:p-6">
                <div className="text-white">
                  <h3 className="text-xl md:text-2xl font-extrabold drop-shadow">
                    {c.title}
                  </h3>

                  {/* Desktop : apparait au hover ; Mobile : visible par défaut */}
                  <p
                    className="mt-1 max-w-[36ch] text-white/90 text-sm md:text-base
                               md:opacity-0 md:translate-y-1
                               md:transition md:duration-300 md:ease-out
                               md:group-hover:opacity-100 md:group-hover:translate-y-0"
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
