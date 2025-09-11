import React from "react";
import { motion } from "framer-motion";
import { Bolt, Phone, Calendar, ShieldCheck, Clock, Wrench, Mail, MapPin, Star, ChevronRight } from "lucide-react";

// Icône borne IRVE
function ChargingIcon(){
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 7h10v10H7z" opacity="0.2"/>
      <path d="M11 21H7a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v6"/>
      <path d="M13 11l-2 4h3l-2 4"/>
      <path d="M19 16v6"/>
      <path d="M16 19h6"/>
    </svg>
  );
}

export default function TwoDKLanding() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top bar */}
      <div className="w-full bg-slate-900 text-slate-100 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Île-de-France</span>
            <span className="hidden sm:inline-flex items-center gap-2"><Clock className="h-4 w-4"/> Intervention 7j/7</span>
          </div>
          <a href="tel:+33123456789" className="inline-flex items-center gap-2 hover:opacity-90">
            <Phone className="h-4 w-4"/><span className="font-medium">01 23 45 67 89</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-sky-600 grid place-items-center text-white shadow-md">
              <Bolt className="h-5 w-5"/>
            </div>
            <span className="font-bold tracking-tight text-slate-900">2DK Électricité</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-slate-600">
            <a href="#services" className="hover:text-slate-900">Services</a>
            <a href="#qualites" className="hover:text-slate-900">Nos atouts</a>
            <a href="#avis" className="hover:text-slate-900">Avis</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#rdv" className="hidden sm:inline-flex items-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-xl">
              <Calendar className="h-4 w-4 mr-2"/>Prendre RDV
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-700 to-slate-900"/>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
              <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
                Électricien de confiance pour vos installations et dépannages
              </h1>
              <p className="mt-4 text-slate-100 text-lg">
                2DK Électricité intervient rapidement pour vos urgences, rénovations et mises aux normes. Devis clair, travail soigné, garantie décennale.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#rdv" className="inline-flex items-center px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold shadow-lg">
                  <Calendar className="h-5 w-5 mr-2"/>Demander un rendez-vous
                </a>
                <a href="#services" className="inline-flex items-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  Voir nos services
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-slate-100/90">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Garantie décennale</span>
                <span className="inline-flex items-center gap-2"><Wrench className="h-5 w-5"/> Matériel pro</span>
              </div>
            </motion.div>

            {/* Formulaire héro */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.75, delay:0.2}}>
              <div className="border-0 shadow-2xl bg-white/95 backdrop-blur rounded-2xl">
                <div className="px-6 pt-6">
                  <h3 className="text-slate-900 text-xl font-semibold">Devis & rappel sous 24h</h3>
                </div>
                <div className="p-6">
                  <form className="grid gap-4" id="rdv" onSubmit={(e)=>e.preventDefault()}>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input className="h-10 px-3 rounded-lg border" placeholder="Nom" aria-label="Nom"/>
                      <input className="h-10 px-3 rounded-lg border" placeholder="Prénom" aria-label="Prénom"/>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input className="h-10 px-3 rounded-lg border" placeholder="Téléphone" type="tel" aria-label="Téléphone"/>
                      <input className="h-10 px-3 rounded-lg border" placeholder="Email" type="email" aria-label="Email"/>
                    </div>
                    <input className="h-10 px-3 rounded-lg border" placeholder="Adresse complète" aria-label="Adresse"/>
                    <textarea className="px-3 py-2 rounded-lg border" rows={4} placeholder="Décrivez votre besoin (panne, rénovation, tableau, borne IRVE, etc.)"/>
                    <button type="submit" className="h-11 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium">
                      Envoyer la demande
                    </button>
                    <p className="text-xs text-slate-500">
                      En envoyant ce formulaire, vous acceptez d'être recontacté par 2DK Électricité.
                    </p>
                </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services d'électricité</h2>
          <a href="#contact" className="text-sky-700 hover:underline inline-flex items-center">Demander un devis <ChevronRight className="h-4 w-4"/></a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Wrench className="h-6 w-6"/>, title: "Dépannage rapide", desc: "Diagnostic et remise en service en urgence 7j/7" },
            { icon: <Bolt className="h-6 w-6"/>, title: "Mise aux normes NFC 15-100", desc: "Sécurisation, différentiel, prises, éclairage" },
            { icon: <ChargingIcon/>, title: "Borne IRVE", desc: "Conseil, fourniture et installation certifiée" },
            { icon: <ShieldCheck className="h-6 w-6"/>, title: "Tableau électrique", desc: "Rénovation, ajout de circuits, protection" },
            { icon: <Clock className="h-6 w-6"/>, title: "Rénovation & neuf", desc: "Appartements, maisons, locaux pro" },
            { icon: <Star className="h-6 w-6"/>, title: "Éclairage & domotique", desc: "LED, variateurs, scénarios, pilotage" },
          ].map((s, i) => (
            <motion.div key={i} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.4, delay:i*0.05}}>
              <div className="h-full rounded-2xl border bg-white">
                <div className="p-5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-100 grid place-items-center text-sky-700">{s.icon}</div>
                  <div className="text-lg font-semibold">{s.title}</div>
                </div>
                <div className="px-5 pb-5 text-slate-600">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Qualités */}
      <section id="qualites" className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Transparence", desc: "Devis détaillé et prix justes. Aucun frais caché." },
            { title: "Sécurité avant tout", desc: "Conformité aux normes en vigueur et tests systématiques." },
            { title: "Satisfaction garantie", desc: "Travail soigné, respect des délais, chantier propre." },
          ].map((q, i) => (
            <div key={i} className="rounded-2xl border bg-white">
              <div className="p-5 text-lg font-semibold">{q.title}</div>
              <div className="px-5 pb-5 text-slate-600">{q.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Avis */}
      <section id="avis" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Ils nous recommandent</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-2xl border bg-white">
              <div className="p-6">
                <div className="flex items-center gap-2 text-amber-500" aria-label="Note 5 sur 5">
                  {Array.from({length:5}).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current"/>) }
                </div>
                <p className="mt-3 text-slate-700">Intervention rapide et impeccable, explications claires, tarif raisonnable. Je recommande sans hésiter !</p>
                <p className="mt-4 text-sm text-slate-500">— Client satisfait</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact & urgences</h2>
            <p className="mt-3 text-slate-600">Besoin d'un électricien ? Laissez-nous un message ou appelez directement.</p>
            <div className="mt-6">
              <a href="tel:+33123456789" className="inline-flex items-center gap-2 text-sky-700 hover:underline">
                <Phone className="h-5 w-5"/> 01 23 45 67 89
              </a>
              <div className="mt-2 flex items-center gap-2 text-slate-700"><Mail className="h-5 w-5"/> contact@2dk-electricite.fr</div>
              <div className="mt-2 flex items-center gap-2 text-slate-700"><MapPin className="h-5 w-5"/> Paris et Île-de-France</div>
            </div>
          </div>
          <div className="rounded-2xl border bg-white">
            <div className="p-5 text-lg font-semibold">Écrivez-nous</div>
            <div className="px-5 pb-5">
              <form className="grid gap-3" onSubmit={(e)=>e.preventDefault()}>
                <input className="h-10 px-3 rounded-lg border" placeholder="Nom complet"/>
                <input className="h-10 px-3 rounded-lg border" placeholder="Email" type="email"/>
                <textarea className="px-3 py-2 rounded-lg border" rows={5} placeholder="Votre message"/>
                <button className="h-11 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-xl bg-sky-600 grid place-items-center"><Bolt className="h-4 w-4 text-white"/></div>
              <span className="font-semibold">2DK Électricité</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">SIRET 123 456 789 00010 · Assurance décennale</p>
          </div>
          <div>
            <h4 className="font-semibold text-white">Liens</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#avis" className="hover:underline">Avis</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#rdv" className="hover:underline">Prendre RDV</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">Zones d'intervention</h4>
            <p className="mt-3 text-sm text-slate-400">Paris, Petite & Grande Couronne</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-400 flex items-center justify-between">
            <span>© {new Date().getFullYear()} 2DK Électricité. Tous droits réservés.</span>
            <a href="#" className="hover:underline">Mentions légales</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
