const logos = [
  { alt: 'Hager', src: '/images/partners/hager.svg' },
  { alt: 'Legrand', src: '/images/partners/legrand.svg' },
  { alt: 'Schneider', src: '/images/partners/schneider.svg' },
  { alt: 'ABB', src: '/images/partners/abb.svg' },
  { alt: 'Netatmo', src: '/images/partners/netatmo.svg' },
]

export default function Partners() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-white">Nos partenaires</h2>
      <p className="text-slate-300 mt-2">Des marques reconnues pour des installations fiables.</p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
        {logos.map((l) => (
          <div key={l.alt} className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-center h-20">
            <img src={l.src} alt={l.alt} className="max-h-10 opacity-90" />
          </div>
        ))}
      </div>
    </section>
  )
}
