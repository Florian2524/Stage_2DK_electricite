import React, { useEffect, useState } from "react";
import ContactAside from "./ContactAside";
import Panel from "./ui/Panel";
import Field from "./form/Field";
import { validateContact } from "../utils/validateContact";
import { SERVICES_ITEMS } from "./header/constants"; // ⬅️ source unique

// Génère les options "travaux" depuis le menu Services
const SERVICE_OPTIONS = (SERVICES_ITEMS || [])
  .filter((s) => !!s?.label && !!s?.href)
  .map((s) => ({
    value: (s.slug ?? s.href.split("/").filter(Boolean).pop()), // ex: "installation"
    label: s.label,                                             // "Installation"
  }));

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // État formulaire (on garde ton rendu/UX)
  const [form, setForm] = useState({
    subject: "devis",   // "devis" | "prestations" | "autre"
    message: "",
    fullname: "",
    phone: "",
    email: "",
    rgpd: false,

    // Champs spécifiques "devis"
    ownership: "",       // "proprietaire" | "locataire"
    site_address: "",
    works: [],
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isDevis = form.subject === "devis";

  // Toggle multi-choix "works"
  const toggleWork = (value) => {
    setForm((prev) => {
      const exists = prev.works.includes(value);
      const next = exists ? prev.works.filter((v) => v !== value) : [...prev.works, value];
      return { ...prev, works: next };
    });
    setErrors((p) => ({ ...p, works: undefined }));
    setStatus(null);
  };

  // Changement de champ
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si on sort du mode "devis", nettoyer les champs liés
    if (name === "subject" && value !== "devis") {
      setForm((p) => ({
        ...p,
        subject: value,
        ownership: "",
        site_address: "",
        works: [],
      }));
      setErrors((p) => ({
        ...p,
        ownership: undefined,
        site_address: undefined,
        works: undefined,
      }));
      setStatus(null);
      return;
    }

    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setStatus(null);
  };

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1) Validation globale existante
    const v = validateContact(form);

    // 2) Règles devis conditionnelles
    if (isDevis) {
      if (!form.ownership) v.ownership = "Choisissez propriétaire ou locataire.";
      if (!form.site_address.trim()) v.site_address = "Adresse du bien obligatoire.";
      if (!form.works.length) v.works = "Sélectionnez au moins un type de travaux.";
    }

    if (Object.keys(v).length) {
      setErrors(v);
      setStatus("error");
      return;
    }

    setSubmitting(true);

    // Payload prêt pour l’API
    const payload = {
      subject: form.subject,
      message: form.message.trim(),
      fullname: form.fullname.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      rgpd: !!form.rgpd,
      ...(isDevis && {
        ownership: form.ownership,
        site_address: form.site_address.trim(),
        works: form.works,
      }),
    };
    console.log("[CONTACT] payload:", payload);

    // Simu d’envoi
    setTimeout(() => {
      setSubmitting(false);
      setStatus("success");
      setForm({
        subject: "devis",
        message: "",
        fullname: "",
        phone: "",
        email: "",
        rgpd: false,
        ownership: "",
        site_address: "",
        works: [],
      });
      setErrors({});
    }, 700);
  };

  return (
    <main className="bg-gradient-to-r from-[#0B0B0B] via-[#161B24] to-[#3E495C] text-zinc-100">
      <section aria-labelledby="contact-title">
        <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16 pt-8 md:pt-12 pb-14 md:pb-20">
          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            {/* Colonne gauche */}
            <ContactAside />

            <hr className="md:hidden my-4 border-t border-[#F6C90E]/20" />

            {/* Colonne droite : formulaire */}
            <div className="md:col-span-2">
              <Panel
                as="form"
                id="contact-form" // ⬅️ pour cibler le style des champs
                onSubmit={handleSubmit}
                noValidate
                className="p-6 md:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
              >
                {/* Demande */}
                <Field
                  as="select"
                  id="subject"
                  name="subject"
                  label="Demande"
                  hint="Choisissez une option"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  options={[
                    { value: "devis", label: "Demande de devis / tarifs" },
                    { value: "prestations", label: "Questions sur nos prestations" },
                    { value: "autre", label: "Autre" },
                  ]}
                />

                {/* Bloc devis conditionnel (même rendu, animation collapse) */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isDevis ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isDevis}
                >
                  <div className="mt-4 space-y-6">
                    {/* Statut d’occupation (menu) */}
                    <Field
                      as="select"
                      id="ownership"
                      name="ownership"
                      label="Statut d’occupation"
                      value={form.ownership}
                      onChange={handleChange}
                      error={errors.ownership}
                      options={[
                        { value: "", label: "Choisissez une option" },
                        { value: "proprietaire", label: "Propriétaire" },
                        { value: "locataire", label: "Locataire" },
                      ]}
                    />

                    {/* Adresse du bien concerné */}
                    <Field
                      id="site_address"
                      name="site_address"
                      label="Adresse du bien concerné"
                      value={form.site_address}
                      onChange={handleChange}
                      error={errors.site_address}
                    />

                    {/* Quels travaux ? (cases, rendu identique, coins droits) */}
                    <div>
                      <div className="text-sm font-medium text-zinc-200">Quels travaux ?</div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className="inline-flex items-center gap-2 bg-[#0F1115] rounded-none px-3 py-2 border border-zinc-700/70"
                          >
                            <input
                              type="checkbox"
                              checked={form.works.includes(opt.value)}
                              onChange={() => toggleWork(opt.value)}
                              className="accent-[#F6C90E]"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.works && (
                        <p className="mt-1 text-sm text-red-400">{errors.works}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Précisions */}
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  label="Précisions"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                />

                {/* Identité */}
                <Field
                  id="fullname"
                  name="fullname"
                  label="Nom"
                  value={form.fullname}
                  onChange={handleChange}
                  error={errors.fullname}
                />

                <Field
                  id="phone"
                  name="phone"
                  label="Téléphone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />

                <Field
                  id="email"
                  name="email"
                  type="email"
                  label="E-mail"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                {/* RGPD */}
                <Field
                  as="checkbox"
                  id="rgpd"
                  name="rgpd"
                  checked={form.rgpd}
                  onChange={handleChange}
                  error={errors.rgpd}
                  label="En soumettant ce formulaire, j'accepte que mes informations soient utilisées pour traiter ma demande."
                />

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 font-semibold bg-[#F6C90E] text-black hover:bg-[#e9bd07] transition btn-halo ${
                      submitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    style={{ ["--btn-shadow-rgb"]: "246,201,14" }}
                  >
                    {submitting ? "Envoi..." : "Envoyer"}
                  </button>

                  {status === "success" && (
                    <span className="text-sm text-emerald-400">Votre message a été envoyé.</span>
                  )}
                  {status === "error" && (
                    <span className="text-sm text-red-400">Corrigez les champs en rouge.</span>
                  )}
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
