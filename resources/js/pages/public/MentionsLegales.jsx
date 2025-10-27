// resources/js/pages/public/MentionsLegales.jsx
// à renommer en LegalNotice.jsx par la suite pour respecter le nommage en anglais(et modifier les imports)
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TEL_DISPLAY,
  EMAIL_DISPLAY,
  ADDRESS_DISPLAY,
} from "../../components/header/constants";

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ACCENT = "#F6C90E";

  const sections = [
    { id: "confidentialite", label: "Confidentialité" },
    { id: "rgpd", label: "Règlement général sur la protection des données (RGPD)" },
    { id: "cookies", label: "Utilisation de cookies" },
    { id: "demarchage", label: "Opposition au démarchage" },
    { id: "liens", label: "Liens hypertexte" },
    { id: "editeur", label: "Éditeur" },
    { id: "directeur", label: "Directeur de la publication" },
    { id: "hebergeur", label: "Hébergement" },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-zinc-200">
      <section className="relative w-full">
        {/* Bandeau titre */}
        <div className="bg-[#18181B] border-b border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="text-white">Mentions légales</span>{" "}
              <span className="text-[--accent] md:ml-1" style={{ color: ACCENT }}>
                — 2DK Électricité
              </span>
            </h1>
            <p className="mt-3 text-zinc-400 max-w-3xl">
              Retrouvez l’ensemble des informations légales de notre site&nbsp;:
              confidentialité, RGPD, cookies, éditeur, hébergement, etc.
            </p>
          </div>
        </div>

        {/* Contenu en 2 colonnes : sidebar + carte contenu */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            {/* Sidebar gauche */}
            <aside className="md:col-span-4">
              <div className="sticky top-24 space-y-6">
                <div className="card-2dk p-6">
                  <h2 className="text-xl font-bold text-white">
                    Mentions légales –<br /> 2DK Électricité
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400">
                    Toutes les informations légales du site. Pour toute question,
                    contactez-nous.
                  </p>

                  <div className="mt-5">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 px-5 h-12 text-sm font-semibold
                                 bg-[--accent] text-black border border-yellow-500
                                 hover:brightness-95 active:translate-y-[1px] transition-all shadow-sm hover:shadow-md btn-square"
                      style={{ ["--accent"]: ACCENT }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                      >
                        <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.3 7.17 5.05c.38.27.88.27 1.26 0L20.8 6.2a.5.5 0 0 0-.3-.2H4.5a.5.5 0 0 0-.3.2Z" />
                      </svg>
                      Contactez-nous
                    </Link>
                  </div>
                </div>

                {/* Sommaire */}
                <nav className="card-2dk p-6">
                  <p className="text-sm font-semibold text-zinc-300">Sommaire</p>
                  <ul className="mt-3 space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group inline-flex items-start gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                          <span
                            className="mt-1 h-[6px] w-[6px] rounded-full bg-zinc-600 group-hover:bg-[--accent] transition-colors"
                            style={{ ["--accent"]: ACCENT }}
                          />
                          <span className="underline decoration-transparent group-hover:decoration-[--accent] underline-offset-4 transition-[color,decoration-color]">
                            {s.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Colonne droite : contenu */}
            <article className="md:col-span-8">
              <div className="card-2dk-content">
                <div className="p-6 sm:p-8 md:p-10">
                  {/* Section — Confidentialité */}
                  <section id="confidentialite" className="scroll-mt-28">
                    <h2
                      className="text-2xl md:text-3xl font-extrabold text-white"
                      style={{ textShadow: "0 0 0 transparent" }}
                    >
                      Confidentialité
                    </h2>
                    <div className="mt-4 prose-2dk">
                      <p>
                        2DK Électricité n’enregistre pas d’informations personnelles
                        permettant l’identification, à l’exception des formulaires
                        que l’utilisateur est libre de remplir. Ces informations ne
                        sont utilisées que pour répondre à vos demandes (devis,
                        contact) et ne sont jamais cédées à des tiers à des fins
                        commerciales.
                      </p>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — RGPD */}
                  <section id="rgpd" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Règlement général sur la protection des données (RGPD)
                    </h2>
                    <div className="mt-4 prose-2dk">
                      <p>
                        Les informations collectées via nos formulaires (nom, e-mail,
                        téléphone, message, etc.) sont destinées exclusivement à
                        2DK Électricité pour la gestion des demandes (contact, devis,
                        relation commerciale).
                      </p>
                      <ul>
                        <li>
                          <strong>Base légale&nbsp;:</strong> consentement de
                          l’utilisateur et/ou exécution d’un contrat selon le
                          contexte.
                        </li>
                        <li>
                          <strong>Durée de conservation&nbsp;:</strong> 3 ans à
                          compter du dernier contact (sauf obligation légale
                          contraire).
                        </li>
                        <li>
                          <strong>Droits RGPD&nbsp;:</strong> accès, rectification,
                          effacement, limitation, opposition, portabilité.
                        </li>
                      </ul>
                      <p>
                        Pour exercer vos droits, contactez-nous par e-mail à{" "}
                        <span className="font-semibold">{EMAIL_DISPLAY}</span>{" "}
                        ou par courrier à l’adresse du siège social indiquée ci-dessous.
                      </p>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Cookies */}
                  <section id="cookies" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Utilisation de cookies
                    </h2>
                    <div className="mt-4 prose-2dk">
                      <p>
                        Le site peut utiliser des cookies techniques nécessaires
                        au fonctionnement et, le cas échéant, des cookies de
                        mesure d’audience. Lors de votre première visite, un
                        bandeau d’information permet de gérer vos préférences.
                        Vous pouvez également désactiver les cookies depuis les
                        paramètres de votre navigateur.
                      </p>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Démarchage */}
                  <section id="demarchage" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Opposition au démarchage
                    </h2>
                    <div className="mt-4 prose-2dk">
                      <p>
                        Conformément à l’article L.223-2 du Code de la
                        consommation, vous pouvez vous inscrire gratuitement sur
                        la liste d’opposition au démarchage téléphonique.
                      </p>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Liens */}
                  <section id="liens" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Liens hypertexte
                    </h2>
                    <div className="mt-4 prose-2dk">
                      <p>
                        Le site peut contenir des liens vers des sites tiers.
                        2DK Électricité ne contrôle pas leur contenu et décline
                        toute responsabilité quant aux informations qui y sont
                        présentées.
                      </p>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Éditeur */}
                  <section id="editeur" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Éditeur
                    </h2>
                    <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm">
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-zinc-400">Dénomination</dt>
                          <dd className="font-medium text-white">2DK Électricité</dd>
                        </div>
                        {/* Forme juridique laissée telle quelle en attendant confirmation */}
                        <div>
                          <dt className="text-zinc-400">Forme juridique</dt>
                          <dd className="font-medium text-white">SASU</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">Siège social</dt>
                          <dd className="font-medium text-white">
                            {ADDRESS_DISPLAY}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">Téléphone</dt>
                          <dd className="font-medium text-white">{TEL_DISPLAY}</dd>
                        </div>
                      </dl>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-zinc-400">E-mail</dt>
                          <dd className="font-medium text-white">{EMAIL_DISPLAY}</dd>
                        </div>
                        {/* SIRET/TVA/RCS en attente — remplace dès que tu me fournis les numéros */}
                        <div>
                          <dt className="text-zinc-400">SIRET</dt>
                          <dd className="font-medium text-white">—</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">TVA intracommunautaire</dt>
                          <dd className="font-medium text-white">—</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">RCS (optionnel)</dt>
                          <dd className="font-medium text-white">—</dd>
                        </div>
                      </dl>
                    </div>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Directeur de la publication */}
                  <section id="directeur" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Directeur de la publication
                    </h2>
                    <p className="mt-4 text-zinc-300">
                      {/* Remplacer par l’identité exacte quand tu me la donnes */}
                      Responsable légal de 2DK Électricité
                    </p>
                  </section>

                  <hr className="my-8 border-zinc-800" />

                  {/* Section — Hébergeur */}
                  <section id="hebergeur" className="scroll-mt-28">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                      Hébergement
                    </h2>
                    <div className="mt-4 grid sm:grid-cols-2 gap-6 text-sm">
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-zinc-400">Hébergeur</dt>
                          <dd className="font-medium text-white">OVHcloud SAS</dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">Adresse</dt>
                          <dd className="font-medium text-white">
                            2 rue Kellermann, 59100 Roubaix, France
                          </dd>
                        </div>
                      </dl>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-zinc-400">Téléphone</dt>
                          <dd className="font-medium text-white">
                            +33 9 72 10 10 07
                          </dd>
                        </div>
                        <div>
                          <dt className="text-zinc-400">Assurance pro (optionnel)</dt>
                          <dd className="font-medium text-white">
                            RC Pro — Assurex, contrat n° AX-2024-0001
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </section>

                  {/* Bas de page */}
                  <div className="mt-10 pt-6 border-t border-zinc-800 text-sm text-zinc-400">
                    <p>
                      <span className="font-medium text-white">Version&nbsp;:</span>{" "}
                      1.0 — <span className="font-medium text-white">Dernière mise à jour&nbsp;:</span>{" "}
                      30 septembre 2025
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
