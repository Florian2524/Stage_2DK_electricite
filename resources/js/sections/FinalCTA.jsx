import React from "react";

const CTA_PRIMARY_LABEL = "Contactez-nous";
const CTA_PRIMARY_HREF = "/contact";

const LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Contactez-nous", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Plan du site", href: "/plan-du-site" },
];

const COMPANY = {
  name: "2DK Électricité",
  phone: "05 00 00 00 00",
  email: "contact@2dk.fr",
  address: "Métropole de Bordeaux (CUB)",
};

export default function FinalCTA() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="relative text-zinc-900 bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16 py-14 md:py-18 lg:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Colonne 1 */}
          <div className="space-y-4">
            <div className="text-2xl font-extrabold text-white">{COMPANY.name}</div>
            <p className="text-zinc-100">
              Des interventions rapides et soignées sur la CUB de Bordeaux.
            </p>
            <ul className="mt-4 space-y-1 text-zinc-100">
              <li>Tél : {COMPANY.phone}</li>
              <li>Email : {COMPANY.email}</li>
              <li>Zone : {COMPANY.address}</li>
            </ul>
          </div>

          {/* Colonne 2 */}
          <nav className="md:justify-self-center">
            <h3 className="mb-4 text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    className="text-zinc-100 hover:text-[#F6C90E] transition-colors"
                    href={l.href}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Colonne 3 */}
          <div className="flex flex-col justify-center">
            <h2
              id="final-cta-heading"
              className="text-3xl font-extrabold leading-tight md:text-4xl text-white"
            >
              Des solutions fiables pour votre sécurité
              <br className="hidden md:block" /> et vos installations
            </h2>

            <a
              href={CTA_PRIMARY_HREF}
              className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-[#F6C90E] px-6 font-semibold text-black hover:bg-yellow-400 active:translate-y-[1px] transition-all shadow-sm hover:shadow-md"
            >
              {CTA_PRIMARY_LABEL}
            </a>
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
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-400 bg-black/30 backdrop-blur px-4 py-2 text-xs text-white hover:bg-black/50 transition"
          aria-label="Haut de page"
          title="Haut de page"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Haut de page
        </button>
      </div>
    </section>
  );
}
