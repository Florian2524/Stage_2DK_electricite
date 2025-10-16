// resources/js/sections/Services.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

// Images locales (fallback & mapping visuel)
import srvInstall from "../../images/services/installation.jpg";
import srvNormes from "../../images/services/mise-aux-normes.jpg";
import srvRenov from "../../images/services/renovation.jpg";
import srvDepan from "../../images/services/depannage.jpg";

// Fallback statique (tes cartes actuelles)
const SERVICES_STATIC = [
  {
    key: "installation",
    title: "Installation",
    image: srvInstall,
    href: "/services/installation",
    description: "Tableaux, circuits, prises, éclairage.",
  },
  {
    key: "normes",
    title: "Mise aux normes",
    image: srvNormes,
    href: "/services/mise-aux-normes",
    description: "Sécurité, conformité, protections différentielles.",
  },
  {
    key: "renovation",
    title: "Rénovation",
    image: srvRenov,
    href: "/services/renovation",
    description: "Remise à plat des réseaux, optimisation, propreté du chantier.",
  },
  {
    key: "depannage",
    title: "Dépannage",
    image: srvDepan,
    href: "/services/depannage",
    description: "Intervention rapide — pannes, courts-circuits, disjonctions.",
  },
];

// Petit mapping nom → image/route existantes (si possible)
function pickImageByName(name = "") {
  const n = name.toLowerCase();
  if (n.includes("norm")) return srvNormes;
  if (n.includes("rénov") || n.includes("renov")) return srvRenov;
  if (n.includes("dép") || n.includes("depan")) return srvDepan;
  if (n.includes("install")) return srvInstall;
  return null;
}
function pickHrefByName(name = "") {
  const n = name.toLowerCase();
  if (n.includes("norm")) return "/services/mise-aux-normes";
  if (n.includes("rénov") || n.includes("renov")) return "/services/renovation";
  if (n.includes("dép") || n.includes("depan")) return "/services/depannage";
  if (n.includes("install")) return "/services/installation";
  // sinon, on redirige vers contact pré-rempli
  return `/contact?service=${encodeURIComponent(name)}`;
}

export default function Services() {
  const [items, setItems] = useState(null); // null = loading, [] = vide, [..] = data
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await api.get("/api/services"); // ← endpoint public (services actifs)
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]); // on bascule sur le fallback statique
        setError("Impossible de charger les services.");
      }
    })();
  }, []);

  const isLoading = items === null;
  const hasData = Array.isArray(items) && items.length > 0;

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
          {/* message d'erreur discret */}
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Loading skeleton (même gabarit) */}
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className="h-[230px] md:h-[260px] rounded-none shadow-sm ring-1 ring-black/5 bg-zinc-200 animate-pulse"
              />
            ))}

          {/* Données dynamiques depuis l'API */}
          {hasData &&
            items.map((s) => {
              const name = s?.name || "Service";
              const href = pickHrefByName(name);
              const img = s?.image_url || pickImageByName(name);
              const desc =
                s?.excerpt ||
                (s?.description ? String(s.description).slice(0, 120) + (String(s.description).length > 120 ? "…" : "") : "");

              return (
                <Link
                  key={`svc-${s.id}`}
                  to={href}
                  aria-label={`${name} — en savoir plus`}
                  className="group relative block overflow-hidden rounded-none shadow-sm ring-1 ring-black/5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C90E] transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/11] md:aspect-[4/3]">
                    {img ? (
                      <img
                        src={img}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full bg-zinc-300" />
                    )}

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                      aria-hidden="true"
                    />

                    {/* Bloc texte centré */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 relative flex flex-col items-center text-center transition-[padding] duration-300 group-hover:pb-12">
                      <h3 className="text-white group-hover:text-[#F6C90E] text-lg md:text-xl font-semibold drop-shadow transition-colors">
                        {name}
                      </h3>
                      {desc && (
                        <p className="absolute bottom-0 text-[#F6C90E] text-sm leading-snug font-medium drop-shadow opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}

          {/* Fallback : tes 4 cartes statiques si l'API ne renvoie rien */}
          {!isLoading && !hasData &&
            SERVICES_STATIC.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                aria-label={`${item.title} — en savoir plus`}
                className="group relative block overflow-hidden rounded-none shadow-sm ring-1 ring-black/5 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6C90E] transition-shadow hover:shadow-md"
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
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 relative flex flex-col items-center text-center transition-[padding] duration-300 group-hover:pb-12">
                    <h3 className="text-white group-hover:text-[#F6C90E] text-lg md:text-xl font-semibold drop-shadow transition-colors">
                      {item.title}
                    </h3>
                    <p className="absolute bottom-0 text-[#F6C90E] text-sm leading-snug font-medium drop-shadow opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
