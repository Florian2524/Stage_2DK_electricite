import { useEffect, useState } from 'react'

const AVIS = [
  { n: 'M. Bernard', t: 'Intervention rapide, travail soigné. Très pro.' },
  { n: 'Mme Dupont', t: 'Remplacement du tableau nickel, explications claires.' },
  { n: 'SAS Atelier', t: 'Pose borne IRVE dans nos locaux, parfait.' },
  { n: 'C. Martin', t: 'Délais tenus et chantier propre. Je recommande.' },
]

export default function TestimonialsCarousel() {
  const [i, setI] = useState(0)
  const next = () => setI((v) => (v + 1) % AVIS.length)
  const prev = () => setI((v) => (v - 1 + AVIS.length) % AVIS.length)

  useEffect(() => {
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [])

  const visibles = [AVIS[i], AVIS[(i + 1) % AVIS.length]]

  return (
    <section id="avis">
      <h2 className="text-3xl font-bold text-white">Nos avis</h2>
      <p className="text-slate-300 mt-2">La satisfaction au cœur du service.</p>

      <div className="mt-6 flex items-center gap-3">
        <button className="btn btn-light" onClick={prev}>‹</button>
        <div className="grid sm:grid-cols-2 gap-4 flex-1">
          {visibles.map((a, idx) => (
            <figure key={idx} className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <blockquote className="text-white/90">“{a.t}”</blockquote>
              <figcaption className="mt-3 text-sm text-slate-300">{a.n}</figcaption>
            </figure>
          ))}
        </div>
        <button className="btn btn-light" onClick={next}>›</button>
      </div>
    </section>
  )
}
