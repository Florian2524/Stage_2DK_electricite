import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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

// --- Anti-tremblement ---
const SHRINK_DOWN = 48;
const EXPAND_UP = 8;
const SWITCH_COOLDOWN_MS = 250;

// Thème
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

// Icônes (compacts)
const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M2 5a2 2 0 012-2h2a1 1 0 011 .76l1 4a1 1 0 01-.27.98l-1.6 1.6a16 16 0 007.53 7.53l1.6-1.6a1 1 0 01.98-.27l4 1a1 1 0 01.76 1v2a2 2 0 01-2 2h-1C9.16 22 2 14.84 2 6V5z"/>
  </svg>
);
const IconMail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"/>
  </svg>
);
const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
  </svg>
);
const IconClose = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
  </svg>
);
const IconSun = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
    <path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);
const IconMoon = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
  </svg>
);

export default function Header() {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesHoverOpen, setServicesHoverOpen] = useState(false);
  const [query, setQuery] = useState("");

  // --- état du surlignage ---
  // null | 'home' | 'services'
  const [section, setSection] = useState/** @type {null | 'home' | 'services'} */(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Hover global prioritaire ?
  const hoverActiveRef = useRef(false);

  // Dropdown desktop Services
  const closeTimer = useRef(null);
  const openServices = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setServicesHoverOpen(true); };
  const scheduleCloseServices = () => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setServicesHoverOpen(false), 160); };

  // Thème
  useEffect(() => { setTheme(theme); }, [theme]);

  // Mesures
  const getHeaderH = () => document.querySelector("header")?.getBoundingClientRect().height || 0;

  // Calcule la section “vue” par une ligne sous le header (fallback si pas de hover)
  const recomputeSection = () => {
    if (hoverActiveRef.current) return; // le hover garde la priorité
    if (location.pathname !== "/") { setSection(null); return; }
    const hero = document.getElementById("hero");
    const sev  = document.getElementById("prestations");
    if (!hero && !sev) { setSection(null); return; }

    const probe = getHeaderH() + 6; // ligne sous le header
    const inRange = (el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom - 8 > probe;
    };

    if (inRange(sev)) setSection("services");
    else if (inRange(hero)) setSection("home");
    else setSection(null);
  };

  // Shrink
  useEffect(() => {
    const lastSwitchRef = { current: 0 };
    const onScroll = () => {
      const y = window.scrollY || 0;
      const now = performance.now();
      const next = y >= SHRINK_DOWN ? true : y <= EXPAND_UP ? false : isShrunk;
      if (next !== isShrunk && now - lastSwitchRef.current >= SWITCH_COOLDOWN_MS) {
        lastSwitchRef.current = now;
        setIsShrunk(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isShrunk]);

  const toggleTheme = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));

  // Scroll util
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - getHeaderH() - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    requestAnimationFrame(recomputeSection);
    setTimeout(recomputeSection, 120);
    setTimeout(recomputeSection, 420);
  };

  // Accueil
  const handleAccueil = (e) => {
    e.preventDefault();
    setSection("home");
    if (location.pathname === "/") goTo("hero");
    else navigate("/");
    setMenuOpen(false);
  };

  // Services
  const handleServices = (e) => {
    e.preventDefault();
    setSection("services");
    if (location.pathname === "/") goTo("prestations");
    else navigate("/", { state: { scrollTo: "prestations" } });
    setMenuOpen(false);
  };

  // Contact
  const handleContact = (e) => {
    e.preventDefault();
    if (location.pathname === "/contact") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/contact");
    setMenuOpen(false);
  };

  // Scroll après navigation vers "/"
  useEffect(() => {
    if (location.pathname !== "/") return;
    const target = location.state && location.state.scrollTo;
    if (!target) return;
    setTimeout(() => {
      goTo(String(target));
      setSection(target === "prestations" ? "services" : "home");
    }, 50);
    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate]);

  // --- HOVER PAR POSITION DE LA SOURIS SUR LES SECTIONS (prioritaire) ---
  useEffect(() => {
    if (location.pathname !== "/") return;

    const hero = document.getElementById("hero");
    const sev  = document.getElementById("prestations");
    if (!hero && !sev) return;

    const onEnterHero = () => { hoverActiveRef.current = true; setSection("home"); };
    const onLeaveHero = (e) => {
      if (sev && e?.relatedTarget && sev.contains(e.relatedTarget)) return;
      hoverActiveRef.current = false;
      recomputeSection();
    };

    const onEnterSev = () => { hoverActiveRef.current = true; setSection("services"); };
    const onLeaveSev = (e) => {
      if (hero && e?.relatedTarget && hero.contains(e.relatedTarget)) return;
      hoverActiveRef.current = false;
      recomputeSection();
    };

    hero && hero.addEventListener("mouseenter", onEnterHero);
    hero && hero.addEventListener("mouseleave", onLeaveHero);
    sev  && sev.addEventListener("mouseenter", onEnterSev);
    sev  && sev.addEventListener("mouseleave", onLeaveSev);

    return () => {
      hero && hero.removeEventListener("mouseenter", onEnterHero);
      hero && hero.removeEventListener("mouseleave", onLeaveHero);
      sev  && sev.removeEventListener("mouseenter", onEnterSev);
      sev  && sev.removeEventListener("mouseleave", onLeaveSev);
    };
  }, [location.pathname]);

  // --- Scroll-spy (fallback quand pas de hover) ---
  useEffect(() => {
    if (location.pathname !== "/") { setSection(null); return; }
    const onScrollOrResize = () => recomputeSection();
    recomputeSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname]);

  // Styles onglets — typo + soulignement fin (déjà intégré précédemment)
  const navBase =
    "px-2 md:px-3 py-2 text-[15px] md:text-[16px] font-medium tracking-[0.01em] " +
    "border-b-[1.5px] border-transparent transition-all duration-300";
  const navActive =
    "text-[#F6C90E] border-b-[1.5px] border-[#F6C90E] pb-1";
  const navInactive =
    "hover:text-[#F6C90E] hover:border-[#F6C90E]";
  const cls = (active) => `${navBase} ${active ? navActive : navInactive}`;

  // État actif
  const accueilActive = location.pathname === "/" ? section === "home" : location.pathname === "/";
  const servicesRoute = location.pathname.startsWith("/services");
  const servicesActive = location.pathname === "/" ? section === "services" : servicesRoute;

  return (
    <header className="sticky top-0 z-50 transition-all duration-200 bg-white dark:bg-white" aria-label="En-tête du site">
      <div className={`${isShrunk ? "py-2" : "py-3"}`} style={{ willChange: "padding" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 text-neutral-900">
            {/* Logo → Accueil */}
            <a href="/" onClick={handleAccueil} className="shrink-0 flex items-center gap-2" aria-label="Accueil">
              <img
                src={logoUrl}
                alt="2DK Électricité"
                className="transition-all w-auto"
                style={{ height: isShrunk ? "80px" : "96px" }}
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Navigation principale">
              <a href="/" onClick={handleAccueil} className={cls(accueilActive)}>Accueil</a>

              {/* Services + dropdown (visuel premium) */}
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
                  className={cls(servicesActive) + " inline-flex items-center gap-1"}
                  aria-haspopup="true"
                  aria-expanded={servicesHoverOpen}
                >
                  Services
                  <span
                    className={`transition-transform duration-200 inline-block ${servicesHoverOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </a>

                {servicesHoverOpen && (
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-full mt-2 z-[60]
                      min-w-[260px] overflow-hidden rounded-2xl bg-white text-neutral-900
                      border border-neutral-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
                      ring-1 ring-black/5 origin-top animate-[menuIn_160ms_ease-out]
                    `}
                    role="menu"
                    aria-label="Sous-menu Services"
                  >
                    {/* Caret */}
<span
  className="absolute -top-1 left-1/2 -translate-x-1/2 block w-3 h-3 rotate-45 bg-white border-l border-t border-neutral-200"
  aria-hidden="true"
/>

{/* Liseré jaune brand (après le caret → pas de trou) */}
<div className="h-[3px] w-full bg-[#F6C90E] relative z-10" />


                    <ul className="py-2">
                      {SERVICES_ITEMS.map((it) => (
                        <li key={it.href}>
                          <Link
                            to={it.href}
                            role="menuitem"
                            onClick={() => setServicesHoverOpen(false)}
                            className="
                              group flex items-start gap-3 px-4 py-3 text-[15px] leading-snug
                              hover:bg-neutral-50 focus:bg-neutral-50 outline-none
                            "
                          >
                            {/* Barre jaune au hover */}
                            <span className="h-5 w-[3px] rounded-full bg-transparent group-hover:bg-[#F6C90E] mt-[2px]" />
                            <span className="text-neutral-900">{it.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <NavLink to="/realisations" className={({ isActive }) => cls(isActive)}>Réalisations</NavLink>
              <NavLink to="/contact" onClick={handleContact} className={({ isActive }) => cls(isActive)}>Contact</NavLink>
            </nav>

            {/* Actions droite (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <form onSubmit={(e) => e.preventDefault()} className="relative" role="search" aria-label="Recherche sur le site">
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

              <a href={TEL_LINK} className="hidden lg:flex items-center gap-2 text-neutral-900" title={TEL_DISPLAY}>
                <IconPhone className="h-5 w-5" /> <span className="text-sm">{TEL_DISPLAY}</span>
              </a>
              <a href={EMAIL_LINK} className="hidden xl:flex items-center gap-2 text-neutral-900" title={EMAIL_DISPLAY}>
                <IconMail className="h-5 w-5" /> <span className="text-sm">{EMAIL_DISPLAY}</span>
              </a>

              <Link
                to={CTA_URL}
                className="inline-flex items-center justify-center rounded-full
                           bg-neutral-900 px-4 py-2 font-medium text-white hover:bg-neutral-800 transition
                           focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                {CTA_LABEL}
              </Link>

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

      {/* Drawer mobile simple */}
      <div
        id="mobile-drawer"
        className={`md:hidden fixed inset-0 z-[60] bg-black/40 ${menuOpen ? "block" : "hidden"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="absolute right-0 top-0 h-full w-80 bg-white text-neutral-900 p-4 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button aria-label="Fermer le menu" onClick={() => setMenuOpen(false)}>
              <IconClose className="h-7 w-7" />
            </button>
          </div>

          <nav className="mt-4 flex flex-col gap-3">
            <a href="/" onClick={handleAccueil} className={cls(location.pathname === "/" ? section === "home" : location.pathname === "/")}>Accueil</a>
            <a href="#prestations" onClick={handleServices} className={cls(location.pathname === "/" ? section === "services" : location.pathname.startsWith("/services"))}>Services</a>
            <NavLink to="/realisations" className={({ isActive }) => cls(isActive)}>Réalisations</NavLink>
            <NavLink to="/contact" className={({ isActive }) => cls(isActive)} onClick={handleContact}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
