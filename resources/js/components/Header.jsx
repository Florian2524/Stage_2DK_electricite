import React, { useEffect, useState, useRef } from "react";
import logoUrl from "../../images/logo.png";

// --- Constantes rapides ---
const CTA_LABEL = "Contact";
const CTA_URL = "/contact";
const TEL_DISPLAY = "05 55 xx xx xx";
const TEL_LINK = "tel:0555";
const EMAIL_DISPLAY = "contact@2dk.fr";
const EMAIL_LINK = "mailto:contact@2dk.fr";

const SERVICES_ITEMS = [
  { label: "Installation", href: "/services/installation" },
  { label: "Mise aux normes", href: "/services/mise-aux-normes" },
  { label: "Rénovation", href: "/services/renovation" },
  { label: "Dépannage", href: "/services/depannage" },
];

function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("theme", theme);
}
function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// Icônes (héritent de currentColor)
const IconPhone = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 5a2 2 0 012-2h2a1 1 0 011 .76l1 4a1 1 0 01-.27.98l-1.6 1.6a16 16 0 007.53 7.53l1.6-1.6a1 1 0 01.98-.27l4 1a1 1 0 01.76 1v2a2 2 0 01-2 2h-1C9.16 22 2 14.84 2 6V5z"/></svg>);
const IconMail  = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>);
const IconSearch= (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/></svg>);
const IconMenu  = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>);
const IconClose = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>);
const IconSun   = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><circle cx="12" cy="12" r="4" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>);
const IconMoon  = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>);

export default function Header() {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // mobile
  const [query, setQuery] = useState("");

  // --- Desktop dropdown state (tolérant)
  const [servicesHoverOpen, setServicesHoverOpen] = useState(false);
  const closeTimer = useRef(null);
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesHoverOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesHoverOpen(false), 160); // petit délai anti-flicker
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setTheme(theme); }, [theme]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const handleNav = () => setMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200 bg-white dark:bg-white"
      aria-label="En-tête du site"
    >
      <div className={`${scrolled ? "py-2" : "py-3"}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Barre principale */}
          <div className="flex items-center justify-between gap-3 text-neutral-900">
            {/* Logo (96px repos / 80px scroll) */}
            <a href="/" className="shrink-0 flex items-center gap-2" aria-label="Accueil">
              <img
                src={logoUrl}
                alt="2DK Électricité"
                className="transition-all w-auto"
                style={{ height: scrolled ? "80px" : "96px" }}
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navigation principale">
              <a href="/" className="hover:underline underline-offset-4">Accueil</a>

              {/* Services: wrapper qui gère enter/leave + délai */}
              <div
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
                onFocus={openServices}
                onBlur={scheduleCloseServices}
              >
                <a
                  href="/services"
                  className="hover:underline underline-offset-4"
                  aria-haspopup="true"
                  aria-expanded={servicesHoverOpen}
                >
                  Services
                </a>

                {/* Menu déroulant — collé à l’onglet (pas de gap) */}
                <div
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                  className={[
                    "absolute left-0 top-full mt-0 min-w-[220px] rounded-xl border border-neutral-200 bg-white p-2 shadow-lg",
                    "transition ease-out duration-150",
                    servicesHoverOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1",
                  ].join(" ")}
                  role="menu"
                >
                  {SERVICES_ITEMS.map((it) => (
                    <a
                      key={it.href}
                      href={it.href}
                      className="block rounded-lg px-3 py-2 text-sm text-neutral-900 hover:bg-neutral-100"
                    >
                      {it.label}
                    </a>
                  ))}
                </div>
              </div>

              <a href="/realisations" className="hover:underline underline-offset-4">Réalisations</a>
              <a href="/contact" className="hover:underline underline-offset-4">Contact</a>
            </nav>

            {/* Actions droite (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Recherche */}
              <form onSubmit={(e) => e.preventDefault()} className="relative" role="search" aria-label="Recherche sur le site">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher…"
                  className="w-40 focus:w-64 transition-[width] duration-200
                  rounded-full bg-neutral-100 text-neutral-900 placeholder-neutral-500
                  pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </form>

              {/* Tel / mail */}
              <a href={TEL_LINK} className="hidden lg:flex items-center gap-2 text-neutral-900" title={TEL_DISPLAY}>
                <IconPhone className="h-5 w-5" /> <span className="text-sm">{TEL_DISPLAY}</span>
              </a>
              <a href={EMAIL_LINK} className="hidden xl:flex items-center gap-2 text-neutral-900" title={EMAIL_DISPLAY}>
                <IconMail className="h-5 w-5" /> <span className="text-sm">{EMAIL_DISPLAY}</span>
              </a>

              {/* CTA noir sur fond blanc */}
              <a
                href={CTA_URL}
                className="inline-flex items-center justify-center rounded-full
                bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 transition
                focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                {CTA_LABEL}
              </a>

              {/* Dark toggle (le header reste blanc) */}
              <button
                onClick={toggleTheme}
                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full
                bg-neutral-100 hover:bg-neutral-200 text-neutral-900
                focus:outline-none focus:ring-2 focus:ring-neutral-900"
                aria-label="Changer le thème"
                title="Changer le thème"
              >
                {theme === "dark" ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
              </button>
            </div>

            {/* Actions mobile */}
            <div className="md:hidden flex items-center gap-2 text-neutral-900">
              <a href={TEL_LINK} className="p-2" aria-label={`Appeler ${TEL_DISPLAY}`}><IconPhone className="h-6 w-6" /></a>
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2"
                aria-label="Ouvrir le menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
              >
                <IconMenu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer mobile (blanc aussi) */}
      <div
        id="mobile-drawer"
        className={`fixed inset-0 z-50 md:hidden ${menuOpen ? "" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw]
          bg-white text-neutral-900 shadow-xl transition-transform duration-200
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
            <a href="/" onClick={handleNav} className="flex items-center gap-2">
              <img src={logoUrl} alt="2DK Électricité" className="h-10 w-auto" />
            </a>
            <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-neutral-100" aria-label="Fermer le menu">
              <IconClose className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 border-b border-neutral-200">
            <form onSubmit={(e) => e.preventDefault()} role="search">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher…"
                  className="w-full rounded-lg bg-neutral-100 text-neutral-900 placeholder-neutral-500
                  pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </form>
          </div>

          <nav className="p-2 text-base">
            <a href="/" onClick={handleNav} className="block px-4 py-3 rounded-lg hover:bg-neutral-100">Accueil</a>
            <div className="px-2">
              <button
                onClick={() => setServicesOpen((v) => !v)}
                className="w-full flex items-center justify-between px-2 py-3 rounded-lg hover:bg-neutral-100"
                aria-expanded={servicesOpen}
                aria-controls="services-accordion"
              >
                <span className="px-2">Services</span>
                <span className={`mx-2 transition ${servicesOpen ? "rotate-90" : ""}`} aria-hidden>›</span>
              </button>
              <div id="services-accordion" className={`overflow-hidden transition-[max-height] duration-200 ${servicesOpen ? "max-h-96" : "max-h-0"}`}>
                <div className="flex flex-col gap-1 pb-2">
                  {SERVICES_ITEMS.map((it) => (
                    <a key={it.href} href={it.href} onClick={handleNav} className="block rounded-md px-6 py-2 text-sm hover:bg-neutral-100">
                      {it.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="/realisations" onClick={handleNav} className="block px-4 py-3 rounded-lg hover:bg-neutral-100">Réalisations</a>
            <a href="/contact" onClick={handleNav} className="block px-4 py-3 rounded-lg hover:bg-neutral-100">Contact</a>
          </nav>

          <div className="mt-auto p-4 border-t border-neutral-200">
            <div className="flex items-center gap-2">
              <IconPhone className="h-5 w-5" />
              <a href={TEL_LINK} className="text-sm">{TEL_DISPLAY}</a>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <IconMail className="h-5 w-5" />
              <a href={EMAIL_LINK} className="text-sm">{EMAIL_DISPLAY}</a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => setThemeState((t) => (t === "dark" ? "light" : "dark"))}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full
                bg-neutral-100 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                aria-label="Changer le thème"
              >
                {theme === "dark" ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
              </button>
              <a
                href={CTA_URL}
                onClick={handleNav}
                className="ml-auto inline-flex items-center justify-center rounded-full
                bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 transition
                focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                {CTA_LABEL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
