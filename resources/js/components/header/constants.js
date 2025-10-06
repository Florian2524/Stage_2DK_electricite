// Données & URLs
export const CTA_URL = "/contact";
export const TEL_DISPLAY = "06 66 89 17 13";
export const TEL_LINK = "tel:+33666891713";
export const EMAIL_DISPLAY = "2dk.electricite@gmail.com";
export const EMAIL_LINK = "mailto:2dk.electricite@gmail.com";
export const ADDRESS_DISPLAY = "46 Rue Elie Lourmet, 33140 Villenave d'Ornon";
export const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(ADDRESS_DISPLAY);
export const SERVICE_AREA = "Bordeaux Métropole";
export const URGENCY_INFO = "Dépannage possible — selon disponibilité";

// resources/js/components/header/constants.js

export const SERVICES_ITEMS = [
  { label: "Installation",    href: "/services/installation",    slug: "installation" },
  { label: "Mise aux normes", href: "/services/mise-aux-normes", slug: "mise-aux-normes" },
  { label: "Rénovation",      href: "/services/renovation",      slug: "renovation" },
  { label: "Dépannage",       href: "/services/depannage",       slug: "depannage" },
];




// Comportements header
export const SHRINK_DOWN = 48;
export const EXPAND_UP = 8;
export const SWITCH_COOLDOWN_MS = 250;
