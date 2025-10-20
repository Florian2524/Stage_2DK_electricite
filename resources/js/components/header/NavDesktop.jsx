import React from "react";
import { Link } from "react-router-dom";
import {
  IconAlert,
  IconMail,
  IconSearch,
  IconSun,
  IconMoon,
} from "./Icons";

export default function NavDesktop({
  cls,
  accueilActive,
  servicesActive,
  SERVICES_ITEMS,
  servicesHoverOpen,
  openServices,
  scheduleCloseServices,
  handleAccueil,
  handleServices,
  handleContact,
  infoOpen,
  setInfoOpen,
  CTA_URL,
  query,
  setQuery,
  theme,
  toggleTheme,
  // ↓ nouveaux (facultatifs)
  servicesLoading = false,
  servicesError = "",
}) {
  const hasItems = Array.isArray(SERVICES_ITEMS) && SERVICES_ITEMS.length > 0;

  return (
    <>
      {/* Nav desktop */}
      <nav
        className="hidden md:flex items-center gap-6"
        role="navigation"
        aria-label="Navigation principale"
      >
        {/* Accueil — soulignement + hover jaune */}
        <a
          href="/"
          onClick={handleAccueil}
          className={`inline-flex items-center gap-1 px-1 py-2 font-medium border-b-2 transition-colors duration-300
                      text-neutral-900 border-transparent hover:text-[#F6C90E] hover:border-[#F6C90E]
                      ${accueilActive ? "text-[#F6C90E] border-[#F6C90E]" : ""}`}
          style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
        >
          Accueil
        </a>

        {/* Services — soulignement + hover jaune */}
        <div
          className="relative"
          onMouseEnter={openServices}
          onMouseLeave={scheduleCloseServices}
          onFocus={openServices}
          onBlur={scheduleCloseServices}
        >
          <a
            href="#prestations"
            onClick={handleServices}
            className={`inline-flex items-center gap-1 px-1 py-2 font-medium border-b-2 transition-colors duration-300
                        text-neutral-900 border-transparent hover:text-[#F6C90E] hover:border-[#F6C90E]
                        ${servicesActive ? "text-[#F6C90E] border-[#F6C90E]" : ""}`}
            aria-haspopup="true"
            aria-expanded={servicesHoverOpen}
            style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
          >
            Services
            <span
              className={`transition-transform duration-200 inline-block ${
                servicesHoverOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            >
              ▾
            </span>
          </a>

          {servicesHoverOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60]
                         min-w-[260px] overflow-hidden bg-white text-neutral-900
                         border border-neutral-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
                         ring-1 ring-black/5 rounded-none"
              role="menu"
              aria-label="Sous-menu Services"
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 block w-3 h-3 rotate-45 bg-white border-l border-t border-neutral-200" />
              <ul className="py-2">
                {servicesLoading && (
                  <li className="px-4 py-3 text-[15px] text-neutral-500">
                    Chargement…
                  </li>
                )}

                {!servicesLoading && hasItems && SERVICES_ITEMS.map((it) => (
                  <li key={it.href}>
                    <Link
                      to={it.href}
                      role="menuitem"
                      onClick={() => scheduleCloseServices()}
                      className="group flex items-start gap-3 px-4 py-3 text-[15px] leading-snug hover:bg-neutral-50 focus:bg-neutral-50 outline-none"
                    >
                      <span className="h-5 w-[3px] bg-transparent group-hover:bg-[#F6C90E] mt-[2px]" />
                      <span className="text-neutral-900">{it.label}</span>
                    </Link>
                  </li>
                ))}

                {!servicesLoading && !hasItems && (
                  <li className="px-4 py-3 text-[15px] text-neutral-500">
                    {servicesError ? "Indisponible pour le moment" : "Bientôt disponible"}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Infos utiles — contour noir + hover jaune */}
        <button
          onClick={() => setInfoOpen(true)}
          className="inline-flex items-center gap-2
                     bg-white text-neutral-900 border border-neutral-900
                     px-4 py-2 font-medium transition hover:bg-[#F6C90E]
                     rounded-none btn-halo"
          aria-haspopup="dialog"
          aria-expanded={infoOpen}
          aria-controls="infos-utiles-panel"
          title="Voir les informations utiles"
          style={{ ["--btn-shadow-rgb"]: "0,0,0" }}
        >
          <IconAlert className="h-5 w-5" />
          Infos utiles
        </button>

        {/* Contactez-nous — ROUGE plein comme avant */}
        <button
          onClick={handleContact}
          className="inline-flex items-center gap-2
                     bg-[#D31920] px-4 py-2 font-semibold text-white
                     hover:brightness-95
                     rounded-none btn-halo"
          title="Contactez-nous"
          style={{ ["--btn-shadow-rgb"]: "211,25,32" }}
        >
          <IconMail className="h-5 w-5" />
          Contactez-nous
        </button>
      </nav>

      {/* Actions droite (desktop) */}
      <div className="hidden md:flex items-center gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative"
          role="search"
          aria-label="Recherche sur le site"
        >
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="w-40 focus:w-64 transition-[width] duration-200
                       rounded-full bg-neutral-100 text-neutral-900 placeholder-neutral-500
                       pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-[#F6C90E]"
          />
        </form>

        <button
          onClick={toggleTheme}
          className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full
                     bg-neutral-100 hover:bg-neutral-200 text-neutral-900
                     focus:outline-none focus:ring-2 focus:ring-neutral-900"
          aria-label="Changer le thème"
          title="Changer le thème"
        >
          {theme === "dark" ? (
            <IconSun className="h-5 w-5" />
          ) : (
            <IconMoon className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );
}
