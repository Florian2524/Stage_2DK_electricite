import React, { useEffect, useState } from "react";
import api from "../lib/api";

/**
 * Affiche les services actifs depuis /api/services.
 * - Garde ton layout via props.
 * - Si l’API renvoie 0 item ou échoue, on affiche les children (fallback).
 */
export default function DynamicServicesSection({
  sectionId = "services",
  title = "Nos services",
  subtitle = "Prestations proposées par 2DK Électricité.",
  gridClassName = "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  children
}) {
  const [items, setItems] = useState(null); // null = loading
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await api.get("/api/services"); // endpoint public
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
        setError("Impossible de charger les services.");
      }
    })();
  }, []);

  const isLoading = items === null;
  const hasData = Array.isArray(items) && items.length > 0;

  return (
    <section id={sectionId} className="py-12 sm:py-16 bg-[#0B0B0B] text-zinc-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold text-zinc-100">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}
        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        {/* Skeleton */}
        {isLoading && (
          <div className={gridClassName}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 border border-zinc-700 bg-zinc-900 animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {/* Données */}
        {hasData && (
          <div className={gridClassName}>
            {items.map((s) => (
              <article key={s.id} className="border border-zinc-700 bg-zinc-900 rounded-xl overflow-hidden">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-zinc-800" />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-zinc-100">{s.name}</h3>
                  {s.excerpt && <p className="mt-1 text-sm text-zinc-400 line-clamp-3">{s.excerpt}</p>}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-zinc-300">
                      {Number.isFinite(+s.base_price) && +s.base_price > 0 ? (
                        <>À partir de <span className="font-semibold">{Number(s.base_price).toFixed(2)} €</span></>
                      ) : (
                        <span className="text-zinc-500">Tarif sur devis</span>
                      )}
                    </div>
                    {Number.isFinite(+s.duration_minutes) && +s.duration_minutes > 0 && (
                      <span className="text-xs text-zinc-500">{s.duration_minutes} min</span>
                    )}
                  </div>

                  <div className="mt-4">
                    <a
                      href={`/contact?service=${encodeURIComponent(s.name)}`}
                      className="inline-flex items-center justify-center px-3 h-9 text-sm border border-[#F6C90E] text-[#F6C90E] hover:bg-[#F6C90E] hover:text-black transition-colors"
                    >
                      Demander un devis
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Fallback (tes cartes statiques) si pas de data */}
        {!isLoading && !hasData && children && (
          <div className={gridClassName}>{children}</div>
        )}
      </div>
    </section>
  );
}
