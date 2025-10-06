// Règles de validation du formulaire de contact
export function validateContact(form) {
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
}
