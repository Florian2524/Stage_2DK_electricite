import React, { useEffect, useState } from "react";
import FinalCTA from "../sections/FinalCTA";

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
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.subject) e.subject = "Choisissez une option.";
    if (!form.message || form.message.trim().length < 5)
      e.message = "Précisez votre demande (5 caractères min.).";
    if (!form.fullname || form.fullname.trim().length < 2)
      e.fullname = "Saisissez votre nom complet (2 caractères min.).";
    const phoneRe = /^[0-9+\-\s().]{6,20}$/;
    if (!form.phone || !phoneRe.test(form.phone))
      e.phone = "Numéro de téléphone invalide.";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRe.test(form.email))
      e.email = "Adresse email invalide.";
    if (!form.rgpd) e.rgpd = "Vous devez accepter le traitement de vos données.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      setStatus("error");
      return;
    }
    setSubmitting(true);
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
            <aside className="md:col-span-1">
              <h1
                id="contact-title"
                className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center gap-3"
              >
                <span className="inline-block h-6 w-1 bg-[#F6C90E]" />
                Devis / Contact
              </h1>
              <p className="mt-3 text-zinc-300">
                Pour un devis, une question sur nos prestations ou toute autre
                demande, utilisez le formulaire ci-contre. Réponse rapide.
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 border border-[#F6C90E]/30 bg-zinc-900/40 px-3 py-1">
  <span className="h-1.5 w-1.5 rounded-full bg-[#F6C90E]" />
  Devis gratuit
</span>
<span className="inline-flex items-center gap-2 border border-[#F6C90E]/30 bg-zinc-900/40 px-3 py-1">
  <span className="h-1.5 w-1.5 rounded-full bg-[#F6C90E]" />
  Intervention rapide
</span>

                {/* <span className="inline-flex items-center gap-2 rounded-full border border-[#F6C90E]/30 bg-zinc-900/40 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F6C90E]" />
                  Intervention rapide
                </span> */}
              </div>

              <div className="mt-6 border border-zinc-800 hover:border-[#F6C90E]/40 transition bg-zinc-900/40 p-5">
                <div className="font-semibold">2DK Électricité</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  <li>
                    Tél.{" "}
                    <a
                      className="underline underline-offset-2 hover:text-[#F6C90E] transition"
                      href="tel:0500000000"
                    >
                      05 00 00 00 00
                    </a>
                  </li>
                  <li>
                    Email{" "}
                    <a
                      className="underline underline-offset-2 hover:text-[#F6C90E] transition"
                      href="mailto:contact@2dk.fr"
                    >
                      contact@2dk.fr
                    </a>
                  </li>
                  <li>Métropole de Bordeaux (CUB)</li>
                </ul>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="mailto:contact@2dk.fr"
                    className="inline-flex items-center justify-center px-4 py-2 font-semibold bg-[#F6C90E] text-black hover:bg-[#e9bd07] transition"
                  >
                    Écrire un e-mail
                  </a>
                  <a
                    href="tel:0500000000"
                    className="inline-flex items-center justify-center border border-[#F6C90E]/50 px-4 py-2 text-zinc-200 hover:bg-zinc-800 transition"
                  >
                    Appeler
                  </a>
                </div>
              </div>
            </aside>

            <hr className="md:hidden my-4 border-t border-[#F6C90E]/20" />

            {/* Colonne droite : formulaire */}
            <div className="md:col-span-2">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="border border-zinc-800 hover:border-[#F6C90E]/40 transition bg-zinc-900/50 p-6 md:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
              >
                {/* Type de demande */}
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Demande{" "}
                    <span className="text-zinc-400 italic">
                      Choisissez une option
                    </span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-[#F6C90E]"
                  >
                    <option value="devis">Demande de devis / tarifs</option>
                    <option value="prestations">
                      Questions sur nos prestations
                    </option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Précisions
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-[#F6C90E]"
                  />
                </div>

                {/* Nom */}
                <div className="mb-5">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Nom
                  </label>
                  <input
                    id="fullname"
                    name="fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    className="mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-[#F6C90E]"
                  />
                </div>

                {/* Téléphone */}
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-[#F6C90E]"
                  />
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-200"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 focus:ring-2 focus:ring-[#F6C90E]"
                  />
                </div>

                {/* RGPD */}
                <div className="mb-6 flex items-start gap-3">
                  <input
                    id="rgpd"
                    name="rgpd"
                    type="checkbox"
                    checked={form.rgpd}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 accent-[#F6C90E]"
                  />
                  <label htmlFor="rgpd" className="text-sm text-zinc-300">
                    En soumettant ce formulaire, j'accepte que mes informations
                    soient utilisées pour traiter ma demande.
                  </label>
                </div>

                {/* Bouton */}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 font-semibold bg-[#F6C90E] text-black hover:bg-[#e9bd07] transition"
                  >
                    {submitting ? "Envoi..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}
