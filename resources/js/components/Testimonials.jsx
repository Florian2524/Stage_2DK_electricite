// Témoignages (statique)
const avis = [
  { name: 'M. Bernard', text: 'Intervention rapide, travail soigné. Très pro.' },
  { name: 'Mme. Dupont', text: 'Remplacement du tableau nickel, explications claires.' },
  { name: 'SAS Atelier', text: 'Pose borne IRVE dans nos locaux, parfait.' },
]

export default function Testimonials() {
  return (
    <section id="avis" className="section">
      <div className="container-2dk">
        <h2 className="text-3xl font-bold">Avis clients</h2>
        <p className="text-slate-600 mt-2">La satisfaction au cœur du service.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {avis.map((a) => (
            <figure key={a.name} className="card">
              <blockquote className="text-slate-700">“{a.text}”</blockquote>
              <figcaption className="mt-4 font-semibold">{a.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
