import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconClose, IconMail, IconMapPin, IconCopy, IconBolt } from "./Icons";

export default function InfoPanel({
  open,
  onClose,
  CTA_URL,
  copy,
  ADDRESS_DISPLAY,
  MAPS_LINK,           // gardé en props même si non utilisé, pour compatibilité
  TEL_DISPLAY,
  TEL_LINK,
  EMAIL_DISPLAY,
  EMAIL_LINK,
  SERVICE_AREA,
  URGENCY_INFO,
  logoUrl,
}) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const onCopyPhone = async () => {
    await copy(TEL_DISPLAY);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 1200);
  };
  const onCopyEmail = async () => {
    await copy(EMAIL_DISPLAY);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1200);
  };

  return (
    <div
      id="infos-utiles-panel"
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[70] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panneau */}
      <aside
        className={`
          absolute right-0 top-0 h-full
          w-[92vw] sm:w-[420px]
          translate-x-full ${open ? "!translate-x-0" : ""}
          transition-transform duration-300 ease-out
          overflow-y-auto
          rounded-none
          shadow-2xl ring-1 ring-black/10
          bg-gradient-to-b from-[#0B0B0B] to-[#18181B] text-white
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Entête */}
        <div className="flex items-start justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="2DK Électricité" className="h-8 w-auto" />
            <h2 className="text-base sm:text-lg font-semibold">Infos utiles</h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 border border-white/20 px-2 py-1 text-sm hover:bg-white/10
                       focus:outline-none focus:ring-2 focus:ring-white/30 rounded-none"
            aria-label="Fermer"
            title="Fermer"
          >
            <IconClose className="h-5 w-5" /> <span className="hidden sm:inline">Fermer</span>
          </button>
        </div>

        <hr className="border-white/10" />

        {/* Intro + CTA */}
        <div className="px-5 py-4 text-sm">
          <p className="font-semibold">Des solutions fiables pour votre sécurité et votre sérénité</p>
          <p className="opacity-80 mt-1">Électricité générale — particuliers & professionnels (Bordeaux et alentours).</p>
          <div className="mt-4">
            <Link
              to={CTA_URL}
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#F6C90E] px-4 py-2 font-semibold text-neutral-900
                         hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[#F6C90E]/30 rounded-none"
            >
              <IconMail className="h-5 w-5" /> Contactez-nous
            </Link>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Coordonnées */}
        <div className="px-5 py-4 space-y-4 text-[15px]">
          {/* Adresse (Itinéraire supprimé) */}
          <div className="flex items-start gap-3">
            <IconMapPin className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <div className="font-medium">{ADDRESS_DISPLAY}</div>
            </div>
          </div>

          {/* Téléphone + Copier */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <IconMail className="h-5 w-5 rotate-[-90deg]" />
              <a href={TEL_LINK} className="font-medium hover:underline">{TEL_DISPLAY}</a>
            </div>
            <button
              onClick={onCopyPhone}
              className={`inline-flex items-center gap-1 border px-2.5 py-1.5 text-sm transition rounded-none
                         ${copiedPhone
                           ? "bg-[#F6C90E] text-neutral-900 border-transparent"
                           : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                         }`}
              title={copiedPhone ? "Copié !" : "Copier le numéro"}
            >
              {copiedPhone ? "✓ Copié" : (<><IconCopy className="h-4 w-4" /> Copier</>)}
            </button>
          </div>

          {/* Email + Copier */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <IconMail className="h-5 w-5" />
              <a href={EMAIL_LINK} className="hover:underline">{EMAIL_DISPLAY}</a>
            </div>
            <button
              onClick={onCopyEmail}
              className={`inline-flex items-center gap-1 border px-2.5 py-1.5 text-sm transition rounded-none
                         ${copiedEmail
                           ? "bg-[#F6C90E] text-neutral-900 border-transparent"
                           : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                         }`}
              title={copiedEmail ? "Copié !" : "Copier l’e-mail"}
            >
              {copiedEmail ? "✓ Copié" : (<><IconCopy className="h-4 w-4" /> Copier</>)}
            </button>
          </div>

          {/* Zone d'intervention */}
          <div className="flex items-center gap-3">
            <IconBolt className="h-5 w-5" />
            <span>Zone d’intervention : {SERVICE_AREA}</span>
          </div>

          {/* Encart Info (angles carrés) */}
          <div className="border border-yellow-300/30 bg-yellow-200/10 px-3 py-2 text-sm text-yellow-100 rounded-none">
            <strong className="text-yellow-200">Info :</strong> {URGENCY_INFO}
          </div>
        </div>

        <div className="px-5 pb-6" />
      </aside>
    </div>
  );
}
