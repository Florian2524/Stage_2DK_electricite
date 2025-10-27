import React, { useEffect, useState } from "react";
import ContactAside from "../../components/ContactAside";
import Panel from "../../components/ui/Panel";
import Field from "../../components/form/Field";
import { validateContact } from "../../utils/validateContact";
import { SERVICES_ITEMS } from "../../components/header/constants";
import api from "../../lib/api";

// Génère les options "travaux" depuis le menu Services
const SERVICE_OPTIONS = (SERVICES_ITEMS || [])
  .filter((s) => !!s?.label && !!s?.href)
  .map((s) => ({
    value: s.slug ?? s.href.split("/").filter(Boolean).pop(),
    label: s.label,
  }));

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [form, setForm] = useState({
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

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const isDevis = form.subject === "devis";

  const toggleWork = (value) => {
    setForm((prev) => {
      const exists = prev.works.includes(value);
      const next = exists ? prev.works.filter((v) => v !== value) : [...prev.works, value];
      return { ...prev, works: next };
    });
    setErrors((p) => ({ ...p, works: undefined }));
    setStatus(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "subject" && value !== "devis") {
      setForm((p) => ({ ...p, subject: value, ownership: "", site_address: "", works: [] }));
      setErrors((p) => ({ ...p, ownership: undefined, site_address: undefined, works: undefined }));
      setStatus(null);
      return;
    }

    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validateContact(form);
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
    setStatus(null);

    // Concat lisible pour le champ message (email + base)
    const lines = [];
    const subjectLabel =
      form.subject === "devis"
        ? "Demande de devis / tarifs"
        : form.subject === "prestations"
        ? "Questions sur nos prestations"
        : "Autre";

    if (form.message.trim()) lines.push(form.message.trim());

    const contactInfos = [];
    if (form.fullname.trim()) contactInfos.push(`Nom: ${form.fullname.trim()}`);
    if (form.phone.trim()) contactInfos.push(`Téléphone: ${form.phone.trim()}`);
    if (contactInfos.length) lines.push("", contactInfos.join(" | "));

    if (form.rgpd) lines.push("RGPD: consentement donné pour le traitement de la demande.");

    if (isDevis) {
      const devisLines = [];
      if (form.ownership)
        devisLines.push(
          `Statut d’occupation: ${form.ownership === "proprietaire" ? "Propriétaire" : "Locataire"}`
        );
      if (form.site_address.trim()) devisLines.push(`Adresse du bien: ${form.site_address.trim()}`);
      if (form.works.length) {
        const labelByValue = Object.fromEntries(SERVICE_OPTIONS.map((o) => [o.value, o.label]));
        const worksLabels = form.works.map((w) => labelByValue[w] || w);
        devisLines.push(`Travaux demandés: ${worksLabels.join(", ")}`);
      }
      if (devisLines.length) lines.push("", "— Informations pour devis —", ...devisLines);
    }

    // ✅ Payload V2 : structuré + message lisible
    const payload = {
      name: form.fullname.trim() || "Visiteur",
      email: form.email.trim(),
      subject: subjectLabel,
      message: lines.join("\n"),

      // Champs structurés
      phone: form.phone.trim() || null,
      ownership: isDevis ? form.ownership || null : null,
      site_address: isDevis ? form.site_address.trim() || null : null,
      works: isDevis ? form.works : [],
      rgpd: !!form.rgpd,
    };

    try {
      await api.ensureCsrf();
      await api.post("/api/contact", payload);

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
    } catch (err) {
      console.error("[CONTACT] error:", err);
      setSubmitting(false);
      const msg =
        err?.data?.message ||
        (typeof err?.data === "string" ? err.data : null) ||
        "Échec de l’envoi. Réessayez dans un instant.";
      setStatus("error");
      if (err?.data?.errors && typeof err.data.errors === "object") {
        const out = {};
        if (err.data.errors.name) out.fullname = err.data.errors.name[0];
        if (err.data.errors.email) out.email = err.data.errors.email[0];
        if (err.data.errors.subject) out.subject = err.data.errors.subject[0];
        if (err.data.errors.message) out.message = err.data.errors.message[0];
        // champs structurés
        if (err.data.errors.phone) out.phone = err.data.errors.phone[0];
        if (err.data.errors.ownership) out.ownership = err.data.errors.ownership[0];
        if (err.data.errors.site_address) out.site_address = err.data.errors.site_address[0];
        setErrors(out);
      } else {
        setErrors((p) => ({ ...p, _global: msg }));
      }
    }
  };

  return (
    <main className="bg-gradient-to-r from-[#0B0B0B] via-[#161B24] to-[#3E495C] text-zinc-100">
      <section aria-labelledby="contact-title">
        <div className="mx-auto max-w-6xl px-6 md:px-10 xl:px-16 pt-8 md:pt-12 pb-14 md:pb-20">
          <div className="grid gap-8 md:gap-10 md:grid-cols-3">
            <ContactAside />
            <hr className="md:hidden my-4 border-t border-[#F6C90E]/20" />
            <div className="md:col-span-2">
              <Panel
                as="form"
                id="contact-form"
                onSubmit={handleSubmit}
                noValidate
                className="p-6 md:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
              >
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

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isDevis ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isDevis}
                >
                  <div className="mt-4 space-y-6">
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
                    <Field
                      id="site_address"
                      name="site_address"
                      label="Adresse du bien concerné"
                      value={form.site_address}
                      onChange={handleChange}
                      error={errors.site_address}
                    />
                    <div>
                      <div className="text-sm font-medium text-zinc-200">Quels travaux ?</div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((opt) => (
                          <label
                            key={opt.value}
                            className="inline-flex items-center gap-2 bg-[#0F1115] px-3 py-2 border border-zinc-700/70"
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

                <Field
                  as="checkbox"
                  id="rgpd"
                  name="rgpd"
                  checked={form.rgpd}
                  onChange={handleChange}
                  error={errors.rgpd}
                  label="En soumettant ce formulaire, j'accepte que mes informations soient utilisées pour traiter ma demande."
                />

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`btn-square px-4 h-10 font-semibold border border-[#F6C90E] text-[#F6C90E] hover:bg-black hover:text-[#F6C90E]/90 ${
                      submitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitting ? "Envoi..." : "Envoyer"}
                  </button>
                  {status === "success" && (
                    <span className="text-sm text-emerald-400">
                      Votre message a été envoyé.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-sm text-red-400">
                      Corrigez les champs en rouge.
                    </span>
                  )}
                </div>

                {errors._global && (
                  <p className="mt-3 text-sm text-red-400">{errors._global}</p>
                )}
              </Panel>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
