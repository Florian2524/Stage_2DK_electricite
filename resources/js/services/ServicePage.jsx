import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/* Gabarit commun pour toutes les pages Services */
export default function ServicePage({
  title,
  subtitle,
  img,
  imgAlt = "",
  h2,
  body,
  bullets = [],
  ctaLabel = "Contactez-nous",
  ctaTo = "/contact",
  note,
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="bg-[#0B0B0B] text-gray-300">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Titres en jaune */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F6C90E]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-gray-400">{subtitle}</p>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <img
              src={img}
              alt={imgAlt}
              className="w-full h-64 md:h-[360px] object-cover border border-zinc-700"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1581093448799-55d58d1da28d?q=80&w=1200&auto=format&fit=crop";
              }}
            />
          </div>

          <div>
            {h2 && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F6C90E]">
                {h2}
              </h2>
            )}

            {body}

            {bullets.length > 0 && (
              <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-[#F6C90E]">
                {bullets.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            )}

            <div className="mt-6">
              <Link to={ctaTo} className="btn-red btn-halo">
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>

        {note && (
          <div className="mt-10 border-l-4 border-[#F6C90E] pl-4">{note}</div>
        )}
      </section>
    </main>
  );
}
