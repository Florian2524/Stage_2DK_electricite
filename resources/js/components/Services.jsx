import SafeImage from './SafeImage'

const items = [
  { t: 'Dépannage & Urgences', d: 'Pannes, disjoncteur, court-circuit, prise qui chauffe. Diagnostic et réparation.', img: '/images/services/depannage.jpg' },
  { t: 'Tableaux & Mise aux normes', d: 'Remplacement, différentiels, protection des circuits. Conformité NF C 15-100.', img: '/images/services/tableau.jpg' },
  { t: 'Éclairage & Prises', d: 'Création de points lumineux, LED, détecteurs, prises intérieures/extérieur.', img: '/images/services/eclairage.jpg' },
  { t: 'IRVE / Borne de recharge', d: 'Conseil, pose et mise en service de bornes domestiques ou pros.', img: '/images/services/irve.jpg' },
  { t: 'Rénovation complète', d: 'Refonte de l’installation, repérages et schémas.', img: '/images/services/renovation.jpg' },
  { t: 'Domotique', d: 'Programmation, thermostats connectés, pilotage à distance.', img: '/images/services/domotique.jpg' },
]

export default function Services() {
  return (
    <section id="services">
      <h2 className="text-3xl font-bold text-white">Tous travaux d’électricité générale</h2>
      <p className="text-slate-300 mt-2">Interventions rapides et soignées, pour particuliers et pros.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((s) => (
          <article key={s.t} className="rounded-2xl overflow-hidden bg-brand-light/40 border border-white/10"> {/* <- tirets */}
            <SafeImage src={s.img} alt={s.t} wrapperClass="aspect-[4/3]" />
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-slate-300">{s.d}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
