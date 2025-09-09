export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur border-b border-white/10">
      {/* min-h et padding pour laisser respirer le logo */}
      <div className="container-2dk min-h-24 md:min-h-28 py-2 flex items-center justify-between">
        {/* Logo seul, forcé en grand + pas de shrink */}
        <a href="#" className="flex items-center">
          <img
            src="/logo.png?v=2"            /* cache-buster */
            alt="2DK Électricité"
            className="shrink-0 !h-20 md:!h-24 w-auto"  /* force la hauteur */
            onError={(e) => (e.currentTarget.src = '/logo-2dk.svg')}
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#realisations" className="hover:text-white">Réalisations</a>
          <a href="#avis" className="hover:text-white">Avis</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:+33600000000" className="btn btn-outline">Appeler</a>
          <a href="#contact" className="btn btn-primary">Devis gratuit</a>
        </div>
      </div>
    </header>
  )
}
