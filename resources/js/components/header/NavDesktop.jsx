import React from "react";
import { Link } from "react-router-dom";
import { IconAlert, IconMail } from "./Icons";

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
  servicesLoading = false,
  servicesError = "",
}) {
  const hasItems = Array.isArray(SERVICES_ITEMS) && SERVICES_ITEMS.length > 0;

  return (
    <nav
      className="hidden md:flex items-center justify-between flex-1 gap-10 ml-10 xl:ml-14"
      role="navigation"
      aria-label="Navigation principale"
    >
      {/* === Zone gauche : liens principaux === */}
      <div className="flex items-center gap-8 xl:gap-10 text-[18px] xl:text-[19px]">
        {/* Accueil */}
        <a
          href="/"
          onClick={handleAccueil}
          className={`inline-flex items-center gap-1 px-3 py-3.5 font-medium border-b-2 transition-colors duration-300
                      text-neutral-900 border-transparent hover:text-[#F6C90E] hover:border-[#F6C90E]
                      ${accueilActive ? "text-[#F6C90E] border-[#F6C90E]" : ""}`}
          style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
        >
          Accueil
        </a>

        {/* Services */}
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
            className={`inline-flex items-center gap-1 px-3 py-3.5 font-medium border-b-2 transition-colors duration-300
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
                         min-w-[280px] overflow-hidden bg-white text-neutral-900
                         border border-neutral-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
                         ring-1 ring-black/5 rounded-none"
              role="menu"
              aria-label="Sous-menu Services"
            >
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 block w-3 h-3 rotate-45 bg-white border-l border-t border-neutral-200" />
              <ul className="py-2">
                {servicesLoading && (
                  <li className="px-4 py-3 text-[16px] text-neutral-500">
                    Chargement…
                  </li>
                )}

                {!servicesLoading &&
                  hasItems &&
                  SERVICES_ITEMS.map((it) => (
                    <li key={it.href}>
                      <Link
                        to={it.href}
                        role="menuitem"
                        onClick={() => scheduleCloseServices()}
                        className="group flex items-start gap-3 px-5 py-3 text-[16px] leading-snug hover:bg-neutral-50 focus:bg-neutral-50 outline-none"
                      >
                        <span className="h-5 w-[3px] bg-transparent group-hover:bg-[#F6C90E] mt-[2px]" />
                        <span className="text-neutral-900">{it.label}</span>
                      </Link>
                    </li>
                  ))}

                {!servicesLoading && !hasItems && (
                  <li className="px-4 py-3 text-[16px] text-neutral-500">
                    {servicesError
                      ? "Indisponible pour le moment"
                      : "Bientôt disponible"}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* === Espace flexible central === */}
      <div className="flex-1" />

      {/* === Zone droite : boutons === */}
      <div className="flex items-center gap-5 xl:gap-7">
        {/* Infos utiles */}
        <button
          onClick={() => setInfoOpen(true)}
          className="inline-flex items-center gap-3
                     bg-white text-neutral-900 border border-neutral-900
                     px-5 py-3 font-semibold transition hover:bg-[#F6C90E]
                     rounded-none btn-halo text-[17px]"
          aria-haspopup="dialog"
          aria-expanded={infoOpen}
          aria-controls="infos-utiles-panel"
          title="Voir les informations utiles"
          style={{ ["--btn-shadow-rgb"]: "0,0,0" }}
        >
          <IconAlert className="h-6 w-6" />
          Infos utiles
        </button>

        {/* Contactez-nous */}
        <button
          onClick={handleContact}
          className="inline-flex items-center gap-3
                     bg-[#D31920] px-5 py-3 font-semibold text-white text-[17px]
                     hover:brightness-95
                     rounded-none btn-halo"
          title="Contactez-nous"
          style={{ ["--btn-shadow-rgb"]: "211,25,32" }}
        >
          <IconMail className="h-6 w-6" />
          Contactez-nous
        </button>
      </div>
    </nav>
  );
}
