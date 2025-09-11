import SafeImage from './SafeImage'

export default function Hero() {
  return (
    <section className="relative">
      {/* Image de fond */}
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src="/images/hero.jpg"
          alt="Chantier et tableau électrique"
          wrapperClass="h-[66vh] md:h-[72vh] w-full"
          imgClass="h-full w-full object-cover"
          timeoutMs={1200}
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="container-2dk h-[66vh] md:h-[72vh] flex items-center">
        <div className="max-w-2xl text-white">
          <span className="chip">Intervention locale</span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
            Électricien — installations, dépannages & mises aux normes.
          </h1>
          <p className="mt-5 text-slate-200">
            Particuliers et professionnels — travail soigné, conseils, domotique. Devis rapide et gratuit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">Demander un devis</a>
            <a href="#services" className="btn btn-outline">Voir nos services</a>
          </div>
        </div>
      </div>
    </section>
  )
}
