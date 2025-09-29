import React from "react";

// Images locales
import srvInstall from "../../images/services/installation.jpg";
import srvNormes  from "../../images/services/mise-aux-normes.jpg";
import srvRenov   from "../../images/services/renovation.jpg";
import srvDepan   from "../../images/services/depannage.jpg";

const SERVICES = [
  { key: "installation", title: "Installation", image: srvInstall, href: "/services/installation", description: "Tableaux, circuits, prises, éclairage." },
  { key: "normes",       title: "Mise aux normes", image: srvNormes, href: "/services/mise-aux-normes", description: "Sécurité, conformité, protections différentielles." },
  { key: "renovation",   title: "Rénovation", image: srvRenov, href: "/services/renovation", description: "Remise à plat des réseaux, optimisation, propreté du chantier." },
  { key: "depannage",    title: "Dépannage", image: srvDepan, href: "/services/depannage", description: "Intervention rapide — pannes, courts-circuits, disjonctions." },
];

export default function Services() {
  return (
    <section
      id="prestations"
      aria-labelledby="prestations-title"
      className="bg-gradient-to-b from-white via-zinc-300 to-zinc-500 py-10 md:py-14 lg:py-16"
    >
      {/* Container harmonisé avec le reste du site */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16">
        {/* En-tête compact */}
        <div className="mb-5 md:mb-7">
          <h2
            id="prestations-title"
            className="max-w-3xl text-3xl md:text-4xl leading-tight font-extrabold tracking-tight text-[#0B0B0B]"
          >
            Nos prestations
          </h2>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((item) => (
            <a
              key={item.key}
              href={item.href}
              aria-label={`${item.title} — en savoir plus`}
              className="group relative block overflow-hidden shadow-sm ring-1 ring-black/5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C90E] transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/11] md:aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                  aria-hidden="true"
                />

                {/* Bloc texte centré */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 relative flex flex-col items-center text-center transition-[padding] duration-300 group-hover:pb-12">
                  <h3 className="text-white group-hover:text-[#F6C90E] text-lg md:text-xl font-semibold drop-shadow transition-colors">
                    {item.title}
                  </h3>
                  <p className="absolute bottom-0 text-[#F6C90E] text-sm leading-snug font-medium drop-shadow opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {item.description}
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
