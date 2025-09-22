import React from "react";

export default function Zone() {
  return (
    <section id="zone" className="py-16 lg:py-20 bg-zinc-50 scroll-mt-24" aria-label="Zone d’intervention">
      <div className="container-2dk">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Zone d’intervention</h2>
            <p className="mt-2 text-zinc-600">Nous intervenons dans toute la CUB de Bordeaux et ses environs.</p>
            <div className="mt-4 flex items-center gap-2 text-zinc-700">
              <span>📍</span>
              <span>Bordeaux Métropole (CUB) et alentours</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div
              className="w-full h-64 rounded-2xl bg-cover bg-center border border-zinc-200"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop')",
              }}
              aria-label="Illustration de la zone d’intervention"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
