import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// ✅ On réutilise les constantes du Header pour ne pas dupliquer les infos
import {
  CTA_URL,
  TEL_DISPLAY,
  TEL_LINK,
  EMAIL_DISPLAY,
  EMAIL_LINK,
  ADDRESS_DISPLAY,
  MAPS_LINK,
  SERVICE_AREA,
} from "./header/constants";

const COMPANY = {
  name: "2DK Électricité",
};

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContact = (e) => {
    e.preventDefault();
    if (location.pathname === CTA_URL) {
      scrollTop();
    } else {
      navigate(CTA_URL);
      setTimeout(() => scrollTop(), 0);
    }
  };

  const LINKS = [
    { label: "Accueil", to: "/" },
    { label: "Contactez-nous", to: CTA_URL },
    { label: "Mentions légales", to: "/mentions-legales" },
  ];

  return (
    <footer
      className="relative text-zinc-900 bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700"
      aria-labelledby="site-footer-heading"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16 py-14 md:py-18 lg:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Colonne 1 */}
          <div className="space-y-4">
            <div className="text-2xl font-extrabold text-white">{COMPANY.name}</div>
            <p className="text-zinc-100">
              Des interventions rapides et soignées sur {SERVICE_AREA || "la métropole bordelaise"}.
            </p>

            {/* Coordonnées */}
            <ul className="mt-6 space-y-2 text-zinc-100">
              <li className="flex items-center gap-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 3a1 1 0 011-1h3a1 1 0 011 .78l.72 3.1a1 1 0 01-.29.97l-1.7 1.7a18 18 0 007.56 7.56l1.7-1.7a1 1 0 01.97-.29l3.1.72a1 1 0 01.78 1V21a1 1 0 01-1 1h-2C8.82 22 2 15.18 2 6V4a1 1 0 011-1z"/>
                </svg>
                <a href={TEL_LINK} className="hover:text-[#F6C90E] transition-colors">
                  {TEL_DISPLAY}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11ZM5 7l7 4.5L19 7H5Z"/>
                </svg>
                <a href={EMAIL_LINK} className="hover:text-[#F6C90E] transition-colors">
                  {EMAIL_DISPLAY}
                </a>
              </li>

              <li className="flex items-center gap-3">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 7 7 13 7 13s7-6 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                {MAPS_LINK ? (
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F6C90E] transition-colors"
                  >
                    {ADDRESS_DISPLAY}
                  </a>
                ) : (
                  <span>{ADDRESS_DISPLAY}</span>
                )}
              </li>
            </ul>
          </div>

          {/* Colonne 2 */}
          <nav className="md:justify-self-center" aria-label="Liens de pied de page">
            <h3 className="mb-4 text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    className="text-zinc-100 hover:text-[#F6C90E] transition-colors"
                    to={l.to}
                    onClick={(e) => {
                      if (l.to === CTA_URL || l.to === "/") {
                        e.preventDefault();
                        if (location.pathname === l.to) {
                          scrollTop();
                        } else {
                          navigate(l.to);
                          setTimeout(() => scrollTop(), 0);
                        }
                      }
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 */}
          <div className="flex flex-col justify-center">
            <h2
              id="site-footer-heading"
              className="text-3xl font-extrabold leading-tight md:text-4xl text-white"
            >
              Des solutions fiables pour votre sécurité
              <br className="hidden md:block" /> et vos installations
            </h2>

            <Link
              to={CTA_URL}
              onClick={handleContact}
              className="btn-red btn-square btn-halo w-fit mt-8"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="currentColor"
              >
                <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11ZM5 7l7 4.5L19 7H5Z" />
              </svg>
              <span>Contactez-nous</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-400 py-4 text-center text-xs text-zinc-200">
          © {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.
        </div>
      </div>

      {/* Bouton "Haut de page" */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
        <button
          type="button"
          onClick={scrollTop}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-400 bg-black/30 backdrop-blur px-4 py-2 text-xs text-white hover:bg-black/50 transition btn-halo"
          aria-label="Haut de page"
          title="Haut de page"
          style={{ ["--btn-shadow-rgb"]: "255,255,255" }}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Haut de page
        </button>
      </div>
    </footer>
  );
}
