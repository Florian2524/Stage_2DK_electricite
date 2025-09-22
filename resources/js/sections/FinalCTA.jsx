import React from "react";

export default function FinalCTA() {
  return (
    <section id="devis" className="py-16 lg:py-20 bg-white scroll-mt-24" aria-label="Devis">
      <div className="container-2dk">
        <div className="rounded-2xl border border-zinc-200 p-8 lg:p-10 bg-zinc-50">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">Besoin d’un devis ?</h2>
          <p className="mt-2 text-zinc-600">Recevez une confirmation par e-mail dès l’envoi de votre demande.</p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center rounded-xl px-6 py-3 text-base font-semibold bg-amber-500 text-zinc-900 shadow hover:brightness-95 transition w-full sm:w-auto"
            >
              Demander un devis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
