import React from "react";
import Panel from "./ui/Panel";

// Colonne gauche standardisée pour la page Contact
export default function ContactAside({
  title = "Devis / Contact",
  subtitle = "Pour un devis, une question sur nos prestations ou toute autre demande, utilisez le formulaire ci-contre. Réponse rapide.",
  telDisplay = "05 00 00 00 00",
  telHref = "tel:0500000000",
  emailDisplay = "contact@2dk.fr",
  emailHref = "mailto:contact@2dk.fr",
  zone = "Métropole de Bordeaux (CUB)",
}) {
  return (
    <aside>
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3">
        <span className="inline-block h-6 w-1 bg-[#F6C90E]" />
        {title}
      </h1>
      <p className="mt-3 text-zinc-300">{subtitle}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <span className="inline-flex items-center gap-2 border border-[#F6C90E]/30 bg-zinc-900/40 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F6C90E]" />
          Devis gratuit
        </span>
        <span className="inline-flex items-center gap-2 border border-[#F6C90E]/30 bg-zinc-900/40 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F6C90E]" />
          Intervention rapide
        </span>
      </div>

      <Panel className="mt-6 p-5">
        <div className="font-semibold">2DK Électricité</div>
        <ul className="mt-3 space-y-2 text-sm text-zinc-300">
          <li>
            Tél.{" "}
            <a
              className="underline underline-offset-2 hover:text-[#F6C90E] transition"
              href={telHref}
            >
              {telDisplay}
            </a>
          </li>
          <li>
            Email{" "}
            <a
              className="underline underline-offset-2 hover:text-[#F6C90E] transition"
              href={emailHref}
            >
              {emailDisplay}
            </a>
          </li>
          <li>{zone}</li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={emailHref}
            className="inline-flex items-center justify-center px-4 py-2 font-semibold bg-[#F6C90E] text-black hover:bg-[#e9bd07] transition btn-halo"
            style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
          >
            Écrire un e-mail
          </a>
          <a
            href={telHref}
            className="inline-flex items-center justify-center border border-[#F6C90E]/50 px-4 py-2 text-zinc-200 hover:bg-zinc-800 transition btn-halo"
            style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
          >
            Appeler
          </a>
        </div>
      </Panel>
    </aside>
  );
}
