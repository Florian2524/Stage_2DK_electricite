import SafeImage from './SafeImage'

const photos = [
  { title: 'Tableau refait', src: '/images/realisations/tableau-1.jpg' },
  { title: 'Éclairages', src: '/images/realisations/eclairage-1.jpg' },
  { title: 'Prises', src: '/images/realisations/prise-1.jpg' },
  { title: 'IRVE', src: '/images/realisations/irve-1.jpg' },
  { title: 'Spots', src: '/images/realisations/spot-1.jpg' },
  { title: 'Local pro', src: '/images/realisations/local-pro-1.jpg' },
  { title: 'Câblage', src: '/images/realisations/cablage-1.jpg' },
  { title: 'Schémas', src: '/images/realisations/schema-1.jpg' },
]

export default function Realisations() {
  return (
    <section id="realisations">
      <h2 className="text-3xl font-bold text-white">Nos réalisations</h2>
      <p className="text-slate-300 mt-2">Quelques chantiers pour se projeter.</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((p) => (
          <figure key={p.title} className="relative overflow-hidden rounded-2xl border border-white/10">
            <SafeImage src={p.src} alt={p.title} wrapperClass="aspect-[4/3]" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs">
              {p.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
