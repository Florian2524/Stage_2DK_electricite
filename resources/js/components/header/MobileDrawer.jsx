import React from "react";
import { NavLink } from "react-router-dom";
import { IconClose, IconInfo } from "./Icons";

export default function MobileDrawer({
  menuOpen,
  setMenuOpen,
  cls,
  locationPath,
  section,
  handleAccueil,
  handleServices,
  handleContact,
  setInfoOpen,
}) {
  return (
    <div
      id="mobile-drawer"
      className={`md:hidden fixed inset-0 z-[60] bg-black/40 ${
        menuOpen ? "block" : "hidden"
      }`}
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
          <a
            href="/"
            onClick={handleAccueil}
            className={cls(locationPath === "/" ? section === "home" : locationPath === "/")}
          >
            Accueil
          </a>
          <a
            href="#prestations"
            onClick={handleServices}
            className={cls(locationPath === "/" ? section === "services" : locationPath.startsWith("/services"))}
          >
            Services
          </a>
          <NavLink to="/contact" className={({ isActive }) => cls(isActive)} onClick={handleContact}>
            Contact
          </NavLink>
          <button
            onClick={() => {
              setMenuOpen(false);
              setInfoOpen(true);
            }}
            className="mt-2 inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2"
          >
            <IconInfo className="h-5 w-5" /> Infos utiles
          </button>
        </nav>
      </div>
    </div>
  );
}