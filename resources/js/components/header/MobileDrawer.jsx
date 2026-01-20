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
        menuOpen ? "flex" : "hidden"
      } justify-end`}
      onClick={() => setMenuOpen(false)}
    >
      <div
        className="
          mt-0
          mr-0
          bg-white text-neutral-900
          p-4
          shadow-xl
          w-80
          h-auto
          max-h-[90vh]
          self-start
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            <IconClose className="h-7 w-7" />
          </button>
        </div>

        {/* Liens */}
        <nav className="mt-4 flex flex-col gap-3">
          <a
            href="/"
            onClick={handleAccueil}
            className={cls(
              locationPath === "/"
                ? section === "home"
                : locationPath === "/"
            )}
          >
            Accueil
          </a>
          <a
            href="#prestations"
            onClick={handleServices}
            className={cls(
              locationPath === "/"
                ? section === "services"
                : locationPath.startsWith("/services")
            )}
          >
            Services
          </a>
          <NavLink
            to="/contact"
            className={({ isActive }) => cls(isActive)}
            onClick={handleContact}
          >
            Contact
          </NavLink>

          {/* Bouton Infos utiles */}
          <button
            onClick={() => {
              setMenuOpen(false);
              setInfoOpen(true);
            }}
            className="
              mt-3 inline-flex items-center gap-2
              rounded-md border border-neutral-300
              px-3 py-2
              hover:bg-neutral-100
              transition-colors
            "
          >
            <IconInfo className="h-5 w-5" /> Infos utiles
          </button>
        </nav>
      </div>
    </div>
  );
}
