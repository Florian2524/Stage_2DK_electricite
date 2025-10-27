import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoUrl from "../../images/logo.png";

import {
  CTA_URL,
  SERVICES_ITEMS as SERVICES_ITEMS_FALLBACK, // fallback si API vide/KO
  TEL_DISPLAY,
  TEL_LINK,
  EMAIL_DISPLAY,
  EMAIL_LINK,
  ADDRESS_DISPLAY,
  MAPS_LINK,
  SERVICE_AREA,
  URGENCY_INFO,
  SHRINK_DOWN,
  EXPAND_UP,
  SWITCH_COOLDOWN_MS,
} from "./header/constants";

import { fetchActiveServices, mapToMenuItems } from "../lib/servicesClient";
import { IconPhone, IconMenu } from "./header/Icons";
import { useEscapeToClose, copyToClipboard } from "./header/hooks";
import NavDesktop from "./header/NavDesktop";
import MobileDrawer from "./header/MobileDrawer";
import InfoPanel from "./header/InfoPanel";

export default function Header() {
  // États
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [servicesHoverOpen, setServicesHoverOpen] = useState(false);

  // 🔥 Services dynamiques (menu)
  const [servicesItems, setServicesItems] = useState(null); // null = loading, [] = vide, [{...}] = ok
  const [servicesError, setServicesError] = useState("");

  // Surbrillance Accueil/Services
  const [section, setSection] = useState/** @type {null | 'home' | 'services'} */(null);
  const location = useLocation();
  const navigate = useNavigate();
  const hoverActiveRef = useRef(false);
  const closeTimer = useRef(null); // unique

  // Utilitaires
  const getHeaderH = () =>
    document.querySelector("header")?.getBoundingClientRect().height || 0;

  const recomputeSection = () => {
    if (hoverActiveRef.current) return;
    if (location.pathname !== "/") {
      setSection(null);
      return;
    }
    const hero = document.getElementById("hero");
    const sev = document.getElementById("prestations");
    if (!hero && !sev) {
      setSection(null);
      return;
    }
    const probe = getHeaderH() + 6;
    const inRange = (el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom - 8 > probe;
    };
    if (inRange(sev)) setSection("services");
    else if (inRange(hero)) setSection("home");
    else setSection(null);
  };

  // Shrink au scroll
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

  // Échap pour fermer la fiche Infos utiles
  useEscapeToClose(infoOpen, () => setInfoOpen(false));

  // Nav helpers
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - getHeaderH() - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    requestAnimationFrame(recomputeSection);
    setTimeout(recomputeSection, 120);
    setTimeout(recomputeSection, 420);
  };

  const handleAccueil = (e) => {
    e.preventDefault();
    setSection("home");
    location.pathname === "/" ? goTo("hero") : navigate("/");
    setMenuOpen(false);
  };

  const handleServices = (e) => {
    e.preventDefault();
    setSection("services");
    location.pathname === "/"
      ? goTo("prestations")
      : navigate("/", { state: { scrollTo: "prestations" } });
    setMenuOpen(false);
  };

  const handleContact = (e) => {
    e.preventDefault();
    location.pathname === "/contact"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : navigate("/contact");
    setMenuOpen(false);
  };

  // Scroll spy
  useEffect(() => {
    if (location.pathname !== "/") {
      setSection(null);
      return;
    }
    const onScrollOrResize = () => recomputeSection();
    recomputeSection();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname]);

  // 🔁 Charger services (API → menu items)
  useEffect(() => {
    let cancel = false;
    async function load() {
      try {
        setServicesError("");
        setServicesItems(null); // loading
        const list = await fetchActiveServices();
        if (cancel) return;
        setServicesItems(mapToMenuItems(list));
      } catch (e) {
        if (cancel) return;
        setServicesError("Impossible de charger la liste des services.");
        setServicesItems([]); // fallback constants
      }
    }
    load();
    return () => { cancel = true; };
  }, []);

  // Styles liens nav
  const navBase =
    "px-2 md:px-3 py-2 text-[15px] md:text-[16px] font-medium tracking-[0.01em] border-b-[1.5px] border-transparent transition-all duration-300";
  const navActive = "text-[#F6C90E] border-b-[1.5px] border-[#F6C90E] pb-1";
  const navInactive = "hover:text-[#F6C90E] hover:border-[#F6C90E]";
  const cls = (active) => `${navBase} ${active ? navActive : navInactive}`;

  // États actifs courants
  const accueilActive =
    location.pathname === "/" ? section === "home" : location.pathname === "/";
  const servicesRoute = location.pathname.startsWith("/services");
  const servicesActive =
    location.pathname === "/" ? section === "services" : servicesRoute;

  // Services hover
  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesHoverOpen(true);
  };
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesHoverOpen(false), 160);
  };

  // Liste finale pour le menu : API si dispo, sinon fallback constants
  const SERVICES_ITEMS =
    servicesItems && servicesItems.length > 0
      ? servicesItems
      : SERVICES_ITEMS_FALLBACK;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-200 bg-white"
      aria-label="En-tête du site"
    >
      <div className={`${isShrunk ? "py-2" : "py-3"}`}>
        <div className="container px-0">
          <div className="flex items-center justify-between gap-3 text-neutral-900 min-w-0">
            {/* Logo */}
            <a
              href="/"
              onClick={handleAccueil}
              className="shrink-0 flex items-center gap-2 -ml-2 sm:-ml-3 lg:-ml-4"
              aria-label="Accueil"
            >
              <img
                src={logoUrl}
                alt="2DK Électricité"
                className="block w-auto transition-all"
                style={{ height: isShrunk ? "80px" : "96px" }}
                loading="eager"
                decoding="async"
              />
            </a>

            {/* Nav Desktop */}
            <NavDesktop
              cls={cls}
              accueilActive={accueilActive}
              servicesActive={servicesActive}
              SERVICES_ITEMS={SERVICES_ITEMS}
              servicesHoverOpen={servicesHoverOpen}
              openServices={openServices}
              scheduleCloseServices={scheduleCloseServices}
              handleAccueil={handleAccueil}
              handleServices={handleServices}
              handleContact={handleContact}
              infoOpen={infoOpen}
              setInfoOpen={setInfoOpen}
              CTA_URL={CTA_URL}
              servicesLoading={servicesItems === null}
              servicesError={servicesError}
            />

            {/* Actions mobile */}
            <div className="md:hidden flex items-center gap-2 text-neutral-900">
              <a
                href={TEL_LINK}
                className="p-2"
                aria-label={`Appeler ${TEL_DISPLAY}`}
              >
                <IconPhone className="h-6 w-6" />
              </a>
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

      {/* Drawer mobile */}
      <MobileDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cls={cls}
        locationPath={location.pathname}
        section={section}
        handleAccueil={handleAccueil}
        handleServices={handleServices}
        handleContact={handleContact}
        setInfoOpen={setInfoOpen}
      />

      {/* Panneau Infos utiles */}
      <InfoPanel
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        CTA_URL={CTA_URL}
        copy={copyToClipboard}
        ADDRESS_DISPLAY={ADDRESS_DISPLAY}
        MAPS_LINK={MAPS_LINK}
        TEL_DISPLAY={TEL_DISPLAY}
        TEL_LINK={TEL_LINK}
        EMAIL_DISPLAY={EMAIL_DISPLAY}
        EMAIL_LINK={EMAIL_LINK}
        SERVICE_AREA={SERVICE_AREA}
        URGENCY_INFO={URGENCY_INFO}
        logoUrl={logoUrl}
      />
    </header>
  );
}
