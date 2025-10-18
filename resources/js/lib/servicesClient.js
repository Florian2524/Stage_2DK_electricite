// resources/js/lib/servicesClient.js
// Source de vérité pour les Services (menu + cartes)
import api from "./api";

// Utilitaire slugify (fallback si l'API n'en renvoie pas)
export function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function sortByPositionThenId(arr) {
  return [...arr].sort((a, b) => {
    const pa = Number(a?.position ?? 0);
    const pb = Number(b?.position ?? 0);
    if (pa !== pb) return pa - pb;
    return Number(a?.id ?? 0) - Number(b?.id ?? 0);
  });
}

/** Récupère les services actifs côté public */
export async function fetchActiveServices() {
  const data = await api.get("/api/services");
  if (!Array.isArray(data)) return [];
  return sortByPositionThenId(data);
}

/** Map → items de menu du header
 *  ✅ Toujours /services/:slug si dispo (route dynamique)
 *  🔁 Fallback /contact?service=... uniquement si pas de slug
 */
export function mapToMenuItems(list = []) {
  return list.map((s) => {
    const label = s?.name || "Service";
    const slug = s?.slug ? String(s.slug) : slugify(label);
    const href = slug
      ? `/services/${slug}`
      : `/contact?service=${encodeURIComponent(label)}`;
    return { label, href, slug };
  });
}

/** Map → cartes de la Home (image fallback incluse)
 *  ✅ Toujours /services/:slug si dispo
 *  🔁 Fallback /contact?service=... uniquement si pas de slug
 */
export function mapToCardItems(list = [], localImagesBySlug = {}) {
  return list.map((s) => {
    const name = s?.name || "Service";
    const slug = s?.slug ? String(s.slug) : slugify(name);
    const href = slug
      ? `/services/${slug}`
      : `/contact?service=${encodeURIComponent(name)}`;
    const image = s?.image_url || localImagesBySlug[slug] || null;
    const alt = s?.image_alt || name;
    const excerpt =
      s?.excerpt ||
      (s?.description
        ? String(s.description).slice(0, 120) +
          (String(s.description).length > 120 ? "…" : "")
        : "");

    return { id: s?.id ?? slug, name, slug, href, image, alt, excerpt };
  });
}
